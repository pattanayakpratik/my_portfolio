import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <div className="space-y-6 max-w-lg">
        <p className="text-[var(--sec)] text-sm tracking-[0.3em] uppercase">Error 404</p>
        <h1 className="text-[var(--white)] text-6xl md:text-8xl font-semibold leading-none">
          Lost in the <span className="text-[var(--sec)]">void</span>
        </h1>
        <p className="text-[var(--white-icon)] text-base md:text-lg">
          This route doesn&apos;t exist — maybe it was refactored away.
        </p>
        <Link
          id="back-home"
          href="/"
          className="inline-flex items-center gap-2 h-[52px] px-6 rounded-xl font-medium text-white dark:text-[#101010] bg-[var(--sec)] hover:-translate-y-0.5 transition duration-300"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
