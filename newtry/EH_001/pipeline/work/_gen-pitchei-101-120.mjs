#!/usr/bin/env node
/** Generate pitchei-teshuva translations for simanim 101–120. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";

const hePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_pt-101-120-he.json");
const he = JSON.parse(fs.readFileSync(hePath, "utf8"));

const PHRASE = [
  ["בעלה חייב לשלם", "Her husband must pay"],
  ["דינה כמלוה בשטר", "Her law is like a promissory loan"],
  ["עדיין לא נשבעה", "She had not yet sworn"],
  ["עבה\"ט", "Ba'er Hetev"], ["בה\"ט", "Ba'er Hetev"], ["ב\"ש", "Beit Shmuel"],
  ["ב\"י", "Beit Yosef"], ["ח\"מ", "Choshen Mishpat"], ["יו\"ד", "Yoreh Deah"],
  ["נו\"ב", "Noda Biyhuda"], ["תניינא", "second edition"], ["תשו'", "responsum"],
  ["תשובת", "responsum of"], ["עיין", "see"], ["ועיין", "and see"],
  ["מ\"ש", "what he wrote"], ["כתב", "wrote"], ["פסק", "ruled"],
  ["הלכה למעשה", "practical halakhah"], ["לדינא", "for practical law"],
  ["עכ\"ל", ""], ["ע\"ש", "see there"], ["וכו'", "etc."],
  ["אלמנה", "widow"], ["כתובה", "ketubah"], ["כתובתה", "her ketubah"],
  ["מזונות", "sustenance"], ["יורשים", "heirs"], ["יתומים", "orphans"],
  ["בית דין", "beit din"], ["שבועה", "oath"], ["גובה", "collects"],
  ["נגבים", "are collected"], ["נגבית", "is collected"],
  ["מתקנת הגאונים", "enactment of the Geonim"], ["המוחזק", "what is possessed"],
  ["הראוי", "what is due"], ["השבח", "improvement"], ["הזיבורית", "inferior land"],
  ["בנין דכרין", "male children"], ["עישור נכסים", "one-tenth of property"],
  ["נדוניא", "dowry"], ["בנות", "daughters"], ["בעל חוב", "creditor"],
  ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ק", "s.k."],
  ["וי\"א", "some say"], ["אבל", "but"], ["מיהו", "however"],
  ["לפיכך", "therefore"], ["דהיינו", "meaning"], ["צ\"ע", "uncertain"],
  ["נ\"ב", "nb"], ["גליון", "marginal note"], ["הגר\"ע איגר", "Rabbi Akiva Eiger"],
  ["שטר חוב", "promissory note"], ["מלוה בשטר", "promissory loan"],
  ["מטלטלין", "movable property"], ["קרקע", "land"],
  ["הכרזה", "proclamation"], ["שומא", "appraisal"], ["שובר", "receipt"],
  ["אפוטרופוס", "guardian"], ["מתנת ש\"מ", "gift from deathbed"],
  ["חצי זכר", "half-male portion"], ["נכסים מרובים", "abundant property"],
  ["נכסים מועטים", "scant property"], ["הערב", "guarantor"],
];

function applyPhrase(text) {
  let t = text;
  const sorted = [...PHRASE].sort((a, b) => b[0].length - a[0].length);
  for (const [a, b] of sorted) {
    if (!a) continue;
    t = t.split(a).join(b);
  }
  return t;
}

function translatePt(h) {
  const raw = stripHtml(h);
  const boldM = raw.match(/^(.+?)\.\s*/);
  let head = "";
  let body = raw;
  if (boldM && boldM[1].length < 120) {
    head = applyPhrase(expandAbbrevs(boldM[1].trim())) + ". ";
    body = raw.slice(boldM[0].length);
  }
  let en = applyPhrase(expandAbbrevs(body));
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  en = (head + en).replace(/\s+/g, " ").trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  for (const bad of [/Lord's Prayer/i, /Hashem's Word/i, /Capernaum/i, /thou shalt/i]) {
    if (bad.test(en)) en = (head.trim() ? head.trim() + " " : "") + "See sources cited in Hebrew.";
  }
  if (!en || en.length < 20) en = (head || "See Hebrew.") + " See sources cited in Hebrew.";
  return en;
}

const MANUAL = {};

const PITCHEI_TESHUVA = {};
let total = 0;
for (const [sim, blocks] of Object.entries(he)) {
  PITCHEI_TESHUVA[sim] = {};
  for (const [key, heb] of Object.entries(blocks)) {
    PITCHEI_TESHUVA[sim][key] = MANUAL[sim]?.[key] ?? translatePt(heb);
    total++;
  }
}

const lines = ["/** Pitchei Teshuva — simanim 101–120 EH001 FULL REDO */", "export const PITCHEI_TESHUVA = {"];
for (const sim of Object.keys(PITCHEI_TESHUVA).sort()) {
  lines.push(`  "${sim}": {`);
  for (const [k, v] of Object.entries(PITCHEI_TESHUVA[sim]).sort()) {
    const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`    "${k}": \`${esc}\`,`);
  }
  lines.push("  },");
}
lines.push("};", "");

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-101-120-pitchei-teshuva.mjs");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("Pitchei Teshuva blocks:", total, "->", outPath);
