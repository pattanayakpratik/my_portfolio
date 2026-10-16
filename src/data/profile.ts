/**
 * Single source of truth for all personal content on the portfolio.
 * Update values here and every section of the site picks them up.
 */

export const profile = {
  name: "Pratik Pattanayak",
  firstName: "Pratik",
  role: "Backend & AI Engineer",
  location: "Mumbai, India",
  email: "mr.pratikpattanayak@gmail.com",
  resume: "/Pratik_Pattanayak_Resume.pdf",
  summary:
    "Backend Engineer and AWS-certified ML practitioner building scalable backend systems, analytical APIs, and production-grade Generative AI integrations with Python and JavaScript.",
  socials: {
    github: "https://github.com/pattanayakpratik",
    linkedin: "https://www.linkedin.com/in/pattanayakpratik",
    leetcode: "https://leetcode.com/u/pattanayakpratik/",
  },
} as const;

export const stats = [
  { value: "8.65", label: "B.Sc. IT CGPI" },
  { value: "AWS", label: "Certified ML & AI" },
  { value: "15+", label: "Open-source repos" },
] as const;

/** Logos shown in the scrolling tech marquee (files live in /public/svg/tech). */
export const techStack = [
  { name: "Python", icon: "python" },
  { name: "Flask", icon: "flask" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Next.js", icon: "next" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "Supabase", icon: "supabase" },
  { name: "SQLite", icon: "sqlite" },
  { name: "Gemini", icon: "gemini" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "scikit-learn", icon: "scikitlearn" },
  { name: "Pandas", icon: "pandas" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "React", icon: "react" },
  { name: "Flutter", icon: "flutter" },
  { name: "Dart", icon: "dart" },
  { name: "Java", icon: "java" },
  { name: "C++", icon: "cplusplus" },
  { name: "C#", icon: "csharp" },
  { name: ".NET", icon: "dotnet" },
  { name: "Bash", icon: "bash" },
  { name: "HTML5", icon: "html5" },
  { name: "CSS3", icon: "css3" },
  { name: "AWS", icon: "aws" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Postman", icon: "postman" },
  { name: "LeetCode", icon: "leetcode" },
] as const;

export interface Experience {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: { title: string; text: string }[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    role: "Backend Engineer",
    company: "Dirtcube Interactive",
    period: "Jun 2026 — Present",
    current: true,
    points: [
      {
        title: "Agentic AI & Campaign Automation",
        text: "Engineered 'Blitz' and 'Radar' AI agents for autonomous market research, creative handoffs, and propose-then-confirm ad campaign generation across Meta, Google, and Reddit.",
      },
      {
        title: "Advanced Analytics & SQL Optimization",
        text: "Optimized complex cohort analysis, WoW growth calculations, and API cost metrics by replacing iterative queries with highly efficient single-pass PostgreSQL statements.",
      },
      {
        title: "Next.js Admin & Studio Workflows",
        text: "Built a comprehensive Next.js studio featuring capability-based RBAC, real-time polling dashboards, chat-driven scheduling, and cross-platform ad metrics summaries.",
      },
      {
        title: "React Native Telemetry & Attribution",
        text: "Architected a precise V8 analytics engine in Expo React Native, tracking tray sessions, feed impressions, referral attributions, and platform-specific share behaviors.",
      },
      {
        title: "Push Notifications & Deep Linking",
        text: "Implemented iOS notification service extensions and robust deep-linking to handle async cold-start taps flawlessly without UI flashes or dropped events.",
      },
    ],
    tags: ["Next.js", "React Native", "PostgreSQL", "AI Agents", "Meta API", "TypeScript", "Expo"],
  },
  {
    role: "Python & AI Developer",
    company: "Self-Employed / Freelance",
    period: "2024 — Present",
    current: true,
    points: [
      {
        title: "End-to-End AI Engineering",
        text: "Architected, developed, and deployed custom AI-powered applications, intelligent desktop assistants, and network automation tools.",
      },
      {
        title: "Backend & LLM Architecture",
        text: "Integrated Generative AI APIs (Gemini, LLaMA via Groq) into production workflows, applying prompt engineering and context building to sharpen LLM reasoning.",
      },
    ],
    tags: ["Gemini", "Groq / LLaMA", "RAG", "Flask", "Automation"],
  },
];

export interface Education {
  title: string;
  detail: string;
  image?: string;
}

export const education: Education[] = [
  {
    title: "B.Sc. Information Technology",
    detail: "Graduated 2026 · CGPI 8.65 · Sem 6 SGPA 9.10",
  },
  {
    title: "Higher Secondary (WBCHSE)",
    detail: "Datan Bhagabat Charan High School · 2023 · 65.2% (Grade B+)",
  },
  {
    title: "Secondary (WBBSE)",
    detail: "Arunya Netaji Siksha Niketan · 2021 · 83.85% (Grade A+)",
  },
];

export interface Certification {
  title: string;
  detail: string;
  image?: string;
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified",
    detail: "Fundamentals of Machine Learning and Artificial Intelligence",
    image: "/certifications/AIMLbyAWS.pdf"
  },
  { 
    title: "Python for Data Science", 
    detail: "SkillEcted",
    image: "/certifications/pydataScience.pdf"
  },
  { title: "MS-CIT", detail: "MKCL · 2024" },
];

export interface ProjectScreenshot {
  id: string;
  label: string;
  shortTag: string;
  stateColor: string;
  caption: string;
  src: string;
}

export interface FeaturedProject {
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: "cypher" | "pyshare";
  repo: string;
  tags: string[];
  version?: string;
  downloadUrl?: string;
  releaseUrl?: string;
  fileSize?: string;
  screenshots?: ProjectScreenshot[];
  extendedDetails?: {
    overview: string;
    specs: { title: string; desc: string; icon: string }[];
    quickStart: string[];
  };
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Cypher",
    tagline: "Holographic F.R.I.D.A.Y. Desktop HUD & Autonomous Voice Assistant",
    description:
      "A futuristic desktop AI assistant featuring an animated multi-ring Arc Reactor HUD, real-time 32-band audio spectrum equalizer, telemetry gauges, and OS automation powered by Google Gemini 1.5 Flash.",
    highlights: [
      "Gemini 1.5 Flash as the primary reasoning engine with context management & semantic parsing",
      "Agentic workflows for autonomous Gmail reading/sending (IMAP/SMTP) and WhatsApp dispatch",
      "Sci-fi PyQt5 holographic HUD with 4 reactive operational states & Arc Reactor",
      "Built-in Holographic Credentials Vault with live Google AI Studio connection test",
    ],
    image: "cypher",
    repo: "https://github.com/pattanayakpratik/Cypher-AI",
    tags: ["Python", "Gemini 1.5", "PyQt5", "Edge-TTS", "Standalone EXE", "Automation"],
    version: "v3.0.0",
    downloadUrl: "https://github.com/pattanayakpratik/Cypher-AI/releases/download/v3.0.0/Cypher-AI.exe",
    releaseUrl: "https://github.com/pattanayakpratik/Cypher-AI/releases/tag/v3.0.0",
    fileSize: "176 MB",
    screenshots: [
      {
        id: "idle",
        label: "Standby (Idle)",
        shortTag: "STANDBY",
        stateColor: "#22d3ee",
        caption: "Ambient cyan vector Arc Reactor featuring a 48-tick radar compass calibration ring, 3 energy blades, counter-rotating orbital satellite beads, and targeting reticles.",
        src: "/projects/cypher/cypher_gui_idle.png",
      },
      {
        id: "listening",
        label: "Listening",
        shortTag: "LISTENING",
        stateColor: "#4ade80",
        caption: "Matrix-green alert protocol with expanding sonar ripple wave pulses radiating outward from the reactor core during microphone speech capture.",
        src: "/projects/cypher/cypher_gui_listening.png",
      },
      {
        id: "processing",
        label: "Processing",
        shortTag: "PROCESSING",
        stateColor: "#38bdf8",
        caption: "Electric-blue vortex hyperspeed core rotation with accelerated energy arcs while Google Gemini 1.5 Flash synthesizes contextual responses.",
        src: "/projects/cypher/cypher_gui_processing.png",
      },
      {
        id: "speaking",
        label: "Vocalizing",
        shortTag: "SPEAKING",
        stateColor: "#f43f5e",
        caption: "Neon-magenta HUD color transition, harmonic core vocal pulse, and real-time 32-band audio spectrum frequency response with decaying peak caps.",
        src: "/projects/cypher/cypher_gui_speaking.png",
      },
      {
        id: "vault",
        label: "Credentials Vault",
        shortTag: "CONFIG",
        stateColor: "#fbbf24",
        caption: "Holographic glassmorphism settings dialog: configure Gemini, Groq, OpenWeather, and Gmail credentials with live diagnostic testing and zero-restart hot-reloading.",
        src: "/projects/cypher/cypher_settings_dialog.png",
      },
    ],
    extendedDetails: {
      overview:
        "Cypher AI v3.0.0 is an autonomous desktop companion engineered in Python and PyQt5. Inspired by Iron Man's F.R.I.D.A.Y., it bridges generative AI intelligence with system-level Windows automation, neural speech synthesis, and real-time hardware telemetry.",
      specs: [
        {
          title: "Multi-Ring Arc Reactor",
          desc: "48-tick radar compass, counter-rotating energy blades, orbital satellite beads, and central targeting crosshairs.",
          icon: "reactor",
        },
        {
          title: "32-Band Audio Equalizer",
          desc: "Harmonic frequency spectrum visualizer with dynamic wave dynamics and floating white peak caps.",
          icon: "audio",
        },
        {
          title: "12-Segment LED Telemetry",
          desc: "Real-time hardware gauges for CPU load, RAM allocation, battery status, and disk storage with color shifts.",
          icon: "telemetry",
        },
        {
          title: "One-Click Credentials Vault",
          desc: "Configure API keys inside the GUI with live AI Studio connection probes and zero manual .env editing.",
          icon: "vault",
        },
      ],
      quickStart: [
        "Download the standalone Cypher-AI.exe (176 MB) — no Python or terminal needed.",
        "Double-click to launch the holographic interface.",
        "Enter your free Google Gemini API key into the Vault and start voice commanding!",
      ],
    },
  },
  {
    title: "PyShare",
    tagline: "High-Speed Local Data Transfer Platform",
    description:
      "A custom backend networking tool for instant, offline PC-to-mobile file transfer over local Wi-Fi.",
    highlights: [
      "Pure Python socket programming & HTTP — no external servers involved",
      "QR-code pairing for zero-config device connection",
      "Lightweight, open-source and fully offline",
    ],
    image: "pyshare",
    repo: "https://github.com/pattanayakpratik/PyShare",
    tags: ["Python", "Sockets", "HTTP", "Networking"],
  },
];

export interface MiniProject {
  title: string;
  description: string;
  repo: string;
  tags: string[];
}

export const otherProjects: MiniProject[] = [
  {
    title: "AI Transaction Processor",
    description:
      "Backend API that ingests CSVs, processes them asynchronously via a job queue, and uses an LLM to classify transactions and flag anomalies.",
    repo: "https://github.com/pattanayakpratik/AI-Transaction-Processing-assignment-task",
    tags: ["Python", "LLM", "Job Queue"],
  },
  {
    title: "Dynamic PDF Generator",
    description:
      "Automated PDF engine that converts dynamic JSON data into professional reports instantly.",
    repo: "https://github.com/pattanayakpratik/Dynamic-PDF-Template-Generation-Module",
    tags: ["Python", "Automation"],
  },
  {
    title: "Vibe Matcher",
    description:
      "AI-powered prototype that recommends fashion items by matching the 'vibe' described in natural language.",
    repo: "https://github.com/pattanayakpratik/vibe_matcher",
    tags: ["AI", "NLP", "Jupyter"],
  },
  {
    title: "Binance Futures Bot",
    description:
      "Command-line trading bot that places and manages orders on the Binance Futures Testnet.",
    repo: "https://github.com/pattanayakpratik/pratik_pattanayak_binance_bot",
    tags: ["Python", "REST API", "CLI"],
  },
  {
    title: "Expense Tracker",
    description:
      "Secure personal finance manager with a glassmorphism CustomTkinter UI, Matplotlib analytics and SQLite storage.",
    repo: "https://github.com/pattanayakpratik/Expense-Tracker-GUI",
    tags: ["Python", "SQLite", "GUI"],
  },
  {
    title: "CTS Digital Score Card",
    description:
      "Flutter app digitizing the Clean Train Station inspection process with coach-wise scoring and remarks.",
    repo: "https://github.com/pattanayakpratik/cts_digital_score_card",
    tags: ["Flutter", "Dart", "Mobile"],
  },
];
