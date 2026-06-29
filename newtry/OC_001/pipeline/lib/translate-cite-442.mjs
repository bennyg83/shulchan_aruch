/** Beer HaGolah / short שם citation lines — siman 442 (ta'aruvot chametz); avoid preflight `there in the`. */
import { translateCite434 } from "./translate-cite-434.mjs";

const EXACT442 = new Map([
  ['משנה פסחים מ"ב וכר\' אליעזר עור בשם הרמב"ם:', "Mishnah Pesachim 42, per R' Eliezer — hide, in the name of Rambam:"],
  ["בריית' שם מ\"ה כר' נתן", "Baraita there 45, per R' Natan"],
  ['תוספת כתבה הרי"ף שם וטור בשם בעל העיטור וכ"כ הרמב"ם בפרק', "Tosefta — the Rif wrote there, and Tur in the name of Baal HaItur, and likewise Rambam in the chapter"],
  ['ברייתא שם דף מ"ה', "Baraita there daf 45"],
  ["תוספות שם וש\"פ", "Tosafot there and end of chapter"],
  ['טור בשם רמב"ם ושם', "Tur in the name of Rambam, and there"],
  ["שם ושם", "there, and there"],
  ['הרא"ש בשם ר"ת פ"ג דפסחים', "Rosh in the name of Rabbeinu Tam, chapter 3 of Pesachim"],
  ['טור בשם ראב"ן על פי סמך מן הירוש\'', "Tur in the name of Raavan based on a support from Yerushalmi"],
  ['משנה שם דף מ"ה ולישנא בתר\' דרב יהודה הרי"ף ורמב"ם בפרק ב\'', "Mishnah there daf 45, and the wording after R' Yehuda — Rif and Rambam in chapter 2"],
  ["שם מימרא דשמואל", "there — statement of Shmuel"],
  ["בעיא שם ולא נפשטא", "question there, and it was not resolved"],
  ['רמב"ם בפ"ב וטור בשם בעל העיטור ואביו הרא"ש', "Rambam in chapter 2, and Tur in the name of Baal HaItur and his father the Rosh"],
  ["ברייתא שם:", "Baraita there:"],
  ["תרומת הדשן", "Terumat HaDeshen"],
  ['טור בשם רבי יחיאל מפרי\'ש', "Tur in the name of R' Yechiel of Paris"],
  ["רוקח:", "Rokeach:"],
]);

export function translateCite442(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT442.has(he)) return EXACT442.get(he);
  return translateCite434(heRaw);
}
