#!/usr/bin/env node
/**
 * Drive simanim 500-697 remainders (45 simanim, ~124 blocks) to bad_mt=0.
 * MT pass then export remainders for hand.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const node = process.execPath;

const remaindersPath = path.join(__dirname, "remainders-500-697.json");
const remainders = JSON.parse(fs.readFileSync(remaindersPath, "utf8"));
const simans = [...new Set(remainders.map((r) => r.siman))].sort((a, b) => a - b);

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

console.log(`\n=== 500-697 remainders: ${simans.length} simanim ===\n`);

let before = 0;
for (const s of simans) {
  const c = countBad(s);
  if (!c.missing) before += c.bad;
  autofixSiman(s);
}
console.log(`Before MT: bad_mt=${before}\n`);

for (const s of simans) {
  const c = countBad(s);
  if (c.missing || c.bad === 0) continue;
  console.log(`\n--- siman ${s} (bad=${c.bad}) ---`);
  run("_build-he-bad-export.mjs", [String(s)]);
  run("_mt-retranslate-bad-siman.mjs", [String(s)]);
  autofixSiman(s);
  const after = countBad(s);
  console.log(`siman_${String(s).padStart(3, "0")}: bad_mt=${after.bad}`);
}

let afterAll = 0;
const remain = [];
for (const s of simans) {
  const c = countBad(s);
  if (c.missing) continue;
  afterAll += c.bad;
  if (c.bad > 0) remain.push({ siman: s, bad: c.bad });
}

console.log(`\n=== DONE remainders MT pass: bad_mt=${afterAll} ===`);

if (afterAll > 0) {
  const items = [];
  for (const s of simans) {
    const dir = simanOutputDir(path.join(ROOT, "output"), s);
    if (!fs.existsSync(dir)) continue;
    for (const slug of fs.readdirSync(dir).sort()) {
      const d = path.join(dir, slug);
      if (!fs.statSync(d).isDirectory()) continue;
      for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
        const rel = `${slug}/${f}`;
        for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
          if (!isBadMt447(b.en)) continue;
          items.push({
            siman: s,
            rel,
            key: `${b.seif}:${b.marker || "_"}`,
            en: String(b.en ?? "").trim().slice(0, 120),
          });
        }
      }
    }
  }
  fs.writeFileSync(
    path.join(__dirname, "remainders-500-697-after-mt.json"),
    JSON.stringify(items, null, 2) + "\n",
    "utf8"
  );
  console.error(`Wrote remainders-500-697-after-mt.json (${items.length} blocks)`);
  process.exit(2);
}

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} worker-range 500-697 bad_mt=0 remainders COMPLETE\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes("500-697 bad_mt=0 remainders")) {
  fs.appendFileSync(logPath, line);
}
console.log("\n[COMPLETE] 500-697 remainders — bad_mt=0");
