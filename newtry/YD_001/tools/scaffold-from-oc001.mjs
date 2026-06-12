#!/usr/bin/env node
/**
 * One-time scaffold: copy OC_001 core pipeline + translation docs → YD_001 (YD paths).
 *
 *   node tools/scaffold-from-oc001.mjs
 *   node tools/scaffold-from-oc001.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { YD001_ROOT, WORKSPACE } from "../../lib/yd001-volume.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(WORKSPACE, "newtry", "OC_001");
const OC_PIPELINE = path.join(OC_ROOT, "pipeline");
const YD_PIPELINE = path.join(YD001_ROOT, "pipeline");
const OC_TRANSLATION = path.join(OC_ROOT, "translation");
const YD_TRANSLATION = path.join(YD001_ROOT, "translation");

const CORE_PIPELINE = [
  "queue-next.mjs",
  "build-agent-batch.mjs",
  "validate-quality-oc001.mjs",
  "build-quality-batch.mjs",
  "editorial-loop.mjs",
  "editorial-advance.mjs",
  "build-editorial-siman-batch.mjs",
  "orchestrator.mjs",
  "pool-coordinator.mjs",
  "pool-coordinator-watch.mjs",
  "pool-autopilot.mjs",
  "pool-worker-run.mjs",
  "refresh-open-worker-queue.mjs",
  "pool-phase.mjs",
  "scope-active-plan.mjs",
  "reset-editorial-done.mjs",
  "scan-html-issues.mjs",
  "build-html-presentation-batch.mjs",
  "ollama-slave-draft.mjs",
  "slave-cleanup-runner.mjs",
  "slave-cleanup-status.mjs",
  "tracker-simanim-1-100.mjs",
  "sprint-plan-to-100.mjs",
  "sprint-worker.mjs",
  "sprint.mjs",
  "sprint-pending-simanim.mjs",
  "mark-done.mjs",
  "finish-siman.mjs",
  "apply-html-presentation.mjs",
  "build-html-presentation-batch.mjs",
];

const CORE_LIB = [
  "sprint-plan-io.mjs",
  "editorial-queue.mjs",
  "editorial-state.mjs",
  "orchestrator-state.mjs",
  "quality-checks.mjs",
  "pool-coordinator-ide.mjs",
  "pool-worker-registry.mjs",
  "checklist-simanim.mjs",
  "siman-path.mjs",
];

const TRANSLATION_DOCS = [
  "MASTER_PIPELINE.md",
  "COORDINATOR_AND_WORKERS.md",
  "AGENT_SELF_LOOP_WORKER.md",
  "AGENT_SPRINT_WORKER.md",
  "AGENT_POOL_COORDINATOR.md",
  "ORCHESTRATOR.md",
  "AGENT_HTML_PRESENTATION.md",
  "POOL_WITHOUT_CURSOR_API.md",
  "CLAUDE_CLI.md",
  "SLAVE_CLEANUP.md",
];

const REPLACEMENTS = [
  [/OC001/g, "YD001"],
  [/oc001/g, "yd001"],
  [/OC_001/g, "YD_001"],
  [/Orach Chayim/g, "Yoreh De'ah"],
  [/Orach_Chayim/g, "Yoreh_Deah"],
  [/oc_complete/g, "yd_complete"],
  [/oc1/g, "yd1"],
  [/validate-oc001/g, "validate-yd001"],
  [/validate-quality-oc001/g, "validate-quality-yd001"],
  [/apply_dictionary_oc001/g, "apply_dictionary_yd001"],
  [/extract_oc001_from_sefaria_bundle/g, "extract_yd001_from_sefaria_bundle"],
  [/wire-mechaber-en-hooks-oc001/g, "wire-mechaber-en-hooks-yd001"],
  [/import-oc001-english-to-seif-en/g, "import-yd001-english-to-seif-en"],
  [/publish-oc-siman/g, "publish-yd-siman"],
  [/publish-mt-batch-to-web/g, "publish-mt-batch-to-web"],
  [/OC001_MT_/g, "YD001_MT_"],
  [/OC001_OLLAMA_/g, "YD001_OLLAMA_"],
  [/OC001_POOL_/g, "YD001_POOL_"],
  [/orch-worker/g, "yd-worker"],
  [/\b697\b/g, "403"],
  [/\b200\b/g, "100"],
  [/simanim 101, 102, 103, 104/g, "simanim 1–5 (pilot)"],
  [/simanim \*\*101–104\*\*/g, "simanim **1–5** (pilot)"],
  [/editorial_105_697/g, "editorial_6_403"],
  [/105 → 697/g, "6 → 403"],
  [/105–697/g, "6–403"],
  [/finishThrough: 697/g, "finishThrough: 403"],
  [/noPublishFromSiman: 105/g, "noPublishFromSiman: 50"],
  [/siman 105\+/g, "siman 50+"],
  [/simanim < 105/g, "simanim < 50"],
  [/simanim ≥ 105/g, "simanim ≥ 50"],
  [/through 88\+/g, "through pilot"],
  [/Magen Avraham/g, "Siftei Kohen"],
  [/Mishna Berurah/g, "Pitchei Teshuva"],
];

function adaptContent(text, destName) {
  let s = text;
  for (const [re, rep] of REPLACEMENTS) s = s.replace(re, rep);
  if (destName === "validate-quality-yd001.mjs") {
    s = s.replace(/validate-quality-yd001/g, "validate-quality-yd001");
  }
  if (destName.startsWith("validate-quality")) {
    s = s.replace(/\.\/lib\/blocks\.mjs/g, "./lib/blocks.mjs");
  }
  return s;
}

function copyFile(src, dest, dry) {
  if (!fs.existsSync(src)) return { status: "missing", src };
  const raw = fs.readFileSync(src, "utf8");
  const out = adaptContent(raw, path.basename(dest));
  if (!dry) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, out, "utf8");
  }
  return { status: "ok", src, dest };
}

function main() {
  const dry = process.argv.includes("--dry-run");
  let n = 0;
  const missing = [];

  fs.mkdirSync(path.join(YD_PIPELINE, "lib"), { recursive: true });
  fs.mkdirSync(path.join(YD_PIPELINE, "work"), { recursive: true });
  fs.mkdirSync(YD_TRANSLATION, { recursive: true });

  for (const f of CORE_PIPELINE) {
    const src = path.join(OC_PIPELINE, f);
    let destName = f;
    if (f === "validate-quality-oc001.mjs") destName = "validate-quality-yd001.mjs";
    const dest = path.join(YD_PIPELINE, destName);
    const r = copyFile(src, dest, dry);
    if (r.status === "ok") n++;
    else missing.push(f);
  }

  for (const f of CORE_LIB) {
    const src = path.join(OC_PIPELINE, "lib", f);
    const dest = path.join(YD_PIPELINE, "lib", f);
    const r = copyFile(src, dest, dry);
    if (r.status === "ok") n++;
    else missing.push(`lib/${f}`);
  }

  for (const f of TRANSLATION_DOCS) {
    const src = path.join(OC_TRANSLATION, f);
    const dest = path.join(YD_TRANSLATION, f);
    const r = copyFile(src, dest, dry);
    if (r.status === "ok") n++;
    else missing.push(`translation/${f}`);
  }

  const dockerSrc = path.join(OC_ROOT, "docker", "libretranslate", "docker-compose.yml");
  const dockerDest = path.join(YD001_ROOT, "docker", "libretranslate", "docker-compose.yml");
  if (fs.existsSync(dockerSrc)) {
    let yml = fs.readFileSync(dockerSrc, "utf8");
    yml = yml.replace(/oc001-libretranslate/g, "yd001-libretranslate").replace(/OC001/g, "YD001");
    if (!dry) {
      fs.mkdirSync(path.dirname(dockerDest), { recursive: true });
      fs.writeFileSync(dockerDest, yml, "utf8");
    }
    n++;
  }

  console.log(`${dry ? "[dry-run] " : ""}Scaffolded ${n} files into YD_001`);
  if (missing.length) console.log("Missing (skipped):", missing.join(", "));
}

main();
