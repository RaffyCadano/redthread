import { CategoryPage } from "@/components/layout/CategoryPage";
import { allInvestigations } from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "UFO — RedThread",
  description: "Documented UFO encounters, government admissions, and unexplained aerial phenomena.",
};

export default async function UfoPage() {
  const all = allInvestigations.filter((inv) => inv.category === "UFO");

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
      title="UFO"
      subtitle="Documented encounters, government admissions, and unexplained aerial phenomena."
      iconName="Eye"
      investigations={all}
      wikiImages={wikiImages}
    />
  );
}
