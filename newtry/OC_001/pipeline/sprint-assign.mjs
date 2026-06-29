#!/usr/bin/env node
/** Assign sprint work units to worker slots. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const WORK = path.join(path.dirname(fileURLToPath(import.meta.url)), "work");
const planPath = fs.existsSync(path.join(WORK, "sprint-plan-32-100.json"))
  ? path.join(WORK, "sprint-plan-32-100.json")
  : path.join(WORK, "sprint-plan-27-100.json");

function main() {
  const workerId = process.argv.find((a, i) => process.argv[i - 1] === "--worker") || "worker-1";
  const count = parseInt(process.argv.find((a, i) => process.argv[i - 1] === "--count") || "3", 10);
  const skipSiman = parseInt(process.argv.find((a, i) => process.argv[i - 1] === "--skip-siman") || "0", 10);

  const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
  const pending = plan.workUnits.filter(
    (u) =>
      u.status === "pending" &&
      (!skipSiman || u.siman !== skipSiman) &&
      !u.assignee
  );
  const claimed = pending.slice(0, count);
  for (const u of claimed) {
    u.status = "claimed";
    u.assignee = workerId;
    u.claimedAt = new Date().toISOString();
  }
  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), "utf8");
  console.log(JSON.stringify(claimed, null, 2));
}

main();
