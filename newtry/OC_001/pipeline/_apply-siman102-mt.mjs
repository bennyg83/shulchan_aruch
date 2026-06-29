#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_102/machatzit-hashekel/part-001.txt": {
    "1:א":
      "(s.k. 1) Within four cubits. And per Tosafot, meaning: that which Rama added \"between\" is per the view of Tosafot and the Rosh, as is written in Shulchan Aruch; and on this he challenged: for Tosafot it is fine, but for the Rosh it is difficult — for the Gemara derives this law from Chana, who said to Eli \"I am the woman standing with you in this,\" and Tosafot hold: from \"with you\" without the heh, and \"with you\" with the heh at the end of the derashah — Eli was sitting and she said \"I am the woman standing,\" but you were sitting; why \"with you\" with the heh — because I was four cubits from you — it implies that within four cubits it is forbidden to sit; if so, there is no distinction, and on all sides we require four cubits, even behind him. But the Rosh holds we derive from that which is written \"in this,\" and the word zeh has gematria twelve — meaning she said to Eli \"standing with you,\" that you too were standing like me; why \"in this,\" which was within twelve cubits that one must distance combining all sides; perforce one must say that behind him one need not distance, for otherwise it would be sixteen cubits.",
    "1:ב":
      "And in my humble opinion, the words \"things,\" etc. — he holds twelve cubits: that whatever has a width of one tefach, its circumference is three tefachim.",
    "1:ג": "Eight by eight — if so, its circumference is four cubits.",
    "1:ד":
      "Does it deal only on the equal line? Meaning: in the place where Chana stood — forward, meaning half the circle until the equal line that is in the middle, is twelve cubits; and likewise Chana, standing behind him, has before him half the circle of the one behind him — he too must distance that half-circle that holds twelve cubits; and likewise one standing on one of the sides must distance until the equal line in length, meaning twelve cubits. And as Tosafot per their explanation — not that it is written only the measure of four cubits, meaning from one side; and the same for the Rosh, who hints twelve cubits, meaning half the circle from his place of standing to Chana's place of standing; and that line I drew in the middle of the circle is called the equal line.",
    "1:ה":
      "And some say: for CM, meaning there is one who wrote at the end of this seif: before him, if it fills his eyes — it is forbidden.",
    "2:_":
      "(s.k. 2) Engaged in Torah, but thought does not help — thus Rabbeinu Bachya deduced from Eli, who needed to stand within four cubits, even though he was certainly contemplating words of Torah; for from the outset we say it is forbidden for a Torah scholar to stand in a soiled place, for he cannot avoid Torah thought in any case.",
    "3:_":
      "(s.k. 3) Even, etc. — one who sits and his fellow stands and prays Shemoneh Esrei.",
    "4:_":
      "(s.k. 4) In his border, etc. — in a synagogue one needs, etc. — Bach wrote thus to resolve the difficulty of Tur: for Eli sat first and Chana came within his border. And Magen Avraham wrote: nevertheless, from piety one should stand even in such a case; for the sitter does not violate a prohibition in such a case, nevertheless the prayer-er acted improperly, for he placed himself within the four cubits of the sitter; therefore Eli stood, from piety — see Taz. And Bach explained: there it is different with Chana, for it was in Shilo, which was designated for every person, and it is like a synagogue, that one must stand thus by law; and per this there is no necessity in one's house that there be piety to stand; for per the view of Beit Yosef, in any case the difficulty of Tur is resolved, for he wished to prove the law of piety.",
  },
  "output/siman_102/turei-zahav/part-001.txt": {
    "1:_":
      "Forbidden to sit, etc. — Tur derives it from the verse of Chana: \"I am the woman standing with you,\" which implies he was standing like her, since he was within her four cubits. And it is difficult: for Eli considered her a drunkard and she was not praying, but on account of the madness of drunkenness she moves her lips; and so Rashi explained in Shmuel, \"and he considered her a drunkard\" — they were not accustomed to pray in a whisper. And one may say Eli thought she prays in a whisper on account of that she is drunk. And it further appears: even though Eli did not know she was praying, nevertheless she did not stand there to pray within his four cubits; rather, since she saw him standing like her, and this is what is meant: \"I am the woman who prayed within your four cubits\" — it is because I was standing with you and you stood like me. And Tosafot explain he derives it from the heh of \"with you,\" to teach that I was five cubits from you; therefore I stood to pray, even though you sit; and per this Eli was actually sitting.",
    "2:_":
      "Between the sides. So too Tur, and he did not mention anything about behind him, and gave a sign: in this has gematria twelve, meaning twelve cubits for three directions — before him and two sides — but behind him he holds it is permitted to sit even within four cubits. And one may give a reason: since we derive from Eli, and regarding Eli it is written \"and Eli watched her mouth,\" and this language applies only before her or at her sides, but not behind her. And in Ashrei he wrote this language: whether before him or behind him one must distance four cubits; \"with you in this\" has gematria twelve, meaning four cubits for all directions; perforce both sides count as one direction (Peri Megadim). And it is astonishing on Tur that he did not bring his father's view, since he argues on him; and also in Tosafot and Mordechai it is written that even behind him requires four cubits; and so Rama.",
    "3:_":
      "And even in the chapter \"Which is its place.\" Since they are accustomed to say it before prayer, it pertains to prayer and is important; but other words of Torah not related to prayer — one must stand; this is Tur's view, who wrote that the reason it is forbidden to sit within the four cubits of prayer is because it appears his fellow accepts upon him the yoke of Heaven and he does not accept; and when he engages in Keriat Shema and its blessings, this reason goes away. But if he engages in Torah, this reason still applies — until here. And it is difficult for me in what he wrote that the reason is because it appears he does not accept the yoke of Heaven — in Keriat Shema too one may say thus, and that it is forbidden to sit within the four cubits of one who reads Keriat Shema and is silent, for the essence of accepting the yoke is in Keriat Shema, and prayer is not acceptance of the yoke but only mercy and supplication. And further, per this reason, what does distancing four cubits help to nullify this concern? And further, whence did our Rabbi learn this reason — do we not derive from the verse of Chana? And it is possible to say another reason: the place where the prayer-er stands is holy ground, as if he is praying; therefore one who is in that place — within four cubits — must treat it with honor; and whoever sits and is not engaged in a holy matter, it is as if there is no holiness there, and it is like other places in the house; therefore he must stand to show there is holiness here. But if engaged in prayer or words of Torah, even sitting, holiness is upon him too. This appears to me a correct reason for those who hold words of Torah also help, as written afterward; and nevertheless Beit Yosef wrote to distinguish: specifically when he articulates words of Torah from his lips, then it suffices, for there is extra holiness — unlike contemplation of words of Torah in the heart alone, which does not suffice; and the distinction is correct.",
    "4:_":
      "On the side of the prayer-er as well. This ruling Beit Yosef brought, that he wrote in Orchot Chayim in the name of Baal HaTamid; and Orchot Chayim wrote on this: his words are astounding — requires study — until here. And Beit Yosef wrote: in my humble opinion there is no astonishment here, for his weakness proves about him that on account of this he sat — until here. And in my humble opinion there is astonishment: why is there no astonishment — what does his weakness help that he sat specifically within four cubits and not move even one cubit further? And further, it appears to me to prove that weakness does not help for this: for old and sick are compared to each other everywhere, as stated in siman 113, seif 5, regarding Modim; and likewise regarding uprooting from the table — they placed there an old man or sick person, as stated in chapter HaRo'eh; if so, perforce Eli was a distinguished elder in that chapter, as the implication of the verses, and as stated in chapter 1 of Chullin 21 regarding Eli, who said there: \"I am old\" — and why did he need to stand within Chana's four cubits? Therefore it appears requires study to be lenient with this ruling.",
    "5:_":
      "On his side as well. So Tur in the name of the Rosh; and he challenged him: for we derive from Eli, and he was sitting first, as it is written \"and Eli sat\"; nevertheless he needed to stand. And Beit Yosef in the name of Mahariya: this difficulty is per the first explanation of the sign, that Eli was standing; but per Tosafot's explanation that Eli was sitting, and the proof is from the extra heh — there is no difficulty here — until here. And apparently his words are astounding: for even per Tosafot's explanation he challenges well: for per their explanation we derive from that Chana said \"I pray outside your four cubits,\" therefore you sit; unlike if I were within your four cubits, which would prove there is prohibition even in that which Eli was already sitting — if he were within four cubits. And did Mahariya state well? Certainly: if one already sat and another comes within his four cubits, the first has no obligation to distance, since this one comes into his boundary; but the second violates a prohibition, for he begins to pray in a place that is the sitter's four cubits with permission. Therefore Chana spoke well: \"I am standing\" to pray with permission, since I am outside four cubits; but if I were within four cubits, Eli would violate a prohibition, for I begin to pray within your four cubits; but upon you there is no prohibition, since you already sit — and there is no difficulty here. And Moharchash wrote on Mahariya: his master permitted him; and he did not examine this, for his words are correct.",
  },
  "output/siman_102/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] It is forbidden to sit within four cubits, etc. — the reason Tur wrote: because it appears his fellow accepts the yoke while he does not wish to. But Taz, s.k. 3, challenged him and wrote another reason: because the place where the prayer-er stands is holy ground, as if he is praying; therefore one standing in that place — within four cubits — must treat it with honor — see there. And Bach, Nehar Shalom, letter 1, wrote: in Zohar Chaye Sarah it is stated: because a person stands before the supernal King, he takes four cubits to pray — until here; and this is like Taz's view. And it appears this is because they did not say in the Gemara \"four cubits of the prayer-er\" but \"four cubits of prayer\"; and likewise the intent of the Zohar's statement on the houses of Rachel called prayer that emerges from behind the chest of Ze'ir Anpin and below — until here; meaning she clothes four cubits of Nukva of Ze'ir Anpin.",
    "2:_":
      "(2) There — forbidden to sit within four cubits, etc. — it implies: but to stand is permitted; and so Beit Yosef: they forbade only sitting, but standing is certainly permitted. However, this is specifically behind him or at his sides; but before him there is reason to forbid for another reason, lest he not be able to concentrate, as written below, letter 29 — see there.",
    "3:_":
      "(3) There — forbidden to sit, etc. — and somewhat leaning that if something is placed upon him he should stand; see above siman 94, letter 30, where we brought a dispute regarding this for Shemoneh Esrei; therefore here too one should be careful; and see Orach Mishor end of this siman.",
    "4:_":
      "(4) There — between before him, between the sides, and between behind him — such is the girsa in Tur and Beit Yosef before us; and in books where it was not written in Tur's words \"between behind him,\" Bach wrote it is a scribal error; and so Levush, chapter Ein Omdin, letter 28; and not like Levush who omitted between behind him — see there. And see Darkei Moshe and Taz s.k. 2; and so is the view of the Acharonim, that one must forbid also from behind him, as Shulchan Aruch HaRav, Hagahot Tashbetz, Rabbi Akiva Eiger letter 1, Kitzur Shelah siman 12 letter 42, Beit Yaakov letter 66, Rabbi Zalman letter 1, Chayei Adam klal 26 letter 1, Chasam Sofer letter 1, Kitzur Shulchan Aruch siman 90, section 18, Ben Ish Chai Parashat Yitro letter 6.",
    "5:_":
      "(5) There — one must distance four cubits; and a high place and another domain — even within four cubits it is permitted to sit, Shulchan Aruch HaRav letter 2; and any partition between them, even of glass, is a separate domain portion and is called another domain and is permitted — letter 1; and see below letter 11 and letter 22. And therefore it appears to me: if the glass partition is before him, the one sitting there must turn his face away from opposite the prayer-er; and also he should not do any melacha about which there is concern the prayer-er will lose his concentration.",
  },
  "output/siman_102/baer-heitev/part-001.txt": {
    "1:א":
      "The sides. See Magen Avraham and Taz; and in Halakhot Ketanot, part 2, siman 226; and Chayei Adam, siman 24; and in responsum of Ginat Veradim, part Orach Chayim, klal 1, siman 39; and in Sefer Perach Shoshan, Choshen HaMishpat, klal 1, siman 11.",
    "1:ב":
      "The prayers. And specifically if he articulates words of Torah from his lips; but if he contemplates alone, it is forbidden to sit; and so from the case of Eli, who was standing, even though he was certainly contemplating words of Torah — see Beit Yosef.",
    "1:ג": "In Keriat Shema. He explains: the one sitting.",
    "2:_":
      "Weakness permitted — requires study: for old and sick are compared to each other everywhere; if so, Eli was old — why did he need to stand? Therefore requires study to be lenient with this ruling. Taz.",
    "3:_":
      "In his border. Specifically in a house of mourning; in a synagogue one must stand, for it is a place designated for every person. Therefore even Ali, though he sat first, since the place is fixed for prayer, Ali had to stand; and with this the difficulty of Tur on the Rosh is resolved.",
    "4:א":
      "Those praying. If it is permitted to pass before one praying when there is a high place of four tefachim before him — ruled in Halakhot Ketanot, part 1, siman 84, that it is forbidden. But if the prayer-er is in such a place, it is possible it is permitted to pass before him — see there; and see Perach Shoshan, Choshen HaMishpat, siman 11.",
    "4:ב": "Permitted. And in Zohar Chaye Sarah it is stated that on every side it is forbidden.",
    "4:ג":
      "And to stand. Meaning he should stand there and not go further; for otherwise it would be as before their faces — whoever sees him, it is forbidden, for he cancels his intent on account of him. Magen Avraham (and see in Sefer Eliyah Rabbah what he resolves in explanation of Tur on the difficulties, not like Magen Avraham).",
    "5:_":
      "Three steps. Magen Avraham. And it is plain that it deals with within four cubits, or that he comes within four cubits by three steps that he steps backward. Taz.",
  },
  "output/siman_102/beur-hagra/part-001.txt": {
    "2:א": "Seif 2 — between before him, etc. See Magen Avraham and Taz, s.k. 2.",
    "2:ב": "And if engaged, etc. Kol Bo in the name of the Yerushalmi — see there.",
    "2:ג": "And some permit. Atzei Zahav.",
    "2:ד":
      "And there is who. And this is what is written in the Zohar, gematria twelve (D.M.); and in Behag he brings a baraita — see there — four cubits.",
    "2:ה": "Seif 2 — there is who, etc. Atzei Zahav; and his words are astounding, for forty years prior it was, etc.",
    "3:_":
      "Seif 3 — if the sitter, etc. Magen Avraham; and with this he answered the difficulty of Tur, for Eli sat beforehand, as stated, \"and Eli sat\"; and Atzei Zahav.",
    "4:א": "Seif 4 — and specifically, etc. The language of Tur; and so Talmidei Rabbeinu Yonah; and see Zohar, part 1, 132a.",
    "4:ב": "And to stand. Magen Avraham.",
    "5:א":
      "Seif 5 — if he completed, etc. Yerushalmi chapter 2 of Rosh Hashanah, R' Chiya bar Abba, etc.; and see Peri Megadim there; and so in the Gemara Berachot 27a.",
    "5:ב": "And one must, etc. Mahariya.",
  },
  "output/siman_102/peri-megadim/part-001.txt": {
    "1:_":
      "Forbidden (Shmuel 1:1). And in our chiddushim on Berachot 31a, Eli proved she was drunk — forbidden to pray (rabbinically, Tosafot there). He knew she was praying only per Taz's explanation that prayer was in a whisper — she did not make heard even to ears, only her lips moved; and support siman 101 seif 2. One may also say that afterward when Chana said \"so may your maidservant pray,\" she prayed again. And per Tosafot in Berachot, \"and Eli sat\" — better still: certainly in such a case, if his fellow does not know he is praying, it is a rabbinic prohibition for the prayer-er; but even if he knows and does not stand, piety for a woman like Chana to distance herself in any case.",
    "2:_":
      "Between — Atzei Zahav; and these are the words of Peri Megadim; and behind him certainly Eli was not standing behind a woman — Efrayim Zalman Margoliyot. And from Taz here it implies like Magen Avraham section 6: before him, to sit is forbidden; but to stand is permitted before him; if so, whence do we forbid the sides? Rather, since one may say Eli was at the sides — unlike behind him, where it was not forbidden. However, per Tosafot, \"with you\" at five cubits is no proof for the sides; even if we say before him, to stand is forbidden, all the more so to pass before Eli outside four cubits. And this will be explained in Magen Avraham section 6. And know: a high place and another domain — even within four cubits it is permitted to sit; and this is simple; and even per Taz's reason in letter 3, in another domain it is fine.",
  },
  "output/siman_102/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Magen Avraham s.k. 1. And in my humble opinion, the words are as their plain meaning. See responsum Ginat Veradim, Orach Chayim, siman 39.",
    "2:_":
      "Taz s.k. 4 — that he was a distinguished elder. This is not so: that was at the time of death, which was forty years later. Tosafot Shabbat.",
  },
  "output/siman_102/beer-hagolah/part-001.txt": {
    "4:ב": "Rabbenu Yonah",
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
