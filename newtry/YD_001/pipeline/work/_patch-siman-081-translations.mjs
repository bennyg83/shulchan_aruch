/** Translation maps for siman 081 — merged from parts */
import { TRANSLATIONS_P1 } from './_patch-siman-081-translations-p1.mjs';
import { TRANSLATIONS_P2A } from './_patch-siman-081-translations-p2a.mjs';
import { TRANSLATIONS_P2B } from './_patch-siman-081-translations-p2b.mjs';

export const TRANSLATIONS = {
  ...TRANSLATIONS_P1,
  ...TRANSLATIONS_P2A,
  ...TRANSLATIONS_P2B,
};
