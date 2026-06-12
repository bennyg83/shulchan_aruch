#!/usr/bin/env node
/**
 * Phase-1 repair: retranslate failing blocks from Hebrew via local LibreTranslate,
 * then apply full_dictionary glossary (same as apply:dictionary).
 *
 *   node pipeline/work/_editorial-libre-wave.mjs --from 84 --to 84
 *   node pipeline/work/_editorial-libre-wave.mjs --from 1 --to 403 --workers 6
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks } from "../lib/quality-checks.mjs";
import {
  applyGlossary,
  getInhouseDictionaryPath,
  loadDictionaryFromPath,
} from "../../../OC_253/halacha_dictionary_lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const PROGRESS = path.join(ROOT, "progress.log");
const LIBRE = (process.env.LIBRE_URL?.trim() || "http://localhost:5000").replace(/\/$/, "");

const ERROR_CODES = new Set([
  "mt_garbage",
  "hebrew_in_english",
  "untranslated_copy",
  "pending_placeholder",
  "empty_english",
  "literal_bow_swim",
]);

function parseArgs() {
  let from = 1;
  let to = 403;
  let workers = 6;
  let dry = false;
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--from" && process.argv[i + 1]) from = +process.argv[++i];
    else if (process.argv[i] === "--to" && process.argv[i + 1]) to = +process.argv[++i];
    else if (process.argv[i] === "--workers" && process.argv[i + 1]) workers = +process.argv[++i];
    else if (process.argv[i] === "--dry") dry = true;
  }
  return { from, to, workers, dry };
}

function hebrewToPlain(html) {
  const $ = cheerio.load(`<div id="r">${html ?? ""}</div>`, { decodeEntities: true });
  return $("#r").text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
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
    .replace(/\bhouse of prayer\b/gi, "synagogue")
    .trim();
}

function splitChunks(text, max = 450) {
  if (text.length <= max) return [text];
  const parts = [];
  let i = 0;
  while (i < text.length) {
    let j = Math.min(i + max, text.length);
    if (j < text.length) {
      const cut = text.lastIndexOf(" ", j);
      if (cut > i + 80) j = cut;
    }
    parts.push(text.slice(i, j).trim());
    i = j;
  }
  return parts.filter(Boolean);
}

async function translateLibre(text) {
  const parts = splitChunks(text);
  const out = [];
  for (const q of parts) {
    const payload = { q, source: "he", target: "en", format: "text" };
    const res = await fetch(`${LIBRE}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Libre ${res.status}: ${(await res.text()).slice(0, 120)}`);
    const j = await res.json();
    out.push(String(j.translatedText || "").trim());
  }
  return halakhicCleanup(out.join(" "));
}

function needsFix(block) {
  return runBlockQualityChecks(block).some((e) => e.severity === "error" && ERROR_CODES.has(e.code));
}

async function runPool(items, n, fn) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        await fn(items[i], i);
      }
    })
  );
}

function simanErrorCount(n) {
  const tag = String(n).padStart(3, "0");
  const dir = path.join(OUT, `siman_${tag}`);
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  for (const slug of fs.readdirSync(dir)) {
    const sd = path.join(dir, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(sd, f), "utf8"))) {
        if (runBlockQualityChecks(b).some((e) => e.severity === "error" && ERROR_CODES.has(e.code))) count++;
      }
    }
  }
  return count;
}

function waveDone(n) {
  const tag = `siman_${String(n).padStart(3, "0")}`;
  if (!fs.existsSync(PROGRESS) || !fs.readFileSync(PROGRESS, "utf8").includes(`${tag} libre-wave DONE`)) {
    return false;
  }
  return simanErrorCount(n) === 0;
}

function log(msg) {
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "");
  fs.appendFileSync(PROGRESS, `${ts} ${msg}\n`);
  console.log(msg);
}

async function processSiman(n, glossary, workers, dry) {
  const tag = String(n).padStart(3, "0");
  const dir = path.join(OUT, `siman_${tag}`);
  if (!fs.existsSync(dir)) return 0;
  if (waveDone(n)) {
    console.log(`[SKIP] siman_${tag}`);
    return 0;
  }

  const fileJobs = [];
  for (const slug of fs.readdirSync(dir)) {
    const sd = path.join(dir, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      const fp = path.join(sd, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      const todo = blocks.map((b, i) => i).filter((i) => needsFix(blocks[i]));
      if (todo.length) fileJobs.push({ fp, blocks, todo });
    }
  }
  if (!fileJobs.length) {
    log(`siman_${tag} libre-wave DONE (0 blocks)`);
    return 0;
  }

  let fixed = 0;
  await runPool(fileJobs, workers, async ({ fp, blocks, todo }) => {
    let changed = false;
    for (const i of todo) {
      const b = blocks[i];
      const plain = hebrewToPlain(b.he);
      if (!plain) continue;
      if (dry) {
        console.log("DRY", path.relative(OUT, fp), b.seif, b.marker);
        continue;
      }
      try {
        let en = await translateLibre(plain);
        en = applyGlossary(en, glossary);
        blocks[i] = { ...b, en: escapeHtml(en) };
        fixed++;
        changed = true;
      } catch (e) {
        console.warn("FAIL", path.relative(OUT, fp), b.seif, b.marker, e.message);
      }
    }
    if (changed && !dry) {
      fs.writeFileSync(fp, blocks.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
    }
  });

  log(`siman_${tag} libre-wave DONE (${fixed} blocks)`);
  return fixed;
}

const { from, to, workers, dry } = parseArgs();
const dictPath = getInhouseDictionaryPath();
const glossary = loadDictionaryFromPath(dictPath);
console.log(`Libre wave ${from}-${to} workers=${workers} glossary=${glossary.length} entries`);

let total = 0;
for (let n = from; n <= to; n++) {
  total += await processSiman(n, glossary, workers, dry);
}
console.log(`[DONE] libre-wave fixed ${total} blocks, simanim ${from}-${to}`);
