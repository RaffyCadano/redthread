"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { allInvestigations, getCategoryColor } from "@/lib/investigations";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length < 1
    ? []
    : allInvestigations.filter((inv) => {
        const q = query.toLowerCase();
        return (
          inv.title.toLowerCase().includes(q) ||
          inv.category.toLowerCase().includes(q) ||
          inv.description.toLowerCase().includes(q) ||
          (inv.year ?? "").includes(q)
        );
      }).slice(0, 8);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-xl z-[70] px-4"
          >
            <div className="bg-rt-panel border border-rt-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Input row */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-rt-border">
                <Search size={16} className="text-rt-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search investigations, categories, years…"
                  className="flex-1 bg-transparent text-rt-white text-sm placeholder:text-rt-muted outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-rt-muted hover:text-rt-white transition-colors">
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-rt-muted hover:text-rt-white transition-colors text-xs font-mono border border-rt-border px-1.5 py-0.5 rounded ml-1"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              {query.trim().length > 0 && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="px-4 py-8 text-center text-rt-muted text-sm">
                      No investigations found for <span className="text-rt-white">"{query}"</span>
                    </div>
                  ) : (
                    <ul>
                      {results.map((inv, i) => (
                        <li key={inv.id}>
                          <Link
                            href={`/investigation/${inv.slug}`}
                            onClick={onClose}
                            className="group flex items-center gap-3 px-4 py-3 hover:bg-rt-surface transition-colors border-b border-rt-border/50 last:border-0"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={cn(
                                  "text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border",
                                  getCategoryColor(inv.category)
                                )}>
                                  {inv.category}
                                </span>
                                {inv.year && (
                                  <span className="text-[9px] text-rt-muted font-mono">{inv.year}</span>
                                )}
                              </div>
                              <p className="text-rt-white text-sm font-medium group-hover:text-rt-red transition-colors truncate">
                                {inv.title}
                              </p>
                              <p className="text-rt-muted text-xs mt-0.5 line-clamp-1">{inv.description}</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                              <span className="text-xs font-mono text-rt-muted">{inv.evidenceScore}</span>
                              <ArrowRight size={12} className="text-rt-border group-hover:text-rt-red transition-colors" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Empty state hint */}
              {query.trim().length === 0 && (
                <div className="px-4 py-5">
                  <p className="text-[10px] uppercase tracking-widest text-rt-muted font-semibold mb-3">Quick jump</p>
                  <div className="flex flex-wrap gap-2">
                    {["UFO", "Government", "Unexplained", "Ancient Mysteries", "Science", "Historical"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setQuery(cat)}
                        className="text-xs text-rt-muted border border-rt-border px-2.5 py-1 rounded-full hover:border-rt-red/50 hover:text-rt-white transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
