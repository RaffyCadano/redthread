import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Unexplained — RedThread",
  description: "Cases that defy conventional explanation.",
};

export default async function UnexplainedPage() {
  const all = allInvestigations.filter(
    (inv) => inv.category === "Unexplained"
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
      title="Unexplained"
      subtitle="Cases that defy conventional explanation."
      iconName="HelpCircle"
      investigations={all}
      emptyMessage="No unexplained cases on file — yet."
      wikiImages={wikiImages}
    />
  );
}
