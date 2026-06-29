#!/usr/bin/env node
/** worker slot 3 — siman 403 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_403/mechaber/part-001.txt": {
    "1:main":
      "The law of a valley that non-Jews enclosed. If one rested Shabbat in a valley and non-Jews enclosed it on Shabbat with partitions for residence — he does not walk in it except two thousand cubits that are not all like four cubits, since he did not rest in the air of the partitions; and he may carry throughout by throwing, for he may throw even beyond the two thousand, for it is a full private domain since it was enclosed for residence. {Rama: But to carry in the normal manner beyond four cubits is forbidden, even within the two thousand (Beit Yosef in the name of Tosafot and Hagahot Ashri, chapter Mi Shehutziah).}",
  },
  "output/siman_403/beer-hagolah/part-001.txt": {
    "1:_": "Gemara Eruvin 42, and like Shmuel, as the baraita [teaches] like him.",
  },
  "output/siman_403/baer-heitev/part-001.txt": {
    "1:א":
      "Two thousand. And in siman 405 seif 6 that he walks all of it although he did not rest — there they were lenient toward him since he has only four cubits; not so here where he has two thousand in any case. Rashi.",
    "1:ב":
      "To throw — specifically objects of a person who has a different techum; otherwise it is forbidden to carry them outside the techum, as siman 397 seif 3. Magen Avraham.",
    "1:ג":
      "Within the two thousand — since he cannot carry beyond the two thousand, within the two thousand is also forbidden, for it is breached in its fullness to a forbidden place. Taz disagrees and ruled like Rashi that within the two thousand it is permitted to carry normally — see there.",
  },
  "output/siman_403/magen-avraham/part-001.txt": {
    "1:א":
      "Since he did not rest. And in siman 405 seif 6 that he walks all of it although he did not rest — there they were lenient since he has only four cubits; not so here where he has two thousand in any case (Rashi).",
    "1:ב":
      "To throw — specifically objects of a person who has a different techum; otherwise forbidden to carry outside the techum, as siman 397 seif 3.",
    "1:ג":
      "Forbidden even, etc. — since he cannot carry beyond the two thousand, within the two thousand is also forbidden, for it is breached in its fullness to a forbidden place.",
  },
  "output/siman_403/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Rested Shabbat in a valley — meaning he acquired residence there to have two thousand in every direction from his place [but to carry he has only four cubits, for it is a karmelis].",
    "1:ב":
      "(2) And non-Jews enclosed it — they made a partition around it; and we hold a partition made on Shabbat is called a partition.",
    "1:ג":
      "(3) For residence — they enclosed it to dwell within; for otherwise if the enclosure is more than beit se'atayim [seventy by seventy cubits] it is not permitted to carry in it except within four cubits, even by throwing.",
    "1:ד":
      "(4) Only two thousand — from the place where he acquired residence, for this partition does not help at all for walking.",
    "1:ה":
      `(5) Since he did not rest — meaning the partition does not help to make the whole area like four cubits except where the partitions were from daytime and he rested within them; but here at twilight it was not enclosed and he did not acquire residence in that place except for two thousand cubits — even though they enclosed with partitions on Shabbat, he may walk only his two thousand as initially. It is not comparable to siman 405: if non-Jews took him against his will outside his techum and placed him in another walled city, he walks all of it, for we regard the whole city as four cubits, even though he did not rest in the air of the partitions from daytime — for there he is outside his techum and by law may walk only four cubits; if we did not regard the whole city as four cubits he would not be permitted to walk except four cubits, as one who left the techum; therefore they were lenient toward him [since he left under duress] that the whole city be considered four cubits for him. Not so here, where he has two thousand cubits to walk in any case.`,
    "1:ו":
      "(6) And he may carry throughout, etc. — meaning although for walking the enclosure is not considered a partition because he did not rest in the air of the partitions — for carrying prohibition we do not care, since there are partitions in any case now, and we hold a partition made on Shabbat is called a partition.",
    "1:ז":
      "(7) That he may throw — specifically another person's objects whose techum reaches there from his two thousand, or ownerless objects; otherwise it is forbidden to carry them outside his techum, for vessels are like the feet of the owners, as siman 397 seif 3.",
    "1:ח": "(8) To carry normally — in the usual way, not by throwing.",
    "1:ט":
      "(9) Forbidden, etc. — the reason: since he cannot carry beyond the two thousand except by throwing, for he cannot walk there within his two thousand, carrying normally is also forbidden within his two thousand, because his two thousand are breached in fullness to a place forbidden to him for normal carrying. Know that most Poskim disagree and hold that within the two thousand, even normal carrying, is permitted, for it is not called breached to a forbidden place — the permitted place is essentially there, and only because he cannot walk there since it is beyond the two thousand he has no way to carry there except by throwing; so the Acharonim agreed.",
  },
  "output/siman_403/beur-hagra/part-001.txt": {
    "1:א": "Seif 1 — for residence. Rashi.",
    "1:ב": "Since. There; and Magen Avraham.",
    "1:ג": "That he may. There.",
    "1:ד":
      "But. Tosafot there and Magen Avraham; but Rashi disagrees, and so R' Yonatan and Hagahot Maimoniot in the name of Or Zarua; see Taz; and from Raosh and Tur language it implies like Rashi's explanation, and so is primary; proof from Gemara challenging on two thousand, etc., only on Rabbah; and in the baraita supporting him throwing is not mentioned at all; and from what is asked \"with what does he carry,\" etc., and perhaps normally; and that this is not called breached in fullness since it is also permitted to carry, only he cannot reach there.",
  },
  "output/siman_403/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] Rested Shabbat in a valley — meaning he acquired residence there, and then has two thousand cubits in every direction from the place he rested there at entry of the day.",
  },
  "output/siman_403/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] only four cubits, etc. — so wrote Beit Yosef and Rama in the name of Tosafot and Hagahot Maimoniot; but Taz ruled like Rashi 42b that it is permitted to carry within two thousand normally, and it is not breached to a forbidden place since in any case it is permitted throughout by throwing; so I saw ruled Levushei Yom Tov and Perishah and Maharsha. Levushei Yom Tov also wrote a reason he found in old Hagahot Ashri that Or Zarua permits carrying; Perishah proved from the fact that throwing is unspecified in Raosh and Tur and hints — evidently he holds permitted like Rashi. I add explicit proof: so ruled R' Yonatan and Rabbeinu Yerucham 396 explicitly. Nevertheless proof Levushei Yom Tov and Perishah brought for Rashi: if not so, why did the Gemara trouble to challenge Rav Huna why forbidden and not challenge Rav Nachman first; so Maharsha challenged Tosafot there. In my humble opinion there is no difficulty: one cannot challenge Rav Nachman, for he wanted to say it is truly permitted, for Rav Nachman is unspecified and automatically permitted from the challenger's questions; but per the answer regarding Rav Huna that it is like breached, etc. — if so, likewise Rav Nachman forbids — requires study.",
  },
  "output/siman_403/peri-megadim/part-001.txt": {
    "1:_":
      "Since — Taz: a partition made on Shabbat unwittingly is a partition; see siman 362 seif 3. And Tosafot letter 3: if a non-Jew made a reed partition on Shabbat — inferior — carrying is forbidden; he brought s.v. Eruvin 42a, s.v. umitaltel — see there; he challenged the Tosafot scholar.",
  },
  "output/siman_403/machatzit-hashekel/part-001.txt": {
    "1:א":
      "Seif kaf alef — since, etc. And in siman 405, etc.: if non-Jews took him against his will outside his techum and placed him in another walled city, he walks all of it, although as one who left the techum he has only four cubits — since they placed him in the city, the whole city is considered four cubits, even though he did not rest in the air of the city partitions from daytime.",
    "1:ב":
      "Since only four cubits — meaning: if the whole city were not considered four cubits, he would not be permitted to walk except four cubits, as one who left the techum.",
  },
  "output/siman_403/turei-zahav/part-001.txt": {
    "1:א":
      "Since he did not rest in the air of the partitions — this is forbidden so we do not regard the whole enclosure as four cubits; but for carrying prohibition we do not care, since there are partitions in any case now.",
    "1:ב": `But to carry, etc. — Rashi wrote: he may carry throughout, even beyond the two thousand where he has no permission to walk — permitted to carry by throwing; meaning permitted to throw there, for we hold a partition made on Shabbat is called a partition; and automatically we hear that within the two thousand he carries normally — but these are partitions. Tosafot wrote: Rashi appears to hold even within the two thousand he carries by throwing, but normally he carries only four cubits, for regarding normal carrying it is breached to a forbidden place. I am not worthy to decide; nevertheless it appears the law is with Rashi: it is not called breached to a forbidden place unless carrying is forbidden there in its own right, like the case Rashi explained on Rav Huna's words — he holds one does not carry even by throwing except four cubits normally, and no more; and we challenge and answer one may carry throughout by throwing, and answer lest he drag his object into the two thousand; nevertheless to carry normally — because it is like a partition breached in fullness to a forbidden place; Rashi explained his two thousand breach outside the two thousand forbidden to him because of decree lest he drag his object — for there is no interruption between them and it is breached in fullness to a forbidden place, i.e., carrying itself is forbidden there lest he drag the object; not so per Shmuel who permits carrying by throwing even beyond the two thousand — it is reasonable that by law it is permitted to carry throughout even normally, since there are partitions; only since he cannot walk there beyond two thousand because he did not rest in the air of partitions — how can he carry there? If so, there is no prohibition on carrying itself; on the contrary we find permission, e.g., if non-Jews forced him to walk beyond the two thousand there, certainly carrying is permitted regarding carrying prohibition; since he is forced regarding walking, nevertheless breach to forbidden place does not apply here. With this I am reconciled that Rashi's words do not contradict — a correct, true distinction worthy to establish for halachah.`,
  },
  "output/siman_403/biur-halacha/part-001.txt": {
    "1:א":
      "Only two thousand — meaning two thousand in every direction. In Raavad's innovations he brought Ritva who wrote in his teacher's name: even if non-Jews took him and placed him beyond the two thousand, he may not walk throughout; it is not comparable to taking him and placing him in a dir and sahar — there the whole enclosure is outside his techum, and since they placed him there the whole is considered four cubits; but here the whole enclosure is not outside his techum, and from the outset he was forbidden in that place outside his techum because he had only two thousand there — even though they took him beyond his two thousand, it did not become permitted for him because of that whole width, and he has only four cubits — see there. From Tosafot and also from Taz, Ritva's words were hidden — Taz wrote if non-Jews forced him there, certainly carrying is permitted, etc., implying automatically permitted to walk throughout, comparable to placing in dir and sahar; per Ritva in his teacher's name it is not so. I copied from Beit Meir; in Sefer Gaon Yaakov he is uncertain regarding Ritva for halachah.",
    "1:ב":
      "Since he did not rest, etc. — from this language it is proven that even next to the valley where he rested, if there is a building whose partitions were from daytime, since he did not rest in them at the beginning of entry of the day, and that building is more than two thousand cubits — he may not walk in it except two thousand from where he acquired residence. Proof from Gemara: his measure ended in half the city, etc. (Maamer Mordechai).",
  },
  "output/siman_403/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Magen Avraham seif kaf alef — he has two thousand in any case. And it appears if they carried him in that enclosure beyond two thousand he may walk the whole enclosure; but Ritva wrote in his teacher's name: since the whole enclosure is not outside his techum and from its beginning he was forbidden in that enclosure where he had only his two thousand — when they took him afterward to that end that was forbidden, it is not considered as placed in dir and sahar.",
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
