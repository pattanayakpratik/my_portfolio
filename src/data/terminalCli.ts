import { profile, stats } from "@/data/profile";

export interface CliOutputLine {
  text: string;
  type?: "default" | "success" | "warning" | "error" | "info" | "ascii";
}

export const ASCII_LOGO = `
       ██████╗ ██████╗ 
       ██╔══██╗██╔══██╗
       ██████╔╝██████╔╝
       ██╔═══╝ ██╔═══╝ 
       ██║     ██║     
       ╚═╝     ╚═╝     
`;

export function getNeofetchOutput(theme: string): CliOutputLine[] {
  return [
    { text: "   ██████╗ ██████╗    User: guest@pattanayakpratik.vercel.app", type: "info" },
    { text: "   ██╔══██╗██╔══██╗   -------------------------------------", type: "ascii" },
    { text: `   ██████╔╝██████╔╝   OS: PortfolioOS (Next.js 16 + React 19)`, type: "ascii" },
    { text: `   ██╔═══╝ ██╔═══╝    Host: Vercel Global Edge Network`, type: "ascii" },
    { text: `   ██║     ██║        Kernel: Node.js 22 LTS / Edge`, type: "ascii" },
    { text: `   ╚═╝     ╚═╝        Shell: web-zsh 5.9 (Interactive)`, type: "ascii" },
    { text: `                      Theme: ${theme.toUpperCase()}`, type: "ascii" },
    { text: `                      Role: ${profile.role}`, type: "ascii" },
    { text: `                      Location: ${profile.location}`, type: "ascii" },
    { text: `                      CGPI: ${stats[0].value} (${stats[0].label})`, type: "ascii" },
    { text: `                      Certification: AWS Certified (${stats[1].label})`, type: "ascii" },
    { text: `                      Stack: Python, Next.js, Flask, FastAPI, Postgres`, type: "ascii" },
    { text: `                      Status: Open to high-impact opportunities 🚀`, type: "success" },
  ];
}

export const HELP_LINES: CliOutputLine[] = [
  { text: "PORTFOLIO INTERACTIVE CLI v2.0 - AVAILABLE COMMANDS:", type: "info" },
  { text: "  neofetch       Display system specs, stack, and profile banner", type: "default" },
  { text: "  theme <mode>   Change theme: 'light', 'dark', or 'toggle'", type: "default" },
  { text: "  matrix         Launch digital rain visualizer (type 'q' to stop)", type: "default" },
  { text: "  ask <query>    Ask the local AI assistant about Pratik", type: "default" },
  { text: "  projects       List featured engineering projects & links", type: "default" },
  { text: "  skills         Show core engineering competencies", type: "default" },
  { text: "  cat resume     Print resume highlights & download URL", type: "default" },
  { text: "  contact        Show email and social profiles", type: "default" },
  { text: "  clear          Clear the terminal screen", type: "default" },
  { text: "  exit           Switch back to code viewer tab", type: "default" },
];

export function handleAskQuery(query: string): CliOutputLine[] {
  const q = query.toLowerCase().trim();

  if (!q) {
    return [
      { text: "Please provide a question. Example: 'ask what are your top projects?' or 'ask how can I contact you?'", type: "warning" },
    ];
  }

  if (q.includes("project") || q.includes("pyshare") || q.includes("cypher")) {
    return [
      { text: "Featured Projects by Pratik:", type: "info" },
      { text: "1. PyShare: Cross-platform P2P LAN file transfer engine with chunked TCP streaming & UDP discovery. Visit /projects/pyshare", type: "default" },
      { text: "2. Cypher: Desktop voice assistant with async event loop, offline heuristics, and PyQt modern UI. Visit /projects/cypher", type: "default" },
    ];
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language")) {
    return [
      { text: "Core Tech Stack:", type: "info" },
      { text: "• Languages: Python, TypeScript, JavaScript, SQL, C++, Bash", type: "default" },
      { text: "• Frameworks: Next.js, React, Flask, FastAPI, Tailwind CSS", type: "default" },
      { text: "• AI & Data: Gemini API, Groq, ChromaDB (RAG), scikit-learn, TensorFlow", type: "default" },
      { text: "• Databases & Cloud: PostgreSQL, Supabase, MySQL, AWS (Certified), Vercel", type: "default" },
    ];
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
    return [
      { text: "Get in touch with Pratik:", type: "info" },
      { text: `• Email: ${profile.email}`, type: "default" },
      { text: `• LinkedIn: ${profile.socials.linkedin}`, type: "default" },
      { text: `• GitHub: ${profile.socials.github}`, type: "default" },
    ];
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("cgpa") || q.includes("cgpi")) {
    return [
      { text: "Education & Qualifications:", type: "info" },
      { text: `• B.Sc. Information Technology — CGPI: ${stats[0].value}`, type: "default" },
      { text: "• AWS Certified Machine Learning & AI Practitioner", type: "default" },
    ];
  }

  if (q.includes("who") || q.includes("about") || q.includes("pratik")) {
    return [
      { text: `${profile.name} — ${profile.role}`, type: "info" },
      { text: profile.summary, type: "default" },
      { text: `Location: ${profile.location}`, type: "default" },
    ];
  }

  return [
    { text: `Assistant: I found relevant info for "${query}":`, type: "info" },
    { text: `Pratik is a ${profile.role} based in ${profile.location}.`, type: "default" },
    { text: "Try asking about 'projects', 'skills', 'education', or 'contact'!", type: "default" },
  ];
}
