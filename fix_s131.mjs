import { readFileSync, writeFileSync } from 'fs';

function fixLines(file, fixes) {
  let t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
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

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_131/';

// baer-heitev/part-001.txt — 8 garbage lines
fixLines(base + 'baer-heitev/part-001.txt', [
  // seif 1 marker א (line 8) — disturbed / פרע
  [
    'disturbed. The Bible wrote that he had nothing wrong',
    'Paid. The Shach wrote: this means that he paid him nothing at all; but if he paid him in part, such that the Jew has a share in the wine — it is implied from the Rashba that it is like Jewish wine resting in the possession of a non-Jew, which is permitted with key and seal, and for us with one seal be-di\'eved.'
  ],
  // seif 1 marker ב (line 19) — and Israel / והישראל
  [
    'and Israel. He was quoted as saying that he was in the house, but in the yard',
    'and the Jew. He counts as a watchman — it suffices by his coming and going — so rule the poskim; and Darkei Moshe wrote: specifically when the wine rests in a house, but not in a courtyard, until one seats a watchman there — since he has a connection to the wine and the courtyard, he touched it and does not fear; and the Taz wrote: I do not understand this — on the contrary, in the courtyard he fears more than in the house, since he also has a connection in the house — end.'
  ],
  // seif 1 marker ג (line 30) — Israel / ישראל
  [
    'Israel. Even Israel is different in the West Bank',
    'Israel. Even another Jew — Beit Yosef and Perisha; but the opinion of the Rashba is that even where only this one Jew lives in the town, the non-Jew is not afraid to enter there and to falsify; and we require specifically many Jews living there, since he fears lest one of them see him; and likewise the opinion of the Ran; and one should be stringent where there is no loss, but for benefit it appears permitted even not at a place of loss; however where the non-Jew does not live in the courtyard, it is permitted without any seal at all since it is open to a public domain — end Shach.'
  ],
  // seif 1 marker ד (line 41) — key / מפתח
  [
    'key. In the opinion of Rashi Dup',
    'key. The opinion of Rashi is that even so it is forbidden — for whenever he did not write to him "I have received [payment]" in such a manner that he cannot detain him, the non-Jew thinks: if I see it, I lose nothing and can say it is mine; and likewise an open entrance does not help, since the non-Jew is sitting within that very entrance, and even with two seals it is forever forbidden until he sits and guards — therefore it appears that one should not be lenient in this except at a place of loss. Shach.'
  ],
  // seif 1 marker ה (line 52) — and slave / ובדיעבד
  [
    'and slave. The book of the Bible and the key',
    'and be-di\'eved. The Shach wrote: with key and seal it is permitted for benefit for us, even where it is not open to a public domain and no Jew at all lives in the city; and likewise for drinking at a place of great loss; and the Taz wrote that the same applies to key alone, and see above siman 118 and siman 130 for what was written there in the name of Shach and Nekudot ha-Kesef, see there.'
  ],
  // seif 1 marker ו (line 63) — Dr. / דר
  [
    'Dr. A lot of Israelis follow in the city',
    'Lives. And even many Jews living in the city — since the non-Jew does not fear touching it, as it is his own; this is not the case with Jewish wine in the possession of a non-Jew, which is permitted with key-and-seal or with one seal be-di\'eved, since he fears more; but coming and going helps here even if one stayed a long time, provided he did not announce that he was sailing away, as above beginning of siman 129. Shach.'
  ],
  // seif 1 marker ח (line 84) — Roarch / רוכלי
  [
    'Roarch. And even at night',
    'Peddlers. And even at night he fears lest they take him for a thief; nevertheless on Sabbaths and Yom Tov when he has no fear of peddlers it seems that guards are required; and that which we said above siman 129 seif 6 that we are not presumed to be Sabbath-observant in their eyes — that is where there is a loss for the Jew, which does not apply to peddlers — so Beit Yosef and Darkei Moshe.'
  ],
  // seif 1 marker י (line 106) — At night / בלילה
  [
    'At night. He opened an open door to the Almighty, not from me at night',
    'At night. Even an open entrance to a public domain does not help at night — rather he must be sleeping inside it. Shach.'
  ],
  // seif 1 marker כ (line 117) — inhibition / מעכב
  [
    'inhibition. And he wrote in the name of the Rebbe\'s reply',
    'Impedes. And Beit Yosef wrote in the name of a responsum of the Rashba: specifically if he wrote to him "I have received [payment]," or if he extended it as a loan — but otherwise, even if he acquired it from him before witnesses in the manner of non-Jewish transactions where neither party can retract the sale, it is forbidden.'
  ],
  // seif 2 marker א (line 138) — allowed / מותר
  [
    'allowed. The Bible wrote that they did not say but in the midst of a star worker',
    'Permitted. The Shach wrote: they said this only regarding one who purifies the wine of a non-Jew that grew in his own vineyard, who did not trouble himself much over it, nor incur expenses for it, and does not worry greatly if the Jew should discover him falsifying; but when he conveys wine a great distance with great effort and many expenses, and also purchased it — he is concerned about his effort and expense and will not falsify. Rosh and Tur. And Bach wrote: where the custom is to permit in such a case with one seal, the custom stands.'
  ],
  // seif 2 marker ב (line 149) — in partnership / בשותפות
  [
    'in partnership. And those who say that the plague of Israel',
    'in partnership. This speaks of a case where the Jew paid his share to the other non-Jew, or wrote to him "I have received [payment]," such that when the Jew comes he cannot detain him — since it is now as his, the Jew\'s wine. Shach.'
  ],
]);

// beer-hagolah/part-001.txt — multiple garbage lines
fixLines(base + 'beer-hagolah/part-001.txt', [
  // seif 1 marker א (line 8) — Changing the Starwork Page
  [
    'Changing the Starwork Page S:',
    'Mishnah, tractate Avodah Zarah, folio 61.'
  ],
  // seif 1 marker ב (line 19) — We were a fucker there
  [
    'We were a fucker there:',
    'That is the latter clause of the Mishnah there.'
  ],
  // seif 1 marker ג (line 30) — We were an adversary
  [
    'We were an adversary and, as Dr. Derri wrote',
    'That is the first clause of the Mishnah, and according to the interpretation of Rabbeinu Tam, who explains it as dealing with a case where he did not write "I have received [payment]" and it is therefore as if he did not sell it to him.'
  ],
  // seif 1 marker ד (line 41) — From a barbaric sign
  [
    'From a barbaric sign I mentioned in the above section:',
    'From a baraita that I cited in the preceding siman, seif 9.'
  ],
  // seif 1 marker ה (line 52) — The name of the second
  [
    'The name of the second:',
    'There in the Mishnah.'
  ],
  // seif 1 marker ז (line 73) — The name of the second (second occurrence)
  [
    'The name of the second:',
    'There in the Mishnah.'
  ],
  // seif 1 marker ח (line 84) — A column called his father Rashi
  [
    'A column called his father Rashi in his judgments',
    'Tur in the name of his father the Rosh in his Piskei ha-Rosh; and likewise the Rashba wrote in a responsum that this is the consensus of the Geonim, Rambam, and Ra\'a; and likewise the Rambam ruled in chapter 13.'
  ],
  // seif 1 marker י (line 105) — From the work of Debbie Ferrisle
  [
    'From the work of Debbie Ferrisle there:',
    'From the incident of Bei Farzak Rofila there.'
  ],
  // seif 1 marker כ (line 116) — Name in G-d
  [
    'Name in G-d:',
    'There in the Gemara.'
  ],
  // seif 1 marker ל (line 127) — Joseph is there
  [
    'Joseph is there:',
    'A statement of Rav Yosef there.'
  ],
  // seif 1 marker מ (line 138) — The name of the second
  [
    'The name of the second:',
    'There in the Mishnah.'
  ],
  // seif 1 marker נ (line 149) — The R&D system
  [
    'The R&amp;D system is in addition and as mentioned above paragraph 1:',
    'According to the method of Rabbeinu Tam there in Tosafot, and as cited above paragraph 6.'
  ],
  // seif 1 marker ס (line 160) — This is the name of the Bible
  [
    'This is the name of the Bible, and it is not even possible for them:',
    'There in the Mishnah — and according to the method of Rabbeinu Tam that it is forbidden even with key and seal.'
  ],
  // seif 2 marker _ (line 171) — A column called R. D.D.
  [
    'A column called R. D.D., who bought him and led him in a column',
    'Tur in the name of Rabbeinu Tam: since he purchased it and conveys it with effort and expense, he is concerned about his effort and expense and will not falsify.'
  ],
]);
