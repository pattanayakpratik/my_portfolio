"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { showToast } from "./Toast";
import { AlertCircle, Mail, MapPin, Copy, Check, Send } from "lucide-react";

const inputCls =
  "w-full px-5 py-3.5 bg-white/70 dark:bg-[#0a0f1e]/40 text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-[#94A3B8]/60 border border-slate-200/80 dark:border-white/[0.07] rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 text-sm shadow-inner backdrop-blur-xl";

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
      <div className="max-w-6xl mx-auto">
        <div data-reveal="" className="mb-8">
          <p className="text-xs uppercase tracking-widest font-mono text-[var(--sec)] mb-2">Let&apos;s talk</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Contact
          </h2>
        </div>

        {/* Living Flow Liquid Glass Canvas Container */}
        <div className="card rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden is-visible" data-reveal="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            {/* Left Info Column */}
            <div className="text-[var(--white-icon)] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                  Let&apos;s build something resilient together.
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                  Hiring for a backend or AI engineering role, or looking to collaborate on a high-throughput distributed system?
                  My inbox is always open.
                </p>
              </div>

              <div className="space-y-3">
                {/* Email Card with One-Click Copy */}
                <div className="card rounded-2xl group flex items-center justify-between p-4 transition-all">
                  <a
                    id="contact-email"
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3.5 min-w-0 flex-grow"
                    title="Send email via default mail client"
                  >
                    <div className="size-10 rounded-xl bg-[var(--sec)]/10 text-[var(--sec)] flex items-center justify-center shrink-0 border border-[var(--sec)]/20">
                      <Mail className="size-5" />
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
                    className="shrink-0 p-2.5 rounded-full border border-[var(--white-icon-tr)] bg-[var(--glass-btn-bg)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--sec)]/50 text-[var(--white-icon)] hover:text-[var(--white)] backdrop-blur-md transition cursor-pointer"
                  >
                    {copied ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <Check className="size-4" />
                        Copied
                      </span>
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>

                {/* Location Card */}
                <div className="card rounded-2xl flex items-center gap-3.5 p-4">
                  <div className="size-10 rounded-xl bg-[var(--sec)]/10 text-[var(--sec)] flex items-center justify-center shrink-0 border border-[var(--sec)]/20">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider font-mono text-[var(--white-icon)]">Location</span>
                    <span className="block text-sm md:text-base font-medium text-[var(--white)]">{profile.location}</span>
                  </div>
                </div>

                {/* Response SLA Note */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[var(--white-icon-tr)] bg-[var(--component-bg)] backdrop-blur-xl text-xs text-[var(--white-icon)]">
                  <span className="size-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  <span>Typically replies within 24 hours on business days</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div>
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
                      className="p-3.5 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-200 text-xs sm:text-sm flex items-center justify-between gap-3"
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
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-[#00F2FE] to-[#06B6D4] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-wait cursor-pointer shadow-md"
                  >
                    <span>{isSubmitting ? "Sending…" : "Send message"}</span>
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </form>
              ) : (
                <div
                  id="form-message"
                  role="status"
                  className="card rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-4 text-[var(--white)] animate-in fade-in duration-200 h-full"
                >
                  <div className="size-14 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Check className="size-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1 text-slate-900 dark:text-[#F8FAFC]">Message Sent!</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] max-w-sm">
                      Thank you for reaching out. I&apos;ll review your message and reply as soon as possible.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 px-5 py-2 rounded-full border border-[var(--sec)]/30 text-xs font-mono text-[var(--sec)] hover:bg-[var(--sec)]/15 font-semibold cursor-pointer transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
