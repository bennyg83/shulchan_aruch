/**
 * Remap Eliyah Rabbah TXT seif from ER note-number to Mechaber seif.
 * Uses dibbur-hamatchil lemma match + monotonic fill so overflow notes
 * (more ER notes than Mechaber seifim) stay in order and do not jump.
 *
 *   node remap_eliyah_rabbah_seif.mjs --dry-run
 *   node remap_eliyah_rabbah_seif.mjs --dry-run --siman 1
 *   node remap_eliyah_rabbah_seif.mjs --apply
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_OUT = path.resolve(__dirname, "../output");
const CORPUS = path.resolve(
  __dirname,
  "../../OC_Mobile/oc318-mobile-reader/public/corpus/oc1"
);
const AUDIT = path.resolve(__dirname, "../../SA_Rebuild/audit");

const args = process.argv.slice(2);
const dry = args.includes("--dry-run") || !args.includes("--apply");
const applyCorpus = args.includes("--corpus");
const onlySiman = (() => {
  const i = args.indexOf("--siman");
  return i >= 0 ? Number(args[i + 1]) : null;
})();

function stripHtml(s) {
  return String(s || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normHe(s) {
  return stripHtml(s)
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[״"׳']/g, "")
    .replace(/[^\u0590-\u05FF\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function noYud(s) {
  return String(s || "").replace(/י/g, "");
}

function extractLemma(he) {
  const bold = he.match(/<b>([\s\S]*?)<\/b>/i);
  let raw = bold ? stripHtml(bold[1]) : "";
  if (!raw) {
    const m = stripHtml(he).match(/^\[[^\]]+\]\s*(.+?)(?:\.|$)/);
    raw = m ? m[1] : "";
  }
  return raw.replace(/וכו['׳]?\s*$/g, "").replace(/[.:;,]+$/g, "").trim();
}

function lemmaTokens(lemma) {
  return normHe(lemma)
    .split(" ")
    .filter((w) => w.length >= 2 && !/^(וכו|כו|הגה|עיין|שם)$/.test(w));
}

function tokenIn(heNorm, heNY, token) {
  if (!token) return false;
  if (heNorm.includes(token)) return true;
  const tNY = noYud(token);
  return tNY.length >= 2 && heNY.includes(tNY);
}

function scoreSeif(heNorm, tokens) {
  if (!tokens.length || !heNorm) return 0;
  const heNY = noYud(heNorm);
  let found = 0;
  for (const t of tokens) if (tokenIn(heNorm, heNY, t)) found += 1;
  return found / tokens.length;
}

function loadMechaber(simDir) {
  const d = path.join(OC_OUT, simDir, "mechaber");
  if (!fs.existsSync(d)) return [];
  const files = fs.readdirSync(d).filter((n) => /^part-\d+\.txt$/i.test(n)).sort();
  const bySeif = new Map();
  for (const f of files) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      const seif = Number(b.seif);
      if (!seif) continue;
      const prev = bySeif.get(seif) || { seif, heNorm: "" };
      prev.heNorm = (prev.heNorm + " " + normHe(b.he)).trim();
      bySeif.set(seif, prev);
    }
  }
  return [...bySeif.values()].sort((a, b) => a.seif - b.seif);
}

function lisLocks(locks) {
  // longest non-decreasing subsequence by seif; prefer higher conf on ties
  if (!locks.length) return [];
  const n = locks.length;
  const len = Array(n).fill(1);
  const prev = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (locks[j].seif <= locks[i].seif && len[j] + 1 >= len[i]) {
        const better =
          len[j] + 1 > len[i] ||
          (len[j] + 1 === len[i] && locks[j].conf + locks[i].conf >= (locks[prev[i]]?.conf || 0) + locks[i].conf);
        if (better) {
          len[i] = len[j] + 1;
          prev[i] = j;
        }
      }
    }
  }
  let best = 0;
  for (let i = 1; i < n; i++) if (len[i] > len[best] || (len[i] === len[best] && locks[i].conf > locks[best].conf)) best = i;
  const out = [];
  for (let i = best; i >= 0; i = prev[i]) {
    out.push(locks[i]);
    if (prev[i] === -1) break;
  }
  return out.reverse();
}

function bestInRange(scores, lo, hi, fallback) {
  let bestS = fallback;
  let bestV = -1;
  for (const [seif, sc] of scores) {
    if (seif < lo || seif > hi) continue;
    if (sc > bestV || (sc === bestV && seif < bestS)) {
      bestV = sc;
      bestS = seif;
    }
  }
  return bestS;
}

function assignSeifim(notes, mechList) {
  const seifs = mechList.map((m) => m.seif);
  const minS = seifs[0] ?? 1;
  const maxS = seifs[seifs.length - 1] ?? 1;
  const n = notes.length;
  const assigned = Array(n).fill(null);
  const how = Array(n).fill("unmatched");

  const locks = [];
  for (let i = 0; i < n; i++) {
    const ranked = [...notes[i].scores.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    const best = ranked[0] || [null, 0];
    const second = ranked[1] || [null, 0];
    if (best[0] != null && best[1] >= 0.7 && (ranked.filter((x) => x[1] >= 0.7).length === 1 || best[1] - second[1] >= 0.15)) {
      locks.push({ i, seif: best[0], conf: best[1] >= 0.99 ? 3 : 2, kind: "strong" });
    } else if (best[0] != null && best[1] >= 0.5 && best[1] - second[1] >= 0.2) {
      locks.push({ i, seif: best[0], conf: 1, kind: "mid" });
    }
  }
  const kept = lisLocks(locks);
  for (const L of kept) {
    assigned[L.i] = L.seif;
    how[L.i] = L.kind;
  }

  const fill = (i0, i1, lo, hi) => {
    for (let i = i0; i <= i1; i++) {
      if (assigned[i] != null) continue;
      const s = bestInRange(notes[i].scores, lo, hi, lo);
      assigned[i] = s;
      how[i] = notes[i].scores.get(s) >= 0.4 ? "range_match" : "interpolate";
    }
  };

  if (!kept.length) {
    fill(0, n - 1, minS, maxS);
  } else {
    fill(0, kept[0].i - 1, minS, kept[0].seif);
    for (let k = 0; k < kept.length - 1; k++) {
      fill(kept[k].i + 1, kept[k + 1].i - 1, kept[k].seif, kept[k + 1].seif);
    }
    fill(kept[kept.length - 1].i + 1, n - 1, kept[kept.length - 1].seif, maxS);
  }

  // enforce non-decreasing
  for (let i = 1; i < n; i++) {
    if (assigned[i] < assigned[i - 1]) {
      assigned[i] = assigned[i - 1];
      how[i] = "monotonic";
    }
  }
  return { assigned, how };
}

function listPartFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => /^part-\d+\.txt$/i.test(n))
    .sort((a, b) => {
      const na = Number((/^part-(\d+)\.txt$/i.exec(a) || [])[1]) || 0;
      const nb = Number((/^part-(\d+)\.txt$/i.exec(b) || [])[1]) || 0;
      return na - nb;
    });
}

const report = [];
const simDirs = fs
  .readdirSync(OC_OUT)
  .filter((n) => /^siman_\d+$/.test(n))
  .sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)));

let filesWritten = 0;
let blocksChanged = 0;
let blocksSame = 0;
const corpusKeep = new Map(); // siman -> Set(seif)

for (const simDir of simDirs) {
  const siman = Number(simDir.replace("siman_", ""));
  if (onlySiman && siman !== onlySiman) continue;
  const erDir = path.join(OC_OUT, simDir, "eliyah-rabbah");
  if (!fs.existsSync(erDir)) continue;
  const mech = loadMechaber(simDir);
  if (!mech.length) continue;

  const fileBlocks = [];
  for (const fname of listPartFiles(erDir)) {
    const fpath = path.join(erDir, fname);
    const blocks = parseBlocksInFile(fs.readFileSync(fpath, "utf8"));
    fileBlocks.push({ fpath, fname, blocks });
  }
  const flat = [];
  for (const fb of fileBlocks) {
    fb.blocks.forEach((b, idx) => flat.push({ fb, idx, b }));
  }
  if (!flat.length) continue;

  const notes = flat.map(({ b }) => {
    const lemma = extractLemma(b.he);
    const tokens = lemmaTokens(lemma);
    const scores = new Map();
    for (const m of mech) scores.set(m.seif, scoreSeif(m.heNorm, tokens));
    return { lemma, tokens, scores, origSeif: Number(b.seif) };
  });

  const { assigned, how } = assignSeifim(notes, mech);
  const keep = new Set();
  for (let i = 0; i < flat.length; i++) {
    const from = Number(flat[i].b.seif);
    const to = assigned[i];
    keep.add(to);
    const changed = from !== to;
    if (changed) blocksChanged++;
    else blocksSame++;
    report.push({
      siman,
      part_file: flat[i].fb.fname,
      part_index: flat[i].idx,
      orig_seif: from,
      new_seif: to,
      how: how[i],
      lemma: notes[i].lemma,
      changed,
    });
    if (!dry && changed) {
      flat[i].b.seif = String(to);
      if (!flat[i].b.marker || flat[i].b.marker === "_") {
        flat[i].b.marker = String(from);
      }
    }
  }
  corpusKeep.set(siman, keep);

  if (!dry) {
    for (const fb of fileBlocks) {
      const out = fb.blocks.map((b) => serializeBlock(b)).join("\n") + "\n";
      fs.writeFileSync(fb.fpath, out, "utf8");
      filesWritten++;
    }
  }
}

function mergeField(blocks, field) {
  const parts = blocks.map((b) => String(b[field] || "").trim()).filter(Boolean);
  if (!parts.length) return "";
  return parts.join("<br />\n") + "\n";
}

function safeWrite(p, content) {
  const tmp = p + ".tmp";
  fs.writeFileSync(tmp, content, "utf8");
  try {
    fs.renameSync(tmp, p);
  } catch {
    try {
      fs.unlinkSync(p);
    } catch {}
    fs.renameSync(tmp, p);
  }
}

let corpusWrote = 0;
let corpusDeleted = 0;
if (!dry && applyCorpus) {
  const pad3 = (n) => String(n).padStart(3, "0");
  for (const [siman, keep] of corpusKeep) {
    const simanDir = path.join(OC_OUT, `siman_${pad3(siman)}`);
    const files = listPartFiles(path.join(simanDir, "eliyah-rabbah"));
    const bySeif = new Map();
    for (const fname of files) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(simanDir, "eliyah-rabbah", fname), "utf8"))) {
        const seif = Number(b.seif);
        if (!seif) continue;
        if (!bySeif.has(seif)) bySeif.set(seif, []);
        bySeif.get(seif).push(b);
      }
    }
    const outRoot = path.join(CORPUS, `siman${siman}`);
    if (!fs.existsSync(outRoot)) continue;
    for (const [seif, blocks] of bySeif) {
      const dest = path.join(outRoot, `seif-${pad3(seif)}`, "eliyah-rabbah");
      fs.mkdirSync(dest, { recursive: true });
      const he = mergeField(blocks, "he");
      const en = mergeField(blocks, "en");
      if (he) safeWrite(path.join(dest, "he.html"), he);
      if (en) safeWrite(path.join(dest, "en.html"), en);
      corpusWrote++;
    }
    for (const seifEnt of fs.readdirSync(outRoot, { withFileTypes: true })) {
      if (!seifEnt.isDirectory() || !/^seif-\d+$/.test(seifEnt.name)) continue;
      const seif = Number(seifEnt.name.replace("seif-", ""));
      const erDir = path.join(outRoot, seifEnt.name, "eliyah-rabbah");
      if (!fs.existsSync(erDir)) continue;
      if (keep.has(seif)) continue;
      fs.rmSync(erDir, { recursive: true, force: true });
      corpusDeleted++;
    }
  }
}

const changedRows = report.filter((r) => r.changed);
const byHow = {};
for (const r of report) byHow[r.how] = (byHow[r.how] || 0) + 1;
const siman1 = report.filter((r) => r.siman === 1);

fs.mkdirSync(AUDIT, { recursive: true });
const jsonPath = path.join(AUDIT, "oc1_eliyah_rabbah_seif_remap.json");
fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    {
      dry,
      applyCorpus,
      blocks: report.length,
      changed: changedRows.length,
      unchanged: blocksSame,
      filesWritten,
      corpusWrote,
      corpusDeleted,
      byHow,
      siman1,
      rows: report,
    },
    null,
    2
  )
);

console.log(
  JSON.stringify(
    {
      dry,
      applyCorpus,
      blocks: report.length,
      changed: changedRows.length,
      unchanged: blocksSame,
      filesWritten,
      corpusWrote,
      corpusDeleted,
      byHow,
      siman1: siman1.map((r) => `${r.orig_seif}→${r.new_seif} [${r.how}] ${r.lemma}`),
      report: jsonPath,
    },
    null,
    2
  )
);
