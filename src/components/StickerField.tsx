"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { stickers } from "@/data/portfolio";

export default function StickerField() {
  const ref = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-stamp text-xs text-zinc-500">
          ↑ drag the stickers. they&apos;re yours now.
        </p>
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="rounded-full border border-zinc-700 px-3 py-1 font-stamp text-xs text-zinc-300 transition hover:border-lime-300 hover:text-lime-300"
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
            whileDrag={{ scale: 1.12, rotate: 0 }}
            whileHover={{ scale: 1.06 }}
            className="flex cursor-grab touch-none select-none flex-col items-center gap-1 active:cursor-grabbing"
            style={{ rotate: s.rotate }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              draggable={false}
              className={
                s.style === "print"
                  ? `w-auto rounded-xl bg-white p-1 shadow-[0_8px_16px_rgba(0,0,0,0.5)] ring-1 ring-black/20 ${s.cls}`
                  : `sticker-img w-auto ${s.cls}`
              }
            />
            <span className="font-marker text-lg leading-none text-amber-100">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
