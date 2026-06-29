#!/usr/bin/env node
/** Commentary translator for simanim 046–050 — phrase-based halachic English, no MT garbage. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentary as baseTranslate } from "./_patch-siman-038-eh-translate.mjs";

const EXTRA = [
  ["קלא", "rumor"], ["קול", "rumor"], ["הקול", "the rumor"], ["הקלא", "the rumor"],
  ["מבטלין קלא", "nullify the rumor"], ["מבטלין קול", "nullify the rumor"],
  ["אמתלאה", "excuse"], ["האמתלאה", "the excuse"], ["אמתלאות", "excuses"], ["אמתלא", "excuse"],
  ["סבלונות", "savlonot"], ["סבלון", "savlonot"], ["הסבלונות", "the savlonot"],
  ["שידוכין", "matchmaking"], ["שדוכין", "matchmaking"], ["משודך", "engaged man"],
  ["משודכת", "engaged woman"], ["המשודך", "the engaged man"], ["המשודכת", "the engaged woman"],
  ["אסמכתא", "asmakhta"], ["משכון", "collateral"], ["קנס", "penalty"], ["קנסות", "penalties"],
  ["חוזרין", "return"], ["חוזר", "returns"], ["מתנה גמורה", "absolute gift"],
  ["מיאון", "refusal"], ["ממאנת", "refused"], ["קרובות", "relatives"], ["קרובותיה", "her relatives"],
  ["קרוביו", "his relatives"], ["נאמנת", "she is believed"], ["נאמן", "he is believed"],
  ["תוך כדי דיבור", "within the time of an utterance"], ["כדי דיבור", "time of an utterance"],
  ["מכחישין", "contradict"], ["ראינו שנתקדשה", "we saw she was betrothed"], ["לא ראינו", "we did not see"],
  ["נתקדשתי", "I was betrothed"], ["קדשתיך", "you are betrothed to me"], ["קדשתני", "you betrothed me"],
  ["הוחזק בבית דין", "upheld in beit din"], ["הוחזק בב\"ד", "upheld in beit din"],
  ["הוחזקה מקודשת", "presumed betrothed"], ["חזקה טובה", "strong presumption"],
  ["ראיה ברורה", "clear evidence"], ["שמחת אירוסין", "engagement celebration"],
  ["נרות דולקות", "candles burning"], ["מטות מוצעות", "beds spread"],
  ["תרי מתרי", "two from two"], ["חד מתרי", "one from two"], ["ממשות", "substance"],
  ["נסתחפה שדהו", "his field was flooded"], ["השליש", "the third party"], ["שליש", "third party"],
  ["קנין", "kinyan"], ["שבועה", "oath"], ["שטר", "document"], ["שטרות", "documents"],
  ["המירה", "became apostate"], ["נשתטית", "became deranged"], ["חזר בו", "retracted"],
  ["חזרה בה", "she retracted"], ["ספק קדושין", "doubtful kiddushin"], ["קידושי ספק", "doubtful kiddushin"],
  ["קידושי טעות", "mistaken kiddushin"], ["על תנאי", "conditionally"],
  ["לא נתקיים התנאי", "the condition was not fulfilled"], ["זרק לה קידושין", "threw kiddushin to her"],
  ["קרוב לו", "closer to him"], ["קרוב לה", "closer to her"], ["שוה פרוטה", "worth a perutah"],
  ["אוסרה על בעלה", "forbid her to her husband"], ["אסורה לבעלה", "forbidden to her husband"],
  ["בקי בטיב גיטין וקידושין", "expert in nature of gittin and kiddushin"],
  ["יתיר את הערוה", "permit a forbidden relation"], ["ממזרים", "mamzerim"],
  ["פטור מן הקנס", "exempt from the penalty"], ["אונס", "coercion"], ["ערמה", "trickery"],
  ["דרים בחצר", "dwell in a courtyard"], ["בצינעה", "in private"],
  ["תנשא לכתחילה", "may marry ab initio"], ["לא תנשא", "may not marry"],
  ["תצא", "she must leave"], ["לא תצא", "she need not leave"],
  ["נותן גט", "gives a get"], ["צריכה גט", "needs a get"], ["עד אחד", "one witness"],
  ["עדים ברורים", "clear witnesses"], ["למדינה אחרת", "to another country"],
  ["למדינת הים", "overseas"], ["אחר הנשואין", "after marriage"], ["אחר אירוסין", "after erusin"],
  ["אסורה לכהן", "forbidden to a kohen"], ["החזיר גרושתו", "remarried his divorcee"],
  ["בודקין", "we examine"], ["שואלין אותה", "we ask her"], ["סומכים על דבריה", "rely on her words"],
  ["לא מיקרי קול", "is not called a rumor"], ["בעיר אחרת", "in another city"],
  ["בנות ישראל", "daughters of Israel"], ["לעגנן", "to make agunot"],
  ["קידושי ראשון", "first kiddushin"], ["קידושי שני", "second kiddushin"],
  ["עולמית", "forever"], ["טמאה אני", "I am impure"], ["כמשמעו", "as its plain meaning"],
  ["כמש\"ש", "as stated"], ["כמ\"ש", "as stated"], ["כדמקשי", "as challenged"],
  ["כדמפרש", "as explained"], ["כדתרגם", "as translated"], ["כאוקימתא", "as the Gemara's establishment"],
  ["מעובדא", "from the case"], ["ממימרא", "from the statement"], ["ממימר'", "from the statement"],
  ["ל' הטור", "In Tur's words"], ["לשון הרמב\"ם", "Rambam's language"], ["ל' הרמב\"ם", "In Rambam"],
  ["ברייתא", "baraita"], ["בריי'", "baraita"], ["גמ'", "Gemara"], ["גמרא", "Gemara"],
  ["משנה", "Mishnah"], ["פרק", "chapter"], ["דף", "folio"], ["ע\"א", "folio a"], ["ע\"ב", "folio b"],
  ["פ\"ח", "ch. 8"], ["פ\"ט", "ch. 9"], ["פ\"י", "ch. 10"], ["פכ\"ט", "ch. 29"],
  ["כתובות", "Kesubos"], ["גיטין", "Gittin"], ["קידושין", "Kiddushin"],
  ["הרמב\"ם", "Rambam"], ["הר\"ן", "Ran"], ["הרא\"ש", "Rosh"], ["הרשב\"א", "Rashba"],
  ["הרמב\"ן", "Ramban"], ["רש\"י", "Rashi"], ["התו'", "Tosafot"], ["התוס'", "Tosafot"],
  ["ב\"י", "Beit Yosef"], ["ב\"ש", "Beit Shmuel"], ["ב\"ח", "Bach"], ["ב\"מ", "Beit Meir"],
  ["ט\"ז", "Taz"], ["בה\"ט", "Ba'er Hetev"], ["מהרי\"ק", "Maharik"], ["מהרי\"ל", "Maharil"],
  ["נ\"י", "Nekudot Yosef"], ["ריטב\"א", "Ritva"], ["ריב\"ש", "Rivash"], ["ח\"מ", "Choshen Mishpat"],
  ["י\"ד", "Yoreh Deah"], ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ס", "end of siman"],
  ["ע\"ל", "see above"], ["וע\"ל", "and see above"], ["לקמן", "below"], ["שם", "there"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["כך משמע", "so it appears"],
  ["דהיינו", "meaning"], ["כלומר", "meaning"], ["היינו", "meaning"], ["ר\"ל", "meaning"],
  ["לפ\"ז", "therefore"], ["מיהו", "however"], ["אבל", "but"], ["ואם", "and if"],
  ["אע\"פ", "even though"], ["אפי'", "even"], ["דוקא", "specifically"],
  ["בזמן הזה", "nowadays"], ["בזה\"ז", "nowadays"], ["נהגו", "custom"], ["מנהג", "custom"],
  ["וי\"א", "some say"], ["ויש אומרים", "some say"], ["ויש חולקים", "some dispute"],
  ["עיין", "see"], ["ועיין", "and see"], ["עי'", "see"], ["וע'", "and see"],
  ["בפירוש", "explicitly"], ["צ\"ע", "uncertain"], ["נ\"ב", "nb"], ["ס\"ק", "s.k."],
  ["תשו'", "responsum"], ["תשובת", "responsum of"], ["כלל", "kelal"], ["שורש", "root"],
  ["כתב", "wrote"], ["כ'", "wrote"], ["הביא", "brought"], ["פירש", "explained"],
  ["הקשה", "challenged"], ["תמה", "wondered"], ["ס\"ל", "holds"], ["פסק", "ruled"],
  ["כ\"כ", "likewise"], ["וכ\"כ", "and likewise"], ["ג\"ז", "likewise"], ["ה\"ה", "likewise"],
  ["אין", "there is no"], ["אינו", "is not"], ["אינה", "she is not"], ["הוי", "it is"],
  ["צריך", "must"], ["יכול", "can"], ["בעינן", "we require"], ["לא בעינן", "we do not require"],
  ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"], ["לחומרא", "stringently"], ["לקולא", "leniently"],
  ["ספק", "doubt"], ["ודאי", "certainly"], ["מקודשת", "betrothed"], ["מקודש", "betrothed"],
  ["קידושין", "kiddushin"], ["קדושין", "kiddushin"], ["גט", "get"], ["כתובה", "ketubah"],
  ["חופה", "chuppah"], ["ארוסה", "betrothed woman"], ["ארוסין", "betrothal"], ["נשואין", "marriage"],
  ["פנויה", "unmarried woman"], ["פנויה אני", "I am unmarried"], ["אשת איש", "married woman"],
  ["כהן", "kohen"], ["כהנת", "kohenet"], ["חללה", "chalalah"], ["חלל", "chalal"],
  ["עגונה", "agunah"], ["עגון", "agunah"], ["בית דין", "beit din"], ["ב\"ד", "beit din"],
  ["עדים", "witnesses"], ["עד", "witness"], ["העדים", "the witnesses"], ["עדות", "testimony"],
  ["הברה", "rumor"], ["קול הברה", "rumor"], ["הוחזק", "upheld"], ["לא הוחזק", "was not upheld"],
  ["מבטלין", "nullify"], ["מבטל", "nullifies"], ["ביטול", "nullification"],
  ["פלוני", "so-and-so"], ["פלונית", "so-and-so"], ["היום", "today"], ["בעיר זו", "in this city"],
  ["לפלוני", "to so-and-so"], ["נתקדשה", "was betrothed"], ["שנתקדשה", "was betrothed"],
  ["נתקדש", "was betrothed"], ["נתקדשו", "were betrothed"], ["מקודשת", "betrothed"],
  ["ד' דברים", "four elements"], ["לשון עבר", "past tense"], ["סתם", "plainly"],
  ["הגה", "gloss"], ["בהג\"ה", "in the gloss"], ["הגהות", "glosses"],
  ["פרישה", "Perishah"], ["חידושי מהרי\"ט", "Chiddushei Maharit"], ["כנה\"ג", "Knesset HaGedolah"],
  ["הכנה\"ג", "Knesset HaGedolah"], ["הג\"מ", "Maggid Mishneh"], ["הג\"ה", "gloss"],
  ["הלכה למעשה", "practical halakhah"], ["למעשה", "in practice"], ["לכ\"ע", "for all"],
  ["לפי", "according to"], ["כדעת", "per the view of"], ["לדעת", "per the view of"],
  ["משום", "because"], ["מטעם", "because"], ["מפני", "because"], ["יען", "because"],
  ["הרי", "behold"], ["הנה", "behold"], ["אכן", "indeed"], ["אולם", "but"],
  ["לכן", "therefore"], ["לפיכך", "therefore"], ["שמא", "perhaps"], ["דילמא", "perhaps"],
  ["ודילמא", "and perhaps"], ["אי", "if"], ["אי נמי", "or also"], ["אי לא", "if not"],
  ["נהי", "although"], ["אמנם", "however"], ["מ\"מ", "nevertheless"],
  ["דוק", "examine"], ["ודוק", "and examine"], ["עכ\"ל", ""], ["וכו'", "etc."],
  ["וכו", "etc."], ["ע\"ש", "see there"], ["וע\"ש", "and see there"],
  ["באורך", "at length"], ["בקצרה", "briefly"], ["בפירוש", "explicitly"],
  ["בסמוך", "nearby"], ["לעיל", "above"], ["לקמן", "below"], ["שם", "there"],
  ["בשם", "in name of"], ["לשון", "language of"], ["לשיטת", "per the view of"],
  ["סבר", "holds"], ["חולק", "disputes"], ["מחלק", "distinguishes"],
  ["תירץ", "answered"], ["מתרץ", "answers"], ["קשה", "difficult"], ["פשיטא", "obvious"],
  ["פשוט", "plain"], ["מבואר", "it is clear"], ["ברור", "clear"], ["ברי", "certain"],
  ["ברי לי", "it is clear to me"], ["ברי לנו", "it is clear to us"],
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
      applyExtra(
        expandAbbrevs(
          raw
            .replace(/^ל'?\s*הטור\s*/, "")
            .replace(/ממשנה/, "from Mishnah")
            .replace(/ומה שאמרו במשנה/, "and what they said in the Mishnah")
            .replace(/הרי זו מקודשת/, "'behold she is betrothed'")
            .replace(/פירוש/, "meaning")
            .replace(/בחזקת ספק מקודשת/, "with a presumption of doubtful betrothal")
            .replace(/וכ"נ מדברי/, "and likewise from")
        )
      )
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
  if (/^כדמקשי/.test(h)) return "As challenged in the Gemara there, and as Rav Papa explained there.";
  if (/^כדמפרש/.test(h)) return "As explained there in the Gemara.";
  if (/^כדתרגמ'/.test(h) || /^כדתרגם/.test(h)) return "As Abaye translated there.";
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
