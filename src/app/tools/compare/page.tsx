import { ToolPage } from "@/components/layout/ToolPage";
import { CompareNarratives } from "@/components/sections/CompareNarratives";

export const metadata = {
  title: "Compare Sources — RedThread",
  description: "See how mainstream media, communities, and fact-checkers interpret the same story.",
};

export default function ComparePage() {
  return (
    <ToolPage
      title="Compare Sources"
      subtitle="See how different sources interpret the same investigation."
      iconName="Layers"
    >
      <CompareNarratives />
    </ToolPage>
  );
}
