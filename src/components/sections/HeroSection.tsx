"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Shield } from "lucide-react";
import { EvidenceScore } from "@/components/ui/EvidenceScore";
import { getCategoryColor, type Investigation } from "@/lib/investigations";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  investigation: Investigation;
  related: Investigation[];
  wikiImageUrl?: string;
  wikiExtract?: string;
}

export function HeroSection({
  investigation,
  related,
  wikiImageUrl,
  wikiExtract,
}: HeroSectionProps) {
  const imageUrl =
    wikiImageUrl ||
    `https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=1600&q=80`;

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt={investigation.title}
          className="w-full h-full object-cover"
        />
        {/* Layered dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/30" />
        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay opacity-30" />
      </div>

      {/* Animated scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-rt-red/40 to-transparent z-10"
        animate={{ top: ["10%", "90%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-20 w-full px-10 pb-14">
        <div className="flex items-start gap-10 max-w-[calc(100vw-18rem)]">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Category + year badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span
                className={cn(
                  "text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded border",
                  getCategoryColor(investigation.category)
                )}
              >
                {investigation.category}
              </span>
              {investigation.year && (
                <span className="text-rt-muted text-xs">{investigation.year}</span>
              )}
              <div className="flex items-center gap-1 text-rt-muted text-xs">
                <Shield size={11} className="text-rt-red" />
                <span>Featured Investigation</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-rt-white leading-[1.05] tracking-tight mb-4 max-w-3xl text-glow-red"
            >
              {investigation.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-rt-muted text-base leading-relaxed max-w-xl mb-6"
            >
              {wikiExtract
                ? wikiExtract.slice(0, 200) + (wikiExtract.length > 200 ? "…" : "")
                : investigation.description}
            </motion.p>

            {/* Evidence score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xs mb-8"
            >
              <p className="text-[10px] uppercase tracking-widest text-rt-muted mb-2">
                Evidence Score
              </p>
              <EvidenceScore score={investigation.evidenceScore} size="lg" />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <button className="flex items-center gap-2 bg-rt-red hover:bg-rt-red/90 text-white font-semibold px-6 py-3 rounded-md glow-red transition-all duration-200 group">
                Explore Investigation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 text-rt-muted hover:text-rt-white text-sm transition-colors">
                View on Wikipedia
                <ChevronRight size={14} />
              </button>
            </motion.div>
          </div>

          {/* Related Cases Panel */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-64 shrink-0 glass-panel rounded-xl p-4"
            >
              <p className="text-[10px] uppercase tracking-widest text-rt-muted mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rt-red inline-block" />
                Related Cases
              </p>
              <ul className="space-y-3">
                {related.slice(0, 4).map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-rt-red text-xs font-mono mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-rt-white text-xs font-medium group-hover:text-rt-red transition-colors leading-snug">
                          {item.title}
                        </p>
                        <p className="text-rt-muted text-[10px] mt-0.5">{item.category}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom gradient continuation */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#050505] to-transparent z-20" />
    </section>
  );
}
