/**
 * Re-join over-split EN when live HE is a single segment that already matches
 * upstream Sefaria Pulls HE (or OC processed simanim he.html).
 *
 * Prefer EN join over inventing Hebrew. Never writes he.html.
 *
 * Eligibility (ALL must hold):
 *   1. kind is he_truncated_vs_multi_en OR (en_has_more_segments AND heSegs===1)
 *   2. heSegs === 1 (hard gate)
 *   3. enSegs >= 2
 *   4. HE has Hebrew letters; EN non-empty
 *   5. Upstream HE available and non-null
 *   6. Upstream HE is NOT multi-segment (skip collapsed-HE cases)
 *   7. Live HE ≈ upstream HE (whitespace/tag-insensitive)
 *   8. After join, EN is non-empty
 *
 *   node rejoin_oversplit_en.mjs --dry-run --volumes oc1,yd1,cm1
 *   node rejoin_oversplit_en.mjs --apply --volume yd1
 *   node rejoin_oversplit_en.mjs --apply --volume oc1 --max-fixes 50
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
      console.log(`Re-join over-split EN when HE is single-segment and matches upstream.

  --dry-run (default) | --apply
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

function isCandidateKind(cls) {
  if (!cls) return false;
  if (cls.heN !== 1) return false;
  if (cls.enN < 2) return false;
  return (
    cls.kind === "he_truncated_vs_multi_en" ||
    cls.kind === "en_has_more_segments"
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
  // Near-equal: allow small prefix/suffix drift (≤2% or 12 chars)
  const shorter = na.length <= nb.length ? na : nb;
  const longer = na.length <= nb.length ? nb : na;
  if (longer.includes(shorter) && shorter.length >= 24) {
    const drift = longer.length - shorter.length;
    if (drift <= Math.max(12, Math.floor(longer.length * 0.02))) return true;
  }
  // Char overlap ratio on longer string
  let i = 0;
  const lim = Math.min(na.length, nb.length);
  while (i < lim && na[i] === nb[i]) i++;
  const prefix = i / Math.max(na.length, nb.length);
  if (prefix >= 0.97 && Math.abs(na.length - nb.length) <= 20) return true;
  return false;
}

function layerToHtml(layer) {
  if (layer == null) return null; // distinguish null vs empty
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
 * Fetch upstream HE. Returns { text, source } or { text: null, source, reason }.
 * text === null means missing/unavailable (must skip, do not guess).
 */
function fetchUpstreamHe(volCfg, slugToFolder, siman, seifName, seifNum, slug) {
  // 1) OC processed simanim he.html
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
        const t = readText(p);
        if (!visuallyEmpty(t) && hasHebrewLetters(t)) {
          return { text: t, source: "oc_simanim_he_html" };
        }
      }
    }

    // 2) seif-*.json layer
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
              (s === "kaf-hachayim" || s === "kaf-hachayyim"))
          ) {
            const html = layerToHtml(L);
            if (html == null) {
              return { text: null, source: "sef_json_layer", reason: "layer_null" };
            }
            if (!visuallyEmpty(html) && hasHebrewLetters(html)) {
              return { text: html, source: "sef_json_layer" };
            }
          }
        }
      } catch {
        /* ignore */
      }
    }
  }

  // 3) merged.json (aligned seif index only)
  if (slug === "mechaber") {
    const p = path.join(
      SEFARIA_ROOT,
      volCfg.sefariaFolder,
      "mechaber",
      "merged.json"
    );
    if (!fs.existsSync(p)) {
      return { text: null, source: "merged_mechaber", reason: "file_missing" };
    }
    try {
      const grid = extractTextGrid(JSON.parse(fs.readFileSync(p, "utf8")));
      const row = grid?.[siman - 1];
      if (!Array.isArray(row)) {
        return { text: null, source: "merged_mechaber", reason: "no_row" };
      }
      const cell = row[seifNum - 1];
      if (cell == null) {
        return { text: null, source: "merged_mechaber", reason: "cell_null" };
      }
      const html = normalizeSeifCell(cell);
      if (!html || visuallyEmpty(html) || !hasHebrewLetters(html)) {
        return { text: null, source: "merged_mechaber", reason: "cell_empty" };
      }
      return { text: html, source: "merged_mechaber" };
    } catch {
      return { text: null, source: "merged_mechaber", reason: "parse_error" };
    }
  }

  const folder = slugToFolder.get(slug);
  if (!folder) {
    return { text: null, source: "merged_aligned", reason: "slug_folder_unknown" };
  }
  const grid = loadMergedGrid(volCfg, folder);
  if (!grid) {
    return { text: null, source: "merged_aligned", reason: "merged_missing" };
  }
  const row = grid?.[siman - 1];
  if (!Array.isArray(row)) {
    return { text: null, source: "merged_aligned", reason: "no_row" };
  }
  const mechN = mechaberSeifCount(volCfg, siman);
  if (!(mechN > 0 && row.length === mechN)) {
    // Not seif-aligned — cannot safely index; treat as unavailable
    return {
      text: null,
      source: "merged_aligned",
      reason: "not_seif_aligned",
      detail: { rowLen: row.length, mechN },
    };
  }
  const cell = row[seifNum - 1];
  if (cell == null) {
    return { text: null, source: "merged_aligned", reason: "cell_null" };
  }
  const html = normalizeSeifCell(cell);
  if (!html || visuallyEmpty(html) || !hasHebrewLetters(html)) {
    return { text: null, source: "merged_aligned", reason: "cell_empty" };
  }
  return { text: html, source: "merged_aligned" };
}

/**
 * Re-join EN segments with a single space (strip <br> separators).
 * Preserve internal HTML; keep space before <b>/markdown bold for readability.
 */
function rejoinEnSegments(enRaw) {
  const parts = splitHtmlByBrSegments(enRaw).map((p) => p.trim()).filter(Boolean);
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
    candidateMismatches: 0,
    eligible: 0,
    applied: 0,
    skipped: 0,
    byKind: {},
    bySlug: {},
    byStrategy: {},
    bySkipReason: {},
    byUpstreamSource: {},
    affectedSimanim: new Set(),
    backups: [],
    eligibleSamples: [],
    skippedSamples: [],
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
      if (!isCandidateKind(cls)) continue;

      result.candidateMismatches++;
      bump(result.byKind, cls.kind);
      const seifNum = parseInt(seif.replace(/\D/g, ""), 10);
      const rel = `${vol}/${simanName}/${seif}/${slug}`;
      const enRel = `${rel}/en.html`;

      const skip = (reason, extra = {}) => {
        result.skipped++;
        bump(result.bySkipReason, reason);
        if (result.skippedSamples.length < opts.sampleLimit) {
          result.skippedSamples.push({
            path: rel,
            kind: cls.kind,
            heSegs: cls.heN,
            enSegs: cls.enN,
            reason,
            ...extra,
          });
        }
      };

      // Hard gates already implied by isCandidateKind; re-check content
      if (!hasHebrewLetters(liveHe) || visuallyEmpty(liveHe)) {
        skip("he_empty_or_no_hebrew");
        continue;
      }
      if (visuallyEmpty(liveEn)) {
        skip("en_empty");
        continue;
      }

      const up = fetchUpstreamHe(
        volCfg,
        slugToFolder,
        siman,
        seif,
        seifNum,
        slug
      );

      if (up.text == null) {
        skip("upstream_he_missing", {
          upstreamSource: up.source,
          upstreamReason: up.reason || null,
          detail: up.detail || null,
        });
        continue;
      }

      bump(result.byUpstreamSource, up.source);
      const upSegs = splitHtmlByBrSegments(up.text).length;
      if (upSegs > 1) {
        skip("upstream_he_multi_segment", {
          upstreamSource: up.source,
          upstreamSegs: upSegs,
        });
        continue;
      }

      if (!heNearEqual(liveHe, up.text)) {
        skip("live_he_ne_upstream", {
          upstreamSource: up.source,
          liveHeNorm: normalizeHeCompare(liveHe).slice(0, 80),
          upHeNorm: normalizeHeCompare(up.text).slice(0, 80),
        });
        continue;
      }

      const joined = rejoinEnSegments(liveEn);
      if (visuallyEmpty(joined)) {
        skip("join_would_empty_en");
        continue;
      }

      const newSegs = splitHtmlByBrSegments(joined).length;
      if (newSegs !== 1) {
        // Safety: joined text somehow still multi (e.g. literal &lt;br&gt;)
        skip("join_still_multi", { newSegs });
        continue;
      }

      const strategy = "rejoin_en_space";
      result.eligible++;
      bump(result.byStrategy, strategy);
      bump(result.bySlug, slug);
      result.affectedSimanim.add(siman);

      const backup = {
        path: enRel,
        sha256: sha256(liveEn),
        bytes: Buffer.byteLength(liveEn, "utf8"),
        preview: liveEn.replace(/\s+/g, " ").trim().slice(0, 200),
        kind: cls.kind,
        heSegs: cls.heN,
        enSegs: cls.enN,
        upstreamSource: up.source,
        strategy,
      };

      if (result.eligibleSamples.length < opts.sampleLimit) {
        result.eligibleSamples.push({
          ...backup,
          joinedPreview: joined.replace(/\s+/g, " ").trim().slice(0, 200),
          joinedBytes: Buffer.byteLength(joined, "utf8"),
        });
      }
      result.backups.push(backup);

      if (opts.apply) {
        const out = joined.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        fs.writeFileSync(enPath, out.endsWith("\n") ? out : out + "\n", "utf8");
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

  console.log(
    `[rejoin-en] mode=${opts.apply ? "APPLY" : "DRY-RUN"} volumes=${opts.volumes.join(",")}`
  );

  const reports = [];
  for (const vol of opts.volumes) {
    console.log(`\n[rejoin-en] scanning ${vol}…`);
    const r = processVolume(vol, opts);
    reports.push(r);
    console.log(
      `[rejoin-en] ${vol}: candidates=${r.candidateMismatches} eligible=${r.eligible}` +
        (opts.apply ? ` applied=${r.applied}` : "") +
        ` skipped=${r.skipped}`
    );
    console.log(`  byKind: ${JSON.stringify(r.byKind)}`);
    console.log(`  bySlug: ${JSON.stringify(r.bySlug)}`);
    console.log(`  byStrategy: ${JSON.stringify(r.byStrategy)}`);
    console.log(`  bySkipReason: ${JSON.stringify(r.bySkipReason)}`);
    console.log(`  byUpstreamSource: ${JSON.stringify(r.byUpstreamSource)}`);
    console.log(
      `  affectedSimanim(${r.affectedSimanim.length}): ${r.affectedSimanim.slice(0, 40).join(",")}${r.affectedSimanim.length > 40 ? "…" : ""}`
    );
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outName = opts.apply
    ? `en_rejoin_apply_log.json`
    : `en_rejoin_dry_run.json`;
  const outPath = path.join(OUT_DIR, outName);
  const payload = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    volumes: opts.volumes,
    reports: reports.map((r) => ({
      ...r,
      // keep full backups for rollback
    })),
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`\n[rejoin-en] wrote ${outPath}`);

  // Also write affected simanim map for rebundle helper
  const affected = {};
  for (const r of reports) {
    affected[r.volume] = r.affectedSimanim;
  }
  const affPath = path.join(OUT_DIR, "en_rejoin_affected_simanim.json");
  fs.writeFileSync(affPath, JSON.stringify(affected, null, 2), "utf8");
  console.log(`[rejoin-en] wrote ${affPath}`);

  // Timestamped backup copy on apply
  if (opts.apply) {
    const bak = path.join(OUT_DIR, `en_rejoin_apply_log_${stamp}.json`);
    fs.writeFileSync(bak, JSON.stringify(payload, null, 2), "utf8");
    console.log(`[rejoin-en] backup log ${bak}`);
  }

  const totalEligible = reports.reduce((n, r) => n + (r.eligible || 0), 0);
  const totalApplied = reports.reduce((n, r) => n + (r.applied || 0), 0);
  console.log(
    `\n[rejoin-en] TOTAL eligible=${totalEligible}` +
      (opts.apply ? ` applied=${totalApplied}` : " (dry-run)")
  );
}

main();
