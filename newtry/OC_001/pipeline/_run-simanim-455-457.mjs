#!/usr/bin/env node
/** Finish pipeline for 455-457: apply en maps, merge hand, complete */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.join(__dirname, "..");
const simanim = [455, 456, 457];

function run(script, args = []) {
  console.log(`\n>> node ${script} ${args.join(" ")}`);
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const s of simanim) {
  console.log(`\n######## siman ${s} ########`);
  if (fs.existsSync(path.join(__dirname, `mech${s}-en.mjs`))) {
    run("_gen-fixes-siman-slot11-from-en.mjs", [String(s)]);
    run("_apply-fixes-slot11.mjs", [String(s)]);
  }
  for (let p = 1; p <= 5; p++) {
    const part = path.join(__dirname, `_fixes-siman${s}-part${p}.mjs`);
    if (fs.existsSync(part)) run("_apply-fixes-part.mjs", [part]);
  }
  if (fs.existsSync(path.join(__dirname, `he${s}-export.json`))) {
    run("_merge-build-fixes-slot11.mjs", [String(s)]);
    run("_apply-fixes-slot11.mjs", [String(s)]);
  }
  run("_complete-siman-slot11.mjs", [String(s)]);
}
