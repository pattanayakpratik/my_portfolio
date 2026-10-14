"use client";

import { useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { openCommandMenu } from "./CommandMenu";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "#home",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z" />
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "#experience",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM4 16V19H20V16H4ZM4 14H20V7H4V14ZM9 3V5H15V3H9ZM11 11H13V13H11V11Z" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "#projects",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "#contact",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z" />
      </svg>
    ),
  },
];

export default function Nav() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const maxScroll = 1000;
    let rafId: number | null = null;

    function updateNav() {
      if (!nav) return;
      if (window.scrollY > 0) {
        nav.classList.add("scrolling");

        const scrollProgress = Math.min(window.scrollY / maxScroll, 1);
        const easeProgress = 1 - Math.pow(1 - scrollProgress, 4);

        const minWidth = 540;
        const maxWidth = Math.min(Math.round(window.innerWidth * 0.75), 620);
        const currentWidth = maxWidth - (maxWidth - minWidth) * easeProgress;

        if (window.innerWidth >= 768) {
          nav.style.setProperty("width", `${Math.round(currentWidth)}px`);
        }
      } else {
        nav.classList.remove("scrolling");
        if (window.innerWidth >= 768) {
          const defaultWidth = Math.min(Math.round(window.innerWidth * 0.75), 620);
          nav.style.setProperty("width", `${defaultWidth}px`);
        } else {
          nav.style.setProperty("width", "100%");
        }
      }
      rafId = null;
    }

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateNav);
      }
    };

    updateNav();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Section highlight on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']");
    const observerOptions = { rootMargin: "-45% 0px -50% 0px", threshold: 0 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          });
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector<HTMLAnchorElement>(`nav a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
            activeLink.setAttribute("aria-current", "location");
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center w-full">
      <nav
        ref={navRef}
        id="main-nav"
        className="fixed left-1/2 -translate-x-1/2 z-[100] bg-transparent border border-1 border-transparent backdrop-blur-xl transition-all duration-300 ease-out md:top-5 md:bottom-auto bottom-0 w-full md:w-[620px] md:max-w-[620px] md:rounded-full max-md:rounded-t-2xl max-md:border-t max-md:border-[var(--white-icon-tr)] max-md:bg-[var(--component-bg)] max-md:pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="relative w-full flex justify-center items-center py-2 px-4 md:py-2 md:px-6">
          <ul className="flex w-full md:w-auto justify-between md:justify-center items-center md:gap-6 gap-2">
            {navItems.map((item) => (
              <li key={item.label} className="flex-1 md:flex-none">
                <a
                  href={item.href}
                  aria-label={item.label}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-[var(--white-icon)] hover:text-[var(--white)] transition-colors text-xs md:text-sm font-medium relative group py-1"
                >
                  <span
                    className="size-1.5 rounded-full bg-[var(--accent)] transition-all duration-300 scale-0 opacity-0 nav-indicator hidden md:inline-block shrink-0"
                    aria-hidden="true"
                  />
                  <span className="md:hidden flex items-center justify-center w-6 h-6">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}

            <li className="flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-1.5">
              <button
                type="button"
                onClick={openCommandMenu}
                aria-label="Open command palette (Ctrl+K)"
                title="Search / Command Palette (Ctrl+K)"
                className="group flex flex-col md:flex-row items-center gap-1 text-[var(--white-icon)] hover:text-[var(--white)] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--sec)] rounded-full p-1 md:px-2 md:py-1.5 hover:bg-[var(--white-icon-tr)]"
              >
                <span className="flex items-center justify-center w-6 h-6 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 md:size-4"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
                <span className="text-[10px] md:hidden font-medium">Search</span>
                <kbd className="hidden md:inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[var(--white-icon-tr)] text-[var(--white-icon)] group-hover:text-[var(--white)]">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
