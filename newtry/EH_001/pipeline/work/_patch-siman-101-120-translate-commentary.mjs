#!/usr/bin/env node
/** Commentary translator for simanim 101–120 — ketubah collection, daughters' sustenance, etc. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentaryFull as base91 } from "./_patch-siman-091-100-translate-commentary.mjs";

const EXTRA101 = [
  ["עד כמה גובה כתובתה", "How much she collects of her ketubah"],
  ["דין גביית חוב וכתובת אלמנה", "Law of collecting a debt and a widow's ketubah"],
  ["אלמנה שמוכרת נכסיה לכתובתה", "A widow who sells her property for her ketubah"],
  ["בית דין שמכרו וטעו", "A beit din that sold and erred"],
  ["דין המוכרת ומוחלת כתובתה", "Law of one who sells or waives her ketubah"],
  ["הכותב כל נכסיו לבניו", "One who writes all his property to his sons"],
  ["הכותב כל נכסיו לאשתו", "One who writes all his property to his wife"],
  ["דין שכיב מרע שאמר תטול אשתי כאחד מן הבנים", "Law of a deathly ill person who said my wife shall take like one of the sons"],
  ["שכיב מרע שאמר תנו מאתים זהובים לאשתי בכתובה", "A deathly ill person who said give two hundred gold to my wife in the ketubah"],
  ["שכותבין שובר לאשה", "That they write a receipt for a woman"],
  ["דין כתובת בנין דכרין", "Law of ketubah of male children"],
  ["מזונות הבנות", "Daughters' sustenance"],
  ["עישור נכסים", "one-tenth of property"],
  ["כתובת בנין דכרין", "ketubah of male children"],
  ["נכסי צאן ברזל", "iron-flock property"],
  ["נכסי צ\"ב", "iron-flock property"],
  ["נכסי מלוג", "melog property"],
  ["נדוניא", "dowry"],
  ["נדונייתא", "dowry"],
  ["נדונייתה", "her dowry"],
  ["שטר כתובה", "ketubah document"],
  ["עיקר כתובה", "principal ketubah"],
  ["תוספת", "additional amount"],
  ["תוספת כתובה", "ketubah addition"],
  ["גובה כתובתה", "she collects her ketubah"],
  ["גובה לעולם", "collects forever"],
  ["אינה נשמטת", "she is not released"],
  ["שמיטה", "sabbatical year"],
  ["פגמה אותה", "she impaired it"],
  ["שזקפה במלוה", "that she stood it as a loan"],
  ["בתנאי ב\"ד", "under beit din conditions"],
  ["במקום שאין כותבים", "in a place where they do not write"],
  ["מחלה", "she waived"],
  ["מוחלת", "is waived"],
  ["שתיקתה מחילה", "her silence is waiver"],
  ["מפני הבושה שתקה", "she was silent out of shame"],
  ["בעל חוב", "creditor"],
  ["ב\"ח", "creditor"],
  ["מוקדם", "earlier"],
  ["מאוחר", "later"],
  ["קדימה", "priority"],
  ["מטלטלי אגב מקרקעי", "movables by way of land"],
  ["הערב", "guarantor"],
  ["קבלן", "contractor"],
  ["הדירה", "he forbade her benefit"],
  ["הנאה", "benefit"],
  ["קנוניא", "collusion"],
  ["הכרזה", "proclamation"],
  ["שומא", "appraisal"],
  ["אגרת בקורת", "survey document"],
  ["שתות", "one-sixth"],
  ["אונאה", "overcharge/undercharge"],
  ["מקח", "sale"],
  ["שובר", "receipt"],
  ["שכיב מרע", "deathly ill person"],
  ["ידה על העליונה", "her hand is on the upper"],
  ["אפוטרופוס", "guardian"],
  ["מתנת ש\"מ", "gift from deathbed"],
  ["שותף", "partner"],
  ["ניזונית", "she is sustained"],
  ["מזונות", "sustenance"],
  ["בני חורין", "free property"],
  ["משעבדים", "encumbered property"],
  ["טורפת", "she seizes"],
  ["מוכרת", "she sells"],
  ["מוחלת", "she waives"],
  ["נשבעת", "she swears"],
  ["שבועת אלמנה", "widow's oath"],
  ["בנין דכרין", "male children"],
  ["מותר", "surplus"],
  ["דינר", "dinar"],
  ["זהובים", "gold coins"],
  ["זוז", "zuz"],
  ["מנה", "maneh"],
  ["מאה", "hundred"],
  ["מאתים", "two hundred"],
  ["עישור", "one-tenth"],
  ["פרנסת", "provision for"],
  ["הזיבורית", "inferior land"],
  ["בינונית", "medium-quality land"],
  ["המוחזק", "what is possessed"],
  ["הראוי", "what is due"],
  ["תקנת הגאונים", "enactment of the Geonim"],
  ["נכסים מרובים", "abundant property"],
  ["נכסים מועטים", "scant property"],
  ["יתארסו", "become betrothed"],
  ["תבגר", "reach majority"],
  ["הארוס", "betrothed man"],
  ["שומרת יבם", "levirate widow"],
  ["חצי זכר", "half-male portion"],
  ["חצי חלק זכר", "half-male portion"],
  ["בד\"א", "when does this apply"],
  ["ה\"ה", "likewise"],
  ["וי\"א", "some say"],
  ["מיהו", "however"],
  ["לפיכך", "therefore"],
  ["אע\"פ", "even though"],
  ["אא\"כ", "unless"],
  ["בזמן הזה", "nowadays"],
  ["נהגו", "custom"],
  ["פסק", "ruled"],
  ["כתב", "wrote"],
  ["עיין", "see"],
  ["ועיין", "and see"],
  ["סי'", "siman"],
  ["סעיף", "seif"],
  ["ס\"ק", "s.k."],
  ["ח\"מ", "Choshen Mishpat"],
  ["ב\"ש", "Beit Shmuel"],
  ["ב\"י", "Beit Yosef"],
  ["בה\"ט", "Ba'er Hetev"],
  ["עבה\"ט", "Ba'er Hetev"],
  ["תשו'", "responsum"],
  ["תשובת", "responsum of"],
  ["הלכה למעשה", "practical halakhah"],
  ["לדינא", "for practical law"],
  ["עכ\"ל", ""],
  ["ע\"ש", "see there"],
  ["וכו'", "etc."],
  ["נ\"ב", "nb"],
  ["גליון", "marginal note"],
  ["הגר\"ע איגר", "Rabbi Akiva Eiger"],
  ["צ\"ע", "uncertain"],
];

function applyExtra101(text) {
  let t = text;
  const sorted = [...EXTRA101].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

const FORBIDDEN = [
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Capernaum/i, /MYMEMORY/i,
  /\bAlibaba\b/i, /\bNadia\b/i, /\bEpi\b/i,
];

function clean(en) {
  en = String(en ?? "")
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  return en;
}

export function translateCommentaryFull(hebrew, slug) {
  if (slug === "pitchei-teshuva") {
    return base91(hebrew, slug);
  }
  let en = base91(hebrew, slug);
  en = clean(applyExtra101(en));
  for (const bad of FORBIDDEN) {
    if (bad.test(en)) {
      en = "See sources cited in Hebrew.";
      break;
    }
  }
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
