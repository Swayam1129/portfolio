import type { Metadata } from "next";
import Link from "next/link";
import { asc, desc } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";
import { deleteMessage, deleteProject, importProjects, logout, saveProject, toggleRead } from "./actions";
import type { ProjectRow } from "@/db/schema";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

const fmt = new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Edmonton" });

function ProjectForm({ p }: { p?: ProjectRow }) {
  return (
    <form action={saveProject} className="admin-project">
      {p && <input type="hidden" name="id" value={p.id} />}
      <div className="admin-grid">
        <label>
          Title
          <input name="title" defaultValue={p?.title} required />
        </label>
        <label>
          Period
          <input name="period" defaultValue={p?.period} placeholder="2026" />
        </label>
        <label>
          Context
          <input name="context" defaultValue={p?.context ?? ""} placeholder="CMPUT 401, team of 7" />
        </label>
        <label>
          Order
          <input name="position" type="number" defaultValue={p?.position ?? 99} />
        </label>
        <label>
          Repository URL
          <input name="repo" type="url" defaultValue={p?.repo ?? ""} />
        </label>
        <label>
          Live URL
          <input name="live" type="url" defaultValue={p?.live ?? ""} />
        </label>
      </div>
      <label>
        Summary
        <textarea name="summary" rows={2} defaultValue={p?.summary} required />
      </label>
      <label>
        Details, one per line
        <textarea name="details" rows={3} defaultValue={p?.details.join("\n")} />
      </label>
      <label>
        Stack, comma separated
        <input name="stack" defaultValue={p?.stack.join(", ")} />
      </label>
      <div className="admin-row">
        <label className="check">
          <input type="checkbox" name="featured" defaultChecked={p?.featured} /> Featured
        </label>
        <label className="check">
          <input type="checkbox" name="visible" defaultChecked={p ? p.visible : true} /> Visible on site
        </label>
        <button type="submit" className="btn">
          {p ? "Save project" : "Add project"}
        </button>
      </div>
    </form>
  );
}

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <main className="admin">
        <h1>Admin isn&apos;t set up</h1>
        <p>Set ADMIN_PASSWORD and ADMIN_SECRET (16+ characters) in your environment variables, then redeploy.</p>
        <Link href="/">Back to the site</Link>
      </main>
    );
  }

  if (!(await isAdmin())) {
    return (
      <main className="admin">
        <h1>Admin</h1>
        <LoginForm />
      </main>
    );
  }

  const db = getDb();
  if (!db) {
    return (
      <main className="admin">
        <h1>Connect a database</h1>
        <p>Set DATABASE_URL, run <code>npm run db:push</code>, then reload this page.</p>
      </main>
    );
  }

  const [inbox, projects, questions] = await Promise.all([
    db.select().from(schema.messages).orderBy(desc(schema.messages.createdAt)).limit(100),
    db.select().from(schema.projects).orderBy(asc(schema.projects.position)),
    db.select().from(schema.chatLog).orderBy(desc(schema.chatLog.createdAt)).limit(50),
  ]);
  const unread = inbox.filter((m) => !m.read).length;

  return (
    <main className="admin">
      <header className="admin-head">
        <h1>Admin</h1>
        <div className="admin-row">
          <Link href="/">View site</Link>
          <form action={logout}>
            <button type="submit" className="btn-quiet">Sign out</button>
          </form>
        </div>
      </header>

      <section aria-labelledby="inbox">
        <h2 id="inbox">Messages {unread > 0 && <span className="badge">{unread} new</span>}</h2>
        {inbox.length === 0 ? (
          <p className="muted">No messages yet. They&apos;ll appear here when someone uses the contact form.</p>
        ) : (
          <ul className="admin-list">
            {inbox.map((m) => (
              <li key={m.id} className={m.read ? "" : "unread"}>
                <div className="admin-row spread">
                  <strong>
                    {m.name}
                    {m.company && <span className="muted">, {m.company}</span>}
                  </strong>
                  <time className="muted">{fmt.format(m.createdAt)}</time>
                </div>
                <a href={`mailto:${m.email}`}>{m.email}</a>
                <p className="pre">{m.body}</p>
                <div className="admin-row">
                  <form action={toggleRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="read" value={String(m.read)} />
                    <button type="submit" className="btn-quiet">{m.read ? "Mark unread" : "Mark read"}</button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="btn-quiet danger">Delete</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="questions">
        <h2 id="questions">What visitors asked the chat</h2>
        {questions.length === 0 ? (
          <p className="muted">No questions yet.</p>
        ) : (
          <ul className="admin-questions">
            {questions.map((q) => (
              <li key={q.id}>
                <span>{q.question}</span> <time className="muted">{fmt.format(q.createdAt)}</time>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="projects">
        <h2 id="projects">Projects</h2>
        {projects.length === 0 && (
          <form action={importProjects} className="admin-row">
            <p className="muted">The site is showing projects from profile.ts. Import them to edit here.</p>
            <button type="submit" className="btn">Import projects</button>
          </form>
        )}
        {projects.map((p) => (
          <details key={p.id} className="admin-details">
            <summary>
              {p.title} {!p.visible && <span className="muted">(hidden)</span>}
            </summary>
            <ProjectForm p={p} />
            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" className="btn-quiet danger">Delete project</button>
            </form>
          </details>
        ))}
        <details className="admin-details">
          <summary>Add a project</summary>
          <ProjectForm />
        </details>
      </section>
    </main>
  );
}
