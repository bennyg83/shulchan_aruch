#!/usr/bin/env node
/** Run full slot11 pipeline for one siman after _fixes-simanNNN-slot11.mjs exists */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("Usage: node run-siman-pipeline.mjs <siman>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const fixes = path.join(__dirname, `_fixes-siman${siman}-slot11.mjs`);

if (!fs.existsSync(fixes)) {
  console.error("Missing", fixes);
  process.exit(1);
}

function run(script, args = [], cwd = __dirname) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n=== siman ${siman} pipeline ===`);
run("_inject-hand-en-slot11.mjs", [String(siman), fixes]);
run("_hand-to-en-mjs.mjs", [String(siman)]);
run("_build-slot11-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot11.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot11.mjs`);
  batch++;
}
if (!fs.existsSync(path.join(__dirname, "work", `editorial-queue-siman-${siman}.json`))) {
  run("_refresh-editorial-queue.mjs", [String(siman)]);
}
run("sync-queue-from-output.mjs", [`work/editorial-queue-siman-${siman}.json`]);
run("_complete-siman-slot11.mjs", [String(siman)], OC_ROOT);
console.log(`[COMPLETE] siman_${siman}`);
