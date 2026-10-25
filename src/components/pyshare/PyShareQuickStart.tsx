import { QuickStep } from "@/data/pyshareData";

interface PyShareQuickStartProps {
  steps: QuickStep[];
}

export default function PyShareQuickStart({ steps }: PyShareQuickStartProps) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
          Quick Start
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold">Up & Running in Under 30 Seconds</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => (
          <div
            key={step.step}
            className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-2"
          >
            <span className="text-3xl font-mono font-bold text-[var(--sec)]">{step.step}</span>
            <h4 className="text-lg font-bold text-[var(--white)]">{step.title}</h4>
            <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
