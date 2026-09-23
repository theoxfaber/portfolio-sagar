import type { ReactNode } from "react";

type Props = {
  href: string;
  previewTitle: string;
  previewDesc: string;
  children: ReactNode;
};

/** Link that pops a preview card on hover — the signature interaction. */
export default function HoverLink({ href, previewTitle, previewDesc, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group relative underline decoration-accent/60 decoration-2 underline-offset-4 hover:text-accent">
      {children}
      <span className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-64 rounded-xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl group-hover:block">
        <span className="block font-stamp text-[10px] uppercase text-fg-faint">
          {new URL(href).hostname.replace("www.", "")}
        </span>
        <span className="mt-1 block text-sm font-semibold text-zinc-100">{previewTitle}</span>
        <span className="mt-1 block text-xs leading-relaxed text-fg-dim">{previewDesc}</span>
      </span>
    </a>
  );
}
