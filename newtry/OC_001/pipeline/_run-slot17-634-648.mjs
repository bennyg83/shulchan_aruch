#!/usr/bin/env node
/** Full slot17 editorial for simanim 634-648 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [];
for (let s = 634; s <= 648; s++) SIMANIM.push(s);

function run(script, args = []) {
  console.log("\n>>", script, ...args);
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  run("build-editorial-siman-batch.mjs", ["--siman", String(siman)]);
  run("_export-he-slot17.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot17-from-en.mjs", [String(siman)]);
}

for (const siman of SIMANIM) {
  run("_reset-hand-need-slot17.mjs", [String(siman)]);
}

run("_translate-manual-slot17.mjs", ["634", "648", "600"]);

for (const siman of SIMANIM) {
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot17.mjs"), String(siman)],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  if (audit.status === 0) {
    const j = JSON.parse(audit.stdout || "{}");
    if (j.need > 0) {
      console.log(`siman ${siman}: ${j.need} need — claude batch`);
      run("_translate-hand-batch-slot17.mjs", [String(siman)]);
    }
  }
}

for (const siman of SIMANIM) {
  run("_run-one-siman-slot17.mjs", [String(siman)]);
}

console.log("\n=== SUMMARY ===");
const rows = [];
for (const siman of SIMANIM) {
  const handPath = path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`);
  const blocks = handPath && fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")).count : 0;
  const log = fs.readFileSync(path.join(OC_ROOT, "progress.log"), "utf8");
  const complete = log.includes(`worker-slot-17 siman_${siman} COMPLETE`);
  rows.push({ siman, blocks, complete });
  console.log(siman, blocks, complete ? "COMPLETE" : "INCOMPLETE");
}
