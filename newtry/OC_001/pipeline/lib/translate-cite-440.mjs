/** Beer HaGolah / short שם citation lines — siman 440 (non-Jew's chametz deposited); avoid preflight `there in the`. */
import { translateCite434 } from "./translate-cite-434.mjs";

const EXACT440 = new Map([
  ["ברייתא וגמרא פסחים ה'", "Baraita and Gemara Pesachim 5"],
  ['טור בשם בה"ג והרא"ש', "Tur in the name of Beit HaGadol and the Rosh"],
  ['שם בשם רמב"ם בפ"ד מהל\' חמץ ומצה', "in the name of Rambam, chapter 4 of Hilchot Chametz uMatzah"],
  ["שם בברייתא וגמרא", "in the baraita and Gemara"],
  ["מימרא דרב שם ו'", "statement of Rav there 6"],
  ["ברייתא שם", "baraita there"],
  ['הרשב"א בתשובה', "Rashba in a responsum"],
  ['טור בשם ר"י והרא"ש והרמב"ם.', "Tur in the name of R' Yitzchak, the Rosh, and Rambam."],
]);

export function translateCite440(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT440.has(he)) return EXACT440.get(he);
  return translateCite434(heRaw);
}
