#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_276/beur-hagra/part-001.txt': {
    '1#א':
      'He erred and skipped, etc. — see above siman 273 seif 6 that even for a Name one hangs a complete word; and in other languages between R\' Yehuda and R\' Yitzchak, and all the more for R\' Yosi and Rashash — all hold one hangs as written "one who errs, etc." and hangs, etc. [and likewise Rashba who disagrees said because one does not write the Name, etc. — how does he do it? Hagahot Maimoniyot: he hangs what he scraped and erased]; and in Yerushalmi there they hang in sifrei Torah but not in tefillin or mezuzot, and even a complete verse they said there: if there are only three lines they may fix — and Avodat HaGershuni in the name of Rashbatz.',
    '1#ב':
      'But not so. Tur; and likewise above siman 273 seif 3 that a complete word one does not write between page and page — and Avodat HaGershuni there. (Likut) But not so. Maharshal chapter 5 halacha 8 — one who errs and skips a line, etc. — end of his words.',
  },
  'siman_215/beur-hagra/part-001.txt': {
    '5#ד':
      'But on, etc. — see Tosafot Shevuot 20 side b s.v. dechi; and further for, etc.; and he said between in its fulfillment — meaning Tosafot\'s question there who wrote; however for Rabbenu Tam, etc. [and see Tosafot there 27 side a s.v. lekayem, etc.]; and we say in Makkot 22 side a: let it count, etc., sworn, etc.; and if so let it count in konam.',
  },
  'siman_220/rabbi-akiva-eiger-yd/part-001.txt': {
    '1#_':
      '(Siman 220, seif 1.) One day. L\'chatchila he must observe the prohibition immediately from the time of his vow; and if he ate that day he violates "do not delay" but nevertheless did not violate the neder and must observe prohibition the next day; but in a vow "this day" if he transgressed and ate he violated his vow and has no payments the next day — so Rashba in commentary (Semag 32b) s.v. konam yayin; and Ran there wrote: if he was negligent and ate — I am inclined to say he has no payments, for "one day" unspecified means his intent is immediate.',
    '2#_':
      '(There.) From time to time. One who vows not to eat or not to do this thing on a certain day — there is doubt whether his neder or oath begins from night or from day — see Tzelach (siman 8); he also brought there from Machzor Kolel who enacted not to jest except on a day when tachanun is not said — Mahari wrote: the night after Chanukah is permitted to jest for the day of tachanun has not yet arrived.',
    '3#_':
      '(There.) And some say if it was a vow of mitzvah — they decreed only when combined with not doing well, for a neder is as building on a platform; therefore if it was a vow of mitzvah they did not decree thus — clear in Ran and Rosh; and I am in doubt — therefore one could say they decreed only for the noder himself, but one who forbids his produce to another that he not eat from them today — the forbidden one is permitted from nightfall for he does not violate prohibition and they did not decree on him; somewhat it does not appear so from Ran and Rosh not mentioning this distinction — requires study for practical law.',
    '4#_':
      '(There, Shach note 17.) And requires study — in Choshen Mishpat see Shevut Yaakov (part 1 Choshen Mishpat siman 25).',
  },
  'siman_237/beer-hagolah/part-001.txt': {
    '8#_': 'Tur in the name of Rambam in chapter 2 of Hilchot Shevuot from braita Nazir 3 side b.',
  },
  'siman_245/beer-hagolah/part-001.txt': {
    '14#_':
      'Beit Yosef from mishnah end of Avot and what is said there Bava Batra 21 side a: and they bring them in like a six-year-old and like a seven-year-old; and likewise Rambam there; and he distinguished between weak and healthy as Tosafot wrote there; and Beit Yosef explains Rambam\'s view: bar shit — meaning a five-year-old who enters year six, etc.',
  },
  'siman_245/siftei-kohen/part-001.txt': {
    '4#א':
      'Liable, etc., to his son. Maharshal wrote: the same applies to his son\'s son — Perishah brings it; and in Kesef Mishneh beginning chapter 1 of Hilchot Talmud Torah he also wrote: and perhaps one is also liable to hire a teacher for his son\'s son, and the same for his son\'s son\'s son; but he is in doubt whether a daughter\'s son precedes his friend\'s son — perhaps a friend\'s son precedes only where he is obligated regarding his father, but regarding a daughter one cannot say so — end of his words. And it appears to me a daughter\'s son precedes his friend\'s son.',
    '4#ב': 'And if not they descend, etc. — as explained in Choshen Mishpat siman 106 regarding honoring father.',
  },
  'siman_252/siftei-kohen/part-001.txt': {
    '12#א': 'And likewise a relative, etc. — see above siman 257 seif 8.',
    '12#ב':
      'And he must pay him immediately. And they collect even from orphans\' property of minors — for though we hold we do not touch orphans\' property, as explained in Choshen Mishpat siman 110 — there the reason is we do not accept testimony except before a court and orphans who are minors when not before them are as if not present; but here testimony acceptance is not needed since d\'oraisa he is obligated to save; and likewise if he must wait for his money until the orphan girl grows up — no person will save any orphan with his money — so Mahari Weil siman 148.',
  },
  'siman_252/beer-hagolah/part-001.txt': {
    '1#_':
      'Rambam\'s wording in chapter 8 of Matanot Aniyim from the conclusion of the gemara Bava Batra 8 side a and side b; and the commentators there explain that a captive — all of him is in the power of idolaters to do with him as they wish, whether to kill or to starve.',
  },
  'siman_215/siftei-kohen/part-001.txt': {
    '3#א': 'And not Chanukah and Purim. — see above note 11.',
  },
  'siman_220/siftei-kohen/part-001.txt': {
    '15#ג':
      'And even, etc. — it appears the Rav learned this from the law afterward regarding a vow until his son is bar mitzvah; and one could distinguish — there the time is fixed until he is thirteen years, but here he can delay or advance the time of the wedding feast, and if so his intent was only until the feast is made, not on the time; and even in a vow until his son is bar mitzvah Tosafot conclude there it appears permitted immediately when he died — but afterward wrote one must settle the matter that it is like a get where one said "this is your get if I do not come until twelve months" and he died within twelve months — it is not a get except after twelve months, for we decree "died" lest "did not die," and the same here — see there. In my humble opinion the law is not a general rule; here his main intent was he vowed until he merits his son becoming bar mitzvah, and immediately when he died his vow was void — as if he said "I vow until my son lives and becomes bar mitzvah" (and all the more in the case of the question in Tosafot where he vowed when his son was sick, then the son recovered, then after a year or two died from another illness — his main intent was the son should become bar mitzvah) (and perhaps the Rav does not deal with a vow when the son was sick, and that is why he wrote anonymously "if one vowed until his son is bar mitzvah," etc.); consider yourself regarding a get: if he said "this is your get if so-and-so dies within twelve months" and he died within twelve months — do we decree died lest not died? Only for "if I do not come" do we decree thus; all the more here in vows we follow people\'s language implying as long as the son lives — so it appeared for practical law also for a vow until bar mitzvah, but the elder already ruled and one does not refute Maharai; but to be stringent also regarding the son\'s feast we have no source — as I wrote — requires study. I again found in Sefer Beit Chayim who wrote on Tosafot\'s words: and to me it appears permitted to drink wine immediately after his son\'s death; and there it is different for we can decree lest not died, as Tosafot wrote there — end of his words.',
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
