#!/usr/bin/env node
/**
 * Broad garbage scan of EH_001/output TXT files.
 * Checks ENGLISH blocks only against an extended pattern set.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "newtry/EH_001/output");

const BLOCK_SEP = "**** EH001 SOURCE BLOCK ****";
const ENG_HDR   = "**** ENGLISH ****";
const END_HDR   = "**** END BLOCK ****";

// Extended garbage patterns — each has a label for reporting
const PATTERNS = [
  // Known hard-garbage (existing GARBAGE_RE)
  { label: "lord_prayer",       re: /lord.{0,3}s prayer/i },
  { label: "lords_prayer_enc",  re: /lord\â€™s prayer/i },
  { label: "heaven_people",     re: /heaven.{0,3}s people/i },
  { label: "kgb",               re: /\bkgb\b/i },
  { label: "terrorist",         re: /\bterrorist\b/i },
  { label: "starwork",          re: /star\s*work/i },
  { label: "bible_and_bible",   re: /bible and the bible/i },
  { label: "mmm_ddd",           re: /\b[md]\.[md]\.[md]\b/i },
  { label: "her_age",           re: /\bher age\b/i },
  { label: "the_craft",         re: /\bthe craft\b/i },
  { label: "muktzeh_allocat",   re: /muktzeh.*allocat/i },
  { label: "hand_recoils",      re: /hand recoils/i },
  { label: "lycott",            re: /\blycott\b/i },

  // EH-specific garbage MT artifacts
  { label: "hashems_word",      re: /hashem.{0,3}s word\b/i },
  { label: "hashems_people",    re: /hashem.{0,3}s people\b/i },
  { label: "hashems_mercy",     re: /hashem.{0,3}s mercy\b/i },
  { label: "hashems_promise",   re: /hashem.{0,3}s promise\b/i },
  { label: "i_am_reminded",     re: /i am reminded of hashem/i },
  { label: "cursed_every_season", re: /cursed (in every|every) season/i },
  { label: "shall_be_cursed",   re: /shall be cursed by his husband/i },
  { label: "whites_of_snail",   re: /whites of the snail/i },
  { label: "blessed_with_man",  re: /blessed with a man/i },
  { label: "not_be_given_mercy",re: /promise is not to be given to hashem/i },
  { label: "cursed_in_every",   re: /cursed and cursed/i },

  // Generic MT drift patterns
  { label: "enc_artifact",      re: /â€[™œ]/i },
  { label: "html_entity_leak",  re: /&quot;|&amp;|&lt;|&gt;/i },
  { label: "he_shall_be_cursed",re: /he shall be cursed/i },
  { label: "it_is_not_good_for_man", re: /it is not good for man to be alone/i },
];

// Extract English text from a block string
function extractEnglish(block) {
  const eIdx = block.indexOf(ENG_HDR);
  const endIdx = block.indexOf(END_HDR);
  if (eIdx < 0 || endIdx < 0) return "";
  return block.slice(eIdx + ENG_HDR.length, endIdx);
}

// Parse seif + marker from block header
function parseKey(block) {
  const seif   = (block.match(/^\s*seif:\s*(.+)$/m) || [])[1]?.trim() ?? "?";
  const marker = (block.match(/^\s*marker:\s*(.+)$/m) || [])[1]?.trim() ?? "_";
  const slug   = (block.match(/^\s*slug:\s*(.+)$/m) || [])[1]?.trim() ?? "?";
  return `seif:${seif} marker:${marker} slug:${slug}`;
}

const results = {}; // relPath → [{key, label, excerpt}]
let totalHits = 0;
let totalBlocks = 0;
let filesWithHits = 0;

for (const simanDir of fs.readdirSync(ROOT).sort()) {
  const simanPath = path.join(ROOT, simanDir);
  if (!fs.statSync(simanPath).isDirectory()) continue;
  for (const commentatorDir of fs.readdirSync(simanPath).sort()) {
    const cPath = path.join(simanPath, commentatorDir);
    if (!fs.statSync(cPath).isDirectory()) continue;
    for (const fname of fs.readdirSync(cPath).sort()) {
      if (!fname.startsWith("part-") || !fname.endsWith(".txt")) continue;
      const fpath = path.join(cPath, fname);
      const content = fs.readFileSync(fpath, "utf8");
      const blocks = content.split(BLOCK_SEP).slice(1);
      totalBlocks += blocks.length;
      const fileHits = [];
      for (const block of blocks) {
        const eng = extractEnglish(block);
        if (!eng.trim()) continue;
        for (const { label, re } of PATTERNS) {
          const m = eng.match(re);
          if (m) {
            const excerpt = eng.slice(Math.max(0, m.index - 30), m.index + 60).replace(/\n/g, " ").trim();
            fileHits.push({ key: parseKey(block), label, excerpt });
            totalHits++;
          }
        }
      }
      if (fileHits.length > 0) {
        const rel = path.relative(ROOT, fpath);
        results[rel] = fileHits;
        filesWithHits++;
      }
    }
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
console.log("\n=== EH001 Garbage Scan Results ===\n");
console.log(`Blocks scanned : ${totalBlocks}`);
console.log(`Files with hits: ${filesWithHits}`);
console.log(`Total hits     : ${totalHits}`);
console.log("");

// Pattern frequency table
const freq = {};
for (const hits of Object.values(results)) {
  for (const { label } of hits) freq[label] = (freq[label] ?? 0) + 1;
}
console.log("── Pattern frequency ──────────────────────────────────────");
for (const [label, count] of Object.entries(freq).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${label.padEnd(25)} ${count}`);
}
console.log("");

// File breakdown
console.log("── Files with hits ─────────────────────────────────────────");
for (const [rel, hits] of Object.entries(results).sort()) {
  console.log(`\n${rel} (${hits.length} hit${hits.length > 1 ? "s" : ""})`);
  for (const { key, label, excerpt } of hits) {
    console.log(`  [${label}] ${key}`);
    console.log(`    ...${excerpt}...`);
  }
}
console.log("\n=== END ===");
