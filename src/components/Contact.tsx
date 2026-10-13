"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

const inputCls =
  "px-4 py-3 bg-[var(--card-bg)] text-[var(--white)] placeholder:text-[var(--white-icon)] border border-[var(--white-icon-tr)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sec)] focus:border-transparent transition shadow-sm dark:shadow-none";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        console.error("Form error:", data);
        setErrorMessage("Unable to send message right now. Please email me directly!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMessage("Network error. Please check your connection or email me directly!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-16 border-t border-[var(--white-icon-tr)]">
      <div className="max-w-5xl mx-auto">
        <div data-reveal="">
          <h2 className="text-lg text-[var(--sec)] mb-2 shiny-sec">Let&apos;s talk</h2>
          <h3 className="text-4xl md:text-5xl font-medium text-[var(--white)] mb-8">
            Contact
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-[var(--white-icon)] space-y-6" data-reveal="">
            <p className="text-lg">
              Hiring for a backend or AI role, or have a project in mind? I&apos;d love
              to hear about it — my inbox is always open.
            </p>

            <div className="space-y-3">
              <a
                id="contact-email"
                href={`mailto:${profile.email}`}
                className="card group flex items-center gap-4 p-4"
              >
                <span className="size-10 flex items-center justify-center rounded-lg bg-[#22d3ee1a] text-[var(--sec)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider">Email</span>
                  <span className="block text-[var(--white)] truncate group-hover:text-[var(--sec)] transition-colors">
                    {profile.email}
                  </span>
                </span>
              </a>

              <div className="card flex items-center gap-4 p-4">
                <span className="size-10 flex items-center justify-center rounded-lg bg-[#22d3ee1a] text-[var(--sec)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
                  </svg>
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider">Location</span>
                  <span className="block text-[var(--white)]">{profile.location}</span>
                </span>
              </div>
            </div>
          </div>

          <div data-reveal="" style={{ ["--reveal-delay" as string]: "120ms" }}>
            {!isSubmitted ? (
              <form
                id="contact-form"
                action="https://formspree.io/f/mljdqvew"
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <label className="sr-only" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  autoComplete="name"
                  required
                  className={inputCls}
                />

                <label className="sr-only" htmlFor="contact-reply">
                  Email
                </label>
                <input
                  id="contact-reply"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className={inputCls}
                />

                <label className="sr-only" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Message"
                  rows={6}
                  required
                  className={`${inputCls} resize-none`}
                ></textarea>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-sm flex items-center justify-between gap-3"
                  >
                    <span>⚠️ {errorMessage}</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-[var(--sec)] hover:underline shrink-0 font-medium"
                    >
                      Email directly →
                    </a>
                  </div>
                )}

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-white dark:text-[#101010] bg-[var(--sec)] hover:shadow-[0_8px_30px_-6px_rgba(8,145,178,0.4)] dark:hover:shadow-[0_8px_30px_-6px_#22d3ee80] transition disabled:opacity-60 disabled:cursor-wait"
                >
                  <span>{isSubmitting ? "Sending…" : "Send message"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
                  </svg>
                </button>
              </form>
            ) : (
              <div
                id="form-message"
                role="status"
                className="card p-6 flex justify-center items-center text-[var(--white)] text-lg"
              >
                ✅ Thank you for your message! I&apos;ll get back to you soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
