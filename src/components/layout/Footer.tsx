import Link from "next/link";
import { Eye, Building2, HelpCircle, Pyramid, Landmark, FlaskConical, Ghost, XCircle,  } from "lucide-react";

const categoryLinks = [
  { label: "UFO",               href: "/ufo",         icon: Eye },
  { label: "Government",        href: "/government",  icon: Building2 },
  { label: "Unexplained",       href: "/unexplained", icon: HelpCircle },
  { label: "Ancient Mysteries", href: "/ancient",     icon: Pyramid },
  { label: "Historical",        href: "/historical",  icon: Landmark },
  { label: "Science",           href: "/science",     icon: FlaskConical },
  { label: "Urban Legends",     href: "/urban",       icon: Ghost },
  { label: "Debunked",          href: "/debunked",    icon: XCircle },
];

const exploreLinks = [
  { label: "For You",     href: "/" },
  { label: "Trending",    href: "/trending" },
  { label: "Latest",      href: "/latest" },
];

const toolLinks = [
  { label: "Timeline",        href: "/tools/timeline" },
  { label: "Compare Sources", href: "/tools/compare" },
  { label: "Evidence Map",    href: "/tools/evidence-map" },
  { label: "Community Notes", href: "/tools/community" },
];

export function Footer() {
  return (
    <footer className="border-t border-rt-border bg-rt-panel/60 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3 group w-fit">
              <img src="/logo.png" alt="RedThread" className="w-7 h-7 rounded-sm object-contain" />
              <span className="text-rt-white font-bold text-base tracking-tight group-hover:text-rt-red transition-colors">RedThread</span>
            </Link>
            <p className="text-rt-muted text-xs leading-relaxed max-w-xs">
              A cinematic investigation platform. Follow every thread, weigh every claim, and draw your own conclusions.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rt-muted hover:text-rt-white transition-colors"
                aria-label="GitHub"
              >
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rt-muted hover:text-rt-white transition-colors"
                aria-label="Twitter / X"
              >
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-rt-muted mb-3">Explore</h3>
            <ul className="space-y-2">
              {exploreLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-rt-muted hover:text-rt-white text-xs transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-rt-muted mb-3">Categories</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {categoryLinks.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-1.5 text-rt-muted hover:text-rt-white text-xs transition-colors group">
                    <Icon size={11} className="shrink-0 group-hover:text-rt-red transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-rt-muted mb-3">Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-rt-muted hover:text-rt-white text-xs transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-rt-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-rt-border text-[11px] font-mono">
            © {new Date().getFullYear()} RedThread. All investigations are based on public records and documented sources.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rt-red animate-pulse" />
            <span className="text-[10px] text-rt-muted font-mono tracking-wider">FOLLOW THE CONNECTIONS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
