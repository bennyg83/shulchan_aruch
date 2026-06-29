#!/usr/bin/env node
/** Apply hand JSON + manual FIXES to quality-flagged blocks for worker-slot-11 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot11-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const dump = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "slot11-quality-dump.json"), "utf8")
);

function loadJson(p) {
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
}

function hand447() {
  return {
    ...loadJson(path.join(__dirname, "siman447-part1.json")),
    ...loadJson(path.join(__dirname, "siman447-part2.json")),
    ...loadJson(path.join(__dirname, "siman447-part3.json")),
  };
}

function hand451() {
  return {
    ...loadJson(path.join(__dirname, "siman451-part1.json")),
    ...loadJson(path.join(__dirname, "siman451-part2.json")),
    ...loadJson(path.join(__dirname, "siman451-part3.json")),
  };
}

const HAND_BY_SIMAN = {
  447: hand447(),
  451: hand451(),
};

function itemKey(it) {
  const slug = it.file.split("/")[0];
  return `${slug}/${it.seif}:${it.marker || "_"}`;
}

function relPath(it) {
  return it.file;
}

async function loadManualFixes(siman) {
  const p = path.join(__dirname, `_fixes-siman${siman}-slot11-quality.mjs`);
  if (!fs.existsSync(p)) return {};
  const mod = await import(pathToFileURL(p).href + "?v=" + Date.now());
  return mod.FIXES || mod.fixes || {};
}

const stats = { applied: 0, skipped: 0, fails: [] };

for (const [simanStr, items] of Object.entries(dump)) {
  const siman = Number(simanStr);
  if (!items.length) continue;
  const hand = HAND_BY_SIMAN[siman] || {};
  const manual = await loadManualFixes(siman);
  const byFile = new Map();

  for (const it of items) {
    const k = itemKey(it);
    const rel = relPath(it);
  const blockKey = `${it.seif}:${it.marker || "_"}`;
    let en =
      manual[rel]?.[blockKey] ??
      hand[k] ??
      hand[`${k.split("/")[0]}/${it.seif}:main`];
    if (!en) {
      stats.skipped++;
      continue;
    }
    en = autoFix(en, it.marker, "");
    const pf = preflightFail(en);
    if (pf) {
      stats.fails.push(`${siman} ${rel} ${blockKey}: preflight ${pf}`);
      continue;
    }
    if (!byFile.has(rel)) byFile.set(rel, {});
    byFile.get(rel)[blockKey] = en;
    stats.applied++;
  }

  const base = path.join(OC_ROOT, "output", `siman_${String(siman).padStart(3, "0")}`);
  for (const [rel, blockFixes] of byFile) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[key]) return { ...b, en: blockFixes[key] };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  }
}

console.log("applied", stats.applied, "skipped", stats.skipped);
if (stats.fails.length) {
  console.error("FAILURES:\n" + stats.fails.join("\n"));
  process.exit(1);
}
