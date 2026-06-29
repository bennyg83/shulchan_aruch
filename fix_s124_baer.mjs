import { readFileSync, writeFileSync } from 'fs';

const file = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_124/baer-heitev/part-001.txt';
let t = readFileSync(file, 'utf8');

const fixes = [
  // seif 2 ג
  [/forbidden\. In drinking.*?\(and even if he did not swear to him\)/s,
   'Forbidden for drinking. And Bach wrote: however wine of a ger toshav is permitted for benefit, and similarly wine of a non-Jew who is not an actual idolater — in siman 60 — that is specifically when it is known the non-Jew did not touch it; but for us nowadays in all cases it is permitted for benefit in a place of loss, as above beginning of siman 123. And Maharshal wrote that Karaites have the law of a ger toshav and it is permitted to drink with Jews. (And in Nekudot HaKesef he wrote that their touch forbids, and even if they swore they did not touch they are not believed; however they only forbid for drinking, not for benefit, like a ger toshav — see there.)'],
  // seif 3 _
  [/and covered\. But they didn't.*?"Third:/s,
   'And immersed — but if they did not immerse, even though they were circumcised, their touch forbids for benefit, for they are inferior to the sons of female slaves mentioned in seif 4 below. And as to the fact that if they were circumcised and immersed they do not libate — that is when they were circumcised and immersed willingly; but if they were circumcised and immersed under compulsion, it does not take effect until twelve months, until the name of idolatry fades from their lips. Siftei Kohen.'],
  // seif 4 א
  [/in drinking\. And the Bible shares.*?KGB:/s,
   'For drinking — and Siftei Kohen disagrees and holds that they forbid even for benefit, and brings several proofs and evidence for this from the Talmud and poskim; and he concludes: but for us nowadays, since the nations are not actual idolaters, all touch of a non-Jew is permitted for benefit in a place of loss, as in siman 123 — end of his words.'],
  // seif 4 ב
  [/Damned\. The Bible and the Bible share.*?metabolize:/s,
   'That were circumcised — Taz and Siftei Kohen disagree with the Mechaber on this law and ruled: children of female slaves, even though not circumcised, their touch is permitted even for drinking; however a non-Jewish infant who is not a son of a female slave, even if circumcised, makes yayin nesech for drinking as long as he has not immersed, since we hold he is not a ger until he is circumcised and immerses.'],
  // seif 7 _
  [/touching\. "And as a Starworker.*?"Third:/s,
   'Touch — and certainly his force; and likewise a non-Jew who is not an actual idolater — it is permitted even for drinking. Siftei Kohen.'],
  // seif 12 ג (two lines)
  [/allowed\. The book of the Bible.*?N\.S\."\]/s,
   "Permitted — Siftei Kohen wrote: and for us it is permitted even for drinking in a place of loss, and one should not publicize the matter; and so too the law below regarding extending his hand to take something from the barrels. [Take this as a general rule in all the laws of yayin nesech: wherever the law permits for benefit, for us it is permitted even for drinking in a place of loss. And what is forbidden for benefit by law — for us it is permitted for benefit in a place of loss. And even if yayin nesech mixed in, for us we estimate sixty and it is permitted even for drinking. Similarly, where there is a doubt whether the non-Jew touched intentionally or not, we lean leniently, since this is a rabbinic decree. In Baer Heitev he wrote: a place of loss means according to the monetary value of one and a half gold pieces, and even if he can sell it to a non-Jew it is called a place of loss. And see siman 35 what was written there in the name of Noda BeYehudah.]"],
  // seif 14 ב
  [/knowledge\. Or he did not know.*?end of his words\./s,
   "He knew — or if he did not know it was wine, it is permitted even for drinking; and wherever we do not know whether he knew or not, we lean leniently regarding yayin nesech. Similarly if there is a doubt whether he touched intentionally or not, we lean leniently, since it is a rabbinic decree and in matters of rabbinic law we lean leniently. And see seif 24 and siman 125 seif 6 — end of Siftei Kohen's words."],
  // seif 14 ד
  [/released\. As Joseph's house.*?as follows:/s,
   "That went out — Beit Yosef wrote: from the Ramban's words it implies that even if one then sealed the hole, the wine in the barrels up to the hole is forbidden, since through the force of the non-Jew it was uprooted to pour out; but from the wording of the Ran it implies that if one seals the hole it is permitted. And similarly for us, everything — even what went out — is permitted for drinking in a place of loss, as below seif 24. Siftei Kohen."],
  // seif 15 _
  [/The bzard\. The Bible wrote.*?no place of loss:/s,
   'That the spigot — Siftei Kohen wrote: it appears to me that even if we saw him remove the spigot, as long as he did not touch the wine itself with his hand it is permitted, since because he does not know the nature of libation it is considered touch of a non-Jew without intent through something else, which is permitted for drinking; and here it is entirely permitted even not in a place of loss.'],
  // seif 20 ג
  [/Finally\. It is permissible.*?the PA:/s,
   'Finally — permitted for benefit; so corrected in the Taz. And if after the compulsion passed he is still found touching it, it is forbidden for benefit — and even an ordinary compulsion that is not near death is so. The Rashba.'],
  // seif 21 _
  [/man\. And even the Starworker.*?not in place of loss:/s,
   "A person — and even if the non-Jew intends to pour a libation in this way and explicitly says he is pouring a libation by means of this, his words are of no consequence. And we say similarly: if he touches a vessel that contains wine — this is not called touch of a non-Jew in wine through something else; rather he touches the vessel and the vessel touches the wine. And also regarding a reed one can say similarly: whenever the reed's touch of the wine preceded a person's touch of the reed, this is not touch of a non-Jew through something else — since 'through something else' implies that he brings the something else to the wine, whereas here he only touches the reed which touches the wine. But this matter requires deliberation — end of Rivash's words. And Siftei Kohen wrote: it appears that for us, since we hold in seif 24 that touch of a non-Jew through something else is permitted even for drinking in a place of loss, therefore here too, where the reed's touch of the wine preceded, it is permitted for drinking even not in a place of loss."],
  // seif 22 ב
  [/and hugged\. In the words of the mountain.*?Bible:/s,
   'And embraced it — in the wording of the Ran it is permitted to tighten by means of a non-Jew; and Beit Yosef and Darkei Moshe bring this.'],
  // seif 26 _
  ['allowed. There is no way to do this and another act to understand that it is an exalted one:',
   'Permitted — for this is not the manner of libation; and moreover, he performs merely a laborer\'s task, as above seif 22.'],
];

for (const [from, to] of fixes) {
  const before = t;
  if (typeof from === 'string') {
    t = t.replace(from, to);
  } else {
    t = t.replace(from, to);
  }
  if (t === before) console.warn('NO MATCH:', typeof from === 'string' ? from.slice(0,60) : from.source.slice(0,60));
}

writeFileSync(file, t, 'utf8');
console.log('Done');
