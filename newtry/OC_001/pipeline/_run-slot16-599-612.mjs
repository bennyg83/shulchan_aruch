#!/usr/bin/env node
/** worker-slot-16 — complete simanim 599-612 editorial pipeline */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612];
const EXPECTED = {
  599: 10,
  600: 56,
  601: 22,
  602: 38,
  603: 20,
  604: 37,
  605: 48,
  606: 122,
  607: 143,
  608: 99,
  609: 14,
  610: 85,
  611: 60,
  612: 177,
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
  return log.includes(`worker-slot-16 siman_${siman} COMPLETE`);
}

function handPipeline(siman) {
  console.log(`\n######## siman ${siman} ########`);
  if (!fs.existsSync(path.join(__dirname, "work", `hand-slot16-siman-${siman}.json`))) {
    run("_export-he-slot16.mjs", [String(siman)]);
    run("_gen-fixes-siman-slot16-from-en.mjs", [String(siman)]);
    run("_seed-hand-slot16-partial.mjs", [String(siman)]);
  }
  const fixes = path.join(__dirname, `_fixes-siman${siman}-slot16.mjs`);
  if (fs.existsSync(fixes)) run("_inject-hand-en-slot16.mjs", [String(siman), fixes]);
  const manual = path.join(__dirname, `_fixes-siman${siman}-manual-slot16.mjs`);
  if (fs.existsSync(manual)) run("_inject-hand-en-slot16.mjs", [String(siman), manual]);
  run("_translate-hand-batch-slot16.mjs", [String(siman)]);
  run("_force-seed-hand-slot16.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot16.mjs", [String(siman)]);
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot16.mjs"), String(siman)],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  if (audit.status !== 0) {
    console.error(audit.stdout || audit.stderr);
    process.exit(1);
  }
  const m = (audit.stdout || "").match(/\{[\s\S]*?"need":\s*\d+\s*\}/);
  const auditJson = JSON.parse(m[0]);
  if (auditJson.need > 0) {
    console.error(`siman ${siman}: ${auditJson.need} hand blocks still need translation`);
    process.exit(1);
  }
  run("_preflight-fix-siman-slot16.mjs", [String(siman)]);
  run("_build-slot16-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot16.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot16.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot16.mjs", [String(siman)]);
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
const slotLine = "worker-slot-16 SLOT COMPLETE simanim 599-612";
if (!fs.readFileSync(logPath, "utf8").includes(slotLine)) {
  fs.appendFileSync(
    logPath,
    `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} ${slotLine}\n`,
    "utf8"
  );
}

console.log("\n=== RESULTS ===");
console.log("siman\tblocks\tstatus");
for (const r of results) console.log(`${r.siman}\t${r.blocks}\t${r.status}`);
console.log("\n[DONE] simanim 599-612 slot16");
