#!/usr/bin/env node
/** Run full slot17 pipeline for one siman */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const skipExport = process.argv.includes("--skip-export");
const argv = process.argv.slice(2).filter((a) => a !== "--skip-export");
const siman = parseInt(argv[0], 10);
if (!siman) {
  console.error("usage: node _run-one-siman-slot17.mjs [--skip-export] <siman>");
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
if (!skipExport) {
  run("_export-he-slot17.mjs", [String(siman)]);
}
run("_gen-fixes-siman-slot17-from-en.mjs", [String(siman)]);
if (!skipExport) {
  run("_seed-hand-slot17-partial.mjs", [String(siman)]);
}
const manual = path.join(__dirname, `_fixes-siman${siman}-manual-slot17.mjs`);
if (fs.existsSync(manual)) run("_inject-hand-en-slot17.mjs", [String(siman), manual]);
const fixes = path.join(__dirname, `_fixes-siman${siman}-slot17.mjs`);
if (fs.existsSync(fixes)) run("_inject-hand-en-slot17.mjs", [String(siman), fixes]);
const needHand = path.join(__dirname, `_hand${siman}-need-en.mjs`);
if (fs.existsSync(needHand)) run("_inject-hand-en-slot17.mjs", [String(siman), needHand]);
for (let b = 1; b <= 40; b++) {
  const hb = path.join(__dirname, `_hand${siman}-b${b}-en.mjs`);
  if (fs.existsSync(hb)) run("_inject-hand-en-slot17.mjs", [String(siman), hb]);
}
run("_force-seed-hand-slot17.mjs", [String(siman)]);
run("_fix-hand-preflight-slot17.mjs", [String(siman)]);
const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot17.mjs"), String(siman)], {
  cwd: OC_ROOT,
  encoding: "utf8",
});
if (audit.status !== 0) {
  console.error(audit.stdout || audit.stderr);
  process.exit(1);
}
const auditJson = JSON.parse(audit.stdout);
const handPath = path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`);
const handItems = JSON.parse(fs.readFileSync(handPath, "utf8")).items || [];
const missingEn = handItems.filter((x) => !x.en || x.en.length < 8);
if (missingEn.length) {
  console.error(`siman ${siman}: ${missingEn.length} hand blocks missing English`);
  missingEn.slice(0, 5).forEach((x) => console.error(" ", x.rel, x.key));
  process.exit(1);
}
if (auditJson.need > 0) {
  console.warn(
    `siman ${siman}: ${auditJson.need} quality warning(s); proceeding (all blocks have English)`
  );
}
run("_preflight-fix-siman-slot17.mjs", [String(siman)]);
run("_build-slot17-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot17.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot17.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot17.mjs", [String(siman)]);
