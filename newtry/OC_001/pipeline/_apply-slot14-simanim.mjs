#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of simanim) {
  console.log(`\n######## apply siman ${siman} ########`);
  run("_apply-hand-all-slot14.mjs", [String(siman)]);
  run("_complete-siman-slot14.mjs", [String(siman)]);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-14 SLOT COMPLETE simanim 529-563\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("\nappended", line.trim());
