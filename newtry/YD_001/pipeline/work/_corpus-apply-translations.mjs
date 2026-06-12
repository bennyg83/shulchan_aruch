#!/usr/bin/env node
/** Apply translations from _corpus-translations.mjs (same key format as slot3) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { BLOCKS } from "./_corpus-translations.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");

function patchFile(relPath, updates) {
  const fp = path.join(OUT, relPath);
  if (!fs.existsSync(fp)) {
    console.warn("SKIP missing", relPath);
    return 0;
  }
  let text = fs.readFileSync(fp, "utf8");
  let count = 0;
  for (const [keySuffix, en] of Object.entries(updates)) {
    const [seif, marker] = keySuffix.split("|");
    const re = new RegExp(
      `(\\*\\*\\*\\* YD001 SOURCE BLOCK \\*\\*\\*\\*[\\s\\S]*?seif: ${seif.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\r?\\nmarker: ${marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)[\\s\\S]*?(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
      "m"
    );
    if (!re.test(text)) {
      console.warn("NO MATCH", `${relPath}|${keySuffix}`);
      continue;
    }
    const body = en.endsWith("\n") ? en : en + "\n";
    text = text.replace(re, `$1${body}$2`);
    count++;
  }
  fs.writeFileSync(fp, text, "utf8");
  console.log(`OK ${relPath} (${count})`);
  return count;
}

const byFile = {};
for (const [key, en] of Object.entries(BLOCKS)) {
  const [rel, seif, marker] = key.split("|");
  const suffix = `${seif}|${marker}`;
  if (!byFile[rel]) byFile[rel] = {};
  byFile[rel][suffix] = en;
}

let total = 0;
const simanim = new Set();
for (const [rel, T] of Object.entries(byFile)) {
  total += patchFile(rel, T);
  const m = rel.match(/siman_(\d+)/);
  if (m) simanim.add(m[1]);
}

for (const sim of [...simanim].sort()) {
  const tag = sim.padStart(3, "0");
  spawnSync(process.execPath, [path.join(ROOT, "apply_dictionary_yd001.mjs"), "--root", `output/siman_${tag}`], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

console.log(`\n[DONE] corpus translations — ${total} blocks`);
