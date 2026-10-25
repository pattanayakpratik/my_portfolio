export interface CodeToken {
  text: string;
  color: string;
}

export interface CodeLine {
  num: string;
  tokens: CodeToken[];
}

export interface CodeSnippet {
  category: string;
  filename: string;
  tabLabel: string;
  lang: string;
  lines: CodeLine[];
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
