"use client";

import { useState, useRef, useEffect } from "react";

export interface CodeSnippet {
  category: string;
  filename: string;
  tabLabel: string;
  lang: string;
  lines: {
    num: string;
    tokens: { text: string; color: string }[];
  }[];
  output: {
    badge: string;
    badgeColor: string;
    message: string;
  };
}

export const codeSnippets: Record<string, CodeSnippet> = {
  "Backend Engineering": {
    category: "Backend Engineering",
    filename: "api/routes/analytics.py",
    tabLabel: "analytics.py",
    lang: "python",
    lines: [
      {
        num: "01",
        tokens: [
          { text: "from ", color: "keyword" },
          { text: "fastapi ", color: "text" },
          { text: "import ", color: "keyword" },
          { text: "APIRouter, Depends", color: "entity" },
        ],
      },
      {
        num: "02",
        tokens: [
          { text: "from ", color: "keyword" },
          { text: "app.database ", color: "text" },
          { text: "import ", color: "keyword" },
          { text: "get_async_session", color: "entity" },
        ],
      },
      {
        num: "03",
        tokens: [
          { text: "router ", color: "variable" },
          { text: "= ", color: "operator" },
          { text: "APIRouter", color: "entity" },
          { text: '(prefix=', color: "text" },
          { text: '"/v1/metrics"', color: "string" },
          { text: ")", color: "text" },
        ],
      },
      {
        num: "04",
        tokens: [],
      },
      {
        num: "05",
        tokens: [
          { text: "@router", color: "variable" },
          { text: ".get(", color: "text" },
          { text: '"/summary"', color: "string" },
          { text: ", response_model=MetricSummary)", color: "text" },
        ],
      },
      {
        num: "06",
        tokens: [
          { text: "async def ", color: "keyword" },
          { text: "get_metrics_summary", color: "function" },
          { text: "(db = ", color: "text" },
          { text: "Depends", color: "entity" },
          { text: "(get_async_session)):", color: "text" },
        ],
      },
      {
        num: "07",
        tokens: [
          { text: '    """Aggregate throughput, p99 latency & active workers."""', color: "comment" },
        ],
      },
      {
        num: "08",
        tokens: [
          { text: "    query = ", color: "text" },
          { text: "select", color: "keyword" },
          { text: "(Metrics).filter_by(status=", color: "text" },
          { text: '"active"', color: "string" },
          { text: ")", color: "text" },
        ],
      },
      {
        num: "09",
        tokens: [
          { text: "    result = ", color: "text" },
          { text: "await ", color: "keyword" },
          { text: "db.execute(query)", color: "text" },
        ],
      },
      {
        num: "10",
        tokens: [
          { text: "    metrics = ", color: "text" },
          { text: "{", color: "text" },
          { text: '"status"', color: "string" },
          { text: ': "ok", ', color: "text" },
          { text: '"latency_ms"', color: "string" },
          { text: ": 14.8, ", color: "text" },
          { text: '"rps"', color: "string" },
          { text: ": 1420}", color: "text" },
        ],
      },
      {
        num: "11",
        tokens: [
          { text: "    return ", color: "keyword" },
          { text: "metrics", color: "variable" },
        ],
      },
    ],
    output: {
      badge: "HTTP 200 OK",
      badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      message: '{"status": "ok", "latency_ms": 14.8, "throughput_rps": 1420, "db": "PostgreSQL"}',
    },
  },
  "Generative AI & Agents": {
    category: "Generative AI & Agents",
    filename: "agents/rag_orchestrator.py",
    tabLabel: "rag_orchestrator.py",
    lang: "python",
    lines: [
      {
        num: "01",
        tokens: [
          { text: "from ", color: "keyword" },
          { text: "google.genai ", color: "text" },
          { text: "import ", color: "keyword" },
          { text: "Client", color: "entity" },
        ],
      },
      {
        num: "02",
        tokens: [
          { text: "from ", color: "keyword" },
          { text: "chromadb ", color: "text" },
          { text: "import ", color: "keyword" },
          { text: "HttpClient", color: "entity" },
        ],
      },
      {
        num: "03",
        tokens: [],
      },
      {
        num: "04",
        tokens: [
          { text: "class ", color: "keyword" },
          { text: "AIAgentOrchestrator", color: "entity" },
          { text: ":", color: "text" },
        ],
      },
      {
        num: "05",
        tokens: [
          { text: "    def ", color: "keyword" },
          { text: "__init__", color: "function" },
          { text: "(self, model_id=", color: "text" },
          { text: '"gemini-2.5-flash"', color: "string" },
          { text: "):", color: "text" },
        ],
      },
      {
        num: "06",
        tokens: [
          { text: "        self.client = ", color: "text" },
          { text: "Client", color: "entity" },
          { text: "()", color: "text" },
        ],
      },
      {
        num: "07",
        tokens: [
          { text: "        self.vector_db = ", color: "text" },
          { text: "HttpClient", color: "entity" },
          { text: "().get_collection(", color: "text" },
          { text: '"kb_docs"', color: "string" },
          { text: ")", color: "text" },
        ],
      },
      {
        num: "08",
        tokens: [],
      },
      {
        num: "09",
        tokens: [
          { text: "    async def ", color: "keyword" },
          { text: "run_agent_task", color: "function" },
          { text: "(self, prompt: str) -> ", color: "text" },
          { text: "AgentOutput", color: "entity" },
          { text: ":", color: "text" },
        ],
      },
      {
        num: "10",
        tokens: [
          { text: "        context = ", color: "text" },
          { text: "await ", color: "keyword" },
          { text: "self.vector_db.query(query_texts=[prompt], n_results=4)", color: "text" },
        ],
      },
      {
        num: "11",
        tokens: [
          { text: "        return ", color: "keyword" },
          { text: "await ", color: "keyword" },
          { text: "self.client.generate_response(prompt, context=context)", color: "text" },
        ],
      },
    ],
    output: {
      badge: "Agent Stream",
      badgeColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30",
      message: "Vector match: 0.94 · Context: 4 chunks · Model: gemini-2.5-flash · Latency: 280ms",
    },
  },
  "Machine Learning": {
    category: "Machine Learning",
    filename: "models/classifier.py",
    tabLabel: "classifier.py",
    lang: "python",
    lines: [
      {
        num: "01",
        tokens: [
          { text: "import ", color: "keyword" },
          { text: "pandas ", color: "text" },
          { text: "as ", color: "keyword" },
          { text: "pd", color: "entity" },
        ],
      },
      {
        num: "02",
        tokens: [
          { text: "from ", color: "keyword" },
          { text: "sklearn.ensemble ", color: "text" },
          { text: "import ", color: "keyword" },
          { text: "GradientBoostingClassifier", color: "entity" },
        ],
      },
      {
        num: "03",
        tokens: [
          { text: "from ", color: "keyword" },
          { text: "sklearn.metrics ", color: "text" },
          { text: "import ", color: "keyword" },
          { text: "classification_report", color: "entity" },
        ],
      },
      {
        num: "04",
        tokens: [],
      },
      {
        num: "05",
        tokens: [
          { text: "def ", color: "keyword" },
          { text: "train_predictive_pipeline", color: "function" },
          { text: "(dataset_uri: str):", color: "text" },
        ],
      },
      {
        num: "06",
        tokens: [
          { text: '    """Feature engineering & gradient boosted training."""', color: "comment" },
        ],
      },
      {
        num: "07",
        tokens: [
          { text: "    df = pd.read_parquet(dataset_uri)", color: "text" },
        ],
      },
      {
        num: "08",
        tokens: [
          { text: "    X_train, X_test, y_train, y_test = prepare_feature_splits(df)", color: "text" },
        ],
      },
      {
        num: "09",
        tokens: [
          { text: "    model = ", color: "text" },
          { text: "GradientBoostingClassifier", color: "entity" },
          { text: "(n_estimators=120, max_depth=5)", color: "text" },
        ],
      },
      {
        num: "10",
        tokens: [
          { text: "    model.fit(X_train, y_train)", color: "text" },
        ],
      },
      {
        num: "11",
        tokens: [
          { text: "    return ", color: "keyword" },
          { text: "classification_report(y_test, model.predict(X_test), output_dict=", color: "text" },
          { text: "True", color: "keyword" },
          { text: ")", color: "text" },
        ],
      },
    ],
    output: {
      badge: "Inference 96.4%",
      badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      message: "Model: GBDT · Accuracy: 96.4% · F1-Score: 0.942 · Inference: 2.1ms/sample",
    },
  },
  "Automation & Tooling": {
    category: "Automation & Tooling",
    filename: "scripts/deploy_pipeline.sh",
    tabLabel: "deploy_pipeline.sh",
    lang: "bash",
    lines: [
      {
        num: "01",
        tokens: [
          { text: "#!/usr/bin/env bash", color: "comment" },
        ],
      },
      {
        num: "02",
        tokens: [
          { text: "set ", color: "keyword" },
          { text: "-euo pipefail", color: "text" },
        ],
      },
      {
        num: "03",
        tokens: [],
      },
      {
        num: "04",
        tokens: [
          { text: "echo ", color: "keyword" },
          { text: '"==> Running database cluster health-check..."', color: "string" },
        ],
      },
      {
        num: "05",
        tokens: [
          { text: "python3 -m app.cli check-db --target=supabase_postgres", color: "text" },
        ],
      },
      {
        num: "06",
        tokens: [],
      },
      {
        num: "07",
        tokens: [
          { text: "echo ", color: "keyword" },
          { text: '"==> Executing automated migration scripts..."', color: "string" },
        ],
      },
      {
        num: "08",
        tokens: [
          { text: "alembic upgrade head", color: "function" },
        ],
      },
      {
        num: "09",
        tokens: [],
      },
      {
        num: "10",
        tokens: [
          { text: "echo ", color: "keyword" },
          { text: '"==> Sending WhatsApp & Webhook event notification..."', color: "string" },
        ],
      },
      {
        num: "11",
        tokens: [
          { text: 'python3 -m automation.notify --event="deployment_success"', color: "text" },
        ],
      },
    ],
    output: {
      badge: "Pipeline Success",
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      message: "[+] All services verified · Schema upgraded · WhatsApp webhook dispatched (0 errors)",
    },
  },
};

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

  // Automatically scroll active tab into view when activeCategory changes
  useEffect(() => {
    const activeBtn = tabRefs.current[activeCategory];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
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
