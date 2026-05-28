import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Debunked Myths — RedThread",
  description: "Claims investigated, evidence examined, conclusions reached.",
};

export default async function DebunkedPage() {
  const all = allInvestigations.filter(
    (inv) => inv.category === "Debunked"
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
      title="Debunked Myths"
      subtitle="Claims investigated, evidence examined, conclusions reached."
      iconName="XCircle"
      investigations={all}
      emptyMessage="No debunked myths in the archive yet."
      wikiImages={wikiImages}
    />
  );
}
