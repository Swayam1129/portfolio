import { profile } from "@/content/profile";
import { getProjects } from "@/lib/projects";
import { AskBox } from "@/components/AskBox";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Ledger } from "@/components/Ledger";
import { SiteFooter, ToolStrip } from "@/components/SiteChrome";
import { StudyVisual } from "@/components/StudyVisual";
import { SectionNav } from "@/components/motion/SectionNav";
import { ScrollFill } from "@/components/motion/ScrollFill";
import { WorkStory } from "@/components/motion/WorkStory";
import { Goodbye } from "@/components/motion/Goodbye";

export const revalidate = 3600;

const sections = [
  { id: "top", label: "Intro" },
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "record", label: "Record" },
  { id: "side", label: "Side projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default async function Home() {
  const projects = await getProjects();
  const stories = profile.caseStudies.map((c, i) => ({
    slug: c.slug,
    num: String(i + 1).padStart(2, "0"),
    title: c.title,
    oneLiner: c.oneLiner,
    tags: c.tags,
    period: c.period,
    team: c.team,
    role: c.role,
    problem: c.problem,
    solution: c.solution,
    result: c.result,
    visual: <StudyVisual kind={c.visual} />,
  }));

  return (
    <>
      <SectionNav
        sections={sections}
        cta={profile.resume ? { label: "Résumé", href: profile.resume } : { label: "Email me", href: `mailto:${profile.email}` }}
      />

      <main id="main">
        <section id="top" className="hero wrap" aria-labelledby="hero-h">
          <div className="hero-inner">
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
          </div>
          <a href="#approach" className="scroll-cue" aria-label="Scroll to the next section">
            <span aria-hidden="true" />
            Scroll
          </a>
        </section>

        <ToolStrip tools={profile.tools} />

        <section id="approach" className="manifesto wrap" aria-labelledby="manifesto-h">
          <h2 id="manifesto-h" className="kicker" data-reveal>
            How I work
          </h2>
          <ScrollFill text={profile.manifesto} highlights={profile.manifestoHighlights} />
        </section>

        <section id="work" className="work wrap" aria-labelledby="work-h">
          <div className="section-head" data-reveal>
            <h2 id="work-h">Selected work</h2>
            <p className="section-lede">
              Four projects, told the way I&apos;d explain them in an interview: the problem, what I built, and what changed.
            </p>
          </div>
          <WorkStory items={stories} />
        </section>

        <section id="record" className="record wrap" aria-labelledby="record-h">
          <div className="section-head" data-reveal>
            <h2 id="record-h">Contribution record</h2>
            <p className="section-lede">
              How much of each team project I wrote, counted from the repositories. Useful when every résumé says
              &ldquo;team player&rdquo;.
            </p>
          </div>
          <div data-reveal>
            <Ledger rows={profile.ledger} />
          </div>
        </section>

        {projects.length > 0 && (
          <section id="side" className="more wrap" aria-labelledby="more-h">
            <div className="section-head" data-reveal>
              <h2 id="more-h">Hackathons and side projects</h2>
              <p className="section-lede">Smaller builds, each with what I personally did.</p>
            </div>
            <div className="project-list">
              {projects.map((p, i) => (
                <article key={p.slug} className="project" data-reveal style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
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
            <div className="section-head" data-reveal>
              <h2 id="quotes-h">What people I&apos;ve worked with say</h2>
            </div>
            <ul className="quote-list">
              {profile.testimonials.map((t) => (
                <li key={t.name} data-reveal>
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

        <section id="about" className="about wrap" aria-labelledby="exp-h">
          <div className="section-head" data-reveal>
            <h2 id="exp-h">Experience and education</h2>
          </div>
          <ol className="timeline">
            {profile.experience.map((r) => (
              <li key={r.title} data-reveal>
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
            <li data-reveal>
              <p className="timeline-when">{profile.education.period}</p>
              <div>
                <h3>{profile.education.degree}</h3>
                <p className="muted">{profile.education.school}</p>
                <p className="edu-line">{profile.education.awards.join(", ")}</p>
                <p className="edu-line muted">Coursework: {profile.education.coursework.join(", ")}</p>
              </div>
            </li>
          </ol>
          <dl className="skills" data-reveal>
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group}>
                <dt>{group}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>

          <div className="ask-band" data-reveal>
            <div>
              <h3 className="ask-title">Short on time?</h3>
              <p className="section-lede">Ask a question and get an answer drawn only from what&apos;s on this site.</p>
            </div>
            <AskBox suggestions={profile.suggestedQuestions} name={profile.name} />
          </div>

          <div className="gh-wrap" data-reveal>
            <h3 className="ask-title">Lately on GitHub</h3>
            <GitHubActivity profileUrl={profile.github} />
          </div>
        </section>
      </main>

      <SiteFooter finale={<Goodbye email={profile.email} />} />
    </>
  );
}
