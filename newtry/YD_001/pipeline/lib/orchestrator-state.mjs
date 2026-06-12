/**
 * Publish / release checkpoints for the YD001 editorial orchestrator.
 */
import fs from "fs";
import path from "path";
import { loadEditorialState } from "./editorial-state.mjs";

export const DEFAULT_ORCH_STATE = {
  version: 1,
  /** Push corpus to GitHub after this many newly finished simanim (21+). */
  publishEvery: 5,
  /** Trigger full web reader deploy (git push → GH Pages) at these siman milestones. */
  releaseEvery: 10,
  /** Highest siman number whose English is published into public/corpus. */
  lastPublishedThrough: 20,
  /** Highest siman at which we last ran a release deploy. */
  lastReleasedThrough: 20,
  lastPushAt: null,
  lastReleaseAt: null,
  /** Do not auto-publish corpus/webapp for simanim at or above this number (user request). */
  noPublishFromSiman: 50,
  history: [],
};

export function orchestratorStatePath(workDir) {
  return path.join(workDir, "orchestrator-state.json");
}

export function loadOrchestratorState(workDir) {
  const p = orchestratorStatePath(workDir);
  if (!fs.existsSync(p)) return { ...DEFAULT_ORCH_STATE, history: [] };
  try {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    return { ...DEFAULT_ORCH_STATE, ...j, history: j.history || [] };
  } catch {
    return { ...DEFAULT_ORCH_STATE, history: [] };
  }
}

export function saveOrchestratorState(workDir, state) {
  fs.mkdirSync(workDir, { recursive: true });
  fs.writeFileSync(orchestratorStatePath(workDir), JSON.stringify(state, null, 2), "utf8");
}

/** Editorial simanim marked complete in editorial-loop-state.json. */
export function editorialCompletedSimanim(workDir) {
  const st = loadEditorialState(workDir);
  return [...(st.completedSimanim || [])].sort((a, b) => a - b);
}

/**
 * Next batch of simanim ready to publish (exactly publishEvery contiguous finished simanim).
 * Returns { from, to, simanim } or null.
 */
export function nextPublishBatch(workDir, orch) {
  const cap = orch.noPublishFromSiman ?? 105;
  const completed = new Set(editorialCompletedSimanim(workDir));
  const start = orch.lastPublishedThrough + 1;
  if (start >= cap) return null;
  const end = Math.min(start + orch.publishEvery - 1, cap - 1);
  for (let s = start; s <= end; s++) {
    if (!completed.has(s)) return null;
  }
  return { from: start, to: end, simanim: range(start, end) };
}

/**
 * Release milestone: highest multiple of releaseEvery at or below max completed (from siman 21).
 * e.g. releaseEvery=10 → 30 when simanim 21–30 are complete.
 */
export function releaseMilestone(workDir, orch) {
  const cap = orch.noPublishFromSiman ?? 105;
  const completed = editorialCompletedSimanim(workDir).filter((s) => s >= 21 && s < cap);
  if (!completed.length) return null;
  const max = completed[completed.length - 1];
  const base = 20;
  const milestone = Math.floor((max - base) / orch.releaseEvery) * orch.releaseEvery + base;
  if (milestone <= orch.lastReleasedThrough || milestone >= cap) return null;
  const simanim = range(21, milestone);
  const allDone = simanim.every((s) => completed.includes(s));
  if (!allDone) return null;
  return { through: milestone, simanim };
}

function range(a, b) {
  const out = [];
  for (let n = a; n <= b; n++) out.push(n);
  return out;
}

export function recordOrchEvent(state, event) {
  state.history = state.history || [];
  state.history.push({ ...event, at: new Date().toISOString() });
  if (state.history.length > 100) state.history = state.history.slice(-100);
}
