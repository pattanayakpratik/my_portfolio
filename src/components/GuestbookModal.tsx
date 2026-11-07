"use client";

import { useState, useEffect } from "react";
import { showToast } from "./Toast";
import { db, isFirebaseConfigured } from "@/firebase";
import { collection, addDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import {
  PenLine,
  BookOpen,
  X,
  Rocket,
  Flame,
  Code2,
  Lightbulb,
  Heart,
  User,
  Briefcase,
  MessageSquareQuote,
  MessageSquarePlus,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";

export interface GuestbookEntry {
  id: string;
  name: string;
  role?: string;
  message: string;
  reaction: string;
  createdAt: string;
}

const REACTIONS = [
  { id: "rocket", icon: Rocket, label: "Speed", color: "text-amber-400" },
  { id: "flame", icon: Flame, label: "Architecture", color: "text-rose-400" },
  { id: "code", icon: Code2, label: "Clean Code", color: "text-cyan-400" },
  { id: "lightbulb", icon: Lightbulb, label: "Creative", color: "text-yellow-400" },
  { id: "heart", icon: Heart, label: "Loved It", color: "text-pink-400" },
];

function renderReactionIcon(reaction: string) {
  switch (reaction) {
    case "rocket":
    case "🚀":
      return <Rocket className="size-3.5 text-amber-400 shrink-0" />;
    case "flame":
    case "🔥":
      return <Flame className="size-3.5 text-rose-400 shrink-0" />;
    case "code":
    case "💻":
      return <Code2 className="size-3.5 text-cyan-400 shrink-0" />;
    case "lightbulb":
    case "💡":
      return <Lightbulb className="size-3.5 text-yellow-400 shrink-0" />;
    case "heart":
    case "❤️":
      return <Heart className="size-3.5 text-pink-400 shrink-0" />;
    default:
      return <Rocket className="size-3.5 text-amber-400 shrink-0" />;
  }
}

export default function GuestbookModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "wall">("write");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [selectedReaction, setSelectedReaction] = useState("rocket");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load entries from Firestore or localStorage (strictly real visitor entries only, zero fake seed entries)
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"), limit(50));
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!snapshot.empty) {
              const liveEntries: GuestbookEntry[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  name: data.name || "Anonymous",
                  role: data.role || "",
                  message: data.message || "",
                  reaction: data.reaction || "rocket",
                  createdAt: data.timestamp?.toDate
                    ? data.timestamp.toDate().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently",
                };
              });
              setEntries(liveEntries);
            } else {
              loadLocalEntries();
            }
          },
          () => {
            loadLocalEntries();
          }
        );
        return () => unsubscribe();
      } catch {
        loadLocalEntries();
      }
    } else {
      loadLocalEntries();
    }
  }, []);

  const loadLocalEntries = () => {
    try {
      const stored = localStorage.getItem("portfolio_guestbook");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setEntries(parsed);
          return;
        }
      }
    } catch {}
    setEntries([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedMsg) {
      showToast("Please enter your name and message!", "warning");
      return;
    }

    setIsSubmitting(true);

    const nowFormatted = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newEntry: GuestbookEntry = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      role: role.trim() || undefined,
      message: trimmedMsg,
      reaction: selectedReaction,
      createdAt: nowFormatted,
    };

    try {
      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, "guestbook"), {
          name: trimmedName,
          role: role.trim() || null,
          message: trimmedMsg,
          reaction: selectedReaction,
          timestamp: new Date(),
        });
      } else {
        const updated = [newEntry, ...entries];
        setEntries(updated);
        localStorage.setItem("portfolio_guestbook", JSON.stringify(updated));
      }

      setName("");
      setRole("");
      setMessage("");
      showToast("Note published to visitor wall!", "check");
      setActiveTab("wall");
    } catch (err) {
      console.warn("Guestbook write error:", err);
      const updated = [newEntry, ...entries];
      setEntries(updated);
      localStorage.setItem("portfolio_guestbook", JSON.stringify(updated));
      showToast("Saved to your browser storage!", "check");
      setActiveTab("wall");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Sleek Twin Footer Pill Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          if (entries.length > 0) setActiveTab("wall");
          else setActiveTab("write");
        }}
        className="group relative h-10 px-4 flex items-center justify-center gap-2 rounded-full border border-[var(--white-icon-tr)] bg-[var(--card-bg)] hover:border-[var(--sec)]/50 hover:scale-[1.02] text-[var(--white-icon)] hover:text-[var(--white)] transition-all duration-300 shadow-sm cursor-pointer"
        aria-label="Open Visitor Notes Wall"
      >
        <PenLine className="size-4 text-[var(--sec)] transition-transform duration-300 group-hover:rotate-12" />
        <span className="text-xs font-medium text-[var(--white)]">Visitor Wall</span>
        {entries.length > 0 && (
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-[var(--sec)]/15 text-[var(--sec)] border border-[var(--sec)]/30">
            {entries.length}
          </span>
        )}
      </button>

      {/* Modal Dialog Backdrop */}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-[var(--white-icon-tr)] bg-gradient-to-b from-[var(--component-bg)] via-[var(--card-bg)] to-[var(--card-bg)] text-[var(--white)] shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[88vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--white-icon-tr)] bg-[var(--component-bg)]/80">
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-xl bg-[var(--sec)]/15 border border-[var(--sec)]/30 flex items-center justify-center text-[var(--sec)]">
                  <BookOpen className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--white)] flex items-center gap-2">
                    <span>Visitor Wall &amp; Notes</span>
                    {entries.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[var(--sec)]/15 text-[var(--sec)]">
                        {entries.length} {entries.length === 1 ? "entry" : "entries"}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[var(--white-icon)]">
                    Real greetings and feedback from visiting engineers &amp; peers
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full flex items-center justify-center text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Tab Navigation Pill Bar */}
            <div className="px-6 pt-4 pb-2 border-b border-[var(--white-icon-tr)]/50 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  activeTab === "write"
                    ? "bg-[var(--sec)] text-white dark:text-[#101010] font-semibold shadow-sm"
                    : "text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]"
                }`}
              >
                <PenLine className="size-3.5" />
                <span>Write a Note</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("wall")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  activeTab === "wall"
                    ? "bg-[var(--sec)] text-white dark:text-[#101010] font-semibold shadow-sm"
                    : "text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]"
                }`}
              >
                <MessageSquareQuote className="size-3.5" />
                <span>Live Wall ({entries.length})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 no-scrollbar">
              {activeTab === "write" ? (
                /* Write a Note Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-mono text-[var(--white-icon)] mb-1">
                        <User className="size-3 text-[var(--sec)]" />
                        <span>Your Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jane Doe"
                        maxLength={50}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--component-bg)] border border-[var(--white-icon-tr)] text-[var(--white)] placeholder:text-[var(--white-icon)]/60 outline-none focus:border-[var(--sec)] transition"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-mono text-[var(--white-icon)] mb-1">
                        <Briefcase className="size-3 text-[var(--sec)]" />
                        <span>Role / Team (Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Backend Dev @ Vercel"
                        maxLength={60}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--component-bg)] border border-[var(--white-icon-tr)] text-[var(--white)] placeholder:text-[var(--white-icon)]/60 outline-none focus:border-[var(--sec)] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--white-icon)] mb-1">
                      <label className="flex items-center gap-1.5">
                        <MessageSquareQuote className="size-3 text-[var(--sec)]" />
                        <span>Your Message or Peer Note *</span>
                      </label>
                      <span className="text-[10px]">{message.length}/300</span>
                    </div>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a greeting, architecture review, or feedback on any project..."
                      maxLength={300}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--component-bg)] border border-[var(--white-icon-tr)] text-[var(--white)] placeholder:text-[var(--white-icon)]/60 outline-none focus:border-[var(--sec)] transition resize-none leading-relaxed"
                    />
                  </div>

                  {/* Reaction Tag Picker */}
                  <div>
                    <label className="block text-xs font-mono text-[var(--white-icon)] mb-1.5">
                      Select Topic Reaction
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {REACTIONS.map((r) => {
                        const Icon = r.icon;
                        const isSelected = selectedReaction === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSelectedReaction(r.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                              isSelected
                                ? "bg-[var(--sec)]/15 border-[var(--sec)] text-[var(--sec)] font-semibold shadow-sm"
                                : "border-[var(--white-icon-tr)] text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]/40"
                            }`}
                          >
                            <Icon className={`size-3.5 ${r.color}`} />
                            <span>{r.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Dynamic Preview */}
                  {(name.trim() || message.trim()) && (
                    <div className="p-3.5 rounded-2xl bg-[var(--component-bg)] border border-[var(--sec)]/30 space-y-2 animate-in fade-in duration-200 shadow-sm">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[var(--sec)]">
                        <span className="flex items-center gap-1 font-semibold">
                          <Sparkles className="size-3" /> Live Preview
                        </span>
                        <span>Today</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="size-6 rounded-full bg-[var(--sec)]/20 text-[var(--sec)] text-xs font-bold flex items-center justify-center shrink-0">
                            {name.trim() ? name.trim().charAt(0).toUpperCase() : "P"}
                          </span>
                          <span className="text-xs font-semibold text-[var(--white)] truncate">
                            {name.trim() || "Your Name"}
                          </span>
                          {role.trim() && (
                            <span className="text-[10px] text-[var(--sec)] font-mono truncate hidden sm:inline">
                              ({role.trim()})
                            </span>
                          )}
                        </div>
                        <span className="shrink-0">{renderReactionIcon(selectedReaction)}</span>
                      </div>
                      <p className="text-xs text-[var(--white-icon)] leading-relaxed italic break-words">
                        &ldquo;{message.trim() || "Your message preview will appear here..."}&rdquo;
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[var(--sec)] text-white dark:text-[#101010] hover:opacity-95 disabled:opacity-50 transition shadow-md cursor-pointer"
                  >
                    <Send className="size-4" />
                    <span>{isSubmitting ? "Posting..." : "Publish Note to Wall"}</span>
                  </button>
                </form>
              ) : (
                /* Live Public Wall Feed */
                <div className="space-y-3">
                  {entries.length === 0 ? (
                    <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-3">
                      <div className="size-12 rounded-2xl bg-[var(--sec)]/10 border border-[var(--sec)]/25 flex items-center justify-center text-[var(--sec)]">
                        <MessageSquarePlus className="size-6" />
                      </div>
                      <h4 className="text-sm font-semibold text-[var(--white)]">No visitor notes yet</h4>
                      <p className="text-xs text-[var(--white-icon)] max-w-xs leading-relaxed">
                        Be the first engineer, peer, or recruiter to leave a public message or greeting!
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab("write")}
                        className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--sec)] text-white dark:text-[#101010] hover:opacity-90 transition cursor-pointer shadow-sm"
                      >
                        <PenLine className="size-3.5" />
                        <span>Write the First Note</span>
                      </button>
                    </div>
                  ) : (
                    entries.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-[var(--component-bg)]/80 border border-[var(--white-icon-tr)] space-y-2 hover:border-[var(--sec)]/30 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="size-7 rounded-full bg-[var(--sec)]/15 border border-[var(--sec)]/30 text-[var(--sec)] text-xs font-bold flex items-center justify-center shrink-0">
                              {item.name ? item.name.charAt(0).toUpperCase() : "V"}
                            </span>
                            <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-xs text-[var(--white)] truncate">
                                {item.name}
                              </span>
                              {item.role && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-[var(--sec)] bg-[var(--sec)]/10 border border-[var(--sec)]/20 truncate">
                                  {item.role}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {renderReactionIcon(item.reaction)}
                            <span className="text-[10px] text-[var(--white-icon)]/70 font-mono">
                              {item.createdAt}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-[var(--white-icon)] leading-relaxed pl-9 break-words">
                          {item.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
