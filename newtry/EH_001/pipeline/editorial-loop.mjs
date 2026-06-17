#!/usr/bin/env node
/**
 * Editorial loop: siman 21 → 178, Claude-quality retranslation, batched for Cursor.
 *
 *   npm run pipeline:editorial:loop -- status
 *   npm run pipeline:editorial:loop -- init
 *   npm run pipeline:editorial:loop -- prepare
 *   npm run pipeline:editorial:loop -- prepare --siman 113
 *   npm run pipeline:editorial:loop -- advance --siman 21
 *   npm run pipeline:editorial:loop -- finish-siman --siman 21
 *
 * Workflow (repeat until done):
 *   1. prepare  → open pipeline/work/batch-editorial-siman-NNN*.md + dictionary in Cursor
 *   2. Agent retranslates every block in the batch (Hebrew → English, rules in batch file)
 *   3. advance  → dictionary + validate + checkpoint
 *   4. prepare  → next part or next siman
 *   5. finish-siman when quality report for that siman is acceptable
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import {
  loadEditorialState,
  saveEditorialState,
  nextSiman,
  manifestPath,
  DEFAULT_STATE,
} from "./lib/editorial-state.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { buildBatch } from "./build-editorial-siman-batch.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");

function parseArgs() {
  const opts = {
    action: "status",
    from: 21,
    to: 178,
    siman: null,
    maxBlocks: 40,
    scope: "all",
    minSeverity: "warn",
    outRoot: path.join(OC_ROOT, "output"),
    workDir: WORK,
    skipRefresh: false,
  };
  const a = process.argv.slice(2);
  if (!a.length) opts.action = "status";
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (x === "status" || x === "init" || x === "prepare" || x === "advance" || x === "finish-siman")
      opts.action = x;
    else if (x === "--from" && a[i + 1]) opts.from = parseInt(a[++i], 10);
    else if (x === "--to" && a[i + 1]) opts.to = parseInt(a[++i], 10);
    else if (x === "--siman" && a[i + 1]) opts.siman = parseInt(a[++i], 10);
    else if (x === "--max-blocks" && a[i + 1]) opts.maxBlocks = parseInt(a[++i], 10);
    else if (x === "--scope" && a[i + 1]) opts.scope = a[++i];
    else if (x === "--min-severity" && a[i + 1]) opts.minSeverity = a[++i];
    else if (x === "--out" && a[i + 1]) opts.outRoot = path.resolve(a[++i]);
    else if (x === "--work-dir" && a[i + 1]) opts.workDir = path.resolve(a[++i]);
    else if (x === "--skip-refresh") opts.skipRefresh = true;
  }
  return opts;
}

function runChecklistRefresh() {
  console.log("Refreshing checklist…");
  const r = spawnSync(process.execPath, [path.join(OC_ROOT, "sa-checklist.mjs"), "--out", "output"], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function writeManifest(state, opts, extra = "") {
  const n = nextSiman(state);
  const lines = [
    "# Editorial loop manifest",
    "",
    `Updated: ${new Date().toISOString()}`,
    "",
    `| Setting | Value |`,
    `|---------|-------|`,
    `| Range | siman **${state.fromSiman}** – **${state.toSiman}** |`,
    `| Completed simanim | ${(state.completedSimanim || []).length} |`,
    `| Next siman | ${n ?? "— (all done)"} |`,
    `| Current siman | ${state.currentSiman ?? "—"} |`,
    `| Part | ${state.currentPart || 0} / ${state.totalParts || 0} |`,
    `| Phase | ${state.phase} |`,
    `| Scope | ${opts.scope} (all = full Hebrew→English pass per siman) |`,
    `| Blocks per batch | ${opts.maxBlocks} |`,
    "",
    "## Commands",
    "",
    "```bash",
    "cd newtry/EH_001",
    "npm run pipeline:editorial:loop -- prepare    # next batch",
    "# … edit batch in Cursor with @full_dictionary (1).md …",
    "npm run pipeline:editorial:loop -- advance    # after batch edited",
    "npm run pipeline:editorial:loop -- finish-siman --siman N   # when siman is clean",
    "npm run pipeline:editorial:loop -- status",
    "```",
    "",
    extra,
  ];
  if (state.lastBatchPath) {
    lines.push("## Current batch file", "", `\`${state.lastBatchPath}\``, "");
  }
  fs.mkdirSync(opts.workDir, { recursive: true });
  fs.writeFileSync(manifestPath(opts.workDir), lines.join("\n"), "utf8");
}

function status(state, opts) {
  const remaining = [];
  for (let s = state.fromSiman; s <= state.toSiman; s++) {
    if (!(state.completedSimanim || []).includes(s)) remaining.push(s);
  }
  console.log("\n── Editorial loop status ──\n");
  console.log(`Range: siman ${state.fromSiman}–${state.toSiman}`);
  console.log(`Completed: ${(state.completedSimanim || []).length} simanim`);
  console.log(`Remaining: ${remaining.length} simanim`);
  console.log(`Next siman: ${nextSiman(state) ?? "none"}`);
  console.log(`Current: siman ${state.currentSiman ?? "—"}, part ${state.currentPart}/${state.totalParts}, phase=${state.phase}`);
  if (state.lastBatchPath) console.log(`Last batch: ${state.lastBatchPath}`);
  console.log(`Manifest: ${manifestPath(opts.workDir)}\n`);
}

function initState(opts) {
  const state = {
    ...DEFAULT_STATE,
    fromSiman: opts.from,
    toSiman: opts.to,
    completedSimanim: [],
    currentSiman: null,
    currentPart: 0,
    totalParts: 0,
    phase: "idle",
  };
  saveEditorialState(opts.workDir, state);
  writeManifest(state, opts, "Initialized. Run `prepare` to start siman 21.\n");
  console.log(`Initialized editorial loop: siman ${opts.from}–${opts.to}`);
}

function prepare(state, opts) {
  const siman = opts.siman ?? nextSiman(state);
  if (siman == null) {
    console.log("All simanim in range are marked complete.");
    state.phase = "done";
    saveEditorialState(opts.workDir, state);
    return;
  }

  const doneIds = loadEditorialDoneIds(opts.workDir);
  const all = collectEditorialBlocks(opts.outRoot, siman, opts.scope, opts.minSeverity, doneIds);
  if (!all.length) {
    console.log(`Siman ${siman}: no remaining blocks in scope — run finish-siman or loop will skip.`);
    const done = new Set(state.completedSimanim || []);
    done.add(siman);
    state.completedSimanim = [...done].sort((a, b) => a - b);
    state.currentSiman = null;
    state.phase = "idle";
    saveEditorialState(opts.workDir, state);
    const n = nextSiman(state);
    if (n) {
      console.log(`Auto-advancing to siman ${n}…`);
      return prepare({ ...state }, { ...opts, siman: n });
    }
    return;
  }

  const totalParts = Math.max(1, Math.ceil(all.length / opts.maxBlocks));
  let part = 1;
  if (state.currentSiman === siman && state.currentPart > 0 && state.currentPart < totalParts) {
    part = state.currentPart + 1;
  }

  const batchOpts = {
    siman,
    part,
    parts: totalParts,
    maxBlocks: opts.maxBlocks,
    scope: opts.scope,
    minSeverity: opts.minSeverity,
    outRoot: opts.outRoot,
    workDir: opts.workDir,
  };
  const r = buildBatch(batchOpts);

  state.currentSiman = siman;
  state.currentPart = part;
  state.totalParts = totalParts;
  state.phase = "awaiting_edit";
  state.lastBatchPath = r.batchPath;
  state.lastQueuePath = r.queuePath;
  state.stats = state.stats || {};
  state.stats.blocksQueued = (state.stats.blocksQueued || 0) + r.sliceCount;
  saveEditorialState(opts.workDir, state);

  const extra = [
    "## Action required",
    "",
    `Open in Cursor:`,
    "",
    `1. \`@${path.relative(OC_ROOT, DICT()).replace(/\\/g, "/")}\``,
    `2. \`${path.relative(OC_ROOT, r.batchPath).replace(/\\/g, "/")}\``,
    "",
    `Retranslate **${r.sliceCount}** blocks (part **${part}/${totalParts}**, **${all.length}** total in siman).`,
    "",
    `Then: \`npm run pipeline:editorial:loop -- advance\``,
    "",
  ].join("\n");
  writeManifest(state, opts, extra);

  console.log(`\n── Prepare siman ${siman} part ${part}/${totalParts} ──`);
  console.log(`Blocks: ${r.sliceCount} this batch / ${all.length} remaining in siman`);
  console.log(`\nEdit → ${r.batchPath}`);
  console.log(`\nThen: npm run pipeline:editorial:loop -- advance\n`);
}

function DICT() {
  return path.join(OC_ROOT, "..", "..", "full_dictionary (1).md");
}

function advance(state, opts) {
  const siman = opts.siman ?? state.currentSiman;
  if (!siman) {
    console.error("No current siman. Run prepare first.");
    process.exit(1);
  }
  const queue = state.lastQueuePath;
  const args = [
    path.join(__dirname, "editorial-advance.mjs"),
    "--siman",
    String(siman),
  ];
  if (queue && fs.existsSync(queue)) args.push("--queue", queue);

  const r = spawnSync(process.execPath, args, { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);

  const st2 = loadEditorialState(opts.workDir);
  const left = collectEditorialBlocks(
    opts.outRoot,
    siman,
    opts.scope,
    opts.minSeverity,
    loadEditorialDoneIds(opts.workDir)
  );
  if (left.length > 0) {
    console.log(`\n${left.length} block(s) still queued for siman ${siman} — run prepare again for next part.`);
    st2.phase = "idle";
    saveEditorialState(opts.workDir, st2);
    return;
  }
  console.log(`\nSiman ${siman}: all blocks in scope checkpointed. Run finish-siman when quality is acceptable.`);
  st2.phase = "siman_ready_to_finish";
  saveEditorialState(opts.workDir, st2);
}

function finishSiman(state, opts) {
  const siman = opts.siman ?? state.currentSiman;
  if (!siman) {
    console.error("Specify --siman");
    process.exit(1);
  }
  const done = new Set(state.completedSimanim || []);
  done.add(siman);
  state.completedSimanim = [...done].sort((a, b) => a - b);
  state.currentSiman = null;
  state.currentPart = 0;
  state.totalParts = 0;
  state.phase = "idle";
  saveEditorialState(opts.workDir, state);
  writeManifest(state, opts, `Finished siman ${siman}. Run prepare for next.\n`);
  console.log(`Marked siman ${siman} complete. Next: siman ${nextSiman(state) ?? "none"}`);

  const orchScript = path.join(__dirname, "orchestrator.mjs");
  if (fs.existsSync(orchScript)) {
    console.log("\nOrchestrator: checking publish/release gates…");
    spawnSync(process.execPath, [orchScript, "sync"], {
      cwd: OC_ROOT,
      stdio: "inherit",
    });
  }
}

function main() {
  const opts = parseArgs();
  fs.mkdirSync(opts.workDir, { recursive: true });

  if (!opts.skipRefresh && (opts.action === "prepare" || opts.action === "init")) {
    runChecklistRefresh();
  }

  let state = loadEditorialState(opts.workDir);
  if (opts.from !== 21 || opts.to !== 178) {
    state.fromSiman = opts.from;
    state.toSiman = opts.to;
  }

  switch (opts.action) {
    case "init":
      initState(opts);
      break;
    case "status":
      status(state, opts);
      writeManifest(state, opts);
      break;
    case "prepare":
      prepare(state, opts);
      break;
    case "advance":
      advance(state, opts);
      break;
    case "finish-siman":
      finishSiman(state, opts);
      break;
    default:
      console.error("Unknown action. Use: status | init | prepare | advance | finish-siman");
      process.exit(1);
  }
}

main();
