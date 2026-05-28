import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "Science — RedThread",
  description: "Anomalous phenomena examined through a scientific lens.",
};

export default async function SciencePage() {
  const all = allInvestigations.filter(
    (inv) => inv.category === "Science"
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
      title="Science"
      subtitle="Anomalous phenomena examined through a scientific lens."
      iconName="FlaskConical"
      investigations={all}
      emptyMessage="No science investigations found."
      wikiImages={wikiImages}
    />
  );
}
