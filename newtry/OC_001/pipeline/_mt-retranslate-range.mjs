#!/usr/bin/env node
/** Run _mt-retranslate-bad-siman.mjs for siman range (rebuild export each). */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const FROM = Number(process.argv[2] || "671");
const TO = Number(process.argv[3] || "697");

function run(script, args) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (let s = FROM; s <= TO; s++) {
  console.log(`\n===== siman ${s} =====`);
  run("_build-he-bad-export.mjs", [String(s)]);
  run("_mt-retranslate-bad-siman.mjs", [String(s)]);
}
