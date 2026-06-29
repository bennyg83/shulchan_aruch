#!/usr/bin/env node
/** Audit need counts for simanim after export+seed */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) {
  console.error("Usage: _audit-all-slot15.mjs 564 565 ...");
  process.exit(1);
}

function run(script, args) {
  return spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    encoding: "utf8",
  });
}

for (const s of simanim) {
  run("_export-he-slot15.mjs", [String(s)]);
  run("_seed-hand-slot15-partial.mjs", [String(s)]);
  const r = run("_audit-hand-slot15.mjs", [String(s)]);
  const j = JSON.parse(r.stdout);
  console.log(`${s}\t${j.total}\tseeded_ok=${j.ok}\tneed=${j.need}`);
}
