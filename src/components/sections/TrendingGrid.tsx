"use client";

import { motion } from "framer-motion";
import { type Investigation, getCategoryColor } from "@/lib/investigations";
import { EvidenceScore } from "@/components/ui/EvidenceScore";
import { cn } from "@/lib/utils";

const WIKI_IMAGES: Record<string, string> = {
  roswell: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Uss_Keokuk_%28AKL-11%29.jpg/640px-Uss_Keokuk_%28AKL-11%29.jpg",
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80",
];

interface TrendingGridProps {
  investigations: Investigation[];
  wikiImages?: Record<string, string>;
}

function InvestigationCard({
  investigation,
  index,
  imageUrl,
}: {
  investigation: Investigation;
  index: number;
  imageUrl: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="group relative bg-rt-panel rounded-xl overflow-hidden border border-rt-border hover:border-rt-red/40 transition-all duration-300 hover:glow-red cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={investigation.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rt-panel via-rt-panel/20 to-transparent" />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded border backdrop-blur-sm",
              getCategoryColor(investigation.category)
            )}
          >
            {investigation.category}
          </span>
        </div>

        {/* Year */}
        {investigation.year && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] text-rt-muted bg-black/60 backdrop-blur-sm px-2 py-1 rounded font-mono">
              {investigation.year}
            </span>
          </div>
        )}

        {/* Hover red overlay */}
        <div className="absolute inset-0 bg-rt-red/0 group-hover:bg-rt-red/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-rt-white font-semibold text-sm leading-snug mb-2 group-hover:text-rt-red transition-colors line-clamp-2">
          {investigation.title}
        </h3>
        <p className="text-rt-muted text-xs leading-relaxed line-clamp-2 mb-3">
          {investigation.description}
        </p>

        {/* Evidence Score */}
        <EvidenceScore score={investigation.evidenceScore} size="sm" animated />
      </div>

      {/* Red thread line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rt-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.article>
  );
}

export function TrendingGrid({ investigations, wikiImages = {} }: TrendingGridProps) {
  return (
    <section className="px-10 py-16">
      {/* Section header */}
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
              Trending Now
            </span>
          </div>
          <h2 className="text-3xl font-bold text-rt-white tracking-tight">
            Mysteries Under Investigation
          </h2>
        </div>
        <button className="text-rt-muted hover:text-rt-red text-sm transition-colors flex items-center gap-1">
          View all
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {investigations.map((investigation, i) => (
          <InvestigationCard
            key={investigation.id}
            investigation={investigation}
            index={i}
            imageUrl={
              wikiImages[investigation.id] ||
              FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]
            }
          />
        ))}
      </div>
    </section>
  );
}
