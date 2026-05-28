import { ForYouPage } from "@/components/layout/ForYouPage";
import {
  featuredInvestigation,
  trendingInvestigations,
  latestInvestigations,
} from "@/lib/investigations";
import { getWikiSummary } from "@/lib/wikipedia";

export const metadata = {
  title: "For You — RedThread",
  description: "Your personalised investigation feed.",
};

export default async function HomePage() {
  // Only fetch the featured investigation's wiki data to avoid rate-limiting
  const featuredWiki = await getWikiSummary(featuredInvestigation.wikiTitle);

  const wikiImages: Record<string, string> = {};
  if (featuredWiki?.thumbnail?.source) {
    wikiImages[featuredInvestigation.id] = featuredWiki.thumbnail.source;
  }

  return (
    <ForYouPage
      featured={featuredInvestigation}
      featuredImageUrl={featuredWiki?.thumbnail?.source}
      featuredExtract={featuredWiki?.extract}
      trending={trendingInvestigations}
      latest={latestInvestigations}
      wikiImages={wikiImages}
    />
  );
}


