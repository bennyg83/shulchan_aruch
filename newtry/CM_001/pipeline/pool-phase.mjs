#!/usr/bin/env node
/**
 * Master pipeline phases through OC completion.
 *
 *   node pipeline/pool-phase.mjs status
 *   node pipeline/pool-phase.mjs start-1-20
 *   node pipeline/pool-phase.mjs advance-if-idle
 *   node pipeline/pool-phase.mjs mark-html-complete
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { WORK, loadPlan, planStats } from "./lib/sprint-plan-io.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const MASTER = path.join(WORK, "master-pipeline-plan.json");
const LEGACY_PASS = path.join(WORK, "pass-plan-1-20-after-100.json");
const ACTIVE_PLAN = path.join(WORK, "active-sprint-plan.json");
const HTML_DONE = path.join(WORK, "html-presentation-complete.flag");

function loadMaster() {
  const p = fs.existsSync(MASTER) ? MASTER : LEGACY_PASS;
  if (!fs.existsSync(p)) {
    return {
      version: 2,
      phase: "ready_retranslate_1_20",
      editorial105: { from: 105, to: 427, skipSimanim: [101, 102, 103, 104] },
      publish: { noPublishFromSiman: 50 },
    };
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function saveMaster(m) {
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(MASTER, JSON.stringify(m, null, 2), "utf8");
}

function planStatsFile(planPath) {
  if (!fs.existsSync(planPath)) return { pending: 0, claimed: 0, done: 0, total: 0, exists: false };
  const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
  return { ...planStats(plan), exists: true, range: plan.range };
}

function activePlanStats() {
  const s = planStats(loadPlan());
  return { ...s, exists: s.total > 0 };
}

function simanimWithOpenBlocks(from, to) {
  const outRoot = path.join(OC_ROOT, "output");
  const done = loadEditorialDoneIds(WORK);
  const list = [];
  for (let s = from; s <= to; s++) {
    if (collectEditorialBlocks(outRoot, s, "all", "warn", done).length) list.push(s);
  }
  return list;
}

function runPlan(from, to, outName, maxBlocks = 40) {
  const r = spawnSync(
    process.execPath,
    [
      path.join(__dirname, "sprint-plan-to-100.mjs"),
      "--from",
      String(from),
      "--to",
      String(to),
      "--max-blocks",
      String(maxBlocks),
      "--out",
      outName,
    ],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    return false;
  }
  return true;
}

function activatePlan(planFile, phase) {
  const src = path.join(WORK, planFile);
  if (!fs.existsSync(src)) return false;
  fs.copyFileSync(src, ACTIVE_PLAN);
  const m = loadMaster();
  m.phase = phase;
  saveMaster(m);
  return true;
}

function planIdle(stats) {
  return stats.exists && stats.total > 0 && stats.pending === 0 && stats.claimed === 0;
}

export function detectPhase() {
  const m = loadMaster();
  const stats = activePlanStats();
  const phase = m.phase || "ready_retranslate_1_20";

  if (phase === "cm_complete") return { phase, master: m, activeStats: stats };

  if (phase === "editorial_6_403") {
    const finishThrough = m.finishThrough ?? m.editorial105?.to ?? 427;
    const curTo = stats.range?.to ?? m.editorial105?.to ?? finishThrough;
    if (planIdle(stats) && curTo < finishThrough) {
      return { phase: "ready_editorial_105_wave", master: m, activeStats: stats };
    }
    if (planIdle(stats)) return { phase: "cm_complete", master: m, activeStats: stats };
    return { phase, master: m, activeStats: stats };
  }

  if (phase === "html_presentation") {
    if (fs.existsSync(HTML_DONE)) {
      return { phase: "ready_editorial_105", master: m, activeStats: stats };
    }
    return { phase, master: m, activeStats: stats };
  }

  if (phase === "editorial_gaps" || phase === "retranslate_1_20") {
    if (planIdle(stats)) {
      if (phase === "retranslate_1_20") {
        return { phase: "ready_editorial_gaps", master: m, activeStats: stats };
      }
      if (phase === "editorial_gaps") {
        return { phase: "ready_html_presentation", master: m, activeStats: stats };
      }
    }
    return { phase, master: m, activeStats: stats };
  }

  if (phase === "ready_retranslate_1_20" || phase === "sprint_to_100_first") {
    const p32 = planStatsFile(path.join(WORK, "sprint-plan-32-100.json"));
    const sprint100Done = p32.total > 0 && p32.pending === 0 && p32.claimed === 0;
    if (sprint100Done) return { phase: "ready_retranslate_1_20", master: m, activeStats: stats };
    return { phase: "sprint_to_100_first", master: m, activeStats: stats };
  }

  return { phase, master: m, activeStats: stats };
}

/** Auto-advance when active sprint plan has no pending/claimed work. */
export function advanceIfIdle() {
  const { phase, activeStats: stats } = detectPhase();
  if (stats.pending > 0 || stats.claimed > 0) {
    return { advanced: false, phase, reason: "active plan still has work" };
  }

  const m = loadMaster();
  let advanced = false;
  let nextPhase = phase;

  if (phase === "ready_retranslate_1_20" || phase === "retranslate_1_20") {
    if (phase === "retranslate_1_20" && !planIdle(stats)) {
      return { advanced: false, phase, reason: "1-20 plan not idle" };
    }
    if (!fs.existsSync(path.join(WORK, "sprint-plan-1-20-pass.json"))) {
      runPlan(1, 20, "sprint-plan-1-20-pass.json");
    }
    activatePlan("sprint-plan-1-20-pass.json", "retranslate_1_20");
    return { advanced: true, phase: "retranslate_1_20", action: "activated 1-20" };
  }

  if (phase === "ready_editorial_gaps" || (phase === "retranslate_1_20" && planIdle(stats))) {
    const rem = simanimWithOpenBlocks(1, 20);
    if (rem.length) {
      const lo = Math.min(...rem);
      const hi = Math.max(...rem);
      runPlan(lo, hi, "sprint-plan-1-20-remainder.json");
      activatePlan("sprint-plan-1-20-remainder.json", "retranslate_1_20");
      return {
        advanced: true,
        phase: "retranslate_1_20",
        action: `1–20 remainder: simanim ${rem.join(", ")}`,
      };
    }
    const gaps = m.editorialGaps?.simanim || [61, 66, 71, 74, 75, 76, 79, 89, 90, 91, 92, 94];
    const lo = Math.min(...gaps);
    const hi = Math.max(...gaps);
    if (!fs.existsSync(path.join(WORK, "sprint-plan-gaps.json"))) {
      runPlan(lo, hi, "sprint-plan-gaps.json");
    }
    activatePlan("sprint-plan-gaps.json", "editorial_gaps");
    return { advanced: true, phase: "editorial_gaps", action: `activated gaps ${lo}-${hi}` };
  }

  if (phase === "ready_editorial_101_104" || (phase === "editorial_gaps" && planIdle(stats))) {
    const from = m.editorial101_104?.from ?? 101;
    const to = m.editorial101_104?.to ?? 104;
    const out = m.editorial101_104?.planFile || "sprint-plan-101-104.json";
    if (!fs.existsSync(path.join(WORK, out))) {
      runPlan(from, to, out);
    }
    activatePlan(out, "editorial_101_104");
    return { advanced: true, phase: "editorial_101_104", action: `activated ${from}-${to}` };
  }

  if (phase === "ready_html_presentation" || (phase === "editorial_101_104" && planIdle(stats))) {
    m.phase = "html_presentation";
    saveMaster(m);
    return { advanced: true, phase: "html_presentation", action: "launch HTML agent" };
  }

  if (phase === "ready_editorial_105" || (phase === "html_presentation" && fs.existsSync(HTML_DONE))) {
    const from = m.editorial105?.from ?? 105;
    const to = m.editorial105?.to ?? 427;
    const out = m.editorial105?.planFile || "sprint-plan-105-427.json";
    if (!fs.existsSync(path.join(WORK, out))) {
      runPlan(from, to, out);
    }
    activatePlan(out, "editorial_6_403");
    return { advanced: true, phase: "editorial_6_403", action: `activated ${from}-${to}` };
  }

  if (phase === "editorial_6_403" && planIdle(stats)) {
    const finishThrough = m.finishThrough ?? 427;
    const curTo = stats.range?.to ?? m.editorial105?.to ?? 100;
    if (curTo < finishThrough) {
      const waveSize = m.editorial105?.waveSize ?? 96;
      const nextFrom = curTo + 1;
      const nextTo = Math.min(curTo + waveSize, finishThrough);
      const out = `sprint-plan-${nextFrom}-${nextTo}.json`;
      if (!runPlan(nextFrom, nextTo, out)) {
        return { advanced: false, phase, reason: `failed to build ${out}` };
      }
      activatePlan(out, "editorial_6_403");
      m.editorial105 = { ...m.editorial105, from: nextFrom, to: nextTo, planFile: out };
      saveMaster(m);
      return {
        advanced: true,
        phase: "editorial_6_403",
        action: `next wave simanim ${nextFrom}–${nextTo} (${out})`,
      };
    }
    m.phase = "cm_complete";
    saveMaster(m);
    return { advanced: true, phase: "cm_complete", action: "Choshen Mishpat editorial complete" };
  }

  if (phase === "ready_editorial_105_wave") {
    const finishThrough = m.finishThrough ?? 427;
    const curTo = m.editorial105?.to ?? 100;
    const waveSize = m.editorial105?.waveSize ?? 96;
    const nextFrom = curTo + 1;
    const nextTo = Math.min(curTo + waveSize, finishThrough);
    const out = `sprint-plan-${nextFrom}-${nextTo}.json`;
    if (!runPlan(nextFrom, nextTo, out)) {
      return { advanced: false, phase, reason: `failed to build ${out}` };
    }
    activatePlan(out, "editorial_6_403");
    m.editorial105 = { ...m.editorial105, from: nextFrom, to: nextTo, planFile: out };
    saveMaster(m);
    return {
      advanced: true,
      phase: "editorial_6_403",
      action: `activated wave ${nextFrom}–${nextTo}`,
    };
  }

  return { advanced, phase: nextPhase };
}

function start120() {
  spawnSync(process.execPath, [path.join(__dirname, "reset-editorial-done.mjs"), "--from", "1", "--to", "20"], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  runPlan(1, 20, "sprint-plan-1-20-pass.json");
  activatePlan("sprint-plan-1-20-pass.json", "retranslate_1_20");
  const m = loadMaster();
  m.phase = "retranslate_1_20";
  saveMaster(m);
  console.log("Started 1–20 pass. Run: npm run pipeline:pool:tick");
}

function parseArgs() {
  return { action: process.argv[2] || "status" };
}

function main() {
  fs.mkdirSync(WORK, { recursive: true });
  const { action } = parseArgs();

  switch (action) {
    case "status": {
      const d = detectPhase();
      const stats = activePlanStats();
      console.log(
        JSON.stringify(
          {
            phase: d.phase,
            activeStats: stats,
            masterPhase: d.master?.phase,
            htmlComplete: fs.existsSync(HTML_DONE),
            noPublishFrom: d.master?.publish?.noPublishFromSiman ?? 105,
            next:
              d.phase === "ready_retranslate_1_20"
                ? "npm run pipeline:phase:start-1-20"
                : d.phase === "html_presentation"
                  ? "Launch AGENT_HTML_PRESENTATION.md; then mark-html-complete"
                  : d.phase === "ready_editorial_105"
                    ? "advance-if-idle or start 105 plan"
                    : null,
          },
          null,
          2
        )
      );
      break;
    }
    case "start-1-20":
      start120();
      break;
    case "advance-if-idle": {
      const r = advanceIfIdle();
      console.log(JSON.stringify(r, null, 2));
      break;
    }
    case "mark-html-complete": {
      fs.writeFileSync(HTML_DONE, new Date().toISOString() + "\n", "utf8");
      const r = advanceIfIdle();
      console.log("HTML pass marked complete.", JSON.stringify(r, null, 2));
      break;
    }
    case "prepare-1-20":
      runPlan(1, 20, "sprint-plan-1-20-pass.json");
      break;
    case "activate-1-20":
      activatePlan("sprint-plan-1-20-pass.json", "retranslate_1_20");
      break;
    default:
      console.error("Usage: status | start-1-20 | advance-if-idle | mark-html-complete | prepare-1-20 | activate-1-20");
      process.exit(1);
  }
}

const isMain =
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);
if (isMain) main();
