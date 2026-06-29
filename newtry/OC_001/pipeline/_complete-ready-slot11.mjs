#!/usr/bin/env node
/** Complete slot11 editorial for siman with hand JSON already seeded */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("usage: node _complete-ready-slot11.mjs <siman>");
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

const handPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
if (!fs.existsSync(handPath)) {
  console.error("missing hand", handPath);
  process.exit(1);
}

run("_fix-hand-preflight-slot11.mjs", [String(siman)]);
const audit = spawnSync(
  process.execPath,
  [path.join(__dirname, "_audit-hand-slot11.mjs"), String(siman)],
  { cwd: OC_ROOT, encoding: "utf8" }
);
if (audit.status !== 0) {
  console.error(audit.stdout || audit.stderr);
  process.exit(1);
}
const auditJson = JSON.parse(audit.stdout);
if (auditJson.need > 0) {
  console.error(`siman ${siman}: ${auditJson.need} blocks still need translation`);
  process.exit(1);
}

run("_preflight-fix-siman-slot11.mjs", [String(siman)]);
run("_build-slot11-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot11.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot11.mjs`);
  batch++;
}
run("_finalize-siman-slot11.mjs", [String(siman)]);
console.log(`siman ${siman} slot11 COMPLETE`);
