"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Sun,
  Moon,
  Zap,
  Smartphone,
  Globe,
  Download,
  FileText,
  Search,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export interface ToastData {
  id: number;
  message: string;
  icon?: string;
}

export function showToast(message: string, icon: string = "check") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("portfolio-toast", {
        detail: { message, icon },
      })
    );
  }
}

function renderToastIcon(icon?: string) {
  switch (icon) {
    case "copy":
    case "📋":
      return <Copy className="size-3.5 text-[var(--sec)]" />;
    case "sun":
    case "☀️":
      return <Sun className="size-3.5 text-amber-400" />;
    case "moon":
    case "🌙":
      return <Moon className="size-3.5 text-blue-400" />;
    case "zap":
    case "⚡":
      return <Zap className="size-3.5 text-[var(--sec)]" />;
    case "mobile":
    case "phone":
    case "📱":
      return <Smartphone className="size-3.5 text-emerald-400" />;
    case "globe":
    case "🌐":
      return <Globe className="size-3.5 text-purple-400" />;
    case "download":
    case "save":
    case "💾":
      return <Download className="size-3.5 text-emerald-400" />;
    case "file":
    case "pdf":
    case "📄":
      return <FileText className="size-3.5 text-blue-400" />;
    case "search":
    case "🔍":
      return <Search className="size-3.5 text-[var(--sec)]" />;
    case "warning":
    case "alert":
    case "⚠️":
      return <AlertTriangle className="size-3.5 text-amber-400" />;
    case "rotate":
    case "refresh":
    case "↺":
      return <RotateCcw className="size-3.5 text-[var(--white-icon)]" />;
    case "check":
    case "✓":
    case "✅":
    default:
      return <Check className="size-3.5 text-[var(--sec)]" />;
  }
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; icon?: string }>;
      const { message, icon = "check" } = customEvent.detail || {};
      if (!message) return;

      const newToast: ToastData = {
        id: Date.now() + Math.random(),
        message,
        icon,
      };

      setToasts((prev) => [...prev.slice(-2), newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3200);
    };

    window.addEventListener("portfolio-toast", handleToast);
    return () => window.removeEventListener("portfolio-toast", handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 md:top-auto md:bottom-8 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center gap-2 pointer-events-none w-[90%] max-w-sm"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[var(--white-icon-tr)] bg-[var(--card-bg)] text-[var(--white)] shadow-lg shadow-black/15 backdrop-blur-xl animate-in fade-in slide-in-from-top-3 md:slide-in-from-bottom-3 duration-300 transition-all text-xs md:text-sm font-medium"
        >
          <span className="flex items-center justify-center size-6 rounded-full bg-[var(--component-bg)] border border-[var(--white-icon-tr)] shrink-0">
            {renderToastIcon(toast.icon)}
          </span>
          <span className="truncate">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
