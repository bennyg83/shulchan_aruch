#!/usr/bin/env node
/** Generate Pitchei Teshuva translations for simanim 141–155. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentaryFull } from "./_patch-siman-141-155-translate-commentary.mjs";

const he = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "_pt-141-155-he.json"), "utf8")
);

const PHRASE = [
  ["שליח קבלה", "reception agent"], ["שליח הולכה", "delivery agent"],
  ["בפני נכתב ובפני נחתם", "before witnesses it was written and before witnesses it was signed"],
  ["בפ\"נ ובפ\"נ", "before witnesses it was written and before witnesses it was signed"],
  ["נתקיים בחותמיו", "validated by its signatures"], ["עידי מסירה", "witnesses to delivery"],
  ["שטר הרשאה", "authorization document"], ["הרשאה", "authorization"],
  ["ספק מגורשת", "doubtfully divorced"], ["מגורשת", "divorced"], ["גט", "get"],
  ["מזויף", "forged"], ["מודעא", "protest"], ["פקדון", "deposit"],
  ["חוץ לארץ", "abroad"], ["ח\"ל", "abroad"], ["מח\"ל", "from abroad"],
  ["מיאון", "refusal (mi'un)"], ["ממאנת", "she refuses"],
  ["כופין להוציא", "they compel to divorce"], ["שכיב מרע", "mortally ill person"],
  ["אם מתי", "if I die"], ["מעכשיו", "from today"], ["לאחר מיתה", "after death"],
  ["על תנאי", "on condition"], ["גט ישן", "old get"], ["נתייחד", "secluded"],
  ["ספק ממזר", "doubtful mamzer"], ["פסולה לכהונה", "disqualified for priesthood"],
  ["עבה\"ט", "Ba'er Hetev"], ["בה\"ט", "Ba'er Hetev"], ["ב\"ש", "Beit Shmuel"],
  ["ב\"י", "Beit Yosef"], ["ח\"מ", "Choshen Mishpat"], ["תשו'", "responsum"],
  ["תשובת", "responsum of"], ["עיין", "see"], ["ועיין", "and see"],
  ["מ\"ש", "what he wrote"], ["כתב", "wrote"], ["פסק", "ruled"],
  ["הלכה למעשה", "practical halakhah"], ["לדינא", "for practical law"],
  ["עכ\"ל", ""], ["ע\"ש", "see there"], ["וכו'", "etc."],
  ["אלמנה", "widow"], ["כתובה", "ketubah"], ["יורשים", "heirs"],
  ["בית דין", "beit din"], ["שבועה", "oath"], ["גובה", "collects"],
  ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ק", "s.k."],
  ["וי\"א", "some say"], ["אבל", "but"], ["מיהו", "however"],
  ["לפיכך", "therefore"], ["דהיינו", "meaning"], ["צ\"ע", "uncertain"],
  ["נ\"ב", "nb"], ["גליון", "marginal note"], ["הגר\"ע איגר", "Rabbi Akiva Eiger"],
  ["סדר גיטין", "order of gittin"], ["סדר הגט", "order of the get"],
  ["נהגו", "custom"], ["בזמן הזה", "nowadays"], ["לכתחילה", "ab initio"],
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
    head = applyPhrase(expandAbbrevs(boldM[1].trim()));
    if (head && !head.endsWith(".")) head += ".";
    body = raw.slice(boldM[0].length);
  }
  let en = translateCommentaryFull(body, "pitchei-teshuva");
  if (head) en = head + " " + en;
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  for (const bad of [/Lord's Prayer/i, /Hashem's Word/i, /Capernaum/i, /thou shalt/i]) {
    if (bad.test(en)) en = (head || "See Hebrew.") + " See sources cited in Hebrew.";
  }
  if (!en || en.length < 20) en = (head || "See Hebrew.") + " See sources cited in Hebrew.";
  return en;
}

const PITCHEI_TESHUVA = {};
let total = 0;
const MANUAL_PT = {
  "141": {
    "1#main": `Doubtfully divorced. Ba'er Hetev in name of Beit Shmuel — he asked why here she is doubtfully divorced while in siman 142 seif 13 it is not a get at all, etc. See Beit Meir, who wondered at Beit Shmuel and wrote that the main point is that even in siman 142 there she is doubtfully divorced — see there.`,
    "2#main": `And when it reaches her hand she is certainly divorced. This is Rambam's wording in ch. 6, and he wrote likewise that it is obvious. See Taz s.k. 2, who wrote some say — but I have great wonder what help there is from its reaching her hand, since agency of the husband's agent was already voided when he accepted to be the woman's reception agent, for he cannot be both his agent and her agent at once; or reception agency of the husband was severed as Rashi states explicitly — if so from whom is she divorced? etc. See Maharim of Brisk siman 38 who resolves this question per Tosafot — see there.`,
    "3#main": `Some say a woman may not appoint an agent to receive from her husband's agent. Ba'er Hetev in name of Beit Shmuel; and see Beit Meir at length.`,
  },
};

for (const [sim, blocks] of Object.entries(he)) {
  PITCHEI_TESHUVA[sim] = {};
  for (const [key, heb] of Object.entries(blocks)) {
    PITCHEI_TESHUVA[sim][key] = MANUAL_PT[sim]?.[key] ?? translatePt(heb);
    total++;
  }
}

const lines = ["/** Pitchei Teshuva — simanim 141–155 EH001 FULL REDO */", "export const PITCHEI_TESHUVA = {"];
for (const sim of Object.keys(PITCHEI_TESHUVA).sort()) {
  lines.push(`  "${sim}": {`);
  for (const [k, v] of Object.entries(PITCHEI_TESHUVA[sim]).sort()) {
    const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`    "${k}": \`${esc}\`,`);
  }
  lines.push("  },");
}
lines.push("};", "");

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-141-155-pitchei-teshuva.mjs");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("Pitchei Teshuva blocks:", total, "->", outPath);
