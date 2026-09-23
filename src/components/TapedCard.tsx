"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: BASE_ROTATE[tilt] }}
      whileInView={{ opacity: 1, y: 0, rotate: BASE_ROTATE[tilt] }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl border border-zinc-800 bg-[#141417] p-5 shadow-xl ${className}`}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
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
