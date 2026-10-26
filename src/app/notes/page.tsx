import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Notes & Deep Dives | Pratik Pattanayak",
  description:
    "Technical case studies, distributed systems design decisions, and system benchmarks behind PyShare and Cypher.",
};

export default function NotesPage() {
  return (
    <div className="min-h-screen text-[var(--white)] max-w-5xl mx-auto py-12 md:py-20 space-y-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[var(--white-icon-tr)] pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--sec)] hover:opacity-80 transition-opacity group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          >
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" />
          </svg>
          Back to Portfolio
        </Link>
        <span className="text-xs uppercase tracking-wider text-[var(--white-icon)] font-mono">
          Engineering Logs &amp; Case Studies
        </span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-400/10 border border-cyan-400/20 text-[var(--sec)]">
          <span className="w-2 h-2 rounded-full bg-[var(--sec)] animate-pulse" />
          SYSTEMS &amp; ARCHITECTURE NOTES
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--white)]">
          Engineering Architecture Deep Dives
        </h1>
        <p className="text-base sm:text-lg text-[var(--white-icon)] max-w-3xl leading-relaxed">
          Detailed technical writeups on distributed systems engineering, local network socket
          protocols, multi-threaded event loop decoupling, and architectural trade-offs behind my
          production projects.
        </p>
      </div>

      {/* Case Studies List */}
      <div className="space-y-20">
        {caseStudies.map((study, idx) => (
          <article
            key={study.id}
            id={study.id}
            className="p-6 sm:p-10 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] shadow-sm dark:shadow-none space-y-8 scroll-mt-24 transition duration-300"
          >
            {/* Case Study Meta */}
            <div className="space-y-3 border-b border-[var(--white-icon-tr)] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--white-icon)]">
                <span className="px-2.5 py-1 rounded-md bg-[var(--white-icon-tr)]/40 text-[var(--sec)] font-semibold">
                  {study.category}
                </span>
                <div className="flex items-center gap-4">
                  <span>{study.readTime}</span>
                  <span>•</span>
                  <span>{study.date}</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--white)] tracking-tight">
                {study.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--sec)] font-mono">{study.subtitle}</p>
            </div>

            {/* Summary */}
            <p className="text-sm sm:text-base text-[var(--white-icon)] leading-relaxed">
              {study.summary}
            </p>

            {/* Architectural Highlights */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--white)] font-mono">
                Key Engineering Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.highlights.map((h, hIdx) => (
                  <li
                    key={hIdx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--container)]/50 border border-[var(--white-icon-tr)]/50 text-xs sm:text-sm text-[var(--white)]"
                  >
                    <span className="text-[var(--sec)] shrink-0 font-bold">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Deep Dive Sections */}
            <div className="space-y-6 pt-4">
              <h3 className="text-base font-bold text-[var(--white)] font-mono border-b border-[var(--white-icon-tr)] pb-2">
                System Implementation Breakdown
              </h3>
              <div className="space-y-6">
                {study.architecturePoints.map((pt, pIdx) => (
                  <div key={pIdx} className="space-y-3">
                    <h4 className="text-sm sm:text-base font-semibold text-[var(--white)]">
                      {pt.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
                      {pt.description}
                    </p>
                    {pt.codeSnippet && (
                      <pre className="p-4 rounded-xl bg-[#090d16] border border-cyan-500/20 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed">
                        <code>{pt.codeSnippet}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Benchmarks */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--white)] font-mono">
                Performance &amp; Systems Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {study.benchmarks.map((b, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-4 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--container)]/40 space-y-1"
                  >
                    <span className="block text-xs text-[var(--white-icon)] font-mono">
                      {b.metric}
                    </span>
                    <span className="block text-2xl font-bold font-mono text-[var(--sec)]">
                      {b.value}
                    </span>
                    <span className="block text-xs text-[var(--white-icon)]/80">{b.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-6 border-t border-[var(--white-icon-tr)] flex flex-wrap items-center justify-between gap-4">
              <Link
                href={study.showcaseUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[var(--sec)] text-white dark:text-[#101010] hover:opacity-90 transition-opacity"
              >
                <span>Explore Interactive Showcase</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[var(--white-icon)] hover:text-[var(--white)] border border-[var(--white-icon-tr)] hover:bg-[var(--white-icon-tr)]/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
                </svg>
                <span>View GitHub Source</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
