#!/usr/bin/env node
/**
 * worker-slot-19: editorial checkpoint gap for simanim 487-493.
 * Re-exports + MT-fixes garbled siman 488; applies good batch scripts; checkpoints all.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles } from "./lib/blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const SIMANIM = [487, 488, 489, 490, 493];
const EXPECTED = { 487: 99, 488: 67, 489: 271, 490: 139, 493: 112 };

const GARBLED = [
  /hallucination/i,
  /day of the day of the day/i,
  /Hashem's Prayer/i,
  /Hashem's Word/i,
  /Holy Spirit/i,
  /High Court of Justice/i,
  /Coin's sweating/i,
  /\bIDF\b/,
  /Corin\b/,
  /Dr\. B\./i,
  /\bHOM\b/,
  /\bwe were in the HOM\b/i,
];

function run(script, args = []) {
  console.log("\n>>", script, ...args);
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function isComplete(siman) {
  const log = fs.readFileSync(path.join(OC_ROOT, "progress.log"), "utf8");
  return log.includes(`worker-slot-19 siman_${siman} COMPLETE`);
}

function countBlocks(siman) {
  const pad = String(siman).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  let n = 0;
  for (const abs of walkOc001PartFiles(OUT)) {
    if (!abs.includes(needle)) continue;
    n += parseBlocksInFile(fs.readFileSync(abs, "utf8")).length;
  }
  return n;
}

function countGarbled(siman) {
  const pad = String(siman).padStart(3, "0");
  const base = path.join(OUT, `siman_${pad}`);
  let n = 0;
  for (const slug of fs.readdirSync(base)) {
    const d = path.join(base, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!String(b.he ?? "").trim()) continue;
        const en = String(b.en ?? "");
        if (GARBLED.some((re) => re.test(en))) n++;
      }
    }
  }
  return n;
}

function shouldSkipBatchData(dataPath) {
  if (!fs.existsSync(dataPath)) return false;
  const text = fs.readFileSync(dataPath, "utf8");
  return /hallucination|Hashem's Prayer|Hashem's Word|the Bible|Holy Spirit|IDF\b|Coin's sweating/i.test(
    text
  );
}

function applyGoodBatches(siman) {
  const labels = [];
  for (const f of fs.readdirSync(__dirname)) {
    const m = f.match(new RegExp(`^_apply-siman${siman}-batch(.+)-slot12\\.mjs$`));
    if (m) labels.push(m[1]);
  }
  labels.sort((a, b) => {
    const na = /^\d+$/.test(a) ? parseInt(a, 10) : 999;
    const nb = /^\d+$/.test(b) ? parseInt(b, 10) : 999;
    if (na !== nb) return na - nb;
    return a.localeCompare(b);
  });
  for (const label of labels) {
    const dataPath = path.join(__dirname, `_siman${siman}-slot12-batch${label}-data.mjs`);
    if (shouldSkipBatchData(dataPath)) {
      console.log(`skip batch ${label} (garbled batch data)`);
      continue;
    }
    run(`_apply-siman${siman}-batch${label}-slot12.mjs`);
  }
}

const rows = [];
for (const siman of SIMANIM) {
  if (isComplete(siman)) {
    console.log(`\n######## siman ${siman} SKIP (slot19 COMPLETE) ########`);
    rows.push({ siman, blocks: countBlocks(siman), complete: "COMPLETE" });
    continue;
  }

  console.log(`\n######## siman ${siman} (expected ${EXPECTED[siman]}) ########`);

  if (siman === 488) {
    console.log(`garbled blocks before fix: ${countGarbled(siman)}`);
    run("_export-he-slot12.mjs", [String(siman)]);
    run("_slot12-to-he-export.mjs", [String(siman)]);
    run("_mt-retranslate-bad-siman.mjs", [String(siman)]);
    for (const patchName of ["_hand-patches-488-slot19.mjs", "_hand-patches-488-slot12.mjs"]) {
      const patchPath = path.join(__dirname, patchName);
      if (fs.existsSync(patchPath)) {
        run("_apply-hand-patches-output-slot12.mjs", [String(siman), patchPath]);
      }
    }
    console.log(`garbled blocks after MT: ${countGarbled(siman)}`);
    if (countGarbled(siman) > 0) {
      console.error(`siman ${siman}: still has garbled EN after MT`);
      process.exit(1);
    }
  } else {
    run("_export-he-slot12.mjs", [String(siman)]);
    const garbled = countGarbled(siman);
    if (garbled > 0) {
      console.log(`warning: ${garbled} garbled-like block(s); skipping MT (output already editorial)`);
    }
  }

  applyGoodBatches(siman);

  const patch = path.join(__dirname, `_hand-patches-${siman}-slot12.mjs`);
  if (fs.existsSync(patch)) {
    run("_apply-hand-patches-output-slot12.mjs", [String(siman), patch]);
  }

  run("_checkpoint-remaining-slot19.mjs", [String(siman)]);

  if (!isComplete(siman)) {
    console.error(`siman ${siman}: finalize did not log worker-slot-19 COMPLETE`);
    process.exit(1);
  }
  rows.push({ siman, blocks: countBlocks(siman), complete: "COMPLETE" });
}

console.log("\n| siman | blocks | COMPLETE |");
console.log("|------:|-------:|:--------:|");
for (const r of rows) {
  console.log(`| ${r.siman} | ${r.blocks} | ${r.complete} |`);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(
  path.join(OC_ROOT, "progress.log"),
  `${ts} worker-slot-19 SLOT COMPLETE simanim 487-493\n`,
  "utf8"
);
console.log("\nDONE", `${ts} worker-slot-19 SLOT COMPLETE simanim 487-493`);
