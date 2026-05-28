"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { type Investigation, getCategoryColor } from "@/lib/investigations";
import { EvidenceScore } from "@/components/ui/EvidenceScore";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=400&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
];

const PUBLISH_TIMES = ["2 hours ago", "5 hours ago", "Yesterday", "2 days ago"];

interface LatestInvestigationsProps {
  investigations: Investigation[];
  wikiImages?: Record<string, string>;
}

export function LatestInvestigations({
  investigations,
  wikiImages = {},
}: LatestInvestigationsProps) {
  return (
    <section className="px-10 py-16 bg-rt-panel/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-px bg-rt-red" />
            <span className="text-rt-red text-xs font-semibold tracking-widest uppercase">
              Latest
            </span>
          </div>
          <h2 className="text-3xl font-bold text-rt-white tracking-tight">
            Recent Investigations
          </h2>
        </div>
      </motion.div>

      {/* Feed */}
      <div className="space-y-4">
        {investigations.map((investigation, i) => {
          const imageUrl =
            wikiImages[investigation.id] ||
            FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
          const publishTime = PUBLISH_TIMES[i % PUBLISH_TIMES.length];

          return (
            <motion.article
              key={investigation.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex items-center gap-5 bg-rt-panel rounded-xl border border-rt-border hover:border-rt-red/30 p-4 cursor-pointer transition-all duration-200 hover:bg-rt-surface"
            >
              {/* Index */}
              <span className="text-rt-red font-mono text-sm font-bold shrink-0 w-6 text-center">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Thumbnail */}
              <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                <img
                  src={imageUrl}
                  alt={investigation.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-rt-red/0 group-hover:bg-rt-red/10 transition-colors duration-200" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded border",
                      getCategoryColor(investigation.category)
                    )}
                  >
                    {investigation.category}
                  </span>
                  <span className="flex items-center gap-1 text-rt-muted text-[10px]">
                    <Clock size={9} />
                    {publishTime}
                  </span>
                </div>
                <h3 className="text-rt-white font-semibold text-sm leading-snug group-hover:text-rt-red transition-colors line-clamp-1">
                  {investigation.title}
                </h3>
                <p className="text-rt-muted text-xs leading-relaxed line-clamp-1 mt-0.5">
                  {investigation.description}
                </p>
              </div>

              {/* Evidence Score */}
              <div className="w-28 shrink-0">
                <EvidenceScore
                  score={investigation.evidenceScore}
                  size="sm"
                  animated
                />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
