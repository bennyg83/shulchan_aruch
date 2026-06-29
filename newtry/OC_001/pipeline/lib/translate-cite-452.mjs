/** Beer HaGolah citation lines — siman 452 (hagalas kelim / time of hagalah). */
import { translateCite451 } from "./translate-cite-451.mjs";

const EXACT452 = new Map([
  ["גמרא שם", "Gemara there"],
  ["טור", "Tur"],
  ['ב"י', "Beit Yosef"],
  ["שם", "there"],
  ["ברייתא שם", "baraita there"],
  ["משנה שם", "Mishnah there"],
  ['טור בשם ר"ת', "Tur in the name of Rabbenu Tam"],
  ['טור בשם הרא"ש', "Tur in the name of the Rosh"],
  ['רמב"ם פ"ה', "Rambam chapter 5"],
  ["מרדכי פ\"כ", "Mordechai chapter 20"],
  ["תוס' שם", "Tosafot there"],
  ['רש"י שם', "Rashi there"],
  ["ב\"י בשם א\"ח", "Beit Yosef in the name of Acharonim"],
  ["ר\"ן פ' כל הבשר", "Ran on chapter Kol HaBasar"],
  ["ת\"ה סי' קל\"א", "Terumat HaDeshen siman 131"],
  ["אגור", "Agur"],
  ["טור בסי' ק\"ה", "Tur siman 105"],
  ["הרא\"ש", "Rosh"],
  ["סמ\"ג", "Semag"],
  [
    'טור בשם אביו הרא"ש בפ"ב דפסחים והמרדכי שם והתוספתא בסוף ע"א',
    "Tur in the name of his father the Rosh in chapter 2 of Pesachim and Mordechai there and Tosefta at end of Avodah Zarah",
  ],
  ['רא"ש שם בת\' ב\' דפסחים', "Rosh there in chapter 2 of Pesachim"],
  ['רשב"א בתשובה', "Rashba in responsum"],
  ['מרדכי בפ"ב דפסחים בשם הרוקח', "Mordechai chapter 2 of Pesachim in the name of Rokeach"],
  ["מצא כתוב בשם ספר האגודה", "Found written in the name of Sefer HaAgudah"],
  ["אורחות חיים", "Orchot Chayyim"],
  ['ע"א ע"י', "Avodah Zarah 76"],
  ['ל\' הרי"ף והרא"ש', "Avodah Zarah 30 — the Rif and the Rosh"],
  ['הרא"ש והמרדכי פ"ב דפסחים', "the Rosh and Mordechai chapter 2 of Pesachim"],
  ['טור בשם תשובת רש"י וש"פ', "Tur in the name of Rashi's responsum and Pesachim"],
  [
    "כדי שלא יחזור ויבלע מה שפלט כבר",
    "so that it not return and absorb what it already expelled",
  ],
]);

export function translateCite452(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT452.has(he)) return EXACT452.get(he);
  return translateCite451(heRaw);
}
