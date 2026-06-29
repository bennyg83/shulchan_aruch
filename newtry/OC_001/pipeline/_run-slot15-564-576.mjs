#!/usr/bin/env node
/** Run slot15 editorial pipeline for simanim 564-576 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function handPipeline(siman) {
  const needFix = path.join(__dirname, `_hand${siman}-need-en.mjs`);
  console.log(`\n######## siman ${siman} ########`);
  run("_export-he-slot15.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot15-from-en.mjs", [String(siman)]);
  run("_seed-hand-slot15-partial.mjs", [String(siman)]);
  run("_sefaria-fill-slot15.mjs", [String(siman)]);
  if (fs.existsSync(needFix)) {
    const inj = spawnSync(
      process.execPath,
      [path.join(__dirname, "_inject-hand-en-slot15.mjs"), String(siman), needFix],
      { cwd: OC_ROOT, encoding: "utf8" }
    );
    if (inj.status !== 0) {
      console.error(inj.stdout || inj.stderr);
      process.exit(1);
    }
    console.log(inj.stdout?.trim());
  }
  run("_force-seed-hand-slot15.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot15.mjs", [String(siman)]);
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot15.mjs"), String(siman)],
    { cwd: OC_ROOT, encoding: "utf8" }
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

const logPath = path.join(OC_ROOT, "progress.log");
const log = fs.readFileSync(logPath, "utf8");
if (!log.includes("worker-slot-15 CLAIM")) {
  fs.appendFileSync(
    logPath,
    `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-15 CLAIM simanim 564-576\n`
  );
}

for (const siman of SIMANIM) {
  if (log.includes(`worker-slot-15 siman_${siman} COMPLETE`)) {
    console.log(`[skip] siman ${siman} already COMPLETE`);
    continue;
  }
  handPipeline(siman);
}
console.log("\n[DONE] simanim 564-576 slot15");
