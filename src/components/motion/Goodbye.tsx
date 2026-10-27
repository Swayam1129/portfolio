"use client";

import { useEffect, useRef, useState } from "react";

/** The finale: a gold sun rises behind "Thanks for scrolling." as the letters climb in one by one. */
export function Goodbye({ email }: { email: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const words = ["Thanks", "for", "scrolling."];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let n = 0;
  return (
    <section ref={ref} className={`bye${shown ? " is-in" : ""}`} aria-labelledby="bye-h">
      <div className="bye-sun" aria-hidden="true" />
      <div className="bye-inner wrap">
        <h2 id="bye-h" className="bye-title">
          <span className="visually-hidden">Thanks for scrolling.</span>
          <span aria-hidden="true">
            {words.map((w) => (
              <span key={w} className="bye-word">
                {w.split("").map((ch) => {
                  const i = n++;
                  return (
                    <span key={i} className="bye-ch" style={{ animationDelay: `${i * 45}ms` }}>
                      {ch}
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        </h2>
        <p className="bye-line">If any of this is the kind of work your team needs, I&apos;d love to hear from you.</p>
        <p className="bye-actions">
          <a className="btn btn-gold" href={`mailto:${email}`}>
            Email me
          </a>
          <a className="btn btn-ghost" href="#top">
            Back to the top
          </a>
        </p>
      </div>
    </section>
  );
}
