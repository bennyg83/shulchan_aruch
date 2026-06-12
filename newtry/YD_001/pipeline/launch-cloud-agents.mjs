#!/usr/bin/env node
/**
 * Launch Cursor cloud agents for YD editorial units (fire-and-forget).
 *
 *   export CURSOR_API_KEY=...
 *   node pipeline/launch-cloud-agents.mjs --count 5
 *   node pipeline/launch-cloud-agents.mjs --siman 110 --part 1 --parts 2
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Agent } from "@cursor/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YD_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const MANIFEST = path.join(WORK, "cloud-manifest.json");
const LOG_PATH = path.join(WORK, "cloud-launches.json");

const REPO = "https://github.com/bennyg83/shulchan_aruch";
const BRANCH = "yd-cleanup";

const DEFAULT_UNITS = [
  { siman: 110, part: 1, parts: 2 },
  { siman: 110, part: 2, parts: 2 },
  { siman: 84, part: 1, parts: 2 },
  { siman: 84, part: 2, parts: 2 },
  { siman: 98, part: 1, parts: 2 },
];

function parseArgs() {
  const opts = { count: 5, units: [], dryRun: false };
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (x === "--count" && a[i + 1]) opts.count = parseInt(a[++i], 10);
    else if (x === "--dry-run") opts.dryRun = true;
    else if (x === "--siman" && a[i + 1]) {
      const siman = parseInt(a[++i], 10);
      let part = 1;
      let parts = 2;
      if (a[i + 1] === "--part" && a[i + 2]) {
        i++;
        part = parseInt(a[++i], 10);
      }
      if (a[i + 1] === "--parts" && a[i + 2]) {
        i++;
        parts = parseInt(a[++i], 10);
      }
      opts.units.push({ siman, part, parts });
    }
  }
  return opts;
}

function tag(siman) {
  return String(siman).padStart(3, "0");
}

function unitMeta({ siman, part, parts }) {
  const t = tag(siman);
  const partSuffix = parts > 1 ? `-part${part}of${parts}` : "";
  return {
    siman,
    part,
    parts,
    id: `siman-${t}${partSuffix}`,
    batchPath: `pipeline/work/batch-editorial-siman-${t}${partSuffix}.md`,
    prBranch: `yd/cleanup-siman-${t}${partSuffix}`,
  };
}

function buildPrompt(u) {
  const t = tag(u.siman);
  const partSuffix = u.parts > 1 ? `-part${u.part}of${u.parts}` : "";
  return [
    `You are a YD001 editorial cloud worker on branch ${BRANCH}.`,
    "",
    "Read first:",
    "- newtry/YD_001/pipeline/work/AGENT_WORKER_PROMPT.md",
    "- newtry/YD_001/full_dictionary.md",
    "- newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md",
    "",
    `Assignment: siman ${u.siman} part ${u.part} of ${u.parts}`,
    `Batch file: newtry/YD_001/pipeline/work/batch-editorial-siman-${t}${partSuffix}.md`,
    `PR branch: ${u.prBranch}`,
    "",
    "Steps:",
    "1. cd newtry/YD_001 && npm ci",
    `2. npm run pipeline:cloud:prep -- --siman ${u.siman} --parts ${u.parts} --min-severity error`,
    `3. Open pipeline/work/batch-editorial-siman-${t}${partSuffix}.md`,
    "4. For each block: edit output/... part files — replace **** ENGLISH **** only from Hebrew",
    `5. npm run apply:dictionary -- --root output/siman_${t}`,
    `6. node pipeline/validate-quality-yd001.mjs --root output/siman_${t} --min-severity error --fail-on error`,
    `7. git checkout -b ${u.prBranch}`,
    `8. Commit output/siman_${t}/ and pipeline/work/COORDINATION.md (mark unit IN_PROGRESS then DONE).`,
    "9. Push and open PR to yd-cleanup with autoCreatePR.",
    "",
    "Do not ask for permission between blocks. Finish the full batch.",
  ].join("\n");
}

function loadUnits(opts) {
  if (opts.units.length) return opts.units.map(unitMeta);
  if (fs.existsSync(MANIFEST)) {
    const doc = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
    const fromManifest = (doc.units || []).slice(0, opts.count);
    if (fromManifest.length) return fromManifest;
  }
  return DEFAULT_UNITS.slice(0, opts.count).map(unitMeta);
}

function appendLog(entry) {
  fs.mkdirSync(WORK, { recursive: true });
  const prev = fs.existsSync(LOG_PATH) ? JSON.parse(fs.readFileSync(LOG_PATH, "utf8")) : [];
  prev.push(entry);
  fs.writeFileSync(LOG_PATH, JSON.stringify(prev, null, 2), "utf8");
}

async function launchOne(apiKey, unit) {
  const prompt = buildPrompt(unit);
  const name = `YD ${unit.id}`;
  const agent = await Agent.create({
    apiKey,
    name,
    model: { id: process.env.CURSOR_SDK_MODEL || "composer-2.5" },
    cloud: {
      repos: [{ url: REPO, startingRef: BRANCH }],
      autoCreatePR: true,
      skipReviewerRequest: true,
    },
  });
  const run = await agent.send(prompt);
  const entry = {
    launchedAt: new Date().toISOString(),
    unitId: unit.id,
    siman: unit.siman,
    part: unit.part,
    parts: unit.parts,
    agentId: agent.agentId,
    runId: run.id,
    prBranch: unit.prBranch,
    dashboardUrl: `https://cursor.com/agents/${agent.agentId}`,
  };
  appendLog(entry);
  console.log(`Launched ${unit.id}: agent=${agent.agentId} run=${run.id}`);
  console.log(`  ${entry.dashboardUrl}`);
  return entry;
}

async function main() {
  const apiKey = process.env.CURSOR_API_KEY;
  if (!apiKey) {
    console.error("Set CURSOR_API_KEY (Cursor Dashboard → Integrations).");
    process.exit(1);
  }
  const opts = parseArgs();
  const units = loadUnits(opts);
  if (!units.length) {
    console.error("No units to launch.");
    process.exit(1);
  }
  if (opts.dryRun) {
    for (const u of units) {
      console.log(`[dry-run] ${u.id} → ${u.prBranch}`);
      console.log(buildPrompt(u).split("\n").slice(0, 8).join("\n"));
      console.log("---");
    }
    return;
  }
  const launched = [];
  for (const unit of units) {
    launched.push(await launchOne(apiKey, unit));
  }
  console.log(`\nLaunched ${launched.length} cloud agent(s). Log: ${path.relative(YD_ROOT, LOG_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
