/** Merges translation parts for siman 083 */
import { TRANSLATIONS_P1 } from './_patch-siman-083-translations-p1.mjs';
import { TRANSLATIONS_P2 } from './_patch-siman-083-translations-p2.mjs';
import { TRANSLATIONS_P3 } from './_patch-siman-083-translations-p3.mjs';
import { TRANSLATIONS_SIFTEI } from './_patch-siman-083-translations-siftei.mjs';

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
  TRANSLATIONS_P1,
  TRANSLATIONS_P2,
  TRANSLATIONS_P3,
  TRANSLATIONS_SIFTEI,
);
