"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Fade-and-rise entrance when scrolled into view. */
export default function Reveal({ children, delay = 0, y = 26, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...motionTokens.entrance, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
