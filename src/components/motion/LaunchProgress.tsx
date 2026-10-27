"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins its children for a stretch of scrolling and exposes progress (0 to 1) as the CSS variable --p,
 * so the hero can fly toward the reader as they scroll. Reduced motion: no pin, no variable.
 */
export function LaunchProgress({ children, id, labelledBy }: { children: ReactNode; id: string; labelledBy: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-pinned");
    let frame = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
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
    <section ref={ref} id={id} className="launch" aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
