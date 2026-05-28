"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getCategoryColor, type Investigation } from "@/lib/investigations";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: string;
}

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  return (
    <section className="px-10 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-px bg-rt-red" />
          <span className="text-rt-red text-xs font-semibold tracking-widest uppercase">
            Timeline
          </span>
        </div>
        <h2 className="text-3xl font-bold text-rt-white tracking-tight">
          History of the Unexplained
        </h2>
        <p className="text-rt-muted text-sm mt-2">
          Key events across history that changed how we understand the unknown.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ originY: 0 }}
          className="absolute left-[calc(6rem+1px)] top-0 bottom-0 w-px bg-gradient-to-b from-rt-red via-rt-border to-transparent"
        />

        <div className="space-y-0">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex items-start gap-0 group"
            >
              {/* Year label */}
              <div className="w-24 shrink-0 pt-4 pr-4 text-right">
                <span className="text-rt-red font-mono text-xs font-bold tracking-wider">
                  {event.year}
                </span>
              </div>

              {/* Node */}
              <div className="relative shrink-0 flex flex-col items-center pt-4">
                <motion.div
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  className="w-3 h-3 rounded-full bg-rt-red border-2 border-rt-panel z-10 group-hover:glow-red-sm transition-all"
                />
                {/* Connector to content */}
                <div className="flex-1 w-px bg-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 pl-6 pb-10 pt-2">
                <div
                  className="bg-rt-panel border border-rt-border hover:border-rt-red/30 rounded-xl p-4 cursor-pointer transition-all duration-200 group-hover:bg-rt-surface"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded border",
                        getCategoryColor(event.category)
                      )}
                    >
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-rt-white font-semibold text-sm mb-1 group-hover:text-rt-red transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-rt-muted text-xs leading-relaxed">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
