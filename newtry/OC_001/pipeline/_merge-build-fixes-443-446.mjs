#!/usr/bin/env node
/** Merge risky hand + cite + cleaned legacy en → _fixes-siman443/446.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite443 } from "./lib/translate-cite-443.mjs";
import { translateCite446 } from "./lib/translate-cite-446.mjs";
import { RISKY443 } from "./_hand-risky-443.mjs";
import { RISKY446 } from "./_hand-risky-446.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PREFLIGHT = [
  /Lord'?s Prayer/i,
  /Hashem'?s Word/i,
  /\bHashem\b/i,
  /strike in/i,
  /Capernaum/i,
  /&quot;/,
  /\bthere in the\b/i,
  /According to the/i,
  /\bin me\b/i,
  /Darbanan/i,
  /hand recoils/i,
  /first dish/i,
  /allocated/i,
  /Shield of Abraham/i,
  /Saturday/i,
  /\bgentiles\b/i,
  /proscri/i,
];

function cleanEn(s) {
  return s
    .replace(/\bgentiles\b/gi, "non-Jews")
    .replace(/\bGentiles\b/g, "Non-Jews")
    .replace(/proscribed/gi, "forbade")
    .replace(/proscription/gi, "prohibition")
    .replace(/permissable/gi, "permitted")
    .replace(/Status of/g, "The law of")
    .replace(/Contain /g, "Contains ")
    .replace(/collateral --/g, "as a pledge —")
    .replace(/&quot;/g, '"')
    .replace(/intermediate days of the festival/g, "chol hamoed")
    .replace(/festival day/g, "yom tov")
    .replace(/festival \[of Passover\]/g, "Pesach")
    .replace(/\baccording to the nature of the day\b/gi, "per the length of the day")
    .replace(/\bthere in the\b/gi, "in the");
}

function pickEn(n, slug, key, he, legacy) {
  const hk = `${slug}/${key}`;
  const risky = n === 443 ? RISKY443 : RISKY446;
  if (risky[hk]) return risky[hk];
  if (slug === "beer-hagolah") {
    return n === 443 ? translateCite443(he) : translateCite446(he);
  }
  let en = legacy || "";
  if (PREFLIGHT.some((r) => r.test(en))) {
    throw new Error(`Missing risky translation ${hk}`);
  }
  return cleanEn(en);
}

function buildSiman(n, riskyMap) {
  const SIMAN = path.join(ROOT, `output/siman_${n}`);
  const fixes = {};
  let total = 0;
  const missing = [];
  for (const slug of fs.readdirSync(SIMAN).sort()) {
    const rel = `output/siman_${n}/${slug}/part-001.txt`;
    const abs = path.join(ROOT, rel.replace(/\//g, path.sep));
    if (!fs.existsSync(abs)) continue;
    fixes[rel] = {};
    for (const b of parseBlocksInFile(fs.readFileSync(abs, "utf8"))) {
      const k = `${b.seif}:${b.marker || "_"}`;
      const hk = `${slug}/${k}`;
      try {
        const en = pickEn(n, slug, k, b.he, b.en);
        fixes[rel][k] = en;
        total++;
      } catch (e) {
        missing.push(hk);
      }
    }
  }
  const out = path.join(__dirname, `_fixes-siman${n}.mjs`);
  fs.writeFileSync(
    out,
    `/** Auto-generated — siman ${n} — slot 3 */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  console.log(`siman ${n}: wrote ${out}, keys ${total}, missing ${missing.length}`);
  if (missing.length) console.log(missing.join("\n"));
}

buildSiman(443, RISKY443);
buildSiman(446, RISKY446);
