/**
 * IDE-mode coordinator helpers: detect idle claimed units, write assignment board.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadPlan, savePlan, WORK } from "./sprint-plan-io.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..", "..");
const ASSIGNMENTS = path.join(WORK, "coordinator-assignments.json");

export function unitPaths(unit) {
  const tag = String(unit.siman).padStart(3, "0");
  const suffix = unit.parts > 1 ? `-part${unit.part}of${unit.parts}` : "";
  return {
    batchPath: path.join(WORK, `batch-editorial-siman-${tag}${suffix}.md`),
    queuePath: path.join(WORK, `editorial-queue-siman-${tag}${suffix}.json`),
  };
}

/** Latest mtime among output files referenced by this unit's queue. */
export function lastActivityMs(unit) {
  const { queuePath } = unitPaths(unit);
  if (!fs.existsSync(queuePath)) return 0;
  let latest = 0;
  try {
    const q = JSON.parse(fs.readFileSync(queuePath, "utf8"));
    for (const it of q.items || []) {
      const abs = it.absPath || path.join(OC_ROOT, "output", it.file || "");
      if (fs.existsSync(abs)) {
        const m = fs.statSync(abs).mtimeMs;
        if (m > latest) latest = m;
      }
    }
  } catch {
    /* ignore */
  }
  return latest;
}

/**
 * Release claimed units with no file activity since claim (IDE agents stalled).
 * @returns {number} released count
 */
export function releaseIdleIdeClaims(idleMs) {
  const plan = loadPlan();
  const now = Date.now();
  let released = 0;
  for (const u of plan.workUnits || []) {
    if (u.status !== "claimed" || !u.claimedAt) continue;
    const claimedMs = new Date(u.claimedAt).getTime();
    const activity = lastActivityMs(u);
    const idleSinceClaim = activity <= claimedMs;
    const age = now - claimedMs;
    if (age > idleMs && idleSinceClaim) {
      u.status = "pending";
      u.assignee = null;
      delete u.claimedAt;
      released++;
    }
  }
  if (released) savePlan(plan);
  return released;
}

export function writeAssignmentBoard(workers = 4) {
  const plan = loadPlan();
  const claimed = (plan.workUnits || []).filter((u) => u.status === "claimed");
  const pending = (plan.workUnits || []).filter((u) => u.status === "pending");
  const slots = [];

  for (let i = 0; i < workers; i++) {
    const u = claimed[i];
    if (u) {
      const { batchPath, queuePath } = unitPaths(u);
      slots.push({
        slot: i + 1,
        role: "translator",
        unitId: u.id,
        siman: u.siman,
        part: u.part,
        parts: u.parts,
        batchPath: path.relative(OC_ROOT, batchPath).replace(/\\/g, "/"),
        queuePath: path.relative(OC_ROOT, queuePath).replace(/\\/g, "/"),
        claimedAt: u.claimedAt,
        lastFileActivity: lastActivityMs(u)
          ? new Date(lastActivityMs(u)).toISOString()
          : null,
        action: "Translate batch → node pipeline/sprint-worker.mjs when done",
      });
    } else {
      slots.push({ slot: i + 1, role: "idle", unitId: null });
    }
  }

  const board = {
    updatedAt: new Date().toISOString(),
    mode: "ide",
    coordinator: "pool-coordinator-watch (worker #5 — Node, not Ollama)",
    workers,
    claimed: claimed.length,
    pending: pending.length,
    done: (plan.workUnits || []).filter((u) => u.status === "done").length,
    total: (plan.workUnits || []).length,
    nextPending: pending.slice(0, 4).map((u) => u.id),
    slots,
  };

  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(ASSIGNMENTS, JSON.stringify(board, null, 2) + "\n", "utf8");
  return board;
}
