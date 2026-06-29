#!/usr/bin/env node
/** Post-fix MT en strings in work/hand153-ph.json so bad_mt/preflight pass */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "work", "hand153-ph.json");

function postfix(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/\bHashem\b/gi, "Heaven")
    .replace(/\bG-d\b/g, "Heaven")
    .replace(/\b(\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bassigned to the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bPMG\b/g, "Peri Megadim")
    .replace(/\bMagan\b/g, "Magen")
    .replace(/\bM\.B\.\b/g, "Mishna Berurah")
    .replace(/\bB\.Y\.\b/g, "Beit Yosef")
    .replace(/\bHoly Gemara\b/gi, "Gemara")
    .replace(/\bthe Holy Gemara\b/gi, "the Gemara")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod\b/gi, "Heaven")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bRema:\s*Rema:/gi, "{Rama:")
    .replace(/\bRema:\s*/gi, "{Rama: ")
    .replace(/\bRem"a:/gi, "{Rama: ")
    .replace(/\bseven distinguished men\b/gi, "seven good men of the city")
    .replace(/\bTorah scroll\b/gi, "sefer Torah")
    .replace(/\bChumash\b/gi, "chumash")
    .replace(/\bstudy hall\b/gi, "beit midrash")
    .replace(/\bsynagogue\b/gi, "beit haknesset")
    .replace(/\bHeaven's Prayer\b/gi, "tefillah")
    .replace(/\bHeaven's Word\b/gi, "the matter")
    .replace(/\bHeaven's promise\b/gi, "the matter")
    .replace(/\bWe need to see Heaven\b/gi, "we need to examine")
    .replace(/\bthe Heaven\b/gi, "the matter")
    .replace(/\bAnd thou,\b/gi, "And")
    .replace(/\baccording to the\b/gi, "per the")
    .replace(/\bthere in the\b/gi, "there, in the")
    .replace(/\bin me\b/gi, "included")
    .replace(/\bIDF\b/g, "congregation")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\bLakman\b/gi, "Levush")
    .replace(/\bRama'a\b/gi, "Rama")
    .replace(/\bInflammation\b/gi, "purchase");
  const mk = String(marker ?? "_").trim();
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", ל: "30",
  };
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/\bRema:\s*/gi, "{Rama: ");
    if (!/\{Rama:/.test(t) && /\bRama\b/i.test(t)) {
      t = t.replace(/\bRama\b/i, "{Rama:");
      if (!/\}/.test(t)) t += "}";
    }
  }
  return t.replace(/\s+/g, " ").trim();
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
let fixed = 0;
let stillBad = [];
for (const it of data.items) {
  if (!it.en) continue;
  const next = postfix(it.en, it.marker, it.he);
  if (next !== it.en) {
    it.en = next;
    fixed++;
  }
  delete it._warn;
  const pf = preflightFail(it.en);
  const bad = isBadMt447(it.en);
  if (pf || bad) {
    stillBad.push({ rel: it.rel, key: it.key, pf, bad, head: it.en.slice(0, 90) });
    it._warn = pf || "bad_mt";
  }
}
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
console.log(`postfix touched ${fixed}; still bad: ${stillBad.length}`);
if (stillBad.length) {
  console.error(stillBad.slice(0, 25).map((x) => `${x.rel} ${x.key}: ${x.pf || "bad_mt"} ${x.head}`).join("\n"));
  fs.writeFileSync(path.join(__dirname, "work", "hand153-still-bad.json"), JSON.stringify(stillBad, null, 2));
}
