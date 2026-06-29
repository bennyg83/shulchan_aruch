import { readFileSync, writeFileSync } from 'fs';

const file = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_124/baer-heitev/part-001.txt';
let t = readFileSync(file, 'utf8');

// Replace using exact substrings including Unicode curly quotes
function rep(from, to) {
  if (!t.includes(from)) { console.warn('NO MATCH:', from.slice(0,70)); return; }
  t = t.replace(from, to);
}

// seif 1 _
rep('in drinking. And I’m not going to see a baby boy in his day, and he’s in a drink, and he’s in a hurry:',
  'For drinking — and it is stated in the Talmud that even an infant born that day makes yayin nesech for drinking; and so too the poskim.');

// seif 2 א
rep('Orders. The Bible only seems to be confused about it that it is not to work with the work of the stars that Sri Lankans in pleasure and did not take a sage, but rather to the Light of Dup that prohibits touching it:',
  'Commandments — Bach wrote: it appears that even if he merely accepted upon himself not to worship idolatry, his touch is permitted for benefit; and the seven commandments were only stated to show that nevertheless his touch forbids for drinking.');

// seif 3 _
rep('and covered. But they didn’t take a letter from which he had no contact, but if he had been fed up with Hashem’s people, and he would not be cursed, and he would not be given a gift to them. “Third:',
  'And immersed — but if they did not immerse, even though they were circumcised, their touch forbids for benefit, for they are inferior to the sons of female slaves mentioned in seif 4 below. And as to the fact that if they were circumcised and immersed they do not libate — that is when they were circumcised and immersed willingly; but if they were circumcised and immersed under compulsion, it does not take effect until twelve months, until the name of idolatry fades from their lips. Siftei Kohen.');

// seif 4 א
rep('in drinking. And the Bible shares and the Dr. Daws Affi in pleasure and brings some evidence and evidence by the SS and Pescians, and who is appointed to the Demento deities in this manner, to which Starworkers are all the contact that sings with pleasure instead of a loss of the KGB:',
  'For drinking — and Siftei Kohen disagrees and holds that they forbid even for benefit, and brings several proofs and evidence from the Talmud and poskim; and he concludes: but for us nowadays, since the nations are not actual idolaters, all touch of a non-Jew is permitted for benefit in a place of loss, as in siman 123 — end of his words.');

// seif 4 ב
rep('Damned. The Bible and the Bible share the author of this law and establish in the small children of the lesser than a hospital that does not accompany a contact is permitted even in drinking who a baby is working stars from Delo Ben, who is even a slave who does not even make a drink for any time when Daino does not contain a snail and metabolize:',
  'That were circumcised — Taz and Siftei Kohen disagree with the Mechaber on this law and ruled: children of female slaves, even if not circumcised, their touch is permitted even for drinking; however a non-Jewish infant who is not a son of a female slave, even if circumcised, makes yayin nesech for drinking as long as he has not immersed, since we hold he is not a ger until he is circumcised and immerses.');

// seif 7 _
rep('touching. “And as a Starworker, who does not work the work of stars will remain silent. “Third:',
  'Touch — and certainly his force; and likewise a non-Jew who is not an actual idolater — it is permitted even for drinking. Siftei Kohen.');

// seif 12 ג (long, two lines)
rep('allowed. The book of the Bible and Damon Shari, in place of loss, and does not publish it, and he is in a dazzling manner to take anything from the barrels [and this rule shall take your hand in all the mitzvot of the Lord, and shall not be permitted in the pleasure of Sharia, even in the place of loss. And what is not to be enjoyed by the Dean of Didan Shari in pleasure instead of loss even if we interfere with our N.S.A. and are permitted even in drinking, and the “depressed Daesh to Spocky if he touched a star worker on purpose or did not make it easier for him to make it easier for the dao Gera Darin. He wrote in her\nThe Bible was based on a lot of gold and a half value, even though it could sell to an infant worker from the United States and C. to “the name of N.S.”',
  'Permitted — Siftei Kohen wrote: and for us it is permitted even for drinking in a place of loss, and one should not publicize the matter; and so too the law below regarding extending his hand to take something from the barrels. [Take this as a general rule in all the laws of yayin nesech: wherever the law permits for benefit, for us it is permitted even for drinking in a place of loss. And what is forbidden for benefit by law — for us it is permitted for benefit in a place of loss. And even if yayin nesech mixed in, for us we estimate sixty and it is permitted even for drinking. Similarly, where there is a doubt whether the non-Jew touched intentionally or not, we lean leniently, since this is a rabbinic decree. In Baer Heitev he wrote: a place of loss means according to the monetary value of one and a half gold pieces, and even if he can sell it to a non-Jew it is called a place of loss. And see siman 35 what was written there in the name of Noda BeYehudah.]');

// seif 14 ב
rep('knowledge. Or he did not know that he was a wine that was permitted even in drinking and that all the oppressed did not know, or did not go to the bottom of the mountain, and “if I am not afraid of the sages, or do not make it easier for him, and because of his books, he will be able to make it easier, and he will not be able to make it possible,”',
  "He knew — or if he did not know it was wine, it is permitted even for drinking; and wherever we do not know whether he knew or not, we lean leniently regarding yayin nesech. Similarly if there is a doubt whether he touched intentionally or not, we lean leniently, since it is a rabbinic decree and in matters of rabbinic law we lean leniently. And see seif 24 and siman 125 seif 6 — end of Siftei Kohen's words.");

// seif 14 ד
rep('released. As Joseph’s house from the Rambam means that even after that, the snail is not the wine in the barrels until the snail that the worker’s power is cold to shed, but from the mouth of the mountain means that the snail and the “dead of all even what is out of the pressure is permitted in the place of a loss as follows:',
  "That went out — Beit Yosef wrote: from the Ramban's words it implies that even if one then sealed the hole, the wine in the barrels up to the hole is forbidden, since through the force of the non-Jew it was uprooted to pour out; but from the wording of the Ran it implies that if one seals the hole it is permitted. And similarly for us, everything — even what went out — is permitted for drinking in a place of loss, as below seif 24. Siftei Kohen.");

// seif 15 _
rep('The bzard. The Bible wrote, “We have even seen that the Barzallah has not touched his hand in wine, that he does not know the nature of his attempt to “contact a star worker who is not intentionally by Dr. Debrai in drinking, and the right is completely healed even in no place of loss:',
  'That the spigot — Siftei Kohen wrote: it appears to me that even if we saw him remove the spigot, as long as he did not touch the wine itself by hand it is permitted, since because he does not know the nature of libation it is considered touch of a non-Jew without intent through something else, which is permitted for drinking; and here it is entirely permitted even not in a place of loss.');

// seif 20 ג
rep('Finally. It is permissible for pleasure in the High Court, and if after the rape is still found, it is forbidden to enjoy and characterize is the rape of Dama Delo close to her death as the PA:',
  'Finally — permitted for benefit; so corrected in the Taz. And if after the compulsion passed he is still found touching it, it is forbidden for benefit — and even an ordinary compulsion that is not near death is so. The Rashba.');

// seif 21 _
rep('man. And even the Starworker will look at this way and say that it is not called a Star worker’s contact in Jane, but it touches on the vessel and does not mean that it is not called a Starworker’s touch on wine, but it does not matter how it works, but it does not mean that it does not work in this way\nThe Bible appears to be a thinner, and the D.C. is a star worker by Dr. Shari, who drinks instead of a loss of the law that preceded her husband’s arrival in wine, even though not in place of loss:',
  "A person — and even if the non-Jew intends to pour a libation in this way and explicitly says he is pouring a libation by means of this, his words are of no consequence. And we say similarly: if he touches a vessel that contains wine — this is not called touch of a non-Jew in wine through something else; rather he touches the vessel and the vessel touches the wine. And also regarding a reed one can say similarly: whenever the reed's touch of the wine preceded a person's touch of the reed, this is not touch of a non-Jew through something else — since 'through something else' implies that he brings the something else to the wine, whereas here he only touches the reed which touches the wine. But this matter requires deliberation — end of Rivash's words. And Siftei Kohen wrote: it appears that for us, since we hold in seif 24 that touch of a non-Jew through something else is permitted even for drinking in a place of loss, therefore here too, where the reed's touch of the wine preceded, it is permitted for drinking even not in a place of loss.");

// seif 22 ב
rep('and hugged. In the words of the mountain, Sri Lankan by a Star worker and brought him to the Bible:',
  'And embraced it — in the wording of the Ran it is permitted to tighten by means of a non-Jew; and Beit Yosef and Darkei Moshe bring this.');

// seif 26 _
rep('allowed. There is no way to do this and another act to understand that it is an exalted one:',
  "Permitted — for this is not the manner of libation; and moreover, he performs merely a laborer's task, as above seif 22.");

// also need to find: "The other. He wrote in the words..."
rep('The other. He wrote in the words of Damiri Bish, in which the sword of the slumber belongs to the pagan between the cliche that stands in the sky for the rest of the wine, if the entire banker is not allowed because of the cliff',
  'The other — Beit Yosef wrote: this deals with when there is a reed in the hole of the barrel, for then it is relevant to distinguish between the stream standing in the trough and the rest of the wine; but if there is no reed in the hole, all of it is forbidden because of the stream connection (and see below siman 126 seif 2).');

writeFileSync(file, t, 'utf8');
console.log('Done');
