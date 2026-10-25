import { ComparisonMode } from "@/data/pyshareData";

interface PyShareModesProps {
  modes: ComparisonMode[];
}

export default function PyShareModes({ modes }: PyShareModesProps) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
          Operation Modes
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold">Two Ways to Connect & Share</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode) => (
          <div
            key={mode.title}
            className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              mode.isPrimary
                ? "border-[var(--sec)]/50 bg-gradient-to-b from-[var(--component-bg)] to-[var(--card-bg)] shadow-lg"
                : "border-[var(--white-icon-tr)] bg-[var(--card-bg)]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-3xl">{mode.icon}</span>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border ${mode.badgeColor}`}
                >
                  {mode.badge}
                </span>
              </div>

              <h4 className="text-xl font-bold text-[var(--white)] mb-2">{mode.title}</h4>
              <p className="text-xs sm:text-sm text-[var(--white-icon)] mb-5 leading-relaxed">
                {mode.description}
              </p>

              <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-[var(--white-icon)]">
                {mode.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <span className="text-[var(--sec)] font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={mode.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                mode.isPrimary
                  ? "bg-[var(--sec)] text-white dark:text-[#101010] shadow-md hover:scale-[1.02]"
                  : "border border-[var(--white-icon-tr)] bg-[var(--component-bg)] hover:bg-[var(--white-icon-tr)] text-[var(--white)]"
              }`}
            >
              <span>{mode.actionText}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
