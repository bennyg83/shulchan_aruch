#!/usr/bin/env node
/** Fix raw HTML entities in English sections across output/ */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const ENG = "**** ENGLISH ****";
const END = "**** END BLOCK ****";

const REPLACEMENTS = [
  [/&quot;/g, '"'],
  [/&amp;lt;/g, "<"],
  [/&amp;gt;/g, ">"],
  [/&amp;amp;/g, "&"],
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&nbsp;/g, " "],
];

let files = 0;
let blocks = 0;

function fixEnglish(text) {
  const parts = text.split("**** YD001 SOURCE BLOCK ****");
  let changed = false;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) return "**** YD001 SOURCE BLOCK ****" + block;
    const before = block.slice(0, enStart + ENG.length + 1);
    let en = block.slice(enStart + ENG.length + 1, enEnd);
    const after = block.slice(enEnd);
    let fixed = en;
    for (const [re, rep] of REPLACEMENTS) {
      fixed = fixed.replace(re, rep);
    }
    if (fixed !== en) {
      changed = true;
      blocks++;
    }
    return "**** YD001 SOURCE BLOCK ****" + before + fixed + after;
  });
  return changed ? out.join("") : text;
}

for (const sim of fs.readdirSync(OUT).filter((d) => /^siman_\d+$/.test(d))) {
  const simDir = path.join(OUT, sim);
  for (const slug of fs.readdirSync(simDir)) {
    const slugDir = path.join(simDir, slug);
    if (!fs.statSync(slugDir).isDirectory()) continue;
    for (const f of fs.readdirSync(slugDir).filter((x) => x.endsWith(".txt"))) {
      const fp = path.join(slugDir, f);
      const raw = fs.readFileSync(fp, "utf8");
      const next = fixEnglish(raw);
      if (next !== raw) {
        fs.writeFileSync(fp, next, "utf8");
        files++;
      }
    }
  }
}

console.log(`[DONE] html entity fix — ${blocks} blocks in ${files} files`);
