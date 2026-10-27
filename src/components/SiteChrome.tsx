import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/ContactForm";

export function SiteHeader() {
  return (
    <header className="site-head wrap">
      <Link href="/" className="wordmark">
        Swayam Sagar
      </Link>
      <nav aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
        {profile.resume ? (
          <a href={profile.resume} className="btn btn-sm">
            Résumé
          </a>
        ) : (
          <a href={`mailto:${profile.email}`} className="btn btn-sm">
            Email me
          </a>
        )}
      </nav>
    </header>
  );
}

export function SiteFooter({ finale }: { finale?: ReactNode } = {}) {
  return (
    <footer id="contact" className="site-foot" aria-labelledby="contact-h">
      <div className="wrap foot-grid">
        <div data-reveal>
          <p className="kicker">Open to Summer 2027 internships</p>
          <h2 id="contact-h" className="foot-title">
            Let&apos;s talk.
          </h2>
          <a className="foot-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className="foot-links">
            <li>
              <a href={profile.github}>GitHub</a>
            </li>
            <li>
              <a href={profile.linkedin}>LinkedIn</a>
            </li>
            {profile.resume && (
              <li>
                <a href={profile.resume}>Résumé (PDF)</a>
              </li>
            )}
          </ul>
          <p className="muted foot-where">Based in {profile.location}. Open to roles anywhere in Canada.</p>
        </div>
        <div data-reveal>
          <p className="foot-form-title">Or send a message</p>
          <ContactForm />
        </div>
      </div>
      {finale}
      <div className="wrap foot-base">
        <p>
          {profile.name}, {new Date().getFullYear()}
        </p>
        <p>Built with Next.js and PostgreSQL, deployed on Vercel</p>
      </div>
    </footer>
  );
}

export function ToolStrip({ tools }: { tools: string[] }) {
  // The list is repeated so the scroll loops seamlessly; the copy is hidden from screen readers.
  return (
    <div className="strip" aria-label="Tools I've used in shipped projects">
      <div className="strip-track">
        <ul>
          {tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
