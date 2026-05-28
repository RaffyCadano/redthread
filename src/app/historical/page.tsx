import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Historical — RedThread",
  description: "Mysteries rooted in documented history.",
};

export default async function HistoricalPage() {
  const all = allInvestigations.filter(
    (inv) => inv.category === "Historical"
  );

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
      title="Historical"
      subtitle="Mysteries rooted in documented history."
      iconName="Landmark"
      investigations={all}
      emptyMessage="No historical investigations found."
      wikiImages={wikiImages}
    />
  );
}
