import { useState } from "react";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
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
    // lucide: server
    icon: (
      <svg {...iconProps}>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
    items: [
      "RESTful APIs with Python & Flask",
      "Analytics dashboards & data-viz endpoints",
      "Push-notification systems & segment resolvers",
      "Schema migrations & SQL query optimization",
    ],
  },
  {
    category: "Generative AI & Agents",
    // lucide: sparkles
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
    // lucide: brain-circuit
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
    // lucide: workflow
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
      "Desktop apps with PyQt5 / Tkinter",
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
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        What I do?
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {skills.map(({ category, icon, items }) => {
          const isOpen = openItem === category;
          const panelId = `skill-panel-${category.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <li key={category} className="w-full">
              <div
                className={`md:w-[420px] w-full bg-[#1414149c] rounded-2xl text-left transition-all border overflow-hidden ${
                  isOpen
                    ? "border-[#22d3ee40]"
                    : "border-[var(--white-icon-tr)] hover:border-[#ffffff25]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(category)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center gap-3 p-4 cursor-pointer"
                >
                  {icon}
                  <span className="flex items-center gap-2 flex-grow justify-between min-w-0">
                    <span className="block truncate text-[var(--white)] text-lg">
                      {category}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 text-[var(--white)] transform transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  className={`transition-all duration-300 px-4 ${
                    isOpen ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="pl-1 text-[var(--sec)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SkillsList;
