#!/usr/bin/env node
/** Apply slot18-hand-fixes.json after export, then complete slot18 for one siman */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const fixesPath = path.join(__dirname, "work", "slot18-hand-fixes.json");

if (!siman) {
  console.error("usage: node _apply-need-fixes-slot18.mjs <siman>");
  process.exit(1);
}

const all = JSON.parse(fs.readFileSync(fixesPath, "utf8"));
const fixes = all[String(siman)] || all[siman];
if (!fixes || !Object.keys(fixes).length) {
  console.error("no fixes for siman", siman);
  process.exit(1);
}

const modPath = path.join(__dirname, `_hand${siman}-need-en-tmp.mjs`);
fs.writeFileSync(
  modPath,
  `export const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
  "utf8"
);

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n######## siman ${siman} (need fixes) ########`);
run("_export-he-slot18.mjs", [String(siman)]);
run("_inject-hand-en-slot18.mjs", [String(siman), modPath]);
fs.unlinkSync(modPath);

run("_gen-fixes-siman-slot18-from-en.mjs", [String(siman)]);
run("_seed-hand-slot18-partial.mjs", [String(siman)]);
const manual = path.join(__dirname, `_fixes-siman${siman}-manual-slot18.mjs`);
if (fs.existsSync(manual)) run("_inject-hand-en-slot18.mjs", [String(siman), manual]);
const fixesFile = path.join(__dirname, `_fixes-siman${siman}-slot18.mjs`);
if (fs.existsSync(fixesFile)) run("_inject-hand-en-slot18.mjs", [String(siman), fixesFile]);
const needHand = path.join(__dirname, `_hand${siman}-need-en.mjs`);
if (fs.existsSync(needHand)) run("_inject-hand-en-slot18.mjs", [String(siman), needHand]);
for (let b = 1; b <= 40; b++) {
  const hb = path.join(__dirname, `_hand${siman}-b${b}-en.mjs`);
  if (fs.existsSync(hb)) run("_inject-hand-en-slot18.mjs", [String(siman), hb]);
}
run("_force-seed-hand-slot18.mjs", [String(siman)]);
run("_fix-hand-preflight-slot18.mjs", [String(siman)]);
const audit = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot18.mjs"), String(siman)], {
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
run("_preflight-fix-siman-slot18.mjs", [String(siman)]);
run("_build-slot18-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot18.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot18.mjs`);
  batch++;
}
run("_checkpoint-remaining-slot18.mjs", [String(siman)]);
run("_complete-siman-slot18.mjs", [String(siman)]);
