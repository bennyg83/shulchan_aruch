#!/usr/bin/env node
/**
 * Lightweight block-by-block quality-pass worker (minimal agent tokens).
 *
 *   npm run quality:worker:init -- --scope slot3 --min-severity error
 *   npm run quality:worker:next
 *   # agent edits the one file listed in pipeline/work/quality-worker-prompt.md
 *   npm run quality:worker:commit
 *   npm run quality:worker:status
 *
 * Optional apply from sidecar file (English only):
 *   node pipeline/quality-worker.mjs apply --en pipeline/work/quality-worker-en.txt
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { parseBlocksInFile } from "../yd001_block_lib.mjs";
import { patchBlockFile } from "./lib/patch-one-block.mjs";
import {
  appendDoneId,
  buildQueue,
  loadDoneIds,
  loadQueue,
  saveQueue,
} from "./lib/quality-worker-queue.mjs";
import {
  runBlockQualityChecks,
  maxSeverity,
  severityLabel,
  SEVERITY,
  plainFromHtml,
} from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const REPORT = path.join(OC_ROOT, "checklist-output", "quality-report.json");
const QUEUE_PATH = path.join(WORK, "quality-worker-queue.json");
const DONE_PATH = path.join(WORK, "quality-worker-done.txt");
const CURRENT_PATH = path.join(WORK, "quality-worker-current.json");
const PROMPT_PATH = path.join(WORK, "quality-worker-prompt.md");
const BRIEF_PATH = path.join(__dirname, "prompts", "quality-worker-brief.txt");

function parseArgs() {
  const opts = {
    action: "help",
    outRoot: path.join(OC_ROOT, "output"),
    scope: "all",
    minSeverity: "error",
    passSeverity: "error",
    siman: null,
    from: null,
    to: null,
    slug: null,
    maxBlocks: null,
    rescan: false,
    excludeCodes: [],
    reason: "",
    enPath: null,
    skipDictionary: false,
    applyFile: false,
  };
  const a = process.argv.slice(2);
  if (!a.length) opts.action = "help";
  else opts.action = a[0];

  for (let i = 1; i < a.length; i++) {
    const x = a[i];
    if (x === "--scope" && a[i + 1]) opts.scope = a[++i];
    else if (x === "--min-severity" && a[i + 1]) opts.minSeverity = a[++i];
    else if (x === "--pass-severity" && a[i + 1]) opts.passSeverity = a[++i];
    else if (x === "--siman" && a[i + 1]) opts.siman = parseInt(a[++i], 10);
    else if (x === "--from" && a[i + 1]) opts.from = parseInt(a[++i], 10);
    else if (x === "--to" && a[i + 1]) opts.to = parseInt(a[++i], 10);
    else if (x === "--slug" && a[i + 1]) opts.slug = a[++i];
    else if (x === "--max-blocks" && a[i + 1]) opts.maxBlocks = parseInt(a[++i], 10);
    else if (x === "--rescan") opts.rescan = true;
    else if (x === "--exclude-codes" && a[i + 1])
      opts.excludeCodes = a[++i].split(",").map((s) => s.trim()).filter(Boolean);
    else if (x === "--reason" && a[i + 1]) opts.reason = a[++i];
    else if (x === "--en" && a[i + 1]) opts.enPath = path.resolve(a[++i]);
    else if (x === "--skip-dictionary") opts.skipDictionary = true;
    else if (x === "--apply-file") opts.applyFile = true;
  }

  if (opts.scope === "slot3" && !opts.excludeCodes.length) {
    opts.excludeCodes = ["marker_label_mismatch"];
  }
  if (opts.scope === "slot3" && opts.from == null && opts.siman == null) {
    opts.from = 201;
    opts.to = 300;
  }

  return opts;
}

function run(cmd, args, cwd = OC_ROOT) {
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function readBrief() {
  return fs.existsSync(BRIEF_PATH) ? fs.readFileSync(BRIEF_PATH, "utf8").trim() : "";
}

function queueOpts(opts) {
  return {
    siman: opts.siman,
    from: opts.from,
    to: opts.to,
    slug: opts.slug,
    scope: opts.scope,
    minSeverity: opts.minSeverity,
    excludeCodes: new Set(opts.excludeCodes),
    rescan: opts.rescan,
  };
}

function findBlockInFile(absPath, item) {
  const raw = fs.readFileSync(absPath, "utf8");
  return parseBlocksInFile(raw).find(
    (b) =>
      String(b.slug) === String(item.slug) &&
      String(b.seif) === String(item.seif) &&
      String(b.marker ?? "_") === String(item.marker ?? "_")
  );
}

function validateBlock(block, passSeverity, excludeCodes) {
  const ex = new Set(excludeCodes);
  const issues = runBlockQualityChecks(block).filter((i) => !ex.has(i.code));
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  const passLevel = SEVERITY[passSeverity] ?? SEVERITY.error;
  const blockLevel = SEVERITY[sev] ?? 0;
  return { issues, sev, pass: blockLevel < passLevel };
}

function writePrompt(item) {
  const he =
    item.hePlain ||
    (() => {
      const b = findBlockInFile(item.absPath, item);
      return b ? plainFromHtml(b.he) : "(Hebrew not loaded — open file)";
    })();

  const lines = [
    `# Block ${item.id}`,
    "",
    `file: \`${item.relPath}\``,
    `siman: ${item.siman} · slug: ${item.slug} · seif: ${item.seif} · marker: ${item.marker}`,
    `issues: ${item.issues.join(", ")}`,
    "",
    readBrief(),
    "",
    "## Hebrew (plain)",
    "",
    he,
    "",
    "---",
    "",
    `Edit \`${item.relPath}\` — English section only. Then: \`npm run quality:worker:commit\``,
    "",
  ];
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(PROMPT_PATH, lines.join("\n"), "utf8");
  fs.writeFileSync(CURRENT_PATH, JSON.stringify(item, null, 2) + "\n", "utf8");
}

function cmdInit(opts) {
  const { items, doneCount, source } = buildQueue(
    opts.outRoot,
    REPORT,
    queueOpts(opts),
    DONE_PATH
  );
  const capped = opts.maxBlocks ? items.slice(0, opts.maxBlocks) : items;
  saveQueue(QUEUE_PATH, {
    scope: opts.scope,
    minSeverity: opts.minSeverity,
    passSeverity: opts.passSeverity,
    excludeCodes: opts.excludeCodes,
    from: opts.from,
    to: opts.to,
    siman: opts.siman,
    slug: opts.slug,
    source,
    doneCount,
  }, capped);

  if (fs.existsSync(CURRENT_PATH)) fs.unlinkSync(CURRENT_PATH);
  if (fs.existsSync(PROMPT_PATH)) fs.unlinkSync(PROMPT_PATH);

  console.log(
    `[INIT] queue=${capped.length} blocks (source=${source}, done=${doneCount}, scope=${opts.scope}, min=${opts.minSeverity})`
  );
  console.log(`       ${path.relative(OC_ROOT, QUEUE_PATH)}`);
  if (capped.length) console.log(`Next: npm run quality:worker:next`);
}

function cmdNext() {
  const q = loadQueue(QUEUE_PATH);
  if (!q?.items?.length) {
    console.log("[NEXT] Queue empty. Run: npm run quality:worker:init");
    process.exit(1);
  }

  const done = loadDoneIds(DONE_PATH);
  const item = q.items.find((it) => !done.has(it.id));
  if (!item) {
    console.log("[NEXT] All queued blocks done.");
    process.exit(0);
  }

  if (!fs.existsSync(item.absPath)) {
    console.error("[ERROR] Missing file:", item.absPath);
    process.exit(1);
  }

  writePrompt(item);
  console.log(`[NEXT] ${item.id}`);
  console.log(`       prompt → ${path.relative(OC_ROOT, PROMPT_PATH)}`);
  console.log(`       edit → ${item.relPath}`);
}

function loadCurrent() {
  if (!fs.existsSync(CURRENT_PATH)) {
    console.error("[ERROR] No current block. Run: npm run quality:worker:next");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CURRENT_PATH, "utf8"));
}

function cmdApply(opts) {
  const item = loadCurrent();
  if (!opts.enPath) {
    console.error("[ERROR] --en path required for apply");
    process.exit(1);
  }
  const en = fs.readFileSync(opts.enPath, "utf8").trimEnd();
  patchBlockFile(item.absPath, item, en);
  console.log(`[APPLY] patched ${item.relPath}`);
}

function cmdCommit(opts) {
  const item = loadCurrent();
  const q = loadQueue(QUEUE_PATH);
  const excludeCodes = q?.excludeCodes || [];

  if (opts.applyFile && opts.enPath) cmdApply(opts);

  if (!fs.existsSync(item.absPath)) {
    console.error("[ERROR] Missing file:", item.absPath);
    process.exit(1);
  }

  const block = findBlockInFile(item.absPath, item);
  if (!block) {
    console.error("[ERROR] Block not found in file:", item.id);
    process.exit(1);
  }

  const passSeverity = q?.passSeverity || opts.passSeverity;
  const { issues, sev, pass } = validateBlock(block, passSeverity, excludeCodes);

  if (!pass) {
    console.error(`[FAIL] ${item.id} — severity=${sev}`);
    for (const iss of issues.slice(0, 8)) console.error(`  ${iss.code}: ${iss.message}`);
    if (issues.length > 8) console.error(`  … +${issues.length - 8} more`);
    process.exit(2);
  }

  const tag = String(item.siman).padStart(3, "0");
  if (!opts.skipDictionary) {
    run(process.execPath, [
      path.join(OC_ROOT, "apply_dictionary_yd001.mjs"),
      "--root",
      `output/siman_${tag}`,
    ]);
  }

  run(process.execPath, [
    path.join(__dirname, "validate-yd001.mjs"),
    "--root",
    path.join(opts.outRoot, `siman_${tag}`),
  ]);

  appendDoneId(DONE_PATH, item.id);

  const done = loadDoneIds(DONE_PATH);
  const remaining = (q?.items || []).filter((it) => !done.has(it.id)).length;
  console.log(`[PASS] ${item.id}`);
  console.log(`       remaining in queue: ${remaining}`);
  if (remaining) console.log(`Next: npm run quality:worker:next`);
}

function cmdSkip(opts) {
  const item = loadCurrent();
  appendDoneId(DONE_PATH, item.id);
  const skipLog = path.join(WORK, "quality-worker-skip.log");
  fs.appendFileSync(
    skipLog,
    `${new Date().toISOString()}\t${item.id}\t${opts.reason || ""}\n`,
    "utf8"
  );
  console.log(`[SKIP] ${item.id}`);
  console.log(`Next: npm run quality:worker:next`);
}

function cmdStatus() {
  const q = loadQueue(QUEUE_PATH);
  const done = loadDoneIds(DONE_PATH);
  const total = q?.items?.length ?? 0;
  const remaining = q ? q.items.filter((it) => !done.has(it.id)).length : 0;
  const current = fs.existsSync(CURRENT_PATH)
    ? JSON.parse(fs.readFileSync(CURRENT_PATH, "utf8")).id
    : null;

  console.log("[STATUS] quality worker");
  console.log(`  queue: ${total} blocks (${q?.source ?? "not initialized"})`);
  console.log(`  done:  ${done.size}`);
  console.log(`  left:  ${remaining}`);
  if (q) {
    console.log(`  scope: ${q.scope} · min: ${q.minSeverity} · pass: ${q.passSeverity}`);
    if (q.excludeCodes?.length) console.log(`  exclude: ${q.excludeCodes.join(", ")}`);
  }
  if (current) console.log(`  current: ${current}`);
}

function cmdHelp() {
  console.log(`Usage: node pipeline/quality-worker.mjs <command> [options]

Commands:
  init     Build queue from quality-report.json (or live scan with --rescan)
  next     Emit minimal prompt for next block
  commit   Validate current block after agent edit; mark done if clean
  apply    Patch current block from --en file (English only)
  skip     Skip current block (--reason optional)
  status   Show queue progress

Options:
  --scope slot3|mechaber|all     Default: all (slot3 → simanim 201-300, no mechaber)
  --min-severity error|warn       Queue threshold (default: error)
  --pass-severity error|warn      Commit pass threshold (default: error)
  --siman N  --from N  --to N
  --slug mechaber,siftei-kohen
  --max-blocks N
  --rescan                        Live scan instead of cached report
  --exclude-codes code1,code2     (slot3 default: marker_label_mismatch)
  --en path                       English sidecar for apply
  --skip-dictionary
  --reason text                   For skip

Examples:
  npm run quality:worker:init -- --scope slot3 --min-severity error
  npm run quality:worker:init -- --scope mechaber --siman 114
  npm run quality:worker:next && npm run quality:worker:commit
`);
}

function main() {
  const opts = parseArgs();
  switch (opts.action) {
    case "init":
      cmdInit(opts);
      break;
    case "next":
      cmdNext();
      break;
    case "commit":
      cmdCommit(opts);
      break;
    case "apply":
      cmdApply(opts);
      break;
    case "skip":
      cmdSkip(opts);
      break;
    case "status":
      cmdStatus();
      break;
    case "help":
    default:
      cmdHelp();
      break;
  }
}

main();
