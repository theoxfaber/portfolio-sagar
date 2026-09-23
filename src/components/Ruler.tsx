const ticks = Array.from({ length: 24 }, (_, i) => (i + 1) * 15);

function Row() {
  return (
    <div className="flex shrink-0 items-end gap-6 pr-6">
      {ticks.map((t) => (
        <div key={t} className="flex flex-col items-center">
          <span className="font-stamp text-[10px] text-fg-faint">{t}°</span>
          <span
            className="block w-px bg-zinc-700"
            style={{ height: t % 45 === 0 ? 18 : 10 }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Ruler() {
  return (
    <div className="overflow-hidden border-b border-zinc-800 bg-black/60 py-1" aria-hidden>
      <div className="ruler-track flex w-max">
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
