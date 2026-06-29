#!/usr/bin/env node
/** Commentary translator for simanim 061–065 — chuppah, sheva berakhot, wedding rejoicing. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentary as baseTranslate } from "./_patch-siman-038-eh-translate.mjs";

const EXTRA = [
  ["ברכת חתנים", "blessing of bridegrooms"], ["ז' ברכות", "seven blessings"], ["ז׳ ברכות", "seven blessings"],
  ["שבע ברכות", "seven blessings"], ["ברכת אירוסין", "blessing of betrothal"], ["ברכת אשר ברא", "blessing Who created"],
  ["ברכת המזון", "Grace after Meals"], ["ברהמ\"ז", "Grace after Meals"], ["בהמ\"ז", "after Grace after Meals"],
  ["בפה\"ג", "blessing of the land"], ["כוס", "cup"], ["כוסות", "cups"], ["יין", "wine"], ["שכר", "beer"],
  ["חופה", "chuppah"], ["בני החופה", "members of the chuppah"], ["חופת נדה", "niddah's chuppah"],
  ["לחופה", "to chuppah"], ["מחופתו", "from his chuppah"], ["תחת החופה", "under the chuppah"],
  ["נתייחד", "was secluded"], ["התייחד", "was secluded"], ["יחוד", "seclusion"], ["ביאה", "relations"],
  ["בעילת מצוה", "mitzvah intercourse"], ["בתולה", "virgin"], ["בעולה", "non-virgin"], ["אלמנה", "widow"],
  ["אלמון", "widower"], ["בחור", "bachelor"], ["חתן", "groom"], ["כלה", "bride"], ["חתנים", "grooms"],
  ["ארוסה", "betrothed woman"], ["ארוסין", "betrothal"], ["נשואין", "marriage"], ["נישואין", "marriage"],
  ["כתובה", "ketubah"], ["עיקר כתובה", "principal ketubah"], ["תוספת", "additions"], ["תוספת כתובה", "ketubah additions"],
  ["נדה", "niddah"], ["טהרה", "purity"], ["טהרתה", "her purity"], ["שבעה נקיים", "seven clean days"],
  ["ראויה לביאה", "fit for relations"], ["חולנית", "ill woman"], ["חולת מות", "mortally ill"],
  ["שמחה", "rejoicing"], ["שמח", "rejoices"], ["משתה", "feast"], ["ז' ימי המשתה", "seven days of the feast"],
  ["שלשה ימים", "three days"], ["שלשים יום", "thirty days"], ["שנים עשר חדש", "twelve months"],
  ["פנים חדשות", "new faces"], ["עשרה", "ten"], ["מן המנין", "among the number"],
  ["שהשמחה במעונו", "whose joy is in His abode"], ["נברך שהשמחה", "Blessed is He whose joy"],
  ["עין הרע", "evil eye"], ["מצוה לשמח", "mitzvah to rejoice"], ["מרקד", "dances"], ["נאה וחסודה", "fair and gracious"],
  ["אפר", "ashes"], ["תפילין", "tephillin"], ["אבילות ירושלים", "mourning for Jerusalem"],
  ["שובר כוס", "breaks a cup"], ["זריקת אוכלין", "throwing food"], ["מת וכלה", "corpse and bride"],
  ["מעבירין את המת", "they pass the corpse"], ["הסתכל בכלה", "look at the bride"],
  ["תכשיטין", "ornaments"], ["פריעת ראשה", "uncovered hair"], ["מתענין", "fast"],
  ["חול המועד", "intermediate days of festival"], ["ערב שבת", "erev Shabbat"], ["מוצאי שבת", "motza'ei Shabbat"],
  ["ראש חודש", "beginning of the month"], ["לבנה במלואה", "moon is full"], ["טענת בתולים", "claim of virginity"],
  ["מציאתה", "her found articles"], ["מעשה ידיה", "earnings of her hands"], ["קונה קנין", "acquiring kinyan"],
  ["שבת", "Shabbat"], ["יום טוב", "Yom Tov"], ["סעודה שלישית", "third meal"],
  ["השמש", "servant"], ["השמשים", "servants"], ["בני ביתו", "his household"],
  ["בית חתנים", "groom's house"], ["בתים", "houses"], ["בעיר אחרת", "another city"],
  ["ב\"י", "Beit Yosef"], ["ב\"ש", "Beit Shmuel"], ["ב\"ח", "Bach"], ["ב\"מ", "Beit Meir"],
  ["ט\"ז", "Taz"], ["בה\"ט", "Ba'er Hetev"], ["בה\"י", "Be'er Heitev"], ["עבה\"ט", "Ba'er Heitev"],
  ["הר\"ן", "Ran"], ["הרא\"ש", "Rosh"], ["הרמב\"ם", "Rambam"], ["הרמב\"ן", "Ramban"], ["רש\"י", "Rashi"],
  ["התו'", "Tosafot"], ["התוס'", "Tosafot"], ["מרדכי", "Mordekhai"], ["הג\"מ", "Maggid Mishneh"],
  ["מהרי\"ל", "Maharil"], ["מהרי\"ק", "Maharik"], ["ריב\"ש", "Rivash"], ["ריטב\"א", "Ritva"],
  ["ח\"מ", "Choshen Mishpat"], ["י\"ד", "Yoreh Deah"], ["א\"ח", "Orach Chayyim"],
  ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ק", "s.k."], ["ס\"ס", "end of siman"],
  ["ע\"ל", "see above"], ["וע\"ל", "and see above"], ["לקמן", "below"], ["שם", "there"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["כך משמע", "so it appears"],
  ["דהיינו", "meaning"], ["כלומר", "meaning"], ["היינו", "meaning"], ["ר\"ל", "meaning"],
  ["לפ\"ז", "therefore"], ["מיהו", "however"], ["אבל", "but"], ["ואם", "and if"],
  ["אע\"פ", "even though"], ["אפי'", "even"], ["דוקא", "specifically"],
  ["בזמן הזה", "nowadays"], ["בזה\"ז", "nowadays"], ["נהגו", "custom"], ["מנהג", "custom"],
  ["וי\"א", "some say"], ["ויש אומרים", "some say"], ["ויש חולקים", "some dispute"],
  ["עיין", "see"], ["ועיין", "and see"], ["עי'", "see"], ["וע'", "and see"],
  ["בפירוש", "explicitly"], ["צ\"ע", "uncertain"], ["נ\"ב", "nb"],
  ["תשו'", "responsum"], ["תשובת", "responsum of"], ["כלל", "kelal"], ["שורש", "root"],
  ["כתב", "wrote"], ["כ'", "wrote"], ["הביא", "brought"], ["פירש", "explained"],
  ["הקשה", "challenged"], ["תמה", "wondered"], ["ס\"ל", "holds"], ["פסק", "ruled"],
  ["כ\"כ", "likewise"], ["וכ\"כ", "and likewise"], ["ג\"ז", "likewise"], ["ה\"ה", "likewise"],
  ["אין", "there is no"], ["אינו", "is not"], ["אינה", "she is not"], ["הוי", "it is"],
  ["צריך", "must"], ["יכול", "can"], ["בעינן", "we require"], ["לא בעינן", "we do not require"],
  ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"], ["לחומרא", "stringently"], ["לקולא", "leniently"],
  ["מעכבות", "are me'akev"], ["אין מעכבות", "are not me'akev"], ["גמורה", "complete"],
  ["קידושין", "kiddushin"], ["קדושין", "kiddushin"], ["גט", "get"], ["מקודשת", "betrothed"],
  ["בית דין", "beit din"], ["ב\"ד", "beit din"], ["עדים", "witnesses"],
  ["הגה", "gloss"], ["בהג\"ה", "in the gloss"], ["הגהות", "glosses"],
  ["פרק", "chapter"], ["דף", "folio"], ["ע\"א", "folio a"], ["ע\"ב", "folio b"],
  ["כתובות", "Kesubos"], ["גיטין", "Gittin"], ["קידושין", "Kiddushin"],
  ["דוק", "examine"], ["ודוק", "and examine"], ["עכ\"ל", ""], ["וכו'", "etc."],
  ["ע\"ש", "see there"], ["וע\"ש", "and see there"], ["באורך", "at length"],
  ["בשם", "in name of"], ["לשון", "language of"], ["לשיטת", "per the view of"],
  ["סבר", "holds"], ["חולק", "disputes"], ["תירץ", "answered"], ["קשה", "difficult"],
  ["פשיטא", "obvious"], ["מבואר", "it is clear"], ["ברי", "certain"],
  ["הרי", "behold"], ["הנה", "behold"], ["לכן", "therefore"], ["לפיכך", "therefore"],
  ["שמא", "perhaps"], ["מ\"מ", "nevertheless"], ["למעשה", "in practice"],
  ["בטעות", "in error"], ["קידושי טעות", "mistaken kiddushin"], ["יורשה", "inherits her"],
  ["יורש", "inherits"], ["אסור", "forbidden"], ["מותר", "permitted"],
  ["מלאכה", "work"], ["עשיית מלאכה", "doing work"], ["סעודה", "feast"], ["סעודת", "meal of"],
  ["הדרשה", "sermon"], ["דרוש", "preach"], ["קריאת הכתובה", "reading the Torah scroll"],
  ["אחיות", "sisters"], ["נכריות", "non-Jewish women"], ["איבה", "hatred"],
  ["חופות עניות", "poor chuppahs"], ["חופות עשירות", "rich chuppahs"],
  ["מברך", "blesses"], ["מברכין", "they bless"], ["אומרים", "they say"],
  ["שמעו", "heard"], ["שמע", "heard"], ["אוכלין", "eat"], ["אוכל", "eats"],
  ["מזמנין", "invite"], ["מזמין", "invites"], ["בני חורין", "free men"],
  ["קטנים", "minors"], ["עבדים", "slaves"], ["אלמון שנשא אלמנה", "widower who married widow"],
  ["בחור שנשא", "bachelor who married"], ["בתולה נשאת", "virgin marries"],
  ["בעולה נשאת", "non-virgin marries"], ["יום ראשון", "first day"],
  ["לילה ויום", "night and day"], ["יום חמישי", "fifth day"],
  ["יום רביעי", "Wednesday"], ["יום חמישי", "Thursday"], ["יום א'", "Sunday"],
  ["מצא בתולים", "found virginity"], ["בדקה", "examined"], ["דם", "blood"],
  ["שכבת זרע", "semen"], ["אבר חי", "living organ"], ["פורש", "withdraws"],
  ["הרחקה", "distancing"], ["מטתה", "her bed"], ["מטה", "bed"], ["סדין", "sheet"],
  ["קטנה", "minor"], ["זמנה לראות", "time to see"], ["ראתה", "saw"],
  ["תפסוק", "stop"], ["תבדוק", "examine"], ["ימי שימושה", "days of her usage"],
  ["אגוז בגן עדן", "nut in the Garden of Eden"], ["ברך", "blessed"], ["מברך", "blesses"],
  ["מחול על שמחתה", "waive her rejoicing"], ["כופין אותו", "they compel him"],
  ["כבודו", "his honor"], ["כבודה", "her honor"], ["קרובי הכלה", "bride's relatives"],
  ["מייבמים", "perform yibbum"], ["מחזיר גרושתו", "remarries his divorcee"],
  ["מן הנשואין", "from marriage"], ["מן האירוסין", "from betrothal"],
  ["תלמוד תורה", "Torah study"], ["מבטלין", "suspend"], ["הכנסת כלה", "bringing a bride"],
  ["לשום", "to give"], ["לאבילי ציון", "to mourners of Zion"], ["פאר תחת אפר", "beauty instead of ashes"],
  ["כל בו", "Kol Bo"], ["סמ\"ק", "Semak"], ["ספר חסידים", "Sefer Chasidim"],
  ["מ\"כ מנהגים ישנים", "Minhagim Yeshanim"], ["תא\"ו", "Tashbetz"],
  ["רבינו ניסים", "Rabbeinu Nissim"], ["ר' יהודה בר אילעי", "R' Yehuda bar Ilai"],
  ["ר' יהודה", "R' Yehuda"], ["ר\"י", "R' Yehuda"], ["ר\"י מפריז", "R' Yehuda of Paris"],
  ["אשיר\"י", "Ashiri"], ["הגהות מיי'", "Hagahot Maimoniyot"], ["הגהות מיימוניות", "Hagahot Maimoniyot"],
  ["פ\"י דאישות", "ch. 10 Laws of Marriage"], ["פ\"ק דכתובות", "first chapter of Kesubos"],
  ["פ\"ק דמ\"ק", "first chapter of Moed Katan"], ["פרק אע\"פ", "chapter Even if"],
  ["פרקי ר\"א", "Pirkei R' Eliezer"], ["ארבע מיתות", "Four Deaths"],
  ["האשה שנתארמלה", "The Woman Who Was Widowed"], ["פ\"ק דמגילה", "first chapter of Megillah"],
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
  if (/^ממשנה/.test(h)) return h.replace(/^ממשנה/, "From Mishnah").replace(/שם/, "there").replace(/\s+/g, " ").trim() + ".";
  if (/^כדמקשי/.test(h)) return "As challenged in the Gemara there.";
  if (/^כדמפרש/.test(h)) return "As explained there in the Gemara.";
  if (/^לשון הרמב"ם/.test(h)) return applyExtra(h.replace(/^לשון הרמב"ם/, "Rambam's language")) + ".";
  if (/^משנה/.test(h)) return applyExtra(h.replace(/^משנה/, "Mishnah")) + ".";
  if (/^בריית'/.test(h) || /^ברייתא/.test(h)) return applyExtra(h.replace(/^בריית'/, "Baraita").replace(/^ברייתא/, "Baraita")) + ".";
  if (/^טור/.test(h)) return applyExtra(h.replace(/^טור/, "Tur")) + ".";
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
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Hashem's mercy/i,
  /Hashem's presence/i, /Capernaum/i, /MYMEMORY/i, /Philistines/i, /thou shalt/i,
  /thou,?\s/i, /the Lord's/i,
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
