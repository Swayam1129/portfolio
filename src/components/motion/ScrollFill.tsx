"use client";

import { useEffect, useRef } from "react";

/**
 * Text that lights up word by word as it scrolls through the viewport.
 * Highlight phrases end up in the accent colour; everything else ends up full white.
 */
export function ScrollFill({ text, highlights }: { text: string; highlights: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  // Split into words, remembering which belong to a highlight phrase.
  const words: { w: string; hl: boolean }[] = [];
  const marks: [number, number][] = [];
  for (const h of highlights) {
    const i = text.indexOf(h);
    if (i >= 0) marks.push([i, i + h.length]);
  }
  let pos = 0;
  for (const w of text.split(" ")) {
    const start = text.indexOf(w, pos);
    pos = start + w.length;
    words.push({ w, hl: marks.some(([a, b]) => start >= a && start < b) });
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s.classList.add("lit"));
      return;
    }
    let frame = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top reaches 85% of the screen, 1 when its bottom reaches 45%.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle("lit", i < lit));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className="fill-text">
      <span className="visually-hidden">{text}</span>
      {words.map((x, i) => (
        <span key={i} data-w="" aria-hidden="true" className={x.hl ? "hl" : undefined}>
          {x.w}{" "}
        </span>
      ))}
    </p>
  );
}
