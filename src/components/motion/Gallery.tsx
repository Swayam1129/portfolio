"use client";

import { useEffect, useRef } from "react";

type Item = { src: string; alt: string; caption: string };

/** A pinned strip of real screenshots that slides sideways as you scroll down. */
export function Gallery({ items }: { items: Item[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current, tr = track.current;
    if (!el || !tr) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 720px)");
    let raf = 0;
    const size = () => {
      // The section is as tall as the sideways distance, so scroll speed feels natural.
      if (reduce || narrow.matches) { el.style.height = ""; tr.style.transform = ""; return; }
      const dist = tr.scrollWidth - window.innerWidth;
      el.style.height = `${window.innerHeight + Math.max(0, dist)}px`;
    };
    const update = () => {
      if (reduce || narrow.matches) return;
      const r = el.getBoundingClientRect();
      const dist = tr.scrollWidth - window.innerWidth;
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight || 1)));
      tr.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    const onResize = () => { size(); update(); };
    size(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={wrap} className="gallery">
      <div className="gallery-sticky">
        <div ref={track} className="gallery-track">
          <div className="gallery-intro">
            <p className="kicker">In pictures</p>
            <h2 id="gallery-h">Real screens from real code.</h2>
            <p className="section-lede">Everything here was captured from my projects running, not mocked up.</p>
          </div>
          {items.map((it) => (
            <figure key={it.src} className="gallery-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.alt} loading="lazy" />
              <figcaption>{it.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
