#!/usr/bin/env node
/** Apply fixes + preflight + finalize one siman for worker-slot-10 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _complete-siman-slot10.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const fixes = path.join(__dirname, `_fixes-siman${siman}-slot10.mjs`);

if (!fs.existsSync(fixes)) {
  console.error("missing", fixes);
  process.exit(1);
}

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("_apply-fixes-slot10.mjs", [String(siman)]);
run("_preflight-fix-siman-slot10.mjs", [String(siman)]);
run("_finalize-siman-slot10.mjs", [String(siman)]);
