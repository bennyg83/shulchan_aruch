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
  console.log(`OK ${rel} ${slug} seif=${seif} marker=${marker}`);
}

const ma = "siman_111/magen-avraham/part-001.txt";
const me = "siman_111/mechaber/part-001.txt";
const mb = "siman_111/mishnah-berurah/part-001.txt";

setEnglish(ma, "magen-avraham", 1, "א",
`<b>One must juxtapose [redemption to prayer].</b> But in Musaf and Mincha it is permitted to say verses before "Hashem, open my lips," but not afterward, for this verse is part of the prayer itself [Levush HaChur].`);

setEnglish(ma, "magen-avraham", 1, "ב",
`<b>To answer Amen.</b> And similarly in the Levush according to Kabbalah on Shabbat.`);

setEnglish(ma, "magen-avraham", 1, "ג",
`<b>Yom Tov.</b> Since this day is considered like the other weekdays—a day of distress [Darkei Moshe].`);

setEnglish(ma, "magen-avraham", 2, "_",
`<b>He repeats and says, etc.</b> In a whisper [he says] "Hashem, open my lips" [Kessef Mishnah]. But "Who hears prayer" and the other verses he need not [repeat], since he already said them in a whisper before the prayer; and even at Shacharis and Maariv, if he did not say them before his prayer, he need not say them [Beit Yosef from Maharai siman 110]. It implies that the shatz is permitted to interrupt after he prayed in a whisper.`);

setEnglish(me, "mechaber", 1, "main",
`The law of juxtaposing redemption to prayer. And it contains 3 seifim: One must juxtapose redemption to prayer and one may not interrupt between them, even with Amen after Ga'al Yisrael, and not with any verse other than "Hashem, open my lips." {Rama: And some say that it is permitted to answer Amen on Ga'al Yisrael, and so we practice (Tur). And some say that this requirement to juxtapose redemption to prayer applies specifically on a weekday or Yom Tov, but on Shabbat one need not (meaning, that the reason we require juxtaposing redemption to prayer is because it is written "May Hashem answer you on a day of distress," and juxtaposed to it is "May the words of my mouth be acceptable … and my redeemer," but Shabbat is not a time of distress. And in my humble opinion it seems that the reason this is not so on Yom Tov is because they are days of judgement, as we learned in Mishnah Rosh Hashanah 1:2, "On Passover [the world is judged] on grain…") (Hagahot Ashiri on chapter 1 of Berachos; and Kol Bo, laws of Shabbat; and Maharil, laws of Yom Tov) And it is good to be stringent unless in a place where one needs to do so (Tur).}`);

setEnglish(me, "mechaber", 2, "main",
`The chazan, when he begins the Eighteen [Blessings] aloud, repeats and says "Hashem, open my lips" and "May my mouth declare," etc.`);

setEnglish(me, "mechaber", 3, "main",
`If before he recited Shema he found the congregation praying, he should not pray with them; rather he recites Shema and afterward prays, for juxtaposing redemption to prayer is preferable.`);

setEnglish(mb, "mishnah-berurah", 1, "א",
`(א) One must juxtapose [redemption to prayer]—but in Musaf and Mincha it is permitted to say verses before "Hashem, open my lips," but not afterward, for this verse is part of the prayer itself; for from this reason we may say it between redemption and prayer, since the Sages established it in the prayer it has the status of prayer; therefore one may not interrupt between it and the Amidah.`);

setEnglish(mb, "mishnah-berurah", 1, "ב",
`(ב) Between them—even for a mere pause longer than the time of speech one should be careful ab initio [the time of speech is the time it takes for a student to ask his teacher].`);

setEnglish(mb, "mishnah-berurah", 1, "ג",
`(ג) Even with Amen, etc.—and similarly for Kaddish and Kedushah one may not answer, as above in siman 66 seif 9; and he mentioned Amen because there the topic of the blessings of Shema concludes, and one might think one could answer Amen even after oneself, as below in siman 215 seif 1; he informs us that it is forbidden because of interruption, and even after the shatz one may not answer.`);

setEnglish(mb, "mishnah-berurah", 1, "ד",
`(ד) And not with any verse—and even at Maariv before the Amidah one should likewise be careful about this.`);

setEnglish(mb, "mishnah-berurah", 1, "ה",
`(ה) Amen—but for "Who has redeemed" and Kedushah it is not an interruption, for Amen relates to the blessing and is not an interruption, unlike with those.`);

setEnglish(mb, "mishnah-berurah", 1, "ו",
`(ו) And so we practice—meaning after the chazan and not after oneself; and see above in siman 66 in the gloss and in Mishna Berurah there.`);

setEnglish(mb, "mishnah-berurah", 1, "ז",
`(ז) And Shabbat, etc.—and Yom Tov, since this day is considered like the other weekdays—a day of distress—the verse "May Hashem answer you," etc., after the verse "May the words of my mouth be acceptable," which speaks of redemption, also applies to it.`);

console.log("Done siman 111 part 1");
