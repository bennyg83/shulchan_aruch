/** Beer HaGolah citation lines — siman 451 (hagalas kelim). */
import { translateCite434 } from "./translate-cite-434.mjs";

const EXACT451 = new Map([
  ["גמרא שם", "Gemara there"],
  ["טור", "Tur"],
  ["ב\"י", "Beit Yosef"],
  ["שם", "there"],
  ["ברייתא שם", "baraita there"],
  ["משנה שם", "Mishnah there"],
  ['טור בשם ר"ת', "Tur in the name of Rabbenu Tam"],
  ['טור בשם הרא"ש', "Tur in the name of the Rosh"],
  ['רמב"ם פ"ה', "Rambam chapter 5"],
  ["מרדכי פ\"כ", "Mordechai chapter 20"],
  ["תוס' שם", "Tosafot there"],
  ["רש\"י שם", "Rashi there"],
]);

export function translateCite451(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT451.has(he)) return EXACT451.get(he);
  return translateCite434(heRaw);
}
