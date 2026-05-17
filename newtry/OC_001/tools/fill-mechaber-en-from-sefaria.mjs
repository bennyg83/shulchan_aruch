/**
 * Fill OC001 mechaber **** ENGLISH **** from Sefaria's public API (Sefaria Community Translation),
 * for blocks that still use EN_PENDING_DEFAULT. Mechaber + Rema: one HTML layer per seif → one block
 * (slug mechaber, marker main); Rema in <small> becomes `{Rama: ...}` for wire-mechaber-en-hooks-oc001.mjs.
 *
 * Plain text only in English (no <b>/<i>) so the wirer’s escapeHtml path stays clean.
 *
 * Usage (from newtry/OC_001):
 *   node tools/fill-mechaber-en-from-sefaria.mjs --from 1 --to 697
 *   node tools/fill-mechaber-en-from-sefaria.mjs --siman 685 --dry-run
 *
 * Afterward (Orach_Chayim root): publish simanim you care about, e.g.
 *   node tools/prepare-mobile-oc-simanim.mjs --from 1 --to 697 --skip-rebuild --skip-extract
 * or per-siman publish-oc-siman.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock, EN_PENDING_DEFAULT } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC001_ROOT = path.resolve(__dirname, "..");
const OC = path.resolve(OC001_ROOT, "..", "..", "Sefaria Pulls", "shulchan-arukh", "Orach_Chayim");

const SEFARIA_TEXT = "https://www.sefaria.org/api/texts";
const pad = (n) => String(n).padStart(3, "0");

function parseArgs() {
  let from = 1;
  let to = 697;
  let dry = false;
  let sleepMs = 180;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--siman" && a[i + 1]) {
      const v = Number(a[++i]);
      from = v;
      to = v;
    } else if (a[i] === "--dry-run") dry = true;
    else if (a[i] === "--sleep-ms" && a[i + 1]) sleepMs = Math.max(0, Number(a[++i]) || 0);
  }
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  return { from, to, dry, sleepMs };
}

function mechaberPartPath(siman) {
  if (siman === 1) return path.join(OC001_ROOT, "output", "mechaber", "part-001.txt");
  return path.join(OC001_ROOT, "output", `siman_${pad(siman)}`, "mechaber", "part-001.txt");
}

function readSeifCount(siman) {
  const metaPath = path.join(OC, "simanim", pad(siman), "meta.json");
  if (!fs.existsSync(metaPath)) throw new Error(`Missing meta for siman ${siman}`);
  const n = Number(JSON.parse(fs.readFileSync(metaPath, "utf8")).seif_count);
  if (!Number.isFinite(n) || n < 1) throw new Error(`Bad seif_count siman ${siman}`);
  return n;
}

function stripTagsToPlain(html) {
  return String(html ?? "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/gi, " ")
    .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Sefaria English HTML → plain string for wire-mechaber; <small>…</small> → `{Rama: …}` (multiple smalls joined). */
function sefariaHtmlToWireEnglish(html) {
  let s = String(html ?? "").trim();
  if (!s) return "";
  const ramas = [];
  for (let guard = 0; guard < 30; guard++) {
    const m = s.match(/<small\b[^>]*>([\s\S]*?)<\/small\b\s*>/i);
    if (!m) break;
    ramas.push(stripTagsToPlain(m[1]));
    s = s.slice(0, m.index) + s.slice(m.index + m[0].length);
  }
  let main = stripTagsToPlain(s);
  if (ramas.length) {
    let r = ramas.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
    r = r.replace(/^Rema:\s*/i, "").trim();
    return r ? `${main} {Rama: ${r}}` : main;
  }
  return main;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchSefariaEnglish(siman, seif) {
  const url = `${SEFARIA_TEXT}/Shulchan_Arukh,_Orach_Chayim.${siman}.${seif}?commentary=0&context=0`;
  const r = await fetch(url, {
    headers: {
      "User-Agent": "OC001-fill-mechaber-en/1.0 (local pipeline; contact repo owner)",
    },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  let t = j.text;
  if (Array.isArray(t)) t = t.map((x) => String(x ?? "").trim()).filter(Boolean).join(" ");
  if (t == null) throw new Error("no text field");
  return String(t);
}

function rebuildMechaberFile(blocks) {
  return blocks.map((b) => serializeBlock(b)).join("\n") + "\n";
}

const { from, to, dry, sleepMs } = parseArgs();

let updatedFiles = 0;
let updatedBlocks = 0;
let skipped = 0;
let skippedNoPending = 0;
let errors = 0;
let sefariaEmpty = 0;

for (let siman = from; siman <= to; siman++) {
  const partPath = mechaberPartPath(siman);
  if (!fs.existsSync(partPath)) {
    console.warn(`skip siman ${siman}: missing ${path.relative(OC001_ROOT, partPath)}`);
    skipped++;
    continue;
  }
  const raw = fs.readFileSync(partPath, "utf8");
  const blocks = parseBlocksInFile(raw);
  const hasPending = blocks.some(
    (b) =>
      b.slug === "mechaber" &&
      String(b.marker) === "main" &&
      String(b.en ?? "").trim() === EN_PENDING_DEFAULT
  );
  if (!hasPending) {
    skippedNoPending++;
    continue;
  }
  let changed = false;
  const seifCount = readSeifCount(siman);

  for (let seif = 1; seif <= seifCount; seif++) {
    const bi = blocks.findIndex(
      (b) => b.slug === "mechaber" && String(b.marker) === "main" && Number(b.seif) === seif
    );
    if (bi < 0) {
      console.warn(`siman ${siman} seif ${seif}: no mechaber main block`);
      continue;
    }
    const en = String(blocks[bi].en ?? "").trim();
    if (en !== EN_PENDING_DEFAULT) continue;

    let wireEn = "";
    try {
      if (sleepMs) await sleep(sleepMs);
      const sefHtml = await fetchSefariaEnglish(siman, seif);
      wireEn = sefariaHtmlToWireEnglish(sefHtml);
      if (!wireEn) {
        sefariaEmpty++;
        console.warn(`EMPTY siman ${siman} seif ${seif} (Sefaria has no English for this ref)`);
        continue;
      }
    } catch (e) {
      errors++;
      console.error(`FAIL siman ${siman} seif ${seif}:`, String(e.message || e));
      continue;
    }

    blocks[bi] = { ...blocks[bi], en: wireEn };
    changed = true;
    updatedBlocks++;
    console.log(`${dry ? "[dry] " : ""}OK siman ${siman} seif ${seif} (${wireEn.length} chars)`);
  }

  if (changed && !dry) {
    fs.writeFileSync(partPath, rebuildMechaberFile(blocks), "utf8");
    updatedFiles++;
  } else if (changed && dry) {
    updatedFiles++;
  }
}

console.log(
  `\nDone. filesWritten=${dry ? 0 : updatedFiles} blocksUpdated=${updatedBlocks} dryRun=${dry} sleepMs=${sleepMs} errors=${errors} sefariaEmpty=${sefariaEmpty} skippedMissing=${skipped} skippedNoPending=${skippedNoPending}`
);
