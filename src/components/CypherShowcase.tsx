"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { featuredProjects } from "@/data/profile";

export default function CypherShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const cypher = featuredProjects.find((p) => p.title === "Cypher");
  const screenshots = cypher?.screenshots || [];
  const totalScreens = screenshots.length;
  const activeScreen = screenshots[activeTab] || screenshots[0];

  const downloadUrl =
    cypher?.downloadUrl ||
    "https://github.com/pattanayakpratik/Cypher-AI/releases/latest/download/Cypher-AI.exe";
  const releaseUrl =
    cypher?.releaseUrl || "https://github.com/pattanayakpratik/Cypher-AI/releases/latest";
  const repoUrl = cypher?.repo || "https://github.com/pattanayakpratik/Cypher-AI";

  // Eagerly preload all screenshots into browser cache on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      screenshots.forEach((screen) => {
        const img = new window.Image();
        img.src = screen.src;
      });
    }
  }, [screenshots]);

  // Next and Previous navigation handlers
  const handleNext = useCallback(() => {
    if (totalScreens > 0) {
      setActiveTab((prev) => (prev + 1) % totalScreens);
    }
  }, [totalScreens]);

  const handlePrev = useCallback(() => {
    if (totalScreens > 0) {
      setActiveTab((prev) => (prev - 1 + totalScreens) % totalScreens);
    }
  }, [totalScreens]);

  // Auto-play switch timer (4.5s)
  useEffect(() => {
    if (!isAutoPlay || isHovered || totalScreens <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, totalScreens, handleNext, activeTab]);

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const voiceCommands = [
    {
      category: "Generative Intelligence",
      trigger: '"Cypher, explain quantum computing like I\'m five"',
      action: "Google Gemini 1.5 Flash conversational synthesis & neural voice reply",
    },
    {
      category: "System Automation",
      trigger: '"Cypher, open Visual Studio Code and Google Chrome"',
      action: "Automated app orchestration & window management",
    },
    {
      category: "Live Web & Weather",
      trigger: '"Cypher, what is the weather in Mumbai?"',
      action: "Real-time OpenWeather API lookup & verbal meteorological breakdown",
    },
    {
      category: "News Briefings",
      trigger: '"Cypher, tell me the latest technology news"',
      action: "Live NewsData API query & concise audio news briefing",
    },
    {
      category: "Communications",
      trigger: '"Cypher, send an email to..."',
      action: "Interactive voice-composed SMTP email dispatch with confirmation",
    },
    {
      category: "Hardware Diagnostics",
      trigger: '"Cypher, system status"',
      action: "Audible telemetry summary for CPU, Memory, Battery, and Disk storage",
    },
  ];

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
          vector Arc Reactor, a real-time 32-band audio spectrum equalizer, telemetry gauges, and
          Google Gemini 1.5 Flash intelligence — fully packaged into a single standalone executable.
        </p>

        {/* Hero Download Card */}
        <div className="mt-8 p-6 md:p-8 rounded-2xl border border-[var(--sec)]/40 bg-gradient-to-br from-[var(--card-bg)] via-[var(--component-bg)] to-[var(--card-bg)] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--sec)] to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--sec)] mb-1">
                <span>⚡</span>
                <span className="font-semibold uppercase tracking-wider">
                  One-Click Standalone Distribution
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--white)]">
                Download Cypher-AI.exe
              </h2>
              <p className="text-xs sm:text-sm text-[var(--white-icon)] mt-1 max-w-xl">
                Single self-contained Windows executable. No Python installation, virtual
                environments, or command lines required.
              </p>

              {/* Badges row */}
              <div className="flex items-center gap-2 mt-4 flex-wrap text-[11px] font-mono text-[var(--white-icon)]">
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">Size: 176 MB</span>
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  Windows 10 / 11 (64-bit)
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  Zero Setup Required
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  Built-in Config Vault
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-sm md:text-base shadow-lg hover:scale-105 transition-transform duration-200"
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
                <span>Download Cypher-AI.exe</span>
              </a>

              <a
                href={releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-xs md:text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
              >
                <span>Releases</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Screenshot & HUD State Gallery */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
              Holographic State Machine
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold">4 Reactive HUD States + Config Vault</h3>
          </div>

          {/* Controls: Auto-Play Toggle & Step Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setIsAutoPlay((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all cursor-pointer ${
                isAutoPlay
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-[var(--component-bg)] text-[var(--white-icon)] border-[var(--white-icon-tr)] hover:text-[var(--white)]"
              }`}
              title={isAutoPlay ? "Pause auto-switch" : "Resume auto-switch"}
            >
              <span
                className={`size-2 rounded-full ${
                  isAutoPlay && !isHovered ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
                }`}
              />
              <span>{isAutoPlay ? (isHovered ? "Paused (Hover)" : "Auto-Play ON") : "Auto-Play OFF"}</span>
            </button>

            <div className="flex items-center gap-1 bg-[var(--component-bg)] border border-[var(--white-icon-tr)] rounded-full p-0.5">
              <button
                type="button"
                onClick={handlePrev}
                className="size-7 rounded-full flex items-center justify-center text-xs text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)] transition-colors cursor-pointer"
                title="Previous Screenshot (Left Arrow)"
                aria-label="Previous screenshot"
              >
                ◀
              </button>
              <span className="text-[11px] font-mono px-1.5 text-[var(--white-icon)]">
                {activeTab + 1}/{totalScreens}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="size-7 rounded-full flex items-center justify-center text-xs text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)] transition-colors cursor-pointer"
                title="Next Screenshot (Right Arrow)"
                aria-label="Next screenshot"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* State Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
          {screenshots.map((screen, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[var(--component-bg)] text-[var(--white)] shadow-md border border-[var(--sec)]/70 ring-2 ring-[var(--sec)]/20 font-semibold scale-[1.02]"
                    : "bg-[var(--component-bg)]/60 text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--component-bg)] border border-[var(--white-icon-tr)]"
                }`}
              >
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: screen.stateColor }}
                />
                <span>{screen.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--white-icon-tr)] opacity-80">
                  {screen.shortTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Screen Viewport with Ambient Glow and Cross-Fade Layers */}
        <div
          className="relative group/viewport"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Dynamic Ambient Backglow */}
          {activeScreen && (
            <div
              className="absolute -inset-1 sm:-inset-2 rounded-3xl opacity-25 blur-2xl transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: activeScreen.stateColor }}
            />
          )}

          <div className="relative rounded-2xl overflow-hidden border border-[var(--white-icon-tr)] bg-black/90 shadow-2xl">
            {/* Live Progress Bar (when Auto-Play is active) */}
            {isAutoPlay && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-30 overflow-hidden">
                <div
                  key={activeTab}
                  className={`h-full transition-all ${isHovered ? "opacity-50" : "opacity-100"}`}
                  style={{
                    backgroundColor: activeScreen?.stateColor || "var(--sec)",
                    animation: isHovered ? "none" : "carousel-progress 4.5s linear infinite",
                  }}
                />
              </div>
            )}

            {/* Floating Navigation Chevron Overlays */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 size-10 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover/viewport:opacity-100 cursor-pointer shadow-lg hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 size-10 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover/viewport:opacity-100 cursor-pointer shadow-lg hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Layered Cross-Fade Image Container for Zero Lag */}
            <div className="relative aspect-[16/9] w-full max-h-[560px]">
              {screenshots.map((screen, idx) => {
                const isCurrent = activeTab === idx;
                return (
                  <div
                    key={screen.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={screen.src}
                      alt={screen.label}
                      fill
                      sizes="(min-width: 1024px) 1000px, 100vw"
                      className="object-contain p-2 md:p-6 select-none"
                      priority={idx === 0 || idx === 1}
                    />
                  </div>
                );
              })}

              {/* State Watermark */}
              {activeScreen && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono font-medium shadow-md">
                  <span
                    className="size-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: activeScreen.stateColor }}
                  />
                  <span className="text-white uppercase tracking-wider">
                    STATE: {activeScreen.shortTag}
                  </span>
                </div>
              )}

              {/* Quick Counter Badge */}
              <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80">
                {activeTab + 1} / {totalScreens}
              </div>
            </div>

            {/* Technical Caption Bar */}
            {activeScreen && (
              <div className="p-5 md:p-6 bg-[var(--component-bg)] border-t border-[var(--white-icon-tr)] flex items-start gap-4 z-20 relative">
                <div
                  className="size-3.5 rounded-full mt-1 shrink-0 transition-colors duration-500"
                  style={{ backgroundColor: activeScreen.stateColor }}
                />
                <div className="flex-grow">
                  <h4 className="text-sm md:text-base font-semibold text-[var(--white)]">
                    {activeScreen.label}
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--white-icon)] mt-1 leading-relaxed">
                    {activeScreen.caption}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div
          className="grid gap-2 md:gap-3 mt-4"
          style={{ gridTemplateColumns: `repeat(${totalScreens}, minmax(0, 1fr))` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {screenshots.map((screen, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                }}
                className={`relative aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "scale-[1.04] shadow-lg ring-2 ring-[var(--sec)]/40 opacity-100 z-10"
                    : "border-[var(--white-icon-tr)] opacity-50 hover:opacity-100 hover:border-[var(--white-icon)]"
                }`}
                style={{
                  borderColor: isActive ? screen.stateColor : undefined,
                }}
                title={screen.label}
              >
                <Image
                  src={screen.src}
                  alt={screen.label}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                {isActive && (
                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: screen.stateColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Engineering Architecture & Core Features */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
            System Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold">Engineered for Performance & Immersion</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[var(--sec)]/15 border border-[var(--sec)]/30 flex items-center justify-center text-lg text-[var(--sec)]">
                ⚛️
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  Multi-Ring Arc Reactor Core
                </h4>
                <span className="text-xs font-mono text-[var(--sec)]">
                  Custom PyQt5 QPainter Vector Engine
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              Vector-rendered concentric reactor consisting of a 48-tick radar compass calibration
              ring, 3 outer energy blades, an orbital ring with counter-rotating satellite beads, and
              central targeting crosshairs. Smoothly transitions between Standby, Listening,
              Processing, and Vocalizing modes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-lg text-pink-400">
                📊
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  32-Band Audio Spectrum Visualizer
                </h4>
                <span className="text-xs font-mono text-pink-400">
                  Harmonic Sine Wave Equalizer
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              Real-time frequency visualizer with 32 symmetric frequency bands. Simulates natural
              vocal cadences using dynamic wave physics and floating white peak caps that realistically
              decay during speech synthesis.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-lg text-emerald-400">
                📈
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  12-Segment LED Hardware Telemetry
                </h4>
                <span className="text-xs font-mono text-emerald-400">
                  Real-Time psutil Diagnostic Gauges
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              Four segmented LED gauges monitoring <strong>CPU Load</strong>,{" "}
              <strong>Memory Allocation</strong>, <strong>Battery Life</strong>, and{" "}
              <strong>Disk Storage</strong>. Includes threshold alerts that dynamically transition LED
              colors from Cyan (Normal) to Amber (Warning) and Red (Critical).
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-lg text-amber-400">
                ⚙️
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  Holographic Credentials Vault
                </h4>
                <span className="text-xs font-mono text-amber-400">
                  Zero-Setup In-App Key Management
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              End users never need to touch code or manually edit <code>.env</code> files. Easily
              configure Google Gemini, Groq, OpenWeather, NewsData, and Gmail credentials right from
              the GUI, with a built-in live diagnostic connection probe to Google AI Studio.
            </p>
          </div>
        </div>
      </section>
      {/* Voice Command Matrix */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
            Voice Command Protocol
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold">Natural Voice Interaction Matrix</h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[var(--component-bg)] border-b border-[var(--white-icon-tr)] text-[var(--white)] font-semibold">
              <tr>
                <th className="py-3.5 px-4 md:px-6">Category</th>
                <th className="py-3.5 px-4 md:px-6">Example Voice Trigger</th>
                <th className="py-3.5 px-4 md:px-6">Action Performed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--white-icon-tr)] text-[var(--white-icon)]">
              {voiceCommands.map((cmd) => (
                <tr key={cmd.trigger} className="hover:bg-[var(--card-hover-bg)] transition-colors">
                  <td className="py-3.5 px-4 md:px-6 font-medium text-[var(--sec)] whitespace-nowrap">
                    {cmd.category}
                  </td>
                  <td className="py-3.5 px-4 md:px-6 font-mono text-[var(--white)] font-medium">
                    {cmd.trigger}
                  </td>
                  <td className="py-3.5 px-4 md:px-6 leading-relaxed">{cmd.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3-Step Windows Quickstart Guide */}
      <section className="mb-16 p-6 md:p-8 rounded-2xl border border-dashed border-[var(--sec)]/40 bg-[var(--sec)]/5">
        <div className="max-w-2xl">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
            Zero-Friction Setup
          </h2>
          <h3 className="text-2xl font-bold mb-4">How to Run Cypher on Windows</h3>

          <ol className="space-y-4 text-xs sm:text-sm text-[var(--white-icon)]">
            <li className="flex items-start gap-3">
              <span className="size-6 rounded-full bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-[var(--white)]">Download the Standalone Executable:</strong>
                <p className="mt-0.5">
                  Download <strong>Cypher-AI.exe</strong> (176 MB) directly from the release page. No
                  Python, Git, or terminal is needed.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="size-6 rounded-full bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-[var(--white)]">Double-Click to Launch:</strong>
                <p className="mt-0.5">
                  Launch <code>Cypher-AI.exe</code> anywhere on your PC. The holographic Arc Reactor
                  HUD will initialize immediately.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="size-6 rounded-full bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-[var(--white)]">Enter Your Free Gemini API Key:</strong>
                <p className="mt-0.5">
                  On first launch, the built-in Holographic Credentials Vault will prompt for your
                  free Google Gemini API key. Click <em>&quot;SAVE &amp; APPLY PROTOCOLS&quot;</em> and
                  Cypher is immediately ready for voice commands!
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

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
            target="_blank"
            rel="noopener noreferrer"
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
