import { experience, education, certifications } from "@/data/profile";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 border-t border-[var(--white-icon-tr)] text-[var(--white)]"
    >
      <div className="max-w-5xl mx-auto">
        <div data-reveal="">
          <h2 className="text-lg text-[var(--sec)] mb-2 shiny-sec">Where I&apos;ve worked</h2>
          <h3 className="text-4xl md:text-5xl font-medium mb-10">Experience</h3>
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
                className="timeline-dot absolute md:-left-10 -left-7 top-7 flex size-4 items-center justify-center"
                aria-hidden="true"
              >
                {job.current && (
                  <span className="absolute inline-flex size-full rounded-full bg-[var(--sec)] opacity-40 animate-ping" />
                )}
                <span className="relative inline-flex size-3 rounded-full bg-[var(--sec)] ring-4 ring-[var(--background)]" />
              </span>

              <article className="card p-5 md:p-7">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-5">
                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold">{job.role}</h4>
                    <p className="text-[var(--sec)]">{job.company}</p>
                  </div>
                  <span className="tag self-start md:self-auto">
                    {job.current && (
                      <span className="mr-2 size-1.5 rounded-full bg-[var(--accent)]" />
                    )}
                    {job.period}
                  </span>
                </header>

                <ul className="space-y-4">
                  {job.points.map((p) => (
                    <li key={p.title} className="flex gap-3 text-sm md:text-base">
                      <span className="text-[var(--sec)] mt-[2px]">▹</span>
                      <p className="text-[var(--white-icon)]">
                        <span className="text-[var(--white)] font-medium">{p.title}: </span>
                        {p.text}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-5">
                  {job.tags.map((t) => (
                    <span key={t} className="tag">
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
          <div className="card p-5 md:p-7" data-reveal="">
            <div className="flex items-center gap-3 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 text-[var(--sec)]"
                aria-hidden="true"
              >
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                <path d="M22 10v6"></path>
                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
              </svg>
              <h4 className="text-xl font-semibold">Education</h4>
            </div>
            <ul className="space-y-4">
              {education.map((e, i) => (
                <li
                  key={e.title}
                  className={i === 0 ? "" : "pt-4 border-t border-[var(--white-icon-tr)]"}
                >
                  {e.image ? (
                    <details className="group cursor-pointer">
                      <summary className="list-none [&::-webkit-details-marker]:hidden flex justify-between items-center outline-none">
                        <div>
                          <p className="text-[var(--white)] font-medium flex items-center gap-2">
                            {e.title}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--sec)] text-[var(--background)] font-bold">
                              Certificate
                            </span>
                          </p>
                          <p className="text-sm text-[var(--white-icon)]">{e.detail}</p>
                        </div>
                        <svg
                          className="w-5 h-5 text-[var(--sec)] transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="mt-4 overflow-hidden rounded-xl border border-[var(--white-icon-tr)]">
                        {e.image.endsWith(".pdf") ? (
                          <div>
                            <div className="flex items-center justify-between px-3 py-2 bg-[var(--container)] border-b border-[var(--white-icon-tr)]">
                              <span className="text-xs text-[var(--white-icon)]">Document Preview</span>
                              <a
                                href={e.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[var(--sec)] hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                <span>Open PDF</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-3.5"
                                >
                                  <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
                                </svg>
                              </a>
                            </div>
                            <iframe
                              src={e.image}
                              className="w-full h-80 sm:h-96"
                              title={e.title}
                              loading="lazy"
                            ></iframe>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={e.image}
                            alt={e.title}
                            className="w-full h-auto object-cover hover:scale-105 transition duration-500"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </details>
                  ) : (
                    <div>
                      <p className="text-[var(--white)] font-medium">{e.title}</p>
                      <p className="text-sm text-[var(--white-icon)]">{e.detail}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="card p-5 md:p-7"
            data-reveal=""
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 text-[var(--sec)]"
                aria-hidden="true"
              >
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                <circle cx="12" cy="8" r="6"></circle>
              </svg>
              <h4 className="text-xl font-semibold">Certifications</h4>
            </div>
            <ul className="space-y-4">
              {certifications.map((c, i) => (
                <li
                  key={c.title}
                  className={i === 0 ? "" : "pt-4 border-t border-[var(--white-icon-tr)]"}
                >
                  {c.image ? (
                    <details className="group cursor-pointer">
                      <summary className="list-none [&::-webkit-details-marker]:hidden flex justify-between items-center outline-none">
                        <div>
                          <p className="text-[var(--white)] font-medium flex items-center gap-2">
                            {c.title}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--sec)] text-[var(--background)] font-bold">
                              Certificate
                            </span>
                          </p>
                          <p className="text-sm text-[var(--white-icon)]">{c.detail}</p>
                        </div>
                        <svg
                          className="w-5 h-5 text-[var(--sec)] transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="mt-4 overflow-hidden rounded-xl border border-[var(--white-icon-tr)]">
                        {c.image.endsWith(".pdf") ? (
                          <div>
                            <div className="flex items-center justify-between px-3 py-2 bg-[var(--container)] border-b border-[var(--white-icon-tr)]">
                              <span className="text-xs text-[var(--white-icon)]">Document Preview</span>
                              <a
                                href={c.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[var(--sec)] hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                <span>Open PDF</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-3.5"
                                >
                                  <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
                                </svg>
                              </a>
                            </div>
                            <iframe
                              src={c.image}
                              className="w-full h-80 sm:h-96"
                              title={c.title}
                              loading="lazy"
                            ></iframe>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={c.image}
                            alt={c.title}
                            className="w-full h-auto object-cover hover:scale-105 transition duration-500"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </details>
                  ) : (
                    <div>
                      <p className="text-[var(--white)] font-medium">{c.title}</p>
                      <p className="text-sm text-[var(--white-icon)]">{c.detail}</p>
                    </div>
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
