import { profile } from "@/content/profile";
import { getProjects } from "@/lib/projects";
import { AskBox } from "@/components/AskBox";
import { ContactForm } from "@/components/ContactForm";
import { GitHubActivity } from "@/components/GitHubActivity";

export const revalidate = 3600;

function ExternalLinks({ repo, live, title }: { repo?: string; live?: string; title: string }) {
  if (!repo && !live) return null;
  return (
    <p className="project-links">
      {live && (
        <a href={live} aria-label={`Open ${title}`}>
          Open it
        </a>
      )}
      {repo && (
        <a href={repo} aria-label={`${title} source code on GitHub`}>
          Source code
        </a>
      )}
    </p>
  );
}

export default async function Home() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <header className="site-head wrap">
        <a href="#main" className="mark" aria-label={profile.name}>
          SS
        </a>
        <nav aria-label="Sections">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero wrap" aria-labelledby="name">
          <h1 id="name" className="hero-name">
            {profile.name}
          </h1>
          <div className="hero-body">
            <div className="hero-copy">
              <p className="hero-role">{profile.role}</p>
              <p className="hero-intro">{profile.intro}</p>
              <p className="hero-seeking">
                <span className="dot" aria-hidden="true" />
                Looking for {profile.seeking.charAt(0).toLowerCase() + profile.seeking.slice(1)}
              </p>
              <p className="hero-links">
                <a href={`mailto:${profile.email}`}>Email</a>
                <a href={profile.github}>GitHub</a>
                <a href={profile.linkedin}>LinkedIn</a>
                {profile.resume && <a href={profile.resume}>Résumé (PDF)</a>}
              </p>
            </div>
            <AskBox suggestions={profile.suggestedQuestions} name={profile.name} />
          </div>
        </section>

        <section id="experience" className="band wrap" aria-labelledby="experience-h">
          <h2 id="experience-h">Experience</h2>
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
        </section>

        <section id="projects" className="band wrap" aria-labelledby="projects-h">
          <h2 id="projects-h">Projects</h2>

          {featured.map((p) => (
            <article key={p.slug} className="feature">
              <div className="feature-head">
                <h3>{p.title}</h3>
                <p className="muted">{[p.context, p.period].filter(Boolean).join(", ")}</p>
              </div>
              <p className="feature-summary">{p.summary}</p>
              <ul className="points">
                {p.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="stack">{p.stack.join(", ")}</p>
              <ExternalLinks repo={p.repo} live={p.live} title={p.title} />
            </article>
          ))}

          <div className="project-list">
            {rest.map((p) => (
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
                <ExternalLinks repo={p.repo} live={p.live} title={p.title} />
              </article>
            ))}
          </div>
        </section>

        <section className="band wrap" aria-labelledby="skills-h">
          <h2 id="skills-h">Tools I work with</h2>
          <dl className="skills">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group}>
                <dt>{group}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="band wrap" aria-labelledby="gh-h">
          <h2 id="gh-h">On GitHub</h2>
          <GitHubActivity profileUrl={profile.github} />
        </section>

        <section id="contact" className="band wrap contact" aria-labelledby="contact-h">
          <div>
            <h2 id="contact-h">Get in touch</h2>
            <p>
              Hiring for an internship, or want to talk about something I built? Send a message here, or email{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
            <p className="muted">Based in {profile.location}. Open to roles anywhere in Canada.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-foot wrap">
        <p className="muted">
          Built with Next.js, PostgreSQL and the Claude API. <a href={`${profile.github}`}>Source on GitHub</a>.
        </p>
      </footer>
    </>
  );
}
