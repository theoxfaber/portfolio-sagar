"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  className?: string;
};

/** Typewriter that types once, then leaves a blinking caret. */
export default function Typewriter({ text, speed = 34, className = "" }: Props) {
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    if (count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [count, text, speed]);

  const shown = reduced ? text : text.slice(0, count);
  const done = reduced || count >= text.length;

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{shown}</span>
      <span
        aria-hidden
        className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent ${done ? "animate-pulse" : ""}`}
      />
    </span>
  );
}
