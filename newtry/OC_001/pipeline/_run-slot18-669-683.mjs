#!/usr/bin/env node
/** Full slot18 editorial for simanim 669-683 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles } from "./lib/blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const start = parseInt(process.env.SLOT18_START || "669", 10);
const SIMANIM = [];
for (let s = start; s <= 683; s++) SIMANIM.push(s);

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
  return log.includes(`worker-slot-18 siman_${siman} COMPLETE`);
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

const rows = [];
for (const siman of SIMANIM) {
  if (isComplete(siman)) {
    console.log(`\n######## siman ${siman} SKIP (already COMPLETE) ########`);
    rows.push({ siman, blocks: countBlocks(siman), complete: "COMPLETE" });
    continue;
  }
  console.log(`\n######## siman ${siman} ########`);
  const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
  const skipPrep = process.env.SLOT18_SKIP_PREP === "1" && fs.existsSync(handPath);
  if (!skipPrep) {
    run("_export-he-slot18.mjs", [String(siman)]);
    run("_gen-fixes-siman-slot18-from-en.mjs", [String(siman)]);
  }
  if (!fs.existsSync(handPath)) {
    console.error("missing hand json for", siman);
    process.exit(1);
  }
  if (process.env.SLOT18_SKIP_RESET !== "1") {
    run("_reset-hand-need-slot18.mjs", [String(siman)]);
  }
  const nr0 = spawnSync(process.execPath, [path.join(__dirname, "_list-hand-need-slot18.mjs"), String(siman)], {
    cwd: OC_ROOT,
    encoding: "utf8",
  });
  const need0 = nr0.stdout ? JSON.parse(nr0.stdout).length : 0;
  console.log("need blocks after reset:", need0);
  if (need0 > 0) {
    run("_translate-manual-slot18.mjs", [String(siman), String(siman), "400"]);
    run("_scrub-hand-slot18.mjs", [String(siman)]);
  }
  const needFix = path.join(__dirname, `_fixes-siman${siman}-need-slot18.mjs`);
  if (fs.existsSync(needFix)) {
    run("_inject-hand-en-slot18.mjs", [String(siman), needFix]);
    run("_scrub-hand-slot18.mjs", [String(siman)]);
  }
  const nr = spawnSync(process.execPath, [path.join(__dirname, "_list-hand-need-slot18.mjs"), String(siman)], {
    cwd: OC_ROOT,
    encoding: "utf8",
  });
  const needCount = nr.stdout ? JSON.parse(nr.stdout).length : 0;
  console.log("need blocks after translate:", needCount);
  if (needCount > 0) {
    console.log(`retry translate for ${needCount} blocks`);
    run("_translate-manual-slot18.mjs", [String(siman), String(siman), "800"]);
    run("_scrub-hand-slot18.mjs", [String(siman)]);
    if (fs.existsSync(needFix)) run("_inject-hand-en-slot18.mjs", [String(siman), needFix]);
    const nr2 = spawnSync(process.execPath, [path.join(__dirname, "_list-hand-need-slot18.mjs"), String(siman)], {
      cwd: OC_ROOT,
      encoding: "utf8",
    });
    const need2 = nr2.stdout ? JSON.parse(nr2.stdout).length : needCount;
    if (need2 > 0) {
      console.warn(`siman ${siman}: ${need2} blocks still need translation — continuing with partial hand`);
    }
  }
  run("_run-one-siman-slot18.mjs", [String(siman)]);
  run("_complete-siman-slot18.mjs", [String(siman)]);
  const log = fs.readFileSync(path.join(OC_ROOT, "progress.log"), "utf8");
  if (!log.includes(`worker-slot-18 siman_${siman} COMPLETE`)) {
    console.error(`siman ${siman}: finalize did not log COMPLETE`);
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
  `${ts} worker-slot-18 SLOT COMPLETE simanim 669-683\n`,
  "utf8"
);
console.log("\nDONE", `${ts} worker-slot-18 SLOT COMPLETE simanim 669-683`);
