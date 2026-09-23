import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HoverLink from "@/components/HoverLink";
import TapedCard from "@/components/TapedCard";
import { caseStudies, projects } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

export const revalidate = 86400;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.name.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.name.toLowerCase() === slug);
  if (!project || !caseStudies[project.name]) return { title: "Case study" };
  return {
    title: `${project.name} · case study`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} · case study`,
      description: project.tagline,
      url: `${siteUrl}/projects/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.name.toLowerCase() === slug);
  const study = project ? caseStudies[project.name] : undefined;
  if (!project || !study) notFound();

  return (
    <div id="top" className="min-h-screen">
      <main className="mx-auto max-w-3xl px-5 pb-16 pt-10">
        <Link
          href="/#builds"
          className="font-stamp text-xs text-fg-dim underline decoration-accent/60 underline-offset-4 hover:text-accent"
        >
          ← back to builds
        </Link>

        <div className="mt-6">
          <TapedCard tilt="left">
            {project.badge && (
              <span className="mb-2 inline-block rounded-full bg-accent px-2 py-0.5 font-stamp text-[10px] font-bold uppercase text-accent-ink">
                {project.badge}
              </span>
            )}
            <h1 className="type-section font-extrabold">{project.name}</h1>
            <p className="mt-1 font-marker text-xl text-amber-100/90">{project.tagline}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {study.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2">
                  <p className="text-lg font-bold text-accent">{m.value}</p>
                  <p className="font-stamp text-[10px] uppercase text-fg-faint">{m.label}</p>
                </div>
              ))}
            </div>
          </TapedCard>
        </div>

        <div className="mt-8 space-y-8">
          <TapedCard tilt="right" tape="tape-blue">
            <h2 className="text-lg font-bold">The problem</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">{study.problem}</p>
          </TapedCard>

          <TapedCard tilt="left">
            <h2 className="text-lg font-bold">The approach</h2>
            <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-zinc-200">
              {study.approach.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">▸</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </TapedCard>

          <TapedCard tilt="right" tape="tape-pink">
            <h2 className="text-lg font-bold">How it&apos;s built</h2>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-black/60 p-4 font-stamp text-xs leading-relaxed text-fg-dim">
              {study.architecture.join("\n")}
            </pre>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded border border-zinc-700 px-1.5 py-0.5 font-stamp text-[10px] text-zinc-300">
                  {s}
                </span>
              ))}
            </div>
          </TapedCard>

          <TapedCard tilt="left" tape="tape-blue">
            <h2 className="text-lg font-bold">The result</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">{study.result}</p>
          </TapedCard>

          <TapedCard tilt="right">
            <h2 className="text-lg font-bold">What it taught me</h2>
            <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-zinc-200">
              {study.lessons.map((l, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">▸</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px]">
              <HoverLink
                href={project.href}
                previewTitle={`${project.name} on GitHub`}
                previewDesc="Source, README, and the full commit history."
              >
                Read the source on GitHub
              </HoverLink>
            </p>
          </TapedCard>
        </div>
      </main>
    </div>
  );
}
