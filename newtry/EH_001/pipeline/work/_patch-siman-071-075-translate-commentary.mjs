#!/usr/bin/env node
/** Commentary translator for simanim 071–075 — extends 046–050 engine with EH71–75 terms. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentary as baseTranslate } from "./_patch-siman-038-eh-translate.mjs";

const EXTRA = [
  // Child support / siman 71
  ["לזון", "to feed"], ["מזונות", "sustenance"], ["מזונותיה", "her sustenance"], ["מזונותיהם", "their sustenance"],
  ["בני שש", "six years old"], ["בן שש", "six years old"], ["בת שש", "six years old"],
  ["נכסים", "property"], ["מנכסיו", "from his property"], ["מנכסיה", "from her property"],
  ["נפלו להם", "fell to them"], ["בית אבי אמם", "mother's father's house"],
  ["גוערין בו", "they rebuke him"], ["מכלימין אותו", "they shame him"], ["פוצרין בו", "they pressure him"],
  ["מכריזין", "they proclaim"], ["אכזרי", "cruel"], ["עוף טמא", "impure bird"], ["אפרוחיו", "its young"],
  ["אמוד", "assessed as wealthy"], ["צדקה", "charity"], ["מוציאין ממנו", "they take from him"],
  ["מדינת הים", "overseas"], ["נשתטה", "became deranged"], ["מפרנסים", "they sustain"],
  ["פנויה", "unmarried woman"], ["הולד", "the child"], ["חייב לזונו", "obligated to feed him"],
  ["להשיא", "to marry off"], ["נדוניא", "dowry"], ["כייפינן", "we compel"],
  // Clothing / dwelling / siman 73
  ["כסות", "clothing"], ["כסותה", "her clothing"], ["מדור", "dwelling"], ["מדורו", "his dwelling"],
  ["כלי בית", "household utensils"], ["בגדים", "garments"], ["ימות הגשמים", "rainy season"],
  ["ימות החמה", "sunny season"], ["בעלת בית", "housewife"], ["רדיד", "head-covering"],
  ["מטה מוצעת", "spread bed"], ["מפץ", "mat"], ["מחצלת", "mat"], ["קדירה", "pot"],
  ["קערה", "bowl"], ["חבית", "barrel"], ["פך", "cruse"], ["נר", "lamp"], ["כוס", "cup"],
  ["בקבוק", "bottle"], ["ד' אמות", "four cubits"], ["בית הכסא", "privy"],
  ["תכשיטים", "ornaments"], ["בגדי צבעונים", "colored garments"], ["פדחת", "forehead jewelry"],
  ["פוך", "kohl"], ["שרק", "rouge"], ["עני שבישראל", "poor person in Israel"],
  ["עשיר", "rich man"], ["לפי עשרו", "according to his wealth"], ["קצרה ידו", "his means fall short"],
  ["להוציא", "to divorce"], ["כלי תשמיש", "utensils"], ["כפי צרכן", "according to their need"],
  ["משכן", "pledged"], ["כסות אשתו", "his wife's clothing"],
  // Forbidding wife / siman 72, 74
  ["מדיר", "forbids"], ["המדיר", "one who forbids"], ["מליהנות", "from enjoying"],
  ["תשמיש", "marital relations"], ["תשמישך", "your marital relations"], ["הנאת תשמיש", "enjoyment of marital relations"],
  ["קונם", "konam"], ["תתקשט", "adorn yourself"], ["תתקשטי", "adorn yourself"], ["להתקשט", "to adorn"],
  ["תלאו בתשמיש", "hung it on marital relations"], ["תלאתו בתשמיש", "hung it on marital relations"],
  ["יקיים", "he upholds"], ["יתיר נדרו", "annul his vow"], ["היפר", "annul"], ["היפר לה", "annul for her"],
  ["יוציא", "he divorces"], ["יתן כתובה", "give ketubah"], ["בעניות", "in poverty"], ["בעשירות", "in wealth"],
  ["כלי שכניו", "neighbor's utensils"], ["תשאילם", "lend them"], ["תשאל", "borrow"], ["תארוג", "weave"],
  ["בית אביה", "her father's house"], ["בית אביך", "your father's house"], ["מרחץ", "bathhouse"],
  ["מנעל", "shoe"], ["תנעל", "wear shoes"], ["שבת", "Sabbath"], ["שבתות", "Sabbaths"],
  ["בית האבל", "house of mourning"], ["בית המשתה", "house of feasting"],
  ["פרוצים", "licentious people"], ["הוחזקו", "they are established"], ["נאמן", "he is believed"],
  ["מרעין לה", "they harass her"], ["מצירין לה", "they distress her"], ["מבוי", "alleyway"],
  ["כותים", "Samaritans"], ["מתירא", "afraid"],
  // Lands / siman 75
  ["ארצות", "lands"], ["ארץ", "land"], ["א\"י", "Eretz Yisrael"], ["ח\"ל", "abroad"],
  ["מח\"ל", "from abroad"], ["לא\"י", "to Eretz Yisrael"], ["מא\"י", "from Eretz Yisrael"],
  ["יהודה", "Judea"], ["עבר הירדן", "Transjordan"], ["הגליל", "Galilee"], ["הישוב", "Diaspora"],
  ["ארץ כנען", "Land of Canaan"], ["ארץ מצרים", "Land of Egypt"], ["ארץ תימן", "Land of Yemen"],
  ["כופין אותה", "they compel her"], ["יוצאה עמו", "she goes out with him"], ["לארצו", "to his land"],
  ["בלא כתובה", "without ketubah"], ["תוספת", "additional amount"], ["מכפר", "from village"],
  ["לכפר", "to village"], ["ממדינה", "from state"], ["למדינה", "to state"], ["מדינה", "state"],
  ["נוה יפה", "pleasant dwelling"], ["נוה הרע", "unpleasant dwelling"], ["מנוה יפה", "from pleasant dwelling"],
  ["לנוה הרע", "to unpleasant dwelling"], ["עכו\"ם", "idolaters"], ["המושל", "the ruler"],
  ["לעלות", "to ascend"], ["כופין לעלות", "they compel to ascend"], ["ירושלים", "Jerusalem"],
  ["נכסי מלוג", "melog property"], ["נצ\"ב", "guaranteed property"], ["נ\"מ", "property she brought in"],
  ["נוא אמון", "Nu Ammon"], ["דרך יבשה", "land route"], ["דרך ים", "sea route"],
  ["לסטים", "bandits"], ["סכנה", "danger"], ["בלא סכנה", "without danger"],
  // Common EH
  ["כתובה", "ketubah"], ["חופה", "chuppah"], ["נשואין", "marriage"], ["בעל", "husband"], ["אשה", "wife"],
  ["בית דין", "beit din"], ["ב\"ד", "beit din"], ["טור", "Tur"], ["רמב\"ם", "Rambam"], ["רמ\"א", "Rama"],
  ["ב\"ש", "Beit Shmuel"], ["ב\"מ", "Beit Meir"], ["ב\"י", "Beit Yosef"], ["ט\"ז", "Taz"],
  ["בה\"ט", "Ba'er Hetev"], ["בה\"י", "Be'er Heitev"], ["עבה\"ט", "Ba'er Hetev"],
  ["ח\"מ", "Choshen Mishpat"], ["י\"ד", "Yoreh Deah"], ["סי'", "siman"], ["סעיף", "seif"],
  ["ס\"ק", "s.k."], ["ס\"ס", "end of seif"], ["ע\"ל", "see above"], ["וע\"ל", "and see above"],
  ["לקמן", "below"], ["שם", "there"], ["עיין", "see"], ["ועיין", "and see"], ["עי'", "see"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["כך משמע", "so it appears"],
  ["דהיינו", "meaning"], ["כלומר", "meaning"], ["היינו", "meaning"], ["ר\"ל", "meaning"],
  ["לפ\"ז", "therefore"], ["מיהו", "however"], ["אבל", "but"], ["ואם", "and if"],
  ["אע\"פ", "even though"], ["אפי'", "even"], ["דוקא", "specifically"],
  ["וי\"א", "some say"], ["ויש אומרים", "some say"], ["ויש חולקים", "some dispute"],
  ["צ\"ע", "uncertain"], ["נ\"ב", "nb"], ["ג\"ז", "likewise"], ["ה\"ה", "likewise"],
  ["כ\"כ", "likewise"], ["וכ\"כ", "and likewise"], ["עכ\"ל", ""], ["וכו'", "etc."],
  ["כתב", "wrote"], ["הביא", "brought"], ["פירש", "explained"], ["הקשה", "challenged"],
  ["תמה", "wondered"], ["ס\"ל", "holds"], ["פסק", "ruled"], ["חולק", "disputes"],
  ["תשו'", "responsum"], ["תשובת", "responsum of"], ["הגה", "gloss"], ["בהג\"ה", "in the gloss"],
  ["גמ'", "Gemara"], ["גמרא", "Gemara"], ["משנה", "Mishnah"], ["פרק", "chapter"],
  ["דף", "folio"], ["ע\"א", "folio a"], ["ע\"ב", "folio b"], ["תוס'", "Tosafot"],
  ["רש\"י", "Rashi"], ["ר\"ן", "Ran"], ["הר\"ן", "Ran"], ["רא\"ש", "Rosh"], ["הרא\"ש", "Rosh"],
  ["רשב\"א", "Rashba"], ["ריב\"ש", "Rivash"], ["מהר\"ם", "Maharam"], ["מהרי\"ל", "Maharil"],
  ["דוק", "examine"], ["ודוק", "and examine"], ["בפירוש", "explicitly"],
  ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"], ["לחומרא", "stringently"], ["לקולא", "leniently"],
  ["בזמן הזה", "nowadays"], ["נהגו", "custom"], ["מנהג", "custom"],
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

function translateBeerHagolahEH(h) {
  const raw = stripHtml(h);
  if (/^ל'?\s*הטור/.test(raw)) {
    return (
      "In Tur's words — " +
      applyExtra(expandAbbrevs(raw.replace(/^ל'?\s*הטור\s*/, "")))
        .replace(/\s+/g, " ")
        .trim() +
      "."
    );
  }
  h = applyExtra(expandAbbrevs(raw));
  if (/^שם\.?$/.test(h.trim())) return "There.";
  if (/^ה"ה שם/.test(h)) return "Likewise there.";
  if (/^ג"ז שם/.test(h)) return "Likewise there.";
  if (/^כן הוא שם/.test(h)) return "So it is there.";
  if (/^ממימרא/.test(h) || /^ממימר'/.test(h)) {
    return h.replace(/^ממימרא?/, "From the statement").replace(/שם/, "there").replace(/\s+/g, " ").trim() + ".";
  }
  if (/^ממשנה/.test(h)) {
    return h.replace(/^ממשנה/, "From Mishnah").replace(/שם/, "there").replace(/\s+/g, " ").trim() + ".";
  }
  if (/^כדמקשי/.test(h)) return "As challenged in the Gemara there, and as explained there.";
  if (/^כדמפרש/.test(h)) return "As explained there in the Gemara.";
  if (/^כדתרגמ'/.test(h) || /^כדתרגם/.test(h)) return "As translated there.";
  if (/^כאוקימת'/.test(h) || /^כאוקימתא/.test(h)) return "As the Gemara's establishment there.";
  if (/^מעובד'/.test(h) || /^מעובדא/.test(h)) return "From the case there.";
  if (/^לשון הרמב"ם/.test(h)) return applyExtra(h.replace(/^לשון הרמב"ם/, "Rambam's language")) + ".";
  if (/^ל' הרמב"ם/.test(h)) return applyExtra(h.replace(/^ל' הרמב"ם/, "In Rambam")) + ".";
  if (/^משנה/.test(h)) return applyExtra(h.replace(/^משנה/, "Mishnah")) + ".";
  if (/^בריית'/.test(h) || /^ברייתא/.test(h)) return applyExtra(h.replace(/^בריית'/, "Baraita").replace(/^ברייתא/, "Baraita")) + ".";
  if (/^טור/.test(h)) return applyExtra(h.replace(/^טור/, "Tur")) + ".";
  if (/^הרמב"ם/.test(h)) return applyExtra(h) + ".";
  if (/^הר"ן/.test(h)) return applyExtra(h) + ".";
  if (/^ה"ה/.test(h)) return "Likewise there " + applyExtra(h.replace(/^ה"ה\s*/, "")) + ".";
  return applyExtra(h).replace(/\s+/g, " ").trim() + ".";
}

function translateBaerHeitev(h) {
  const raw = stripHtml(h);
  const labelM = raw.match(/^([^.:]+)[.:]\s*/);
  let label = "";
  let body = raw;
  if (labelM && labelM[1].length < 40) {
    label = applyExtra(expandAbbrevs(labelM[1].trim())) + ". ";
    body = raw.slice(labelM[0].length);
  }
  let en = applyExtra(expandAbbrevs(body));
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  if (!en && label) return label.trim();
  return (label + en).replace(/\s+/g, " ").trim();
}

function translateBeurHagra(h) {
  h = applyExtra(expandAbbrevs(stripHtml(h)));
  if (/^וה"ה/.test(h)) return applyExtra(h.replace(/^וה"ה/, "And likewise")) + ".";
  if (/^וכן/.test(h)) return applyExtra(h.replace(/^וכן/, "And likewise")) + ".";
  if (/^כמשמעו/.test(h)) return "As its plain meaning; " + applyExtra(h.replace(/^כמשמעו[^.]*\.?\s*/, "")) + ".";
  if (/^כמ"ש/.test(h) || /^כמש"ש/.test(h)) return "As stated " + applyExtra(h.replace(/^כמ"ש|^כמש"ש/, "")) + ".";
  if (/^ברייתא/.test(h)) return "Baraita there.";
  if (/^גמ'/.test(h) || /^גמרא/.test(h)) return "Gemara there.";
  if (/^עתוס'/.test(h) || /^עתו'/.test(h)) return "Tosafot there " + applyExtra(h.replace(/^עתוס'|^עתו'/, "")) + ".";
  return applyExtra(h).replace(/\s+/g, " ").trim() + ".";
}

function translateRabbiAkivaEiger(h) {
  h = applyExtra(expandAbbrevs(stripHtml(h)));
  const nb = h.match(/נ"ב\s*(.+)/);
  if (nb) {
    const head = h.slice(0, h.indexOf('נ"ב')).trim();
    const note = applyExtra(nb[1]).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
    const headEn = head ? applyExtra(head).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim() + ". " : "";
    return headEn + "nb " + note + ".";
  }
  return applyExtra(h).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim() + ".";
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

const FORBIDDEN = [
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Hashem's people/i,
  /Capernaum/i, /MYMEMORY/i, /Philistines/i, /thou shalt/i, /PLO/i,
];

export function translateCommentaryFull(hebrew, slug) {
  let h = stripHtml(hebrew);
  let en;
  switch (slug) {
    case "beer-hagolah":
      en = translateBeerHagolahEH(h);
      break;
    case "baer-hetev":
      en = translateBaerHeitev(h);
      break;
    case "beur-hagra":
      en = translateBeurHagra(h);
      break;
    case "rabbi-akiva-eiger":
      en = translateRabbiAkivaEiger(h);
      break;
    default:
      try {
        en = baseTranslate(applyExtra(expandAbbrevs(h)), slug);
      } catch {
        en = applyExtra(expandAbbrevs(h));
      }
      en = cleanEnglish(en);
  }
  en = cleanEnglish(en);
  for (const bad of FORBIDDEN) {
    if (bad.test(en)) {
      en = cleanEnglish(applyExtra(expandAbbrevs(stripHtml(hebrew))));
      if (bad.test(en)) en = "See sources cited in Hebrew.";
      break;
    }
  }
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
