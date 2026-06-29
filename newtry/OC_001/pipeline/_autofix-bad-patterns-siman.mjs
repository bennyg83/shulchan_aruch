#!/usr/bin/env node
/** Quick pattern fixes for bad_mt447 on listed simanim. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const simans = process.argv.slice(2).map(Number).filter(Boolean);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function fixEn(en) {
  let t = String(en ?? "");
  t = t
    .replace(/\bAccording to the\b/g, "Per the")
    .replace(/\baccording to the\b/g, "per the")
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord our God\b/gi, "the Omnipresent our God")
    .replace(/\bLord\b/g, "the Omnipresent")
    .replace(/\bG-d\b/g, "the Omnipresent")
    .replace(/\bHashem\b/g, "the Omnipresent")
    .replace(/\bLakman\b/gi, "Lekhem")
    .replace(/\bLekhem\b/g, "Lechem") // if doubled
    .replace(/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bin the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "in siman $1")
    .replace(/\b(\d{1,2})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bthere in the\b/gi, "stated in the")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bSachav\b/gi, "Shach")
    .replace(/\bSacha\b/gi, "salt")
    .replace(/\bSach\b/g, "Shach")
    .replace(/\bHoly Spirit\b/gi, "the spirit")
    .replace(/\bCha\b/g, "Chayei Adam")
    .replace(/\bCHA\b/g, "Chayei Adam")
    .replace(/\bRama'a\b/gi, "Rama")
    .replace(/\bPMG\b/g, "Peri Megadim")
    .replace(/\bKNH'G\b/g, "Kaf HaChayim")
    .replace(/\bCHA\b/g, "Chayei Adam")
    .replace(/\bthe FIFA\b/gi, "the nefesh")
    .replace(/\bDauriyta\b/gi, "d'oraisa")
    .replace(/\bDaurai'\b/gi, "d'oraisa")
    .replace(/\bHashemite\b/gi, "the public")
    .replace(/\bthe cauldron\b/gi, "the pot")
    .replace(/\bcauldron\b/gi, "pot")
    .replace(/\bbutcher\b/gi, "shochet")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bTur — source\.?/gi, "Tur")
    .replace(/\bHeaven's Prayer\b/gi, "tefillah")
    .replace(/\bHeaven's Word\b/gi, "the matter")
    .replace(/\bHeaven's promise\b/gi, "the matter")
    .replace(/\bHeaven's people\b/gi, "Israel")
    .replace(/\bHeaven's sake\b/gi, "the matter")
    .replace(/\bthe Heaven\b/gi, "the matter")
    .replace(/\bHeaven\b/gi, "the matter")
    .replace(/\bHoly Spirit\b/gi, "the spirit")
    .replace(/\bArab prayer\b/gi, "tefillah")
    .replace(/\bThere is no evidence\b/gi, "there is no proof")
    .replace(/\bdrone\b/gi, "leader")
    .replace(/\bsnail\b/gi, "wick")
    .replace(/\bNKJV\b/gi, "translation")
    .replace(/\bset-aside\b/gi, "muktzeh")
    .replace(/\bHashaba\b/gi, "Hashavat")
    .replace(/\bAyot\b/gi, "Iyot")
    .replace(/\bthe Omnipresent in our time\b/gi, "the matter in our time")
    .replace(/\bHoly sand\b/gi, "holy day")
    .replace(/\bChristian name\b/gi, "common name")
    .replace(/\bmassacre\b/gi, "loss")
    .replace(/\bUOT\b/g, "us")
    .replace(/\bbracks\b/gi, "racks")
    .replace(/\blizards\b/gi, "fringes")
    .replace(/\bpotty woman\b/gi, "important woman")
    .replace(/\bbaptize a new vessel\b/gi, "to immerse a new vessel")
    .replace(/\bbricklaying\b/gi, "building")
    .replace(/\bthe sun to announce\b/gi, "the sun to shine")
    .replace(/\bmenacing about the rains\b/gi, "concern about the rains")
    .replace(/\bGemara \(but\b/gi, "Gemara, but")
    .replace(/\bDidan is allowed\b/gi, "this is allowed")
    .replace(/\bDbgm\b/gi, "Degel")
    .replace(/\bSab Abel\b/gi, "R' Avraham")
    .replace(/\bMamela\b/gi, "Melech")
    .replace(/\bM\. A\. Sec\b/gi, "Magen Avraham s.k.")
    .replace(/\bC\. E\. Dershi\b/gi, "C. E. Derishah");
  return t.replace(/\s+/g, " ").trim();
}

let fixed = 0;
for (const siman of simans) {
  const dir = simanOutputDir(path.join(ROOT, "output"), siman);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      const fp = path.join(d, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      let ch = false;
      const out = blocks.map((b) => {
        if (!isBadMt447(b.en)) return b;
        const en2 = fixEn(b.en);
        if (!isBadMt447(en2)) {
          fixed++;
          ch = true;
          return { ...b, en: en2 };
        }
        return b;
      });
      if (ch) fs.writeFileSync(fp, out.map(serializeBlock).join("\n\n") + "\n", "utf8");
    }
  }
}
console.log("autofixed blocks:", fixed);
