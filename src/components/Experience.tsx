import { experience, education, certifications } from "@/data/profile";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 md:py-20 border-t border-[var(--white-icon-tr)] text-[var(--white)]"
    >
      <div className="max-w-6xl mx-auto">
        <div data-reveal="">
          <p className="text-xs uppercase tracking-widest font-mono text-[var(--sec)] mb-2">Career Roadmap</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10 text-[var(--white)]">Work Experience</h2>
        </div>

        {/* Timeline */}
        <ol className="relative timeline space-y-8 md:pl-10 pl-7">
          {experience.map((job, i) => (
            <li
              key={`${job.company}-${job.role}`}
              className="relative"
              data-reveal=""
              style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
            >
              <span
                className="timeline-dot absolute md:-left-10 -left-7 top-6 flex size-4 items-center justify-center"
                aria-hidden="true"
              >
                {job.current && (
                  <span className="absolute inline-flex size-full rounded-full bg-[var(--sec)] opacity-40 animate-ping" />
                )}
                <span className="relative inline-flex size-2.5 rounded-full bg-[var(--sec)] ring-4 ring-[var(--background)] shadow-[0_0_8px_var(--sec)]" />
              </span>

              <article className="card rounded-[2.5rem] p-6 sm:p-8">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--white)]">{job.role}</h3>
                    <p className="text-sm md:text-base font-medium text-[var(--sec)] mt-0.5">{job.company}</p>
                  </div>
                  <span className="tag rounded-full self-start md:self-auto text-xs font-mono font-medium">
                    {job.current && (
                      <span className="mr-2 size-1.5 rounded-full bg-[var(--accent)] inline-block shadow-[0_0_6px_var(--accent)]" />
                    )}
                    {job.period}
                  </span>
                </header>

                <ul className="space-y-3">
                  {job.points.map((p) => (
                    <li key={p.title} className="flex gap-3 text-sm md:text-base">
                      <span className="text-[var(--sec)] font-mono text-xs mt-[3px]">▹</span>
                      <p className="text-[var(--white-icon)] leading-relaxed">
                        <strong className="text-[var(--white)] font-semibold">{p.title}: </strong>
                        {p.text}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {job.tags.map((t) => (
                    <span key={t} className="tag rounded-full text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {/* Education Card */}
          <div className="card rounded-[2.5rem] p-6 sm:p-8" data-reveal="">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-full bg-[var(--sec)]/10 text-[var(--sec)] flex items-center justify-center border border-[var(--sec)]/20 shadow-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                  <path d="M22 10v6"></path>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-[var(--white)]">Education</h3>
                <p className="text-xs text-[var(--white-icon)]">Academic background</p>
              </div>
            </div>

            <ul className="space-y-4">
              {education.map((e, i) => (
                <li
                  key={e.title}
                  className={i === 0 ? "" : "pt-4 border-t border-[var(--white-icon-tr)]"}
                >
                  <p className="text-sm md:text-base font-semibold text-[var(--white)]">{e.title}</p>
                  <p className="text-xs md:text-sm text-[var(--white-icon)] mt-0.5 leading-relaxed">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications Card */}
          <div
            className="card rounded-[2.5rem] p-6 sm:p-8"
            data-reveal=""
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-full bg-[var(--sec)]/10 text-[var(--sec)] flex items-center justify-center border border-[var(--sec)]/20 shadow-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                  <circle cx="12" cy="8" r="6"></circle>
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-[var(--white)]">Certifications</h3>
                <p className="text-xs text-[var(--white-icon)]">Verified credentials</p>
              </div>
            </div>

            <ul className="space-y-4">
              {certifications.map((c, i) => (
                <li
                  key={c.title}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    i === 0 ? "" : "pt-4 border-t border-[var(--white-icon-tr)]"
                  }`}
                >
                  <div>
                    <p className="text-sm md:text-base font-semibold text-[var(--white)]">{c.title}</p>
                    <p className="text-xs md:text-sm text-[var(--white-icon)] mt-0.5 leading-relaxed">{c.detail}</p>
                  </div>
                  {c.image && (
                    <a
                      href={c.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--sec)] bg-[var(--sec)]/10 hover:bg-[var(--sec)]/20 border border-[var(--sec)]/30 hover:border-[var(--sec)]/50 transition-colors"
                      title={`Open ${c.title} certificate PDF`}
                    >
                      <span>PDF</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-3.5"
                      >
                        <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
                      </svg>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
