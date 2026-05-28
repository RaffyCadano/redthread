import { ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { getWikiSummary, getWikiRelated } from "@/lib/wikipedia";
import { BackButton } from "./BackButton";
import { WikiPageArticle } from "./WikiPageArticle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = decodeURIComponent(slug).replace(/_/g, " ");
  return { title: `${title} — RedThread` };
}

export default async function WikiPage({ params }: PageProps) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const displayTitle = decoded.replace(/_/g, " ");

  const [wiki, related] = await Promise.all([
    getWikiSummary(decoded),
    getWikiRelated(decoded),
  ]);

  const imageUrl = wiki?.thumbnail?.source ?? null;
  const description = wiki?.description ?? null;
  const wikiUrl = wiki?.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${slug}`;

  return (
    <div className="min-h-screen bg-rt-bg flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={displayTitle} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-rt-panel" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-rt-bg via-rt-bg/60 to-rt-bg/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-rt-bg/40 to-transparent" />
        <div className="absolute top-6 left-8">
          <BackButton />
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:flex-1 lg:min-h-0 -mt-16 relative z-10">

        {/* ── Left meta panel ───────────────────────────────────────── */}
        <aside className="lg:w-56 lg:shrink-0 px-4 sm:px-6 lg:px-4 pt-20 lg:pt-0">
          <div className="lg:sticky lg:top-6 space-y-4">
            {/* Source badge */}
            <div className="flex flex-wrap items-center gap-2 pt-0 lg:pt-16">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded border text-sky-400 border-sky-400/30 bg-sky-400/10">
                <BookOpen size={9} />
                Wikipedia
              </span>
            </div>

            {/* Description card */}
            {description && (
              <div className="bg-rt-panel border border-rt-border rounded-xl p-3">
                <p className="text-rt-muted text-[11px] leading-relaxed">{description}</p>
              </div>
            )}

            {/* Related articles */}
            {related.length > 0 && (
              <div>
                <p className="text-[9px] font-semibold tracking-widest uppercase text-rt-muted mb-2 px-0.5">Related</p>
                <div className="space-y-1.5">
                  {related.slice(0, 4).map((r) => (
                    <Link
                      key={r.title}
                      href={`/wiki/${encodeURIComponent(r.title.replace(/ /g, "_"))}`}
                      className="group flex items-start gap-2 p-2.5 rounded-lg bg-rt-panel border border-rt-border hover:border-rt-red/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-rt-white text-[11px] font-medium leading-snug group-hover:text-rt-red transition-colors line-clamp-2">
                          {r.title}
                        </p>
                        {r.description && (
                          <p className="text-rt-muted text-[9px] mt-0.5 line-clamp-1">{r.description}</p>
                        )}
                      </div>
                      <ArrowRight size={10} className="shrink-0 text-rt-border group-hover:text-rt-red mt-0.5 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Wikipedia source link */}
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-medium text-rt-muted hover:text-rt-white transition-colors border border-rt-border hover:border-rt-red/40 px-3 py-2 rounded-lg bg-rt-panel w-full"
            >
              <ExternalLink size={11} />
              View on Wikipedia
            </a>
          </div>
        </aside>

        {/* ── Center: article ───────────────────────────────────────── */}
        <main className="flex-1 min-w-0 lg:overflow-y-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20 pt-4 lg:pt-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-rt-white leading-tight mb-6 tracking-tight">
            {displayTitle}
          </h1>
          <WikiPageArticle wikiTitle={decoded} />
        </main>

      </div>
    </div>
  );
}
