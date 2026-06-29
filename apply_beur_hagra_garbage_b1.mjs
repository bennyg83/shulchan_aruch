import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }

const TRANS = [

  // ── he=3 garbage cases ──────────────────────────────────────────────

  { siman:'siman123', seif:'seif-017', segs: [
    `That is, etc. As Rashi explained there; and likewise the Rosh agreed and wrote that the term 'drawing' implies like Rashi's explanation, for according to Rabeinu Tam it should have said 'stream' or 'descending'; and likewise Rashba, from the fact that it answers 'stopped up and full'; and they brought further proof from what is written in the Tosefta: one who buys a basket of grapes from a gentile and found pits beneath it — permitted; at its side — forbidden; and likewise in the Yerushalmi on the mishnah: 'he was taking with his hand and placing into the vessel — to this point, meaning when taking wine and grapes together and placing into the vessel; he was placing these separately and those separately — permitted; pits beneath the clusters — permitted; those at their sides — forbidden; R' Yosi b'Rabbi Bun in the name of R' Yochanan: they themselves become stam yeinam' — meaning even beneath the clusters, since he took the grapes the wine remained by itself, and even though still mixed with seeds and skins, it counts as drawing. Rosh and Rashba; and so ruled Rambam and Ran.
And it is forbidden, etc. Rosh there — Rashi, etc. 'and it is forbidden,' etc.; and likewise Ran, Rashba, and others — not like Ramban [whose reasoning is like descending into the pit, per the first mishnah, as written in the mishnah 'and the rest is permitted'; and see Tosafot there s.v. 'he descended,' etc. and ch. 5, etc.; but actually R' Huna and the later mishnah disagree on two points] — from what is written: 'once he began' — and the challenge 'once he drew' is not a difficulty; and further, from the fact that the Gemara challenges 'come and hear, he descended,' etc. — if it were so, what is the question, for even according to R' Huna the rest is permitted; and further from 'stopped up and full' — and according to Ramban even without being stopped up it is permitted. Ran and Terumat HaDeshen.
Even, etc. And this is why it challenges: 'we taught: one may buy,' etc., 'and even though,' etc.`,

    `If there is, etc. As written there 60b: Rav Ashi said: if, etc.; and Tosafot there s.v. 'if,' etc.; and likewise there 60a in the beginning of s.v. R' Pappa; and requires study, for we say there 72a: R' Huna — nitzok, etc.; and Rashi there s.v. 'and liquid,' etc.; and Beit Yosef answered that Semag holds not like Rashi — but this is an error, for the Gemara is explicit in Gittin 16a; and another answer: Semag holds like Rabeinu Tam that for nitzok there is no halachah like R' Huna — and likewise for dripping liquid; but there is no need for any of this, for with dripping liquid certainly there is no halachah like R' Huna, from Rav Ashi mentioned above; and Tosafot 72b proved the opposite from that — see there s.v. 'he said,' etc.
But all this time, etc. As written in the Yerushalmi mentioned above — end, etc.`,

    `(Supplement) But all this time until the wine has not separated until, etc. Ra'ash there; and we read in the Yerushalmi: 'until here,' etc.; and the halachah is not like R' Yosi. Terumat HaDeshen 131b; and he wrote that so it appears in the Rif — see there (end).
Until, etc. Tosafot there, from what is written there: 'we taught: one may buy,' etc. — 'R' Huna said regarding a vat,' etc. — see there s.v. 'R' Huna,' etc.; and one must say according to his explanation, etc.`,
  ]},

  { siman:'siman124', seif:'seif-027', segs: [
    `A barrel, etc., and if the wine, etc. The Rosh there, from the incident of the barrel that burst — and according to Rashbam, etc.; and likewise the Tur; and Tosafot mentioned above s.v. 'the wind,' and there seif 2 s.v. 'an incident,' etc.
In his hand but, etc. His intent is to resolve Beit Yosef's question — for the Rosh and Tur wrote 'if there was, etc., with a knife, etc.' and yet afterwards wrote 'and if he does not have,' etc., and then 'and if he does not touch,' etc. — as Beit Yosef explained there.
And one who wishes, etc. Hagahot Or Zarua there s.v. 'and one who wishes,' etc.`,

    `A gentile, etc. Tosafot 58b s.v. 'he wrote,' etc.; and Mordechai and Hagahot Or Zarua there seif 10 s.v. 'however,' etc.`,

    `(Supplement) A gentile, etc. Rashi 61a s.v. 'who goes,' etc. — perhaps he touched; and in anger it is permitted; and likewise to provoke; and the language of Mordechai siman 1329; and likewise Ravyah; and R'B in chapter 2 of Chullin wrote permitted because it is not his own to provoke — as written there 41a; and Ran, Ra'e, and Ri said: even as written, etc. — a gentile, etc. (end).`,
  ]},

  { siman:'siman129', seif:'seif-008', segs: [
    `(Supplement) An Israelite, etc. As written there in the incident: 'he heard the sound of the shofar — now he remembered the wine,' etc. (end).`,
    `Since, etc. Taz and Shach.`,
    `(Supplement) Since, etc. In the responsum of the Rosh he wrote: even if he informed him that he had set out — not like the Rav; and so ruled Taz and Shach (end).`,
  ]},

  { siman:'siman146', seif:'seif-005', segs: [
    `And even against his will, provided, etc. 43a.`,

    `And likewise a mentally incompetent person. For this is what he means: 'and a dying person knows,' etc. — for otherwise it should have said 'and a dying person — a minor,' etc.
Yishmaelites, etc. As written there: one who worships nullifies, etc.`,

    `(Supplement) Yishmaelites, etc. And as written there (65a): 'I know about him that he does not worship,' etc.; and even regarding stam yeinam, which is taught in a baraita regarding a resident alien — Rashba wrote that it is not comparable; and as written in siman 124 (see there s.k. 4) (end).`,
  ]},

  { siman:'siman148', seif:'seif-012', segs: [
    `Some say, etc., and even, etc. Tosafot 2a s.v. 'forbidden,' etc.`,

    `(Supplement) Some say, etc. Tosafot there s.v. 'forbidden,' etc.; and it is not a matter enumerated by vote, from that Shmuel said in the diaspora, etc.; and the reason is that they are not so firmly attached — see there. Sefer HaTerumah, Ran, Rosh, and others (end).
(Supplement) And furthermore since he has, etc., and nevertheless, etc. As stated above seif 8; and likewise gentiles, etc.; and specifically where he has an excuse — otherwise it is entirely permitted, as written (26a) that even to help deliver on Shabbat and to nurse for wages it would be permitted on account of enmity, were it not that he has an excuse; and delivering on a weekday is permitted on account of enmity, because he has no excuse. Ran; and he wrote: and this is what he means — 'if he does not give him he will create enmity'; and as written in the Tosefta and Yerushalmi, and as stated below (end).
And therefore, etc. Tosefta and Yerushalmi — Tosafot there brought them.`,

    `And nevertheless the husband, etc. Yerushalmi: weavers asked R' Ami — what is the law regarding a gentile's wedding feast? He thought to permit them, from 'on account of the ways of peace.' Rava said to him: but R' Chisda taught: a gentile's wedding feast is forbidden! R' Mana said: were it not for Rava he would have permitted their idol worship — and blessed is He who has distanced us from them — for wherever there is an excuse we do not permit in order to flatter them. Ramban and Ran [as written there (26a): he thought, etc., he thought, etc.].`,
  ]},

  { siman:'siman149', seif:'seif-001', segs: [
    `A fair, etc., and the gentile, etc. In the commentary of R' Yona and the Rosh there seif 9; and R' Yona wrote: it is not forbidden, etc.; and likewise Ri's explanation in Tosafot there s.v. 'Etluza,' etc.; and likewise Raavad in his hasagot; and so it is explicit in the Tosefta.`,

    `(Supplement) That they hold a fair there. See there; and likewise in the Rosh seif 11, from the Gemara's statement that they were not concerned about the proceeds of idol worship — and what distinguishes this from other festival days, where the prohibition is only due to 'going and giving thanks' or 'lifnei iver,' etc. — but a fair is for idol worship, etc.; and likewise in the Yerushalmi, where we read: 'a city that has idol worship — its interior is forbidden because it has one image, its interior is forbidden; R' Levi said: they taught this regarding a fair,' etc. — see there (end).
(Supplement) It is permitted, etc. And likewise to buy and sell; and as written there; and the Rif and the poskim omitted the entire debate there regarding the question of 'Etluza,' etc., because we rule like the first formulation; and further, because it is explained that Rava and Rabbah bar R' Ulah each adds to what preceded to be lenient — Rava says: because of the proceeds of idol worship it is not applicable, for the proceeds of idol worship are permitted; and likewise what we say there 33a 'except gentiles, etc.' — to establish also like Abaye; but we rule like Rava and Ran; and likewise Rabbah bar R' Ulah says that Rava's position is obvious, because if the gentile had dragged [the idol] with its interior, he would not have remained on their festival day outside it — not like Rashi who explains everything stringently; and see there in R'G at length (end).`,

    `(Supplement) It is permitted to go outside, etc. The language of the Rambam — and it is astonishing, for the mishnah deals with buying and selling, after which it says 'what is the law to go there' [except that Rambam explains the latter clause as 'to pass through there,' as he explains 'and so one who goes,' etc.]; and likewise Rashi there and others; and likewise in the Gemara there: 'the Sages were not concerned with it,' etc.; and likewise Raavad challenged from the Tosefta — see there in the hasagot (end).
That is, etc. In the mishnah there.`,
  ]},

  { siman:'siman160', seif:'seif-021', segs: [
    `If he lent, etc. Although in the Gemara it is stated as a doubt, nevertheless we rule that we follow the original rate — from what is written there 62a 'and that se'ah,' etc.; and Rashi there s.v. 'and in our law,' etc.`,

    `(Supplement) If he lent, etc. But Mordechai and Hagahot Or Zarua wrote that we have a doubt — as stated in the Gemara there; but Nimukei Yosef R' Pnini wrote like the words of Rashba and Shulchan Arukh, and wrote that this is why the mishnah teaches 'two se'aot for three,' for this is ribbit ketzutzah categorically, and there is no distinction between whether it increased in value or not (end).`,

    `(Supplement) And if he lent, etc. As written there 44b; and furthermore R' Chananel also holds, etc.; and copper is certainly produce relative to silver, as written in the mishnah there — and from there too it is proven that we follow the original rate; and it is only rabbinic ribbit, for if it were biblical ribbit it would not have been permitted due to its being like 'dinars,' etc.; and Tosafot 46a s.v. 'it becomes,' etc. (end).`,
  ]},

  { siman:'siman177', seif:'seif-004', segs: [
    `The giver, etc. This is an error of the Mechaber; he erred in this, for it is neither the position of the Rif nor the position of the Tur as stated above; and this is the language of the Rambam there halachah 3: 'furthermore, the Sages enacted that anyone who gives money to his fellow to deal with, and there was a loss or a profit, and he does not wish to give him his daily wages, and they made no condition between them — the wages of the dealer shall be one-third,' etc.; and the Mechaber added from his own reasoning, 'and if he has an iska,' etc. — and he erred greatly as stated above; and the formulation of the Rambam's language misled him, for he thought the Rambam's words refer to all of the above in seif 2 — and this is not so, as stated above.
Let the profit be, etc. Rambam — and he holds that what is written 'half in profit,' etc. means the choice is the dealer's; but Rashi in chapter HaMekabel (Bava Metzia 104b) s.v. 'one iska' wrote that in an unspecified case it is half in loss and two-thirds in profit; and likewise Rif there, Rosh, Ramban, Rashba, Semag, and others — and so is the main ruling, as written 'half loan half deposit' — meaning regarding liability between oness and decrease; and in profit he takes the excess as his wages; and there are still other approaches: the view of the Rambam's teachers — the opposite: half in profit and two-thirds in loss; and the Rambam has already written that this is a monetary matter; and furthermore, the Raavad's view that the choice is the giver's — and already the students of Rashba rejected it.`,

    `(Supplement) The giver, etc. As written above that there are several approaches here; and Rashi's approach is the clear one; and likewise Semag, Rashba, and others compelled from what is written in chapter HaMekabel: 'this iska, half loan,' etc. — evidently in an unspecified case liability is shared equally between them for loss; and a fifth approach — the Maharam's approach: if it is written explicitly in the document 'half in profit and in loss' — see there (end).`,

    `A third of the profit of the deposit. As written in seif 27.`,
  ]},

  { siman:'siman181', seif:'seif-011', segs: [
    `And they are many, etc. As Rashi explained in Makkot there: two beneath the ear at the tip of the jawbone that protrudes outward, and two at the end of the jaw, and one at the jaw-beard; and see there in the mishnah s.v. 'two' and in the Gemara 21a s.v. 'in the joints of the beard'; but in Shevuot he explains that the jaw is wide toward the temples, and every width has two extremities — these are four corners, and one at the jaw-beard; and R' Chananel explained: the place where the jaw joins the temples — two corners as above, and two at the borders of the lip, and one at the jaw-beard; and according to all, the fifth is at the jaw-beard — except that the Rosh wrote there after all the explanations: 'and in chapter 10 of Nega'im the mishnah teaches: what is the beard? From the hinge of the jaw to the Adam's apple' — and from his words it appears that according to this the fifth is at the top of the Adam's apple; and so Remez wrote; and the Tur writes this according to R' Chananel's explanation — and his words are astonishing; and likewise Beit Yosef wondered at him; and further, it is explicitly taught in Sifra: 'the corner of their beard — the end of the beard: the jaw-beard'; and everyone agrees that beneath the throat there is no corner at all; and the language of Semak: 'it is good not to let a razor pass over the beard, and even beneath the chin R' Tam forbids with a razor, since sometimes it draws the skin of the corner — meaning the jaw-beard skin'; and R' Yona wrote for another reason: because of the passing of hair, which is forbidden on the entire body with a razor, as written at the beginning of siman 182; and this is what is written in the gloss here: 'and even,' etc.; but nevertheless R' Yona's words do not appear correct, for how is this different from all other places of the beard not at the corner locations, which are permitted even with a razor — they only forbade regarding body hair that does not grow as much and one does only for beautification, which is forbidden on account of 'a man shall not put on,' etc.`,

    `(Supplement) And they are many in them, etc. And the main ruling is like Rashi's explanation; and so it is in Orach Chaim (end).`,

    `Therefore, etc. Rosh and others.`,
  ]},

  { siman:'siman187', seif:'seif-005', segs: [
    `If there is, etc. Like the position of the Rosh and others, that even in this era we rely on this — not like Ramban; see there.
And all this, etc., and likewise, etc. Tosafot there 16a s.v. 'and some hold,' etc. — see there; the position of Tosafot is that with a non-veset flow she need not feel that it came from the wound; but when she does feel it, even at the time of her veset she is pure — as written in the Gemara there: 'no, all agree,' etc.; and Rashba is lenient even when she does not know that the wound produces blood, even at the time of veset — proof from the Tosefta in the baraita mentioned: 'she is believed,' etc. — 'it is not mentioned that the blood comes from it'; but most poskim agree with Tosafot's position; but Beit HaBedikah writes that even not at the time of veset — specifically when it is known that the wound produces blood, even if she does not feel that this blood comes from it; and accordingly the Rav decided here, 'and all this,' etc.; and Taz and Shach.`,

    `(Supplement) And all this, etc. The language of Mordechai: a woman is believed to say, etc. — specifically when she knows that blood comes from the wound does she attribute it to it, but if she is in doubt she does not attribute; but at the time of her veset, even if she knows for certain that the blood comes from the wound, she does not attribute it, for otherwise she would never be impure; but regarding stains found on garments — she is pure and attributes to the wound even when she does not know that the wound produces blood, for in stains the Sages were lenient since stains are rabbinic; and from his words it is implied that even when it is certain that this blood comes from the wound she is impure at the time of veset; and likewise this appears from the Rav's words; and this requires great study, for it contradicts the Gemara; and further from Mordechai's words it appears that even not at the time of veset she must know that this blood comes from the wound; but the language of Sefer HaTerumah siman 92: 'a woman who has a wound in that place and does not know whether it produces blood or not — if she examines herself in that place and finds blood, or if she feels when the blood falls from the womb: she is impure and does not attribute to the wound — as it is taught: a woman is believed to say,' etc. — evidently specifically when she knows, etc. — from the fact that he wrote: specifically when she examines or feels that it comes from the source, then she is impure in doubt; and likewise Hagahot Maimoniyot; but in Mordechai he omitted this; and the conclusion is that all the distinctions are in an unspecified wound that produces blood, not this specific blood — and it appears this is a textual error in Mordechai; and likewise the Rav's language: 'for a woman who has a veset,' etc., 'even though,' etc. — he relied on Mordechai who explained the Gemara's statement 'if she has a veset she attributes to her veset' — meaning if she has a fixed veset she attributes not-at-veset-time to the wound, even if she has no wound at all; and even though the halachah is not like his words, one can still combine the view of Rashba who does not require at all to know that the wound produces blood, even at the time of veset.
And likewise if she has no fixed veset and it is a doubt, etc. This ruling requires study, for in Sefer HaTerumah and all the poskim mentioned above they wrote specifically that she knows that blood comes, etc. — in an unspecified case; and it appears from Sefer HaTerumah that he wrote 'a woman who has a wound in that place and does not know whether it produces blood or not — if she examines herself in that place and finds blood, or if she feels when the blood falls from the womb: she is impure and does not attribute to the wound' — evidently specifically when she knows, from the fact that he wrote: specifically when she examines or feels that it comes from the source, then she is impure in doubt; and likewise Hagahot Maimoniyot; but in Mordechai he omitted this (end).
And nevertheless, etc. Meaning if she does not know that this blood comes from the wound — as above; and see Shach.`,

    `And stains, etc. Beit HaBedikah there; and as written in the mishnah there 59b: 'if she has a wound,' etc. — 'the Sages did not say,' etc.`,
  ]},

  { siman:'siman271', seif:'seif-005', segs: [
    `A Torah scroll, etc., and if, etc. In the Yerushalmi there: a halachah l'Moshe miSinai that they write on hides and write in ink and rule with a reed, etc.; and likewise in Massekhet Soferim there halachah 1 [and in Vayikra Rabbah we say: 'his locks are wavy' — this refers to the ruling; 'black as a raven' — these are the lines]; and in Megillah 16b; and Rashi there s.v. 'as its truth,' etc. — and not like Rabeinu Tam in Tosafot in Menachot there s.v. 'these go down,' etc.; he pressed there; but all the poskim agreed with Rashi's explanation.`,

    `(Supplement) A Torah scroll requires, etc. At the end of chapter 1 of Megillah and as Rashi explained; and so in the Yerushalmi there halachah 1: R' Chelbo, R' Yissa in the name of R' Eliezer: it says here 'words of peace and truth,' and it says below 'truth is a [stalk of] reed — do not sell'; so too the truth of Torah — just as this requires ruling, so too this requires ruling; just as this was given for exposition, etc. (end).`,

    `And one should not rule with lead. For this is what is written in the Yerushalmi and Massekhet Soferim: 'they rule with a reed' — not to exclude a knife and similar, but to exclude lead and similar. Rosh in the name of Ri and others.`,
  ]},

  { siman:'siman275', seif:'seif-001', segs: [
    `A section, etc. — it shall be stored away. So it is in Massekhet Soferim chapter 1 halachah 14.`,

    `And some say it is permitted, etc. For what is written 'it shall be stored away' — because it is forbidden to diminish the script from the outset, as stated above siman 273 seif 2.`,

    `(Supplement) And some say, etc. And the Rambam disagrees; and so is the view of the Rivash siman 7 — and see there at length, and the proofs of the Rashba — see there thoroughly (end).`,
  ]},

  { siman:'siman296', seif:'seif-058', segs: [
    `How, etc. In the Yerushalmi there; and R' Shimshon cited it there — and not like what was written in the commentary there.`,

    `And if it comes, etc. From the fact that the Yerushalmi does not state the practical difference in the reverse direction, this implies that Beit Hillel agree in this. But Raavad reads the Yerushalmi differently: 'according to the one who says from the root of the fence one measures — it is only forbidden for one bet avot; and according to the one who says from the root of the vine — it is forbidden another bet avot'; and wrote that behind the fence one may sow immediately, since the fence separates it; and this reading is correct — which is why it is not taught in Eduyot; and likewise it appears in the Yerushalmi there, where we say: 'both according to the one who says from the root of the vines one measures and according to the one who says from the root of the fence one measures — what is between them? R' Yona said: resolve it regarding a case where the vine roots were partly within four amot and partly outside four amot; according to the one who says from the root of the vines one measures — that is fine, meaning that one requires four amot from the root of the vine; according to the one who says from the root of the fence one measures — where the thread ends is forbidden and the rest is permitted, meaning permitted to sow near the vines; but this is not precise, for one must distance six handsbreadths'; and afterwards: 'if there were two cubits there,' etc., as above.`,

    `(Supplement) How, etc. As written above, that R' Shimshon's and Raavad's explanation is correct — that from the fence side one need not distance; and further proof from what is written in chapter 2 of Eduyot, and below seif 61: 'a small garden,' etc., 'if there is,' etc. (end).`,
  ]},

  { siman:'siman297', seif:'seif-041', segs: [
    `Siman 297 II`,

    `1. Not its species. Yerushalmi, beginning of Kil'ayim; and R' Shimshon cited it there: 'your field you shall not sow,' etc. — 'your animal you shall not cross-breed kil'ayim' — I would have said even, etc. [and the Gemara in Bava Metzia 91a: 'had it said,' etc.; and therefore R' said: like-species with like-species is permitted, etc.]; and likewise it appears in mishnah 6 there and in Bava Kamma 55a; and from that [we learn].`,

    `2. Between, etc. Mishnah and Gemara there 54b: 'if kil'ayim,' etc.`,
  ]},

  { siman:'siman303', seif:'seif-002', segs: [
    `It is forbidden, etc. Tosefta chapter 3 of Makkot regarding lashes; and the Rambam wrote it — see there.`,

    `(Supplement) It is forbidden, etc. The language of the Rambam: one who clothes his fellow in kil'ayim — if the wearer was intentional, the wearer is lashed and the one who dressed him transgresses 'do not place a stumbling block before the blind'; and if the wearer did not know that the garment was kil'ayim and the dresser was intentional, the dresser is lashed and the wearer is exempt; and the language of the Tosefta chapter 3 of Makkot: one who clothes his fellow in kil'ayim, and one who renders a nazirite impure — even though the dresser was intentional and the one who renders impure was intentional, he is liable; if both were unwitting, both are exempt; and this must be a textual error, and it should read: 'when the dresser is intentional and the one who renders impure is intentional — the dresser and the one who renders impure is liable; if the wearer was intentional and the one rendered impure was intentional — the wearer and the one rendered impure is liable; if both were unwitting, both are exempt'; but regarding one who rounds [the corners of the head] and one who destroys [the corners of the beard] and one who makes a gash and one who cuts [for the dead] and one who makes a tattoo — it is not so: when both are intentional, both are liable — as written in the Tosefta there and as stated above siman 180; and one can say here that only the wearer and the one rendered impure were commanded (end).`,

    `(Supplement) It is forbidden, etc. The language of the Rambam at the end of the laws of kil'ayim: one who clothes his fellow in kil'ayim — if the wearer was intentional, the wearer is lashed and the dresser transgresses 'do not place a stumbling block before the blind'; and if the wearer did not know that the garment was kil'ayim and the dresser was intentional, the dresser is lashed and the wearer is exempt; and the Rosh wondered at him in his responsum to Rashba; and Maggid Mishneh there; and see above siman 180 seif 11, which wrote that if both are intentional both are lashed — and likewise in the Tosefta there, as stated — see there (end).`,
  ]},

  { siman:'siman374', seif:'seif-009', segs: [
    `There is, etc. See Shach.`,
    `(Supplement) There is one who, etc. From chapter 2 of Nazir 13a — Tosafot s.v. 'and she miscarried,' etc. (end).`,
    `(Supplement) Seif 9. Hagahot Or Zarua siman 141 s.v. 'twins,' etc. (end).`,
  ]},

  // ── he=4 garbage cases ──────────────────────────────────────────────

  { siman:'siman134', seif:'seif-010', segs: [
    `It fell, etc. As written there — we taught: stam yeinam, etc., 'that there is no,' etc.; 'wheat is different,' etc. — but not so for barley and lentils.`,

    `(Supplement) It fell on lentils, etc. That is, when cold — as written 'wash them,' etc., 'and if,' etc.; but when boiling it is entirely permitted, as written there 68a-b: 'wine that fell,' etc. (end).`,

    `(Supplement) On lentils and barley, etc. These are the words of Rashba; and Ran also wrote thus there — but neither of them wrote there 'and there' but only barley (end).
And if he transgressed, etc. As written in Pesachim 40a: 'and Rava said: it is forbidden,' etc. — 'it goes without saying,' etc.; and all the more so if they fell for a long time; and even according to what the Gemara concludes there — that it is permitted to steep — that is because he is occupied with steeping.`,

    `(Supplement) And if he transgressed, etc. For even regarding steeping we are concerned about them for chometz in chapter Kol Shaah (40a), where it is taught: 'one may not steep,' etc.; and all the more so if they fell for a long time. Rashba and Ran (end).`,
  ]},

  { siman:'siman142', seif:'seif-004', segs: [
    `Between new, etc. There, like the view that says 'distant' is permitted — it is decided in Avodah Zarah 49a accordingly; and see Beur HaGra s.k. 7; and these are the words of Tosafot in Pesachim there s.v. 'between,' etc., and others.
While the flame is opposite him. Gemara there, and like the view that says even mutterings are permitted — as written in seif 6; and like Rabbi there, whose ruling we follow as written there; and these are the Tur's words; but it is astonishing, for this was said only regarding those whose ashes are permitted — as the Rosh wrote in Pesachim there end of seif 2: 'and the law that permits dim coals is according to all,' etc.; and likewise the Tur in the name of Maharam; and likewise the view of the Rambam; and the later authorities already wondered at this and elaborated; and Shach wrote that so it is in the Tosefta chapter 1 of Orlah: 'an oven fired with shells of orlah,' etc. — 'if he baked and cooked with the coals, it is permitted in all cases except for asherah wood.'
(Supplement) It was mixed, etc. — that bread. So Tosafot explained there, and the Rosh in their name; and likewise the view of Ramban in the Milchamot there and in chapter 2 of Pesachim; and Rashi and Razah wrote that there is no need to carry off except the value of the wood — and the bread is permitted even without mixing; and the Rosh wrote: specifically when mixed — but it is permitted by carrying off the value of the wood, and even that bread itself; and likewise the view of the Rif who wrote: 'R' said: the law is like R' Eliezer who said if mixed,' etc. — 'and all of them become permitted'; and likewise the view of Ran there who wrote that his position is like Rashi — and even according to the earlier authorities who say 'mixed,' nevertheless carrying off the value of the wood is sufficient, and even that bread itself is permitted; and he wrote there and in the Milchamot there: but regarding the admixture of wine in wine — whether wine in wine or stam yeinam — it is not permitted by redemption unless specifically cask-in-cask, for it is not like selling, as Rashi wrote there 49b s.v. 'and let it become permitted,' etc. — for they said there only 'even casks,' and this is not like bread; and according to Ramban and Tosafot, even bread is not permitted in this way, since that bread is not helped by carrying off the value of the wood — see there and there at length; and the Rif's view is that stam yeinam in redemption is equivalent to selling — as he wrote there regarding twenty casks of stam yeinam mixed in; and in the Milchamot there and Ran there explains 'in his wine' as wine in wine — and this is not permitted except for stam yeinam through selling, and all the more so through redemption; and likewise Mordechai there; and Razah wrote that this is not related to that, and even wine in wine is permitted, and even stam yeinam — and likewise bread, even without mixing, is permitted as above (end).`,

    `(Supplement) They are permitted. Razah wrote in Pesachim there, and the Rosh in Avodah Zarah there in his name: specifically for benefit; and R' Yona there in the name of Tosafot: even for eating — and not like a cask of stam yeinam that is forbidden for drinking, for here regarding the prohibition of eating one is not forbidden — as written: 'an oven fired with cumin,' etc.; and it is only forbidden due to a benefit prohibition; and as written in the gloss: 'the fact that,' etc. — and since he carries off the benefit, etc. — it is permitted in all (end).
He scraped, etc. The language of the Rambam regarding orlah; and it is the Gemara there 75a: 'he asked,' etc.; and Tosafot there s.v. 'and he scraped,' etc. — and not like what was written in the gloss of Beit HaMidrashot here: it teaches that even from the outset it is permitted.
This is permitted. In an old oven, for in a new one it is certainly forbidden, like vessels and cups, etc. seif 5; and likewise Taz wrote — not like what is written in Beit Yosef and Maggid Mishneh.`,

    `The fact that we say, etc. As written: 'an oven fired with cumin of terumah, it is permitted,' etc.; and therefore we say: one who cooked on Shabbat may eat [from it]; Mordechai there [and these are the words of Tosafot 66b s.v. 'he said,' etc.; and likewise Rashi there s.v. 'that there is no,' etc.; and Tosafot in Pesachim 26b s.v. 'new,' etc.; and R' Shimshon in chapter 10 of Terumot mishnah 4].`,

    `(Supplement) The fact that, etc. And so it is in the Rosh at the end of chapter Kol HaTzalamim there in the words of R' Yona, from the case of the oven as above (end).`,
  ]},

  // ── he=5 garbage cases ──────────────────────────────────────────────

  { siman:'siman130', seif:'seif-002', segs: [
    `If he deposited, etc. Gemara 31a; and as above.`,

    `(Supplement) If he deposited, etc. Rambam; and as written there 31a; and like the Rabbis; and Rashi there s.v. 'he designated,' etc., and s.v. 'and the Sages,' etc.; and from this it is proven that the Rambam ruled like the Rabbis, and his reading is our reading there — 'a key or seal' — not like R'N [and therefore the Rambam did not mention a key or seal except in that baraita there 61b, and he holds that only there do a key or seal help; but according to the reading of the Baal Halachot Gedolot and Rif, it follows like R' Eliezer; and according to Tosafot's reading, it follows even like the Rabbis (see above s.k. 19 and in siman 131 s.k. 7); and Tosafot 31a s.v. 'and both of them' — holds that a key or seal constitutes an inner partition]; and why he ruled like the Rabbis even though Rav ruled like R' Eliezer — because R' Yochanan and R' Elazar hold not like him; and also Rav retracted there 39a; and also Rav Ashi there 29b — except that the sugya there 69b is difficult, where we say 'and since after all,' etc. 'and the law is,' etc.; and it appears he explains that all this is Rava's words like all those statements there, even though he said 31a 'a bowl on its rim,' etc. — to explain the Rabbis' view — and his words were refuted by Rav Ashi, Rav, and Shmuel 39b, as above; and Rif, Rosh, and others omitted this law because they explain like Tosafot there s.v. 'one who deposits,' etc. — that Rivav holds his own view, and we do not rule like Rivav; and likewise according to the reading of BHG and Rif that Rashba and Ran wrote: they read 'and a key or seal' — and explain like R' Eliezer, meaning he designated a corner that he locked with a key or seal — and it is permitted for drinking (end).`,

    `And there are, etc. Tosafot there s.v. 'Rav said,' etc.`,

    `And one need not, etc. Tosafot there s.v. 'the sender.' And Rabeinu Tam, etc.; and there 69b s.v. 'what is the reason,' etc.`,

    `(Supplement) And one need not recognize, etc. Tosafot 31b s.v. 'the sender'; and Rabeinu Tam explained; and ex post facto, etc.; and Tosafot 69b s.v. 'what is the reason'; however, from what it says here in this sugyah that we rule like R' Eliezer, etc. — but ex post facto, etc. (end).`,
  ]},

  { siman:'siman134', seif:'seif-002', segs: [
    `Wine, etc. From what is written there 2b: 'granted regarding stam yeinam, because of,' etc. — but not so in such a case, which has no aspect of the attachment of idol worship; and Tosafot 29b s.v. 'wine,' etc. Ran and Rivash.
It was mixed, etc. Rashba, Ran, and others — not like Rabeinu Tam; and see Beur HaGra (proof of the poskim); and Tosafot there 2a s.v. 'wine in wine,' etc. (and in the Rosh there, and see Ramban, Ran, and Ritva) and there 71b s.v. 'the matter is,' etc., and there 56b beginning of s.v. 'but,' etc. — and this is what the gloss writes: 'and some say,' etc. (and so they practice leniently; and from the fact that he is unattributed, it implies like the words of the Bach — not like Shach s.k. 15; and that is because we also combine the view of Rabeinu Tam).`,

    `(Supplement) Stam yeinam was mixed, etc. — when he sells, etc. — and likewise, etc. This too is entirely the language of the Rambam, and following the way of the Rif; and it is explained that Rabban Shimon ben Gamliel's [statement] and R' Eliezer's [statement] of 'let him carry off the benefit,' etc. are one — except that one master states the beginning of the matter and one master states the end of the matter. Maggid Mishneh and Beit Yosef; and likewise the Rambam wrote in his commentary to the end of chapter 3: 'and the law is like R' Eliezer in all cases, and even a cask,' etc. 'and he is permitted to sell,' etc.; and likewise in chapter 5 on the mishnah 'these are forbidden,' etc.: 'let him sell all to gentiles,' etc. — and this is the explanation of 'let him carry off the benefit,' etc.; and likewise Tiferet Yisrael wrote (end).
And he receives, etc. There we say: Rabban Shimon ben Gamliel said, etc., 'except,' etc.; and likewise the Tur wrote and said: 'or sell it all to a gentile and receive,' etc. — and this is as written there 49b; and Beit HaBehirah discusses several approaches to this.`,

    `(Supplement) And he receives, etc. — and likewise, etc. According to the Rif's view, who holds that redemption in stam yeinam is equivalent to selling; and see what is written in the Supplement in siman 142 seif 4 (s.k. 8) (end).`,

    `And likewise if, etc. Meaning, as written there: 'R' Nachman said: the law in practice,' etc.
The matter of the cask, etc. See Rashi 74a s.v. 'stam yeinam,' etc., and s.v. 'and idol worship,' etc.; and likewise Tosafot there s.v. 'those,' etc. — and as written in the Gemara there: it is only counted as a countable matter; and Tosafot in Yevamot 81b s.v. 'R' Yochanan,' etc.; but Ran wrote that anything connected to the attachment of idol worship, even if not a countable matter — as written in the Yerushalmi: stam yeinam and idol worship and flayed hides — because it says 'let nothing of the banned property cling to your hand'; and Tosafot in Zevachim 72a s.v. 'but,' etc.; and furthermore Ran brought proof from what is written in the mishnah: 'stam yeinam that fell into a pit,' etc. — evidently even when not physically present it forbids; and we do not rule like Rav Dimi and R' Yitzchak; but according to what Shulchan Arukh ruled like R' Yitzchak, then necessarily the reason of the Yerushalmi is nullified — and the Yerushalmi holds not like Rav Dimi and R' Yitzchak.`,

    `(Supplement) The matter of the cask, etc. Tosafot in Zevachim 72a s.v. 'but,' etc.; and R' Shimshon in chapter 3 of Orlah — who were uncertain about this; but in Avodah Zarah 74a s.v. 'the fact' they hold like what is written here, where they wrote: 'and will you ask, and stam yeinam,' etc., 'and it must be said,' etc. — and likewise it is implied in the Gemara, which says it is counted only as a countable matter — even though one can press; and the Rambam's view is like Ran's reasoning, as written in the Yerushalmi — which is why he did not count in chapter 16 of Mishneh Torah the first three: stam yeinam, idol worship, and flayed hides (as stated above at the beginning of siman 110 in the Supplement) (end).
And even large ones, etc. Terumat HaDeshen and Ran; and as written regarding a ring of idol worship in Zevachim 74a.`,
  ]},

  { siman:'siman305', seif:'seif-005', segs: [
    `He gave him, etc. — until 'redeemed' — the language of the Rambam; and Ran wondered at him: why did he omit what is written there: 'R' Ashi said,' etc.?; and Beit Yosef answered that it is not like R' Kahana — just that he should be equivalent to any person; and his words are astonishing; and Taz; and further: why did the Rambam give an unattributed ruling? — the main point is that his reading is like the reading of Baal Halachot Gedolot, as Shach wrote; see there.`,

    `(Supplement) He gave, etc. The Rambam's reading: 'R' Eliezer said: we only said [this] regarding R' Kahana who is a great man and knows how to waive — but not regarding everyone; as in the case of Mar son of R' Ashi,' etc.; and he explains this regarding overreaching — that there is no overreaching in it. But Rashi's, Tosafot's, Rosh's, and others' approach: specifically when it is worth to him [the kohen]; and see Rashba and Ran (end).`,

    `(Supplement) He gave, etc. — until 'redeemed' — the language of the Rambam; and likewise the Tur wrote — and this is like the reading of BHG; but according to our reading, specifically when it is worth to the kohen who is accustomed to appreciate this object up to such a sum; and specifically to that kohen who is accustomed to appreciate this particular object for that amount; and see Ran in Kiddushin there; and the BHG reading requires study (end).`,

    `(Supplement) The Rashba wrote there that the Rambam holds from what is written there: 'we only said — specifically a tallit which is not accustomed to be appreciated except by a scholar; but regarding a sword — all people are equal'; and he wrote: and this requires study (end).`,

    `(Supplement) He gave, etc. — and it is, etc. Maggid Mishneh there 12a, where we say: 'he betrothed her with a date,' etc. 'we are concerned,' etc.; and the Rambam explains that this is a doubt of biblical law as written there; and the reason: since she accepted it — evidently it is worth to her some value, and it is also worth to anyone since there are people accustomed to go there; and see Ran there at length (end).`,
  ]},

  { siman:'siman160', seif:'seif-005', segs: [
    `Even, etc. From what is written there 75a: 'a scholar,' etc.; and Tosafot there s.v. 'a gift,' etc., 'and even,' etc.`,

    `(Supplement) Even if, etc. As written in the mishnah 75b and below in seif 6: 'how so,' etc. — 'a gift to him for the sake of his money that was lying idle,' etc. Mordechai (end).
But, etc. From what is written in Bava Kamma 94b: 'the Rabbis taught: robbers and moneylenders,' etc. — meaning: but let them waive [the repayment] on account of not closing the door [to penitents] — as written there; evidently it is effective. Rambam — see there.`,

    `(Supplement) But if, etc. The Rambam's proof from the beginning of chapter 9 of Bava Kamma — 'the robbers,' etc.; and Sefer HaTerumah and Hagahot Maimoniyot refuted his proof, for there it is because the Sages voided [the transaction], etc.; but nevertheless the Rambam's words are correct from what is written: 'since they do not accept,' etc. — to discharge one's obligation to Heaven; evidently by giving what he does not accept, he discharges his obligation to Heaven — and necessarily this is on account of waiving (end).`,

    `(Supplement) Even, etc., but, etc. See Rashi 66b s.v. 'here it is a loan,' etc. — and waiver does not help; and likewise the Rosh explained; and he answers Tosafot's difficulty: that the case deals with one who knows and waives — see there (end).
As with any robbery. There in the mishnah 103a.`,

    `(Supplement) A gift, etc. For it is money — as written in chapter 1 of Kiddushin (6b): 'in a sale he acquires; and in terumah,' etc.; 'and even a woman,' etc. — unless it is because of exchange (end).`,
  ]},

];

let ok = 0, fail = 0;
for (const { siman, seif, segs } of TRANS) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heRaw = fs.readFileSync(hp, 'utf8').replace(/^﻿/, '').trim();
    const heS = brSegs(heRaw);
    if (segs.length !== heS.length) {
      console.log(`MISMATCH ${siman}/${seif} segs=${segs.length} he=${heS.length}`);
      fail++; continue;
    }
    const out = join(segs);
    if (DRY) {
      console.log(`DRY ${siman}/${seif} → ${segs.length} segs`);
      segs.forEach((g, i) => console.log(`  G[${i+1}]: ${g.substring(0, 80).replace(/\n/g, ' ')}`));
    } else {
      fs.writeFileSync(ep, out, { encoding: 'utf8', flag: 'w' });
      console.log(`OK ${siman}/${seif} → ${segs.length} segs`);
    }
    ok++;
  } catch (e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
