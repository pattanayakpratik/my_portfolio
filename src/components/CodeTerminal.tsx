"use client";

import { useState, useRef, useEffect } from "react";
import { codeSnippets } from "@/data/terminalSnippets";

interface CodeTerminalProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CodeTerminal({
  activeCategory,
  onSelectCategory,
}: CodeTerminalProps) {
  const [copied, setCopied] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const isFirstMount = useRef(true);

  // Automatically scroll active tab into view inside the tabs container (never scroll the window)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const container = tabsContainerRef.current;
    const activeBtn = tabRefs.current[activeCategory];
    if (container && activeBtn) {
      const targetLeft =
        activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  const snippet = codeSnippets[activeCategory] || codeSnippets["Backend Engineering"];

  const handleCopy = () => {
    const rawText = snippet.lines
      .map((line) => line.tokens.map((t) => t.text).join(""))
      .join("\n");
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTokenColor = (colorType: string) => {
    switch (colorType) {
      case "keyword":
        return "text-sky-600 dark:text-cyan-400 font-semibold";
      case "function":
        return "text-amber-600 dark:text-amber-300 font-medium";
      case "entity":
        return "text-cyan-700 dark:text-sky-300 font-medium";
      case "string":
        return "text-emerald-600 dark:text-emerald-400";
      case "comment":
        return "text-slate-400 dark:text-slate-500 italic";
      case "operator":
        return "text-sky-600 dark:text-cyan-300";
      case "variable":
        return "text-slate-900 dark:text-slate-100 font-medium";
      default:
        return "text-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div className="w-full flex flex-col rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] text-[var(--white)] shadow-sm dark:shadow-none overflow-hidden transition-all duration-300">
      {/* Top Subtle Gradient Stripe */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[var(--sec)] via-sky-400 to-[var(--sec)]" />

      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--white-icon-tr)] bg-[var(--container)]/60 backdrop-blur-md gap-2">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-xs" />
        </div>

        {/* Clickable File Tabs with Auto-Scroll */}
        <div
          ref={tabsContainerRef}
          className="hidden sm:flex items-center gap-1.5 overflow-x-auto scroll-smooth no-scrollbar flex-1 min-w-0 mx-2"
        >
          {Object.values(codeSnippets).map((item) => {
            const isActive = item.category === activeCategory;
            return (
              <button
                key={item.category}
                ref={(el) => {
                  tabRefs.current[item.category] = el;
                }}
                type="button"
                onClick={() => onSelectCategory(item.category)}
                className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[var(--card-bg)] text-[var(--sec)] shadow-sm border border-[var(--white-icon-tr)] font-semibold"
                    : "text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]/50 border border-transparent"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--sec)] scale-125 shadow-[0_0_6px_var(--sec)]"
                      : "bg-slate-400/40 dark:bg-slate-600/40"
                  }`}
                />
                {item.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]/60 transition-colors cursor-pointer border border-transparent hover:border-[var(--white-icon-tr)]"
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 text-emerald-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-500 font-medium">Copied</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed select-text min-h-[310px] flex flex-col justify-between bg-[var(--card-bg)]">
        <div
          key={activeCategory}
          className="space-y-1 animate-terminal-fade"
        >
          {snippet.lines.map((line, idx) => (
            <div key={`${activeCategory}-${idx}`} className="flex items-start gap-4 group">
              <span className="text-[var(--white-icon)]/50 select-none text-[11px] w-5 text-right shrink-0 pt-0.5 font-mono">
                {line.num}
              </span>
              <div className="flex-1 whitespace-pre">
                {line.tokens.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.tokens.map((token, tIdx) => (
                    <span key={tIdx} className={getTokenColor(token.color)}>
                      {token.text}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Live Execution / Response Terminal Bar */}
        <div
          key={`output-${activeCategory}`}
          className="mt-5 pt-3 border-t border-[var(--white-icon-tr)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs animate-terminal-fade"
        >
          <div className="flex items-center gap-2 text-[var(--white-icon)] font-mono min-w-0">
            <span className="text-[var(--sec)] font-bold shrink-0">&gt;</span>
            <span className="truncate max-w-[420px]">{snippet.output.message}</span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono shrink-0 ${snippet.output.badgeColor}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {snippet.output.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
