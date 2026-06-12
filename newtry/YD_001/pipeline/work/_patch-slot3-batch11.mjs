#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_201/pitchei-teshuva/part-001.txt': {
    '7#_':
      'Of a mikveh. See Baer Heitev in the name of Shach; and see responsa R\' Chaim Shabati part 3 siman 21 page 28 side 3 — what he challenged from the sugya in Bava Batra 66 that it is explained there that one fixed and finally hewed does not help except for drawn water d\'rabbanan but not for a Torah prohibition; nevertheless he concluded one should not deviate from the Tur\'s ruling and it is kosher to immerse therein when fixed and finally hewed; and wrote there further to resolve the difficulty that per the conclusion we do not say this answer that it is different regarding drawn water but another reason — see there; and see in Be\'er Yaakov what he wrote [for practical law he also concluded not to deviate from that ruling and his fellow Geonim agreed — see there; and Merkavat HaMishnah chapter 6 law 4 of Mikvaot ruled practically, brought somewhat below note 10]; and in Yeshuot Yaakov Orach Chayyim siman 159 note 7; and see Noda B\'Yehudah Tinyana Yoreh De\'ah siman 142 — he also stood on this difficulty and was not satisfied until he had to say the Tur and authors of Shulchan Aruch did not uphold it for niddah immersion except for laws of mikveh; and behold also new vessels bought from a gentile require immersion, and some poskim hold the essence of this immersion is d\'rabbanan; and even for us, specifically metal vessels, but glass vessels all hold d\'rabbanan — therefore they wrote that if fixed after hewing it is invalid, meaning even to immerse glass vessels therein; but fixed and finally hewed — there is a distinction: for glass vessels it is permitted to immerse therein, but metal vessels and all the more so a niddah woman are forbidden to immerse therein, and even b\'dieved her immersion does not count; and he wrote regarding a Kohelet owner who is only tamei d\'rabbanan — she should not immerse therein l\'chatchila, but b\'dieved her immersion counts; also in responsum R\' Akiva Eiger siman 39 his view is that kavu and finally hewn helps only regarding water drawn through a vessel in this manner, but not regarding immersing therein; and he wrote that although from the Tur\'s words it implies it helps also for immersing therein, and in Rambam chapter 11 of Hilchot Kelim it implies so regarding receiving tumah in a complete vessel one needs a utensil name when detached — nevertheless what shall we do, since in the sugya in Bava Batra cited above it is explicit to the contrary — see there. [And see responsum Chasam Sofer simanim 198, 205, and 207 where he expanded greatly; and there he wrote after the view of Rambam, Rashba, Agudah, Rosh, Tur, Shulchan Aruch, responsum Tinok, Sefer Be\'er Yaakov, Merkavat HaMishnah, and the custom of all cities of Israel to permit immersing in a vessel that was fixed and finally hewn, and detached and finally attached is like attached for this matter — certainly forbidden to doubt and ponder this ruling; and he wrote further the same when carving and fixing come together, such as making troughs from boards on pegs fixed in the ground and in building, and likewise permitted afterward to divide by a wooden partition wall between water and water if each has the requisite measure — see there.] And he wrote further in Noda B\'Yehudah there regarding a mikveh where sometimes the waters diminish until no mikveh measure remains — whether they may place inside a large barrel with holes in the bottom of shefoferet-size and fix the barrel in cement like construction, and after the mikveh fills seal the holes with wooden plugs so the waters do not diminish — and he wrote this is not correct [even if we decide kavu and finally hewn helps also for niddah immersion and even if they open the plug each time of immersion], since by sealing the holes with a wooden plug the barrel is not canceled from utensil status, and even when removing the plug it is called a utensil as explained in Orach Chayyim siman 159 seif 5 — there when one takes his hands through the plug the plug is not in the barrel, nevertheless utensil status is upon it since the plug will return inside; therefore if when making the hole in the barrel he immediately intended to seal it with a plug, the utensil name of the barrel was not canceled at all even before fixing the plug, etc. — see there; and see responsum Beit Efraim Chadash siman 53 who attacked him and raised that even if he thinks when making the hole to seal it with a complete seal it does not help at all as long as it is not sealed — nevertheless he is concerned for the words of the Gaon Noda B\'Yehudah; therefore it is fine to make one large hole like removing a pomegranate and seal it with cement and stones by way of building and this will be sealed, and also make a shefoferet hole with a plug and open the plug each time one comes to immerse [and see further on this in Mishkanot Yaakov end of siman 44 and Chasam Sofer siman 198 and 205 and Ran and Ri\"ch at length; and apparently the proof he brought in Mishkanot Yaakov from Talmud Yoma regarding Ben Katin who made twelve spouts for the laver is a great proof and is not rejected because of the reasoning of Beit Efraim and Chasam Sofer there] — see there he was uncertain what to do regarding Shabbat immersion (however it appears to me the entire essence of his doubt is not relevant except per his original view that one hole suffices — not so now — uncertain there) whether it is permitted to open the plug and seal it, since the hole cancels utensil status and sealing makes it a utensil again — he inclined to permit, and in any case one should not return the plug forcefully after immersing therein, only it should be somewhat loose and move in the hole back and forth — see there; and see further responsum Bach there where he expanded greatly on laws of mikveh, and Noda B\'Yehudah at the end of the responsum explained fourteen detailed laws of mikvaot — see there.',
    '9#_':
      'One who buys a large vessel. See responsum Or Tzaddikim Panim Me\'irot part 3 siman 41 — a certain rav wanted to say this is only regarding a wooden vessel, but regarding metal even if pierced for its purification it is tamei d\'rabbanan — and he himself attacked him — see there.',
    '11#_':
      'The hole that purifies it. Shach note 23 at the end — what he challenged on the Mechaber; and see responsum Shevut Yaakov siman 1 what he wrote on this.',
    '13#_':
      'That they go out of the vessel. Baer Heitev — what Shach wrote that the vessel is whole, etc.; and see Noda B\'Yehudah Tinyana Yoreh De\'ah siman 139 — a certain rav wanted to forbid a mikveh made in this manner; and in order not to cast aspersion he sought a leniency per Shach\'s words in note 56 in the name of Ra\'avad that waters descending into the pit last are closer to exiting more than the first — and he himself disagreed, for certainly even when the vessel is full the stream coming down descends into the entire vessel and everything becomes drawn water and it is invalid, and even the women who already immersed are in their niddah and everything they used was forbidden and they must immerse anew — see there siman 140: if this mikveh into which floating waters were drawn above the cistern had been an excavated place in the ground with a spring flowing but without even 20 se\'ah, and the floating waters completed the measure — the women who immersed need not immerse again, and those poskim may be relied upon that a spring is not invalidated by drawing and purifies even in shefoferet — see there.',
    '14#_':
      'To have the law of a mikveh. [Baer Heitev; and Shach note 30; and see Chasam Sofer siman 209 where he expanded and it is explained there that Rambam\'s view is to validate even if both flow-channels of the entrance from the spring and the exit were nullified, nevertheless there the spring remains; but one should not be lenient against Ra\'avad. In any case, as long as the flow-channels are open one immerses without hesitation and one should not be stringent to decree lest a channel stopped without his knowledge, since if so there is Rambam who validates from reasoning that we do not decree — see there and what I wrote below note 21.]',
    '17#_':
      '19 times. See responsum R\' Akiva Eiger siman 221 letter 9 and siman 222 letter 25 what he wrote on this.',
    '20#_':
      'But a spring. [See Mishkanot Yaakov end of siman 44 where he challenged on this.]',
  },
  'siman_201/baer-heitev/part-001.txt': {
    '1#א':
      'Mikveh. Meaning rainwater gathered in a pit; and even though they are not living waters — one does not need living waters except for zav, but not for niddah and zavah — Tur and poskim; but wells that flow are a complete spring for every matter — so Mahari"k and Ramban in a responsum.',
    '1#ב':
      'In an amah. In responsum Mahariv siman 75 he wrote that the length of two shoes of an average person is an amah — see there; and Taz wrote all this is for a person, but for vessels a spring purifies in shefoferet according to all — and so the Tur.',
    '2#א':
      'In an ashboren. Meaning they are gathered in a mikveh or by a fence around them.',
    '2#ב':
      'Everything. Shach wrote — it implies even those places where the river did not flow from its beginning are like a spring; however this requires study whether we need specifically a majority of living waters, or even if the flowing waters are only equal and the drippings are not the majority, everything is also like a spring — requires study for practical law, for drippings are invalid by Torah law; and see end of Chullin 28–29 regarding half-and-half like majority — end of his words.',
    '2#ג':
      'That they gather. And it implies all the more if there was a pit here filled from rains even though they flowed into it between mountains — since now they are in an ashboren, behold it is like a mikveh and permitted to immerse therein. Shach.',
    '2#ד':
      'And to be stringent. Meaning to immerse in rivers lest rainwater and snowmelt increase there, and these do not purify except when fixed in one place, namely in an ashboren; and every river flows and flowing does not help except from a spring; and Terumat HaDeshen wrote: I heard challengers — what is different about drippings that invalidate flowing waters in their creation and remove them from the category of flowing, and drawn waters that invalidate a mikveh entirely, yet if there was already a complete mikveh of 40 se\'ah and drawn water fell in, even a thousand se\'ah at once, they do not invalidate it; and Taz answered that here it is invalid because we are concerned snowmelt and rains descend from a high place at the riverbank and thereby there is no connection, for we hold a narrow strip is not a connection — if so we are concerned she may immerse on that slope where there is no connection for the flowing waters drawn below from the spring, and she ends up immersing in an invalid place in flowing waters — end of his words.',
    '2#ה':
      'At the time of. Even through their flowing, for it is not made like a mikveh in a river even though they increased, etc., because you have no drop descending from above unless the deep rises toward it in drops, and the main increase is from their source; however where there is a mikveh one should not immerse in rivers except when the river is small, for then it is permitted. Shach.',
  },
  'siman_201/turei-zahav/part-001.txt': {
    '1#_':
      'Or a spring, etc. — meaning for a person; but for vessels a spring purifies in any amount according to all, as the Tur wrote. [(1)] And even if all the waters of the world rose upon her — this is Rambam\'s wording; and in the Tur it is written "or rose," etc.; and it must be settled that he means: if she bathed in a bathhouse and washed herself with her hands over her entire body — but even if waters rose upon her by pouring, this helps for the matter of nine kavim relevant to prayer; here it does not help.',
    '2#_':
      'In an ashboren. Meaning they are fixed and established in a pit or by a fence made around them — then they are flowing and invalid, as it is written "only a spring," and they expound "a spring purifies in flowing waters," and a mikveh does not purify in flowing waters.',
    '7#_':
      'When it is in the air. For it must be similar to a spring and mikveh, which are not accustomed to be in the air. Rashi.',
    '8#_':
      'There must not be 40 se\'ah of mikveh, etc. — the same applies to a spring, as the Tur wrote; and in this matter spring equals mikveh.',
  },
  'siman_201/beur-hagra/part-001.txt': {
    '1#א': 'There is no, etc. — chapter 1 of Taanit (13 side a) and Niddah 66 side b.',
    '1#ב':
      'And even if they rose, etc. — chapter 3 of Berachot (22 side a) "just as 40 se\'ah in immersion," etc.; and chapter 1 of Shabbat (14 side a).',
    '1#ג': 'At one time. Torat Kohanim parashat Emor.',
    '1#ד':
      'In mikveh waters. See end of Avodah Zarah and Shulchan Aruch: (Likut) In mikveh waters — one does not need living waters except for zav alone, as in Tosefta chapter 3 of Zavim: zav is stricter than zavah, for zav requires living waters and zavah does not require living waters — brought by Rashi and Tosafot on Shabbat 65 side b and Tosafot Bechorot 55 side b and Rashi chapter 4 of Zavim and Shulchan Aruch; and in Tosefta chapter 1 of Megillah there is no difference between zav and zavah except that zav requires living waters, etc. — brought by Rosh chapter 10 siman 8 (end of citation).',
    '1#ה': 'Or a spring. In Torat Kohanim: "only a spring and a cistern, a mikveh," etc.',
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
