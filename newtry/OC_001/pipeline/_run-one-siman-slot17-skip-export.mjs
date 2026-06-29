#!/usr/bin/env node
/** Run slot17 apply pipeline without re-export (preserves hand.en) */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("usage: node _run-one-siman-slot17-skip-export.mjs <siman>");
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

console.log(`\n######## siman ${siman} (skip export) ########`);
const handPath = path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`);
if (!fs.existsSync(handPath)) {
  run("_export-he-slot17.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot17-from-en.mjs", [String(siman)]);
}
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
if (auditJson.need > 0) {
  console.error(`siman ${siman}: ${auditJson.need} hand blocks still need translation`);
  process.exit(1);
}
run("_preflight-fix-siman-slot17.mjs", [String(siman)]);
run("_build-slot17-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot17.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot17.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot17.mjs", [String(siman)]);
