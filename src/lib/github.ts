export type ContributionDay = {
  date: string;
  count: number;
  /** 0 = none … 4 = most, same scale GitHub uses */
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubData = {
  days: ContributionDay[];
  totalStars: number;
  repoCount: number;
  longestStreak: number;
};

const USER = "theoxfaber";

async function fetchJson(url: string, timeoutMs = 10000): Promise<unknown> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "portfolio-sagar" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as unknown;
  } finally {
    clearTimeout(t);
  }
}

function longestStreak(days: ContributionDay[]): number {
  let best = 0;
  let cur = 0;
  for (const d of days) {
    cur = d.count > 0 ? cur + 1 : 0;
    if (cur > best) best = cur;
  }
  return best;
}

/**
 * Real GitHub data, fetched at build time (ISR, once a day).
 * Returns null when offline/blocked — callers must render an
 * honestly-labeled fallback, never fabricated numbers.
 */
export async function getGithubData(): Promise<GithubData | null> {
  try {
    const [contrib, repos] = await Promise.all([
      fetchJson(`https://github-contributions-api.jogruber.de/v4/${USER}`),
      fetchJson(`https://api.github.com/users/${USER}/repos?per_page=100`),
    ]);

    const c = contrib as { contributions?: Array<{ date: string; count: number; level: number }> };
    const r = repos as Array<{ stargazers_count?: number; fork?: boolean }>;
    if (!Array.isArray(c?.contributions) || !Array.isArray(r)) return null;

    const days: ContributionDay[] = c.contributions.map((d) => ({
      date: d.date,
      count: d.count,
      level: Math.max(0, Math.min(4, d.level ?? 0)) as ContributionDay["level"],
    }));

    return {
      days,
      totalStars: r.reduce((s, repo) => s + (repo.stargazers_count ?? 0), 0),
      repoCount: r.filter((repo) => !repo.fork).length,
      longestStreak: longestStreak(days),
    };
  } catch {
    return null;
  }
}
