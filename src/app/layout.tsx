import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import BootSequence from "@/components/BootSequence";
import CommandPalette from "@/components/CommandPalette";
import Cursor from "@/components/Cursor";
import ProgressBar from "@/components/ProgressBar";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shanmukha Kiran Sagar · Rust systems builder",
  description:
    "Systems programmer working in Rust — browser automation, GPU compute runtimes, LLM inference, workflow engines, Solana and Ethereum tooling. B.Tech AI/DS @ Parul '28.",
  openGraph: {
    title: "Shanmukha Kiran Sagar · Rust systems builder",
    description:
      "I build fast tools in Rust: browser automation, compute runtimes, workflow engines, on-chain tooling.",
    url: siteUrl,
    type: "profile",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shanmukha Kiran Sagar · Rust systems builder",
    description:
      "I build fast tools in Rust: browser automation, compute runtimes, workflow engines, on-chain tooling.",
    images: ["/opengraph-image"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shanmukha Kiran Sagar",
  alternateName: "theoxfaber",
  url: siteUrl,
  jobTitle: "Systems programmer",
  knowsAbout: ["Rust", "Tokio", "WGPU", "SQLite", "Solana", "Ethereum", "LLM inference"],
  sameAs: ["https://github.com/theoxfaber", "https://www.linkedin.com/in/shanmukhkiransagar/"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ProgressBar />
        <Cursor />
        <BootSequence />
        <CommandPalette />
        <div className="grain-overlay" aria-hidden />
        {children}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
