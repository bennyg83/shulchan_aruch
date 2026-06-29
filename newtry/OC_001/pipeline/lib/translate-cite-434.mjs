/** Beer HaGolah / short שם citation lines — siman 434 (bitul chametz); avoid preflight `there in the`. */
import { translateCite433 } from "./translate-cite-433.mjs";

const EXACT434 = new Map([
  ["משנה פסחים ח' וכדמפרש לה רבא דרב פפי שם", "Mishnah Pesachim 8, as Rava explains for Rav Pappi there"],
  ["בירושלמי כתבו' הרא\"ש שם:", "In Yerushalmi the Rosh wrote there:"],
  ["מימרא דרבי יהודה שם ז' הרי\"ף דהרא\"ש שם", "Statement of R' Yehuda there 7; Rif, and the Rosh there"],
  ["טור בשם אביו הרא\"ש", "Tur in the name of his father the Rosh"],
  ["טור בשם הרב רבי פרץ וכ\"כ' רבי' ירוחם:", "Tur in the name of Rabbeinu Peretz, and likewise Rabbeinu Yerucham:"],
  ["שם וכ\"כ ה\"ה בפ\"ב בשם בעל העיטור", "there, and likewise in chapter 2 in the name of Baal HaItur"],
  ["כל בו:", "See Kol Bo."],
  ["(ס\"ק ג) א\"צ כו' ס\"ס תל\"ט ס\"ק ו' בשם התוס':", "(s.k. 3) Not required etc.; see siman 439 s.k. 6 in the name of Tosafot"],
]);

export function translateCite434(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT434.has(he)) return EXACT434.get(he);
  return translateCite433(heRaw);
}
