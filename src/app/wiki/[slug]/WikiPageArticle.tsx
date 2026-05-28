"use client";

import { useState, useEffect } from "react";

interface Props {
  wikiTitle: string;
}

export function WikiPageArticle({ wikiTitle }: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

        // Rewrite internal wiki links to stay on-site
        const rewritten = raw
          .replace(
            /href="\/wiki\/([^"]+)"/g,
            'href="/wiki/$1"'
          )
          .replace(/href="\/w\/[^"]*"/g, '#');

        // Strip reference/appendix sections
        const SKIP = [
          "References", "Notes", "Citations", "Bibliography",
          "External links", "See also", "Further reading", "Footnotes", "Sources",
        ].map(s => s.replace(/\s/g, "\\s+")).join("|");
        const stripped = rewritten.replace(
          new RegExp(`<h2[^>]*>\\s*<span[^>]*>(?:${SKIP})</span>[\\s\\S]*`, "i"),
          ""
        );

        if (!cancelled) setHtml(stripped);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [wikiTitle]);

  if (loading) {
    return (
      <div className="space-y-3 py-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-4 bg-rt-panel/80 rounded animate-pulse" style={{ width: `${80 + (i % 4) * 5}%` }} />
        ))}
      </div>
    );
  }

  if (error || !html) {
    return (
      <p className="text-rt-muted text-sm py-4">
        Could not load Wikipedia article for <span className="text-rt-white">{wikiTitle}</span>.
      </p>
    );
  }

  return (
    <div
      className="wiki-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
