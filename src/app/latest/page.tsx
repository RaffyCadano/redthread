import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Latest — RedThread",
  description: "Newly added and recently updated investigations.",
};

export default async function LatestPage() {
  // Show all investigations newest-first (most recently added to the dataset)
  const all = [...allInvestigations].reverse().filter((inv) => inv.category !== "Debunked");

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
      title="Latest"
      subtitle="Newly added and recently updated investigations."
      iconName="Clock"
      investigations={all}
      wikiImages={wikiImages}
    />
  );
}
