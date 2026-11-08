"use client";

import { useState } from "react";
import CodeTerminal from "@/components/CodeTerminal";
import { Zap } from "lucide-react";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "text-[var(--sec)] shrink-0",
};

const skills = [
  {
    category: "Backend Engineering",
    icon: (
      <svg {...iconProps}>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
    items: [
      "High-throughput APIs with Python, FastAPI, Flask & Node.js",
      "ACID Transactional Outbox & 2-lane priority worker queues",
      "Redis Lua token-bucket rate limiting & 24h idempotency",
      "PostgreSQL, Supabase & SQL optimization with GIN/B-Tree indexing",
    ],
  },
  {
    category: "Generative AI & Agents",
    icon: (
      <svg {...iconProps}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
      </svg>
    ),
    items: [
      "Gemini & Groq (LLaMA) API integration",
      "Prompt engineering & context building",
      "RAG with ChromaDB & vector search",
      "Agentic workflow & automation design",
    ],
  },
  {
    category: "Machine Learning",
    icon: (
      <svg {...iconProps}>
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M9 13a4.5 4.5 0 0 0 3-4" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M12 13h4" />
        <path d="M12 18h6a2 2 0 0 1 2 2v1" />
        <path d="M12 8h8" />
        <path d="M16 8V5a2 2 0 0 1 2-2" />
        <circle cx="16" cy="13" r=".5" />
        <circle cx="18" cy="3" r=".5" />
        <circle cx="20" cy="21" r=".5" />
        <circle cx="20" cy="8" r=".5" />
      </svg>
    ),
    items: [
      "Predictive modeling with scikit-learn & TensorFlow",
      "Data preprocessing with Pandas",
      "Model evaluation & fine-tuning",
      "AWS Certified — ML & AI Fundamentals",
    ],
  },
  {
    category: "Automation & Tooling",
    icon: (
      <svg {...iconProps}>
        <rect width="8" height="8" x="3" y="3" rx="2" />
        <path d="M7 11v4a2 2 0 0 0 2 2h4" />
        <rect width="8" height="8" x="13" y="13" rx="2" />
      </svg>
    ),
    items: [
      "Socket programming & local networking",
      "Gmail (IMAP/SMTP) & WhatsApp automation",
      "Desktop apps & CLI tools (Tkinter, C++, C#, Bash)",
      "Git, Postman, MySQL, PostgreSQL, SQLite",
    ],
  },
];

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(skills[0].category);

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-6 md:pt-12 w-full" id="skills">
      <div className="mb-6">
        <span className="block text-xs md:text-sm text-[var(--sec)] font-mono font-semibold tracking-wider uppercase mb-1">
          Capabilities &amp; Tech Stack
        </span>
        <h2 className="text-[var(--white)] text-3xl md:text-4xl font-bold tracking-tight">
          What I do
        </h2>

        {/* Quick Filter Stack Bar */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--sec)] uppercase tracking-wider shrink-0 font-semibold">
            <Zap className="size-3.5" /> Filter by Stack:
          </span>
          {[
            { label: "Python", query: "Python" },
            { label: "WebRTC", query: "WebRTC" },
            { label: "Gemini AI", query: "Gemini" },
            { label: "Sockets", query: "Sockets" },
            { label: "SQLite / SQL", query: "SQLite" },
            { label: "PyQt5 / GUI", query: "PyQt5" },
            { label: "C++ / C#", query: "C++" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("filter-project-tag", { detail: { tag: item.query } })
                );
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono border border-[var(--white-icon-tr)] bg-[var(--component-bg)] backdrop-blur-2xl hover:bg-[var(--white-icon-tr)] hover:border-[var(--sec)]/50 text-[var(--white-icon)] hover:text-[var(--sec)] transition-all cursor-pointer shrink-0 shadow-xs"
              title={`View projects built with ${item.label}`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] text-[var(--sec)]">↓</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 w-full">
        {/* Left: Skills Accordion */}
        <div className="w-full lg:w-[420px] shrink-0">
          <ul className="space-y-3.5 text-lg">
            {skills.map(({ category, icon, items }) => {
              const isOpen = openItem === category;
              const panelId = `skill-panel-${category.replace(/\W+/g, "-").toLowerCase()}`;
              return (
                <li key={category} className="w-full">
                  <div
                    className={`card relative w-full rounded-2xl text-left transition-all duration-200 border overflow-hidden backdrop-blur-xl ${
                      isOpen
                        ? "bg-[var(--card-hover-bg)] border-[var(--sec)]/70 shadow-sm ring-1 ring-[var(--sec)]/30"
                        : "border-[var(--white-icon-tr)] hover:border-[var(--sec)]/40 hover:bg-[var(--card-hover-bg)]"
                    }`}
                  >
                    {/* Clean Left Accent Strip on Open */}
                    {isOpen && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[var(--sec)] to-purple-500 rounded-l-2xl z-10" />
                    )}

                    <button
                      type="button"
                      onClick={() => toggleItem(category)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-center gap-3 p-4 cursor-pointer"
                    >
                      <div className="shrink-0">{icon}</div>
                      <span className="flex items-center gap-2 flex-grow justify-between min-w-0">
                        <span
                          className={`block truncate text-base sm:text-lg transition-colors ${
                            isOpen ? "text-[var(--white)] font-semibold" : "text-[var(--white)]"
                          }`}
                        >
                          {category}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-5 h-5 transform transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? "rotate-180 text-[var(--sec)]" : "text-[var(--white-icon)]"
                          }`}
                        >
                          <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                        </svg>
                      </span>
                    </button>

                    <div
                      id={panelId}
                      className={`grid transition-all duration-250 ease-in-out px-4 ${
                        isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0 pb-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-2 text-[var(--white-icon)] text-xs sm:text-sm pl-1 pt-1 border-t border-[var(--white-icon-tr)]">
                          {items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span className="text-[var(--sec)] font-bold mt-0.5">•</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Interactive Code Terminal (Desktop) */}
        <div className="hidden lg:flex flex-1 w-full min-w-0 self-start sticky top-24 transition-all duration-300">
          <CodeTerminal
            activeCategory={openItem || skills[0].category}
            onSelectCategory={(category) => setOpenItem(category)}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsList;
