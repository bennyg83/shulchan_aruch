#!/usr/bin/env node
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

const results = [];
for (let s = 613; s <= 622; s++) {
  console.log(`\n======== siman ${s} ========`);
  run("_fix-hand-preflight-slot16.mjs", [String(s)]);
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot16.mjs"), String(s)],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  const a = JSON.parse(audit.stdout);
  if (a.need > 0) {
    console.error(`siman ${s} still has ${a.need} need blocks`);
    process.exit(1);
  }
  run("_build-slot16-siman.mjs", [String(s)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${s}-batch${batch}-slot16.mjs`))) {
    run(`_apply-siman${s}-batch${batch}-slot16.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot16.mjs", [String(s)]);
  run("_complete-siman-slot16.mjs", [String(s)]);
  results.push({ siman: s, blocks: a.total, status: "COMPLETE" });
}
console.log("\n=== SUMMARY ===");
for (const r of results) {
  console.log(`${r.siman}\t${r.blocks}\t${r.status}`);
}
