#!/usr/bin/env node
/** Translate hand blocks for simanim 684-697 */
import { spawnSync } from "child_process";
import path from "path";
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

for (let s = 684; s <= 697; s++) {
  run("_export-he-slot18.mjs", [String(s)]);
  run("_translate-hand-batch-slot18.mjs", [String(s)]);
}
