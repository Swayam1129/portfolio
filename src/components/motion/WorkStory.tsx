"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CountUp } from "./CountUp";

export type StoryItem = {
  slug: string;
  num: string;
  title: string;
  oneLiner: string;
  tags: string[];
  period: string;
  team: string;
  role: string;
  problem: string;
  solution: string[];
  result: string[];
  stats: { value: string; label: string }[];
  shots?: { src: string; alt: string; caption: string; frame: "browser" | "phone" | "plain" }[];
  visual: ReactNode;
};

/** Real screenshots in a device frame; the one shown follows the step you're reading. */
function Screens({ shots, step }: { shots: NonNullable<StoryItem["shots"]>; step: number }) {
  const i = Math.min(shots.length - 1, Math.max(0, step));
  const frame = shots[0].frame;
  return (
    <figure className={`device device-${frame}`}>
      {frame === "browser" && (
        <div className="device-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="device-screen">
        {shots.map((s, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s.src} src={s.src} alt={s.alt} className={k === i ? "is-on" : undefined} loading="lazy" />
        ))}
      </div>
      <figcaption>{shots[i].caption}</figcaption>
    </figure>
  );
}

const STEPS = ["Problem", "What I built", "Result"] as const;

/**
 * One project told as a scroll story: the visual stays pinned while
 * the problem, what I built and the result light up in turn.
 */
function Story({ item }: { item: StoryItem }) {
  const [step, setStep] = useState(-1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const stepClass = (i: number) => `story-step${step >= i ? " is-on" : ""}${step === i ? " is-current" : ""}`;

  return (
    <article className="story" id={`story-${item.slug}`} aria-labelledby={`story-${item.slug}-h`}>
      <div className="story-grid">
        <div className="story-stage">
          <div className="story-stage-head">
            <span className="story-num">{item.num}</span>
            <ol className="story-dots" aria-hidden="true">
              {STEPS.map((s, i) => (
                <li key={s} className={step >= i ? "on" : undefined}>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="story-visual">{item.shots?.length ? <Screens shots={item.shots} step={step} /> : item.visual}</div>
        </div>

        <div className="story-steps">
          <header className="story-intro" data-reveal>
            <p className="kicker">
              {item.tags.join(", ")} / {item.period}
            </p>
            <h3 id={`story-${item.slug}-h`} className="story-title">
              {item.title}
            </h3>
            <p className="story-line">{item.oneLiner}</p>
            <p className="story-facts">
              <span>{item.role}</span>
              <span className="muted">{item.team}</span>
            </p>
            <dl className="story-stats">
              {item.stats.map((s) => (
                <div key={s.label}>
                  <dt>
                    <CountUp value={s.value} />
                  </dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </header>

          <div className={stepClass(0)} data-step={0} ref={(el) => { refs.current[0] = el; }}>
            <h4>The problem</h4>
            <p className="story-big">{item.problem}</p>
          </div>

          <div className={stepClass(1)} data-step={1} ref={(el) => { refs.current[1] = el; }}>
            <h4>What I built</h4>
            <ul className="points">
              {item.solution.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className={stepClass(2)} data-step={2} ref={(el) => { refs.current[2] = el; }}>
            <h4>The result</h4>
            <ul className="story-results">
              {item.result.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Link href={`/work/${item.slug}`} className="btn btn-ghost story-more">
              Read the full case study
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function WorkStory({ items }: { items: StoryItem[] }) {
  return (
    <div className="stories">
      {items.map((it) => (
        <Story key={it.slug} item={it} />
      ))}
    </div>
  );
}
