"use client";

import SoundToggle from "./SoundToggle";

/** Right side of the nav: palette hint pill + sound toggle. */
export default function NavActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
        aria-label="Open command palette"
        title="Command palette (⌘K)"
        className="rounded-full border border-zinc-700 px-2.5 py-1 font-stamp text-xs text-fg-dim transition hover:border-accent hover:text-accent"
      >
        ⌘K
      </button>
      <SoundToggle />
    </div>
  );
}
