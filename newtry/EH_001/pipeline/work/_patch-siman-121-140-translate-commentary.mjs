#!/usr/bin/env node
/** Commentary translator for simanim 121–140 — get writing, delivery, witnesses. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentaryFull as base076080 } from "./_patch-siman-076-080-translate-commentary.mjs";

const EXTRA = [
  // Get core / siman 121–124
  ["צריך להיות בדעתו מכתיבה עד נתינה", "he must be of sound mind from writing until giving"],
  ["בדעתו מכתיבה עד נתינה", "of sound mind from writing until giving"],
  ["בדעתו בשעה שמצוה לכתבו", "of sound mind when commanded to write it"],
  ["אחזו רוח רעה", "a bad spirit seized him"], ["שכרותו של לוט", "Lot's drunkenness"],
  ["השיכור שהגיע לשכרותו של לוט", "a drunk who reached Lot's drunkenness"],
  ["אין כותבין אותו", "they do not write it"], ["כותבין ונותנין", "they write and give"],
  ["חולי דסמי' בידן", "illness that blinds their hands"], ["פסול", "invalid"], ["אינו גט", "it is not a get"],
  ["שכיב מרע", "deathly ill person"], ["מצוה לכתוב גט", "commanded to write a get"],
  ["בשעת כתיבה", "at time of writing"], ["בשעת נתינה", "at time of giving"],
  ["נשתתק", "one struck dumb"], ["הרכין בראשו", "nodded his head"], ["בסירוגין", "intermittently"],
  ["חד הן ותרין לאו", "one yes and two no"], ["חד לאו ותרין הן", "one no and two yes"],
  ["אילם השומע ואינו מדבר", "mute who hears but does not speak"],
  ["סומכין על רמיזתו", "they rely on his hint"], ["מוציא ברמיזה", "divorces by hint"],
  ["חרש שאינו שומע ואינו מדבר", "deaf-mute who does not hear and does not speak"],
  ["גוסס", "gasping"], ["הרי הוא כחי", "behold he is like a living person"],
  ["יכול לגרש", "can divorce"], ["מגוייד", "flayed"], ["צלוב", "crucified"],
  ["כל עוד שנשמתו בו", "as long as his soul is in him"], ["נפל מן הגג", "fell from a roof"],
  ["בדיקה ג\"פ", "examination three times"],
  // Error / lost get / siman 122
  ["אמר לכתוב הגט וטעה", "he said to write the get and erred"],
  ["אמר לסופר ולעדים", "he said to the scribe and witnesses"],
  ["לכתוב ולחתום וליתן גט", "to write and sign and give a get"],
  ["נמצא פסול", "was found invalid"], ["נאבד", "was lost"],
  // Scribes / siman 123
  ["הכל כשרים לכתוב הגט", "all are fit to write the get"],
  ["חוץ מחמשה", "except five"], ["כותי", "Samaritan"], ["חש\"ו", "deaf-mute, imbecile, and minor"],
  ["נכתב וניתן בשבת", "written and given on Sabbath"],
  // Material / siman 124–125
  ["על איסורי הנאה", "on items forbidden for benefit"], ["צריך ביעור", "requires destruction"],
  ["בדבר שרישומו עומד", "on matter whose marking endures"],
  ["דיו", "ink"], ["סיקרא", "red paint"], ["קומס", "gall-nut ink"], ["קנקנתום", "vitriol"],
  ["קלף", "parchment"], ["תיקון הכתיבה", "correction of writing"],
  // Nusach / siman 126
  ["נוסח לשון הגט", "formula of get language"], ["דקדוק אותיותיו", "precision of its letters"],
  ["כתב הכותים", "Samaritan script"], ["כתב ישראל", "Israelite script"],
  // Time / place / siman 127–128
  ["צריך לכתוב זמן בגט", "must write time in the get"],
  ["דין קדימה ואיחור", "law of antedating and postdating"],
  ["מקום דירת הבעל ואשה", "place of husband's and wife's residence"],
  ["שם המקום שהעדים עומדים", "name of the place where witnesses stand"],
  // Names / siman 129
  ["שם האיש והאשה", "man's and woman's name"], ["חתימת הגט", "signing of the get"],
  ["מומר המגרש", "apostate divorcer"],
  // Witnesses / siman 130–131
  ["עדי הגט", "witnesses of the get"], ["צריך שיחתמו שני עדים", "two witnesses must sign"],
  ["כתיבתו וחתימתו לשמה", "its writing and signing for its sake"],
  ["לשם האיש המגרש ולשם האשה המתגרשת", "for the name of the divorcing man and divorced woman"],
  // Delivery / siman 132–140
  ["המביא גט", "one who brings a get"], ["נפל ממנו", "fell from him"],
  ["מסירת הגט", "delivery of the get"], ["בפני שני עדים כשרים", "before two fit witnesses"],
  ["יבטל כל מודעות", "annul all declarations"], ["מודעא", "declaration"],
  ["לקרות הגט קודם נתינה", "read the get before giving"],
  ["ה\"ז גיטיך", "behold this is your get"], ["הרי את מותרת", "behold you are permitted"],
  ["היתר גמור", "full permission"], ["חוץ מפלוני", "except so-and-so"],
  ["נתינת הגט בידו", "giving the get in his hand"], ["טול גיטיך", "take your get"],
  ["ע\"ג קרקע", "on the ground"], ["קבלה מידו", "receipt from his hand"],
  ["זרק לה הגט", "he threw the get to her"], ["בחצרה", "in her courtyard"],
  ["קנוי לה", "acquired to her"], ["שליח הולכה", "delivery agent"],
  ["שליח קבלה", "receipt agent"], ["שליח להובאה", "agent for bringing"],
  // Common get / EH
  ["גט", "get"], ["גיטך", "your get"], ["גיטיך", "your get"], ["גרש", "divorced"],
  ["מגרש", "divorces"], ["מתגרשת", "divorced woman"], ["לגרש", "to divorce"],
  ["כותבין הגט", "they write the get"], ["נותנין", "they give"], ["נתנו לה", "they gave her"],
  ["סופר", "scribe"], ["עדים", "witnesses"], ["עד", "witness"], ["חתימה", "signature"],
  ["חתמו", "they signed"], ["לשם", "for the sake of"], ["לשמה", "for its sake"],
  ["שפוי", "sane"], ["שוטה", "insane"], ["פקח", "competent"], ["חלים", "ill"],
  ["בריא", "healthy"], ["נתרפא", "recovered"], ["מיחה", "protested"],
  ["ארוסה", "betrothed woman"], ["ארוסתי", "my betrothed"], ["יבמה", "yevamah"],
  ["הולכה", "delivery"], ["קבלה", "receipt"], ["שליח", "agent"], ["שלוחה", "female agent"],
  ["חצר", "courtyard"], ["מושכר", "rented"], ["שאול", "borrowed"],
  ["כתובה", "ketubah"], ["בעל", "husband"], ["אשה", "wife"], ["אשתו", "his wife"],
  ["בית דין", "beit din"], ["ב\"ד", "beit din"], ["טור", "Tur"], ["רמב\"ם", "Rambam"],
  ["רמ\"א", "Rama"], ["ב\"ש", "Beit Shmuel"], ["ב\"מ", "Beit Meir"], ["ב\"י", "Beit Yosef"],
  ["ט\"ז", "Taz"], ["בה\"ט", "Ba'er Hetev"], ["בה\"ג", "Be'er HaGolah"],
  ["ח\"מ", "Choshen Mishpat"], ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ק", "s.k."],
  ["ע\"ל", "see above"], ["וע\"ל", "and see above"], ["לקמן", "below"], ["שם", "there"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["דוקא", "specifically"],
  ["וי\"א", "some say"], ["ויש אומרים", "some say"], ["ויש חולקים", "some dispute"],
  ["אע\"פ", "even though"], ["אפי'", "even"], ["מיהו", "however"], ["אבל", "but"],
  ["וכו'", "etc."], ["עכ\"ל", ""], ["בד\"א", "when does this apply"],
  ["ה\"ה", "likewise"], ["ג\"ז", "likewise"], ["כ\"כ", "likewise"],
];

function applyExtra(text) {
  let t = text;
  const sorted = [...EXTRA].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

export function translateCommentaryFull(hebrew, slug) {
  const h = stripHtml(hebrew);
  const pre = applyExtra(expandAbbrevs(h));
  let en = base076080(pre, slug);
  en = en
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/Lord's Prayer/gi, "")
    .replace(/Hashem's Word/gi, "")
    .replace(/Hashem's promise/gi, "")
    .replace(/Hashem's people/gi, "")
    .replace(/Hashem is/gi, "")
    .replace(/\bGoth\b/gi, "get")
    .replace(/\bGott\b/gi, "get")
    .replace(/\bgilt\b/gi, "get")
    .replace(/\bthread\b/gi, "get")
    .replace(/\bGoethe\b/gi, "gloss")
    .replace(/Lot's mines/gi, "Lot's drunkenness")
    .replace(/Saturday/gi, "Sabbath")
    .replace(/baptism/gi, "immersion")
    .replace(/grievance/gi, "get")
    .replace(/deported/gi, "divorced")
    .replace(/hymn/gi, "yibbum")
    .replace(/hymniff/gi, "hint")
    .replace(/opened/gi, "competent")
    .replace(/radar/gi, "stringency")
    .replace(/CCP/gi, "Choshen Mishpat")
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/\s+\./g, ".")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
