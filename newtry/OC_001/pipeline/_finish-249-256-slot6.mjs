#!/usr/bin/env node
/** worker-slot-6 — sprint simanim 249-256 to COMPLETE */
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
  [249, 117],
  [250, 42],
  [251, 68],
  [252, 255],
  [253, 258],
  [254, 230],
  [255, 47],
  [256, 16],
];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function simanComplete(siman) {
  const done = loadEditorialDoneIds(WORK);
  return collectEditorialBlocks(path.join(OC_ROOT, "output"), siman, "all", "warn", done).length === 0;
}

const startFrom = parseInt(process.argv[2], 10) || 249;
const results = [];

for (const [siman, expected] of SIMANIM) {
  if (siman < startFrom) continue;
  if (simanComplete(siman)) {
    console.log(`siman ${siman}: already COMPLETE`);
    results.push({ siman, blocks: expected, complete: true });
    continue;
  }
  console.log(`\n######## siman ${siman} ########`);
  const handPath = path.join(WORK, `hand-slot6-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) {
    run("_export-he-slot6.mjs", [String(siman)]);
  }
  const missing = JSON.parse(fs.readFileSync(handPath, "utf8")).items.filter(
    (x) => !x.en || x.en.length < 8
  );
  if (missing.length) {
    console.error(`siman ${siman}: ${missing.length} blocks still need hand.en — inject first`);
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
  const ok = simanComplete(siman);
  results.push({ siman, blocks: expected, complete: ok });
  if (!ok) process.exit(1);
}

const slotTs = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(LOG, `${slotTs} worker-slot-6 SLOT COMPLETE simanim 249-256\n`, "utf8");
console.log("\n--- Summary ---");
for (const r of results) {
  console.log(`siman ${r.siman}\tblocks ${r.blocks}\t${r.complete ? "COMPLETE" : "INCOMPLETE"}`);
}
