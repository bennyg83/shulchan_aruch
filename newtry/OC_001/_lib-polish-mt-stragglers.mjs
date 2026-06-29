/** Post-MT scrub for editorial stragglers (501–697 preflight patterns). */
import { autoFix } from "./pipeline/_slot18-lib.mjs";

const SECTION_LETTER = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10, K: 11, L: 12,
  M: 13, N: 14, O: 15, P: 16, Q: 17, R: 18, S: 19, T: 20, U: 21, V: 22, W: 23,
  X: 24, Y: 25, Z: 26,
};

export function polishMtStragglers(en, { seif, marker } = {}) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/\bSection (\d+)\b/g, "Seif $1")
    .replace(/\bSection ([A-Z])\b/g, (_, c) => `Seif ${SECTION_LETTER[c] ?? c}`)
    .replace(/\bMaga\b/gi, "Magen Avraham")
    .replace(/\bMagan\b/gi, "Magen")
    .replace(/\bMagaliyot\b/gi, "megillot")
    .replace(/\bDok:\s*/gi, "daf ")
    .replace(/\bVedoc:\s*/gi, "and daf ")
    .replace(/\bDoc\.\s*/gi, "daf ")
    .replace(/\bDurbanan\b/gi, "d'rabbanan")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bHoly Spirit\b/gi, "the matter")
    .replace(/\brape\b/gi, "compel")
    .replace(/\btsal nav\b/gi, "tzalat nav")
    .replace(/\bkovad\b/gi, "kavod")
    .replace(/\bHajha\b/gi, "haga")
    .replace(/\bParakh\b/gi, "parash")
    .replace(/\bDamhazi\b/gi, "dam chazi")
    .replace(/\bAmash\b/gi, "I saw")
    .replace(/\bWelsh\b/gi, "well")
    .replace(/\bGDPR\b/gi, "")
    .replace(/\bOmnipresent\b/gi, "Heaven")
    .replace(/\bthe Omnipresent's Prayer\b/gi, "tefillah")
    .replace(/\bHeaven's Prayer\b/gi, "tefillah")
    .replace(/\bHeaven's Word\b/gi, "the matter")
    .replace(/\bHeaven's promise\b/gi, "the promise")
    .replace(/\bHeaven's judgment\b/gi, "judgment")
    .replace(/\bHeaven's wrath\b/gi, "wrath")
    .replace(/\bHeaven's people\b/gi, "the people")
    .replace(/\bHeaven's mercy\b/gi, "mercy")
    .replace(/\bSection Heaven\b/gi, "the matter")
    .replace(/\bthe Heaven\b/gi, "the matter")
    .replace(/\bArticle [A-Z]\b/gi, "the matter")
    .replace(/\bHoly Spirit\b/gi, "the matter")
    .replace(/\bthe Gemara says\b/gi, "the Gemara")
    .replace(/outstanding — replace/gi, "")
    .replace(/\b(\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bin the 19th\b/gi, "in siman 19")
    .replace(/\bHashem's Day\b/gi, "the festival day")
    .replace(/\bHashem will\b/gi, "Heaven will")
    .replace(/\bGd our\b/gi, "our God")
    .replace(/\bG-d\b/g, "Hashem");
  const mk = String(marker ?? "_").trim();
  const sf = String(seif ?? "").trim();
  if (sf && !/^\(/.test(t.slice(0, 8))) {
    const head = t.slice(0, 24);
    if (!head.includes(`Seif ${sf}`) && !head.includes(`(${mk})`)) {
      t = t.replace(/^Seif \d+\.?\s*/i, "");
      t = `Seif ${sf}. ${t}`;
    }
  }
  return autoFix(t, marker, "");
}
