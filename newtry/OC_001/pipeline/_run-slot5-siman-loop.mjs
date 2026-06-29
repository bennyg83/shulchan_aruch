#!/usr/bin/env node
/**
 * Full slot5 loop for one siman: preflight → build batches → apply all → finalize
 * Usage: node pipeline/_run-slot5-siman-loop.mjs 221
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
// spawnSync used for editorial-advance below
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _run-slot5-siman-loop.mjs <siman>");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const handPath = path.join(WORK, `hand-slot5-siman-${siman}.json`);
if (!fs.existsSync(handPath)) {
  console.error("Missing hand translations:", handPath);
  process.exit(1);
}

run("_preflight-fix-siman-slot5.mjs", [String(siman)]);
run("_build-slot5-siman.mjs", [String(siman)]);

let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot5.mjs`))) {
  console.log(`\n=== applying batch ${batch} ===`);
  run(`_apply-siman${siman}-batch${batch}-slot5.mjs`);
  batch++;
}

const tag = String(siman).padStart(3, "0");
const adv = spawnSync(
  process.execPath,
  [
    path.join(__dirname, "editorial-advance.mjs"),
    "--siman",
    String(siman),
    "--queue",
    path.join(WORK, `editorial-queue-siman-${tag}.json`),
    "--skip-dictionary",
  ],
  { cwd: OC_ROOT, stdio: "inherit" }
);
if (adv.status !== 0) process.exit(adv.status ?? 1);

run("_finalize-siman-slot5.mjs", [String(siman)]);
console.log(`\n=== siman ${siman} COMPLETE ===`);
