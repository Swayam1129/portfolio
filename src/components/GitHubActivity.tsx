import { getGitHubStats } from "@/lib/github";

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function ago(iso: string): string {
  const days = Math.round((Date.parse(iso) - Date.now()) / 86_400_000);
  if (Math.abs(days) < 1) return "today";
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

export async function GitHubActivity({ profileUrl }: { profileUrl: string }) {
  const stats = await getGitHubStats();
  if (!stats) {
    return (
      <p className="muted">
        GitHub activity couldn&apos;t load right now. <a href={profileUrl}>See it on GitHub</a>.
      </p>
    );
  }

  return (
    <div className="gh">
      <div className="gh-langs">
        <p className="gh-caption">
          Languages across {stats.publicRepos} public repositories, updated hourly from the GitHub API
        </p>
        <div className="gh-bar" role="img" aria-label={stats.languages.map((l) => `${l.name} ${Math.round(l.share * 100)}%`).join(", ")}>
          {stats.languages.map((l, i) => (
            <span key={l.name} style={{ flexGrow: l.share, opacity: 1 - i * 0.13 }} />
          ))}
        </div>
        <ul className="gh-legend">
          {stats.languages.map((l, i) => (
            <li key={l.name}>
              <span className="gh-swatch" style={{ opacity: 1 - i * 0.13 }} aria-hidden="true" />
              {l.name} <span className="muted">{Math.round(l.share * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="gh-caption">Recently pushed</p>
        <ul className="gh-repos">
          {stats.recent.map((r) => (
            <li key={r.name}>
              <a href={r.url}>{r.name}</a>
              <span className="muted">
                {r.language ? `${r.language}, ` : ""}
                {ago(r.pushedAt)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
