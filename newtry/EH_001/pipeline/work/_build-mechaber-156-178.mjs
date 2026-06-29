#!/usr/bin/env node
/** Fetch Sefaria English mechaber for EH simanim 156–178 and write _patch-siman-156-178-mechaber.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import { OUT } from "./_patch-siman-utils.mjs";
import { translateCommentaryFull } from "./_patch-siman-156-178-translate-commentary.mjs";
import { stripHtml } from "./_patch-siman-017-translate-engine.mjs";

const SIMANIM = Array.from({ length: 23 }, (_, i) => String(156 + i).padStart(3, "0"));
const OUT_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-156-178-mechaber.mjs");

function plainStrip(html) {
  return String(html ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function formatSefariaEn(raw) {
  if (!raw) return "";
  let t = String(raw);

  // Pull Rema glosses from <small> blocks into {Rama: ...}
  t = t.replace(/<small[^>]*>([\s\S]*?)<\/small>/gi, (_, inner) => {
    const body = plainStrip(inner)
      .replace(/^הגה\s*/i, "")
      .replace(/^Rem"?a:\s*/i, "")
      .replace(/^Rama:\s*/i, "")
      .trim();
    if (!body) return "";
    return `\n\n{Rama: ${body}}`;
  });

  t = t.replace(/<br\s*\/?>/gi, "\n");
  t = t.replace(/<[^>]+>/g, "");
  t = t.replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  t = t.replace(/Rem"?a:\s*/gi, "{Rama: ");
  // Close unclosed Rama braces at paragraph end
  t = t.replace(/\{Rama:\s*([^}]+?)(?=\n\n|$)/g, (m, body) => {
    if (body.trim().endsWith("}")) return m;
    return `{Rama: ${body.trim()}}`;
  });

  t = t
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/\byibbum\b/gi, "yibbum")
    .replace(/\bchalitza\b/gi, "chalitzah")
    .replace(/\bhalitzah\b/gi, "chalitzah")
    .replace(/\byavam\b/gi, "yavam")
    .replace(/\byevamah\b/gi, "yevamah")
    .replace(/\blevirate marriage\b/gi, "yibbum")
    .replace(/\bLord's Prayer\b/gi, "")
    .replace(/\bHashem's Word\b/gi, "")
    .replace(/\bHashem's promise\b/gi, "")
    .replace(/\bHashem's children\b/gi, "Israelites")
    .replace(/\bHashem's people\b/gi, "Israelites")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\s+/g, " ")
    .replace(/\n +/g, "\n")
    .trim();

  if (t && !/[.!?}]$/.test(t)) t += ".";
  return t;
}

function flattenSefaria(text) {
  if (!text) return [];
  if (typeof text === "string") return [text];
  if (!Array.isArray(text)) return [];
  return text.flatMap((x) => flattenSefaria(x));
}

function mechaberFromHebrew(he) {
  const raw = stripHtml(he);
  // Extract Rama gloss from <small>הגה
  let main = raw;
  let rama = "";
  const hagIdx = raw.search(/הגה/i);
  if (hagIdx >= 0) {
    main = raw.slice(0, hagIdx).trim();
    rama = raw.slice(hagIdx).replace(/^הגה\s*/i, "").trim();
  }
  let en = translateCommentaryFull(main, "mechaber");
  if (rama) {
    const rEn = translateCommentaryFull(rama, "mechaber");
    en = `${en}\n\n{Rama: ${rEn.replace(/^\{Rama:\s*/i, "").replace(/\}$/, "")}}`;
  }
  return en;
}

async function fetchSiman(n) {
  const url = `https://www.sefaria.org/api/texts/Shulchan_Arukh,_Even_HaEzer.${n}?context=0`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Sefaria ${n}: ${r.status}`);
  return r.json();
}

function listMechaberBlocks(sim) {
  const dir = path.join(OUT, `siman_${sim}`, "mechaber");
  if (!fs.existsSync(dir)) return [];
  const blocks = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt")).sort()) {
    blocks.push(...parseBlocksInFile(fs.readFileSync(path.join(dir, f), "utf8")));
  }
  return blocks;
}

const MECHABER = {};

for (const sim of SIMANIM) {
  const n = parseInt(sim, 10);
  const blocks = listMechaberBlocks(sim);
  if (!blocks.length) continue;

  const data = await fetchSiman(n);
  const enArr = flattenSefaria(data.text);
  MECHABER[sim] = {};

  for (const b of blocks) {
    const key = `${b.seif}#${b.marker}`;
    const idx = parseInt(b.seif, 10) - 1;
    let en = formatSefariaEn(enArr[idx]);
    if (!en || en.length < 20 || /[\u0590-\u05FF]/.test(en)) {
      en = mechaberFromHebrew(b.he);
    }
    MECHABER[sim][key] = en;
  }
  console.log(`mechaber ${sim}: ${Object.keys(MECHABER[sim]).length} seifim`);
  await new Promise((r) => setTimeout(r, 300));
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

let out = `/** Generated from Sefaria API — simanim 156–178 EH001 FULL REDO mechaber */\nexport const MECHABER = {\n`;
for (const sim of SIMANIM) {
  if (!MECHABER[sim]) continue;
  out += `  "${sim}": {\n`;
  for (const [key, text] of Object.entries(MECHABER[sim])) {
    out += `    "${key}": \`${esc(text)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;

fs.writeFileSync(OUT_FILE, out, "utf8");
console.log(`Wrote ${OUT_FILE}`);
