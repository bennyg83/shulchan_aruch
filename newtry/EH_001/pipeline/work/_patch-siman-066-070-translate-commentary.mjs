#!/usr/bin/env node
/** Commentary translator for simanim 066–070 — ketubah, virginity, sustenance. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentary as baseTranslate } from "./_patch-siman-038-eh-translate.mjs";

const EXTRA = [
  // Ketubah & marriage
  ["כתובה", "ketubah"], ["הכתובה", "the ketubah"], ["כתובות", "ketubot"], ["כתובת", "ketubah of"],
  ["כתובתה", "her ketubah"], ["כתובתן", "their ketubah"], ["כתובת בתולה", "virgin's ketubah"],
  ["כתובת אלמנה", "widow's ketubah"], ["עיקר כתובה", "principal ketubah"], ["עיקר הכתובה", "principal ketubah"],
  ["תוספת", "addition"], ["תוספות", "additions"], ["התוספות", "the additions"], ["תוספת כתובה", "ketubah addition"],
  ["נדוניא", "nedunya"], ["הנדוניא", "the nedunya"], ["נדונייתא", "nedunya"], ["דין נדוניא", "law of nedunya"],
  ["מוהר", "bride-price"], ["מוהר בתולים", "virgin bride-price"], ["מוהר בתוליכי", "your virgin bride-price"],
  ["שטר כתובה", "ketubah document"], ["שטר", "document"], ["שטרות", "documents"],
  ["דחזי ליכי", "that which is fitting for you"], ["דחזו ליכי", "that which is fitting for you"],
  ["דחזי ליכי מדאורייתא", "that which is fitting for you from the Torah"],
  ["התקבלתי כתובתי", "I received my ketubah"], ["התקבלתי ממך הכתובה", "I received the ketubah from you"],
  ["משועבדים", "collateralized"], ["משועבד", "collateralized"], ["משעבד", "collateralizes"],
  ["משעבדי", "collateralized property"], ["בני חרי", "unsold property"], ["נכסי צאן ברזל", "iron-flock property"],
  ["ערב קבלן", "guarantor"], ["העמיד לה ערב", "appointed a guarantor for her"],
  ["שכר הסופר", "scribe's fee"], ["הסופר", "the scribe"], ["לחתום בכתובה", "to sign on the ketubah"],
  ["להתייחד", "to be alone"], ["התייחד", "was alone"], ["מתייחד", "is alone"],
  ["לבעול", "to have intercourse"], ["בעילתו", "his intercourse"], ["בעילת זנות", "licentious intercourse"],
  ["בעולה", "had intercourse"], ["בחזקת בעולה", "presumed to have had intercourse"],
  ["טענת בתולים", "claim of virginity"], ["טענת דמים", "claim of blood"], ["טענת פתח פתוח", "claim of open opening"],
  ["טענתו טענה", "his claim is a valid claim"], ["טענתו על הבתולים טענה", "his claim regarding virginity is valid"],
  ["בתולים", "virginity"], ["בתולה", "virgin"], ["הבתולה", "the virgin"], ["בתולה שלימה", "complete virgin"],
  ["בחזקת בתולה", "with presumption of virginity"], ["מצאתיה בתולה", "I found you a virgin"],
  ["לא מצאתיה בתולה", "I did not find you a virgin"], ["לא מצאה בתולה", "did not find her a virgin"],
  ["מוכת עץ", "one afflicted by wood"], ["איילונית", "aylonit"], ["בוגרת", "adult woman"],
  ["דורקטי", "dorakti"], ["דור קטוע", "cut-off generation"], ["פתח פתוח", "open opening"],
  ["דמים שותתים", "blood flows"], ["דוחק", "tightness"], ["הדוחק", "the tightness"],
  ["נסתרה", "was secluded"], ["לא נסתרה", "was not secluded"], ["מתייחד עם ארוסתו", "alone with his betrothed"],
  ["מזונות", "sustenance"], ["המזונות", "the sustenance"], ["מזונותיה", "her sustenance"],
  ["מזונותיה", "her sustenance"], ["לזונה", "to sustain her"], ["לפרנסה", "to sustain her"],
  ["ניזונת", "is sustained"], ["ניזונית", "will be sustained"], ["איני נזונית", "I will not be sustained"],
  ["איני ניזונית", "I will not be sustained"], ["איני זנך", "I will not sustain you"],
  ["מעשה ידיה", "her handiwork"], ["מעשה ידיך", "your handiwork"], ["מציאתה", "her found objects"],
  ["כסותה", "her clothing"], ["עונתה", "her marital duty"], ["רפואתה", "her medical care"],
  ["לפדותה", "to redeem her"], ["קבורתה", "her burial"], ["ירושתה", "her inheritance"],
  ["תכשיטין", "jewelry"], ["פרפרות", "relish"], ["סעודות", "meals"], ["שתי סעודות", "two meals"],
  ["להשכיר עצמו", "to hire himself out"], ["כפועל", "as a laborer"], ["לותה", "borrowed"],
  ["לויתי", "I borrowed"], ["הנחתי לה מזונות", "I left her sustenance"], ["הנחתי לך מזונות", "I left you sustenance"],
  ["שבועת היסת", "heses oath"], ["נקיטת חפץ", "holding a sacred object"], ["להחרים סתם", "to impose a general cherem"],
  ["נאמנת", "she is believed"], ["נאמן", "he is believed"], ["נאנסתי", "I was raped"],
  ["משארסתני נאנסתי", "from when you betrothed me I was raped"],
  ["חרשת", "deaf-mute woman"], ["חרש", "deaf-mute man"], ["שוטה", "deranged person"], ["שוטה", "deranged woman"],
  ["נתפקחה", "became able to hear"], ["נשתפית", "became sane"], ["נשתטית", "became deranged"],
  ["הגיורת", "female convert"], ["השבויה", "captive woman"], ["השפחה", "maidservant"],
  ["שנתגייר", "converted"], ["שנתגיירה", "converted"], ["שנשתחררו", "were freed"],
  ["נחלצה", "received chalitzah"], ["מן האירוסין", "from erusin"], ["מן הנשואין", "from nisuin"],
  ["נכנסה לחופה", "entered the chuppah"], ["תחת החופה", "under the chuppah"],
  ["ק\"ק", "two hundred"], ["מאתים", "two hundred"], ["מנה", "maneh"], ["מאה מנה", "one hundred maneh"],
  ["דרהם", "drachma"], ["זהובים", "gold coins"], ["זוזי דרבנן", "rabbinic zuzim"],
  ["זוזי דאורייתא", "Torah zuzim"], ["סלעים", "selaim"], ["דינרין", "dinar"],
  ["כסף מדינה", "provincial silver"], ["כסף צרוף", "pure silver"],
  ["מנהג המדינה", "provincial custom"], ["מנהג המקום", "local custom"], ["מנהג משפחתה", "her family's custom"],
  ["מנהג", "custom"], ["המנהג", "the custom"], ["נהגו", "custom"], ["נוהגים", "practice"],
  ["לפי המנהג", "according to custom"], ["לפי עשרו", "according to his wealth"],
  ["לפי עניו", "according to his poverty"], ["העשיר", "the rich"], ["העני", "the poor"],
  ["בית דין", "beit din"], ["ב\"ד", "beit din"], ["תנאי בית דין", "beit din's conditions"],
  ["קנין", "kinyan"], ["עדים", "witnesses"], ["עד", "witness"], ["סהדי", "witnesses"],
  ["אחריות", "responsibility"], ["מטלטלין", "movable property"], ["נכסיו", "his property"],
  ["למדינת הים", "overseas"], ["למדינה אחרת", "to another country"],
  ["עגונה", "agunah"], ["לעגנה", "to make her an agunah"], ["אלמנה", "widow"], ["אלמנות", "widowhood"],
  ["ארוסה", "betrothed woman"], ["ארוסין", "betrothal"], ["נשואין", "marriage"], ["הנישואין", "marriage"],
  ["הכלה", "the bride"], ["החתן", "the groom"], ["בעל", "husband"], ["אשה", "wife"], ["אשתו", "his wife"],
  ["גרושה", "divorcee"], ["מתרכתא", "the divorced woman"], ["אסורה לכהנים", "forbidden to kohanim"],
  ["כהן", "kohen"], ["כהנת", "kohenet"], ["בת ג' שנים", "three years old"], ["בן ט' שנים", "nine years old"],
  ["קטנה", "minor girl"], ["קטן", "minor boy"], ["הגדיל", "matured"], ["בקטנותו", "in his minority"],
  ["למפרע", "retroactively"], ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"],
  ["לחומרא", "stringently"], ["לקולא", "leniently"], ["ספק", "doubt"], ["ודאי", "certainly"],
  ["פסקו", "they assessed"], ["פוסקים", "they assess"], ["מכרו", "sold"], ["מכרה", "she sold"],
  ["גובין", "collect"], ["גובה", "collects"], ["גביא", "she collects"], ["לגבות", "to collect"],
  ["מחלה", "waived"], ["מחלה לו", "waived to him"], ["נאבדה", "was lost"], ["אבודות", "lost"],
  ["שהות", "remain"], ["לשהות", "to remain"], ["שעה אחת", "one hour"],
  ["פוחת", "reduces"], ["הפוחת", "one who reduces"], ["משיעור", "from the measure"],
  ["משיעור הכתובה", "from the ketubah measure"], ["משיעור חכמים", "from the Sages' measure"],
  ["סומכים", "rely"], ["לסמוך", "to rely"], ["אין לסמוך", "one may not rely"],
  ["שומעין", "listen"], ["אין שומעין", "we do not listen"], ["שומעין לה", "we listen to her"],
  ["התנה", "stipulated"], ["תנאו בטל", "his stipulation is void"], ["על תנאי", "conditionally"],
  ["בזמן הזה", "nowadays"], ["בזה\"ז", "nowadays"], ["לקמן", "below"], ["לעיל", "above"],
  ["סי'", "siman"], ["סעיף", "seif"], ["פ\"ק", "ch. 1"], ["פ\"ב", "ch. 2"], ["פ\"ח", "ch. 8"],
  ["כתובות", "Kesubos"], ["גיטין", "Gittin"], ["קידושין", "Kiddushin"],
  ["הרמב\"ם", "Rambam"], ["הר\"ן", "Ran"], ["הרא\"ש", "Rosh"], ["הרשב\"א", "Rashba"],
  ["הרמב\"ן", "Ramban"], ["רש\"י", "Rashi"], ["התו'", "Tosafot"], ["התוס'", "Tosafot"],
  ["ב\"י", "Beit Yosef"], ["ב\"ש", "Beit Shmuel"], ["ב\"ח", "Bach"], ["ב\"מ", "Beit Meir"],
  ["ט\"ז", "Taz"], ["בה\"ט", "Ba'er Hetev"], ["מהרי\"ק", "Maharik"], ["מהרי\"ל", "Maharil"],
  ["מהרא\"י", "Maharai"], ["ריב\"ש", "Rivash"], ["ח\"מ", "Choshen Mishpat"], ["י\"ד", "Yoreh Deah"],
  ["ע\"ל", "see above"], ["וע\"ל", "and see above"], ["שם", "there"], ["ע\"ש", "see there"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["דהיינו", "meaning"], ["כלומר", "meaning"],
  ["היינו", "meaning"], ["ר\"ל", "meaning"], ["לפ\"ז", "therefore"], ["מיהו", "however"],
  ["אבל", "but"], ["ואם", "and if"], ["אע\"פ", "even though"], ["אפי'", "even"], ["דוקא", "specifically"],
  ["וי\"א", "some say"], ["ויש אומרים", "some say"], ["ויש חולקים", "some dispute"],
  ["עיין", "see"], ["ועיין", "and see"], ["עי'", "see"], ["בפירוש", "explicitly"],
  ["צ\"ע", "uncertain"], ["נ\"ב", "nb"], ["ס\"ק", "s.k."], ["תשו'", "responsum"],
  ["כתב", "wrote"], ["כ'", "wrote"], ["הביא", "brought"], ["פירש", "explained"],
  ["הקשה", "challenged"], ["תמה", "wondered"], ["ס\"ל", "holds"], ["פסק", "ruled"],
  ["כ\"כ", "likewise"], ["וכ\"כ", "and likewise"], ["ג\"ז", "likewise"], ["ה\"ה", "likewise"],
  ["אין", "there is no"], ["אינו", "is not"], ["אינה", "she is not"], ["הוי", "it is"],
  ["צריך", "must"], ["יכול", "can"], ["בעינן", "we require"], ["לא בעינן", "we do not require"],
  ["נאמן", "believed"], ["נאמנת", "believed"], ["בודקין", "examine"], ["בודקין אותה", "they examine her"],
  ["מפסדת", "loses"], ["נאסרה", "becomes forbidden"], ["מותרת", "permitted"],
  ["הרשות בידו", "the choice is his"], ["הרשות בידה", "the choice is hers"],
  ["כופין אותו", "they compel him"], ["להוציא", "to divorce"], ["נותן גט", "gives a get"],
  ["למעשה", "in practice"], ["לכ\"ע", "for all"], ["לפי", "according to"], ["משום", "because"],
  ["הרי", "behold"], ["אכן", "indeed"], ["לכן", "therefore"], ["לפיכך", "therefore"],
  ["שמא", "perhaps"], ["דילמא", "perhaps"], ["אי", "if"], ["אי נמי", "or also"],
  ["אמנם", "however"], ["מ\"מ", "nevertheless"], ["דוק", "examine"], ["ודוק", "and examine"],
  ["עכ\"ל", ""], ["וכו'", "etc."], ["וכו", "etc."], ["באורך", "at length"],
  ["בקצרה", "briefly"], ["בסמוך", "nearby"], ["בשם", "in name of"], ["לשון", "language of"],
  ["סבר", "holds"], ["חולק", "disputes"], ["מחלק", "distinguishes"],
  ["תירץ", "answered"], ["מתרץ", "answers"], ["קשה", "difficult"], ["פשיטא", "obvious"],
  ["פשוט", "plain"], ["מבואר", "it is clear"], ["ברור", "clear"], ["ברי", "certain"],
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
  if (/^כדמקשי/.test(h)) return "As challenged in the Gemara there.";
  if (/^כדמפרש/.test(h)) return "As explained there in the Gemara.";
  if (/^כדתרגמ'/.test(h) || /^כדתרגם/.test(h)) return "As translated there.";
  if (/^כאוקימת'/.test(h) || /^כאוקימתא/.test(h)) return "As the Gemara's establishment there.";
  if (/^מעובד'/.test(h) || /^מעובדא/.test(h)) return "From the case there.";
  if (/^לשון הרמב"ם/.test(h)) return applyExtra(h.replace(/^לשון הרמב"ם/, "Rambam's language")) + ".";
  if (/^ל' הרמב"ם/.test(h)) return applyExtra(h.replace(/^ל' הרמב"ם/, "In Rambam")) + ".";
  if (/^משנה/.test(h)) {
    return applyExtra(h.replace(/^משנה/, "Mishnah").replace(/וכדמפ' בגמרא/, "and as explained in the Gemara")) + ".";
  }
  if (/^בריית'/.test(h) || /^ברייתא/.test(h)) {
    return applyExtra(h.replace(/^בריית'/, "Baraita").replace(/^ברייתא/, "Baraita")) + ".";
  }
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
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i,
  /Capernaum/i, /MYMEMORY/i, /Philistines/i, /thou shalt/i,
  /IRGC/i, /Saadi/i, /C\.C\./i,
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
