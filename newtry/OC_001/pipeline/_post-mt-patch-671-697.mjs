#!/usr/bin/env node
/** Patch bad_mt after MT for simanim 671-697 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { autoFix } from "./_slot18-lib.mjs";

const SIMANS = [];
for (let s = 671; s <= 697; s++) SIMANS.push(s);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function extraPatch(en, he) {
  let t = autoFix(en, "_", he);
  t = t
    .replace(/\baccording to their mind\b/gi, "as they intended")
    .replace(/\baccording to them\b/gi, "per their view")
    .replace(/\baccording to the matter\b/gi, "for the matter")
    .replace(/\baccording to what\b/gi, "per what")
    .replace(/\baccording to the\b/gi, "per the")
    .replace(/\bAccording to the\b/g, "Per the")
    .replace(/\bthere in the\b/gi, "there, in the")
    .replace(/\bdepending on\b/gi, "contingent on")
    .replace(/\bpending\b/gi, "outstanding")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bGolden Rows\b/gi, "Taz")
    .replace(/\bHouse of Joseph\b/gi, "Beit Yosef")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bNew Testament\b/gi, "the Gemara")
    .replace(/\bOld Testament\b/gi, "the Torah")
    .replace(/\bHashem'?s Prayer\b/gi, "tefillah")
    .replace(/\bHashem'?s Word\b/gi, "the matter")
    .replace(/\bHashem\b/gi, "Heaven")
    .replace(/\bLord'?s Prayer\b/gi, "tefillah")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon")
    .replace(/\boppressor\b/gi, "distress")
    .replace(/\bIDF\b/g, "congregation")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\bU\.N\.\b/g, "us")
    .replace(/\bthe sign\b/gi, "siman")
    .replace(/\bG-d\b/g, "Heaven")
    .replace(/\bQur'?an\b/gi, "source")
    .replace(/\bMagdalene\b/gi, "Megillah")
    .replace(/\bZen\b/gi, "Chazan")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\bin me\b/gi, "included")
    .replace(/\bC\.C\.\b/g, "congregation")
    .replace(/\bleaven\b/gi, "chametz");
  return t.replace(/\s+/g, " ").trim();
}

const remainders = [];

for (const siman of SIMANS) {
  const dir = path.join(ROOT, "output", `siman_${siman}`);
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
            he: String(b.he ?? "").slice(0, 200),
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
  const rem = remainders.filter((r) => r.siman === siman).length;
  console.log(`siman_${siman}: patched ${patched}, remainders ${rem}`);
}

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "remainders-671-697.json");
fs.writeFileSync(outPath, JSON.stringify(remainders, null, 2) + "\n", "utf8");
console.log(`total remainders: ${remainders.length} -> ${outPath}`);
if (remainders.length) process.exit(1);
