export default function CypherQuickStart() {
  return (
    <section className="mb-16 p-6 md:p-8 rounded-2xl border border-dashed border-[var(--sec)]/40 bg-[var(--sec)]/5">
      <div className="max-w-2xl">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
          Zero-Friction Setup
        </h2>
        <h3 className="text-2xl font-bold mb-4">How to Run Cypher on Windows</h3>

        <ol className="space-y-4 text-xs sm:text-sm text-[var(--white-icon)]">
          <li className="flex items-start gap-3">
            <span className="size-6 rounded-full bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <strong className="text-[var(--white)]">Download the Standalone Executable:</strong>
              <p className="mt-0.5">
                Download <strong>Cypher-AI.exe</strong> (176 MB) directly from the release page. No
                Python, Git, or terminal is needed.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="size-6 rounded-full bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <strong className="text-[var(--white)]">Double-Click to Launch:</strong>
              <p className="mt-0.5">
                Launch <code>Cypher-AI.exe</code> anywhere on your PC. The holographic Arc Reactor
                HUD will initialize immediately.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="size-6 rounded-full bg-[var(--sec)] text-white dark:text-[#101010] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <strong className="text-[var(--white)]">Enter Your Free Gemini API Key:</strong>
              <p className="mt-0.5">
                On first launch, the built-in Holographic Credentials Vault will prompt for your
                free Google Gemini API key. Click <em>&quot;SAVE &amp; APPLY PROTOCOLS&quot;</em> and
                Cypher is immediately ready for voice commands!
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
