#!/usr/bin/env node
/** Second-pass sanitize on all EN in a siman (fixes hashemashot substring etc.). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const simans = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "output");

function sanitize(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/hashemashot/gi, "hashmashot")
    .replace(/bein hashemashot/gi, "bein hashmashot")
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord our God\b/gi, "the Omnipresent")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod's\b/gi, "the Omnipresent's")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bHashem's\b/gi, "the Omnipresent's")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bG-d\b/g, "the Omnipresent")
    .replace(/\bHoly Qur'?an\b/gi, "the source")
    .replace(/\bQur'?an\b/gi, "the source")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bBible says\b/gi, "the Gemara says")
    .replace(/\bBible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\bHametz\b/gi, "chametz")
    .replace(/\bChametz\b/gi, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bYom tov\b/gi, "Yom Tov")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bGolden Rows\b/gi, "Taz")
    .replace(/\bHouse of Joseph\b/gi, "Beit Yosef")
    .replace(/\bAccording to the\b/gi, "per the")
    .replace(/\baccording to the\b/gi, "per the")
    .replace(/\bthere in the\b/gi, "there, in the")
    .replace(/\bin me\b/gi, "included")
    .replace(/\bIDF\b/g, "Israel Defense Forces")
    .replace(/\boppressor\b/gi, "distress")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\bUN except\b/gi, "unless")
    .replace(/\bthrust down to hell\b/gi, "cast down")
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ")
    .replace(/\bMaimonides\b/gi, "Rambam")
    .replace(/\bNachmanides\b/gi, "Ramban");
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
  }
  return t.replace(/\s+/g, " ").trim();
}

for (const siman of simans) {
  const dir = path.join(ROOT, `siman_${siman}`);
  let n = 0,
    badBefore = 0,
    badAfter = 0;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      const fp = path.join(d, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      const out = blocks
        .map((b) => {
          if (isBadMt447(b.en)) badBefore++;
          const en = sanitize(b.en, b.marker, b.he);
          if (isBadMt447(en)) badAfter++;
          if (en !== b.en) n++;
          return { ...b, en };
        })
        .map(serializeBlock)
        .join("\n\n");
      fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    }
  }
  console.log(`siman_${siman}: sanitized ${n} blocks, bad ${badBefore} -> ${badAfter}`);
}
