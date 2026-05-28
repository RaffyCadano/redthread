"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, AlertCircle, Users } from "lucide-react";

const panels = [
  {
    id: "mainstream",
    label: "Mainstream Coverage",
    icon: CheckCircle2,
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-900/10",
    headerBg: "bg-blue-900/20",
    sources: ["BBC", "Reuters", "AP News"],
    description:
      "Established media outlets present verified facts and official statements. Focus on confirmed evidence and expert consensus.",
    traits: ["Peer-reviewed sources", "Official statements", "Verified facts", "Expert quotes"],
    sampleHeadline: '"Official reports cite natural causes; investigation closed in 1959."',
  },
  {
    id: "community",
    label: "Theory Communities",
    icon: Users,
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-900/10",
    headerBg: "bg-amber-900/20",
    sources: ["Reddit", "Forums", "Archives"],
    description:
      "Community-driven research that aggregates personal testimonies, alternative interpretations, and pattern recognition.",
    traits: ["Crowdsourced research", "Witness testimonies", "Pattern analysis", "Cross-referencing"],
    sampleHeadline: '"Multiple inconsistencies in official timeline suggest external forces were involved."',
  },
  {
    id: "factcheck",
    label: "Fact Check Analysis",
    icon: AlertCircle,
    iconColor: "text-green-400",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-900/10",
    headerBg: "bg-green-900/20",
    sources: ["Snopes", "PolitiFact", "FactCheck.org"],
    description:
      "Independent verification organizations compare claims against documented evidence to assess accuracy and context.",
    traits: ["Independent verification", "Claim testing", "Source comparison", "Context analysis"],
    sampleHeadline: '"Partially true — core events confirmed, but key details remain disputed."',
  },
];

export function CompareNarratives() {
  return (
    <section className="px-10 py-16 bg-rt-panel/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-px bg-rt-red" />
          <span className="text-rt-red text-xs font-semibold tracking-widest uppercase">
            Compare Narratives
          </span>
        </div>
        <h2 className="text-3xl font-bold text-rt-white tracking-tight">
          The Same Story, Different Lenses
        </h2>
        <p className="text-rt-muted text-sm mt-2 max-w-xl">
          Every investigation is viewed through multiple perspectives. Understanding how narratives differ is
          the first step to critical thinking.
        </p>
      </motion.div>

      {/* Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {panels.map((panel, i) => {
          const Icon = panel.icon;
          return (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className={`rounded-xl border ${panel.borderColor} ${panel.bgColor} overflow-hidden`}
            >
              {/* Panel header */}
              <div className={`${panel.headerBg} px-5 py-4 border-b ${panel.borderColor}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={16} className={panel.iconColor} />
                  <h3 className="text-rt-white font-semibold text-sm">{panel.label}</h3>
                </div>
                {/* Sources */}
                <div className="flex flex-wrap gap-1.5">
                  {panel.sources.map((src) => (
                    <span
                      key={src}
                      className="text-[10px] text-rt-muted bg-rt-panel/60 px-2 py-0.5 rounded border border-rt-border flex items-center gap-1"
                    >
                      <ExternalLink size={8} />
                      {src}
                    </span>
                  ))}
                </div>
              </div>

              {/* Panel body */}
              <div className="p-5">
                <p className="text-rt-muted text-xs leading-relaxed mb-4">{panel.description}</p>

                {/* Traits */}
                <ul className="space-y-1.5 mb-5">
                  {panel.traits.map((trait) => (
                    <li key={trait} className="flex items-center gap-2 text-xs text-rt-muted">
                      <span className={`w-1 h-1 rounded-full ${panel.iconColor.replace("text-", "bg-")}`} />
                      {trait}
                    </li>
                  ))}
                </ul>

                {/* Sample headline */}
                <div className="bg-rt-panel/60 rounded-lg p-3 border border-rt-border">
                  <p className="text-[10px] text-rt-muted mb-1 uppercase tracking-wider">Sample Narrative</p>
                  <p className={`text-xs leading-relaxed italic ${panel.iconColor}`}>
                    {panel.sampleHeadline}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-rt-muted text-sm">
          <span className="text-rt-red font-medium">Compare Sources</span> tool available for every investigation.
          {" "}See how narratives diverge and converge.
        </p>
      </motion.div>
    </section>
  );
}
