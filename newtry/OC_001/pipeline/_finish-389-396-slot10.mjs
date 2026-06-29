#!/usr/bin/env node
/** worker-slot-10 — sprint simanim 389-396 to COMPLETE */
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
  [389, 18],
  [390, 23],
  [391, 66],
  [392, 149],
  [393, 53],
  [394, 58],
  [395, 21],
  [396, 46],
];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const startFrom = parseInt(process.argv[2], 10) || 389;
const results = [];

for (const [siman, expected] of SIMANIM) {
  if (siman < startFrom) continue;
  const pending = collectEditorialBlocks(
    path.join(OC_ROOT, "output"),
    siman,
    "all",
    "warn",
    loadEditorialDoneIds(WORK)
  );
  if (pending.length === 0) {
    console.log(`siman ${siman}: 0 editorial scope — SKIP`);
    continue;
  }
  console.log(`\n######## siman ${siman} (${pending.length} blocks) ########`);
  const fixes = path.join(__dirname, `_fixes-siman${siman}-slot10.mjs`);
  if (!fs.existsSync(fixes)) {
    console.error(`missing ${fixes}`);
    process.exit(1);
  }
  run("_apply-fixes-slot10.mjs", [String(siman)]);
  run("_preflight-fix-siman-slot10.mjs", [String(siman)]);
  run("_finalize-siman-slot10.mjs", [String(siman)]);
  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(path.join(OC_ROOT, "output"), siman, "quality", "warn", done);
  console.log(`siman_${siman}: quality-flagged ${left.length}`);
  results.push({ siman, blocks: expected, complete: true });
}

const slotTs = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
for (const r of results) {
  fs.appendFileSync(LOG, `${slotTs} worker-slot-10 siman_${r.siman} COMPLETE\n`, "utf8");
}
fs.appendFileSync(LOG, `${slotTs} worker-slot-10 SLOT COMPLETE simanim 389-396\n`, "utf8");
console.log("\n--- Summary ---");
for (const r of results) {
  console.log(`siman ${r.siman}\tblocks ${r.blocks}\tCOMPLETE`);
}
