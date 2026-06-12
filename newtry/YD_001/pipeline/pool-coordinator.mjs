#!/usr/bin/env node
/**
 * Worker pool coordinator — keep N editorial workers claimed; output launch queue.
 *
 *   node pipeline/pool-coordinator.mjs status
 *   node pipeline/pool-coordinator.mjs tick --workers 4
 *   node pipeline/pool-coordinator.mjs release-stale
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import {
  assignUnits,
  cliReservedSimanim,
  loadPlan,
  planStats,
  releaseStale,
  WORK,
} from "./lib/sprint-plan-io.mjs";
import { detectPhase, advanceIfIdle } from "./pool-phase.mjs";

const MASTER = path.join(WORK, "master-pipeline-plan.json");

function skipSimanimForPhase() {
  const reserved = cliReservedSimanim();
  if (!fs.existsSync(MASTER)) return reserved;
  try {
    const m = JSON.parse(fs.readFileSync(MASTER, "utf8"));
    if (m.cliLane?.enabled === false) return reserved;
    if (m.phase === "editorial_6_403" && m.editorial105?.skipSimanim?.length) {
      for (const s of m.editorial105.skipSimanim) reserved.add(s);
    }
  } catch {
    /* ignore */
  }
  return reserved;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const POOL_STATE = path.join(WORK, "pool-state.json");
const LAUNCH_QUEUE = path.join(WORK, "pool-launch-queue.json");

function parseArgs() {
  const opts = { action: "status", workers: 4, staleHours: 2 };
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (["status", "tick", "release-stale", "clear-queue"].includes(x)) opts.action = x;
    else if (x === "--workers" && a[i + 1]) opts.workers = parseInt(a[++i], 10);
    else if (x === "--stale-hours" && a[i + 1]) opts.staleHours = parseFloat(a[++i]);
  }
  return opts;
}

function savePoolState(patch) {
  const base = fs.existsSync(POOL_STATE)
    ? JSON.parse(fs.readFileSync(POOL_STATE, "utf8"))
    : { targetWorkers: 4, cycles: 0 };
  const next = { ...base, ...patch, lastTick: new Date().toISOString() };
  fs.writeFileSync(POOL_STATE, JSON.stringify(next, null, 2), "utf8");
}

function buildBatches(units) {
  const built = [];
  for (const u of units) {
    const r = spawnSync(
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
    if (r.status !== 0) {
      console.error(`[pool] batch build failed siman ${u.siman} part ${u.part}`);
      continue;
    }
    const tag = String(u.siman).padStart(3, "0");
    const suffix = u.parts > 1 ? `-part${u.part}of${u.parts}` : "";
    built.push({
      ...u,
      batchPath: `pipeline/work/batch-editorial-siman-${tag}${suffix}.md`,
      queuePath: `pipeline/work/editorial-queue-siman-${tag}${suffix}.json`,
    });
  }
  return built;
}

function status() {
  const plan = loadPlan();
  const stats = planStats(plan);
  const { phase, activeStats } = detectPhase();
  const reserved = [...skipSimanimForPhase()];
  const pool = fs.existsSync(POOL_STATE)
    ? JSON.parse(fs.readFileSync(POOL_STATE, "utf8"))
    : {};
  const queue = fs.existsSync(LAUNCH_QUEUE)
    ? JSON.parse(fs.readFileSync(LAUNCH_QUEUE, "utf8"))
    : [];

  console.log("\n── Worker pool ──\n");
  console.log(
    `Phase: ${phase} (active plan: pending=${activeStats.pending} claimed=${activeStats.claimed} done=${activeStats.done}/${activeStats.total})`
  );
  if (phase === "ready_retranslate_1_20") {
    console.log("→ Run: npm run pipeline:phase:start-1-20");
  }
  if (phase === "html_presentation") {
    console.log("→ Launch ONE agent: translation/AGENT_HTML_PRESENTATION.md; then mark-html-complete");
  }
  if (phase === "yd_complete") {
    console.log("→ Yoreh De'ah editorial pipeline complete.");
  }
  console.log(`Target workers: ${pool.targetWorkers ?? 4}`);
  console.log(`Sprint: pending=${stats.pending} claimed=${stats.claimed} done=${stats.done}`);
  if (reserved.length) console.log(`CLI reserved (skip local): ${reserved.join(", ")}`);
  if (queue.length) console.log(`Launch queue: ${queue.length} unit(s)`);
  const claimed = (plan.workUnits || []).filter((u) => u.status === "claimed");
  for (const u of claimed) {
    console.log(`  ${u.id} → ${u.assignee} since ${u.claimedAt || "?"}`);
  }
  console.log("");
}

function tick(workers) {
  releaseStale(2 * 60 * 60 * 1000);
  let { phase, activeStats } = detectPhase();

  if (
    activeStats.pending === 0 &&
    activeStats.claimed === 0 &&
    [
      "ready_editorial_gaps",
      "ready_editorial_101_104",
      "ready_html_presentation",
      "ready_editorial_105",
      "retranslate_1_20",
      "editorial_gaps",
      "editorial_101_104",
    ].includes(phase)
  ) {
    const adv = advanceIfIdle();
    if (adv.advanced) {
      ({ phase, activeStats } = detectPhase());
    }
  }

  if (phase === "html_presentation" || phase === "ready_html_presentation") {
    console.log(
      JSON.stringify({
        need: 0,
        assigned: [],
        phase: "html_presentation",
        message:
          "HTML presentation — launch ONE subagent on AGENT_HTML_PRESENTATION.md; npm run pipeline:html:batch; then npm run pipeline:phase:mark-html-complete",
      })
    );
    return { need: 0, assigned: [], phase: "html_presentation" };
  }

  if (phase === "yd_complete") {
    console.log(JSON.stringify({ need: 0, assigned: [], phase, message: "OC complete." }));
    return { need: 0, assigned: [], phase };
  }

  const plan = loadPlan();
  const stats = planStats(plan);
  const reserved = skipSimanimForPhase();
  const need = Math.max(0, workers - stats.claimed);
  let newUnits = [];

  if (need > 0) {
    const { slots } = assignUnits(need, { skipSimanim: reserved });
    newUnits = buildBatches(slots);
    const q = fs.existsSync(LAUNCH_QUEUE)
      ? JSON.parse(fs.readFileSync(LAUNCH_QUEUE, "utf8"))
      : [];
    fs.writeFileSync(LAUNCH_QUEUE, JSON.stringify([...q, ...newUnits], null, 2), "utf8");
  }

  const after = planStats(loadPlan());
  const prev = fs.existsSync(POOL_STATE)
    ? JSON.parse(fs.readFileSync(POOL_STATE, "utf8"))
    : { cycles: 0 };
  savePoolState({
    targetWorkers: workers,
    cycles: (prev.cycles || 0) + 1,
    lastStats: after,
    cliReserved: [...reserved],
    lastAssigned: newUnits.map((u) => u.id),
  });

  const out = {
    need,
    assigned: newUnits,
    stats: after,
    cliReserved: [...reserved],
    message:
      need > 0
        ? `Assigned ${newUnits.length} unit(s); launch ${newUnits.length} worker agent(s).`
        : "Pool full — no new assignments.",
  };
  console.log(JSON.stringify(out, null, 2));
  return out;
}

function main() {
  const opts = parseArgs();
  fs.mkdirSync(WORK, { recursive: true });

  switch (opts.action) {
    case "status":
      status();
      break;
    case "release-stale": {
      const n = releaseStale(opts.staleHours * 60 * 60 * 1000);
      console.log(`Released ${n} stale claim(s).`);
      break;
    }
    case "clear-queue":
      fs.writeFileSync(LAUNCH_QUEUE, "[]", "utf8");
      console.log("Cleared pool-launch-queue.json");
      break;
    case "tick":
      tick(opts.workers);
      break;
    default:
      console.error("Unknown action");
      process.exit(1);
  }
}

main();
