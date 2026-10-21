"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { featuredProjects } from "@/data/profile";

export default function PyShareShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const pyshare = featuredProjects.find((p) => p.title === "PyShare");
  const screenshots = pyshare?.screenshots || [];
  const activeScreen = screenshots[activeTab] || screenshots[0];

  const liveUrl = pyshare?.liveUrl || "https://pyshare.vercel.app";
  const downloadUrl =
    pyshare?.downloadUrl ||
    "https://github.com/pattanayakpratik/PyShare/releases/download/v4.6.0/PyShare.exe";
  const releaseUrl =
    pyshare?.releaseUrl || "https://github.com/pattanayakpratik/PyShare/releases/tag/v4.6.0";
  const repoUrl = pyshare?.repo || "https://github.com/pattanayakpratik/PyShare";

  const comparisonModes = [
    {
      title: "Instant Web Mode (Zero Install)",
      badge: "ANY DEVICE · WORLDWIDE",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      icon: "🌐",
      description:
        "Run PyShare directly inside your web browser. No software download or installation required on any device.",
      points: [
        "Works on iPhone, Android, iPad, Mac, Windows, Linux",
        "Peer-to-Peer WebRTC DataChannel transfer",
        "Encrypted browser-to-browser connection",
        "Connect via instant Room PIN or Camera QR scan",
        "Integrated media lightbox & shared web clipboard",
      ],
      actionText: "Launch Web App ↗",
      actionUrl: liveUrl,
      isPrimary: true,
    },
    {
      title: "Desktop App Mode (.exe)",
      badge: "STANDALONE WINDOWS · 100 MB/s",
      badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      icon: "💻",
      description:
        "Self-contained portable Windows application engineered for ultra-fast local offline file transfers.",
      points: [
        "100% offline Wi-Fi LAN / Hotspot speed (50–100 MB/s)",
        "1-click Cloudflare Internet Tunnel for remote sharing",
        "Files auto-saved directly to Desktop/PyShare_Files",
        "Native 1-click Windows OS clipboard push",
        "Zero Python or dependencies needed — portable .exe",
      ],
      actionText: "Download PyShare.exe ⬇",
      actionUrl: downloadUrl,
      isPrimary: false,
    },
  ];

  const quickSteps = [
    {
      step: "01",
      title: "Open or Launch",
      desc: "Open pyshare.vercel.app on any browser, or double-click PyShare.exe on your Windows PC.",
    },
    {
      step: "02",
      title: "Scan QR or Enter PIN",
      desc: "Point your phone camera at the QR code, or type the rotating 4-digit PIN into the keypad.",
    },
    {
      step: "03",
      title: "Instant Transfer & Clipboard",
      desc: "Drag and drop files, stream videos with byte-range seeking, and beam text snippets instantly.",
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
            <span className="text-[var(--white-icon)]">PYSHARE-V4.6 PROTOCOL ONLINE</span>
          </div>

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--sec)]/40 bg-[var(--sec)]/15 hover:bg-[var(--sec)]/25 text-xs font-medium text-[var(--sec)] transition-colors"
          >
            <span>Live Web App</span>
            <span className="text-xs">↗</span>
          </a>

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
            P2P FILE SHARING & CLIPBOARD HUB
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--white-icon-tr)] text-[var(--white-icon)]">
            v4.6.0
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
            WebRTC Zero-Install
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            Standalone Windows EXE
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          PyShare <span className="text-[var(--sec)] font-light">Cross-Device Hub</span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--white-icon)] max-w-3xl leading-relaxed">
          An ultra-fast cross-platform file transfer and universal clipboard hub. Beam high-res
          photos, 4K videos, documents, and text snippets between PC, Mac, iPhone, Android, and
          Tablets with zero configuration — either via peer-to-peer WebRTC in any browser or
          high-speed offline Wi-Fi LAN transfer with the standalone Windows app.
        </p>

        {/* Dual Hero Action Card */}
        <div className="mt-8 p-6 md:p-8 rounded-2xl border border-[var(--sec)]/40 bg-gradient-to-br from-[var(--card-bg)] via-[var(--component-bg)] to-[var(--card-bg)] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--sec)] to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--sec)] mb-1">
                <span>⚡</span>
                <span className="font-semibold uppercase tracking-wider">
                  Two Flexible Ways to Connect
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--white)]">
                Instant Web App & Standalone EXE
              </h2>
              <p className="text-xs sm:text-sm text-[var(--white-icon)] mt-1 max-w-xl">
                Open directly in your browser on any phone or laptop at{" "}
                <span className="text-[var(--sec)] font-mono">pyshare.vercel.app</span>, or download
                the portable standalone Windows desktop app for maximum offline speed.
              </p>

              {/* Badges row */}
              <div className="flex items-center gap-2 mt-4 flex-wrap text-[11px] font-mono text-[var(--white-icon)]">
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  🌐 WebRTC DataChannels
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  ⚡ 50–100 MB/s Offline LAN
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  ☁️ Cloudflare Tunnel
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  📋 Universal Clipboard
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--white-icon-tr)]">
                  🎥 HTTP 206 Streaming
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-sm md:text-base shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <span>🌐 Open Live Web App</span>
                <span className="text-xs">↗</span>
              </a>

              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-xs md:text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download .exe (v4.6.0)</span>
              </a>

              <a
                href={releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3.5 py-3.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-xs font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-colors"
                title="View GitHub Releases"
              >
                <span>Release</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Screenshot & State Gallery */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
              Visual Interface Gallery
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold">Host Studio, Mobile P2P & WebRTC</h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)]">
            Click any view to inspect real interface screenshots and capabilities
          </p>
        </div>

        {/* State Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
          {screenshots.map((screen, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[var(--component-bg)] text-[var(--white)] shadow-md border border-[var(--sec)]/70 ring-2 ring-[var(--sec)]/20 font-semibold"
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

        {/* Screen Viewport */}
        {activeScreen && (
          <div className="relative rounded-2xl overflow-hidden border border-[var(--white-icon-tr)] bg-black/80 shadow-2xl">
            <div className="relative aspect-[16/9] w-full max-h-[560px]">
              <Image
                src={activeScreen.src}
                alt={activeScreen.label}
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-contain p-2 md:p-6"
                priority
              />

              {/* State Watermark */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono font-medium">
                <span
                  className="size-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: activeScreen.stateColor }}
                />
                <span className="text-white uppercase tracking-wider">
                  VIEW: {activeScreen.shortTag}
                </span>
              </div>
            </div>

            {/* Technical Caption Bar */}
            <div className="p-5 md:p-6 bg-[var(--component-bg)] border-t border-[var(--white-icon-tr)] flex items-start gap-4">
              <div
                className="size-3.5 rounded-full mt-1 shrink-0"
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
          </div>
        )}

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 mt-4">
          {screenshots.map((screen, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[var(--sec)] scale-[1.02] shadow-lg ring-2 ring-[var(--sec)]/30"
                    : "border-[var(--white-icon-tr)] opacity-60 hover:opacity-100 hover:border-[var(--white-icon)]"
                }`}
                title={screen.label}
              >
                <Image
                  src={screen.src}
                  alt={screen.label}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Two Ways to Use PyShare (Comparison Matrix) */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
            Operation Modes
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold">Two Ways to Connect & Share</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisonModes.map((mode) => (
            <div
              key={mode.title}
              className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                mode.isPrimary
                  ? "border-[var(--sec)]/50 bg-gradient-to-b from-[var(--component-bg)] to-[var(--card-bg)] shadow-lg"
                  : "border-[var(--white-icon-tr)] bg-[var(--card-bg)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-3xl">{mode.icon}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border ${mode.badgeColor}`}
                  >
                    {mode.badge}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[var(--white)] mb-2">{mode.title}</h4>
                <p className="text-xs sm:text-sm text-[var(--white-icon)] mb-5 leading-relaxed">
                  {mode.description}
                </p>

                <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-[var(--white-icon)]">
                  {mode.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-[var(--sec)] font-bold mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={mode.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  mode.isPrimary
                    ? "bg-[var(--sec)] text-white dark:text-[#101010] shadow-md hover:scale-[1.02]"
                    : "border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-[var(--white)]"
                }`}
              >
                <span>{mode.actionText}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Architecture & Core Features */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
            Core Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold">Engineered for Speed, Privacy & Fluidity</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-lg text-purple-400">
                🌐
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  WebRTC P2P DataChannels
                </h4>
                <span className="text-xs font-mono text-purple-400">
                  Zero Cloud Intermediaries · Pure P2P
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              Enables direct browser-to-browser encrypted transfers with STUN signaling. Files stream
              peer-to-peer across phones, tablets, and computers worldwide without traveling through
              or getting stored on any third-party cloud server.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[var(--sec)]/15 border border-[var(--sec)]/30 flex items-center justify-center text-lg text-[var(--sec)]">
                ⚡
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  HTTP 206 Partial Content Streaming
                </h4>
                <span className="text-xs font-mono text-[var(--sec)]">
                  Instant Media Scrubbing & Playback
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              Implements RFC 7233 byte-range requests for audio and video media. Users can instantly
              scrub through massive multi-gigabyte video files in the in-app lightbox with zero
              buffering pauses, fully compatible with iOS Safari and Android Chrome.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-lg text-blue-400">
                📋
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  Universal Shared Clipboard
                </h4>
                <span className="text-xs font-mono text-blue-400">
                  Bidirectional Beam + OS Injection
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              Instantly share links, phone numbers, notes, and addresses across devices. Includes
              1-click native Windows OS clipboard push on the host studio and modal drawer on
              mobile devices with 1-tap copy.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-lg text-emerald-400">
                🔒
              </span>
              <div>
                <h4 className="font-semibold text-base text-[var(--white)]">
                  Dual-Grace 30s PIN & mDNS Discovery
                </h4>
                <span className="text-xs font-mono text-emerald-400">
                  Zero-Config Pairing · Grace Rollover
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              Dynamic QR code pairing and rotating 4-digit PIN with a dual-grace window ensures entering
              the PIN right at the boundary never causes lockouts. Features Zeroconf mDNS discovery
              broadcasting across your local network.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
            Quick Start
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold">Up & Running in Under 30 Seconds</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-2"
            >
              <span className="text-3xl font-mono font-bold text-[var(--sec)]">{step.step}</span>
              <h4 className="text-lg font-bold text-[var(--white)]">{step.title}</h4>
              <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

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
