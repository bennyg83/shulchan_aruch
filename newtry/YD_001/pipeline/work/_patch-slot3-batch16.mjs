#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_265/baer-heitev/part-001.txt': {
    '5#א':
      'And the father. Taz wrote: it appears to me if the father circumcises his son he should bless first both blessings — on milah and to bring him in — and then cut the foreskin (for between cutting and uncovering he cannot, being occupied in the midst of the mitzvah — how pause to bless to bring him in); so I practiced when I circumcised my son, and this is according to all; afterward I found Maharil ruled so — end. (It appears to me specifically when he has both cutting and uncovering; but if one cuts and another uncovers, he blesses to bring him in after the cut before uncovering like others.) He wrote in Bedek HaBayit in Rashbatz\'s name: when forced converts circumcise themselves they bless "Who sanctified us... to bring him into the covenant of Abraham our father."',
    '11#א':
      'With his mouth. Taz wrote in Zohar\'s name: the father says the verse "Happy are You who choose..." through "Your courtyards"; those standing there say the end of the verse "I have sworn..." through "Your holy Temple."',
    '12#_':
      'Shabbat. Derishah brought from responsum Maharar Menachem what they practice on Shabbat — visiting the newborn infant, who mourns for his Torah that he forgot, as in chapter HaMefaleit — end.',
  },
  'siman_265/beer-hagolah/part-001.txt': {
    '1#_': 'Baraisa Shabbat 133 side b.',
    '8#_':
      'Rambam\'s language there chapter 3; his reason regarding a minor: since the reason to draw covenant blood is we fear the foreskin may be crushed, as I noted in siman 263 — we do not bless on a safek; a convert who circumcised before converting is no better than a minor. Raavad challenged because it is a Torah safek; Lunil sages asked Rambam on this and wise men answered they fixed the blessing; they said whoever blesses an unnecessary blessing transgresses "do not take [God\'s name in vain]"; proof from Sukkah — we sit but do not bless etc. Sukkah 47 side a.',
  },
  'siman_265/beur-hagra/part-001.txt': {
    '1#ז':
      'And the father etc. As written "and the one who blesses" etc. — implies whoever it may be.',
    '3#א':
      'Convert etc. and minor etc. — minor as in siman 263 seif 4; all the more a convert as written 138a — Rashba did not disagree etc. "on condition" they disagreed etc.; nevertheless must draw blood as siman 265 seif 1 — see there; but do not bless on safek — Be\'er Heitev; Raavan chapter Kisuy HaDam. (Likut) Convert and minor — Yerushalmi chapter 19 Shabbat and Bereishit Rabbah parashah 46 "he who is circumcised shall circumcise" to include one born circumcised; tannaitic teaching Rashba says Beit Shammai and Beit Hillel did not disagree on one born circumcised that he needs covenant blood because it is crushed foreskin; on what they disagreed — convert who converted circumcised: Beit Shammai he needs covenant blood, Beit Hillel not; R\' Eliezer son of R\' Eliezer HaKappar says they did not disagree on this either that he needs covenant blood; on what — born circumcised when his eighth falls on Shabbat: Beit Shammai desecrate, Beit Hillel not (Sefer HaEshkol also brings Yerushalmi in this version — see there); R\' Yitzchak bar Nachman in R\' Hoshaia\'s name — halachah as the student, i.e. like R\' Eliezer (end).',
    '4#ה':
      'If she is etc. As written Berachot 40 side a.',
    '4#ט':
      'And some say etc. As written siman 221 seif 3; Raavan end of Taanit — it is not a matter etc.',
  },
  'siman_265/siftei-kohen/part-001.txt': {
    '1#ג':
      'As you brought him in etc. So is the version also in Tur, Rambam, and other poskim; but in Talmud and Asheri: as he entered the covenant so may he enter Torah and marriage canopy — and for this reason; so in Avudraham and so practiced; it appears better thus since sometimes the father is not there or he has no father — impossible to speak in second person, only hidden as "as he entered"; therefore they did not divide. Also appears even one who reads "as you brought him in" agrees "as he entered" is valid, as tannaitic teaching 133 side a — those standing say "as you brought him in" etc.; and afterward 135 side a those standing say "as he entered to the covenant" as above regarding blessings — end.',
    '3#ב':
      'Born when he was already circumcised etc. No blessing needed. Tur in Baal HaItur\'s name; nevertheless bless to bring him into Abraham our father\'s covenant — and we practice blessing; Mechaber translated Rambam\'s language implying no blessing at all; so Rashba responsum 329 and Ran chapter Rabbi Eliezer on Milah — likewise no blessing to bring him into Abraham our father\'s covenant.',
    '5#ב':
      'And even if he forgot etc. Maharshal there wrote likewise the first may bless "Who sanctified the beloved" — only not to create rivalry; it appeared he would bring proof from Beit Yosef and Rabbeinu Yerucham that one blesses "Who sanctified" after each milah etc.; but in truth Rabbeinu Yerucham did not bring there except responsum of R\' Meshulam to R\' Shimon: if two mohalim — one blesses on milah and the second does not bless on milah but "Who sanctified" etc., and both count for both infants — end; in Mordechai chapter Kol HaBasar it implies the first does not bless "Who sanctified" at all, only the second; so one should practice.',
    '10#_':
      'And if it is Shabbat they must be prepared etc. — per Beit Yosef\'s explanation of Baal HaItur in Rav Yehudah Gaon\'s name; but truly it appears from Baal HaItur even if prepared it is forbidden — decree lest he bring earth on Shabbat from outside not prepared; so Bach; likewise implied in Tanya 133 side a in Rav Yehudah Gaon\'s name — on Shabbat do not do so lest he bring earth from outside — end; Bach wrote nevertheless the world practiced leniency with earth prepared from erev Shabbat.',
    '13#א':
      'They pray selichot etc. Written in Minhagim siman 337: if milah falls between Rosh Hashanah and Yom Kippur say "Remember the covenant of milah" and "do not break it at awakening," also piyyut "God is awesome," and say Avinu Malkeinu; do not say "And He is merciful" or Tachanun; also on Tzom Gedaliah with milah say "God, slow to anger" and "For the conductor" — end. In Minhag Asarah BeTevet siman 39 wrote to say "Remember covenant of milah" and its piyyut as explained above — end; in hagahot there: on every public fast likewise "For the conductor" due to infant\'s distress; no Yehi Ratzon after Torah reading; if two synagogues in city and milah in one — say Tachanun in the one without milah — so practiced; likewise no milah piyyutim in synagogue without milah. From letter of Mahara — end; responsum R\' Moshe Mintz 43 — say "For the conductor" due to infant\'s distress; so Maharil; so practiced, unlike Avudraham who wrote also do not say "May Hashem answer you on a day of distress" because it is a day of joy for the father, not distress — so Kol Bo; also do not say "For the conductor" because milah day is joy for fulfilling the mitzvah — end; not practiced in these lands; appears places differ; Rokeach siman 108 — in Magentza they say "May Hashem answer you" on milah day with nine verses like nine months of pregnancy as in Shocher Tov; in Worms they do not say it — end.',
  },
  'siman_265/turei-zahav/part-001.txt': {
    '10#_':
      'For the circumcised infant. Implies here one need not the measure of a cup of blessing — full cheekfuls; so Beit Yosef here in Rashba\'s name: you asked how much taste measure for Temple — we require full cheekfuls; here for other blessings we do not require full cheekfuls — end. Difficult, for Orach Chayyim 107 — whatever requires a cup requires drinking full cheekfuls; one may answer cup requirement is from gemara words, unlike here which is only because we do not say song except on wine as Beit Yosef in Mordechai\'s name; on similar matters Rashba said.',
    '11#_':
      'One blessing for both. Tur likewise in Rosh\'s name; so there regarding two grooms; Tur Orach Chayyim 61:3 even if second groom not at blessing. One may challenge: why did Rama write there due to evil eye each blesses separately — what differs from two infants that he did not require so? It appears ab initio the second groom should be at the blessing since he is obligated — then evil eye applies when both together; unlike circumcised infant not obligated to be at blessing; nevertheless if known the second infant will not come quickly and there will be great interruption and talk, make separate blessing for each — milah blessing per Baal HaItur Tur brings; therefore fit to practice that the second be ready after first\'s blessing to circumcise him.',
    '13#_':
      'On Shabbat night etc. Reason in Batei Yosef 269 — then all are in their homes and "the son rests" in gemara for Perach; I saw support from Midrash Rabbah parashat Emor parashah 27 — R\' Levi: parable of king who decreed guests may not see his face until they see the queen\'s face first; so said the Holy One — do not bring sacrifice before Shabbat passes over it, for there are no seven days without Shabbat and no milah without Shabbat — end. Derishah brought from responsum Maharar Menachem what they practice on Shabbat visiting newborn who mourns for Torah he forgot as in chapter HaMefaleit — end.',
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
