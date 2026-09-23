"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/portfolio";
import MagneticButton from "./MagneticButton";
import Typewriter from "./Typewriter";

const pills = [
  { label: "github ↗", href: profile.github },
  { label: "linkedin ↗", href: profile.linkedin },
  { label: "email ↗", href: `mailto:${profile.email}` },
];

/** Hero top block: floating avatar, typed tagline, staggered social pills. */
export default function HeroTop() {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-start gap-6 sm:flex-row">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={112}
            height={112}
            priority
            className="h-28 w-28 rounded-2xl border-2 border-zinc-700 object-cover shadow-xl"
          />
        </motion.div>
      </motion.div>
      <div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="type-display font-extrabold"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-2 min-h-[1.25rem] font-stamp text-xs text-accent"
        >
          <Typewriter text={profile.flex} />
        </motion.p>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.55 } } }}
          className="mt-3 flex flex-wrap gap-3 font-stamp text-xs"
        >
          {pills.map((p) => (
            <MagneticButton key={p.label} strength={0.35}>
              <motion.a
                variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                className="block rounded-full border border-zinc-700 px-3 py-1 text-zinc-200 transition hover:border-accent hover:text-accent"
                href={p.href}
                target={p.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
              >
                {p.label}
              </motion.a>
            </MagneticButton>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
