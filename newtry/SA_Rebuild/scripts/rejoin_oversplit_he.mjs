/**
 * Re-join over-split HE when live EN is a single segment.
 *
 * Mirror of rejoin_oversplit_en.mjs. Never writes en.html.
 *
 * Modes:
 *   (default Case A) — upstream HE single-seg ≈ normalize(join(live HE))
 *   --case-a-prime   — join when extra HE segs are heading/stubs only (no
 *                      upstream single-seg requirement). Prefer heSegs===2
 *                      (title+body); heSegs>2 only if every pre-last seg is stub.
 *
 * Classification (all en_truncated_vs_multi_he + he_has_more_segments):
 *   A_eligible / A_prime_eligible — auto rejoin candidates
 *   B_candidate — true multi-note HE; Part 2 EN split
 *   C_remap    — orphan / wrong seif / upstream missing or content mismatch
 *   skip       — unclear / hard-gate fail for auto
 *
 * Case A′ hard gates (ALL must hold):
 *   1. kind en_truncated_vs_multi_he OR he_has_more_segments
 *   2. enSegs === 1, heSegs >= 2
 *   3. EN non-empty; HE non-empty with Hebrew
 *   4. First HE seg (and every pre-last when heSegs>2) is heading/stub
 *   5. Last HE seg is substantive body
 *   6. After join, HE non-empty and 1 segment
 *
 *   node rejoin_oversplit_he.mjs --dry-run --volumes oc1,yd1,cm1
 *   node rejoin_oversplit_he.mjs --case-a-prime --dry-run --volumes oc1,yd1,cm1
 *   node rejoin_oversplit_he.mjs --case-a-prime --apply --volumes oc1,yd1,cm1
 *
 * After --apply: rebundle affected simanim only (BUNDLE_CONCURRENCY=1).
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import {
  LAYER_KEY_TO_SLUG as OC_LAYER_TO_SLUG,
  slugFromLayerKey as ocSlugFromLayerKey,
} from "../../lib/orach_chayim_layer_slug.mjs";
import {
  LAYER_KEY_TO_SLUG as YD_LAYER_TO_SLUG,
  slugFromLayerKey as ydSlugFromLayerKey,
} from "../../lib/yoreh_deah_layer_slug.mjs";
import {
  LAYER_KEY_TO_SLUG as EH_LAYER_TO_SLUG,
  slugFromLayerKey as ehSlugFromLayerKey,
} from "../../lib/even_ha_ezer_layer_slug.mjs";
import {
  LAYER_KEY_TO_SLUG as CM_LAYER_TO_SLUG,
  slugFromLayerKey as cmSlugFromLayerKey,
} from "../../lib/choshen_mishpat_layer_slug.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../..");
const CORPUS_ROOT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const SEFARIA_ROOT = path.join(REPO, "Sefaria Pulls/shulchan-arukh");
const OUT_DIR = path.join(
  REPO,
  "newtry/SA_Rebuild/audit/he_en_segment_mismatch"
);

const VOLUME_CFG = {
  oc1: {
    sefariaFolder: "Orach_Chayim",
    hasSimanim: true,
    layerToSlug: OC_LAYER_TO_SLUG,
    slugFromLayerKey: ocSlugFromLayerKey,
  },
  yd1: {
    sefariaFolder: "Yoreh_Deah",
    hasSimanim: false,
    layerToSlug: YD_LAYER_TO_SLUG,
    slugFromLayerKey: ydSlugFromLayerKey,
  },
  eh1: {
    sefariaFolder: "Even_HaEzer",
    hasSimanim: false,
    layerToSlug: EH_LAYER_TO_SLUG,
    slugFromLayerKey: ehSlugFromLayerKey,
  },
  cm1: {
    sefariaFolder: "Choshen_Mishpat",
    hasSimanim: false,
    layerToSlug: CM_LAYER_TO_SLUG,
    slugFromLayerKey: cmSlugFromLayerKey,
  },
};

function parseArgs(argv) {
  const out = {
    apply: false,
    caseAPrime: false,
    volumes: ["oc1", "yd1", "cm1"],
    slug: null,
    maxFixes: Infinity,
    maxSimanim: null,
    corpusRoot: CORPUS_ROOT,
    sampleLimit: 30,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--apply") out.apply = true;
    else if (a === "--dry-run") out.apply = false;
    else if (a === "--case-a-prime") out.caseAPrime = true;
    else if (a === "--volume") out.volumes = [next()];
    else if (a === "--volumes")
      out.volumes = next()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--slug") out.slug = next();
    else if (a === "--max-fixes") out.maxFixes = parseInt(next(), 10);
    else if (a === "--max-simanim") out.maxSimanim = parseInt(next(), 10);
    else if (a === "--corpus-root") out.corpusRoot = path.resolve(next());
    else if (a === "--sample-limit") out.sampleLimit = parseInt(next(), 10);
    else if (a === "--help" || a === "-h") {
      console.log(`Re-join over-split HE when EN is single-segment.

  --dry-run (default) | --apply
  --case-a-prime       heading/stub + body join (no upstream single-seg req)
  --volume oc1 | --volumes oc1,yd1,cm1
  --slug <slug>  --max-fixes N  --max-simanim N
  --corpus-root <dir>`);
      process.exit(0);
    }
  }
  return out;
}

function pad(n, w = 3) {
  return String(n).padStart(w, "0");
}

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

/** Same split as oc-web-reader zipHeEnSegments. */
function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

function readText(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return "";
  }
}

function visuallyEmpty(html) {
  const t = String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t.length === 0;
}

function hasHebrewLetters(s) {
  return /[\u0590-\u05FF]/.test(s || "");
}

/** Visible text length after stripping tags. */
function visibleText(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Classify a HE segment as a Case A′ heading/stub subtype.
 * Returns null if not a heading/stub.
 *
 * Buckets (mutually exclusive, checked in order):
 *   title_singular_seif — siman title with singular סעיף (final ף), e.g. ובו סעיף אחד
 *   title_plural_seifim — siman title with plural סעיפים, e.g. ובו ו סעיפים
 *   shem_stub           — שם: / (שם) / short …שם:
 *   other_stub          — label-only / very short stub (held)
 *
 * Built from codepoints so pe (פ) vs final-pe (ף) are never normalized away.
 */
function classifyHeadingStub(seg) {
  const v = visibleText(seg);
  if (!v || !hasHebrewLetters(v)) return null;

  const ubo = String.fromCodePoint(0x05d5, 0x05d1, 0x05d5); // ובו
  // Singular: סעיף (ends with final pe ף U+05E3)
  const seifSingular = String.fromCodePoint(0x05e1, 0x05e2, 0x05d9, 0x05e3);
  // Plural: סעיפים (regular pe פ U+05E4 + י + ם)
  const seifimPlural = String.fromCodePoint(
    0x05e1,
    0x05e2,
    0x05d9,
    0x05e4,
    0x05d9,
    0x05dd
  );
  // Stem סעיפ (regular pe) — only used to detect odd spellings
  const seifStemPe = String.fromCodePoint(0x05e1, 0x05e2, 0x05d9, 0x05e4);

  if (v.includes(ubo) && v.length <= 140) {
    if (v.includes(seifimPlural)) {
      return {
        bucket: "title_plural_seifim",
        preview: v.slice(0, 100),
      };
    }
    if (v.includes(seifSingular)) {
      return {
        bucket: "title_singular_seif",
        preview: v.slice(0, 100),
      };
    }
    // Odd spelling: סעיף written with non-final pe and NOT followed by ים
    if (v.includes(seifStemPe) && !v.includes(seifimPlural)) {
      return {
        bucket: "title_singular_seif",
        preview: v.slice(0, 100),
        note: "seif_stem_pe_without_im",
      };
    }
  }

  const shem = String.fromCodePoint(0x05e9, 0x05dd); // שם
  if (new RegExp(`^[\\(\\[]?\\s*${shem}\\s*[\\)\\]]?\\s*[:.]?\\s*$`).test(v)) {
    return { bucket: "shem_stub", preview: v };
  }
  if (v.startsWith(shem) && v.length <= 20) {
    const after = v.slice(shem.length).trim();
    if (after === "" || /^[:.]\s*$/.test(after)) {
      return { bucket: "shem_stub", preview: v };
    }
  }
  if (v.length <= 20 && v.endsWith(":") && v.includes(shem)) {
    return { bucket: "shem_stub", preview: v };
  }

  // Label-only: ס"ק …, אות א, (א), א)
  if (v.length <= 24) {
    if (/^ס["\u05f4\u05f3׳״]?ק\b/u.test(v)) {
      return { bucket: "other_stub", preview: v, subtype: "seif_katan_label" };
    }
    if (/^אות\s+[א-ת]\s*[:.]?\s*$/u.test(v)) {
      return { bucket: "other_stub", preview: v, subtype: "ot_label" };
    }
    if (/^[\(\[]?\s*[א-ת]\s*[\)\]]?\s*[:.]?\s*$/u.test(v)) {
      return { bucket: "other_stub", preview: v, subtype: "letter_label" };
    }
  }

  // Very short generic label ending with : or . (≤20 visible chars)
  if (v.length <= 20 && /[:.]\s*$/.test(v) && !/\s.{12,}\s/.test(v)) {
    return { bucket: "other_stub", preview: v, subtype: "short_colon_stub" };
  }

  return null;
}

/** @deprecated use classifyHeadingStub */
function isHeadingOrStubSegment(seg) {
  return classifyHeadingStub(seg) != null;
}

/**
 * Case A′ classification for HE parts.
 * ok=true only when every pre-last seg is a heading/stub and body is substantive.
 * autoApply=true for singular/plural seif titles and שם stubs;
 * other_stub alone remains held (lower precision).
 */
function classifyCaseAPrime(heParts) {
  if (!heParts || heParts.length < 2) {
    return { ok: false, reason: "he_segs_lt_2" };
  }
  const stubs = heParts.slice(0, -1);
  const body = heParts[heParts.length - 1];
  const stubClasses = [];
  for (let i = 0; i < stubs.length; i++) {
    const c = classifyHeadingStub(stubs[i]);
    if (!c) {
      return {
        ok: false,
        reason: i === 0 ? "first_not_heading_stub" : "middle_not_heading_stub",
        stubIndex: i,
        stubPreview: visibleText(stubs[i]).slice(0, 80),
      };
    }
    stubClasses.push(c);
  }
  const bodyVis = visibleText(body);
  if (bodyVis.length < 20) {
    return { ok: false, reason: "body_too_short", bodyLen: bodyVis.length };
  }
  if (!hasHebrewLetters(body)) {
    return { ok: false, reason: "body_no_hebrew" };
  }
  if (/ENGLISH\s+translation|English translation pending|\*{4}\s*ENGLISH/i.test(body)) {
    return { ok: false, reason: "body_looks_corrupted" };
  }

  const buckets = stubClasses.map((c) => c.bucket);
  const hasPlural = buckets.includes("title_plural_seifim");
  const hasSingular = buckets.includes("title_singular_seif");
  const hasShem = buckets.includes("shem_stub");

  // Primary heading bucket for reporting (prefer title > shem > other)
  let primaryBucket = "other_stub";
  if (hasPlural) primaryBucket = "title_plural_seifim";
  else if (hasSingular) primaryBucket = "title_singular_seif";
  else if (hasShem) primaryBucket = "shem_stub";

  // Auto-apply policy (plural unlocked after human verify of ובו <N> סעיפים:):
  //   - singular סעיף titles: YES
  //   - plural סעיפים titles: YES
  //   - שם stubs (no title): YES (high-precision stub)
  //   - other_stub alone: HOLD (lower precision)
  let autoApply = false;
  let holdReason = null;
  if (hasPlural || hasSingular) {
    autoApply = true;
  } else if (hasShem) {
    autoApply = true;
  } else {
    autoApply = false;
    holdReason = "hold_other_stub";
  }

  return {
    ok: true,
    autoApply,
    holdReason,
    primaryBucket,
    buckets,
    reason: heParts.length === 2 ? "title_plus_body" : "multi_stub_plus_body",
    stubPreviews: stubs.map((s) => visibleText(s).slice(0, 80)),
    stubClasses,
    bodyPreview: bodyVis.slice(0, 100),
  };
}

function classify(heParts, enParts, heRaw, enRaw) {
  const heN = heParts.length;
  const enN = enParts.length;
  const heEmpty = visuallyEmpty(heRaw);
  const enEmpty = visuallyEmpty(enRaw);
  if (heEmpty && enEmpty) return null;
  if (heEmpty && !enEmpty) return { kind: "he_missing", heN: 0, enN };
  if (!heEmpty && enEmpty) return { kind: "en_missing", heN, enN: 0 };
  if (heN === enN) return null;
  if (heN === 1 && enN > 1) return { kind: "he_truncated_vs_multi_en", heN, enN };
  if (enN === 1 && heN > 1) return { kind: "en_truncated_vs_multi_he", heN, enN };
  if (enN > heN) return { kind: "en_has_more_segments", heN, enN };
  return { kind: "he_has_more_segments", heN, enN };
}

/** Kinds we classify / may auto-fix (Case A). */
function isTargetKind(cls) {
  if (!cls) return false;
  return (
    cls.kind === "en_truncated_vs_multi_he" ||
    cls.kind === "he_has_more_segments"
  );
}

/** Hard gate for auto rejoin. */
function isAutoCandidate(cls) {
  if (!cls) return false;
  if (cls.heN < 2 || cls.enN !== 1) return false;
  return (
    cls.kind === "en_truncated_vs_multi_he" ||
    cls.kind === "he_has_more_segments"
  );
}

/** Tag/whitespace-insensitive HE compare key. */
function normalizeHeCompare(html) {
  return String(html ?? "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[\u0591-\u05C7]/g, "") // strip nikud for near-eq
    .replace(/[^\u0590-\u05FFa-zA-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function heNearEqual(a, b) {
  const na = normalizeHeCompare(a);
  const nb = normalizeHeCompare(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  const shorter = na.length <= nb.length ? na : nb;
  const longer = na.length <= nb.length ? nb : na;
  if (longer.includes(shorter) && shorter.length >= 24) {
    const drift = longer.length - shorter.length;
    if (drift <= Math.max(12, Math.floor(longer.length * 0.02))) return true;
  }
  let i = 0;
  const lim = Math.min(na.length, nb.length);
  while (i < lim && na[i] === nb[i]) i++;
  const prefix = i / Math.max(na.length, nb.length);
  if (prefix >= 0.97 && Math.abs(na.length - nb.length) <= 20) return true;
  return false;
}

/** Multi-note markers: (א), [א], א), bold letter labels, etc. */
function countNoteMarkers(html) {
  const s = String(html ?? "");
  const re =
    /(?:^|[\s>])(?:\(|\[)?\s*([א-ת])\s*(?:\)|\])?(?:\s*[:.])?(?=\s|<|$)/g;
  const labels = new Set();
  let m;
  while ((m = re.exec(s)) !== null) {
    labels.add(m[1]);
  }
  // Also <b>(א)</b> / <b>א)</b> style
  const re2 = /<b>\s*\(?\s*([א-ת])\s*\)?\s*<\/b>/gi;
  while ((m = re2.exec(s)) !== null) {
    labels.add(m[1]);
  }
  return labels.size;
}

function layerToHtml(layer) {
  if (layer == null) return null;
  if (typeof layer === "string") return layer;
  if (layer.kind === "html") return String(layer.html ?? "");
  if (layer.kind === "segments" && Array.isArray(layer.segments)) {
    return layer.segments.map((s) => String(s).trim()).join("<br>\n");
  }
  return "";
}

function extractTextGrid(parsed) {
  const t = parsed?.text;
  if (!t) return null;
  if (Array.isArray(t)) return t;
  if (typeof t === "object" && Array.isArray(t[""])) return t[""];
  const keys = Object.keys(t).filter((k) => Array.isArray(t[k]));
  if (!keys.length) return null;
  const longest = keys.reduce(
    (best, k) => {
      const a = t[k];
      const score = Array.isArray(a) ? a.length : 0;
      return score > best.score ? { key: k, score } : best;
    },
    { key: keys[0], score: 0 }
  );
  return t[longest.key] ?? null;
}

function normalizeSeifCell(cell) {
  if (cell == null) return null;
  if (typeof cell === "string") return cell;
  if (Array.isArray(cell)) {
    const flat = cell.map((x) => (typeof x === "string" ? x : JSON.stringify(x)));
    return flat.map((s) => s.trim()).filter(Boolean).join("<br>\n");
  }
  return String(cell);
}

const mergedCache = new Map();
const mechaberSeifCountCache = new Map();

function loadMergedGrid(volCfg, commentaryFolder) {
  const key = `${volCfg.sefariaFolder}::${commentaryFolder}`;
  if (mergedCache.has(key)) return mergedCache.get(key);
  const p = path.join(
    SEFARIA_ROOT,
    volCfg.sefariaFolder,
    "commentaries",
    commentaryFolder,
    "merged.json"
  );
  let grid = null;
  if (fs.existsSync(p)) {
    try {
      grid = extractTextGrid(JSON.parse(fs.readFileSync(p, "utf8")));
    } catch {
      grid = null;
    }
  }
  mergedCache.set(key, grid);
  return grid;
}

function mechaberSeifCount(volCfg, siman) {
  const key = `${volCfg.sefariaFolder}::${siman}`;
  if (mechaberSeifCountCache.has(key)) return mechaberSeifCountCache.get(key);
  const p = path.join(
    SEFARIA_ROOT,
    volCfg.sefariaFolder,
    "mechaber",
    "merged.json"
  );
  let n = 0;
  if (fs.existsSync(p)) {
    try {
      const grid = extractTextGrid(JSON.parse(fs.readFileSync(p, "utf8")));
      const row = grid?.[siman - 1];
      n = Array.isArray(row) ? row.length : 0;
    } catch {
      n = 0;
    }
  }
  mechaberSeifCountCache.set(key, n);
  return n;
}

function buildSlugToFolder(volCfg) {
  const map = new Map();
  const commentariesDir = path.join(
    SEFARIA_ROOT,
    volCfg.sefariaFolder,
    "commentaries"
  );
  if (!fs.existsSync(commentariesDir)) return map;

  for (const [layerKey, slug] of Object.entries(volCfg.layerToSlug)) {
    if (layerKey === "mechaber") continue;
    const guess = layerKey.replace(/ /g, "_");
    map.set(slug, guess);
  }

  for (const ent of fs.readdirSync(commentariesDir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const folder = ent.name;
    const mergedPath = path.join(commentariesDir, folder, "merged.json");
    let title = folder.replace(/_/g, " ");
    if (fs.existsSync(mergedPath)) {
      try {
        const doc = JSON.parse(fs.readFileSync(mergedPath, "utf8"));
        if (doc.title) title = doc.title;
      } catch {
        /* ignore */
      }
    }
    const slug = volCfg.slugFromLayerKey(title);
    map.set(slug, folder);
    if (slug === "kaf-hachayim" || slug === "kaf-hachayyim") {
      map.set("kaf-hachayim", folder);
      map.set("kaf-hachayyim", folder);
    }
  }
  map.set("mechaber", null);
  return map;
}

/**
 * Collect all available upstream HE candidates (may be multi or single).
 * Returns array of { text, source, segs }.
 */
function collectUpstreamHeCandidates(
  volCfg,
  slugToFolder,
  siman,
  seifName,
  seifNum,
  slug
) {
  const out = [];
  const push = (text, source) => {
    if (text == null) return;
    if (visuallyEmpty(text) || !hasHebrewLetters(text)) return;
    out.push({
      text,
      source,
      segs: splitHtmlByBrSegments(text).length,
    });
  };

  if (volCfg.hasSimanim) {
    const base = path.join(
      SEFARIA_ROOT,
      volCfg.sefariaFolder,
      "simanim",
      pad(siman),
      seifName
    );
    const candidates = [slug];
    if (slug === "kaf-hachayim") candidates.push("kaf-hachayyim");
    if (slug === "kaf-hachayyim") candidates.push("kaf-hachayim");
    for (const s of candidates) {
      const p = path.join(base, s, "he.html");
      if (fs.existsSync(p)) {
        push(readText(p), "oc_simanim_he_html");
        break;
      }
    }

    const jp = path.join(
      SEFARIA_ROOT,
      volCfg.sefariaFolder,
      "simanim",
      pad(siman),
      `seif-${pad(seifNum)}.json`
    );
    if (fs.existsSync(jp)) {
      try {
        const doc = JSON.parse(fs.readFileSync(jp, "utf8"));
        const layers = doc.layers || {};
        for (const [k, L] of Object.entries(layers)) {
          if (L == null) continue;
          const s = volCfg.slugFromLayerKey(k);
          if (
            s === slug ||
            (slug === "kaf-hachayim" &&
              (s === "kaf-hachayim" || s === "kaf-hachayyim")) ||
            (k === "mechaber" && slug === "mechaber")
          ) {
            const html = layerToHtml(L);
            if (html != null) push(html, "sef_json_layer");
            break;
          }
        }
      } catch {
        /* ignore */
      }
    }
  }

  if (slug === "mechaber") {
    const p = path.join(
      SEFARIA_ROOT,
      volCfg.sefariaFolder,
      "mechaber",
      "merged.json"
    );
    if (fs.existsSync(p)) {
      try {
        const grid = extractTextGrid(JSON.parse(fs.readFileSync(p, "utf8")));
        const row = grid?.[siman - 1];
        if (Array.isArray(row)) {
          const cell = row[seifNum - 1];
          if (cell != null) {
            const html = normalizeSeifCell(cell);
            push(html, "merged_mechaber");
          }
        }
      } catch {
        /* ignore */
      }
    }
    return out;
  }

  const folder = slugToFolder.get(slug);
  if (!folder) return out;
  const grid = loadMergedGrid(volCfg, folder);
  if (!grid) return out;
  const row = grid?.[siman - 1];
  if (!Array.isArray(row)) return out;
  const mechN = mechaberSeifCount(volCfg, siman);
  if (!(mechN > 0 && row.length === mechN)) {
    // Not seif-aligned — record sentinel for C_remap
    out.push({
      text: null,
      source: "merged_aligned",
      segs: 0,
      reason: "not_seif_aligned",
      detail: { rowLen: row.length, mechN },
    });
    return out;
  }
  const cell = row[seifNum - 1];
  if (cell != null) {
    push(normalizeSeifCell(cell), "merged_aligned");
  }
  return out;
}

/**
 * Pick best single-seg upstream that matches joined live HE.
 */
function pickSingleUpstreamMatchingJoin(candidates, joinedLiveHe) {
  const singles = candidates.filter(
    (c) => c.text != null && c.segs === 1 && heNearEqual(joinedLiveHe, c.text)
  );
  // Prefer oc_simanim > sef_json > merged
  const rank = {
    oc_simanim_he_html: 0,
    sef_json_layer: 1,
    merged_mechaber: 2,
    merged_aligned: 3,
  };
  singles.sort(
    (a, b) => (rank[a.source] ?? 9) - (rank[b.source] ?? 9)
  );
  return singles[0] || null;
}

/** Re-join HE segments with a single space (strip <br> separators). */
function rejoinHeSegments(heRaw) {
  const parts = splitHtmlByBrSegments(heRaw)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!parts.length) return "";
  return parts.join(" ");
}

function sha256(s) {
  return crypto.createHash("sha256").update(String(s), "utf8").digest("hex");
}

function listSimanDirs(volRoot) {
  if (!fs.existsSync(volRoot)) return [];
  return fs
    .readdirSync(volRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^siman\d+$/i.test(e.name))
    .map((e) => e.name)
    .sort(
      (a, b) =>
        parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10)
    );
}

function* walkSlugDirs(simanDir) {
  let ents;
  try {
    ents = fs.readdirSync(simanDir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of ents) {
    if (!e.isDirectory() || !e.name.startsWith("seif-")) continue;
    const seifDir = path.join(simanDir, e.name);
    let slugs;
    try {
      slugs = fs.readdirSync(seifDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const s of slugs) {
      if (!s.isDirectory()) continue;
      yield {
        seif: e.name,
        slug: s.name,
        slugDir: path.join(seifDir, s.name),
      };
    }
  }
}

function bump(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function processVolume(vol, opts) {
  const volCfg = VOLUME_CFG[vol];
  const liveRoot = path.join(opts.corpusRoot, vol);
  const result = {
    volume: vol,
    scannedPairs: 0,
    targetMismatches: 0,
    classification: { A_eligible: 0, B_candidate: 0, C_remap: 0, skip: 0 },
    eligible: 0,
    applied: 0,
    skipped: 0,
    byKind: {},
    bySlug: {},
    byStrategy: {},
    bySkipReason: {},
    byClass: {},
    byUpstreamSource: {},
    affectedSimanim: new Set(),
    backups: [],
    eligibleSamples: [],
    classSamples: { A_eligible: [], B_candidate: [], C_remap: [], skip: [] },
  };

  if (!volCfg) {
    result.error = "unknown_volume";
    return result;
  }
  if (!fs.existsSync(liveRoot)) {
    result.error = "live_missing";
    return result;
  }

  const slugToFolder = buildSlugToFolder(volCfg);
  const simans = listSimanDirs(liveRoot);
  let simanCount = 0;

  for (const simanName of simans) {
    if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
    simanCount++;
    const siman = parseInt(simanName.replace(/\D/g, ""), 10);
    const liveSiman = path.join(liveRoot, simanName);

    for (const { seif, slug, slugDir } of walkSlugDirs(liveSiman)) {
      if (opts.slug && slug !== opts.slug) continue;
      if (opts.apply && result.applied >= opts.maxFixes) {
        result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
        return result;
      }
      if (!opts.apply && result.eligible >= opts.maxFixes) {
        result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
        return result;
      }

      const hePath = path.join(slugDir, "he.html");
      const enPath = path.join(slugDir, "en.html");
      if (!fs.existsSync(hePath) && !fs.existsSync(enPath)) continue;

      result.scannedPairs++;
      const liveHe = readText(hePath);
      const liveEn = readText(enPath);
      const lHe = splitHtmlByBrSegments(liveHe);
      const lEn = splitHtmlByBrSegments(liveEn);
      const cls = classify(lHe, lEn, liveHe, liveEn);
      if (!isTargetKind(cls)) continue;

      result.targetMismatches++;
      bump(result.byKind, cls.kind);
      const seifNum = parseInt(seif.replace(/\D/g, ""), 10);
      const rel = `${vol}/${simanName}/${seif}/${slug}`;
      const heRel = `${rel}/he.html`;

      const pushClassSample = (bucket, extra = {}) => {
        const arr = result.classSamples[bucket];
        if (arr.length >= opts.sampleLimit) return;
        arr.push({
          path: rel,
          kind: cls.kind,
          heSegs: cls.heN,
          enSegs: cls.enN,
          ...extra,
        });
      };

      const markClass = (bucket, reason, extra = {}) => {
        result.classification[bucket]++;
        bump(result.byClass, `${bucket}:${reason}`);
        pushClassSample(bucket, { reason, ...extra });
        return bucket;
      };

      // Content basics
      if (!hasHebrewLetters(liveHe) || visuallyEmpty(liveHe)) {
        markClass("skip", "he_empty_or_no_hebrew");
        result.skipped++;
        bump(result.bySkipReason, "he_empty_or_no_hebrew");
        continue;
      }
      if (visuallyEmpty(liveEn)) {
        markClass("skip", "en_empty");
        result.skipped++;
        bump(result.bySkipReason, "en_empty");
        continue;
      }

      const joined = rejoinHeSegments(liveHe);
      const candidates = collectUpstreamHeCandidates(
        volCfg,
        slugToFolder,
        siman,
        seif,
        seifNum,
        slug
      );

      const usable = candidates.filter((c) => c.text != null);
      const notAligned = candidates.find((c) => c.reason === "not_seif_aligned");
      const anyMulti = usable.some((c) => c.segs > 1);
      const anySingle = usable.some((c) => c.segs === 1);
      const noteMarks = countNoteMarkers(liveHe);
      const pick = pickSingleUpstreamMatchingJoin(candidates, joined);

      // --- Classification path ---
      if (!isAutoCandidate(cls)) {
        // he_has_more_segments with enSegs > 1 — never auto-fix
        if (anyMulti || noteMarks >= 2) {
          markClass("B_candidate", anyMulti ? "upstream_multi" : "note_markers", {
            upstreamSegs: usable.length
              ? Math.max(...usable.map((c) => c.segs))
              : null,
            noteMarks,
            enSegs: cls.enN,
          });
        } else if (
          anySingle &&
          !heNearEqual(joined, usable.find((c) => c.segs === 1).text)
        ) {
          markClass("C_remap", "content_mismatch_multi_en", {
            enSegs: cls.enN,
          });
        } else if (!usable.length) {
          // Can't verify seif index / missing upstream — not confirmed orphan
          markClass("skip", notAligned ? "not_seif_aligned" : "upstream_missing", {
            detail: notAligned?.detail || null,
            enSegs: cls.enN,
          });
        } else {
          markClass("skip", "en_not_single_no_auto", { enSegs: cls.enN });
        }
        result.skipped++;
        bump(result.bySkipReason, "en_not_single");
        continue;
      }

      // enSegs === 1, heSegs >= 2
      if (!usable.length) {
        // Unaligned commentary grids are unclear, not proven wrong-seif
        markClass(
          notAligned ? "skip" : "C_remap",
          notAligned ? "not_seif_aligned" : "upstream_missing",
          { detail: notAligned?.detail || null }
        );
        result.skipped++;
        bump(
          result.bySkipReason,
          notAligned ? "not_seif_aligned" : "upstream_he_missing"
        );
        continue;
      }

      if (pick) {
        // Case A — eligible for auto rejoin
        markClass("A_eligible", "upstream_single_matches_join", {
          upstreamSource: pick.source,
          upstreamSegs: 1,
        });

        if (visuallyEmpty(joined)) {
          result.skipped++;
          bump(result.bySkipReason, "join_would_empty_he");
          continue;
        }
        const newSegs = splitHtmlByBrSegments(joined).length;
        if (newSegs !== 1) {
          result.skipped++;
          bump(result.bySkipReason, "join_still_multi");
          continue;
        }

        // Prefer writing the matched upstream single text (cleaner),
        // falling back to joined live if somehow empty.
        const writeText =
          pick.text && !visuallyEmpty(pick.text) ? pick.text : joined;

        const strategy = "rejoin_he_to_upstream_single";
        result.eligible++;
        bump(result.byStrategy, strategy);
        bump(result.bySlug, slug);
        bump(result.byUpstreamSource, pick.source);
        result.affectedSimanim.add(siman);

        const backup = {
          path: heRel,
          sha256: sha256(liveHe),
          bytes: Buffer.byteLength(liveHe, "utf8"),
          preview: liveHe.replace(/\s+/g, " ").trim().slice(0, 200),
          kind: cls.kind,
          heSegs: cls.heN,
          enSegs: cls.enN,
          upstreamSource: pick.source,
          strategy,
        };

        if (result.eligibleSamples.length < opts.sampleLimit) {
          result.eligibleSamples.push({
            ...backup,
            joinedPreview: writeText.replace(/\s+/g, " ").trim().slice(0, 200),
            joinedBytes: Buffer.byteLength(writeText, "utf8"),
            writeSha256: sha256(writeText),
          });
        }
        result.backups.push({
          ...backup,
          writeSha256: sha256(writeText),
          writeBytes: Buffer.byteLength(writeText, "utf8"),
        });

        if (opts.apply) {
          const out = writeText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
          fs.writeFileSync(hePath, out.endsWith("\n") ? out : out + "\n", "utf8");
          result.applied++;
        }
        continue;
      }

      // No single upstream matching join
      if (anyMulti || noteMarks >= 2) {
        // Check if any multi upstream still matches join (same content, also br-split)
        const multiMatch = usable.find(
          (c) => c.segs > 1 && heNearEqual(joined, c.text)
        );
        if (multiMatch) {
          markClass("B_candidate", "upstream_also_multi_same_content", {
            upstreamSource: multiMatch.source,
            upstreamSegs: multiMatch.segs,
            noteMarks,
          });
          result.skipped++;
          bump(result.bySkipReason, "upstream_he_multi_segment");
          continue;
        }
        markClass("B_candidate", anyMulti ? "upstream_multi" : "note_markers", {
          upstreamSegs: Math.max(...usable.map((c) => c.segs)),
          noteMarks,
        });
        result.skipped++;
        bump(result.bySkipReason, "upstream_he_multi_segment");
        continue;
      }

      // Singles exist but don't match join → remap / wrong seif
      if (anySingle) {
        markClass("C_remap", "live_he_ne_upstream", {
          upstreamSource: usable.find((c) => c.segs === 1)?.source,
          liveHeNorm: normalizeHeCompare(joined).slice(0, 80),
          upHeNorm: normalizeHeCompare(
            usable.find((c) => c.segs === 1)?.text || ""
          ).slice(0, 80),
        });
        result.skipped++;
        bump(result.bySkipReason, "live_he_ne_upstream");
        continue;
      }

      markClass("skip", "unclear");
      result.skipped++;
      bump(result.bySkipReason, "unclear");
    }
  }

  result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
  result.simanimScanned = simanCount;
  return result;
}

/**
 * Case A′: re-join HE when only extra segments are headings/stubs and EN is one block.
 * Does not require upstream single-seg (that is why Case A was empty).
 */
function processVolumeCaseAPrime(vol, opts) {
  const volCfg = VOLUME_CFG[vol];
  const liveRoot = path.join(opts.corpusRoot, vol);
  const result = {
    volume: vol,
    mode: "case_a_prime",
    scannedPairs: 0,
    targetMismatches: 0,
    classification: {
      A_prime_eligible: 0,
      A_prime_held: 0,
      B_candidate: 0,
      C_remap: 0,
      skip: 0,
    },
    eligible: 0,
    held: 0,
    applied: 0,
    skipped: 0,
    byKind: {},
    bySlug: {},
    byStrategy: {},
    bySkipReason: {},
    byClass: {},
    byHeSegs: {},
    byHeadingBucket: {
      title_singular_seif: 0,
      title_plural_seifim: 0,
      shem_stub: 0,
      other_stub: 0,
    },
    byAutoBucket: {},
    byHeldBucket: {},
    upstreamNearMatch: 0,
    affectedSimanim: new Set(),
    backups: [],
    eligibleSamples: [],
    heldSamples: [],
    classSamples: {
      A_prime_eligible: [],
      A_prime_held: [],
      B_candidate: [],
      C_remap: [],
      skip: [],
    },
  };

  if (!volCfg) {
    result.error = "unknown_volume";
    return result;
  }
  if (!fs.existsSync(liveRoot)) {
    result.error = "live_missing";
    return result;
  }

  const slugToFolder = buildSlugToFolder(volCfg);
  const simans = listSimanDirs(liveRoot);
  let simanCount = 0;

  for (const simanName of simans) {
    if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
    simanCount++;
    const siman = parseInt(simanName.replace(/\D/g, ""), 10);
    const liveSiman = path.join(liveRoot, simanName);

    for (const { seif, slug, slugDir } of walkSlugDirs(liveSiman)) {
      if (opts.slug && slug !== opts.slug) continue;
      if (opts.apply && result.applied >= opts.maxFixes) {
        result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
        return result;
      }
      if (!opts.apply && result.eligible >= opts.maxFixes) {
        result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
        return result;
      }

      const hePath = path.join(slugDir, "he.html");
      const enPath = path.join(slugDir, "en.html");
      if (!fs.existsSync(hePath) && !fs.existsSync(enPath)) continue;

      result.scannedPairs++;
      const liveHe = readText(hePath);
      const liveEn = readText(enPath);
      const lHe = splitHtmlByBrSegments(liveHe);
      const lEn = splitHtmlByBrSegments(liveEn);
      const cls = classify(lHe, lEn, liveHe, liveEn);
      if (!isTargetKind(cls)) continue;

      result.targetMismatches++;
      bump(result.byKind, cls.kind);
      const seifNum = parseInt(seif.replace(/\D/g, ""), 10);
      const rel = `${vol}/${simanName}/${seif}/${slug}`;
      const heRel = `${rel}/he.html`;

      const pushClassSample = (bucket, extra = {}) => {
        const arr = result.classSamples[bucket];
        if (arr.length >= opts.sampleLimit) return;
        arr.push({
          path: rel,
          kind: cls.kind,
          heSegs: cls.heN,
          enSegs: cls.enN,
          ...extra,
        });
      };

      const markClass = (bucket, reason, extra = {}) => {
        result.classification[bucket]++;
        bump(result.byClass, `${bucket}:${reason}`);
        pushClassSample(bucket, { reason, ...extra });
        return bucket;
      };

      if (!hasHebrewLetters(liveHe) || visuallyEmpty(liveHe)) {
        markClass("skip", "he_empty_or_no_hebrew");
        result.skipped++;
        bump(result.bySkipReason, "he_empty_or_no_hebrew");
        continue;
      }
      if (visuallyEmpty(liveEn)) {
        markClass("skip", "en_empty");
        result.skipped++;
        bump(result.bySkipReason, "en_empty");
        continue;
      }

      // Hard: enSegs === 1
      if (cls.enN !== 1 || cls.heN < 2) {
        markClass("skip", "en_not_single_or_he_lt2", {
          enSegs: cls.enN,
          heSegs: cls.heN,
        });
        result.skipped++;
        bump(result.bySkipReason, "en_not_single");
        continue;
      }

      const aPrime = classifyCaseAPrime(lHe);
      if (!aPrime.ok) {
        // Residual = Part 2 (B) when true multi-note / non-stub first segs
        if (
          aPrime.reason === "first_not_heading_stub" ||
          aPrime.reason === "middle_not_heading_stub"
        ) {
          markClass("B_candidate", aPrime.reason, {
            stubPreview: aPrime.stubPreview || null,
            stubIndex: aPrime.stubIndex ?? null,
          });
        } else {
          markClass("skip", aPrime.reason, {
            bodyLen: aPrime.bodyLen ?? null,
          });
        }
        result.skipped++;
        bump(result.bySkipReason, aPrime.reason);
        continue;
      }

      const joined = rejoinHeSegments(liveHe);
      if (visuallyEmpty(joined)) {
        markClass("skip", "join_would_empty_he");
        result.skipped++;
        bump(result.bySkipReason, "join_would_empty_he");
        continue;
      }
      const newSegs = splitHtmlByBrSegments(joined).length;
      if (newSegs !== 1) {
        markClass("skip", "join_still_multi");
        result.skipped++;
        bump(result.bySkipReason, "join_still_multi");
        continue;
      }

      // Optional: note if upstream joined ≈ live join
      let upstreamMatch = null;
      try {
        const candidates = collectUpstreamHeCandidates(
          volCfg,
          slugToFolder,
          siman,
          seif,
          seifNum,
          slug
        );
        const usable = candidates.filter((c) => c.text != null);
        const match = usable.find((c) => heNearEqual(joined, c.text));
        if (match) {
          upstreamMatch = { source: match.source, segs: match.segs };
          result.upstreamNearMatch++;
        }
      } catch {
        /* optional */
      }

      bump(result.byHeadingBucket, aPrime.primaryBucket);
      bump(result.byHeSegs, String(cls.heN));

      const sampleBase = {
        path: heRel,
        sha256: sha256(liveHe),
        bytes: Buffer.byteLength(liveHe, "utf8"),
        preview: liveHe.replace(/\s+/g, " ").trim().slice(0, 200),
        kind: cls.kind,
        heSegs: cls.heN,
        enSegs: cls.enN,
        primaryBucket: aPrime.primaryBucket,
        buckets: aPrime.buckets,
        stubPreviews: aPrime.stubPreviews,
        bodyPreview: aPrime.bodyPreview,
        upstreamMatch,
        joinedPreview: joined.replace(/\s+/g, " ").trim().slice(0, 200),
        writeSha256: sha256(joined),
        writeBytes: Buffer.byteLength(joined, "utf8"),
      };

      // other_stub (and any future holds): detect & count but do not auto-apply
      if (!aPrime.autoApply) {
        markClass("A_prime_held", aPrime.holdReason || aPrime.primaryBucket, {
          stubPreviews: aPrime.stubPreviews,
          bodyPreview: aPrime.bodyPreview,
          primaryBucket: aPrime.primaryBucket,
          buckets: aPrime.buckets,
          holdReason: aPrime.holdReason,
          upstreamMatch,
        });
        result.held++;
        bump(result.byHeldBucket, aPrime.primaryBucket);
        if (result.heldSamples.length < opts.sampleLimit) {
          result.heldSamples.push({
            ...sampleBase,
            holdReason: aPrime.holdReason,
          });
        }
        continue;
      }

      markClass("A_prime_eligible", aPrime.reason, {
        stubPreviews: aPrime.stubPreviews,
        bodyPreview: aPrime.bodyPreview,
        primaryBucket: aPrime.primaryBucket,
        buckets: aPrime.buckets,
        autoApply: true,
        upstreamMatch,
      });

      const strategy =
        aPrime.primaryBucket === "title_singular_seif"
          ? "rejoin_he_singular_seif_title_body"
          : aPrime.primaryBucket === "title_plural_seifim"
            ? "rejoin_he_plural_seifim_title_body"
            : aPrime.primaryBucket === "shem_stub"
              ? "rejoin_he_shem_stub_body"
              : "rejoin_he_heading_stub_body";
      result.eligible++;
      bump(result.byStrategy, strategy);
      bump(result.bySlug, slug);
      bump(result.byAutoBucket, aPrime.primaryBucket);
      result.affectedSimanim.add(siman);

      const backup = {
        ...sampleBase,
        strategy,
      };

      if (result.eligibleSamples.length < opts.sampleLimit) {
        result.eligibleSamples.push(backup);
      }
      result.backups.push(backup);

      if (opts.apply) {
        // Join live parts only — never invent EN; never replace from upstream
        const out = joined.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        fs.writeFileSync(hePath, out.endsWith("\n") ? out : out + "\n", "utf8");
        result.applied++;
      }
    }
  }

  result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
  result.simanimScanned = simanCount;
  return result;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  ensureDir(OUT_DIR);

  const modeLabel = opts.caseAPrime
    ? opts.apply
      ? "APPLY-A-PRIME"
      : "DRY-RUN-A-PRIME"
    : opts.apply
      ? "APPLY"
      : "DRY-RUN";
  console.log(
    `[rejoin-he] mode=${modeLabel} volumes=${opts.volumes.join(",")}`
  );

  const reports = [];
  for (const vol of opts.volumes) {
    console.log(`\n[rejoin-he] scanning ${vol}…`);
    const r = opts.caseAPrime
      ? processVolumeCaseAPrime(vol, opts)
      : processVolume(vol, opts);
    reports.push(r);
    if (opts.caseAPrime) {
      console.log(
        `[rejoin-he] ${vol}: targets=${r.targetMismatches}` +
          ` auto=${r.classification.A_prime_eligible}` +
          ` held=${r.classification.A_prime_held}` +
          ` B=${r.classification.B_candidate}` +
          ` skip=${r.classification.skip}` +
          ` eligible=${r.eligible}` +
          (opts.apply ? ` applied=${r.applied}` : "")
      );
      console.log(`  byHeadingBucket: ${JSON.stringify(r.byHeadingBucket)}`);
      console.log(`  byAutoBucket: ${JSON.stringify(r.byAutoBucket)}`);
      console.log(`  byHeldBucket: ${JSON.stringify(r.byHeldBucket)}`);
      console.log(`  bySlug (auto): ${JSON.stringify(r.bySlug)}`);
      console.log(`  byStrategy: ${JSON.stringify(r.byStrategy)}`);
      console.log(`  bySkipReason: ${JSON.stringify(r.bySkipReason)}`);
    } else {
      console.log(
        `[rejoin-he] ${vol}: targets=${r.targetMismatches} A=${r.classification.A_eligible} B=${r.classification.B_candidate} C=${r.classification.C_remap} skip=${r.classification.skip}` +
          ` eligible=${r.eligible}` +
          (opts.apply ? ` applied=${r.applied}` : "")
      );
      console.log(`  byKind: ${JSON.stringify(r.byKind)}`);
      console.log(`  bySlug (eligible): ${JSON.stringify(r.bySlug)}`);
      console.log(`  byStrategy: ${JSON.stringify(r.byStrategy)}`);
      console.log(`  byClass: ${JSON.stringify(r.byClass)}`);
      console.log(`  bySkipReason: ${JSON.stringify(r.bySkipReason)}`);
      console.log(`  byUpstreamSource: ${JSON.stringify(r.byUpstreamSource)}`);
    }
    console.log(
      `  affectedSimanim(${r.affectedSimanim.length}): ${r.affectedSimanim.slice(0, 40).join(",")}${r.affectedSimanim.length > 40 ? "…" : ""}`
    );
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outName = opts.caseAPrime
    ? opts.apply
      ? `he_rejoin_a_prime_apply_log.json`
      : `he_rejoin_a_prime_dry_run.json`
    : opts.apply
      ? `he_rejoin_apply_log.json`
      : `he_rejoin_dry_run.json`;
  const outPath = path.join(OUT_DIR, outName);

  const sum = (key) =>
    reports.reduce((n, r) => n + (r.classification?.[key] || 0), 0);
  const sumField = (key) => reports.reduce((n, r) => n + (r[key] || 0), 0);

  const mergeBucket = (field) => {
    const out = {};
    for (const r of reports) {
      for (const [k, v] of Object.entries(r[field] || {})) {
        out[k] = (out[k] || 0) + v;
      }
    }
    return out;
  };

  const payload = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    case: opts.caseAPrime ? "A_prime" : "A",
    volumes: opts.volumes,
    policy: opts.caseAPrime
      ? {
          autoApply: [
            "title_singular_seif",
            "title_plural_seifim",
            "shem_stub",
          ],
          hold: ["other_stub"],
          note: "Singular/plural ובו … סעיף/סעיפים titles + שם stubs auto; other_stub held",
        }
      : undefined,
    totals: opts.caseAPrime
      ? {
          A_prime_eligible: sum("A_prime_eligible"),
          A_prime_held: sum("A_prime_held"),
          B_candidate: sum("B_candidate"),
          skip: sum("skip"),
          eligible: sumField("eligible"),
          held: sumField("held"),
          applied: sumField("applied"),
          byHeadingBucket: mergeBucket("byHeadingBucket"),
          byAutoBucket: mergeBucket("byAutoBucket"),
          byHeldBucket: mergeBucket("byHeldBucket"),
        }
      : {
          A_eligible: sum("A_eligible"),
          B_candidate: sum("B_candidate"),
          C_remap: sum("C_remap"),
          skip: sum("skip"),
          eligible: sumField("eligible"),
          applied: sumField("applied"),
        },
    reports: reports.map((r) => ({ ...r })),
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`\n[rejoin-he] wrote ${outPath}`);

  const affected = {};
  for (const r of reports) {
    affected[r.volume] = r.affectedSimanim;
  }
  const affName = opts.caseAPrime
    ? "he_rejoin_a_prime_affected_simanim.json"
    : "he_rejoin_affected_simanim.json";
  const affPath = path.join(OUT_DIR, affName);
  fs.writeFileSync(affPath, JSON.stringify(affected, null, 2), "utf8");
  console.log(`[rejoin-he] wrote ${affPath}`);

  // Classification summary markdown
  const md = opts.caseAPrime
    ? [
        "# HE Case A′ classification (heading/stub rejoin)",
        "",
        `Scanned at: ${payload.scannedAt}`,
        `Mode: ${payload.mode}`,
        "",
        "**Policy:** auto-apply `title_singular_seif` + `title_plural_seifim` + `shem_stub`; hold `other_stub`.",
        "",
        `| Bucket | Count |`,
        `|--------|------:|`,
        `| title_singular_seif (detected) | ${payload.totals.byHeadingBucket.title_singular_seif || 0} |`,
        `| title_plural_seifim (detected) | ${payload.totals.byHeadingBucket.title_plural_seifim || 0} |`,
        `| shem_stub (detected) | ${payload.totals.byHeadingBucket.shem_stub || 0} |`,
        `| other_stub (detected, held) | ${payload.totals.byHeadingBucket.other_stub || 0} |`,
        `| auto eligible | ${payload.totals.eligible} |`,
        `| held | ${payload.totals.held} |`,
        `| B_candidate (Part 2) | ${payload.totals.B_candidate} |`,
        `| applied | ${payload.totals.applied} |`,
        "",
        `Auto buckets: \`${JSON.stringify(payload.totals.byAutoBucket)}\``,
        "",
        `Held buckets: \`${JSON.stringify(payload.totals.byHeldBucket)}\``,
        "",
      ]
    : [
        "# HE oversplit classification (Case A rejoin)",
        "",
        `Scanned at: ${payload.scannedAt}`,
        `Mode: ${payload.mode}`,
        "",
        `| Bucket | Count |`,
        `|--------|------:|`,
        `| A_eligible | ${payload.totals.A_eligible} |`,
        `| B_candidate | ${payload.totals.B_candidate} |`,
        `| C_remap | ${payload.totals.C_remap} |`,
        `| skip | ${payload.totals.skip} |`,
        `| auto eligible/applied | ${payload.totals.eligible}${opts.apply ? ` / ${payload.totals.applied}` : ""} |`,
        "",
      ];
  for (const r of reports) {
    md.push(`## ${r.volume}`, "");
    if (opts.caseAPrime) {
      md.push(
        `- targets=${r.targetMismatches} auto=${r.classification.A_prime_eligible} held=${r.classification.A_prime_held} B=${r.classification.B_candidate} skip=${r.classification.skip}`
      );
      md.push(`- byHeadingBucket: \`${JSON.stringify(r.byHeadingBucket)}\``);
      md.push(`- auto by slug: \`${JSON.stringify(r.bySlug)}\``);
    } else {
      md.push(
        `- targets=${r.targetMismatches} A=${r.classification.A_eligible} B=${r.classification.B_candidate} C=${r.classification.C_remap} skip=${r.classification.skip}`
      );
      md.push(`- eligible by slug: \`${JSON.stringify(r.bySlug)}\``);
    }
    md.push("");
  }
  const mdName = opts.caseAPrime
    ? "HE_REJOIN_A_PRIME.md"
    : "HE_REJOIN_CLASSIFICATION.md";
  const mdPath = path.join(OUT_DIR, mdName);
  fs.writeFileSync(mdPath, md.join("\n") + "\n", "utf8");
  console.log(`[rejoin-he] wrote ${mdPath}`);

  if (opts.apply) {
    const bak = path.join(
      OUT_DIR,
      opts.caseAPrime
        ? `he_rejoin_a_prime_apply_log_${stamp}.json`
        : `he_rejoin_apply_log_${stamp}.json`
    );
    fs.writeFileSync(bak, JSON.stringify(payload, null, 2), "utf8");
    console.log(`[rejoin-he] backup log ${bak}`);
  }

  if (opts.caseAPrime) {
    console.log(
      `\n[rejoin-he] TOTAL A′ auto=${payload.totals.eligible} held=${payload.totals.held} B=${payload.totals.B_candidate}` +
        ` buckets=${JSON.stringify(payload.totals.byHeadingBucket)}` +
        (opts.apply ? ` applied=${payload.totals.applied}` : " (dry-run)")
    );
  } else {
    console.log(
      `\n[rejoin-he] TOTAL A=${payload.totals.A_eligible} B=${payload.totals.B_candidate} C=${payload.totals.C_remap} skip=${payload.totals.skip} eligible=${payload.totals.eligible}` +
        (opts.apply ? ` applied=${payload.totals.applied}` : " (dry-run)")
    );
  }
}

main();
