"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { featuredProjects } from "@/data/profile";
import { cypherVoiceCommands } from "@/data/cypherData";
import CypherGallery from "./cypher/CypherGallery";
import CypherArchitecture from "./cypher/CypherArchitecture";
import CypherCommands from "./cypher/CypherCommands";
import CypherQuickStart from "./cypher/CypherQuickStart";

export default function CypherShowcase() {
  const cypher = featuredProjects.find((p) => p.title === "Cypher AI");
  const screenshots = cypher?.screenshots || [];

  const downloadUrl =
    cypher?.downloadUrl ||
    "https://github.com/pattanayakpratik/Cypher-AI/releases/latest/download/Cypher-AI.exe";
  const releaseUrl =
    cypher?.releaseUrl || "https://github.com/pattanayakpratik/Cypher-AI/releases/latest";
  const repoUrl = cypher?.repo || "https://github.com/pattanayakpratik/Cypher-AI";

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
            <span className="text-[var(--white-icon)]">CYPHER PROTOCOL ONLINE</span>
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
            F.R.I.D.A.Y. DESKTOP HUD
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            Standalone Windows x64
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Cypher AI <span className="text-[var(--sec)] font-light">Desktop HUD</span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--white-icon)] max-w-3xl leading-relaxed">
          Inspired by Tony Stark&apos;s F.R.I.D.A.Y., Cypher transforms your Windows desktop into an
          advanced holographic command center. Built with Python and PyQt5, it combines a reactive
          vector-rendered Arc Reactor core, real-time psutil hardware telemetry, an interactive
          credentials vault, and dual Gemini + Groq AI voice intelligence.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <a
            href={downloadUrl}
            download="Cypher-AI.exe"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-semibold text-sm shadow-md hover:scale-105 transition-transform"
          >
            <span>Download Cypher-AI.exe (176 MB)</span>
            <span className="text-xs opacity-80">Windows</span>
          </a>

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-sm font-medium text-[var(--white)] transition-colors"
          >
            <span>GitHub Repository</span>
            <span className="text-xs">↗</span>
          </a>

          <a
            href={releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
          >
            <span>Releases</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </header>

      {/* Interactive Screenshot & HUD State Gallery */}
      <CypherGallery screenshots={screenshots} />

      {/* Engineering Architecture & Core Features */}
      <CypherArchitecture />

      {/* Voice Command Matrix */}
      <CypherCommands commands={cypherVoiceCommands} />

      {/* 3-Step Windows Quickstart Guide */}
      <CypherQuickStart />

      {/* Final Download CTA Footer */}
      <footer className="text-center p-8 md:p-12 rounded-3xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Command Cypher?</h3>
        <p className="text-xs sm:text-sm text-[var(--white-icon)] max-w-xl mx-auto mb-6">
          Download the latest Windows standalone executable and bring Tony Stark&apos;s
          F.R.I.D.A.Y. to your workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={downloadUrl}
            download="Cypher-AI.exe"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-sm md:text-base shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download Standalone Cypher-AI.exe</span>
          </a>

          <Link
            href="/#projects"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-xs md:text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
          >
            Back to All Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}
