"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, TrendingUp, Clock, ArrowRight, Star,
  AlertTriangle, FileText, Eye, Building2, Microscope, RefreshCw,
  HelpCircle, Landmark, FlaskConical, Pyramid, Ghost, XCircle,
  GitBranch, Layers, Map, MessageSquareMore, ChevronRight,
  ShieldAlert, Shuffle, BarChart2, Zap,
} from "lucide-react";
import { type Investigation, getCategoryColor, getEvidenceLabel, timelineEvents, allInvestigations } from "@/lib/investigations";
import { EvidenceScore } from "@/components/ui/EvidenceScore";
import { cn } from "@/lib/utils";

const CATEGORY_NAV_GRID = [
  { label: "UFO",               href: "/ufo",         icon: Eye,          cat: "UFO",               color: "bg-violet-500/10 text-violet-400 border border-violet-500/20" },
  { label: "Government",        href: "/government",  icon: Building2,    cat: "Government",         color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  { label: "Unexplained",       href: "/unexplained", icon: HelpCircle,   cat: "Unexplained",        color: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" },
  { label: "Ancient Mysteries", href: "/ancient",     icon: Pyramid,      cat: "Ancient Mysteries",  color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  { label: "Historical",        href: "/historical",  icon: Landmark,     cat: "Historical",         color: "bg-orange-500/10 text-orange-400 border border-orange-500/20" },
  { label: "Science",           href: "/science",     icon: FlaskConical, cat: "Science",            color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  { label: "Urban Legends",     href: "/urban",       icon: Ghost,        cat: "Urban Legends",      color: "bg-pink-500/10 text-pink-400 border border-pink-500/20" },
  { label: "Debunked",          href: "/debunked",    icon: XCircle,      cat: "Debunked",           color: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20" },
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",  // earth from space — UFO/cosmic
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",  // binary matrix code — surveillance/gov
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",  // dark mountain peaks — unexplained
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",  // circuit board — science/tech
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&q=80",  // starry night sky — astronomical
  "https://images.unsplash.com/photo-1532094349884-543559a8b937?w=600&q=80",  // science laboratory — research
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",  // dark library stacks — historical/archives
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",  // city at night — urban legends
];

interface ForYouPageProps {
  featured: Investigation;
  featuredImageUrl?: string;
  featuredExtract?: string;
  trending: Investigation[];
  latest: Investigation[];
  wikiImages: Record<string, string>;
  topScored?: Investigation[];
}

export function ForYouPage({
  featured,
  featuredImageUrl,
  featuredExtract,
  trending,
  latest,
  wikiImages,
  topScored,
}: ForYouPageProps) {
  const { label: evidenceLabel, color: evidenceColor } = getEvidenceLabel(featured.evidenceScore);

  return (
    <div className="min-h-screen bg-rt-bg flex flex-col">
      {/* ── Top header bar (full width) ──────────────────────────────── */}
      <div className="bg-rt-panel border-b border-rt-border px-4 sm:px-8 py-5 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rt-red/10 border border-rt-red/20 rounded-lg flex items-center justify-center">
              <Sparkles size={18} className="text-rt-red" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-rt-white tracking-tight leading-none">For You</h1>
              <p className="text-rt-muted text-xs mt-0.5">Curated by evidence score &amp; activity</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-xs text-rt-muted">
            <span>
              <span className="text-rt-white font-semibold">{allInvestigations.length}</span> investigations
            </span>
            <span className="text-rt-border">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rt-red animate-pulse" />
              Live feed
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row flex-1">

        {/* ── Center: Main content ──────────────────────────────────── */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 min-w-0">
          {/* Featured */}
          <section>
            <SectionHeader icon={<Star size={14} />} label="Featured Investigation" />
            <Link href={`/investigation/${featured.slug}`} className="block mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-rt-border hover:border-rt-red/50 transition-all duration-300 cursor-pointer"
                style={{ minHeight: 220 }}
              >
                <div className="absolute inset-0">
                  <img
                    src={featuredImageUrl || FALLBACK_IMAGES[0]}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-rt-bg via-rt-bg/80 to-rt-bg/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-rt-bg/60 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 p-5 sm:p-8 flex flex-col justify-end h-full" style={{ minHeight: 220 }}>
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn("text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded border", getCategoryColor(featured.category))}>
                        {featured.category}
                      </span>
                      {featured.year && (
                        <span className="text-[10px] text-rt-muted font-mono bg-black/40 px-2 py-1 rounded">{featured.year}</span>
                      )}
                      <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-rt-red/10 text-rt-red border border-rt-red/20 rounded">Featured</span>
                    </div>
          <h2 className="text-xl sm:text-2xl font-bold text-rt-white mb-2 leading-tight group-hover:text-rt-red transition-colors line-clamp-2">{featured.title}</h2>
                    <p className="text-rt-muted text-sm leading-relaxed line-clamp-2 mb-4">{featuredExtract || featured.description}</p>
                    <div className="flex items-center gap-4">
                      <EvidenceScore score={featured.evidenceScore} size="sm" animated showLabel />
                      <span className="flex items-center gap-1 text-rt-red text-xs font-medium group-hover:gap-2 transition-all">
                        Investigate <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rt-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            </Link>
          </section>

          {/* Trending */}
          <section>
            <SectionHeader icon={<TrendingUp size={14} />} label="Trending Now" href="/trending" />
            <div className="flex flex-col gap-3 mt-4">
              {trending.map((inv, i) => (
                <TrendingListCard
                  key={inv.id}
                  inv={inv}
                  index={i}
                  imageUrl={wikiImages[inv.id] || FALLBACK_IMAGES[(i + 1) % FALLBACK_IMAGES.length]}
                />
              ))}
            </div>
          </section>

          {/* Latest */}
          <section>
            <SectionHeader icon={<Clock size={14} />} label="Latest Additions" href="/latest" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {latest.map((inv, i) => (
                <LatestCard
                  key={inv.id}
                  inv={inv}
                  index={i}
                  imageUrl={wikiImages[inv.id] || FALLBACK_IMAGES[(i + 3) % FALLBACK_IMAGES.length]}
                />
              ))}
            </div>
          </section>

          {/* Browse by Category */}
          <section>
            <SectionHeader icon={<BarChart2 size={14} />} label="Browse by Category" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {CATEGORY_NAV_GRID.map(({ label, href, icon: Icon, cat, color }, i) => {
                const count = allInvestigations.filter(inv => inv.category === cat).length;
                return (
                  <Link key={href} href={href}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={cn(
                        "group relative flex flex-col items-start gap-1.5 rounded-xl border bg-rt-panel p-3.5 hover:border-rt-red/50 transition-all duration-300 cursor-pointer overflow-hidden",
                        "border-rt-border hover:bg-rt-surface"
                      )}
                    >
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-1", color)}>
                        <Icon size={15} />
                      </div>
                      <span className="text-rt-white text-xs font-semibold leading-tight">{label}</span>
                      <span className="text-rt-muted text-[10px] font-mono">{count} investigations</span>
                      <ChevronRight size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-rt-border group-hover:text-rt-red group-hover:translate-x-0.5 transition-all" />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rt-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Highest Confidence */}
          <section>
            <SectionHeader icon={<ShieldAlert size={14} />} label="Highest Evidence Score" />
            <div className="mt-4 rounded-xl border border-rt-border bg-rt-panel overflow-hidden">
              {(topScored ?? allInvestigations.slice().sort((a, b) => b.evidenceScore - a.evidenceScore).slice(0, 8)).map((inv, i) => (
                <HighConfidenceRow key={inv.id} inv={inv} rank={i + 1} />
              ))}
            </div>
          </section>

          {/* Stats strip */}
          <section>
            <SectionHeader icon={<Zap size={14} />} label="By the Numbers" />
            <StatsStrip />
          </section>

        </main>

        {/* ── Right: Historical Thread timeline (hidden on mobile/tablet) ── */}
        <aside className="hidden xl:flex xl:flex-col w-[300px] shrink-0 border-l border-rt-border bg-rt-panel/20 xl:overflow-y-auto">
          <div className="p-4">
            <HomeTimeline />
          </div>
        </aside>

      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

/* ── PageNav — left column navigation ──────────────────────────────────── */

const categoryNav = [
  { label: "Unexplained",      href: "/unexplained",  icon: HelpCircle,      cat: "Unexplained" },
  { label: "Historical",       href: "/historical",   icon: Landmark,        cat: "Historical" },
  { label: "Government",       href: "/government",   icon: Building2,       cat: "Government" },
  { label: "Science",          href: "/science",      icon: FlaskConical,    cat: "Science" },
  { label: "Ancient Mysteries",href: "/ancient",      icon: Pyramid,         cat: "Ancient Mysteries" },
  { label: "Urban Legends",    href: "/urban",        icon: Ghost,           cat: "Urban Legends" },
  { label: "UFO",              href: "/ufo",          icon: Eye,             cat: "UFO" },
  { label: "Debunked",         href: "/debunked",     icon: XCircle,         cat: "Debunked" },
];

const toolNav = [
  { label: "Timeline",         href: "/tools/timeline",      icon: GitBranch },
  { label: "Compare Sources",  href: "/tools/compare",       icon: Layers },
  { label: "Evidence Map",     href: "/tools/evidence-map",  icon: Map },
  { label: "Community Notes",  href: "/tools/community",     icon: MessageSquareMore },
];

function PageNav({ trending, latest }: { trending: Investigation[]; latest: Investigation[] }) {
  // Count investigations per category
  const counts = allInvestigations.reduce<Record<string, number>>((acc, inv) => {
    acc[inv.category] = (acc[inv.category] ?? 0) + 1;
    return acc;
  }, {});

  // Top evidence score
  const topScore = Math.max(...[...trending, ...latest].map(i => i.evidenceScore));

  return (
    <div className="flex flex-col h-full py-4">
      {/* Stats strip */}
      <div className="px-4 mb-5 space-y-2">
        <div className="rounded-lg border border-rt-border bg-rt-surface px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-widest text-rt-muted font-semibold mb-1">Total Investigations</p>
          <p className="text-xl font-bold text-rt-white">{allInvestigations.length}</p>
        </div>
        <div className="rounded-lg border border-rt-red/20 bg-rt-red/5 px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-widest text-rt-red/70 font-semibold mb-1">Top Evidence Score</p>
          <p className="text-xl font-bold text-rt-red">{topScore}<span className="text-xs font-normal text-rt-muted">/100</span></p>
        </div>
      </div>

      {/* Category nav */}
      <div className="px-3 mb-2">
        <span className="text-[9px] font-semibold tracking-widest uppercase text-rt-muted px-1">Categories</span>
      </div>
      <nav className="flex-1 px-2 space-y-0.5">
        {categoryNav.map(({ label, href, icon: Icon, cat }) => (
          <Link key={href} href={href}>
            <div className="group flex items-center justify-between px-2.5 py-1.5 rounded-md text-rt-muted hover:text-rt-white hover:bg-rt-surface transition-all duration-150 cursor-pointer">
              <div className="flex items-center gap-2 min-w-0">
                <Icon size={13} className="shrink-0 group-hover:text-rt-red transition-colors" />
                <span className="text-xs truncate">{label}</span>
              </div>
              <span className="text-[9px] font-mono text-rt-border ml-1 shrink-0">{counts[cat] ?? 0}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Tools */}
      <div className="px-3 mt-4 mb-2">
        <span className="text-[9px] font-semibold tracking-widest uppercase text-rt-muted px-1">Tools</span>
      </div>
      <div className="px-2 space-y-0.5 pb-4">
        {toolNav.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href}>
            <div className="group flex items-center gap-2 px-2.5 py-1.5 rounded-md text-rt-muted hover:text-rt-white hover:bg-rt-surface transition-all duration-150 cursor-pointer">
              <Icon size={13} className="shrink-0 group-hover:text-rt-red transition-colors" />
              <span className="text-xs truncate">{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function SectionHeader({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-rt-red">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-rt-muted">
          {label}
        </span>
      </div>
      {href && (
        <a
          href={href}
          className="text-xs text-rt-muted hover:text-rt-red transition-colors flex items-center gap-1"
        >
          View all <ArrowRight size={11} />
        </a>
      )}
    </div>
  );
}

/** Compact horizontal card for the Trending column */
function TrendingListCard({
  inv,
  index,
  imageUrl,
}: {
  inv: Investigation;
  index: number;
  imageUrl: string;
}) {
  return (
    <Link href={`/investigation/${inv.slug}`} className="block">
      <motion.article
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: index * 0.07 }}
        className="group relative flex gap-3 bg-rt-panel rounded-xl border border-rt-border hover:border-rt-red/40 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <div className="relative w-20 shrink-0 overflow-hidden bg-rt-surface">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-rt-panel/20" />
        </div>
        <div className="flex-1 py-3 pr-3 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className={cn(
                "text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border",
                getCategoryColor(inv.category)
              )}
            >
              {inv.category}
            </span>
            {inv.year && (
              <span className="text-[9px] text-rt-muted font-mono">{inv.year}</span>
            )}
          </div>
          <h3 className="text-rt-white font-semibold text-xs leading-snug mb-1.5 group-hover:text-rt-red transition-colors line-clamp-2">
            {inv.title}
          </h3>
          <EvidenceScore score={inv.evidenceScore} size="sm" animated showLabel={false} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-rt-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </motion.article>
    </Link>
  );
}

function LatestCard({
  inv,
  index,
  imageUrl,
}: {
  inv: Investigation;
  index: number;
  imageUrl: string;
}) {
  return (
    <Link href={`/investigation/${inv.slug}`} className="block">
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.07 }}
      whileHover={{ y: -3 }}
      className="group relative bg-rt-panel rounded-xl overflow-hidden border border-rt-border hover:border-rt-red/40 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-32 overflow-hidden bg-rt-surface">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rt-panel via-rt-panel/30 to-transparent" />
        <div className="absolute top-2 left-2">
          <span
            className={cn(
              "text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border backdrop-blur-sm",
              getCategoryColor(inv.category)
            )}
          >
            {inv.category}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-rt-white font-semibold text-xs leading-snug mb-1.5 group-hover:text-rt-red transition-colors line-clamp-2">
          {inv.title}
        </h3>
        <EvidenceScore score={inv.evidenceScore} size="sm" animated />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rt-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.article>
    </Link>
  );
}

/** Ranked row for Highest Evidence section */
function HighConfidenceRow({ inv, rank }: { inv: Investigation; rank: number }) {
  const { label: evidenceLabel, color: evidenceColor } = getEvidenceLabel(inv.evidenceScore);
  return (
    <Link href={`/investigation/${inv.slug}`} className="block">
      <div className="group flex items-center gap-3 px-4 py-2.5 border-b border-rt-border/50 last:border-0 hover:bg-rt-surface transition-colors cursor-pointer">
        <span className="text-[11px] font-mono text-rt-border w-5 shrink-0 text-right">{rank}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={cn("text-[8px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border", getCategoryColor(inv.category))}>
              {inv.category}
            </span>
            {inv.year && <span className="text-[9px] text-rt-muted font-mono">{inv.year}</span>}
          </div>
          <p className="text-rt-white text-xs font-medium leading-snug group-hover:text-rt-red transition-colors truncate">{inv.title}</p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className={cn("text-xs font-bold tabular-nums", evidenceColor)}>{inv.evidenceScore}</span>
          <div className="w-12 h-1 rounded-full bg-rt-surface overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", inv.evidenceScore >= 85 ? "bg-rt-red" : inv.evidenceScore >= 60 ? "bg-amber-500" : "bg-zinc-500")}
              style={{ width: `${inv.evidenceScore}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Stats strip */
function StatsStrip() {
  const total = allInvestigations.length;
  const categories = [...new Set(allInvestigations.map(i => i.category))].length;
  const highEvidence = allInvestigations.filter(i => i.evidenceScore >= 85).length;
  const debunked = allInvestigations.filter(i => i.category === "Debunked").length;
  const avgScore = Math.round(allInvestigations.reduce((s, i) => s + i.evidenceScore, 0) / total);

  const stats = [
    { label: "Investigations", value: total, sub: "and counting" },
    { label: "Categories", value: categories, sub: "topic areas" },
    { label: "High Evidence", value: highEvidence, sub: "score ≥ 85" },
    { label: "Debunked", value: debunked, sub: "confirmed false" },
    { label: "Avg. Evidence", value: `${avgScore}`, sub: "out of 100" },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
      {stats.map(({ label, value, sub }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className={cn(
            "rounded-xl border border-rt-border bg-rt-panel px-4 py-3 flex flex-col",
            i === stats.length - 1 && stats.length % 2 !== 0 && "col-span-2 sm:col-span-1"
          )}
        >
          <span className="text-2xl font-bold text-rt-white tabular-nums">{value}</span>
          <span className="text-[10px] font-semibold text-rt-white/80 mt-0.5">{label}</span>
          <span className="text-[9px] text-rt-muted mt-0.5">{sub}</span>
        </motion.div>
      ))}
    </div>
  );
}

/** Cinematic timeline for the homepage third column */
function HomeTimeline() {
  const [lineVisible, setLineVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setLineVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="rounded-2xl border border-rt-border bg-rt-bg/60 overflow-hidden">
      {/* Header strip */}
      <div className="px-4 py-3.5 border-b border-rt-border bg-rt-panel/50">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-4 h-px bg-rt-red" />
          <span className="text-[9px] font-semibold tracking-widest uppercase text-rt-red">The Thread</span>
        </div>
        <p className="text-rt-white text-sm font-bold">Historical Timeline</p>
        <p className="text-rt-muted text-[10px] mt-0.5">Key events across the history of the unexplained</p>
      </div>

      {/* Entries */}
      <div ref={containerRef} className="relative px-3 pt-4 pb-2">
        {/* Glowing line */}
        <div className="absolute left-[52px] top-0 bottom-0 w-px overflow-hidden pointer-events-none" aria-hidden>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={lineVisible ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0, height: "100%" }}
            className="w-full bg-gradient-to-b from-rt-red via-rt-red/60 to-transparent"
          />
          {lineVisible && (
            <motion.div
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-white/25 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2.5 }}
            />
          )}
        </div>

        <div className="space-y-0">
          {timelineEvents.map((event, i) => (
            <HomeTimelineNode key={i} event={event} index={i} />
          ))}
        </div>

        {/* End cap */}
        <div className="flex items-center gap-2 pl-[52px] pb-3 pt-1">
          <div className="w-2 h-2 rounded-full bg-rt-red/30 border border-rt-red/40 ml-1.5" />
          <span className="text-[9px] text-rt-border font-mono tracking-wider">END OF KNOWN RECORD</span>
        </div>
      </div>
    </div>
  );
}

function HomeTimelineNode({ event, index }: { event: (typeof timelineEvents)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-0 group transition-all duration-500",
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
      )}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Year */}
      <div className="w-10 shrink-0 pt-[14px] text-right pr-2">
        <span className={cn(
          "font-mono text-[9px] font-bold tracking-wider whitespace-nowrap transition-colors duration-300",
          visible ? "text-rt-red" : "text-rt-border"
        )}>
          {event.year}
        </span>
      </div>

      {/* Node */}
      <div className="relative flex flex-col items-center mx-3 shrink-0">
        {visible && (
          <span
            className="absolute top-[10px] w-4 h-4 rounded-full bg-rt-red/20 animate-ping"
            style={{ animationDuration: "2.4s", animationDelay: `${index * 0.18}s` }}
          />
        )}
        <div className={cn(
          "w-2.5 h-2.5 rounded-full border-2 mt-3 z-10 transition-all duration-300",
          visible
            ? "bg-rt-red border-rt-red shadow-[0_0_6px_1px_rgba(220,38,38,0.5)]"
            : "bg-rt-panel border-rt-border"
        )} />
        <div className="flex-1 w-px bg-transparent mt-1" />
      </div>

      {/* Card */}
      <div className="flex-1 pb-4 pt-1 min-w-0">
        <div className={cn(
          "rounded-xl border bg-rt-panel/70 p-3 transition-all duration-300",
          "group-hover:bg-rt-panel group-hover:border-rt-red/30 group-hover:shadow-[0_0_16px_0px_rgba(220,38,38,0.07)]",
          "border-rt-border"
        )}>
          <div className="mb-1">
            <span className={cn(
              "text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border",
              getCategoryColor(event.category)
            )}>
              {event.category}
            </span>
          </div>
          <h4 className="text-rt-white text-[11px] font-semibold leading-snug mb-0.5 group-hover:text-rt-red transition-colors">
            {event.title}
          </h4>
          <p className="text-rt-muted text-[10px] leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}
