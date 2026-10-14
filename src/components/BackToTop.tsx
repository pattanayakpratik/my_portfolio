"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setVisible(scrollTop > 450);
          if (docHeight > 0) {
            setScrollPercentage(Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100));
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circular progress calculation
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-20 md:bottom-8 right-5 md:right-8 z-40 size-11 md:size-12 rounded-full border border-[var(--white-icon-tr)] bg-[var(--card-bg)] text-[var(--white-icon)] hover:text-[var(--white)] shadow-md hover:shadow-lg transition-all duration-300 ease-out flex items-center justify-center hover:-translate-y-1 hover:border-[var(--sec)] group backdrop-blur-md ${
        visible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
    >
      {/* Circular Progress Ring */}
      <svg
        className="absolute inset-0 size-full -rotate-90 pointer-events-none p-0.5"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[var(--white-icon-tr)] opacity-30"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="var(--sec)"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>

      {/* Up Arrow Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path d="M12 4L4 12H9V20H15V12H20L12 4Z" />
      </svg>
    </button>
  );
}
