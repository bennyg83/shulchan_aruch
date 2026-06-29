/**
 * apply_beur_hagra_he2_b5.mjs — Batch 5: 12 of 23 remaining he=2 cases
 */
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()).length; }
function join(segs) { return segs.join('<br />\n'); }
function loc(siman, seif) { return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function he(siman, seif) { return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }

const TRANS = [

  ['siman124','seif-004',[
    '<b>They render the wine forbidden for drinking, etc.</b> As above, seif 1; and as written in seif 3 — unlike the view of Tosafot there, s.v. "adults, etc." And with this the difficulty of Tosafot there is resolved: "and one might ask: let him distinguish, etc."\n<b>But contact, etc.</b> Gemara there: "explained it as [referring to the stone] foundations, etc."',
    '<b>Since they have circumcised, etc.</b> Rambam and Ramah. But Rashba wrote that even if they have not circumcised, circumcision is neither an advantage nor a disadvantage regarding drinking — for anyone who has not circumcised and not immersed is not a convert, as stated there, 59a, and in the chapter HaCholets. And [the Gemara] only mentioned "have circumcised" because of [the case of] adults. And you should know [this] from the fact that [the Gemara] objects against Rav: "if so, what is the question there — in [the case where] they have circumcised"? And so it is taught explicitly in the Tosefta: "and similarly, the children of maidservants who have not immersed — whether circumcised or uncircumcised — their sitting [on vessels] renders [them] impure; their wine — regarding adults, forbidden; regarding minors, permitted. And who is considered an adult? Anyone who makes a vow, etc." — as above.',
  ]],

  ['siman124','seif-008',[
    '<b>One who was drawn, etc.</b> As written in the chapter HaArel (72b).\n<b>And an apostate, etc.</b> As written in the first chapter of Chullin (4a).',
    '<b>And he is trusted.</b> So Beit Yosef wrote in the name of the Orchot Chaim. But this requires examination — what distinguishes this from the case of that butcher in chapter 3 of Sanhedrin (25a), where we say he is being clever [and feigning repentance]? And all the more so when we have not seen [any repentance] at all. See Hagahot Asheri, chapter 7 of Chullin, seif 16, s.v. "Ravyah wrote, etc. — and there was an incident involving an apostate, etc." — and even Riva permitted only because he [the apostate] had deposited [the meat, proving his reliability]; and even in this, Rashba disagrees because of [the concern for] deception. And so wrote Beit Yosef in the name of Shibolei HaLeket. And we learn in the chapter HaCholets (Yevamot 47a) that regarding a convert he must bring proof. See the Shach, who wrote that the Orchot Chaim refers to one who was not known to be an apostate except through word of mouth — and as written above, siman 268, seif 10, regarding a convert.',
  ]],

  ['siman344','seif-013',[
    '<b>After, etc.</b> This is derived from the preceding seif; and see Beit Yosef in Orach Chaim, siman 72.',
    '<b>(Supplement) After, etc.</b> Jerusalem Talmud, cited by the Rosh in chapter 3 of Mo\'ed Katan and in chapter 3 of Berakhot, siman 11. And Ramban wrote that the ruling follows our Sages, and his reading of the Jerusalem Talmud there is: "they interrupt [their activities] for Shema but not, etc. — an incident, etc." And he explained: "on the first day" refers to the [funeral] row. And he wrote that we learn from this: before burial, in the presence of the dead, they slip away and recite [Shema] but do not pray; [if] the dead is not before them, they recite and pray; after burial, the row does not interrupt either for Shema or for prayer; but for the eulogy they do interrupt both for Shema and for prayer. This is unlike the words of the Shulchan Aruch in seif 12, which states "and they pray." See Beit Yosef.',
  ]],

  ['siman146','seif-011',[
    '<b>Idols, etc.</b> As stated there, 49b — all agree, etc.; and like R. Yochanan, 41b.\n<b>Therefore, etc.</b> Unlike Samuel there; and as written above, siman 141, seif 2.\n<b>And if it was, etc.</b> Like Rav there, 49b; and the latter interpretation; and there are several variant readings there; see Ran; and there are several resolutions so as not to conflict with the ruling we hold like R. Yochanan that fragments are forbidden. But Rambam\'s reading here [is that the dispute] is over other fragments, etc. — meaning: whether nullifying one of them nullifies all the fragments.',
    '<b>(Supplement) And if it was, etc.</b> This is according to Rambam\'s reading. But according to Rashi\'s reading, the distinction is in shards of fragments: fragments are forbidden by all opinions, and shards of fragments — if a layperson cannot reassemble them — are permitted (and so ruled Raavad in his strictures), and so wrote Ran. And he wrote there is yet another reading: alternatively, all agree they do not worship fragments — and here, etc. — and even though we rule that an idol that broke by itself is forbidden there [in its main form], since the primary idol still stands, they do not worship the fragments; and in [the case of] fragments, the distinction is between the layperson, etc., and [the case of] the primary idol still standing. See Ran, the beginning of chapter 3, at length. (End.)',
  ]],

  ['siman209','seif-001',[
    '<b>One, etc.</b> Mishnah at the beginning of chapter 4 of Nazir; and Gemara, Shevuot 29b.',
    '<b>Or something, etc. like responding, etc.</b> As stated there, 36a: "it contains acceptance of a matter" — and for this reason it is like [explicit] verbal utterance; as in the Tosefta, chapter 3 of Nazir: "one who says to his fellow \'I am a nazirite, and you?\' — if he said \'yes,\' both are forbidden; if not, he is forbidden and his fellow is permitted, etc." See there.\n<b>But, etc.</b> See the Shach; and in the beginning of chapter 5 of Nedarim (46b): "that is a compulsion, etc."; and in chapter 7 of Ketubot (70a): "one who vows [to prohibit] his wife, etc." — and if her acceptance is required, there is no difficulty [from the Gemara]; and since he is already obligated to her, etc. And likewise in Nedarim, beginning of chapter 2 (15b); and furthermore, in that case she would have placed her finger [in the fire, i.e., acted foolishly], etc.',
  ]],

  ['siman234','seif-008',[
    '<b>He went, etc.</b> Gemara, 89a: "this is the rule, etc."',
    '<b>The father handed her over, etc.</b> There — "to include the case where he handed over, etc." — and see Ran there; and likewise in Ketubot 49a: "that R. Yehudah\'s rule, etc. — since she has already departed, etc."\n<b>And some say, etc.</b> Tur; and so wrote Rashi in Ketubot there, 48b, s.v. "Samuel, etc." — and see there, s.v. "a difficulty, etc." But Tosafot there, s.v. "and Samuel," disagree with him; and so it is implied there, 49a — specifically when she was widowed, etc. And so it is implied there in Nedarim according to the Ran\'s explanation there, s.v. "this is the rule" — that this handover is [comparable to], etc.; but, etc. And so it is in Rambam, chapter 11: "the father handed over, etc." — that a husband cannot dissolve prior [vows] — this implies that regarding vows made after the handover he can dissolve, in accordance with the Ran\'s view; and so wrote Kesef Mishneh and Bedek HaBayit.',
  ]],

  ['siman162','seif-003',[
    '<b>And it is known, etc.</b> See Shach, seif katan 7, 9.',
    '<b>And this, etc. but, etc.</b> Specifically in such a case; but [borrowing] until a fixed time is permitted — unlike Rambam who forbids [borrowing] until a fixed time. And Rambam\'s reason follows his own approach, for he explains what is stated there: "but the Sages say: they borrow [produce without specifying a price], etc." — [i.e., at the current market rate] — following Rif\'s interpretation that the law of the [bread] loaf equals that of the se\'ah; and what is stated there, "and so did Hillel, etc." — meaning: even at the current market rate — and the Sages disagree. But in the opening clause [Rambam] agrees that "a person should not say, etc." because one fixes a time — and that is the meaning of "to [the time of] the threshing floor." But the Rosh and other later authorities, who disagree with Rambam, follow their own approach — holding that the dispute over the loaf applies even without a market rate having been set, as above, at the end of seif 1; and likewise, the opening clause "a person should not say, etc." also refers to [a case] without a market rate, and "to the threshing floor" is not precise — as above, seif 1. (End.)',
  ]],

  ['siman351','seif-001',[
    '<b>There may not be, etc. — and some say, etc.</b> See Tosafot, Niddah 61b, s.v. "not, etc."; and Berakhot 18a, s.v. "tomorrow, etc."',
    '<b>(Supplement) There may not be, etc.</b> As written in chapter 4 of Menachot (41a): "at that moment we surely cast upon him [the obligation of tzitzit], etc." And even though in chapter 12 of Avodah Zarah Abba Shaul says they permitted [using the] techelet from cloaks [of the dead] — and Tosafot and other later authorities relied on this — in the book Torat HaAdam (and in Milchamot at the end of Mo\'ed Katan) he wrote that the Sages disagree with Abba Shaul, as stated in Masekhet Tzitzit: "one does not remove tzitzit from the dead; Abba Shaul ben Batnit permits it; Abba Shaul said: my father told me, \'when I die, remove my fringes — because they have sanctity.\' But the Sages say: they do not have sanctity; rather, they are used as a shroud for the dead and a saddlecloth for a donkey; and the ruling follows the Sages." And likewise we say in the beginning of chapter 4 of Megillah: "the Rabbis taught: items used in [performance of] a commandment, etc." (End.)',
  ]],

  ['siman186','seif-001',[
    '<b>A woman, etc.</b> See above, beginning of siman 184.',
    '<b>And Rambam, of blessed memory, etc.</b> He explains what is stated there: "specifically for matters of ritual purity" — meaning before intercourse; and therefore the Gemara cites [this ruling] concerning "and while she is passing, etc." but does not cite it regarding the opening clause of the mishnah: "and she attends with cloths, etc." And likewise from the fact that the Gemara there, 12a, objects: "R. Elazar bar Mamal said: there is a baraita, etc." — and it does not object from the mishnah there, 14a: "and the modest women, etc." — because that mishnah is addressed to her husband, and so is the entire chapter there. But R. Ami speaking here of "even for ritual purity" — [the Gemara\'s] objection is well placed. And what is stated there, 12a: "a woman — what [is the rule if] she examines herself according to the measure, etc." — [this applies] specifically to the measure of a sin-offering and guilt-offering; and likewise R. Ze\'era\'s question is in such a case, and after intercourse; and likewise what is stated there, 16b: "when it was taught, etc." — is also before intercourse. But all the decisors disagree with him; and that is what is written in the gloss: "and the reasoning, etc."',
  ]],

  ['siman172','seif-003',[
    '<b>And if, etc.</b> According to one of Ramban\'s resolutions — as above, in seif 1.',
    '<b>Every pledge-loan can be redeemed in installments.</b> So wrote Rashba and Sefer HaTeruah, siman 369, in the name of Ramban — from the fact that the question was raised in the first chapter of Kiddushin (20b) regarding houses in walled cities: whether they can be redeemed in installments — if we derive [the rule] from its redemption, etc. — for otherwise they would be redeemed in installments. And the reading in [the] books [before us] is "cannot be redeemed, etc." — meaning, regarding this matter that is explained hereafter: "and if he brought, etc." Unlike the Shach, who argues that in that case it should have said: "and nevertheless, if he brought, etc." [The GRA is citing this] in the name of Rashba — and his proof is not clear to me, because if so, even if we say [houses in walled cities] can be redeemed in installments, it would also [then need to] be a deposit. And see what I wrote in Choshen Mishpat, siman 74, seif 4.\n<b>That matter of the pledge-loan, etc.</b> As written in the first chapter of Kiddushin (8b): "there is no [issue of] coins here, etc."\n<b>And if they made, etc.</b> As stated there: "in a place where they pay off [in installments], etc.; in a place, etc." And see above, beginning of siman 174.',
  ]],

  ['siman145','seif-002',[
    '<b>A thing, etc.</b> Mishnah and Gemara there, 45a.',
    '<b>Accessories, etc.</b> There, 51–52: it was taught in a baraita: "if it was lost, etc. — among vessels, etc." — "the master said: etc." — "if it is not relevant, etc." — and see Tosafot there, s.v. "apply it, etc." And that is the meaning of "but an offering [to idolatry], etc." And as written in Chullin 40a: "there is no difficulty — the case where one said [he slaughtered] for the mountain, etc." — following Rashi\'s interpretation in Avodah Zarah 45a, s.v. "and what is upon them, etc." And R. Yitzchak in Tosafot there, s.v. "their gods, etc." agrees — unlike Ri"t and the other reading of Rashi that Tosafot brought there. And there is a scribal error in our Rashi in the passage mentioned above, "mountains and hills, etc." through "but in this case, etc." — which belongs to the other reading of Rashi; and it should say: "it is a Scriptural decree that that which is detached and is upon them, etc." And so holds Tosafot in Chullin 40a, s.v. "but, etc." — except that from their words it is implied that even accessories are permitted, for they wrote there: "and that the offering of a mountain is permitted, etc."',
  ]],

  ['siman153','seif-003',[
    '<b>He belonged to a non-Jew, etc.</b> Tur; and like R. Yosi; but Rambam ruled like the first opinion.',
    '<b>Nevertheless, etc.</b> Rashi there, s.v. "he should not be, etc."\n<b>Forever.</b> Rashi there, s.v. "and he should not bow, etc."\n<b>In a place, etc.</b> Pirkei DeRabbi Eliezer, chapter Ben Temalion (29): "and why did they circumcise him? For the sake of purity — for whoever eats with a non-Jew, etc., and whoever touches him is like one who touches a corpse, and whoever bathes with him is like one who bathes with a leper." And the Mordechai wrote in Avodah Zarah 44b that it is stated there that Rabban Gamliel bathed, etc. — and the non-Jew entered [the bathhouse] before him. And he wrote in Darkei Moshe that the reason we are not careful today is because [they] walk with pants; and as wrote the Agudah in chapter 4 of Pesachim; and as written in Even HaEzer, siman 23, seif 6 in the gloss. But that case is not analogous here; and the later authorities have already written that Pirkei DeRabbi Eliezer speaks on account of purity; and it also appears that there the reference is to a shared bathtub — and therefore the case of Rabban Gamliel mentioned above also presents no difficulty.',
  ]],

];

let ok = 0, skip = 0, fail = 0;
for (const [siman, seif, segs] of TRANS) {
  const enPath = loc(siman, seif);
  const hePath = he(siman, seif);
  if (!fs.existsSync(hePath)) { console.log('NO HE:', siman, seif); fail++; continue; }
  const heContent = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
  const heSegs = brSegs(heContent);
  if (heSegs !== segs.length) {
    console.log('SEG MISMATCH', siman, seif, 'he=' + heSegs, 'trans=' + segs.length);
    skip++; continue;
  }
  const newEn = join(segs);
  if (DRY) { console.log('DRY OK', siman, seif); ok++; continue; }
  try { fs.writeFileSync(enPath, newEn, { encoding: 'utf8', flag: 'w' }); ok++; }
  catch (e) { console.log('WRITE FAIL', siman, seif, e.message); fail++; }
}
console.log(`\nDone: ${ok} written, ${skip} skipped (seg mismatch), ${fail} failed.`);
