#!/usr/bin/env node
/** Full pipeline COMPLETE for simanim 463-466 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [463, 464, 465, 466];
const EXPECTED = { 463: 60, 464: 25, 465: 65, 466: 159 };
const SKIP_TRANSLATE = new Set([464]); // already hand-translated

function run(script, args = []) {
  const fp = path.join(__dirname, script);
  const r = spawnSync(process.execPath, [fp, ...args], { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  console.log(`\n######## siman ${siman} (${EXPECTED[siman]} blocks) ########`);
  if (!SKIP_TRANSLATE.has(siman)) {
    run("_export-he-slot11.mjs", [String(siman)]);
    run("_translate-hand-batch.mjs", [String(siman)]);
    run("_hand-to-en-mjs.mjs", [String(siman)]);
    run("_gen-fixes-siman-slot11-from-en.mjs", [String(siman)]);
    run("_inject-hand-en-slot11.mjs", [
      String(siman),
      path.join(__dirname, `_fixes-siman${siman}-slot11.mjs`),
    ]);
  } else if (!fs.existsSync(path.join(__dirname, `_fixes-siman${siman}-slot11.mjs`))) {
    console.error(`missing fixes for siman ${siman}`);
    process.exit(1);
  }
  run("_build-slot11-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot11.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot11.mjs`);
    batch++;
  }
  run("_complete-siman-slot11.mjs", [String(siman)]);
}

console.log("\n[COMPLETE] Session done — simanim: 463, 464, 465, 466");
