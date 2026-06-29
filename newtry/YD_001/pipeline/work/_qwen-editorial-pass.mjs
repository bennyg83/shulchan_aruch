#!/usr/bin/env node
/**
 * Qwen editorial pass — retranslate error blocks using local IPEX/Qwen server.
 *
 * Processes ONE siman at a time, ONE block at a time, with deliberate pauses.
 * Only touches blocks flagged as retranslatable errors in the quality report.
 * Tags every file it writes so it can be targeted for revalidation.
 *
 * Usage:
 *   node pipeline/work/_qwen-editorial-pass.mjs
 *   node pipeline/work/_qwen-editorial-pass.mjs --from 109 --to 109
 *   node pipeline/work/_qwen-editorial-pass.mjs --report checklist-output/quality-report.json
 *   node pipeline/work/_qwen-editorial-pass.mjs --dry
 *
 * Start IPEX server first:
 *   cd tools/quality-viewer && .\ipex\start-ipex-server.ps1
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";

const ROOT     = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT      = path.join(ROOT, "output");
const LOG      = path.join(ROOT, "progress.log");

const SERVER_URL   = "http://127.0.0.1:8080/v1/chat/completions";
const MODEL_NAME   = "local-validator"; // llama-server ignores this field

// Milliseconds to pause between blocks within a file — keeps CPU/GPU calm
const BLOCK_DELAY_MS  = 4000;
// Milliseconds to pause between files within a siman
const FILE_DELAY_MS   = 6000;
// Milliseconds to pause between simanim
const SIMAN_DELAY_MS  = 15000;

// Error codes that require a fresh translation from Hebrew
const RETRANSLATE_CODES = new Set([
  "mt_garbage",
  "hebrew_in_english",
  "mt_api_artifact",
  "untranslated_copy",
  "pending_placeholder",
]);

// Tag written to the top of every file this script modifies
const QWEN_TAG_PREFIX = "# qwen-pass:";

// --------------------------------------------------------------------------
// System prompt — translation task (not validation)
// --------------------------------------------------------------------------
const SYSTEM_PROMPT = `\
You are translating halakhic commentary from Hebrew/Aramaic to English for the Shulchan Aruch, Yoreh De'ah.

RULES:
1. Translate faithfully and completely from the Hebrew. Do not add or omit content.
2. Preserve all halakhic terms in transliteration: issur, heter, bitul, ta'am, noten ta'am, nevelah, treifah, shechitah, melichah, safek, vadai, l'chatchila, b'dieved, and similar.
3. Preserve commentator names exactly: Mechaber, Rama, Rif, Rambam, Rashba, Ran, Rosh, Tur, Shach, Taz, Bach, Maharsha, Maharil, Pri Chadash, etc.
4. Expand Hebrew abbreviations naturally in English: כ"כ → "so wrote", ר"ל → "meaning", ד"ה → "s.v.", ס"ק → "sub-clause", ס"ס → "end of siman", etc.
5. Talmud citations: keep tractate name + daf/amud in transliteration, e.g. "Chulin 98a", "Avodah Zarah 66b".
6. Do NOT translate: Hashem, mitzvah, seif, siman, parasha.
7. Do NOT add explanations, footnotes, or bracket commentary of your own.
8. Output ONLY the English translation text — no JSON, no markdown, no preamble.`;

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

const sleep = ms => new Promise(r => setTimeout(r, ms));

function plainText(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extract preamble lines (before first block marker) and return [preamble, rest] */
function splitPreamble(raw) {
  const idx = raw.search(/^\*\*\*\* YD001 SOURCE BLOCK \*\*\*\*/m);
  if (idx === -1) return ["", raw];
  return [raw.slice(0, idx), raw.slice(idx)];
}

/** Build or replace the qwen-pass tag line in the preamble */
function buildTaggedPreamble(oldPreamble, simanN, relPath, fixedCount, totalErrorsInFile) {
  // Remove existing qwen-pass line if present
  const stripped = oldPreamble.replace(/^# qwen-pass:.*\n?/m, "");
  const ts = new Date().toISOString();
  const tag = `${QWEN_TAG_PREFIX} ${ts}  model: Qwen2.5-3B-Instruct-Q4_K_M  siman: ${simanN}  file: ${relPath}  fixed: ${fixedCount}/${totalErrorsInFile}\n`;
  return tag + stripped;
}

function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
}

function appendProgressLog(line) {
  fs.appendFileSync(LOG, line + "\n", "utf8");
}

// --------------------------------------------------------------------------
// LLM server
// --------------------------------------------------------------------------

async function checkServer() {
  try {
    const res = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL_NAME,
        max_tokens: 4,
        messages: [{ role: "user", content: "hi" }],
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function callLlm(hebrewPlain, simanN, slug, seif, marker) {
  const context = `Yoreh De'ah siman ${simanN}, commentary: ${slug}, seif ${seif}, marker ${marker}`;
  const userMsg =
    `Translate this Yoreh De'ah commentary block to English.\n` +
    `Context: ${context}\n\n` +
    `Hebrew text:\n${hebrewPlain}`;

  const res = await fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL_NAME,
      temperature: 0,
      max_tokens: 800,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMsg },
      ],
    }),
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`LLM HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = await res.json();
  const text = (json.choices?.[0]?.message?.content ?? "").trim();
  if (!text) throw new Error("LLM returned empty response");
  return text;
}

// --------------------------------------------------------------------------
// Quality report loading
// --------------------------------------------------------------------------

/**
 * Returns: Map<simanNumber, Map<relPath, Set<"slug#seif#marker">>>
 * Only includes blocks whose issues include at least one RETRANSLATE_CODE.
 */
function loadErrorMap(reportPath) {
  log(`Loading quality report: ${reportPath}`);
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const map = new Map(); // simanN -> Map<relPath, Set<blockKey>>

  for (const block of report.blocks) {
    if (block.severity !== "error") continue;

    const codes = (block.issues ?? []).map(i =>
      typeof i === "string" ? i : i.code
    );
    const needsRetranslate = codes.some(c => RETRANSLATE_CODES.has(c));
    if (!needsRetranslate) continue;

    const m = (block.relPath ?? "").match(/siman_(\d+)/);
    if (!m) continue;
    const n = parseInt(m[1]);

    if (!map.has(n)) map.set(n, new Map());
    const fileMap = map.get(n);

    const rp = block.relPath;
    if (!fileMap.has(rp)) fileMap.set(rp, new Set());
    // Key must match what we derive from parsed blocks below
    fileMap.get(rp).add(`${block.slug}\x01${block.seif}\x01${block.marker ?? "_"}`);
  }

  log(`Found ${map.size} simanim with retranslatable error blocks`);
  return map;
}

// --------------------------------------------------------------------------
// File processing
// --------------------------------------------------------------------------

async function processFile(simanN, relPath, errorKeys, dryRun) {
  const filePath = path.join(OUT, relPath);
  if (!fs.existsSync(filePath)) {
    log(`  [SKIP] Not found: ${filePath}`);
    return 0;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const [preamble, blockSection] = splitPreamble(raw);
  const blocks = parseBlocksInFile(blockSection);

  let fixedCount = 0;
  const updatedBlocks = [];

  for (const block of blocks) {
    const key = `${block.slug}\x01${block.seif}\x01${String(block.marker ?? "_")}`;

    if (!errorKeys.has(key)) {
      updatedBlocks.push(block);
      continue;
    }

    const hePlain = plainText(block.he);
    if (!hePlain || hePlain.length < 3) {
      log(`    [SKIP-EMPTY-HE] seif ${block.seif} marker ${block.marker}`);
      updatedBlocks.push(block);
      continue;
    }

    log(`    → [${block.slug}] seif ${block.seif} marker ${block.marker} (${hePlain.slice(0, 60)}…)`);

    if (dryRun) {
      log(`    [DRY] Would call LLM`);
      fixedCount++;
      updatedBlocks.push(block);
      continue;
    }

    let newEn = block.en;
    try {
      newEn = await callLlm(hePlain, simanN, block.slug, block.seif, block.marker ?? "_");
      fixedCount++;
      log(`    ✓ ${newEn.slice(0, 80)}…`);
    } catch (err) {
      log(`    [ERR] ${err.message} — keeping original`);
    }

    updatedBlocks.push({ ...block, en: newEn });

    // Pause between blocks so the hardware doesn't overheat
    await sleep(BLOCK_DELAY_MS);
  }

  if (fixedCount === 0) return 0;

  // Reassemble: tagged preamble + all blocks
  const newBlockSection = updatedBlocks.map(b => serializeBlock(b)).join("\n");
  const newPreamble = buildTaggedPreamble(preamble, simanN, relPath, fixedCount, errorKeys.size);
  const finalContent = newPreamble + newBlockSection;

  if (!dryRun) {
    fs.writeFileSync(filePath, finalContent, "utf8");
    log(`  ✓ Written: ${relPath} (${fixedCount}/${errorKeys.size} blocks fixed, tagged)`);
  }

  return fixedCount;
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------

const argv = process.argv.slice(2);
const dryRun    = argv.includes("--dry");
const fromSiman = parseInt(argv[argv.indexOf("--from") + 1] ?? "1")  || 1;
const toSiman   = parseInt(argv[argv.indexOf("--to")   + 1] ?? "403") || 403;
const reportArg = argv[argv.indexOf("--report") + 1];
const reportPath = reportArg
  ? path.resolve(reportArg)
  : path.join(ROOT, "checklist-output/quality-report.json");

console.log(`\n${"=".repeat(60)}`);
console.log(`  Qwen Editorial Pass`);
console.log(`  Range : siman ${fromSiman}–${toSiman}`);
console.log(`  Report: ${reportPath}`);
console.log(`  Mode  : ${dryRun ? "DRY RUN (no writes)" : "LIVE"}`);
console.log(`  Delays: ${BLOCK_DELAY_MS}ms/block  ${FILE_DELAY_MS}ms/file  ${SIMAN_DELAY_MS}ms/siman`);
console.log(`${"=".repeat(60)}\n`);

if (!dryRun) {
  const ok = await checkServer();
  if (!ok) {
    console.error("ERROR: IPEX LLM server not reachable at " + SERVER_URL);
    console.error("Start it with:");
    console.error("  cd tools/quality-viewer");
    console.error("  .\\ipex\\start-ipex-server.ps1");
    process.exit(1);
  }
  log("✓ LLM server reachable");
}

const errorMap = loadErrorMap(reportPath);

const simanList = [...errorMap.keys()]
  .filter(n => n >= fromSiman && n <= toSiman)
  .sort((a, b) => a - b);

log(`Simanim to process in range: ${simanList.length}`);
if (simanList.length === 0) {
  log("Nothing to do.");
  process.exit(0);
}

let totalFixed = 0;
let totalFiles  = 0;

for (let si = 0; si < simanList.length; si++) {
  const simanN  = simanList[si];
  const fileMap = errorMap.get(simanN);
  const relPaths = [...fileMap.keys()].sort();
  const simanErrors = [...fileMap.values()].reduce((s, set) => s + set.size, 0);

  log(`\n[${ si + 1}/${simanList.length}] siman_${String(simanN).padStart(3,"0")} — ${relPaths.length} files, ${simanErrors} error blocks`);

  let simanFixed = 0;

  for (let fi = 0; fi < relPaths.length; fi++) {
    const relPath  = relPaths[fi];
    const errorKeys = fileMap.get(relPath);

    log(`  [${fi + 1}/${relPaths.length}] ${relPath} (${errorKeys.size} blocks)`);

    const fixed = await processFile(simanN, relPath, errorKeys, dryRun);
    simanFixed += fixed;
    totalFixed += fixed;
    totalFiles++;

    // Pause between files (not after the last one)
    if (fi < relPaths.length - 1) await sleep(FILE_DELAY_MS);
  }

  log(`  → siman_${simanN} complete: ${simanFixed}/${simanErrors} blocks fixed`);

  if (!dryRun && simanFixed > 0) {
    appendProgressLog(
      `${new Date().toISOString()} siman_${String(simanN).padStart(3,"0")} qwen-pass DONE (${simanFixed} blocks fixed in ${relPaths.length} files)`
    );
  }

  // Pause between simanim (not after the last one)
  if (si < simanList.length - 1) {
    log(`  ⏸  Pausing ${SIMAN_DELAY_MS / 1000}s before next siman…`);
    await sleep(SIMAN_DELAY_MS);
  }
}

console.log(`\n${"=".repeat(60)}`);
console.log(`  Done.`);
console.log(`  Total blocks fixed : ${totalFixed}`);
console.log(`  Total files touched: ${totalFiles}`);
console.log(`  Simanim processed  : ${simanList.length}`);
console.log(`${"=".repeat(60)}\n`);
