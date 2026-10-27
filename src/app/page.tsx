import Link from "next/link";
import { Fragment } from "react";
import { profile } from "@/content/profile";
import { getProjects } from "@/lib/projects";
import { AskBox } from "@/components/AskBox";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Ledger } from "@/components/Ledger";
import { SiteFooter, SiteHeader, ToolStrip } from "@/components/SiteChrome";

export const revalidate = 3600;

/** Wraps each highlight phrase in <mark>, keeping the rest of the text as is. */
function highlight(text: string, phrases: string[]) {
  const pattern = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    phrases.includes(part) ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>,
  );
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-h">
          <p className="kicker">
            <span className="dot" aria-hidden="true" />
            {profile.name}, {profile.role}
          </p>
          <h1 id="hero-h" className="hero-title">
            <span>From a blank repo</span> <span>to production.</span>
          </h1>
          <div className="hero-foot">
            <p className="hero-intro">{profile.intro}</p>
            <p className="hero-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-gold">
                Email me
              </a>
              <a href="#work" className="btn btn-ghost">
                See the work
              </a>
            </p>
          </div>
        </section>

        <ToolStrip tools={profile.tools} />

        <section id="about" className="manifesto wrap" aria-labelledby="manifesto-h">
          <h2 id="manifesto-h" className="kicker">
            How I work
          </h2>
          <p className="manifesto-text">{highlight(profile.manifesto, profile.manifestoHighlights)}</p>
        </section>

        <section id="work" className="work wrap" aria-labelledby="work-h">
          <div className="section-head">
            <h2 id="work-h">Selected work</h2>
            <p className="section-lede">
              Each project starts with the problem, then what I built and what changed. Open one for the full story.
            </p>
          </div>
          <ol className="work-index">
            {profile.caseStudies.map((c, i) => (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`} className="work-row">
                  <span className="work-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="work-main">
                    <span className="work-title">{c.title}</span>
                    <span className="work-line">{c.oneLiner}</span>
                  </span>
                  <span className="work-meta">
                    <span className="work-tags">{c.tags.join(", ")}</span>
                    <span className="work-period">{c.period}</span>
                  </span>
                  <span className="work-go" aria-hidden="true">
                    Read
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="record wrap" aria-labelledby="record-h">
          <div className="section-head">
            <h2 id="record-h">Contribution record</h2>
            <p className="section-lede">
              How much of each team project I wrote, counted from the repositories. Useful when every résumé says
              &ldquo;team player&rdquo;.
            </p>
          </div>
          <Ledger rows={profile.ledger} />
        </section>

        {projects.length > 0 && (
          <section className="more wrap" aria-labelledby="more-h">
            <div className="section-head">
              <h2 id="more-h">Hackathons and side projects</h2>
            </div>
            <div className="project-list">
              {projects.map((p) => (
                <article key={p.slug} className="project">
                  <p className="project-meta">{[p.context, p.period].filter(Boolean).join(", ")}</p>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <p className="stack">{p.stack.join(" / ")}</p>
                  {(p.repo || p.live) && (
                    <p className="project-links">
                      {p.live && <a href={p.live}>Open it</a>}
                      {p.repo && <a href={p.repo}>Source code</a>}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {profile.testimonials.length > 0 && (
          <section className="quotes wrap" aria-labelledby="quotes-h">
            <div className="section-head">
              <h2 id="quotes-h">What people I&apos;ve worked with say</h2>
            </div>
            <ul className="quote-list">
              {profile.testimonials.map((t) => (
                <li key={t.name}>
                  <blockquote>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <p className="quote-by">
                    {t.name}, <span className="muted">{t.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="ask-band wrap" aria-labelledby="ask-h">
          <div>
            <h2 id="ask-h">Short on time?</h2>
            <p className="section-lede">Ask a question and get an answer drawn only from what&apos;s on this site.</p>
          </div>
          <AskBox suggestions={profile.suggestedQuestions} name={profile.name} />
        </section>

        <section className="about wrap" aria-labelledby="exp-h">
          <div className="section-head">
            <h2 id="exp-h">Experience and education</h2>
          </div>
          <ol className="timeline">
            {profile.experience.map((r) => (
              <li key={r.title}>
                <p className="timeline-when">{r.period}</p>
                <div>
                  <h3>{r.title}</h3>
                  <p className="muted">{r.org}</p>
                  <ul className="points">
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li>
              <p className="timeline-when">{profile.education.period}</p>
              <div>
                <h3>{profile.education.degree}</h3>
                <p className="muted">{profile.education.school}</p>
                <p className="edu-line">{profile.education.awards.join(", ")}</p>
                <p className="edu-line muted">Coursework: {profile.education.coursework.join(", ")}</p>
              </div>
            </li>
          </ol>
          <dl className="skills">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group}>
                <dt>{group}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="gh-band wrap" aria-labelledby="gh-h">
          <div className="section-head">
            <h2 id="gh-h">Lately on GitHub</h2>
          </div>
          <GitHubActivity profileUrl={profile.github} />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
