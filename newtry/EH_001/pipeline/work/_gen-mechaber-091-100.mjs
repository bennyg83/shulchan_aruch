#!/usr/bin/env node
/** Generate mechaber translations for simanim 091–100 from Hebrew via phrase engine. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { MECHABER as MANUAL091 } from "./_patch-siman-091-095-mechaber.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const SIMANIM = ["091", "092", "093", "094", "095", "096", "097", "098", "099", "100"];

const PHRASE = [
  ["אשה שהכניסה מלוה לבעלה ומחלה", "A woman who brought a loan to her husband and forgave it"],
  ["ובו ה סעיפים", "It contains 5 seifim"],
  ["ובו ח סעיפים", "It contains 8 seifim"],
  ["ובו לב סעיפים", "It contains 32 seifim"],
  ["ובו ז סעיפים", "It contains 7 seifim"],
  ["ובו כא סעיפים", "It contains 21 seifim"],
  ["ובו ד סעיפים", "It contains 4 seifim"],
  ["ובו ב סעיפים", "It contains 2 seifim"],
  ["ובו טז סעיפים", "It contains 16 seifim"],
  ["האיש שסילק עצמו מפירות נכסי אשתו ומירושתה", "A man who removed himself from the produce of his wife's property and her inheritance"],
  ["דין מזונות האלמנה", "Law of widow's sustenance"],
  ["חיוב דירת אלמנה וכסותה", "Obligation of widow's dwelling and clothing"],
  ["חיוב מעשה ידיה ליורשים", "Obligation of her handiwork to heirs"],
  ["שבועות אלמנה וגרושה על כתובה", "Oaths of widow and divorcee on ketubah"],
  ["הבעל יכול להשביע אשתו בטענת ספק", "The husband can make his wife swear on a doubtful claim"],
  ["פטרה משבועה או ייחד לה מטלטלין גובה בלא שבועה", "If he exempted her from oath or designated movable property for her, she collects without oath"],
  ["שמין לאשה אלמנה בגדיה", "They appraise a widow's garments"],
  ["כתובה ממה נגבית וכל יתר דיני כתובה", "From what ketubah is collected and all other ketubah laws"],
  ["שטר חוב", "promissory note"], ["מלוה על פה", "oral loan"], ["ידו כידה", "his hand is like hers"],
  ["אינו מחול", "it is not forgiven"], ["פרוע הוא", "it was paid"],
  ["בעל בנכסי אשתו הוי כלוקח", "a husband in his wife's property is considered like a buyer"],
  ["נכסי לך ואחריך", "my property is yours and after you to so-and-so"],
  ["שומא חוזרת", "appraisal returns"], ["אינה חוזרת", "it does not return"],
  ["סבלונות", "gifts to betrothed"], ["דינם כמלוה בשטר", "their law is like a promissory loan"],
  ["דין ודברים אין לי בנכסיך", "I have no legal claim in your property"],
  ["בעודה ארוסה", "while she was betrothed"], ["פירי פירות", "produce of produce"],
  ["ניזונית", "she is sustained"], ["אלמנה", "widow"], ["מזונות", "sustenance"],
  ["כתובה", "ketubah"], ["כתובתה", "her ketubah"], ["עיקר כתובה", "principal ketubah"],
  ["תוספת", "additional amount"], ["תוספות", "additional amounts"],
  ["בשבועה", "with an oath"], ["נקיטת חפץ", "holding a sacred object"],
  ["גובה", "collects"], ["נגבים", "are collected"], ["נגבית", "is collected"],
  ["יורשים", "heirs"], ["יתומים", "orphans"], ["בית דין", "beit din"],
  ["קרקע", "land"], ["מטלטלין", "movable property"], ["פירות", "produce"],
  ["הגה", "gloss"], ["בד\"א", "when does this apply"], ["ה\"ה", "likewise"],
  ["וי\"א", "some say"], ["אבל", "but"], ["ואם", "and if"], ["מיהו", "however"],
  ["לפיכך", "therefore"], ["דהיינו", "meaning"], ["אע\"פ", "even though"],
  ["נהגו", "custom"], ["בזמן הזה", "nowadays"], ["קיים", "stands"],
  ["אינו", "is not"], ["אינה", "she is not"], ["חייב", "obligated"],
  ["נאמנת", "she is believed"], ["נאמן", "he is believed"],
];

function applyPhrase(text) {
  let t = text;
  const sorted = [...PHRASE].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

function translateMechaberHtml(html) {
  let raw = String(html);
  const ramaParts = [];
  raw = raw.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => {
    ramaParts.push(g);
    return "";
  });
  let h = stripHtml(raw);
  h = applyPhrase(expandAbbrevs(h));
  let en = h.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  en = en.replace(/:\s*\./g, ".").replace(/\(\s*\)/g, "");
  for (const r of ramaParts) {
    let re = applyPhrase(expandAbbrevs(stripHtml(r)))
      .replace(/[\u0590-\u05FF]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (re) en += `\n\n{Rama: ${re}}`;
  }
  if (en && !/[.!?]$/.test(en)) en += ".";
  for (const bad of [/Lord's Prayer/i, /Hashem's Word/i, /Capernaum/i]) {
    if (bad.test(en)) throw new Error(`Forbidden in mechaber: ${bad}`);
  }
  return en;
}

const MECHABER = { ...MANUAL091 };

for (const sim of SIMANIM) {
  if (!MECHABER[sim]) MECHABER[sim] = {};
  const dir = path.join(OUT, `siman_${sim}`, "mechaber");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(dir, f), "utf8"))) {
      const key = `${b.seif}#${b.marker}`;
      if (MECHABER[sim][key]) continue;
      MECHABER[sim][key] = translateMechaberHtml(b.he);
    }
  }
}

const lines = ["/** Generated + manual mechaber — simanim 091–100 EH001 FULL REDO */", "export const MECHABER = {"];
for (const sim of SIMANIM) {
  lines.push(`  "${sim}": {`);
  for (const [k, v] of Object.entries(MECHABER[sim] || {}).sort()) {
    const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`    "${k}": \`${esc}\`,`);
  }
  lines.push("  },");
}
lines.push("};", "");

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-091-100-mechaber.mjs");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");

let n = 0;
for (const sim of SIMANIM) {
  const c = Object.keys(MECHABER[sim] || {}).length;
  console.log(`siman_${sim} mechaber: ${c}`);
  n += c;
}
console.log("TOTAL mechaber:", n, "->", outPath);
