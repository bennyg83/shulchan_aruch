#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_103/machatzit-hashekel/part-001.txt": {
    "2:_":
      "(s.k. 2) Behind him, etc. — for when he turns his face, it must appear, etc.; and Magen Avraham wrote in the name of the Mahari Abuhav that one should not distance to the sides either; and these are his words: the matter is simple — for to the sides, since his face is not directed against the place where he began to pray literally, it is like one who pauses entirely, that he has no intent to return to his prayer — until here.",
    "3:א":
      "(s.k. 3) And one says, etc. — but the walking that he needed to go after him four cubits is not considered such an interruption as speech; therefore, even though he already paused through walking, it was not fitting to permit him to say \"Master,\" which is a greater interruption; therefore Rashi had to explain \"paused and standing\" on account of the wind that came out, and this pause is equivalent to speech.",
    "3:ב":
      "As written in siman 104, seif 1, who wrote that if it is possible for him to veer from the path, he should veer and not pause in speech — behold, walking to veer from the path is preferable and is not as much of an interruption as speech. And also in Magen Avraham, s.k. 3 there, he wrote that we do not find walking called an interruption anywhere.",
  },
  "output/siman_103/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] And he returns, etc. — apparently it implies that since he did not write here that one should say \"Master,\" as he wrote in seif 2, therefore in this case one does not say \"Master\"; and so the Perishah deduced explicitly and wrote the reason: because he does not go backward, it is not apparent and known to people, and there is no need for apology to say \"Master\" — until here. But I found in Sefer Tzede Lador, page 47, that he ruled plainly that one says \"Master\" here too; and per this one must say that the Gemara in Berachot 24 brought the matter up, and in truth it refers also to when wind comes out — see there and examine well. And per this there is no doubt that Tur and the other poskim follow the Gemara, and they wrote at the end that one says \"Master,\" and this refers also above.",
    "2:_":
      "[2] He walks four cubits behind him, etc. — but before him or to the sides it is forbidden. And see in Beit Yosef the reason; and Maadanei Melech wrote that before him it is forbidden, for it is like those who sent the incense to their nose, as mentioned in Yechezkel.",
  },
  "output/siman_103/baer-heitev/part-001.txt": {
    "1:_":
      "And prays. Meaning to the place he paused, even if he waited in order to finish it entirely — Magen Avraham. And Peri Chadash ruled that if he waited in order to finish it entirely, he returns to the beginning — see there. And if it is possible to strain himself to refrain from sneezing, he is permitted; and there is no concern of \"do not make yourself disgusting,\" for with mere passing gas we do not say thus. Terumat HaDeshen and Atzei Zahav and Magen Avraham.",
    "2:_":
      "The worlds. Within the prayer, for it is paused and standing already on account of the wind; therefore he may also pause and say this in the middle — Rashi. Magen Avraham — in Shelah he wrote that one should contemplate in his heart.",
    "3:_":
      "One who sneezes. Rashi explained: expels with a voice. And it appears to me: but passing gas without a voice — no. Lev Chaim. And Magen Avraham argues on him — see there.",
  },
  "output/siman_103/beer-hagolah/part-001.txt": {
    "1:_": "Berachot 24.",
    "3:_": "Berachot 24.",
    "2:ג": "Rabbenu Yonah and the Rosh",
  },
  "output/siman_103/mishnah-berurah/part-001.txt": {
    "2:ב":
      "(4) Behind him — for we require that his face be toward the place where he began to pray, to show that he still wishes to return to his prayer; and even to the sides or before him it is forbidden.",
    "2:ג":
      "(5) And he says \"Master\" — within the prayer, for it is already paused and standing on account of the wind; therefore he may also pause and say this in the middle.",
    "2:ד":
      "(6) And he returns to his place — and in Chayei Adam he agreed to the view of those who hold he should return to his place before \"Master.\"",
    "2:ה":
      "(7) To the place he paused — apparently the intent is to the beginning of the blessing where he paused, as below in siman 104, seif 5 [Levushei Serad]; and see below what we wrote there in practice in the name of the Acharonim.",
    "2:ו":
      "(8) And see above, siman 85 — meaning it is explained there that if he waited in order to finish it entirely, he returns to the beginning; and Bach wrote: specifically if the pause was on account of the sneezing and wafting odor alone, and we do not combine with this what he needs to walk after him four cubits and the return and saying \"Master\"; and so Peri Megadim.",
    "2:ז": "(9) And one should also not say — and it is better that he contemplate in his heart.",
    "3:_":
      "(10) One who sneezes — some say specifically when he expels with a voice; and Magen Avraham disagrees, that the same applies without a voice; and in this too one must distance, as stated.",
  },
  "output/siman_103/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Seif 2 — And he returns to the place he paused. And likewise above, siman 78. And see siman 104, seif 5; and requires study.",
    "2:_":
      "Magen Avraham, s.k. 2 — that when he turns his face. And even to the sides or before him it is forbidden. See in Beit Yosef.",
  },
  "output/siman_103/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] He was standing in prayer and gas came out from him, etc. — meaning not intentionally, as explained in the words of Rambam, chapter 4 of Laws of Prayer, law 11.",
    "2:_":
      "(2) There — he waits until the smell ceases and returns and prays — it implies that immediately after the smell ceases he returns to the place he paused and prays, and need not say \"Master of the worlds, You have formed us,\" etc.; and the error is as Beit Yosef wrote in the name of Terumat HaDeshen: they did not establish this formula except for one who distances from his place, for then his shame is felt — see there; and they brought our teacher, may his memory be blessed, below in the Hagahah of seif 2; and so Perishah, letter 1, per the view of Tur; and so Moharchash and Maamer Mordechai, letter 4 — except he wrote another reason and not like the reason of Perishah — see there. However, Rabbi Akiva Eiger, letter 1, wrote in the name of Sefer Tzelach that here too one says \"Master\" — see there. And it appears: since there is a dispute among the poskim, it is better not to pause in the midst of prayer; and afterward I saw that Maharsham wrote thus, s.k. 5; and so Kitzur Shulchan Aruch, siman 90, note 17.",
  },
  "output/siman_103/levushei-serad/part-001.txt": {
    "2:_":
      "(There) s.k. 4, seif 5. It appears his intent is that one should begin at least from the beginning of the blessing, and not from the place he paused.",
    "3:_": "s.k. 4. See siman 13 — that human dignity overrides a rabbinic prohibition.",
  },
  "output/siman_103/biur-halacha/part-001.txt": {
    "1:_":
      "And he returns and prays — see in Mishna Berurah and Beit HaTefillah: he cited the words of Peri Chadash that he rules one must return to the beginning; but not correctly did they cite that Peri Chadash follows his view that he rules in siman 65 like the view of the Rif, that in prayer, even without duress, one returns to the beginning; but per what we hold like the Rama there, the law is with Magen Avraham [Maamar Mordechai and Magen Giborim].",
  },
  "output/siman_103/ateret-zekenim/part-001.txt": {
    "2:_":
      "And he returns to the place he paused — and this is the view of Rambam; and some say he returns to his place first and afterward says \"Master,\" etc., and returns to the place he paused; for presumably it is a short time and is not the measure to finish it entirely; therefore if he waited in order to finish it entirely, he returns to the beginning, as stated.",
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
