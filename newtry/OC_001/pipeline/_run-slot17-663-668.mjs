#!/usr/bin/env node
/** Full slot17 editorial for simanim 663-668 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [663, 664, 665, 666, 667, 668];

function run(script, args = []) {
  console.log("\n>>", script, ...args);
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  run("_export-he-slot17.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot17-from-en.mjs", [String(siman)]);
  if (!fs.existsSync(path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`))) {
    console.error("missing hand json for", siman);
    process.exit(1);
  }
  run("_reset-hand-need-slot17.mjs", [String(siman)]);
  run("_translate-hand-batch-slot17.mjs", [String(siman)]);
  run("_run-one-siman-slot17.mjs", [String(siman)]);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-17 SLOT COMPLETE simanim 634-668\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("\nDONE", line.trim());
