#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
    env: { ...process.env, SLOT: "slot12" },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const miss = hand.items.filter((it) => !it.en || !String(it.en).trim()).length;
if (miss) {
  console.error(`siman ${siman}: ${miss} blocks still missing en`);
  process.exit(1);
}
run("_build-slot12-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot12.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot12.mjs`);
  batch++;
}
run("_complete-siman-slot12.mjs", [String(siman)]);
console.log(`[DONE] siman ${siman}`);
