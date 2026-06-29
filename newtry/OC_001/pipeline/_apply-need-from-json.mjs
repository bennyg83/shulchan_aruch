#!/usr/bin/env node
/** Apply FIXES from JSON file to hand-slot16 and run build/apply/complete */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";

const siman = parseInt(process.argv[2], 10);
const fixesPath = process.argv[3];
if (!siman || !fixesPath) {
  console.error("Usage: _apply-need-from-json.mjs <siman> <fixes.json>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const { FIXES } = await import(pathToFileURL(path.resolve(fixesPath)).href);

const handPath = path.join(__dirname, "work", `hand-slot16-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const en = FIXES[it.rel]?.[it.key];
  if (en) {
    const { autoFix } = await import("./_slot16-lib.mjs");
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("injected", n);

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("_fix-hand-preflight-slot16.mjs", [String(siman)]);
const audit = spawnSync(
  process.execPath,
  [path.join(__dirname, "_audit-hand-slot16.mjs"), String(siman)],
  { encoding: "utf8" }
);
console.log(audit.stdout);
const a = JSON.parse(audit.stdout.trim().split("\n")[0] + audit.stdout.trim().split("\n").slice(1).join("\n").replace(/^\{/, "{").split("\n")[0]);
// simpler:
const need = (audit.stdout.match(/"need": (\d+)/) || [])[1];
if (Number(need) > 0) {
  console.error("still need", need);
  process.exit(1);
}
run("_build-slot16-siman.mjs", [String(siman)]);
let batch = 1;
while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot16.mjs`))) {
  run(`_apply-siman${siman}-batch${batch}-slot16.mjs`);
  batch++;
}
run("_complete-siman-slot16.mjs", [String(siman)]);
