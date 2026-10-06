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
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "Gemini", icon: "gemini" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "scikit-learn", icon: "scikitlearn" },
  { name: "Pandas", icon: "pandas" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Flutter", icon: "flutter" },
  { name: "Java", icon: "java" },
  { name: "AWS", icon: "aws" },
  { name: "Git", icon: "git" },
  { name: "Postman", icon: "postman" },
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
    image: "/certifications/class-xii-certificate.pdf"
  },
  {
    title: "Secondary (WBBSE)",
    detail: "Arunya Netaji Siksha Niketan · 2021 · 83.85% (Grade A+)",
    image: "/certifications/class-x-marksheet.pdf"
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

export interface FeaturedProject {
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: "cypher" | "pyshare";
  repo: string;
  tags: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Cypher",
    tagline: "AI-Powered Workflow & Desktop Automation Agent",
    description:
      "A fast, multi-model AI assistant that converts natural language into reliable system-level automation.",
    highlights: [
      "Gemini 1.5 Flash as the primary reasoning engine with context management & semantic parsing",
      "Agentic workflows for autonomous Gmail reading/sending (IMAP/SMTP) and WhatsApp dispatch",
      "Sci-fi PyQt5 interface with voice recognition",
    ],
    image: "cypher",
    repo: "https://github.com/pattanayakpratik/Cypher-AI",
    tags: ["Python", "Gemini", "PyQt5", "Automation"],
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
