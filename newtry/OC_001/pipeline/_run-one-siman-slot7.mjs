#!/usr/bin/env node
/** Run slot7 pipeline for one siman (inject fixes → seed output → preflight → audit → build → apply → finalize) */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _run-one-siman-slot7.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("_seed-hand-en-from-output-slot7.mjs", [String(siman)]);
const fixes = path.join(__dirname, `_fixes-siman${siman}-slot7.mjs`);
if (fs.existsSync(fixes)) run("_inject-hand-en-slot7.mjs", [String(siman), fixes]);
run("_fix-hand-preflight-slot7.mjs", [String(siman)]);

const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot7.mjs"), String(siman), "--list"], {
  cwd: OC_ROOT,
  encoding: "utf8",
});
const raw = (audit.stdout || "").trim();
const idx = raw.indexOf("\n[");
const summary = JSON.parse(idx >= 0 ? raw.slice(0, idx) : raw.split("\n")[0]);
if (summary.need > 0) {
  console.error(`siman ${siman}: ${summary.need} blocks still need translation`);
  if (idx >= 0) console.error(raw.slice(idx).slice(0, 2000));
  process.exit(1);
}

run("_preflight-fix-siman-slot7.mjs", [String(siman)]);
run("_build-slot7-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot7.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot7.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot7.mjs", [String(siman)]);
run("_finalize-siman-slot7.mjs", [String(siman)]);
console.log(`siman_${siman} COMPLETE`);
