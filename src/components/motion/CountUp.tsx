"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a number up when it scrolls into view. The real value is in the HTML
 * (for screen readers, no-JS and reduced motion); the animation only rewrites the visible digits.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^([\d,]+)(.*)$/);
    if (!el || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(m[1].replace(/,/g, ""));
    const suffix = m[2];
    const fmt = (n: number) => `${n.toLocaleString("en-CA")}${suffix}`;
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / 1400);
          el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span>
      <span className="visually-hidden">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
