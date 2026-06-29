#!/usr/bin/env node
/** worker slot 3 — siman 414 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_414/mechaber/part-001.txt": {
    "1:main":
      "One may only make an eruv with his consent. Contains 2 seifim. One may not make an eruv techumin for a person except with his consent — for perhaps he does not wish to make eruv in that direction that this one wished — except for his minor son and daughter, even if they are not dependent on his table, and his Canaanite manservant and maidservant, even if they protested against making eruv for them and even if they made another eruv themselves, it is nothing. But for his adult son and daughter, even if they are dependent on his table, and his Hebrew manservant and maidservant, and his wife — he may only make eruv for them with their consent. And if he made eruv for them and they heard and were silent and did not protest, they may go out by virtue of his eruv. But if they protested or they made another eruv for themselves, his eruv is not an eruv for them.",
    "2:main":
      "A child of six years or less goes out by virtue of his mother's eruv, and one need not place food for two meals for him separately.",
  },
  "output/siman_414/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) In that direction — so as not to lose thereby the two thousand amot on the other side from his house, as explained above in siman 408.",
    "1:ב":
      "(2) Even if they are not dependent — and the reason is that we hold one makes eruv only for a mitzvah matter, and therefore he always makes eruv for them — that is, he transfers ownership to them through another of the eruv in order to educate them in mitzvot.",
    "1:ג":
      "(3) The Canaanite servants — because their hand is as his hand.",
    "1:ד":
      "(4) And they heard and were silent, etc. — for presumably the servant and maidservant agreed to the will of their master, and so the children to their father, and the wife to the will of her husband; and even if he did not inform them of the eruv until after nightfall, it also helps, even though the time of eruv acquisition is bein hashemashot — because presumably the eruv stands to be upheld, as is written, and not to be annulled.",
    "1:ה":
      "(5) But if they protested — meaning immediately when they heard — excluding when they were silent and afterward protested, for their protest does not help; for as soon as they were silent it is as admission that they agree to his action and the eruv was upheld. And all this is specifically when they heard after nightfall and were silent; but if they heard at midday and were silent and protested before nightfall, the eruv was annulled, since at the time of eruv acquisition, which is bein hashemashot, there was already protest.",
    "1:ו":
      "(6) Or they made eruv, etc. — even if their eruv was after his eruv, since they made eruv there is no greater protest than this, and they go in the direction they made eruv.",
    "2:א":
      "(7) Six years — but if he entered within seven, even one day after, he must make eruv for him by himself and he does not go out neither by his mother's eruv nor his father's. And behold Shulchan Aruch ruled anonymously here like the poskim that until six years, six is included among those who go out by their mother's eruv, without distinction whether his father is in the city or not. However, in Acharonim it is sided like the view of several poskim that if his father is in the city, even a four-year-old or five-year-old [if he is not so sharp] does not go out by his mother's eruv because then he is not so drawn after his mother — unless the transfer was on his behalf.",
    "2:ב":
      "(8) By his mother's eruv — for until that time he is attached to her and is as her body. And even though one makes eruv only for a mitzvah matter and a minor is not subject to mitzvah, nevertheless since it is impossible for him without his mother he goes out with her. And if not his mother but his father made eruv, he does not go out by his eruv. And it appears to me that even if his father transferred ownership for him too it does not help, for until that time his mother's companionship is better for him and she — behold — did not make eruv for that purpose.",
  },
  "output/siman_414/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin daf 81.",
    "1:ב": "Baraita there 82.",
    "1:ג": "Raosh there.",
    "1:ד": "As cited there.",
    "1:ה": "Baraita, Raosh.",
    "1:ו": "There and there baraita and in the Gemara there.",
    "2:_":
      "Gemara there daf 82, and Rav Ashi, Rif, Rambam, Semak, and Semag.",
  },
  "output/siman_414/biur-halacha/part-001.txt": {
    "1:א":
      "The minors — Shulchan Aruch refers when they are more than six years old, for until that time they are dragged after their mother [and it depends on her whether she made eruv or her husband made eruv for her — the infant is also permitted] as below in seif 2.",
    "1:ב":
      "Even if they are not dependent — even per the one who says in siman 366 seif 1 that a minor who is not dependent on his table is not relevant regarding his father and he can acquire through him — here it is different, and the reason is as I wrote in Mishna Berurah; and so what he wrote below regarding an adult son even if dependent — meaning even per the one who says there that since he is dependent on his table he is cared for regarding his father and cannot acquire through him — nevertheless here regarding eruv, when he protests, the father cannot make eruv on his behalf.",
    "1:ג":
      "It is nothing — meaning his eruv that he placed for them is valid in order to educate them in mitzvot, and not what they placed — their eruv toward another side. And it appears to me that even though in the baraita he equates minor children to Canaanite servants regarding eruv, nevertheless sometimes there is a distinction between them — namely, if the father did not place any eruv and another placed eruv for them toward some direction, his eruv is valid — not so regarding servants, since they are subjugated to him to go and serve him in the place he walks, and he does not want what was placed toward the other side [for therefore they cannot walk beyond his house at all] — their eruv does not take effect.",
    "1:ד":
      "The Hebrew servants — see below that even if they did not agree explicitly but heard and were silent, and even if the hearing was after nightfall, it also helps as the poskim wrote, because presumably they agreed to what their master did. And I am uncertain whether the same applies regarding a hired servant in our times — for it is possible specifically a Hebrew servant and a Hebrew maidservant because their body is owned by their masters, but a hired servant perhaps is like any other person that we require specifically that one inform him while it is still day, as written in siman 413.",
    "1:ה":
      "He may only make eruv for them with their consent — and know that even if they agreed explicitly to his eruv that he placed for them, it is entirely ineffective, for the eruv has not yet left his authority unless he transferred ownership to them in the eruv through another, or raised it himself. And unfortunately many people stumble in this and think that since the homeowner placed the eruv, all household members are permitted to walk on that basis.",
  },
  "output/siman_414/magen-avraham/part-001.txt": {
    "1:_":
      "Even if they are not dependent. In order to educate them in mitzvot, for one makes eruv only for a mitzvah matter — see siman 366 seif 1.",
    "2:א":
      "Or less. And in siman 640 seif 2 it implies that if he is sharp and does not need his mother, even a five-year-old does not go out by his mother's eruv.",
    "2:ב":
      "Goes out by his mother's eruv. Even though one makes eruv only for a mitzvah matter and a minor is not subject to mitzvah, nevertheless since it is impossible for him to be without his mother he goes out with her. Or alternatively, in a minor too mitzvah is relevant in order to educate him (Tosafot). And therefore specifically a minor who has understanding to whom education applies — see siman 649 and siman 348 seif 21.",
  },
  "output/siman_414/eliyah-rabbah/part-001.txt": {
    "1:_":
      "And if they did not protest they may go out, etc. — even if he did not inform them until after nightfall. And it appears that after nightfall, whoever did not protest immediately when they heard cannot protest afterward; but when they heard before nightfall, even if they protest immediately they can retract and agree before nightfall. And the same law applies when they did not protest immediately — it is possible they can protest afterward, as long as it was before nightfall.",
    "2:_":
      "Minor, etc. — also Shulchan Aruch ruled anonymously and it implies even if the father is in the city, and I would go according to Beit Yosef that Raosh and Tur alone ruled that when the father is in the city he is not dragged after [mother]. But I saw in Avodat HaKodesh daf 36 and R' Yehonatan and Rabbeinu Yerucham and Riaz and Shiltai Gibborim that they ruled like Raosh, and so is proved from Tosafot daf 82 s.v. ad, etc., and so is proved from the sugya of the braita that also for R' Yochanan and Resh Lakish we say until six and six is included — study and understand — and not like Beit Yosef. And further I found in Kesef Mishnah chapter 6 of Sukkah that he ruled plainly and explained thus Rambam's words, and even though there is wonder that it contradicts — and what Beit Yosef wrote here that Rambam disagrees — nevertheless it is great proof to rule like Raosh. And further the book Kesef Mishnah is known to have been composed after Beit Yosef's book. However, as long as he is not more than four complete years, even if the father is in the city he is dragged after mother. If more than seven, if he is sharp and healthy he is not dragged. If more than five, even if he was sick or not sharp he is not dragged since the father is in the city — and so is implied in Avodat HaKodesh and R' Yehonatan and Shiltai Gibborim there. And it appears to me all this is when the mother did not transfer ownership to the minor in eruv, but when she transferred for him, even if the father made eruv for him he is dragged after her even at six years — so it appears to me R' Yochanan and Resh Lakish's answer does not disagree with R' Yehoshua on this — study and understand.",
  },
  "output/siman_414/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] Perhaps he does not wish to make eruv in that direction, etc. — for perhaps he does not wish to gain the two thousand amot on this side in order to lose the two thousand amot opposite — Tur, Levush.",
    "2:_":
      "(2) There. Except for his minor son and daughter, etc. — and the reason is because one makes eruv techumin only for a mitzvah matter, especially in siman 413 afterward; and since one makes eruv only for a mitzvah matter and he is pleased to educate them in mitzvot he can make eruv for them against their will — Beit Yosef and Levush.",
  },
  "output/siman_414/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) Even, etc. — in order to educate them, etc. — see siman 366 — meaning even though there one says that a minor who is not dependent on his father's table is called adult, nevertheless Raosh wrote that here he agrees the law of a minor applies to him, and his words: the reason for minors is to educate them in mitzvot, and here too there is education, for one makes eruv only for a mitzvah matter — end of his words — meaning at any rate regarding the law of education he is dependent on his father.",
    "2:_":
      "(s.k. 2) Or less, etc. — and in siman 640 seif 2, etc. — for there he wrote a minor who needs his mother is exempt from sukkah, and a five-year-old when he is sharp is liable in sukkah by virtue of education. Yerushalmi compares eruv to sukkah — see there in Rav Yaakov Emden.",
  },
  "output/siman_414/baer-heitev/part-001.txt": {
    "2:_": "Six years. See Taz in siman 640 seif 2 — see there. And see Magen Avraham here.",
  },
  "output/siman_414/chokhmat-shlomo/part-001.txt": {
    "1:_":
      "Seif 2: A minor of six years or less goes out by his mother's eruv. N.B. See in Magen Avraham what he wrote, and in siman 640 seif 2 it implies if he is sharp and does not need his mother, even when he is five years old he does not go out by his mother's eruv. And it is wondrous on him, for behold this is the Gemara's challenge in Eruvin daf 82a — and why does he not answer there that here is a sharp minor, here is a minor who is not sharp — see there. Also on the body of the Gemara it is difficult — why does he not answer that a minor of four and five is uncertain whether he needs his mother, and from six and above certainly he does not need his mother, but from four and five until six there are some who need their mothers and some who do not — therefore in sukkah where the essence is d'oraisa they were stringent on this, but in eruv techumin where the essence is d'rabbanan they were lenient. Also difficult on the poskim — behold the Gemara there concludes to distinguish whether the father is in the city or not — and why did they not distinguish thus in Shulchan Aruch? However I looked in Acharonim in the name of Beit Yosef and saw that Beit Yosef already sensed this, but the first difficulties are hard and requires further study — study well. Finished with God's help the first part of Shulchan Aruch Orach Chayim, light for the third day that was doubled in it — for it is good to order and strengthen yourselves and take from the fruit of the land — may laughter fill our mouths — for the first time, the twenty-fourth, who awaits the mercies of heaven; for He will pour upon me the abundance of His blessing full handfuls, and I will merit soon to complete and finish the second part of Shulchan Aruch Orach Chayim. Amen and amen.",
  },
};

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
  /\bstrike in\b/i,
  /\bCapernaum\b/i,
  /&quot;/,
  /\bthere in the\b/i,
  /\bAccording to the\b/i,
  /\bin me\b/i,
  /\bDarbanan\b/i,
  /\bhand recoils\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bShield of Abraham\b/i,
  /\bSaturday\b/i,
  /\bher age\b/i,
  /\bthe craft\b/i,
];

let total = 0;
const risks = [];

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) {
            risks.push({ file, key, pattern: re.source });
          }
        }
        if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_shem_note" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n);
  total += n;
}

console.log("TOTAL", total);
if (risks.length) {
  console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
} else {
  console.log("PREFLIGHT_RISKS none");
}
