import fs from "fs";
import path from "path";
import { WORK } from "./sprint-plan-io.mjs";

export const ACTIVE_WORKERS = path.join(WORK, "pool-workers-active.json");

export function loadActiveWorkers() {
  if (!fs.existsSync(ACTIVE_WORKERS)) return [];
  try {
    const j = JSON.parse(fs.readFileSync(ACTIVE_WORKERS, "utf8"));
    return Array.isArray(j) ? j : [];
  } catch {
    return [];
  }
}

export function saveActiveWorkers(list) {
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(ACTIVE_WORKERS, JSON.stringify(list, null, 2) + "\n", "utf8");
}

/** @returns {boolean} */
export function isPidAlive(pid) {
  if (!pid || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
