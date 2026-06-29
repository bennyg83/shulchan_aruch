#!/usr/bin/env node
/** worker slot 3 — siman 411 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_411/mechaber/part-001.txt": {
    "1:main":
      "One whose home is in the east and he placed the eruv in the west. Contains 1 seif. One who was in the east — his home in the field — and told his agent to make an eruv for him in the west: if the agent placed the eruv beyond his home such that it is more than two thousand cubits from him and his home is closer to him within two thousand cubits, the eruv is void and he retains shevitah at his home. If the agent placed the eruv such that it is within two thousand cubits of him — even though his home is also within two thousand cubits of him — he acquires shevitah at the place of his eruv and not at his home.",
  },
  "output/siman_411/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) In the east — his home in the field — meaning he was in the field east of his home at the time the day was sanctified upon him.",
    "1:ב": "(2) And he told his agent — while still day.",
    "1:ג":
      "(3) The eruv is void and he retains, etc. — since when the day was sanctified upon him he was far from his eruv more than two thousand, he cannot go and take it; since it is not an eruv he automatically remains on shevitah at his home. This is not comparable to siman 399 seif 11 where we say he may not move from his place — there he was coming on the road and does not want to acquire shevitah at his standing place; but one standing at home or within his house's techum certainly prefers to acquire shevitah at home when his eruv is not valid. Some say the reason here is because the agent was negligent placing the eruv outside the sender's techum and the sender can say \"I sent you for my benefit, not for my harm\" — it is as if he did not place eruv at all. Per this reason even if he were on the road in such a case he also did not lose shevitah at the place where he was when the day was sanctified; it appears in time of need one may rely on this to be lenient.",
    "1:ד":
      "(4) He acquired shevitah, etc. — for he fulfilled his agency and the two thousand cubits are counted from the eruv place.",
  },
  "output/siman_411/turei-zahav/part-001.txt": {
    "1:_":
      "And he retains shevitah at his home — Rashi explained: behold, he was within his house's techum, even though regarding a tree (siman 399 seif 11) we say if he said \"my shevitah is more than two thousand away\" he may not move from his place — that applies to one coming on the road: since at the specified place he cannot acquire because it is more than two thousand away, and at the place of his feet he does not want to acquire for himself, he has no shevitah at all — therefore he may not move from his place. But one standing at home who placed eruv in a place that is not valid eruv — he has shevitah, for presumably at home he prefers to acquire when his eruv is not valid, as we taught regarding rolled beyond techum: doubtful whether before Shabbat — it is like a donkey and camel load; we did not teach \"he may not move from his place\" — implying if it is not eruv he has shevitah at home — end of his words. R' Yonatan answered: one coming on the road above is different because he was negligent himself — he should have clarified his words and said \"if I am far from that place more than two thousand, my shevitah shall be at my place,\" and since he did not say so he is negligent. But here where he sent via agent, the agent should have been careful in his mission to intend that when the day is sanctified the sender not be outside techum; since he was not careful the sender can say \"I sent you for my benefit, not for my harm\" and acquires shevitah at his place — as if he did not place eruv at all — end of his words. It appears he does not agree with Rashi's answer, since here too he is not at home but in the field, and Rashi holds within house techum is as if at home. Practical difference between R' Yonatan and Rashi: per R' Yonatan, if he were in the field east of the city and went himself and placed his eruv beyond two thousand from that place intending to return here at time of day sanctification — he lost shevitah at home since not via agent. But per Rashi even then he has shevitah at home since in any event he is within house techum. From Shulchan Aruch siman 408 seif 4 it implies we rule like Rashi for practical law, for he wrote when one places eruv beyond techum it is ineffective — automatically he did not lose shevitah at his standing place.",
  },
  "output/siman_411/magen-avraham/part-001.txt": {
    "1:_":
      "And he retains shevitah at his home — and see siman 399 seif 11 where we say he may not move from his place: there he was coming on the road and does not want to acquire shevitah at his standing place; but one standing at home certainly prefers to acquire shevitah at home when his eruv is not valid (Rashi). R' Yonatan wrote that here because the agent was negligent the sender can say \"I sent you for my benefit, not for my harm\" and it is as if he did not place eruv at all — see siman 408.",
  },
  "output/siman_411/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin 60.",
    "1:ב":
      "Raosh there; and because at the beginning he mentioned his eruv as \"beyond,\" at the end he also mentioned \"beyond.\"",
  },
  "output/siman_411/baer-heitev/part-001.txt": {
    "1:_":
      "And he retains — see siman 408 seif 4 that even if he placed it himself beyond two thousand he still has shevitah at home; see Taz.",
  },
  "output/siman_411/biur-halacha/part-001.txt": {
    "1:_":
      "And he retains, etc. — see Mishna Berurah what he wrote to distinguish from siman 399: when standing at home he certainly prefers to acquire, etc.; per this reason even if he placed the eruv himself beyond techum he also prefers to acquire shevitah at home when the eruv he placed outside techum does not take effect — unlike the second explanation brought in Mishna Berurah, which is Rabbeinu Yonatan's view: if he placed the eruv himself beyond techum he may not move from his place. I saw in Levush that because of Rabbeinu Yonatan together with Rashi — meaning Rabbeinu Yonatan also holds that when within house techum, even if he placed the eruv himself beyond techum he did not lose shevitah at home. In my humble opinion one cannot say this in Rabbeinu Yonatan's view — see his words s.v. chutz latechum seif 4. Know that in Or Zarua it states that Rav Achai Gaon and Rabbeinu Shmuel of Narvona also disagree with Rashi here — their view: when he placed himself beyond techum he also lost shevitah at home and may not move from his place. The reason in our case is because it was done via agent, per Rabbeinu Yonatan's reasoning — see there (see their hagahot, though very abbreviated). Similarly Raavan, brought in Or Zarua siman 408. Nevertheless for practical law it appears one may be lenient per Rashi's view, as Rama brought for practical law in siman 408 seif 4 like Maggid; and though from Rambam cited there there is no necessary proof he holds so — since he only wrote it is not eruv — nevertheless possibly he also lost shevitah at home, for it showed he does not prefer home; still one need not be stringent, for Tosafot 49b s.v. ve'afilu also hold like Rashi, and so Ritva.",
  },
  "output/siman_411/eliyah-rabbah/part-001.txt": {
    "1:_": "[1] [Levush] The master said, etc. — and Taz omitted all this; see there.",
  },
  "output/siman_411/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] One who was in the east — his home in the field — meaning he was in the field east of his home; so Levush.",
  },
  "output/siman_411/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) And he retains, etc. — R' Yonatan wrote, etc. — see end siman 408. Meaning: there it is explained we rule like Rashi who wrote there that even if he placed his eruv himself beyond two thousand he still has his house's techum — see there.",
  },
  "output/siman_411/peri-megadim/part-001.txt": {
    "1:_":
      "And he retains — Taz. Mishnah Eruvin 60a; the version in Shulchan Aruch should read: one who was in the field east of his home — so Levush; see Tur; so Tosafot Shantz. See Levush in hagahot: one may not rule for practical law in siman 408 seif 4 that per the second explanation one may also say like Rashi, only that there is also a leniency if he came on the road as siman 399 seif 11 and told his agent to go ahead and place eruv and he placed it far beyond two thousand — he did not lose the techum of his standing place at twilight because the agent was negligent — end of his words. Magen Avraham showed siman 408 seif 4 — meaning one may say both are true, as we say.",
  },
};

let total = 0;
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
        return { ...b, en: blockFixes[key] };
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
