import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StudyVisual } from "@/components/StudyVisual";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return profile.caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = profile.caseStudies.find((s) => s.slug === slug);
  if (!c) return {};
  return { title: `${c.title}, ${profile.name}`, description: c.oneLiner };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = profile.caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const c = profile.caseStudies[index];
  const next = profile.caseStudies[(index + 1) % profile.caseStudies.length];

  return (
    <>
      <SiteHeader />
      <main id="main" className="cs">
        <header className="cs-hero wrap">
          <p className="kicker">
            <Link href="/#work">Selected work</Link> / {c.tags.join(", ")}
          </p>
          <h1 className="cs-title">{c.title}</h1>
          <p className="cs-line">{c.oneLiner}</p>
          <dl className="cs-facts">
            <div>
              <dt>My role</dt>
              <dd>{c.role}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>{c.team}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{c.period}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{c.context}</dd>
            </div>
          </dl>
        </header>

        <div className="wrap cs-visual">
          <StudyVisual kind={c.visual} />
        </div>

        <div className="wrap cs-body">
          <section className="cs-sec" aria-labelledby="problem-h">
            <h2 id="problem-h">The problem</h2>
            <p className="cs-lead">{c.problem}</p>
          </section>

          <section className="cs-sec" aria-labelledby="built-h">
            <h2 id="built-h">What I built</h2>
            <ul className="points">
              {c.solution.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className="cs-sec cs-result" aria-labelledby="result-h">
            <h2 id="result-h">The result</h2>
            <ul>
              {c.result.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section className="cs-sec" aria-labelledby="decisions-h">
            <h2 id="decisions-h">Decisions I made</h2>
            <div className="decisions">
              {c.decisions.map((d) => (
                <div key={d.choice} className="decision">
                  <h3>{d.choice}</h3>
                  <p>{d.why}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-sec" aria-labelledby="hard-h">
            <h2 id="hard-h">The hardest part</h2>
            <h3 className="hard-title">{c.hardPart.title}</h3>
            <p>{c.hardPart.body}</p>
          </section>

          <section className="cs-sec" aria-labelledby="evidence-h">
            <h2 id="evidence-h">Proof in the code</h2>
            <p className="cs-evidence">
              <mark>{c.evidence}</mark>
            </p>
            <ol className="commit-log">
              {c.commits.map((m) => (
                <li key={m.message}>
                  <time dateTime={m.date}>{m.date}</time>
                  <span className="commit-msg">{m.message}</span>
                </li>
              ))}
            </ol>
            <p className="stack">Built with {c.stack.join(", ")}</p>
            {(c.links.length > 0 || c.note) && (
              <p className="project-links">
                {c.links.map((l) => (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
                {c.note && <span className="muted">{c.note}</span>}
              </p>
            )}
          </section>
        </div>

        <nav className="wrap cs-next" aria-label="Next project">
          <Link href={`/work/${next.slug}`}>
            <span className="kicker">Next project</span>
            <span className="cs-next-title">{next.title}</span>
            <span className="work-line">{next.oneLiner}</span>
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
