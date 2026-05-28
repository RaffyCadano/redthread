"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Eye,
  Building2,
  Microscope,
  AlertTriangle,
  RefreshCw,
  BarChart2,
} from "lucide-react";
import type { TimelineEntry, TimelineEventType } from "@/lib/timeline-data";
import { cn } from "@/lib/utils";

const TYPE_CONFIG: Record<
  TimelineEventType,
  { label: string; icon: React.ElementType; color: string; border: string }
> = {
  incident: {
    label: "Incident",
    icon: AlertTriangle,
    color: "text-orange-400",
    border: "border-orange-400/30",
  },
  leak: {
    label: "Leaked",
    icon: FileText,
    color: "text-yellow-400",
    border: "border-yellow-400/30",
  },
  witness: {
    label: "Witness",
    icon: Eye,
    color: "text-sky-400",
    border: "border-sky-400/30",
  },
  government: {
    label: "Gov't",
    icon: Building2,
    color: "text-purple-400",
    border: "border-purple-400/30",
  },
  discovery: {
    label: "Discovery",
    icon: Microscope,
    color: "text-emerald-400",
    border: "border-emerald-400/30",
  },
  update: {
    label: "Update",
    icon: RefreshCw,
    color: "text-rt-muted",
    border: "border-rt-border",
  },
};

interface Props {
  entries: TimelineEntry[];
  investigationTitle: string;
}

function TimelineNode({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cfg = TYPE_CONFIG[entry.type];
  const Icon = cfg.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-0 group transition-all duration-500",
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Year + connector */}
      <div className="flex flex-col items-end w-12 shrink-0">
        <span
          className={cn(
            "font-mono text-[10px] font-bold tracking-wider leading-none pt-[14px] text-right transition-colors duration-300 whitespace-nowrap",
            visible ? "text-rt-red" : "text-rt-border"
          )}
        >
          {entry.year}
        </span>
      </div>

      {/* Node on the line */}
      <div className="relative flex flex-col items-center mx-3 shrink-0">
        {/* Pulse ring */}
        {visible && (
          <span
            className="absolute top-[10px] w-5 h-5 rounded-full bg-rt-red/20 animate-ping"
            style={{ animationDuration: "2.4s", animationDelay: `${index * 0.15}s` }}
          />
        )}
        {/* Node dot */}
        <div
          className={cn(
            "w-3 h-3 rounded-full border-2 mt-3 z-10 transition-all duration-300",
            visible
              ? "bg-rt-red border-rt-red shadow-[0_0_8px_2px_rgba(220,38,38,0.5)]"
              : "bg-rt-panel border-rt-border"
          )}
        />
        {/* Vertical spacer */}
        <div className="flex-1 w-px bg-transparent mt-1" />
      </div>

      {/* Card */}
      <div className="flex-1 pb-5 pt-1">
        <div
          className={cn(
            "rounded-xl border bg-rt-panel/70 backdrop-blur-sm p-3.5 transition-all duration-300",
            "group-hover:bg-rt-panel group-hover:border-rt-red/30 group-hover:shadow-[0_0_20px_0px_rgba(220,38,38,0.07)]",
            cfg.border
          )}
        >
          {/* Type badge */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border",
                cfg.color,
                cfg.border
              )}
            >
              <Icon size={8} />
              {cfg.label}
            </span>
            {entry.evidenceScore !== undefined && (
              <span className="flex items-center gap-1 text-[9px] text-rt-muted font-mono">
                <BarChart2 size={8} />
                {entry.evidenceScore}
              </span>
            )}
          </div>

          <h4 className="text-rt-white text-xs font-semibold leading-snug mb-1 group-hover:text-rt-red transition-colors">
            {entry.title}
          </h4>
          <p className="text-rt-muted text-[11px] leading-relaxed">
            {entry.summary}
          </p>
          {entry.source && (
            <p className="mt-2 text-[9px] text-rt-border font-mono tracking-wide truncate">
              ↳ {entry.source}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function InvestigationTimeline({ entries, investigationTitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineVisible, setLineVisible] = useState(false);

  // Measure container height for the line
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      setLineHeight(el.scrollHeight);
    });
    obs.observe(el);
    setLineHeight(el.scrollHeight);
    return () => obs.disconnect();
  }, [entries]);

  // Trigger line animation on scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setLineVisible(true);
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="rounded-2xl border border-rt-border bg-rt-bg/60 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-rt-border bg-rt-panel/50">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-4 h-px bg-rt-red" />
          <span className="text-[9px] font-semibold tracking-widest uppercase text-rt-red">
            The Thread
          </span>
        </div>
        <h3 className="text-rt-white text-sm font-bold leading-tight">
          Historical Timeline
        </h3>
        <p className="text-rt-muted text-[10px] mt-0.5 leading-relaxed">
          Key events in the evolution of this investigation
        </p>
      </div>

      {/* Timeline entries */}
      <div
        ref={containerRef}
        className="relative px-3 pt-4 pb-2"
      >
        {/* Glowing red vertical line */}
        <div
          className="absolute left-[60px] top-0 bottom-0 w-px overflow-hidden pointer-events-none"
          aria-hidden
        >
          <motion.div
            initial={{ scaleY: 0 }}
            animate={lineVisible ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0, height: "100%" }}
            className="w-full bg-gradient-to-b from-rt-red via-rt-red/60 to-transparent"
          />
          {/* Travelling signal pulse */}
          {lineVisible && (
            <motion.div
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
            />
          )}
        </div>

        {/* Entries */}
        <div className="space-y-0">
          {entries.map((entry, i) => (
            <TimelineNode key={i} entry={entry} index={i} />
          ))}
        </div>

        {/* End cap */}
        <div className="flex items-center gap-3 pl-[60px] pb-3 pt-1">
          <div className="w-2 h-2 rounded-full bg-rt-red/30 border border-rt-red/40 ml-1.5" />
          <span className="text-[9px] text-rt-border font-mono tracking-wider">
            END OF KNOWN RECORD
          </span>
        </div>
      </div>
    </div>
  );
}
