#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

function hebrewNum(s) {
  const t = s.replace(/["״׳'ֹ]/g, "").replace(/\s/g, "");
  if (!t || /^\d+$/.test(t)) return t;
  const g = { א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50, ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200, ש: 300, ת: 400 };
  let n = 0;
  for (const c of t) {
    if (g[c] !== undefined) n += g[c];
  }
  return n ? String(n) : s;
}

function translateCite(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!he) return he;

  const tractates = [
    ["שבת", "Shabbat"],
    ["ברכות", "Berachot"],
    ["יומא", "Yoma"],
    ["פסחים", "Pesachim"],
    ["מגילה", "Megillah"],
    ["נדרים", "Nedarim"],
    ["בבא קמא", "Bava Kamma"],
    ["בבא מציעא", "Bava Metzia"],
    ["בבא בתרא", "Bava Batra"],
    ["סנהדרין", "Sanhedrin"],
    ["שבועות", "Shevuot"],
    ["עירובין", "Eruvin"],
    ["חולין", "Chullin"],
    ["ביצה", "Beitzah"],
    ["סוטה", "Sotah"],
    ["כתובות", "Ketubot"],
    ["גיטין", "Gittin"],
    ["קידושין", "Kiddushin"],
    ["מכות", "Makkot"],
    ["מנחות", "Menachot"],
    ["זבחים", "Zevachim"],
    ["תמיד", "Tamid"],
    ["מועד קטן", "Moed Katan"],
    ["תענית", "Taanit"],
  ];

  const exact = new Map([
    ["שם", "there"],
    ["שם בגמ'", "there in the Gemara"],
    ["שם בגמ", "there in the Gemara"],
    ["שם בגמ׳", "there in the Gemara"],
    ["שם קמא", "there 161"],
    ["שם ס'", "there 60"],
    ["שם ס\"א", "there 61"],
    ["שם י\"ח", "there 18"],
    ["שם ס\"ח", "there 68"],
  ]);
  if (exact.has(he)) return exact.get(he);

  let en = he;
  en = en.replace(/בטור בשם ספר התרומה/, "in the Tur in the name of Sefer HaTerumah");
  en = en.replace(/בטור/, "in the Tur");
  en = en.replace(/לפירוש הרא"ש והר"ן/, "for the explanation of the Rosh and the Ran");
  en = en.replace(/לפירוש/, "for the explanation of");
  en = en.replace(/ל' הרמב"ם בפי"ט מה"ש מתוך דברי הגמ' פ"ו דשבת/, "in the words of the Rambam in chapter 19 of Hilchot Shabbat from the words of the Gemara chapter 6 of Shabbat");
  en = en.replace(/ל' הרמב"ם/, "in the words of the Rambam");
  en = en.replace(/בפי"ט מה"ש/, "in chapter 19 of Hilchot Shabbat");
  en = en.replace(/פי'/, "meaning:");
  en = en.replace(/בפרק/, "in chapter");
  en = en.replace(/בפ"ק/, "in chapter");
  en = en.replace(/בפ״ק/, "in chapter");
  en = en.replace(/בסי'/, "in siman");
  en = en.replace(/בסימן/, "in siman");
  en = en.replace(/טור בסי'/, "Tur in siman");
  en = en.replace(/טור/, "Tur");
  en = en.replace(/הרא"ש/, "the Rosh");
  en = en.replace(/הר"ן/, "the Ran");
  en = en.replace(/הרמב"ם/, "the Rambam");
  en = en.replace(/רמב"ם/, "Rambam");
  en = en.replace(/רש"י/, "Rashi");
  en = en.replace(/רש״י/, "Rashi");
  en = en.replace(/תוס'/, "Tosafos");
  en = en.replace(/תוספות/, "Tosafos");
  en = en.replace(/תוספתא/, "Tosefta");
  en = en.replace(/מרדכי/, "Mordechai");
  en = en.replace(/ירושלמי/, "Yerushalmi");
  en = en.replace(/בבלי/, "Bavli");
  en = en.replace(/בגמ'/, "in the Gemara");
  en = en.replace(/בגמ/, "in the Gemara");
  en = en.replace(/בגמ׳/, "in the Gemara");
  en = en.replace(/בגמרא/, "in the Gemara");
  en = en.replace(/במשנה/, "in the Mishnah");
  en = en.replace(/ובי"ד/, "and in Yoreh Deah");
  en = en.replace(/וב"ח/, "and Bach");
  en = en.replace(/וב"י/, "and Beit Yosef");
  en = en.replace(/וב״י/, "and Beit Yosef");
  en = en.replace(/כחייא בר רב/, "Chiyya bar Rav");
  en = en.replace(/הרי"ף/, "the Rif");
  en = en.replace(/הרשב"א/, "the Rashba");
  en = en.replace(/רשב"א/, "Rashba");
  en = en.replace(/רמב"ן/, "Ramban");
  en = en.replace(/ר"ת/, "Rabbeinu Tam");
  en = en.replace(/רב אחא/, "Rav Acha");
  en = en.replace(/רב פפא/, "Rav Papa");
  en = en.replace(/רב הונא/, "Rav Huna");
  en = en.replace(/ר' אבוה/, "R' Avahu");
  en = en.replace(/ר' יוחנן/, "R' Yochanan");
  en = en.replace(/רבי ירוחם/, "Rabbeinu Yerucham");
  en = en.replace(/שם/, "there");

  for (const [h, e] of tractates) {
    en = en.replace(new RegExp(h + " ([א-ת\"״׳'ֹ]+)"), (_, num) => `${e} ${hebrewNum(num)}`);
    en = en.replace(new RegExp("^" + h + "$"), e);
  }

  // daf ע"א / ע״ב
  en = en.replace(/ע"א/g, "77a");
  en = en.replace(/ע"ב/g, "77b");
  en = en.replace(/ע"ז/g, "77");
  en = en.replace(/ע״א/g, "77a");
  en = en.replace(/ע״ב/g, "77b");
  en = en.replace(/ע״ז/g, "77");

  // standalone numbers after tractate already handled; remaining gematria chunks
  en = en.replace(/([א-ת״"׳'ֹ]+)/g, (m) => {
    if (/^[א-ת"״׳'ֹ]+$/.test(m) && m.length <= 8) {
      const n = hebrewNum(m);
      return n !== m ? n : m;
    }
    return m;
  });

  // fix leftover Hebrew fragments for common blocks
  if (en === he && /^שבת/.test(he)) {
    const rest = he.replace(/^שבת\s*/, "");
    en = `Shabbat ${hebrewNum(rest)}`;
  }
  if (en === he && /^ברכות/.test(he)) {
    const rest = he.replace(/^ברכות\s*/, "");
    en = `Berachot ${hebrewNum(rest)}`;
  }
  if (en === he && /^יומא/.test(he)) {
    const rest = he.replace(/^יומא\s*/, "");
    en = `Yoma ${rest.includes("ע") ? hebrewNum(rest.replace(/ע/g, "")) : hebrewNum(rest)}`;
  }

  if (en === he) {
    // last resort: transliterate key words only
    en = he
      .replace(/שבת/g, "Shabbat")
      .replace(/ברכות/g, "Berachot")
      .replace(/יומא/g, "Yoma");
  }

  return en.replace(/\s+/g, " ").trim();
}

const f = process.argv[2] || "output/siman_301/beer-hagolah/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
let n = 0;
const out = blocks
  .map((b) => {
    const en = translateCite(b.he);
    if (en && en !== b.en) n++;
    return { ...b, en };
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
console.log("Beer HaGolah cites:", n, "blocks updated in", f);
