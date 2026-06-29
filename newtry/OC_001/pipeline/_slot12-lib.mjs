/** Shared worker-slot-12 editorial helpers */
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

export const BATCH_SIZE = 45;

export const PREFLIGHT_RES = [
  /\bAccording to the\b/i,
  /\bthere in the\b/i,
  /\bin me\b/i,
  /&quot;/,
  /&amp;/,
  /&lt;/,
  /&gt;/,
];

export function blockKey(seif, marker) {
  return `${seif}:${marker || "_"}`;
}

export function autoFix(en, marker, he = "") {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ")
    .replace(/\bLord our God\b/g, "Hashem our God")
    .replace(/\bLord's Prayer\b/g, "Hashem")
    .replace(/\bHashem's Word\b/g, "Hashem")
    .replace(/\bHashem's promise\b/g, "Hashem")
    .replace(/\bLord\b/g, "Hashem")
    .replace(/\bGod's\b/g, "Hashem's")
    .replace(/\bGod\b/g, "Hashem")
    .replace(/\bCongratulations\b/gi, "Blessings")
    .replace(/\baccording to the\b/gi, "per the")
    .replace(/\bthere in the\b/gi, "there, in the")
    .replace(/\bother psalms in me\b/gi, "other psalms")
    .replace(/\bwe are also in me\b/gi, "we are also included")
    .replace(/\bpeople in me\b/gi, "people")
    .replace(/\bbetween me and\b/gi, "between Ashrei and")
    .replace(/^There\.?$/i, "There — source.")
    .replace(/^"Ch"\.?$/i, "Chullin — source.")
    .replace(/\bSabbath\b/gi, "Shabbat");
  const mk = String(marker ?? "_").trim();
  if (/^[א-ת]$/.test(mk)) {
    const head = t.slice(0, 14);
    if (!head.includes(`(${mk})`)) {
      t = t.replace(/^\(\d+\)\s*/, "");
      t = t.replace(/^\[[^\]]+\]\s*/, "");
      if (!t.slice(0, 12).includes(`(${mk})`)) t = `(${mk}) ${t}`;
    }
  }
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
    t = t.replace(/\{Rama:\s*([^}]+)\}/g, (_, inner) => {
      const x = inner.trim();
      return x.startsWith("Rama:") ? `{Rama: ${x.slice(5).trim()}}` : `{Rama: ${x}}`;
    });
  }
  return t.replace(/\s+/g, " ").trim();
}

export function preflightFail(en) {
  if (!en || en.length < 8) return "empty_english";
  for (const re of PREFLIGHT_RES) if (re.test(en)) return re.source;
  if (/\bShield of Abraham\b/i.test(en)) return "anglicized_ma";
  if (/\bGolden Rows\b/i.test(en)) return "anglicized_taz";
  if (/\bHouse of Joseph\b/i.test(en)) return "anglicized_by";
  return null;
}

export function patchFilePreflight(absPath) {
  const blocks = parseBlocksInFile(fs.readFileSync(absPath, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const en = String(b.en ?? "");
      const patched = autoFix(en, b.marker, b.he);
      if (patched !== en) {
        n++;
        return { ...b, en: patched };
      }
      return b;
    })
    .map(serializeBlock);
  if (n) fs.writeFileSync(absPath, out.join("\n\n") + "\n", "utf8");
  return n;
}

export function writeApplyScript(pipelineDir, siman, batchNum) {
  const applyPath = path.join(pipelineDir, `_apply-siman${siman}-batch${batchNum}-slot12.mjs`);
  const content = `#!/usr/bin/env node
/** worker-slot-12 — siman ${siman} editorial batch ${batchNum} */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { FIXES } from "./_siman${siman}-slot12-batch${batchNum}-data.mjs";
import { preflightFail } from "./_slot12-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", "siman_${siman}");
let total = 0;
const fails = [];

for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = \`\${b.seif}:\${b.marker || "_"}\`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\\n\\n");
  fs.writeFileSync(fp, out.endsWith("\\n") ? out : out + "\\n", "utf8");
  total += Object.keys(blockFixes).length;
  for (const [key, en] of Object.entries(blockFixes)) {
    const pf = preflightFail(en);
    if (pf) fails.push(\`\${rel} \${key}: \${pf}\`);
  }
}
console.log("fixed", total);
if (fails.length) {
  console.error("PREFLIGHT FAILURES:", fails.join("\\n"));
  process.exit(1);
}
console.log("preflight ok");

import { spawnSync } from "child_process";
const sync = spawnSync(
  process.execPath,
  [path.join(__dirname, "sync-queue-from-output.mjs"), path.join(__dirname, "work", "editorial-queue-siman-${String(siman).padStart(3, "0")}.json")],
  { cwd: path.join(__dirname, ".."), stdio: "inherit" }
);
if (sync.status !== 0) process.exit(sync.status ?? 1);
`;
  fs.writeFileSync(applyPath, content, "utf8");
  return applyPath;
}

export function writeBatchData(pipelineDir, siman, batchNum, batchFixes, count) {
  const outPath = path.join(pipelineDir, `_siman${siman}-slot12-batch${batchNum}-data.mjs`);
  const body = `/** worker-slot-12 — siman ${siman} editorial batch ${batchNum} fixes (${count} blocks) */\nexport const FIXES = ${JSON.stringify(batchFixes, null, 2)};\n`;
  fs.writeFileSync(outPath, body, "utf8");
  return outPath;
}

export function loadHandJson(pipelineDir, siman) {
  const p = path.join(pipelineDir, "work", `hand-slot12-siman-${siman}.json`);
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export function hePlain(he) {
  return plainFromHtml(he);
}
