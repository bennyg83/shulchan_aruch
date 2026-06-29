/** Beer HaGolah citation lines — siman 455 (mayim she-lanu). */
import { translateCite454 } from "./translate-cite-454.mjs";

const EXACT455 = new Map([
  ['מימרא דרב יהודה פסחים מ"ב', "Statement of Rav Yehuda, Pesachim 42"],
  ['הרא"ש שם וכ"ב הכ"ב', "The Rosh there, 22, 22"],
  ['רש"י ובעל הלכות גדולות ושאר רוב הפוסקים', "Rashi and Ba'al HaHalachot Gedolot and most of the poskim"],
  ['אורחות חיים:', "Orchot Chayim"],
  ['אורחות חיים בשם הראב"ד', "Orchot Chayim in the name of the Ra'avad"],
  ['בית יוסף', "Beit Yosef"],
  ['סמ"ג בשם ר\' יחיאל וסמ"ק', "Semag in the name of R' Yechiel and Semak"],
  ['טור בשם רוקח ושם כ\' ופלפלין ואיסור התבלין כתב הכל בו בשם הראב"ד', "Tur in the name of Rokeach; there 20; and pepper; and prohibition of spices — he wrote all of it in the name of the Ra'avad"],
  ['תשו\' הרשב"א', "Responsum of the Rashba"],
  ['טור בשם הרי"ב והרי"ץ גאות לפירושו דבמים שלא לנו פליגי וכ"כ הרמב"ם בפ"ה', "Tur in the name of Mahariv and Maharitz Gaon — according to his explanation they disagree regarding water that was not left overnight; and likewise the Rambam in chapter 5"],
  ['טור לפירוש רש"י וכ"כ הרא"ש שם', "Tur according to Rashi's explanation, and likewise the Rosh there"],
  ['טור וב"י', "Tur and Beit Yosef"],
  ['רמב"ם בפ"ה ורא"ש והמרדכי בפ"ג דפסחים מהא דמנחות כ"ג', "Rambam chapter 5, Rosh, and Mordechai end of chapter 3 of Pesachim — from that which is in Menachot 23"],
]);

export function translateCite455(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT455.has(he)) return EXACT455.get(he);
  return translateCite454(heRaw);
}
