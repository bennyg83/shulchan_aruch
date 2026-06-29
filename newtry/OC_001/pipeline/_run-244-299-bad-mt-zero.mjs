#!/usr/bin/env node
/** Drive simanim 244–299 to bad_mt=0: autofix → heaven MT → bad MT → verify */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const FROM = parseInt(process.argv[2], 10) || 244;
const TO = parseInt(process.argv[3], 10) || 299;
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

console.log(`\n=== 244-299 bad_mt=0 FROM=${FROM} TO=${TO} ===\n`);

run("_apply-final3-244-299.mjs");

for (let s = FROM; s <= TO; s++) {
  if (!fs.existsSync(simanOutputDir(path.join(ROOT, "output"), s))) continue;
  spawnSync(node, [path.join(__dirname, "_autofix-bad-patterns-siman.mjs"), String(s)], {
    cwd: ROOT,
    stdio: "pipe",
  });
}

let before = 0;
for (let s = FROM; s <= TO; s++) {
  const c = countBad(s);
  if (!c.missing) before += c.bad;
}
console.log(`\nBefore heaven MT: total_bad_mt=${before}\n`);

for (let s = FROM; s <= TO; s++) {
  const c = countBad(s);
  if (c.missing || c.bad === 0) {
    if (!c.missing) console.log(`siman_${String(s).padStart(3, "0")}: skip (bad=0)`);
    continue;
  }
  console.log(`\n--- heaven+autofix siman ${s} (bad=${c.bad}) ---`);
  spawnSync(node, [path.join(__dirname, "_mt-retranslate-heaven-siman.mjs"), String(s)], {
    cwd: ROOT,
    stdio: "inherit",
  });
  spawnSync(node, [path.join(__dirname, "_autofix-bad-patterns-siman.mjs"), String(s)], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const after = countBad(s);
  console.log(`siman_${String(s).padStart(3, "0")}: bad_mt=${after.bad} (was ${c.bad})`);
  if (after.bad > 0) {
    spawnSync(node, [path.join(__dirname, "_build-he-bad-export.mjs"), String(s)], {
      cwd: ROOT,
      stdio: "inherit",
    });
    spawnSync(node, [path.join(__dirname, "_mt-retranslate-bad-siman.mjs"), String(s)], {
      cwd: ROOT,
      stdio: "inherit",
    });
    spawnSync(node, [path.join(__dirname, "_autofix-bad-patterns-siman.mjs"), String(s)], {
      cwd: ROOT,
      stdio: "pipe",
    });
    const after2 = countBad(s);
    console.log(`siman_${String(s).padStart(3, "0")}: after bad-MT bad_mt=${after2.bad}`);
  }
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
if (afterAll > 0) process.exit(2);

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} worker-range 244-299 bad_mt=0 COMPLETE\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes("244-299 bad_mt=0 COMPLETE")) {
  fs.appendFileSync(logPath, line);
}
console.log("\n[COMPLETE] Simanim 244-299 — bad_mt=0");
