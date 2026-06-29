#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of process.argv.slice(2).map(Number)) {
  console.log("\n=== siman", siman, "===");
  run("_export-he-slot10.mjs", [String(siman)]);
  run("_seed-hand-slot10-partial.mjs", [String(siman)]);
  run("_force-seed-hand-slot10.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot10.mjs", [String(siman)]);
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot10.mjs"), String(siman)],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  console.log(audit.stdout);
}
