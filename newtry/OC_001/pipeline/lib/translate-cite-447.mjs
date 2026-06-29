/** Beer HaGolah citation lines — siman 447 (chametz ta'aruvot on Pesach). */
import { translateCite444 } from "./translate-cite-444.mjs";

const EXACT447 = new Map([
  ['משנה פסחים מ"ג', "Mishnah Pesachim 43"],
  ["גמרא שם", "Gemara there"],
  ['רמב"ם פ"ד', "Rambam, chapter 4"],
  ['טור בשם הרא"ש', "Tur in the name of the Rosh"],
  ['ב"י', "Beit Yosef"],
  ["שם", "there"],
  ["ברייתא שם", "baraita there"],
  ['טור בשם ר"ת', "Tur in the name of Rabbenu Tam"],
  ["משנה שם", "Mishnah there"],
]);

export function translateCite447(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT447.has(he)) return EXACT447.get(he);
  return translateCite444(heRaw);
}
