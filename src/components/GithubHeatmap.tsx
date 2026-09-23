const WEEKS = 26;
const DAYS = 7;

// Deterministic pseudo-activity so the heatmap looks alive without an API token.
function intensity(week: number, day: number): number {
  const seed = (week * 31 + day * 17 + 7) % 100;
  const wave = Math.sin((week / WEEKS) * Math.PI * 2) * 18;
  const v = seed + wave;
  if (v > 82) return 4;
  if (v > 62) return 3;
  if (v > 42) return 2;
  if (v > 22) return 1;
  return 0;
}

const shades = [
  "bg-zinc-800",
  "bg-lime-950",
  "bg-lime-800",
  "bg-lime-500",
  "bg-lime-300",
];

export default function GithubHeatmap() {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-stamp text-xs text-zinc-500">
          <span className="text-zinc-200">@theoxfaber</span> · the real graph lives on github
        </p>
        <p className="font-stamp text-[10px] text-zinc-600">Less → More</p>
      </div>
      <div className="mt-2 flex gap-[3px] overflow-x-auto pb-1">
        {Array.from({ length: WEEKS }, (_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: DAYS }, (_, d) => (
              <div
                key={d}
                title={`week ${w + 1}, day ${d + 1}`}
                className={`h-[11px] w-[11px] rounded-[3px] ${shades[intensity(w, d)]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-1 font-stamp text-[10px] text-zinc-600">
        illustrative heatmap — live graph on{" "}
        <a
          className="underline decoration-lime-300/60 underline-offset-2 hover:text-lime-300"
          href="https://github.com/theoxfaber"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </p>
    </div>
  );
}
