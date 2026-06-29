#!/usr/bin/env node
/** Run slot17 pipeline + complete for siman range */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const from = parseInt(process.argv[2], 10) || 634;
const to = parseInt(process.argv[3], 10) || 648;

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const results = [];
for (let siman = from; siman <= to; siman++) {
  console.log(`\n========== siman ${siman} ==========`);
  const handNeed = path.join(__dirname, `_hand${siman}-need-en.mjs`);
  if (fs.existsSync(handNeed)) run("_inject-hand-en-slot17.mjs", [String(siman), handNeed]);
  for (let b = 1; b <= 20; b++) {
    const hb = path.join(__dirname, `_hand${siman}-b${b}-en.mjs`);
    if (fs.existsSync(hb)) run("_inject-hand-en-slot17.mjs", [String(siman), hb]);
  }
  run("_run-one-siman-slot17.mjs", [String(siman)]);
  run("_complete-siman-slot17.mjs", [String(siman)]);
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`), "utf8")
  );
  results.push({ siman, blocks: hand.count, complete: true });
}
console.log("\nRESULTS", JSON.stringify(results, null, 2));
