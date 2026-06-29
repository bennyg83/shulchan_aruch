#!/usr/bin/env node
/** Auto-fix + hand fixes for slot16 need blocks simanim 613-622 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot16-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "slot16-need-613-622.json"), "utf8")
);

/** Strip legacy footnote tails from mechaber-style EN */
function stripFootnoteTail(en) {
  let t = String(en ?? "").trim();
  // Drop from first inline footnote number or Hebrew leak
  const cuts = [
    /\s+\d{1,3}\s+The\s/,
    /\s+\d{1,3}\s+[A-Z][a-z]+,\s/,
    /\s+\(\s*see\s+footnote/i,
    /\s+ibid\s*\./i,
    /\s+For\s+[A-Z][a-z]+\s*,\s*see\s+footnote/i,
    /[\u0590-\u05FF]/,
    /\s+161a\s/,
    /\s+168\s+/,
    /\s+97\s+When\s/,
    /\s+100\s+The\s/,
    /\s+152\s+The\s/,
    /\s+185\s+/,
    /\s+199\s+/,
  ];
  let best = t.length;
  for (const re of cuts) {
    const m = t.match(re);
    if (m && m.index > 40 && m.index < best) best = m.index;
  }
  if (best < t.length) t = t.slice(0, best).trim();
  t = t.replace(/\s*\(\s*Hagah\s*:/gi, " {Rama:");
  t = t.replace(/\{Rama:\s*Hagah\s*:/gi, "{Rama:");
  t = t.replace(/\s+Hagah\s*:/gi, " {Rama:");
  return t.replace(/\s+/g, " ").trim();
}

/** Per-block manual overrides (rel -> key -> en) */
const MANUAL = {
  613: {
    "beur-hagra/part-001.txt": {
      "10:_":
        'Siman 613 regarding a bride, etc. The sugya follows R\' Eliezer, and see Magen Avraham note 12 who writes "and it requires study," etc. But certainly here in the Gemara it implies like the explanation of the Rosh there, and likewise in Shulchan Aruch Yoreh De\'ah.',
      "4:ב":
        'They are accustomed, etc. See in Berachot 16b and Tosafot there s.v. aninus, etc., and one could say, etc., and the same applies here even according to what the Rosh writes here in the name of R\' Yitzchak that other afflictions are d\'rabbanan, and the Bach writes that even the Geonim did not permit for an istenis except when there is dirt on his face.',
    },
    "eliyah-rabbah/part-001.txt": {
      "7:_":
        '(7) Up to the hips, etc. It is difficult — for in Yoma 77a "and he passed me up to the hips" implies that until one reaches the hips it is permitted, and only above is forbidden as Rashi explains there. Taz and Magen Avraham also printed later and raised this difficulty as well; see there. It is possible that the Shulchan Aruch was stringent out of danger to life because it cannot be limited so precisely; yet it is difficult that the Beit Yosef wrote that this is so in the Gemara. Therefore it appears to me that in the Gemara it refers to what was said "up to the ankles, up to the knees," counting from below upward, whereas in the Beit Yosef and Shulchan Aruch it refers to the law of up to the neck, counting from above downward — examine this. And the main law here requires study for me on the Beit Yosef and Shulchan Aruch and the later authorities: what the Gemara means by "a stream is different because the water flows" refers specifically to the stream issuing from the Holy of Holies, as the Gemara says there that even boats cannot go there; and this is implied by Rashi\'s explanation there, with support from Ri\'f, Rambam, and all poskim who wrote plainly that one may pass up to the neck without distinguishing — and likewise from the conclusion of the Gemara there — examine this.',
    },
    "machatzit-hashekel/part-001.txt": {
      "12:_":
        '(Note 12) A bride, etc., and it requires study. Rashi in Ketubot writes, etc., that we learn in Yoma that on Yom Kippur washing is forbidden, etc., and the king and bride may wash their faces. We say on this (Yoma 78b): a bride — why? So she not become repulsive to her husband. Rav said to R\' Chiyya: how long? He said: as we learn — we do not withhold ornaments from a bride for all thirty days. Rashi explains: we do not withhold, etc., when the feast was prepared and the father of the groom or mother of the bride died, etc. — thus for all thirty days she needs adornment. From this it is clear that "we do not withhold ornaments" does not refer to the preceding case, but as the Rosh explains in Ketubot 4a — it is a separate matter: we do not withhold ornaments from a bride who suffered mourning within her thirty days of marriage, and she adorns herself as a bride even within the seven days of mourning so as not to be repulsive to her husband, for all thirty days of marriage are a time of joy for groom and bride and she must not disfigure herself, and mourning does not apply to these matters at all. Therefore R\' Chiyya properly proved that until thirty days she is called a bride and may wash on Yom Kippur as in mourning so she not be repulsive; but after thirty she is like all other women. Rashi in Ketubot 4a writes otherwise — "we do not withhold" for all thirty days even though they are days of mourning for others, and all the more so after thirty — and see the Rosh, implying that even after burial when mourning begins we still do not withhold ornaments from the bride for thirty days so she not be repulsive, and all the more after thirty when mourning is lighter. Therefore what we learn "we do not withhold for all thirty" means thirty days from burial — hence Magen Avraham\'s difficulty: what proof from there that only until thirty is she a bride, since there she is permitted even after thirty as above. I saw in Shulchan Aruch with Beur HaTov on Magen Avraham\'s view; see Mordechai Moed Katan who raised this on Rashi and answered there. Mordechai Moed Katan 324: we learn in Ketubot ch. 1, "one whose feast was prepared," etc., Rashi — all the more after thirty; ornaments implies even removing hair as in Moed Katan ch. 1, and we ask from Yoma, etc., and explain there — bride, until when? as we learn "we do not withhold" — thus until thirty permitted, then no longer a bride, and the same for all women. One could say this applies only to Yom Kippur, but for mourning since permitted within thirty, which are the main mourning days, all the more after thirty — so one could explain Rashi. Still it is difficult for R\' Chiyya from Ketubot, which implies all the more after thirty as Mordechai already settled. But whence for R\' Chiyya that specifically until thirty is "bride" and no more? Perhaps R\' Chiyya holds it is obvious that after thirty she is like all women and they did not lighten for her on Yom Kippur, and he needed proof only that until thirty she is a bride and we are concerned she not disfigure — as Rashi\'s wording in Yoma implies ("thus all thirty need adornment") — so he brought proof from mourning; though mourning is lighter (permitted even after thirty), within thirty, the main mourning days, they nonetheless lightened because she needs more adornment; thus although mourning is d\'rabbanan, from it we derive Yom Kippur, for whatever the Sages enacted they enacted similar to Torah law.',
    },
    "magen-avraham/part-001.txt": {
      "6:א":
        '(א) On a boat. Bach / Knesset HaGedolah writes that a Torah scholar is permitted as stated in the chapter "they suspend" — but this is not precise, for there it is specifically through an artifice, as stated at the end of siman 339; see Beit Yosef there.',
    },
    "mechaber/part-001.txt": {
      "11:main":
        "One who experienced a seminal emission at the present time on Yom Kippur — if it is moist he wipes it with a cloth and ink; if dry, or if it became soiled, he washes only the soiled places and prays. It is forbidden to wash his body or immerse, even if on other days of the year he is accustomed to immerse before prayer.",
      "12:main":
        "At the present time it is forbidden for a woman to immerse on Yom Kippur, even if her time for immersion arrives on that very day.",
      "2:main":
        "A person washes his hands in the morning and recites the blessing on netilat yadayim, and should be careful to wash only up to the knuckles of his fingers. {Rama: He must not intend enjoyment of washing, only to remove the evil spirit from the hands (Hagahot Maimoniyyot).}",
      "3:main":
        'If one urinated and rubbed his hands, or relieved himself and wiped, he may wash because his hands are dirty (and he washes up to the knuckles). If he wishes to pray, even without wiping he may wash up to the knuckles. {Rama: Likewise a kohen ascending the duchan washes his hands even if clean, for most washing not intended for pleasure is permitted (Hagahot Maimoniyyot ch. 2 of Hilchot Yom Kippur and Maharil); therefore even if he comes from the road and his feet are dirty he may wash them (Beit Yosef in the name of Hagahot Maimoniyyot, Semag, and Tur Hilchot Tishah BeAv).}',
      "9:main":
        'It is forbidden to cool oneself in moist mud if he moistens it in order to re-moisten it, and forbidden to cool oneself in vessels containing water even if they are not full, whether of earthenware or metal; but if empty it is permitted, and likewise with fruits and an infant. {Rama: It is forbidden to soak a cloth during the day and make it like dry vessels to cool oneself with on Yom Kippur, lest it not dry well and lead to squeezing (Hagahot Maimoniyyot ch. 2, Mordechai, Semak, and customs). A sick person washes as usual even if not in danger (Rambam).}',
    },
    "turei-zahav/part-001.txt": {
      "5:ב":
        'Provided he does not take out, etc., so he remembers and does not come to wringing. The Tur writes, and Hagahot Maimoniyyot write, specifically up to the neck, but beyond the shot (current) is forbidden — and it is astonishing: if they permitted the severe washing based on a verse, all the more this lighter mode. Beit Yosef answers that washing forbidden only on Yom Kippur they permitted, but for the current, forbidden all year, they did not permit; likewise Maharshal. I wonder at the Tur, who holds that in truth one may ford a current every Shabbat to go to his rabbi, deriving by kal vachomer from Yom Kippur washing, which is stricter — so the lighter ford should be permitted on Yom Kippur and every Shabbat for one\'s rabbi, as they permitted passing through water every Shabbat for a mitzvah (siman 301:5). It seems to answer the Tur\'s difficulty: washing can be done with a change — not taking the hand from under the garment, which is noticeable — unlike fording where no such distinction applies, and there is a decree lest one make a mariner\'s barrel as above.',
    },
  },
  614: {
    "beur-hagra/part-001.txt": {
      "2:ג":
        '(ג) Even of wood, etc. Rashi\'s view: R\' Meir and R\' Yehudah disagree on a patch in a shoe — shoe or not-shoe — as in Shabbat and Yevamot; though in Yoma Rava said all agree it is a shoe, Razah in HaMeor says that dispute remains; though Rava himself in Yevamot from the first part of R\' Meir means according to the early amoraim — and Razah writes that since it is a dispute we rule stringently everywhere: for chalitzah it is not a shoe, on Yom Kippur it is a shoe — unlike R\' Yehudah ben Levi who went out in a sandal of hay. He is challenged: Rava went out in diblei, etc. — see his long analysis of Rashi, Tosafot, Ramban, Rashba, and the conclusion like R\' Yehudah and Rivan; see Machlomet there.',
    },
    "chokhmat-shlomo/part-001.txt": {
      "1:_":
        'Seif 1: It is forbidden to anoint even part of the body, etc. NB: whether smelling fragrance on Yom Kippur is permitted — see Shelah who forbids and Magen Avraham brings proof in siman 46 that it is permitted. In my view proof can be brought for those who forbid from what we say on Shabbat: "for the sanctity of Hashem, honored" — this is Yom Kippur with no eating or drinking; the Torah said honor it with clean clothing. One could ask why clean clothing — perhaps with fragrances, for we say in Berachot and Shulchan Aruch 217 and 288 that we do not bless on fragrances of the dead only when placed above the bed, but below we bless, for honoring the living — thus honor applies to fragrance too, and "for the sanctity of Hashem, honored" means honor with fragrance to smell. It would seem forbidden on Yom Kippur — examine. Also difficult why not explain "honor" with candles as poskim do — one could say since Yom Kippur is compared to Shabbat ("call Shabbat a delight… for the sanctity of Hashem, honored"), on Shabbat obligation of delight is day and night, and we hold honor of day is stricter than night — so on Yom Kippur one must honor by day too, but candles are useless by day; still we need similarity to Shabbat where one is obligated to delight at home, where lighting by day is irrelevant — therefore cannot explain with candles, only clean clothing which applies day and night to each person. With fragrance, applicable to each individual at home, it is hard why not explain with fragrance — therefore it seems forbidden to smell on Yom Kippur; one could answer that clean clothing is also honor, so why not explain fragrance over clothing — but since neither outweighs the other, the verse should mention fragrance too and obligate fragrance — since it does not mention fragrance, it implies smelling fragrance on Yom Kippur is forbidden — therefore can only explain clean clothing — examine. (Same seif) But if ill without danger, or scabs on the head — permitted. NB: do not ask that from Yom Kippur side it is permitted yet from Shabbat healing prohibition it should be forbidden — healing on Shabbat is forbidden (siman 327) and likewise Yom Kippur; one could say as we hold (328) for healing without danger one tells a gentile who does it — perhaps here via gentile; if anointing for pleasure it is Torah prohibition even via gentile; if from Yom Kippur side even non-pleasure anointing is Torah prohibition and all Torah prohibitions even via gentile are forbidden without danger — but here it teaches that from Yom Kippur it is permitted when not for pleasure, prohibition only from Shabbat healing — and even if done oneself there is no Torah labor, only rabbinic shevut and grinding spices decree — therefore permitted via gentile as shevut deshevut in pain or partial illness (Magen Avraham 307). Also from Rashba (Shulchan Aruch Moed Katan) sometimes they were lenient on Yom Tov shevut when uncommon and bodily pain — proof from Yevamot that on Shabbat with stoning they decreed, on Yom Tov with lav they did not — likewise Yom Kippur with only karet they did not decree on shevut and bodily pain, only on Shabbat with stoning — examine. This settles Beit Yosef and Bach whom Magen Avraham wondered about (siman 497). I wrote this only because I heard a scholar erred in his book. Also from Rashba: Yom Kippur shevut is lighter; Magen Avraham\'s explanation there supports this. See also Maharal of Lisbon\'s siddur and my Avodat Yisrael 244 on Yom Tov shevut — examine well.',
    },
    "eliyah-rabbah/part-001.txt": {
      "1:_":
        '[1] [Levush] that anointing is not like washing, etc. I do not know his source; also on Magen Avraham it is difficult that he wrote "requires study" — why is it different from washing, where one may remove filth? One could say anointing is more pleasure. Whence his certainty that washing is permitted? Why not mention clothing? However in Shibolei HaLeket in the name of the Yerushalmi it implies permission for washing when not for pleasure, and anointing is forbidden — see there.',
    },
    "machatzit-hashekel/part-001.txt": {
      "3:א":
        '(Note 3) And it is permitted, etc., sometimes, etc., from Shulchan Aruch\'s wording and likewise from responsum Terumat HaDeshen 149 it implies permitted for everyone; Terumat HaDeshen also brings Mordechai\'s words. It should be said Mordechai\'s intent is also to permit for everyone, because some are cold, some find cold hard by nature — therefore permitted for everyone, as presumably one standing on pillows needs it and does not intend pleasure.',
    },
    "mechaber/part-001.txt": {
      "2:main":
        'It is forbidden to put on a sandal or shoe of leather, even with only a heel patch and the like; even of wood covered with leather is forbidden; but of reed, straw, cloth, or other materials is permitted, even to go out in them in public thoroughfares. {Rama: One may stand on pillows and cushions of leather; nevertheless one who is stringent is blessed (Mordechai Yoma and Terumat HaDeshen 149).}',
    },
    "turei-zahav/part-001.txt": {
      "4:א":
        '(א) Everyone is permitted, etc. To explain this we copy the need here and the true law will be stated, with Heaven\'s help. Hagahot Maimoniyyot writes: regarding shoe-wearing, where one is delicate or must go to a ruin, or take out a Torah scroll to read publicly, or knead bread for a child, or take out clothing, or any daily need, and he is afraid to enter without shoes because of scorpions — he may wrap something on his feet, or put on gaiters and accomplish his needs; Shmuel said if because of scorpion danger it is permitted; likewise for being delicate he may put on gaiters, for R\' Yehudah went out in felt shoes; but shoes, whether delicate or not, are forbidden — end quote. He questions permitting wrapping, etc. — whence forbid since it is not a shoe, and they say in the Gemara we do not care about pleasure when it is not a shoe; if Hagahot Maimoniyyot teaches we do not care about pleasure, why mention scorpion danger — otherwise permitted for everyone due to pleasure? His words are explained per Ran: Ramban was asked much on those who went out in these types — since not a shoe they are a burden; Ran answers only on Shabbat where shoe-wearing is permitted are these types a burden, not on Yom Kippur where they are like a shoe not a burden — therefore Hagahot Maimoniyyot\'s three categories: shoe always forbidden on Yom Kippur in all cases; what is normal dress like cloth leggings or cloth shoes is permitted for everyone since not a shoe and not a burden as normal dress; one who wants to wrap on his feet — not normal dress — or wear gaiters — not a shoe and not normal to wear except to protect from scorpion when walking — Hagahot Maimoniyyot teaches not a burden, like Ran\'s conclusion on Yom Kippur. Hagahot Maimoniyyot permits in two cases not considered burden: delicate person insufficient with soft leggings/shoes (Rosh: softest of types in Gemara; delicate needs harder like a shoe); or must go to scorpion place where soft leggings fail — needs hard wrapping, with need to travel for mitzvah or necessity that day — may wrap hard, not a burden; likewise gaiters not normal dress like shoe — permitted due to delicacy or scorpion when forced to travel — proof from Shmuel in Gemara: animal may wear shoe for cold — Shmuel: if scorpion danger permitted — why say permitted? should say Shmuel — Shmuel means a novel permission not to count as burden even not normal dress, permitted for danger; likewise delicacy — not only danger: if delicate, hard wrapping permitted though not dress — proof R\' Yehudah in felt; greatness of other types in Gemara; Gemara: Rava wrapped a scarf on his feet and went out — why "wrapped" not "went out" like others? with scarf no greatness if like leggings; greatness is wrapping not as dress yet permitted, unlike other amoraim — Hagahot Maimoniyyot concludes shoes even for delicate forbidden, same for scorpion — Tur summarizes Hagahot Maimoniyyot\'s danger/delicacy split and disagrees: where scorpion danger, even actual shoe permitted even without mitzvah — repeats twice because Hagahot Maimoniyyot\'s two cases: gaiters (dress-like but not normal to go out) and foot-wrapping (not dress at all) — both: no concern at all, whether actual shoe or dress, all permitted for danger; explains Shmuel like animal in shoe. Tur did not mention delicate dispute in Shmuel since only danger mentioned. Maharshal labored on Hagahot Maimoniyyot; Tur\'s emendation far from him — Heaven forbid Tur permits shoe for mitzvah without danger or delicacy — no proof; correct text as before Beit Yosef. Summary: no permission to wear a shoe even for mitzvah; cloth leggings/shoes permitted without doubt; if scorpion danger and must go there, Hagahot Maimoniyyot permits only wrapping hard on feet, not burden on Yom Kippur like shoe-place; same for delicate; Tur disagrees on danger — permits actual shoe — we rule thus; Rama permits going from house for mud on feet in rain, not ordinary dirt — Noda B\'Yehuda: entering bathroom seeing feet will soil — forbidden to wear shoes, not concerned about later washing — only where no definite soiling; certainly not stricter than rain — many wrongly wear shoes in street and remove only in synagogue while standing — sinners if they ignore their teachers.',
    },
  },
};

// Merge manual + strip for each need item
const bySiman = {};
for (const item of need) {
  const s = item.siman;
  if (!bySiman[s]) bySiman[s] = {};
  const rel = item.rel;
  const key = item.key;
  let en =
    MANUAL[s]?.[rel]?.[key] ??
    (item.slug === "mechaber" && item.marker === "main"
      ? stripFootnoteTail(
          JSON.parse(
            fs.readFileSync(
              path.join(__dirname, "work", `hand-slot16-siman-${s}.json`),
              "utf8"
            )
          ).items.find((x) => x.rel === rel && x.key === key)?.enBad
        )
      : null);
  if (!en) continue;
  if (!bySiman[s][rel]) bySiman[s][rel] = {};
  bySiman[s][rel][key] = autoFix(en, item.marker, item.he || "");
}

for (const [s, fixes] of Object.entries(bySiman)) {
  const out = path.join(__dirname, `_fixes-siman${s}-need-slot16.mjs`);
  fs.writeFileSync(
    out,
    `/** worker-slot-16 need fixes siman ${s} */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
    "utf8"
  );
  console.log("wrote", out, Object.values(fixes).reduce((n, o) => n + Object.keys(o).length, 0));
}
