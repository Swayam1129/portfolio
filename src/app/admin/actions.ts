"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/db";
import { profile } from "@/content/profile";
import { projectToRow } from "@/db/rows";
import { checkPassword, createSession, destroySession, isAdmin } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { headers } from "next/headers";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin");
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL is not set.");
  return db;
}

function done() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function login(_prev: { error?: string } | undefined, form: FormData) {
  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, 8, 15 * 60 * 1000)) return { error: "Too many attempts. Wait 15 minutes." };
  if (!checkPassword(String(form.get("password") ?? ""))) return { error: "That password is incorrect." };
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

export async function toggleRead(form: FormData) {
  const db = await requireAdmin();
  const id = Number(form.get("id"));
  const read = form.get("read") === "true";
  await db.update(schema.messages).set({ read: !read }).where(eq(schema.messages.id, id));
  done();
}

export async function deleteMessage(form: FormData) {
  const db = await requireAdmin();
  await db.delete(schema.messages).where(eq(schema.messages.id, Number(form.get("id"))));
  done();
}

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
const list = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
const opt = (v: FormDataEntryValue | null) => String(v ?? "").trim() || null;

export async function saveProject(form: FormData) {
  const db = await requireAdmin();
  const id = Number(form.get("id") || 0);
  const title = String(form.get("title") ?? "").trim();
  if (!title) return;
  const row = {
    title,
    slug:
      String(form.get("slug") ?? "").trim() ||
      title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    summary: String(form.get("summary") ?? "").trim(),
    details: lines(form.get("details")),
    stack: list(form.get("stack")),
    period: String(form.get("period") ?? "").trim(),
    context: opt(form.get("context")),
    repo: opt(form.get("repo")),
    live: opt(form.get("live")),
    featured: form.get("featured") === "on",
    visible: form.get("visible") === "on",
    position: Number(form.get("position") || 0),
  };
  if (id) await db.update(schema.projects).set(row).where(eq(schema.projects.id, id));
  else await db.insert(schema.projects).values(row);
  done();
}

export async function deleteProject(form: FormData) {
  const db = await requireAdmin();
  await db.delete(schema.projects).where(eq(schema.projects.id, Number(form.get("id"))));
  done();
}

export async function importProjects() {
  const db = await requireAdmin();
  for (const [position, p] of profile.projects.entries()) {
    const row = projectToRow(p, position);
    await db.insert(schema.projects).values(row).onConflictDoUpdate({ target: schema.projects.slug, set: row });
  }
  done();
}
