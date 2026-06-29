import { readFileSync, writeFileSync } from 'fs';

function fixLines(file, fixes) {
  const lines = readFileSync(file, 'utf8').split('\n');
  let count = 0;
  const result = lines.map(line => {
    for (const [start, replacement] of fixes) {
      if (line.startsWith(start)) { count++; return replacement; }
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}:`, file.split('/').slice(-3).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/';

// siman_133/turei-zahav/part-001.txt — lines 51-53 (block seif 3 marker א)
fixLines(base + 'siman_133/turei-zahav/part-001.txt', [
  [
    'His entire salary is prohibited.',
    'His entire salary is prohibited. It is written in the Tur in the name of Ra\'avad: however there is a remedy for him — by casting the benefit into the Dead Sea, if he rented him a barrel; and Perishah wrote in the name of Rashal that this is specifically if he already received them, implying that as long as he has not yet received them this remedy does not apply — he should not receive them. And Maharach wrote that even if he has not yet received them, this remedy applies — that he should cast that benefit of the barrel into the Dead Sea and the remainder is permitted to receive; and he brings a proof from what is written in seif 4, that one may take a pledge against his wages — which implies that even before the non-Jew performs the benefit for him in exchange for receiving his wages, the pledge against wages is effective.'
  ],
  [
    'In this regard, it is not in the words of this word, nor in this regard, as it is, in the words of the significance of the cause, that the long-term Hashem of Israel is mentioned in the words of Hashem, that all the photographers will receive pleasure to the Dead Sea, and we will also be able to say that the Lord is not the benefit of the Lord\'s glory, and that the Lord is not the glory of His own',
    'In my humble opinion, neither one of these views is correct, for the essential reasoning is as Terumat HaDeshen the long version wrote: we hold like Rabbi Eliezer who said in perek Kol HaTzlamim that one casts the benefit into the Dead Sea — and this is even in a barrel that became mixed among barrels; and if so, once the mixing has already occurred, why should casting its benefit into the Dead Sea not help — what difference does it make that the money is still in the hand of the non-Jew?'
  ],
  [
    'We will receive all of the Star worker,',
    'Rather, before receiving [the wages] it is also not applicable to say he should cast from his own [property] into the Dead Sea — for if he afterward receives the entire wage, he receives it with the prohibition; and what does it help that he already cast from his own? Rather, let him receive it all from the non-Jew, and afterward cast one of them into the Dead Sea, or the one he first received from the non-Jew; and even if he does not cast one of them literally but rather from what he already owns — that suffices, since he already has one prohibited item in his possession and will not benefit from the amount equal to the prohibition, unlike [the situation] prior to him [receiving it]:'
  ],
]);

// siman_134/baer-heitev/part-001.txt — lines 30-31, 42, 53
fixLines(base + 'siman_134/baer-heitev/part-001.txt', [
  [
    'The page. It means that the words of the mountain are not stopped,',
    'The column. It implies from the words of Ran that specifically when the stream did not stop; but if the stream stopped there is no connection between the wine in the barrel and the wine in the pit; and since in that which fell alone by itself there is not sixty, it is nullified as with a tzintzur — and the reason regarding a barrel is that it is customary to pour into a similar vessel into the pit, and since the wine in the barrel will ultimately descend through this vessel and that is its way, one cannot say regarding it the first is nullified first — for anything that stands to fall and mix is considered as already mixed; unlike a small tzintzur where it is not the way to pour into a similar vessel into the pit, we do not regard it as fallen and mixed — end of Shach:'
  ],
  [
    'The Bible:',
    'Shach:'
  ],
  [
    'and paid. Or we will turn around',
    'And he should cast it. Or he should burn it or bury it; and it appears that the same applies to any place where it is lost, such as a deep river and the like; or he should sell it to a non-Jew except for the value of the prohibition in it, and even selling it without specification is permitted and he need not say to the non-Jew at the time of sale "I am selling it to you except for the value of the yayin nesech in it"; but as long as he has not cast the benefit into the Dead Sea, it is entirely forbidden for benefit. However, where the prohibition has no substance — such as if he put wine in the vessels of a non-Jew — everything is permitted for benefit, for there are no proceeds of the prohibition here — end of Shach, see below siman 137:'
  ],
  [
    'fees. And when he is familiar with a star worker except for a barrel of A. Sherry and A.C., he is again waiting for the Dead Sea. "Third:',
    'Proceeds. And when he sells to a non-Jew except for the value of one barrel, it is permitted and he need not cast it to the Dead Sea again. Shach:'
  ],
]);

// siman_134/beer-hagolah/part-001.txt — line 8
fixLines(base + 'siman_134/beer-hagolah/part-001.txt', [
  [
    'Changing the Starwork page by:',
    'Mishnah, tractate Avodah Zarah, daf 72:'
  ],
]);

// siman_134/mateh-yehonatan/part-001.txt — lines 42-43
fixLines(base + 'siman_134/mateh-yehonatan/part-001.txt', [
  [
    'Who will not sell to a star worker much together who will return and sell water to Israel.',
    'That one should not sell to a non-Jew a large quantity together lest he return and sell the water to a Jew. This is difficult: why should it matter if he sells to Israel — behold the taste has already been nullified; and if there is the taste of wine in it, a Jew will taste that it has the flavor of wine and will not drink the water. And according to what I wrote above that even though there is no taste, nevertheless the rabbis forbade it if there are not six parts water on account of stam yeinam — this is well; and there is another way to answer: we are concerned that the Jew will mix the water into food in a way that the wine will not be detectable, and even though now there is no taste of wine, nevertheless originally it was already forbidden and we say it becomes prohibited substance [chanan]; therefore it is forbidden to sell a large quantity together:'
  ],
  [
    'Selling a lot together:',
    ''
  ],
]);

// siman_134/turei-zahav/part-001.txt — line 115
fixLines(base + 'siman_134/turei-zahav/part-001.txt', [
  [
    'Instead of eating a flaw of star workers.',
    'In a place where it is customary to eat bread of non-Jews. And one may not sell it to a non-Jewish householder, for we do not purchase from him as written in siman 112 — for there in seif 5 it is explained that sometimes it is even permitted in the case of a householder. And Perishah answered: perhaps the householder will return and sell it to a baker; and this is not correct, for if so it would be forbidden to purchase any bread from a baker out of concern lest he purchased it from a householder:'
  ],
]);

// siman_135/baer-heitev/part-001.txt — lines 50, 71, 123, 134-135
fixLines(base + 'siman_135/baer-heitev/part-001.txt', [
  [
    'fun. And the tyres in impeachment in the vessel itself or will be obtained if it is a tool that must be obtained. "Third:',
    'Funnel. And it suffices with rinsing in the vessel itself, or drying if it is a vessel that requires drying. Shach:'
  ],
  [
    'We will use. As the Lord of the Lord and Dukke did not have wine from abroad, but he had a wine that had been cut off above, and he had no sages between his seven and his seven, without his birth as the D.C',
    'Used. Shach wrote: specifically when it did not contain yayin nesech for a full day-and-night period; but if it did contain yayin nesech for a full day-and-night, there is no distinction between sated and not sated, as above siman 93:'
  ],
  [
    'The faces. The letter of the High School should be careful in the preparation of pottery whose mouth is short and special to wine on the majority that must not drink wine of the rest if they are of a charcoal star worker use it as a star worker in wine and are not useful for impeachment but in those who also fill it with the water that may not be used in the water and are impeached:',
    'The coated ones. Taz wrote that one must be careful regarding those earthenware jugs whose mouth is narrow at the top and are designated primarily for wine — one may not drink permitted wine from them if they belong to a non-Jew who first used it with wine; and rinsing does not help. But in those which are also filled with water, it is a rabbinic doubt — perhaps he first used it with water — and they are permitted with rinsing:'
  ],
  [
    'We will use. He wrote in a duped retirement when he used them, but if he touched the time of a kitten, he was not arrested, and the tsunch was divided on him from some evidence that he had brought and ceased to be removed from the High Court, and the barrels remained empty, and were sold to a star worker who did not take the stars from there, because he had a bathe in him, and that he would be a bit clear wine between him',
    'And he used them. Perishah wrote: specifically when he used them; but if he touched at the time of smearing he is not forbidden. And Taz disagrees with him based on several proofs he brought, and ruled that touching also forbids. Accordingly it is forbidden for one who sold his wine and the barrel remained empty with only sediment remaining, and he sells them to a non-Jew, lest the non-Jew take the sediment from there — since the barrel has [moisture] sufficient to smear, and also among the sediment itself a little clear wine remained; it turns out the non-Jew forbids the barrel since wine is put in it for permanence, and the barrel will require hag\'alah or pouring; therefore Israel must remove the sediment and the non-Jew must not touch it.'
  ],
  [
    'As Israel put out the gamblers and star workers, we will not touch it, and we will see a model here by the N.J. Duncan to use the "disputely touch" (and therefore agree to the retirement of the here on behalf of the Spokesman, and the island\'s alleviction to make it more infusion)',
    'Therefore it appears that here too, even though they used the language "the non-Jew used it," the same applies to touch — they have one law (and Nekudat HaKesef agrees with Perishah here on the grounds that since it is not pitched the rabbis did not decree on touch to be so stringent as to require pouring — see there):'
  ],
]);

// siman_135/beer-hagolah/part-001.txt — line 8
fixLines(base + 'siman_135/beer-hagolah/part-001.txt', [
  [
    'From the work of Debbie Ferrak Roffele Starwork to “GG:',
    'From the incident of Bei Parzak Rufila, tractate Avodah Zarah daf 33:'
  ],
]);

// siman_135/beur-hagra/part-001.txt — line 93
fixLines(base + 'siman_135/beur-hagra/part-001.txt', [
  [
    'A vessel and a quaint. Dr. B. D. B. D. D. D. D. D.H.:',
    'A vessel, etc., and accordingly, etc. Tosafot 74b s.v. d\'havah, etc.:'
  ],
]);

// siman_135/turei-zahav/part-001.txt — lines 8, 84
fixLines(base + 'siman_135/turei-zahav/part-001.txt', [
  [
    'The tools that are not quaint.',
    'Vessels that are not [permanent-use], etc. This siman did not include the winepress vessels, which are more stringent — even though wine is not put in them for permanent use, since they are preoccupied with wine and their law is explained in siman 138 — so wrote Beit Yosef; and it is mentioned by all the poskim that winepress vessels are more stringent than other vessels:'
  ],
  [
    'The pottery vessels are called. It means just our pottery vessels and not as the biblical column brings to light that it is a kind of quaint soil and that it should be careful to enjoy the gift of pottery that is short of above and special to wine on the majority that does not drink any wine of the rest if they of a worshiper use it as a star worker in wine and are not useful to impeach but in those who are also filled with water and are doubted by water. Yes, yes:',
    'Earthenware vessels are called [thus]. It means simply our earthenware vessels, and not as the Tur brings the view of Rosh who wrote that it is a type of earth, etc.; and accordingly one must be careful regarding those earthenware jugs whose mouth is narrow at the top and are designated primarily for wine — one may not drink permitted wine from them if they belong to a non-Jew, since the non-Jew first used it with wine; and rinsing does not help. But in those which are also filled with water, it is a rabbinic doubt — perhaps he first used it with water — and they are permitted with rinsing. So it appears to me:'
  ],
]);

// siman_136/baer-heitev/part-001.txt — line 29
fixLines(base + 'siman_136/baer-heitev/part-001.txt', [
  [
    'Ordinary. Who wrote there are congestions of the loophole should be careful in every May, as well as the last ones. "Third:',
    'Customary. However, some poskim wrote that lechatchilah one should be careful in every possible case; and so wrote the later authorities. Shach:'
  ],
]);

// siman_137/baer-heitev/part-001.txt — lines 38-39, 50
fixLines(base + 'siman_137/baer-heitev/part-001.txt', [
  [
    'diary. It does not belong to Hashem\'s people, but rather than in the flesh, but in the words of the Holy Spirit, it is known that he has been subjected to wine from above, and that of the Lord\'s words, and in the words of the Holy One, he does not seem to have any wine, and that he does not seem to be able to do so with him, and that he does not have any kind of wine',
    'Day-and-night. For noten ta\'am lifegam does not apply except in cooked dishes, but not in wine vessels — on the contrary, the older they become the more they improve in flavor. And where it is known that wine stood in it for a full day-and-night, from the words of Rashba and Beit Yosef it implies that even so it is not absorbed beyond a peel\'s worth; and this does not seem right, for it has already become pickled and pickling forbids the entire vessel.'
  ],
  [
    'A report that stood above the IDF even a tool that came into existence in the shell, and there is something in S. against the shell. The Bible:',
    'Accordingly, in a vessel where it is known that yayin nesech stood in it for a full day-and-night, and one then put permitted wine in it — where there is no water — it is forbidden, for one needs to measure sixty against the entire vessel and there is not sixty of what is in the vessel against the vessel, as above siman 93. And the Rav who wrote it is nullified in sixty means in an unspecified case where it is not known that it stood for a full day-and-night — for then even a vessel put in for permanence, a peel suffices, and there is sixty of what is in the vessel against the peel. End of Shach:'
  ],
  [
    'Chery. The duke of the venge is null in the sama that comes through the venge has a sage against the shell. "Third:',
    'Permitted. For the peel of the hole is nullified in sixty, since what comes through the hole always has sixty against the peel. Shach:'
  ],
]);

console.log('All done.');
