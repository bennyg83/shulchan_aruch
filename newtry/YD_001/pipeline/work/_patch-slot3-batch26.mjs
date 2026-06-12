#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_206/beer-hagolah/part-001.txt': {
    '3#_':
      'Tur in the name of the Rambam, as the Gemara\'s conclusion from Samuel there daf 5 end of 1a — the beraita fits well with his view; and so Ran in the name of some say.',
  },
  'siman_206/beur-hagra/part-001.txt': {
    '1#ב': 'And he is so (provided that they indicate somewhat regarding the vow) — see in Even haEzer siman 27 seif 4.',
    '3#ב':
      'And it was already explained — per his view in Hagahah seif 1. (Likut) And it was already explained etc. — for benefit prohibition is more indicated than speech prohibition from what it says there "let us say Samuel holds yados she\'einam mevichot" nevertheless permitted because they are yados she\'einam mevichot, and all the more for speech which is not indicative at all. Rosh there s.v. "but" and Ran there (end quote).',
    '4#ג': 'And it was. Rosh there and Tosafot there s.v. "from this" etc.',
  },
  'siman_206/baer-heitev/part-001.txt': {
    '3#ב':
      'Explained. Meaning because he emended in his words as in note 2; nevertheless one can be precise — what is the connection of this to that, for here it is worse; and as Tosafot said in the name of R\' Yitzchak that in menudeh and nadina mimcha even if he did not complete his words it is forbidden to benefit, but it appears the Rav followed the Tur\'s words who equates completely menudeh and nadina to meruchakni; examine; and it appears for practical halachah one should not be lenient — end quote, Shach.',
  },
  'siman_206/rabbi-akiva-eiger-yd/part-001.txt': {
    '2#_':
      '(there seif 2) From food or benefit both are forbidden — I need to investigate: in "modar ani lecha" from benefit we say both are forbidden because we explain "lecha" — upon you, and also "mimcha" — if on bodies, that this one forbids benefiting from that one, and not at all on property — practical difference for the law in siman 228 seif 5, see there; or only on property — difference whether permitted to heat this with that one\'s meat; or we explain modar ani and my property upon you and also from you and your property. It appears from the sugya both are implied — see Ran in Peirush at length that modarani mimcha both are forbidden because he says I and my property are forbidden from you and your property — if so, though we conclude we push off that both are not forbidden, that is because mimcha implies only he from him; but in modar ani lecha from benefit, which implies both, one can say on bodies and on property; and similarly modarani mimcha from benefit one can say forbidden from him and his property; and in Ran I saw he wrote in the law modar ani lecha both are forbidden — and he said "lecha" implies "to you," meaning my property is forbidden upon you etc. — from smoothing his language it appears only property is forbidden; and truly examine why we do not explain modar ani lecha means at least also on bodies — examine. And on the contrary it appears to me a proof it refers to bodies from Ran\'s words in chapter HaMedir, who wrote regulating his wife from benefiting him — with this language only property is forbidden, not use of the person, for it does not take effect because she is enslaved to him — see there. Explained clearly: regulating with language of benefiting him means from his body such as use — only use does not take effect due to servitude; nevertheless it implies lecha includes even from my body; if so, also modar ani lecha includes from your body — clear proof for the law; see Chiddushei Ra\'ah (chapter HaMedir).',
  },
  'siman_206/siftei-kohen/part-001.txt': {
    '1#ב':
      '"That I will eat with you" in these formulations etc. But if he said "I will eat with you" alone, or "I will taste for you" alone, he said nothing; and if they refuse him to eat, it is proof — since he did not say "I will not eat" and said "I will eat with you," meaning what I eat with you is konam and forbidden. And if he said modarani mimcha or other formulations and said "if I eat" alone without "with you" — some rule forbidden, for although if he said "I will eat" or "I will taste" without "with you" it is nothing, here since he said modarani mimcha or other formulations with it, although he did not say "with you" it is forbidden; and some rule since he did not say "with you" it is nothing; and so wrote Ramban and Rosh (and so wrote Ran and so appears the Tur and poskim). And if he said "I will not eat," even if he said modarani mimcha or other formulations, it is nothing — for there is no yad for a vow except specifically when forbidding the object by vow, and this one forbids [himself on the object] (the object on himself); and all the more if he said "I will not eat with you," even if he said modarani mimcha. And some wrote that although with other formulations it is nothing, if he said modarani mimcha "I will not eat" or "I will not eat with you" alone — forbidden; and so appears the Rambam\'s view (and so Semag negative commandments 242 daf 71b). Nevertheless all agree "I will not eat with you" alone or "I will not eat with you" (alone) he said nothing — for whenever he forbids himself on the object it is not a yad for vows; for even vows themselves, whenever he uses language implying he forbids himself on the object, it is nothing — such as saying "this loaf is upon me like a korban that I will not eat," or "it shall be forbidden upon me that I will not eat this loaf"; and so in Yerushalmi there is no oath in language of vow and no vow in language of oath; and so Rosh wrote that if he said "I vow I will not eat with you" or "I will eat with you" it is nothing, for this language is language of oath forbidding himself by oath and not language of vow, unless he vowed to fulfill a mitzvah. Nevertheless, since people are accustomed to vow in this language, one should not be lenient and release is needed so they not treat vows lightly (and this is explained end of this siman) — end quote, Rav Yerucham, Yoreh De\'ah part 3; and I cited his words because of many distinctions he explained, and also to teach that what the Rav and some say — even if he said "I will eat with you" etc. — is not precise at all; on the contrary it is more forbidden for all; and so in Tosafot beginning of Nedarim on "she\'ani ochel lecha" — it is worse; they wrote: on "she\'ani ochel lecha" some read with yod "she\'eini ochel lecha" — difficult, for vows take effect only on something substantial etc.; it should have said "and all the more if he said she\'ani ochel lecha" etc.; and so Tosafot beginning of Nedarim for this reason that he forbids himself on the object it is not a vow — if he said konam I will not eat this loaf it is nothing — see there (and see above siman 213 note 1); and so is proven from Ran himself who wrote some read without yod and some with yod she\'eini; and it will be explained in the Gemara, with Heaven\'s help — end quote; and in the Gemara the dispute is explained when one says modarani shelo ochel lecha — some permit for this reason — see there; and so appears in poskim in several places that she\'ani without yod is preferable.',
  },
  'siman_206/yad-avraham/part-001.txt': {
    '1#_':
      '(siman 206 seif 5) One who vows "I will not eat with you" etc. — even not a yad, for this language is language of oath and not language of vow etc. But in nezirut, if he expressed it in language of oath, all forbid. See Shach that often in beginning of Nedarim nezirut is like oath in this — that the person is forbidden; as Rosh explicitly there, and he did not mention what Rashdam part 4 siman 75 rejected this proof from Rosh — see there he proved the opposite that nezirut has law of neder and we do not hold language of oath; and it is from the mishnah "there is a vow within a vow" etc.; and Rambam and Tur hold nezir within nezir like neder, not like oath that falls on oath; and accepting nezirut is nezirut like accepting neder is neder, not oath — as Tur wrote: if he heard an elder swear and said "I am like you" — oath; but in nezirut it suffices if he said "I alone." Per Rif and Rosh regarding oath, even "I am like you" is not oath; in nezirut it works — learn it is like neder. Nevertheless Radbaz siman 341, 244 wrote nezirut is grasping the person like oath, not grasping the object like neder — for he says harini nazir like harini nishba; the nazir forbids himself on wine and haircut; therefore if expressed in oath language it takes effect; not like some sages who erred in this — end quote. This is like Shach and per Rosh in his Peirush beginning Nedarim; and one can prove Rosh\'s view from what he ruled in his pesakim seif 87; and thus is removed what he challenged there in sefer 150.',
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
