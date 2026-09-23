"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ui-sound";

/** Tiny WebAudio blip kit. Off by default, persisted in localStorage. */
export function useUiSound() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(KEY) === "on");
    } catch {
      /* private mode — stay muted */
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(KEY, next ? "on" : "off");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const blip = useCallback(
    (freq = 660) => {
      if (!enabled) return;
      try {
        const Ctx = window.AudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
        osc.onended = () => void ctx.close();
      } catch {
        /* audio unavailable — stay silent */
      }
    },
    [enabled]
  );

  return { enabled, toggle, blip };
}
