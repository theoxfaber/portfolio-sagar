"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

type Props = {
  children: ReactNode;
  tilt?: "left" | "right";
  tape?: string;
  className?: string;
  delay?: number;
};

const BASE_ROTATE = { left: -1.2, right: 1.1 } as const;

/** Pinned polaroid-style card: tape wipes on first, then the card settles in. */
export default function TapedCard({ children, tilt = "left", tape = "", className = "", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const rotate = BASE_ROTATE[tilt];

  if (reduce) {
    return (
      <div
        className={`relative rounded-2xl border border-zinc-800 bg-paper p-5 shadow-xl ${className}`}
      >
        <div className={`tape ${tape}`} aria-hidden />
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...motionTokens.entrance, delay }}
      className={`relative rounded-2xl border border-zinc-800 bg-paper p-5 shadow-xl ${className}`}
    >
      <motion.div
        initial={{ scaleX: 0, x: "-50%", rotate: -4 }}
        whileInView={{ scaleX: 1, x: "-50%", rotate: -4 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: delay + 0.25, ease: "easeOut" }}
        className={`tape ${tape}`}
        style={{ originX: 0.5 }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}
