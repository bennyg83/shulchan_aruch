#!/usr/bin/env node
/** worker-slot-6 — sprint simanim 273-280 to COMPLETE */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const LOG = path.join(OC_ROOT, "progress.log");

const SIMANIM = [
  [273, 170],
  [274, 68],
  [275, 174],
  [276, 169],
  [277, 124],
  [278, 26],
  [279, 157],
  [280, 41],
];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const startFrom = parseInt(process.argv[2], 10) || 273;
const results = [];

for (const [siman, expected] of SIMANIM) {
  if (siman < startFrom) continue;
  console.log(`\n######## siman ${siman} ########`);
  const fixes = path.join(__dirname, `_fixes-siman${siman}-slot6.mjs`);
  if (fs.existsSync(fixes)) {
    run("_inject-hand-slot6.mjs", [String(siman), fixes]);
  }
  run("_force-seed-hand-slot6.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot6.mjs", [String(siman)]);
  const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot6.mjs"), String(siman)], {
    cwd: OC_ROOT,
    encoding: "utf8",
  });
  if (audit.status !== 0) {
    console.error(audit.stdout || audit.stderr);
    process.exit(1);
  }
  const auditJson = JSON.parse(audit.stdout);
  if (auditJson.need > 0) {
    console.error(`siman ${siman}: ${auditJson.need} hand blocks still need translation`);
    process.exit(1);
  }
  run("_preflight-fix-siman-slot6.mjs", [String(siman)]);
  run("_build-slot6-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot6.mjs`))) {
    console.log(`=== applying batch ${batch} ===`);
    run(`_apply-siman${siman}-batch${batch}-slot6.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot6.mjs", [String(siman)]);
  run("_mark-siman-slot6-complete.mjs", [String(siman)]);
  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(path.join(OC_ROOT, "output"), siman, "quality", "warn", done);
  console.log(`siman_${siman}: quality-flagged ${left.length}`);
  results.push({ siman, blocks: expected, complete: true });
}

const slotTs = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(LOG, `${slotTs} worker-slot-6 SLOT COMPLETE simanim 273-280\n`, "utf8");
console.log("\n--- Summary ---");
for (const r of results) {
  console.log(`siman ${r.siman}\tblocks ${r.blocks}\tCOMPLETE`);
}
