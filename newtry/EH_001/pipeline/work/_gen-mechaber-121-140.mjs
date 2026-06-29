#!/usr/bin/env node
/** Generate mechaber translations for simanim 121–140 from Hebrew via phrase engine. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { MECHABER as MANUAL121 } from "./_patch-siman-121-122-mechaber.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const SIMANIM = Array.from({ length: 20 }, (_, i) => String(121 + i).padStart(3, "0"));

const PHRASE = [
  // Titles / seif counts
  ["צריך להיות בדעתו מכתיבה עד נתינה", "He must be of sound mind from writing until giving"],
  ["אמר לכתוב הגט וטעה או נאבד", "He said to write the get and erred or it was lost"],
  ["מי ראוי לכתוב הגט ונכתב וניתן בשבת", "Who is fit to write the get, and written and given on Sabbath"],
  ["על מה נכתב הגט", "On what the get is written"],
  ["במה נכתב הגט ותיקון הכתיבה והקלף", "With what the get is written, and correction of writing and parchment"],
  ["נוסח לשון הגט ודקדוק אותיותיו", "Formula of get language and precision of its letters"],
  ["שצריך להזכיר הזמן בגט ודין קדימה ואיחור", "That time must be mentioned in the get, and law of antedating and postdating"],
  ["שצריך להזכיר בגט מקום דירת הבעל ואשה ועדים", "That the get must mention place of husband's and wife's residence and witnesses"],
  ["דיני שם האיש והאשה וחתימת הגט ודין מומר המגרש", "Laws of man's and woman's name, signing the get, and law of apostate divorcer"],
  ["דיני עדי הגט וחתימתו ואם אינם יודעים לקרות או לחתום", "Laws of get witnesses and its signing, and if they do not know to read or sign"],
  ["צריך שיהיה כתיבתו וחתימתו לשמה", "Its writing and signing must be for its sake"],
  ["שצריך להזכיר שם האיש ואשתו והמביא גט ונפל ממנו", "That man's name, his wife, and one who brings a get must be mentioned, and if it fell from him"],
  ["צריך שימסור הגט בפני שני עדים כשרים", "The get must be delivered before two fit witnesses"],
  ["צריך שיבטל הבעל כל מודעות", "The husband must annul all declarations"],
  ["צריך לקרות הגט קודם נתינה ולאחריו", "The get must be read before giving and after"],
  ["דין איזה לשון צריך שיאמר בשעת הנתינה והמגרש בשבת", "Law of what language he must say at giving, and divorcing on Sabbath"],
  ["צריך שיתירנה היתר גמור", "He must permit her with full permission"],
  ["דין נתינת הגט בידו", "Law of giving the get in his hand"],
  ["דין קבלה מידו ואם זרק לה ולחצרה", "Law of receipt from his hand, and if he threw to her or to her courtyard"],
  ["דין שליח להולכה וקבלה והובאה", "Law of agent for delivery, receipt, and bringing"],
  ["ובו ח סעיפים", "It contains 8 seifim"], ["ובו ב סעיפים", "It contains 2 seifim"],
  ["ובו ה סעיפים", "It contains 5 seifim"], ["ובו ט סעיפים", "It contains 9 seifim"],
  ["ובו י סעיפים", "It contains 10 seifim"], ["ובו יא סעיפים", "It contains 11 seifim"],
  ["ובו יב סעיפים", "It contains 12 seifim"], ["ובו יג סעיפים", "It contains 13 seifim"],
  ["ובו יד סעיפים", "It contains 14 seifim"], ["ובו טו סעיפים", "It contains 15 seifim"],
  ["ובו טז סעיפים", "It contains 16 seifim"], ["ובו יז סעיפים", "It contains 17 seifim"],
  ["ובו יח סעיפים", "It contains 18 seifim"], ["ובו כב סעיפים", "It contains 22 seifim"],
  ["ובו כג סעיפים", "It contains 23 seifim"], ["ובו לד סעיפים", "It contains 34 seifim"],
  ["ובו ג סעיפים", "It contains 3 seifim"], ["ובו ד סעיפים", "It contains 4 seifim"],
  ["ובו ז סעיפים", "It contains 7 seifim"],
  // Siman 121
  ["צריך שיהיה בדעתו בשעה שמצוה לכתבו", "he must be of sound mind when commanded to write it"],
  ["אחזו רוח רעה בשעה שמצוה לכתבו", "a bad spirit seized him when commanded to write it"],
  ["אין כותבין אותו אפילו לכשיבריא", "they do not write it even for when he recovers"],
  ["השיכור שהגיע לשכרותו של לוט ואמר כתבו אין כותבין", "a drunk who reached Lot's drunkenness and said write — they do not write"],
  ["ואם לא הגיע הרי זה ספק", "and if he did not reach that — behold this is a doubt"],
  ["היה בריא בשעה שצוה לכתבו ואח\"כ אחזו החולי", "if he was healthy when he commanded to write it and afterward illness seized him"],
  ["אין כותבים אותו בעודו בחליו", "they do not write it while he is ill"],
  ["אם כתבוהו ונתנוהו קודם שיבריא", "if they wrote and gave it before he recovered"],
  ["אם הוא חולי דסמי' בידן ה\"ז פסול ואם לאו אינו גט", "if it is illness that blinds their hands, behold it is invalid; and if not, it is not a get"],
  ["אבל לאחר שנתרפא כותבין ונותנין אפילו מיחה בחליו שלא ליתנו", "but after he recovered they write and give even if he protested in his illness not to give"],
  ["עתים חלים", "sometimes ill"], ["עתים שוטה", "sometimes insane"],
  ["כשהוא חלים הרי הוא כפקח לכל דבריו", "when he is ill he is like a competent person for all his words"],
  ["ואם גירש באותה שעה גטו גט", "and if he divorced at that hour, his get is a get"],
  ["שכיב מרע שמצוה לכתוב גט צריך לדקדק בו שיהא שפוי", "a deathly ill person commanded to write a get — they must examine him that he be sane"],
  ["בשעת כתיבה ובשעת נתינה", "at time of writing and at time of giving"],
  ["וא\"צ בדיקה כמו נשתתק אלא בודקין אותו קצת לראות אם דעתו מיושבת עליו", "they do not need examination like one struck dumb; rather they examine him somewhat to see if his mind is settled upon him"],
  ["מי שנשתתק ושאלוהו אם רוצה שיכתבו גט לאשתו והרכין בראשו לומר הן", "one struck dumb whom they asked if he wishes them to write a get for his wife and he nodded his head to say yes"],
  ["בודקין אותו בדברים אחרים בסירוגין", "they examine him in other matters intermittently"],
  ["חד הן ותרין לאו חד לאו ותרין הן", "one yes and two no, one no and two yes"],
  ["אם הרכין בראשו על לאו לאו ועל הן הן הרי אלו יכתבו ויתנו", "if he nodded on no-no and yes-yes — behold they may write and give"],
  ["דבודקין אותו ע\"י פירות שאינם נמצאים אלא בקיץ ושואלין אותו בימות החורף", "they examine him by means of fruits not found except in summer and ask him in winter days"],
  ["אם רוצה שילקטו לו מן האילן או להיפך", "if he wishes they gather for him from the tree or the opposite"],
  ["ודוקא כשנשתתק או אילם השומע ואינו מדבר סומכין על רמיזתו להוציא", "specifically when struck dumb or a mute who hears but does not speak — they rely on his hint to divorce"],
  ["אבל חרש שאינו שומע ואינו מדבר אינו מוציא את אשתו ברמיזה", "but a deaf-mute who does not hear and does not speak does not divorce his wife by hint"],
  ["אם נשאה כשהיה פקח או שנפלה לו יבמה מאחיו פקח", "if he married when he was competent or a yevamah fell to him from a competent brother"],
  ["אם נשא אשה כשהוא חרש אפי' היא פקחת מוציא ברמיזה", "if he married a woman when he was deaf-mute, even if she is competent, he divorces by hint"],
  ["גוסס הרי הוא כחי ויכול לגרש", "one gasping — behold he is like a living person and can divorce"],
  ["וי\"א דוקא גוסס שמדבר אבל אינו מדבר לא", "some say specifically gasping who speaks; but one who does not speak — no"],
  ["ויש להחמיר", "and one should be stringent"],
  ["שחטו בו שנים או רוב שנים", "if they cut him two years or most of two years"],
  ["מגוייד או צלוב והחיה אוכלת בו ורמז ואמר כתבו גט לאשתי", "flayed or crucified and an animal eats him and he hinted and said write a get for my wife"],
  ["כותבין ונותנין כל עוד שנשמתו בו", "they write and give as long as his soul is in him"],
  ["וה\"ה לנפל מן הגג", "and likewise one who fell from a roof"],
  ["צריך בדיקה ג\"פ כשנשתתק", "examination three times is required like one struck dumb"],
  // Siman 122+
  ["אמר לסופר ולעדים לכתוב ולחתום וליתן גט לאשתו", "he said to the scribe and witnesses to write and sign and give a get to his wife"],
  ["וכתבו וחתמו ונתנו לה ונמצא פסול", "and they wrote and signed and gave her and it was found invalid"],
  ["הכל כשרים לכתוב הגט חוץ מחמשה", "all are fit to write the get except five"],
  ["כותי ועבד וחש\"ו", "Samaritan, slave, deaf-mute, imbecile, and minor"],
  ["גט שכתבו על איסורי הנאה כשר", "a get written on items forbidden for benefit is valid"],
  ["בדבר שצריך ביעור מן העולם וצריך שריפה", "on matter requiring destruction from the world and burning"],
  ["אין כותבין את הגט אלא בדבר שרישומו עומד", "they write the get only on matter whose marking endures"],
  ["כגון דיו וסיקרא וקומס וקנקנתום", "such as ink, red paint, gall-nut ink, and vitriol"],
  ["כותבין הגט בכל כתב ובכל לשון", "they write the get in every script and every language"],
  ["צריך לכתוב זמן בגט", "must write time in the get"],
  ["ואם נתגרשה בגט שאין בו זמן לא תנשא", "if she was divorced with a get that has no time she may not remarry"],
  ["צריך להזכיר בגט שם המקום שהעדים עומדים שם", "must mention in the get the name of the place where witnesses stand"],
  ["כותבין שם האיש והאשה בגט", "they write man's and woman's name in the get"],
  ["צריך שיחתמו שני עדים כשרים", "two fit witnesses must sign"],
  ["צריך שתהיה כתיבת הגט וחתימתו לשם האיש המגרש ולשם האשה המתגרשת", "writing and signing of the get must be for the name of the divorcing man and divorced woman"],
  ["אמר לסופר כתוב גט לארוסתי לכשאכניסנה אגרשנה", "he said to the scribe write a get for my betrothed for when I bring her in I will divorce her"],
  ["צריך שיהיו שני עדים כשרים בשעת מסירת הגט", "two fit witnesses must be present at delivery of the get"],
  ["צריך שיבטל כל מודעה קודם שיתן הגט", "he must annul every declaration before giving the get"],
  ["העדים שנותנים הגט לפניהם צריכים לקרותו קודם נתינה", "witnesses before whom they give the get must read it before giving"],
  ["המגרש צריך שיאמר כשיתן לה הגט ה\"ז גיטיך", "the divorcer must say when he gives her the get: behold this is your get"],
  ["אמר לה הרי את מותרת לכל אדם חוץ מפלוני או אלא לפלוני אינו גט", "if he said behold you are permitted to every man except so-and-so, or only to so-and-so — it is not a get"],
  ["אמר לה טול גיטיך מע\"ג קרקע אינו כלום", "if he said take your get from the ground — it is nothing"],
  ["זרק לה הגט בחצרה", "he threw the get to her in her courtyard"],
  ["האיש עושה שליח להוליך גט לאשתו", "a man appoints an agent to bring a get to his wife"],
  ["שליח הולכה", "delivery agent"], ["שליח קבלה", "receipt agent"],
  ["אינו גט עד שיגיע גט ליד האשה", "it is not a get until the get reaches the woman's hand"],
  // Common
  ["גט", "get"], ["גיטך", "your get"], ["גיטיך", "your get"], ["לגרש", "to divorce"],
  ["מגרש", "divorces"], ["מתגרשת", "divorced woman"], ["כותבין", "they write"],
  ["נותנין", "they give"], ["נתנו", "they gave"], ["סופר", "scribe"], ["עדים", "witnesses"],
  ["חתמו", "they signed"], ["לשם", "for the sake of"], ["לשמה", "for its sake"],
  ["שפוי", "sane"], ["שוטה", "insane"], ["פקח", "competent"], ["נשתתק", "struck dumb"],
  ["כתובה", "ketubah"], ["בעל", "husband"], ["אשה", "wife"], ["אשתו", "his wife"],
  ["ארוסה", "betrothed woman"], ["ארוסתי", "my betrothed"], ["יבמה", "yevamah"],
  ["בית דין", "beit din"], ["ב\"ד", "beit din"], ["חצר", "courtyard"],
  ["מודעא", "declaration"], ["היתר גמור", "full permission"], ["שליח", "agent"],
  ["הגה", "gloss"], ["בד\"א", "when does this apply"], ["ה\"ה", "likewise"],
  ["וי\"א", "some say"], ["אבל", "but"], ["ואם", "and if"], ["מיהו", "however"],
  ["לפיכך", "therefore"], ["דהיינו", "meaning"], ["אע\"פ", "even though"],
  ["נהגו", "custom"], ["בזמן הזה", "nowadays"], ["אינו", "is not"], ["אינה", "she is not"],
  ["חייב", "obligated"], ["פסול", "invalid"], ["כשר", "valid"], ["כשרים", "fit"],
];

function applyPhrase(text) {
  let t = text;
  const sorted = [...PHRASE].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

function translateMechaberHtml(html) {
  let raw = String(html);
  const ramaParts = [];
  raw = raw.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => {
    ramaParts.push(g);
    return "";
  });
  let h = stripHtml(raw);
  h = applyPhrase(expandAbbrevs(h));
  let en = h.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  en = en.replace(/:\s*\./g, ".").replace(/\(\s*\)/g, "");
  for (const r of ramaParts) {
    let re = applyPhrase(expandAbbrevs(stripHtml(r)))
      .replace(/[\u0590-\u05FF]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (re) en += `\n\n{Rama: ${re}}`;
  }
  if (en && !/[.!?]$/.test(en)) en += ".";
  for (const bad of [/Lord's Prayer/i, /Hashem's Word/i, /Capernaum/i, /\bGoth\b/i, /\bGott\b/i]) {
    if (bad.test(en)) throw new Error(`Forbidden in mechaber: ${bad}`);
  }
  return en;
}

const MECHABER = { ...MANUAL121 };

for (const sim of SIMANIM) {
  if (!MECHABER[sim]) MECHABER[sim] = {};
  const dir = path.join(OUT, `siman_${sim}`, "mechaber");
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(dir, f), "utf8"))) {
      const key = `${b.seif}#${b.marker}`;
      if (MECHABER[sim][key]) continue;
      MECHABER[sim][key] = translateMechaberHtml(b.he);
    }
  }
}

const lines = ["/** Generated + manual mechaber — simanim 121–140 EH001 FULL REDO */", "export const MECHABER = {"];
for (const sim of SIMANIM) {
  lines.push(`  "${sim}": {`);
  for (const [k, v] of Object.entries(MECHABER[sim] || {}).sort()) {
    const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`    "${k}": \`${esc}\`,`);
  }
  lines.push("  },");
}
lines.push("};", "");

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-121-140-mechaber.mjs");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");

let n = 0;
for (const sim of SIMANIM) {
  const c = Object.keys(MECHABER[sim] || {}).length;
  console.log(`siman_${sim} mechaber: ${c}`);
  n += c;
}
console.log("TOTAL mechaber:", n, "->", outPath);
