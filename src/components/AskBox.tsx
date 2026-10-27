"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export function AskBox({ suggestions, name }: { suggestions: string[]; name: string }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const first = name.split(" ")[0];

  useEffect(() => {
    logRef.current?.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [messages, pending]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || pending) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "The chat couldn't answer just now.");
      setMessages([...next, { role: "assistant", content: data.answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The chat couldn't answer just now.");
      setMessages(messages); // drop the unanswered question so it can be retried
      setInput(q);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="ask">
      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor="ask-input" className="ask-label">
          Ask about {first}&apos;s work
        </label>
        <div className="ask-row">
          <input
            id="ask-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`What has ${first} built with PyTorch?`}
            maxLength={1000}
            autoComplete="off"
          />
          <button type="submit" className="btn" disabled={pending || !input.trim()}>
            {pending ? "Thinking…" : "Ask"}
          </button>
        </div>
      </form>

      {messages.length === 0 ? (
        <ul className="ask-suggestions" aria-label="Suggested questions">
          {suggestions.map((s) => (
            <li key={s}>
              <button type="button" onClick={() => ask(s)} disabled={pending}>
                {s}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="ask-log" ref={logRef} aria-live="polite">
          {messages.map((m, i) => (
            <li key={i} className={m.role}>
              <span className="visually-hidden">{m.role === "user" ? "You asked:" : "Answer:"}</span>
              {m.content}
            </li>
          ))}
          {pending && <li className="assistant pending">Looking through {first}&apos;s work…</li>}
        </ol>
      )}

      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      <p className="ask-note">Answers come from this site&apos;s content, written by {first}.</p>
    </div>
  );
}
