#!/usr/bin/env node
/** Inject manual en, build/apply/finalize simanim 244–248 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";
import { MANUAL_BY_SIMAN } from "./_siman244-248-manual-en.mjs";
import { autoFix, preflightFail } from "./_slot5-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";
import {
  collectEditorialBlocks,
  loadEditorialDoneIds,
} from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const LOG = path.join(OC_ROOT, "progress.log");
const SIMANIM = [
  [244, 173],
  [245, 138],
  [246, 166],
  [247, 114],
  [248, 129],
];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function injectManual(siman) {
  const handPath = path.join(WORK, `hand-slot5-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const manual = MANUAL_BY_SIMAN[siman] || {};
  let n = 0;
  for (const it of hand.items) {
    const en = manual[it.rel]?.[it.key];
    if (en) {
      it.en = en;
      n++;
    } else if (!it.en) {
      it.en = autoFix(it.enBad || "", it.marker, it.he || "");
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const bad = [];
  for (const it of hand.items) {
    const pf = preflightFail(it.en);
    const issues = runBlockQualityChecks({
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      he: it.he,
      en: it.en,
    });
    const sev = maxSeverity(issues);
    if (pf || sev >= SEVERITY.warn) bad.push({ rel: it.rel, key: it.key, pf, issues: issues.map((i) => i.code) });
  }
  console.log(`siman ${siman}: injected manual ${n}, preflight-warn+ ${bad.length}`);
  if (bad.length) {
    console.error(JSON.stringify(bad.slice(0, 8), null, 2));
    process.exit(1);
  }
}

const results = [];
const startFrom = parseInt(process.argv[2], 10) || 244;

for (const [siman, expected] of SIMANIM) {
  if (siman < startFrom) continue;
  console.log(`\n######## siman ${siman} ########`);
  if (!fs.existsSync(path.join(WORK, `hand-slot5-siman-${siman}.json`))) {
    run("_export-he-slot5.mjs", [String(siman)]);
  }
  injectManual(siman);
  run("_preflight-fix-siman-slot5.mjs", [String(siman)]);
  run("_build-slot5-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot5.mjs`))) {
    console.log(`=== applying batch ${batch} ===`);
    run(`_apply-siman${siman}-batch${batch}-slot5.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot5.mjs", [String(siman)]);
  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(path.join(OC_ROOT, "output"), siman, "all", "warn", done);
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  fs.appendFileSync(LOG, `${ts} worker-slot-5 siman_${siman} COMPLETE\n`, "utf8");
  console.log(`siman_${siman}: remaining ${left.length}`);
  results.push({ siman, blocks: expected, complete: left.length === 0 });
  if (left.length) process.exit(1);
}

const slotTs = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(LOG, `${slotTs} worker-slot-5 SLOT COMPLETE simanim 214-248\n`, "utf8");
console.log("\n--- Summary ---");
for (const r of results) {
  console.log(`siman ${r.siman}\tblocks ${r.blocks}\t${r.complete ? "COMPLETE" : "INCOMPLETE"}`);
}
