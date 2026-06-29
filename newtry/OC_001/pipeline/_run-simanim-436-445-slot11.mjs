#!/usr/bin/env node
/** worker-slot-11 — finalize simanim 436–445 editorial */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const simanim = [436, 437, 438, 439, 440, 441, 442, 443, 444, 445];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("_apply-slot11-manual.mjs");

for (const siman of simanim) {
  console.log(`\n######## siman ${siman} ########`);
  run("_complete-ready-slot11.mjs", [String(siman)]);
}
console.log("\n[COMPLETE] slot11 simanim 436-445");
