"use client";

import { useEffect, useState } from "react";

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export default function ThemeToggle({
  showLabel = false,
  className = "",
}: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateThemeState = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateThemeState();
    window.addEventListener("themechange", updateThemeState);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e: MediaQueryListEvent) => {
      // If user hasn't explicitly set a custom theme in localStorage, adapt to device
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        updateThemeState();
      }
    };

    mediaQuery.addEventListener("change", onSystemChange);

    return () => {
      window.removeEventListener("themechange", updateThemeState);
      mediaQuery.removeEventListener("change", onSystemChange);
    };
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const nextDark = !isCurrentlyDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsDark(nextDark);
    window.dispatchEvent(new Event("themechange"));
  };

  const title = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={title}
      title={title}
      className={`group flex flex-col md:flex-row items-center gap-1 text-[var(--white-icon)] hover:text-[var(--white)] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--sec)] rounded-full p-1 md:p-1.5 hover:bg-[var(--white-icon-tr)] ${className}`}
    >
      <span className="relative flex items-center justify-center w-6 h-6 transition-transform duration-300 group-hover:scale-110">
        {/* Sun Icon (shown in dark mode, click to switch to light) - instant pure CSS */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-amber-400 transition-transform duration-500 rotate-0 group-hover:rotate-45 hidden dark:block"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon Icon (shown in light mode, click to switch to dark) - instant pure CSS */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-cyan-600 transition-transform duration-500 -rotate-12 group-hover:rotate-0 block dark:hidden"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>

      {showLabel && (
        <>
          <span className="text-xs md:text-sm font-medium transition-colors hidden dark:inline">
            Light mode
          </span>
          <span className="text-xs md:text-sm font-medium transition-colors inline dark:hidden">
            Dark mode
          </span>
        </>
      )}
    </button>
  );
}
