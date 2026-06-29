#!/usr/bin/env node
/** Correct slot7 editorial run: inject → rebuild batches from hand → apply → finalize */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _run-siman-editorial-slot7.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// Remove siman block ids from editorial-done so build picks up all blocks
const donePath = path.join(WORK, "editorial-done-ids.txt");
const pad = String(siman).padStart(3, "0");
const needle = `siman_${pad}/`;
if (fs.existsSync(donePath)) {
  const kept = fs
    .readFileSync(donePath, "utf8")
    .split(/\r?\n/)
    .filter((l) => l.trim() && !l.includes(needle));
  fs.writeFileSync(donePath, kept.join("\n") + (kept.length ? "\n" : ""), "utf8");
}

const fixes = path.join(__dirname, `_fixes-siman${siman}-slot7.mjs`);
if (fs.existsSync(fixes)) run("_inject-hand-en-slot7.mjs", [String(siman), fixes]);
const handEn = path.join(__dirname, `_hand${siman}-en.mjs`);
if (fs.existsSync(handEn)) run("_inject-hand-en-slot7.mjs", [String(siman), handEn]);
for (let b = 1; b <= 20; b++) {
  const hb = path.join(__dirname, `_hand${siman}-b${b}-en.mjs`);
  if (fs.existsSync(hb)) run("_inject-hand-en-slot7.mjs", [String(siman), hb]);
}

run("_seed-hand-en-from-output-slot7.mjs", [String(siman)]);
if (fs.existsSync(fixes)) run("_inject-hand-en-slot7.mjs", [String(siman), fixes]);
if (fs.existsSync(handEn)) run("_inject-hand-en-slot7.mjs", [String(siman), handEn]);
for (let b = 1; b <= 20; b++) {
  const hb = path.join(__dirname, `_hand${siman}-b${b}-en.mjs`);
  if (fs.existsSync(hb)) run("_inject-hand-en-slot7.mjs", [String(siman), hb]);
}

run("_fix-hand-preflight-slot7.mjs", [String(siman)]);
const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot7.mjs"), String(siman)], {
  cwd: OC_ROOT,
  encoding: "utf8",
});
if (audit.status !== 0) {
  console.error(audit.stdout || audit.stderr);
  process.exit(1);
}
const auditJson = JSON.parse(audit.stdout);
if (auditJson.need > 0) {
  console.error(`siman ${siman}: ${auditJson.need} hand blocks still need translation`);
  process.exit(1);
}

run("_preflight-fix-siman-slot7.mjs", [String(siman)]);

// Delete stale batch files before rebuild
for (let batch = 1; batch <= 30; batch++) {
  for (const suffix of ["-data", ""]) {
    const p = path.join(__dirname, `_siman${siman}-slot7-batch${batch}${suffix}.mjs`);
    const ap = path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot7.mjs`);
    if (suffix === "-data" && fs.existsSync(p)) fs.unlinkSync(p);
    if (suffix === "" && fs.existsSync(ap)) fs.unlinkSync(ap);
  }
}

run("_build-slot7-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot7.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot7.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot7.mjs", [String(siman)]);
run("_finalize-siman-slot7.mjs", [String(siman)]);
console.log(`siman_${siman} COMPLETE`);
