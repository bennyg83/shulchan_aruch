/**
 * YD catalog search index — merged simanim (e.g. 169 → 168).
 * Also matches intelligent topic names (subtitle / subtitleHe / searchTerms).
 */

import { formatGematria, numberToGematriaLetters } from "./gematria.js";

/** @typedef {{ siman: number, title?: string, subtitle?: string, subtitleHe?: string, corpusPath: string, comment?: string, searchAliases?: number[], searchTerms?: string[] }} CatalogEntry */

const VOLUME_PLACEHOLDERS = new Set([
  "orach chayim",
  "yoreh de'ah",
  "even haezer",
  "choshen mishpat",
]);

export const SIMAN_SEARCH_PLACEHOLDER = "Search siman, topic, or גימטריה…";

export function isPlaceholderSubtitle(s) {
  const t = String(s || "").trim().toLowerCase();
  return !t || VOLUME_PLACEHOLDERS.has(t);
}

/** Hebrew index name for display (empty if not yet named). */
export function catalogIndexHe(entry) {
  return String(entry?.subtitleHe || "").trim();
}

/** English index name; volume-name placeholders do not count. */
export function catalogIndexEn(entry) {
  const s = String(entry?.subtitle || "").trim();
  if (isPlaceholderSubtitle(s)) return "";
  return s;
}

/** Primary/secondary lines for the siman selector row. */
export function simanIndexLines(entry) {
  const he = catalogIndexHe(entry);
  const en = catalogIndexEn(entry);
  return {
    he,
    en,
    primary: he || en || entry?.title || `Siman ${entry?.siman ?? ""}`,
    secondary: he && en ? en : "",
  };
}

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
  const sub = catalogIndexEn(entry).toLowerCase();
  const subHe = catalogIndexHe(entry).toLowerCase();
  const comment = (entry.comment || "").toLowerCase();
  const aliases = (entry.searchAliases || []).map(String);
  const terms = (entry.searchTerms || []).map((t) => String(t).toLowerCase());
  const gem = formatGematria(entry.siman);
  const gemBare = numberToGematriaLetters(entry.siman);
  return (
    n.includes(q) ||
    title.includes(q) ||
    sub.includes(q) ||
    subHe.includes(q) ||
    comment.includes(q) ||
    terms.some((t) => t.includes(q)) ||
    aliases.some((a) => a.includes(q)) ||
    aliases.some((a) => a.replace(/\u05F4/g, "").includes(qBare)) ||
    gem.includes(q) ||
    gemBare.includes(qBare)
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
