/** Translation maps for siman 070 — imported by _patch-siman-070.mjs */
import { TRANSLATIONS_P1 } from './_patch-siman-070-translations-p1.mjs';
import { TRANSLATIONS_P2 } from './_patch-siman-070-translations-p2.mjs';
import { TRANSLATIONS_P3 } from './_patch-siman-070-translations-p3.mjs';
import { TRANSLATIONS_P4 } from './_patch-siman-070-translations-p4.mjs';
import { TRANSLATIONS_P5 } from './_patch-siman-070-translations-p5.mjs';

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
  TRANSLATIONS_P4,
  TRANSLATIONS_P5,
);
