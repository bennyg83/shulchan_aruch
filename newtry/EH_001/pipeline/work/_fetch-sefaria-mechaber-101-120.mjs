#!/usr/bin/env node
/** Fetch Sefaria Community Translation for EH mechaber simanim 101–120. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MANUAL as HAND101 } from "./_patch-siman-101-120-mechaber-manual.mjs";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-101-120-mechaber-manual.mjs");

function styleFix(t) {
  return String(t ?? "")
    .replace(/\bKetuba\b/gi, "ketubah")
    .replace(/\bKetubah\b/g, "ketubah")
    .replace(/Rem''a/g, "Rama")
    .replace(/\(Rema:/g, "{Rama:")
    .replace(/\(Rama:/g, "{Rama:")
    .replace(/\)\s*$/g, "}")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchSiman(n) {
  const sim = String(n).padStart(3, "0");
  const url = `https://www.sefaria.org/api/texts/Shulchan_Arukh,_Even_HaEzer.${n}?lang=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} siman ${n}`);
  const data = await res.json();
  const texts = data.text;
  if (!Array.isArray(texts)) throw new Error(`No text array siman ${n}`);
  const blocks = {};
  texts.forEach((raw, i) => {
    if (!raw || !String(raw).trim()) return;
    let en = styleFix(raw);
    // Split embedded Rama if present inline
    const ramaMatch = en.match(/\(Rama:\s*([^)]+)\)\s*$/i);
    if (ramaMatch) {
      en = en.slice(0, ramaMatch.index).trim();
      en += `\n\n{Rama: ${styleFix(ramaMatch[1])}}`;
    }
    if (en && !/[.!?}]$/.test(en)) en += ".";
    blocks[`${i + 1}#main`] = en;
  });
  return { sim, blocks };
}

const MANUAL = { ...HAND101 };

for (let n = 102; n <= 120; n++) {
  const { sim, blocks } = await fetchSiman(n);
  MANUAL[sim] = blocks;
  console.log(`siman_${sim}: ${Object.keys(blocks).length} seifim`);
  await new Promise((r) => setTimeout(r, 300));
}

const lines = [
  "/** Hand-translated mechaber — simanim 101–120 EH001 FULL REDO (101 hand; 102–120 Sefaria CT, styled) */",
  "export const MANUAL = {",
];
for (const sim of Object.keys(MANUAL).sort()) {
  lines.push(`  "${sim}": {`);
  for (const [k, v] of Object.entries(MANUAL[sim]).sort()) {
    const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`    "${k}": \`${esc}\`,`);
  }
  lines.push("  },");
}
lines.push("};", "");

fs.writeFileSync(OUT, lines.join("\n"), "utf8");
console.log("Wrote", OUT);
