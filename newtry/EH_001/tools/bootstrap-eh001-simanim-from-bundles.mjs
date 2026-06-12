#!/usr/bin/env node
/**
 * Extract Even HaEzer simanim into `newtry/EH_001/output/siman_NNN/`.
 *
 *   node tools/bootstrap-yd-simanim-from-bundles.mjs --from 1 --to 178 --skip-existing
 *   node tools/bootstrap-yd-simanim-from-bundles.mjs --siman 87 --skip-existing
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EH001_ROOT = path.resolve(__dirname, "..");
const WORKSPACE = path.resolve(EH001_ROOT, "..", "..");
const EXTRACT = path.join(EH001_ROOT, "extract_eh001_from_sefaria_bundle.mjs");
const YD_SIMANIM = path.join(
  WORKSPACE,
  "Sefaria Pulls",
  "shulchan-arukh",
  "Even_HaEzer",
  "simanim"
);

function pad(n) {
  return String(n).padStart(3, "0");
}

function parseArgs() {
  let from = 1;
  let to = 178;
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
  const metaPath = path.join(YD_SIMANIM, pad(siman), "meta.json");
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
      YD_SIMANIM,
      "--out-subdir",
      subdir,
    ],
    { cwd: EH001_ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
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
if (!fs.existsSync(YD_SIMANIM)) {
  console.error("Missing bundle tree:", YD_SIMANIM);
  console.error("Run Even_HaEzer Phase A first (node tools/phase-a.mjs full)");
  process.exit(1);
}

console.log("Bundle root:", YD_SIMANIM);
console.log("EH001 root:", EH001_ROOT);
console.log("Range:", from, "–", to, skipExisting ? "(skip if manifest exists)" : "");

let ok = 0;
let skipped = 0;
let missingMeta = 0;
let failed = 0;

for (let siman = from; siman <= to; siman++) {
  const subdir = `siman_${pad(siman)}`;
  const manifestPath = path.join(EH001_ROOT, "output", subdir, "manifest.json");
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

console.log(
  "\nDone. extracted:",
  ok,
  "skipped (existing):",
  skipped,
  "missing meta:",
  missingMeta,
  "failed:",
  failed
);
