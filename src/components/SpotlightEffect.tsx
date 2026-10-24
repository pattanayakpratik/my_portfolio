"use client";

import { useEffect } from "react";

export default function SpotlightEffect() {
  useEffect(() => {
    // Only run on desktop devices that support hover
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement)?.closest(".card") as HTMLElement | null;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
