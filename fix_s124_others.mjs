import { readFileSync, writeFileSync } from 'fs';

function fixFile(file, fixes) {
  let t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  const result = lines.map(line => {
    for (const [start, replacement] of fixes) {
      if (line.startsWith(start)) return replacement;
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log('Fixed:', file.split('/').pop().slice(0,30));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_124/';

// nekudot-hakesef
fixFile(base + 'nekudot-hakesef/part-001.txt', [
  ['(b) And from above, why did the column write in the letter of KGB?',
   '(Ibid.) Nevertheless it is difficult: why did the Tur write in siman 123, etc. — I have already written about this above in siman 123.'],
  ['(S.C. L.A.) I was reluctant to prove that Dovtytarda was not signed',
   '(Ibid. s.k. 31) He went at length to prove that through preoccupation one does not descend a level, and all his proofs amount to nothing, for in our time since all non-Jews are not actual idolaters, it is different from other non-Jews who are not actual idolaters; and with this all his words are refuted — and analyze.'],
]);

// pitchei-teshuva
fixFile(base + 'pitchei-teshuva/part-001.txt', [
  ['Instead of losing. "Look at the words of Debra, who is written in the name of Dr. Mahiri',
   'In a place of loss — see Dagul Merevavah, who wrote that the Rama here deals with a place where it is known they are actual idolaters; but otherwise for us it is permitted in a place of loss even if they lifted and swirled it, for certainly this is no worse than touch of a non-Jew through something else, below seif 24 in the gloss — see there. And so he wrote in his book Noda BeYehudah second series YD siman 69; and see there siman 70 where he wrote that all this is if the vessel was less than full, but if it was full one must be concerned for Rashi\'s words that in a full vessel we are concerned lest he touched when the Jew is not intending to watch and guard it. And it is explained there that if it was wine vinegar, even though we are strict with vinegar as long as it does not bubble as in siman 123 seif 6, at any rate it does not leave the status of doubtful vinegar and one may be lenient even if it was full — see there.'],
  ['to be angry. By answering the S. C.C., he made a kosher wine for a star worker',
   'To provoke — see responsum Chatam Sofer YD siman 127, concerning Reuven who made kosher wine at a non-Jew\'s premises and sealed the wine according to law, but he could not take it home until the lord received his tithe; and when the lord came to receive the tithe, he looked at the Jewish wine, opened the seals, put his finger in the wine, and said explicitly that he had now touched it. But immediately after the lord left the cellar, the non-Jewish cellarman closed the cellar, went and told Reuven that his wine was open, and Reuven went with the non-Jew and resealed the wine. There is a great loss here. The responsum discusses two concerns: (1) the touch of the lord according to the non-Jewish cellarman\'s account, and (2) that the wine was left alone with the cellarman without a seal while the lord was in the cellar, and also afterward. For who can say he came immediately to the Jew — perhaps he waited some time; and furthermore, who says the truth is with him — perhaps long before the lord\'s arrival the cellarman opened it to adulterate and benefit from the exchange, and now attributes it to the lord, saying he did it to provoke. He discussed this at length and concluded as practical halacha to permit the wine for several reasons — see there.'],
]);

// rabbi-akiva-eiger
fixFile(base + 'rabbi-akiva-eiger-yd/part-001.txt', [
  ['(T.S.A.) from here is a fourth. From the beginning of the High Court, Dien is a star worker',
   '(Taz s.k. 4) Nevertheless here one descends a level — it is explained that he holds that the law of a non-Jew who is not an actual idolater, that he is forbidden for drinking and permitted for benefit, is accepted by all, for even the Rosh agrees on this, that his status is inferior to a ger toshav; and so it implies in Eruvin that it is a matter without dispute. And apparently the distinction is that a ger toshav accepted the seven commandments. However according to this it would be surprising: why then does the Talmud challenge from "who is a ger toshav?" and forces a difficult explanation — it should explain plainly regarding the law of being permitted for drinking, for that is what the baraita deals with, which teaches regarding it that one may leave wine alone with him — the reason being that we are not concerned about his touch, since his touch is permitted for drinking, as the Rosh wrote. And requires study.'],
  ['He had no wine that he had made for his contact because of his contact he was allowed to drink',
   ''],
]);

// turei-zahav
fixFile(base + 'turei-zahav/part-001.txt', [
  ['A star worker is a fool. The taste of Mr. Delo Bar was tried for him to slip',
   'A mentally incompetent non-Jew, etc. — the reason is since he is incapable of libation, we lean leniently and say that in his folly he threw something at the spigot and it came out, and he did not touch.'],
  ['He touched the star worker in the dance. Epic swings a lot of songs:',
   'A non-Jew touched a wineskin from outside, etc. — even if he shook it much, it is permitted.'],
]);

// yad-ephraim
fixFile(base + 'yad-ephraim/part-001.txt', [
  ['If there is no name for Israel to save my blood and see C. X.C. in the name of the Rashi',
   'For benefit — see Baer Heitev; and responsum Pri Megadim Ashel Avraham part 2 siman 164: a Jew hired wagons to transport wine; toward evening the Jew went ahead of the wagoners onto the road, a wagon with the barrels fell, and the wagoner placed his hand on the stopper lest the wine pour out. The Jew came immediately, pushed the non-Jew away, and let it drip until those present gathered and raised the barrels onto the wagon, then sealed the stopper; and due to the lifting and moving one board cracked and wine was dripping, and a wagoner came with a clod of moist earth like mortar and smeared it on the crack. He ruled the wine is permitted for drinking for us in a small place of loss, since it is as though there is no Jew there to save; and see siman 164 in Siftei Kohen s.k. 64 in the name of the Rosh — even if he placed his hand on the wine itself, all the more so on the stopper; and see Siftei Kohen s.k. 68. And it is obvious in our case that perhaps the non-Jew did not know the stopper reaches the wine — which is permitted for us even in a small loss and even for drinking — see there.'],
]);

console.log('All done');
