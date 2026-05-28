import { ToolPage, ComingSoonPlaceholder } from "@/components/layout/ToolPage";

export const metadata = {
  title: "Community Notes — RedThread",
  description: "Researcher-verified context, corrections, and additional sources.",
};

export default function CommunityPage() {
  return (
    <ToolPage
      title="Community Notes"
      subtitle="Researcher-verified context, corrections, and additional sources."
      iconName="MessageSquareMore"
      badge="Phase 3"
    >
      <ComingSoonPlaceholder
        iconName="MessageSquareMore"
        label="Community Notes"
        description="Verified researchers will be able to add context, flag inaccuracies, and contribute additional sources to any investigation. Community notes are reviewed for quality and attached directly to the relevant investigation section."
      />
    </ToolPage>
  );
}
