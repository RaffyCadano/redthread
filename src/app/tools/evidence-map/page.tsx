import { ToolPage, ComingSoonPlaceholder } from "@/components/layout/ToolPage";

export const metadata = {
  title: "Evidence Map — RedThread",
  description: "Interactive graph connecting events, people, and organizations.",
};

export default function EvidenceMapPage() {
  return (
    <ToolPage
      title="Evidence Map"
      subtitle="Interactive graph of connections between events, people, and organizations."
      iconName="Map"
      badge="Phase 2"
    >
      <ComingSoonPlaceholder
        iconName="Map"
        label="Evidence Map"
        description="An interactive graph visualization that maps the connections between events, people, theories, organizations, and historical timelines. Discover how the Roswell Incident links to Area 51, Cold War policy, and declassified government reports — all in one view."
      />
    </ToolPage>
  );
}
