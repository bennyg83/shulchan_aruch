import { TRANSLATIONS_P1 } from './_patch-siman-073-translations-p1.mjs';
import { TRANSLATIONS_P2 } from './_patch-siman-073-translations-p2.mjs';

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

export const TRANSLATIONS = mergeTranslations(TRANSLATIONS_P1, TRANSLATIONS_P2);
