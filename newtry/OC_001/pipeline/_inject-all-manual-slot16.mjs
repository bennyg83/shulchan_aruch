#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number);
if (!simanim.length) simanim.push(600, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612);
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
  console.log(`\n--- siman ${s} ---`);
  run("_export-he-slot16.mjs", [String(s)]);
  const manual = path.join(__dirname, `_fixes-siman${s}-manual-slot16.mjs`);
  if (fs.existsSync(manual)) run("_inject-hand-en-slot16.mjs", [String(s), manual]);
  const auto = path.join(__dirname, `_fixes-siman${s}-slot16.mjs`);
  if (fs.existsSync(auto)) run("_inject-hand-en-slot16.mjs", [String(s), auto]);
  run("_seed-hand-slot16-partial.mjs", [String(s)]);
  run("_force-seed-hand-slot16.mjs", [String(s)]);
  spawnSync(process.execPath, [path.join(__dirname, "_fix-hand-preflight-slot16.mjs"), String(s)], {
    cwd: OC,
    stdio: "pipe",
  });
  const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot16.mjs"), String(s)], {
    cwd: OC,
    encoding: "utf8",
  });
  const j = JSON.parse(audit.stdout.match(/\{[\s\S]*\}/)[0]);
  console.log(`${s}\t${j.total}\t${j.ok}\t${j.need}`);
}
