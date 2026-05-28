"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getEvidenceLabel } from "@/lib/investigations";

interface EvidenceScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

export function EvidenceScore({
  score,
  size = "md",
  showLabel = true,
  animated = true,
}: EvidenceScoreProps) {
  const { label, color } = getEvidenceLabel(score);

  const barColor =
    score >= 80
      ? "bg-green-500"
      : score >= 60
      ? "bg-yellow-500"
      : score >= 30
      ? "bg-orange-500"
      : "bg-rt-muted";

  const glowColor =
    score >= 80
      ? "shadow-[0_0_8px_#22c55e60]"
      : score >= 60
      ? "shadow-[0_0_8px_#eab30860]"
      : score >= 30
      ? "shadow-[0_0_8px_#f9731660]"
      : "";

  return (
    <div className={cn("flex flex-col gap-1", size === "sm" && "gap-0.5")}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-bold tabular-nums",
              color,
              size === "lg" && "text-2xl",
              size === "md" && "text-base",
              size === "sm" && "text-xs"
            )}
          >
            {score}
          </span>
          <span
            className={cn(
              "text-rt-muted",
              size === "lg" && "text-sm",
              size === "md" && "text-xs",
              size === "sm" && "text-[10px]"
            )}
          >
            / 100
          </span>
        </div>
        {showLabel && (
          <span
            className={cn(
              "font-medium",
              color,
              size === "lg" && "text-sm",
              size === "md" && "text-xs",
              size === "sm" && "text-[10px]"
            )}
          >
            {label}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        className={cn(
          "w-full bg-rt-border rounded-full overflow-hidden",
          size === "lg" && "h-2",
          size === "md" && "h-1.5",
          size === "sm" && "h-1"
        )}
      >
        {animated ? (
          <motion.div
            className={cn("h-full rounded-full", barColor, glowColor)}
            initial={{ width: 0 }}
            whileInView={{ width: `${score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        ) : (
          <div
            className={cn("h-full rounded-full", barColor, glowColor)}
            style={{ width: `${score}%` }}
          />
        )}
      </div>
    </div>
  );
}
