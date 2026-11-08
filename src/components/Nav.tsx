"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { openCommandMenu } from "./CommandMenu";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/#home",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    href: "/#experience",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM4 16V19H20V16H4ZM4 14H20V7H4V14ZM9 3V5H15V3H9ZM11 11H13V13H11V11Z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    href: "/#projects",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z" />
      </svg>
    ),
  },
  {
    id: "notes",
    label: "Notes",
    href: "/notes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 5H19V19H5V5ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "/#contact",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z" />
      </svg>
    ),
  },
];

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");
  const isManualScrollingRef = useRef(false);
  const manualTimerRef = useRef<NodeJS.Timeout | null>(null);

  // High-performance scroll spy with reverse section detection
  const updateScrollSpy = useCallback(() => {
    const nav = navRef.current;
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add("scrolling");
      } else {
        nav.classList.remove("scrolling");
      }
    }

    if (pathname === "/notes") {
      setActiveTab("notes");
      return;
    }

    // While smooth scrolling from a manual click, don't overwrite active tab
    if (isManualScrollingRef.current) return;

    // 1. Check if user is at or near the bottom of document -> Contact is active
    const scrollBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    if (documentHeight - scrollBottom < 90) {
      setActiveTab("contact");
      return;
    }

    // 2. Check if near very top -> Home is active
    if (window.scrollY < 120) {
      setActiveTab("home");
      return;
    }

    // 3. Scan sections in reverse order (bottom to top) with header line offset
    const sectionIds = ["contact", "projects", "experience", "home"];
    const triggerOffset = 140;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          setActiveTab(id);
          return;
        }
      }
    }

    setActiveTab("home");
  }, [pathname]);

  useEffect(() => {
    let rafId: number | null = null;

    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollSpy);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollSpy();

    // Check if initial URL has hash
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace(/^#/, "");
      if (["home", "experience", "projects", "contact"].includes(hashId)) {
        setActiveTab(hashId);
        const el = document.getElementById(hashId);
        if (el) {
          setTimeout(() => {
            const yOffset = -75;
            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          }, 150);
        }
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    };
  }, [updateScrollSpy]);

  // Clean, zero-lag click handler that prevents ugly hash lock
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.href.startsWith("/#") || item.href.startsWith("#")) {
      const targetId = item.id;

      if (pathname === "/") {
        e.preventDefault();

        // 1. Immediately activate tab with 0ms visual latency
        setActiveTab(targetId);

        // 2. Lock scroll spy during smooth scroll duration
        isManualScrollingRef.current = true;
        if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
        manualTimerRef.current = setTimeout(() => {
          isManualScrollingRef.current = false;
        }, 850);

        // 3. Scroll with precise header offset so title isn't covered
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -75;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }

        // 4. Clean URL: prevent locking hash in address bar
        if (window.history.replaceState) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    }
  };

  return (
    <div className="flex justify-center w-full">
      <nav
        ref={navRef}
        id="main-nav"
        className="fixed left-1/2 -translate-x-1/2 z-[100] md:top-6 md:bottom-auto bottom-0 w-full md:w-fit md:max-w-xl md:rounded-full max-md:rounded-t-2xl max-md:pb-[env(safe-area-inset-bottom,0px)] overflow-hidden transition-all duration-300"
      >
        <div className="relative w-full flex justify-center items-center py-2 px-3 md:py-1.5 md:px-3.5">
          <ul className="flex w-full md:w-auto justify-between md:justify-center items-center gap-1 md:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.label} className="flex-1 md:flex-none">
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5 rounded-full px-3 md:px-3.5 py-1.5 transition-all duration-200 text-[11px] md:text-xs relative group cursor-pointer ${
                      isActive
                        ? "active font-semibold text-slate-950 dark:text-white"
                        : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/[0.06] font-medium"
                    }`}
                  >
                    {/* Glowing active indicator dot on desktop */}
                    {isActive && (
                      <span className="hidden md:inline-block size-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                    )}

                    <span className="md:hidden flex items-center justify-center w-5 h-5">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}

            <li className="hidden md:block w-px h-3.5 bg-slate-200 dark:bg-white/10 mx-1.5" aria-hidden="true" />

            <li className="flex-1 md:flex-none">
              <button
                type="button"
                onClick={openCommandMenu}
                aria-label="Open command palette (Ctrl+K)"
                title="Search / Command Palette (Ctrl+K)"
                className="w-full group flex flex-col md:flex-row items-center justify-center gap-1.5 text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/[0.06] transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-slate-400 dark:focus-visible:ring-white/20 rounded-full py-1.5 px-2 md:px-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3.5 text-slate-500 group-hover:text-cyan-600 dark:text-slate-400 dark:group-hover:text-cyan-400 transition-colors"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="text-[10px] md:hidden font-medium">Search</span>
                <kbd className="hidden md:inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  ⌘K
                </kbd>
              </button>
            </li>

            <li className="flex-1 md:flex-none flex items-center justify-center">
              <ThemeToggle showMobileLabel={true} className="w-full py-1 md:p-1 justify-center hover:bg-slate-900/5 dark:hover:bg-white/[0.06]" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
