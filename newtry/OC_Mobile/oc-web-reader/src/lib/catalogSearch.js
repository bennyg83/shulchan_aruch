/**
 * YD catalog search index — merged simanim (e.g. 169 → 168).
 */

/** @typedef {{ siman: number, title?: string, subtitle?: string, corpusPath: string, comment?: string, searchAliases?: number[] }} CatalogEntry */

/**
 * @param {number | null | undefined} siman
 * @param {{ redirects?: Record<string, number> }} searchIndex
 */
export function resolveCatalogSiman(siman, searchIndex) {
  if (!Number.isFinite(siman)) return siman;
  const redirects = searchIndex?.redirects;
  if (!redirects) return siman;
  const key = String(siman);
  const target = redirects[key];
  return Number.isFinite(target) ? target : siman;
}

/**
 * @param {number} siman
 * @param {CatalogEntry[]} entries
 * @param {{ redirects?: Record<string, number> }} [searchIndex]
 */
export function findCatalogEntry(siman, entries, searchIndex) {
  const resolved = resolveCatalogSiman(siman, searchIndex);
  return entries.find((e) => Number(e.siman) === resolved) ?? null;
}

/**
 * @param {CatalogEntry} entry
 * @param {string} query
 */
export function catalogEntryMatchesQuery(entry, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const qBare = q.replace(/\u05F4/g, "").replace(/"/g, "");
  const n = String(entry.siman);
  const title = (entry.title || "").toLowerCase();
  const sub = (entry.subtitle || "").toLowerCase();
  const comment = (entry.comment || "").toLowerCase();
  const aliases = (entry.searchAliases || []).map(String);
  return (
    n.includes(q) ||
    title.includes(q) ||
    sub.includes(q) ||
    comment.includes(q) ||
    aliases.some((a) => a.includes(q)) ||
    aliases.some((a) => a.replace(/\u05F4/g, "").includes(qBare))
  );
}

export const YD_MERGED_SIMANIM = {
  168: {
    includes: [169],
    title: "Simanim 168–169",
    comment:
      "Standard Shulchan Aruch numbering: siman 169 (קסט) is merged into siman 168 (קסח–קסט, ribbis via a non-Jew). Content lives at siman 168 only.",
  },
};

export const YD_SEARCH_INDEX = {
  redirects: { "169": 168 },
  merged: [
    {
      canonical: 168,
      includes: [169],
      comment: YD_MERGED_SIMANIM[168].comment,
    },
  ],
};
