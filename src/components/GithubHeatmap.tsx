import { getGithubData, type ContributionDay } from "@/lib/github";

const WEEKS = 26;

const shades = [
  "bg-zinc-800",
  "bg-lime-950",
  "bg-lime-800",
  "bg-lime-500",
  "bg-lime-300",
];

function toWeeks(days: ContributionDay[]): ContributionDay[][] {
  const recent = days.slice(-WEEKS * 7);
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < recent.length; i += 7) weeks.push(recent.slice(i, i + 7));
  return weeks;
}

/** Real contribution graph (ISR, refreshed daily) + live stat strip. */
export default async function GithubHeatmap() {
  const data = await getGithubData();

  if (!data) {
    return (
      <div>
        <p className="font-stamp text-xs text-fg-dim">
          <span className="text-zinc-200">@theoxfaber</span> · live graph unavailable offline
        </p>
        <div className="mt-2 rounded-xl border border-dashed border-zinc-800 p-4">
          <p className="text-sm text-fg-dim">
            Couldn&apos;t reach the GitHub API at build time — see the real thing on{" "}
            <a
              className="underline decoration-accent/60 underline-offset-2 hover:text-accent"
              href="https://github.com/theoxfaber"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const weeks = toWeeks(data.days);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-stamp text-xs text-fg-dim">
          <span className="text-zinc-200">@theoxfaber</span> · updated daily from the GitHub API
        </p>
        <p className="font-stamp text-[10px] text-fg-faint">Less → More</p>
      </div>
      <div className="mt-2 flex gap-[3px] overflow-x-auto pb-1" role="img" aria-label={`GitHub contribution graph, longest streak ${data.longestStreak} days`}>
        {weeks.map((week, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.count} contributions`}
                className={`h-[11px] w-[11px] rounded-[3px] ${shades[d.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-stamp text-[11px] text-fg-dim">
        <span>
          <span className="text-accent">★ {data.totalStars}</span> stars earned
        </span>
        <span>
          <span className="text-accent">{data.repoCount}</span> public repos
        </span>
        <span>
          <span className="text-accent">{data.longestStreak}d</span> longest streak
        </span>
      </div>
    </div>
  );
}
