import { getGitHubStats } from "@/lib/github";

const fmt = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "America/Edmonton" });

export async function GitHubActivity({ profileUrl }: { profileUrl: string }) {
  const stats = await getGitHubStats();
  if (!stats) {
    return (
      <p className="muted">
        GitHub activity couldn&apos;t load right now. <a href={profileUrl}>See it on GitHub</a>.
      </p>
    );
  }
  const max = Math.max(...stats.languages.map((l) => l.repos), 1);

  return (
    <div className="gh">
      <div>
        <p className="gh-caption">My latest public commits, refreshed hourly from GitHub</p>
        {stats.commits.length === 0 ? (
          <p className="muted">No recent public commits.</p>
        ) : (
          <ol className="commit-log">
            {stats.commits.map((c) => (
              <li key={c.url}>
                <time dateTime={c.date}>{fmt.format(new Date(c.date))}</time>
                <a href={c.url} className="commit-msg">
                  {c.message}
                </a>
                <a href={c.repoUrl} className="commit-repo">
                  {c.repo}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div>
        <p className="gh-caption">Main language of my {stats.publicRepos} public repositories</p>
        <ul className="gh-langs">
          {stats.languages.map((l) => (
            <li key={l.name}>
              <span className="gh-lang-name">{l.name}</span>
              <span className="gh-lang-bar" aria-hidden="true">
                <span style={{ width: `${(l.repos / max) * 100}%` }} />
              </span>
              <span className="muted">
                {l.repos} {l.repos === 1 ? "repo" : "repos"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
