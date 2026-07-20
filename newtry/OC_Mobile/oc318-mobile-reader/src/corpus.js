import { fetchWithTimeout, mapPool } from "./corpusFetch.js";

const PALETTE = ["#5b7fa6", "#7a5ba6", "#a65b5b", "#5ba676", "#a6935b", "#6b8cae", "#8b6b9e"];

/** Parallel commentary fetches per seif (mechaber + N slugs); keep modest for slow networks / browser limits. */
const CORPUS_FETCH_CONCURRENCY = 8;

function dataKeyOf(s) {
  return s.dataKey || s.slug.replace(/-/g, "_");
}

/** Decode numeric character references so `&#8206;` etc. are not mistaken for visible letters. */
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

/** Plain text after tag strip, entity decode, and format-char removal (shared by empty / substance checks). */
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

/**
 * True when HTML has no visible text after stripping tags (handles placeholder `he.html` files).
 * Also treats the OC publish “no merged segments” English placeholder as empty so the UI
 * does not list a commentary that only carries that sentence.
 * Strips Unicode format characters (RLM, ZWSP, etc.) so markup cannot look “non-empty” while blank.
 */
function htmlIsVisuallyEmpty(html) {
  return normalizedPlainFromHtml(html).length === 0;
}

/** True when normalized text includes at least one letter or digit (any script). Drops punctuation-only noise. */
function htmlHasLetterOrDigit(html) {
  return /[\p{L}\p{N}]/u.test(normalizedPlainFromHtml(html));
}

function pruneBothEmptySegments(rows) {
  return rows.filter((r) => !(htmlIsVisuallyEmpty(r.hebrew) && htmlIsVisuallyEmpty(r.english)));
}

/** Drop segments with no real words/numbers on either side (stray markup / mis-merged blanks). */
function pruneNonSubstantiveSegments(rows) {
  return rows.filter((r) => htmlHasLetterOrDigit(r.hebrew) || htmlHasLetterOrDigit(r.english));
}

/** Whether a commentary note should appear for the current Hebrew / English toggles. */
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

/** Split exported commentary HTML into hook-sized chunks (segments joined with `<br>` in the bundle). */
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

/**
 * Pair Hebrew / English segment lists. If counts differ (translation lag), zip by index
 * and pad with empty string so layout still staggers per hook.
 */
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

/**
 * Fetch all manifest sources and build the shape expected by the mobile reader mock-up
 * (mechaber_rama + commentary arrays of { label, hebrew, english }).
 *
 * URLs are under the synced corpus (Sefaria Pulls `simanim/…/he.html` + `en.html`).
 * Hebrew comes from the bundle export; English is published into that same tree from OC001.
 */
export async function loadSeifCorpus(baseUrl, manifestDoc, fetchSignal) {
  /** Premapped visibility: false = omit commentary entirely (no fetch). Mechaber always loads. */
  // TEMP HIDE: Kaf HaChaim is hidden site-wide until its translation is complete
  // Kaf HaChaim revealed after dual-slug swap (canonical: kaf-hachayyim).
  const HIDDEN_SLUGS = new Set([]);
  const sources = (manifestDoc.sources || []).filter((s) => (s.slug === "mechaber" || s.includeInReader !== false) && !HIDDEN_SLUGS.has(s.slug));
  const seifNum = manifestDoc.seif ?? 1;

  const entries = await mapPool(sources, CORPUS_FETCH_CONCURRENCY, async (s) => {
    const b = `${baseUrl}/${encodeURIComponent(s.slug)}/`;
    const [hr, er] = await Promise.all([
      fetchWithTimeout(b + "he.html", fetchSignal),
      fetchWithTimeout(b + "en.html", fetchSignal),
    ]);
    if (!hr.ok) throw new Error(`${s.slug} he ${hr.status}`);
    // English may be an empty placeholder while translation is in progress.
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

/** Exported for `scripts/validate-corpus-empty-rules.mjs` and ad‑hoc checks. */
export { htmlIsVisuallyEmpty, htmlHasLetterOrDigit, splitHtmlByBrSegments, zipHeEnSegments };
