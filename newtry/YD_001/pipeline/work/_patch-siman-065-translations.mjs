/** Translation maps for siman 065 — imported by _patch-siman-065.mjs */
import { TRANSLATIONS_PART1 } from './_patch-siman-065-translations-part1.mjs';
import { TRANSLATIONS_PART2 } from './_patch-siman-065-translations-part2.mjs';
import { TRANSLATIONS_PART3 } from './_patch-siman-065-translations-part3.mjs';

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
);
