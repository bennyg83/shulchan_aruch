#!/usr/bin/env node
/**
 * Fix English presentation: strip HTML, {Rama: ...}, entities. English only.
 *
 *   node pipeline/apply-html-presentation.mjs --from 1 --to 20
 *   node pipeline/apply-html-presentation.mjs --queue   # only html-presentation-queue.json items
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../eh001_block_lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";
import { simanPartFiles } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const LOG_PATH = path.join(WORK, "html-presentation-log.jsonl");

const HTML_CODES = new Set([
  "html_entity_leak",
  "broken_html",
  "hebrew_in_english",
]);

const COMMENTATOR_ATTR = {
  "Siftei Kohen": "Siftei Kohen",
  "Taz": "Taz",
  "Shach": "Shach",
  "Gra": "Gra",
  "Bach": "Bach",
  "Rama": "Rama",
};

function decodeEntities(s) {
  return String(s ?? "")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;lt;/gi, "<")
    .replace(/&amp;gt;/gi, ">")
    .replace(/&amp;quot;/gi, '"')
    .replace(/&amp;amp;/gi, "&")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function stripInnerTags(s) {
  return decodeEntities(String(s ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/** @param {string} en */
export function cleanEnglishPresentation(en) {
  let s = String(en ?? "");
  const orig = s;
  if (!s.trim()) return { text: s, changed: false };

  s = decodeEntities(s);

  // Rama / gloss
  s = s.replace(/<small[^>]*>([\s\S]*?)<\/small>/gi, (_, inner) => {
    const t = stripInnerTags(inner);
    return t ? `{Rama: ${t}}` : "";
  });

  // Commentator markup
  s = s.replace(
    /<i[^>]*\bdata-commentator=["']([^"']+)["'][^>]*>([\s\S]*?)<\/i>/gi,
    (_, attr, inner) => {
      const name =
        COMMENTATOR_ATTR[attr] ||
        attr.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const t = stripInnerTags(inner);
      return t ? `${t} (${name})` : `(${name})`;
    }
  );

  s = s.replace(/<br\s*\/?>/gi, " ");
  s = s.replace(/<\/p>\s*<p[^>]*>/gi, "\n");
  s = s.replace(/<\/?p[^>]*>/gi, " ");

  // Bold/italic — keep text
  for (let pass = 0; pass < 8; pass++) {
    const next = s.replace(/<(b|strong|i|em|u|span)[^>]*>([\s\S]*?)<\/\1>/gi, "$2");
    if (next === s) break;
    s = next;
  }

  s = s.replace(/<[^>]+>/g, " ");
  s = s.replace(/[ \t]+\n/g, "\n");
  s = s.replace(/\n[ \t]+/g, "\n");
  s = s.replace(/[ \t]{2,}/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n");
  s = s.trimEnd();

  return { text: s, changed: s !== orig };
}

function parseArgs() {
  let from = 1;
  let to = 20;
  let useQueue = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--queue") useQueue = true;
  }
  return { from, to, useQueue };
}

function countHtmlFlags(block) {
  const issues = runBlockQualityChecks(block).filter((i) => HTML_CODES.has(i.code));
  const en = String(block.en ?? "");
  const hasTag = /<[a-z]/i.test(en);
  const hasEntity = /&quot;|&amp;/.test(en);
  return issues.length + (hasTag ? 1 : 0) + (hasEntity ? 1 : 0);
}

function main() {
  const { from, to, useQueue } = parseArgs();
  const outRoot = path.join(OC_ROOT, "output");
  fs.mkdirSync(WORK, { recursive: true });

  /** @type {Map<string, { siman: number, keys: Set<string> }>} */
  const fileTargets = new Map();

  if (useQueue) {
    const qPath = path.join(WORK, "html-presentation-queue.json");
    if (!fs.existsSync(qPath)) {
      console.error("Missing", qPath);
      process.exit(1);
    }
    const q = JSON.parse(fs.readFileSync(qPath, "utf8"));
    for (const it of q.items || []) {
      const abs = it.absPath || path.join(outRoot, it.file);
      const key = `${it.slug}\u0001${it.seif}\u0001${it.marker}`;
      if (!fileTargets.has(abs)) fileTargets.set(abs, { siman: it.siman, keys: new Set() });
      fileTargets.get(abs).keys.add(key);
    }
  } else {
    for (let s = from; s <= to; s++) {
      for (const absPath of simanPartFiles(outRoot, s)) {
        fileTargets.set(absPath, { siman: s, keys: null });
      }
    }
  }

  /** @type {Map<number, { files: Set<string>, blocksFixed: number, remainingFlags: number }>} */
  const bySiman = new Map();

  let totalBlocksFixed = 0;

  for (const [absPath, meta] of fileTargets) {
    if (!fs.existsSync(absPath)) continue;
    const raw = fs.readFileSync(absPath, "utf8");
    const blocks = parseBlocksInFile(raw);
    let fileChanged = false;
    let fileFixed = 0;

    for (const b of blocks) {
      const key = `${b.slug}\u0001${b.seif}\u0001${b.marker}`;
      if (meta.keys && !meta.keys.has(key)) continue;

      const { text, changed } = cleanEnglishPresentation(b.en);
      if (!changed) continue;
      b.en = text;
      fileChanged = true;
      fileFixed++;
      totalBlocksFixed++;
    }

    if (fileChanged) {
      const out = blocks.map((b) => serializeBlock(b)).join("\n");
      fs.writeFileSync(absPath, out.endsWith("\n") ? out : out + "\n", "utf8");
    }

    const sim = meta.siman;
    if (!bySiman.has(sim)) {
      bySiman.set(sim, { files: new Set(), blocksFixed: 0, remainingFlags: 0 });
    }
    const rec = bySiman.get(sim);
    if (fileChanged) rec.files.add(path.relative(outRoot, absPath));
    rec.blocksFixed += fileFixed;

    for (const b of blocks) {
      rec.remainingFlags += countHtmlFlags(b);
    }
  }

  const lines = [];
  for (const [siman, rec] of [...bySiman.entries()].sort((a, b) => a[0] - b[0])) {
    const entry = {
      siman,
      files: rec.files.size,
      blocksFixed: rec.blocksFixed,
      remainingFlags: rec.remainingFlags,
    };
    lines.push(JSON.stringify(entry));
    console.log(JSON.stringify(entry));
  }

  if (lines.length) {
    fs.appendFileSync(LOG_PATH, lines.join("\n") + "\n", "utf8");
  }

  console.log(
    JSON.stringify({
      simanim: [...bySiman.keys()].sort((a, b) => a - b),
      totalBlocksFixed,
    })
  );
}

main();
