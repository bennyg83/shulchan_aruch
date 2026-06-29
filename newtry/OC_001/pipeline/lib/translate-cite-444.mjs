/** Beer HaGolah / short שם citation lines — siman 444 (Erev Pesach on Shabbat); avoid preflight `there in the`. */
import { translateCite440 } from "./translate-cite-440.mjs";

const EXACT444 = new Map([
  ['רמב"ם בפ"ג', "Rambam, chapter 3 of Hilchot Chametz uMatzah"],
  ['משנה פסחים מ"ת וכר"א בר צדוק וכר"א איש ברתותא בברייתא י"ג', "Mishnah Pesachim 4:9, and R' Elazar bar Tzadok and R' Elazar of Bartuta in the baraita 13"],
  ['טור בשם ר"ת', "Tur in the name of Rabbenu Tam"],
  ['ב"י ולקמן סי\' תע"א:', "Beit Yosef, and below siman 471:"],
  ["טור והמרדכי בשם רש\"י", "Tur and Mordechai in the name of Rashi"],
  ["כל בו בשם רב האי וש\"פ", "Kol Bo in the name of Rav Hai Gaon and Shibolei HaLeket"],
  ["טור בשם תשובת הרא\"ש", "Tur in the name of responsum of the Rosh"],
  ['ב"י', "Beit Yosef"],
  ['משנה מ"ו', "Mishnah 46"],
  ["שם במשנה", "there in the Mishnah"],
  ['שם במשנה וכפי\' הרשב"א', "there in the Mishnah, as Rashba explains"],
  ["שם וכרב יהודה", "there, and Rav Yehuda"],
  ["ברייתא ז' וכדמפרש לה רב אחא בר יעקב שכ.'", "baraita 7, as Rav Acha bar Yaakov explains there"],
  ["משנה פסחים ד'", "Mishnah Pesachim 4"],
  ["גמרא שם", "Gemara there"],
  ["טור בשם הרא\"ש", "Tur in the name of the Rosh"],
  ["שם", "there"],
  ["ברייתא שם", "baraita there"],
  ["מימרא דרב שם", "statement of Rav there"],
]);

export function translateCite444(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT444.has(he)) return EXACT444.get(he);
  return translateCite440(heRaw);
}
