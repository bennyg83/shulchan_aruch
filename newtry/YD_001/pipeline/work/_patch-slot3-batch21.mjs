#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_297/beer-hagolah/part-001.txt': {
    '12#_': 'Language of Rambam in chapter 2 until seif 14.',
  },
  'siman_297/beur-hagra/part-001.txt': {
    '16#א':
      'Square. Tosefta — Rosh brought there — taught: between etc.; he explains that "between" refers also to grain; "and a half" means a fourth of an amah and a fifth, for so the calculation comes out; Ramam there; and they said in Yerushalmi there — provided it is not cramped from its four directions — end of his words.',
    '16#ב':
      'And if there was not etc. Yerushalmi chapter 5 — two species in a valley, two in a ruin, two species and he divided them with a fence — R\' Yochanan said exempt, Rashbal said liable etc.; the mishnah argues on R\' Yochanan — one who sows wheat and barley as one — behold kilayim; he resolved it as set within six on six — for R\' Yochanan he is not liable until they are six on six uprooted within a grain field or fenced, as this — R\' Yehuda said it is not kilayim; R\' Zeira — R\' Yochanan like his view of R\' Yoshiah in a vegetable field — a handbreadth; R\' Yosi — one who wishes can challenge R\' Zeira on this of R\' Yochanan from the Sages, as the Sages said regarding prohibition beit rova for lashes six on six, so R\' Yoshiah regarding prohibition six on six for lashes a handbreadth; Rambam explains: R\' Yosi — one can challenge R\' Zeira that R\' Yochanan does not follow the Sages in what is written regarding vegetables a handbreadth as the Sages etc., and the Sages concede to him; but in what is written here regarding grain it is not kilayim — end — not like Raavad who wrote specifically for R\' Yehuda; and this is written in seif 57 "and it is not" etc.',
    '26#א':
      'And a furrow between etc. — as written in Shabbat there that he said sitbiya etc.; and as written in seif 19 that vegetables are permitted only with furrow distancing.',
    '26#ב': 'Because etc. — in Shabbat there.',
    '37#_':
      'If the bed was six by six etc. Yerushalmi there — we learned: if it has a border a handbreadth high, one sows within it thirteen seed types — three on each border and one in the middle; "give six in the middle" is resolved that the borders reduce six; if when the borders reduce six, in this we learned — R\' Eliezer: six in the middle and we established them etc.; as this, R\' Chiya taught — R\' Eliezer: eighteen — evidently we do not follow the Sages except when the borders reduce six handbreadths; but when they are outside the bed, R\' Yochanan concedes one sows eighteen seed types; Ramam in his commentary — how does one sow eighteen? But Rosh reads "give five," and another view for him and for Rosh — see there.',
    '39#_': 'One who wishes etc. — Rashi there s.v. v\'ogel etc. and Tosafot there s.v. amar R\' Yohanan etc., who explain in Arabic.',
    '51#ג':
      'In all prohibitions etc. — as written in Shabbat 50 — and if R\' Shimon etc., Nedarim etc., and Zevachim 91b — Lika R\' Yosi etc. Likut: in all prohibitions etc. — as written in chapter 9 and merchants etc. — end. Likut: in all prohibitions etc. — for we hold halachah like R\' Shimon as written in Shabbat chapter 1 (95a) and Eruvin chapter 1 — nowadays etc. and merchants many; so in all prohibitions; as written in Bekhorot 34a until now etc.; and see above siman 301 note 66 and siman 313 note 6 — end.',
  },
  'siman_297/siftei-kohen/part-001.txt': {
    '5#_':
      'Such as wild ox etc. are permitted. Wonder — above siman 288 seif 4 the rav and Atzei Chayim wrote: some say wild ox is a chayah species — then obviously forbidden with an ox, as proven in mishnah, Yerushalmi, and poskim — how did he rule here in general like the Mechaber? So too Atzei Chayim copied the Mechaber\'s words here — requires study.',
  },
  'siman_297/turei-zahav/part-001.txt': {
    '2#_':
      'And it is permitted to tell a non-Jew to sow for him etc. — it appears he speaks of an Israelite, and so Tur wrote per Rambam — and it is difficult: regarding kilay hakerem in chutz la\'aretz he ruled at end of siman 296 that specifically a minor non-Jew is permitted, not an adult, even though it is rabbinic; here regarding kilay zera, which is d\'oraisa in Eretz Yisrael, he permitted in general to any non-Jew. Further difficulty from sirus — he ruled in Even haEzer siman 5 seif 14 forbidden through a non-Jew, and so Rambam chapter 16 of forbidden relations. This is because we find in chapter HaPoalim (Bava Metzia daf 90) that it must not be publicized regarding amirah to a non-Jew on a lav — why permit here through a non-Jew? Further, in chapter 1 of Kilayim Rambam wrote explicitly that an Israelite may not let a non-Jew graft his tree. Perhaps Rambam holds: whatever is forbidden even in chutz la\'aretz is a bodily obligation — therefore forbidden even amirah to a non-Jew; not so kilay zera, whose prohibition is only in Eretz Yisrael — not a bodily obligation, and amirah to a non-Jew is permitted. It appears here he means: permitted to tell a non-Jew to sow for the non-Jew\'s own need, not for an Israelite\'s need; so I found in Kesef Mishnah chapter 1 of Kilayim in the name of R\' Yitzchak Kurkus — with this the Tur\'s difficulty is resolved too: what difference if he tells him to sow in an Israelite\'s field — for it is forbidden to uphold afterward — tell him it is for the non-Jew\'s need, which is obviously permitted. One may say the main reason forbidden to sow for a non-Jew is because a non-Jew has no acquisition in Eretz Yisrael; if so, even amirah to a non-Jew in his own field would be forbidden, since the land is Eretz Yisrael — it would be as telling a non-Jew to sow kilayim in an Israelite\'s field; this teaches it is permitted.',
    '45#_':
      'The offspring born from them is permitted etc. It seems simple that all the more the animal itself that was violated is permitted to eat if a pure species; in Temurah there is a dispute regarding the violated one that became pregnant after violation, for permitting the offspring to Heaven; one who permits there does so because "this and that cause" — meaning the offspring is formed through a father who is permitted; if so, since here the offspring in which both cause are forbidden — the offspring formed in prohibition — nevertheless it is permitted, all the more the mother. Further, the prohibition of crossbreeding applies only to Heaven, and so explicitly in chapter 2 of Kiddushin daf 57 — a violated animal is permitted to a commoner; so explained explicitly in Tosafot Temurah daf 30 s.v. aval nirevu etc.; I wrote this because I saw one teacher forbid a chicken violated by a different species — he did not act well.',
  },
  'siman_297/yad-avraham/part-001.txt': {
    '1#_':
      '(Siman 297 seif 1) And likewise one who sows, weeds, or covers etc. in dust, whether in his hand or with his foot — receives lashes. Rambam beginning of Hilchot Kilayim; see there in Kesef Mishnah who wrote the reason is because he ruled like Rav Yosef at the beginning of Moed Katan — weeding is liable as sowing, and the same for covering. However he challenged this: in Hilchot Shabbat Rambam ruled like Rabbah that weeding is a derivative of plowing. Kesef Mishnah concludes another reason for lashes — because he upholds kilayim through action; Shar HaMelech challenged this — if so, how does Rambam explain the mishnah in Makot regarding one who plows a furrow in shemitah who is lashed — he ruled plowing in shemitah is not lashed, and covering he holds is plowing since he ruled like Rabbah; per me certainly the first words of Kesef Mishnah stand — weeding and covering are liable as sowing, and so he inferred the language grouping them together. That in Shabbat he holds weeding is a derivative of plowing — Kesef Mishnah wrote there in his own honor that Rambam there does not deal with that weeding of Moed Katan. If so, the difficulty is resolved — in that Moed Katan matter he ruled like Rav Yosef; and proof: he ruled like him regarding watering seeds, which is a derivative of sowing — see there; so too here regarding weeding and covering. There Mahari — from Yerushalmi — if so, say also regarding shemitah he is liable for covering, for he holds it is actual sowing; so Radbaz per Rambam regarding shemitah. Shar HaMelech himself in Hilchot Rotzeach wrote Rambam holds covering is an av of sowing.',
  },
};

function patchFile(rel, T) {
  const fp = path.join(ROOT, 'output', rel);
  let s = fs.readFileSync(fp, 'utf8');
  const applied = [];
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const seif = block.match(/^\s*seif: (\d+)/m)?.[1];
    const marker = block.match(/^\s*marker: (.+)/m)?.[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.push(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.includes(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.length} blocks)`);
  return applied.length;
}

let total = 0;
for (const [rel, T] of Object.entries(PATCHES)) {
  total += patchFile(rel, T);
}
console.log(`[PATCHED] ${total} blocks total`);
