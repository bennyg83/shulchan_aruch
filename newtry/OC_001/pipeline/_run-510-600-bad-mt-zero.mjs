#!/usr/bin/env node
/**
 * Drive simanim 510–600 to bad_mt=0: autofix → export → MT retranslate → autofix.
 * Does NOT use slot14 batch (551/545 use MT+hand only per orchestrator).
 * Usage: node pipeline/_run-510-600-bad-mt-zero.mjs [FROM] [TO]
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const FROM = parseInt(process.argv[2], 10) || 510;
const TO = parseInt(process.argv[3], 10) || 600;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const node = process.execPath;

function countBad(siman) {
  const dir = simanOutputDir(path.join(ROOT, "output"), siman);
  if (!fs.existsSync(dir)) return { total: 0, bad: 0, missing: true };
  let total = 0,
    bad = 0;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        total++;
        if (isBadMt447(b.en)) bad++;
      }
    }
  }
  return { total, bad, missing: false };
}

function run(script, args = []) {
  const r = spawnSync(node, [path.join(__dirname, script), ...args], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function autofixSiman(s) {
  spawnSync(node, [path.join(__dirname, "_autofix-bad-patterns-siman.mjs"), String(s)], {
    cwd: ROOT,
    stdio: "pipe",
  });
}

console.log(`\n=== ${FROM}-${TO} bad_mt=0 (MT+autofix, no slot14) ===\n`);

let before = 0;
for (let s = FROM; s <= TO; s++) {
  const c = countBad(s);
  if (!c.missing) before += c.bad;
  autofixSiman(s);
}
console.log(`Before MT pass: total_bad_mt=${before}\n`);

const withBad = [];
for (let s = FROM; s <= TO; s++) {
  const c = countBad(s);
  if (!c.missing && c.bad > 0) withBad.push({ s, bad: c.bad });
}
withBad.sort((a, b) => b.bad - a.bad);
console.log(`Simanim needing MT: ${withBad.length}, blocks=${withBad.reduce((n, x) => n + x.bad, 0)}`);

for (const { s, bad } of withBad) {
  console.log(`\n--- siman ${s} (bad=${bad}) ---`);
  run("_build-he-bad-export.mjs", [String(s)]);
  run("_mt-retranslate-bad-siman.mjs", [String(s)]);
  autofixSiman(s);
  const after = countBad(s);
  console.log(`siman_${String(s).padStart(3, "0")}: bad_mt=${after.bad} (was ${bad})`);
}

let afterAll = 0;
const remain = [];
for (let s = FROM; s <= TO; s++) {
  const c = countBad(s);
  if (c.missing) continue;
  afterAll += c.bad;
  if (c.bad > 0) remain.push({ siman: s, bad: c.bad });
}
remain.sort((a, b) => b.bad - a.bad);
console.log(`\n=== DONE range ${FROM}-${TO} total_bad_mt=${afterAll} ===`);
for (const r of remain) {
  console.log(`  siman_${String(r.siman).padStart(3, "0")}: ${r.bad}`);
}

if (afterAll > 0) {
  fs.writeFileSync(
    path.join(__dirname, "work", `bad-mt-remain-${FROM}-${TO}.json`),
    JSON.stringify(remain, null, 2) + "\n",
    "utf8"
  );
  console.error(`\nExport remainders: node pipeline/_export-range-bad-mt.mjs ${FROM} ${TO}`);
  process.exit(2);
}

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} worker-range ${FROM}-${TO} bad_mt=0 COMPLETE\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes(`${FROM}-${TO} bad_mt=0 COMPLETE`)) {
  fs.appendFileSync(logPath, line);
}
console.log(`\n[COMPLETE] Simanim ${FROM}-${TO} — bad_mt=0`);
