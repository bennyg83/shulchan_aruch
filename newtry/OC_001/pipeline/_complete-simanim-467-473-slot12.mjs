#!/usr/bin/env node
/** Full pipeline COMPLETE for worker-slot-12 simanim 467-473 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [467, 468, 470, 471, 472, 473];
const EXPECTED = { 467: 558, 468: 193, 470: 61, 471: 106, 472: 288, 473: 332 };
const SKIP = new Set([469]);

function run(script, args = []) {
  const fp = path.join(__dirname, script);
  const r = spawnSync(process.execPath, [fp, ...args], { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  if (SKIP.has(siman)) continue;
  console.log(`\n######## siman ${siman} (${EXPECTED[siman]} blocks) ########`);
  const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) {
    const legacy = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
    if (fs.existsSync(legacy)) {
      fs.copyFileSync(legacy, handPath);
      console.log("seeded hand from slot11", siman);
    }
  }
  const hand11 = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
  if (!fs.existsSync(handPath) && fs.existsSync(hand11)) {
    fs.copyFileSync(hand11, handPath);
    console.log("seeded hand from slot11", siman);
  }
  if (!fs.existsSync(handPath)) run("_export-he-slot12.mjs", [String(siman)]);
  if (siman === 467 && fs.existsSync(path.join(__dirname, "_inject-467-partial-slot12.mjs"))) {
    run("_inject-467-partial-slot12.mjs");
  }
  run("_translate-hand-batch-slot12.mjs", [String(siman)]);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const need = (hand.items || []).filter((it) => !it.en || !String(it.en).trim()).length;
  if (need) {
    console.error(`siman ${siman}: ${need} blocks still missing en after translate`);
    process.exit(1);
  }
  run("_hand-to-en-mjs-slot12.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot12-from-en.mjs", [String(siman)]);
  run("_inject-hand-en-slot12.mjs", [
    String(siman),
    path.join(__dirname, `_fixes-siman${siman}-slot12.mjs`),
  ]);
  run("_build-slot12-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot12.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot12.mjs`);
    batch++;
  }
  run("_complete-siman-slot12.mjs", [String(siman)]);
}

console.log("\n[COMPLETE] Session done — simanim: 467, 468, 470, 471, 472, 473");
