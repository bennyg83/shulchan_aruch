#!/usr/bin/env node
/** Full pipeline COMPLETE for simanim 459-462 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [459, 460, 461, 462];
const EXPECTED = { 459: 205, 460: 138, 461: 177, 462: 175 };

function run(script, args = []) {
  const fp = path.join(__dirname, script);
  const r = spawnSync(process.execPath, [fp, ...args], { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  console.log(`\n######## siman ${siman} (${EXPECTED[siman]} blocks) ########`);
  run("_export-he-slot11.mjs", [String(siman)]);
  run("_translate-hand-batch.mjs", [String(siman)]);
  run("_hand-to-en-mjs.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot11-from-en.mjs", [String(siman)]);
  run("_inject-hand-en-slot11.mjs", [String(siman), path.join(__dirname, `_fixes-siman${siman}-slot11.mjs`)]);
  run("_build-slot11-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot11.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot11.mjs`);
    batch++;
  }
  run("_complete-siman-slot11.mjs", [String(siman)]);
}

console.log("\n[COMPLETE] Session done — simanim: 459, 460, 461, 462");
