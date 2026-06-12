#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_245/siftei-kohen/part-001.txt': {
    '5#_':
      'Or as a seven-year-old. This means completely weak; but if somewhat weak they bring him in like a complete six-year-old, as below seif 8; and so Tosafot, brought by Beit Yosef.',
    '7#_':
      'And see Choshen Mishpat siman 163 seif 3. There at the end of the seif the Rav wrote how the teacher\'s wages are collected.',
    '8#_':
      'They bring in the children. Kol Bo wrote siman 74 — they begin with Sefer Vayikra, for the Sages said one begins children with Vayikra because the Holy One, blessed be He, said "let pure ones come and engage in pure matters"; and so is practiced now. He also wrote there in Kol Bo and Rokeach siman 366 customs when bringing in a child — they are not practiced now; where practiced one may not change, as Rokeach wrote there.',
    '12#_':
      'On erev Yom Tov. The Rambam wrote they also cancel on Yom Tov; and Beit Yosef wrote in his name and Beirush brings it.',
    '6#ב':
      'Written Torah, etc. — it implies all Tanakh; and so wrote the Bach, and wrote that contrary to law people practice not to teach their children Tanakh, etc. — see there; and I say the custom of Israel is Torah, for Tosafot wrote at the beginning of Kiddushin and likewise other poskim that we rely on what we say in Sanhedrin (Talmud Bavli) that a snail in mikra, Mishnah, and Talmud — thus one is not obligated to divide his years in mikra, and is not obligated to teach his son mikra once he taught him Talmud; and so from the words of the Tur below siman 246, and so explicitly Rabbeinu Yerucham beginning Netiv 2, and so from the Rav\'s words below siman 246 seif 4.',
    '15#א':
      'If there were more than 25, etc. — the Rosh and Tur explained that until 40 one needs no other to assist, and from 40 until 50 one needs another to assist him, and at 50 one needs two teachers; and so Rabbeinu Yerucham Netiv 2 chapter 1; and it appears we follow this according to the teacher and according to the youths and whether they learn little or much — all according to the matter.',
  },
  'siman_245/beur-hagra/part-001.txt': {
    '3#ד':
      'But the mitzvah, etc. — the Rambam\'s wording: if so, why was he commanded regarding his son and grandson to give precedence, etc.',
    '4#א':
      'Obligated, etc. — as explained above (Hilchot Talmud Torah 1:29) regarding milah; and where his father did not teach him, bet din obligates him, etc. — they did not say so regarding teaching him, for all are commanded as above, but they speak of wages; and there it says (1:1): teach him mikra, etc. — for Mishnah one does not teach for wages, as in Nedarim 37 side a, and per Rambam and Shulchan Aruch seif 6.',
    '4#ב': 'And they compel him, etc. — as written in chapter HaKotev (CM 66) regarding a teacher of children, etc.',
    '4#ג':
      'And if he is not, etc. — since he is obligated it is like any debt, as written in Choshen Mishpat siman 106 — see there.',
    '5#ב': 'Until he is, etc. — Bava Batra 21 side a, and in Orach Chayyim.',
    '6#א': 'If the custom was, etc. — meaning as explained in Nedarim 36–37.',
    '6#ג':
      'Torah, etc. — not like Rashi there who explains chumash alone; and as explained there "Torah" means mikra — meaning not midrash Torah, as written in chapter 2 (49 side b) there.',
    '8#א':
      'They bring in, etc. — in Bava Batra there; and Beit Yosef explains bar shit and bar sheva — meaning the beginning of six and seven, not that age of Avot "five years" etc.; but Tosafot there and in Ketubot 50 side a wrote otherwise — see there.',
    '8#ב':
      'And if he is, etc. — as already written "already six," etc., and so Tosafot there; and as written in Ketubot there "this refutes," etc.',
    '8#ג':
      '(Likut) And nevertheless immediately, etc. — I do not understand his speech, for from when he begins to speak he is obligated as above; (Likut) and nevertheless, etc. — Tanchuma parashat Kedoshim "and you shall circumcise his foreskin" — the verse speaks of a child three years who cannot speak, and in the fourth year all his produce is holy as his father sanctifies him to Torah, "praises to Hashem," and in the fifth year, etc.; and the essence as in the gemara from when he begins to speak, etc. (end of citation).',
    '15#א':
      '25, etc. — the Rambam explains what is written "25," etc.: until 25 one teacher suffices, until 40 an assistant at the head of the platform suffices, until 50 two suffice, and more requires three; and so explained Nissi Yonah in the name of R\' Yonah. But the Rosh wrote that until 40 one teacher suffices, and more until 50 an assistant at the head of the platform, and at 50 requires two.',
    '15#ג':
      'And some say, etc. — Tosafot there s.v. sakh, etc.; and per their view the Rosh explained above what is written "25" — meaning from here onward until 40.',
    '17#ב':
      'Or who does, etc. — as written in the Tosefta brought by the Rif and Rosh chapter 5 of Bava Metzia "one who sits," etc., and in Beit Yosef Choshen Mishpat siman 176 seif 10; and all the more so in divine work — and see below.',
    '17#ג':
      'Or who is lax, etc. — in Bava Batra 21, and in Tosafot there s.v. Perach, etc.',
    '17#ד':
      'And a teacher should not, etc. — Tosefta of Bava Metzia brought by Rif and Rosh chapter 7 of Bava Metzia regarding a worker, and in Choshen Mishpat siman 337 seif 9; and likewise in Yerushalmi chapter 7 of Demai: one should not plow his field at night and hire it by day, nor do within his own at night and hire himself by day, nor starve himself nor afflict himself because he diminishes his employer\'s work; R\' Yochanan went to a place, found a scribe, said to them — is it so? They said — we are thirsty; he said — forbidden to you; and if an employer\'s work is forbidden, work of the Holy One, blessed be He, all the more so.',
    '22#ו':
      'But whoever, etc. — as written in chapter 4 of Berachot (28 side a) "they elevate in holiness," etc. "one who wore a cloak," etc.; and in chapter 1 of Sanhedrin (5 side b) for the honor of Rabba bar Chana — though Rav was greater than he, once he descended and Rabba bar Chana preceded him to Babylonia, he preceded him.',
    '22#ז':
      'And all the more if they did, etc. — as written in Sanhedrin there (1 side a) "here the tribe," etc.; and Rashi explained he had a remanah from the king of Persia, therefore he was greater than the Nasi in Eretz Yisrael; and in Rashi on Horayot 11 side b s.v. amar lei harei, etc., and in Choshen Mishpat end of chapter 3.',
  },
  'siman_245/beer-hagolah/part-001.txt': {
    '5#_':
      'Baraisa there daf 30 side a, and statement of R\' Yehoshua ben Levi: whoever teaches his grandson Torah — Scripture considers it as if he received it from Mount Sinai; he derives it from verses, etc., there.',
    '7#_':
      'Likewise there from the baraissa that one teaches him mikra and does not teach him Mishnah, per Rashi there; and it appears to him regarding wages that since one may take wages for mikra as in Nedarim 36 side a — and Maharshal wrote the same applies to a grandson.',
    '8#_': 'Baraisa Sukkah 42 side a; (°) see above seif 8.',
    '11#_': 'Enactment of Yehoshua ben Gamla and onward, etc. — Bava Batra 21 side a.',
    '15#_': 'Statement of Rav Shmuel bar Shilat there.',
    '20#_': 'Baraisa Nedarim 37 side a, per Ran there.',
    '21#_':
      'Statement of Rava in Bava Batra 21 side b, per Rambam there chapter 2; and what is stated there "and if there are forty," etc. — meaning even if there are 40 an assistant at the head of the platform suffices, etc.; and what he said "and if there are fifty we seat two" — meaning until fifty two suffice for them; and so Nissi Yonah explained chapter Lo Yachpor in the name of R\' Yonah, may his memory be blessed.',
  },
  'siman_245/nekudot-hakesef/part-001.txt': {
    '4#_':
      '(Siman 245 seif 4 in Hagahah) And if he is not in the city and has property — if possible they inform him, and if not they descend to his property and hire a teacher for his son. And so Hagahot Maimoniyot wrote in siman 248 in Shulchan Aruch seif 1 regarding charity: "and they descend to property in his presence," etc.; and I wrote in Shach note 4 on Bach — it appears he understood it means even in his presence, etc.; and it appears to me he holds specifically in his presence, excluding when he is not here, etc. — see there; again I found clear proof for my words from what Rambam himself said chapter 12 of Hilchot Ishut law 17: even his extra sons and daughters beyond six — they do not feed them from his property not in his presence, even if he is wealthy; and so the Mechaber wrote in Even HaEzer siman 71 seif 2; and so the Maggid Mishneh wrote that Rambam derived this from what we say in chapter "a youth who strayed" — one who went to a country overseas, etc., bet din descends to his property and feeds his wife but not his sons and daughters; what is the other version? Rav Chisda said — this is charity; and so Ran wrote in that chapter; and it implies even if it is impossible to inform him within 30 days — in such a case they collect a debt not in his presence, as explained in Choshen Mishpat siman 106; for charity they do not collect — for otherwise there is no distinction between debt and charity, and the Talmud would not need to say the other version is charity; rather even a debt — and although the Rav in Hagahah wrote there "and some say if he is wealthy they feed them in every case because of charity," and it is printed in Shulchan Aruch thus — it appears in the Tur it is not so; one who examines the Tur there will see the opposite — only in Darchei Moshe he wrote thus in the name of Ran; and one who examines Ran will see he does not disagree with Rambam on this except regarding one who became insane; but regarding one who traveled he wrote it is reasonable to say regarding a wealthy man they feed them, etc.; but Rambam wrote, etc. — it appears he holds like Rambam there; and even per the Rav\'s view it appears specifically when impossible to inform him, but when possible to inform him they do not collect charity not in his presence until they inform him; and per what I wrote: if impossible to inform — they do not collect; if possible to inform — they inform him and collect after informing him; and so is the essence — understand well.',
  },
  'siman_245/pitchei-teshuva/part-001.txt': {
    '2#_':
      'Mishnah and Gemara. See responsum Chavot Yair siman 123 — order of study for a son so he succeed in his study, and distancing from studying disputes; and see in Shelah on parashat Bereishit — he also spoke at length on the bitterness of studying disputes — see there on order of study; and see in responsum Teshuvah MeAhavah part 1 in his introduction where he expanded greatly on this matter in pleasant language — see there. They say in chapter Ein Omdin that one must teach his son in a corrected book because of errors since it ascended.',
    '3#_':
      'The children. See Baer Heitev; and see in Sefer Levit Chen on parashat Vayikra — another reason why they begin with Vayikra — see there.',
    '9#_':
      'He should not fast. See responsum Beit Chayyim siman 475 — he wrote in the name of R\' Yonah: even for one who is strict regarding a Torah scholar who sinned that he should fast as the Ari z"l and Maharit part 1 siman 8 wrote — nevertheless one should not be strict regarding teachers of children, for they are considered greatly, and also robs the public — see there.',
    '12#_':
      'To make the drum and give. See responsum Nodah B\'Yehudah Tinyana part Even HaEzer siman 83 — he wrote that rabbis already accustomed themselves to adorn and from the custom another cannot arrange even if they give wages to the established rabbi; and all this if the rabbi was there; but since they waited until the sun set and he did not come — one need not regard the rabbi\'s honor here in a place where he acted improperly by not coming at his time and also did not send another in his place; and the rabbi who wishes to punish the wise innkeeper who arranged kiddushin after they waited for him and he did not come — he deserves punishment for wishing to punish not according to law — see there.',
    '13#_':
      'With the consent of the rank. See Choshen Mishpat siman 60, and see in Urim VeTumim there — he cried out like a peddler on rabbis who act without community permission — see there.',
  },
  'siman_245/baer-heitev/part-001.txt': {
    '6#א':
      'Written. The Shach wrote — it implies all Tanakh; and so the Bach; and wrote that contrary to law people practice not to teach their children Tanakh, etc. — see there; and I say the custom of Israel is Torah, for Tosafot wrote in Kiddushin chapter 1 and other poskim that we rely on what we say in Talmud Bavli that a snail in mikra, Mishnah, and Talmud — thus one is not obligated to divide his years in mikra, and is not obligated to teach his son mikra once he taught him Talmud; and so from the Tur\'s words and from the Rav\'s words below siman 246 seif 4 — end of his words.',
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
