/** Beer HaGolah / short שם citation lines — siman 450 (Jew/non-Jew partnership); avoid preflight `there in the`. */
import { translateCite434 } from "./translate-cite-434.mjs";

const EXACT450 = new Map([
  ["ברייתא פסחים כ\"א", "baraita Pesachim 21"],
  ["גמרא שם", "Gemara there"],
  ["טור", "Tur"],
  ["ב\"י", "Beit Yosef"],
  ["רמב\"ם פ\"ה", "Rambam chapter 5"],
  ["ר\"ן פ\"א", "Ran chapter 1"],
  ["רש\"י שם", "Rashi there"],
  ["תוס' שם", "Tosafot there"],
  ["מרדכי פ\"כ", "Mordechai chapter 20"],
  ["טור בשם רש\"י ובשאר פוסקים מהא דבי ר' ינאי ס\"א ע\"ב", "Tur in the name of Rashi, and the rest of the poskim from what is in Beit Rabbi Yannai 61b"],
  ["טור בשם אבי העזרי", "Tur in the name of Avi HaEzri"],
  ["שם בשם תשובת רש\"י:", "Tur in the name of responsum of Rashi:"],
  ["טור בשם רשב\"א ושם מפורש שהביאו לו אחה\"פ", "Tur in the name of Rashba, and there it is explicit that they brought it to him after Pesach"],
  ["שם ועיין לעיל סוף סי' תמ\"ג", "there; and see above at the end of siman 443"],
  ["שם ממשנה ריש פרק ה' דע\"א", "there from Mishnah at the beginning of chapter 5 of Avodah Zarah"],
  ["טור והמרדכי בפרק ב' דפסחים", "Tur and Mordechai in chapter 2 of Pesachim"],
  ["מהא דע\"א ס\"ג", "from what is in Avodah Zarah 63"],
  ["שם במרדכי", "there in Mordechai"],
  ["טור מפני שרוצה בקיומו של איסור שלא יבקע הכלי", "Tur, because he wants the existence of the prohibition so the vessel will not crack"],
  ["שם בשם התוס'", "Tur in the name of Tosafot"],
]);

export function translateCite450(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT450.has(he)) return EXACT450.get(he);
  return translateCite434(heRaw);
}
