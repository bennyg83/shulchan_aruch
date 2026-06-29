#!/usr/bin/env node
/** Run full slot14 pipeline for one siman */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("usage: node _run-one-siman-slot14.mjs <siman>");
  process.exit(1);
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n######## siman ${siman} ########`);
run("_export-he-slot14.mjs", [String(siman)]);
run("_gen-fixes-siman-slot14-from-en.mjs", [String(siman)]);
run("_seed-hand-slot14-partial.mjs", [String(siman)]);
const fixes = path.join(__dirname, `_fixes-siman${siman}-slot14.mjs`);
if (fs.existsSync(fixes)) run("_inject-hand-en-slot14.mjs", [String(siman), fixes]);
for (let b = 1; b <= 40; b++) {
  const hb = path.join(__dirname, `_hand${siman}-b${b}-en.mjs`);
  if (fs.existsSync(hb)) run("_inject-hand-en-slot14.mjs", [String(siman), hb]);
}
run("_force-seed-hand-slot14.mjs", [String(siman)]);
run("_fix-hand-preflight-slot14.mjs", [String(siman)]);
const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot14.mjs"), String(siman)], {
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
run("_preflight-fix-siman-slot14.mjs", [String(siman)]);
run("_build-slot14-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot14.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot14.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot14.mjs", [String(siman)]);
