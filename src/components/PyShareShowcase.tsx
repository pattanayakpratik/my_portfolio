"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { featuredProjects } from "@/data/profile";
import { pyshareComparisonModes, pyshareQuickSteps } from "@/data/pyshareData";
import PyShareGallery from "./pyshare/PyShareGallery";
import PyShareModes from "./pyshare/PyShareModes";
import PyShareArchitecture from "./pyshare/PyShareArchitecture";
import PyShareQuickStart from "./pyshare/PyShareQuickStart";

export default function PyShareShowcase() {
  const pyshare = featuredProjects.find((p) => p.title === "PyShare");
  const screenshots = pyshare?.screenshots || [];

  const liveUrl = pyshare?.liveUrl || "https://pyshare.vercel.app";
  const downloadUrl =
    pyshare?.downloadUrl ||
    "https://github.com/pattanayakpratik/PyShare/releases/latest/download/PyShare.exe";
  const releaseUrl =
    pyshare?.releaseUrl || "https://github.com/pattanayakpratik/PyShare/releases/latest";
  const repoUrl = pyshare?.repo || "https://github.com/pattanayakpratik/PyShare";

  const comparisonModes = pyshareComparisonModes(liveUrl, downloadUrl);

  return (
    <div className="min-h-screen py-10 max-w-5xl mx-auto text-[var(--white)] animate-terminal-fade">
      {/* Top Nav Back Bar */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--white-icon-tr)]">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors group cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--component-bg)] border border-[var(--white-icon-tr)] text-xs font-mono">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[var(--white-icon)]">P2P NETWORK READY</span>
          </div>

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-xs font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
          >
            <span>GitHub</span>
            <span className="text-xs">↗</span>
          </a>

          <ThemeToggle />
        </div>
      </div>

      {/* Hero Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[var(--sec)]/15 text-[var(--sec)] border border-[var(--sec)]/30">
            HYBRID P2P ECOSYSTEM
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            WebRTC + Python Socket LAN
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          PyShare <span className="text-[var(--sec)] font-light">Cross-Platform P2P</span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--white-icon)] max-w-3xl leading-relaxed">
          High-performance peer-to-peer file transfer and universal clipboard beam system. Share
          unlimited files, photos, 4K videos, and text across Windows, macOS, Linux, iOS, and
          Android with zero cloud intermediates, zero logins, and zero file size limits.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-semibold text-sm shadow-md hover:scale-105 transition-transform"
          >
            <span>Launch Web App (Zero Install)</span>
            <span className="text-xs">↗</span>
          </a>

          <a
            href={downloadUrl}
            download="PyShare.exe"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-sm font-medium text-[var(--white)] transition-colors"
          >
            <span>Download PyShare.exe</span>
            <span className="text-xs opacity-60">Windows</span>
          </a>

          <a
            href={releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
          >
            <span>Changelog</span>
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* Quick Highlights Pill Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          <div className="p-3 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)]">
            <div className="text-xs font-mono text-[var(--sec)] mb-0.5">SPEED</div>
            <div className="text-sm font-semibold text-[var(--white)]">50–100 MB/s LAN</div>
          </div>
          <div className="p-3 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)]">
            <div className="text-xs font-mono text-[var(--sec)] mb-0.5">SIZE LIMIT</div>
            <div className="text-sm font-semibold text-[var(--white)]">Zero File Limits</div>
          </div>
          <div className="p-3 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)]">
            <div className="text-xs font-mono text-[var(--sec)] mb-0.5">PRIVACY</div>
            <div className="text-sm font-semibold text-[var(--white)]">100% P2P · Zero Cloud</div>
          </div>
          <div className="p-3 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)]">
            <div className="text-xs font-mono text-[var(--sec)] mb-0.5">PAIRING</div>
            <div className="text-sm font-semibold text-[var(--white)]">Dynamic QR + PIN</div>
          </div>
        </div>
      </header>

      {/* Interactive Screenshot & State Gallery */}
      <PyShareGallery screenshots={screenshots} />

      {/* Two Ways to Use PyShare (Comparison Matrix) */}
      <PyShareModes modes={comparisonModes} />

      {/* Engineering Architecture & Core Features */}
      <PyShareArchitecture />

      {/* Quick Start Guide */}
      <PyShareQuickStart steps={pyshareQuickSteps} />

      {/* Bottom CTA Banner */}
      <section className="p-8 md:p-10 rounded-2xl border border-[var(--sec)]/40 bg-gradient-to-r from-[var(--component-bg)] via-[var(--card-bg)] to-[var(--component-bg)] text-center relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3">
          Ready to Share Files Across Your Devices?
        </h3>
        <p className="text-xs sm:text-sm text-[var(--white-icon)] max-w-xl mx-auto mb-6">
          Try the instant Web P2P mode in your browser with zero installs, or download the portable
          standalone Windows executable.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-sm shadow-md hover:scale-105 transition-transform"
          >
            <span>🌐 Open Web App (pyshare.vercel.app)</span>
            <span className="text-xs">↗</span>
          </a>

          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] hover:bg-[var(--white-icon-tr)] text-xs sm:text-sm font-semibold text-[var(--white)] transition-colors"
          >
            <span>⬇️ Download PyShare.exe</span>
          </a>

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] hover:bg-[var(--white-icon-tr)] text-xs sm:text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
          >
            <span>GitHub Repo</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
