"use client";

import { useState, useEffect } from "react";
import { showToast } from "./Toast";
import { db, isFirebaseConfigured } from "@/firebase";
import { collection, addDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore";

export interface GuestbookEntry {
  id: string;
  name: string;
  role?: string;
  message: string;
  reaction: string;
  createdAt: string;
}

const SEED_ENTRIES: GuestbookEntry[] = [
  {
    id: "seed-1",
    name: "Alex R.",
    role: "Full-Stack Dev",
    message: "The chunked TCP streaming in PyShare is brilliant and super fast!",
    reaction: "🔥",
    createdAt: "Just now",
  },
  {
    id: "seed-2",
    name: "Dr. Elena Vance",
    role: "AI Engineer",
    message: "Really impressed with the multi-threaded event loop design in Cypher.",
    reaction: "🚀",
    createdAt: "Yesterday",
  },
  {
    id: "seed-3",
    name: "Marcus K.",
    role: "Systems Architect",
    message: "Slick interactive terminal and clean repository architecture. Great work!",
    reaction: "💻",
    createdAt: "2 days ago",
  },
];

const REACTIONS = [
  { emoji: "🚀", label: "Speed" },
  { emoji: "🔥", label: "Architecture" },
  { emoji: "💻", label: "Clean Code" },
  { emoji: "💡", label: "Creative" },
  { emoji: "❤️", label: "Loved it" },
];

export default function GuestbookModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>(SEED_ENTRIES);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [selectedReaction, setSelectedReaction] = useState("🚀");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load entries from Firestore or localStorage
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"), limit(25));
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
                  reaction: data.reaction || "🚀",
                  createdAt: data.timestamp?.toDate
                    ? data.timestamp.toDate().toLocaleDateString()
                    : "Recently",
                };
              });
              setEntries(liveEntries);
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
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
          return;
        }
      }
    } catch {}
    setEntries(SEED_ENTRIES);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedMsg) {
      showToast("Please enter both your name and a note!", "⚠️");
      return;
    }

    setIsSubmitting(true);

    const newEntry: GuestbookEntry = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      role: role.trim() || undefined,
      message: trimmedMsg,
      reaction: selectedReaction,
      createdAt: "Just now",
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
      showToast("Signed the guestbook! Thank you 🚀", "✅");
    } catch (err) {
      console.warn("Guestbook error:", err);
      const updated = [newEntry, ...entries];
      setEntries(updated);
      localStorage.setItem("portfolio_guestbook", JSON.stringify(updated));
      showToast("Saved to guestbook locally!", "💾");
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
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-[var(--white-icon-tr)] bg-[var(--card-bg)] text-[var(--white)] hover:border-[var(--sec)] hover:text-[var(--sec)] transition shadow-sm cursor-pointer"
        aria-label="Open Guestbook"
      >
        <span className="text-base">✍️</span>
        <span>Sign Guestbook</span>
      </button>

      {/* Modal Dialog Backdrop */}
      {isOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-lg rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] text-[var(--white)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--white-icon-tr)] bg-[var(--container)]/50">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📖</span>
                <div>
                  <h3 className="text-base font-bold text-[var(--white)]">Visitor Guestbook</h3>
                  <p className="text-xs text-[var(--white-icon)]">
                    Leave a signature or kudos for Pratik
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]/50 transition cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Scrollable Area */}
            <div className="p-6 overflow-y-auto space-y-6 no-scrollbar">
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[var(--white-icon)] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      maxLength={50}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--container)] border border-[var(--white-icon-tr)] text-[var(--white)] outline-none focus:border-[var(--sec)] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[var(--white-icon)] mb-1">
                      Role / Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Backend Dev @ Vercel"
                      maxLength={60}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--container)] border border-[var(--white-icon-tr)] text-[var(--white)] outline-none focus:border-[var(--sec)] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--white-icon)] mb-1">
                    Your Note or Feedback *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a message or thought on the portfolio..."
                    maxLength={300}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--container)] border border-[var(--white-icon-tr)] text-[var(--white)] outline-none focus:border-[var(--sec)] transition resize-none"
                  />
                </div>

                {/* Reaction Selector */}
                <div>
                  <label className="block text-xs font-mono text-[var(--white-icon)] mb-1.5">
                    Select a Reaction
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {REACTIONS.map((r) => (
                      <button
                        key={r.emoji}
                        type="button"
                        onClick={() => setSelectedReaction(r.emoji)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                          selectedReaction === r.emoji
                            ? "bg-[var(--sec)]/20 border-[var(--sec)] text-[var(--sec)]"
                            : "border-[var(--white-icon-tr)] text-[var(--white-icon)] hover:text-[var(--white)] hover:bg-[var(--white-icon-tr)]/30"
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span>{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[var(--sec)] text-white dark:text-[#101010] hover:opacity-90 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? "Signing..." : "Post Signature ✍️"}
                </button>
              </form>

              {/* Recent Signatures Stream */}
              <div className="pt-4 border-t border-[var(--white-icon-tr)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--white-icon)]">
                  <span>Recent Signatures ({entries.length})</span>
                  <span>Live Feed</span>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {entries.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[var(--container)]/60 border border-[var(--white-icon-tr)]/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base shrink-0">{item.reaction}</span>
                          <span className="font-semibold text-xs sm:text-sm text-[var(--white)] truncate">
                            {item.name}
                          </span>
                          {item.role && (
                            <span className="text-[10px] text-[var(--sec)] font-mono truncate hidden sm:inline">
                              ({item.role})
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[var(--white-icon)]/70 font-mono shrink-0">
                          {item.createdAt}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--white-icon)] leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
