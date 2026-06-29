#!/usr/bin/env node
/** Hebrew-to-English engine for siman 017 commentary blocks — expands abbrevs, strips HTML. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dump = JSON.parse(
  fs.readFileSync(path.join(ROOT, "pipeline/work/_siman-017-hebrew-dump.json"), "utf8")
);

const ABBREV = [
  ["ב\"י", "Beit Yosef"], ["ב\"ש", "Beit Shmuel"], ["ב\"ח", "Bach"], ["ב\"מ", "Beit Meir"],
  ["ב\"ה", "Be'er Heitev"], ["ח\"מ", "Choshen Mishpat"], ["ח\"צ", "Chacham Tzvi"],
  ["ט\"ז", "Taz"], ["טור", "Tur"], ["ש\"ך", "Shach"], ["ש\"ע", "Shulchan Aruch"],
  ["רמ\"א", "Rama"], ["רמב\"ם", "Rambam"], ["רמב\"ן", "Ramban"], ["רשב\"א", "Rashba"],
  ["רש\"י", "Rashi"], ["ר\"ן", "Ran"], ["ר\"י", "R' Yonah"], ["ר\"ת", "Rabbenu Tam"],
  ["ריב\"ש", "Rivash"], ["ריטב\"א", "Ritva"], ["רא\"ש", "Rosh"], ["הר\"ן", "Ran"],
  ["הר\"י", "R' Yehuda"], ["הג\"מ", "Maggid Mishneh"], ["הג\"ה", "gloss"],
  ["ד\"מ", "Darkei Moshe"], ["כ\"מ", "Knesset HaGedolah"], ["מהרי\"ק", "Maharik"],
  ["מהרי\"ל", "Maharil"], ["מהרש\"ם", "Maharsham"], ["נ\"י", "Nekudot Yosef"],
  ["פמ\"ג", "Peri Megadim"], ["א\"ח", "Eliyahu Rabba"], ["א\"ז", "Or Zarua"],
  ["ת\"ה", "Terumat HaDeshen"], ["תוס'", "Tosafot"], ["תו'", "Tosafot"],
  ["סי'", "siman"], ["סעי'", "seif"], ["ס\"ק", "s.k."], ["ע\"ש", "see there"],
  ["עי'", "see"], ["עיין", "see"], ["וכו'", "etc."], ["וכו", "etc."],
  ["לע\"ד", "in my view"], ["לפ\"ז", "therefore"], ["לפ\"ד", "per his view"],
  ["לפ\"ר", "in my humble view"], ["מ\"ש", "what he wrote"], ["כ'", "wrote"],
  ["כתב", "wrote"], ["משמע", "it appears"], ["מבואר", "it is clear"],
  ["ק\"ק", "question"], ["ק'", "question"], ["תירץ", "answered"],
  ["תי'", "version"], ["פלוגת'", "dispute"], ["הל'", "law"], ["הכי", "thus"],
  ["א\"א", "married woman"], ["א\"י", "Israelite"], ["א\"נ", "or not"],
  ["ע\"א", "one witness"], ["ע\"ת", "on condition"], ["ע\"פ", "according to"],
  ["ע\"מ", "on condition"], ["ע\"י", "by means of"], ["ע\"ש", "see there"],
  ["בפניו", "in his presence"], ["בפני", "before"], ["בזה\"ז", "in our time"],
  ["בדיעבד", "bedieved"], ["מסל\"ת", "mesalechet"], ["מסלפת", "mesalechet"],
  ["גרשתני", "you divorced me"], ["לא גרשתיך", "I did not divorce you"],
  ["חזקה", "hazakah"], ["מעיזה", "brazen"], ["נאמנת", "she is believed"],
  ["נאמן", "he is believed"], ["עגון", "agunah"], ["עגונה", "agunah"],
  ["קידושין", "kiddushin"], ["גט", "get"], ["כתובה", "ketubah"],
  ["יבם", "yavam"], ["יבמה", "yevamah"], ["חליצה", "chalitzah"],
  ["חמותה", "mother-in-law"], ["צרה", "rival wife"], ["צרתה", "her rival"],
  ["ה' נשים", "five women"], ["ב\"ד", "beit din"], ["ב\"ה", "Be'er Heitev"],
  ["גמ'", "Gemara"], ["ש\"ס", "Talmud"], ["משנה", "Mishnah"], ["ברייתא", "baraita"],
  ["תשו'", "responsum"], ["תשוב'", "responsum"], ["סוגי'", "sugya"],
  ["ד\"ה", "s.v."], ["דף", "folio"], ["ע\"א", "folio a"], ["ע\"ב", "folio b"],
  ["פ\"ק", "ch. 1"], ["פ\"ב", "ch. 2"], ["פ\"ג", "ch. 3"], ["פ\"ד", "ch. 4"],
  ["פ\"ה", "ch. 5"], ["פ\"ו", "ch. 6"], ["פ\"ז", "ch. 7"], ["פ\"ח", "ch. 8"],
  ["פ\"ט", "ch. 9"], ["פ\"י", "ch. 10"], ["פ\"יא", "ch. 11"], ["פ\"יב", "ch. 12"],
  ["פ\"יג", "ch. 13"], ["פ\"יד", "ch. 14"], ["פ\"טו", "ch. 15"],
  ["ה\"ג", "halakhah 3"], ["ה\"ב", "halakhah 2"], ["ה\"א", "halakhah 1"],
  ["ז\"ל", "zt\"l"], ["שי'", "may he live"], ["נ\"ב", "nb"], ["נרו'", "nb"],
  ["ד\"ת", "deoraita"], ["דרבנן", "derabbanan"], ["לחומרא", "stringently"],
  ["לקולא", "leniently"], ["ספק", "safek"], ["ודאי", "certainly"],
  ["אינו", "is not"], ["אינה", "she is not"], ["אין", "there is no"],
  ["הוי", "it is"], ["הוה", "it was"], ["איתא", "it is stated"],
  ["אמרינן", "we say"], ["תנן", "we learned"], ["תניא", "it was taught"],
  ["קאמר", "he says"], ["פירש", "explained"], ["פירש\"י", "Rashi explained"],
  ["הוכח", "proven"], ["מוכח", "proven"], ["מסקנ", "conclusion"],
  ["פסק", "ruled"], ["הכריע", "decided"], ["חולק", "disputes"],
  ["מחלק", "distinguishes"], ["מקשה", "challenges"], ["מקשין", "they challenge"],
  ["פריך", "challenges"], ["משני", "answers"], ["מתרץ", "answers"],
  ["דחה", "rejected"], ["דוחה", "rejects"], ["סתים", "sealed"],
  ["צ\"ע", "uncertain"], ["ס\"ת", "scribal error"], ["דוחק", "forced"],
  ["בעינן", "we require"], ["אצ\"ל", "all the more so"], ["ממילא", "automatically"],
  ["נהי", "although"], ["אכתי", "still"], ["מיהו", "however"],
  ["אמנם", "however"], ["אולם", "but"], ["ואם", "and if"],
  ["אבל", "but"], ["דהא", "for behold"], ["דהיינו", "meaning"],
  ["כלומר", "meaning"], ["ר\"ל", "meaning"], ["היינו", "meaning"],
  ["כד", "as"], ["כמו", "like"], ["כגון", "such as"],
  ["דוקא", "specifically"], ["סתם", "plainly"], ["אפילו", "even"],
  ["אף", "also"], ["גם", "also"], ["תו", "further"],
  ["עכ\"ל", "end quote"], ["עכ\"פ", "in any case"], ["ע\"כ", "therefore"],
  ["מ\"מ", "nevertheless"], ["ודילמא", "and perhaps"],
  ["דילמא", "perhaps"], ["שמא", "perhaps"], ["למאי", "for what"],
  ["מנ\"ל", "from where do we know"], ["מנ\"י", "from where to me"],
  ["אי", "if"], ["אי נמי", "or also"], ["אי לא", "if not"],
  ["לאו", "is it not"], ["הא", "behold"], ["הכי", "thus"],
  ["השתא", "now"], ["לבסוף", "ultimately"], ["מעיקרא", "initially"],
  ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"],
  ["כה\"פ", "Shulchan Aruch"], ["הש\"ע", "Shulchan Aruch"],
  ["הטור", "Tur"], ["הב\"י", "Beit Yosef"], ["הב\"ש", "Beit Shmuel"],
  ["הח\"מ", "Choshen Mishpat"], ["הגאון", "the Gaon"],
  ["כותי", "Samaritan"], ["עכו\"ם", "gentile"], ["נכרי", "gentile"],
  ["שד", "demon"], ["גוסס", "goses"], ["טביעה", "immersion"],
  ["סימנים", "signs"], ["סימן", "sign"], ["מכיר", "recognizes"],
  ["הכרה", "recognition"], ["עדות", "testimony"], ["עד", "witness"],
  ["עדים", "witnesses"], ["פסול", "disqualified"], ["כשר", "valid"],
  ["פסולי עדות", "disqualified witnesses"], ["מגו", "migo"],
  ["התחילה", "she began"], ["התחיל", "he began"], ["ערער", "contradicted"],
  ["הודתה", "she admitted"], ["מכחישה", "she contradicts"],
  ["קיבלה", "she accepted"], ["מקודשת", "betrothed"],
  ["מגורשת", "divorced"], ["גרושה", "divorced woman"],
  ["אשת איש", "married woman"], ["זונה", "zonah"],
  ["ממזר", "mamzer"], ["חלל", "chalal"], ["כהונה", "priesthood"],
  ["ליבם", "to perform levirate marriage"], ["חד\"א", "one-sided"],
  ["שוי' נפשה", "she made herself"], ["שוי' נעשה", "made himself"],
];

export function stripHtml(h) {
  return h
    .replace(/<b>(.*?)<\/b>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function expandAbbrevs(text) {
  let t = text;
  const sorted = [...ABBREV].sort((a, b) => b[0].length - a[0].length);
  for (const [abbr, full] of sorted) {
    t = t.split(abbr).join(full);
  }
  return t;
}

/** Clause-level patterns for commentary Hebrew */
const CLAUSE_PATTERNS = [
  [/^עיין?\s+(.+)/i, "See $1."],
  [/^ע'\s+(.+)/i, "See $1."],
  [/^וכן\s+(.+)/i, "And likewise $1."],
  [/^ואם\s+(.+)/i, "And if $1."],
  [/^אבל\s+(.+)/i, "But $1."],
  [/^ואולם\s+(.+)/i, "However $1."],
  [/^ולע"ד\s+(.+)/i, "And in my view $1."],
  [/^ולפ"ז\s+(.+)/i, "Therefore $1."],
  [/^משמע\s+(.+)/i, "It appears $1."],
  [/^מבואר\s+(.+)/i, "It is clear $1."],
  [/^ק"ק\s+(.+)/i, "Question: $1."],
  [/^ותירץ\s+(.+)/i, "He answered: $1."],
  [/^כתב\s+(.+)/i, "He wrote $1."],
  [/^כ'\s+(.+)/i, "He wrote $1."],
  [/^פירש"י\s+(.+)/i, "Rashi explained $1."],
  [/^נלע"ד\s+(.+)/i, "In my humble view $1."],
  [/^צ"ע\.?$/i, "Uncertain."],
  [/^וע"ש\.?$/i, "And see there."],
  [/^עכ"ל\.?$/i, ""],
];

function translateClause(clause) {
  clause = clause.trim();
  if (!clause) return "";
  for (const [re, repl] of CLAUSE_PATTERNS) {
    const m = clause.match(re);
    if (m) return repl.replace(/\$(\d+)/g, (_, n) => m[+n] ?? "");
  }
  return clause;
}

/** Generate halachic English from Hebrew commentary block */
export function translateBlock(hebrew, slug, key) {
  let h = expandAbbrevs(stripHtml(hebrew));

  // Bold heading at start
  const headingMatch = h.match(/^([^.]+)\./);
  const heading = headingMatch ? headingMatch[1].trim() : "";

  // Split on sentence boundaries (period, semicolon, colon before space)
  const rawClauses = h
    .split(/(?<=[.;:])\s+/)
    .map((c) => c.trim())
    .filter(Boolean);

  const translated = rawClauses.map((c) => {
    let t = translateClause(c);
    // Clean remaining Hebrew punctuation artifacts
    t = t.replace(/\s+/g, " ").trim();
    return t;
  }).filter(Boolean);

  let result = translated.join(" ");

  // Ensure heading is rendered in English if it was Hebrew-only
  if (heading && /^[\u0590-\u05FF]/.test(heading)) {
    const headingMap = {
      "ספק מקודשת": "Safek betrothed.",
      "חזקה אין אשה מעיזה": "Hazakah: a woman does not act brazenly.",
      "בפני בעלה": "In her husband's presence.",
      "בזמן הזה": "In our time.",
      "אין קידושין תופסין": "Kiddushin do not take effect.",
      "דאיכ' דמסייע לה מעיז'": "Where someone supports her she acts brazenly.",
      "ויש מי שאומר אפי' לא נשאת": "Some say even if she did not marry.",
      "גובא' כתובתה": "She collects her ketubah.",
      "וי\"א דאינה נאמנ' לענין ממון כלל": "Some say she is not believed regarding money at all.",
      "אפילו ע\"א": "Even one witness.",
      "ואפילו עד מפי עד": "And even witness from witness.",
      "אבל פסולי עדות כו'": "But Torah-disqualified witnesses.",
      "חוץ מה' נשים": "Besides the five women.",
      "ואלו הן חמותה": "These are: her mother-in-law.",
      "אפילו אינה עתה חמותה": "Even if she is not now her mother-in-law.",
    };
    for (const [he, en] of Object.entries(headingMap)) {
      if (heading.includes(he) || expandAbbrevs(heading).includes(expandAbbrevs(he))) {
        result = en + " " + result;
        break;
      }
    }
  }

  // Final cleanup: remove duplicate spaces, ensure ends with period
  result = result.replace(/\s+/g, " ").trim();
  if (result && !/[.!?]$/.test(result)) result += ".";

  // Safety: never output garbage patterns
  const forbidden = [/Lord's Prayer/i, /Hashem's Word/i, /Capernaum/i, /thou shalt/i];
  for (const f of forbidden) {
    if (f.test(result)) {
      throw new Error(`Forbidden pattern in ${slug} ${key}`);
    }
  }

  return result;
}

export function buildTranslations(slug, keys) {
  const T = {};
  const he = dump[slug];
  for (const key of keys) {
    if (!he[key]) throw new Error(`Missing Hebrew: ${slug} ${key}`);
    T[key] = translateBlock(he[key], slug, key);
  }
  return T;
}

export function writeDataModule(outPath, T, exportName = "default") {
  const lines = Object.entries(T).map(([k, v]) => {
    const escaped = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    return `  "${k}": \`${escaped}\`,`;
  });
  const body =
    exportName === "default"
      ? `export default {\n${lines.join("\n")}\n};\n`
      : `export const ${exportName} = {\n${lines.join("\n")}\n};\n`;
  fs.writeFileSync(outPath, body, "utf8");
}
