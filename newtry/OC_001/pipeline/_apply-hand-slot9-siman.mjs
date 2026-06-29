#!/usr/bin/env node
/** Apply ready hand-slot9 JSON to output + finalize (no re-export) */
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
  console.error("Usage: _apply-hand-slot9-siman.mjs <siman>");
  process.exit(1);
}

run("_preflight-fix-siman-slot9.mjs", [String(siman)]);
run("_build-slot9-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot9.mjs`))) {
  console.log(`=== applying batch ${batch} ===`);
  run(`_apply-siman${siman}-batch${batch}-slot9.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot9.mjs", [String(siman)]);
