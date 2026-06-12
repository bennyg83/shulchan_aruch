import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const WORK = path.join(__dirname, "..", "work");

export function planPath() {
  const active = path.join(WORK, "active-sprint-plan.json");
  if (fs.existsSync(active)) return active;
  const p32 = path.join(WORK, "sprint-plan-32-100.json");
  return fs.existsSync(p32) ? p32 : path.join(WORK, "sprint-plan-27-100.json");
}

export function loadPlan() {
  return JSON.parse(fs.readFileSync(planPath(), "utf8"));
}

export function savePlan(plan) {
  fs.writeFileSync(planPath(), JSON.stringify(plan, null, 2), "utf8");
}

export function loadSimanState() {
  const p = path.join(WORK, "siman_state.json");
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/** Simanim reserved for another lane (e.g. cli test 101–104). */
export function cliReservedSimanim() {
  const state = loadSimanState();
  const out = new Set();
  for (const [key, entry] of Object.entries(state)) {
    if (entry.lane === "cli" && entry.status === "in_progress") {
      const m = key.match(/siman_(\d+)/);
      if (m) out.add(parseInt(m[1], 10));
    }
  }
  return out;
}

export function planStats(plan) {
  const units = plan.workUnits || [];
  return {
    pending: units.filter((u) => u.status === "pending" && !u.assignee).length,
    claimed: units.filter((u) => u.status === "claimed").length,
    done: units.filter((u) => u.status === "done").length,
    total: units.length,
  };
}

export function assignUnits(count, { skipSimanim = new Set() } = {}) {
  const plan = loadPlan();
  const pending = plan.workUnits.filter(
    (u) =>
      u.status === "pending" &&
      !u.assignee &&
      !skipSimanim.has(u.siman)
  );
  const slots = [];
  for (let w = 1; w <= count; w++) {
    const unit = pending.shift();
    if (!unit) break;
    unit.status = "claimed";
    unit.assignee = `eh001-worker-${w}`;
    unit.claimedAt = new Date().toISOString();
    slots.push(unit);
  }
  savePlan(plan);
  return { slots, stats: planStats(plan) };
}

export function releaseStale(maxAgeMs = 2 * 60 * 60 * 1000) {
  const plan = loadPlan();
  const now = Date.now();
  let released = 0;
  for (const u of plan.workUnits) {
    if (u.status !== "claimed" || !u.claimedAt) continue;
    const age = now - new Date(u.claimedAt).getTime();
    if (age > maxAgeMs) {
      u.status = "pending";
      u.assignee = null;
      delete u.claimedAt;
      released++;
    }
  }
  if (released) savePlan(plan);
  return released;
}
