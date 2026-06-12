#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_228/pitchei-teshuva/part-001.txt': {
    '6#_':
      'And likewise death. See Magen Avraham Orach Chayyim siman 634 note 18; responsum Maharit part 1 siman 118; responsum Maharival kelal 2; responsum Chasam Sofer siman 41; Shaar HaMelech chapter 4 of Hilchot Sukkah.',
    '30#_':
      'For future generations. See responsum Zekheron Yosef Choshen Mishpat siman 14 — they may release even without opening and regret, for those born are not less than their first fathers; where they may release and change regulations accepted in cherem without opening and regret as above seif 25, so their children and descendants may release; see there on Chavot Yair siman 226. See Noda B\'Yehudah Tinyana Choshen Mishpat siman 51 — in Torah cherem like one accepting upon himself they cannot accept upon their seed, only the public can enact cherem for generations — see there; he wrote so is clear in Noda B\'Yehudah Kama Choshen Mishpat siman 64 — error, should be siman 68 in s.v. ume\'ata nichazi anan — see there further.',
    '33#_':
      'Release. Be\'er Heitev in Shach\'s name; see responsum Ranach part 2 siman 44 what he wrote on this.',
    '41#_':
      'And it is impossible to marry him. Therefore if the betrothed\'s sister converted, since she may marry him he is not released from his oath — Rama disagrees with the Mechaber\'s essential law on the betrothed\'s sister; likewise the betrothed himself only if he converted to another religion which makes marriage impossible, but other flaws do not help for the oath. See Noda B\'Yehudah Choshen Mishpat siman 69 who expanded — Rama also agrees if the betrothed\'s sister converted no release needed, a man is accustomed to be strict and it is clear presumption, but a woman is pleased with any match — therefore Even HaEzer 506:5 Rama was silent and did not write there is disagreement. He further wrote all this per Rama\'s understanding of Maharam but in truth not so — see there he expanded there is no dispute among poskim at all; also for betrothed\'s sister or one flawed in laughter there is clear presumption and no release needed; but after the responsum the flaw is not so great and presumption is weaker — see there.',
  },
  'siman_228/baer-heitev/part-001.txt': {
    '6#_':
      'Tax collector. Taz wrote: requires study on this law — otherwise the rabbi of the city would be forbidden to release any vow of all appointees of the congregation etc. — see there. But Shach wrote in Darchei Moshe\'s name: the reason is he forbade himself tax collectorship and trusteeship bringing him benefit from the city — his intent is on benefit of tax collectorship and benefit of trusteeship; since through the sage\'s release this benefit comes to him, he transgressed his vow — end; so appears essentially. Accordingly Rashba follows Rambam\'s view as Beit Yosef wrote; Taz wrote — see there in his explanation unlike Derishah; nevertheless for those poskim who forbid due to conflict of interest, as I wrote note 9 here, in any case he is not asked — requires study.',
    '30#_':
      'Many. Shach wrote: appears Rav\'s view that for the public even if they all regret they cannot release since their regret is not equal; above seif 225 Rav wrote even if they mentioned oath with cherem they may release themselves without asking and regret; appears Rav holds specifically when the chazzan says on behalf of the congregation "we impose oath and cherem" etc., and even if whole congregation answered amen — in such case we say per their custom they impose; but when each one of the congregation swore in detail on this matter it is "public" and requires release — end.',
    '35#_':
      'They are stringent. Shach wrote: this is regarding a community that accepted that any document not made by the city scribe is invalid, then enacted it is valid, and before they released the first cherem documents were made not by the scribe — he wrote the documents are not invalidated, for though the first cherem is not yet released, when the second enactment is later released it applies retroactively; but all who did not release the first cherem at all, certainly the second does not take effect — so Taz — see there.',
    '37#_':
      'That he can. Shach explained: he says his intent was his friend would agree to the matter — if he does not agree it is not a vow at all; but one who vowed a full vow and does not depend on his friend\'s agreement but says his friend can release him like a sage — that is nothing, as below siman 231. Alternatively "that he can release" means actual release and it helps when he nullifies immediately at time of vow — all because the vow never took effect — end.',
  },
  'siman_228/beer-hagolah/part-001.txt': {
    '8#_':
      'Ramban in laws of cherem and Rashba in responsum and Shulchan Aruch from incident of Rav Huna who released that woman — mention of Hashem etc. — there in Nedarim 7 side b.',
    '38#_':
      'Responsum of Rashba; he wrote there oral permission is not required but even in his handwriting suffices if one recognizes his signature (and Ramban siman 254).',
    '49#_':
      'Responsum of Rashba from that of half to Aharon and half to his sons — Bava Batra 143 side a.',
  },
  'siman_228/beur-hagra/part-001.txt': {
    '17#א':
      'They do not release etc. how. Raavan there s.v. mihu; regarding asking etc. and there is an opinion etc.; Rambam and Shulchan Aruch ruled like second view. (Likut) They do not etc. — Rambam\'s language holds even time-dependent; R\' Yehudah disagrees as Abbaye divided there chapter 9 side a; responsum Ramban siman 271 feared Rambam\'s view, wrote perhaps we hold like R\' Yehudah and even Abbaye only ab initio etc.; brought proof from 90:1 dispute etc.; but in question s.v. mippor veaf al pi etc. perhaps only time-dependent but no distinction — see there (end).',
    '20#א':
      'One who vowed benefit from another until he specifies. All Tur\'s language; Shulchan Aruch wrote unless he informed the one from whom he vowed — Tur: from the mind of the one from whom he vowed, on his understanding as in Hagahah — per Rokeach Mitz; Rosh brought in commentary and rulings: "before him" means with his knowledge like Eruvin 46b and Shmuel — one is liable only before him; Shulchan Aruch "from the mind of his fellow" is Tosefta and Yerushalmi version Tosafot Gittin 35b s.v. leyachush, Yerushalmi "before him" etc. — this "before him" per Rokeach also means with his knowledge. Though Rosh rejected Rokeach\'s explanation there and wrote language of "one forbidden benefit from another" does not imply so — nevertheless wrote afterward one must explain so; though Yerushalmi etc., since our gemara teaches so Tur wrote so; it appears Tur wrote per Rosh in Gittin where Rosh wrote like Rokeach and wrote explicitly unlike Yerushalma — see there.',
    '20#צ':
      'He must remove her. So Rambam\'s view; though all poskim disagree from first chapter of Nezikin 8:2 "what is another explanation" etc., nevertheless she is not obligated to be with him, and all the more if not yet married they release her.',
    '25#ד':
      'Therefore they vow etc. Tur; Rashbatz wrote it is only like cherem as above, and in cherem they release themselves — tribes when they found Yosef released the cherem themselves [likewise Rivash] — this is proof for what Shulchan Aruch wrote.',
    '33#א':
      'One who swore etc. — it is like swearing to nullify a mitzvah as in chapter 2 of Yevamos (21 side a): "and you shall keep My watch" — make a watch for My watch; Torah gave permission to each generation to make enactments and fences.',
  },
  'siman_228/siftei-kohen/part-001.txt': {
    '8#_':
      'Cherem etc. — meaning one who accepted cherem or niduy to do a certain thing — they release him without opening and without regret; so explained Rashbatz in Beit Yosef; but public cherem obviously needs neither opening nor regret as below seif 225; nevertheless release is required; see siman 229 seif 8.',
  },
  'siman_228/turei-zahav/part-001.txt': {
    '35#ב':
      'And some are stringent. Written per Rosh general 9 siman 4: community that enacted in cherem every document only by scribe, then enacted two arbitrators write each document and scribe writes last line; community wrote they agreed to enact in cherem, then deliberated another enactment per need — power in their hands provided they release cherem; if they did not mention this they did wrong making a stumbling block; nevertheless documents made per second enactment were not invalidated and second enactment stands — not like Rava in first chapter Temurah "whatever the Merciful One said if one did it does not help" — if so what passed on cherem should not help second enactment — not comparable, there regarding mitzvot that cannot be nullified unlike here possible to nullify, Rava admits what one did helps; from this Rama learned Rosh is stringent and upholds second cherem; therefore wrote "some are stringent"; so Darchei Moshe; but truly very wondrous — certainly second cherem never took effect as he himself wrote in that general law 6 — here regarding documents made per second enactment he said enactment stands, not cherem; they were not invalidated since they have power to change; what they did in prohibition nevertheless the act stands — like one who swore not to sell and sold sale is not voided as Choshen Mishpat 248 unlike some — see there he expanded.',
    '40#_':
      'With permission of one of them. From Rashba responsum Beit Yosef brought, learning from chapter HaSho\'el (94): R\' Yonatan, we hold like him who holds father and mother cursed — implies both together and each alone until scripture specifies together as with ox and donkey; also when they imposed oath they only imposed not to lend except with permission of both or one of them — end. Difficult: since dual meaning, whence that the imposer intended both; to be lenient that lending with one\'s permission suffices — we hold anonymous vows are stringent, all the more here we should say intent is simpler meaning both together; also Rashi on parashat Bo "Hashem struck every firstborn" is addition language like "so-and-so and so-and-so behold before you" — plain meaning is addition; though one could be stringent say "or" means path, we lack source to be lenient; Tur and poskim wrote in this law of vow on mind of many "such as specifying them on mind of so-and-so" — why not say "or so-and-so" and not on mind of many; in Maharai siman 73 he wrote there in name of Maharil if one said "or" he did not impose on mind of many — end of his words.',
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
