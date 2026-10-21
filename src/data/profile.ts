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
  liveUrl?: string;
  showcaseUrl?: string;
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
    showcaseUrl: "/projects/cypher",
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
    tagline: "High-Speed Cross-Device File Transfer & Clipboard Hub",
    description:
      "A modern, ultra-fast cross-platform file transfer and universal clipboard hub. Effortlessly share files, photos, media, and text between PC, Mac, iPhone, Android, and Tablets with zero configuration via WebRTC P2P or offline local Wi-Fi.",
    highlights: [
      "Zero-install Web Mode with WebRTC P2P DataChannels hosted live at pyshare.vercel.app",
      "High-speed offline Wi-Fi LAN transfer (50–100 MB/s) with 1-click Cloudflare Internet Tunnel",
      "In-app media preview lightbox with HTTP 206 Partial Content video seeking & audio streaming",
      "Universal bidirectional shared clipboard with 1-click native Windows OS clipboard push",
      "Dynamic QR-code generation & rotating 4-digit PIN authentication with grace rollover",
    ],
    image: "pyshare",
    repo: "https://github.com/pattanayakpratik/PyShare",
    showcaseUrl: "/projects/pyshare",
    liveUrl: "https://pyshare.vercel.app",
    tags: ["WebRTC", "Python", "P2P", "Fast Transfer", "Standalone EXE", "Sockets", "Vercel"],
    version: "v4.6.0",
    downloadUrl: "https://github.com/pattanayakpratik/PyShare/releases/download/v4.6.0/PyShare.exe",
    releaseUrl: "https://github.com/pattanayakpratik/PyShare/releases/tag/v4.6.0",
    fileSize: "Standalone EXE",
    screenshots: [
      {
        id: "host_dark",
        label: "Desktop Studio (Host)",
        shortTag: "HOST STUDIO",
        stateColor: "#38bdf8",
        caption: "Command center for Windows PC: dynamic QR pairing, 30s PIN countdown, 1-click Cloudflare tunnel, received/shared files manager with ZIP-all download, and live SSE event monitor.",
        src: "/projects/pyshare/host_dark.png",
      },
      {
        id: "mobile_host",
        label: "Mobile P2P Host",
        shortTag: "PHONE AS HOST",
        stateColor: "#a855f7",
        caption: "Phone-to-phone WebRTC P2P mode: Phone A creates an instant Room PIN and QR code directly in mobile Safari or Chrome; Phone B scans to transfer files with zero PC and zero app install.",
        src: "/projects/pyshare/mobile_host_dark.png",
      },
      {
        id: "client_mobile",
        label: "Mobile Client",
        shortTag: "CLIENT VIEW",
        stateColor: "#10b981",
        caption: "Touch-friendly mobile interface with PIN keypad authentication, Send-to-PC cloud dropzone, Download files manager with search, media preview lightbox, and 1-tap clipboard beam.",
        src: "/projects/pyshare/client_dark.png",
      },
      {
        id: "web_transfer",
        label: "Instant Web Transfer",
        shortTag: "ZERO INSTALL",
        stateColor: "#f59e0b",
        caption: "Browser-to-browser WebRTC DataChannel transfer running live on pyshare.vercel.app: Create Room, enter PIN, or drag-and-drop files across devices worldwide without downloading any software.",
        src: "/projects/pyshare/web_transfer.png",
      },
      {
        id: "guide",
        label: "Interactive Guide",
        shortTag: "HOW-TO GUIDE",
        stateColor: "#6366f1",
        caption: "Comprehensive built-in visual user manual and troubleshooting guide: step-by-step connection instructions for Wi-Fi LAN, Hotspot, and Web P2P modes.",
        src: "/projects/pyshare/guide.png",
      },
      {
        id: "host_light",
        label: "Host Studio (Light)",
        shortTag: "LIGHT THEME",
        stateColor: "#64748b",
        caption: "High-contrast clean light mode with smooth theme toggling, optimized for bright environments.",
        src: "/projects/pyshare/host_white.png",
      },
    ],
    extendedDetails: {
      overview:
        "PyShare v4.6.0 is an ultra-fast, cross-device file transfer and clipboard hub designed for instant connectivity between PC, Mac, iPhone, Android, and Tablets. It offers two flexible operation modes: a zero-install WebRTC P2P web app hosted at pyshare.vercel.app, and a standalone offline Windows executable capable of 50–100 MB/s local network speeds.",
      specs: [
        {
          title: "WebRTC P2P Engine",
          desc: "Direct browser-to-browser DataChannels with STUN signaling for worldwide cross-device transfer without installing software.",
          icon: "webrtc",
        },
        {
          title: "HTTP 206 Streaming",
          desc: "Partial content byte-range streaming for instantaneous video/audio scrubbing and playback directly in browser lightboxes.",
          icon: "stream",
        },
        {
          title: "Universal Clipboard Sync",
          desc: "Bidirectional text/link sharing with in-memory state and 1-click native Windows OS clipboard injection.",
          icon: "clipboard",
        },
        {
          title: "Zero-Config Discovery & Tunnel",
          desc: "Dynamic QR generation, rotating 4-digit PIN with grace period, mDNS Zeroconf broadcast, and 1-click Cloudflare Internet Tunnel.",
          icon: "tunnel",
        },
      ],
      quickStart: [
        "Instant Web Mode: Open pyshare.vercel.app in any browser, tap 'Create Room', and scan QR code on another device.",
        "Desktop App Mode: Download PyShare.exe standalone (no Python required) and double-click to launch the offline hub.",
        "Connect phones and laptops via local Wi-Fi, hotspot, or Internet tunnel to share files and clipboard at maximum speeds.",
      ],
    },
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
