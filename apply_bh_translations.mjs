/**
 * apply_bh_translations.mjs
 * Applies AI-translated Beer HaGolah en.html files.
 * Validates brSegs(newEn) === brSegs(he) before writing.
 * Usage: node apply_bh_translations.mjs [--dry]
 */
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()).length; }
function en(segs) { return segs.join('<br />\n'); }
function loc(siman, seif) { return path.join(base, siman, seif, 'beer-hagolah', 'en.html'); }

// Translations: [siman, seif, [...segments]]
// Each segment becomes a <br>-separated block.
const TRANS = [
  ['siman86','seif-003',[
    'Rambam there, according to his reading of the Gemara; and it seems to me that this is also the view of Raavad there in his glosses, who explained the passage as speaking of a Jew who is not established as trustworthy — meaning, who is also not suspected.',
    '(1) See what I cited above in siman 83, seif 7.',
  ]],
  ['siman95','seif-007',[
    'Beit Yosef; and as Rashba wrote regarding fish that rose in a bowl — above, seif 1.',
    '(1) Because it is not comparable to fish that rose in a bowl — this case differs in that the bowls touch the pot and flavor is absorbed from one to another, making it second-degree flavor of a forbidden substance; furthermore, when the second-degree flavor of meat and milk enters the water, the water is immediately forbidden and in turn forbids the pot and the pan.',
  ]],
  ['siman96','seif-004',[
    'Tosafot there left this as requiring study; and so wrote the Tur in the name of Sefer HaTerumah (and Semag and Ohr Zarua and all later authorities).',
    '(1) The non-Jew\'s knife governs what is adjacent to it, and following Rabbeinu Tam who holds that the piece becomes a carcass, this applies to all forbidden matters — for even in meat cooked with milk, if one cuts it into very small pieces, sixty-fold against the place of the knife suffices.',
  ]],
  ['siman116','seif-004',[
    'Tur in the name of his father, the Rosh (see Orach Chaim siman 173).',
    '(1) In that case, even sixty-fold does not nullify it, since danger to life is more stringent than a ritual prohibition — Taz, in the name of Darkhei Moshe and Maharshal.',
  ]],
  ['siman125','seif-001',[
    'Baraita, Avodah Zarah 72, as explained by Rav Sheshet. Tur in the name of his father the Rosh, in his rulings on Rav Papa\'s statement \'a non-Jew on a barrel\' — there, daf 60 — and so ruled Rabbeinu Tam.',
    'Per Rav Huna who holds that a connected stream constitutes a connection — Avodah Zarah 72 — Rashba, Sefer HaTerumah, Semag; and this also appears to be the view of Rif, Raavad, Rabbenu Yeruham, and Rambam in chapter 12. The laws of connected streams are explained in the following siman. There, daf 58, in the incident of Rabbi Yochanan ben Arza etc. — the Gemara\'s conclusion is that one\'s force without intent is not subject to rabbinic decree.',
  ]],
  ['siman125','seif-005',[
    'Statement of Rav Ashi: \'Whatever is pure regarding a zav, etc.\' — according to the interpretations of Rashi and Tosafot there, daf 60.',
    'There, following Rav Ashi\'s resolution of the mishnah \'she threw it in anger, etc.\' — there, daf 61.',
  ]],
  ['siman127','seif-003',[
    'Beit Yosef in the name of an early authority, where the prohibition is not established; and the Rosh in chapter 3 of Mo\'ed Katan, daf 35, who derives it from \'she may trim them for herself\'; and Rabbenu Yeruham.',
    'There — a matter of presumed permissibility; she does not have full authority since they contradict her.',
  ]],
  ['siman134','seif-003',[
    'From the passage \'when Rav Yitzchak bar Yosef came, etc.\' — there. Tur in the name of his father the Rosh; and so ruled Rambam in chapter 15. Beit Yosef wrote that although many great authorities disagree, in rabbinic matters we follow their view.',
    '(1) Meaning: permitted for benefit but forbidden to drink, as in the following seif.',
  ]],
  ['siman134','seif-011',[
    'Following Tosafot there, even different-species mixtures; and the Rosh in his rulings; and Ramban and Rashba. And it seems to me that all the more so in seif 1, regarding yayin nesech that drips from a small crack into a cistern — if it accumulates to the amount that imparts flavor, it is forbidden, since Rashba in the name of Rabbi Zerachya and Ran in the name of Raavad wrote that with wine in wine we do not say each drop is nullified as it falls, but rather it re-becomes forbidden when it accumulates; while with wine in water, they wrote that each portion is nullified separately and becomes complete permissibility, such that it not only does not join to forbid but even joins with the permissible — and Beit Yosef rules like those who disagree regarding wine in water, and all the more so wine in wine.',
    '(1) Meaning: at the beginning of his discussion he wrote \'to what does this apply — where it fell, etc.\' — which implies explicitly that if it dripped from a crack it does not forbid by imparting flavor. This follows Rambam\'s language, and he holds the view of Raavad and Rav Zerachya cited above. However, one should not infer from the Mechaber\'s words in seif 1 \'even the entire day\' that it does not re-become forbidden — that language comes from Rabbi Yitzchak etc. in the Gemara, and Tosafot there explain it as meaning that it should not drip so much that there is no longer sixty-fold of permitted substance.',
  ]],
  ['siman134','seif-013',[
    'Following the second version of Rav Shmuel bar Yehuda there in the Gemara — the consensus of the authorities. And in the first clause, regarding yayin nesech which is a Torah prohibition, he ruled like Rambam who ruled according to the first version.',
    '(1) However, in Beit Yosef he ruled unlike Rambam, making no distinction between yayin nesech and ordinary gentile wine — in either case it is always nullified, whether the water fell first or last; see there.',
  ]],
  ['siman138','seif-009',[
    'There, in the statement of Rabbi Yehuda.',
    'Tur in siman 135 in the name of Ramban; and so wrote Rashba. So it is implied from Rashi\'s commentary there; and so wrote Rashba.',
  ]],
  ['siman145','seif-007',[
    'Statement of Rabbi Yochanan there, daf 54.',
    'According to Rashi\'s commentary there; and so is implied from Rambam\'s words in chapter 8.',
  ]],
  ['siman151','seif-004',[
    'Rambam\'s language in chapter 9 of Laws of Forbidden Mixtures, halacha 5, and following Rabbi Yehuda in the mishnah there — since Rav Asi posed his query according to his view there on daf 14, this implies the halacha follows his view.',
    '(1) And see at the end of siman 139 — \'one who restrains himself will succeed.\'',
  ]],
  ['siman151','seif-010',[
    'Mishnah, Avodah Zarah daf 15.',
    '[10] [Gemara there, 15b].',
  ]],
  ['siman153','seif-002',[
    'Baraita there.',
    '(1) Rashi explains: the sons of Noah are forbidden in it, and there is an issue here of \'do not place a stumbling block before the blind.\'',
  ]],
  ['siman161','seif-005',[
    'Following Rabbi Eliezer there, daf 61b — so it is implied from the Gemara there daf 62; and this is the consensus of all the authorities.',
    'Nimukei Yosef in the name of Rashba and Ran, on account of the positive commandment \'and your brother shall live with you\'; and so wrote Rivash in a responsum.',
  ]],
  ['siman162','seif-002',[
    'There in the mishnah, as explained by Rabbi Yitzchak there, and as taught by Rabbi Chiya in support.',
    'Sefer Mitzvot Katan; and Rosh in responsum, klal 140, siman 16; and responsum of Rashba; and so wrote Kol Bo.',
  ]],
  ['siman168','seif-017',[
    'Tur in the name of his father the Rosh, in responsum klal 108, simanim 12 and 18.',
    '(1) However, there is no prohibition, since perhaps the non-Jew lent against it, or purchased it, or stole it.',
  ]],
  ['siman168','seif-022',[
    'Tur in the name of Ri, and that Ramban also agrees in this.',
    '(1) As I corrected it — so it is in Beit Yosef.',
  ]],
  ['siman173','seif-018',[
    'There in the Gemara: since they still require collection, they are considered as if they do not exist.',
    '(1) Tosafot explain: for instance, a cow or a garment. And it seems to me that the reason is: since one gives the other a cow or garment unspecified, and their value is not known either when he receives the money or when he returns it, and the concept of \'the market price has been established\' does not apply to them — the Sages did not decree in this case, since it does not have the appearance of interest, given that he may give him any cow he wishes of lesser value, and the same applies to a garment.',
  ]],
  ['siman173','seif-019',[
    'Statement of Rav, following the second version there, daf 64a — the consensus of the authorities.',
    '(1) There in the Gemara.',
  ]],
  ['siman175','seif-001',[
    'As per the statement of Rabbi Asi in the name of Rabbi Yochanan — Bava Metzia daf 72 — Rif; and Rambam in chapter 9 of Laws of Lending. Mishnah there, as Rav Asi said to Rabbi Zeira.',
    'As explained there in the Gemara, daf 63b: he said to him, \'Take your favor and throw it on the thorns — what benefit have you done me? If I had money in hand, I could have purchased grain and dates at a lower price.\'',
  ]],
  ['siman175','seif-004',[
    'Mishnah there.',
    'Per the statement of Rav there, daf 74a — Rif, Rosh, and Rambam in chapter 9.',
  ]],
  ['siman176','seif-002',[
    'Tosafot there, who brought proof from the Tosefta; and so wrote the Rosh; and so wrote Maggid Mishneh at the end of chapter 5 of Laws of Lending that this is Rambam\'s view.',
    '(1) Like the law of a lessee who is liable for theft and loss.',
  ]],
  ['siman177','seif-036',[
    'Rambam in chapter 5 of Laws of Lending, halacha 10; and Maggid Mishneh wrote that this is obvious and derived from there.',
    '(1) Meaning: perhaps there was a loss in the venture, in which case the investor should have absorbed half the loss; but the heir does not know the terms between them and collects the full note without losing anything — and this constitutes interest.',
  ]],
  ['siman177','seif-040',[
    'Students of Rashba in the name of Ramban (see Beit Yosef).',
    '(1) Meaning: he takes a quarter of the profit, plus one-third of his partner\'s share which is also a quarter, since his partner took three-quarters — thus totaling one half.',
  ]],
  ['siman178','seif-003',[
    'Rambam in chapter 11 wrote \'let his hair grow from behind\' from the baraita in Bava Kamma daf 83a; and Sotah daf 49: \'one who wears a forelock in front, this is the ways of the Amorite.\'',
    '(1) And he further wrote that whoever does one of these or the like receives lashes; and Tur cited this. It is not a generalized prohibition, since all of them are forbidden from the same source. Beit Yosef wrote that even though in his commentary on the Mishnah he did not write so, one should rely more on his words in his Mishneh Torah than on his words in the Mishnah commentary.',
  ]],
  ['siman179','seif-009',[
    'Baraita taught by Rashba, Chullin daf 95b.',
    '(1) Meaning: he built a house, or a son was born to him, or he married a wife — so Rashi explained.',
  ]],
  ['siman183','seif-001',[
    'Baraita, Niddah daf 36b.',
    '(1) Meaning: \'under compulsion\' — for instance, she jumped, or she saw animals or birds coupling and she saw [blood]; and \'willingly\' means she saw [blood] on her own accord.',
  ]],
  ['siman187','seif-004',[
    'There in the baraita, daf 66a.',
    '(1) Meaning: doubled — and a makhol is a long splinter. Rashi.',
  ]],
  ['siman188','seif-002',[
    'There in the mishnah, daf 19a, following the Sages; and according to the interpretation of Tosafot in their comment beginning \'the green\' there [19b].',
    '(1) Although we rule like Beit Hillel who declare pure — as the water of roasted meat or the water of fenugreek — since they incline toward a reddish appearance and we are not expert in identifying shades of blood, we declare them impure. We declare pure only white and green, since they have no inclination toward redness whatsoever.',
  ]],
  ['siman194','seif-005',[
    'Beit Yosef, from the implication of Rambam\'s words.',
    '(1) Rema wrote in responsum siman 94 that the custom in these lands is to be lenient for women who give birth and who immersed before forty days for a male, etc. — especially since many great authorities wrote that this borders on the custom of the Sadducees; see Rambam in chapter 11 of Laws of Prohibited Relations. And Taz wrote that those who are lenient, there is no issue of \'breaching the fence.\'',
  ]],
  ['siman195','seif-016',[
    'As in the case of Shmuel\'s wife there.',
    '(1) As in the case of Abaye\'s wife there.',
  ]],
  ['siman197','seif-005',[
    'Tur; and so wrote Rashba and other later authorities.',
    'There, in the name of Rashba in the name of Rabbi Eliezer, and that he agreed to this; and so wrote Ramban; see Beit Yosef.',
  ]],
  ['siman198','seif-015',[
    'Tosefta — that she is scrupulous not to become unattractive to her husband.',
    '(1) Called in the vernacular morlaken or kaltines.',
  ]],
  ['siman198','seif-043',[
    'There, in the name of Ravyah in the name of the Geonim — the reason being that the fingernail is part of the body; and so wrote Sefer HaTerumah.',
    '(1) I have heard: this applies as long as she has not yet cohabited with her husband, but not after she has already cohabited — because she may have conceived, and if you require a second immersion you cast aspersion on that child; so wrote Taz, and he heard that a great authority gave the same ruling.',
  ]],
  ['siman199','seif-010',[
    'Statement of Rava there in Niddah, daf 66b: \'if [immersion is] close to the [hair] washing, etc.\'',
    'Tur in the name of Rashba in Torat HaBayit — and what is \'close\'? On that same day; and so wrote Razah. In chapter 2 of Laws of Mikvaot, following his textual reading of the Gemara there, as Kesef Mishneh and Beit Yosef wrote.',
  ]],
  ['siman201','seif-023',[
    'Mishnah at the beginning of chapter 5 of Mikvaot.',
    '(1) Meaning: when it is full, or when there is a hole in its side; and if it was perforated at the base of the vessel like the tube of a water-skin, it is permitted to immerse even within the vessel, like the first opinion in the mishnah at the end of chapter 4 of Mikvaot. Maharshal.',
  ]],
  ['siman201','seif-050',[
    'Mishnah at the beginning of chapter 3 of Mikvaot, following the Sages — the consensus of the authorities (and Rashba in Sha\'ar HaMayim).',
    '(1) Meaning: to the quantity of water that was in it at first, plus a small additional amount sufficient to reduce the [drawn water] below three lugin — even though the water that floats up and flows out of the cistern is a mixture of the originally invalidated water and the valid water that flows in later.',
  ]],
  ['siman203','seif-004',[
    'Jerusalem Talmud, chapter 1 of Nedarim.',
    '(1) (Meaning: in which they write the sins he committed.)',
  ]],
];

let ok=0, skip=0, fail=0;
for (const [siman, seif, segs] of TRANS) {
  const enPath = loc(siman, seif);
  const hePath = enPath.replace('en.html','he.html');
  if (!fs.existsSync(hePath)) { console.log('NO HE:', siman, seif); fail++; continue; }
  const he = fs.readFileSync(hePath,'utf8').replace(/^﻿/,'').trim();
  const heSegs = brSegs(he);
  if (heSegs !== segs.length) {
    console.log('SEG MISMATCH', siman, seif, 'he='+heSegs, 'trans='+segs.length);
    skip++; continue;
  }
  const newEn = en(segs);
  if (DRY) { console.log('DRY OK', siman, seif, segs.length+'segs'); ok++; continue; }
  try { fs.writeFileSync(enPath, newEn, 'utf8'); ok++; }
  catch(e) { console.log('WRITE FAIL', siman, seif, e.message); fail++; }
}
console.log(`\nDone: ${ok} written, ${skip} skipped (seg mismatch), ${fail} failed.`);
