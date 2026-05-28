"use client";

import { useState, useEffect } from "react";

interface Props {
  wikiTitle: string;
  fallback: string;
}

export function WikiArticle({ wikiTitle, fallback }: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const params = new URLSearchParams({
          action: "parse",
          page: wikiTitle,
          prop: "text",
          redirects: "1",
          format: "json",
          formatversion: "2",
          origin: "*",
        });
        const res = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const raw: string | undefined = data?.parse?.text;
        if (!raw || cancelled) return;

        // Strip reference/appendix sections and everything after
        const SKIP = [
          "References", "Notes", "Citations", "Bibliography",
          "External links", "See also", "Further reading", "Footnotes", "Sources",
        ].map(s => s.replace(/\s/g, "\\s+")).join("|");
        const stripped = raw.replace(
          new RegExp(
            `<h2[^>]*>\\s*<span[^>]*>(?:${SKIP})</span>[\\s\\S]*`,
            "i"
          ),
          ""
        );
        if (!cancelled) setHtml(stripped);
      } catch {
        // fallback rendered below
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [wikiTitle]);

  if (loading) {
    return (
      <div className="mb-8 space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-4 bg-rt-panel/80 rounded animate-pulse" style={{ width: `${85 + (i % 3) * 5}%` }} />
        ))}
      </div>
    );
  }

  if (html) {
    return (
      <div
        className="wiki-content mb-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <p className="text-rt-white/90 text-base leading-relaxed mb-8">
      {fallback}
    </p>
  );
}
