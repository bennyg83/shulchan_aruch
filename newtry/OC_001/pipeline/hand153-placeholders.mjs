#!/usr/bin/env node
/**
 * worker-slot-3 — siman 153: extract 535 placeholders → MT → gen hand153-p*.mjs → apply
 * Usage:
 *   node pipeline/hand153-placeholders.mjs           # full pipeline
 *   node pipeline/hand153-placeholders.mjs --extract-only
 *   node pipeline/hand153-placeholders.mjs --skip-mt  # gen+apply from existing JSON
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const dataPath = path.join(__dirname, "work", "hand153-ph.json");

const args = new Set(process.argv.slice(2));
const extractOnly = args.has("--extract-only");
const skipMt = args.has("--skip-mt");

function run(script, scriptArgs = []) {
  const fp = path.join(__dirname, script);
  console.log(`\n>> node pipeline/${script} ${scriptArgs.join(" ")}`);
  const r = spawnSync(process.execPath, [fp, ...scriptArgs], { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log("\n######## siman 153 placeholder pipeline ########");
run("hand153-extract.mjs");
if (extractOnly) {
  console.log("[extract-only] done");
  process.exit(0);
}

if (!skipMt) {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const need = data.items.filter((it) => !it.en || !String(it.en).trim()).length;
  console.log(`MT needed for ${need}/${data.items.length} blocks (~${Math.ceil((need * 2) / 60)} min)`);
  run("hand153-mt.mjs");
}

run("hand153-postfix.mjs");
run("hand153-gen-fixes.mjs");
run("hand153-apply.mjs");
console.log("\n[COMPLETE] siman 153 — placeholders applied");
