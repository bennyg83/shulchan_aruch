#!/usr/bin/env node
/** Run full slot6 pipeline for one siman after hand.en is complete */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { preflightFail } from "./_slot6-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const handPath = path.join(WORK, `hand-slot6-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const bad = [];
for (const it of hand.items) {
  const en = String(it.en ?? "");
  const pf = preflightFail(en);
  const sev = maxSeverity(
    runBlockQualityChecks({ slug: it.slug, seif: it.seif, marker: it.marker, he: it.he, en })
  );
  if (pf || sev >= SEVERITY.warn) bad.push(`${it.rel} ${it.key}: ${pf || "quality"}`);
}
if (bad.length) {
  console.error(`siman ${siman}: ${bad.length} hand blocks still fail:`);
  console.error(bad.slice(0, 12).join("\n"));
  process.exit(1);
}

run("_preflight-fix-siman-slot6.mjs", [String(siman)]);
run("_build-slot6-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot6.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot6.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot6.mjs", [String(siman)]);
const done = loadEditorialDoneIds(WORK);
const left = collectEditorialBlocks(path.join(OC_ROOT, "output"), siman, "all", "warn", done);
console.log(`siman_${siman}: remaining ${left.length}`);
process.exit(left.length ? 1 : 0);
