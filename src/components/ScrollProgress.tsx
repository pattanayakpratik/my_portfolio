"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(Math.max(scrollTop / docHeight, 0), 1));
      }
      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[110] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--sec)] via-cyan-400 to-[var(--accent)] origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_var(--sec)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
