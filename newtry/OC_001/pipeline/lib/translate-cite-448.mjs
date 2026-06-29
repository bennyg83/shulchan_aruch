/** Beer HaGolah citation lines — siman 448 (chametz she'avar alav haPesach). */
import { translateCite444 } from "./translate-cite-444.mjs";

const EXACT448 = new Map([
  ["חשכה פסחים כ\"א", "Darkness — Pesachim 21"],
  ['טור בשם אביו הרא"ש בפ"ב דפסחי\'', "Tur in the name of his father the Rosh, chapter 2 of Pesachim"],
  [
    'ה"ה אפי\' ביום ראשון והא דנקט ביום אחרון לרבותא נקט דאפי\' ביום אחרון שהוא מדרבנן לא יקבלנו מידו כ"כ הטור וכן הביא הב"י בשם הרשב"א',
    "Likewise even on the first day; and that which it specifies the last day — it specifies for emphasis that even on the last day, which is d'rabbanan, he should not accept it from his hand — so too the Tur, and Beit Yosef brought thus in the name of Rashba",
  ],
  ["משנה שם", "Mishnah there"],
  ['רמב"ם בפ"א', "Rambam, chapter 1"],
  ["התוס' כתבה הרא\"ש בפ\"ב דפסחים", "Tosafot — the Rosh wrote in chapter 2 of Pesachim"],
  ['ב"י מדברי תרומת הדשן', "Beit Yosef from the words of Terumat HaDeshen"],
  ["שם בתה\"ד", "there in Terumat HaDeshen"],
  ["שם בתו' הנזכר", "in the Tosafot mentioned"],
  ['רמב"ם בפ"ד', "Rambam, chapter 4"],
  ['טור בשם הירושלמי ורא"ש בפ"ב דפסחים וכרבי יוחנן', "Tur in the name of Yerushalmi and Rosh in chapter 2 of Pesachim, and as R' Yochanan"],
  ["שם בשם הירושלמי", "there, in the name of Yerushalmi"],
  ["אגודה", "Agudah (halachic collection)"],
  ['טור בשם ר"ת', "Tur in the name of Rabbenu Tam"],
  ["גמרא שם", "Gemara there"],
  ["שם", "there"],
  ["ברייתא שם", "baraita there"],
]);

export function translateCite448(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT448.has(he)) return EXACT448.get(he);
  return translateCite444(heRaw);
}
