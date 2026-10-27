import { profile } from "@/content/profile";

export type RepoSummary = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  languages: { name: string; share: number }[];
  recent: RepoSummary[];
};

type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  size: number;
};

const user = process.env.GITHUB_USERNAME || profile.githubUser;

async function gh<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  // Cached for an hour so the site doesn't hit GitHub's rate limit.
  const res = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Live numbers from the GitHub API. Returns null if GitHub can't be reached. */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const [account, repos] = await Promise.all([
      gh<{ public_repos: number; followers: number }>(`/users/${user}`),
      gh<ApiRepo[]>(`/users/${user}/repos?per_page=100&sort=pushed`),
    ]);
    const own = repos.filter((r) => !r.fork);

    // Language share weighted by repo size, a cheap proxy that needs one request instead of one per repo.
    const weights = new Map<string, number>();
    for (const r of own) {
      if (!r.language) continue;
      weights.set(r.language, (weights.get(r.language) ?? 0) + Math.max(r.size, 1));
    }
    const total = [...weights.values()].reduce((a, b) => a + b, 0) || 1;
    const languages = [...weights.entries()]
      .map(([name, w]) => ({ name, share: w / total }))
      .sort((a, b) => b.share - a.share)
      .slice(0, 6);

    return {
      publicRepos: account.public_repos,
      followers: account.followers,
      languages,
      recent: own.slice(0, 5).map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
