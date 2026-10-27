import { profile } from "@/content/profile";

export type RecentCommit = { repo: string; repoUrl: string; message: string; url: string; date: string };

export type GitHubStats = {
  publicRepos: number;
  languages: { name: string; repos: number }[];
  commits: RecentCommit[];
};

type ApiRepo = {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

type ApiCommit = {
  html_url: string;
  commit: { message: string; author: { date: string } | null };
};

const user = process.env.GITHUB_USERNAME || profile.githubUser;

async function gh<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  // Cached for an hour so the site stays well under GitHub's rate limit.
  const res = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Live data from the GitHub API. Returns null if GitHub can't be reached. */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const repos = (await gh<ApiRepo[]>(`/users/${user}/repos?per_page=100&sort=pushed`)).filter(
      (r) => !r.fork && !r.archived,
    );

    // Count repos by primary language. Byte counts would be skewed by vendored libraries.
    const counts = new Map<string, number>();
    for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    const languages = [...counts.entries()]
      .map(([name, n]) => ({ name, repos: n }))
      .sort((a, b) => b.repos - a.repos)
      .slice(0, 6);

    // Latest commits by this user from the three most recently pushed repos.
    const perRepo = await Promise.all(
      repos.slice(0, 3).map(async (r) => {
        try {
          const list = await gh<ApiCommit[]>(`/repos/${user}/${r.name}/commits?author=${user}&per_page=4`);
          return list.map((c) => ({
            repo: r.name,
            repoUrl: r.html_url,
            message: c.commit.message.split("\n")[0],
            url: c.html_url,
            date: c.commit.author?.date ?? r.pushed_at,
          }));
        } catch {
          return [];
        }
      }),
    );
    const commits = perRepo
      .flat()
      .filter((c) => !/^merge /i.test(c.message))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, 6);

    return { publicRepos: repos.length, languages, commits };
  } catch (err) {
    console.error(err);
    return null;
  }
}
