#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const magen = {
  "2:_":
    "One does not build. This requires study, for nowadays they are not careful about this; and it appears to me that since there is fear of the gentiles, one is not permitted to raise it so much. And you will ask: let us lower our houses. And one may say: since there are many gentile houses in the city that are higher than the synagogue, in any case there is no recognizable [superiority] for the synagogue, as stated; and one must strain to settle the custom — and so too in this.",
  "3:_":
    "A high building. Meaning specifically a building, such as a roof or an upper story; but not as some do, who stick an iron pole in one corner — and their fix accomplished nothing.",
  "4:_":
    "It is not sufficient. Meaning when the congregation held [rights to] the windows — Choshen Mishpat siman 154, s.k. 22: Rama wrote in his responsum siman 32, and these are his words: a courtyard of a synagogue, which is a place of entry for the many, like an open alley, or that has no modest use in it but is like a ruin or a roof — they cannot protest against an individual who opens windows there. But if the congregation opens windows in the synagogue toward its courtyard, he can protest against them. And if the courtyard is a place of use, even for the many, who sometimes do modest things in it — they can protest that the individual not open his windows there, for it is no less than an alley that is not open — until here. Choshen Mishpat siman 154. And it appears to me that it speaks when the courtyard is a walkway to the Rabbi, and it is impossible to build it; for otherwise one must be concerned that afterward he will claim presumptive rights in the windows, as written in Choshen Mishpat siman 154, s.k. 16, and he protests against building.",
  "5:א":
    "One does not open. It appears to me that if the opening was on one side and the synagogue was in ruins, and some of the leaders wanted to make the opening as required by law — the others cannot protest, even if they are the majority; and even though they change the order of seating, the law pierces between them.",
  "5:ב":
    "And they make a bimah. And one does not make more than six steps to the bimah [Zohar, Vayakhel, p. 201b]. It is forbidden to sit between the bimah and the heichal with one's back toward the heichal, for it is disgraceful; and there is also a prohibition, for one standing on the bimah when he bows to bless appears as if he bows to it (Levush). See siman 139, s.k. 4.",
};

const mb = {
  "1:א":
    "(1) They force, etc. — Rambam wrote, Laws of Prayer, chapter 11: wherever there are ten Israelites, they must prepare for them a house into which they may enter for prayer at any time of prayer; and this place is called a synagogue. And even the minority can force the majority [Rama, Choshen Mishpat siman 163, s.k. 1].",
  "1:ב":
    "(2) To build — and if they do not have the means to build, they are obligated in any case to rent a special place for prayer. And the poskim wrote: for building a synagogue they collect according to wealth alone; and for renting a synagogue they collect half according to wealth and half according to number of souls. Magen Avraham wrote in siman 154 in the name of Rivash [and it is brought in Choshen Mishpat siman 162 in Rama]: one who prevents building a synagogue — even if there is another synagogue in the city — prevents the many from performing a mitzvah; and he concludes there that if the synagogue contains them, then on the contrary they are forbidden to separate. And see responsum Radbaz, volume 3, siman 472, who elaborated on these laws; and at the end of his words he wrote: and all this is when everyone is of one heart, that their praise rises well; but if their hearts are divided, it is better that each congregation pray by itself, etc.; and do not err in my words to say that I hold that division is good, Heaven forbid, for the verse is written: \"Ephraim is joined to idols; let him alone — their portion of heart; now they will bear guilt\" — rather they must strive to be of one heart to their Father in Heaven; and if it is impossible except that they are always quarreling and in dispute — reject the evil in their minority — until here in that responsum. And see Petach HaDvir, Choshen Mishpat siman 162, what he elaborated on these matters.",
};

const pm = {
  "1:_":
    "Meaning — Ateret Zekenim, explicitly. And so Ran on Shabbat 11a; and what Ran wrote: kashkushin and abrurin that are not used on their roofs — is difficult to me, for even inside them, whatever is not used, we have no concern; and in our novellae we elaborated on this. And \"roof\" that the Gemara mentions is for inclusion: those that were fit for use — even the roof is forbidden; but kashkushin and abrurin — even the houses themselves being high, we have no concern.",
  "2:א":
    "And the order — Ateret Zekenim: he brought the words of Levush; and nowadays they make places near the bimah that are called \"almemar,\" and the face of the one sitting is toward the heichal and his back toward the bimah; and even though his back is toward the Torah scroll, nevertheless the bimah is a different domain. And nevertheless, per the reason that it appears as if one bows to the one who blesses — meaning, that they are accustomed to bow at the blessing over the Torah — Magen Avraham 139, letter 6; if so, this is not proper. And one may say: when his back is toward the bimah, it does not appear as if he bows to it. And even though \"the back of one's teacher,\" some say — siman 90, in Beit Yosef in the name of Tosafot — it is possible we do not hold thus, or the reason is different, or one's teacher is different. And see Yoreh Deah 282, Taz, letter 1: rabbis, in a sermon, their backs toward the heichal — the Torah scroll is in a different domain temporarily; as I am a mourner at a fixed [time], it is disgraceful that his back be toward the heichal.",
  "2:ב":
    "Know: what the author wrote in seif 1 — they force one another to build a synagogue — specifically when there is a minyan of ten, as Levush wrote; and this is from Rambam, chapter 11 of Laws of Prayer, halakhah 1. And it is implied that Tanakh too is specifically in such a case, when there is a minyan; but with less than ten, no. And the reason is: for Tanakh we require [it] for haftara; and with less than ten there is no public reading and haftara. And Magen Avraham, letter 1, implies that even with less than ten they buy books — and this requires study.",
};

const rae = {
  "1:_":
    "Seif 1 — They force. Rambam wrote, chapter 6 of Laws of Avodah Zarah: one who plants a tree next to the altar, or anywhere in the azarah — whether a barren tree or a fruit tree, etc. — behold he receives lashes, etc. And Rid wrote in his explanation to Rambam that even next to a synagogue it is forbidden rabbinically.",
};

function apply(file, fixes) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) {
        n++;
        return { ...b, en: fixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}

apply("output/siman_150/magen-avraham/part-001.txt", magen);
apply("output/siman_150/mishnah-berurah/part-001.txt", mb);
apply("output/siman_150/peri-megadim/part-001.txt", pm);
apply("output/siman_150/rabbi-akiva-eiger/part-001.txt", rae);
