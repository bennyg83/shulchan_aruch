import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function getENsegs(siman, seif){
  return brSegs(fs.readFileSync(loc(siman,seif),'utf8').replace(/^﻿/,'').trim());
}

// Off-by-2 batch 4 (cases 31–37, the final batch).
const APPEND_2 = [

  // siman399/seif-001
  // HE[N-1]: ולא מתורת כו'. עבה"ג ודלא כרש"י...
  // HE[N]:   (ליקוט) ולא מתורת כו'. ותדע שהרי אף מקצת שבעה...
  { siman:'siman399', seif:'seif-001',
    prev:`And not as a matter of, etc. See Beur HaGra — and unlike Rashi there s.v. "for it is practiced," etc., for if as Rashi says, the seven-day practices would also apply, since one observes private matters and many are occupied with him; rather, one must say that "it is practiced" — all the thirty-day [mourning] practices — means it is not forbidden to perform public matters; specifically matters within the seven [days are forbidden], and so Mahariv wrote; and see above at the beginning of siman 400 in the gloss, and Shach there paragraph 2 (and in Torat Ha'Adam and in Milchamot he wrote: the reason is that they are negative commandments, and by the rule of the pilgrimage they are also observed in some of them during mourning — therefore when he observes all of them in his mourning, his mourning is not publicized. This implies specifically something that is passive ("sit and do nothing") — unlike Mahariv).`,
    last:`(Supplement) And not as a matter of, etc. And know, for even a portion of the seven [days] applies to him — that he does not wash his garments — and many are occupied with him; rather, since he does not observe it as required, it does not count for him. See there (in Torat Ha'Adam; and so wrote in Milchamot at the end of Mo'ed Katan) (end).` },

  // siman57/seif-003
  // HE[N-1]: שקורין פלקון. רש"י וכל המפרשים פי' אסטור...
  // HE[N]:   (ליקוט) שקורין פלקון. כן פי' בת"ה בשם הערוך...
  { siman:'siman57', seif:'seif-003',
    prev:`Which they call palkon. Rashi and all the commentators explain: astor; and it is written in Terumat HaDeshen — but palkon is below the gas [bird], and afterward he wrote that some explain palkon; and so the Tur wrote both explanations; and the Rav ruled stringently.`,
    last:`(Supplement) Which they call palkon. So explained in Terumat HaDeshen in the name of the Arukh, and he wrote that at first it was explained as yanshuf [owl], and its reading is "gaz"; and Rashi explained astor; and so Terumat HaDeshen agreed, writing: "therefore it appears to me from here that gas means astor," etc.; and likewise there many times — see there; and the Arukh explained: netz — astor; but Rashi explained: ashproyir; and so Ramban wrote there in the Torah, and likewise wrote that gas is astor; and in Makhzor Yofi there he wrote in the name of Rashi that kos is palkon and he disagreed with him — see there. And yanshuf: Targum Onkelos there: kiput; and Rashi explained in the last chapter of Berakhot (57b) that it is tzoyit; and in the Targum of Psalms 102 he wrote "on a kos, a kiput"; and this is what Rashi wrote in [parashat] Shemini there: "kos and yanshuf," etc.; and one must say that both species are within kiput; and see Tosafot in Niddah 23a s.v. "kriya" and in Chullin 63a s.v. "with these" (end).` },

  // siman76/seif-001
  // HE[N-1]: [וכ' דקמ"ל דבעינן מב' צדדים] וכ' דאפילו לגי' ספרדי...
  // HE[N]:   ואוסר כו'. כמ"ש בפ' כ"צ (ע"ה ב') נטף מרוטבו כו' וכמ"ש בסי' ק"ה ס"ר:
  { siman:'siman76', seif:'seif-001',
    prev:`[And he wrote that it teaches us we require from both sides.] And he wrote that even according to the Sephardic reading one can say that for leniency — that it is permitted to salt without subsequent rinsing and without shaking — do not think that the salt becomes forbidden (end).`,
    last:`And he forbids, etc. As written in chapter "all meat" (75b): "a drop dripped from its sauce," etc.; and as written in siman 105 seif 10.` },

  // siman83/seif-004
  // HE[N-1]: (ליקוט) ואם נמצא כו'. שם וכפירש"י והמהבר השמיטו...
  // HE[N]:   (ליקוט) אבל אם כו'. שלכן נסתפקו הגדולים בדג ברבוטא...
  { siman:'siman83', seif:'seif-004',
    prev:`(Supplement) And if it was found, etc. There, and according to Rashi's explanation; and the author omitted it because Raavad and Ra'ah 63a explained what is meant by "head and spine" — meaning he should recognize by them that this is such-and-such a fish and it is pure; and R' Huna [said] specifically that it must be whole — then we rely on recognition by head and spine; but when it is cut and he recognizes by the head or by the belly, no; and R' Nachman said: even when cut, and by recognition of one of them; and see there in Beit David at length; but Ramban and Rashba challenged this — see there in Terumat HaDeshen; and nonetheless he wrote there in the name of Ramban: even though Rashi's explanation is the essential one, nevertheless I am astonished, for I have not seen in any of the Gaonic writings or the authors of books that head and spine should be a sign for fish, and it requires much [study]; and so wrote Terumat HaDeshen HaKatzar; and it is proper to be concerned and stringent, since we have not found any of the Geonim or authors who wrote so; and Beit Yosef wrote that Rambam in his commentary on the Mishnah also explained like Raavad — see there; and he explains there in Beit David the difficulty: "Rav Ukva challenged," etc. — for according to R' Huna he needs a sign; but according to R' Nachman it is difficult; and he answers: "in a [place like a] barrel," etc. (end).`,
    last:`(Supplement) But if, etc. Therefore the great [authorities] were uncertain regarding the barbuta fish — as Tosafot wrote there 40a s.v. "he said," etc. — and they did not examine by head and spine; rather, only when there are pure [fish] that resemble impure ones — so too are there impure [fish] that resemble pure ones; but ordinarily we are not concerned, since they are uncommon — as written [in Chullin 62a] regarding the peres and the osprey; therefore they gave a sign by head and spine; but this is not the case with barbuta which has no scales (end).` },

  // siman83/seif-005
  // HE[N-1]: אבל אם כו'. כ"כ סמ"ק ובזח מתורץ דבת"כ יליף מקרא ציר דגים טמאים...
  // HE[N]:   והיכא דהדגים כו'. עש"ך:
  { siman:'siman83', seif:'seif-005',
    prev:`But if, etc. So wrote Semak; and with this it is resolved that in Torat Kohanim the verse is expounded [regarding] the brine of impure fish (and see Tosafot in Chullin and Bekhorot aforementioned).`,
    last:`And where the fish, etc. See Shach.` },

  // siman83/seif-007
  // HE[N-1]: אא"כ היה כו'. בשם רש"י פי' מומחה היינו בקי בהן...
  // HE[N]:   (ליקוט) אדם שהוחזק בכשרות. דומיא דמומחה דשם בימ"ח מח"ג...
  { siman:'siman83', seif:'seif-007',
    prev:`Unless he was, etc. In the name of Rashi: "expert" means one who is knowledgeable about them; but Ramban explained: like every "expert" in our sugya — meaning one who is trusted and well-established in kashrut; and likewise the Yerushalmi encompasses them: "one may not buy fish innards and intestines except from an expert; and one may not buy tekhelet except from an expert"; but one who says "I salted them" — even a suspect or a gentile is trusted; and as written in Chullin 63b: a baraita, etc. And Raavad wrote: specifically when he is not an expert it suffices to say "I salted them"; but with a gentile or a suspect — according to all opinions [he must say] "these are the fish and these are their innards" — as written there in Chullin: "one who says: of such-and-such a bird," etc.; and here it is stated [ruling] like Ramban and Rashba that the same applies to a gentile and a suspect Jew. And another approach of Rambam: specifically a Jew but a gentile cannot help in any way.`,
    last:`(Supplement) A person who has been established as trustworthy. Like the "expert" mentioned there — Beit David Machon Chagigas (chapter 3); and likewise implied in the Yerushalmi: "a baraita: one may not buy fish innards and intestines except from an expert; and one may not buy tekhelet except from an expert" — implying similar to tekhelet; and the reason is that the ignorant were suspected of buying them from gentiles in the presumption that they are pure. Ran — unlike what appears from Rashi's explanation, who explained "expert" as "knowledgeable about them"; and see Rashi there [b] s.v. "these are the fish," etc. (end).` },

  // siman86/seif-006
  // HE[N-1]: (ליקוט) וי"א כו'. משום שדחו שם אי משום הא לא אריא כו'. סה"ת...
  // HE[N]:   (ליקוט) וי"א כו'. דשינוייא היא ולא סמכינן עלה...
  { siman:'siman86', seif:'seif-006',
    prev:`(Supplement) And some say, etc. Because they refuted [the argument] there: "if because of this there is no difficulty," etc. Sefer HaTerumah; but in Terumat HaDeshen he disagreed with him, since all the Amoraim hold so, and that refutation does not apply (end).`,
    last:`(Supplement) And some say, etc. For it is a refutation and we do not rely on it — as written there; and the essential dispute between them depends on the explanation of the Gemara there 64b — for according to Rashi's explanation it is explicitly proven like our refutation that they are permitted; but the latter view explains it like Tosafot there s.v. "ge'ulei," etc.; and they wrote there that in the Tosefta it implies like R' Tam's explanation — see there; and when you examine this Tosefta carefully (according to the reading Tosafot cited) it also implies like the latter view here — from what is taught there: "eggs cooked with them with impure eggs," etc. ("ge'ulei," etc.) — "eggs cooked with them, and he found," etc. — implying that in the first clause the eggs themselves are impure (and it is not to say that it is explaining: from the fact that it interrupts with the case of "ge'ulei," etc. in between; and it appears that this was the intent of Ran who marveled at him in the Pri Chadash paragraph 11; however according to our reading, and furthermore it wrote there in Tosafot that in the Yerushalmi it implies like Rashi's explanation — and it implies explicitly that they are permitted (end).` },

];

let ok = 0, fail = 0;
for (const { siman, seif, prev, last } of APPEND_2) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== 2) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} (expected 2, he=${heS.length} en=${enS.length})`);
      fail++; continue;
    }
    const newSegs = [...enS, prev, last];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} → ${newSegs.length}`);
    } else {
      fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      console.log(`OK ${siman}/${seif}: ${enS.length}+2 → ${newSegs.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
