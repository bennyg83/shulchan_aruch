#!/usr/bin/env node
/**
 * After an editorial batch: dictionary, validate, checkpoint ids, optionally advance loop state.
 *
 *   node pipeline/editorial-advance.mjs --siman 21
 *   node pipeline/editorial-advance.mjs --siman 21 --queue pipeline/work/editorial-queue-siman-021.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { appendEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { loadEditorialState, saveEditorialState } from "./lib/editorial-state.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");

function parseArgs() {
  let siman = null;
  let queuePath = null;
  let skipDictionary = false;
  let markSimanComplete = false;
  let workDir = WORK;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = parseInt(a[++i], 10);
    else if (a[i] === "--queue" && a[i + 1]) queuePath = path.resolve(a[++i]);
    else if (a[i] === "--skip-dictionary") skipDictionary = true;
    else if (a[i] === "--mark-siman-complete") markSimanComplete = true;
    else if (a[i] === "--work-dir" && a[i + 1]) workDir = path.resolve(a[++i]);
  }
  if (!siman && !queuePath) throw new Error("Required: --siman N or --queue path");
  if (!queuePath && siman) {
    const tag = String(siman).padStart(3, "0");
    queuePath = path.join(workDir, `editorial-queue-siman-${tag}.json`);
    if (!fs.existsSync(queuePath)) {
      const alt = fs.readdirSync(workDir).find((f) => f.startsWith(`editorial-queue-siman-${tag}`));
      if (alt) queuePath = path.join(workDir, alt);
    }
  }
  return { siman, queuePath, skipDictionary, markSimanComplete, workDir };
}

function run(cmd, args, cwd = OC_ROOT) {
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function main() {
  const opts = parseArgs();
  if (!fs.existsSync(opts.queuePath)) {
    console.error("Queue not found:", opts.queuePath);
    process.exit(1);
  }
  const q = JSON.parse(fs.readFileSync(opts.queuePath, "utf8"));
  const siman = opts.siman ?? q.siman;
  const tag = String(siman).padStart(3, "0");
  const ids = (q.items || []).map((it) => it.id);

  console.log(`\n── Editorial advance: siman ${siman} (${ids.length} block id(s)) ──\n`);

  const nDone = appendEditorialDoneIds(opts.workDir, ids);
  console.log(`Checkpoint: ${nDone} editorial block id(s) in editorial-done-ids.txt`);

  if (!opts.skipDictionary) {
    console.log("\nDictionary pass…");
    run(process.execPath, [
      path.join(OC_ROOT, "apply_dictionary_cm001.mjs"),
      "--root",
      `output/siman_${tag}`,
    ]);
  }

  console.log("\nStructural validate…");
  run(process.execPath, [
    path.join(__dirname, "validate-cm001.mjs"),
    "--root",
    path.join(OC_ROOT, "output", `siman_${tag}`),
  ]);

  console.log("\nQuality validate…");
  run(process.execPath, [
    path.join(__dirname, "validate-quality-cm001.mjs"),
    "--root",
    path.join(OC_ROOT, "output", `siman_${tag}`),
    "--write-reports",
    "--report-dir",
    path.join(OC_ROOT, "checklist-output", `siman_${tag}`),
  ]);

  const state = loadEditorialState(opts.workDir);
  state.stats = state.stats || {};
  state.stats.blocksAdvanced = (state.stats.blocksAdvanced || 0) + ids.length;

  if (opts.markSimanComplete) {
    const done = new Set(state.completedSimanim || []);
    done.add(siman);
    state.completedSimanim = [...done].sort((a, b) => a - b);
    state.currentSiman = null;
    state.phase = "idle";
    console.log(`\nMarked siman ${siman} complete in editorial loop.`);
  } else {
    state.phase = "batch_done";
    state.currentSiman = siman;
  }
  saveEditorialState(opts.workDir, state);

  console.log("\nNext: npm run pipeline:editorial:loop -- prepare");
  console.log("Or mark siman fully done: npm run pipeline:editorial:advance -- --siman", siman, "--mark-siman-complete");
}

main();
