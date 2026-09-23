"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "@/data/portfolio";
import { basePath } from "@/lib/site";
import { useUiSound } from "@/hooks/useUiSound";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

function scrollTo(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

/** ⌘K palette: sections, case studies, email copy, resume, sound. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const { blip } = useUiSound();

  const items: Item[] = useMemo(
    () => [
      { id: "about", group: "Go to", label: "About", run: () => scrollTo("profile") },
      { id: "builds", group: "Go to", label: "Builds", run: () => scrollTo("builds") },
      { id: "exp", group: "Go to", label: "Experience", run: () => scrollTo("experience") },
      { id: "connect", group: "Go to", label: "Connect", run: () => scrollTo("connect") },
      ...projects.map((p) => ({
        id: `case-${p.name}`,
        group: "Case study",
        label: `${p.name} — case study`,
        hint: "↵",
        run: () => {
          window.location.href = `${basePath}/projects/${p.name.toLowerCase()}/`;
        },
      })),
      {
        id: "email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          const done = () => blip(880);
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(profile.email).then(done).catch(done);
          } else {
            done();
          }
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download resume (PDF)",
        run: () => {
          const a = document.createElement("a");
          a.href = `${basePath}/resume.pdf`;
          a.download = "Shanmukha_Kiran_Sagar_Resume.pdf";
          a.click();
        },
      },
      {
        id: "sound",
        group: "Actions",
        label: "Toggle UI sounds",
        run: () => window.dispatchEvent(new CustomEvent("toggle-sound")),
      },
    ],
    [blip]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.group} ${i.label}`.toLowerCase().includes(q));
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        lastFocus.current = document.activeElement as HTMLElement | null;
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    const onOpen = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, query ]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const choose = (i: Item) => {
    blip(660);
    close();
    // run after close so focus restore + navigation don't fight
    setTimeout(() => i.run(), 0);
  };

  return (
    <div
      className="fixed inset-0 z-[65] flex items-start justify-center bg-black/70 p-4 pt-[15vh]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-700 bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % Math.max(filtered.length, 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
            } else if (e.key === "Enter" && filtered[active]) {
              choose(filtered[active]);
            }
          }}
          placeholder="jump to a section, a case study, an action…"
          aria-label="Search commands"
          className="w-full border-b border-zinc-800 bg-transparent px-4 py-3 font-stamp text-sm text-foreground placeholder:text-fg-faint focus:outline-none"
        />
        <ul className="max-h-72 overflow-y-auto p-2" role="listbox" aria-label="Commands">
          {filtered.map((i, idx) => (
            <li key={i.id} role="option" aria-selected={idx === active}>
              <button
                onMouseMove={() => setActive(idx)}
                onClick={() => choose(i)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                  idx === active ? "bg-accent text-accent-ink" : "text-zinc-200"
                }`}
              >
                <span>
                  <span className={`font-stamp text-[10px] uppercase ${idx === active ? "opacity-70" : "text-fg-faint"}`}>
                    {i.group}
                  </span>
                  <span className="block font-medium">{i.label}</span>
                </span>
                {i.hint && <span className="font-stamp text-[11px] opacity-70">{i.hint}</span>}
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-4 text-sm text-fg-dim">nothing matches — try “resume”.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
