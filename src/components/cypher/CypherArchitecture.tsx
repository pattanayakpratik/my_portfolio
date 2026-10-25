export default function CypherArchitecture() {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
          System Architecture
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold">Engineered for Performance & Immersion</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-[var(--sec)]/15 border border-[var(--sec)]/30 flex items-center justify-center text-lg text-[var(--sec)]">
              ⚛️
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                Multi-Ring Arc Reactor Core
              </h4>
              <span className="text-xs font-mono text-[var(--sec)]">
                Custom PyQt5 QPainter Vector Engine
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Vector-rendered concentric reactor consisting of a 48-tick radar compass calibration
            ring, 3 outer energy blades, an orbital ring with counter-rotating satellite beads, and
            central targeting crosshairs. Smoothly transitions between Standby, Listening,
            Processing, and Vocalizing modes.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-lg text-pink-400">
              📊
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                32-Band Audio Spectrum Visualizer
              </h4>
              <span className="text-xs font-mono text-pink-400">
                Harmonic Sine Wave Equalizer
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Real-time frequency visualizer with 32 symmetric frequency bands. Simulates natural
            vocal cadences using dynamic wave physics and floating white peak caps that realistically
            decay during speech synthesis.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-lg text-emerald-400">
              📈
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                12-Segment LED Hardware Telemetry
              </h4>
              <span className="text-xs font-mono text-emerald-400">
                Real-Time psutil Diagnostic Gauges
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Four segmented LED gauges monitoring <strong>CPU Load</strong>,{" "}
            <strong>Memory Allocation</strong>, <strong>Battery Life</strong>, and{" "}
            <strong>Disk Storage</strong>. Includes threshold alerts that dynamically transition LED
            colors from Cyan (Normal) to Amber (Warning) and Red (Critical).
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-lg text-amber-400">
              ⚙️
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                Holographic Credentials Vault
              </h4>
              <span className="text-xs font-mono text-amber-400">
                Zero-Setup In-App Key Management
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            End users never need to touch code or manually edit <code>.env</code> files. Easily
            configure Google Gemini, Groq, OpenWeather, NewsData, and Gmail credentials right from
            the GUI, with a built-in live diagnostic connection probe to Google AI Studio.
          </p>
        </div>
      </div>
    </section>
  );
}
