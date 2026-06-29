#!/usr/bin/env node
/**
 * One slot worker — loops until oc_complete: run assigned unit → wait for next claim.
 *
 *   node pipeline/pool-worker-loop.mjs --slot 1
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { setTimeout as sleep } from "timers/promises";
import { loadPlan } from "./lib/sprint-plan-io.mjs";
import { detectPhase } from "./pool-phase.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORKER = path.join(__dirname, "pool-worker-run.mjs");

function parseArgs() {
  let slot = 1;
  let pollSec = 20;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--slot" && a[i + 1]) slot = parseInt(a[++i], 10);
    else if (a[i] === "--poll" && a[i + 1]) pollSec = parseInt(a[++i], 10);
  }
  if (!Number.isFinite(slot) || slot < 1) throw new Error("Invalid --slot");
  return { slot, pollSec };
}

function myUnit(assignee) {
  const plan = loadPlan();
  return (plan.workUnits || []).find((u) => u.status === "claimed" && u.assignee === assignee);
}

async function main() {
  const { slot, pollSec } = parseArgs();
  const assignee = `orch-worker-${slot}`;
  let lastFinished = null;

  console.log(`[loop slot ${slot}] assignee=${assignee} poll=${pollSec}s`);

  for (;;) {
    const { phase } = detectPhase();
    if (phase === "oc_complete") {
      console.log(`[loop slot ${slot}] oc_complete — exit`);
      break;
    }

    const u = myUnit(assignee);
    if (!u || u.id === lastFinished) {
      await sleep(pollSec * 1000);
      continue;
    }

    console.log(`[loop slot ${slot}] start ${u.id}`);
    const r = spawnSync(process.execPath, [WORKER, "--unit", u.id], {
      cwd: OC_ROOT,
      stdio: "inherit",
      env: { ...process.env, SPRINT_WORKER_ID: assignee },
    });

    if (r.status === 0) {
      console.log(`[loop slot ${slot}] done ${u.id}`);
      lastFinished = u.id;
    } else {
      console.error(`[loop slot ${slot}] failed ${u.id} exit=${r.status}`);
      await sleep(pollSec * 1000);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
