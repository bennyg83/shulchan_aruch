#!/usr/bin/env node
/** Commentary translator for simanim 086–090 — extends 071–075 with EH86–90 terms. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentaryFull as base071 } from "./_patch-siman-071-075-translate-commentary.mjs";
import { translateCommentary as base038 } from "./_patch-siman-038-eh-translate.mjs";

const EXTRA86 = [
  // Deposits / siman 86
  ["פקדון", "deposit"], ["פקדונות", "deposits"], ["נפקד", "depositor"], ["הנפקד", "the depositor"],
  ["מקבלין", "they accept"], ["אין מקבלין", "one does not accept"], ["יחזור", "he returns"],
  ["לאשה", "to the woman"], ["מאשת איש", "from a married woman"], ["נושאת ונותנת", "conducts business"],
  ["תוך הבית", "within the house"], ["של פלוני", "belong to so-and-so"], ["של פלוני הם", "belong to so-and-so"],
  ["טמונים", "hidden"], ["המעות", "the money"], ["מעות", "money"], ["גנבה", "stole"], ["גנבן", "stole"],
  ["ליורשיה", "to her heirs"], ["שלוה", "borrowed"], ["גירשה", "divorced her"], ["משכנה", "pledged"],
  ["מטלטלין", "movable property"], ["מטלטלים", "movable property"], ["הקונה", "the buyer"], ["הלוקח", "the buyer"],
  ["הלקוחות", "the buyers"], ["המלוה", "the lender"], ["שטרות", "documents"], ["שטר", "document"],
  // Chazakah / siman 87
  ["חזקה", "chazakah"], ["החזיק", "took chazakah"], ["שני אוכלין", "two who ate"], ["אכלם", "ate them"],
  ["שני חזקה", "two for chazakah"], ["חזקת נזיקין", "chazakah of damages"], ["פתיחת חלונות", "opening windows"],
  ["שלשה שנים", "three years"], ["אחר מות בעלה", "after her husband's death"],
  // Property leaving / siman 88
  ["יוצאת", "leaves"], ["יוצאה", "leaves"], ["נוטלת", "takes"], ["נוטלתן", "takes them"],
  ["נכסי מלוג", "melog property"], ["נכסי צאן ברזל", "tzon barzel property"], ["נכסי צ\"ב", "tzon barzel property"],
  ["נ\"מ", "melog property"], ["צ\"ב", "tzon barzel"], ["נצ\"ב", "tzon barzel property"],
  ["נדוניא", "dowry"], ["מלאכתן ראשונה", "original craft"], ["מעין מלאכתן", "their original craft"],
  ["בלויין", "worn"], ["הוקרו", "appreciated"], ["פחתו", "diminished"], ["שומא ראשונה", "original assessment"],
  ["כלים", "vessels"], ["כלי", "vessel"], ["שפחה", "maidservant"], ["שפחות", "maidservants"],
  ["בהמה", "animal"], ["שבח", "enhancement"], ["בית אביה", "her father's house"], ["סלקה", "dismiss"],
  ["הקדישו", "consecrated"], ["נאסר בהנאה", "forbidden in benefit"], ["פירות מחוברים", "attached fruits"],
  ["תלשן", "detached them"], ["הוצאות", "expenses"], ["השביחו", "enhanced"], ["נקיטת חפץ", "holding a sacred object"],
  ["מורדת", "rebellious"], ["מיאנה", "refused him"], ["אריס", "sharecropper"], ["אריסין", "sharecroppers"],
  ["היתומים", "the orphans"], ["ידם על התחתונה", "their hand on the lower portion"],
  // Burial / siman 89
  ["קבורה", "burial"], ["לקוברה", "to bury her"], ["לקובר", "to bury"], ["קבורתה", "her burial"],
  ["צרכי קבורתה", "needs of her burial"], ["מספד", "eulogy"], ["קינים", "lamentations"],
  ["חלילין", "flutes"], ["קוננות", "female mourners"], ["כבודו", "his honor"], ["כבודה", "her honor"],
  ["שבועת אלמנה", "widow's oath"], ["יורשי כתובתה", "heirs of her ketubah"],
  // Inheritance / sales / siman 90
  ["יורש", "inherits"], ["יורשה", "inherits her"], ["יורשין", "heirs"], ["יורשי", "heirs of"],
  ["יירשנה", "inherit her"], ["יירש", "inherit"], ["מוחזק", "possessed"], ["ראוי", "due"],
  ["מורישה", "bequeather"], ["מורישיה", "her bequeathers"], ["מלוה", "loan"], ["מלות", "loans"],
  ["משועבדים", "collateralized"], ["נחת רוח", "husband's pleasure"], ["עשיתי לבעלי", "I did it for my husband"],
  ["טורפת", "repossesses"], ["מכרה", "sold"], ["מכר", "sold"], ["מכרו", "sold"], ["מכירה", "sale"],
  ["הקדישה", "consecrated"], ["מחלה", "waived"], ["מתנה", "gift"], ["מקבל המתנה", "gift recipient"],
  ["פירות", "produce"], ["גוף הקרקע", "body of the land"], ["גוף", "body"], ["קרקע", "land"],
  ["ברשותו", "with his authority"], ["ברשותה", "with her authority"], ["לוקח", "buyer"],
  ["מציאה", "found object"], ["ספק גירושין", "doubtful divorce"], ["מומין", "blemishes"],
  ["מקח טעות", "mistaken transaction"], ["מרדה", "rebelled"], ["מורד", "rebellious"],
  ["נפל הבית", "the house fell"], ["תחילה", "first"], ["אלמנה", "widow"], ["גרושה", "divorced woman"],
  ["ארוסה", "betrothed woman"], ["קטנה", "minor"], ["חרשת", "deaf woman"], ["חרש", "deaf man"],
  ["מיאון", "refusal"], ["חצי זכר", "half male share"], ["זרע קיימא", "surviving offspring"],
  ["חובל", "injurer"], ["ערער", "protest"], ["מחילה", "waiver"], ["אחריות", "liability"],
  ["כותי", "Samaritan"], ["כותים", "Samaritans"], ["בדולח", "crystal"], ["תכשיטים", "ornaments"],
  ["בגדי שבת", "Shabbat garments"], ["בגדי חול", "weekday garments"], ["קרובים", "relatives"],
  ["הכרזה", "proclamation"], ["הניחה", "left"], ["קודם", "precedes"], ["נתחייב", "became obligated"],
  // Chelkat Mechokek / common EH abbreviations
  ["חלקת מחוקק", "Chelkat Mechokek"], ["חמ\"מ", "Chelkat Mechokek"], ["ב\"ש", "Beit Shmuel"],
  ["בה\"ג", "Be'er HaGolah"], ["בה\"ט", "Ba'er Hetev"], ["בה\"י", "Be'er Heitev"],
  ["עבה\"ט", "Ba'er Hetev"], ["ב\"י", "Beit Yosef"], ["ב\"מ", "Beit Meir"], ["ט\"ז", "Taz"],
  ["פ\"ת", "Pithei Teshuva"], ["רע\"א", "Rabbi Akiva Eiger"], ["חש\"ו", "Chokhmat Shlomo"],
  ["עזר מקודש", "Ezer Mikodesh"], ["נ\"י", "Nimmukei Yosef"], ["מהרי\"ו", "Mahariu"],
  ["מהר\"ם", "Maharam"], ["מהרי\"ל", "Maharil"], ["רמב\"ן", "Ramban"], ["רשב\"א", "Rashba"],
  ["ראב\"ד", "Raavad"], ["מ\"מ", "Maggid Mishneh"], ["ת\"ה", "Terumat HaDeshen"],
  ["אשיר\"י", "Ashiri"], ["נ\"ל", "it seems to me"], ["כן נ\"ל", "so it seems to me"],
  ["ד\"ע", "logical opinion"], ["סברת הרב", "the Rav's view"], ["כך משמע", "so it appears"],
  ["משמע מלשון", "it appears from the language of"], ["וע\"ל", "and see above"], ["וע' לעיל", "and see above"],
  ["וע' בח\"ה", "and see Choshen Mishpat"], ["ועיין בח\"ה", "and see Choshen Mishpat"],
  ["ח\"ה", "Choshen Mishpat"], ["ח\"מ", "Choshen Mishpat"], ["א\"ה", "Even HaEzer"],
  ["דאישות", "Laws of Marriage"], ["דנשואין", "Laws of Marriage"],
];

const ARAMAIC86 = [
  ["משום דיש לחוש שמא גנב' מבעל'", "because there is concern perhaps she stole from her husband"],
  ["משום ד", "because"], ["דיש לחוש", "there is concern"], ["שמא גנבה", "perhaps she stole"],
  ["שמא גנב'", "perhaps she stole"], ["שמא", "perhaps"], ["גנב'", "stole"], ["מבעל'", "from her husband"],
  ["מבעלה", "from her husband"], ["מא\"א", "from a married woman"], ["מ\"ה", "therefore"],
  ["מ\"מ", "nevertheless"], ["א\"צ", "need not"], ["אפי'", "even"], ["אפילו", "even"],
  ["לו'", "to say"], ["לומר", "to say"], ["א\"י", "is not"], ["ה\"נ", "here likewise"],
  ["כמ\"ש", "as stated"], ["מסייע לעבירה", "assists in the transgression"],
  ["יחזור לאשה", "he returns to the woman"],   ["יחזיר לאשה", "he returns to the woman"],
  ["ואם קיבל", "and if he accepted"],
  ["ואם קבל", "and if he accepted"], ["של פלו'", "belong to so-and-so"], ["של פלוני", "belong to so-and-so"],
  ["נאמנת", "she is believed"], ["נאמן", "he is believed"], ["אינה נאמנת", "she is not believed"],
  ["נושאת ונותנת", "conducts business"], ["תוך הבית", "within the house"], ["בתוך הבית", "within the house"],
  ["מעות טמונים", "hidden money"], ["מעות גלוים", "revealed money"], ["טמונים", "hidden"],
  ["צריך לשלם", "must pay"], ["אין לה עליו כלום", "she has no claim against him"],
  ["כ\"פ", "likewise wrote"], ["כ'", "wrote"], ["כתב", "wrote"], ["ס\"ל", "holds"], ["סבר", "holds"],
  ["פסק", "ruled"], ["הכריע", "ruled"], ["קמ\"ל", "teaches us"], ["משמע", "it appears"],
  ["מבואר", "it is clear"], ["נראה", "it appears"], ["נ\"ל", "it seems to me"], ["צ\"ע", "uncertain"],
  ["ע'", "see"], ["וע'", "and see"], ["בח\"ה", "Choshen Mishpat"], ["בח\"מ", "Choshen Mishpat"],
  ["ח\"מ", "Choshen Mishpat"], ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ק", "s.k."],
  ["פרק", "chapter"], ["הג\"מ", "Hagahot Maimoniyot"], ["הגמ\"י", "Hagahot Maimoniyot"],
  ["המגיד", "Maggid Mishneh"], ["מרדכי", "Mordechai"], ["תוס'", "Tosafot"], ["תו'", "Tosafot"],
  ["הרא\"ש", "Rosh"], ["הרמב\"ם", "Rambam"], ["הרשב\"א", "Rashba"], ["הריב\"ש", "Rivash"],
  ["הר\"ן", "Ran"], ["הר\"י", "R' Yitzchak"], ["רשב\"ם", "Rashbam"], ["ריטב\"א", "Ritva"],
  ["ב\"י", "Beit Yosef"], ["ב\"ש", "Beit Shmuel"], ["ב\"ח", "Bach"], ["ב\"מ", "Beit Meir"],
  ["טור", "Tur"], ["ט\"ז", "Taz"], ["רמ\"א", "Rama"], ["מהרש\"ל", "Maharshal"],
  ["נ\"י", "Nimmukei Yosef"], ["נ\"מ", "melog property"], ["צ\"ב", "tzon barzel"],
  ["נכסי מלוג", "melog property"], ["נכסי צאן ברזל", "tzon barzel property"],
  ["חזקה", "chazakah"], ["החזיק", "took chazakah"], ["לא עלת' לו חזק'", "his chazakah did not take effect"],
  ["יורש", "inherits"], ["יורשה", "inherits her"], ["יורשין", "heirs"], ["יורשי", "heirs of"],
  ["מוחזק", "possessed"], ["ראוי", "due"], ["מלוה", "loan"], ["מלות", "loans"],
  ["נחת רוח", "husband's pleasure"], ["עשיתי לבעלי", "I did it for my husband"],
  ["מכרה", "sold"], ["מכר", "sold"], ["הלוקח", "the buyer"], ["הלקוחות", "the buyers"],
  ["פירות", "produce"], ["גוף הקרקע", "body of the land"], ["בלא דמים", "without payment"],
  ["בלא שבועה", "without oath"], ["שבועה", "oath"], ["הוצאות", "expenses"], ["השביח", "enhanced"],
  ["מורדת", "rebellious"], ["מיאנה", "refused him"], ["אריס", "sharecropper"], ["היתומים", "the orphans"],
  ["קבורה", "burial"], ["לקוברה", "to bury her"], ["מספד", "eulogy"], ["נדוניא", "dowry"],
  ["שבועת אלמנה", "widow's oath"], ["ספק גירושין", "doubtful divorce"],
];

function applyExtra86(text) {
  let t = text;
  const merged = [...ARAMAIC86, ...EXTRA86].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of merged) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

function cleanEnglish(en) {
  en = en
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/\s+\./g, ".")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  return en;
}

function translateBeitShmuel(h) {
  const stripped = stripHtml(h);
  if (/^אין מקבלין פקדון/.test(stripped)) {
    return (
      "One does not accept a deposit from a married woman — because there is concern perhaps she stole from her husband; " +
      "and if he does not accept from her it returns to her husband; and when he accepts he assists in the transgression — Rashbam."
    );
  }
  if (/^ואם קיבל יחזור/.test(stripped) || /^ואם קבל יחזור/.test(stripped)) {
    return (
      "And if he accepted he returns to the woman — even if she is not believed by him, nevertheless we do not establish that she certainly stole; " +
      "rather it is a concern that perhaps she stole; therefore he returns to her hand. So wrote Maggid Mishneh ch. 7 Laws of Marriage in name of Rashba: " +
      "per Rambam's view that all money in a woman's hand is presumed melog property — one may return to the husband; " +
      "for the baraita teaches 'he returns to the woman' lest one think he may not return to the woman — it teaches he may return to the man or the woman."
    );
  }
  if (/^אין לה עליו כלום/.test(stripped)) {
    return (
      "She has no claim against him — so wrote Rambam ch. 2 and in Be'er HaTov sha'ar 37: " +
      "there is no difference between hidden and non-hidden money, for we are witnesses she did not become obligated as a borrower to him; " +
      "and Rambam wrote there that all a woman's money is presumed her husband's, even though in ch. 22 he wrote they are melog property when in her hand."
    );
  }
  const prepped = applyExtra86(expandAbbrevs(stripped));
  let en = base038(prepped, "beit-shmuel");
  return cleanEnglish(en);
}

function translateBeitMeir(h) {
  h = applyExtra86(expandAbbrevs(stripHtml(h)));
  let en = base038(h, "beit-meir");
  return cleanEnglish(en);
}

function translateTureiZahav(h) {
  h = applyExtra86(expandAbbrevs(stripHtml(h)));
  let en = base038(h, "turei-zahav");
  return cleanEnglish(en);
}

const FORBIDDEN = [
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Hashem's people/i,
  /Capernaum/i, /MYMEMORY/i, /Philistines/i, /thou shalt/i, /PLO/i,
];

export function translateCommentaryFull(hebrew, slug) {
  let en;
  switch (slug) {
    case "beit-shmuel":
      en = translateBeitShmuel(hebrew);
      break;
    case "beit-meir":
      en = translateBeitMeir(hebrew);
      break;
    case "turei-zahav":
      en = translateTureiZahav(hebrew);
      break;
    default: {
      const prepped = applyExtra86(expandAbbrevs(stripHtml(hebrew)));
      en = base071(prepped, slug);
    }
  }
  en = cleanEnglish(en);
  for (const bad of FORBIDDEN) {
    if (bad.test(en)) {
      en = cleanEnglish(applyExtra86(expandAbbrevs(stripHtml(hebrew))));
      if (bad.test(en)) en = "See sources cited in Hebrew.";
      break;
    }
  }
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
