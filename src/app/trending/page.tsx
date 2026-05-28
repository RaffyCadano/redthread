import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Trending — RedThread",
  description: "The most-viewed mystery investigations right now.",
};

export default async function TrendingPage() {
  const all = [...allInvestigations]
    .filter((inv) => inv.category !== "Debunked")
    .sort((a, b) => b.evidenceScore - a.evidenceScore);

  const wikiResults = await Promise.allSettled(
    all.map((inv) => getWikiSummary(inv.wikiTitle))
  );
  const wikiImages: Record<string, string> = {};
  all.forEach((inv, i) => {
    const r = wikiResults[i];
    if (r.status === "fulfilled" && r.value?.thumbnail?.source) {
      wikiImages[inv.id] = r.value.thumbnail.source;
    }
  });

  return (
    <CategoryPage
      title="Trending"
      subtitle="The most-viewed mystery investigations right now."
      iconName="TrendingUp"
      investigations={all}
      wikiImages={wikiImages}
    />
  );
}
