#!/usr/bin/env node
/**
 * Rebuild worker pool queue from disk: all editorial blocks still open through siman 697.
 *
 *   node pipeline/refresh-open-worker-queue.mjs
 *   node pipeline/refresh-open-worker-queue.mjs --from 21 --to 697 --workers 4
 *   node pipeline/refresh-open-worker-queue.mjs --assign   # also claim first N units for workers
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { WORK, savePlan } from "./lib/sprint-plan-io.mjs";
import { writeAssignmentBoard } from "./lib/pool-coordinator-ide.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const LAUNCH_QUEUE = path.join(WORK, "pool-launch-queue.json");
const ACTIVE_PLAN = path.join(WORK, "active-sprint-plan.json");
const MASTER = path.join(WORK, "master-pipeline-plan.json");

function parseArgs() {
  const a = process.argv.slice(2);
  const opts = {
    from: 21,
    to: 697,
    maxBlocks: 40,
    workers: 4,
    assign: false,
    outName: "sprint-plan-21-697-open.json",
  };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) opts.from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) opts.to = parseInt(a[++i], 10);
    else if (a[i] === "--max-blocks" && a[i + 1]) opts.maxBlocks = parseInt(a[++i], 10);
    else if (a[i] === "--workers" && a[i + 1]) opts.workers = parseInt(a[++i], 10);
    else if (a[i] === "--out" && a[i + 1]) opts.outName = a[++i];
    else if (a[i] === "--assign") opts.assign = true;
  }
  return opts;
}

function sliceParts(items, maxBlocks) {
  const parts = Math.max(1, Math.ceil(items.length / maxBlocks));
  const units = [];
  const size = Math.ceil(items.length / parts);
  for (let p = 1; p <= parts; p++) {
    const start = (p - 1) * size;
    const chunk = items.slice(start, start + size);
    if (chunk.length) units.push({ part: p, parts, count: chunk.length });
  }
  return units;
}

function buildPlan(opts) {
  const outRoot = path.join(OC_ROOT, "output");
  const done = loadEditorialDoneIds(WORK);
  const simanim = [];
  let totalBlocks = 0;
  const workUnits = [];
  const openSimanim = [];

  for (let s = opts.from; s <= opts.to; s++) {
    const items = collectEditorialBlocks(outRoot, s, "all", "warn", done);
    if (!items.length) continue;
    openSimanim.push(s);
    totalBlocks += items.length;
    const parts = sliceParts(items, opts.maxBlocks);
    simanim.push({ siman: s, blocks: items.length, parts: parts.length });
    for (const u of parts) {
      workUnits.push({
        id: `siman-${String(s).padStart(3, "0")}-part${u.part}of${u.parts}`,
        siman: s,
        part: u.part,
        parts: u.parts,
        blocks: u.count,
        status: "pending",
        assignee: null,
      });
    }
  }

  const plan = {
    version: 1,
    generatedAt: new Date().toISOString(),
    range: { from: opts.from, to: opts.to },
    maxBlocksPerBatch: opts.maxBlocks,
    totalBlocks,
    simanimWithWork: simanim.length,
    openSimanim,
    simanim,
    workUnits,
  };

  const planPath = path.join(WORK, opts.outName);
  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), "utf8");
  fs.copyFileSync(planPath, ACTIVE_PLAN);
  return { plan, planPath, openSimanim };
}

function writeWorkQueue(openSimanim, plan) {
  const queue = openSimanim.map((n) => `siman_${String(n).padStart(3, "0")}`);
  const wq = {
    generatedAt: new Date().toISOString(),
    source: "pipeline/refresh-open-worker-queue.mjs",
    range: plan.range,
    total: queue.length,
    workUnits: plan.workUnits.length,
    totalBlocks: plan.totalBlocks,
    queue,
    remaining: queue.length,
  };
  fs.writeFileSync(path.join(OC_ROOT, "work_queue.json"), JSON.stringify(wq, null, 2), "utf8");
  return wq;
}

function updateMaster(opts) {
  const m = fs.existsSync(MASTER)
    ? JSON.parse(fs.readFileSync(MASTER, "utf8"))
    : { version: 2 };
  m.phase = "editorial_105_697";
  m.finishThrough = opts.to;
  m.editorial105 = {
    from: opts.from,
    to: opts.to,
    planFile: opts.outName,
    waveSize: opts.to - opts.from + 1,
    skipSimanim: [],
  };
  if (m.cliLane) m.cliLane.enabled = false;
  fs.writeFileSync(MASTER, JSON.stringify(m, null, 2), "utf8");
}

function assignFirstWorkers(plan, workers) {
  let n = 0;
  for (const u of plan.workUnits) {
    if (n >= workers) break;
    u.status = "claimed";
    u.assignee = `orch-worker-${n + 1}`;
    u.claimedAt = new Date().toISOString();
    n++;
  }
  savePlan(plan);

  const assigned = plan.workUnits.filter((u) => u.status === "claimed");
  for (const u of assigned) {
    spawnSync(
      process.execPath,
      [
        path.join(__dirname, "build-editorial-siman-batch.mjs"),
        "--siman",
        String(u.siman),
        "--part",
        String(u.part),
        "--parts",
        String(u.parts),
      ],
      { cwd: OC_ROOT, encoding: "utf8" }
    );
  }
  return assigned;
}

function main() {
  const opts = parseArgs();
  fs.mkdirSync(WORK, { recursive: true });

  console.log(`Scanning open editorial blocks siman ${opts.from}–${opts.to}…`);
  const { plan, planPath, openSimanim } = buildPlan(opts);
  const wq = writeWorkQueue(openSimanim, plan);
  updateMaster(opts);

  fs.writeFileSync(LAUNCH_QUEUE, "[]", "utf8");

  let assigned = [];
  if (opts.assign) {
    assigned = assignFirstWorkers(plan, opts.workers);
    writeAssignmentBoard(opts.workers);
  }

  console.log("\n── Queue refreshed ──\n");
  console.log(`Open simanim: ${openSimanim.length} (${openSimanim.slice(0, 12).join(", ")}${openSimanim.length > 12 ? "…" : ""})`);
  console.log(`Work units: ${plan.workUnits.length} | Blocks: ${plan.totalBlocks}`);
  console.log(`Active plan: ${path.relative(OC_ROOT, ACTIVE_PLAN)}`);
  console.log(`Plan file:   ${path.relative(OC_ROOT, planPath)}`);
  console.log(`work_queue.json: ${wq.total} simanim`);
  if (opts.assign) {
    console.log(`\nAssigned to workers 1–${opts.workers}:`);
    for (const u of assigned) {
      console.log(`  ${u.assignee} → ${u.id} (${u.blocks} blocks)`);
    }
    console.log(`\ncoordinator-assignments.json updated.`);
    console.log(`Run: npm run pipeline:pool:watch:assign`);
  } else {
    console.log(`\nRun: node pipeline/refresh-open-worker-queue.mjs --assign`);
    console.log(`Or:  npm run pipeline:pool:tick`);
  }
  console.log("");
}

main();
