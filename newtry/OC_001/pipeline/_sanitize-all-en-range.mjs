#!/usr/bin/env node
/** Apply extraPatch sanitizers to every EN block in siman range (fixes pass-detector garbage). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10) || 386;
const to = parseInt(process.argv[3], 10) || 509;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// duplicate extraPatch from _post-mt-patch-range.mjs (keep in sync)
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
    .replace(/\bHashem's\b/gi, "Heaven's")
    .replace(/\bHashem\b/gi, "Heaven")
    .replace(/\bGod's\b/gi, "Heaven's")
    .replace(/\bGod\b/gi, "Heaven")
    .replace(/\bG-d\b/g, "Heaven")
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
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ")
    .replace(/\bcraftsman's\b/gi, "artisan's")
    .replace(/\bcraftsman\b/gi, "artisan")
    .replace(/\bthe craft of\b/gi, "the melacha of");
  t = t
    .replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bassigned to the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "assigned in siman $1")
    .replace(/\bin the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "in siman $1")
    .replace(/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bFrom the Beavers\b/gi, "From the fishponds")
    .replace(/\bfrom the beavers\b/gi, "from the fishponds")
    .replace(/\bthe beavers\b/gi, "the fishponds")
    .replace(/\bbeavers\b/gi, "fishponds")
    .replace(/\bD\.\s*spirits\b/gi, "four directions")
    .replace(/\bthe rest of the crafts\b/gi, "the rest of the melachot")
    .replace(/\bthe cauldron\b/gi, "the pot")
    .replace(/\ba cauldron\b/gi, "a pot")
    .replace(/\bcauldron\b/gi, "pot")
    .replace(/\bbutcher\b/gi, "shochet")
    .replace(/\bbrewer\b/gi, "brewing")
    .replace(/\bRadach\b/gi, "Radak")
    .replace(/\bNichom Lia\b/gi, "Nachalat Tzvi")
    .replace(/\bgrows and goes\b/gi, "comes and goes")
    .replace(/\bthe beast\b/gi, "the animal")
    .replace(/\bovary\b/gi, "revealed");
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
  }
  return t.replace(/\s+/g, " ").trim();
}

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "output");
let changed = 0;

for (let siman = from; siman <= to; siman++) {
  const dir = simanOutputDir(OUT, siman);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      const fp = path.join(d, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      let fileChanged = false;
      const out = blocks.map((b) => {
        const en2 = extraPatch(b.en, b.he);
        if (en2 !== b.en) {
          changed++;
          fileChanged = true;
        }
        return { ...b, en: en2 };
      });
      if (fileChanged) {
        const text = out.map(serializeBlock).join("\n\n");
        fs.writeFileSync(fp, text.endsWith("\n") ? text : text + "\n", "utf8");
      }
    }
  }
}
console.log(`sanitized ${changed} blocks in ${from}-${to}`);
