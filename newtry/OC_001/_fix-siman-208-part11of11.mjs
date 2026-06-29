import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const tz = "output/siman_208/turei-zahav/part-001.txt";
const ye = "output/siman_208/yad-ephraim/part-001.txt";

patch(
  tz,
  "turei-zahav",
  2,
  "ב",
  `<b>Even if one mixed with them, etc.</b> Here, with the five species of grain that are most important, we do not follow the majority — only whenever they give them for food; unlike other things, where we follow the majority, as written in siman 210 at the beginning — see there. And likewise it says in siman 208 seif 7: it implies that here, even if they do not impart taste, they have importance since they are for food — for wherever there is honey one does not perceive anything except the taste of honey.`,
);
patch(
  tz,
  "turei-zahav",
  3,
  "א",
  `<b>And if for binding in general, etc.</b> Ostensibly it appears that even if the five species are the majority, since they are not for food they do not have food importance to bless borei minei mezonot on them; and even though in other things we follow the majority, as Maharshal wrote in siman 210 — here it is worse, for they are not in the category of food at all, since they are only for binding. If so, those lekichs that are made for the honey and spices — automatically the flour is only for binding in general; one should not bless borei minei mezonot on them, but one should not be lenient in this since one has significant benefit at least from the abundance. And similar to this it says in Yoreh Deah siman 108 in Shulchan Aruch. And there is one who wants to say that if he increased the mixture, etc. — and this is because at any rate he enjoys from the abundance even though it is for spoilage. So too we may say that the five species have importance here even though they are only for binding. And it appears that this is the doubt that Tosafot wrote and that was brought here in Shulchan Aruch. And it is good to be stringent to swallow them within the meal; and in seif 63, when he mentioned that they were placed for binding and for coating, he did not write there to be stringent about this — for there the case is that the five species are not the majority, so it is clear they are nullified when they are all for binding; unlike here, where there is a majority — so it appears to me.`,
);
patch(
  tz,
  "turei-zahav",
  3,
  "ב",
  `<b>And it is good to be stringent and to swallow it, etc.</b> So too Tosafot in chapter Kol Min, daf 37. And I wonder greatly: why did they write that one removes the doubt by eating within the meal — automatically one does not bless on them at all; and why did they not say that one should bless on them shehakol? For regarding shehakol he said that shehakol exempts. And likewise it says in Sa"s"s 204: any matter about which there is doubt in its blessing — one blesses shehakol. And likewise it says in Tur this siman regarding me'ein shalosh blessing, which they brought in Shulchan Aruch seif 4, that Tosafot are in doubt, etc.; and Tur concludes that if a person is in doubt about the first blessing he blesses shehakol, but the after-blessing one does not say except as it was instituted. Therefore one should not eat except within the meal. And here, since it refers to the first blessing, they should have said to say shehakol; and it must be said that here too the doubt is on account of the after-blessing — for if he will need to say borei minei mezonot, he will also need afterward to bless me'ein shalosh. And according to this, if he wants to eat this thing — and likewise the lekichs we mentioned, less than a kezayit and no after-blessing is required, as written in siman 210 — then he need not eat within the meal, but should say before it shehakol and afterward nothing, as we said — simple.`,
);
patch(
  tz,
  "turei-zahav",
  3,
  "ג",
  `<b>And exempt from it.</b> There is a textual corruption here and it should read "and exempt from borei nefashot"; and so it is in Tosafot.`,
);
patch(
  tz,
  "turei-zahav",
  4,
  "_",
  `<b>And the kernels whole.</b> For then their eating is not important enough to establish on them me'ein shalosh blessing; and Tosafot's doubt regarding the after-blessing is whether one blesses on the land and on the living and concludes on the land and on the fruit of the land — for we do not find blessing on the living except if he first blessed borei minei mezonot.`,
);
patch(
  tz,
  "turei-zahav",
  7,
  "א",
  `<b>Until it was mashed.</b> Beit Yosef was in doubt about this: whether it requires specifically that it was mashed like deisa — then one blesses borei minei mezonot; but if it is whole, even though it was cooked, one blesses borei peri haAdamah like wheat, or not — is it not like wheat since the way is to cook rice, unlike wheat. And it appears the intent of Rama who glossed "until it was mashed" is because of the doubt — for at any rate one fulfills with borei peri haAdamah blessing if his blessing was initially that. And even though on bread of dochan nearby one blesses shehakol and not borei peri haAdamah — there it is different, for there is no way to eat it thus; unlike here — therefore one blesses borei peri haAdamah and does not bless borei minei mezonot until it becomes clear that his blessing is borei minei mezonot with certainty.`,
);
patch(
  tz,
  "turei-zahav",
  7,
  "ב",
  `<b>But rice alone.</b> So wrote Rif and Rambam; and it appears from the language of Rif that when rice is mixed with another species there is no elevation to rice even if it is the majority — for Rav and Shmuel did not give elevation to rice to bless borei minei mezonot, and they were refuted from a braita that gave this elevation to rice. And Rif wrote that specifically in this they were refuted — where they did not give elevation to rice even when it is in its whole form; but whatever is not in its whole form, even if it is the majority, Rav and Shmuel were not refuted, and there is no elevation to rice. And so one may explain the language of Rambam — unlike Rosh and Tur, who wrote that rice did not lose its elevation except after there is another dish as the majority. And Beit Yosef already wrote this from him; but here in Shulchan Aruch he retracted and holds that whenever rice is the majority it is not called a mixture — and as he concluded afterward, "and if one mixed," etc. — this is the view of Rosh and Tur. But it is truly puzzling: the braita from which Rav and Shmuel were refuted does not deal at all with rice in a mixture; if so, why do we rule not like Rav and Shmuel in mixtures even with a small amount of another species? And according to what I wrote that one should bless shehakol on rice from doubt — there is no practical difference here: if the other dish is certainly the majority, we follow it; and if rice is the majority, one blesses shehakol and exempts everything.`,
);
patch(
  tz,
  "turei-zahav",
  7,
  "ג",
  `<b>Like the blessing of that dish.</b> For specifically with the five species Rav and Shmuel said that one blesses borei minei mezonot on them — and this means whatever is not made for binding, as appears in this siman; but with other species we follow the majority.`,
);
patch(
  tz,
  "turei-zahav",
  8,
  "_",
  `<b>On bread of dochan, etc.</b> For there is no way to make bread from it — therefore one blesses shehakol; unlike rice in the previous seif. And in the explanation of orez and dochan: Rashi explained in chapter Kol Min — orez is millet, and in another language yerez; and Tosafot wrote — some say orez is rice and dochan is millet. And the conclusion of the world is like this explanation — so too Beit Yosef and so too Levush; and Maharil wrote that dochan is rice and orez is yerez. And Mishna Berurah wrote: every God-fearing person should not eat neither yerez nor rice cooked, whether whole or mashed, except within the meal. And it appears to me: since at any rate there is no me'ein shalosh blessing on these, and there is no doubt here except in the first blessing whether it should be shehakol or borei minei mezonot — one should bless on rice and yerez shehakol and afterward borei nefashot. And groats made from barley ground in mills and cooked — it is simple that one blesses borei minei mezonot and afterward me'ein shalosh, for they are from the five species of grain; and those made from buckwheat, which are not from the five species — one blesses shehakol and borei nefashot. This is simple.`,
);
patch(
  tz,
  "turei-zahav",
  9,
  "_",
  `<b>One blesses HaMotzi since, etc.</b> Meaning: the HaMotzi blessing does not require a measure, as written in siman 210.`,
);

patch(
  ye,
  "yad-ephraim",
  1,
  "_",
  `<b>In Taz note 2:</b> species of grain — and Tur wrote, namely that they are barley, etc., that they are also important, that Eretz Yisrael was praised with them when chewed or when crushed, etc. — end of his words — so it should read.`,
);
patch(
  ye,
  "yad-ephraim",
  2,
  "_",
  `<b>In Magen Avraham note 2:</b> that their shell was removed — and so too from what I wrote in seif 7 — so it should read; and the meaning is that there in note 9 he brought from what Beit Yosef wrote about wheat that the way is to cook them in pieces or crushed, such as groats — see there. And in my kuntres I wrote on what Magen Avraham wrote, and it is difficult in seif 4 where he wrote "when they boiled," etc.; and it appears to me clearly that what Shulchan Aruch wrote "when they boiled" is a textual corruption and it should read "when they split them" — and it is a common error. And it is also an error, for it is proven that the entire seif is the language of Rambam, who wrote "when they split them or crushed them," which is the well-known law in Gemara. And I also wrote there to wonder about what Magen Avraham wrote below in note 15, that katashen means that he removed their shell — from Gemara Moed Katan daf 14 — see there; and I wrote that one may say from what Ramban wrote that cooked grain as it is — meaning that he did not mix honey into it; for if he mixed honey and it is the majority, one blesses shehakol — for the rule "whatever has in it from the five species" applies only where one blesses on it borei minei mezonot; but in a case such as this, where one blesses on it borei peri haAdamah, not. And I brought the words of Shach in the name of Riaz on this, that it appears to me this is the main law — see there. And after much time I found in Eshel Avraham that he wrote in the name of responsum Beit David likewise to emend "when they split them" — and I rejoiced.`,
);
patch(
  ye,
  "yad-ephraim",
  3,
  "_",
  `<b>(Seif 6 and 5)</b> Even live barley — meaning that this doubt also applies regarding the after-blessing, as Beit Yosef wrote in the name of Rashba and as written in the gloss. However, Bach disagrees with Beit Yosef and Rama regarding blessing on live barley, and wrote that the law is with Abudraham — for oil harms, etc.; and he wrote that from this is proof to Rambam that on oil one blesses shehakol — from chewed barley, etc. And furthermore, Gemara is precise: wheat flour, etc.; and ostensibly, from where do we know to distinguish somewhat between them? Rather, certainly because barley flour harms, etc. — see there. And I wondered that in Machazit Hashekel, incidentally in passing, he wrote leniently that Gemara in its place says explicitly regarding barley flour: one might have thought that since it is difficult for kohanim one should not bless on it at all — it teaches us that since one has benefit from it, one must bless (and see Shabbat daf 109, that kohanim are from barley flour, that after thirty days from when it was ground it becomes difficult for them; and it implies that before this it is not difficult — and here, where he says one might have thought that since it is difficult, etc., this is because he cited an unspecified case, and included in this rule is also when thirty days have passed). And see in Bach that he also wrote proof from the words of Shulchan Aruch here, that it teaches us that since one has benefit, etc. — see there. And in the aforementioned kuntres I wrote that this is not proof — for many things they said are difficult, such as turnip and cucumbers; and likewise Rambam in Hilchot De'ot wrote that in several herbs and mushrooms it is hard on the body and one should not eat them ever — and in all of them it is proven that one blesses on them; and necessarily one should not compare this to that, and you have only what the Sages said in terumah: exempt from it — derive to blessing. And if so, one may say that barley flour is different: even though it is difficult, nevertheless it is not as harmful as barley; and as Bach wrote there, per the poskim not like Rambam — see there. And nevertheless I wrote to settle the view of Beit Yosef and Rama according to what there is to wonder about Raavad, chapter 10 of Terumot, who wrote regarding chewed wheat: even though one blesses on it borei peri haAdamah, nevertheless it is harmful — see there. And it is puzzling: if so, why does Gemara challenge on oil "harms, etc."? And I wrote that on oil specifically he says so, for it changed; and according to what is plausible that one drinks oil itself — it changed for the worse, since it harms and it has benefit through anigron — therefore he holds that one should not bless borei peri haEtz; unlike chewed wheat: even though it harms, one may say we are not concerned about this, and one has benefit from it and must bless, since it did not change at all and stands in its word. And according to this, in Raavad's view the law is the same also for chewed barley — for according to him chewed wheat is also harmful; and necessarily "chewed barley" that he cited is not precise, and one should not distinguish between wheat and barley regarding blessing as well — and I shortened. And what he wrote "and it is not similar to flour" — this requires further study: for in Gemara we say thus according to R' Nachman, but according to R' Yochanan one does not distinguish whether it changed or not; and that which we rule shehakol is not because it is clear to us that we hold like R' Nachman, but only because of doubt; but regarding blessing one should not be lenient. And this requires further study on Rosh and Tur: they should have written also flour and roasted grain that one ate within the meal, as written regarding chewed wheat; and so is explained in Rashba and in Sefer Chasidim in the name of R' Simcha; and in the aforementioned kuntres I expanded on this, and there I wrote in the name of Kanahag, and Bach agreed with him, that for chewed wheat b'dieved if he blessed borei nefashot he has fulfilled; and the same law applies here — even though it appears to me one should be stringent regarding flour of roasted grain or that was not ground well and still has taste of wheat, that one should eat it only within the meal — nevertheless b'dieved he fulfills with borei nefashot; therefore if it occurred that he ate not within the meal, he should bless borei nefashot.`,
);
patch(
  ye,
  "yad-ephraim",
  4,
  "_",
  `<b>(Magen Avraham note 15)</b> We learned in tractate Challah — see what I wrote in the aforementioned kuntres at length on this sugya of challah (and now it is printed in my responsa Beit Efraim from Tadrashnu; and after I wrote, Pri Megadim on Orach Chayim was published, and in the introduction to Hilchot Pesach he also expanded on this method; and I saw that some intended thus with God's help and some did not follow his ways — but it is difficult to finish in the old manuscript, and I will record what I saw by way of passing reference). There in seif 1 he wrote to resolve the words of Rashi from the mishnah of Challah — see Yeshuot Shmuel siman 46, who already explained the matters there likewise. And there in seif 2 he brought responsum of Ralbach: for Rambam, in ke'ein peras even if he did not eat a peras it is forbidden — it appears to me that this does not contradict what I wrote in my kuntres according to Rambam, because even though he holds it is forbidden, this is on account of half a shiur; but nevertheless one is not lashed for it and it does not become forbidden. And there in seif 3 he wrote that it is possible that even though one is not lashed, nevertheless since the taste of Torah is abundant, one fulfills through this; and he brought the words of Mabit, and not like Perach — I already explained that Yeshuot Shmuel's view is also thus; but it does not appear to me as written from Gemara Zevachim, and I wrote a word in the reason that whatever one is not lashed for does not become forbidden, etc. — see there. And in seif 5 he challenged: why do we need majority of grain? Behold, a kezayit in ke'ein peras is d'oraisa. And according to what I wrote in my kuntres this is settled: for otherwise one need only take out according to calculation even though there is there a measure of grain — only per the one who holds it becomes [forbidden], one must answer otherwise: that if there is no majority of grain it does not pull. And what he wrote there that it is proven that they disagree on R' Levi, that he ruled like Rashba — it is not necessary; for even though they stand on the mishnah, the case is where there is no measure, and therefore he holds one requires majority of grain; and nevertheless it could be that he holds like Rashbag. And what he wrote in the case that we follow majority even to leniency — and likewise in seif 1 on Magen Avraham — see what I wrote on this matter; and what he wrote in seif 10 to challenge from mishnah of se'or in dough, and from this that R' Hila holds majority of grain and holds groira — according to what I wrote, there are several ways to settle it; and one is that it is impossible to take out according to calculation if not because of groira. And what he wrote in seif 18 that Mechaber in siman 210 holds specifically eating a kezayit of grain — and I wrote that it does not depend on eating but on the measure.`,
);
patch(
  ye,
  "yad-ephraim",
  5,
  "_",
  `<b>(There)</b> Raavad and Rashba wrote "and if there is," etc.; and likewise Rambam holds, etc. — "bread is written," and also matzah is compared in Gemara; and here, since a kezayit is mixed in more than ke'ein peras, etc. — so it should read.`,
);
patch(
  ye,
  "yad-ephraim",
  6,
  "_",
  `<b>Note 16:</b> in al ha'aretz ve'al haMichya ve'al haKalcha, etc. — such is the nusach of Tur, and so wrote Levush; and so he emended in Ma'adanei Melech in Ashkenaz according to Levush; and so it is in Ohr Chadash and in the siddur of Mahar"i Emdin. But Beit Yosef brought in the name of Semag not to conclude except on haMichya alone, and wrote that this is the nusach of Bahag — see there; and so this nusach appears in some books and siddurim. And it is also clear that those who conclude on haMichya and on haKalcha say at the beginning "and we will thank You for haMichya alone"; and in the nusach that concludes on haMichya alone, on most of them there is "and we will thank You for the land and for haMichya and for haKalcha." And in Leket Tov vol. 2 siman 55 I saw that he wrote that in al ha'aretz they conclude "and for its sustenance and for its economy," and the word "its economy" is written in a half-circle because of the exchange of nuschaot — see there. And this requires further study on Magen Avraham, who emended in Rosh: if because of the nusach in Tur one attributes the words of Rosh to textual corruption — I would say the reverse, that there is textual corruption in Tur. And it appears he relied on Levush, who adopted the nusach of Tur in this — it appears he holds that this is the main [nusach] — and this requires further study.`,
);
patch(
  ye,
  "yad-ephraim",
  7,
  "_",
  `<b>(Note 22)</b> If he erred, etc. — and see in Eben HaEzer who disagrees on this; and in the aforementioned kuntres I wrote to settle the proof of Bach. And see in Leket Tov vol. 2 siman 149, who rules that whether he blessed borei peri haEtz on wine or borei peri haAdamah on bread, he has not fulfilled — and the reason is that since every species and species has its general blessing except bread and wine, which were singled out to learn a new matter, that they established for them a separate blessing because of their importance — you cannot return them to the general category of other fruits, for it is called a change from the coin that the Sages stamped in particular and removed from the general category — end of his words — see there. And the proof of R' Yehuda HaLevi from Tosafot daf 12, who explained in Eben HaEzer in another way — the plain meaning of the matters shows like Mahar"i HaLevi. And see in Penei Yehoshua daf 40 and in Peri Megadim vol. 1 siman 59 and in responsa Ginat Veradim general 1 siman 19, who also hold that b'dieved he has fulfilled; and I expanded on this — I wrote that to remove himself from doubt he should say 424 in borei peri haGefen and he fulfills according to all — see there.`,
);

const PATCH_COUNT = 17;
console.log(`ok siman 208 part11of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part11of11.json",
);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs",
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
