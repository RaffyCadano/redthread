"use client";

import { motion } from "framer-motion";
import { Shield, BookOpen, Users, Lightbulb, ExternalLink } from "lucide-react";
import Link from "next/link";

const trustPillars = [
  {
    icon: BookOpen,
    title: "Sources Matter",
    description: "Every claim is traceable to its original source. We cite Wikipedia, academic papers, and declassified documents.",
  },
  {
    icon: Shield,
    title: "Transparency First",
    description: "Evidence scores are calculated from source quality, corroboration, and expert consensus — fully documented.",
  },
  {
    icon: Lightbulb,
    title: "Think Critically",
    description: "We present multiple perspectives without promoting a single narrative. Draw your own conclusions.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Community notes allow verified researchers to add context, corrections, and additional sources.",
  },
];

const footerLinks = {
  Explore: ["For You", "Trending", "Latest", "Unexplained", "Historical"],
  Tools: ["Timeline", "Evidence Map", "Compare Sources", "Community Notes"],
  About: ["Our Mission", "How Scores Work", "Source Policy", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="bg-rt-panel border-t border-rt-border">
      {/* Trust section */}
      <div className="px-10 py-16 border-b border-rt-border">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 h-px bg-rt-red" />
            <span className="text-rt-red text-xs font-semibold tracking-widest uppercase">Our Commitment</span>
            <span className="w-8 h-px bg-rt-red" />
          </div>
          <h2 className="text-2xl font-bold text-rt-white">
            Evidence-focused. Transparent. Educational.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 bg-rt-red/10 border border-rt-red/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-rt-red" />
                </div>
                <h3 className="text-rt-white font-semibold text-sm mb-1">{pillar.title}</h3>
                <p className="text-rt-muted text-xs leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Links section */}
      <div className="px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 bg-rt-red rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">RT</span>
              </div>
              <span className="text-rt-white font-bold text-base">RedThread</span>
            </Link>
            <p className="text-rt-muted text-xs leading-relaxed mb-4">
              A cinematic mystery investigation platform powered by real historical information.
            </p>
            <p className="text-rt-muted text-[10px] italic">
              &ldquo;Follow the connections.&rdquo;
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-rt-white font-semibold text-xs uppercase tracking-widest mb-3">
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-rt-muted hover:text-rt-red text-xs transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-10 py-5 border-t border-rt-border flex items-center justify-between flex-wrap gap-3">
        <p className="text-rt-muted text-xs">
          © 2026 RedThread. Content sourced from Wikipedia under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rt-red hover:underline inline-flex items-center gap-0.5"
          >
            CC BY-SA 4.0 <ExternalLink size={10} />
          </a>
        </p>
        <p className="text-rt-muted text-xs">
          For educational and research purposes only. Not intended to promote conspiracy theories.
        </p>
      </div>
    </footer>
  );
}
