#!/usr/bin/env node
/**
 * Regenerate active sprint plan for simanim from–to, preserving done/claimed units.
 *
 *   node pipeline/scope-active-plan.mjs --from 105 --to 100
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const ACTIVE = path.join(WORK, "active-sprint-plan.json");

function parseArgs() {
  let from = 105;
  let to = 100;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
  }
  return { from, to };
}

function main() {
  const { from, to } = parseArgs();
  const outName = `sprint-plan-${from}-${to}.json`;
  const outPath = path.join(WORK, outName);

  const prev = fs.existsSync(ACTIVE) ? JSON.parse(fs.readFileSync(ACTIVE, "utf8")) : null;
  const prevById = new Map((prev?.workUnits || []).map((u) => [u.id, u]));

  console.log(`Building ${outName} (${from}–${to})…`);
  const r = spawnSync(
    process.execPath,
    [
      path.join(__dirname, "sprint-plan-to-100.mjs"),
      "--from",
      String(from),
      "--to",
      String(to),
      "--max-blocks",
      "40",
      "--out",
      outName,
    ],
    { cwd: OC_ROOT, encoding: "utf8", stdio: "inherit" }
  );
  if (r.status !== 0) process.exit(r.status || 1);

  const plan = JSON.parse(fs.readFileSync(outPath, "utf8"));
  let carried = 0;
  for (const u of plan.workUnits) {
    const p = prevById.get(u.id);
    if (!p) continue;
    if (p.status === "done") {
      u.status = "done";
      u.assignee = null;
      delete u.claimedAt;
      carried++;
    } else if (p.status === "claimed" && p.claimedAt) {
      u.status = "claimed";
      u.assignee = p.assignee;
      u.claimedAt = p.claimedAt;
    }
  }

  fs.copyFileSync(outPath, ACTIVE);
  fs.writeFileSync(ACTIVE, JSON.stringify(plan, null, 2), "utf8");

  const stats = {
    from,
    to,
    total: plan.workUnits.length,
    done: plan.workUnits.filter((u) => u.status === "done").length,
    claimed: plan.workUnits.filter((u) => u.status === "claimed").length,
    pending: plan.workUnits.filter((u) => u.status === "pending").length,
    carriedDone: carried,
  };
  console.log(JSON.stringify(stats, null, 2));
}

main();
