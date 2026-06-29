#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `mishnah-berurah:5:ח`,
    `(20) In the first three [blessings], etc. — for all these are considered as one blessing; therefore even if he did not wait, he returns to the beginning of the prayer or to R'tzei; and per what I wrote in the name of the Gra and Magen Giborim, likewise here he need only return to the place he paused.`,
  ],
  [
    `mishnah-berurah:5:ט`,
    `(21) He returns to the beginning — Chayei Adam wrote this is specifically when he already finished the blessing; but if he interrupted in the middle of a blessing he does not return except to the beginning of that blessing, for anything in the middle is not called 'return' but correction of the wording.`,
  ],
  [
    `mishnah-berurah:6:א`,
    `(22) The reader — he used 'reader' because this law derives from Keriat Shema, where likewise the law is thus, as we wrote above in siman 65, seif 1, in the hagahah.`,
  ],
  [
    `mishnah-berurah:6:ב`,
    `(23) If he spoke — and the same if he mentioned the matter of other days in prayer — such as Shabbat and Yom Tov on a weekday, and the like — likewise his law is as if he spoke [later authorities]; and it will be explained below at the end of siman 108 in Mishna Berurah — see there.`,
  ],
  [
    `mishnah-berurah:6:ג`,
    `(24) In prayer — and if he spoke in Keriat Shema and its blessings, see above in siman 65, seif 1, in Mishna Berurah.`,
  ],
  [
    `mishnah-berurah:6:ד`,
    `(25) Like the law of interruptions — meaning if he spoke in the middle of a blessing a little speech, even if he did not wait thereby long enough to finish that blessing, he returns to the beginning of the blessing; and if he waited by the speech long enough to finish the entire prayer from beginning to end, he returns to the beginning of the prayer; and per what we explained above in note 16, this law is only when he spoke due to duress — such as by robbers and bandits and the like, as stated; but if he spoke not due to duress but only unwittingly through some mistake or he thought it was permitted — even if he waited long enough to finish it all, he does not return to the beginning but only to the beginning of the blessing; and if he spoke between blessing and blessing — although he transgressed a prohibition thereby — nevertheless no correction applies according to all, but immediately after the speech he completes his prayer; and if he spoke intentionally — there is a dispute in this law: some say he returns immediately to the beginning of the prayer even for slight speech; and some say there is no distinction between unwitting and intentional.`,
  ],
  [
    `mishnah-berurah:7:א`,
    `(26) For Kaddish — meaning for Amen, yehei shemei rabba; and the same for Barchu.`,
  ],
  [
    `mishnah-berurah:7:ב`,
    `(27) He should be silent — until 'baruch hu'.`,
  ],
  [
    `mishnah-berurah:7:ג`,
    `(28) And it will be as if he answered — regarding that through this he fulfills the obligation of Kaddish and Kedusha; nevertheless it is not considered an interruption.`,
  ],
  [
    `mishnah-berurah:7:ד`,
    `(29) He does not interrupt — and if he interrupted in this, and likewise for Kaddish and Kedusha, his law is like one who spoke intentionally; and per the view of the poskim that there he returns to the beginning — in this too he returns to the beginning; but if he thought it was permitted to interrupt, it is like unwitting and he does not return to the beginning, as stated. And if they called him to the Torah scroll and he is standing after the eighteen [blessings], even if he has not yet begun Elokai netzor — he interrupts and goes up; but he should be careful to say 'Yehi ratzon' first.`,
  ],
  [
    `mishnah-berurah:8:_`,
    `(30) After he finished, etc. — meaning that he said also 'Yehi ratzon' before Elokai netzor; for otherwise it is forbidden to interrupt, as written in siman 122; and for this Rama hinted in what he wrote 'and see below siman 122'.`,
  ],
  [
    `peri-megadim:1:_`,
    `But Ateret Zekenim — Mahari Mintz holds like Tosafos Berachos 31a, that R. Akiva who bowed with his hands and feet spread and necessarily uprooted his place — is permitted also within prayer, if not that we do not bow with spread hands and feet, etc.; and the Mechaber in siman 113, seif 1, rules that in the middle one may bow; nevertheless he explains here in seif 2 like the Rosh that within prayer one may not walk (Mahari Mintz explained [this refers to walking] after prayer because we do not bow with spread hands and feet, etc.; and possibly Mahari Mintz like the Rosh — see there); and in siman 121, seif 4, and Taz 3 — see there. Nevertheless one may say that without need, only for bowing, it is forbidden within prayer; and so the prayer leader on Yom Kippur is forbidden (they set a stand for him as is customary, and he need not uproot). But for need, such as a snake, it is certainly permitted, as Magen Avraham wrote, note 3. And what he wrote that we do not find walking called interruption as speech is called interruption, and one would need to return to the beginning of the blessing as in seif 5 — Mahari Mintz per his view that walking is not called interruption at all, unlike our view. And in siman 8, note 13, regarding tallit — in Taz, note 11, and Magen Avraham, note 17 — only from house to house is an interruption, not within one house; and here one may say from house to house nevertheless it is not an interruption regarding a snake, like speech.`,
  ],
  [
    `peri-megadim:2:_`,
    `He returns — Taz: the view of the Rif and Rosh is known — the Rif does not distinguish between duress or not, only between prayer and Keriat Shema; and the Rosh does not distinguish between Keriat Shema and prayer, only between duress or not; and the Raavad, who is silent here, holds that duress applies even not due to his circumstances, and he returns to the beginning — as is clear in siman 103, seif 2, where the Raavad showed for siman 85 — thus prayer is like Keriat Shema; and so the Levush in siman 85, seif 1, that prayer equals Keriat Shema, and without duress one does not return; and Bach brought from Tosafos 33a s.v. 'but a scorpion,' which refers when he waited — for without waiting there is a dispute on 23a; and it appears wondrous that Rav Ashi concludes without waiting, etc. (the intent of Tosafos: since he stated anonymously 'he stops' and did not mention returning to the beginning without waiting — do not err that also to the beginning of the blessing one does not return — thus); and one may say that there it is 'a man was visible,' per Rashi there, and also for the Rosh at the time of drinking; but here, from where to say he returns to the beginning without waiting — perforce when he waited; and the reason is it is not duress due to his circumstances; and the Taz rejected this, that without waiting is the case, per the explanation of the Rosh there. And behold the Prisha wrote here that Maharam of Coucy disagrees with the Rashba, and Rama ruled like Maharam of Coucy — and see Beit Yosef here in the name of Chidushei HaRan, Berachos 33a, that for the Raavad we require 'a man was visible,' and in other duress one does not return to the beginning; and the words of Maharam of Coucy are in the Rosh 23a, whom Beit Yosef brought in siman 65 — it implies whoever is coerced returns to the beginning; and so Rama here, that one who is coerced also returns to the beginning; and now the words of Bach are the words of Chidushei HaRan, as stated; and see Magen Avraham 65, note 2, for the halachah.`,
  ],
]);

function apply(file, map) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = map.get(key);
      if (en) {
        n++;
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  return n;
}

for (const f of [
  "output/siman_104/mishnah-berurah/part-001.txt",
  "output/siman_104/peri-megadim/part-001.txt",
]) {
  console.log(f, apply(f, fixes));
}
