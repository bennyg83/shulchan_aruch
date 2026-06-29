#!/usr/bin/env node
/**
 * Long-running pool supervisor: tick, spawn pool-worker-run children, auto-advance waves to finishThrough.
 *
 *   node pipeline/pool-coordinator-watch.mjs
 *   node pipeline/pool-coordinator-watch.mjs --workers 4 --interval 90
 *   node pipeline/pool-coordinator-watch.mjs --once
 *
 * Backends: OC001_POOL_BACKEND=ollama | claude-cli | cursor | ide (assign-only)
 */
import fs from "fs";
import path from "path";
import { spawn, spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { loadPlan, planStats, releaseStale, WORK } from "./lib/sprint-plan-io.mjs";
import {
  loadActiveWorkers,
  saveActiveWorkers,
  isPidAlive,
} from "./lib/pool-worker-registry.mjs";
import { detectPhase, advanceIfIdle } from "./pool-phase.mjs";
import {
  releaseIdleIdeClaims,
  writeAssignmentBoard,
} from "./lib/pool-coordinator-ide.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const COORDINATOR = path.join(__dirname, "pool-coordinator.mjs");
const WORKER = path.join(__dirname, "pool-worker-run.mjs");
const LOG = path.join(WORK, "pool-watch.log");

function parseArgs() {
  const a = process.argv.slice(2);
  const opts = {
    workers: 4,
    intervalSec: 90,
    staleHours: 2,
    once: false,
    maxCycles: 0,
    assignOnly: false,
    noSpawn: false,
    ideIdleMinutes: 45,
  };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--workers" && a[i + 1]) opts.workers = parseInt(a[++i], 10);
    else if (a[i] === "--interval" && a[i + 1]) opts.intervalSec = parseInt(a[++i], 10);
    else if (a[i] === "--stale-hours" && a[i + 1]) opts.staleHours = parseFloat(a[++i]);
    else if (a[i] === "--once") opts.once = true;
    else if (a[i] === "--max-cycles" && a[i + 1]) opts.maxCycles = parseInt(a[++i], 10);
    else if (a[i] === "--assign-only") opts.assignOnly = true;
    else if (a[i] === "--no-spawn") opts.noSpawn = true;
    else if (a[i] === "--ide-idle-minutes" && a[i + 1])
      opts.ideIdleMinutes = parseFloat(a[++i]);
  }
  if ((process.env.OC001_POOL_BACKEND || "").toLowerCase() === "ide") opts.assignOnly = true;
  return opts;
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.mkdirSync(WORK, { recursive: true });
  fs.appendFileSync(LOG, line + "\n", "utf8");
}

function reapWorkers() {
  const active = loadActiveWorkers();
  const kept = [];
  let reaped = 0;
  for (const w of active) {
    if (isPidAlive(w.pid)) {
      kept.push(w);
      continue;
    }
    reaped++;
    const plan = loadPlan();
    const u = (plan.workUnits || []).find((x) => x.id === w.unitId);
    if (u?.status === "claimed") {
      log(`WARN unit ${w.unitId} worker exited (code ${w.exitCode ?? "?"}) but still claimed — will stale-release`);
    } else if (u?.status === "done") {
      log(`reaped ${w.unitId} → done`);
    } else {
      log(`reaped ${w.unitId}`);
    }
  }
  saveActiveWorkers(kept);
  return { running: kept.length, reaped };
}

function spawnWorker(unit) {
  const env = {
    ...process.env,
    SPRINT_WORKER_ID: unit.assignee || "pool-worker",
  };
  const child = spawn(process.execPath, [WORKER, "--unit", unit.id], {
    cwd: OC_ROOT,
    env,
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  child.unref();
  const entry = {
    unitId: unit.id,
    siman: unit.siman,
    part: unit.part,
    pid: child.pid,
    startedAt: new Date().toISOString(),
  };
  const active = loadActiveWorkers();
  active.push(entry);
  saveActiveWorkers(active);
  log(`spawned ${unit.id} pid=${child.pid}`);
  return entry;
}

function tickCoordinator(workers) {
  const r = spawnSync(process.execPath, [COORDINATOR, "tick", "--workers", String(workers)], {
    cwd: OC_ROOT,
    encoding: "utf8",
  });
  if (r.status !== 0) {
    log(`tick failed: ${(r.stderr || r.stdout || "").slice(-400)}`);
    return null;
  }
  try {
    const m = r.stdout.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : null;
  } catch {
    return null;
  }
}

function claimedUnitsWithoutWorker(activePids) {
  const runningIds = new Set(activePids.map((w) => w.unitId));
  const plan = loadPlan();
  return (plan.workUnits || []).filter((u) => u.status === "claimed" && !runningIds.has(u.id));
}

function tryAdvancePhase() {
  const { phase, activeStats } = detectPhase();
  if (activeStats.pending > 0 || activeStats.claimed > 0) return { phase, advanced: false };
  const r = advanceIfIdle();
  if (r.advanced) log(`phase advance: ${r.phase} — ${r.action || ""}`);
  return { phase: r.phase || phase, advanced: r.advanced };
}

function hasBackend(opts) {
  if (opts.assignOnly) return "ide";
  const b = (process.env.OC001_POOL_BACKEND || "").toLowerCase();
  if (b === "ide" || b === "manual") return "ide";
  if (b === "ollama" || process.env.OC001_OLLAMA_URL || process.env.OC001_POOL_USE_OLLAMA === "1")
    return "ollama";
  if (b === "claude-cli" || b === "claude" || process.env.OC001_POOL_USE_CLAUDE_CLI === "1")
    return "claude-cli";
  if (b === "cursor" || process.env.CURSOR_API_KEY) return "cursor";
  return null;
}

async function cycle(opts, cycleNum) {
  const backend = hasBackend(opts);
  if (!backend) {
    log(
      "STOP: set OC001_POOL_BACKEND=ollama + OC001_OLLAMA_URL, or claude-cli, or --assign-only for IDE workers"
    );
    return false;
  }

  const { phase, activeStats } = detectPhase();
  if (phase === "oc_complete") {
    log("Orach Chayim editorial complete (oc_complete).");
    return false;
  }
  if (phase === "html_presentation" || phase === "ready_html_presentation") {
    log(`Phase ${phase} — run HTML agent manually, then mark-html-complete`);
    return true;
  }

  if (cycleNum > 0 && cycleNum % 10 === 0) {
    const n = releaseStale(opts.staleHours * 60 * 60 * 1000);
    if (n) log(`release-stale: ${n} unit(s)`);
  }

  const { running } = reapWorkers();
  const active = loadActiveWorkers();
  const stats = planStats(loadPlan());

  const slots = Math.max(0, opts.workers - running);
  if (slots > 0 && stats.claimed < opts.workers) {
    tickCoordinator(opts.workers);
  }

  reapWorkers();
  const active2 = loadActiveWorkers();
  const needSpawn = claimedUnitsWithoutWorker(active2).slice(0, Math.max(0, opts.workers - active2.length));

  if (!opts.assignOnly && !opts.noSpawn && backend !== "ide") {
    for (const u of needSpawn) {
      if (active2.length >= opts.workers) break;
      spawnWorker(u);
      active2.push({ unitId: u.id });
    }
  } else if (needSpawn.length) {
    writeAssignmentBoard(opts.workers);
    for (const u of needSpawn.slice(0, opts.workers)) {
      const tag = String(u.siman).padStart(3, "0");
      const sfx = u.parts > 1 ? `-part${u.part}of${u.parts}` : "";
      log(
        `SLOT open: ${u.id} → pipeline/work/batch-editorial-siman-${tag}${sfx}.md (see coordinator-assignments.json)`
      );
    }
  }

  const after = planStats(loadPlan());
  log(
    `cycle ${cycleNum} phase=${phase} running=${loadActiveWorkers().length} claimed=${after.claimed} done=${after.done}/${after.total} pending=${after.pending} backend=${backend}`
  );

  if (after.pending === 0 && after.claimed === 0 && loadActiveWorkers().length === 0) {
    tryAdvancePhase();
  }

  return true;
}

async function main() {
  const opts = parseArgs();
  fs.mkdirSync(WORK, { recursive: true });
  if (!fs.existsSync(LOG)) fs.writeFileSync(LOG, "", "utf8");

  log(
    `pool-watch start workers=${opts.workers} interval=${opts.intervalSec}s once=${opts.once}`
  );

  let cycleNum = 0;
  for (;;) {
    cycleNum++;
    const cont = await cycle(opts, cycleNum);
    if (!cont) break;
    if (opts.once) break;
    if (opts.maxCycles > 0 && cycleNum >= opts.maxCycles) break;
    await new Promise((r) => setTimeout(r, opts.intervalSec * 1000));
  }
  log("pool-watch exit");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
