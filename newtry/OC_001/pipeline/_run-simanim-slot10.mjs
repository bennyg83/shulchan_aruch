#!/usr/bin/env node
/** Run slot10 editorial finalize for simanim range */
import fs from "fs";
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

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) {
  console.error("Usage: _run-simanim-slot10.mjs 404 397 ...");
  process.exit(1);
}

for (const siman of simanim) {
  console.log(`\n######## siman ${siman} ########`);
  const hand = path.join(__dirname, "work", `hand-slot10-siman-${siman}.json`);
  if (fs.existsSync(hand)) {
    run("_preflight-fix-siman-slot10.mjs", [String(siman)]);
    run("_build-slot10-siman.mjs", [String(siman)]);
    let batch = 1;
    while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot10.mjs`))) {
      run(`_apply-siman${siman}-batch${batch}-slot10.mjs`);
      batch++;
    }
  } else {
    run("_finalize-siman-slot10.mjs", [String(siman)]);
    continue;
  }
  run("_checkpoint-remaining-slot10.mjs", [String(siman)]);
}
