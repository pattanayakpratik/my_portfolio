"use client";

import { useState } from "react";
import Image from "next/image";
import cypherImg from "@/assets/projects/cypher.png";
import pyshareImg from "@/assets/projects/pyshare.png";
import { featuredProjects, otherProjects, profile } from "@/data/profile";

const images = {
  cypher: { src: cypherImg, pad: "p-6 md:p-8" },
  pyshare: { src: pyshareImg, pad: "p-10 md:p-14" },
};

const iconBtn =
  "size-12 flex justify-center items-center text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] rounded-xl bg-[var(--card-bg)] hover:bg-[var(--white-icon-tr)] shadow-sm dark:shadow-none";

const githubPath =
  "M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z";

type ProjectCategory = "All" | "AI & LLM" | "Backend & APIs" | "Python & Automation";

const categories: ProjectCategory[] = ["All", "AI & LLM", "Backend & APIs", "Python & Automation"];

function matchCategory(tags: string[], category: ProjectCategory): boolean {
  if (category === "All") return true;
  const lower = tags.map((t) => t.toLowerCase());

  if (category === "AI & LLM") {
    return lower.some((t) => ["gemini", "llm", "ai", "nlp"].includes(t));
  }
  if (category === "Backend & APIs") {
    return lower.some((t) =>
      ["sockets", "http", "networking", "rest api", "job queue", "api"].includes(t)
    );
  }
  if (category === "Python & Automation") {
    return lower.some((t) =>
      ["python", "automation", "pyqt5", "sqlite", "gui"].includes(t)
    );
  }
  return true;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);

  const filteredFeatured = featuredProjects.filter((p) =>
    matchCategory(p.tags, activeCategory)
  );

  const filteredOther = otherProjects.filter((p) =>
    matchCategory(p.tags, activeCategory)
  );

  const totalFilteredCount = filteredFeatured.length + filteredOther.length;

  return (
    <section
      id="projects"
      className="py-16 border-t border-[var(--white-icon-tr)] text-[var(--white)]"
    >
      <div className="max-w-5xl mx-auto">
        <div data-reveal="">
          <h2 className="text-lg text-[var(--sec)] mb-2 shiny-sec">My work</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h3 className="text-4xl md:text-5xl font-medium">Projects</h3>

            {/* Category Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--component-bg)] border border-[var(--white-icon-tr)] backdrop-blur-md max-w-full overflow-x-auto no-scrollbar scroll-smooth self-start md:self-auto shrink-0"
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                const count =
                  cat === "All"
                    ? featuredProjects.length + otherProjects.length
                    : featuredProjects.filter((p) => matchCategory(p.tags, cat)).length +
                      otherProjects.filter((p) => matchCategory(p.tags, cat)).length;

                return (
                  <button
                    key={cat}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                      isSelected
                        ? "bg-[var(--card-bg)] text-[var(--sec)] shadow-sm ring-1 ring-[var(--sec)]/30 font-semibold"
                        : "text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-[var(--sec)]/15 text-[var(--sec)]"
                          : "bg-[var(--white-icon-tr)] text-[var(--white-icon)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured projects */}
        {filteredFeatured.length > 0 && (
          <div
            key={`featured-${activeCategory}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-terminal-fade"
          >
            {filteredFeatured.map((project, i) => {
              const imgData = images[project.image];
              return (
                <article
                  key={project.title}
                  className="group card overflow-hidden flex flex-col is-visible"
                  data-reveal=""
                  style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
                >
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-media relative block overflow-hidden h-56 md:h-72"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <Image
                      src={imgData.src}
                      alt={`${project.title} — ${project.tagline}`}
                      sizes="(min-width: 768px) 500px, 100vw"
                      className={`w-full h-full object-contain ${imgData.pad} transition-transform duration-500 ease-out group-hover:scale-105`}
                    />
                  </a>

                  <div className="flex flex-col flex-grow p-5 md:p-6 gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-2xl font-semibold">{project.title}</h4>
                          {project.version && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[var(--sec)]/15 text-[var(--sec)] border border-[var(--sec)]/30">
                              {project.version}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--sec)] mt-0.5">{project.tagline}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {project.downloadUrl && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={project.downloadUrl}
                            aria-label={`Download ${project.title} standalone executable`}
                            title={`Download ${project.title} Standalone Windows .exe (${project.fileSize || ""})`}
                            className={`${iconBtn} shrink-0 text-[var(--sec)] hover:text-white hover:bg-[var(--sec)]/20 border-[var(--sec)]/40`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </a>
                        )}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={project.repo}
                          aria-label={`${project.title} source code`}
                          className={`${iconBtn} shrink-0`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path d={githubPath} />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <p className="text-[var(--white-icon)] text-sm md:text-base">
                      {project.description}
                    </p>

                    <ul className="space-y-2 text-sm text-[var(--white-icon)]">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-[var(--sec)] mt-[2px]">▹</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Interactive Showcase Toggle */}
                    {project.screenshots && (
                      <button
                        type="button"
                        onClick={() => {
                          const next = expandedProject === project.title ? null : project.title;
                          setExpandedProject(next);
                          setActiveScreenshotIndex(0);
                          if (next) {
                            setTimeout(() => {
                              document
                                .getElementById(`showcase-${project.title.toLowerCase()}`)
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }, 150);
                          }
                        }}
                        className="my-1 flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[var(--component-bg)] hover:bg-[var(--card-hover-bg)] border border-[var(--sec)]/40 hover:border-[var(--sec)] text-xs md:text-sm font-medium text-[var(--sec)] transition-all duration-300 group/btn shadow-sm cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sec)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sec)]"></span>
                          </span>
                          <span className="font-semibold">
                            {expandedProject === project.title
                              ? "Hide Live HUD Showcase & Standalone EXE"
                              : "⚡ Explore Live HUD Showcase & Standalone EXE"}
                          </span>
                        </span>
                        <span
                          className={`text-base transform transition-transform duration-300 ${
                            expandedProject === project.title ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          ▾
                        </span>
                      </button>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {project.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Expanded Project Showcase (Deep Dive Drawer) */}
        {expandedProject && (
          (() => {
            const project = featuredProjects.find((p) => p.title === expandedProject);
            if (!project || !project.screenshots) return null;
            const activeScreen = project.screenshots[activeScreenshotIndex] || project.screenshots[0];

            return (
              <div
                id={`showcase-${project.title.toLowerCase()}`}
                className="mt-8 card relative overflow-hidden border border-[var(--sec)]/50 p-5 md:p-8 rounded-2xl bg-[var(--card-bg)] shadow-2xl animate-terminal-fade"
              >
                {/* Top Glow Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--sec)] to-transparent" />

                {/* Header with Title, Version & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--white-icon-tr)]">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-[var(--sec)]/15 text-[var(--sec)] border border-[var(--sec)]/30">
                        CYPHER-V3 · F.R.I.D.A.Y. DESKTOP HUD
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--white-icon-tr)] text-[var(--white-icon)]">
                        Windows x64
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        1-Click Standalone
                      </span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold tracking-tight">
                      Cypher AI <span className="text-[var(--sec)] font-normal text-xl">{project.version}</span>
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--white-icon)] mt-1 max-w-2xl">
                      Experience Tony Stark&apos;s F.R.I.D.A.Y. on your desktop. Built with a vector Arc Reactor, real-time 32-band audio equalizer, and self-contained executable packaging.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto shrink-0">
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-semibold text-xs md:text-sm shadow-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
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
                        <span>Download .exe ({project.fileSize})</span>
                      </a>
                    )}

                    {project.releaseUrl && (
                      <a
                        href={project.releaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-xs md:text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] transition-all"
                      >
                        <span>Release Notes</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setExpandedProject(null)}
                      aria-label="Collapse showcase"
                      className="p-2.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-[var(--white-icon)] hover:text-[var(--white)] transition-colors cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Interactive Screenshot Showcase */}
                <div className="py-6">
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <h5 className="text-sm font-semibold uppercase tracking-wider text-[var(--sec)]">
                      Live Holographic Operational States
                    </h5>
                    <span className="text-xs text-[var(--white-icon)]">
                      Click state pill to preview HUD response
                    </span>
                  </div>

                  {/* State Pills Switcher */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
                    {project.screenshots.map((screen, idx) => {
                      const isActive = activeScreenshotIndex === idx;
                      return (
                        <button
                          key={screen.id}
                          type="button"
                          onClick={() => setActiveScreenshotIndex(idx)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                            isActive
                              ? "bg-[var(--component-bg)] text-[var(--white)] shadow-md border border-[var(--sec)]/70 ring-1 ring-[var(--sec)]/30 font-semibold"
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

                  {/* Screen Preview Viewport */}
                  <div className="relative rounded-2xl overflow-hidden border border-[var(--white-icon-tr)] bg-black/60 shadow-2xl">
                    <div className="relative aspect-[16/9] w-full max-h-[500px]">
                      <Image
                        src={activeScreen.src}
                        alt={activeScreen.label}
                        fill
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-contain p-2 md:p-4"
                        priority
                      />
                      {/* Live State Watermark */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono font-medium">
                        <span
                          className="size-2 rounded-full animate-pulse"
                          style={{ backgroundColor: activeScreen.stateColor }}
                        />
                        <span className="text-white uppercase tracking-wider">
                          HUD STATE: {activeScreen.shortTag}
                        </span>
                      </div>
                    </div>

                    {/* Caption Bar */}
                    <div className="p-4 md:p-5 bg-[var(--component-bg)] border-t border-[var(--white-icon-tr)] flex items-start gap-3">
                      <div
                        className="size-3 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: activeScreen.stateColor }}
                      />
                      <div className="flex-grow">
                        <p className="text-xs md:text-sm font-semibold text-[var(--white)]">
                          {activeScreen.label}
                        </p>
                        <p className="text-xs md:text-sm text-[var(--white-icon)] mt-0.5 leading-relaxed">
                          {activeScreen.caption}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnails Row */}
                  <div className="grid grid-cols-5 gap-2 md:gap-3 mt-4">
                    {project.screenshots.map((screen, idx) => {
                      const isActive = activeScreenshotIndex === idx;
                      return (
                        <button
                          key={screen.id}
                          type="button"
                          onClick={() => setActiveScreenshotIndex(idx)}
                          className={`relative aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "border-[var(--sec)] scale-[1.02] shadow-md ring-2 ring-[var(--sec)]/20"
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
                </div>

                {/* Tech Specs Matrix */}
                {project.extendedDetails && (
                  <div className="pt-6 border-t border-[var(--white-icon-tr)]">
                    <h5 className="text-sm font-semibold uppercase tracking-wider text-[var(--sec)] mb-4">
                      Engine Architecture & Capabilities
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {project.extendedDetails.specs.map((spec) => (
                        <div
                          key={spec.title}
                          className="p-4 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)]/70 flex flex-col gap-2"
                        >
                          <div className="flex items-center gap-2 text-[var(--sec)]">
                            <span className="text-base font-bold">⚡</span>
                            <h6 className="font-semibold text-sm text-[var(--white)]">
                              {spec.title}
                            </h6>
                          </div>
                          <p className="text-xs text-[var(--white-icon)] leading-relaxed flex-grow">
                            {spec.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Quick Start Card */}
                    <div className="mt-6 p-5 rounded-xl border border-dashed border-[var(--sec)]/40 bg-[var(--sec)]/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h6 className="text-sm font-semibold text-[var(--white)] flex items-center gap-2">
                          <span>🚀</span>
                          <span>Zero-Setup Windows Deployment</span>
                        </h6>
                        <ol className="mt-2 space-y-1 text-xs text-[var(--white-icon)]">
                          {project.extendedDetails.quickStart.map((step, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="font-mono text-[var(--sec)] font-bold">
                                {idx + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {project.downloadUrl && (
                        <a
                          href={project.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-sm shadow-lg hover:scale-105 transition-transform duration-200 shrink-0 self-start md:self-auto"
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
                          <span>Download Cypher-AI.exe</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-[var(--white-icon-tr)] flex items-center justify-between text-xs text-[var(--white-icon)]">
                  <span>Inspired by Iron Man F.R.I.D.A.Y. · Autonomous Agentic Engine</span>
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedProject(null);
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[var(--sec)] hover:underline font-medium cursor-pointer"
                  >
                    ▲ Collapse Showcase
                  </button>
                </div>
              </div>
            );
          })()
        )}

        {/* Other projects */}
        {filteredOther.length > 0 && (
          <div key={`other-${activeCategory}`} className="animate-terminal-fade">
            <h4 className="text-2xl font-medium mt-16 mb-6" data-reveal="">
              More things I&apos;ve built
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOther.map((p, i) => (
                <a
                  key={p.title}
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mini-card group card p-5 flex flex-col gap-3 hover:-translate-y-1 is-visible"
                  data-reveal=""
                  style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-7 text-[var(--sec)]"
                      aria-hidden="true"
                    >
                      <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-[var(--white-icon)] transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                    </svg>
                  </div>
                  <h5 className="text-lg font-semibold group-hover:text-[var(--sec)] transition-colors">
                    {p.title}
                  </h5>
                  <p className="text-sm text-[var(--white-icon)] flex-grow">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Fallback if zero items match */}
        {totalFilteredCount === 0 && (
          <div className="py-16 text-center text-[var(--white-icon)]">
            <p className="text-lg">No projects match the selected filter.</p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mt-4 px-4 py-2 rounded-xl bg-[var(--sec)] text-white dark:text-[#101010] font-medium"
            >
              Show all projects
            </button>
          </div>
        )}

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={profile.socials.github}
          aria-label="More projects on GitHub"
          className="w-full flex items-center justify-center gap-2 mt-10 text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--white-icon-tr)] hover:scale-[1.02] shadow-sm dark:shadow-none"
        >
          <span className="md:text-lg text-md">More projects on</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d={githubPath}></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
