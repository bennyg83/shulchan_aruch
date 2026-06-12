#!/usr/bin/env node
/**
 * EH001 orchestrator — keep workers busy; publish every 5 simanim; release webapp every 10.
 *
 *   node pipeline/orchestrator.mjs status
 *   node pipeline/orchestrator.mjs verify --siman 27
 *   node pipeline/orchestrator.mjs publish-due [--dry-run]
 *   node pipeline/orchestrator.mjs publish --from 21 --to 30 [--dry-run]
 *   node pipeline/orchestrator.mjs push [--message "..."] [--dry-run]
 *   node pipeline/orchestrator.mjs release-due [--dry-run]
 *   node pipeline/orchestrator.mjs sync [--catch-up] [--dry-run] [--no-push]
 *   node pipeline/orchestrator.mjs assign --workers 4
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { loadEditorialState } from "./lib/editorial-state.mjs";
import {
  loadOrchestratorState,
  saveOrchestratorState,
  editorialCompletedSimanim,
  nextPublishBatch,
  releaseMilestone,
  recordOrchEvent,
} from "./lib/orchestrator-state.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const WORKSPACE = path.resolve(OC_ROOT, "..", "..");
const PUBLISH = path.join(
  WORKSPACE,
  "Sefaria Pulls",
  "shulchan-arukh",
  "Even_HaEzer",
  "tools",
  "publish-mt-batch-to-web.mjs"
);
const PUBLIC_CORPUS = path.join(
  WORKSPACE,
  "newtry",
  "OC_Mobile",
  "oc318-mobile-reader",
  "public",
  "corpus",
  "eh1"
);
const PLAN_PATH = path.join(WORK, "sprint-plan-32-100.json");

function parseArgs() {
  const opts = {
    action: "status",
    siman: null,
    from: null,
    to: null,
    dry: false,
    noPush: false,
    catchUp: false,
    workers: 4,
    message: null,
  };
  const a = process.argv.slice(2);
  if (!a.length) opts.action = "status";
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (
      [
        "status",
        "verify",
        "publish-due",
        "publish",
        "push",
        "release-due",
        "release",
        "sync",
        "assign",
        "plan",
      ].includes(x)
    )
      opts.action = x;
    else if (x === "--siman" && a[i + 1]) opts.siman = parseInt(a[++i], 10);
    else if (x === "--from" && a[i + 1]) opts.from = parseInt(a[++i], 10);
    else if (x === "--to" && a[i + 1]) opts.to = parseInt(a[++i], 10);
    else if (x === "--workers" && a[i + 1]) opts.workers = parseInt(a[++i], 10);
    else if (x === "--message" && a[i + 1]) opts.message = a[++i];
    else if (x === "--dry-run") opts.dry = true;
    else if (x === "--no-push") opts.noPush = true;
    else if (x === "--catch-up") opts.catchUp = true;
  }
  return opts;
}

function runNode(scriptRel, args, cwd = OC_ROOT) {
  const r = spawnSync(process.execPath, [path.join(__dirname, scriptRel), ...args], {
    cwd,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function verifySiman(siman) {
  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(path.join(OC_ROOT, "output"), siman, "all", "warn", done);
  const report = path.join(OC_ROOT, "checklist-output", `siman_${String(siman).padStart(3, "0")}`, "quality-report.json");
  let errors = 0;
  if (fs.existsSync(report)) {
    try {
      const j = JSON.parse(fs.readFileSync(report, "utf8"));
      errors = (j.flagged || []).filter((b) => (b.issues || []).some((i) => i.severity === "error")).length;
    } catch {
      /* */
    }
  }
  return { siman, remaining: left.length, qualityErrors: errors, ok: left.length === 0 && errors === 0 };
}

function verifySimanim(simanim) {
  const results = simanim.map(verifySiman);
  const bad = results.filter((r) => !r.ok);
  return { results, ok: bad.length === 0, bad };
}

function publishSimanim(simanim, dry) {
  if (!simanim.length) return;
  const list = simanim.join(",");
  const args = [PUBLISH, "--simanim", list, "--write-catalog"];
  if (dry) {
    console.log("[dry-run] node", args.join(" "));
    return;
  }
  const r = spawnSync(process.execPath, args, { cwd: path.dirname(PUBLISH), stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function gitPush(message, dry) {
  const repo = WORKSPACE;
  const rel = path.relative(repo, PUBLIC_CORPUS).replace(/\\/g, "/");
  if (dry) {
    console.log("[dry-run] git add", rel, "&& git commit && git push");
    return;
  }
  const status = spawnSync("git", ["status", "--porcelain", rel], { cwd: repo, encoding: "utf8" });
  const changes = (status.stdout || "").trim();
  if (!changes) {
    console.log("No corpus changes to commit.");
    return false;
  }
  spawnSync("git", ["add", rel], { cwd: repo, stdio: "inherit" });
  const commit = spawnSync("git", ["commit", "-m", message], { cwd: repo, stdio: "inherit" });
  if (commit.status !== 0) process.exit(commit.status ?? 1);
  const push = spawnSync("git", ["push", "origin", "HEAD"], { cwd: repo, stdio: "inherit" });
  if (push.status !== 0) process.exit(push.status ?? 1);
  return true;
}

function status() {
  const ed = loadEditorialState(WORK);
  const orch = loadOrchestratorState(WORK);
  const completed = editorialCompletedSimanim(WORK);
  const pub = nextPublishBatch(WORK, orch);
  const rel = releaseMilestone(WORK, orch);

  console.log("\n── EH001 orchestrator ──\n");
  console.log(`Editorial completed: ${completed.length} simanim (${completed[0] ?? "—"}–${completed[completed.length - 1] ?? "—"})`);
  console.log(`Next editorial siman: ${ed.currentSiman ?? (completed.length ? Math.max(...completed) + 1 : 21)}`);
  console.log(`Published through: siman ${orch.lastPublishedThrough}`);
  console.log(`Released through: siman ${orch.lastReleasedThrough}`);
  console.log(`Cadence: publish every ${orch.publishEvery} | release every ${orch.releaseEvery}`);
  if (pub) console.log(`\nPublish due: simanim ${pub.from}–${pub.to}`);
  else console.log("\nPublish due: — (need 5 contiguous finished simanim after last publish)");
  if (rel) console.log(`Release due: through siman ${rel.through} (deploy web reader on push)`);
  else console.log("Release due: —");

  const planFile = fs.existsSync(PLAN_PATH) ? PLAN_PATH : path.join(WORK, "sprint-plan-27-100.json");
  if (fs.existsSync(planFile)) {
    const plan = JSON.parse(fs.readFileSync(planFile, "utf8"));
    const pending = (plan.workUnits || []).filter((u) => u.status === "pending").length;
    const claimed = (plan.workUnits || []).filter((u) => u.status === "claimed").length;
    const done = (plan.workUnits || []).filter((u) => u.status === "done").length;
    console.log(`\nSprint plan: ${path.basename(planFile)} — pending=${pending} claimed=${claimed} done=${done}`);
  }
  console.log("");
}

function doPublish(from, to, orch, dry) {
  const simanim = [];
  for (let s = from; s <= to; s++) simanim.push(s);
  const v = verifySimanim(simanim);
  if (!v.ok) {
    console.error("Verify failed — fix before publish:");
    for (const b of v.bad) console.error(`  siman ${b.siman}: remaining=${b.remaining} errors=${b.qualityErrors}`);
    process.exit(2);
  }
  console.log(`Publishing simanim ${from}–${to}…`);
  publishSimanim(simanim, dry);
  orch.lastPublishedThrough = Math.max(orch.lastPublishedThrough, to);
  if (!dry) {
    recordOrchEvent(orch, { type: "publish", from, to, simanim });
    saveOrchestratorState(WORK, orch);
  } else {
    console.log(`[dry-run] would set lastPublishedThrough=${orch.lastPublishedThrough}`);
  }
}

function assign(workers) {
  const planFile = fs.existsSync(PLAN_PATH) ? PLAN_PATH : path.join(WORK, "sprint-plan-27-100.json");
  if (!fs.existsSync(planFile)) {
    console.error("Run: node pipeline/orchestrator.mjs plan");
    process.exit(1);
  }
  const plan = JSON.parse(fs.readFileSync(planFile, "utf8"));
  const pending = plan.workUnits.filter((u) => u.status === "pending" && !u.assignee);
  const slots = [];
  for (let w = 1; w <= workers; w++) {
    const unit = pending.shift();
    if (!unit) break;
    unit.status = "claimed";
    unit.assignee = `eh001-worker-${w}`;
    unit.claimedAt = new Date().toISOString();
    slots.push(unit);
  }
  fs.writeFileSync(planFile, JSON.stringify(plan, null, 2), "utf8");
  console.log(JSON.stringify(slots, null, 2));
}

function refreshPlan() {
  runNode("sprint-plan-to-100.mjs", ["--from", "32", "--to", "100", "--max-blocks", "40"]);
  const src = path.join(WORK, "sprint-plan-27-100.json");
  if (fs.existsSync(src)) {
    const plan = JSON.parse(fs.readFileSync(src, "utf8"));
    fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2), "utf8");
    console.log("Wrote", PLAN_PATH);
  }
}

function sync(opts) {
  let orch = loadOrchestratorState(WORK);
  let batch = nextPublishBatch(WORK, orch);
  while (batch) {
    doPublish(batch.from, batch.to, orch, opts.dry);
    if (!opts.dry) orch = loadOrchestratorState(WORK);
    else orch = { ...orch, lastPublishedThrough: Math.max(orch.lastPublishedThrough, batch.to) };
    if (!opts.noPush && !opts.dry) {
      gitPush(
        opts.message || `Publish OC editorial simanim ${batch.from}–${batch.to}`,
        false
      );
      orch = loadOrchestratorState(WORK);
      orch.lastPushAt = new Date().toISOString();
      saveOrchestratorState(WORK, orch);
    }
    batch = nextPublishBatch(WORK, orch);
  }

  const rel = releaseMilestone(WORK, orch);
  if (rel) {
    const o = loadOrchestratorState(WORK);
    if (o.lastPublishedThrough < rel.through) {
      doPublish(o.lastPublishedThrough + 1, rel.through, o, opts.dry);
    }
    if (!opts.dry) {
      o.lastReleasedThrough = rel.through;
      recordOrchEvent(o, { type: "release", through: rel.through });
      saveOrchestratorState(WORK, o);
    }
    if (!opts.noPush && !opts.dry) {
      gitPush(
        opts.message || `Release web reader: editorial simanim through ${rel.through}`,
        false
      );
      const o2 = loadOrchestratorState(WORK);
      o2.lastReleaseAt = new Date().toISOString();
      o2.lastPushAt = o2.lastReleaseAt;
      saveOrchestratorState(WORK, o2);
    }
  }
}

function main() {
  const optsGlobal = parseArgs();
  fs.mkdirSync(WORK, { recursive: true });

  switch (optsGlobal.action) {
    case "status":
      status();
      break;
    case "verify": {
      if (!optsGlobal.siman) {
        console.error("--siman required");
        process.exit(1);
      }
      console.log(verifySiman(optsGlobal.siman));
      break;
    }
    case "publish-due": {
      const orch = loadOrchestratorState(WORK);
      const batch = nextPublishBatch(WORK, orch);
      if (!batch) {
        console.log("Nothing to publish.");
        break;
      }
      doPublish(batch.from, batch.to, orch, optsGlobal.dry);
      break;
    }
    case "publish": {
      const orch = loadOrchestratorState(WORK);
      const from = optsGlobal.from ?? orch.lastPublishedThrough + 1;
      const to = optsGlobal.to ?? from;
      doPublish(from, to, orch, optsGlobal.dry);
      break;
    }
    case "push":
      gitPush(optsGlobal.message || "Publish OC corpus to web reader", optsGlobal.dry);
      break;
    case "release-due": {
      const rel = releaseMilestone(WORK, loadOrchestratorState(WORK));
      console.log(rel ? rel : "No release due.");
      break;
    }
    case "release":
      sync({ ...optsGlobal, catchUp: false });
      break;
    case "sync":
      sync(optsGlobal);
      break;
    case "assign":
      assign(optsGlobal.workers);
      break;
    case "plan":
      refreshPlan();
      break;
    default:
      console.error("Unknown action");
      process.exit(1);
  }
}

main();
