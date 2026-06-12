#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_267/pitchei-teshuva/part-001.txt': {
    '4#_':
      'And the slave\'s consent is not required. [Be\'er Heitev; see responsum Mishkenot Yaakov siman 75 that Rif and Rambam are more decisive — see there.]',
    '7#_':
      'The master admitted on his own. Be\'er Heitev in Shach\'s name; see Shaar HaMelech chapter 4 of Hilchot Avadim law 17 and what is written there.',
  },
  'siman_267/baer-heitev/part-001.txt': {
    '72#_':
      'Annulled. Taz explained: your vow requires annulment and I cannot annul your vow because I have no dominion over you (otherwise the term hafarah applies only between husband and wife) — end of his words. Raavad in hasagot holds he did not go free; on the contrary he revealed he has authority to annul his vow; see above siman 234 in Tur and Beit Yosef regarding a slave\'s vows. Shach.',
  },
  'siman_267/beer-hagolah/part-001.txt': {
    '9#_':
      'Also there — for we say milah at its time overrides Shabbat, and every one circumcised on the eighth day is milah at its time.',
    '75#_':
      'Rambam there end of chapter 5; Sanhedrin 8 side a, and in many places.',
  },
  'siman_267/beur-hagra/part-001.txt': {
    '16#א':
      'The king etc. As written and "and they shall serve you" etc.; the question was not due to interest but due to servitude; Raavad\'s view per Tosafot there (for editions with extra text see Rav in his hagahot there). (Likut) This one is permitted etc. — per our reading "and they shall serve you" more, and per his explanation for excessive servitude; but Raavad challenged that it was said only regarding interest — the tax was ten dinars and they made it worth fifteen, meaning "more"; and the simple meaning is a sale; Tosafot explain they later returned the levy (editions without "more") — see there s.v. vemishta\'avdei; Rambam in Eretz Yisrael is hard to understand — see there chapter 5 Hilchot Gezeilah and Shulchan Aruch Choshen Mishpat 369:11 explaining royal law (end).',
    '19#_':
      'Even minors etc. Rambam; appears he learned from what is written "let us say" not like Rashbag; nevertheless like Rashbag it implies this baraita is also about a Hebrew slave and says he acquires maidservants — therefore regarding minors as in Gittin 64 side b and Shmuel; and he said he does not acquire etc.',
    '24#_':
      'The master raised etc. — per the first Tanna; but Rashba ruled like R\' Shimon that Shmuel and Rav Ashi establish like him who holds even by pulling, and all the more by lifting; Choshen Mishpat 196:3. (Likut) Raised etc. — Arukh HaMishpat there 196:3 and what is in Likutim there (end).',
    '27#א':
      'And a bill of release is required. Be\'er Hagoleh; even though we say there "the decisors" etc., we say in chapter 3 of Shabbat (40 side a; Tosafot there s.v. dilma and Rashba there and Tosafot Menachot 41 side b) that only in a mishnah is halachah like the decisors, not in a baraita — Rif and Shulchan Aruch; Tosafot there 1 s.v. tanna; likewise Yerushalmi brought Rashba and Rosh. (Likut) And bill of release is required — halachah is like R\' Eliezer from his colleague, for R\' Tarfon was his colleague, as in chapter HaKotev (Ketubot chapter 4 side b) in conclusion; halachah is not like the decisors who said halachah follows a decider only in a mishnah, as in chapter 3 Shabbat. Rif and Rosh and Ran; and further it is not called a decision unless they mentioned in their words it is fit to divide between them, like hot and cold there, and the leniencies of bedspreads mentioning ladder and door — Tosafot Shabbat 40a s.v. halachah; Tosafot there 29a s.v. bein; anonymous mishnah like R\' Eliezer as Tosafot and as written; likewise Yerushalmi — why not teach "he goes out with tooth and eye and exposed limbs"? R\' Yochanan bar Mari: because of dispute; one tannaitic source teaches bill required, one teaches not — Rashba and Ran brought; Ran wrote nowadays even according to those not requiring a bill, he admits a bill is needed because we require a court of semuchim since it is a fine law as in chapter Merubah (75 side a) exempt when he admits; there with court standing he goes free not from time of injury but we coerce nowadays to free as in Shulchan Aruch (end).',
    '27#ב':
      'And we coerce etc. — simple; see Gittin 42 side b ibaya lehu etc.',
    '63#ב':
      'There is no court etc. — therefore it is unsettled etc.; Rosh there; likewise Peretz z"l etc.',
  },
  'siman_267/rabbi-akiva-eiger-yd/part-001.txt': {
    '10#_':
      '(Seif 58) Even though he said to her "go out with it to freedom." In my humble opinion in the language of the document "be betrothed" does not imply release language — it is like freeing without a document, so implies Rashi; but Tur has "go out" and "be betrothed"; see Torat Chayyim part 3 note 112.',
  },
  'siman_267/siftei-kohen/part-001.txt': {
    '9#ג':
      'Until he immerses him for the sake of servitude. His body is not acquired and he can never make himself a free man. What is written "and if he immersed for the sake of a free man — behold he is a free man and does not need a bill of release" — likewise if he said before immersion "go" — he does not need a bill since he has no acquisition of the body — so Maggid Mishneh in Ramban\'s name and our French rabbis; Beit Yosef and Darchei Moshe bring it.',
    '22#ג':
      'And from his master to another. Bach wrote in another booklet: it is wondrous — since the hand of a slave is like his master\'s he should not leave his master when the master gives a gift to another through his slave and the recipient does not acquire; so explicit Choshen Mishpat Shulchan Aruch 243:14; complete mishnah chapter Chelkon that one does not acquire in partnership courtyards through his slave and maidservant since their hand is his hand and it is not acquisition; must be a scribal error in the Hagahah and should read "but one receives a gift from another for his master and from another to another" — so Semag beginning positive commandments chapter 7, Yerushalmi, Hagahot Maimoniyot chapter 5 Hilchot Avadim; also "for his name" is error — should read "from another to another and from another to his master" — see there, end.',
    '26#ב':
      'And some say he also acquires. Tosafot and Rashba wrote in R\' Chananel\'s and Rambam\'s name that he is not acquired through chalifin except as money; Tur in Rama\'s name: chalifin only uproots servitude but not prohibition; specifically without intrinsic value; but if it has value it also uproots prohibition — specifically chalifin given as money; but unspecified chalifin we doubt if like equivalent money and helps uproot prohibition — gift on condition to return is a gift; even with equivalent value likewise here; if we hold not like equivalent money and it only uproves servitude — we are stringent since it is prohibition and we coerce the master or heirs if he died to write a bill as one who declares his slave ownerless — end; see Choshen Mishpat 202 and 203 on acquisition of chalifin.',
    '40#ב':
      'If witnesses came on the matter etc. Since he did not distinguish, it implies even if he admitted before witnesses came we do not say "one who admits to a fine is exempt" — because we require expert court, his admission in today\'s court is nothing; Bach expanded and concludes we do not coerce his master to write a bill lest it be like admission outside court per Ramban and Rosh conclusion; nevertheless we do not coerce the master to write a bill lest it be admission before court per Raavad and it is admitting to a fine and exempt, as Rambam\'s view — see there and what is written below on Rambam\'s view.',
    '41#א':
      'And likewise if the master admitted on his own etc. It appears even without witnesses he is obligated by his admission alone that the slave goes free; though there is no expert court today, nevertheless his admission is admission — admission of a litigant is like a hundred witnesses; nevertheless he is not exempt due to "admits to fine exempt" since there is no court today — so Taz explicitly; Bach and Semag siman 1 end note 18. But it is wondrous — Bava Kama 75 implies where not exempt due to admits-to-fine, his admission is also not admission; there it was not in court; that tanna who said you have no witnesses holds it was outside court; Rosh first chapter Bava Kama and Ramban challenged Raavad — nowadays there is no court and it is like outside court where exempt even if he admitted; Rambam Hilchot Geneivah ch. 3: one who admitted to a fine then witnesses came — if first before court exempt; if outside court or before two only then witnesses — pays on their mouths; only because witnesses came afterward, not due to admission obligating; Beit Yosef (see Choshen Mishpat 406:26); though we hold admission of litigant like hundred witnesses even to obligate even today in monetary matters (Choshen Mishpat 79 etc.), that is only monetary; for fines since we do not judge fines today and his admission does not help to exempt, his admission to obligate is also not admission. Rambam end ch. 5 Hilchot Avadim: slave going out for exposed limbs applies everywhere always, judged only by semuchim court since it is a fine; slave who said master knocked out tooth and blinded eye and master denies — exempt; if he admits himself he is not obligated to release without witnesses — admits-to-fine exempt as Hilchot Geneivah — meaning since it is a fine, slave who said etc. exempt; if he admits himself exempt even today when no witnesses; though where witnesses exist admission does not help exempt, where seized slave is like seized, nevertheless where no witnesses at all certainly admits-to-fine exempt today and admission is not admission — so it appears, unlike Beit Yosef and Bach who forced his words; nevertheless explained where no witnesses he does not go free by master\'s admission — Bach and must say Rav "and likewise if master admitted" means if he admitted before witnesses came, not that he never admitted — unlike Taz and supporters above; main point. Again found in my Tur Choshen Mishpat siman 1 — responsa She\'erit Yosef end, Rav Yosef Cohen Krakow wrote explicitly wherever not exempt due to admits-to-fine, admission is also not admission — see there.',
    '74#ב':
      'But a dying person etc. Derishah wrote: Beit Yosef wrote and it appears when the Shulchan Aruch stood it deals etc. until "but it is difficult — Shulchan Aruch Beit Yosef himself wrote but a dying person etc. he went free and needs a bill, we coerce heirs" — behold his words explicitly contradict; requires study — end; Bach wrote: wonder on Beit Yosef who implies he holds when the Shulchan Aruch died no bill needed — not so as explicit Rambam chapter 9 Hilchot Zechiyah we coerce heirs to free — brought below; Beit Yosef himself brought Rambam here in Bedek HaBayit until "and so ruled Shulchan Aruch and retracted from Beit Yosef and Beit Hashem" — end; see seif 78 and Choshen Mishpat 256.',
  },
  'siman_267/turei-zahav/part-001.txt': {
    '49#_':
      'And in a bill of release he says "given to her, it shall not be" etc. It appears clear we do not derive this from the verse\'s plain meaning regarding release — for regarding a get it is written "and he shall write and give" and we expound it shall lack only writing and giving, not lacking cutting; that does not apply to release where only "giving" is written, not "and he shall write" — how expound it lacks only giving when writing is also required? We could say likewise regarding cutting; rather plainly gezeirah shavah "lah lah" teaches from a woman as Rashi explicitly in gemara first chapter Gittin — brought above seif 45; Rambam chapter 6 Hilchot Avadim I saw explicitly he does not bring the release verse here at all, only the get verse; for learning not in its name he brings the verse by bill of release as Shulchan Aruch seif 48 — but there he learns from verse implication, here from gezeirah shavah as explained; therefore the words are correct as in seif 45.',
    '77#_':
      'And his heirs are forbidden to enslave her. This is Rambam\'s language in the gemara: when Rav Dimi came, R\' Yochanan said R\' Yochanan said "they shall not enslave her" — we coerce heirs and write her release; Rav Ami and Rav Assi — R\' are you not ashamed, your sons are slaves? This is not release language; rather R\' Yochanan: whoever said make for her respite — we coerce and make respite. Rambam explains "they shall not enslave her" — we do not coerce to free; nevertheless she does no work at all; respite is less — she must do work but chooses which labor. So Rif like Rambam. Rosh and Tur explained "they shall not enslave her" — not to burden her with heavy labors; Tur then brings Rif: what is respite — if she says this work I cannot do, we do not coerce her; Rashi: if her mind is not settled except through release we coerce to free; so seems R\' Yonah z"l — implies Rif too agrees initially exempt from heavy labors, end per his words she will say on any heavy labor she does not want — respite is better since even light labor she chooses; not in Rif\'s words who initially explained no enslavement at all like Rambam whom Tur always follows; also truly "they shall not enslave her" empowers the maidservant more than respite if we explain respite also as choosing labor — plainly "they shall not enslave" is better meaning no labor servitude at all though not free regarding her children. Therefore Tur\'s initial writing not to do heavy labors follows Rashi and Rosh who bring afterward that for them respite language is about release, and all the more exempt from all labor; he properly explains "they shall not enslave her" giving empowerment for servitude alone, not exempting except heavy labors per Maggid Mishneh; nevertheless forced to explain so — since exempting from labor exempts completely as Rambam; clear in Rama\'s words Tur brings: cannot coerce her to do work at all — Rif and Rambam; he added even if he said "they shall not enslave her" heirs — we do not say heirs may sell her to another since he insisted only on heirs, not others.',
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
