"use client";

import { useState } from "react";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    setFieldErrors({});
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setFieldErrors(json.fieldErrors ?? {});
        setStatus({ kind: "error", message: json.error ?? "The message didn't send. Try again." });
        return;
      }
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error", message: "The message didn't send. Check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="contact-sent" role="status">
        <p>Message sent. I&apos;ll reply to the email you gave, usually within a day.</p>
        <button type="button" className="btn-quiet" onClick={() => setStatus({ kind: "idle" })}>
          Send another
        </button>
      </div>
    );
  }

  const err = (k: string) =>
    fieldErrors[k] ? (
      <span id={`${k}-error`} className="field-error">
        {fieldErrors[k]}
      </span>
    ) : null;

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "name-error" : undefined} />
          {err("name")}
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
          {err("email")}
        </label>
      </div>
      <label>
        <span>
          Company <span className="muted">(optional)</span>
        </span>
        <input name="company" autoComplete="organization" />
      </label>
      <label>
        Message
        <textarea name="body" rows={5} required aria-invalid={!!fieldErrors.body} aria-describedby={fieldErrors.body ? "body-error" : undefined} />
        {err("body")}
      </label>
      {/* Honeypot for bots; hidden from people and screen readers */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot" />
      {status.kind === "error" && (
        <p role="alert" className="field-error">
          {status.message}
        </p>
      )}
      <button type="submit" className="btn" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
