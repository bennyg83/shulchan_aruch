#!/usr/bin/env node
/** Run slot16 editorial completion for listed simanim */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const s of simanim) {
  console.log(`\n===== siman ${s} =====`);
  run("_export-he-slot16.mjs", [String(s)]);
  run("_gen-fixes-siman-slot16-from-en.mjs", [String(s)]);
  const fixes = path.join(__dirname, `_fixes-siman${s}-slot16.mjs`);
  if (fs.existsSync(fixes)) run("_inject-hand-en-slot16.mjs", [String(s), fixes]);
  const manual = path.join(__dirname, `_fixes-siman${s}-manual-slot16.mjs`);
  if (fs.existsSync(manual)) run("_inject-hand-en-slot16.mjs", [String(s), manual]);
  run("_seed-hand-slot16-partial.mjs", [String(s)]);
  run("_force-seed-hand-slot16.mjs", [String(s)]);
  run("_fix-hand-preflight-slot16.mjs", [String(s)]);
  const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot16.mjs"), String(s)], {
    cwd: OC,
    encoding: "utf8",
  });
  const m = audit.stdout.match(/\{[\s\S]*?"need":\s*\d+\s*\}/);
  const summary = JSON.parse(m[0]);
  if (summary.need > 0) {
    console.error(`siman ${s}: ${summary.need} blocks still need translation — add _fixes-siman${s}-manual-slot16.mjs`);
    process.exit(1);
  }
  run("_preflight-fix-siman-slot16.mjs", [String(s)]);
  run("_build-slot16-siman.mjs", [String(s)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${s}-batch${batch}-slot16.mjs`))) {
    run(`_apply-siman${s}-batch${batch}-slot16.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot16.mjs", [String(s)]);
  console.log(`siman ${s} COMPLETE`);
}
