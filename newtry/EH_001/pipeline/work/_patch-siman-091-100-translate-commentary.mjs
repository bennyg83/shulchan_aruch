#!/usr/bin/env node
/** Commentary translator for simanim 091–100 — extends 071–075 with property/widow/ketubah terms. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentary as baseTranslate } from "./_patch-siman-038-eh-translate.mjs";
import { translateCommentaryFull as base71 } from "./_patch-siman-071-075-translate-commentary.mjs";

const EXTRA91 = [
  ["שטר חוב", "promissory note"], ["מלוה על פה", "oral loan"], ["ידו כידה", "his hand is like hers"],
  ["הוי כלוקח", "is considered like a buyer"], ["נכסי לך ואחריך", "my property is yours and after you to so-and-so"],
  ["סבלונות", "gifts to betrothed"], ["דינם כמלוה בשטר", "their law is like a promissory loan"],
  ["דין ודברים אין לי בנכסיך", "I have no legal claim in your property"],
  ["סילק עצמו", "removed himself"], ["פירי פירות", "produce of produce"],
  ["מזונות האלמנה", "widow's sustenance"], ["ניזונית", "she is sustained"], ["ספק גירושין", "doubtful divorce"],
  ["מכרה כתובתה", "she sold her ketubah"], ["מחלה כתובתה", "she waived her ketubah"],
  ["תבעה כתובתה", "she claimed her ketubah"], ["מיגר אלמנותה", "duration of her widowhood"],
  ["מעשה ידיה", "her handiwork"], ["שבועות אלמנה", "widow's oaths"], ["נקיטת חפץ", "holding a sacred object"],
  ["פטרה משבועה", "he exempted her from oath"], ["נדר ושבועה אין לי עליך", "I have no vow or oath upon you"],
  ["עיקר כתובה", "principal ketubah"], ["מתקנת הגאונים", "enactment of the Geonim"],
  ["הזיבורית", "inferior land"], ["המוחזק", "what is possessed"], ["הראוי", "what is due"],
  ["תקנת השוק", "market enactment"], ["נכסי צאן ברזל", "iron-flock property"],
  ["שמין בגדיה", "they appraise her garments"], ["חלוצה", "chalutzah"],
  ["גובה כתובתה", "she collects her ketubah"], ["טורפת", "she seizes"],
];

function applyExtra91(text) {
  let t = text;
  const sorted = [...EXTRA91].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

const FORBIDDEN = [
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Capernaum/i, /MYMEMORY/i,
];

function clean(en) {
  en = String(en ?? "")
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  return en;
}

export function translateCommentaryFull(hebrew, slug) {
  if (slug === "pitchei-teshuva") {
    return base71(hebrew, slug);
  }
  let en = base71(hebrew, slug);
  en = clean(applyExtra91(en));
  for (const bad of FORBIDDEN) {
    if (bad.test(en)) {
      en = "See sources cited in Hebrew.";
      break;
    }
  }
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
