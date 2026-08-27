/**
 * HE-only restore for corpus HE/EN <br>-segment mismatches.
 *
 * Sources (first match wins), never writes en.html:
 *   1) Sefaria Pulls …/simanim/SSS/seif-TTT/<slug>/he.html
 *   2) Sefaria Pulls …/simanim/SSS/seif-TTT.json layer for slug
 *   3) Volume editorial output Hebrew blocks (OC_001 / YD_001 / EH_001 / CM_001)
 *   4) Sefaria Pulls commentaries/<Folder>/merged.json cell [siman-1][seif-1]
 *      (only when commentary grid seif count == mechaber seif count — aligned)
 *
 * Apply only when candidate HE <br>-segment count === live EN count,
 * and candidate HE is fuller than live HE.
 *
 *   node restore_he_from_sefaria_pulls.mjs --dry-run --volume oc1
 *   node restore_he_from_sefaria_pulls.mjs --apply --volume oc1 --max-fixes 200
 *   node restore_he_from_sefaria_pulls.mjs --apply --volumes oc1,yd1 --kinds he_missing,he_truncated_vs_multi_en
 *
 * After --apply: rebundle affected simanim (BUNDLE_CONCURRENCY=1).
 */
import fs from "fs";
import path from "path";
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
    editorialOutput: path.join(REPO, "newtry/OC_001/output"),
    editorialSlug: (slug) => (slug === "kaf-hachayim" ? "kaf-hachayyim" : slug),
    layerToSlug: OC_LAYER_TO_SLUG,
    slugFromLayerKey: ocSlugFromLayerKey,
  },
  yd1: {
    sefariaFolder: "Yoreh_Deah",
    hasSimanim: false,
    editorialOutput: path.join(REPO, "newtry/YD_001/output"),
    editorialSlug: (slug) => slug,
    layerToSlug: YD_LAYER_TO_SLUG,
    slugFromLayerKey: ydSlugFromLayerKey,
  },
  eh1: {
    sefariaFolder: "Even_HaEzer",
    hasSimanim: false,
    editorialOutput: path.join(REPO, "newtry/EH_001/output"),
    editorialSlug: (slug) => slug,
    layerToSlug: EH_LAYER_TO_SLUG,
    slugFromLayerKey: ehSlugFromLayerKey,
  },
  cm1: {
    sefariaFolder: "Choshen_Mishpat",
    hasSimanim: false,
    editorialOutput: path.join(REPO, "newtry/CM_001/output"),
    editorialSlug: (slug) => slug,
    layerToSlug: CM_LAYER_TO_SLUG,
    slugFromLayerKey: cmSlugFromLayerKey,
  },
};

const DEFAULT_KINDS = [
  "he_missing",
  "he_truncated_vs_multi_en",
  "en_has_more_segments",
];

function parseArgs(argv) {
  const out = {
    apply: false,
    volumes: ["oc1"],
    kinds: new Set(DEFAULT_KINDS),
    slug: null,
    maxFixes: Infinity,
    maxSimanim: null,
    corpusRoot: CORPUS_ROOT,
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
    else if (a === "--kinds")
      out.kinds = new Set(
        next()
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      );
    else if (a === "--slug") out.slug = next();
    else if (a === "--max-fixes") out.maxFixes = parseInt(next(), 10);
    else if (a === "--max-simanim") out.maxSimanim = parseInt(next(), 10);
    else if (a === "--corpus-root") out.corpusRoot = path.resolve(next());
    else if (a === "--help" || a === "-h") {
      console.log(`HE-only restore from Sefaria Pulls / editorial TXT

  --dry-run | --apply
  --volume oc1 | --volumes oc1,yd1
  --kinds he_missing,he_truncated_vs_multi_en,en_has_more_segments
  --slug <slug>  --max-fixes N  --max-simanim N`);
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

function layerToHtml(layer) {
  if (!layer) return "";
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
  if (cell == null) return "";
  if (typeof cell === "string") return cell;
  if (Array.isArray(cell)) {
    const flat = cell.map((x) => (typeof x === "string" ? x : JSON.stringify(x)));
    return flat.map((s) => s.trim()).filter(Boolean).join("<br>\n");
  }
  return String(cell);
}

/** Cache merged.json grids per commentary folder. */
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

/** Build slug → commentary folder from LAYER maps + directory scan. */
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
    // Guess folder from title: spaces→_, keep punctuation Sefaria uses
    const guess = layerKey.replace(/ /g, "_").replace(/'/g, "'");
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
    // OC kaf spelling
    if (slug === "kaf-hachayim" || slug === "kaf-hachayyim") {
      map.set("kaf-hachayim", folder);
      map.set("kaf-hachayyim", folder);
    }
  }

  map.set("mechaber", null); // special: mechaber/merged.json
  return map;
}

function heFromSimanimHtml(volCfg, siman, seifName, slug) {
  if (!volCfg.hasSimanim) return "";
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
    const t = readText(path.join(base, s, "he.html"));
    if (!visuallyEmpty(t)) return t;
  }
  return "";
}

function heFromSeifJson(volCfg, siman, seifNum, slug) {
  if (!volCfg.hasSimanim) return "";
  const jp = path.join(
    SEFARIA_ROOT,
    volCfg.sefariaFolder,
    "simanim",
    pad(siman),
    `seif-${pad(seifNum)}.json`
  );
  if (!fs.existsSync(jp)) return "";
  let doc;
  try {
    doc = JSON.parse(fs.readFileSync(jp, "utf8"));
  } catch {
    return "";
  }
  const layers = doc.layers || {};
  for (const [k, L] of Object.entries(layers)) {
    if (!L) continue;
    const s = volCfg.slugFromLayerKey(k);
    if (
      s === slug ||
      (slug === "kaf-hachayim" && (s === "kaf-hachayim" || s === "kaf-hachayyim"))
    ) {
      return layerToHtml(L);
    }
  }
  return "";
}

/**
 * Each editorial SOURCE BLOCK is one logical note. Internal <br> inside a block
 * must not create extra zip segments — collapse them so N blocks → N segments.
 */
function normalizeBlockHe(he) {
  return String(he || "")
    .replace(/(?:<br\s*\/?>\s*)+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function heFromEditorialTxt(volCfg, siman, seifNum, slug) {
  const outSlug = volCfg.editorialSlug(slug);
  const dir = path.join(volCfg.editorialOutput, `siman_${pad(siman)}`, outSlug);
  if (!fs.existsSync(dir)) return "";
  const blocks = [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => /^part-\d+\.txt$/i.test(f))
    .sort((a, b) => {
      const na = Number((/^part-(\d+)/i.exec(a) || [])[1]) || 0;
      const nb = Number((/^part-(\d+)/i.exec(b) || [])[1]) || 0;
      return na - nb;
    });
  for (const f of files) {
    const t = readText(path.join(dir, f));
    const blockRe =
      /\*{4} [^*\n]*SOURCE BLOCK \*{4}([\s\S]*?)\*{4} END BLOCK \*{4}/g;
    let m;
    while ((m = blockRe.exec(t))) {
      const body = m[1];
      const sm = body.match(/seif:\s*(\d+)/i);
      if (sm && parseInt(sm[1], 10) !== seifNum) continue;
      const hm = body.match(
        /\*{4} HEBREW \*{4}\r?\n([\s\S]*?)\r?\n\*{4} ENGLISH \*{4}/
      );
      if (hm && hm[1].trim()) {
        const norm = normalizeBlockHe(hm[1]);
        if (norm) blocks.push(norm);
      }
    }
  }
  if (!blocks.length) return "";
  return blocks.join("<br>\n");
}

function heFromMergedAligned(volCfg, slugToFolder, siman, seifNum, slug) {
  if (slug === "mechaber") {
    const p = path.join(
      SEFARIA_ROOT,
      volCfg.sefariaFolder,
      "mechaber",
      "merged.json"
    );
    if (!fs.existsSync(p)) return "";
    try {
      const grid = extractTextGrid(JSON.parse(fs.readFileSync(p, "utf8")));
      const row = grid?.[siman - 1];
      if (!Array.isArray(row)) return "";
      return normalizeSeifCell(row[seifNum - 1]);
    } catch {
      return "";
    }
  }
  const folder = slugToFolder.get(slug);
  if (!folder) return "";
  const grid = loadMergedGrid(volCfg, folder);
  const row = grid?.[siman - 1];
  if (!Array.isArray(row)) return "";
  const mechN = mechaberSeifCount(volCfg, siman);
  // Only use direct index when seif-aligned with mechaber
  if (mechN > 0 && row.length === mechN) {
    return normalizeSeifCell(row[seifNum - 1]);
  }
  return "";
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

function normEnKey(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9\u0590-\u05ff]+/g, " ")
    .trim()
    .slice(0, 80);
}

/** Same siman+slug donor HE when EN looks like the same note (duplicate placement). */
function heFromSiblingSimilar(corpusVolRoot, simanName, seifName, slug, liveEn) {
  const key = normEnKey(liveEn);
  if (key.length < 24) return "";
  const simDir = path.join(corpusVolRoot, simanName);
  let seifs;
  try {
    seifs = fs.readdirSync(simDir).filter((n) => n.startsWith("seif-"));
  } catch {
    return "";
  }
  let best = "";
  let bestScore = 0;
  for (const seif of seifs) {
    if (seif === seifName) continue;
    const he = readText(path.join(simDir, seif, slug, "he.html"));
    const en = readText(path.join(simDir, seif, slug, "en.html"));
    if (visuallyEmpty(he) || visuallyEmpty(en)) continue;
    const other = normEnKey(en);
    if (!other) continue;
    // prefix overlap
    let i = 0;
    const lim = Math.min(key.length, other.length);
    while (i < lim && key[i] === other[i]) i++;
    const score = i / Math.max(key.length, other.length);
    if (score > bestScore) {
      bestScore = score;
      best = he;
    }
  }
  if (bestScore >= 0.55) return best;
  return "";
}

function pickCandidate(
  volCfg,
  slugToFolder,
  corpusVolRoot,
  simanName,
  siman,
  seifName,
  seifNum,
  slug,
  liveEn,
  enN,
  heN
) {
  const sources = [
    {
      name: "sef_he_html",
      text: () => heFromSimanimHtml(volCfg, siman, seifName, slug),
    },
    {
      name: "sef_json_layer",
      text: () => heFromSeifJson(volCfg, siman, seifNum, slug),
    },
    {
      name: "editorial_txt",
      text: () => heFromEditorialTxt(volCfg, siman, seifNum, slug),
    },
    {
      name: "merged_aligned",
      text: () =>
        heFromMergedAligned(volCfg, slugToFolder, siman, seifNum, slug),
    },
    {
      name: "sibling_en_similar",
      text: () =>
        heFromSiblingSimilar(corpusVolRoot, simanName, seifName, slug, liveEn),
    },
  ];
  for (const src of sources) {
    const text = src.text();
    if (visuallyEmpty(text)) continue;
    const n = splitHtmlByBrSegments(text).length;
    if (n === enN && n > heN) {
      return { source: src.name, text, heN: n };
    }
  }
  // Diagnostics: best near-miss
  let near = null;
  for (const src of sources) {
    const text = src.text();
    if (visuallyEmpty(text)) continue;
    const n = splitHtmlByBrSegments(text).length;
    if (!near || Math.abs(n - enN) < Math.abs(near.heN - enN)) {
      near = { source: src.name, heN: n };
    }
  }
  return { source: null, text: "", heN: 0, near };
}

function processVolume(vol, opts) {
  const volCfg = VOLUME_CFG[vol];
  const liveRoot = path.join(opts.corpusRoot, vol);
  const result = {
    volume: vol,
    mismatched: 0,
    fixable: 0,
    applied: 0,
    unfixable: 0,
    byKind: {},
    bySource: {},
    affectedSimanim: new Set(),
    samples: [],
    unfixableSamples: [],
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
        result.affectedSimanim = [...result.affectedSimanim].sort(
          (a, b) => a - b
        );
        return result;
      }

      const liveHe = readText(path.join(slugDir, "he.html"));
      const liveEn = readText(path.join(slugDir, "en.html"));
      const lHe = splitHtmlByBrSegments(liveHe);
      const lEn = splitHtmlByBrSegments(liveEn);
      const liveCls = classify(lHe, lEn, liveHe, liveEn);
      if (!liveCls || !opts.kinds.has(liveCls.kind)) continue;

      result.mismatched++;
      result.byKind[liveCls.kind] = (result.byKind[liveCls.kind] || 0) + 1;
      const seifNum = parseInt(seif.replace(/\D/g, ""), 10);
      const rel = `${vol}/${simanName}/${seif}/${slug}`;

      const pick = pickCandidate(
        volCfg,
        slugToFolder,
        liveRoot,
        simanName,
        siman,
        seif,
        seifNum,
        slug,
        liveEn,
        liveCls.enN,
        liveCls.heN
      );

      if (!pick.source) {
        result.unfixable++;
        if (result.unfixableSamples.length < 40) {
          result.unfixableSamples.push({
            path: rel,
            kind: liveCls.kind,
            heN: liveCls.heN,
            enN: liveCls.enN,
            near: pick.near || null,
          });
        }
        continue;
      }

      result.fixable++;
      result.bySource[pick.source] = (result.bySource[pick.source] || 0) + 1;
      result.affectedSimanim.add(siman);

      if (result.samples.length < 40) {
        result.samples.push({
          path: rel,
          kind: liveCls.kind,
          source: pick.source,
          heN: liveCls.heN,
          enN: liveCls.enN,
          newHeN: pick.heN,
        });
      }

      if (opts.apply) {
        const dest = path.join(slugDir, "he.html");
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const out = pick.text.replace(/\r\n/g, "\n");
        fs.writeFileSync(dest, out.endsWith("\n") ? out : out + "\n", "utf8");
        result.applied++;
      }
    }
  }

  result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
  return result;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`[he-restore] corpus=${opts.corpusRoot}`);
  console.log(`[he-restore] sefaria=${SEFARIA_ROOT}`);
  console.log(
    `[he-restore] mode=${opts.apply ? "APPLY" : "DRY-RUN"} volumes=${opts.volumes.join(",")} kinds=${[...opts.kinds].join(",")}`
  );

  const all = [];
  for (const vol of opts.volumes) {
    console.log(`[he-restore] ${vol}…`);
    const t0 = Date.now();
    const r = processVolume(vol, opts);
    console.log(
      `[he-restore] ${vol}: mismatched=${r.mismatched} fixable=${r.fixable} applied=${r.applied} unfixable=${r.unfixable} (${Date.now() - t0}ms)`
    );
    console.log(`[he-restore] ${vol} byKind`, r.byKind);
    console.log(`[he-restore] ${vol} bySource`, r.bySource);
    console.log(
      `[he-restore] ${vol} affected simanim: ${r.affectedSimanim.length}`
    );
    all.push(r);
  }

  const outName = opts.apply
    ? "he_restore_apply_log.json"
    : "he_restore_dry_run.json";
  const outPath = path.join(OUT_DIR, outName);
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        at: new Date().toISOString(),
        apply: opts.apply,
        kinds: [...opts.kinds],
        results: all,
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  console.log(`[he-restore] log → ${outPath}`);

  if (opts.apply) {
    const simanimByVol = {};
    for (const r of all) {
      if (r.affectedSimanim?.length) simanimByVol[r.volume] = r.affectedSimanim;
    }
    fs.writeFileSync(
      path.join(OUT_DIR, "he_restore_affected_simanim.json"),
      JSON.stringify(simanimByVol, null, 2) + "\n",
      "utf8"
    );
  }

  // Mapping doc snippet
  const mapDoc = path.join(OUT_DIR, "SEFARIA_HE_RESTORE_MAP.md");
  const lines = [
    "# Sefaria Pulls → corpus HE restore",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Layout",
    "",
    "- `Sefaria Pulls/shulchan-arukh/{Orach_Chayim,Yoreh_Deah,Even_HaEzer,Choshen_Mishpat}/`",
    "  - `commentaries/<Sefaria_Title>/merged.json` — raw HE grids `[siman][seif]`",
    "  - `mechaber/merged.json`",
    "  - `simanim/SSS/seif-TTT.json` + `seif-TTT/<slug>/he.html` — **OC only** (processed)",
    "- Corpus: `public/corpus/{oc1,yd1,eh1,cm1}/simanN/seif-TTT/<slug>/{he,en}.html`",
    "- Editorial TXT: `newtry/{OC,YD,EH,CM}_001/output/siman_NNN/<slug>/part-*.txt`",
    "",
    "## Slug mapping",
    "",
    "Use `newtry/lib/{orach_chayim,yoreh_deah,even_ha_ezer,choshen_mishpat}_layer_slug.mjs`.",
    "Examples: `Kaf HaChayim…` → `kaf-hachayim`; YD RAE → `rabbi-akiva-eiger-yd`; YD PM → `peri-megadim-yd`.",
    "",
    "## Existing publish (avoid blind EN overwrite)",
    "",
    "- OC: `Sefaria Pulls/.../Orach_Chayim/tools/publish-oc-siman.mjs` (+ `export-seif-hebrew.mjs`, `sync-translated-siman-to-public.mjs`)",
    "- YD: `oc318-mobile-reader/scripts/publish-yd001-siman.mjs` writes **HE+EN** from TXT — not safe for EN-preserving restore",
    "- This script: **he.html only**",
    "",
    "## Dry-run / apply results",
    "",
  ];
  for (const r of all) {
    lines.push(
      `### ${r.volume}`,
      "",
      `- mismatched (target kinds): ${r.mismatched}`,
      `- fixable: ${r.fixable}`,
      `- applied: ${r.applied}`,
      `- unfixable: ${r.unfixable}`,
      `- byKind: ${JSON.stringify(r.byKind)}`,
      `- bySource: ${JSON.stringify(r.bySource)}`,
      `- affected simanim: ${r.affectedSimanim.length}`,
      ""
    );
  }
  fs.writeFileSync(mapDoc, lines.join("\n") + "\n", "utf8");
  console.log(`[he-restore] map → ${mapDoc}`);
}

main();
