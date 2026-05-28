import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Government — RedThread",
  description: "Classified programs, cover-ups, and declassified revelations.",
};

export default async function GovernmentPage() {
  const all = allInvestigations.filter(
    (inv) => inv.category === "Government"
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
      title="Government"
      subtitle="Classified programs, cover-ups, and declassified revelations."
      iconName="Building2"
      investigations={all}
      emptyMessage="No government investigations on file."
      wikiImages={wikiImages}
    />
  );
}
