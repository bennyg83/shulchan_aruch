#!/usr/bin/env node
/**
 * Worker slot 4 — reserve simanim 165–199 on the sprint plan.
 *   node pipeline/_slot4-claim-165-199.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WORK, loadPlan, savePlan } from "./lib/sprint-plan-io.mjs";
import { writeAssignmentBoard } from "./lib/pool-coordinator-ide.mjs";

const OC_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SLOT = 4;
const ASSIGNEE = `orch-worker-${SLOT}`;
const FROM = 165;
const TO = 199;

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

const scopePath = path.join(WORK, "slot4-scope-165-199.json");
fs.writeFileSync(
  scopePath,
  JSON.stringify(
    {
      slot: SLOT,
      label: "worker-slot-4",
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

const progressPath = path.join(OC_ROOT, "progress.log");
const stamp = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(
  progressPath,
  `${stamp} worker-slot-4 CLAIM simanim ${FROM}-${TO} (${inRange.length} pool units)\n`,
  "utf8"
);

const board = writeAssignmentBoard(4);
console.log(
  JSON.stringify(
    { slot: SLOT, assignee: ASSIGNEE, from: FROM, to: TO, released, reserved, current: first?.id, scopePath },
    null,
    2
  )
);
