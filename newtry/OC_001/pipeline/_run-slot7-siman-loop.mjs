#!/usr/bin/env node
/**
 * Full slot7 loop for one siman: preflight → build batches → apply all → finalize
 * Usage: node pipeline/_run-slot7-siman-loop.mjs 257
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _run-slot7-siman-loop.mjs <siman>");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const handPath = path.join(WORK, `hand-slot7-siman-${siman}.json`);
if (!fs.existsSync(handPath)) {
  console.error("Missing hand translations:", handPath);
  process.exit(1);
}

run("_preflight-fix-siman-slot7.mjs", [String(siman)]);
run("_build-slot7-siman.mjs", [String(siman)]);

let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot7.mjs`))) {
  console.log(`\n=== applying batch ${batch} ===`);
  run(`_apply-siman${siman}-batch${batch}-slot7.mjs`);
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

run("_finalize-siman-slot7.mjs", [String(siman)]);
console.log(`\n=== siman ${siman} COMPLETE ===`);
