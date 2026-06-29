/** Beer HaGolah citation lines — siman 443 (chametz hours erev Pesach). */
import { translateCite434 } from "./translate-cite-434.mjs";

const EXACT443 = new Map([
  ["בריית' פסחי' כ\"ח וכר' יהוד' טור בשם הרמב\"ם בפ\"א והרא\"ש וש\"פ", "Baraita Pesachim 28 and R' Yehuda; Tur in the name of Rambam chapter 1, the Rosh, and Shaar HaPesukim"],
  ["משנה דף י\"א וכר' יהודה גמרא שם", "Mishnah daf 11 and R' Yehuda — Gemara there"],
  ["משנה דף כ\"א ובגמרא שם", "Mishnah daf 21 and in the Gemara there"],
  ["ברייתא שם וכב\"ה", "Baraita there and Bach"],
  ["שם במשנה", "Mishnah there"],
  ["כן פי' הרא\"ש שם", "so explained the Rosh there"],
  ["שם בגמרא:", "Gemara there:"],
  ["שם י\"ג בעובד' דיוחנן חקוקא", "there 13 in the matter of Yochanan Chakuka"],
  ['טור בשם ר"ת במעשה דשפחה עכו"ם אחת ותוספות בחולין ד"ד:', "Tur in the name of Rabbenu Tam in the matter of a certain non-Jewish maidservant, and Tosafot Chullin daf 4:"],
]);

export function translateCite443(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT443.has(he)) return EXACT443.get(he);
  return translateCite434(heRaw);
}
