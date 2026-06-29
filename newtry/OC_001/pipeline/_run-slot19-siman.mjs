#!/usr/bin/env node
/** Full slot19 siman pass: preflight, autofix, inject fixes, checkpoint */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n=== worker-slot-19 siman ${siman} ===`);
run("_preflight-fix-siman-slot18.mjs", [String(siman)]);
run("_apply-pending-autofix-slot19.mjs", [String(siman)]);
run("_inject-slot19-fixes.mjs", [String(siman)]);
run("_apply-fixes-slot19.mjs", [String(siman)]);
run("_checkpoint-remaining-slot19.mjs", [String(siman)]);
