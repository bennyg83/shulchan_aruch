#!/usr/bin/env node
/** Export, reset, google-translate, build, apply, complete one siman */
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
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("_export-he-slot18.mjs", [String(siman)]);
const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
if (!fs.existsSync(handPath)) {
  console.error("no hand json", siman);
  process.exit(1);
}
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
if (!hand.count) {
  console.log("siman", siman, "no editorial blocks — skip");
  process.exit(0);
}
run("_reset-hand-need-slot18.mjs", [String(siman)]);
run("_translate-manual-slot18.mjs", [String(siman), String(siman), "400"]);
run("_build-slot18-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot18.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot18.mjs`);
  batch++;
}
run("_complete-siman-slot18.mjs", [String(siman)]);
