/** Translation maps for siman 056 — imported by _patch-siman-056.mjs */
import { PART1 } from './_patch-siman-056-translations-part1.mjs';
import { PART2 } from './_patch-siman-056-translations-part2.mjs';

function merge(...parts) {
  const out = {};
  for (const p of parts) {
    for (const [slug, blocks] of Object.entries(p)) {
      out[slug] = { ...(out[slug] || {}), ...blocks };
    }
  }
  return out;
}

export const TRANSLATIONS = merge(PART1, PART2);
