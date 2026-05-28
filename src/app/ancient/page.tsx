import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Ancient Mysteries — RedThread",
  description: "Civilizations, artifacts, and events that still confound historians.",
};

export default async function AncientPage() {
  const all = allInvestigations.filter(
    (inv) => inv.category === "Ancient Mysteries"
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
      title="Ancient Mysteries"
      subtitle="Civilizations, artifacts, and events that still confound historians."
      iconName="Pyramid"
      investigations={all}
      emptyMessage="No ancient mysteries on file."
      wikiImages={wikiImages}
    />
  );
}
