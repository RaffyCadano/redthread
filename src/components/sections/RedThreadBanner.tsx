"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function AnimatedThread({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke="#C1121F"
      strokeWidth="1"
      strokeOpacity="0.4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, delay, ease: "easeOut", repeat: Infinity, repeatType: "loop", repeatDelay: 3 }}
    />
  );
}

function GlowNode({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.g>
      <motion.circle
        cx={`${cx}%`}
        cy={`${cy}%`}
        r="3"
        fill="#C1121F"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.8] }}
        transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 4 }}
      />
      <motion.circle
        cx={`${cx}%`}
        cy={`${cy}%`}
        r="6"
        fill="none"
        stroke="#C1121F"
        strokeWidth="1"
        strokeOpacity="0.3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 2.5], opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.8, delay: delay + 0.3, repeat: Infinity, repeatDelay: 4 }}
      />
    </motion.g>
  );
}

const threads = [
  { x1: 10, y1: 30, x2: 30, y2: 60, delay: 0 },
  { x1: 30, y1: 60, x2: 55, y2: 40, delay: 0.4 },
  { x1: 55, y1: 40, x2: 75, y2: 70, delay: 0.8 },
  { x1: 75, y1: 70, x2: 90, y2: 35, delay: 1.2 },
  { x1: 20, y1: 20, x2: 55, y2: 40, delay: 0.6 },
  { x1: 55, y1: 40, x2: 80, y2: 20, delay: 1.0 },
];

const nodes = [
  { cx: 10, cy: 30, delay: 0.1 },
  { cx: 30, cy: 60, delay: 0.5 },
  { cx: 55, cy: 40, delay: 0.9 },
  { cx: 75, cy: 70, delay: 1.3 },
  { cx: 90, cy: 35, delay: 1.7 },
  { cx: 20, cy: 20, delay: 0.7 },
  { cx: 80, cy: 20, delay: 1.1 },
];

export function RedThreadBanner() {
  return (
    <section className="relative overflow-hidden bg-rt-panel border-y border-rt-border py-20">
      {/* SVG animated threads background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">
          {threads.map((t, i) => (
            <AnimatedThread key={i} {...t} />
          ))}
          {nodes.map((n, i) => (
            <GlowNode key={i} {...n} />
          ))}
        </g>
      </svg>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rt-panel via-rt-panel/60 to-rt-panel/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-rt-red" />
            <span className="text-rt-red text-xs font-semibold tracking-widest uppercase">
              The Truth Is Connected
            </span>
            <div className="w-12 h-px bg-rt-red" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-rt-white mb-4 tracking-tight">
            Every fact leads to another.
            <br />
            <span className="text-rt-red text-glow-red">Follow the thread.</span>
          </h2>

          <p className="text-rt-muted text-base max-w-lg mx-auto leading-relaxed">
            Our interactive evidence map connects events, people, organizations, and timelines
            across history. Discover the relationships that shape the narrative.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-rt-red/10 hover:bg-rt-red/20 text-rt-red border border-rt-red/40 hover:border-rt-red px-8 py-3.5 rounded-md font-semibold text-sm transition-all duration-200 glow-red-sm group"
        >
          Explore the Evidence Map
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-10 mt-12 pt-10 border-t border-rt-border w-full max-w-lg justify-center"
        >
          {[
            { value: "2,400+", label: "Investigations" },
            { value: "18,000+", label: "Source Links" },
            { value: "340+", label: "Connections Mapped" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-rt-red font-bold text-xl">{value}</p>
              <p className="text-rt-muted text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
