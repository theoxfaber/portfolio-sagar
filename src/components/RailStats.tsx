import { getGithubData } from "@/lib/github";

/** Sticky xl rail: mini nav + live GitHub numbers. Renders nothing without data. */
export default async function RailStats() {
  const data = await getGithubData();
  if (!data) return null;

  return (
    <aside className="hidden xl:block" aria-label="Quick navigation and stats">
      <div className="sticky top-32 space-y-6">
        <nav className="space-y-1 border-l border-zinc-800 pl-4" aria-label="Sections">
          {[
            ["About", "#profile"],
            ["Builds", "#builds"],
            ["Experience", "#experience"],
            ["Connect", "#connect"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="block py-1 font-stamp text-xs text-fg-dim transition hover:translate-x-0.5 hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="rounded-xl border border-zinc-800 bg-paper p-3 font-stamp text-[11px] text-fg-dim">
          <p className="uppercase text-fg-faint">github · live</p>
          <p className="mt-2">
            <span className="text-lg font-bold text-accent">★ {data.totalStars}</span>
          </p>
          <p className="mt-1">{data.repoCount} public repos</p>
          <p>{data.longestStreak}d longest streak</p>
        </div>
      </div>
    </aside>
  );
}
