import { notFound } from "next/navigation";
import { ExternalLink, Calendar, BarChart2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { allInvestigations, getCategoryColor, getEvidenceLabel } from "@/lib/investigations";
import { investigationTimelines, getFallbackTimeline } from "@/lib/timeline-data";
import { getWikiSummary } from "@/lib/wikipedia";
import { EvidenceScore } from "@/components/ui/EvidenceScore";
import { cn } from "@/lib/utils";
import { BackButton } from "./BackButton";
import { WikiArticle } from "./WikiArticle";
import { InvestigationTimeline } from "./InvestigationTimeline";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const inv = allInvestigations.find((i) => i.slug === slug);
  if (!inv) return { title: "Not Found — RedThread" };
  return {
    title: `${inv.title} — RedThread`,
    description: inv.description,
  };
}

export default async function InvestigationPage({ params }: PageProps) {
  const { slug } = await params;
  const inv = allInvestigations.find((i) => i.slug === slug);
  if (!inv) notFound();

  const wiki = await getWikiSummary(inv.wikiTitle);

  const imageUrl = wiki?.thumbnail?.source ?? null;
  const wikiUrl = wiki?.content_urls?.desktop?.page ?? null;

  const timelineEntries =
    investigationTimelines[inv.id] ??
    getFallbackTimeline(inv.year, inv.title, inv.description, inv.category);

  // Related: same category, excluding this one
  const related = allInvestigations
    .filter((i) => i.category === inv.category && i.id !== inv.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-rt-bg flex flex-col">
      {/* ── Hero (full width) ─────────────────────────────────────────── */}
      <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={inv.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-rt-panel" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-rt-bg via-rt-bg/60 to-rt-bg/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-rt-bg/40 to-transparent" />
        <div className="absolute top-6 left-8">
          <BackButton />
        </div>
      </div>

      {/* ── Body: stacks on mobile, 3-col on lg+ ─────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:flex-1 lg:min-h-0 -mt-16 relative z-10">

        {/* Left: meta panel — compact strip on mobile, sidebar on desktop */}
        <aside className="lg:w-56 lg:shrink-0 px-4 sm:px-6 lg:px-4 pt-20 lg:pt-0">
          <div className="lg:sticky lg:top-6 space-y-4">
            {/* Badges — always visible */}
            <div className="flex flex-wrap items-center gap-2 pt-0 lg:pt-16">
              <span className={cn(
                "inline-block text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded border",
                getCategoryColor(inv.category)
              )}>
                {inv.category}
              </span>
              {inv.year && (
                <div className="inline-flex items-center gap-1.5 text-[10px] text-rt-muted font-mono bg-rt-panel border border-rt-border px-2 py-1 rounded">
                  <Calendar size={9} />
                  {inv.year}
                </div>
              )}
            </div>

            {/* Evidence score card */}
            <div className="bg-rt-panel border border-rt-border rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <BarChart2 size={12} className="text-rt-muted" />
                <span className="text-[9px] text-rt-muted uppercase tracking-widest font-semibold">Evidence Score</span>
              </div>
              <EvidenceScore score={inv.evidenceScore} size="md" animated showLabel />
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <p className="text-[9px] font-semibold tracking-widest uppercase text-rt-muted mb-2 px-0.5">Related</p>
                <div className="space-y-1.5">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/investigation/${r.slug}`}
                      className="group flex items-start gap-2 p-2.5 rounded-lg bg-rt-panel border border-rt-border hover:border-rt-red/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-rt-white text-[11px] font-medium leading-snug group-hover:text-rt-red transition-colors line-clamp-2">
                          {r.title}
                        </p>
                        {r.year && <p className="text-rt-muted text-[9px] font-mono mt-0.5">{r.year}</p>}
                      </div>
                      <ArrowRight size={10} className="shrink-0 text-rt-border group-hover:text-rt-red mt-0.5 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Wikipedia link */}
            {wikiUrl && (
              <a
                href={wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-medium text-rt-muted hover:text-rt-white transition-colors border border-rt-border hover:border-rt-red/40 px-3 py-2 rounded-lg bg-rt-panel w-full"
              >
                <ExternalLink size={11} />
                Wikipedia article
              </a>
            )}
          </div>
        </aside>

        {/* Center: article */}
        <main className="flex-1 min-w-0 lg:overflow-y-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20 pt-4 lg:pt-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-rt-white leading-tight mb-6 tracking-tight">
            {inv.title}
          </h1>
          <WikiArticle wikiTitle={inv.wikiTitle} fallback={inv.description} />
        </main>

        {/* Right: timeline — hidden on mobile */}
        <aside className="hidden lg:block lg:w-80 xl:w-96 shrink-0 border-l border-rt-border lg:overflow-y-auto pt-4 pb-10 px-4">
          <InvestigationTimeline entries={timelineEntries} investigationTitle={inv.title} />
        </aside>

      </div>
    </div>
  );
}
