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
  console.log(`Fixed ${count}:`, file.split('/').slice(-2).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_130/';

// baer-heitev/part-001.txt
// seif 3: garbage translation of the deposit/two-seal rule
// Hebrew: על שם שאינסוכי לא מנסכי ליה ואי משום איחלופי כיון דאיכא חותם אחד לא טרח ומזייף
fixLines(base + 'baer-heitev/part-001.txt', [
  // seif 3 – garbage starting "to deposit. Dae because"
  ['to deposit. Dae because',
   'To deposit. Because regarding libation he will not pour a libation for it; and if because of substitution — since there is one seal he does not bother to forge; and Beit Yosef wrote: it implies even if the vessel has any hole from which one can drink, if it is not large enough to pour wine into vessels from it — it is permitted.'],

  // seif 5 – garbage "changed. And the cover of the wagons IAEA"
  ['changed. And the cover of the wagons IAEA',
   'Changed. And the tying of the wagon covers — even though there is no knot stranger than this — since the gentile is compelled to untie the knots and open the wagons every day to take his food inside the wagons, he does not tremble; therefore it is not like a seal — so written in responsum Maharam siman 29 — see there.'],

  // seif 6 – "Dr. And there is no Starworker who belongs to the PLO"
  ['Dr. And there is no Starworker who belongs to the PLO',
   'Resides. And the gentile has no connection to the wine — even though he has a connection to the house — it is presumed guarded until the Israelite leaves and tells him he is traveling, as above beginning of siman 129; and if the gentile has a connection to the wine, this is explained in siman 128 seif 2 and 3 — end Shach.'],

  // seif 7 – "and their farm. And their friends alone are allowed"
  ['and their farm. And their friends alone are allowed',
   'And a seal. And for us a seal alone is permitted b\'di\'eved as above seif 2 in Hagah.'],

  // seif 8 – "On the side. Since then, it is forbidden that the renter or mine"
  ['On the side. Since then, it is forbidden that the renter or mine',
   'On the side. Then it is forbidden — since the renter or buyer has some connection to the house; unlike above siman 128 seif 2 where he has no connection at all — there it is permitted even found standing beside the wine. And here it deals even if the Israelite does not reside there; and even without any seal at all it is permitted if the gentile does not reside there — unless he is standing beside the wine, as stated. End Shach.'],

  // seif 9 – "as a thief. And my ministers as a model, C.C., and Miyari"
  ['as a thief. And my ministers as a model, C.C., and Miyari',
   'As a thief. And it is permitted — as above siman 128 seif 4; and nevertheless the case is that the Israelite goes in and out there; for otherwise, or even informing him that he is traveling — it is no better than leaving a gentile in his store (siman 129) or in his house (siman 118 seif 10) which is forbidden. Shach.'],
]);

// beur-hagra/part-001.txt
fixLines(base + 'beur-hagra/part-001.txt', [
  // seif 1 marker ד – "They don't have a quaint. The Bible is there and column:"
  ['They don\'t have a quaint. The Bible is there and column:',
   'And they have no, etc. Rosh there and Tur.'],

  // seif 1 marker ז – "And if they are called by C.C. The name of the KGB:"
  ['And if they are called by C.C. The name of the KGB:',
   'And if, etc. — see above siman 124. There seif 24 in Hagah.'],

  // seif 2 marker ב – "And there's a h. He said..."
  ['And there\'s a h. He said, "And thou, Capt.',
   'And some, etc. Tosafot there in the passage "Rav said, etc." (Extract) And some wrote that b\'di\'eved, etc. — according to the method of Ri and Rabbeinu Tam; and see beginning of siman 118 seif 1 in Hagah: "b\'di\'eved one may rely, etc." — and see what is stated there. (end)'],

  // seif 3 marker ב – "And yes, a quake. Jim is there:"
  ['And yes, a quake. Jim is there:',
   'And likewise vinegar, etc. Gemara there.'],

  // seif 8 marker א – "They were signed, but they were \"right.\""
  ['They were signed, but they were "right." B. B. B. S. B. B.S. and the Bible:',
   'He sealed it, etc.; but, etc.; and nevertheless it is correct, etc. In Tosafot 31b and 69b in the aforementioned passage; and as above.'],

  // seif 9 marker ג – "If the worker is the same. From a chair in the courtyard of a star worker"
  ['If the worker is the same. From a chair in the courtyard of a star worker',
   'If the gentile, etc. From what was written regarding a gentile\'s courtyard; and no difficulty from "the renter or buyer of a house from the gentile." Tosafot HaRosh.'],
]);

// pitchei-teshuva/part-001.txt
fixLines(base + 'pitchei-teshuva/part-001.txt', [
  // seif 1 – "They will cut all the barons."
  ['They will cut all the barons.',
   'He shall cut all the spigots. See in responsum Tzemach Tzedek siman 87, and in responsum Tiferet Tzvi part Yoreh Deah siman 15.'],

  // seif 3 – "allowed in retrospect. See the response of the A.S.A., which is not clearly known that the Starworker"
  ['allowed in retrospect. See the response of the A.S.A., which is not clearly known that the Starworker',
   'Permitted b\'di\'eved. See responsum of his grandfather Panim Meirot vol. 2 siman 76: this deals with a case where it is not clearly known to us that the gentile was aware of it; but if it is not so — it is forbidden. End; and see the previous seif katan in the name of Noda BiYehudah.'],
]);

// turei-zahav/part-001.txt
fixLines(base + 'turei-zahav/part-001.txt', [
  // seif 2 – multi-line garbage block starting with "And yes, they drive."
  ['And yes, they drive. And he wrote, "Now, we do not allow the city to be sent to the city',
   'And likewise the custom, etc. And my father-in-law z"l wrote: nevertheless nowadays the custom is not to permit at all sending from city to city without a trusted Israelite who guards day and night — for it is common that gentiles draw wine with a small drill or by a knife; however if all the barrels are covered with hoops called "riffins" and the bottoms in boards, there is room to permit — as Tosafot wrote in chapter Ein Masikin folio 31, etc. — end. And it appears to me: we need not be concerned here — where everything is covered with hoops — lest he draw wine from between the hoops; for the main prohibition is because at time of sealing he touches it, as I wrote nearby; and when he touches wine he draws between the hoops he is somewhat distant from the wine in the barrel and is like touching what exits; there is no prohibition on what is in the barrel except from the force of stream connection — as written in siman 124 seif 23; therefore we have permit — for regarding barrels we do not say stream connection, as written beginning of siman 126. Not so if he draws wine with a drill or knife from the barrel\'s own board or between the boards — for certainly he touches at sealing-time the wine in the barrel itself. Also in Maharil I saw he distinguishes between a thin hole and a somewhat wider hole — at the time the gentile seals the hole we fear his finger flesh entered inside and forbids; so it appears correct to distinguish.'],

  // seif 2 line 3 garbage (continuation)
  ['And I wrote next and when it comes to the wine that will be removed between the groves',
   ''],

  // seif 2 line 4 garbage (continuation)
  ['A little while the fact that the worker\'s jaws have to feel that he has come from the flesh of his finger in the face and the pot does not seem right to divide. And the law of star workers who drink through a hollow canal I wrote in paragraph 4, instead of much loss, it should be easy:',
   'And the law of gentiles who drink through a hollow reed I wrote in siman 124 seif 23 — that in a case of great loss one may be lenient.'],

  // seif 3 – "And all the lights will be cut."
  ['And all the lights will be cut." This is a ovary, but in retrospect, if a thorn is washed around the barza',
   'He shall cut all the spigots, etc. This is ab initio; but b\'di\'eved, if one smeared clay around the spigot and it dried, it is also permitted in great loss — as Rama wrote siman 129 seif 1.'],

  // seif 4 – "And he's going to give him a prostitute."
  ['And he\'s going to give him a prostitute.',
   'And he designated for him a corner. For then it is like the Israelite\'s courtyard — therefore permitted in benefit.'],

  // seif 5 – "Even with them A. We have already written"
  ['Even with them A. We have already written in paragraph A. D. Delphi',
   'Even with one seal. We have already written in siman 118 seif 1 that accordingly even where there is only a key alone it is also permitted — for this depends on that.'],

  // seif 6 – "You can deposit a star worker in front of them."
  ['You can deposit a star worker in front of them. Dovza does not belong only to your attempt',
   'It is permitted to deposit with a gentile with one seal. For in this case libation does not apply — only perhaps he will exchange it with his own wine; and since there is one seal he does not bother to forge.'],

  // seif 9 – "Unless it is on the side of the wine. The taste that is not perceived"
  ['Unless it is on the side of the wine. The taste that is not perceived as a thief',
   'Unless he is found standing beside the wine. The reason he is not deemed like a thief: a person may look at what he rented or bought, and the renter or buyer does not object to this — therefore he has some connection.'],

  // seif 10 – "At night, he is not allowed to be killed."
  ['At night, he is not allowed to be killed. But in the open door',
   'At night it is forbidden in such a case, etc. But with the door fully open it is permitted even at night — for he trembles lest now he remember his wine and come. So wrote Rashba in Tosafot HaRosh HaAruch.'],
]);
