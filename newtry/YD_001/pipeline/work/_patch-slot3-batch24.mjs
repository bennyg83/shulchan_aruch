#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_258/beer-hagolah/part-001.txt': {
    '10#_':
      'Language of Rambam in chapter 6 of Hilchot Arachin, from the case of that bedspread — Bava Metzia daf 6b.',
  },
  'siman_258/pitchei-teshuva/part-001.txt': {
    '7#_':
      'Cannot retract. See responsum Shevut Yaakov siman 18 — he was uncertain whether one who vowed something to charity can retract within toch kedei dibur; he raised that for charity too his statement is like actual delivery to a commoner, therefore cannot retract within toch kedei dibur, as with hekdesh — see there, siman 85, and Petaach HaBayit siman 33 at length. See responsum Pnei Arieh siman 41 — asked regarding one who vowed a gift to a poor person who became wealthy before the gift reached his hand whether he can retract; answered: if he sent money through someone to give to the poor person and he acquired it for the recipient one moment while he was still poor, he cannot retract in any way; but if he did not yet send the money, even if he instructed someone to give from his own money on his behalf, he can ask about his vow through complete regret on the essence of the vow — but through an opening "if I had known he would become wealthy I would not have vowed" they do not release him, for it is nolad. If the vower does not ask about his vow he must give all he vowed to that recipient, and even afterward the recipient may not benefit from that gift — it is as one who need not take yet takes — rather he gives it to another poor person; he may give to any poor person he wishes or to one of his poor relatives — see there. Siman 42 there: if when he vowed he said he vows this sum to so-and-so because he is poor, he needs no release — similar to above siman 242 seif 19 — see there. [See Chasam Sofer responsum 237 — similar question regarding orphans for whom individuals pledged a fixed sum yearly for three years; after two years their mother remarried a wealthy man so orphans no longer need the pledge — some refuse further payment, some want to redirect to other poor relatives — whether release needed; he elaborated dispute of Rashba and Rosh on gabbai for captive and death (siman 253 seif 7) — concluded: where they only vowed to give and beneficiary became wealthy or died, no court and no judge — even release not needed; in our case though they already received two years, third year not yet collected — even those wanting to give to relatives do well; even those refusing entirely — omdan they did not vow with that intent — see there.]',
    '9#_':
      'In the hands of the gabbai. See Choshen Mishpat siman 125 in Semak note 25 and Shach note 27 — explained there: if it left his hand and was given to another, even if not a fixed charity gabbai, he also cannot ask for release; see Ohr HaChaim there note 28 — he is uncertain; he wrote: since in Yoreh Deah siman 258 Tur and Mechaber wrote "came to the gabbai," perhaps specifically the treasurer considered as hand of the poor, but one who gives to another person perhaps he can ask, since he said "give" and not "acquire" — this only when the agent of the giver and his hand is like the giver\'s hand — see there. See responsum Nodah b\'Yehudah Tinyana Choshen Mishpat siman 50 on his words — wrote: distinction between gabbai and other applies specifically when the giver calls by name "go this coin to so-and-so the poor person" — there is room for Ohr HaChaim\'s doubt; but if he handed a coin to a person, even not a fixed gabbai, and said "give this coin to poor people as you wish," he truly becomes a charity gabbai for these coins since he has benefit in distributing to poor as he wishes — he is not an agent but an actual gabbai. See further: if he says "this coin for charity" and took the coin from his money and placed it among his charity money without removing from his possession, certainly he has release by asking — we do not say since he acted placing the coin among charity money his words are void and the act nullifies. See Nodah b\'Yehudah Tinyana Choshen Mishpat siman 254 — one who gave merchandise to another for a hundred gold to sell and give proceeds to charity; recipient returned merchandise unwilling to sell; donor became wealthy and wanted to change recipient charity — he proved Rashba\'s rule that charity that reached gabbai cannot be released is not agreed, great rishonim disagree; hard to act against Rashba; nevertheless leniency in our case even per Rashba — Rashba\'s reason: every question and opening is vower saying "had I known I would not have vowed" — if he lies and would have vowed anyway, no release, but we need not suspect; therefore gabbai entrusted for poor need not believe him and impoverish the poor — cannot ask; in our case goods returned to vower without witnesses — he can say to common person "I am believed to say truth — you returned to me but I regret from the outset" or find opening in migo to common person — may ask about vow — he elaborated — see there.',
    '11#_':
      'Regarding so-and-so when it comes. [Baer Heitev; see Chasam Sofer responsum 243 — case: community A pledged to build in synagogue, pledged sum, gave to treasurer, agreed profits from dealing with official on hides go to synagogue, succeeded, profit 206 gold given again to treasurer; afterward without asking sage they took profit from treasurer and divided among themselves — whether these vows are binding as davar shelo ba laolam; whether release by regret and question. He elaborated — first doubt: neder davar shelo ba laolam — dispute Rambam and Rosh (see Tur Choshen Mishpat siman 212, Semak, Shach, Taz) — Rambam it is a vow, Rosh not; but irrelevant here — after it came to existence they gave to gabbai intending synagogue building — new vow. Second doubt: whether release helps — room to be lenient though per Rambam it is a vow; Mahariik root 481 — if in assembly with one consent and vowed thus, like on congregation with no release. Ribash siman 462 disagrees with Rama siman 228 seif 30 and on congregation whether all regretting helps — Ribash not, Rama yes — see Rama there note 21 and Shach note 19. Here three doubts to lenient: maybe halachah like Rosh not vow; if like Rambam maybe like Ribash not congregation; if like Mahariik maybe poskim hold release if all regret. And say: since they transgressed vow do not release as siman 208 seif 2 — for they did not transgress — already fulfilled vow giving to gabbai for building; what they misappropriated afterward is separate; but because they fulfilled vow, no release for vow — see seif 6 and siman 228 seif 42; though here not charity but hekdesh, rule not applicable — nevertheless release not effective per Tosafot Keritot 13b s.v. arba — end: no release; gabbai was negligent; if cannot extract from owners he must pay — see there.]',
  },
  'siman_258/rabbi-akiva-eiger-yd/part-001.txt': {
    '5#_':
      'And see responsum R\' Avraham ibn Chaim siman 107; and siman 99; and see Shach Choshen Mishpat (siman 200 note 6); and responsum Maharash Sason (siman 152) on these matters.',
    '7#_':
      '(Shach note 15) Since it is in his power to consecrate it. See Shulchan Aruch Even haEzer (siman 40 note 7) and Beit Meir (there).',
    '12#_':
      '(Seif 12) And forbidden to retract. See Bach and Gemara Yoma (chapter 1 Hilchot Zechiyah) — cannot give to another poor person; see responsum Radbaz (siman 134) and responsum Maharitatz (siman 464) who are uncertain; see responsum Kol Eliyahu (Even haEzer 8) and Ketzot HaChoshen (siman 212 note 4) in responsum Mahariik (root 133) — wrote: perhaps where there is bodily exertion we do not say it is a vow even for a poor person — see there.',
    '13#_':
      '(Seif 13 in Hagahah) And see Choshen Mishpat siman 212. There in Choshen Mishpat Rama wrote: one should be stringent per the first view — here in Yoreh Deah it deals only whether he is obligated to fulfill his vow, therefore wrote primary view he is obligated; but Choshen Mishpat deals whether courts extract from him if he admitted he thought so in his heart — therefore wrote one should be stringent to rule they do not compel him like any monetary doubt. Responsum Shevut Yaakov (siman 21) and see responsum Dat Esh (siman 14) at length.',
  },
  'siman_258/siftei-kohen/part-001.txt': {
    '1#ב': 'If he said "to hekdesh" unspecified etc. See above siman 256 seif 1 in Hagahah.',
    '10#_':
      'It is nothing. Since it is not in his possession; a vow does not obligate — for he did not say "I will consecrate it when it comes to my hand," but says "it shall be hekdesh," meaning now it shall be hekdesh — and now it is not in his possession to consecrate. If he said "this field I sell you — when I buy it back from you it shall be hekdesh," it is hekdesh when he takes it from him, since it is in his power to consecrate from now; but if he already sold and said "this field I sold you — when I buy it back it shall be hekdesh," and afterward bought from him — not hekdesh, for he could not consecrate then. If he said "this I mortgaged to you — when I redeem from you it shall be hekdesh" — it is hekdesh since he can redeem; even "this field mortgaged to you for ten years — when I redeem it shall be hekdesh" — hekdesh when redeemed; but if he said "it is hekdesh from now" — not hekdesh, for it is encumbered to the lender. All this is explained in Gemara Ketubot chapter Afelu (Ketubot 59) — Rambam wrote chapter 7 of Arachin, R\' Yerucham, and see there many distinctions in hekdesh and charity; and above siman 251 seif 7 and what is written there.',
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
