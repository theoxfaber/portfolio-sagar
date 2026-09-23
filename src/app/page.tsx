import GithubHeatmap from "@/components/GithubHeatmap";
import HeroTop from "@/components/HeroTop";
import HoverLink from "@/components/HoverLink";
import Reveal from "@/components/Reveal";
import Ruler from "@/components/Ruler";
import StickerField from "@/components/StickerField";
import TapedCard from "@/components/TapedCard";
import TiltCard from "@/components/TiltCard";
import { experience, profile, projects } from "@/data/portfolio";

function Nav() {
  const links = [
    ["About", "#profile"],
    ["Builds", "#builds"],
    ["Experience", "#experience"],
    ["Connect", "#connect"],
  ];
  return (
    <nav className="sticky top-0 z-30 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-stamp text-sm font-bold text-lime-300">
          ~/theoxfaber
        </a>
        <div className="flex gap-4">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="font-stamp text-xs text-zinc-400 hover:text-lime-300">
              {label}
            </a>
          ))}
        </div>
      </div>
      <Ruler />
    </nav>
  );
}

function Hero() {
  return (
    <header id="profile" className="pt-12">
      <HeroTop />

      <TapedCard tilt="right" className="mt-8">
        <ul className="space-y-3 text-[15px] leading-relaxed text-zinc-200">
          {profile.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-lime-300">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-200">
          Flagship builds live on{" "}
          <HoverLink
            href="https://github.com/theoxfaber/ferrous-browser"
            previewTitle="ferrous-browser · 31 stars"
            previewDesc="Async Rust CDP client — browser automation with no Node.js."
          >
            ferrous-browser
          </HoverLink>
          ,{" "}
          <HoverLink
            href="https://github.com/theoxfaber/aether"
            previewTitle="aether · compute runtime + LLM inference"
            previewDesc="DAG scheduler, autograd, GGUF, OpenAI-compatible server."
          >
            aether
          </HoverLink>{" "}
          and{" "}
          <HoverLink
            href="https://github.com/theoxfaber/agentic-payment-risk-governor"
            previewTitle="agentic-payment-risk-governor"
            previewDesc="Zero-trust proxy for agent-initiated payments. 205 tests green."
          >
            risk-governor
          </HoverLink>
          .
        </p>
      </TapedCard>

      <Reveal className="mt-8">
        <GithubHeatmap />
      </Reveal>

      <Reveal className="mt-8">
        <StickerField />
      </Reveal>
    </header>
  );
}

function Builds() {
  return (
    <section id="builds" className="pt-16">
      <Reveal>
        <h2 className="text-3xl font-extrabold">Projects pinned up 📌</h2>
        <p className="mt-1 font-marker text-xl text-amber-100/80">
          hover the links — every name has a story
        </p>
      </Reveal>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {projects.map((p, i) => (
          <TiltCard key={p.name}>
          <TapedCard tilt={p.tilt} tape={p.tape} delay={(i % 2) * 0.08}>
            {p.badge && (
              <span className="mb-2 inline-block rounded-full bg-lime-300 px-2 py-0.5 font-stamp text-[10px] font-bold uppercase text-black">
                {p.badge}
              </span>
            )}
            <h3 className="text-xl font-bold">
              <HoverLink href={p.href} previewTitle={`${p.name} · ★ ${p.stars}`} previewDesc={p.blurb}>
                {p.name}
              </HoverLink>
            </h3>
            <p className="font-marker text-lg text-amber-100/90">{p.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded border border-zinc-700 px-1.5 py-0.5 font-stamp text-[10px] text-zinc-300">
                  {s}
                </span>
              ))}
              <span className="rounded border border-lime-300/40 px-1.5 py-0.5 font-stamp text-[10px] text-lime-300">
                ★ {p.stars}
              </span>
            </div>
          </TapedCard>
          </TiltCard>
        ))}
      </div>
      <p className="mt-6 text-sm text-zinc-400">
        Plus{" "}
        <HoverLink
          href="https://github.com/theoxfaber/SolVault"
          previewTitle="SolVault"
          previewDesc="Non-custodial Solana terminal wallet — BIP39, SLIP-0010, AES-256-GCM."
        >
          SolVault
        </HoverLink>{" "}
        and{" "}
        <HoverLink
          href="https://github.com/theoxfaber/arbitrage-bot"
          previewTitle="arbitrage-bot"
          previewDesc="Rust/tokio paper-trading engine for CEX arbitrage with ML confidence filter."
        >
          arbitrage-bot
        </HoverLink>{" "}
        — 25 repos total on{" "}
        <a className="underline decoration-lime-300/60 underline-offset-4 hover:text-lime-300" href="https://github.com/theoxfaber?tab=repositories" target="_blank" rel="noreferrer">
          github
        </a>
        .
      </p>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="pt-16">
      <Reveal>
        <h2 className="text-3xl font-extrabold">Experience & education 🎓</h2>
      </Reveal>
      <div className="mt-8 space-y-8">
        {experience.map((e, i) => (
          <TapedCard key={e.org} tilt="left" delay={i * 0.07}>
            <p className="font-stamp text-[11px] uppercase text-zinc-500">{e.time}</p>
            <h3 className="mt-1 text-lg font-bold">{e.org}</h3>
            <p className="font-marker text-xl text-amber-100/90">{e.role}</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-300">
              {e.points.map((pt, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-lime-300">▸</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </TapedCard>
        ))}
      </div>
      <TapedCard tilt="right" tape="tape-blue" className="mt-8">
        <h3 className="text-lg font-bold">Arsenal 🧰</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Rust", "Tokio", "Axum", "WGPU", "SQLite", "PostgreSQL", "NATS", "Python", "TypeScript", "Docker", "Prometheus", "Solana", "MCP"].map((s) => (
            <span key={s} className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-1 font-stamp text-xs text-zinc-200">
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 font-marker text-lg text-amber-100/80">
          Rust for the hot path, Python when I need to move fast, TypeScript when there&apos;s a UI to build.
        </p>
      </TapedCard>
    </section>
  );
}

function Footer() {
  return (
    <footer id="connect" className="pb-16 pt-16">
      <TapedCard tilt="left" tape="tape-pink">
        <h2 className="text-2xl font-extrabold">Say hi 👋</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Open to 6–12 month internships from Oct 2026 (Bangalore / Remote) — Rust, AI systems, backend.
          Fastest way to reach me is email.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 font-stamp text-xs">
          <a className="rounded-full bg-lime-300 px-4 py-2 font-bold text-black hover:bg-lime-200" href={`mailto:${profile.email}`}>
            email me ↗
          </a>
          <a className="rounded-full border border-zinc-600 px-4 py-2 hover:border-lime-300 hover:text-lime-300" href={profile.github} target="_blank" rel="noreferrer">
            github ↗
          </a>
          <a className="rounded-full border border-zinc-600 px-4 py-2 hover:border-lime-300 hover:text-lime-300" href={profile.linkedin} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
        </div>
      </TapedCard>
      <p className="mt-8 text-center font-stamp text-[11px] text-zinc-600">
        © 2026 {profile.name} · built with next.js · stickers: pinterest finds + rustacean.net
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <div id="top" className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-5">
        <Hero />
        <Builds />
        <Experience />
        <Footer />
      </main>
    </div>
  );
}
