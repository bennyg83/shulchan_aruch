#!/usr/bin/env node
/** Apply ready hand-slot10 JSON to output + finalize (no re-export) */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("Usage: _apply-hand-slot10-siman.mjs <siman>");
  process.exit(1);
}

run("_preflight-fix-siman-slot10.mjs", [String(siman)]);
run("_build-slot10-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot10.mjs`))) {
  console.log(`=== applying batch ${batch} ===`);
  run(`_apply-siman${siman}-batch${batch}-slot10.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot10.mjs", [String(siman)]);
