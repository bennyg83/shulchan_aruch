#!/usr/bin/env node
/** Run slot15 editorial pipeline for simanim 577-588 (586 batched). */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588];
const EXPECTED = {
  577: 26,
  578: 9,
  579: 64,
  580: 61,
  581: 156,
  582: 160,
  583: 66,
  584: 86,
  585: 129,
  586: 465,
  587: 70,
  588: 100,
};

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function isComplete(siman) {
  const log = fs.readFileSync(path.join(OC_ROOT, "progress.log"), "utf8");
  return log.includes(`worker-slot-15 siman_${siman} COMPLETE`);
}

function handPipeline(siman) {
  console.log(`\n######## siman ${siman} ########`);
  run("_export-he-slot15.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot15-from-en.mjs", [String(siman)]);
  run("_seed-hand-slot15-partial.mjs", [String(siman)]);
  const manual = path.join(__dirname, `_fixes-siman${siman}-manual-slot15.mjs`);
  if (fs.existsSync(manual)) run("_inject-hand-en-slot15.mjs", [String(siman), manual]);
  const fixes = path.join(__dirname, `_fixes-siman${siman}-slot15.mjs`);
  if (fs.existsSync(fixes)) run("_inject-hand-en-slot15.mjs", [String(siman), fixes]);
  for (let b = 1; b <= 60; b++) {
    const hb = path.join(__dirname, `_hand${siman}-b${b}-en.mjs`);
    if (fs.existsSync(hb)) run("_inject-hand-en-slot15.mjs", [String(siman), hb]);
  }
  run("_force-seed-hand-slot15.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot15.mjs", [String(siman)]);
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot15.mjs"), String(siman)],
    { cwd: OC_ROOT,
      encoding: "utf8" }
  );
  if (audit.status !== 0) {
    console.error(audit.stdout || audit.stderr);
    process.exit(1);
  }
  const auditJson = JSON.parse(audit.stdout);
  if (auditJson.need > 0) {
    console.error(`siman ${siman}: ${auditJson.need} hand blocks still need translation`);
    process.exit(1);
  }
  run("_preflight-fix-siman-slot15.mjs", [String(siman)]);
  run("_build-slot15-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot15.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot15.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot15.mjs", [String(siman)]);
  run("_complete-siman-slot15.mjs", [String(siman)]);
}

const results = [];
for (const siman of SIMANIM) {
  if (isComplete(siman)) {
    console.log(`[skip] siman ${siman} already COMPLETE`);
    results.push({ siman, blocks: EXPECTED[siman], status: "COMPLETE" });
    continue;
  }
  handPipeline(siman);
  results.push({ siman, blocks: EXPECTED[siman], status: "COMPLETE" });
}

const logPath = path.join(OC_ROOT, "progress.log");
const slotLine = "worker-slot-15 SLOT COMPLETE simanim 577-588";
if (!fs.readFileSync(logPath, "utf8").includes(slotLine)) {
  fs.appendFileSync(logPath, `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} ${slotLine}\n`);
}

console.log("\n=== RESULTS ===");
console.log("siman\tblocks\tstatus");
for (const r of results) console.log(`${r.siman}\t${r.blocks}\t${r.status}`);
console.log("\n[DONE] simanim 577-588 slot15");
