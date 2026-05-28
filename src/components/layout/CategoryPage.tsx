"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp, Clock, HelpCircle, Landmark, Building2,
  FlaskConical, Pyramid, Ghost, XCircle,
  type LucideIcon,
} from "lucide-react";
import { type Investigation, getCategoryColor } from "@/lib/investigations";

const ICON_REGISTRY: Record<string, LucideIcon> = {
  TrendingUp, Clock, HelpCircle, Landmark, Building2,
  FlaskConical, Pyramid, Ghost, XCircle,
};
import { EvidenceScore } from "@/components/ui/EvidenceScore";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80",
  "https://images.unsplash.com/photo-1532094349884-543559a8b937?w=600&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
];

interface CategoryPageProps {
  title: string;
  subtitle: string;
  iconName: string;
  accentClass?: string;
  investigations: Investigation[];
  emptyMessage?: string;
  wikiImages?: Record<string, string>;
}

export function CategoryPage({
  title,
  subtitle,
  iconName,
  investigations,
  emptyMessage = "No investigations found.",
  wikiImages = {},
}: CategoryPageProps) {
  const Icon = ICON_REGISTRY[iconName] ?? HelpCircle;
  return (
    <div className="min-h-screen bg-rt-bg">
      {/* Page header */}
      <div className="bg-rt-panel border-b border-rt-border px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-3"
        >
          <div className="w-10 h-10 bg-rt-red/10 border border-rt-red/20 rounded-lg flex items-center justify-center">
            <Icon size={20} className="text-rt-red" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-rt-white tracking-tight">{title}</h1>
            <p className="text-rt-muted text-sm mt-0.5">{subtitle}</p>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-6 mt-5 pt-5 border-t border-rt-border"
        >
          <span className="text-rt-muted text-xs">
            <span className="text-rt-white font-semibold">{investigations.length}</span> investigations
          </span>
          <span className="text-rt-border">·</span>
          <span className="text-rt-muted text-xs">
            Avg evidence score:{" "}
            <span className="text-rt-white font-semibold">
              {investigations.length > 0
                ? Math.round(
                    investigations.reduce((a, b) => a + b.evidenceScore, 0) /
                      investigations.length
                  )
                : 0}
            </span>
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-10 py-10">
        {investigations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-rt-muted"
          >
            <Icon size={40} className="mx-auto mb-4 opacity-20" />
            <p>{emptyMessage}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {investigations.map((inv, i) => {
              const imageUrl =
                wikiImages[inv.id] || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
              return (
                <Link key={inv.id} href={`/investigation/${inv.slug}`} className="block">
              <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="group bg-rt-panel rounded-xl overflow-hidden border border-rt-border hover:border-rt-red/40 transition-all duration-300 hover:glow-red cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={inv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rt-panel via-rt-panel/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={cn(
                          "text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded border backdrop-blur-sm",
                          getCategoryColor(inv.category)
                        )}
                      >
                        {inv.category}
                      </span>
                    </div>
                    {inv.year && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] text-rt-muted bg-black/60 backdrop-blur-sm px-2 py-1 rounded font-mono">
                          {inv.year}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-rt-white font-semibold text-sm leading-snug mb-2 group-hover:text-rt-red transition-colors line-clamp-2">
                      {inv.title}
                    </h3>
                    <p className="text-rt-muted text-xs leading-relaxed line-clamp-2 mb-3">
                      {inv.description}
                    </p>
                    <EvidenceScore score={inv.evidenceScore} size="sm" animated />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rt-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.article>
              </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
