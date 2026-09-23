# portfolio-sagar

Scrapbook-style developer portfolio for **Shanmukha Kiran Sagar** (`theoxfaber`) —
Rust systems programmer: browser automation, GPU compute runtimes, LLM inference,
workflow engines, Solana/Ethereum tooling.

Live: `https://portfolio-sagar.vercel.app` (set `NEXT_PUBLIC_SITE_URL` to override).

## Stack

- **Next.js 16** (App Router, ISR) + **Tailwind CSS 4** + **Framer Motion 13**
- Raw **WebGL2** fragment-shader hero backdrop (no 3D library)
- Hand-rolled **⌘K command palette**, magnetic buttons, boot sequence, UI sounds
- Real GitHub stats at build time (contribution graph + stars/repos/streak, ISR daily)
- Per-project case-study routes at `/projects/[slug]`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (needs network for fonts + GitHub API)
npm start        # serve the production build
```

## Project layout

- `src/app/page.tsx` — single-page composition (hero, builds, experience, footer)
- `src/app/projects/[slug]/page.tsx` — case-study routes (problem → approach → architecture → result → lessons)
- `src/data/portfolio.ts` — all copy: profile, projects, case studies, experience, stickers
- `src/components/` — `TapedCard`, `TiltCard`, `Reveal`, `HoverLink`, `StickerField`,
  `ShaderBackdrop`, `CommandPalette`, `MagneticButton`, `BootSequence`, `SoundToggle`,
  `GithubHeatmap`, `RailStats`, `HeroTop`, `Typewriter`, `ProgressBar`, `Cursor`
- `src/lib/` — `site.ts` (canonical URL), `motion.ts` (motion tokens), `github.ts` (API)
- `public/stickers/` — sticker art + `CREDITS.md`
- `public/resume.pdf` — downloadable resume (linked in footer + palette)

## Conventions

- Design tokens live in `src/app/globals.css` (`--bg`, `--fg`, `--accent`, …) and are
  exposed as Tailwind utilities (`bg-accent`, `text-fg-dim`). Don't use raw `lime-*` /
  `zinc-*` for text — route through tokens so contrast stays AA-safe.
- Motion presets live in `src/lib/motion.ts`. Every animated component honors
  `prefers-reduced-motion` — no exceptions.
- No fabricated numbers anywhere: stats come from the GitHub API at build time with
  an honestly-labeled fallback when offline.
