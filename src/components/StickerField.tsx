"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { stickers } from "@/data/portfolio";

export default function StickerField() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-stamp text-xs text-fg-faint">
          ↑ drag the stickers. they&apos;re yours now.
        </p>
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="rounded-full border border-zinc-700 px-3 py-1 font-stamp text-xs text-zinc-300 transition hover:border-accent hover:text-accent"
        >
          reset stickers
        </button>
      </div>
      <div
        ref={ref}
        key={resetKey}
        className="relative flex min-h-[190px] flex-wrap items-end gap-5 overflow-hidden rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/60 p-5"
      >
        {stickers.map((s) => (
          <motion.div
            key={s.label}
            drag
            dragConstraints={ref}
            dragMomentum={false}
            whileDrag={reduce ? undefined : { scale: 1.12, rotate: 0 }}
            whileHover={reduce ? undefined : { scale: 1.06 }}
            whileFocus={reduce ? undefined : { scale: 1.06 }}
            tabIndex={0}
            role="button"
            aria-label={`Draggable sticker: ${s.alt}`}
            className="flex cursor-grab touch-none select-none flex-col items-center gap-1 active:cursor-grabbing"
            style={{ rotate: s.rotate }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              draggable={false}
              className={
                s.style === "print"
                  ? `h-auto w-auto rounded-xl bg-white p-1 shadow-[0_8px_16px_rgba(0,0,0,0.5)] ring-1 ring-black/20 ${s.cls}`
                  : `sticker-img h-auto w-auto ${s.cls}`
              }
            />
            <span className="font-marker text-lg leading-none text-amber-100">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
