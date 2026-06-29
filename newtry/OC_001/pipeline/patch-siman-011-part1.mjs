#!/usr/bin/env node
/** Apply part 1/11 editorial English for siman 11 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

const EN = {
  "ateret-zekenim|2|_": `They require twisting, and that they be twisted for its sake; but bedieved they are not invalid on that account alone.`,

  "ateret-zekenim|3|_": `And lechatchila it is good to tie the threads, as written in Levush; for thus he saw in R. Shlomo Malko's tzitzit that they were not tied, and he wrote in Magen Avraham; and I also heard that it is as though one adds to the knots, and especially if they are finely twisted, for it adds to the knots and they will not come apart.`,

  "ateret-zekenim|9|א": `One should make a hole along the length of the tallit, not higher than three fingerbreadths, because it is not called a corner; here too one must estimate at the place of width a thumbbreadth and not from its head where it is short, as above in Shulchan Aruch.`,

  "ateret-zekenim|9|ב": `And not below the measure where there is a gedil knot, etc. However, if one sees in the width of the hole through which the threads pass that the threads are not distant a full gedil knot's measure, it is unnecessary (Beit Yosef, Rokeach). Here in this law the Beit Yosef brought the words of Maharari'a z"l, and thus he said: And our great rabbi Maharari'a wrote that the reason one must place it within three fingerbreadths and distance the measure of a full gedil knot is because a garment less than three fingerbreadths is not called a garment; therefore it must be within three; and that which must be as a full gedil knot is because it is not called a corner except at this measure, and if below this measure there is no longer a corner, etc. And on this the Beit Yosef wrote, and I did not understand his words — that although less than three fingerbreadths is not called a garment, a corner of a garment is called such, and Scripture says "on the corners of their garments" and not "on their garments," etc. And were I not apprehensive I would say that the rabbi Beit Yosef spoke well, who said that he did not understand the words of the great rabbi Maharari'a; for in truth he did not understand, for in his view he understood from Maharari'a's words when he said "because a garment less than three fingerbreadths is not called," etc. — that this statement is giving a reason for a defect and for invalidating a place less than three fingerbreadths to affix tzitzit on it; if so, according to his words how does he conclude with it "and therefore it must be within three"? But truly the words of Maharari'a z"l are all clear as the sun visible to the eye — all agree with Rashi z"l, as the rabbi Nissi himself explained above in Rashi's words, the divisions of law: that the very end of the garment less than a gedil knot is called keren, and from a gedil knot up to three fingerbreadths is called kanaf, and above three fingerbreadths is called beged. Thus on this path the words of Maharari'a z"l also ascend: that the reason one must be within three fingerbreadths and distance the measure of a full gedil knot is because it is not called beged less than three fingerbreadths, and therefore it is fit to affix tzitzit on it; unlike if it were called beged, which would not be fit to affix on it, for the Torah said "on the corners of their garments" and not "on their garments." And likewise below a gedil knot it is not called kanaf but keren. Behold, Maharari'a's words do not deviate right or left from Rashi z"l — namely his statement that less than three fingerbreadths is not called beged, for he gives reason for merit to validate the place for affixing tzitzit, and not as the rabbi Beit Yosef understood his reason for defect and invalidation; and thus in vain did he lean on the rabbi Beit Yosef with blame in his hand, for rightly are all the words of Maharari'a's mouth, in accordance with halacha with Rashi and Semag, in my humble opinion, etc. Shulchan Aruch.`,

  "ateret-zekenim|14|_": `It is customary to wrap in the first space seven. {Rama: On this.} And in R. Shlomo Malko's tzitzit, in the first space there were five windings, in the second six windings, in the third five, and in the fourth ten windings, corresponding to the number of the four-letter Name (thus Kanfei Yonah). One must make two holes in a small tallit specifically, but not in a large one so he not be among those who astonish; only beneath his belt he should make two holes because it is covered. And one must make two holes one next to the other like the form of tzeirei, not one atop the other like the form of shuruk (R. Yehuda Luria, per truth). In the second space one needs eight windings, as it is said "Tal orot, talecha orot" — in gematria tzitzit; and eight threads and five knots, meaning T-L (29) windings for tzitzit, as above.`,

  "baer-heitev|1|_": `<b>Threads spun for its sake.</b> And if a deaf-mute, mentally incompetent person, or minor spun them and an adult stands over them — see siman 560 in Magen Avraham and Taz, Shaarei Teshuvah.`,

  "baer-heitev|2|_": `<b>Twisted for its sake.</b> Even bedieved they are invalid if they were not twisted for its sake. Magen Avraham.`,

  "baer-heitev|3|_": `<b>Below.</b> And in our rabbi Shlomo Malko's tzitzit there were no knots, and Magen Avraham wrote; and I also heard that it is as adding to the knots, and especially if they are finely twisted, for it is not common that they come apart.`,

  "baer-heitev|4|א": `<b>From four thumbbreadths.</b> And they measure in the wide place in the middle of the thumb. Mordechai, Ra'avad, Magen Avraham, Eliyahu Rabba.`,

  "baer-heitev|4|ב": `<b>If both.</b> It seems to me that if one is not so long to wrap everything in it, one may wrap in it some windings from one thread and some windings from the second thread; for in the time of tekhelet they would make some windings from tekhelet and some windings from white. Magen Avraham.`,

  "baer-heitev|5|_": `<b>And the mitzvah.</b> And even bedieved invalid — Taz. At first glance it is difficult, for on this reasoning the cause is dishonoring a mitzvah — the Talmud does not raise an objection from this to Beit Hillel in Sukkah 9a, and it can be resolved per the Gemara's text in that passage: thus we require spinning for its sake, etc. And he raises against him from Shmuel, not like Rashi in that passage, as cited above, and investigate; and thereby the poskim's difficulty will be resolved — why did the Rambam rule like Shmuel against Rav — because per his reasoning and text he raises only from Shmuel, and since it appears to follow the anonymous view of the Talmud that it labored to establish Beit Hillel's view, the halacha is like Shmuel — learn from this that halacha follows Shmuel. See Baal HaMaor in that passage and in Magen Avraham seif katan 9 and in Sefer Yad Aharon siman 14 and in Beit Yosef in that passage, and investigate.`,

  "baer-heitev|6|א": `<b>Valid.</b> Because he acquires through despair and change of name. And Taz disagrees on this and ruled invalid bedieved because it is a mitzvah obtained through transgression, as cited above. <small>(And see in Eliyahu Rabbah several difficulties on Taz in this matter.)</small>`,

  "baer-heitev|6|ב": `<b>Siman 649.</b> That he ruled there that one cannot recite a blessing over it.`,

  "baer-heitev|7|_": `<b>That they do not return in their original form.</b> And if he borrowed threads to return them in kind, one does not bless over them, for they are not his; and if you ask what difference it makes — the one who lent them to him could say he thought he would do other work with them; therefore specifically threads; but properly made tzitzit, here too it is permitted. Magen Avraham.`,

  "baer-heitev|8|_": `<b>Invalid for tzitzit.</b> See Magen Avraham and in Sefer Bnei Chiya. Eliyahu Rabba wrote that wool that was on it during prostration is forbidden, and all the more what grew after, as cited above. And Bnei Chiya wrote that what grew after it was processed is permitted, as cited above, and likewise Taz siman 649 seif katan 5, as cited above; and this invalidity means even bedieved. Bnei Chiya.`,

  "baer-heitev|9|א": `<b>The tallit.</b> Beit Yosef wrote in the name of Beit Hadass that one should make two holes like tzeirei and cast the tzitzit into them and bring them out to one side, etc. And one who comes to be strict with himself in such matters is not among the stringent but among those who astonish, for it appears as arrogance — thus Beit Yosef. And Beit Hadass wrote that in a small tallit one should make two holes, for thereby it does not appear as arrogance since it is not visible at all. And likewise in Kavvanos that the Arizal practiced thus. And see Magen Avraham.`,

  "baer-heitev|9|ב": `<b>From three fingerbreadths.</b> It seems to me that if he made the hole above three fingerbreadths, although when he tied the tzitzit he made the threads on the garment short and the corners folded and it is below three — it is invalid; and likewise the reverse regarding a gedil knot — valid. Magen Avraham.`,

  "baer-heitev|9|ג": `<b>Corner.</b> And if after he affixed tzitzit on it he cut the hole so the tzitzit hang below — invalid because of taaseh velo min ha'asuy. A wool tallit that was properly affixed with tzitzit, and a silk hulya was found made at the edge of the tallit that had flax threads, and they needed to pull the hulya to detach it from the tallit — whether to invalidate this tallit's tzitzit because of taaseh velo min ha'asuy — see in responsa Ginat Veradim chelek 4 at its end, who wrote it is fit to be strict to validate the tzitzit and return and tie them, as cited above.`,

  "baer-heitev|9|ד": `<b>In a straight line.</b> See what Taz wrote, seif katan 9, on Beit Yosef; and the author Bnei Chiya jestingly defended our rabbi Beit Yosef, as cited above.`,

  "baer-heitev|10|א": `<b>Lamb.</b> Beit Yosef wrote that even a lamb's skin patch one may place around the hole.`,

  "baer-heitev|10|ב": `<b>Width of the garment.</b> The length of the garment is called what one wraps in, and its width means its stature from head to feet.`,

  "baer-heitev|11|א": `<b>It is wide.</b> See Bnei Chiya and Yad Aharon.`,

  "baer-heitev|11|ב": `<b>Without the hulya.</b> And if he made the hulya two or three fingerbreadths wide, he should cut part of it; and likewise if the warp threads protrude without woof or woof without warp — there is doubt according to Mordechai whether they count. Magen Avraham.`,

  "baer-heitev|12|_": `<b>And hide them in the corner.</b> Meaning lechatchila he should cut before hiding them. Shlah wrote, and for this reason one should not cut with a knife but bite them with his teeth.`,

  "baer-heitev|13|_": `<b>One segment.</b> Meaning that if he made one segment and one knot, he fulfills deoraita; and if so it is taaseh — and according to rabbinic law Magen Avraham. And Eliyahu Rabba — not so; and see Taz.`,

  "baer-heitev|14|א": `<b>For windings.</b> Even if he wound most of it, or did not wind in it except one segment — valid. And if he wound all of it — invalid. Beit Yosef, Magen Avraham.`,

  "baer-heitev|14|ב": `<b>Width of four thumbbreadths.</b> And in Rema, Parashat Pinchas, wrote that between knot and knot should be a full thumbbreadth. And the Rosh wrote that all segments should be equal, for this is beauty for tzitzit; and therefore in the first space he makes the windings distant from each other, in the second not so, in the third he brings them closer, in the fourth he brings them completely together; and R. Shlomo Malko's tzitzit were not completely equal.`,

  "baer-heitev|14|ג": `<b>And in two parts a branch.</b> It is clear it does not prevent bedieved. He wrote in writings that one must make the hulya segments, and in each segment three windings — meaning after making three windings he should distance slightly. Magen Avraham.`,

  "baer-heitev|14|ד": `<b>And in the second, nine.</b> And in Kavvanos wrote in the second eight; and likewise Shlah, Magen Avraham, Taz — that seven and eight is the name of Y-H, and then eleven is in combination the four-letter Name. And then thirteen is gematria echad (one), and this is Hashem Echad; and in R. Shlomo Malko's tzitzit, in the first space were ten windings and then five, etc., like the four-letter Name — Magen Avraham; and see in Knesset HaGedolah in the hagahot of Beit Yosef. <small>(And see in Magen Avraham and Levush regarding the windings.)</small>`,

  "baer-heitev|14|ה": `<b>At the end of each.</b> A thread and a knot. See above seif katan 3, Shaarei Teshuvah.`,

  "baer-heitev|15|_": `<b>For it was hanging toward the ground.</b> And bedieved kosher; but diagonally forbidden, for it is Karaite practice. Magen Avraham. See what Yad Aharon wrote in the name of Gan HaMelech.`,

  "beer-hagolah|1|א": `Menachos 42, Sukkah 17, according to Shmuel, Rif, and Rosh`,

  "beer-hagolah|1|ב": `Mordechai, chapter 5, Tzitzit`,

  "beer-hagolah|1|ג": `Rosh (Rabbeinu Asher)`,

  "beer-hagolah|10|א": `As cited in Menachos`,

  "beer-hagolah|10|ב": `Tur, from the implication of the Gemara in that passage`,

  "beer-hagolah|10|ג": `Maharari'a in the name of Semag and Nissi and Baal haItur and R. Yona`,

  "beer-hagolah|11|א": `Tur (Arba'ah Turim)`,
};

function patchFile(rel, updates) {
  const fp = path.join(OUT, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  let n = 0;
  for (const b of blocks) {
    const key = `${b.slug}|${b.seif}|${b.marker}`;
    if (updates[key]) {
      b.en = updates[key];
      n++;
    }
  }
  fs.writeFileSync(fp, blocks.map(serializeBlock).join("\n\n") + (blocks.length ? "\n" : ""), "utf8");
  return n;
}

const byFile = {
  "siman_011/ateret-zekenim/part-001.txt": {},
  "siman_011/baer-heitev/part-001.txt": {},
  "siman_011/beer-hagolah/part-001.txt": {},
};
for (const [key, en] of Object.entries(EN)) {
  const slug = key.split("|")[0];
  const rel =
    slug === "ateret-zekenim"
      ? "siman_011/ateret-zekenim/part-001.txt"
      : slug === "baer-heitev"
        ? "siman_011/baer-heitev/part-001.txt"
        : "siman_011/beer-hagolah/part-001.txt";
  byFile[rel][key] = en;
}

let total = 0;
for (const [rel, updates] of Object.entries(byFile)) {
  total += patchFile(rel, updates);
}
console.log(`[patch] siman 011 part 1: ${total} blocks updated`);
if (total !== Object.keys(EN).length) {
  console.error(`Expected ${Object.keys(EN).length}, patched ${total}`);
  process.exit(1);
}
