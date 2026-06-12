#!/usr/bin/env node
/** Apply English from _corpus-error-blocks.json rows (embedded after **** ENGLISH **** in he) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const jsonPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_corpus-error-blocks.json");

if (!fs.existsSync(jsonPath)) {
  console.error("Run _corpus-export-errors.mjs first");
  process.exit(1);
}

const { rows } = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const ENG = "**** ENGLISH ****";

function extractEn(he) {
  const i = he.indexOf(ENG);
  if (i === -1) return null;
  const t = he.slice(i + ENG.length).trim();
  return t || null;
}

const byFile = {};
for (const row of rows) {
  const en = extractEn(row.he);
  if (!en) continue;
  const [rel, seif, marker] = row.key.split("|");
  if (!byFile[rel]) byFile[rel] = {};
  byFile[rel][`${seif}|${marker}`] = en.endsWith("\n") ? en : en + "\n";
}

let total = 0;
for (const [rel, updates] of Object.entries(byFile)) {
  const fp = path.join(OUT, rel);
  let text = fs.readFileSync(fp, "utf8");
  let count = 0;
  for (const [keySuffix, en] of Object.entries(updates)) {
    const [seif, marker] = keySuffix.split("|");
    const re = new RegExp(
      `(\\*\\*\\*\\* YD001 SOURCE BLOCK \\*\\*\\*\\*[\\s\\S]*?seif: ${seif.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\r?\\nmarker: ${marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)[\\s\\S]*?(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
      "m"
    );
    if (!re.test(text)) {
      console.warn("NO MATCH", `${rel}|${keySuffix}`);
      continue;
    }
    text = text.replace(re, `$1${en}$2`);
    count++;
  }
  if (count) {
    fs.writeFileSync(fp, text, "utf8");
    console.log(`OK ${rel} (${count})`);
    total += count;
  }
}

const sim = rows[0]?.siman;
if (sim) {
  const tag = String(sim).padStart(3, "0");
  spawnSync(process.execPath, [path.join(ROOT, "apply_dictionary_yd001.mjs"), "--root", `output/siman_${tag}`], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

console.log(`[DONE] applied ${total} blocks from error export`);
