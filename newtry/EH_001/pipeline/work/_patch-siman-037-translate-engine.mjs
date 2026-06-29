#!/usr/bin/env node
/** Siman 037 Hebrew-to-English engine */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dump = JSON.parse(
  fs.readFileSync(path.join(ROOT, "pipeline/work/_siman-037-hebrew-dump.json"), "utf8")
);

const ABBREV = [
  ['ב"י', "Beit Yosef"], ['ב"ש', "Beit Shmuel"], ['ב"ח', "Bach"], ['ב"מ', "Beit Meir"],
  ['ב"ה', "Be'er Heitev"], ['ח"מ', "Choshen Mishpat"], ['ח"צ', "Chacham Tzvi"],
  ['ט"ז', "Taz"], ['טור', "Tur"], ['ש"ך', "Shach"], ['ש"ע', "Shulchan Aruch"],
  ['רמ"א', "Rama"], ['רמב"ם', "Rambam"], ['רמב"ן', "Ramban"], ['רשב"א', "Rashba"],
  ['רש"י', "Rashi"], ['ר"ן', "Ran"], ['ר"י', "R' Yonah"], ['ר"ת', "Rabbenu Tam"],
  ['ריב"ש', "Rivash"], ['ריטב"א', "Ritva"], ['רא"ש', "Rosh"], ['הר"ן', "Ran"],
  ['הר"י', "R' Yehuda"], ['הג"מ', "Maggid Mishneh"], ['הג"ה', "gloss"],
  ['כ"מ', "Knesset HaGedolah"], ['מהרי"ק', "Maharik"], ['מהרי"ל', "Maharil"],
  ['סי\'', "siman"], ['סעי\'', "seif"], ['ס"ק', "s.k."], ['ע"ש', "see there"],
  ['עי\'', "see"], ['עיין', "see"], ['וכו\'', "etc."], ['לפ"ז', "therefore"],
  ['משמע', "it appears"], ['מבואר', "it is clear"], ['כתב', "wrote"], ['כ\'', "wrote"],
  ['פ"ק', "ch. 1"], ['פ"ב', "ch. 2"], ['פ"ג', "ch. 3"], ['פ"ד', "ch. 4"],
  ['פ"ה', "ch. 5"], ['פ"ו', "ch. 6"], ['פ"ז', "ch. 7"], ['פ"ט', "ch. 9"],
  ['ה"א', "halakhah 1"], ['ה"ב', "halakhah 2"], ['ה"ג', "halakhah 3"],
  ['גמ\'', "Gemara"], ['ש"ס', "Talmud"], ['משנה', "Mishnah"], ['ברייתא', "baraita"],
  ['תשו\'', "responsum"], ['דף', "folio"], ['ע"א', "folio a"], ['ע"ב', "folio b"],
  ['קידושין', "kiddushin"], ['גט', "get"], ['כתובה', "ketubah"], ['נערה', "na'arah"],
  ['קטנה', "minor"], ['בוגרת', "bogeret"], ['מיאון', "mi'un"], ['ספק', "safek"],
  ['ודאי', "certainly"], ['דוקא', "specifically"], ['אפילו', "even"], ['אבל', "but"],
  ['וי"א', "and some say"], ['ול"נ', "and it appears to me"], ['צ"ע', "uncertain"],
  ['ל\'', "language of"], ['לשון', "language of"], ['ממשנה', "from Mishnah"],
  ['מימרא', "statement of"], ['מימר\'', "statement of"], ['כמימרא', "as the statement of"],
  ['הרא"ש', "Rosh"], ['הרמ"ה', "RaMAh"], ['הרשב"א', "Rashba"], ['הרמב"ן', "Ramban"],
  ['הראב"ד', "Raavad"], ['הרי"ף', "Rif"], ['הגאון', "the Gaon"], ['השאלתות', "She'iltot"],
  ['מה\'', "Laws of"], ['מה"א', "Laws of Marriage"], ['מה"ג', "Laws of Divorce"],
  ['אישות', "Marriage"], ['כתובות', "Ketubot"], ['יבמות', "Yevamot"], ['נדה', "Niddah"],
  ['ג"ז', "likewise"], ['שם', "there"], ['כן', "thus"], ['כ"כ', "likewise"],
  ['מסקנת', "conclusion of"], ['ממסקנת', "from conclusion of"], ['פירש', "explained"],
  ['פירש"י', "Rashi explained"], ['וכפי\'', "and as explained"], ['וכמ"ש', "and as he wrote"],
  ['עכ"ל', "end quote"], ['נ"ב', "nb"], ['ע"פ', "according to"], ['ע"י', "by means of"],
  ['תוך', "within"], ['כדי דיבור', "within the time of speech"], ['תרווייהו', "both of them"],
  ['מתרווייהו', "from both of them"], ['לכונסה', "to marry her"], ['לאוסרה', "to forbid her"],
  ['נאמן', "he is believed"], ['נאמנת', "she is believed"], ['פסולי עדות', "disqualified witnesses"],
  ['חליצה', "chalitzah"], ['יבם', "yavam"], ['כהונה', "priesthood"], ['אשת איש', "married woman"],
  ['שליח', "agent"], ['שלוחו', "his agent"], ['שליחות', "agency"], ['קבלת', "acceptance of"],
  ['מקודשת', "betrothed"], ['מקדש', "betroths"], ['קדושין', "kiddushin"], ['נשואין', "marriage"],
  ['חופה', "chuppah"], ['ביאה', "bi'ah"], ['נפל', "non-viable infant"], ['חרשת', "deaf-mute"],
  ['שוטה', "insane"], ['אירוסין', "erusin"], ['מציאתה', "her finds"], ['מעשה ידיה', "production of her hands"],
  ['רשות', "authority"], ['בגרה', "she came of age"], ['נערות', "na'aruth"], ['סימנים', "signs"],
  ['מכחישתו', "she contradicts him"], ['הכחישתו', "she contradicted him"], ['חזקת', "presumption of"],
  ['פנויה', "unmarried"], ['יתומה', "orphan"], ['שדך', "matchmaking"], ['שידך', "matchmaking"],
  ['גלות', "exile"], ['נדוניא', "dowry"], ['זיווג', "match"], ['הגה', "gloss"],
  ['הר"ן פ"ק דקדושין', "Ran first chapter Kiddushin"], ['פסקי מהרא"י', "Piskei Maharai"],
  ['ת"ה', "Terumat HaDeshen"], ['כל בו', "Kol Bo"], ['מרדכי', "Mordekhai"], ['א"ז', "Or Zarua"],
  ['ח"מ', "Choshen Mishpat"], ['ח"ה', "Chokhmat Shlomo"], ['ח"ר', "Chiddushei Rashba"],
  ['הח"מ', "Chelkat Mechokek"], ['הב"ש', "Beit Shmuel"], ['הב"ח', "Bach"], ['הטור', "Tur"],
  ['הב"י', "Beit Yosef"], ['הג"מ', "Maggid Mishneh"], ['הר"י ווייל', "Mahari Weil"],
  ['הרדב"ז', "Radbaz"], ['הרשב"ץ', "Rashbatz"], ['הראנ"ח', "Raanach"], ['הרש"ך', "Rashach"],
  ['המהרש"א', "Maharsha"], ['המהרי"ק', "Maharik"], ['הריב"ש', "Rivash"], ['הרשב"א', "Rashba"],
  ['הר"ן', "Ran"], ['הרמ"א', "Rama"], ['הרמב"ם', "Rambam"], ['הרמב"ן', "Ramban"],
  ['הרא"ש', "Rosh"], ['הראב"ד', "Raavad"], ['הרי"ף', "Rif"], ['הגאון', "the Gaon"],
  ['הש"ע', "Shulchan Aruch"], ['הש"ך', "Shach"], ['הט"ז', "Taz"], ['הב"ה', "Be'er Heitev"],
  ['עבה"ט', "Be'er Heitev"], ['עח"מ', "Chelkat Mechokek"], ['מל"מ', "Magen Avraham on Rambam"],
  ['שעה"מ', "Kesef Mishneh"], ['פ"ת', "Pitchei Teshuva"], ['נ"צ', "Nekudot HaKesef"],
  ['ב"ד', "beit din"], ['עדים', "witnesses"], ['ע"א', "one witness"], ['ע"ת', "on condition"],
  ['לע"ד', "in my view"], ['נלע"ד', "in my humble view"], ['ק"ק', "question"],
  ['תירץ', "answered"], ['פלוגת', "dispute"], ['חולק', "disputes"], ['פסק', "ruled"],
  ['הכריע', "decided"], ['מחלק', "distinguishes"], ['מקשה', "challenges"], ['משני', "answers"],
  ['בעינן', "we require"], ['אצ"ל', "all the more so"], ['ממילא', "automatically"],
  ['נהי', "although"], ['אכתי', "still"], ['מיהו', "however"], ['אמנם', "however"],
  ['כלומר', "meaning"], ['ר"ל', "meaning"], ['היינו', "meaning"], ['דהא', "for behold"],
  ['דהיינו', "meaning"], ['ש"מ', "we learn"], ['לפ"ז', "therefore"], ['מ"מ', "nevertheless"],
  ['שמא', "perhaps"], ['בדיעבד', "bedieved"], ['לכתחילה', "ab initio"], ['לחומרא', "stringently"],
  ['לקולא', "leniently"], ['עיקר', "essential ruling"], ['סתם', "plainly"],
];

export function stripHtml(h) {
  return String(h ?? "")
    .replace(/<b>(.*?)<\/b>/gi, "$1")
    .replace(/<[^>]+>/g, " ")
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

/** Translate Be'er HaGolah / Beur HaGra citation blocks */
export function translateCitation(hebrew) {
  let h = expandAbbrevs(stripHtml(hebrew));
  // Common patterns
  const patterns = [
    [/^language of Rambam in ch\. (\d+) of Laws of Marriage from Mishnah Kiddushin folio (\d+)a, and as Rashi explained there\.?$/i,
     (m) => `Rambam's language in ch. ${m[1]} of Laws of Marriage from Mishnah Kiddushin folio ${m[2]}a, and as Rashi explained there.`],
  ];
  // Manual map for beer-hagolah keys
  return h
    .replace(/^language of Rambam in ch\. 9 of Laws of Marriage from Mishnah Kiddushin folio 41a, and as Rashi explained there\.?$/i,
      "Rambam's language in ch. 9 of Laws of Marriage from Mishnah Kiddushin 41a, and as Rashi explained there.")
    .replace(/^from Mishnah Ketubot folio 46b\.?$/i, "From Mishnah Ketubot 46b.")
    .replace(/^thus it appears in several places and in Yerushalmi ch\. 7 of Kiddushin ch\. 1.*Mishnah there 62b\.?$/i,
      "Thus it appears in several places and in Yerushalmi ch. 7 of Kiddushin ch. 1 \"If your wife bore a female\" etc., Mishnah there 62b.")
    .replace(/^from Mishnah Yevamot 112\.?$/i, "From Mishnah Yevamot 112.")
    .replace(/^from Mishnah Niddah folio 44a\.?$/i, "From Mishnah Niddah 44a.")
    .replace(/^likewise there and it is explained in several places and in Laws of Kiddushin folio 79a\.?$/i,
      "Likewise there, and it is explained in several places and in Kiddushin 79a.")
    .replace(/^likewise there, from Mishnah Ketubot folio 43b\.?$/i, "Likewise there, from Mishnah Ketubot 43b.")
    .replace(/^from this.*Ravina does not hold like Rav and Shmuel.*Kiddushin folio 76a.*see below seif 11\.?$/i,
      "From this Ravina wrote that he does not hold like Rav and Shmuel etc., Kiddushin 76a; and see below seif 11.")
    .replace(/^as the statement of Rav and as they establish it in the Gemara there folio 79a\.?$/i,
      "As the statement of Rav, and as they establish it in the Gemara there 79a.")
    .replace(/^Rosh there from the conclusion of the Gemara there, like Rav\.?$/i,
      "Rosh there from the conclusion of the Gemara there, like Rav.")
    .replace(/^Tur in the name of RaMAh, and as he wrote his reason according to the explanation there\.?$/i,
      "Tur in the name of RaMAh, and as he wrote his reason according to the explanation there.")
    .replace(/^plain in the Gemara there\.?$/i, "Plain in the Gemara there.")
    .replace(/^Mishnah there ch\. 4 folio 41a\.?$/i, "Mishnah there ch. 4, 41a.")
    .replace(/^there in the name of RaMAh\.?$/i, "There in the name of RaMAh.")
    .replace(/^from this.*Rav and Shmuel.*Kiddushin folio 59a\.?$/i, "From this Rav and Shmuel, Kiddushin 59a.")
    .replace(/^there in the Mishnah\.?$/i, "There in the Mishnah.")
    .replace(/^baraita there\.?$/i, "Baraita there.")
    .replace(/^there in the baraita\.?$/i, "There in the baraita.")
    .replace(/^Tur\.?$/i, "Tur.")
    .replace(/^Rambam there\.?$/i, "Rambam there.")
    .replace(/^there in the Mishnah and like R' Yosi\.?$/i, "There in the Mishnah, like R' Yosi.")
    .replace(/^likewise there in the Mishnah and like R' Yosi\.?$/i, "Likewise there in the Mishnah, like R' Yosi.")
    .replace(/^baraita there folio 52a\.?$/i, "Baraita there 52a.")
    .replace(/^Mishnah and Gemara there folio 63b\.?$/i, "Mishnah and Gemara there 63b.")
    .replace(/^Mishnah there folio 64a\.?$/i, "Mishnah there 64a.")
    .replace(/^Ran there, and likewise Ri'az\.?$/i, "Ran there, and likewise Ri'az.")
    .replace(/^Tur in the name of She'iltot\.?$/i, "Tur in the name of She'iltot.")
    .replace(/^there in the name of Tosafot from the words of his father Rosh in his rulings there\.?$/i,
      "There in the name of Tosafot from the words of his father Rosh in his rulings there.")
    .replace(/^Mishnah Kiddushin folio 64b, and as explained in the Gemara there\.?$/i,
      "Mishnah Kiddushin 64b, and as explained in the Gemara there.")
    .replace(/^Rashba in responsum from the incident of that woman.*Ketubot folio 22a\.?$/i,
      "Rashba in responsum from the incident of that woman etc., Ketubot 22a.");
}

export function getHebrew(slug, key) {
  const e = dump[slug]?.[key];
  if (!e) throw new Error(`Missing Hebrew: ${slug} ${key}`);
  return e.he;
}

export { dump };
