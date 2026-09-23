import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import ProgressBar from "@/components/ProgressBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shanmukha Kiran Sagar · Rust systems builder",
  description: "Systems programmer working in Rust — browser automation, compute runtimes, workflow engines, MEV tooling. B.Tech AI/DS @ Parul '28.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProgressBar />
        <Cursor />
        <div className="grain-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
