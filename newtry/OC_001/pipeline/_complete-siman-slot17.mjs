#!/usr/bin/env node
/** Complete one siman for worker-slot-17: apply fixes, dictionary, validate, finalize */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _complete-siman-slot17.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// Apply part fixes if present
for (let p = 1; p <= 5; p++) {
  const fp = path.join(__dirname, `_fixes-siman${siman}-part${p}.mjs`);
  if (fs.existsSync(fp)) run("_apply-fixes-part.mjs", [fp]);
}
const single = path.join(__dirname, `_fixes-siman${siman}-slot17.mjs`);
if (fs.existsSync(single)) run("_apply-fixes-slot17.mjs", [String(siman)]);

const tag = String(siman).padStart(3, "0");
console.log("\nDictionary pass…");
run("../apply_dictionary_oc001.mjs", ["--root", `output/siman_${tag}`]);

console.log("\nStructural validate…");
run("validate-oc001.mjs", ["--root", path.join("output", `siman_${tag}`)]);

console.log("\nQuality validate…");
run("validate-quality-oc001.mjs", ["--root", path.join("output", `siman_${tag}`)]);

run("_finalize-siman-slot17.mjs", [String(siman)]);
