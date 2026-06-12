#!/usr/bin/env node
/**
 * Structural parity check vs OC_001 (no translation quality).
 *
 *   node tools/structure-check.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import {
  CM001_ROOT,
  WORKSPACE,
  SEFARIA_YD_TOOLS,
  PUBLIC_CORPUS_YD1,
} from "../../lib/cm001-volume.mjs";

const YD_TOOLS = SEFARIA_YD_TOOLS;
const CORPUS_YD1 = PUBLIC_CORPUS_YD1;

const REQUIRED_PIPELINE = [
  "pool-coordinator.mjs",
  "pool-coordinator-watch.mjs",
  "sprint-worker.mjs",
  "orchestrator.mjs",
  "editorial-loop.mjs",
  "validate-quality-cm001.mjs",
];

const REQUIRED_TRANSLATION = [
  "MASTER_PIPELINE.md",
  "COORDINATOR_AND_WORKERS.md",
  "AGENT_SELF_LOOP_WORKER.md",
  "COMMENTARIES.md",
  "EDITORIAL_RETRANSLATE.md",
];

const REQUIRED_TOOLS = [
  "export-seif-hebrew.mjs",
  "build-manifest-template-from-cm001.mjs",
  "prepare-translated-siman-slice.mjs",
  "import-cm001-english-to-seif-en.mjs",
  "wire-mechaber-en-hooks-cm001.mjs",
  "publish-cm-siman.mjs",
  "publish-mt-batch-to-web.mjs",
  "sync-translated-siman-to-public.mjs",
  "apply-dictionary-to-seif-en.mjs",
];

function countOutputSimanim() {
  const out = path.join(CM001_ROOT, "output");
  if (!fs.existsSync(out)) return 0;
  return fs.readdirSync(out).filter((n) => /^siman_\d{3}$/.test(n)).length;
}

function main() {
  const issues = [];
  const ok = [];

  const simanDirs = countOutputSimanim();
  if (simanDirs >= 400) ok.push(`CM001 output: ${simanDirs} siman_* folders`);
  else issues.push(`CM001 output: only ${simanDirs} siman_* folders (expected ~402)`);

  const bundleRoot = path.join(WORKSPACE, "Sefaria Pulls", "shulchan-arukh", "Choshen_Mishpat", "simanim");
  if (fs.existsSync(bundleRoot)) {
    const n = fs.readdirSync(bundleRoot).filter((d) => /^\d{3}$/.test(d)).length;
    ok.push(`Sefaria bundles: ${n} simanim under Choshen_Mishpat/simanim`);
  } else issues.push("Missing Choshen_Mishpat/simanim");

  for (const f of REQUIRED_PIPELINE) {
    const p = path.join(CM001_ROOT, "pipeline", f);
    if (fs.existsSync(p)) ok.push(`pipeline: ${f}`);
    else issues.push(`Missing pipeline: ${f}`);
  }

  for (const f of REQUIRED_TRANSLATION) {
    const p = path.join(CM001_ROOT, "translation", f);
    if (fs.existsSync(p)) ok.push(`translation: ${f}`);
    else issues.push(`Missing translation: ${f}`);
  }

  for (const f of ["CLAUDE.md", "PIPELINE_CM001.md", "full_dictionary.md", "progress.log"]) {
    const p = path.join(CM001_ROOT, f);
    if (fs.existsSync(p)) ok.push(`root: ${f}`);
    else issues.push(`Missing root: ${f}`);
  }

  for (const f of REQUIRED_TOOLS) {
    const p = path.join(YD_TOOLS, f);
    if (fs.existsSync(p)) ok.push(`tool: ${f}`);
    else issues.push(`Missing tool: ${f}`);
  }

  if (fs.existsSync(path.join(CM001_ROOT, "tools", "translate-cm001-pending-mymemory.mjs"))) {
    ok.push("tool: translate-cm001-pending-mymemory.mjs (CM_001)");
  } else issues.push("Missing newtry/CM_001/tools/translate-cm001-pending-mymemory.mjs");

  const dockerCompose = path.join(WORKSPACE, "newtry", "OC_001", "docker", "libretranslate", "docker-compose.yml");
  if (fs.existsSync(dockerCompose)) ok.push("Docker MT: shared OC_001 libretranslate compose (port 5000)");
  else issues.push("Missing OC_001/docker/libretranslate/docker-compose.yml");

  if (fs.existsSync(CORPUS_YD1)) ok.push("public corpus cm1/ exists");
  else ok.push("public/corpus/cm1/ pending first publish (expected)");

  const v = spawnSync(process.execPath, ["pipeline/validate-cm001.mjs", "--root", "output"], {
    cwd: CM001_ROOT,
    encoding: "utf8",
  });
  if (v.status === 0) ok.push(`validate-cm001: ${(v.stdout || "").trim().split("\n").pop()}`);
  else issues.push(`validate-cm001 failed:\n${v.stderr || v.stdout}`);

  console.log("\n=== YD structure parity ===\n");
  for (const line of ok) console.log("OK  ", line);
  for (const line of issues) console.log("GAP ", line);
  console.log(`\n${ok.length} ok, ${issues.length} gap(s)`);
  process.exit(issues.length ? 1 : 0);
}

main();
