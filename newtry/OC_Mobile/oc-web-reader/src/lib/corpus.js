/** Shared with oc318-mobile-reader — keep in sync when corpus loading changes. */
import { fetchWithTimeout, mapPool } from "./corpusFetch.js";

const PALETTE = ["#5b7fa6", "#7a5ba6", "#a65b5b", "#5ba676", "#a6935b", "#6b8cae", "#8b6b9e"];
const CORPUS_FETCH_CONCURRENCY = 8;

function dataKeyOf(s) {
  return s.dataKey || s.slug.replace(/-/g, "_");
}

function decodeNumericHtmlEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => {
      const cp = parseInt(hex, 16);
      if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) return "";
      try {
        return String.fromCodePoint(cp);
      } catch {
        return "";
      }
    })
    .replace(/&#(\d+);/g, (_, dec) => {
      const cp = parseInt(dec, 10);
      if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) return "";
      try {
        return String.fromCodePoint(cp);
      } catch {
        return "";
      }
    });
}

function normalizedPlainFromHtml(html) {
  if (html == null || typeof html !== "string") return "";
  let spaced = html.replace(/<[^>]+>/g, " ");
  spaced = decodeNumericHtmlEntities(spaced);
  spaced = spaced.replace(/&nbsp;|&#160;/gi, " ");
  spaced = spaced.replace(/\p{Cf}/gu, " ");
  spaced = spaced.replace(/\s+/g, " ").trim();
  if (spaced.toLowerCase().startsWith("no commentary text was included in this merged excerpt")) return "";
  return spaced;
}

function htmlIsVisuallyEmpty(html) {
  return normalizedPlainFromHtml(html).length === 0;
}

function htmlHasLetterOrDigit(html) {
  return /[\p{L}\p{N}]/u.test(normalizedPlainFromHtml(html));
}

function pruneBothEmptySegments(rows) {
  return rows.filter((r) => !(htmlIsVisuallyEmpty(r.hebrew) && htmlIsVisuallyEmpty(r.english)));
}

function pruneNonSubstantiveSegments(rows) {
  return rows.filter((r) => htmlHasLetterOrDigit(r.hebrew) || htmlHasLetterOrDigit(r.english));
}

export function noteVisibleForLanguages(showHebrew, showEnglish, note) {
  const hasHe = htmlHasLetterOrDigit(note.hebrew);
  const hasEn = htmlHasLetterOrDigit(note.english);
  if (!showHebrew && !showEnglish) return false;
  if (showHebrew && showEnglish) return hasHe || hasEn;
  if (showHebrew) return hasHe;
  return hasEn;
}

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [html.trim()].filter(Boolean);
}

function extractSegmentLabel(html) {
  if (!html) return "";
  const mBold = html.match(/<b>\s*([^<]{1,80}?)\s*<\/b>/i);
  if (mBold) return mBold[1].replace(/\s+/g, " ").trim();
  const mParen = html.match(/^\s*\(([^)]{1,40})\)/);
  if (mParen) return `(${mParen[1].trim()})`;
  return "";
}

function zipHeEnSegments(heRaw, enRaw) {
  const heParts = splitHtmlByBrSegments(heRaw);
  const enParts = splitHtmlByBrSegments(enRaw);
  if (heParts.length <= 1 && enParts.length <= 1) {
    const he = String(heParts[0] ?? heRaw ?? "").trim();
    const en = String(enParts[0] ?? enRaw ?? "").trim();
    if (htmlIsVisuallyEmpty(he) && htmlIsVisuallyEmpty(en)) return [];
    return pruneNonSubstantiveSegments(
      pruneBothEmptySegments([{ label: extractSegmentLabel(he || en || heRaw || enRaw), hebrew: he, english: en }])
    );
  }
  const n = Math.max(heParts.length, enParts.length);
  const out = [];
  for (let i = 0; i < n; i++) {
    const he = heParts[i] ?? "";
    const en = enParts[i] ?? "";
    if (htmlIsVisuallyEmpty(he) && htmlIsVisuallyEmpty(en)) continue;
    const label = extractSegmentLabel(he || en);
    out.push({ label, hebrew: he, english: en });
  }
  if (out.length > 0) return pruneNonSubstantiveSegments(pruneBothEmptySegments(out));
  if (htmlIsVisuallyEmpty(heRaw) && htmlIsVisuallyEmpty(enRaw)) return [];
  return pruneNonSubstantiveSegments(
    pruneBothEmptySegments([
      { label: extractSegmentLabel(heRaw || enRaw), hebrew: String(heRaw ?? "").trim(), english: String(enRaw ?? "").trim() },
    ])
  );
}

export async function loadSeifCorpus(baseUrl, manifestDoc, fetchSignal) {
  const sources = (manifestDoc.sources || []).filter((s) => s.slug === "mechaber" || s.includeInReader !== false);
  const seifNum = manifestDoc.seif ?? 1;

  const entries = await mapPool(sources, CORPUS_FETCH_CONCURRENCY, async (s) => {
    const b = `${baseUrl}/${encodeURIComponent(s.slug)}/`;
    const [hr, er] = await Promise.all([
      fetchWithTimeout(b + "he.html", fetchSignal),
      fetchWithTimeout(b + "en.html", fetchSignal),
    ]);
    if (!hr.ok) throw new Error(`${s.slug} he ${hr.status}`);
    const [heRaw, enRaw] = await Promise.all([hr.text(), er.ok ? er.text() : Promise.resolve("")]);
    const he = String(heRaw ?? "").replace(/^\uFEFF/, "").trim();
    const en = String(enRaw ?? "").replace(/^\uFEFF/, "").trim();
    return { ...s, he, en };
  });

  const mechaber = entries.find((e) => e.slug === "mechaber");
  const commentary = entries.filter((e) => e.slug !== "mechaber");

  const seifData = {
    seif: seifNum,
    mechaber_rama: {
      hebrew: mechaber?.he ?? "",
      english: mechaber?.en ?? "",
    },
  };

  const segsBySlug = new Map(commentary.map((c) => [c.slug, zipHeEnSegments(c.he, c.en)]));
  const commentaryWithContent = commentary.filter((c) => (segsBySlug.get(c.slug) ?? []).length > 0);

  const commentators = commentaryWithContent.map((c, i) => ({
    key: dataKeyOf(c),
    label: c.title,
    color: PALETTE[i % PALETTE.length],
  }));

  for (const c of commentaryWithContent) {
    const k = dataKeyOf(c);
    seifData[k] = segsBySlug.get(c.slug) ?? [];
  }

  return { seifData, commentators };
}
