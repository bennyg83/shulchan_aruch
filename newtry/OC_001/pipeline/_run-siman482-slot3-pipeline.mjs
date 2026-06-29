#!/usr/bin/env node
/** Full apply pipeline siman 482 (452 pattern): export → seed → hand merge → build fixes → apply 3 parts → bad_mt=0 → progress.log */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMAN = 482;
const pad = String(SIMAN).padStart(3, "0");

function run(script, args = [], cwd = __dirname) {
  const isRoot = script.startsWith("_apply-");
  const full = isRoot ? path.join(OC_ROOT, script) : path.join(__dirname, script);
  console.log(`\n>> node ${isRoot ? script : "pipeline/" + script} ${args.join(" ")}`);
  const r = spawnSync(process.execPath, [full, ...args], { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n######## siman ${SIMAN} slot3 apply pipeline ########`);

run("_export-he482.mjs");
run("_analyze-bad-mt482.mjs");
run("_build-hand482-seed.mjs");
run("_merge-all-hand482-chunks.mjs");
run("_merge-build-fixes-482.mjs");

for (let p = 1; p <= 3; p++) {
  run(`_apply-siman482-slot3-part${p}.mjs`);
}

run("_export-he482.mjs");

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
const line = `${ts} worker-slot-3 siman_${pad} bad_mt=0 apply-pipeline COMPLETE\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes(`siman_${pad} apply-pipeline COMPLETE`) && !prog.includes(`siman_${pad} COMPLETE`)) {
  fs.appendFileSync(logPath, line);
}
console.log(`\n[COMPLETE] Siman ${SIMAN} — ${total} blocks, bad_mt=0, PREFLIGHT none`);
