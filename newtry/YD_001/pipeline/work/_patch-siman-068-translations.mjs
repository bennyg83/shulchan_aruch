/** Translation maps for siman 068 — imported by _patch-siman-068.mjs */
import { TRANSLATIONS_PART1 } from './_patch-siman-068-translations-part1.mjs';
import { TRANSLATIONS_PART2 } from './_patch-siman-068-translations-part2.mjs';
import { TRANSLATIONS_PART3 } from './_patch-siman-068-translations-part3.mjs';
import { TRANSLATIONS_PART4 } from './_patch-siman-068-translations-part4.mjs';

function mergeTranslations(...parts) {
  const out = {};
  for (const part of parts) {
    for (const [slug, map] of Object.entries(part)) {
      if (!out[slug]) out[slug] = {};
      Object.assign(out[slug], map);
    }
  }
  return out;
}

export const TRANSLATIONS = mergeTranslations(
  TRANSLATIONS_PART1,
  TRANSLATIONS_PART2,
  TRANSLATIONS_PART3,
  TRANSLATIONS_PART4,
);
