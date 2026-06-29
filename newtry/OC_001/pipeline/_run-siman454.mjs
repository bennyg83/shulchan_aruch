#!/usr/bin/env node
/** Full apply pipeline for siman 454 (same pattern as 452): export → hand merge → build fixes → apply 3 parts → verify bad_mt=0 → progress.log COMPLETE */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMAN = 454;
const pad = String(SIMAN).padStart(3, "0");

function run(script, args = []) {
  console.log(`\n>> node pipeline/${script} ${args.join(" ")}`);
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function runRoot(script, args = []) {
  console.log(`\n>> node ${script} ${args.join(" ")}`);
  const r = spawnSync(process.execPath, [path.join(OC_ROOT, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n######## siman ${SIMAN} full apply pipeline ########`);

run("_export-he454.mjs");
run("_analyze-bad-mt454.mjs");
run("_merge-hand-en-454.mjs");
run("_merge-build-fixes-454.mjs");
run("_patch-preflight-454.mjs");

for (let p = 1; p <= 3; p++) {
  runRoot(`_apply-siman454-part${p}.mjs`);
}

run("_export-he454.mjs");

let total = 0;
let bad = 0;
const dir = path.join(OC_ROOT, "output", `siman_${pad}`);
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      total++;
      if (isBad(b.en)) bad++;
    }
  }
}
console.log(`\nVERIFY siman_${pad}: total=${total} bad_mt=${bad}`);
if (bad > 0) {
  console.error("bad_mt not zero — abort");
  process.exit(1);
}

const logPath = path.join(OC_ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(logPath, `${ts} cursor siman_${pad} bad_mt=0 apply-pipeline COMPLETE\n`, "utf8");
console.log(`\n[COMPLETE] Siman ${SIMAN} — ${total} blocks, bad_mt=0, PREFLIGHT none`);
