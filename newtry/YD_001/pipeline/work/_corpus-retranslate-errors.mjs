#!/usr/bin/env node
/**
 * Retranslate blocks that fail quality checks (MT garbage, Hebrew-in-English, etc.)
 *   node pipeline/work/_corpus-retranslate-errors.mjs --from 201 --to 201 --codes mt_garbage
 *   node pipeline/work/_corpus-retranslate-errors.mjs --from 1 --to 403 --codes hebrew_in_english --allow-corpus-mt
 * Requires YD001_ALLOW_CORPUS_MT=1 or --allow-corpus-mt (blocked for sprint workers).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import * as cheerio from "cheerio";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks, plainFromHtml } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");

const _argv = process.argv.slice(2);
if (
  process.env.YD001_ALLOW_CORPUS_MT !== "1" &&
  !_argv.includes("--allow-corpus-mt")
) {
  console.error(`
[BLOCKED] This script uses Google/LibreTranslate machine translation.

Sprint workers must NOT run it. Use editorial workflow instead:
  node pipeline/build-editorial-siman-batch.mjs --siman N --scope quality --min-severity error --ignore-done
  → translate each block from Hebrew in the batch markdown
  node pipeline/sprint-worker.mjs --siman N --part P --parts T

See: pipeline/work/AGENT_SPRINT_WORKER.md

To run MT intentionally (bootstrap only): YD001_ALLOW_CORPUS_MT=1 or pass --allow-corpus-mt
`);
  process.exit(1);
}

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

function parseArgs(argv) {
  let from = 1;
  let to = 403;
  let codes = ["mt_garbage", "hebrew_in_english", "untranslated_copy", "pending_placeholder", "empty_english"];
  let backend = "google";
  let ms = 2500;
  let workers = 4;
  let dry = false;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--from" && argv[i + 1]) from = +argv[++i];
    else if (argv[i] === "--to" && argv[i + 1]) to = +argv[++i];
    else if (argv[i] === "--codes" && argv[i + 1]) codes = argv[++i].split(",").map((s) => s.trim());
    else if (argv[i] === "--backend" && argv[i + 1]) backend = argv[++i];
    else if (argv[i] === "--ms" && argv[i + 1]) ms = +argv[++i];
    else if (argv[i] === "--workers" && argv[i + 1]) workers = +argv[++i];
    else if (argv[i] === "--dry") dry = true;
  }
  return { from, to, codes: new Set(codes), backend, ms, workers, dry };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function hebrewToPlain(html) {
  const $ = cheerio.load(`<div id="r">${html ?? ""}</div>`, { decodeEntities: true });
  return $("#r")
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function halakhicCleanup(text) {
  return text
    .replace(/\bGod\b/g, "Hashem")
    .replace(/\bthe LORD\b/g, "Hashem")
    .replace(/\bLORD\b/g, "Hashem")
    .replace(/\bSabbath\b/g, "Shabbat")
    .replace(/\bcommandments\b/gi, "mitzvot")
    .replace(/\bcommandment\b/gi, "mitzvah")
    .trim();
}

function splitForTranslation(input, maxLen = 450) {
  if (input.length <= maxLen) return [input];
  const parts = [];
  let i = 0;
  while (i < input.length) {
    let j = Math.min(i + maxLen, input.length);
    if (j < input.length) {
      const cut = input.lastIndexOf(" ", j);
      if (cut > i + 80) j = cut;
    }
    parts.push(input.slice(i, j).trim());
    i = j;
  }
  return parts.filter(Boolean);
}

async function translateGoogle(piece) {
  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      const body = new URLSearchParams({ q: piece });
      const res = await fetch(GOOGLE_URL, { method: "POST", body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data[0].map((seg) => seg[0]).join("");
    } catch (err) {
      const waitMs = String(err).includes("429") ? 15000 + attempt * 2000 : 1200 + attempt * 400;
      await sleep(waitMs);
    }
  }
  return null;
}

async function translateMymemory(piece) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(piece)}&langpair=iw|en`;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url);
      const j = await res.json();
      const tr = j?.responseData?.translatedText;
      if (tr && !/QUERY LENGTH LIMIT/i.test(tr)) return String(tr).trim();
    } catch {
      /* retry */
    }
    await sleep(2500);
  }
  return null;
}

async function translatePlain(text, msBetween) {
  const pieces = splitForTranslation(text);
  const out = [];
  for (const piece of pieces) {
    let tr = await translateGoogle(piece);
    if (!tr) tr = await translateMymemory(piece);
    if (!tr) return null;
    out.push(tr.trim());
    if (msBetween > 0) await sleep(msBetween);
  }
  return halakhicCleanup(out.join(" "));
}

function needsRetranslate(block, codes) {
  const errs = runBlockQualityChecks(block).filter((e) => e.severity === "error");
  return errs.some((e) => codes.has(e.code));
}

async function processFile(fp, codes, ms, dry) {
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let changed = 0;
  const out = [];
  for (const b of blocks) {
    if (!needsRetranslate(b, codes)) {
      out.push(b);
      continue;
    }
    const plain = hebrewToPlain(b.he);
    if (!plain) {
      out.push(b);
      continue;
    }
    if (dry) {
      console.log("DRY", path.relative(OUT, fp), b.seif, b.marker, plain.slice(0, 60));
      out.push(b);
      continue;
    }
    const translated = await translatePlain(plain, ms);
    if (!translated) {
      console.warn("FAIL", path.relative(OUT, fp), b.seif, b.marker);
      out.push(b);
      continue;
    }
    out.push({ ...b, en: escapeHtml(translated) });
    changed++;
    console.log("OK", path.relative(OUT, fp), `seif ${b.seif} marker ${b.marker}`);
  }
  if (changed && !dry) {
    fs.writeFileSync(fp, out.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
  }
  return changed;
}

const { from, to, codes, ms, workers, dry } = parseArgs(process.argv.slice(2));

console.log(`Retranslate simanim ${from}-${to} codes=[${[...codes].join(",")}] workers=${workers} dry=${dry}`);

async function runPool(items, concurrency, fn) {
  if (!items.length) return;
  let next = 0;
  const n = Math.min(concurrency, items.length);
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (true) {
        const i = next++;
        if (i >= items.length) break;
        await fn(items[i], i);
      }
    })
  );
}

const files = [];
for (let n = from; n <= to; n++) {
  const dir = path.join(OUT, `siman_${String(n).padStart(3, "0")}`);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const sd = path.join(dir, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      files.push(path.join(sd, f));
    }
  }
}

let total = 0;
const simanim = new Set();
const pendingFiles = [];

for (const fp of files.sort()) {
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  const jobs = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (!needsRetranslate(b, codes)) continue;
    jobs.push({ fp, blocks, index: i, block: b });
  }
  if (jobs.length) pendingFiles.push({ fp, blocks, jobs });
}

await runPool(pendingFiles, Math.max(1, workers), async ({ fp, blocks, jobs }) => {
  let fileChanged = 0;
  for (const { index, block: b } of jobs) {
    const plain = hebrewToPlain(b.he);
    if (!plain) continue;
    if (dry) {
      console.log("DRY", path.relative(OUT, fp), b.seif, b.marker, plain.slice(0, 60));
      continue;
    }
    const translated = await translatePlain(plain, ms);
    if (!translated) {
      console.warn("FAIL", path.relative(OUT, fp), b.seif, b.marker);
      continue;
    }
    blocks[index] = { ...b, en: escapeHtml(translated) };
    fileChanged++;
    console.log("OK", path.relative(OUT, fp), `seif ${b.seif} marker ${b.marker}`);
  }
  if (fileChanged && !dry) {
    fs.writeFileSync(fp, blocks.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
    total += fileChanged;
    const m = fp.match(/siman_(\d+)/);
    if (m) simanim.add(m[1]);
  }
});

if (!dry && total) {
  for (const sim of [...simanim].sort((a, b) => +a - +b)) {
    spawnSync(process.execPath, [path.join(ROOT, "apply_dictionary_yd001.mjs"), "--root", `output/siman_${sim.padStart(3, "0")}`], {
      cwd: ROOT,
      stdio: "inherit",
    });
  }
}

console.log(`[DONE] retranslated ${total} blocks in simanim ${[...simanim].join(", ")}`);
