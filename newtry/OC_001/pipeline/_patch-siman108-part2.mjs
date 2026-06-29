#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");

function setEnglish(rel, slug, seif, marker, newEn) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, "utf8");
  const parts = s.split("**** OC001 SOURCE BLOCK ****");
  let found = false;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const head = "**** OC001 SOURCE BLOCK ****";
    if (
      !slugM ||
      slugM[1].trim() !== slug ||
      !seifM ||
      String(seifM[1].trim()) !== String(seif) ||
      !markerM ||
      markerM[1].trim() !== marker
    ) {
      return head + block;
    }
    found = true;
    const enTag = "**** ENGLISH ****";
    const endTag = "**** END BLOCK ****";
    const enStart = block.indexOf(enTag);
    const enEnd = block.indexOf(endTag);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel}`);
    const before = block.slice(0, enStart + enTag.length + 1);
    const after = block.slice(enEnd);
    const nl = block[enEnd - 1] === "\n" ? "" : "\n";
    return head + before + newEn + nl + after;
  });
  if (!found) throw new Error(`Block not found: ${rel} ${slug} seif=${seif} marker=${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${rel} ${slug} seif=${seif}`);
}

const cs = "siman_108/chokhmat-shlomo/part-001.txt";
const ls = "siman_108/levushei-serad/part-001.txt";

setEnglish(cs, "chokhmat-shlomo", 1, "_",
`Section 1 — One who erred or was compelled, etc. Marginal note: Behold, in the law: if forgetting constitutes coercion — on this the poskim disagree. See in my work Chokhmat HaTorah on the Torah, in my work Mishnat 216, parashas Haazinu, where I brought support from the Yalkut that forgetting is coercion, see there and understand well. See in Taz and Magen Avraham what they challenged. See in my responsum in Yoreh De'ah, in my work 559 siman 47 in the laws of tereifot siman 33, in my work siman 78 — what I wrote there incidentally in resolving their difficulty there, see there and understand well.

And behold in this law — one who erred or was compelled and did not pray Shacharis prays two Minchah prayers, etc. — it seems to me a novel law that if he did not complete in the adjacent prayer, it does not help to complete afterward; namely, only if he was obligated in the preceding prayers — then since he was fit to complete in its time and did not complete, completion afterward does not help him. And one could say the reason is from the power that it is like nireh venidcheh (appeared and was rejected), that one does not return; so too here, since it appeared to complete as the adjacent prayer and he did not complete and it was rejected, and he has no time to complete except after he already prayed the second prayer — so too it is nireh venidcheh and he does not return and appear again. And granted, for the first completion — if he forgot or was compelled at first — it is like rejection from the outset and is not dehiyah (delay); but afterward, when it is nireh venidcheh, that is dehiyah.

And further one could say more: it is known we rule there is no dehiyah regarding mitzvot — if so, one might say nevertheless sometimes there is dehiyah, as I wrote in my work Sefer HaChaim siman 167 in the laws of beheimah regarding the Rif; and one could say here too there is dehiyah in this. But one could say more: certainly regarding mitzvot we rule there is no dehiyah, as Magen Avraham wrote siman 586 — only prayer, since it is in place of sacrifices; and in a sacrifice, nireh venidcheh is dehiyah — therefore here too in prayer.

But behold we rule prayers were instituted by the Patriarchs — if so, one might say prayers are from the Patriarchs' institution. But corresponding to the Patriarchs' enactments is only prayer in its time; but if he did not pray in its time, that make-up prayer afterward helps — this does not belong to the Patriarchs; this we learn from sacrifices, which have make-up offerings. Therefore regarding its time, which is only from the power of mitzvah — here there is no dehiyah regarding mitzvot, therefore he has make-up prayers. But regarding what he became obligated to complete — that is only in the manner of sacrifices; and in sacrifices nireh venidcheh is dehiyah — therefore if he did not complete in the adjacent prayer, make-up prayers afterward do not help. And so and so — since in any case the reason make-up prayers do not help is from his having been able to complete and not completing.

But if he was not able to complete — such as one who forgot to pray Minchah and became an onen in the interim and was not permitted to pray Maariv until morning, or Minchah — here since he was not permitted to complete in the adjacent prayer, since he was fully exempt until then, especially per what I said the reason we require adjacent prayer is from nireh venidcheh, and here it is dehiyah from the outset — therefore he completes afterward.

So too if his relative died one day and they did not let him bury until the next day, and he did not pray Minchah thinking he had the law of onen — but in truth he has no law of onen that day since they do not let him bury that day by royal law, as I wrote in my work Yoreh De'ah — if so, regarding Minchah prayer he did not pray: he is mistaken, says it is permitted, and he is considered inadvertent and obligated to complete later. Only afterward in Maariv — since tomorrow on that day they will bury him, he is onen; an onen may pray Maariv and Shacharit; and after burial when he prays Minchah he may pray two also for yesterday's Minchah he did not pray by mistake — for that is adjacent prayer here, as seems clear and correct to the law; understand well.

Further it seems to me a novel law: namely the law that if he did not pray Shacharis he prays two at Minchah — that is specifically after chatzos after prayer time passed; but if it is still before chatzos he should not wait until Minchah but pray Shacharis immediately. Nevertheless it seems that is specifically when there is no Musaf — then it is actual Shacharis time until chatzos and he prays immediately and does not wait for make-up. But if it is a day with Musaf and he already prayed Musaf and remembered he did not pray Shacharis or did not mention in it what he must mention — since he already prayed Musaf he has only the name of make-up, since its time is before Musaf; and if he already prayed Musaf again it is only the name of make-up, and make-up applies only to adjacent prayer — he waits until Minchah.

And there is no proof for the reverse from what Beit Yosef wrote in the name of Rashba siman 286 and Rama there — that if he preceded Musaf to Maariv of evening he fulfills — from there is no proof: one could say it deals only bedieved; but lechatchilah the reverse is proven from there that by Gemara law Musaf time is after Shacharis. And further, there it deals only whether he fulfilled Musaf — one might have thought even Musaf he did not fulfill; it teaches he fulfilled Musaf even without praying Shacharis; so too bedieved if he prayed Shacharis afterward he also fulfills. But lechatchilah it seems certainly since he already prayed Musaf, Shacharis proper time no longer applies — Shacharis time is before Musaf — and it is only as make-up; and in make-up he waits until Minchah, as seems to me to rule lechatchilah; understand well.

And in this law itself — if he transgressed and prayed make-up not adjacent to prayer — I am doubtful whether he fulfills bedieved or not: say they enacted to pray only in adjacent prayer lechatchilah but bedieved he fulfills, or say even bedieved he does not fulfill. One cannot bring proof from what we rule — if he preceded the first to make-up prayers he does not fulfill — for one could say this is worse when he prayed make-up first; and then for the body of the obligation — that is only when he prayed at Minchah time, etc. — there it is worse if he preceded make-up; but if he prays not at the time he prays the body of obligation, possibly he fulfills bedieved or not; requires investigation. For now only in the first law it seems lechatchilah he waits until Minchah, and bedieved certainly he fulfills if he prayed Shacharis afterward, as seems correct to me; understand well.

Again they showed me that Arizal wrote the reverse of the first law; and to me it seems as I wrote — he did not address my reason above at all, and he permitted only at Musaf prayer time and not afterward; see there well and understand well.

And behold in my work Sefer HaChaim siman 7 I raised the law: if one prays Musaf on the first day of Passover and did not mention in it Mashiv HaRuach — must return and pray again afterward, even though he already heard from the chazan that he did not mention rain, see there. And behold now I saw in Peri Megadim siman 126 he wrote in such a case one need not return at all, since one need mention only because he did not hear from the chazan, see there. And to me it does not seem so, and the matter is clear he must return and pray — what difference if it is because he did not hear from the chazan? Ultimately since Chazal enacted to mention — if he did not pray per Chazal's enactment he must return.

And know: if he prayed on Shemini Atzeret and mentioned Mashiv HaRuach before hearing the herald proclaim — obviously he must return; proof from what Shulchan Aruch wrote siman 114 — even if sick or coerced he may not precede his prayer to public prayer; Magen Avraham explained if not sick in any case he may not precede his prayer to public prayer, see there. If so, every time of pressure is considered bedieved; and if bedieved he fulfills prayer even if he mentioned without hearing the chazan — then for sick or coerced it would be lechatchilah to do so, especially since public prayer is a great matter and for many poskim adjoining redemption to prayer is preferable — yet for sick or coerced he may precede his prayer to public prayer; it must be proven since bedieved he fulfills if he prayed alone; therefore every time of pressure is bedieved. If so, since here he may not precede his prayer to public prayer and they did not permit him to mention before the chazan — it is proven here too even bedieved he returns.

If so, what difference if he mentioned Morid HaGeshem in its time when he should have mentioned — nevertheless since he did not hear from the chazan he returns; what difference if he did not interrupt in Musaf of first day Passover when he should have interrupted since he had not yet heard from the chazan — he returns and prays since he did not fulfill Chazal's enactment. And clear and correct is my view, not as Peri Megadim wrote here; examine well.

And behold in the law — one who erred or was compelled and did not pray Shacharis prays two at Minchah — the source of this law is in the Gemara page 26, and the Gemara concludes as a difficulty from a baraita 'if he erred and did not mention,' etc. The poskim wrote in the name of Rabbeinu Hai: since it does not conclude with a refutation, it says so — from the power that this is worse, for he revealed his mind that the first was for make-up, etc. And to me proof for his words from what we read in Berachos 4b: they say — since the Sages enacted Hashkiveinu like a long prayer, otherwise how could Shacharis adjoin? — R' Yochanan said, at first he says 'Open my lips, O Lord,' and at the end he says 'May the words of my mouth be acceptable.' They said: since the Sages enacted, etc.

And on 9b is the same topic and there it says the reverse — for R' Eliezer says let it be like Minchah prayer, see there; Rashi: what R' Yochanan said 'four openings, my lips' applies only to Minchah prayer; R' Eliezer says always to all; and since they fixed it in prayer like a long prayer, otherwise how could Maariv adjoin since he must say Hashkiveinu — except since the Sages enacted, etc.

The topics conflict: above 4b proves Hashkiveinu from 'at first he says open my lips'; on 9b it says the reverse and proves 'open my lips' from Hashkiveinu. And even more wondrous — how does the Gemara on 4b prove from 'open my lips,' perhaps that is Minchah prayer as R' Eliezer concludes on 9b? This requires investigation.

What seems to settle: in Sha'ar HaLev — why did the Gemara end with R' Yochanan's words 'and at the end he says may the words of my mouth be acceptable' — for the challenge it would suffice only 'at first he says open my lips,' and Tzelach already stood on this. But it seems it works out: the questioner knew one could say R' Yochanan deals with Minchah prayer; therefore he challenges — behold he says 'and at the end he says may the words of my mouth be acceptable,' and at the end one cannot distinguish between prayers — the conclusion applies to all; if so the beginning too deals with every matter; therefore he had to bring the end.

But accordingly R' Eliezer who answers 'let it be like Minchah prayer' — how does he answer this challenge, for 'may the words of my mouth be acceptable' applies to all? But one could say: since we say above 9b one should always be careful with Minchah prayer — Elijah was answered only in Minchah prayer — therefore one could say the conclusion 'may the words of my mouth be acceptable' too applies only to Minchah prayer, for then one is assured it will be acceptable, but not in Shacharis.

But it is difficult — R' Yochanan says there even in Maariv prayer he is answered; if so 'may the words of my mouth be acceptable' applies even in Maariv — what difference between Minchah and Maariv?

But one could say: what R' Yochanan said 'even in Maariv prayer' is not literal Maariv — the intent is we rule if one erred and did not pray Minchah he prays two at Maariv. Therefore R' Yochanan said not specifically Minchah in its time but even in Maariv prayer — if he prays Minchah in Maariv he is also answered; but literal Maariv he is not answered. Therefore the conclusion 'may the words of my mouth be acceptable' is in Minchah or its make-up, like the beginning 'open my lips' — so R' Eliezer explains.

But accordingly it is difficult — we say in Zevachim 48a and several places the ancillary must not be more stringent than the main matter; if so here, since Minchah make-up in Maariv is ancillary and Maariv in its time is main — how can the ancillary be more stringent than the main, that the main is not answered while make-up is answered? It must be R' Yochanan deals with literal Maariv and the difficulty returns — R' Yochanan must deal with every matter.

But one could say: whether this reasoning — ancillary not more stringent than main — applies here or not depends on the questioner's reasoning on page 26 that I brought above: if we say if he made havdalah in the second and not the first — it counts for him — we see he made make-up the main thing and made havdalah, while in the main he did not — he made ancillary main and main ancillary; or his intent was to precede make-up and he made it main — he also fulfills; if so it is proven we do not say ancillary not more stringent than main; therefore it can be here too what R' Yochanan said 'even in Maariv prayer' is Minchah make-up in Maariv, not literal Maariv.

But if we say like the Gemara's reasoning — if he made havdalah in the second and not the first it does not count — it is proven forbidden to make ancillary main and main ancillary; if so here too one cannot explain R' Yochanan's intent in Maariv make-up, for then ancillary is more stringent than main; it must deal with every matter; therefore R' Eliezer who answers 'let it be like Minchah prayer' — he holds like the questioner's reasoning that concluded as difficulty and holds we do not heed making ancillary main, or there is no name of ancillary on make-up prayers at all and there is no concern if one precedes them; therefore R' Yochanan could deal only with Minchah prayer.

But above 4b it goes according to truth — we rule like Rabbeinu Hai one may not make from ancillary main — therefore it must be that R' Yochanan deals with all prayers from his ending 'and at the end he says may the words of my mouth be acceptable'; therefore he made proof from 'at first he says open my lips' for Hashkiveinu prayer.

But on 9b, which goes to the reasoning that one could say R' Yochanan deals only with Minchah prayer — from 'open my lips' there is no proof, for one could say he deals with Minchah prayer; therefore it proves the reverse from Hashkiveinu; end quote; understand well. And there is proof from this for Rabbeinu Hai's view and the poskim; understand well.`);

setEnglish(cs, "chokhmat-shlomo", 2, "_",
`Section 8 — One who did not pray, etc. Marginal note: Behold, from this it is proven that forgetting is coercion; see in Magen Avraham what he discussed on this. And to me it seems to prove that forgetting is coercion: behold, initially it was difficult to me in what the Gemara says in chapter 4 of Bava Metzia (51b) — there it says Shmuel said: I say even according to R' Meir, etc. — R' Meir did not say there he certainly uproots; but here who will say he uproots? And it was very difficult for me how to interpret an explicit mishnah at the end of chapter 6 of Peah, thus: one who says 'I will harvest on condition that what I forget I may take' — he has [the right of] forgetting; and Rambam, Rosh, and Ra'avad explained from the power that any condition on what is written in the Torah — his condition is void. And it is difficult: behold there it is doubtful uprooting, for perhaps in any case he will not forget, and it is literally like 'on condition you have no claim of fraud against me.' And behold this would settle: one could say since we see R' Yehuda holds in monetary matters his condition stands — if so we see monetary law is lighter than prohibition; if so R' Meir holds even in monetary matters his condition is void — namely only where he certainly uproots; but in doubtful uprooting R' Meir concedes in monetary matters his condition stands. But in a matter that is not monetary, even in doubtful uprooting it is a condition on what is written in the Torah. But still, what shall we do with the topic in Gittin (64b) regarding 'on condition you eat meat' — there too it challenges that it was a condition on what is written in the Torah, and Ravina answers there too: it must be like other clothing and conjugal rights where he certainly uproots; but here 'you shall not eat' and 'you shall not divorce' — and so it was copied in Shulchan Aruch Avodah Zarah (simanim 38 and 144) — if so it is explicit that even regarding prohibition we say where it is not certain uprooting it is a condition on what is written in the Torah. And it is difficult: behold an explicit mishnah in Peah that this too is a condition on what is written in the Torah even though it is not certain uprooting. And at first glance this requires investigation; it must be explained that there it was in her power not to eat and not to divorce, and therefore anything in her power is not considered a condition on what is written in the Torah; but here it is not in his power not to forget, therefore it is a condition on what is written in the Torah. If so it works out if we say forgetting is literally coercion — then it is fine to say here, since it is not in his power, it was a condition on what is written in the Torah. But if we say forgetting is negligence — it must be proven that it was in his power to be careful not to forget; if so it was also in his power, and it is difficult why it would be a condition on what is written in the Torah when it is not certain uprooting. And certainly the matter depends: if it is literal coercion it was not in his power to guard against it; and if he was negligent it must be in his power to guard — for if it were not in his power to guard, that is not negligence. If so, if we say it was in his power not to forget, why was it considered there a condition on what is written in the Torah? It must be proven forgetting is not in his power, and it is proven it is literal coercion. And this is clear proof to me that forgetting is coercion; understand well.`);

setEnglish(cs, "chokhmat-shlomo", 3, "_",
`Section 11 — One who erred in Minchah, etc. Marginal note: Behold, in this there are views that one need not return and pray at Motzei Shabbos — what does he gain by praying more, etc.; and see what I wrote — clear proof for this in my novellae on the Gemara Pesachim 95b from what is written there: their reason is because of impurity of the threshold — he should return and do it in impurity, even though then there were only a minority impure and the majority performing were pure; and here the majority performing Pesach were impure and impurity was permitted or deferred in public — from this it is proven we do not follow the present but what was then at the time of the primary obligation, not at the time of make-up prayers; and as they say, the two make-up prayers of the first are for Motzei Shabbos; understand well.`);

setEnglish(ls, "levushei-serad", 8, "_",
`There — since regarding Maariv, meaning there he does not say Ashrei only once. Heaven forbid — for regarding Shacharit too it suffices with Ashrei once.`);

console.log("Done siman 108 part 2 patches");
