#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_151/biur-halacha/part-001.txt": {
    "5:א": "To make it a path — if he will not read, or will stay there a little, as stated.",
    "5:ב":
      "To shorten his way — that one may not enter them except for a matter of mitzvah [Rambam]; and if he is going for a matter of mitzvah, it is possible that it is permitted [Peri Megadim]. And it is not clear that from the words of Rambam there is proof to be lenient, for Rambam speaks when the entry to the synagogue was on account of a matter of mitzvah — then automatically it is permitted afterward also to shorten his way; unlike here, where he entered with intent [to use] the path through the synagogue only in order to shorten his way, and the mitzvah that he intends to perform — behold, he cannot perform it even if he does not make the synagogue a shortcut; it is reasonable that it is forbidden.",
    "6:א":
      "With a long knife — Magen Avraham; and it is reasonable that one should not be stringent about this except regarding common people, who are forbidden to eat in a beit midrash, and the knife that one carries is not for the purpose of use; but a Torah scholar, who is permitted to eat and drink there, and the knife that he carries there is for the purpose of his use — it is reasonable that it is permitted, like any eating where he did not need to cover it except at the time when he finished using it and begins to bless hamotzi.",
    "6:ב":
      "Or with a bare head — even in a place where they are accustomed to go thus before ministers, for this is a lightheaded way before such a place, as if there is no awe of the Shechinah upon him; and when he has a hat on his head, he has awe and weight of head before God [Levush].",
  },
  "output/siman_151/chatam-sofer/part-001.txt": {
    "1:_": "In Magen Avraham, s.k. 15 — Tosafot. See responsa Chatam Sofer, Orach Chayim siman 144.",
    "2:_": "Deleted; and see the rulings at the end of Mahariu, siman 51.",
  },
  "output/siman_151/chokhmat-shlomo/part-001.txt": {
    "1:_":
      "Seif 11 — But in its settlement a condition does not help, etc. See what Magen Avraham questioned on this; and see what he wrote in his settlement in his novellae on Yoma, as the case of all the offices that were in the Temple — they did not have a mezuzah, on daf 14; see in my work on Orach Chayim, year 1799, what he wrote on this in its settlement, and Pilpul on the view of Rambam there — see there and study.",
  },
  "output/siman_151/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] One should not treat them lightly, etc. — One should not treat a person lightly regarding honor of the Shechinah (Mahariu). In Eliyah Zuta I wrote this in my words: I found a writing that one who sneezes in a synagogue — they do not say to him \"refuah\" — Maimonides — until here. (And in Gan Nata there was a printing error, that he wrote this in the name of Taz; and one must say Eliyah Zuta.) And now I examined and did not find this in Maimonides; on the contrary, from what is written in chapter 4 of Laws of Torah Study, and likewise in Tur Yoreh Deah, and Shulchan Aruch siman 246 — this law is on a beit midrash — it is implied that in a synagogue it is permitted, for it is written that the holiness of a beit midrash is stricter than the holiness of a synagogue. And one should not say that \"I found a writing\" is also on a beit midrash, for if so it is difficult: what is the chiddush in this on Shulchan Aruch, behold Shulchan Aruch itself wrote in Yoreh Deah as we say; also why did they write in the name of Maimonides and not mention Tur and Shulchan Aruch; and further, Kesef Mishneh and Beit Yosef wrote there that its source is from the mishnah in Elu Devarim, and there it states that Rabban Gamliel would not say \"marpei\" on account of bittul beit midrash — if so, in a synagogue, from where do we have it? And it is strained to say that it is also bittul tefilah; and further, that also in a beit midrash, Shach wrote, citing Perishah: specifically in their days, when they did not take their books outside; all the more so they did not chat; but now, in any case they are not careful — they say \"refuah,\" even though Taz there was stringent on account of honor of Torah — see there; and further, Lechem Mishneh there questioned Rambam: behold the Gemara establishes that beraita like Beit Shammai, which implies that for Beit Hillel it is permitted, and he strained to settle it. However, it appears to me to settle in the precedent of Rambam and Tur: the reason for the prohibition is on account of holiness of beit midrash — and this is puzzling, for in the beraita the reason is explicit: on account of bittul beit midrash; rather, it appears to me to settle what was mentioned above: that it is also difficult on Rabban Gamliel — how did they act like Beit Shammai; rather, it appears to me that he holds that even for Beit Hillel it is forbidden on account of holiness of beit midrash; and what the tanna teaches \"like Beit Shammai\" is on the reason that it teaches: on account of bittul beit midrash; but for Beit Hillel there is another reason: on account of holiness of beit midrash; and either way, it appears to be lenient in a synagogue, even when engaged in tefilat hamekom, where it is permitted to interrupt. And see Sefer Chassidim siman 491: one who found an item in the courtyard of a synagogue — he acquires it, and we do not say that a courtyard is for hekdesh (Agudah, beginning of Meilah).",
    "10:_":
      "[10] With a bare head, etc. — So Beit Yosef wrote on what Orach Chaim wrote: that Rambam protests going with a long knife or with one's pocket to the synagogue, etc. — these are his words; and Ri'f emended him: one need not be concerned except for bare head — until here. And this is puzzling, for nothing is mentioned in the words of Orach Chaim about bare head; and I examined Avudraham, p. 10, who cited this language; however, \"one need not be concerned except for bare\" — until here; and so in Tashbetz siman 202. And it is plain to my mind that he refers to knife and pocket: specifically when they are exposed; but when they are covered, it is permitted; and he does not deal at all with bare head. And this is a question on the authors of Shulchan Aruch, Levush, and acharonim.",
    "11:_":
      "[11] To spit, etc. — for if not, he cannot pray with kavanah; and in the Gemara, Berachot daf 63, the reason is explained to me: people are not particular about spittle like [they are] about a shoe; and per this, even after prayer it is permitted — easy to understand.",
    "12:_": "[12] That they wipe [their shoes], etc. — and on Shabbat, when it is forbidden to wipe, one puts the shoe on him until it sticks.",
    "2:_":
      "[2] And some say: in a beit midrash, etc. — meaning for Torah scholars and their students: they are permitted in a synagogue in a pressing hour; they are permitted in a beit midrash even when it is not a pressing hour, on account of bittul Torah; and for other people, or for Torah scholars who do not study in the synagogue — it is implied that they are forbidden. And specifically food and drink; but other matters — Magen Avraham wrote that even for Torah scholars it is forbidden, such as entering on account of rain, etc.; and everyone agrees on this. And further, that Torah scholars are not warned about awe of the Temple — until here. But I saw in Semak 66 that he wrote: in all of them, Torah scholars are permitted, as stated in Yerushalmi: dust of a synagogue, a library, and their students — until here. And in any case, one should not be lenient except in a pressing hour; and even to lie on a bed there, it appears permitted, as implied in Yerushalmi that Ran brought: they receive animals and vessels; but when there is a guard in the synagogue, one should not lie on a bed, as stated at the beginning of chapter Tamid — and one may distinguish. And I saw the practice that when they renovate, the administrators or gabbaim in the synagogue eat and drink there with am haaretz; and perhaps it is as if they stipulated, since it is a public need and the synagogue — as in seif 4 — and it requires study. Taz wrote: guests are permitted to eat there, as stated in siman 180 regarding Kiddush; and so Beit Yosef wrote in the name of Ramban — until here, his language. And I am puzzled: behold Tosafot wrote in Megillah daf 28 that there it speaks of a room adjacent to the synagogue, but in the synagogue itself it is forbidden; and so wrote Tosafot and Rosh at the beginning of Bava Batra; and also what he wrote that Beit Yosef wrote so in the name of Ramban is not proof, for it speaks of synagogues in Babylonia that are made conditional, that this is permitted, as is permitted with stipulation regarding an ark and holy implements in siman 154, seif 8; and in any case, lightheadedness is forbidden, as explained in seif 11.",
    "3:_":
      "[3] And one does not calculate with them, etc. — it refers to a synagogue and a beit midrash. Maharit (responsum Mabit, volume 3, letter 84): it is forbidden to slaughter inside them. And the law of a eulogy — see Yoreh Deah siman 394.",
    "4:_":
      "[4] And afterward they call him, etc. — for if they call him before he reads the verse, it appears that the main entry is to read for his fellow, and reading the verse is an escape [from that appearance] (Lechem Mishneh).",
    "5:_":
      "[5] Also sitting, etc. — Bach explained: \"sitting\" means staying; and whether standing or sitting, there is a mitzvah. And see above siman 93, s.k. 1.",
    "6:_":
      "[6] Even temporary sleep, etc. — the obligation to rebuke applies to those who do so; and all the more so those who sleep at the time when the preacher preaches — for then one sin draws another; \"remove your ear from hearing Torah\" — Shelah, daf 256; he also greatly extended mundane conversation in a synagogue.",
    "7:_": "[7] To eat, etc. — for there is no lightheadedness in it, for one may only eat bread of grain and legumes there.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}
