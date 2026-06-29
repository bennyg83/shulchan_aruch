/** Beer HaGolah citation lines — siman 453 (wheat / matzah / kitniyot). */
import { translateCite452 } from "./translate-cite-452.mjs";

const EXACT453 = new Map([
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
  ['הגהות מיימוני פ"ה', "Hagahot Maimoniot chapter 5"],
  ["מרדכי פ' כל שעה", "Mordechai on chapter Kol Sha'ah"],
  ['ת"ה סימן קי"ג', "Terumat HaDeshen siman 113"],
  ['ת"ה סימן קי"ד', "Terumat HaDeshen siman 114"],
  ['סמ"ק', "Sma\"k"],
  ["מהרי\"ל", "Maharil"],
  ['מרדכי ס"פ אלו עוברין', "Mordechai on end of Elu Overin"],
  ["אורחות חיים", "Orchot Chayyim"],
]);

export function translateCite453(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT453.has(he)) return EXACT453.get(he);
  return translateCite452(heRaw);
}
