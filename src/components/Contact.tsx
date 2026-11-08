"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { showToast } from "./Toast";
import { AlertCircle } from "lucide-react";

const inputCls =
  "w-full px-4 py-3 bg-[var(--card-bg)] text-[var(--white)] placeholder:text-[var(--white-icon)] border border-[var(--white-icon-tr)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sec)]/50 focus:border-[var(--sec)] transition duration-200 text-sm shadow-xs";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    showToast("Email copied to clipboard!", "copy");
    setTimeout(() => setCopied(false), 2500);
  };

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
        setMessageLength(0);
        showToast("Message sent successfully!", "check");
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
    <section id="contact" className="w-full py-16 md:py-20 border-t border-[var(--white-icon-tr)] text-[var(--white)]">
      <div className="max-w-5xl mx-auto">
        <div data-reveal="">
          <p className="text-xs uppercase tracking-widest font-mono text-[var(--sec)] mb-2">Let&apos;s talk</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Contact
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="text-[var(--white-icon)] space-y-6" data-reveal="">
            <p className="text-base md:text-lg leading-relaxed">
              Hiring for a backend or AI engineering role, or looking to collaborate on a high-throughput system?
              My inbox is always open.
            </p>

            <div className="space-y-3">
              {/* Email Card with One-Click Copy */}
              <div className="card group flex items-center justify-between p-4 transition-all">
                <a
                  id="contact-email"
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 min-w-0 flex-grow"
                  title="Send email via default mail client"
                >
                  <div className="size-10 rounded-lg bg-[var(--sec)]/10 text-[var(--sec)] flex items-center justify-center shrink-0 border border-[var(--sec)]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                      <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wider font-mono text-[var(--white-icon)]">Direct Email</span>
                    <span className="block text-sm md:text-base text-[var(--white)] font-medium truncate group-hover:text-[var(--sec)] transition-colors">
                      {profile.email}
                    </span>
                  </div>
                </a>

                {/* Instant Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                  className="shrink-0 p-2.5 rounded-lg border border-[var(--white-icon-tr)] text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)] transition cursor-pointer"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Copied
                    </span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                      <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="card flex items-center gap-3.5 p-4">
                <div className="size-10 rounded-lg bg-[var(--sec)]/10 text-[var(--sec)] flex items-center justify-center shrink-0 border border-[var(--sec)]/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
                  </svg>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider font-mono text-[var(--white-icon)]">Location</span>
                  <span className="block text-sm md:text-base font-medium text-[var(--white)]">{profile.location}</span>
                </div>
              </div>

              {/* Response SLA Note */}
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[var(--white-icon-tr)] bg-[var(--component-bg)] text-xs text-[var(--white-icon)]">
                <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Typically replies within 24 hours on business days</span>
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
                className="flex flex-col gap-3.5"
              >
                <label className="sr-only" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
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
                  placeholder="Your Email"
                  autoComplete="email"
                  required
                  className={inputCls}
                />

                <div className="relative">
                  <label className="sr-only" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    maxLength={1000}
                    required
                    onChange={(e) => setMessageLength(e.target.value.length)}
                    className={`${inputCls} resize-none`}
                  ></textarea>
                  <span className="absolute bottom-3 right-4 text-[11px] font-mono text-[var(--white-icon)] pointer-events-none">
                    {messageLength} / 1000
                  </span>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-xs sm:text-sm flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-2">
                      <AlertCircle className="size-4 shrink-0 text-red-400" />
                      {errorMessage}
                    </span>
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
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm sm:text-base text-white dark:text-slate-950 bg-[var(--sec)] hover:opacity-95 hover:-translate-y-0.5 transition duration-200 disabled:opacity-60 disabled:cursor-wait cursor-pointer shadow-xs"
                >
                  <span>{isSubmitting ? "Sending…" : "Send message"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
                  </svg>
                </button>
              </form>
            ) : (
              <div
                id="form-message"
                role="status"
                className="card p-8 flex flex-col items-center justify-center text-center gap-4 text-[var(--white)] animate-in fade-in duration-200"
              >
                <div className="size-12 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-1">Message Sent!</h3>
                  <p className="text-xs sm:text-sm text-[var(--white-icon)] max-w-sm">
                    Thank you for reaching out. I&apos;ll review your message and reply as soon as possible.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-mono text-[var(--sec)] hover:underline font-medium cursor-pointer"
                >
                  Send another message →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
