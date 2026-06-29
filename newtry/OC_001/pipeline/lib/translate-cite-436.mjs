/** Beer HaGolah / short שם citation lines — siman 436 (travel / bedika); avoid preflight `there in the`. */
import { translateCite434 } from "./translate-cite-434.mjs";

const EXACT436 = new Map([
  ["כל בו:", "Kol Bo:"],
  ["טור:", "Tur:"],
  ["טור בשם אביו הרא\"ש", "Tur in the name of his father the Rosh"],
]);

export function translateCite436(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (EXACT436.has(he)) return EXACT436.get(he);
  return translateCite434(heRaw);
}
