"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px 0px 50px 0px" }
    );

    const observePending = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.is-visible)"
      );
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in or above the visible viewport, reveal immediately
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("is-visible");
        } else {
          io.observe(el);
        }
      });
    };

    observePending();

    // Observe DOM changes so dynamically rendered or filtered elements are never stuck at opacity 0
    const mo = new MutationObserver(() => {
      observePending();
    });

    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", observePending, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", observePending);
    };
  }, []);

  return null;
}
