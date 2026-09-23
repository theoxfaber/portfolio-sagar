"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { motionTokens } from "@/lib/motion";

/** Lime dot + trailing ring. Fine pointers only — touch devices never see it. */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (reduce || window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHot(!!(e.target as HTMLElement | null)?.closest?.("a, button"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hot ? 1.9 : 1, opacity: hot ? 0.9 : 0.45 }}
        transition={motionTokens.snappy}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-7 w-7 rounded-full border border-accent"
      />
    </>
  );
}
