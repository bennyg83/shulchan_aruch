#!/usr/bin/env node
/** EH001 FULL REDO simanim 091–100 — all commentaries, all blocks. */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import { patchFile, ROOT, OUT } from "./_patch-siman-utils.mjs";
import { translateCommentaryFull } from "./_patch-siman-091-100-translate-commentary.mjs";
import { MECHABER as MECHABER_091_095 } from "./_patch-siman-091-095-mechaber.mjs";
import { MECHABER as MECHABER_096_100 } from "./_patch-siman-096-100-mechaber.mjs";
const MECHABER = { ...MECHABER_091_095, ...MECHABER_096_100 };
import { PITCHEI_TESHUVA } from "./_patch-siman-091-100-pitchei-teshuva.mjs";
const SIMANIM = ["091", "092", "093", "094", "095", "096", "097", "098", "099", "100"];

const COMMENTARY_ORDER = [
  "mechaber", "beit-shmuel", "turei-zahav", "baer-hetev", "beer-hagolah",
  "beur-hagra", "pitchei-teshuva", "rabbi-akiva-eiger", "ezer-mikodesh",
  "beit-meir", "chokhmat-shlomo",
];

function listTxtFiles(sim) {
  const dir = path.join(OUT, `siman_${sim}`);
  const files = [];
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".txt")) files.push(p);
    }
  }
  walk(dir);
  return files.sort((a, b) => {
    const sa = a.split(path.sep).slice(-2, -1)[0];
    const sb = b.split(path.sep).slice(-2, -1)[0];
    const ia = COMMENTARY_ORDER.indexOf(sa);
    const ib = COMMENTARY_ORDER.indexOf(sb);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
}

function translateBlock(block, sim) {
  const key = `${block.seif}#${block.marker}`;
  if (block.slug === "mechaber") {
    const t = MECHABER[sim]?.[key];
    if (!t) throw new Error(`Missing mechaber ${sim} ${key}`);
    return t;
  }
  if (block.slug === "pitchei-teshuva") {
    const t = PITCHEI_TESHUVA[sim]?.[key];
    if (!t) throw new Error(`Missing pitchei-teshuva ${sim} ${key}`);
    return t;
  }
  let en = translateCommentaryFull(block.he, block.slug);
  const mk = String(block.marker ?? "_").trim();
  if (/^[א-ת]$/.test(mk) && !en.startsWith(`(${mk})`)) {
    en = `(${mk}) ${en}`;
  }
  return en;
}

let totalBlocks = 0;
const perSiman = {};

for (const sim of SIMANIM) {
  const byFile = new Map();
  let count = 0;

  for (const fp of listTxtFiles(sim)) {
    const rel = path.relative(OUT, fp).replace(/\\/g, "/");
    const slug = rel.split("/")[1];
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const T = {};

    for (const b of blocks) {
      const key = `${b.seif}#${b.marker}`;
      T[key] = translateBlock(b, sim);
      count++;
    }

    byFile.set(rel, { slug, T });
  }

  for (const [rel, { slug, T }] of byFile) {
    patchFile(rel, slug, T);
  }

  perSiman[sim] = count;
  totalBlocks += count;
  console.log(`siman_${sim}: ${count} blocks patched`);
}

console.log(`\nTOTAL: ${totalBlocks} blocks`);

for (const sim of SIMANIM) {
  const n = parseInt(sim, 10);
  console.log(`\n--- validate siman_${sim} ---`);
  try {
    execSync(
      `node pipeline/validate-quality-eh001.mjs --root "${OUT}" --siman ${n} --fail-on error`,
      { cwd: ROOT, stdio: "inherit" }
    );
  } catch {
    console.error(`VALIDATION FAILED siman_${sim}`);
    process.exit(1);
  }
}

for (const pat of ["Lord's Prayer", "Hashem's Word"]) {
  let hits = 0;
  for (const sim of SIMANIM) {
    const dir = path.join(OUT, `siman_${sim}`);
    function walk(d) {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith(".txt")) {
          const s = fs.readFileSync(p, "utf8");
          if (s.includes(pat)) {
            hits++;
            console.error(`GARBAGE HIT ${pat} in ${path.relative(OUT, p)}`);
          }
        }
      }
    }
    walk(dir);
  }
  console.log(`grep "${pat}": ${hits}`);
  if (hits > 0) process.exit(1);
}

const ts = new Date().toISOString();
const logPath = path.join(ROOT, "progress.log");
for (const sim of SIMANIM) {
  const line = `siman_${sim} FULL REDO COMPLETE (${perSiman[sim]} blocks) — quality-gate error: 0; Lord's Prayer/Hashem's Word: 0 ${ts}\n`;
  fs.appendFileSync(logPath, line, "utf8");
}

console.log("\n[COMPLETE] Session done — simanim: 091–100");
console.log("BLOCKS PER SIMAN:", JSON.stringify(perSiman));
