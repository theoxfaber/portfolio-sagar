export type Project = {
  name: string;
  tagline: string;
  blurb: string;
  stack: string[];
  stars: string;
  href: string;
  badge?: string;
  tilt: "left" | "right";
  tape: "" | "tape-pink" | "tape-blue";
};

export const profile = {
  name: "Shanmukha Kiran Sagar",
  handle: "theoxfaber",
  avatar: "https://avatars.githubusercontent.com/u/167290171?v=4",
  role: "Systems programmer · Rust",
  flex: "I build fast tools in Rust · B.Tech AI/DS @ Parul '28",
  email: "shanmukhkiransagar@gmail.com",
  github: "https://github.com/theoxfaber",
  linkedin: "https://www.linkedin.com/in/shanmukhkiransagar/",
  bullets: [
    "I'm Shanmukha — I write Rust: browser automation, compute runtimes, workflow engines, and tooling for Solana and Ethereum.",
    "ferrous-browser is my most-used build: an async client for the Chrome DevTools Protocol, so I can automate browsers without installing Node.js.",
    "I like software with no setup step: one binary, SQLite instead of a daemon, an undo button instead of an apology.",
    "From Dec '25 to May '26 I evaluated AI coding agents at Alignerr — reading agent-written diffs for correctness, scope, and judgement.",
    "My payment-risk proxy was shortlisted at the Razorpay AI Buildathon 2026 — it sits between AI agents and real money and decides what gets to go through.",
    "I'm open to 6–12 month internships from October 2026, in Bangalore or remote.",
  ],
};

export const projects: Project[] = [
  {
    name: "ferrous-browser",
    tagline: "browser automation in Rust, no Node.js",
    blurb:
      "An async client for the Chrome DevTools Protocol on Tokio: typed commands, sessions, connection pooling. Written because automating a browser shouldn't need a whole JS runtime.",
    stack: ["Rust", "Tokio", "CDP"],
    stars: "31",
    href: "https://github.com/theoxfaber/ferrous-browser",
    badge: "most starred",
    tilt: "left",
    tape: "",
  },
  {
    name: "aether",
    tagline: "a compute runtime that can also run LLMs",
    blurb:
      "A DAG-based compute runtime with reverse-mode autograd and kernel-fusion passes, running on CPU and GPU via WGPU. Loads GGUF models, does quantized matmul with GQA attention and KV-caching, and serves it all behind an OpenAI-compatible API.",
    stack: ["Rust", "WGPU", "GGUF"],
    stars: "10",
    href: "https://github.com/theoxfaber/aether",
    badge: "70+ tests",
    tilt: "right",
    tape: "tape-blue",
  },
  {
    name: "ironflow",
    tagline: "a workflow runner in a single file",
    blurb:
      "Define a DAG, run it concurrently, survive restarts via SQLite/WAL, retry what fails, watch it in the built-in dashboard. No daemon to install, no YAML engine to learn.",
    stack: ["Rust", "SQLite", "Axum"],
    stars: "8",
    href: "https://github.com/theoxfaber/ironflow",
    tilt: "left",
    tape: "tape-pink",
  },
  {
    name: "mev-arbitrage-bot",
    tagline: "an experiment in on-chain arbitrage",
    blurb:
      "Finds multi-hop arbitrage paths with Bellman-Ford negative-cycle detection, simulates fills locally with revm instead of waiting on RPCs, and routes execution through Aave flash loans. Paper-trading first, obviously.",
    stack: ["Rust", "revm", "Aave"],
    stars: "6",
    href: "https://github.com/theoxfaber/mev-arbitrage-bot",
    badge: "experiment",
    tilt: "right",
    tape: "",
  },
  {
    name: "agentic-payment-risk-governor",
    tagline: "a bouncer between AI agents and real money",
    blurb:
      "Shortlisted at the Razorpay AI Buildathon 2026. Every payment intent goes through policy gates, anomaly and drift checks, collusion-graph analysis, and calibrated risk control — then gets ALLOW, REVIEW, or BLOCK. 205 tests; caught every synthetic attack with zero false blocks on 972 normal cases.",
    stack: ["Rust", "Axum", "React", "MCP"],
    stars: "1",
    href: "https://github.com/theoxfaber/agentic-payment-risk-governor",
    badge: "shortlisted · Razorpay '26",
    tilt: "left",
    tape: "tape-blue",
  },
  {
    name: "filemind",
    tagline: "a file organizer with an undo button",
    blurb:
      "A content-aware classifier that sorts your files deterministically and explains its confidence for each move. No AI calls, no network, and everything is reversible.",
    stack: ["Rust", "CLI", "TOML"],
    stars: "3",
    href: "https://github.com/theoxfaber/filemind",
    tilt: "right",
    tape: "tape-pink",
  },
];

export const experience = [
  {
    org: "Alignerr (Labelbox)",
    role: "AI Coding Agent Evaluator · Contract, Remote",
    time: "Dec 2025 – May 2026",
    points: [
      "Evaluated AI coding agents on realistic repo work: debugging, refactoring, features, review, testing.",
      "Graded correctness, scope, safety, honesty, and whether the agent actually followed instructions.",
    ],
  },
  {
    org: "Razorpay AI Buildathon 2026",
    role: "Shortlisted",
    time: "2026",
    points: [
      "Shortlisted for the Agentic Payment Risk Governor — a zero-trust proxy for agent-initiated payments.",
      "Shipped with a live triage demo, 205 passing tests, and a full write-up of the risk methodology.",
    ],
  },
  {
    org: "Parul University",
    role: "B.Tech, Artificial Intelligence & Data Science",
    time: "Expected 2028",
    points: [
      "Coursework: data structures & algorithms, DBMS, operating systems, machine learning, probability & statistics.",
    ],
  },
];

export type Sticker = {
  src: string;
  alt: string;
  label: string;
  rotate: number;
  cls: string;
  /** diecut = transparent PNG with outline filter, print = photo/print with white frame */
  style: "diecut" | "print";
};

export const stickers: Sticker[] = [
  { src: "/stickers/ferris.png", alt: "Ferris the crab", label: "ferris, my manager", rotate: -6, cls: "h-16", style: "diecut" },
  { src: "/stickers/frog.jpg", alt: "Frog catching a fly", label: "bug hunter", rotate: 4, cls: "h-24", style: "print" },
  { src: "/stickers/mush.jpg", alt: "Mushroom friends", label: "mushroom break", rotate: -4, cls: "h-24", style: "print" },
  { src: "/stickers/smiley.jpg", alt: "Melting smiley", label: "friday deploy mood", rotate: 5, cls: "h-20", style: "print" },
  { src: "/stickers/sushi.png", alt: "Salmon sushi", label: "accepts sushi bribes", rotate: -5, cls: "h-16", style: "diecut" },
  { src: "/stickers/dino.png", alt: "Stegosaurus", label: "emotional support dino", rotate: 3, cls: "w-32", style: "diecut" },
];
