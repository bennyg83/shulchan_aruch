/**
 * provenance-config.mjs — tree definitions, slug alias map, and pattern lists
 * for the read-only provenance scanner (provenance-scan.mjs).
 *
 * Nothing in here writes to disk.
 */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** oc318-mobile-reader/ */
export const READER_ROOT = path.resolve(__dirname, "..");
/** Repo root: Shulchan aruch/ */
export const REPO_ROOT = path.resolve(READER_ROOT, "..", "..", "..");
export const NEWTRY = path.join(REPO_ROOT, "newtry");
export const CORPUS_ROOT = path.join(READER_ROOT, "public", "corpus");
export const DIST_CORPUS_ROOT = path.join(READER_ROOT, "dist", "corpus");

/** All reports + hash cache live here; the scanner writes nowhere else. */
export const AUDIT_OUT_DIR = path.join(NEWTRY, "provenance-audit");

/**
 * Per-volume tree definitions.
 * authoritativeLayer: which layer is nominally the source of truth for
 * classification. Disagreements are still routed to the conflicts report
 * for per-block human review — never auto-resolved.
 */
export const VOLUMES = {
  oc1: {
    volume: "oc1",
    sourceRoot: path.join(NEWTRY, "OC_001", "output"),
    /** OC also has legacy slug-first dirs directly under output/ (siman 1 era). */
    hasLegacySlugDirs: true,
    blockLib: path.join(NEWTRY, "OC_001", "oc001_block_lib.mjs"),
    corpusDir: path.join(CORPUS_ROOT, "oc1"),
    distDir: path.join(DIST_CORPUS_ROOT, "oc1"),
    bundlesDir: path.join(CORPUS_ROOT, "oc1", "bundles"),
    authoritativeLayer: "source",
  },
  yd1: {
    volume: "yd1",
    sourceRoot: path.join(NEWTRY, "YD_001", "output"),
    hasLegacySlugDirs: false,
    blockLib: path.join(NEWTRY, "YD_001", "yd001_block_lib.mjs"),
    corpusDir: path.join(CORPUS_ROOT, "yd1"),
    distDir: path.join(DIST_CORPUS_ROOT, "yd1"),
    bundlesDir: path.join(CORPUS_ROOT, "yd1", "bundles"),
    /** Per plan: YD corpus is authoritative unless/until YD_001 output is validated. */
    authoritativeLayer: "corpus",
  },
  eh1: {
    volume: "eh1",
    sourceRoot: path.join(NEWTRY, "EH_001", "output"),
    hasLegacySlugDirs: false,
    blockLib: path.join(NEWTRY, "EH_001", "eh001_block_lib.mjs"),
    corpusDir: path.join(CORPUS_ROOT, "eh1"),
    distDir: path.join(DIST_CORPUS_ROOT, "eh1"),
    bundlesDir: path.join(CORPUS_ROOT, "eh1", "bundles"),
    authoritativeLayer: "source",
  },
  cm1: {
    volume: "cm1",
    sourceRoot: path.join(NEWTRY, "CM_001", "output"),
    hasLegacySlugDirs: false,
    blockLib: path.join(NEWTRY, "CM_001", "tools", "cm001_block_lib.mjs"),
    /** CM has no published corpus yet — source TXT is primary. */
    corpusDir: null,
    distDir: null,
    bundlesDir: null,
    authoritativeLayer: "source",
  },
};

/** Extra trees scanned best-effort as staged/sandbox consumers (all volumes). */
export const SANDBOX_ROOT = path.join(NEWTRY, "SA_Sandbox");
export const STAGED_LEGACY_ROOT = path.join(NEWTRY, "newtryoutput");

/**
 * Slug alias map — variants that must collapse to one canonical commentator
 * key so they are never reported as false conflicts. Keys and values are
 * post-normalization (lowercase, underscores already converted to hyphens).
 */
export const SLUG_ALIASES = {
  "kaf-hachayyim": "kaf-hachayim",
  "mishna-berurah": "mishnah-berurah",
  "shaarei-teshuva": "shaarei-teshuvah",
  "pitchei-teshuvah": "pitchei-teshuva",
  "baer-hetev": "baer-heitev",
};

/** Lowercase, trim, underscores→hyphens, then alias table. */
export function canonicalSlug(raw) {
  const s = String(raw ?? "").trim().toLowerCase().replace(/_/g, "-");
  return SLUG_ALIASES[s] || s;
}

/** Union of known garbage-MT phrases (from SA_Sandbox/scripts/scan.mjs + EH audit),
 *  plus generic MT calque tells: "the sign NN" (סימן), "a house and a house" (tefillin
 *  בתים calque), "went to Moshe of Sinai" (הלכה למשה מסיני calque).
 *
 *  Also flags NON-JEWISH RELIGIOUS terms that never legitimately appear in a Shulchan
 *  Aruch translation — an unambiguous MT-hallucination signal on its own (no need for a
 *  second occurrence). Christian + Islamic + other-faith markers. Deliberately EXCLUDES
 *  words that ARE legitimate here: "temple" (Beis HaMikdash), "priest" (kohen), "altar"
 *  (mizbeach), "sacrifice" (korban), "Messiah" (Mashiach), "cross", and "nun" (the
 *  Hebrew letter נ). */
export const GARBAGE_RE =
  /terrorist|heaven'?s people|\bkgb\b|\bisis\b|lord'?s prayer|starwork|star work|lycott|bible and the bible|the bible (?:says|wrote)|first dish|saturday\b|muktzeh.*allocat|magen avraham anglicized|m\.m\.m|d\.d\.d|her age\b|the craft\b|waker of the dawn|confession of the lord|lord enlightened|lord.*before his eyes.*yahweh|lord'?s (his )?name in vain|lord our god the lord is one.*meaning is hear|a jerusalemite\b|head of maha|chief there\b|gabi p\.|name in the column|you answered as old|always lb\b|in arabic yahar|heat in the east|see it in the west|3rd prayers of confession|hates israel, the lord our god, the lord is one|\br english\b|\bfurther further\b|\bmeaning meaning\b|\bthere is no is not\b|\bsafek demon\b|\bifwrote\b|\bnamed to\b|the sign \d+|between a house and a house|went to (?:moshe|moses) of sinai|\bchrist\b|\bchristian(?:ity)?\b|\bjesus\b|\bsperms?\b|\bchurch(?:es)?\b|\bcathedral\b|\bapostles?\b|\bpuritans?\b|\bchurchill\b|hashem[’']?s (?:word|people)|answer(?:ed|s)? an artist|\bthe bible\b|new testament|\bgospels?\b|\bcrucifix|\bbaptiz|\bbaptism\b|\bthe pope\b|\bvatican\b|\btrinity\b|qur[’']?an|\bkoran\b|\bmosques?\b|\bislam(?:ic)?\b|\ballah\b|\bmuhammad\b|\bmohamm[ae]d\b|\bramadan\b|\bimams?\b|\bminarets?\b|\bmecca\b|\bmuslims?\b|\bcaliph|\bbuddh|\bhindu|\bkrishna\b|\bshi[’']?ite\b|\bsaints?\b/i;

export const PLACEHOLDER_RE =
  /english translation pending|replace after editing this block|translation pending|\bTODO\b|\bPLACEHOLDER\b|\[translation\]|\bneeds translation\b|requires (?:a )?(?:fresh )?(?:human )?translation|(?:fresh|human) (?:human )?translation from the hebrew/i;

export const MOJIBAKE_RES = [/×[\x80-\xBF]/, /×[^\s]{1,2}×/, /�/, /Ã[\x80-\xBF]/];

/**
 * "Filler": a meta-DESCRIPTION of what a comment does, rather than a translation of
 * what it says. Models emit these when they won't/can't translate a terse block
 * (e.g. beur-hagra citation-strings). It reads as clean English and passes every
 * other gate, so it needs its own detector. Pair with the batch-level duplicate
 * check in detect-filler.mjs (identical new_en reused across blocks = filler).
 */
export const FILLER_RE =
  /this (?:comment|gloss|note|passage) (?:discusses|explains|brings|summar)|see the cited source(?:s)? for this|brings the relevant sugyos|together with the cited authorities|discusses the ruling in this seif|explains the practical law of .{0,40} in this seif|refer to the cited source|the source cited (?:here )?explains/i;

/**
 * Hebrew letter-name tokens that are legitimate inside English translations
 * (letter-shape citations like siman 32:32's למ"ד / כ"ף / נו"ן). A Hebrew run
 * is exempt when, after stripping punctuation/quotes, it equals one of these
 * or is shorter than MIN_HEBREW_RUN letters.
 */
export const HEBREW_LETTER_NAMES = new Set([
  "אלף", "בית", "גימל", "דלת", "הא", "וו", "ויו", "זין", "חית", "טית", "יוד",
  "כף", "למד", "מם", "נון", "סמך", "עין", "פא", "פה", "צדי", "צדיק", "קוף",
  "ריש", "שין", "תיו", "תו",
]);

/** Minimum Hebrew letters (punctuation stripped) for a run to count as leakage. */
export const MIN_HEBREW_RUN = 4;

// ── Gematria citation cross-check ──────────────────────────────────────
// Catches: MT reading a citation marker (ס'/סי'/סימן) as if it were part of
// the numeral itself, e.g. ס"ג (samech-gimel = 63) rendered as "siman 3" —
// the ס (60) silently dropped, leaving only the trailing digit.

const GEMATRIA_VALUES = {
  "א": 1, "ב": 2, "ג": 3, "ד": 4, "ה": 5, "ו": 6, "ז": 7, "ח": 8, "ט": 9,
  "י": 10, "כ": 20, "ך": 20, "ל": 30, "מ": 40, "ם": 40, "נ": 50, "ן": 50,
  "ס": 60, "ע": 70, "פ": 80, "ף": 80, "צ": 90, "ץ": 90,
  "ק": 100, "ר": 200, "ש": 300, "ת": 400,
};

/** Sum standard gematria values of a Hebrew numeral token (punctuation ignored). */
export function gematriaValue(token) {
  let sum = 0;
  for (const ch of token) {
    if (GEMATRIA_VALUES[ch] !== undefined) sum += GEMATRIA_VALUES[ch];
  }
  return sum;
}

/**
 * Hebrew markers that unambiguously introduce a siman citation number.
 * Deliberately excludes bare ס'/ס" — that abbreviation is too ambiguous
 * (sefer, se'if, or the tail of a Gemara daf citation like ברכות ס"ג =
 * "Berachos daf 63", nothing to do with siman) and produced heavy false
 * positives in testing. Only סימן (full word) and סי' (with the yud) are
 * reliable enough to cross-check.
 */
const CITATION_MARKER_RE = /(?:סימן|סי['׳])\s*([א-ת](?:['"׳״]?[א-ת])*)['"׳״]?/g;

/**
 * Extract cited numbers from Hebrew text: for every סימן/סי'/ס' marker,
 * convert the following Hebrew-numeral token via gematria.
 * Returns an array of integers (may contain duplicates, order preserved).
 */
export function extractHebrewCitationNumbers(heText) {
  const plain = stripTags(heText);
  const out = [];
  let m;
  const re = new RegExp(CITATION_MARKER_RE.source, "g");
  while ((m = re.exec(plain)) !== null) {
    const val = gematriaValue(m[1]);
    if (val > 0) out.push(val);
  }
  return out;
}

/**
 * Like extractHebrewCitationNumbers but returns the token strings too, so
 * callers can classify HOW a citation was corrupted (e.g. the ס"ג→"siman 3"
 * marker-swallow, where the leading letter's value is dropped).
 * Returns [{ token, value, lead, leadValue }].
 */
export function extractHebrewCitationTokens(heText) {
  const plain = stripTags(heText);
  const out = [];
  const re = new RegExp(CITATION_MARKER_RE.source, "g");
  let m;
  while ((m = re.exec(plain)) !== null) {
    const token = m[1];
    const value = gematriaValue(token);
    if (value > 0) {
      const lead = [...token].find((ch) => GEMATRIA_VALUES[ch] !== undefined) ?? "";
      out.push({ token, value, lead, leadValue: GEMATRIA_VALUES[lead] ?? 0 });
    }
  }
  return out;
}

/**
 * Extract siman numbers cited in English text. Covers the renderings seen
 * in this corpus: the word "siman", a bare section-mark "§184", or "no. N".
 */
export function extractEnglishCitationNumbers(enText) {
  const plain = stripTags(enText);
  const out = [];
  // "siman N", "seif N" (translators sometimes label a siman citation as
  // "seif"), "§N", "no. N", and compact "XX NNN:M" (e.g. "YD 121:4").
  // "siman"/"simanim" (plural), "seif", "§", "no.", or a compact "YD 121:4".
  const re = /(?:\bsiman(?:im)?\s+|\bseif\s+|§\s*|\bno\.\s*)(\d+)|\b(?:oc|yd|eh|cm)\s+(\d+):\d+/gi;
  let m;
  while ((m = re.exec(plain)) !== null) out.push(parseInt(m[1] ?? m[2], 10));
  return out;
}

/**
 * Compare Hebrew-cited siman numbers against English-cited siman numbers.
 * Returns { heCount, enCount, matched, mismatched: [heNumbers not found in en] }.
 * Multiset-tolerant (order/reordering not required), but every Hebrew value
 * must appear somewhere in the English citation list to count as matched.
 */
export function checkCitationNumbers(heText, enText) {
  const heNums = extractHebrewCitationNumbers(heText);
  const enNums = extractEnglishCitationNumbers(enText);
  if (heNums.length === 0) return { heCount: 0, enCount: enNums.length, mismatched: [] };
  const enPool = [...enNums];
  const mismatched = [];
  for (const n of heNums) {
    const idx = enPool.indexOf(n);
    if (idx >= 0) enPool.splice(idx, 1);
    else mismatched.push(n);
  }
  return { heCount: heNums.length, enCount: enNums.length, mismatched };
}

/**
 * Hard dirty-flag test: does the Hebrew cite a real (gershayim-marked) siman
 * numeral whose value appears NOWHERE in the English? True ⇒ the citation was
 * dropped/mangled and the block is garbage — the "trusted-authoritative garbage"
 * the soup/register gates miss.
 *
 * Gershayim gate (token must contain a quote ' " ׳ ״) drops the false positives
 * that plain gematria matching produces: bare single letters (א = "1") and
 * Hebrew words that happen to gematria-sum to a number (קללה = 165). Conservative
 * — fires only when NONE of the cited numerals is present in English, so a good
 * block that renders its citations correctly is never flagged.
 */
export function hasGershayimCitationOmission(heText, enText) {
  const tokens = extractHebrewCitationTokens(heText).filter((t) => /['"׳״]/.test(t.token));
  if (!tokens.length) return false;
  const enNums = extractEnglishCitationNumbers(enText);
  return !tokens.some((t) => enNums.includes(t.value));
}

/**
 * "Abbreviation soup" score: fraction of tokens that are raw initials, short
 * acronyms, vowelless consonant clusters, or apostrophe-terminated
 * transliterations ("MA Skib Dela Kash Ts... Meko'") — the signature of
 * unexpanded MT of rabbinic abbreviations. Calibrated: known-bad blocks score
 * 0.07–0.26, hand-fixed translations score 0.00. Threshold: SOUP_THRESHOLD.
 */
export const SOUP_THRESHOLD = 0.06;
/** 0.03–0.06 band: mixed garbage/good — flagged for review, not auto-rejected. */
export const SOUP_REVIEW_THRESHOLD = 0.03;
export function soupScore(plain) {
  const tokens = String(plain).split(/\s+/).filter(Boolean);
  if (tokens.length < 12) return 0;
  let bad = 0;
  for (const t of tokens) {
    const w = t.replace(/^[("'\[]+|[)"'\],.:;]+$/g, "");
    if (!w) continue;
    if (/^[A-Za-z]{1,2}\.$/.test(t)) { bad++; continue; }
    if (/^([A-Z]\.)+[A-Za-z]?\.?$/.test(w) && w.length >= 3) { bad++; continue; } // "N.B" "B.i" and chains "B.B.B.B.B" (not "e.g"/"i.e")
    if (/^[A-Z]{2,4}$/.test(w) && !["I", "A", "OK"].includes(w)) { bad++; continue; }
    if (/^[A-Za-z]+'$/.test(w) && w.length <= 6) { bad++; continue; }
    if (/^[A-Za-z]+$/.test(w) && w.length >= 2 && !/[aeiouAEIOU]/.test(w) && !["by", "my"].includes(w.toLowerCase())) { bad++; continue; }
  }
  return bad / tokens.length;
}

// ── Shared pure text helpers (used by provenance-scan.mjs and rebuild-clean-corpus.mjs) ──

export function stripTags(s) {
  return String(s ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function normText(s) {
  return stripTags(s).toLowerCase();
}

export function brSegs(html) {
  return String(html ?? "").split(/<br\s*\/?>/i).map((x) => x.trim()).filter(Boolean);
}

export function hebrewLetters(s) {
  return (String(s).match(/[֐-׿]/g) || []).length;
}

export function latinLetters(s) {
  return (String(s).match(/[A-Za-z]/g) || []).length;
}

export function hebrewRatio(s) {
  const he = hebrewLetters(s);
  const la = latinLetters(s);
  return he + la === 0 ? 0 : he / (he + la);
}

/** Hebrew runs that count as leakage: MIN_HEBREW_RUN+ Hebrew letters after
 *  stripping punctuation, excluding whitelisted letter names (למ"ד, כ"ף, נו"ן...). */
export function hebrewLeakRuns(plainText) {
  const runs = [...plainText.matchAll(/[֐-׿][֐-׿\s"'’.,:;()\-״׳]{1,}[֐-׿]|[֐-׿]{2,}/g)]
    .map((m) => m[0]);
  const out = [];
  for (const run of runs) {
    const letters = run.replace(/[^֐-׿]/g, "").replace(/[֑-ׇ]/g, "");
    if (letters.length < MIN_HEBREW_RUN) continue;
    if (HEBREW_LETTER_NAMES.has(letters)) continue;
    out.push(run.trim());
  }
  return out;
}

/**
 * Classify the heading structure of an en payload:
 *  - hebrew-only:   whole text is (near-)all Hebrew — untranslated copy
 *  - fused-heading: <b>Hebrew heading</b> then English in the same segment
 *  - split-heading: first <br/>-segment is Hebrew, rest is English
 *  - none
 * Returns { pattern, body } where body has the heading portion removed.
 */
export function detectHeading(en) {
  const whole = stripTags(en);
  if (hebrewLetters(whole) >= 10 && hebrewRatio(whole) >= 0.7) {
    return { pattern: "hebrew-only", body: en };
  }
  const segs = brSegs(en);
  const seg0 = segs[0] ?? "";
  const bold = seg0.match(/^\s*<b>([\s\S]*?)<\/b>/i);
  if (bold) {
    const inner = stripTags(bold[1]);
    if (hebrewLetters(inner) >= 4 && hebrewRatio(inner) >= 0.6) {
      const restOfSeg0 = seg0.replace(bold[0], "");
      if (latinLetters(stripTags(restOfSeg0)) >= 30) {
        return { pattern: "fused-heading", body: [restOfSeg0, ...segs.slice(1)].join("<br />") };
      }
      if (segs.length > 1 && latinLetters(stripTags(segs.slice(1).join(" "))) >= 30) {
        return { pattern: "split-heading", body: segs.slice(1).join("<br />") };
      }
    }
  }
  if (
    segs.length > 1 &&
    hebrewLetters(stripTags(seg0)) >= 10 &&
    hebrewRatio(stripTags(seg0)) >= 0.7 &&
    hebrewRatio(stripTags(segs.slice(1).join(" "))) < 0.3
  ) {
    return { pattern: "split-heading", body: segs.slice(1).join("<br />") };
  }
  return { pattern: "none", body: en };
}

// ── Orthodox register enforcement (shared by rebuild + retranslate driver) ──
/** Deterministic, unambiguous substitutions. */
export const REGISTER_MAP = [
  [/phylacter(?:ies|y)/gi, "tefillin"],
  [/\bPassover\b/g, "Pesach"],
  [/\bPsalms?\b/g, "Tehillim"],
  [/\b[Tt]he Sabbath\b/g, "Shabbos"],
  [/\bSabbath\b/g, "Shabbos"],
  [/\bOld Testaments?\b/gi, "Tanach"],
  // Project register spells the Name out; normalize the hyphenated form
  // (ASCII hyphen, non-breaking hyphen U+2011, figure dash) → "God".
  // \b before G, and the char after "d" is always non-word (space/hyphen/punct),
  // so "G-d-fearing" → "God-fearing" too.
  [/\bG[-‑‒]d\b/g, "God"],
];
/** Context-dependent — flagged for review, never auto-replaced. */
export const REGISTER_REVIEW = [/\bthe Lord\b/];

/**
 * Pure register + heading + leak processing of an English payload.
 * No disk writes, no shared mutable state — returns the processed text plus a
 * report so callers (rebuild-clean-corpus.mjs, retranslate-blocks.mjs) can do
 * their own logging. `slug` decides whether headings are stripped (mechaber).
 */
export function processEnglishPure(en, slug) {
  let out = String(en ?? "");
  const report = { headingPattern: "none", headingStripped: false, registerSubs: [], reviewHits: [], leaks: [] };
  const det = detectHeading(out);
  report.headingPattern = det.pattern;
  if (slug === "mechaber" && (det.pattern === "fused-heading" || det.pattern === "split-heading")) {
    out = det.body;
    report.headingStripped = true;
  }
  for (const [re, repl] of REGISTER_MAP) {
    const matches = out.match(re);
    if (matches) {
      out = out.replace(re, repl);
      report.registerSubs.push({ pattern: re.source, count: matches.length });
    }
  }
  const plain = stripTags(out);
  for (const re of REGISTER_REVIEW) {
    const m = plain.match(re);
    if (m) report.reviewHits.push({ pattern: re.source, sample: plain.slice(Math.max(0, m.index - 40), m.index + 60) });
  }
  report.leaks = hebrewLeakRuns(plain);
  return { en: out, report };
}

/**
 * Byte-stable replacement of specific blocks' ENGLISH bodies in a raw source
 * TXT. `replacements` is a Map(partIndex → newEnglish) where partIndex is the
 * 0-based ordinal of the block in file order (matches parseBlocksInFile order).
 * Every byte outside the replaced English bodies — Hebrew, headers, untouched
 * sibling blocks, blank lines — is preserved exactly.
 * `markers` = { englishHdr, blockEnd } from the volume's block lib.
 * Returns { text, replaced: number[] } (indices actually found & replaced).
 */
export function spliceEnglishSections(raw, markers, replacements) {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Line endings after ENGLISH_HDR and before BLOCK_END are FLEXIBLE: some
  // source blocks use a lone \r (old-Mac) or an empty body. Requiring a strict
  // "\n" made the regex skip those blocks and swallow the next, drifting every
  // later index. Accept \r\n | \r | \n; the one before BLOCK_END is optional.
  const nl = "(?:\\r\\n|\\r|\\n)";
  const re = new RegExp(`(${esc(markers.englishHdr)}${nl})([\\s\\S]*?)(${nl}?${esc(markers.blockEnd)})`, "g");
  const replaced = [];
  let idx = 0;
  const text = raw.replace(re, (m, _pre, _body, _post) => {
    const i = idx++;
    if (replacements.has(i)) {
      replaced.push(i);
      // Rewritten blocks get clean "ENGLISH\n<newEn>\nBLOCK_END" (also repairs a
      // lone-\r header). Untouched blocks return `m` unchanged (byte-stable).
      return `${markers.englishHdr}\n${String(replacements.get(i) ?? "")}\n${markers.blockEnd}`;
    }
    return m;
  });
  return { text, replaced };
}
