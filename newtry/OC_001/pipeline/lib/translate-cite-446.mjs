/** Beer HaGolah citation lines — siman 446 (chametz found during Pesach). */
import { translateCite434 } from "./translate-cite-434.mjs";

const EXACT446 = new Map([
  ["מימרא דר' פסחים ו'", "Statement of R' [Yehuda], Pesachim 5"],
  ["אורחות חיים", "Orchot Chayim"],
  ['הריב"ש בתשובה בשם הרי"ץ גאות', "Rivash in a responsum in the name of R' Yitzchak Gaon"],
  ["שם בגמרא ז'", "Gemara 7 there"],
]);

export function translateCite446(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT446.has(he)) return EXACT446.get(he);
  return translateCite434(heRaw);
}
