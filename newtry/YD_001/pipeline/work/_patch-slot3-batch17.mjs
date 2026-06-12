#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_234/baer-heitev/part-001.txt': {
    '2#_':
      'Birth. Taz wrote: it appears this refers to "I will make a messenger to bring" — we hold Even HaEzer 140 he may retract until the get reaches her hand, then he may annul for she is still his wife since he can cancel it; on a vow to the public Rosh wrote even if the husband nullified his intent and gave her permission to vow to the public, he may still annul; Shach. He further wrote regarding a divorcee — doubtful even b\'dieved it is not annulled.',
    '59#_':
      'Regarding bathing. Bach wrote this "bathing" is a scribal error — regarding bathing there is no opinion it is not affliction of the soul; but Taz and Shach wrote there is no error, only Mechaber brought Ramban\'s view who holds so, and mentioned Rosh — see there.',
  },
  'siman_234/beer-hagolah/part-001.txt': {
    '42#_':
      'Tur\'s language from mishnah there 71 side b — he wrote "died" instead of "divorced" since one must distinguish between after hearing and these in divorce it was unresolved there whether like blood and not resolved — stringently if so the father could not annul — requires study from above seif 5 per Rambam; see Taz.',
  },
  'siman_234/beur-hagra/part-001.txt': {
    '37#ו':
      'Their matter is uprooting etc. Raavan in his commentary chapter 10 on mishnah annulment of vows all day; Sifra language — because annulment\'s matter etc.; chapter 4 Nazir mishnah 1 — must make him know etc.; this is what is written here — end; Choshen Mishpat.',
    '71#א':
      'And specifically when she said etc. Rosh there in rulings and Ketubot there; as written except R\' Hoshaya in Bereishit Rabbah on "she said" etc.; Rambam wrote specifically for hekdesh must say "may my hands be sanctified" but for konam not required — so Shulchan Aruch Even HaEzer 81:2; reason — we resolve in conclusion "I am konamot" etc. does not need first formulation in "she said" etc.; though for hekdesh Bedek HaBayit — one does not dedicate what is not his as Rambam Hilchot Zechiyah; nevertheless for bodily sanctity one dedicates as Temurah 24b from firstborn etc. 25a Rashbag and offspring — nevertheless admits initially and transgresses not his — Kiddushin 62b, Bava Batra chapter 9; only regarding pregnant woman as Kiddushin "like whom do we follow" — "I am konamot" etc.; but Rosh and Tur hold what is written "I am konamot" is only a question, and not his requires "may they be sanctified"; Raavan there s.v. R\' Ashi; Choshen Mishpat from Yevamos 93a, Kiddushin 63a — conclusion so; Tosafot Kiddushin s.v. veyadayim — likewise Rambam; nevertheless Rambam is difficult on "may they be sanctified" and without konam gemara\'s difficulty remains — behold her hands are subjugated to husband.',
  },
  'siman_234/nekudot-hakesef/part-001.txt': {
    '4#_':
      '(There Taz note 59) challenged Perishah and Bach — no difficulty from "may my hands be sanctified for their work" — Beit Yosef himself explained regarding "may my hands be sanctified for their work on your mouth" — gemara resolves so on "konam I do for you" — brought in Shach note 86; Rambam challenge also no difficulty — even initially not inclusive only as Perishah explained — initially when said in hekdesh language, in conclusion even without that language as Ran and Beit Yosef from his words; Ran\'s wonder on Rambam left in wonder — appears Rambam correct as I explain; Beit Yosef\'s answer for conclusion can forbid not his on another — impossible: gemara says "you said konamot" per Rava who only removes subjugation; also Rava holds one cannot forbid another\'s not-his — Nedarim 47: Ramy bar Chama, konam fruit on so-and-so on substitutes — do we say regarding his own since one can forbid another\'s fruit on himself, can forbid not-his on himself; regarding another since one cannot forbid another\'s fruit on another, cannot forbid not-his on another; or because substitutes are like adults and must resolve loan/creditor there — Rava rejected perhaps ab initio forbidden because substitutes like adults, only if done it is done — no reason to permit except cannot forbid not-his on another; if say can forbid on another not-his, then even b\'dieved forbidden; Rambam brought this doubt end ch. 5 Nedarim — ruled safek, if transgressed and benefited he benefited; if holds can forbid not-his on another no safek, plainly forbidden even if not like adults; why "if transgressed benefited"? For Ran\'s challenge Rambam correct — intended what Tosafot say, Ran brings Nedarim 15b, Beit Yosef 239 — even without hekdesh language since mentioned hands, becomes as saying "may my hands be sanctified."',
    '5#_':
      '(There Taz note 63) "and it does not please me" etc. — appears Perishah correct: we find no posek distinguishing handiwork from bathing; Rambam and Semag did not mention bathing needs no annulment — if so they would bring this law, for even while married vow not effective; they relied on handiwork not needing annulment due to subjugation, same for bathing; gemara\'s "since subjugated" does not prove no annulment ever — it argues annulment needed even while still under him — mishnah teaches "I will not bathe" needs annulment, final clause "I will not bathe" no annulment while under him; if so even without intimacy subjugated; answers "pleasure of intimacy on me" — because we do not feed forbidden food; his other proofs worthless to one who understands — requires study.',
  },
  'siman_234/siftei-kohen/part-001.txt': {
    '71#א':
      'Konam I do on your mouth etc. Tosafot Ketubot chapter "Even though" beginning 59a — even if we read "I will not be" it is not a real matter, for mishnah Nedarim 81: "konam I will not give straw before your cow" cannot annul — end. Difficult — Nedarim chapter 1: "konam my mouth from speaking with you, my hands from working, my feet from walking" forbidden; gemara challenges this is not a real matter; answers only if said "may my mouth be bound from speaking, my hands from their work, my feet from walking" — implies if not said so, "my hands work with you" is not a real matter; Ran and Rosh explained there only when made as if saying; Taz above 213 likewise. Only there because "konam my mouth" refers to speech and implies also mouth; here "konam I do for you" cannot say so — did not say "konam my hands work for you"; moreover Rav Huna bar Rav Yehoshua concludes Ketubot on "may my hands be sanctified for their work" — until now not considered as if saying "may my hands be bound for their work"; even "konam I do for you" without yod — there "konam my hands work with you" and even "I do for you" without yod — requires study; appears not a real matter and husband cannot annul; if said "konam I will not do for you" without yod — perhaps can annul as "I will not be" — requires study.',
  },
  'siman_234/turei-zahav/part-001.txt': {
    '11#א':
      'The father annuls alone. We hold when the betrothed died authority emptied to her father — unlike when the father died or she left his authority through maturity authority did not empty to the husband as seif 9.',
    '11#ב':
      'And Rambam heard betrothed etc. His words are wondrous — this is Talmud that authority emptied to father; Rambam explicitly wrote if betrothed heard and father annulled and betrothed died, father can annul — authority emptied to father; cannot say only if father also heard before death but if father heard only after husband\'s death cannot annul — we learn Nedarim 70 gemara reason authority emptied from "they shall be" — compare prior existence to later existence: as before betrothal father alone annuls, so after betrothed\'s death father alone annuls; teaches even if father heard only after husband\'s death in all cases father annuls; Tur explicitly — not only vows after husband\'s death but even in his lifetime if he did not hear until after death; Beit Yosef brought to write Rambam here from what he translated in his name — if he translated as is he would not write so: betrothed heard and annulled and died, afterward father heard; or father heard and annulled and husband died before betrothed heard — father cannot alone annul vows appearing to first betrothed except in partnership if she betrothed him that day as explained — end; Beit Yosef explains if no betrothed etc.',
    '17#_':
      'Between after hearing. Tur wrote so; Rambam wrote second betrothed does not annul in partnership vows before first betrothed unless first did not hear before death; if heard and died second cannot cancel — unclear; Tur\'s difficulty from Shmuel 71a on mishnah second betrothed annuls with father even vows appearing to other betrothed — first heard, father and last annul; Beit Yosef answered Rambam also holds so — what he wrote "since first did not hear" is from what he copied nearby seif 19 regarding divorce where doubtful if divorce established; nevertheless Beit Yosef did not fully satisfy — Rambam regarding death wrote specifically without first hearing as I translated seif 16; Maharshal explained Rambam: if father annulled first betrothed\'s portion weakened — require first not hear; but without father first even if first heard father annuls with last — does not appear so: why would Rambam divide; moreover Rambam\'s explanation impossible — Shmuel expounds "they shall be" — last stands in first\'s place; whence even vows appearing to first who heard, father and last annul — extra verse; if father annulled first, last cannot annul alone; if father did not annul first, father and last together even if first heard — end.',
    '25#_':
      'Without hearing. Rambam\'s opinion — since anyway fit for hearing as "all fit for threshing" etc., can annul without hearing saying all vows you vowed are annulled though he did not hear; gemara this is unresolved, only by way of "if you will say" they said he annuls; Rambam rules everywhere per "if you will say"; gemara challenges from seif 10 scholar\'s way etc. he did not hear — we answer he annuls to check if vow exists, when she tells him he hears and annuls; disputant is Rosh who does not rule as "if you will say"; Perishah wrote Rambam\'s reason "her father\'s hearing" written, not husband\'s hearing — which student errs wrote explicitly "and her husband\'s hearing" — gemara asks if "her husband\'s hearing" specifically or not; Rambam writes explicitly husband and father equal.',
    '44#_':
      'Confirmed and annulled for you. Tur must read once "confirmed and annulled for you" — not versions "confirmed for you and annulled for you"; Rosh: since did not say "for you" twice it is one utterance; Ran on that version two "for you" — must say explicitly in this language confirmed and annulled in one utterance inclusive language; Tur wrote "said in one utterance confirmed and annulled for you" — impossible husband said only "in one utterance" language — how include as one except one "for you"; gemara dilemma — Rosh: doubtful follow first word or since said in one utterance both take effect, unknown if established or annulled; resolve from Rabbah: not sequential even in one utterance — sanctifying two sisters at once neither sanctified since cannot sanctify sequentially, likewise annulment not after establishment even in one utterance — implies no annulment or establishment, can recount or establish still, not stringent establishment like earlier case — here compared to Rabbah where words void entirely, even stringently neither sanctified; Perishah: here he does as he wishes etc.',
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
