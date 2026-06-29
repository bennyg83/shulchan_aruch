#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WORK, loadPlan, savePlan } from "./lib/sprint-plan-io.mjs";
import { writeAssignmentBoard } from "./lib/pool-coordinator-ide.mjs";

const OC_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SLOT = 2;
const ASSIGNEE = `orch-worker-${SLOT}`;
const FROM = 300;
const TO = 399;

const plan = loadPlan();
let released = 0;
let reserved = 0;

for (const u of plan.workUnits) {
  if (u.assignee === ASSIGNEE && (u.siman < FROM || u.siman > TO)) {
    u.status = "pending";
    u.assignee = null;
    delete u.claimedAt;
    released++;
  }
}

for (const u of plan.workUnits) {
  if (u.siman >= FROM && u.siman <= TO) {
    if (u.status === "claimed" && u.assignee !== ASSIGNEE) {
      u.status = "pending";
      u.assignee = null;
      delete u.claimedAt;
      released++;
    }
    reserved++;
  }
}

const inRange = plan.workUnits.filter((u) => u.siman >= FROM && u.siman <= TO);
const first = inRange.find((u) => u.status === "pending");
if (first) {
  first.status = "claimed";
  first.assignee = ASSIGNEE;
  first.claimedAt = new Date().toISOString();
}

savePlan(plan);

const scopePath = path.join(WORK, "slot2-scope-300-399.json");
fs.writeFileSync(
  scopePath,
  JSON.stringify(
    {
      slot: SLOT,
      assignee: ASSIGNEE,
      from: FROM,
      to: TO,
      units: inRange.length,
      currentUnit: first?.id ?? null,
      updatedAt: new Date().toISOString(),
    },
    null,
    2
  ),
  "utf8"
);

const board = writeAssignmentBoard(4);
console.log(JSON.stringify({ released, reserved, current: first?.id, board: board.slots[SLOT - 1] }, null, 2));
