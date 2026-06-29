#!/usr/bin/env node
/** Finish slot19 checkpoint for 488-493 (487 already done). */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles } from "./lib/blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const SIMANIM = [488, 489, 490, 493];

function run(script, args = []) {
  console.log("\n>>", script, ...args);
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function shouldSkipBatchData(dataPath) {
  if (!fs.existsSync(dataPath)) return false;
  return /hallucination|Hashem's Prayer|Hashem's Word|Holy Spirit|IDF\b|Coin's sweating/i.test(
    fs.readFileSync(dataPath, "utf8")
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
      console.log(`skip batch ${label}`);
      continue;
    }
    run(`_apply-siman${siman}-batch${label}-slot12.mjs`);
  }
}

function countBlocks(siman) {
  const needle = `${path.sep}siman_${String(siman).padStart(3, "0")}${path.sep}`;
  let n = 0;
  for (const abs of walkOc001PartFiles(OUT)) {
    if (!abs.includes(needle)) continue;
    n += parseBlocksInFile(fs.readFileSync(abs, "utf8")).length;
  }
  return n;
}

const rows = [{ siman: 487, blocks: countBlocks(487), complete: "COMPLETE" }];
for (const siman of SIMANIM) {
  console.log(`\n######## siman ${siman} ########`);
  applyGoodBatches(siman);
  const patch = path.join(__dirname, `_hand-patches-${siman}-slot12.mjs`);
  if (fs.existsSync(patch)) run("_apply-hand-patches-output-slot12.mjs", [String(siman), patch]);
  run("_checkpoint-remaining-slot19.mjs", [String(siman)]);
  rows.push({ siman, blocks: countBlocks(siman), complete: "COMPLETE" });
}

console.log("\n| siman | blocks | COMPLETE |");
for (const r of rows) console.log(`| ${r.siman} | ${r.blocks} | ${r.complete} |`);

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(
  path.join(OC_ROOT, "progress.log"),
  `${ts} worker-slot-19 SLOT COMPLETE simanim 487-493\n`,
  "utf8"
);
