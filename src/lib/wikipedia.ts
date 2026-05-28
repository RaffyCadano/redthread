// Wikipedia REST API client
// Docs: https://en.wikipedia.org/api/rest_v1/

const WIKI_BASE = "https://en.wikipedia.org/api/rest_v1";

// In-memory cache that survives Turbopack hot reloads (stored in global)
declare global {
  // eslint-disable-next-line no-var
  var _wikiCache: Map<string, { value: unknown; expires: number }> | undefined;
}
const memCache: Map<string, { value: unknown; expires: number }> =
  global._wikiCache ?? (global._wikiCache = new Map());

function memGet<T>(key: string): T | undefined {
  const entry = memCache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expires) { memCache.delete(key); return undefined; }
  return entry.value as T;
}

function memSet(key: string, value: unknown, ttlMs = 3_600_000) {
  memCache.set(key, { value, expires: Date.now() + ttlMs });
}

export interface WikiSummary {
  title: string;
  displaytitle: string;
  description?: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls: {
    desktop: { page: string };
  };
  pageid: number;
}

export interface WikiSearchResult {
  title: string;
  description?: string;
  thumbnail?: { url: string };
  key: string;
}

export interface WikiRelatedPage {
  title: string;
  description?: string;
  thumbnail?: { source: string; width: number; height: number };
  extract?: string;
  content_urls?: { desktop: { page: string } };
}

export async function getWikiSummary(title: string): Promise<WikiSummary | null> {
  const cacheKey = `summary:${title}`;
  const cached = memGet<WikiSummary | null>(cacheKey);
  if (cached !== undefined) return cached;
  try {
    const res = await fetch(
      `${WIKI_BASE}/page/summary/${encodeURIComponent(title)}`,
      {
        headers: { "Api-User-Agent": "RedThread/1.0 (https://redthread.app)" },
        cache: "no-store",
      }
    );
    if (!res.ok) { memSet(cacheKey, null, 60_000); return null; }
    const data: WikiSummary = await res.json();
    memSet(cacheKey, data);
    return data;
  } catch {
    return null;
  }
}

export async function getWikiRelated(title: string): Promise<WikiRelatedPage[]> {
  try {
    const res = await fetch(
      `${WIKI_BASE}/page/related/${encodeURIComponent(title)}`,
      {
        headers: { "Api-User-Agent": "RedThread/1.0 (https://redthread.app)" },
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.pages ?? []).slice(0, 8);
  } catch {
    return [];
  }
}

export async function searchWiki(query: string): Promise<WikiSearchResult[]> {
  try {
    const res = await fetch(
      `${WIKI_BASE}/page/search/${encodeURIComponent(query)}`,
      {
        headers: { "Api-User-Agent": "RedThread/1.0 (https://redthread.app)" },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.pages ?? []).slice(0, 10);
  } catch {
    return [];
  }
}
