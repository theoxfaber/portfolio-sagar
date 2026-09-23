"use client";

import { useEffect } from "react";
import { useUiSound } from "@/hooks/useUiSound";

/** Speaker toggle for UI sounds. Also flips on the palette's "toggle-sound" event. */
export default function SoundToggle() {
  const { enabled, toggle, blip } = useUiSound();

  useEffect(() => {
    const flip = () => toggle();
    window.addEventListener("toggle-sound", flip);
    return () => window.removeEventListener("toggle-sound", flip);
  }, [toggle]);

  return (
    <button
      onClick={() => {
        toggle();
        if (!enabled) setTimeout(() => blip(660), 0);
      }}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute UI sounds" : "Unmute UI sounds"}
      title="UI sounds (off by default)"
      className="rounded-full border border-zinc-700 px-2.5 py-1 font-stamp text-xs text-fg-dim transition hover:border-accent hover:text-accent"
    >
      {enabled ? "♪ on" : "♪ off"}
    </button>
  );
}
