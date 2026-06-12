/**
 * NOTE: This module is a placeholder translator used by patch scripts.
 *
 * The authoritative YD001 editorial requirement is a full, accurate translation
 * of the Hebrew into English (no omissions). This implementation currently
 * performs deterministic cleanup only, and must be replaced with real
 * translations to meet editorial quality.
 */
import { applyPhrases } from './_yd001-translate-shared.mjs';

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function translateMechaber(heb) {
  let s = String(heb || '');
  s = s.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => `{Rama: ${applyPhrases(stripHtml(g))}}`);
  s = s.replace(/<small>([\s\S]*?)<\/small>/gi, (_, g) => {
    const t = stripHtml(g).replace(/^הגה\s*/, '');
    return `{Rama: ${applyPhrases(t)}}`;
  });
  return applyPhrases(stripHtml(s));
}

export function translateBlock({ slug, heb }) {
  // Minimal deterministic cleanup; DOES NOT satisfy YD001 translation rules.
  if (slug === 'mechaber') return translateMechaber(heb);
  return applyPhrases(stripHtml(heb));
}

