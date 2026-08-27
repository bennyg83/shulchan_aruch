/**
 * Re-join over-split HE when live EN is a single segment and upstream
 * Sefaria HE is also a single segment matching normalize(join(live HE)).
 *
 * Mirror of rejoin_oversplit_en.mjs. Never writes en.html.
 *
 * Classification (all en_truncated_vs_multi_he + he_has_more_segments):
 *   A_eligible — heSegs>=2, enSegs===1, upstream HE single-seg ≈ join(live HE)
 *   B_candidate — true multi-note HE (upstream also multi / note markers); Part 2
 *   C_remap    — orphan / wrong seif / upstream missing or content mismatch
 *   skip       — unclear / hard-gate fail for auto
 *
 * Auto-apply hard gates (ALL must hold):
 *   1. kind is en_truncated_vs_multi_he OR (he_has_more_segments AND enSegs===1)
 *   2. heSegs >= 2, enSegs === 1
 *   3. HE has Hebrew; EN non-empty
 *   4. Some upstream HE source is single-segment
 *   5. That upstream ≈ normalize(join(live HE parts)) (tag/whitespace-insensitive)
 *   6. After join, HE is non-empty and still 1 segment
 *
 *   node rejoin_oversplit_he.mjs --dry-run --volumes oc1,yd1,cm1
 *   node rejoin_oversplit_he.mjs --apply --volumes oc1,yd1,cm1
 *   node rejoin_oversplit_he.mjs --apply --volume oc1 --max-fixes 50
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
      console.log(`Re-join over-split HE when EN is single-segment and upstream HE matches join.

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

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  ensureDir(OUT_DIR);

  console.log(
    `[rejoin-he] mode=${opts.apply ? "APPLY" : "DRY-RUN"} volumes=${opts.volumes.join(",")}`
  );

  const reports = [];
  for (const vol of opts.volumes) {
    console.log(`\n[rejoin-he] scanning ${vol}…`);
    const r = processVolume(vol, opts);
    reports.push(r);
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
    console.log(
      `  affectedSimanim(${r.affectedSimanim.length}): ${r.affectedSimanim.slice(0, 40).join(",")}${r.affectedSimanim.length > 40 ? "…" : ""}`
    );
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outName = opts.apply
    ? `he_rejoin_apply_log.json`
    : `he_rejoin_dry_run.json`;
  const outPath = path.join(OUT_DIR, outName);
  const payload = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    volumes: opts.volumes,
    totals: {
      A_eligible: reports.reduce((n, r) => n + r.classification.A_eligible, 0),
      B_candidate: reports.reduce((n, r) => n + r.classification.B_candidate, 0),
      C_remap: reports.reduce((n, r) => n + r.classification.C_remap, 0),
      skip: reports.reduce((n, r) => n + r.classification.skip, 0),
      eligible: reports.reduce((n, r) => n + (r.eligible || 0), 0),
      applied: reports.reduce((n, r) => n + (r.applied || 0), 0),
    },
    reports: reports.map((r) => ({ ...r })),
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`\n[rejoin-he] wrote ${outPath}`);

  const affected = {};
  for (const r of reports) {
    affected[r.volume] = r.affectedSimanim;
  }
  const affPath = path.join(OUT_DIR, "he_rejoin_affected_simanim.json");
  fs.writeFileSync(affPath, JSON.stringify(affected, null, 2), "utf8");
  console.log(`[rejoin-he] wrote ${affPath}`);

  // Classification summary markdown
  const md = [
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
    md.push(
      `- targets=${r.targetMismatches} A=${r.classification.A_eligible} B=${r.classification.B_candidate} C=${r.classification.C_remap} skip=${r.classification.skip}`
    );
    md.push(`- eligible by slug: \`${JSON.stringify(r.bySlug)}\``);
    md.push("");
  }
  const mdPath = path.join(OUT_DIR, "HE_REJOIN_CLASSIFICATION.md");
  fs.writeFileSync(mdPath, md.join("\n") + "\n", "utf8");
  console.log(`[rejoin-he] wrote ${mdPath}`);

  if (opts.apply) {
    const bak = path.join(OUT_DIR, `he_rejoin_apply_log_${stamp}.json`);
    fs.writeFileSync(bak, JSON.stringify(payload, null, 2), "utf8");
    console.log(`[rejoin-he] backup log ${bak}`);
  }

  console.log(
    `\n[rejoin-he] TOTAL A=${payload.totals.A_eligible} B=${payload.totals.B_candidate} C=${payload.totals.C_remap} skip=${payload.totals.skip} eligible=${payload.totals.eligible}` +
      (opts.apply ? ` applied=${payload.totals.applied}` : " (dry-run)")
  );
}

main();
