#!/usr/bin/env node
/**
 * Publish all source TXT into corpus, then bundle all corpus volumes.
 *
 * Publish steps run first so any TXT translation edits are reflected in the bundle.
 * Volumes without a publish script skip that step and go straight to bundle.
 *
 * Volumes: oc1, yd1, eh1, cm1
 */
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [script, ...args], { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`FAILED: ${path.basename(script)} (exit ${r.status})`);
    process.exit(r.status ?? 1);
  }
}

// ── Publish source TXT → corpus ──────────────────────────────────────────────
const publishSteps = [
  { vol: "oc1", script: "publish-oc001-siman.mjs", args: ["--from", "1", "--to", "697"] },
  { vol: "yd1", script: "publish-yd001-siman.mjs", args: ["--from", "1", "--to", "179"] },
  { vol: "eh1", script: "publish-eh001-siman.mjs", args: ["--from", "1", "--to", "178"] },
];

for (const { vol, script, args } of publishSteps) {
  const corpusDir = path.join(ROOT, "public", "corpus", vol);
  if (!existsSync(corpusDir)) continue;
  const scriptPath = path.join(__dirname, script);
  if (!existsSync(scriptPath)) continue;
  console.log(`\n=== Publishing ${vol} ===`);
  run(scriptPath, args);
}

// ── Bundle corpus → JSON bundles ─────────────────────────────────────────────
const bundleScript = path.join(__dirname, "bundle-corpus.mjs");
const volumes = ["oc1", "yd1", "eh1", "cm1"];

for (const vol of volumes) {
  const corpusDir = path.join(ROOT, "public", "corpus", vol);
  if (!existsSync(corpusDir)) {
    console.log(`\n=== Skipping ${vol} (corpus directory not found) ===`);
    continue;
  }
  console.log(`\n=== Bundling ${vol} ===`);
  run(bundleScript, ["--volume", vol]);
}

console.log("\n=== All volumes published and bundled ===");
