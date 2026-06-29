/**
 * Persistent state for the OC001 editorial loop (siman 21 → 697).
 */
import fs from "fs";
import path from "path";

export const DEFAULT_STATE = {
  version: 1,
  fromSiman: 21,
  toSiman: 697,
  /** Simanim fully advanced (dictionary + validate recorded). */
  completedSimanim: [],
  /** Current siman being edited (null = pick next). */
  currentSiman: null,
  /** Part index when a siman is split across multiple batches. */
  currentPart: 0,
  /** Total parts for current siman (1 if unsplit). */
  totalParts: 1,
  phase: "idle",
  lastUpdated: null,
  lastBatchPath: null,
  lastQueuePath: null,
  stats: { blocksQueued: 0, blocksAdvanced: 0 },
};

export function statePath(workDir) {
  return path.join(workDir, "editorial-loop-state.json");
}

export function loadEditorialState(workDir) {
  const p = statePath(workDir);
  if (!fs.existsSync(p)) return { ...DEFAULT_STATE, completedSimanim: [] };
  try {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    return { ...DEFAULT_STATE, ...j, completedSimanim: j.completedSimanim || [] };
  } catch {
    return { ...DEFAULT_STATE, completedSimanim: [] };
  }
}

export function saveEditorialState(workDir, state) {
  state.lastUpdated = new Date().toISOString();
  fs.mkdirSync(workDir, { recursive: true });
  fs.writeFileSync(statePath(workDir), JSON.stringify(state, null, 2), "utf8");
}

export function nextSiman(state) {
  const done = new Set(state.completedSimanim || []);
  for (let n = state.fromSiman; n <= state.toSiman; n++) {
    if (!done.has(n)) return n;
  }
  return null;
}

export function manifestPath(workDir) {
  return path.join(workDir, "editorial-loop-manifest.md");
}
