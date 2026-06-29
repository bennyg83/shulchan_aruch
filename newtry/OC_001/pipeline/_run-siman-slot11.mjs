#!/usr/bin/env node
/** Full editorial pipeline for one siman — worker-slot-11 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _run-siman-slot11.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  console.log(`\n>> node ${script} ${args.join(" ")}`);
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n######## siman ${siman} slot11 ########`);

// Part-based fixes (454-style)
let hasPart = false;
for (let p = 1; p <= 5; p++) {
  if (fs.existsSync(path.join(__dirname, `_fixes-siman${siman}-part${p}.mjs`))) {
    hasPart = true;
    run("_apply-fixes-part.mjs", [`pipeline/_fixes-siman${siman}-part${p}.mjs`]);
  }
}

if (!hasPart) {
  run("_export-he-siman.mjs", [String(siman)]);
  run("_build-queue-siman.mjs", [String(siman)]);
  const queuePath = path.join(__dirname, `he${siman}-queue.json`);
  if (fs.existsSync(queuePath) && Object.keys(JSON.parse(fs.readFileSync(queuePath, "utf8"))).length) {
    run("_claude-translate-siman.mjs", [String(siman)]);
  }
  run("_merge-build-fixes-slot11.mjs", [String(siman)]);
  run("_apply-fixes-slot11.mjs", [String(siman)]);
}

run("_complete-siman-slot11.mjs", [String(siman)]);
