/**
 * Build mechaber/en.html with OC_001 English woven into the Hebrew skeleton from the
 * bundle JSON (same <i data-commentator ...></i> hooks and structural tags as layers.mechaber.html).
 *
 * Strategy (low automation risk, good enough for reader + hook popovers):
 * - Split Hebrew HTML on self-closing <i ...></i> hook tags (preserve tags verbatim).
 * - For each text gap, weight = count of Hebrew letters (Unicode script); gaps with no Hebrew
 *   (whitespace only) or the siman heading line <b>דין ... סעיפים</b> keep structure and stay Hebrew.
 * - Split the OC_001 English string across gaps in proportion to those weights.
 * - If English contains "{Rama:" and Hebrew contains <small>...</small>, split English into main vs Rama
 *   and weave each part only into the corresponding Hebrew region.
 *
 * Source English: newtry/OC_001/output/mechaber/part-001.txt (or --oc001-subdir siman_NNN)
 * Source Hebrew: simanim/<siman>/seif-<seif>.json → layers.mechaber.html
 *
 * Usage (from Orach_Chayim):
 *   node tools/wire-mechaber-en-hooks-oc001.mjs --siman 1 --from 1 --to 9
 *   node tools/wire-mechaber-en-hooks-oc001.mjs --siman 2 --from 1 --to 6 --oc001-subdir siman_002
 *   node tools/wire-mechaber-en-hooks-oc001.mjs --siman 1 --seif 2
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { parseBlocksInFile, EN_PENDING_DEFAULT } from "../../../../newtry/OC_001/oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(OC, "..", "..", "..");
const OC001_OUTPUT_BASE = path.join(WORKSPACE_ROOT, "newtry", "OC_001", "output");

const pad = (n) => String(n).padStart(3, "0");

const HOOK_SPLIT = /(<i\b[^>]*><\/i>)/gi;

function parseArgs() {
  let siman = 1;
  let seif = null;
  let from = null;
  let to = null;
  let oc001Subdir = "";
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    else if (a[i] === "--seif" && a[i + 1]) seif = Number(a[++i]);
    else if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--oc001-subdir" && a[i + 1]) oc001Subdir = String(a[++i]).replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  }
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Invalid --siman");
  if (seif != null) {
    from = Number(seif);
    to = Number(seif);
  } else {
    if (from == null) from = 1;
    if (to == null) to = from;
  }
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from/--seif");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  const oc001Mechaber = path.join(
    oc001Subdir ? path.join(OC001_OUTPUT_BASE, oc001Subdir) : OC001_OUTPUT_BASE,
    "mechaber",
    "part-001.txt"
  );
  return { siman, from, to, oc001Mechaber };
}

function sha256(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

function writeAtomicWithBackup(targetPath, contents) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const tmp = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, contents, "utf8");
  if (fs.existsSync(targetPath)) {
    const before = sha256(targetPath);
    const after = sha256(tmp);
    if (before === after) {
      fs.unlinkSync(tmp);
      return { changed: false, backup: null };
    }
    const bak = `${targetPath}.bak-${new Date().toISOString().replace(/[:.]/g, "-")}`;
    fs.copyFileSync(targetPath, bak);
    fs.renameSync(tmp, targetPath);
    return { changed: true, backup: bak };
  }
  fs.renameSync(tmp, targetPath);
  return { changed: true, backup: null };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hebrewLetterCount(piece) {
  const textOnly = piece.replace(/<[^>]+>/g, "");
  return [...textOnly].filter((ch) => /\p{Script=Hebrew}/u.test(ch)).length;
}

function isSimanHeadingPiece(piece) {
  return /<b>דין\s+/u.test(piece) && /סעיפים/u.test(piece);
}

function splitMainAndRamaEnglish(en) {
  const s = String(en).trim();
  const idx = s.indexOf("{Rama:");
  if (idx === -1) return { main: s, rama: null };
  const main = s.slice(0, idx).trim();
  let rama = s.slice(idx + "{Rama:".length).trim();
  if (rama.endsWith("}")) rama = rama.slice(0, -1).trim();
  return { main, rama };
}

function extractSmallRegions(html) {
  const s = String(html);
  const open = /<small\b[^>]*>/iu.exec(s);
  if (!open) return { before: s, inner: null, after: "" };
  const oi = open.index;
  const openTag = open[0];
  const startInner = oi + openTag.length;
  const tail = s.slice(startInner);
  const close = tail.match(/<\/small\b\s*>/iu);
  if (!close) return { before: s, inner: null, after: "" };
  const ci = close.index;
  const inner = tail.slice(0, ci);
  const after = tail.slice(ci + close[0].length);
  return { before: s.slice(0, oi), inner, after };
}

/** Split English into roughly word-aligned chunks so hooks do not land mid-token. */
function splitEnglishByWeights(english, weights) {
  const w = weights.map((n) => Math.max(0, n));
  const sum = w.reduce((a, b) => a + b, 0);
  const e = String(english).trim();
  if (sum === 0) return w.map(() => "");
  const words = e.match(/\S+/g) || [e];
  const gaps = w.length;
  const raw = w.map((wt) => (sum > 0 ? (words.length * wt) / sum : 0));
  const counts = raw.map((x) => Math.floor(x));
  let used = counts.reduce((a, b) => a + b, 0);
  let rem = words.length - used;
  const order = raw
    .map((frac, i) => ({ i, frac: frac - Math.floor(frac) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < order.length && rem > 0; k++) {
    counts[order[k].i]++;
    rem--;
  }
  const out = new Array(gaps).fill("");
  let wi = 0;
  for (let i = 0; i < gaps; i++) {
    const take = Math.min(counts[i], words.length - wi);
    if (take <= 0) continue;
    out[i] = words.slice(wi, wi + take).join(" ");
    wi += take;
  }
  if (wi < words.length && gaps > 0) {
    const li = gaps - 1;
    out[li] = (out[li] ? `${out[li]} ` : "") + words.slice(wi).join(" ");
  }
  return out;
}

function gapWeight(piece) {
  if (/^<i\b[^>]*><\/i>$/i.test(piece)) return -1;
  if (!/\p{Script=Hebrew}/u.test(piece.replace(/<[^>]+>/g, ""))) return 0;
  if (isSimanHeadingPiece(piece)) return 0;
  return hebrewLetterCount(piece);
}

function weaveProportional(hebrewHtml, englishPlain) {
  const pieces = hebrewHtml.split(HOOK_SPLIT);
  const weights = pieces.map(gapWeight);
  const engSlices = splitEnglishByWeights(
    englishPlain,
    weights.map((w) => (w < 0 ? 0 : w))
  );
  return pieces
    .map((p, idx) => {
      if (/^<i\b[^>]*><\/i>$/i.test(p)) return p;
      const gw = weights[idx] < 0 ? 0 : weights[idx];
      if (gw === 0) return p;
      return replaceHebrewSpanWithEnglish(p, engSlices[idx] ?? "");
    })
    .join("");
}

/** Replace the contiguous span from first to last Hebrew character (outside HTML tags) with English. */
function replaceHebrewSpanWithEnglish(piece, english) {
  const esc = escapeHtml(english);
  let inTag = false;
  let first = -1;
  let last = -1;
  for (let i = 0; i < piece.length; i++) {
    const ch = piece[i];
    if (ch === "<") inTag = true;
    else if (ch === ">") inTag = false;
    else if (!inTag && /\p{Script=Hebrew}/u.test(ch)) {
      if (first < 0) first = i;
      last = i;
    }
  }
  if (first < 0) return piece;
  let end = last + 1;
  while (end < piece.length && /[\s:׃]/.test(piece[end])) end++;
  return piece.slice(0, first) + esc + piece.slice(end);
}

/** Trim doubled clause punctuation left when Hebrew sof pasuq / colon sat outside the Hebrew span. */
function normalizeWovenHtml(s) {
  return String(s)
    .replace(/\.:\s*(<small\b[^>]*>)/giu, ". $1")
    .replace(/\)\s*:\s*<\/small\b\s*>/giu, ".</small>")
    .replace(/\.:\s*$/gmu, ".")
    .replace(/\.\.(\s*<\/small\b\s*>)/giu, ".$1")
    .replace(/([a-z"'’>])(<i\b)/giu, "$1 $2")
    .replace(/(<\/i>)([a-z])/giu, "$1 $2")
    .replace(/  +/g, " ");
}

function wireMechaberLayerHtml(hebrewHtml, englishFull) {
  const { main: enMain, rama: enRama } = splitMainAndRamaEnglish(englishFull);
  const { before, inner, after } = extractSmallRegions(hebrewHtml);
  if (inner == null) return normalizeWovenHtml(weaveProportional(hebrewHtml, englishFull));
  const wovenBefore = weaveProportional(before, enMain);
  const wovenSmall = weaveProportional(inner, enRama ?? "");
  return normalizeWovenHtml(`${wovenBefore}<small>${wovenSmall}</small>${after}`);
}

function loadMechaberEnglishForSeif(oc001MechaberPath, seif) {
  if (!fs.existsSync(oc001MechaberPath)) return null;
  const raw = fs.readFileSync(oc001MechaberPath, "utf8");
  const blocks = parseBlocksInFile(raw);
  const parts = blocks
    .filter((b) => Number(b.seif) === Number(seif))
    .map((b) => String(b.en ?? "").trim())
    .filter((e) => e && e !== EN_PENDING_DEFAULT);
  if (parts.length === 0) return null;
  return parts.join("\n\n");
}

function loadBundleMechaberHtml(siman, seif) {
  const jsonPath = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}.json`);
  if (!fs.existsSync(jsonPath)) return { error: `missing ${jsonPath}` };
  const j = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const layer = j.layers?.mechaber;
  if (!layer || layer.kind !== "html" || !layer.html) return { error: "no layers.mechaber html" };
  return { html: String(layer.html) };
}

const { siman, from, to, oc001Mechaber } = parseArgs();

if (!fs.existsSync(oc001Mechaber)) {
  console.error("Missing OC001 mechaber source:", oc001Mechaber);
  console.error("Run extract_oc001_from_sefaria_bundle.mjs with matching --out-subdir first.");
  process.exit(1);
}

for (let seif = from; seif <= to; seif++) {
  const tag = `siman ${siman} seif ${seif}`;
  const en = loadMechaberEnglishForSeif(oc001Mechaber, seif);
  if (!en) {
    console.log(`${tag}: skip (no OC001 English)`);
    continue;
  }
  const he = loadBundleMechaberHtml(siman, seif);
  if (he.error) {
    console.log(`${tag}: skip (${he.error})`);
    continue;
  }
  const out = wireMechaberLayerHtml(he.html, en) + "\n";
  const outPath = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}`, "mechaber", "en.html");
  const r = writeAtomicWithBackup(outPath, out);
  console.log(`${tag}: ${r.changed ? "UPDATED" : "no change"} → ${outPath}`);
}
