import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Add your name.").max(100),
  email: z.email("Enter a valid email address.").max(200),
  company: z.string().trim().max(120).optional().default(""),
  body: z.string().trim().min(10, "Write at least a sentence.").max(4000),
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0).optional().default(""),
});

async function notify(msg: { name: string; email: string; company: string; body: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: msg.email,
      subject: `Portfolio message from ${msg.name}${msg.company ? ` (${msg.company})` : ""}`,
      text: `${msg.body}\n\n${msg.name} <${msg.email}>`,
    }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req.headers)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many messages from this address. Try again in an hour." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    if (fieldErrors.website) return NextResponse.json({ ok: true }); // silently drop bots
    return NextResponse.json({ error: "Check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const { name, email, company, body } = parsed.data;
  const db = getDb();
  let stored = false;
  if (db) {
    await db.insert(schema.messages).values({ name, email, company: company || null, body });
    stored = true;
  }
  const emailed = await notify({ name, email, company, body }).catch(() => false);

  if (!stored && !emailed) {
    return NextResponse.json(
      { error: `Messaging isn't set up yet. Email ${process.env.CONTACT_TO_EMAIL || "me"} directly instead.` },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
