## Codex Prompt D — OC Rabbi Akiva Eiger Remaining Garbage (3 entries)

### Background

These 3 rabbi-akiva-eiger corpus entries have HE:2 segments but EN:3 segments, where all EN
segments are garbage machine-translation. They need clean retranslation from HE, producing
exactly 2 EN segments to match HE.

The other 14 cases from this batch were fixed algorithmically (the correct translation was
already present — just a stray prior-seif segment needed removal). These 3 are genuine
garbage and require retranslation.

### Task per entry

1. Read he.html — it has exactly 2 `<br />` segments
2. Translate each HE segment into clean academic English → exactly 2 EN segments
3. Write en.html: `segment0<br />\nsegment1\n` (no trailing `<br />`)
4. Verify: en.html has exactly 2 segments; no garbage patterns remain
5. Also fix the matching TXT block (see TXT path per entry)

### Translation rules

- Keep halachic terms: Magen Avraham (or Maga/M.A.), Taz, Bach, Gra, Rama, seif katan (sk/s.k.),
  Mishna Berurah, Shulchan Aruch, etc.
- Expand abbreviations in context: ס"ק = seif katan, מג"א = Magen Avraham, ב"י = Beit Yosef,
  ר"י = Rabbi Yitzchak, ת"ש = Teshuvah Shvut, etc.
- Preserve seif references: "סעיף ב'" = "Seif 2"
- "Heaven's Word", "Heaven's people", "KGB", "Lord's Prayer" are all garbage — do not use
- "Dethalat", "Dakmi", "Shimya", "Skab Diot" etc. are garbage transliterations — translate the Hebrew properly

### File write

`fs.writeFileSync(path, content, {encoding: "utf8"})` — plain UTF-8, no BOM

### TXT block format

Find the block in part-001.txt where the seif number matches. Replace only between
`**** ENGLISH ****` and `**** END BLOCK ****` (multi-block files may need to split clean
EN across the corresponding blocks).

---

### Entry 1: siman252 / seif-002 / rabbi-akiva-eiger

**Corpus:**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman252\seif-002\rabbi-akiva-eiger\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman252\seif-002\rabbi-akiva-eiger\en.html`

**TXT:** `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_001\output\siman_252\rabbi-akiva-eiger\part-001.txt`

**HE (2 segments):**
- HE[0]: מג"א ס"ק ב'. סי' שי"ח ס"ח. זה תמוה דשם מבואר בהיפוך וראיתי שגם בת"ש עמד בזה:
- HE[1]: סעיף ב' וגם שיעשה העכו"ם המלאכה בביתו. והיכא דהמלאכה שעושה הנכרי היא רק מלאכה דרבנן אם שרי בקבולת בביתו של ישראל ע' שלחן שלמה:

**Current EN (all garbage — 3 segments):**
- EN[0]: A.C. S. S. S. S. S. S. S.C. This is the sign of Heaven's Word...
- EN[1]: Article B and He shall also do the work of Heaven in his house...
- EN[2]: Section D. Anything that is cut is allowed to be cut...

**Translation guidance:**
- HE[0] is a note on Magen Avraham s.k. 2 citing siman 318 s.8, noting a contradiction (the
  cited source says the opposite) and observing that Teshuvat Shvut also noted this
- HE[1] is a note on seif 2, about a non-Jew doing work in the Jew's house (for contract/kablan),
  and asks whether if the non-Jew's work is only a rabbinic prohibition, is it permitted as
  kablan in the Jew's home — see Shulchan Shlomo

---

### Entry 2: siman509 / seif-002 / rabbi-akiva-eiger

**Corpus:**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman509\seif-002\rabbi-akiva-eiger\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman509\seif-002\rabbi-akiva-eiger\en.html`

**TXT:** `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_001\output\siman_509\rabbi-akiva-eiger\part-001.txt`

**HE (2 segments):**
- HE[0]: מג"א סק"ב דיו"ט א' חשיב חול. ק' לי לו יהא דקמי שמיא גליא דהוא חול. מ"מ לא היה אפשר לו לתקנו אם א"צ לו אלא ביו"ט ב' דא"כ מה יועיל:
- HE[1]: סעיף ב' אבל מחדדה ע"ג עץ. למ"ש הב"י דגם הרמב"ם פסק כר"י ובהשחזה ג"כ לר"י אסור משום אשוויי מנא. ומה ד"ל הרמב"ם:

**Current EN (all garbage — 3 segments):**
- EN[0]: Maga Skab Diot A. Shikhkin Hul. K. To me if he had a Dakmi Shimya Galia that it is Hul...
- EN[1]: Section 2, but it is sharpened by a tree. The Rambam's model...
- EN[2]: Section B, but sharpened by a tree. In the words of the Holy Qur'an, Heaven's Word...

**Translation guidance:**
- HE[0] notes on Magen Avraham s.k. 2 that the first day of Yom Tov counts as weekday [for certain
  leniencies]. RAE raises a difficulty: even if it is revealed to Heaven that this is a weekday,
  he still could not have fixed it if he did not need it until the second day of Yom Tov — so what
  would it help?
- HE[1] notes on seif 2 about sharpening on wood: since Beit Yosef writes that the Rambam also
  ruled like Rabbi Yishmael, and sharpening is also forbidden according to Rabbi Yishmael as
  "fixing a vessel" (ashvuyei mana) — what then does the Rambam mean?

---

### Entry 3: siman606 / seif-004 / rabbi-akiva-eiger

**Corpus:**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman606\seif-004\rabbi-akiva-eiger\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman606\seif-004\rabbi-akiva-eiger\en.html`

**TXT:** `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_001\output\siman_606\rabbi-akiva-eiger\part-001.txt`

**HE (2 segments):**
- HE[0]: סעיף ד' בהג"ה דהטלת ט' קבין מים. ע' של"ה דרכ"ח:
- HE[1]: מג"א סק"י נוהגין עד שתחשך וכמ"ש סי' תקמ"ח ולאכול סעודה המפסקת על השולחן ע' שו"ת שמש צדקה חא"ח סי' י':

**Current EN (all garbage — 3 segments):**
- EN[0]: Section 4 of the 18th century, Dethalat 9, a water cabin.
- EN[1]: Section 4 of siman 18, Dethalat 9, a water cabin.
- EN[2]: Maga SKI practice until it gets dark, and Kmash C. 168 and eat a meal that breaks on the table...

**Translation guidance:**
- HE[0]: Note on seif 4, hagahah, about pouring nine kavim of water — see Shelah, page 228
- HE[1]: Magen Avraham s.k. 10: the custom is until nightfall, as stated in siman 548, and to eat
  the seudah hamafseket (the final meal before the fast) at the table — see Responsa Shemesh
  Tzedakah, Orach Chayyim siman 10

---

### Verification

After all 3 entries, report:
`Fixed corpus: N | Fixed TXT: M | Failed: K`

For each fixed en.html confirm:
- Segment count = 2 (matches he.html)
- No garbage patterns: no "Heaven's Word", "Heaven's people", "Dethalat", "Dakmi", "Shimya", "SKI", "Skab"
