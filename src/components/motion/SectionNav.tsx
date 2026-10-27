"use client";

import { useEffect, useState } from "react";

export type NavSection = { id: string; label: string };

/** Sticky bar that follows the reader: jump to any section, see where you are and how far you've read. */
export function SectionNav({ sections, cta }: { sections: NavSection[]; cta: { label: string; href: string } }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <header className={`snav${scrolled ? " is-scrolled" : ""}`}>
      <div className="snav-inner wrap">
        <a href="#top" className="wordmark">
          Swayam Sagar
        </a>
        <nav aria-label="Sections" className="snav-links">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={cta.href} className="btn btn-sm btn-gold snav-cta">
          {cta.label}
        </a>
      </div>
      <div className="snav-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}
