"use client";

import { useState, useRef, useEffect } from "react";
import {
  HELP_LINES,
  getNeofetchOutput,
  handleAskQuery,
  type CliOutputLine,
} from "@/data/terminalCli";
import { profile } from "@/data/profile";
import { showToast } from "./Toast";

interface InteractiveCliProps {
  onExit: () => void;
}

export default function InteractiveCli({ onExit }: InteractiveCliProps) {
  const [history, setHistory] = useState<CliOutputLine[]>([
    { text: "PortfolioOS v2.4 (x86_64-vercel-linux) - Interactive Shell", type: "info" },
    { text: "Type 'help' to view all commands, or 'neofetch' for system info.", type: "default" },
    { text: "Tip: Try 'matrix' for digital rain or 'theme dark'/'theme light' to toggle mode.", type: "ascii" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-scroll terminal on new history
  useEffect(() => {
    if (!isMatrixActive) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isMatrixActive]);

  // Focus input automatically
  useEffect(() => {
    if (!isMatrixActive) {
      inputRef.current?.focus();
    }
  }, [isMatrixActive]);

  // Matrix digital rain animation effect
  useEffect(() => {
    if (!isMatrixActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 320;

    const chars = "0123456789ABCDEFﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const draw = () => {
      ctx.fillStyle = "rgba(10, 15, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22d3ee";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Escape") {
        setIsMatrixActive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMatrixActive]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    const promptEcho: CliOutputLine = {
      text: `guest@portfolio:~$ ${trimmed}`,
      type: "info",
    };

    let newLines: CliOutputLine[] = [];

    switch (cmd) {
      case "help":
        newLines = HELP_LINES;
        break;

      case "neofetch":
      case "fetch": {
        const isDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");
        newLines = getNeofetchOutput(isDark ? "Dark" : "Light");
        break;
      }

      case "matrix":
        setIsMatrixActive(true);
        newLines = [
          { text: "Entering Matrix rain mode... Press 'q' or click to exit.", type: "success" },
        ];
        break;

      case "theme": {
        const mode = args.toLowerCase().trim();
        const root = document.documentElement;
        if (mode === "light") {
          root.classList.remove("dark");
          localStorage.setItem("theme", "light");
          window.dispatchEvent(new Event("themechange"));
          showToast("Switched to Light mode", "☀️");
          newLines = [{ text: "Theme set to: Light Mode", type: "success" }];
        } else if (mode === "dark") {
          root.classList.add("dark");
          localStorage.setItem("theme", "dark");
          window.dispatchEvent(new Event("themechange"));
          showToast("Switched to Dark mode", "🌙");
          newLines = [{ text: "Theme set to: Dark Mode", type: "success" }];
        } else if (mode === "toggle" || !mode) {
          const isDark = root.classList.contains("dark");
          if (isDark) {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
            showToast("Switched to Light mode", "☀️");
            newLines = [{ text: "Theme toggled to: Light Mode", type: "success" }];
          } else {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
            showToast("Switched to Dark mode", "🌙");
            newLines = [{ text: "Theme toggled to: Dark Mode", type: "success" }];
          }
          window.dispatchEvent(new Event("themechange"));
        } else {
          newLines = [
            { text: "Invalid argument. Use: 'theme light', 'theme dark', or 'theme toggle'", type: "error" },
          ];
        }
        break;
      }

      case "ask":
      case "ai":
        newLines = handleAskQuery(args);
        break;

      case "projects":
        newLines = [
          { text: "Active Projects in Repository:", type: "info" },
          { text: "• PyShare: Cross-Platform P2P LAN Transfer (Python / Next.js) -> /projects/pyshare", type: "default" },
          { text: "• Cypher: Intelligent Desktop Voice Assistant (PyQt / Python) -> /projects/cypher", type: "default" },
          { text: "Use your browser to visit these showcase routes!", type: "success" },
        ];
        break;

      case "skills":
        newLines = [
          { text: "Engineering Domains:", type: "info" },
          { text: "• Backend: Python, Flask, Node.js, RESTful APIs, Postgres, Supabase", type: "default" },
          { text: "• AI & ML: Gemini API, Groq, ChromaDB, scikit-learn, TensorFlow, AWS ML", type: "default" },
          { text: "• Systems: TCP Sockets, UDP Discovery, PyQt, Threading, Linux/Bash", type: "default" },
        ];
        break;

      case "cat":
        if (args.toLowerCase().includes("resume")) {
          newLines = [
            { text: `Resume for ${profile.name}:`, type: "info" },
            { text: `Role: ${profile.role} | Location: ${profile.location}`, type: "default" },
            { text: `CGPI: 8.65 (B.Sc. IT) | Certification: AWS Certified ML & AI`, type: "default" },
            { text: `Direct Download URL: ${profile.resume}`, type: "success" },
          ];
        } else {
          newLines = [{ text: `cat: ${args}: No such file. Try 'cat resume'`, type: "error" }];
        }
        break;

      case "contact":
        newLines = [
          { text: "Contact Information:", type: "info" },
          { text: `• Email: ${profile.email}`, type: "default" },
          { text: `• GitHub: ${profile.socials.github}`, type: "default" },
          { text: `• LinkedIn: ${profile.socials.linkedin}`, type: "default" },
        ];
        break;

      case "clear":
      case "cls":
        setHistory([]);
        return;

      case "exit":
        onExit();
        return;

      default:
        newLines = [
          { text: `command not found: ${cmd}. Type 'help' for available commands.`, type: "error" },
        ];
        break;
    }

    setHistory((prev) => [...prev, promptEcho, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  const getLineClass = (type?: string) => {
    switch (type) {
      case "info":
        return "text-[var(--sec)] font-semibold";
      case "success":
        return "text-emerald-500 dark:text-emerald-400";
      case "warning":
        return "text-amber-500 dark:text-amber-400";
      case "error":
        return "text-rose-500 dark:text-rose-400";
      case "ascii":
        return "text-slate-500 dark:text-slate-400 font-mono";
      default:
        return "text-slate-800 dark:text-slate-200";
    }
  };

  return (
    <div
      className="relative flex flex-col justify-between h-[360px] p-4 font-mono text-xs sm:text-[13px] overflow-hidden bg-[var(--card-bg)] select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Matrix Canvas Overlay */}
      {isMatrixActive ? (
        <div
          className="absolute inset-0 z-20 bg-black cursor-pointer flex flex-col items-center justify-between p-3"
          onClick={() => setIsMatrixActive(false)}
        >
          <div className="text-[11px] font-mono text-cyan-400 bg-black/80 px-3 py-1 rounded-full border border-cyan-500/30">
            [Matrix Mode: Active - Click anywhere or press &apos;q&apos; to exit]
          </div>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
      ) : null}

      {/* Terminal History Output */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-2 no-scrollbar">
        {history.map((line, idx) => (
          <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${getLineClass(line.type)}`}>
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Prompt Input Bar */}
      <div className="mt-3 pt-2 border-t border-[var(--white-icon-tr)] flex items-center gap-2 shrink-0">
        <span className="text-[var(--sec)] font-bold shrink-0">guest@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'neofetch', or 'ask ...'"
          className="flex-1 bg-transparent text-[var(--white)] font-mono text-xs sm:text-[13px] outline-none placeholder:text-[var(--white-icon)]/40"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
