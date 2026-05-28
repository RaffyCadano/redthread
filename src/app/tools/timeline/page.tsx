import { ToolPage, ComingSoonPlaceholder } from "@/components/layout/ToolPage";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { timelineEvents } from "@/lib/investigations";

export const metadata = {
  title: "Timeline — RedThread",
  description: "A chronological map of the unexplained.",
};

export default function TimelineToolPage() {
  return (
    <ToolPage
      title="Timeline"
      subtitle="A chronological map of key events across history."
      iconName="GitBranch"
    >
      <TimelineSection events={timelineEvents} />
    </ToolPage>
  );
}
