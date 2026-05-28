import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Urban Legends — RedThread",
  description: "Modern folklore and the grains of truth buried within.",
};

export default async function UrbanPage() {
  const all = allInvestigations.filter(
    (inv) => inv.category === "Urban Legends"
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
      title="Urban Legends"
      subtitle="Modern folklore and the grains of truth buried within."
      iconName="Ghost"
      investigations={all}
      emptyMessage="No urban legends documented yet."
      wikiImages={wikiImages}
    />
  );
}
