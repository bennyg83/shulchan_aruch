#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_296/beur-hagra/part-001.txt': {
    '34#א':
      'They were, etc. — Yerushalmi at the end of chapter 4: R\' Yona in the name of Rav — the seed is permitted, forbidden to sow; R\' Yosi in the name of Rav — halacha: the seed is permitted and permitted to sow; R\' Chiya bar Ashi in the name of Rav — halacha like R\' Meir and R\' Shimon: the seed is permitted and permitted to sow, or the seed is permitted and forbidden to sow. From that R\' Ba said: R\' Chiya bar Ashi anointed me — my vineyard planted eight by eight — this teaches the seed is permitted and permitted to sow; apparently he decided and acted like them; and Rosh there at the end of the chapter. But Raavad ruled like the first tanna, and so our gemara appears to hold, as we say in Bava Batra chapter 2 page 3 — Abaye said to Rav Yosef, etc., nevertheless practice is preferable; and there Rava said the halacha is, etc.; and Rashbam there s.v. v\'ad sixteen cubits like the incident, etc. [And it also appears clear there is a textual error in the Yerushalmi cited, that says at the end of the chapter of Rosh Hashanah — his vineyard\'s seed is cut off and not forbidden due to kilayim — they are mixed, and there is no work for a solitary vine, like R\' Yosi who said there is no work for a solitary vine — words of the Sages; R\' Yaakov bar Iddi in the name of R\' Yehoshua ben Levi: halacha follows one who is lenient abroad; and behold Rambam\'s reasoning certainly implies halacha follows R\' Meir and R\' Shimon everywhere, since he said unspecified; and that which says halacha follows the lenient abroad refers to R\' Yosi who said there is no work for a solitary vine even one row — and he did not decide above; but this is astounding — in Yerushalmi at the beginning of chapter 6 on R\' Akiva\'s words "three" — Rav Yehuda in the name of Rav: halacha like R\' Akiva; R\' Yaakov bar Iddi in the name of R\' Yehoshua ben Levi: halacha like one who is lenient abroad, etc. — see there; if so these two rulings of R\' Yosi bar Iddi in the name of R\' Yehoshua ben Levi contradict — above he ruled like R\' Yosi that there is no work for a solitary vine even one row, and here he ruled like R\' Akiva abroad that one must distance at least three handbreadths; rather the truth admits his way changed — this "words of the Sages" until abroad must be read above, after R\' Chiya bar Ashi in the name of Rav: halacha like R\' Meir and R\' Shimon — "words of the Sages," etc., meaning they argue on R\' Chiya bar Ashi and hold halacha is not like them except abroad, not in Eretz Yisrael; or this "words of the Sages" is the conclusion of the matter above that halacha is not like R\' Meir except abroad, as above, and not like Rambam; and accordingly our gemara and the Yerushalmi in Bava Batra is resolved.]',
  },
  'siman_232/pitchei-teshuva/part-001.txt': {
    '3#_':
      'For it is a vow in error. [Avodat HaTzedakah in the name of Taz wrote, and likewise if two said regarding some matter, etc.; and see in responsum Mishkenot Yaakov siman 60 in the incident where one partner suspected his fellow that he concealed from him something and the latter denied it and they quarreled — one said it is false and he did not buy from that trade and his fellow insists it is true, and they wagered with each other a penalty of one hundred gold coins to charity and made kinyan in court and gave excellent authorization to an important person that from their money he take the hundred gold coins for charity on account of whoever is liable; and the man took out the money for a mitzvah, and afterward it became clear the suspicion was false, and a dispute arose among scholars whether the man was right to take out the money; and some doubt whether this is a vow at all, that it is a vow of mistake — he thought the truth was with him — and they relied on Taz that two who wager with each other, etc., exempt the loser; and he elaborated to explain there is no doubt at all, the suspector is certainly obligated to fulfill his vow to charity, and this is not at all a vow of mistake, and this matter is not at all like Taz\'s law — for Taz surely wrote only when each is clear in his own mind that it is as he says, only that in truth he erred or forgot and his heart compelled him, as I brought proof from those two students, and surely the student would not swear if he had any doubt in his heart; but in this case he had some clarification that the truth was as his words — who permitted him to believe so much the tellers of the story, and to permit him to swear on mere suspicion even though it seemed to him like evident matters? It is only that for suspicion it is required; and even though we find R\' Nachman swore a lettuce leaf — that is because all drowning victims are majority-majority for death and heirs inherit the estate, and he is from Torah in presumption of death, only d\'rabbanan his wife is forbidden to remarry ab initio lest a minority escape; and from where shall we come — shall a person not swear that this is so-and-so\'s son even though he knows only from majority? But to swear based on imagination is certainly forbidden from Torah and they are liable for a vain oath; if so here, since he risked himself for doubt, he decided and transferred — there is no vow of mistake at all; and if we come to obligate from asmakhta, the widespread halacha in Israel is that for charity and hekdesh asmakhta acquires, etc.; and especially here where there was kinyan on the matter and the money was transferred through a third party after the start — it is like seizing her rights; certainly hekdesh acquired those coins and he properly took them out; and he elaborated bringing proofs from Rambam\'s words and from the Talmud in many places — see there.]',
    '13#_':
      'That he forced his fellow. See in responsum Perach Mateh Aharon part 1 siman 17 and siman 18, who raised: where they forced him through trimming and threat to bring him before the community court to judge before them — it is not force at all, for not all who are brought before the community court win; but if they threatened to hand him over to the hands of oppressors and he can act — it is force according to all poskim except Avi HaEzri and Maharam, who do not consider it force in their opinion because they threaten and do not act; nevertheless even according to their reasoning, specifically with an unspecified person who was never presumed to hand over, but one who already broke through and was presumed to hand over even once — according to all it is complete force, and he need not think of some trick at the time of the oath — see there where he elaborated on this.',
    '8#_':
      'Trustworthy. [See Eshel Avraham in the name of Shevut Yaakov siman 49, who raised: a cantor who bound himself against the community in writing — "and behold I accept upon myself with an oath and curse, etc., for ten years I am not permitted to move from here without permission," etc.; and the cantor claims he never swore and did not accept a cherem, and did not write all this but only signed with his hand; and what he rented himself to another community was with permission; and the av beit din there permitted him to rent out and said there is neither vow nor cherem here, since the oath did not emerge from his mouth, as explained in Rashdam siman 81 in the name of R\' Yitzchak Halevi, etc.; and behold this reasoning was agreed to by Raam in responsum siman 72, and in responsum of Maharit part 1 siman 9 and part 2 siman 200, and in Teshuvot HaRash siman 326; and Sema brought it in Choshen Mishpat siman 73. Nevertheless one may wonder why he permitted him ab initio — certainly what he was stringent about in Chavot Yair siman 194, distinguishing between if he wrote all the above "I accept with an oath," etc., and between if he wrote "behold I accept upon myself with an oath to pay," etc. — one may wonder about him; and see there in the responsum cited that he rejected all his proofs on this matter at length. However in this case the rabbi wrote in responsum 43 seif 8: a community that accepted upon themselves a teacher and he accepted upon himself with an oath not to move from this place ten years; and by misfortune a plague began among the people; and when the teacher\'s father saw the matter was worsening by misfortune, he sent him that his sister gave birth to a son and he should hurry his actions to come and circumcise the child — and in truth she never gave birth; and from then the heart of the scholar feared and trembled lest he stumble in the sin of the oath if he delays there; and likewise many laws regarding money and rental — see there at length.] And see further in Shevut Yaakov part 1 siman 6. [And in responsum Chasam Sofer siman 226 and 227, and from what he wrote above siman 236 note 1.]',
  },
  'siman_232/siftei-kohen/part-001.txt': {
    '5#א':
      'All fruits, etc. It is written in responsum Maimoni siman 25: even though we say one who vows from fruits of the year is forbidden in all fruits of the year and permitted in kids and lambs (as above siman 217 seif 22), nevertheless when one says all fruits of the world are forbidden to me, he is forbidden in all of them — for we count chapter 3 of Shevuot: a vain oath when one says all fruits of the world are forbidden to me by oath, etc.; and further, everything that grows in the world can be included in fruits of the world, such as fish, flax, hemp, wool, silk, trees, and many things born and growing from each other, and animals and many things called fruit from fruit and produce of the ground — end of his words; and it implies he does not disagree that he said the word "of the world," but everything depends on the word "all"; and so it appears from the proof he brought from Shevuot, not as it appears at first glance in Taz that it depends on saying fruits of the world even without "all"; and Bach wrote, and one may wonder — this contradicts what he wrote at the end of siman 176 (seif 38) that clothing and vessels are not included in fruits, but clothing and vessels are only from wool, flax, hemp, and silk; and for some texts that read there "trees" it is also difficult — trees; and I do not know what the difficulty is, for there he did not say "all," and likewise he distinguishes in Prisha — and see above siman 217 note 30.',
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
