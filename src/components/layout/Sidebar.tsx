"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, TrendingUp, Clock, HelpCircle, Landmark, Building2,
  FlaskConical, Pyramid, Ghost, XCircle, GitBranch, Layers, Map,
  MessageSquareMore, Search, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchModal } from "./SearchModal";

const navSections = [
  { label: "For You",          href: "/",            icon: Sparkles },
  { label: "Trending",         href: "/trending",    icon: TrendingUp },
  { label: "Latest",           href: "/latest",      icon: Clock },
  { label: "Unexplained",      href: "/unexplained", icon: HelpCircle },
  { label: "Historical",       href: "/historical",  icon: Landmark },
  { label: "Government",       href: "/government",  icon: Building2 },
  { label: "Science",          href: "/science",     icon: FlaskConical },
  { label: "Ancient Mysteries",href: "/ancient",     icon: Pyramid },
  { label: "Urban Legends",    href: "/urban",       icon: Ghost },
  { label: "Debunked Myths",   href: "/debunked",    icon: XCircle },
];

const toolSections = [
  { label: "Timeline",         href: "/tools/timeline",      icon: GitBranch },
  { label: "Compare Sources",  href: "/tools/compare",       icon: Layers },
  { label: "Evidence Map",     href: "/tools/evidence-map",  icon: Map },
  { label: "Community Notes",  href: "/tools/community",     icon: MessageSquareMore },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const close = () => setMobileOpen(false);

  // Cmd/Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navContent = (
    <>
      {/* Logo */}
      <Link href="/" onClick={close} className="flex items-center gap-3 px-5 py-5 border-b border-rt-border group">
        <div className="relative">
          <img src="/logo.png" alt="RedThread" className="w-8 h-8 rounded-sm object-contain" />
        </div>
        <div>
          <span className="text-rt-white font-bold text-lg tracking-tight">RedThread</span>
          <p className="text-rt-muted text-[10px] tracking-widest uppercase">Follow the Connections</p>
        </div>
      </Link>

      {/* Search */}
      <div className="px-4 py-3 border-b border-rt-border">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-2 bg-rt-surface rounded-md px-3 py-2 text-rt-muted hover:border-rt-red/50 border border-rt-border transition-colors cursor-pointer group"
        >
          <Search size={14} className="group-hover:text-rt-red transition-colors" />
          <span className="text-xs">Search investigations…</span>
          <span className="ml-auto text-[10px] font-mono text-rt-border">⌘K</span>
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-4">
        <div className="px-4 mb-2">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-rt-muted">Explore</span>
        </div>
        <ul className="space-y-0.5 px-2">
          {navSections.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link href={href} onClick={close}>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 group",
                      active
                        ? "bg-rt-red/15 text-rt-red border border-rt-red/30"
                        : "text-rt-muted hover:text-rt-white hover:bg-rt-surface"
                    )}
                  >
                    <Icon size={15} className={cn("shrink-0 transition-colors", active ? "text-rt-red" : "group-hover:text-rt-red")} />
                    <span>{label}</span>
                    {active && <motion.div layoutId="activePill" className="ml-auto w-1.5 h-1.5 rounded-full bg-rt-red" />}
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Tools */}
        <div className="px-4 mt-6 mb-2">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-rt-muted">Tools</span>
        </div>
        <ul className="space-y-0.5 px-2">
          {toolSections.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link href={href} onClick={close}>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 group",
                      active
                        ? "bg-rt-red/15 text-rt-red border border-rt-red/30"
                        : "text-rt-muted hover:text-rt-white hover:bg-rt-surface"
                    )}
                  >
                    <Icon size={15} className={cn("shrink-0 transition-colors", active ? "text-rt-red" : "group-hover:text-rt-red")} />
                    <span>{label}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-rt-border px-5 py-4">
        <p className="text-[10px] text-rt-muted leading-relaxed">
          Sources matter. Think critically.
          <br />
          <span className="text-rt-red/70">Evidence-focused research.</span>
        </p>
      </div>
    </>
  );

  return (
    <>      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />      {/* ── Mobile top bar ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-rt-panel border-b border-rt-border z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="RedThread" className="w-7 h-7 rounded-sm object-contain" />
          <span className="text-rt-white font-bold text-base tracking-tight">RedThread</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-rt-muted hover:text-rt-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Desktop sidebar (always visible) ───────────────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-rt-panel border-r border-rt-border z-50 flex-col overflow-y-auto">
        {navContent}
      </aside>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/70 z-40"
              onClick={close}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="lg:hidden fixed left-0 top-0 h-full w-72 bg-rt-panel border-r border-rt-border z-50 flex flex-col overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 p-1.5 text-rt-muted hover:text-rt-white transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
