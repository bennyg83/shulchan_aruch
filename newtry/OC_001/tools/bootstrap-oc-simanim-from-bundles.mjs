#!/usr/bin/env node
/**
 * Bring Orach Chayim simanim (default 21–697) into the same editorial tree as simanim 2–20:
 *   `newtry/OC_001/output/siman_NNN/<slug>/part-*.txt`
 * by running `extract_oc001_from_sefaria_bundle.mjs` per siman.
 *
 * Source bundles (Hebrew + segmentation):
 *   `Sefaria Pulls/shulchan-arukh/Orach_Chayim/simanim/NNN/seif-MMM.json`
 *
 * Safety:
 *   `--skip-existing` — if `output/siman_NNN/manifest.json` already exists, skip that siman
 *     so work under `siman_001` … `siman_020` (and any later translated simanim) is never overwritten.
 *
 * Usage (from `newtry/OC_001`):
 *   node tools/bootstrap-oc-simanim-from-bundles.mjs --from 21 --to 697 --skip-existing
 *   node tools/bootstrap-oc-simanim-from-bundles.mjs --siman 318 --skip-existing
 *
 * After extract: translate in Cursor, then `npm run apply:dictionary`, then your mobile
 * publish steps (`Orach_Chayim/tools/prepare-mobile-oc-simanim.mjs`, etc.).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC001_ROOT = path.resolve(__dirname, "..");
const WORKSPACE = path.resolve(OC001_ROOT, "..", "..");
const EXTRACT = path.join(OC001_ROOT, "extract_oc001_from_sefaria_bundle.mjs");
const OC_SIMANIM = path.join(
  WORKSPACE,
  "Sefaria Pulls",
  "shulchan-arukh",
  "Orach_Chayim",
  "simanim"
);

function pad(n) {
  return String(n).padStart(3, "0");
}

function parseArgs() {
  let from = 21;
  let to = 697;
  let simanOnly = null;
  let skipExisting = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--siman" && a[i + 1]) simanOnly = Number(a[++i]);
    else if (a[i] === "--skip-existing") skipExisting = true;
  }
  if (simanOnly != null) {
    from = simanOnly;
    to = simanOnly;
  }
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from / --siman");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  return { from, to, skipExisting };
}

function readSeifCount(siman) {
  const metaPath = path.join(OC_SIMANIM, pad(siman), "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  const m = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  const n = Number(m.seif_count);
  return Number.isFinite(n) && n >= 1 ? n : null;
}

function runExtract(siman, seifTo) {
  const subdir = `siman_${pad(siman)}`;
  const r = spawnSync(
    process.execPath,
    [
      EXTRACT,
      "--siman",
      String(siman),
      "--from",
      "1",
      "--to",
      String(seifTo),
      "--bundle-root",
      OC_SIMANIM,
      "--out-subdir",
      subdir,
    ],
    { cwd: OC001_ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  );
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout || "extract failed");
    return false;
  }
  return true;
}

const { from, to, skipExisting } = parseArgs();

if (!fs.existsSync(EXTRACT)) {
  console.error("Missing:", EXTRACT);
  process.exit(1);
}
if (!fs.existsSync(OC_SIMANIM)) {
  console.error("Missing bundle tree:", OC_SIMANIM);
  process.exit(1);
}

console.log("Bundle root:", OC_SIMANIM);
console.log("OC001 root:", OC001_ROOT);
console.log("Range:", from, "–", to, skipExisting ? "(skip if manifest exists)" : "");

let ok = 0;
let skipped = 0;
let missingMeta = 0;
let failed = 0;

for (let siman = from; siman <= to; siman++) {
  const subdir = `siman_${pad(siman)}`;
  const manifestPath = path.join(OC001_ROOT, "output", subdir, "manifest.json");
  if (skipExisting && fs.existsSync(manifestPath)) {
    skipped++;
    continue;
  }
  const seifCount = readSeifCount(siman);
  if (seifCount == null) {
    console.warn(`[skip] siman ${siman}: no meta.json or bad seif_count`);
    missingMeta++;
    continue;
  }
  process.stdout.write(`Siman ${siman} (${seifCount} seifim) … `);
  if (!runExtract(siman, seifCount)) {
    console.log("FAIL");
    failed++;
    continue;
  }
  console.log("ok");
  ok++;
}

console.log("\nDone. extracted:", ok, "skipped (existing):", skipped, "missing meta:", missingMeta, "failed:", failed);
