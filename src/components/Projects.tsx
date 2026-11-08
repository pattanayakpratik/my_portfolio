"use client";

import { useState, useEffect } from "react";
import { showToast } from "./Toast";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import cypherImg from "@/assets/projects/cypher.png";
import pyshareImg from "@/assets/projects/pyshare.png";
import { featuredProjects, otherProjects, profile } from "@/data/profile";

const images = {
  cypher: { src: cypherImg, pad: "p-3 md:p-4" },
  pyshare: { src: pyshareImg, pad: "p-3 md:p-4" },
};

const iconBtn =
  "size-9.5 md:size-10 flex justify-center items-center text-[var(--white-icon)] hover:text-[var(--white)] transition duration-200 border border-[var(--white-icon-tr)] rounded-full bg-[var(--glass-btn-bg)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--sec)]/50 shadow-xs cursor-pointer backdrop-blur-xl";

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
      [
        "sockets",
        "http",
        "networking",
        "rest api",
        "job queue",
        "api",
        "fastapi",
        "redis",
        "postgresql",
        "distributed systems",
        "flask",
        "supabase",
        "docker",
      ].includes(t)
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const handleFilterTag = (e: Event) => {
      const customEvent = e as CustomEvent<{ tag: string }>;
      if (customEvent.detail?.tag) {
        setSelectedTag(customEvent.detail.tag);
        setActiveCategory("All");
        showToast(`Filtered projects by "${customEvent.detail.tag}"`, "search");
        const el = document.getElementById("projects");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("filter-project-tag", handleFilterTag);
    return () => window.removeEventListener("filter-project-tag", handleFilterTag);
  }, []);

  const filterByTag = (tags: string[]) => {
    if (!selectedTag) return true;
    const lower = selectedTag.toLowerCase();
    return tags.some((t) => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()));
  };

  const filteredFeatured = featuredProjects.filter(
    (p) => matchCategory(p.tags, activeCategory) && filterByTag(p.tags)
  );

  const filteredOther = otherProjects.filter(
    (p) => matchCategory(p.tags, activeCategory) && filterByTag(p.tags)
  );

  const totalFilteredCount = filteredFeatured.length + filteredOther.length;

  return (
    <section
      id="projects"
      className="py-16 md:py-20 border-t border-[var(--white-icon-tr)] text-[var(--white)]"
    >
      <div className="max-w-6xl mx-auto">
        <div data-reveal="">
          <p className="text-xs uppercase tracking-widest font-mono text-[var(--sec)] mb-2">My work</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>

            {/* Category Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--component-bg)] border border-[var(--white-icon-tr)] backdrop-blur-2xl max-w-full overflow-x-auto no-scrollbar scroll-smooth self-start md:self-auto shrink-0 shadow-xs"
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
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                      isSelected
                        ? "bg-[var(--card-hover-bg)] text-[var(--sec)] shadow-xs ring-1 ring-[var(--sec)]/30 font-semibold"
                        : "text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
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

        {/* Active Tech Filter Banner */}
        {selectedTag && (
          <div className="flex items-center gap-2.5 mb-6 p-2.5 px-5 rounded-full bg-[var(--component-bg)] border border-[var(--sec)]/40 backdrop-blur-2xl text-xs md:text-sm shadow-xs animate-in fade-in duration-200">
            <span className="size-2 rounded-full bg-[var(--sec)] animate-pulse" />
            <span className="text-[var(--white-icon)]">Filtered by technology:</span>
            <span className="font-mono font-semibold text-[var(--sec)] px-2.5 py-0.5 rounded-full bg-[var(--sec)]/15 border border-[var(--sec)]/30">
              {selectedTag}
            </span>
            <span className="text-xs text-[var(--white-icon)] hidden sm:inline">
              ({totalFilteredCount} matching)
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedTag(null);
                showToast("Cleared skill filter", "refresh");
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--white-icon-tr)] hover:bg-[var(--sec)]/20 text-[var(--white-icon)] hover:text-[var(--sec)] text-xs font-medium cursor-pointer transition-colors"
            >
              <X className="size-3.5" />
              <span>Clear filter</span>
            </button>
          </div>
        )}

        {/* Featured projects */}
        {filteredFeatured.length > 0 && (
          <div
            key={`featured-${activeCategory}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredFeatured.map((project, i) => {
              const imgData = images[project.image as "cypher" | "pyshare"];
              return (
                <article
                  key={project.title}
                  className="group card rounded-[2.5rem] overflow-hidden flex flex-col is-visible"
                  data-reveal=""
                  style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
                >
                  {project.showcaseUrl ? (
                    <Link
                      href={project.showcaseUrl}
                      className="project-media relative block overflow-hidden h-56 md:h-72 bg-gradient-to-b from-transparent to-[var(--container)]/30 border-b border-[var(--white-icon-tr)]"
                      aria-label={`${project.title} dedicated showcase and download`}
                    >
                      {imgData && (
                        <Image
                          src={imgData.src}
                          alt={`${project.title} — ${project.tagline}`}
                          sizes="(min-width: 768px) 500px, 100vw"
                          className={`w-full h-full object-contain ${imgData.pad} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                        />
                      )}
                    </Link>
                  ) : (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-media relative block overflow-hidden h-56 md:h-72 bg-gradient-to-b from-transparent to-[var(--container)]/30 border-b border-[var(--white-icon-tr)]"
                      aria-label={`${project.title} on GitHub`}
                    >
                      {imgData && (
                        <Image
                          src={imgData.src}
                          alt={`${project.title} — ${project.tagline}`}
                          sizes="(min-width: 768px) 500px, 100vw"
                          className={`w-full h-full object-contain ${imgData.pad} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                        />
                      )}
                    </a>
                  )}

                  <div className="flex flex-col flex-grow p-5 md:p-6 gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {project.showcaseUrl ? (
                          <Link href={project.showcaseUrl} className="hover:text-[var(--sec)] transition-colors">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
                          </Link>
                        ) : (
                          <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
                        )}
                        <p className="text-sm font-medium text-[var(--sec)] mt-0.5">{project.tagline}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {project.liveUrl && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={project.liveUrl}
                            aria-label={`Open ${project.title} live web app`}
                            title={`Open ${project.title} Live Web App`}
                            className={`${iconBtn} text-[var(--sec)] hover:text-white hover:bg-[var(--sec)]/20 border-[var(--sec)]/30`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-4"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </a>
                        )}
                        {project.downloadUrl && (
                          <a
                            href={project.downloadUrl}
                            download={`${project.title}.exe`}
                            aria-label={`Download ${project.title}.exe`}
                            title={`Download ${project.title}.exe`}
                            className={`${iconBtn} text-[var(--sec)] hover:text-white hover:bg-[var(--sec)]/20 border-[var(--sec)]/30`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-4"
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
                          aria-label={`${project.title} source code on GitHub`}
                          title="View source on GitHub"
                          className={iconBtn}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4.5"
                          >
                            <path d={githubPath} />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <p className="text-[var(--white-icon)] text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <ul className="space-y-1.5 text-sm text-[var(--white-icon)]">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-[var(--sec)] font-mono text-xs mt-[3px]">▹</span>
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Dedicated Showcase Link Button */}
                    {project.showcaseUrl && (
                      <Link
                        href={project.showcaseUrl}
                        className="my-1 flex items-center justify-between w-full px-5 py-3 rounded-full bg-[var(--component-bg)] hover:bg-[var(--card-hover-bg)] border border-[var(--sec)]/30 hover:border-[var(--sec)]/60 text-xs md:text-sm font-semibold text-[var(--sec)] transition-all duration-200 group/btn shadow-xs backdrop-blur-xl"
                      >
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sec)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sec)]"></span>
                          </span>
                          <span>
                            {project.title === "Cypher"
                              ? "Explore Cypher HUD Architecture & EXE →"
                              : "Explore PyShare Architecture & Live Demo →"}
                          </span>
                        </span>
                        <span className="text-base group-hover/btn:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {project.tags.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedTag(t === selectedTag ? null : t);
                            showToast(t === selectedTag ? "Cleared filter" : `Filtered by "${t}"`, "search");
                          }}
                          className={`tag transition-all cursor-pointer ${
                            selectedTag === t
                              ? "bg-[var(--sec)]/20 text-[var(--sec)] border-[var(--sec)] ring-1 ring-[var(--sec)]/30 font-semibold"
                              : "hover:border-[var(--sec)]/60 hover:text-[var(--white)]"
                          }`}
                          title={`Filter projects by ${t}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Other projects */}
        {filteredOther.length > 0 && (
          <div key={`other-${activeCategory}`} className="mt-16 md:mt-20">
            <h3 className="text-2xl font-bold tracking-tight mb-6" data-reveal="">
              More things I&apos;ve built
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOther.map((p, i) => (
                <a
                  key={p.title}
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mini-card group card rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 is-visible"
                  data-reveal=""
                  style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-[var(--sec)]"
                        aria-hidden="true"
                      >
                        <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z" />
                      </svg>
                      {p.badge && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--sec)]/15 text-[var(--sec)] border border-[var(--sec)]/30 font-semibold tracking-wider">
                          {p.liveUrl && <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.liveUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(p.liveUrl, "_blank", "noopener,noreferrer");
                          }}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-[var(--sec)] hover:bg-[var(--sec)]/20 border border-[var(--sec)]/30 transition-colors cursor-pointer"
                          title="Open live app"
                        >
                          Live ↗
                        </button>
                      )}
                      {p.apkUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(p.apkUrl, "_blank", "noopener,noreferrer");
                          }}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors cursor-pointer"
                          title="Download Android APK"
                        >
                          APK ⬇
                        </button>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 text-[var(--white-icon)] transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-base font-semibold group-hover:text-[var(--sec)] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[var(--white-icon)] leading-relaxed flex-grow">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedTag(t === selectedTag ? null : t);
                          showToast(t === selectedTag ? "Cleared filter" : `Filtered by "${t}"`, "search");
                        }}
                        className={`tag text-[10px] px-2.5 py-0.5 transition-all cursor-pointer ${
                          selectedTag === t
                            ? "bg-[var(--sec)]/20 text-[var(--sec)] border-[var(--sec)] ring-1 ring-[var(--sec)]/30 font-semibold"
                            : "hover:border-[var(--sec)]/60 hover:text-[var(--white)]"
                        }`}
                        title={`Filter projects by ${t}`}
                      >
                        {t}
                      </button>
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
            <p className="text-base">No projects match the selected filter.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSelectedTag(null);
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[var(--sec)] text-white dark:text-slate-950 font-medium text-sm hover:opacity-90 transition cursor-pointer"
            >
              Show all projects
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={profile.socials.github}
            aria-label="More projects on GitHub"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] border border-[var(--white-icon-tr)] bg-[var(--glass-btn-bg)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--sec)]/50 hover:-translate-y-0.5 transition duration-200 shadow-xs backdrop-blur-xl"
          >
            <span>See more repositories on GitHub</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path d={githubPath} />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
