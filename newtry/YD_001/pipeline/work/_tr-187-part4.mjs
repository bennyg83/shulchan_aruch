/** Siman 187 translations part 4 — chiddushei, tiferet */
import { PART4A } from './_tr-187-part4a.mjs';
import { PART4B } from './_tr-187-part4b.mjs';

function merge(...parts) {
  const out = {};
  for (const p of parts) {
    for (const [slug, keys] of Object.entries(p)) {
      out[slug] = { ...(out[slug] || {}), ...keys };
    }
  }
  return out;
}

export const PART4 = merge(PART4A, PART4B);
