#!/usr/bin/env node
/** Patch common bad_mt patterns after MT for siman range */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10) || 641;
const to = parseInt(process.argv[3], 10) || 670;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");

function extraPatch(en, he = "") {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\baccording to their\b/gi, "per their")
    .replace(/\bAccording to their\b/g, "Per their")
    .replace(/\baccording to the\b/gi, "per the")
    .replace(/\bAccording to the\b/g, "Per the")
    .replace(/\bthere in the\b/gi, "stated in the")
    .replace(/\bin me\b/gi, "included")
    .replace(/\bpending\b/gi, "outstanding")
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bHashem's Word\b/gi, "the matter")
    .replace(/\bHashem's promise\b/gi, "its")
    .replace(/\bHashem's\b/gi, "the Omnipresent's")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bGod's\b/gi, "the Omnipresent's")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bG-d\b/g, "the Omnipresent")
    .replace(/\bHeaven's Prayer\b/gi, "tefillah")
    .replace(/\bHeaven's Word\b/gi, "the matter")
    .replace(/\bHeaven's promise\b/gi, "its")
    .replace(/\bHeaven's people\b/gi, "the people")
    .replace(/\bHeaven gave\b/gi, "it was given")
    .replace(/\bthe Heaven\b/gi, "there")
    .replace(/\bWe need to see Heaven\b/gi, "we need to see")
    .replace(/\bwith Heaven\b/gi, "there")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bBible says\b/gi, "the Gemara says")
    .replace(/\bBible\b/gi, "Gemara")
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
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon")
    .replace(/\bIDF\b/g, "congregation")
    .replace(/\boppressor\b/gi, "distress")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\bUN except\b/gi, "unless")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bwith Heaven\b/gi, "there")
    .replace(/\bHoly Qur'?an\b/gi, "the source")
    .replace(/\bQur'?an\b/gi, "the source")
    .replace(/\bJehovah\b/gi, "the Name")
    .replace(/\bthrust down to hell\b/gi, "cast down")
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ");
  t = t
    .replace(/\bcraftsman's\b/gi, "artisan's")
    .replace(/\bcraftsman\b/gi, "artisan")
    .replace(/\bthe craft of\b/gi, "the melacha of")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\ball crafts\b/gi, "all melacha")
    .replace(/\bFor all crafts\b/gi, "For all melacha")
    .replace(/\bDurbanan\b/gi, "d'rabbanan")
    .replace(/\bDurban\b/gi, "d'rabbanan")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bPMG\b/g, "Peri Megadim")
    .replace(/\bKNH'G\b/g, "Knesset HaGedolah")
    .replace(/\bCHA\b/g, "Chayei Adam")
    .replace(/\bSach\b/g, "Shach")
    .replace(/\bRadach\b/g, "Radbaz")
    .replace(/\bLakman\b/gi, "l'fi da'at")
    .replace(/\bRama'a\b/gi, "Rama")
    .replace(/\bDauriyta\b/gi, "d'oraisa")
    .replace(/\bDaurai'\b/gi, "d'oraisa")
    .replace(/\bA\.C\.\b/g, "congregation")
    .replace(/\bC\.C\.\b/g, "congregation")
    .replace(/\bN\.C\.\b/g, "congregation")
    .replace(/\bS\.C\.\b/g, "congregation")
    .replace(/\bD\.C\.\b/g, "congregation")
    .replace(/\bBHC MA\b/gi, "Bach and Magen Avraham")
    .replace(/\bthe beast\b/gi, "the animal")
    .replace(/\bovary\b/gi, "womb")
    .replace(/\bgrows and goes\b/gi, "continues");
  // סי׳ mistranslated as century (only when paired with siman/sign context)
  t = t.replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1");
  t = t.replace(/\bassigned to the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "assigned in siman $1");
  t = t.replace(/\bin the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "in siman $1");
  t = t.replace(/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1");
  t = t
    .replace(/\bFrom the Beavers\b/gi, "From the fishponds")
    .replace(/\bfrom the beavers\b/gi, "from the fishponds")
    .replace(/\bthe beavers\b/gi, "the fishponds")
    .replace(/\bbeavers\b/gi, "fishponds")
    .replace(/\bD\.\s*spirits\b/gi, "four directions")
    .replace(/\bthe rest of the crafts\b/gi, "the rest of the melachot")
    .replace(/\bfor harvesting and grinding\b/gi, "for harvesting and grinding")
    .replace(/\bthe cauldron\b/gi, "the pot")
    .replace(/\ba cauldron\b/gi, "a pot")
    .replace(/\bcauldron\b/gi, "pot")
    .replace(/\bbutcher\b/gi, "shochet")
    .replace(/\bbrewer\b/gi, "brewing")
    .replace(/\bRadach\b/gi, "Radak")
    .replace(/\bNichom Lia\b/gi, "Nachalat Tzvi")
    .replace(/\bgrows and goes\b/gi, "comes and goes")
    .replace(/\bthe beast\b/gi, "the animal")
    .replace(/\bovary\b/gi, "revealed")
    .replace(/\bTur — source\.?/gi, "Tur")
    .replace(/\bthe FIFA\b/gi, "the Pisha")
    .replace(/\bHeaven's Prayer\b/gi, "tefillah")
    .replace(/\bHeaven's Word\b/gi, "the matter")
    .replace(/\bHeaven's promise\b/gi, "the matter")
    .replace(/\bHeaven's people\b/gi, "Israel")
    .replace(/\bHeaven's sake\b/gi, "the matter")
    .replace(/\bthe Heaven\b/gi, "there")
    .replace(/\bHoly Spirit\b/gi, "the spirit")
    .replace(/\bthe Master\b/gi, "the Omnipresent");
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
  }
  return t.replace(/\s+/g, " ").trim();
}

const remainders = [];
let totalPatched = 0;

for (let siman = from; siman <= to; siman++) {
  const dir = simanOutputDir(OUT, siman);
  if (!fs.existsSync(dir)) continue;
  let patched = 0;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      const fp = path.join(d, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      let changed = false;
      const out = blocks.map((b) => {
        if (!isBadMt447(b.en)) return b;
        const en2 = extraPatch(b.en, b.he);
        if (en2 !== b.en) {
          patched++;
          changed = true;
        }
        if (isBadMt447(en2)) {
          remainders.push({
            siman,
            rel: `${slug}/${f}`,
            key: `${b.seif}:${b.marker || "_"}`,
            en: en2.slice(0, 120),
          });
        }
        return { ...b, en: en2 };
      });
      if (changed) {
        const text = out.map(serializeBlock).join("\n\n");
        fs.writeFileSync(fp, text.endsWith("\n") ? text : text + "\n", "utf8");
      }
    }
  }
  totalPatched += patched;
  const rem = remainders.filter((r) => r.siman === siman).length;
  console.log(`siman_${siman}: patched ${patched}, remainders ${rem}`);
}

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), `remainders-${from}-${to}.json`);
fs.writeFileSync(outPath, JSON.stringify(remainders, null, 2) + "\n", "utf8");
console.log(`total patched ${totalPatched}, still bad ${remainders.length} → ${outPath}`);
process.exit(remainders.length ? 1 : 0);
