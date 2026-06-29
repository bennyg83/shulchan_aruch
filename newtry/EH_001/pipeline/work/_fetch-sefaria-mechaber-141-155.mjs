#!/usr/bin/env node
/** Fetch Sefaria English mechaber for simanim 141–155 and write mechaber patch files. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const work = path.dirname(fileURLToPath(import.meta.url));
const he = JSON.parse(fs.readFileSync(path.join(work, "_mechaber-141-155-he.json"), "utf8"));

function stripHtml(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function postProcess(en) {
  return en
    .replace(/\binvoices?\b/gi, (m) => (m[0] === "I" ? "Gets" : "get"))
    .replace(/\bmessengers?\b/gi, (m) => (m[0] === "M" ? "Agents" : "agent"))
    .replace(/\bTHIS IS THE RULING FOR SENDING MESSENGERS\.?/gi, "Likewise for delivery agency.")
    .replace(/\bGloss:\s*/gi, "\n\n{Rama: ")
    .replace(/\bRama:\s*/gi, "\n\n{Rama: ")
    .replace(/\n\n\{Rama: ([^}]+)(?<!\})\s*$/g, "\n\n{Rama: $1}");
}

function formatSeif(enArr, seifIdx) {
  const raw = enArr[seifIdx];
  if (!raw) return null;
  let t;
  if (typeof raw === "string") {
    t = stripHtml(raw);
  } else if (Array.isArray(raw)) {
    const parts = raw.map((p) => stripHtml(p)).filter(Boolean);
    t = parts[0] ?? "";
    const rama = parts.slice(1).join(" ");
    if (rama) t += `\n\n{Rama: ${rama}}`;
  } else return null;
  t = postProcess(t);
  if (t.includes("{Rama: ") && !t.trimEnd().endsWith("}")) t += "}";
  return t.trim();
}

async function fetchSiman(n) {
  const url = `https://www.sefaria.org/api/texts/Shulchan_Arukh,_Even_HaEzer.${n}?lang=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} siman ${n}`);
  const data = await res.json();
  return data.text;
}

const MECHABER = {};
const SIMANIM = Array.from({ length: 15 }, (_, i) => String(141 + i).padStart(3, "0"));

for (const sim of SIMANIM) {
  const n = parseInt(sim, 10);
  console.log(`Fetching siman ${n}...`);
  const text = await fetchSiman(n);
  const seifim = Array.isArray(text) ? text : [text];
  MECHABER[sim] = {};
  const keys = Object.keys(he[sim] || {}).sort((a, b) => {
    const sa = parseInt(a.split("#")[0], 10);
    const sb = parseInt(b.split("#")[0], 10);
    return sa - sb;
  });
  for (const key of keys) {
    const seif = parseInt(key.split("#")[0], 10);
    const en = formatSeif(seifim, seif - 1);
    if (!en || en.length < 20) {
      console.warn(`  WARN ${sim} ${key}: missing/short Sefaria EN`);
      MECHABER[sim][key] = null;
    } else {
      MECHABER[sim][key] = en.endsWith(".") || en.endsWith("}") ? en : en + ".";
    }
  }
  await new Promise((r) => setTimeout(r, 300));
}

// Fill gaps from engine
import { translateMechaberHtml } from "./_patch-siman-141-155-mechaber-engine.mjs";

for (const sim of SIMANIM) {
  for (const [key, h] of Object.entries(he[sim] || {})) {
    if (!MECHABER[sim][key]) {
      try {
        MECHABER[sim][key] = translateMechaberHtml(h);
      } catch {
        MECHABER[sim][key] = "See Hebrew source.";
      }
    }
  }
}

const MANUAL_OVERRIDES = {
  "141": {
    "9#main": `What requires two witnesses for reception — specifically when the agent is not valid; but if he is valid he joins with one witness. Some infer from his words that he disputes this.

{Rama: Likewise for delivery agency.}`,
  },
};

for (const sim of SIMANIM) {
  for (const [key, val] of Object.entries(MANUAL_OVERRIDES[sim] || {})) {
    if (MECHABER[sim]) MECHABER[sim][key] = val;
  }
}

function writeChunk(sims, outName) {
  const lines = [`/** Mechaber — simanim ${sims[0]}–${sims[sims.length - 1]} EH001 FULL REDO (Sefaria EN + engine) */`, "export const MECHABER = {"];
  for (const sim of sims) {
    lines.push(`  "${sim}": {`);
    for (const [k, v] of Object.entries(MECHABER[sim] || {}).sort()) {
      const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
      lines.push(`    "${k}": \`${esc}\`,`);
    }
    lines.push("  },");
  }
  lines.push("};", "");
  fs.writeFileSync(path.join(work, outName), lines.join("\n"), "utf8");
  console.log(`${outName}: ${sims.reduce((n, s) => n + Object.keys(MECHABER[s]).length, 0)} blocks`);
}

writeChunk(["141"], "_patch-siman-141-mechaber.mjs");
writeChunk(["142", "143", "144", "145"], "_patch-siman-142-145-mechaber.mjs");
writeChunk(["146", "147", "148", "149", "150"], "_patch-siman-146-150-mechaber.mjs");
writeChunk(["151", "152", "153", "154", "155"], "_patch-siman-151-155-mechaber.mjs");
