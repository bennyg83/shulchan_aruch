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

const m = "output/siman_208/mechaber/part-001.txt";
const mb = "output/siman_208/mishnah-berurah/part-001.txt";

patch(
  m,
  "mechaber",
  15,
  "main",
  `If b'dieved he blessed on grapes borei peri haGefen, or afterward on the vine, he has fulfilled.`,
);
patch(
  m,
  "mechaber",
  16,
  "main",
  `If one drank wine and water, one need not bless borei nefashot on the water, since the wine blessing exempts it — just as in the first blessing wine exempts all kinds of beverages.`,
);
patch(
  m,
  "mechaber",
  17,
  "main",
  `Birkat HaMazon does not exempt me'ein shalosh — for if one ate deisa, Birkat HaMazon does not exempt it. But for wine, Birkat HaMazon exempts — for if he blessed Birkat HaMazon on wine instead of on the vine, he has fulfilled; and the same if he blessed on dates Birkat HaMazon instead of on the tree, he has fulfilled; and even if he said only the blessing of haZan, whether on wine or on dates, he has fulfilled. And if he remembered before he concluded with the blessing of haZan, he should begin "and upon that which You apportioned to our forefathers a desirable, good, and broad land" and conclude with the me'ein shalosh blessing.`,
);
patch(
  m,
  "mechaber",
  18,
  "main",
  `One should not include any doubtful matter as an addition in the me'ein shalosh blessing, even though he is not adding the Name and kingship. <small>[Explanation: for example, if he drank a beverage that is in doubt whether its blessing is on the vine, etc., or borei nefashot rabot, etc., to eat something whose blessing is borei nefashot rabot and something whose blessing is on the tree, and he includes with it also "on the vine and on the fruit of the vine," etc., out of doubt] (Terumat HaDeshen, and so in Mordekhai chapter Keitzad Mevarchin, and see above seif 16):</small>`,
);
patch(
  m,
  "mechaber",
  2,
  "main",
  `The five species of grain that one cooked or crushed and made from them a dish such as a pot dish, thin porridges, groats, and deisa — even if he mixed with them much honey more than them or other species much more than them — one blesses on it borei minei mezonot and afterward al haMichya. But if he did not put the grain in the dish for food but only to bind and thicken it, it is nullified in the dish.`,
);
patch(
  m,
  "mechaber",
  3,
  "main",
  `When one puts flour into almonds that one makes for a sick person — if one does so in order that the heart be sustained, one blesses borei minei mezonot. And if for binding in general, one does not bless borei minei mezonot; and it is good to be stringent and to swallow it during the meal after the haMotzi blessing and be exempt.`,
);
patch(
  m,
  "mechaber",
  4,
  "main",
  `If one ate raw grain or roasted or cooked and the kernels are whole, one blesses only borei peri haAdamah and afterward borei nefashot. {Rama: And that which one blesses before it borei peri haAdamah — this is for eating wheat and the like that are fit to be eaten thus; but one who eats whole barley, even roasted in fire, they are not fit to eat except under duress, and one does not bless before them except shehakol. [Kol Bo, and so is implied from the words of Rashba that what he equated wheat to barley is for the after-blessing and not the first.]} And Tosafot were in doubt whether one blesses afterward me'ein shalosh; and therefore they wrote that it is proper not to eat it except during the meal and exempt it with Birkat HaMazon.`,
);
patch(
  m,
  "mechaber",
  5,
  "main",
  `Flour, even of wheat — one blesses on it shehakol and afterward borei nefashot — whether it was ground very fine, whether it was ground somewhat and still has taste of wheat, whether flour of roasted grain.`,
);
patch(
  m,
  "mechaber",
  6,
  "main",
  `Flour of one of the five species of grain that was cooked [meaning: cooked a lot] and mixed with water or other beverages — if it was thick so that it is fit for eating and to chew it [meaning: to grind it in the mouth], one blesses borei minei mezonot and afterward al haMichya; and if it was soft so that it is fit for drinking, one blesses on it shehakol and afterward borei nefashot.`,
);
patch(
  m,
  "mechaber",
  7,
  "main",
  `One who eats rice blesses on it borei peri haAdamah and afterward borei nefashot; and if one cooked it {Rama: until it was crushed [Beit Yosef in the name of Rosh and R' Yitzchak]} or ground it and made bread from it, one blesses on it borei minei mezonot and afterward borei nefashot — and this is when it is not mixed with something else but rice alone; and if he mixed from it into another dish and the other dish is the majority, one blesses on it as for that dish.`,
);
patch(
  m,
  "mechaber",
  8,
  "main",
  `On bread of dochan and polizo or of other kinds of legumes one blesses shehakol and afterward borei nefashot. {Rama: One who makes a dish from other kinds of legumes — if they remained whole and good when cooked like beans, one blesses borei peri haAdamah; and if they were completely crushed or are not good when cooked like beans, one blesses shehakol. [And so Beit Yosef explained the words of the Tur]:}`,
);
patch(
  m,
  "mechaber",
  9,
  "main",
  `If one mixed flour of dochan and other kinds of legumes with flour of the five species of grain and cooked it in a pot, one blesses borei minei mezonot and al haMichya; and if he made bread from it, one blesses haMotzi and Birkat HaMazon — but only when there is in that flour of the five species enough that one eat from it a kezayit of grain within the time of eating a peras. But if it does not have this measure of the five species, one does not bless finally Birkat HaMazon but at the beginning one blesses haMotzi since it has taste of grain even though it does not have a kezayit within the time of eating a peras, and finally al haMichya; and if he cooked it in a pot, at first one blesses borei minei mezonot and afterward borei nefashot.`,
);

patch(
  mb,
  "mishnah-berurah",
  1,
  "_",
  `(1) He blesses after them, etc. — because from their importance Eretz Yisrael was praised with them, as written in the verse "a land of wheat and barley, and vine and fig and pomegranate, a land of olive oil and honey" [and that is dates from which honey flows] — they established for them an important blessing by itself after them.`,
);
patch(
  mb,
  "mishnah-berurah",
  10,
  "א",
  `(50) Me'ein shalosh — the text of the blessing: Baruch Atah Hashem Elokeinu Melech haOlam, al haMichya ve'al haKalcha ve'al tnuvat hasadeh ve'al eretz chemdah tovah u'rechavah sheratzita vehinchalta laAvoteinu le'echol mipiryah u'sevua mituvah, rachem Hashem Elokeinu aleinu ve'al Yisrael amekha ve'al Yerushalayim irekha ve'al Tzion mishkan kevodekha ve'al mizbechakha ve'al heichalekha, u'vneh Yerushalayim ir haKodesh bimheirah beyameinu vehe'elinu letokha v'samachnu bevinyanah, v'nochal mipiryah v'nisb'ah mituvah [and there are those who do not say "v'nochal mipiryah v'nisb'ah mituvah"], u'nevarechekha aleha bekedushah u'vtaharah, Ki Atah Hashem tov u'metiv laKol, v'nodeh lekha al haAretz ve'al haMichya, Baruch Atah Hashem al haAretz ve'al haMichya. [And this blessing is called me'ein shalosh because it has in it an aspect of the three blessings of Birkat HaMazon — that is, corresponding to the blessing of haZan one says here al haMichya or al haGefen or al haEtz; and corresponding to the second blessing that is on the land and on the food one says here "ve'al eretz chemdah tovah," etc.; and corresponding to the third blessing that builds Jerusalem one says here "u'vneh Yerushalayim"; and corresponding to haTov vehaMetiv, which is the fourth blessing in Birkat HaMazon, one also says "Ki Atah Hashem tov u'metiv"; and even though this blessing has an aspect of four blessings, it is called me'ein shalosh because the essence of Birkat HaMazon from the Torah is only three blessings, and haTov vehaMetiv is d'rabbanan.] And on fruits one says al haEtz ve'al peri haEtz ve'al tnuvat hasadeh ve'al eretz, etc.; and on wine one says al haGefen ve'al peri haGefen ve'al tnuvat hasadeh ve'al eretz, etc.; and regarding the conclusion for wine it is explained in the adjacent seif.`,
);
patch(
  mb,
  "mishnah-berurah",
  10,
  "ב",
  `(51) Of fruits outside the land — meaning when they are of the seven species.`,
);
patch(
  mb,
  "mishnah-berurah",
  10,
  "ג",
  `(52) And on the fruits — that one cannot say "its fruits," since they are not from the fruits of Eretz Yisrael; and even if they were brought to Eretz Yisrael and one ate them there, since they grew in chutz la'aretz [Pri To'ar and Eliyahu Rabbah].`,
);
patch(
  mb,
  "mishnah-berurah",
  10,
  "ד",
  `(53) On the land and on its fruits — that one praises Hashem for His giving us the land that produces those fruits.`,
);
patch(
  mb,
  "mishnah-berurah",
  10,
  "ה",
  `(54) Eats from the fruits of the land — meaning when he knows that they are from the fruits of the land; but in doubt, such as in chutz la'aretz adjacent to Eretz Yisrael, one says on the fruits; and the same when one eats in Eretz Yisrael and does not know whether they are from the fruits of the land or were brought from chutz la'aretz — one also blesses on the land and on the fruits.`,
);
patch(
  mb,
  "mishnah-berurah",
  11,
  "א",
  `(55) One does not conclude, etc. — for just as on the five species of grain one says in his conclusion on the land and on haMichya, and likewise on fruit of the tree one says in his conclusion on the land and on the fruits, so too on fruit of the vine one must also mention land in the conclusion; nevertheless b'dieved if he did not mention land, Magen Avraham wrote that he has fulfilled.`,
);
patch(
  mb,
  "mishnah-berurah",
  11,
  "ב",
  `(56) On the land and on peri haGefen, etc. — the Mechaber's reason is because there are opinions among the poskim: some Rishonim hold that just as in the opening of the blessing on wine one begins on the vine and on peri haGefen because of its praise and eminence, so one must mention its praise also in the conclusion of the blessing; and some Rishonim hold that in the conclusion of the blessing it suffices if he mentions simply "and on the fruits," and one should not change its formula from other blessings — and therefore the Mechaber left it unspecified to teach that one may do as he wishes; and see in the Acharonim that it appears from them that the custom is to conclude on the land and on peri haGefen. And nevertheless b'dieved if he concluded on the land and on the fruits, he certainly has fulfilled.`,
);
patch(
  mb,
  "mishnah-berurah",
  12,
  "א",
  `(57) One mentions in it — whether on minei mezonot, whether on wine, and on fruits of the land.`,
);
patch(
  mb,
  "mishnah-berurah",
  12,
  "ב",
  `(58) Me'ein haMe'orei — that is, before he says "Ki Atah Hashem tov u'metiv," on Shabbat he says "V'samachnu bah, ratzah v'hachalitzanu beyom haShabbat hazeh"; and on Yom Tov he says "V'zachreinu letovah beyom chag peloni hazeh"; and likewise on Rosh Chodesh he says "V'zachreinu letovah beyom Rosh Chodesh hazeh"; and b'dieved even if he did not mention me'ein haMe'orei he has fulfilled.`,
);
patch(
  mb,
  "mishnah-berurah",
  12,
  "ג",
  `(59) But not on Chanukah and Purim, etc. — for even in Birkat HaMazon one is not obligated to mention them from the law but only from custom, and here there is no custom at all for this [Gra].`,
);
patch(
  mb,
  "mishnah-berurah",
  12,
  "ד",
  `(60) And he should precede haMichya — because its blessing is borei minei mezonot, which is important and distinct, and also they precede in the verse; and afterward wine, which is also important and has a blessing in its own right.`,
);
patch(
  mb,
  "mishnah-berurah",
  12,
  "ה",
  `(61) And on peri haGefen and on the fruits — Magen Avraham inclined not to say only "and on the fruits," and so appears in Biur HaGra, and the custom of the world is as the Shulchan Aruch; and a blessing that does not require the Name is not relevant here, for one does not add the Name — therefore there is no insistence that one say peri haGefen and fruits; and at any rate b'dieved if he did not say peri haGefen he certainly does not repeat [Chayei Adam].`,
);
patch(
  mb,
  "mishnah-berurah",
  13,
  "א",
  `(62) That they too, etc. — behold, according to law me'ein shalosh does not exempt borei nefashot, and likewise the reverse [Acharonim].`,
);
patch(
  mb,
  "mishnah-berurah",
  13,
  "ב",
  `(63) They are fruit of the tree — meaning rather that because they are not so important they did not establish this blessing upon them; and now that one blesses in any case, this blessing exempts — but specifically if he ate apples themselves; but if he squeezed them and drank their liquid, he is not exempt with the blessing on the tree, for it is not fruit at all.`,
);
patch(
  mb,
  "mishnah-berurah",
  13,
  "ג",
  `(64) And he drank wine — and even for those poskim who hold that in the conclusion in the wine blessing one concludes on the land and on the fruits, as above in seif 11 — nevertheless, since in the opening he mentions only the vine, apples are not included and he has not fulfilled [Magen Avraham]; and there are Acharonim who wrote that if he concluded in the wine blessing on the land and on the fruits, it is possible that he fulfills also for apples. And therefore one should be careful where one eats apples and drinks wine that he bless first borei nefashot on the apples, or conclude in the wine blessing on the land and on peri haGefen.`,
);

const PATCH_COUNT = 28;
console.log(`ok siman 208 part6of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part6of11.json",
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
