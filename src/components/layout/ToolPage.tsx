"use client";

import { motion } from "framer-motion";
import {
  GitBranch, Layers, Map, MessageSquareMore, HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_REGISTRY: Record<string, LucideIcon> = {
  GitBranch, Layers, Map, MessageSquareMore, HelpCircle,
};

interface ToolPageProps {
  title: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  children: React.ReactNode;
}

export function ToolPage({ title, subtitle, iconName, badge, children }: ToolPageProps) {
  const Icon = ICON_REGISTRY[iconName] ?? HelpCircle;
  return (
    <div className="min-h-screen bg-rt-bg">
      <div className="bg-rt-panel border-b border-rt-border px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-rt-red/10 border border-rt-red/20 rounded-lg flex items-center justify-center">
            <Icon size={20} className="text-rt-red" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-rt-white tracking-tight">{title}</h1>
              {badge && (
                <span className="text-[10px] font-semibold uppercase tracking-widest bg-rt-red/10 text-rt-red border border-rt-red/20 px-2 py-0.5 rounded">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-rt-muted text-sm mt-0.5">{subtitle}</p>
          </div>
        </motion.div>
      </div>
      <div className="px-10 py-10">{children}</div>
    </div>
  );
}

export function ComingSoonPlaceholder({
  label,
  description,
  iconName,
}: {
  label: string;
  description: string;
  iconName: string;
}) {
  const Icon = ICON_REGISTRY[iconName] ?? HelpCircle;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <div className="w-20 h-20 bg-rt-panel border border-rt-border rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Icon size={36} className="text-rt-red/40" />
      </div>
      <h2 className="text-rt-white font-bold text-xl mb-2">{label}</h2>
      <p className="text-rt-muted text-sm max-w-md leading-relaxed">{description}</p>
      <div className="mt-8 flex items-center gap-2 text-rt-muted text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-rt-red animate-pulse" />
        Coming in Phase 2
      </div>
    </motion.div>
  );
}
