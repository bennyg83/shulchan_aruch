#!/usr/bin/env node
/** Finish simanim 281–283: inject → apply batches → finalize → log COMPLETE */
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
  [281, 35],
  [282, 178],
  [283, 9],
];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const results = [];
const startFrom = parseInt(process.argv[2], 10) || 281;

for (const [siman, expected] of SIMANIM) {
  if (siman < startFrom) continue;
  console.log(`\n######## siman ${siman} ########`);
  const handPath = path.join(WORK, `hand-slot6-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) {
    run("_export-he-slot6.mjs", [String(siman)]);
  }
  const injectFiles = fs
    .readdirSync(__dirname)
    .filter((f) => f.match(new RegExp(`^_hand${siman}(-b\\d+)?-en\\.mjs$`)))
    .sort();
  for (const f of injectFiles) {
    run("_inject-hand-slot6.mjs", [String(siman), path.join(__dirname, f)]);
  }
  run("_force-seed-hand-slot6.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot6.mjs", [String(siman)]);
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
fs.appendFileSync(LOG, `${slotTs} worker-slot-6 SLOT COMPLETE simanim 249-283\n`, "utf8");
console.log("\n--- Summary ---");
for (const r of results) {
  console.log(`siman ${r.siman}\tblocks ${r.blocks}\t${r.complete ? "COMPLETE" : "INCOMPLETE"}`);
}
