"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface CypherScreenshotItem {
  id: string;
  src: string;
  label: string;
  shortTag: string;
  caption: string;
  stateColor: string;
}

interface CypherGalleryProps {
  screenshots: CypherScreenshotItem[];
}

export default function CypherGallery({ screenshots }: CypherGalleryProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const totalScreens = screenshots.length;
  const activeScreen = screenshots[activeTab] || screenshots[0];

  // Eagerly preload all screenshots into browser cache on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      screenshots.forEach((screen) => {
        const img = new window.Image();
        img.src = screen.src;
      });
    }
  }, [screenshots]);

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

  if (!totalScreens) return null;

  return (
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
              onClick={() => setActiveTab(idx)}
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
        {activeScreen && (
          <div
            className="absolute -inset-1 sm:-inset-2 rounded-3xl opacity-25 blur-2xl transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: activeScreen.stateColor }}
          />
        )}

        <div className="relative rounded-2xl overflow-hidden border border-[var(--white-icon-tr)] bg-black/90 shadow-2xl">
          {/* Live Progress Bar */}
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
              onClick={() => setActiveTab(idx)}
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
  );
}
