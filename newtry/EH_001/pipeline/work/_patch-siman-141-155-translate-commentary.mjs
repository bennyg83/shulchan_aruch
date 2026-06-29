#!/usr/bin/env node
/** Commentary translator for simanim 141–155 — get delivery, defects, compulsion, mi'un. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentaryFull as base91 } from "./_patch-siman-091-100-translate-commentary.mjs";

const EXTRA141 = [
  ["שליח קבלה", "reception agent"], ["שליח הולכה", "delivery agent"], ["שליח הובאה", "bringing agent"],
  ["שליחות קבלה", "reception agency"], ["שליח לקבל גיטה", "agent to receive her get"],
  ["בפני נכתב ובפני נחתם", "before witnesses it was written and before witnesses it was signed"],
  ["בפ\"נ ובפ\"נ", "before witnesses it was written and before witnesses it was signed"],
  ["נתקיים בחותמיו", "validated by its signatures"], ["מקויים בחותמיו", "validated by its signatures"],
  ["עידי מסירה", "witnesses to delivery"], ["עידי השליחות", "witnesses to the agency"],
  ["עידי הרשאה", "witnesses to the authorization"], ["שטר הרשאה", "authorization document"],
  ["ספק מגורשת", "doubtfully divorced"], ["מגורשת", "divorced"], ["גט כריתות", "bill of divorce"],
  ["הרשאה", "authorization"], ["פקדון", "deposit"], ["מזויף", "forged"], ["מודעא", "protest"],
  ["חוץ לארץ", "abroad"], ["ח\"ל", "abroad"], ["מח\"ל", "from abroad"], ["לא\"י", "to Eretz Yisrael"],
  ["מא\"י", "from Eretz Yisrael"], ["ממקום למקום", "from place to place"],
  ["מיאון", "refusal (mi'un)"], ["ממאנת", "she refuses"], ["גט מיאון", "refusal document"],
  ["כופין להוציא", "they compel to divorce"], ["כופין לגרש", "they compel to divorce"],
  ["שכיב מרע", "mortally ill person"], ["אם מתי", "if I die"], ["מעכשיו", "from now"],
  ["מהיום", "from today"], ["לאחר מיתה", "after death"], ["על תנאי", "on condition"],
  ["הן קודם ללאו", "affirmative before negative"], ["כפל תנאו", "double his condition"],
  ["גט ישן", "old get"], ["נתייחד עמה", "secluded with her"], ["בא עליה", "had relations with her"],
  ["ספק ממזר", "doubtful mamzer"], ["אשת איש גמורה", "fully married woman"],
  ["פסולה לכהונה", "disqualified for priesthood"], ["חזקת גרושה", "presumption of divorcee"],
  ["הפה שאסר", "the mouth that forbade"], ["הפה שהתיר", "the mouth that permitted"],
  ["סדר הגט", "order of the get"], ["סדר גיטין", "order of gittin"],
  ["נוסח הרשאה", "authorization formula"], ["עידי חתימה", "witnesses to signing"],
  ["ידך כידי", "your hand as my hand"], ["פיך כפי", "your mouth as my mouth"],
  ["בטל הגט", "he voided the get"], ["ביטול שליחות", "voiding of agency"],
  ["גוסס", "goses (moribund)"], ["חזקת חיים", "presumption of life"],
  ["בחזקת מגורשת", "presumption of divorcee"], ["בני חרי", "free men"],
  ["גובה כתובתה", "she collects her ketubah"], ["תורף הגט", "body of the get"],
  ["כתב התנאי בגט", "he wrote the condition in the get"],
  ["מגרש על תנאי", "divorces on condition"], ["מגרש לאחר זמן", "divorces after a set time"],
  ["שתי שערות", "two hairs"], ["סימני איילונית", "signs of ailonit"],
  ["בודקין אותה", "they examine her"], ["עונת הפעוטות", "age of discernment"],
  ["ריח הפה", "bad breath"], ["ריח החוטם", "foul nasal odor"],
  ["מקבץ צואת כלבים", "collects dog excrement"], ["בורסקי", "tanner"],
  ["שחין", "boils"], ["עקר", "sterile"], ["יורה כחץ", "shoots like an arrow"],
  ["שהתה עמו", "she dwelt with him"], ["עשר שנים", "ten years"],
  ["הפילה", "she miscarried"], ["נפילים", "miscarriages"],
  ["מורדת", "rebellious wife"], ["כופין", "they compel"],
  ["ב\"י", "Beit Yosef"], ["ב\"ש", "Beit Shmuel"], ["ב\"מ", "Beit Meir"],
  ["טור", "Tur"], ["רמ\"א", "Rama"], ["רמב\"ם", "Rambam"], ["רשב\"א", "Rashba"],
  ["ריב\"ש", "Rivash"], ["מהר\"ם", "Maharam"], ["מהרי\"ק", "Maharik"],
  ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ק", "s.k."], ["ע\"ל", "see above"],
  ["לקמן", "below"], ["עיין", "see"], ["משמע", "it appears"], ["דהיינו", "meaning"],
  ["וי\"א", "some say"], ["מיהו", "however"], ["לפיכך", "therefore"], ["אבל", "but"],
  ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"], ["בזמן הזה", "nowadays"],
  ["נהגו", "custom"], ["כן נוהגין", "so is the custom"], ["צ\"ע", "uncertain"],
];

function applyExtra(text) {
  let t = text;
  const sorted = [...EXTRA141].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

const FORBIDDEN = [
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Capernaum/i, /MYMEMORY/i,
  /Tel Aviv/i, /ghetto/i, /preacher/i, /Philistines/i,
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
  let en = base91(hebrew, slug);
  en = clean(applyExtra(en));
  for (const bad of FORBIDDEN) {
    if (bad.test(en)) {
      en = "See sources cited in Hebrew.";
      break;
    }
  }
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
