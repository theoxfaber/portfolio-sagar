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

export type Metric = { label: string; value: string };

export type CaseStudy = {
  problem: string;
  approach: string[];
  architecture: string[];
  result: string;
  lessons: string[];
  metrics: Metric[];
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

export const caseStudies: Record<string, CaseStudy> = {
  "ferrous-browser": {
    problem:
      "Every browser-automation task pulled in Node.js, Puppeteer, and a few hundred megabytes of dependencies — even when the actual work was sending a dozen JSON messages over a websocket.",
    approach: [
      "Spoke the Chrome DevTools Protocol directly over async websockets with Tokio — no runtime in between.",
      "Typed the protocol surface I actually use (targets, sessions, page/runtime/domains) instead of code-generating all of CDP.",
      "Built session pooling and connection reuse in from the start, because automation scripts open far more sessions than you'd think.",
    ],
    architecture: [
      "transport/   websocket framing, reconnect, message routing by session id",
      "session/     target attach, session lifecycle, concurrent command multiplexing",
      "commands/    typed page, runtime, network and dom domain calls",
      "pool/        connection pool with idle eviction",
    ],
    result:
      "Became my most-starred repo (31 stars) and the tool I reach for first. It also taught me more about how browsers actually work than any frontend work ever did.",
    lessons: [
      "Protocols beat SDKs: speaking CDP directly removed a whole layer of version-chasing.",
      "Typing only the surface you use beats generating everything — smaller API, fewer breaking changes.",
    ],
    metrics: [
      { label: "stars", value: "31" },
      { label: "forks", value: "3" },
      { label: "node required", value: "0" },
    ],
  },
  aether: {
    problem:
      "I wanted to understand what an LLM inference stack actually does — schedulers, autograd, quantized kernels, KV-caching — and reading papers wasn't making it stick. So I built one.",
    approach: [
      "Started with a DAG compute runtime and reverse-mode autograd on CPU, with optimization and kernel-fusion passes.",
      "Added GPU execution through WGPU so the same graph runs on Metal and other backends.",
      "Layered GGUF loading, quantized matmul, GQA attention and KV-caching on top, served behind an OpenAI-compatible API with rate limiting and Prometheus metrics.",
    ],
    architecture: [
      "graph/      dag definition, topological scheduling, concurrent dispatch",
      "autograd/   reverse-mode tape, fusion + optimization passes",
      "backend/    cpu kernels · wgpu/metal kernels selected per op",
      "models/     gguf loader, quantized matmul, gqa attention, kv-cache",
      "serve/      openai-compatible http api, rate limits, /metrics",
    ],
    result:
      "70+ tests including CPU/GPU cosine-similarity checks that keep the two backends honest with each other. It streams tokens today.",
    lessons: [
      "Numerical tests between backends catch entire classes of kernel bugs.",
      "Inference is mostly memory logistics; the matmul is the easy part.",
    ],
    metrics: [
      { label: "stars", value: "10" },
      { label: "tests", value: "70+" },
      { label: "backends", value: "CPU + GPU" },
    ],
  },
  ironflow: {
    problem:
      "Small automation jobs don't need Airflow, a message broker, and a daemon that must be kept alive — they need a DAG runner you can start, stop, and forget about.",
    approach: [
      "One static binary: define the DAG, run tasks concurrently with retries, persist everything in SQLite/WAL.",
      "Crash-safety from the database, not from a supervisor — restart mid-pipeline and it resumes.",
      "Embedded dashboard served from the same binary so there's nothing else to deploy.",
    ],
    architecture: [
      "dag/        parsing, validation, topological order",
      "exec/       concurrent runner, retries with backoff",
      "store/      sqlite/wal persistence, resume on restart",
      "api + ui/   rest api and embedded dashboard",
    ],
    result:
      "The repo README publishes a benchmark methodology: a 50-task sequential pipeline at ~85 ms and ~12 MB peak. Single file in, results out.",
    lessons: [
      "SQLite is absurdly underused as an application database for single-node tools.",
      "Crash recovery is a storage problem, not a process problem.",
    ],
    metrics: [
      { label: "stars", value: "8" },
      { label: "50-task pipeline", value: "~85 ms" },
      { label: "peak memory", value: "~12 MB" },
    ],
  },
  "mev-arbitrage-bot": {
    problem:
      "Arbitrage dies in RPC round-trips: by the time you've simulated a multi-hop trade over the network, the opportunity is gone. And Python's GIL is the wrong tool for microsecond order-book work.",
    approach: [
      "Detect multi-hop paths with Bellman-Ford negative-cycle detection over the token graph.",
      "Simulate fills locally with revm — zero RPC latency during the decision.",
      "Execute atomically through Aave V3 flash loans with parallel multi-relay Flashbots bundle submission.",
    ],
    architecture: [
      "graph/      token/pool graph, bellman-ford cycle search",
      "sim/        local revm simulation of candidate fills",
      "exec/       aave v3 flash-loan execution, flashbots bundles",
    ],
    result:
      "A complete production-shaped engine that stays honest about what it is: an experiment. Paper-trading first, real money only after the simulator earns it.",
    lessons: [
      "Latency budgets decide architecture more than features do.",
      "Local simulation beats faster networking — eliminate the round trip entirely.",
    ],
    metrics: [
      { label: "stars", value: "6" },
      { label: "simulation", value: "local revm" },
      { label: "mode", value: "paper-trading" },
    ],
  },
  "agentic-payment-risk-governor": {
    problem:
      "Give an AI agent a payment API key and you get two failure modes: agents that lie about what they did, and agents (or users) that collude through rings of fake merchants. Both move real money.",
    approach: [
      "Never hand agents the keys: a zero-trust proxy holds Razorpay secrets and adjudicates every intent as ALLOW / REVIEW / BLOCK.",
      "Four planes: deterministic policy gates, anomaly + drift detection (z-score, PSI), sybil-graph analysis (union-find), and calibrated logistic regression with Conformal Risk Control.",
      "Fintech invariants throughout: integer-paise math, fail-closed balance checks, composite idempotency, HMAC webhooks, tamper-evident audit ledger.",
    ],
    architecture: [
      "proxy/      authenticated rest + mcp, key isolation",
      "gates/      deterministic policy checks (fail-closed)",
      "detect/     anomaly scores, psi drift, sybil union-find",
      "decide/     calibrated regression + conformal risk control",
      "ledger/     sha-256 tamper-evident audit trail + triage ui",
    ],
    result:
      "Shortlisted at the Razorpay AI Buildathon 2026. 205 offline tests; 100% precision and recall on held-out synthetic abuse, 99.4% recall over 140 randomized runs, zero false-positive blocks on 972 normal cases.",
    lessons: [
      "Deterministic gates first, ML second — the boring checks catch most abuse.",
      "Money math in integers or not at all.",
    ],
    metrics: [
      { label: "tests", value: "205" },
      { label: "synthetic abuse caught", value: "100%" },
      { label: "false blocks (972 cases)", value: "0" },
    ],
  },
  filemind: {
    problem:
      "Downloads folders go to die. AI organizers phone your file list to someone's cloud, and rule-based ones silently misfile things with no way back.",
    approach: [
      "A deterministic 3-tier classifier — content signatures first, then names and metadata — with an explainable confidence score per move.",
      "Every run is fully reversible: an undo log restores the exact prior state.",
      "Configured in TOML, runs offline, ships as one binary.",
    ],
    architecture: [
      "scan/       content hashing + type signatures",
      "classify/   3-tier rules with confidence scores",
      "apply/      move journal with full undo",
      "config/     toml profiles per directory",
    ],
    result:
      "A tool I actually run on my own machine: zero network calls, every decision explained, every mistake undoable.",
    lessons: [
      "Explainability is a feature, not documentation — showing the confidence score builds trust per file.",
      "Undo beats accuracy: users forgive a wrong move they can reverse.",
    ],
    metrics: [
      { label: "stars", value: "3" },
      { label: "network calls", value: "0" },
      { label: "undo", value: "full" },
    ],
  },
};

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
  width: number;
  height: number;
  /** diecut = transparent PNG with outline filter, print = photo/print with white frame */
  style: "diecut" | "print";
};

export const stickers: Sticker[] = [
  { src: "/stickers/ferris.png", alt: "Ferris the crab", label: "ferris, my manager", rotate: -6, cls: "h-16", width: 460, height: 307, style: "diecut" },
  { src: "/stickers/frog.jpg", alt: "Frog catching a fly", label: "bug hunter", rotate: 4, cls: "h-24", width: 508, height: 903, style: "print" },
  { src: "/stickers/mush.jpg", alt: "Mushroom friends", label: "mushroom break", rotate: -4, cls: "h-24", width: 574, height: 600, style: "print" },
  { src: "/stickers/smiley.jpg", alt: "Melting smiley", label: "friday deploy mood", rotate: 5, cls: "h-20", width: 1000, height: 1000, style: "print" },
  { src: "/stickers/sushi.png", alt: "Salmon sushi", label: "accepts sushi bribes", rotate: -5, cls: "h-16", width: 400, height: 400, style: "diecut" },
  { src: "/stickers/dino.png", alt: "Stegosaurus", label: "emotional support dino", rotate: 3, cls: "w-32", width: 500, height: 348, style: "diecut" },
];
