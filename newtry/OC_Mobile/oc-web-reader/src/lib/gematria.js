/**
 * Hebrew numerals (gematria) for siman / seif display, e.g. 253 → רנ"ג
 */

const ONES = [
  [9, "ט"],
  [8, "ח"],
  [7, "ז"],
  [6, "ו"],
  [5, "ה"],
  [4, "ד"],
  [3, "ג"],
  [2, "ב"],
  [1, "א"],
];
const TENS = [
  [90, "צ"],
  [80, "פ"],
  [70, "ע"],
  [60, "ס"],
  [50, "נ"],
  [40, "מ"],
  [30, "ל"],
  [20, "כ"],
  [10, "י"],
];
const HUNDREDS = [
  [400, "ת"],
  [300, "ש"],
  [200, "ר"],
  [100, "ק"],
];

function consume(n, table) {
  let rest = n;
  let out = "";
  while (rest > 0) {
    let hit = false;
    for (const [value, letter] of table) {
      if (rest >= value) {
        out += letter;
        rest -= value;
        hit = true;
        break;
      }
    }
    if (!hit) break;
  }
  return { out, rest };
}

/** Build letter string without gershayim; applies טו/טז for 15/16. */
export function numberToGematriaLetters(n) {
  const num = Math.floor(Number(n));
  if (!Number.isFinite(num) || num <= 0) return "";
  if (num > 9999) return String(num);

  let rest = num;
  let out = "";

  const h = consume(rest, HUNDREDS);
  out += h.out;
  rest = h.rest;
  const t = consume(rest, TENS);
  out += t.out;
  rest = t.rest;
  const o = consume(rest, ONES);
  out += o.out;

  if (out.endsWith("יה")) out = out.slice(0, -2) + "טו";
  if (out.endsWith("יו")) out = out.slice(0, -2) + "טז";

  return out;
}

/** Letters with gershayim (U+05F4) before the last character when length > 1. */
export function formatGematria(n) {
  const letters = numberToGematriaLetters(n);
  if (!letters) return "";
  if (letters.length === 1) return letters;
  return letters.slice(0, -1) + "\u05F4" + letters.slice(-1);
}
