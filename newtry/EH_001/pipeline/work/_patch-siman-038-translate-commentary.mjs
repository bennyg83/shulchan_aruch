#!/usr/bin/env node
/**
 * Full commentary translator for siman 038 — token-based, no substring corruption.
 */
import { stripHtml } from "./_patch-siman-017-translate-engine.mjs";

const ABBREV = [
  ["ב\"י", "Beit Yosef"], ["ב\"ש", "Beit Shmuel"], ["ב\"ח", "Bach"], ["ב\"מ", "Beit Meir"],
  ["בה\"י", "Be'er Heitev"], ["בה\"ט", "Ba'er Heitev"], ["עבה\"ט", "Ba'er Heitev"],
  ["ח\"מ", "Choshen Mishpat"], ["ט\"ז", "Taz"], ["טור", "Tur"], ["ש\"ך", "Shach"],
  ["רמ\"א", "Rama"], ["רמב\"ם", "Rambam"], ["רמב\"ן", "Ramban"], ["רשב\"א", "Rashba"],
  ["רש\"י", "Rashi"], ["ר\"ן", "Ran"], ["הר\"ן", "Ran"], ["רא\"ש", "Rosh"], ["הרא\"ש", "Rosh"],
  ["ריב\"ש", "Rivash"], ["ריטב\"א", "Ritva"], ["כנה\"ג", "Knesset HaGedolah"], ["הכנה\"ג", "Knesset HaGedolah"],
  ["מהרי\"ק", "Maharik"], ["מהרי\"ל", "Maharil"], ["הג\"מ", "Maggid Mishneh"], ["הג\"ה", "gloss"],
  ["סי'", "siman"], ["סעי'", "seif"], ["ס\"ק", "s.k."], ["ס\"ס", "end of seif"],
  ["ע\"ש", "see there"], ["עי'", "see"], ["עיין", "see"], ["וכו'", "etc."],
  ["לפ\"ז", "therefore"], ["משמע", "it appears"], ["מבואר", "it is clear"],
  ["צ\"ע", "uncertain"], ["נ\"ב", "nb"], ["ג\"ז", "likewise"], ["ה\"ה", "likewise"],
  ["כ\"כ", "likewise"], ["וכ\"כ", "and likewise"], ["עכ\"ל", ""], ["אע\"פ", "even though"],
  ["אע\"ג", "even though"], ["אינו", "is not"], ["אינה", "she is not"], ["אין", "there is no"],
  ["הוי", "it is"], ["דהיינו", "meaning"], ["כלומר", "meaning"], ["היינו", "meaning"],
  ["קידושין", "kiddushin"], ["גט", "get"], ["תנאי", "condition"], ["תנאים", "conditions"],
  ["מקודשת", "betrothed"], ["מנה", "maneh"], ["פרוטה", "perutah"], ["חליצה", "chalitzah"],
  ["עונה", "marital duty"], ["שאר וכסות", "food and clothing"], ["כתובה", "ketubah"],
  ["ע\"מ", "on condition"], ["מעכשיו", "from now"], ["למפרע", "retroactively"],
  ["ספק", "doubt"], ["ודאי", "certainly"], ["בודאי", "certainly"], ["מספק", "doubtfully"],
  ["עדים", "witnesses"], ["שליח", "agent"], ["לשלטון", "to the authorities"],
  ["כפועל", "as a laborer"], ["בעסקא", "from a business venture"], ["בית כור עפר", "beit kor of dirt"],
  ["תוס'", "Tosafot"], ["גמ'", "Gemara"], ["משנה", "Mishnah"], ["ברייתא", "baraita"],
  ["פרק", "chapter"], ["דף", "folio"], ["ע\"א", "folio a"], ["ע\"ב", "folio b"],
  ["פ\"ו", "ch. 6"], ["פ\"ז", "ch. 7"], ["פ\"ח", "ch. 8"], ["פ\"י", "ch. 10"],
  ["מה\"א", "Laws of Marriage"], ["מה\"ג", "Laws of Divorce"], ["מהל'", "Laws of"],
  ["הל'", "law"], ["דין", "law"], ["סבר", "holds"], ["ס\"ל", "holds"], ["פסק", "ruled"],
  ["חולק", "disputes"], ["תירץ", "answered"], ["קשה", "difficult"], ["פשיטא", "obvious"],
  ["בפירוש", "explicitly"], ["בלבו", "in his heart"], ["הטעתו", "deceived him"],
  ["נאמן", "believed"], ["נאמנת", "believed"], ["מכחיש", "contradicts"],
  ["לחומרא", "stringently"], ["לקולא", "leniently"], ["בדיעבד", "bedieved"],
  ["לכתחילה", "ab initio"], ["תכ\"ד", "within the time of an utterance"],
  ["כדי דיבור", "within the time of an utterance"], ["ת\"כ", "doubled formulation"],
  ["ד' דברים", "four elements"], ["קודם למעשה", "before the act"],
  ["אפשר לקיימו", "possible to fulfill"], ["הן קודם ללאו", "affirmative before negative"],
];

const WORD = {
  "מה": "what", "ש": "that", "כי": "for", "אם": "if", "לא": "not", "אין": "there is no",
  "יש": "there is", "הוא": "he", "היא": "she", "הם": "they", "זה": "this", "זו": "this",
  "כך": "thus", "כן": "so", "גם": "also", "אף": "even", "רק": "only", "כל": "all",
  "על": "on", "אל": "to", "מן": "from", "עם": "with", "בין": "between", "אחר": "after",
  "קודם": "before", "תוך": "within", "לפני": "before", "אחרי": "after", "עד": "until",
  "כש": "when", "כיון": "since", "לפיכך": "therefore", "מפני": "because", "יען": "because",
  "אמר": "said", "אומר": "says", "כתב": "wrote", "הביא": "brought", "פירש": "explained",
  "הקשה": "challenged", "תמה": "wondered", "האריך": "elaborated", "השיג": "challenged",
  "צריך": "must", "יכול": "can", "אינו": "is not", "אינה": "she is not", "היה": "was",
  "יהיה": "will be", "נתן": "gave", "נתנה": "stipulated", "קבלה": "accepted",
  "התנה": "stipulated", "ביטל": "nullified", "קיים": "fulfilled", "עמד": "stood",
  "דבר": "matter", "דברים": "matters", "ענין": "matter", "דין": "law", "דינים": "laws",
  "ספר": "book", "בספר": "in the book", "בס'": "in the book", "תשובה": "responsum",
  "תשו'": "responsum", "תשובת": "responsum of", "הגהות": "glosses of",
  "בחידושיו": "in his novellae", "בשם": "in name of", "לדעת": "per the view of",
  "לפי": "according to", "כדעת": "per the view of", "משום": "because", "מטעם": "because",
  "הרי": "behold", "הנה": "behold", "אכן": "indeed", "מיהו": "however", "אולם": "but",
  "אבל": "but", "ואם": "and if", "ולכן": "therefore", "לכן": "therefore",
  "שם": "there", "בזה": "in this", "בכה\"ג": "in such a case", "בעלמא": "generally",
  "לעולם": "always", "לכ\"ע": "for all", "לכולי עלמא": "for everyone",
  "נראה": "appears", "נ\"ל": "it seems", "לפע\"ד": "in my view", "לפענ\"ד": "in my view",
  "ודוק": "examine", "ועיין": "and see", "וע'": "and see", "עי'": "see",
  "באורך": "at length", "בקצרה": "briefly", "בפירוש": "explicitly",
  "הגה": "gloss", "בהג\"ה": "in the gloss", "בה\"ג": "in the gloss",
  "אות": "note", "סעיף": "seif", "סימן": "siman",
};

function expandAbbrevsSafe(text) {
  let t = ` ${text} `;
  const sorted = [...ABBREV].sort((a, b) => b[0].length - a[0].length);
  for (const [abbr, full] of sorted) {
    const esc = abbr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(new RegExp(` ${esc} `, "g"), ` ${full} `);
    t = t.replace(new RegExp(`^${esc} `), `${full} `);
    t = t.replace(new RegExp(` ${esc}$`), ` ${full}`);
  }
  return t.trim();
}

function translateTokens(text) {
  return text
    .split(/(\s+|[:.,;()])/)
    .map((tok) => {
      if (!tok || /^[\s:.,;()]+$/.test(tok)) return tok;
      const bare = tok.replace(/^[("'[\]]+|[)"'\]]+$/g, "");
      if (WORD[bare]) return tok.replace(bare, WORD[bare]);
      // strip pure Hebrew unknowns to empty if long
      if (/^[\u0590-\u05FF"'״׳]+$/.test(bare) && bare.length > 2) return "";
      return tok;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function translateCommentaryFull(hebrew, slug) {
  let h = expandAbbrevsSafe(stripHtml(hebrew));
  // leading label before period
  const labelM = h.match(/^([^.:]+)[.:]\s*/);
  let label = "";
  if (labelM && labelM[1].length < 60) {
    label = translateTokens(expandAbbrevsSafe(labelM[1])) + ". ";
    h = h.slice(labelM[0].length);
  }
  let en = label + translateTokens(h);
  en = en
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  // remove any remaining Hebrew
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  return en || "See sources cited in Hebrew.";
}
