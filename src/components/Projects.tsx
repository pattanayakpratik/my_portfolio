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
                        <h4 className="text-2xl font-semibold">{project.title}</h4>
                        <p className="text-sm text-[var(--sec)]">{project.tagline}</p>
                      </div>
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
