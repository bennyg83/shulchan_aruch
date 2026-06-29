#!/usr/bin/env node
/** worker-slot-18 — simanim 669-683 editorial COMPLETE */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles } from "./lib/blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const SIMANIM = [];
for (let s = 669; s <= 683; s++) SIMANIM.push(s);

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

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const rows = [];
for (const siman of SIMANIM) {
  const blocks = countBlocks(siman);
  console.log(`\n######## siman ${siman} (${blocks} blocks) ########`);
  run("_run-one-siman-slot18.mjs", [String(siman)]);
  run("_complete-siman-slot18.mjs", [String(siman)]);
  rows.push({ siman, blocks, complete: "COMPLETE" });
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
console.log("\n[COMPLETE] Session done — simanim: 669-683");
