#!/usr/bin/env node
/** Generate mechaber translations for simanim 101–120 from Hebrew via phrase engine + manual. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { MANUAL as MANUAL_HAND } from "./_patch-siman-101-120-mechaber-manual.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const SIMANIM = Array.from({ length: 20 }, (_, i) => String(101 + i).padStart(3, "0"));

const PHRASE = [
  ["עד כמה גובה כתובתה", "How much she collects of her ketubah"],
  ["דין גביית חוב וכתובת אלמנה", "Law of collecting a debt and a widow's ketubah"],
  ["אלמנה שמוכרת נכסיה לכתובתה אם צריכה למכור על פי בית דין", "A widow who sells her property for her ketubah — whether she must sell through beit din"],
  ["בית דין שמכרו וטעו וכן שאר שלוחין", "A beit din that sold and erred, and likewise other agents"],
  ["דין המוכרת ומוחלת כתובתה", "Law of one who sells or waives her ketubah"],
  ["הכותב כל נכסיו לבניו וכתב לאשתו קרקע כל שהוא", "One who writes all his property to his sons and wrote his wife any land at all"],
  ["הכותב כל נכסיו לאשתו אם קנתה ויצא עליו שטר חוב", "One who writes all his property to his wife — if she acquired and a promissory note was issued against him"],
  ["דין שכיב מרע שאמר תטול אשתי כאחד מן הבנים", "Law of a deathly ill person who said my wife shall take like one of the sons"],
  ["שכיב מרע שאמר תנו מאתים זהובים לאשתי בכתובה", "A deathly ill person who said give two hundred gold to my wife in the ketubah"],
  ["שכותבין שובר לאשה אע\"פ שאין בעלה עמה", "That they write a receipt for a woman even though her husband is not with her"],
  ["דין כתובת בנין דכרין", "Law of ketubah of male children"],
  ["מזונות הבנות ממה נזונות ועד כמה וכל דיניהם", "Daughters' sustenance — from what they are sustained, how much, and all their laws"],
  ["עישור נכסים ממה נגבים", "One-tenth of property — from what it is collected"],
  ["ובו ד סעיפים", "It contains 4 seifim"],
  ["ובו ט סעיפים", "It contains 9 seifim"],
  ["ובו ה סעיפים", "It contains 5 seifim"],
  ["ובו ו סעיפים", "It contains 6 seifim"],
  ["ובו ז סעיפים", "It contains 7 seifim"],
  ["ובו ב סעיפים", "It contains 2 seifim"],
  ["ובו י סעיפים", "It contains 10 seifim"],
  ["ובו ג סעיפים", "It contains 3 seifim"],
  ["ובו יז סעיפים", "It contains 17 seifim"],
  ["ובו יח סעיפים", "It contains 18 seifim"],
  ["שטר כתובה בידה", "the ketubah document is in her hand"],
  ["גובה לעולם", "collects forever"],
  ["נותנים לה מזונות בבית אביה", "they give her sustenance in her father's house"],
  ["בבית בעלה", "in her husband's house"],
  ["אפילו לאחר שנשאת", "even after she remarried"],
  ["עברה עליה שמיטה", "a sabbatical year passed over her"],
  ["אינה נשמטת", "she is not released"],
  ["פגמה אותה", "she impaired it"],
  ["שגבתה מקצת", "that she collected part"],
  ["שזקפה במלוה", "that she stood it as a loan"],
  ["אין כתובתה בידה", "her ketubah is not in her hand"],
  ["באה לגבות בתנאי ב\"ד", "she comes to collect under beit din conditions"],
  ["במקום שאין כותבים", "in a place where they do not write"],
  ["אלא עד סוף כ\"ה שנה", "only until the end of twenty-five years"],
  ["שתקה כ\"ה שנה ולא תבעה", "she was silent twenty-five years and did not claim"],
  ["מחלה", "she waived"],
  ["תבעה תוך כ\"ה שנים", "she claimed within twenty-five years"],
  ["מונין לה כ\"ה שנים מיום שתבעה", "they count twenty-five years for her from the day she claimed"],
  ["יורשיה צריכים לתבוע תוך כ\"ה שנה למיתתה", "her heirs must claim within twenty-five years of her death"],
  ["שתקו יותר מעשרים וחמש שנים מחלו", "if they were silent more than twenty-five years they waived"],
  ["ניזונית בבית אביה", "she is sustained in her father's house"],
  ["היורשים מכבדים אותה", "the heirs honor her"],
  ["שמוליכים לה מזונותיה בעצמם", "they bring her sustenance themselves"],
  ["שתיקתה מחילה", "her silence is waiver"],
  ["מפני הבושה שתקה ולא מפני שמחלה", "she was silent out of shame and not because she waived"],
  ["נדוניא לעולם אינה מוחלת", "a dowry is never waived"],
  ["אפילו שהתה כמה שנים", "even if she waited many years"],
  ["גרושה לעולם אינה מוחלת", "a divorcee is never waived"],
  ["מי שמת ואלמנתו", "one who died and his widow"],
  ["באה לגבות כתובתה", "comes to collect her ketubah"],
  ["ועליו ב\"ח", "and upon him is a creditor"],
  ["זמן של אחד מהם מוקדם", "the term of one of them is earlier"],
  ["לא הניח אלא קרקע כדי לפרוע לא' מהם", "he left only land enough to pay one of them"],
  ["מי שזמנו קודם יגבה והא' ידחה", "whoever's term is earlier collects and the other is pushed off"],
  ["ואפי' תפס המאוחר מוציאין מידו", "and even if the later one seized, they remove from his hand"],
  ["לא הניח אלא מטלטלים", "he left only movables"],
  ["שאין בהם קדימה", "that have no priority"],
  ["דלא אקני לה מטלטלי אגב מקרקעי", "that he did not acquire movables for her by way of land"],
  ["ינתנו לבעל חוב", "they are given to the creditor"],
  ["תדחה האשה מלגבות", "the woman is pushed off from collecting"],
  ["עיקר ותוספת", "principal and additional amount"],
  ["אם תפסה אפי' שלא בב\"ד אין מוציאין מידה", "if she seized, even not through beit din, they do not remove from her hand"],
  ["זמן שניהם שוין", "their terms are equal"],
  ["שנשא ולוה ואח\"כ קנה", "he married and borrowed and afterward acquired"],
  ["שלוה ונשא ואח\"כ קנה", "he borrowed and married and afterward acquired"],
  ["חל שעבודם כאחד", "their liens took effect as one"],
  ["תדחה האשה מגביית עיקר ותוספת", "the woman is pushed off from collecting principal and additional amount"],
  ["קדמה האשה ותפסה קרקע", "the woman preceded and seized land"],
  ["גבתה מעצמה", "she collected herself"],
  ["תפסה מטלטלין", "she seized movables"],
  ["לא מפקינן מינה", "they do not remove from her"],
  ["אם יש כדי לפרוע לשניהם", "if there is enough to pay both"],
  ["נותנים לבעל חוב מעות ולאשה קרקע", "they give money to the creditor and land to the woman"],
  ["היו כתובים בכתובה נכסי צ\"ב", "iron-flock property was written in the ketubah"],
  ["נכסי צאן ברזל", "iron-flock property"],
  ["הערב לאשה", "a guarantor for a woman"],
  ["בעיקר כתובה", "on principal ketubah"],
  ["או בתוספת", "or on the additional amount"],
  ["אינו מתחייב", "he is not obligated"],
  ["בקנין", "with a kinyan"],
  ["באשה דעלמא", "for an ordinary woman"],
  ["לכלתו מתחייב בקנין", "for his daughter-in-law he is obligated with a kinyan"],
  ["הערב לאשה בכתובתה", "a guarantor for a woman on her ketubah"],
  ["לא תפרע מן הערב עד שידירנה בעלה הנאה", "she does not collect from the guarantor until her husband forbids her benefit"],
  ["הקדיש כל נכסיו ומגרשה", "he consecrated all his property and divorced her"],
  ["לא תגבה כתובתה עד שידירנה הנאה", "she does not collect her ketubah until he forbids her benefit"],
  ["מן הלקוחות גובה אפי' בלא הדירה", "from buyers she collects even without forbidding benefit"],
  ["אלמנה מוכרת מנכסי בעלה", "a widow sells from her husband's property"],
  ["שלא בב\"ד", "not through beit din"],
  ["שלא בהכרזה", "without proclamation"],
  ["ב\"ד הדיוטות", "lay beit din"],
  ["בקיאים בשומת קרקע", "expert in land appraisal"],
  ["אחריות המכר על היתומים", "sale warranty is on the orphans"],
  ["גרושה לא תמכור אלא בב\"ד מומחים", "a divorcee may not sell except through expert beit din"],
  ["אלמנה ששמה ולקחתו לעצמה", "a widow who appraised and took for herself"],
  ["מכרה בטל", "her sale is void"],
  ["ב\"ד שמוכרים להגבות לאלמנה", "a beit din that sells to collect for a widow"],
  ["אין מוכרין אלא בהכרזה", "they may not sell except with proclamation"],
  ["מכריזים ל' יום רצופים", "they proclaim thirty consecutive days"],
  ["או ששים יום ב' וה'", "or sixty days on Monday and Thursday"],
  ["טעו בדבר משנה", "they erred in a matter of mishnah"],
  ["חוזרים ומוכרים בהכרזה", "they return and sell with proclamation"],
  ["מכרם קיים", "their sale stands"],
  ["מכרם בטל", "their sale is void"],
  ["שתות", "one-sixth"],
  ["אונאה", "overcharge/undercharge"],
  ["שליח שמכר וטעה", "an agent who sold and erred"],
  ["יכולה אשה למכור כתובתה", "a woman may sell her ketubah"],
  ["או ליתנה לאחרים", "or give it to others"],
  ["הלוקח והמקבל עומדים במקומה", "the buyer and recipient stand in her place"],
  ["המוחלת כתובתה לבעלה איבדה כל תנאי כתובה", "one who waives her ketubah to her husband loses all ketubah conditions"],
  ["אינה צריכה לא קנין ולא עדים", "she needs neither kinyan nor witnesses"],
  ["הכותב כל נכסיו לבניו", "one who writes all his property to his sons"],
  ["כתב לאשתו קרקע כל שהוא", "wrote his wife any land at all"],
  ["איבדה עיקר כתובתה ותוספת", "she lost principal ketubah and additional amount"],
  ["הכותב כל נכסיו לאשתו", "one who writes all his property to his wife"],
  ["לא עשאה אלא אפוטרופא", "he made her only a guardian"],
  ["שייר כל שהוא", "he left any amount"],
  ["קנתה כל מה שכתב לה", "she acquired all he wrote her"],
  ["מתנת ש\"מ", "gift from deathbed"],
  ["שכיב מרע", "deathly ill person"],
  ["תטול אשתי כאחד מן הבנים", "my wife shall take like one of the sons"],
  ["נוטלת כאחד מבניו", "she takes like one of his sons"],
  ["יתר על כתובתה", "beyond her ketubah"],
  ["ידה על העליונה", "her hand is on the upper"],
  ["כותבין שובר לאשה", "they write a receipt for a woman"],
  ["מתנאי הכתובה", "ketubah conditions"],
  ["כתובת בנין דכרין", "ketubah of male children"],
  ["יורשים כתובת אמן", "inherit their mother's ketubah"],
  ["הבנות נזונות מנכסי אביהם", "daughters are sustained from their father's property"],
  ["עד שיתארסו", "until they become betrothed"],
  ["עד שיבגרו", "until they reach majority"],
  ["מעשה ידיה ומציאתה לעצמה", "her handiwork and finds are for herself"],
  ["נכסים מרובים", "abundant property"],
  ["נכסים מועטים", "scant property"],
  ["עישור נכסים", "one-tenth of property"],
  ["לפרנסת נדונייתא", "for provision of dowry"],
  ["אומדים דעתו", "they estimate his intent"],
  ["שטר חוב", "promissory note"], ["מלוה בשטר", "promissory loan"],
  ["מלוה על פה", "oral loan"], ["בעל חוב", "creditor"],
  ["כתובה", "ketubah"], ["כתובתה", "her ketubah"], ["עיקר כתובה", "principal ketubah"],
  ["תוספת", "additional amount"], ["נדוניא", "dowry"], ["נדונייתא", "dowry"],
  ["אלמנה", "widow"], ["גרושה", "divorcee"], ["יתומים", "orphans"],
  ["יורשים", "heirs"], ["בית דין", "beit din"], ["ב\"ד", "beit din"],
  ["קרקע", "land"], ["מקרקעי", "land"], ["מטלטלין", "movable property"],
  ["בני חורין", "free property"], ["משעבדים", "encumbered property"],
  ["נשבעת", "she swears"], ["שבועה", "oath"], ["שבועת אלמנה", "widow's oath"],
  ["גובה", "collects"], ["נגבית", "is collected"], ["נגבים", "are collected"],
  ["מוכרת", "she sells"], ["מוחלת", "she waives"], ["מכרה", "she sold"],
  ["הכרזה", "proclamation"], ["שומא", "appraisal"], ["שובר", "receipt"],
  ["אפוטרופוס", "guardian"], ["הנאה", "benefit"], ["הדירה", "he forbade benefit"],
  ["הערב", "guarantor"], ["קבלן", "contractor"], ["קנון", "collusion"],
  ["שכיב מרע", "deathly ill person"], ["צוואה", "will"],
  ["בנין דכרין", "male children"], ["מזונות", "sustenance"],
  ["ניזונית", "she is sustained"], ["הזיבורית", "inferior land"],
  ["בינונית", "medium-quality land"], ["המוחזק", "what is possessed"],
  ["הראוי", "what is due"], ["מותר", "surplus"], ["דינר", "dinar"],
  ["זהובים", "gold coins"], ["זוז", "zuz"], ["מנה", "maneh"],
  ["מאה", "hundred"], ["מאתים", "two hundred"], ["עישור", "one-tenth"],
  ["תקנת הגאונים", "enactment of the Geonim"],
  ["הארוס", "betrothed man"], ["שומרת יבם", "levirate widow"],
  ["חצי זכר", "half-male portion"], ["חצי חלק זכר", "half-male portion"],
  ["בד\"א", "when does this apply"], ["ה\"ה", "likewise"], ["וי\"א", "some say"],
  ["מיהו", "however"], ["לפיכך", "therefore"], ["אע\"פ", "even though"],
  ["אא\"כ", "unless"], ["בזמן הזה", "nowadays"], ["נהגו", "custom"],
  ["אינו", "is not"], ["אינה", "she is not"], ["חייב", "obligated"],
  ["נאמנת", "she is believed"], ["נאמן", "he is believed"],
  ["אבל", "but"], ["ואם", "and if"], ["וכן", "and likewise"],
  ["דהיינו", "meaning"], ["עיין", "see"], ["כתב", "wrote"], ["פסק", "ruled"],
  ["סי'", "siman"], ["סעיף", "seif"], ["ח\"מ", "Choshen Mishpat"],
  ["ב\"ש", "Beit Shmuel"], ["ב\"י", "Beit Yosef"], ["טור", "Tur"],
  ["הגה", "gloss"], ["ג\"ז", "likewise"], ["ה\"מ", "this applies"],
  ["כיצד", "how so"], ["פירוש", "meaning"], ["משמע", "it implies"],
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
  raw = raw.replace(/<small>\s*\(([\s\S]*?)\)\s*\(([^)]+)\)\s*<\/small>/gi, (_, a, b) => {
    return ` (${applyPhrase(expandAbbrevs(stripHtml(a)))}) (${b}) `;
  });
  let h = stripHtml(raw);
  h = applyPhrase(expandAbbrevs(h));
  let en = h.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  en = en.replace(/:\s*\./g, ".").replace(/\(\s*\)/g, "").replace(/\s+,/g, ",");
  for (const r of ramaParts) {
    let re = applyPhrase(expandAbbrevs(stripHtml(r)))
      .replace(/[\u0590-\u05FF]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (re) en += `\n\n{Rama: ${re}}`;
  }
  if (en && !/[.!?]$/.test(en)) en += ".";
  for (const bad of [/Lord's Prayer/i, /Hashem's Word/i, /Capernaum/i, /\bAlibaba\b/i]) {
    if (bad.test(en)) throw new Error(`Forbidden in mechaber: ${bad}`);
  }
  return en;
}

const MECHABER = JSON.parse(JSON.stringify(MANUAL_HAND));

for (const sim of SIMANIM) {
  if (!MECHABER[sim]) MECHABER[sim] = {};
  const dir = path.join(OUT, `siman_${sim}`, "mechaber");
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(dir, f), "utf8"))) {
      const key = `${b.seif}#${b.marker}`;
      if (MECHABER[sim][key]) continue;
      MECHABER[sim][key] = translateMechaberHtml(b.he);
    }
  }
}

const lines = ["/** Generated + manual mechaber — simanim 101–120 EH001 FULL REDO */", "export const MECHABER = {"];
for (const sim of SIMANIM) {
  lines.push(`  "${sim}": {`);
  for (const [k, v] of Object.entries(MECHABER[sim] || {}).sort()) {
    const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`    "${k}": \`${esc}\`,`);
  }
  lines.push("  },");
}
lines.push("};", "");

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-101-120-mechaber.mjs");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");

let n = 0;
for (const sim of SIMANIM) {
  const c = Object.keys(MECHABER[sim] || {}).length;
  console.log(`siman_${sim} mechaber: ${c}`);
  n += c;
}
console.log("TOTAL mechaber:", n, "->", outPath);
