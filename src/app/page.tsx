import { profile, type CaseStudy } from "@/content/profile";
import { getProjects } from "@/lib/projects";
import { AskBox } from "@/components/AskBox";
import { ContactForm } from "@/components/ContactForm";
import { GitHubActivity } from "@/components/GitHubActivity";
import { GameClip } from "@/components/GameClip";
import { CreeArchitecture, Federation } from "@/components/Diagrams";

export const revalidate = 3600;

function Visual({ kind }: { kind: CaseStudy["visual"] }) {
  if (kind === "galaga") return <GameClip />;
  if (kind === "federation") return <Federation />;
  return <CreeArchitecture />;
}

function Study({ c }: { c: CaseStudy }) {
  return (
    <article className="study" aria-labelledby={`${c.slug}-h`}>
      <header className="study-head">
        <h3 id={`${c.slug}-h`}>{c.title}</h3>
        <p className="study-context">
          {c.context}. {c.period}.
        </p>
        <p className="study-role">{c.role}</p>
      </header>

      <div className="study-body">
        <div className="study-visual">
          <Visual kind={c.visual} />
          <p className="study-evidence">{c.evidence}</p>
        </div>

        <div className="study-text">
          <h4>The problem</h4>
          <p>{c.problem}</p>

          <h4>What I did</h4>
          <ul className="points">
            {c.did.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <div className="hard">
            <h4>The hard part: {c.hardPart.title.charAt(0).toLowerCase() + c.hardPart.title.slice(1)}</h4>
            <p>{c.hardPart.body}</p>
          </div>

          <h4>From my commit history</h4>
          <ol className="commit-log">
            {c.commits.map((m) => (
              <li key={m.message}>
                <time dateTime={m.date}>{m.date}</time>
                <span className="commit-msg">{m.message}</span>
              </li>
            ))}
          </ol>

          <p className="stack">{c.stack.join(", ")}</p>
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
        </div>
      </div>
    </article>
  );
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <header className="site-head wrap">
        <a href="#main" className="mark" aria-label={`${profile.name}, back to top`}>
          SS
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          {profile.resume && (
            <a href={profile.resume} className="nav-resume">
              Résumé
            </a>
          )}
        </nav>
      </header>

      <main id="main">
        <section className="hero wrap" aria-labelledby="name">
          <div className="hero-copy">
            <h1 id="name" className="hero-name">
              {profile.name}
            </h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-headline">{profile.headline}</p>
            <p className="hero-seeking">
              <span className="dot" aria-hidden="true" />
              Looking for {profile.seeking.charAt(0).toLowerCase() + profile.seeking.slice(1)}
            </p>
            <p className="hero-links">
              {profile.resume && (
                <a href={profile.resume} className="btn">
                  Download résumé
                </a>
              )}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github}>GitHub</a>
              <a href={profile.linkedin}>LinkedIn</a>
            </p>
          </div>
          <AskBox suggestions={profile.suggestedQuestions} name={profile.name} />
        </section>

        <section id="work" className="band wrap" aria-labelledby="work-h">
          <h2 id="work-h">Selected work</h2>
          <p className="section-lede">
            Three projects, with what went wrong and how I fixed it. The commit messages are copied from the
            repositories.
          </p>
          {profile.caseStudies.map((c) => (
            <Study key={c.slug} c={c} />
          ))}
        </section>

        {projects.length > 0 && (
          <section className="band wrap" aria-labelledby="more-h">
            <h2 id="more-h">Other projects</h2>
            <div className="project-list">
              {projects.map((p) => (
                <article key={p.slug} className="project">
                  <h3>{p.title}</h3>
                  <p className="muted project-meta">{[p.context, p.period].filter(Boolean).join(", ")}</p>
                  <p>{p.summary}</p>
                  {p.details.length > 0 && (
                    <ul className="points">
                      {p.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                  <p className="stack">{p.stack.join(", ")}</p>
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

        <section className="band wrap" aria-labelledby="gh-h">
          <h2 id="gh-h">What I&apos;m committing lately</h2>
          <GitHubActivity profileUrl={profile.github} />
        </section>

        <section id="experience" className="band wrap" aria-labelledby="experience-h">
          <h2 id="experience-h">Experience and education</h2>
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

        <section id="contact" className="band wrap contact" aria-labelledby="contact-h">
          <div>
            <h2 id="contact-h">Get in touch</h2>
            <p>
              Hiring for an internship, or want to talk about something here? Email{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a> or send a message.
            </p>
            <p className="muted">Based in {profile.location}. Open to roles anywhere in Canada.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-foot wrap">
        <p className="muted">
          {profile.name}, {new Date().getFullYear()}. Built with Next.js and PostgreSQL, deployed on Vercel.
        </p>
      </footer>
    </>
  );
}
