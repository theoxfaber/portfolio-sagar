"use client";

import { useEffect, useState } from "react";

const KEY = "boot-done";
const MAX_MS = 1500;

const LINES = ["> whoami", "theoxfaber", "> cargo run portfolio", "compiled in 0.42s — welcome in"];

/**
 * 1.5s-max terminal boot on first load per session.
 * Any key/click skips. Never replays. Reduced-motion skips entirely.
 */
export default function BootSequence() {
  const [show, setShow] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !sessionStorage.getItem(KEY)
  );
  const [lines, setLines] = useState(0);

  useEffect(() => {
    if (!show) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLines(i + 1), 200 + i * 280));
    });
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        setShow(false);
      }, MAX_MS)
    );
    const skip = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setShow(false);
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background"
      onClick={() => setShow(false)}
      aria-hidden
    >
      <div className="w-72 font-stamp text-sm">
        {LINES.slice(0, lines).map((l, i) => (
          <p key={i} className={l.startsWith(">") ? "text-fg-dim" : "text-accent"}>
            {l}
          </p>
        ))}
        <span className="mt-1 inline-block h-4 w-2 animate-pulse bg-accent" />
      </div>
    </div>
  );
}
