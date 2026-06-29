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

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_129/';

// ── baer-heitev ────────────────────────────────────────────────────────────
fixLines(base + 'baer-heitev/part-001.txt', [
  // seif 1 ג
  ['Forbidden. And for a friend to be entitled to the darkness',
   'Forbidden — and for us there is no concern of touch unless he has benefit from it, such as drinking or exchanging, as above siman 128 seif 4 in the gloss. And in siman 130 I wrote in the name of Beit Yosef that with a small hole, even though one can take from it, as long as one cannot insert into it there is no concern of substitution — and this is obvious. Siftei Kohen.'],
  // seif 1 ד
  ['Signed. But in front of them, A really closes in retrospect',
   'Seal — but with one genuine seal it suffices after the fact even without great loss, as below siman 130 seif 2. Siftei Kohen. And Taz wrote that even in a great loss there is no dispensation unless the plaster has dried.'],
  // seif 2 _
  ['More. D. D. D. D. D. Dem., who works stars from other Starworkers',
   'More — for it is not comparable to between the pressings in seif 4, where the non-Jew fears other non-Jews; but here they are of one counsel and do not fear each other. Bach. And it implies that even if he did not inform him that he is departing it is forbidden for this reason — unlike renting a house in the courtyard of a non-Jew, below siman 130, where it is permitted, because in a city the non-Jew does not rely on the guard since someone might come suddenly and not be seen from afar; but in a field he relies on the guard. Siftei Kohen in the name of Mordechai.'],
  // seif 5 א
  ['afraid. The Bible writes that there are no Israelis in the city',
   'Is afraid — Siftei Kohen wrote: even if there are no Israelis in the city, because other non-Jews fear this non-Jew and he fears others. Rosh. And Beit Yosef wrote: it seems to me from the words of the poskim that even if he simply handed him the key we say he handed it only for safekeeping, and it is not as if he said "hold this key until I come" — end of his words.'],
  // seif 5 ב
  ['cracked. And Dukke a day, but at night',
   'A crack — specifically during the day; but at night a crack does not help, as below toward the end of siman 130. Siftei Kohen.'],
  // seif 11 א
  ['Ishmael. Delo Starwork employees are',
   'Ishmaelites — for they are not idolaters; and the same applies to other non-Jews in our time.'],
  // seif 20 א
  ['Closed. According to Dr. D. D. D. D. D. D.C., there is no prohibition only on the closure of the star worker',
   'Closed — Taz wrote: for us, since we hold above siman 128 seifs 3–4 that there is a prohibition only if the non-Jew himself closes the door from inside, and on a doubt we do not say perhaps he himself closed it with a lock — therefore we should permit here even without a Jew having closed it first — end of his words. And see below siman 130 toward the end of seif 8 in the gloss.'],
]);

// ── beer-hagolah ──────────────────────────────────────────────────────────
fixLines(base + 'beer-hagolah/part-001.txt', [
  ['Changing the Starwork Page:',
   'Mishna, tractate Avodah Zarah, folio 69.'],
  ['"When I was in the room, and he was in the cell, and he was in the cell, and he was in the name of the Lord."',
   'As I emended — thus it should read; and so it is in Toldot Adam VeChavah path 17 part 2, from the incident of Rava there, folio 70.'],
  ['The name of the second:',
   'There in the Mishna.'],
  ['G. Madmerin is named after Delma who is not a sailor for a boat and so on:',
   'This too from what we say there that we are not concerned lest he sailed the ship away, etc.'],
  ['There was a name in which he was in the possession of the man who was saved and exalted there:',
   "There in the Mishna: 'if it was in the presumption of being guarded,' as Rava explains there."],
  ['There is a page named by the inn or told him:',
   "There, folio 70: 'the inn was locked, or he said to him: guard [it].'"],
  ['There is a page here:',
   'Baraita there, folio 59.'],
  ['The tongue of the column and it is written:',
   'The language of the Tur; and several poskim wrote similarly.'],
  ["There's a name and a chair:",
   'There in the Mishna, and as Rabban Shimon ben Gamliel.'],
  ['Name in G-d:',
   'There in the Gemara.'],
  ['A column called the Bible:',
   'Tur in the name of Rashba in Terumat HaDeshen.'],
  ['There is a name called the PA from the sender of Levites and so on',
   'There, in the name of Rashba, from the baraita "the one who sends a barrel, etc.," and according to the resolution of Rabbi Yirmiyah — "between the pressings they taught," there folio 31.'],
  ['From the end of the day, it is called the Lord, and so on',
   'From the incident of that tavern woman, etc., there in Darkei Moshe.'],
  ['A column called the Ramban (°C) when the pronunciation is there in additions and is in the Bible:',
   'Tur in the name of Ramban. (°) As I emended — so it is there in Tosafot and in Beit Yosef.'],
  ['The worker has a page:',
   'The incident there, folio 70.'],
]);

// ── beur-hagra ────────────────────────────────────────────────────────────
fixLines(base + 'beur-hagra/part-001.txt', [
  // seif 1 ג
  ['He is not a quaint or has gone away. A thick man, and so on, the Lord',
   'And provided that he did not, etc., or that he moved far, etc. — see Beer Hagolah; and further he wrote there that it is explicitly taught in the Tosefta: one who left his wine in an inn and entered a city — even if he stayed a long time it is permitted; but if he informed the innkeeper or if the innkeeper locked up against him it is forbidden. One who left his wine on a ship and entered a city — even if he stayed a long time it is permitted; but if he informed the sailor or if his ship sailed away it is forbidden.'],
  // seif 10 _
  ['(Lycott) and quarant as \'E\' are quaint. And then, he said, "And I am the Lord."',
   '(Extract) And he closed, etc., even they, etc. — see siman 125 seif 3 and what was written there (end).'],
  // seif 11 ב
  ['If there is a quaint. Most of the thieves of K. Alma in the most part of this place',
   'And if there are, etc. — from what it states there "the majority of thieves, etc." this shows that we follow the majority of the place; for otherwise the majority of thieves in the world are certainly not Israelis; and in Ketubot 13b "and it is necessary, etc., because, etc." Terumat HaDeshen; and see Beer Hagolah there.'],
]);

// ── nekudot-hakesef ───────────────────────────────────────────────────────
fixLines(base + 'nekudot-hakesef/part-001.txt', [
  // seif 4 _
  ['There is no need to say when there is no name of Israel, but the same as it is. The Lord of Israel',
   '(There in Shulchan Aruch seif 18) And needless to say when there is no vineyard of Israel there except that vineyard, etc. — this requires study: where we know certainly that it was stolen from this Jew\'s vineyard and it is found guarded in a Jew\'s vineyard, do we say, since it is known one barrel was stolen, presumably this is it? Or do we say it was not guarded in this vineyard? And likewise: if we know certainly that nothing was stolen from the surrounding non-Jews\' vineyards and from this Jew\'s vineyard we do not know who was stolen — do we say the reasoning of "it is not their way" falls away and it is permitted? Or do we say it stands in its place and this barrel came from elsewhere? However, where there is no concern it came from elsewhere and we also know nothing was stolen from the surrounding non-Jews\' vineyards and even distant ones, it seems to permit — for that presumption of "it is not their way, etc." is weakened.'],
  // seif 6 _
  ['(In the name of St. S. S. C.C., it seems to be a fireman who has been recognized as a',
   '(There in Taz s.k. 27) It appears that this "needless to say" deals with where the vineyard, etc. — this requires study: in such a case it certainly came from this vineyard; and the Talmud only said that thieves do not steal from it and conceal it within it when there are also non-Jews\' vineyards.'],
]);

// ── turei-zahav ────────────────────────────────────────────────────────────
fixLines(base + 'turei-zahav/part-001.txt', [
  // seif 3 _
  ['But in a quaint. But in a wooden plaque, it is permissible for Israel to go with him',
   'But one who transports, etc. — but with a wooden plug it is permitted, as the Tur explicitly writes in the name of Ramban and Rosh; and it seems obvious this applies even if no Jew accompanies him at all. In the Perishah he understood this refers specifically to when a Jew accompanies him but merely looked away, which led him into a difficulty and resolution — and I do not know what compelled him to that. And in the Tur he writes that Ri permits even when fully open; Beit Yosef raised an objection from siman 125 "carrying a full container is forbidden," and he explains our case as a deficient container; and my father-in-law resolved it differently. And to me it seems there was no difficulty from the start: above deals with carrying in hand where touching is easy and impossible to guard against, but here he carries it on his shoulder in the manner of transporting a barrel from place to place where he cannot so easily touch.'],
  // seif 11 ג
  ['He did not touch wine. The additions have written, and perhaps, when looking at Israel',
   'That they do not touch wine — Tosafot wrote: perhaps when they search everywhere for the treasures of Israel the wine is also forbidden, since they inserted a long reed into the barrel to search — end of their words. And to me it seems that nowadays since we are lenient about stam yenam regarding touch of non-Jews through something else, it is permitted even if they touched it with a reed, since he did not intend to touch wine but only to search for money — it is unintentional touch and permitted, as above siman 124 seif 24. And even if he touched with his own hand there would appear room to permit; but one should not be so lenient since it is not explicitly stated. And there is a gloss in Asher chapter HaSokher that nowadays one should not forbid even if he closed the door and was not caught as a thief, unless one should be concerned about drinking or some benefit of his.'],
  // seif 11 ד
  ['A little bit of a quaint. In the end of the rebellion, Rabbi R. Ishmael',
   'In some of them a defect, etc. — therefore Mordechai ruled at the end of chapter R. Yishmael in the name of Maharam: thieves who came to a cellar and made a spigot in one of the barrels that had not been tapped initially — and there were other barrels that had been tapped initially — he responded that we do not extend the prohibition to the rest that have no defect, as in chapter Gid HaNashe: "because of this one fool should all the slaughtered ones be forbidden?!" All the more so since one can say they took the best of them — meaning, that full one in which they made the spigot. And Darkei Moshe wrote similarly in the name of Rivash siman 424 that only that one which was certainly opened by the thieves is forbidden — and unlike the responsum of Rashba cited by Beit Yosef at the end of siman 128 who forbids all the wine lest they checked all of them to see which is better.'],
]);

console.log('Done siman 129');
