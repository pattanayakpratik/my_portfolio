"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { showToast } from "./Toast";

interface CommandItem {
  id: string;
  category: "Navigation" | "Quick Actions" | "Socials & Links" | "Preferences";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export function openCommandMenu() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-command-menu"));
  }
}

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    showToast("Email copied to clipboard!", "📋");
    setIsOpen(false);
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      showToast("Switched to Light mode", "☀️");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      showToast("Switched to Dark mode", "🌙");
    }
    window.dispatchEvent(new Event("themechange"));
    setIsOpen(false);
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      category: "Navigation",
      title: "Go to Home",
      subtitle: "Introduction & stats",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M12 2L2 9.5V21C2 21.55 2.45 22 3 22H9V15H15V22H21C21.55 22 22 21.55 22 21V9.5L12 2Z" />
        </svg>
      ),
      shortcut: "H",
      action: () => scrollTo("home"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Go to Skills & Interactive Terminal",
      subtitle: "Tech stack & interactive python terminal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M3 3H21C21.55 3 22 3.45 22 4V20C22 20.55 21.55 22 21 22H3C2.45 22 2 21.55 2 20V4C2 3.45 2.45 3 3 3ZM4 5V19H20V5H4ZM6 8L10 12L6 16L7.41 17.41L12.83 12L7.41 6.59L6 8ZM11 15H17V17H11V15Z" />
        </svg>
      ),
      shortcut: "S",
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Go to Experience",
      subtitle: "Work history & education",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" />
        </svg>
      ),
      shortcut: "E",
      action: () => scrollTo("experience"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Go to Projects",
      subtitle: "Featured AI & Backend work",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z" />
        </svg>
      ),
      shortcut: "P",
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-notes",
      category: "Navigation",
      title: "Go to Engineering Notes",
      subtitle: "Technical architecture & distributed systems writeups",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 5H19V19H5V5ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" />
        </svg>
      ),
      shortcut: "N",
      action: () => {
        setIsOpen(false);
        window.location.href = "/notes";
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Go to Contact",
      subtitle: "Get in touch or send message",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
        </svg>
      ),
      shortcut: "C",
      action: () => scrollTo("contact"),
    },

    // Quick Actions
    {
      id: "action-copy-email",
      category: "Quick Actions",
      title: "Copy Email Address",
      subtitle: profile.email,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
        </svg>
      ),
      action: copyEmail,
    },
    {
      id: "action-resume",
      category: "Quick Actions",
      title: "Download Resume (PDF)",
      subtitle: "View latest curriculum vitae",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z" />
        </svg>
      ),
      action: () => {
        window.open(profile.resume, "_blank");
        showToast("Opening Resume...", "📄");
        setIsOpen(false);
      },
    },

    // Socials & Links
    {
      id: "link-github",
      category: "Socials & Links",
      title: "GitHub Profile",
      subtitle: "@pattanayakpratik",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
        </svg>
      ),
      action: () => {
        window.open(profile.socials.github, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "link-linkedin",
      category: "Socials & Links",
      title: "LinkedIn Profile",
      subtitle: "Connect on LinkedIn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
        </svg>
      ),
      action: () => {
        window.open(profile.socials.linkedin, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "link-leetcode",
      category: "Socials & Links",
      title: "LeetCode Profile",
      subtitle: "Problem solving & algorithms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z" />
        </svg>
      ),
      action: () => {
        window.open(profile.socials.leetcode, "_blank");
        setIsOpen(false);
      },
    },

    // Preferences
    {
      id: "pref-theme",
      category: "Preferences",
      title: "Toggle Light / Dark Mode",
      subtitle: "Switch theme appearance",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
      shortcut: "T",
      action: toggleTheme,
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(search.toLowerCase())) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-menu", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-menu", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input and reset selection when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) current.action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[200] flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] text-[var(--white)] shadow-2xl overflow-hidden transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--white-icon-tr)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-[var(--sec)] shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-sm md:text-base outline-none text-[var(--white)] placeholder:text-[var(--white-icon)]"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[var(--white-icon)] bg-[var(--container)] border border-[var(--white-icon-tr)] rounded-md">
            ESC
          </kbd>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
            className="sm:hidden p-1 text-[var(--white-icon)] hover:text-[var(--white)] rounded-lg transition cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--white-icon)]">
              No matching commands found.
            </div>
          ) : (
            <ul ref={listRef} className="space-y-1">
              {filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-[var(--white-icon-tr)] text-[var(--white)] ring-1 ring-[var(--sec)]/40 shadow-sm"
                          : "text-[var(--white-icon)] hover:text-[var(--white)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`size-8 flex items-center justify-center rounded-lg shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[var(--sec)] text-white dark:text-[#101010]"
                              : "bg-[var(--container)] text-[var(--sec)]"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <p className={`font-medium truncate ${isSelected ? "text-[var(--white)]" : ""}`}>
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="text-xs text-[var(--white-icon)] truncate">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {item.shortcut && (
                        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[var(--white-icon)] bg-[var(--container)] border border-[var(--white-icon-tr)] rounded">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="hidden sm:flex items-center justify-between px-4 py-2 border-t border-[var(--white-icon-tr)] text-[11px] text-[var(--white-icon)] bg-[var(--card-hover-bg)]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 bg-[var(--container)] rounded border border-[var(--white-icon-tr)] font-mono">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-[var(--container)] rounded border border-[var(--white-icon-tr)] font-mono">↵</kbd> select
            </span>
          </div>
          <span>
            <kbd className="px-1 py-0.5 bg-[var(--container)] rounded border border-[var(--white-icon-tr)] font-mono">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
