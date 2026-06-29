#!/usr/bin/env node
/**
 * Drive simanim 1–100 to bad_mt=0:
 *   _post-mt-patch-range → _mt-fix-bad-range (heaven + MT) → hand remnants
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(dir, "..");
const node = process.execPath;

function run(script, args = []) {
  const r = spawnSync(node, [path.join(dir, script), ...args], {
    cwd: ROOT,
    stdio: "inherit",
  });
  return r.status ?? 1;
}

const FROM = parseInt(process.argv[2], 10) || 1;
const TO = parseInt(process.argv[3], 10) || 100;

console.log(`\n=== ${FROM}-${TO} post-mt-patch ===\n`);
run("_post-mt-patch-range.mjs", [String(FROM), String(TO)]);

console.log(`\n=== ${FROM}-${TO} heaven + bad-MT retranslate ===\n`);
run("_mt-fix-bad-range-244-299.mjs", [String(FROM), String(TO)]);

const remPath = path.join(dir, `remainders-${FROM}-${TO}.json`);
if (fs.existsSync(remPath)) {
  const rem = JSON.parse(fs.readFileSync(remPath, "utf8"));
  if (rem.length > 0) {
    console.log(`\n=== ${rem.length} remnants — hand apply ===\n`);
    if (FROM === 1 && TO === 100) {
      run("_apply-fixes-1-100-remnant.mjs");
    } else {
      console.error("No hand-apply script for this range; fix remainders manually.");
      process.exit(2);
    }
  }
}

const scan = spawnSync(node, [path.join(dir, "_scan-bad-range.mjs"), String(FROM), String(TO)], {
  cwd: ROOT,
  encoding: "utf8",
});
process.stdout.write(scan.stdout || "");
if (scan.status !== 0) process.exit(scan.status ?? 1);

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const tag = `${FROM}-${TO} bad_mt=0 COMPLETE`;
const line = `${ts} worker-range ${tag}\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes(tag)) fs.appendFileSync(logPath, line);
console.log(`\n[COMPLETE] Simanim ${FROM}-${TO} — bad_mt=0`);
