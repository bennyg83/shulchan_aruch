#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`mishnah-berurah:1:א`, `(1) One must not run on Shabbat — as it says "and you shall honor it from pursuing your ways" (Isaiah 58:13), and they expounded that your walking on Shabbat should not be like your walking on a weekday, for a person's way is to hurry and run after his business. And even on a weekday one may not take a coarse step that removes one three-hundredth from the light of one's eyes; but on Shabbat there is also prohibition from "your ways."`],
  [`mishnah-berurah:1:ב`, `(2) And it is forbidden, etc. — and likewise forbidden to jump.`],
  [`mishnah-berurah:1:ג`, `(3) More than an amah — meaning there should be half an amah between foot and foot, and one foot is also half an amah; this is for an average person whose average step is an amah; a very tall person according to his step measure.`],
  [`mishnah-berurah:1:ד`, `(4) If it is possible, etc. — when possible it is explained in seif 3 that it is permitted.`],
  [`mishnah-berurah:2:א`, `(5) Permitted — even l'chatchila, for this is their pleasure.`],
  [`mishnah-berurah:2:ב`, `(6) And likewise to see — meaning every person may run to see something he enjoys.`],
  [`mishnah-berurah:2:ג`, `(7) Permitted to stroll — even if his intent is exercise and warming for healing, nevertheless permitted since it is not apparent he does so for healing; forbidden to run to warm for healing since it is apparent; and forbidden because of crushing healing herbs; some are stringent even on stroll if for healing exercise.`],
  [`mishnah-berurah:3:א`, `(8) To skip and jump — skipping is when he pauses his feet in a wide area; jumping is when he jumps with both feet in one bound.`],
  [`mishnah-berurah:3:ב`, `(9) Rather than go around — how can jumping be permitted but going through? Because going through has squeezing concern; they did not permit unless as in seif 306 and 307.`],
  [`mishnah-berurah:4:א`, `(10) To greet his teacher — and likewise his father's face [Gemara]; and see Magen Avraham who wrote that man and woman are equal in the mitzvah of receiving a face; and it appears woman is specifically with her husband's permission.`],
  [`mishnah-berurah:4:ב`, `(11) Or the face of one who is great — to exclude the rabbi at his student's place, forbidden; and if he is a student who needs his rabbi in some matter, whether for his sharpness or because he has traditions from other great ones — Taz wrote he may pass through water, for in any case he is greater in something; in Tosafot Shabbat they forbade this. And if the rabbi is uncertain in something and goes to ask his student who knows this, it is like Taz — no less than other mitzvah matters.`],
  [`mishnah-berurah:4:ג`, `(12) And in Shulchan Aruch HaRav in the gloss — meaning there it is explained that even if there is another path to go around, better to pass through water than to increase walking, since he goes for a mitzvah; but the latter agreed there that since he can go around, better to go around than pass through water.`],
  [`mishnah-berurah:5:_`, `(13) So that it not be a stumbling block for him — that another time they not go for a mitzvah since they did not permit him to return [Rashi].`],
  [`mishnah-berurah:6:א`, `(14) To guard his produce — for guarding his money is also somewhat a mitzvah; nevertheless they did not permit on the return, for it is not so much a mitzvah matter; and "so that it not be a stumbling block" does not apply here, for what do we care if he refrains and does not spare his money; and certainly he will not refrain from going to guard, for a person is agitated about his money.`],
  [`mishnah-berurah:6:ב`, `(15) To pass through water — provided he not take out his hands, etc., as above in seif 4.`],
  [`mishnah-berurah:7:א`, `(16) Everything that goes out, etc. — see Biur Halacha what we wrote a little in the introduction to this siman and siman 303.`],
  [`mishnah-berurah:7:ב`, `(17) And it is not a way of wearing — for if he took it out as a way of wearing, he did not take it out as all carriers do, for whoever carries something that is not an ornament for him carries it in his hands and not as wearing.`],
  [`mishnah-berurah:7:ג`, `(18) And he took it out as the way, etc. — meaning not with a change.`],
  [
    `mishnah-berurah:7:ד`,
    `(19) Liable — know that wherever it says "liable" in Shabbat laws, if done intentionally he is liable for kares; if unintentionally — meaning he forgot it was Shabbat or did not know this melacha is forbidden — he is liable for a chatas [and see below siman 334 seif 26 in the gloss how to conduct nowadays]; but if he forgot an item with him and took it out unintentionally to reshut ha-rabbim, he is not liable, for melacha requires intent — meaning he takes it out intentionally but does not know it is Shabbat or this melacha is forbidden; laws of reshut ha-rabbim see below siman 345 seif 7 and what is written there.`,
  ],
  [`mishnah-berurah:7:ה`, `(20) Forbidden to go out in it — lest it fall and he come to carry a d'oraisa prohibition.`],
  [`mishnah-berurah:7:ו`, `(21) That its way is to remove them — and we worry lest in the meantime he come to carry a d'oraisa prohibition.`],
  [`mishnah-berurah:7:ז`, `(22) Not with a sword — and even if girded at his waist, for this is the way of carrying out on weekdays.`],
  [`mishnah-berurah:7:ח`, `(23) And not with a club — resembling a stick with round head like a ball [Aruch].`],
  [`mishnah-berurah:7:ט`, `(24) And not in armor — from the language "coat of mail, scale armor" (1 Samuel 17).`],
  [`mishnah-berurah:7:י`, `(25) Exempt though they are, etc. — nevertheless forbidden because of maris ayin, lest onlookers suspect he wants to fight with them on Shabbat; and even in inner chambers forbidden, as written in siman 301 see there.`],
  [`mishnah-berurah:7:כ`, `(26) He may not go out with tefillin because of, etc. — and it implies in his house there is no prohibition to lay tefillin, specifically when laying them not for the mitzvah; but for the mitzvah forbidden as above siman 31 and see there in Mishna Berurah note 5.`],
  [`mishnah-berurah:7:ל`, `(27) That he needs, etc. — meaning lest he come to carry a d'oraisa prohibition; and it implies without this reason it would not be forbidden to go out in them even though we hold Shabbat is not time for tefillin, because they are a way of wearing; see below siman 308 seif 64 in gloss and Mishna Berurah there, and above siman 31 in Biur Halacha.`],
  [`mishnah-berurah:7:מ`, `(28) A small person in a large shoe — meaning a person who is small in a shoe too large for him.`],
  [`mishnah-berurah:7:נ`, `(29) In one that has no wound — the reason: they still do not mock him, for they know he cannot wear the shoe on the leg where the wound is, for his wound proves it; see Biur Halacha.`],
  [`mishnah-berurah:8:א`, `(30) He may not go out — this seif deals even with an ordinary person who is not a craftsman; see below seif 12.`],
  [`mishnah-berurah:8:ב`, `(31) In his garment — but if he took it out in his hand, man and woman are liable in every case, pierced and unpierced.`],
  [`mishnah-berurah:8:ג`, `(32) Even if unpierced — for a needle is not an ornament for a man in any manner; therefore there is prohibition for all.`],
  [
    `mishnah-berurah:8:ד`,
    `(33) With pierced needle liable — this opinion holds for a man his law is like a woman; below siman 303 seif 9, pierced is the way of carrying out at times when stuck in his garment [and what is below seif 12 explains even a craftsman is exempt, explained there in Mishna Berurah]; but unpierced exempt, for not the way of carrying out to take out when stuck in his garment, only in his hand. And some hold the opposite: for a man a pierced needle stuck in his garment is not the way of carrying out, for it is a disgrace that they say he is a tailor; but unpierced is the way at times even on weekdays when he finds it in the market to stick in his garment when he needs to pick his teeth, etc.; see Magen Avraham who concludes everything depends on the time: if their custom is to carry out thus on weekdays and it is not an ornament, this is their way of carrying out and he is liable; if not their way on weekdays, exempt but forbidden because not an ornament; and he wrote further: if most of the world do not carry out thus, even if people of one place do, exempt but forbidden, for their opinion is batel to everyone.`,
  ],
  [`mishnah-berurah:9:א`, `(34) That has no seal on it — for it is only ornament for a woman; for a man it is a burden; and it deals when he took it out while placed on his finger; but if in his actual hand, even with a seal, liable according to all.`],
  [`mishnah-berurah:9:ב`, `(35) And if he went out he is liable — and it is called way of carrying out on his finger, for sometimes a woman gives her husband a ring to bring to a craftsman and he leaves it on his finger until he arrives; if so, even on weekdays this is way of carrying out and he is liable.`],
  [`mishnah-berurah:9:ג`, `(36) For Rashi exempt — meaning exempt but forbidden d'rabbanan, for even a ring with a seal is ornament for a man, for his custom on weekdays is to sign with it on documents; nevertheless forbidden, for they decreed lest he remove and show and come to carry a d'oraisa prohibition, as with all women's ornaments they decreed for this.`],
  [`mishnah-berurah:9:ד`, `(37) That it is not ornament, etc. — he holds for a man they did not decree lest he remove and show, for it is not his custom; but something that is ornament for man and woman, even for her it is forbidden, for the Sages did not distinguish and forbade it for a man too.`],
  [`mishnah-berurah:9:ה`, `(38) And see above siman 303 seif 8 — meaning there is explained how to practice in our time; it implies there one should not protest a man who wears them; in Chiddushei R' Akiva Eiger he wrote there a ba'al nefesh should be concerned for himself not to go out with a ring at all.`],
  [`mishnah-berurah:10:א`, `(39) Unless, etc. — for he can sign documents with it.`],
  [
    `mishnah-berurah:10:ב`,
    `(40) Engraved — and likewise if the letters on the ring protrude, for then when pressed in wax it sinks, also called a ring with a seal; but he mentioned engraved because of forms: protruding forms are sometimes forbidden even on weekdays to leave in one's house, such as a complete human form, as in Yoreh Deah siman 141 seif 5; some explained these forms do not deal with human forms at all, or only a face on one side, which all permit whether protruding or sunken; and what he mentioned engraved is the usual way of speaking.`,
  ],
  [
    `mishnah-berurah:11:א`,
    `(41) Forbidden, etc. — meaning even if his intent now is to hang on his neck as ornament; forbidden from the viewer's perspective; and this is even according to Rabbenu Tam and Rambam above seif 9 who permit ornament for a man; or it deals when the key is fixed well in the chain on his neck and not easy to remove and show; nevertheless forbidden because of maris ayin.`,
  ],
  [
    `mishnah-berurah:11:ב`,
    `(42) If of silver — since there is no custom to make a key of silver, its essence is made for ornament; and even though they also use it, nevertheless its essence is for ornament and permitted when he takes it out for ornament; but if of iron and copper, even if made for adornment like ornament, forbidden to go out, for its essence is for use, as all keys are made of iron and copper [Levush]. And from the Shulchan Aruch's words it implies his view is the first opinion, since he ruled it in the stam; nevertheless one should not protest after Darkei Moshe wrote in the name of Hagahot Maimoni that in Ashkenaz they practice as the permissive view regarding silver.`,
  ],
  [`mishnah-berurah:11:ג`, `(43) Forbidden to go out with a pouch — meaning a silver pouch fixed on a chain hung on his neck for ornament; but one who takes it in his hand in any case forbidden, even finished ornament [Acharonim].`],
  [
    `mishnah-berurah:11:ד`,
    `(44) The eyeglasses themselves are a burden — and likewise a silver sheath, even if made to adorn, if there is a knife in it we do not say the knife is batel to the silver sheath or the eyeglasses to the pouch; on the contrary the knife and eyeglasses are primary, for we do not say the eyeglasses were made for the pouch but the pouch for the eyeglasses; and likewise sheath for knife. All this deals with carrying the eyeglass pouch with the eyeglasses inside on his neck as ornament; carrying the eyeglasses themselves on his nose where there is no eruv is certainly forbidden in any case, lest they fall and he come to carry a d'oraisa prohibition [Chayei Adam].`,
  ],
  [
    `mishnah-berurah:11:ה`,
    `(45) In this to permit — specifically when attached and fixed at the top of the belt and made like a clasp [like a hook or what we call Franzes] to belt with; then we say since the belt is attached to the iron of the key as one piece, even though the iron is also shaped like a key to lock with, the key is batel to the belt; but when fixed and attached in the middle of a belt, forbidden, for the key is not batel to the belt, for the belt does not apply at all; therefore those who permit themselves to carry on Shabbat because the key hangs from iron fixed to the belt, and especially when it hangs only by a temporary knot, is an error, for permission is only if the key itself was made from the start specifically as a clasp, then it is batel to the belt. And if the key is silver fixed in the middle of the belt, though not one body with the belt, nevertheless some permit since it is ornament, and some forbid, as above seif 11. To carry a watch [Uhr, Zeiger] in his clothes outside the eruv forbidden according to all, for ornament does not apply, since it is not a way of wearing; one who takes it to reshut ha-rabbim liable for chatas; and even if attached to the gold chain he wears on his neck which is ornament, still complete prohibition, for the watch has importance in itself and is not batel to the chain.`,
  ],
  [`mishnah-berurah:12:א`, `(46) With the needle stuck in, etc. — all these are what artisans place as a sign of which craft they are when they go to market so they will be recognized.`],
  [
    `mishnah-berurah:12:ב`,
    `(47) And if he went out exempt — for there is no way of carrying out thus, only in his hand; even a craftsman, specifically when he wants to proclaim he is a craftsman then he carries thus, but not at other times. And what the Mechaber ruled above in seif 8 in the first opinion that with pierced needle stuck in his garment he is liable even any person — there it deals when stuck in the garment in a place where on weekdays it is customary to stick for intervals; here it deals when stuck where there is no way of carrying out at all thus, only for a craftsman to show he is a craftsman; therefore not called way of carrying out and exempt even a craftsman, as R' Meir holds in the Gemara; in Biur HaGra above siman 252 at the end he ruled halacha is like R' Yehudah that a craftsman is liable; see Sefer Chemed Moshe who supports that Rif and Rosh also lean thus.`,
  ],
  [`mishnah-berurah:13:א`, `(48) The zav may not go out, etc. — for this man's way of carrying out on weekdays; nevertheless not called wearing, for it is made only to save from filth; and all saving from filth is a burden unless full clothing, as below seif 14.`],
  [`mishnah-berurah:13:ב`, `(49) In a pocket — and likewise if one ties a cloth to the hat wick to wipe his eyes, forbidden.`],
  [`mishnah-berurah:13:ג`, `(50) Clothing — in front and behind like trousers without hems; since it is a way of wearing, permitted in all manners, as below seif 14; but when only in front alone or only behind and tied with straps in front in such manner, not called clothing and forbidden.`],
  [`mishnah-berurah:13:ד`, `(51) That it not hurt — meaning blood not fall on her flesh and dry on her causing distress; therefore permitted, for since her intent is for distress, even saved from filth thereby, it is way of wearing like other clothing made to protect the body, and permitted.`],
  [
    `mishnah-berurah:14:א`,
    `(52) If he is not wearing it, etc. — meaning he wears it on top of his clothes so they not get dirty, nevertheless permitted; and what he concluded afterward in the gloss, a garment against rain or hat, etc. — meaning also even if he adds a garment on top of his clothes only because of rain, without which he would not go in it, such as a very thick coarse garment like a sack; and likewise a hat means he wears a large hat on top of his hat so it not get dirty, nevertheless permitted since way of wearing [Beit Yosef end siman 301 and likewise Shulchan Aruch].`,
  ],
  [
    `mishnah-berurah:14:ב`,
    `(53) Garment over a scarf — meaning if it is not a way of wearing, only placed on her head alone like a small linen piece; but if she wraps a bit of her body in it too, it is way of wearing and permitted, even though for saving from filth as stated; and even if garment as bad as a sack, as below seif 21, permitted even for the wealthy, since for the poor it appears important, also for the wealthy it is clothing.`,
  ],
  [`mishnah-berurah:14:ג`, `(54) That this, etc. — and if her intent is that rain not distress her, permitted in every case, even though she thereby saves her clothes from filth, provided she ties them well.`],
  [`mishnah-berurah:14:ד`, `(55) Clothing — therefore forbidden for a man to cover the hat with a patshil [Chayei Adam].`],
  [`mishnah-berurah:15:_`, `(56) Since it is not, etc. — meaning we worry lest it slip from his foot and he come to carry a d'oraisa prohibition.`],
  [`mishnah-berurah:16:א`, `(57) And the small stools in his hands — meaning he leans on them when pushed before him, and permitted, for he is like a lame person with a stick in seif 6.`],
  [`mishnah-berurah:16:ב`, `(58) Goes out in them on Shabbat — for the concern of slipping does not apply here.`],
  [
    `mishnah-berurah:16:ג`,
    `(59) Of wood — meaning even though it has no leather at all, nevertheless called a shoe; see Biur HaGra and Peri Megadim who challenged from what is below siman 614 seif 2 that implies specifically when covered with leather from above, but wood alone not considered a shoe; see there in Biur HaGra what he answered to reconcile Shulchan Aruch's view to distinguish Shabbat and Yom Kippur; nevertheless for practical law it appears he sides with Ramban that wood alone is not a shoe even for Shabbat.`,
  ],
  [
    `mishnah-berurah:16:ד`,
    `(60) And likewise in pantofles — meaning what we call in our language fantofil; for even though they slip quickly and by themselves [meaning by slipping off with the hands and without untying the knot], nevertheless since covered with leather it is somewhat tight and we do not worry lest they fall and he come to carry.`,
  ],
  [
    `mishnah-berurah:16:ה`,
    `(61) And some are stringent — in pantofles, lest they slip; and Taz below seif 40 wrote we do not worry for this, for there is no custom to walk barefoot in reshut ha-rabbim; Tosafot Shantz doubts his words somewhat see there; and it appears where there is mud certainly one should not be lenient; but according to all, if he forgot and went out in them to reshut ha-rabbim he need not remove them, only walk in them until he reaches home; and likewise all those forbidden lest he come to carry.`,
  ],
  [
    `mishnah-berurah:16:ו`,
    `(62) In a place where there is no custom, etc. — and in Darkei Moshe it implies even where their custom is to walk barefoot on weekdays, on Shabbat he should wear shoes to remember it is Shabbat; in Beit Chadash there is also somewhat for oneg Shabbat; and likewise on Yom Tov one must be careful, for oneg Shabbat and Yom Tov are equal; see siman 2 that even on weekdays it is modesty not to walk barefoot.`,
  ],
  [`mishnah-berurah:17:א`, `(63) Without a stick permitted — since he cannot walk at all without a stick, it is like his shoe.`],
  [
    `mishnah-berurah:17:ב`,
    `(64) But if possible, etc. — and likewise an elder who walks in his house without a cane and when he goes outside leans on his cane from weakness of strength and does not take it except to support himself, even though his body sways, forbidden, for the cane with him is like a burden since in his house he walks without a cane; but if the elder is so weak he cannot walk at all without a cane, permitted.`,
  ],
  [
    `mishnah-berurah:17:ג`,
    `(65) And he does not take it, etc. — and when a person walks where there is fear he will fall because rain fell and the place is slippery, or he walks in winter on frozen water [what we call ice] and fears falling, likewise permitted to go out with a cane, similar to a lame person [so Taz]; Eliyah Rabbah wrote his words are not conclusive; and among Acharonim I saw they hold one should not permit this except where there is an eruv.`,
  ],
  [
    `mishnah-berurah:17:ד`,
    `(66) Forbidden — even a stick of honor carried for honor is forbidden, for even though ornament, permission was not given to carry ornament in hand; therefore what important people used to go out with stick in hand is forbidden on Shabbat outside the eruv; but within the eruv permitted if carried for honor or if there is some need; but without any need at all there is degradation of Shabbat.`,
  ],
  [`mishnah-berurah:17:ה`, `(67) His law is like a lame person — meaning it also depends whether he can walk without a stick [Beit Yosef siman 522].`],
  [`mishnah-berurah:18:_`, `(68) Forbidden for him to go out — meaning outside the eruv; the reason: his walking itself he can walk without a cane and he takes it only to straighten his steps.`],
  [
    `mishnah-berurah:19:_`,
    `(69) And fetters, etc. — for they are considered like clothing for him, for his way of walking is thus; and they are batel to the body he wears them on; and we do not worry lest they fall from his feet and he come to carry, for presumably since forbidden in them, certainly they are firm on his feet and will not fall.`,
  ],
  [`mishnah-berurah:20:_`, `(70) One may not go out with anklimin, etc. — in all this the reason is because it is not a way of wearing; if he took out with this and likewise with the amputee's box mentioned above, exempt because he did not take out as carriers do.`],
  [`mishnah-berurah:21:א`, `(71) In a box, etc. — such as one who wants to protect himself from rain; the reason: all these are not way of wearing but a burden.`],
  [`mishnah-berurah:21:ב`, `(72) In a sack — because shepherds are accustomed to go out in them because of rain; since it is considered clothing for them, therefore permitted also for every person to go out in them even not because of rain.`],
  [
    `mishnah-berurah:21:ג`,
    `(73) Meaning coarse garments — so Rosh explained in Nedarim and Rashi on Shabbat 62 explained garment-sack; and it implies an actual sack not [requires study in our days when shepherds wore sack itself on the body how is the law; also according to them somewhat difficult why the baraita said not box and chest etc., it should have taught us regarding actual sack; and in siman 303 on Mordechai brought in name of Aderet who is Rashba that even sack permitted, requires study].`,
  ],
  [`mishnah-berurah:22:א`, `(74) With fluff and sponge — meaning placed from before Shabbat, as explained below.`],
  [`mishnah-berurah:22:ב`, `(75) In a compress cloth — a garment cloth smeared with ointment placed on the wound.`],
  [`mishnah-berurah:22:ג`, `(76) He may not return it — for it is like giving initially, which the Sages forbade to do healing on Shabbat, as below siman 328.`],
  [
    `mishnah-berurah:22:ד`,
    `(77) On the wound — and likewise if he wants to wrap them on the fluff and sponge and ointment, also forbidden; and what he concludes that with a wrapping he wraps on the ointment he may go out — specifically with a rag wrapping, for customary to throw it when permitted, therefore not considered and batel to the ointment; not so thread or ointment which are important and not batel to fluff and sponge; in Biur HaGra he wrote according to Rambam forbidden with thread and ointment only when wrapped on fluff and sponge to go out [because important they are not batel]; but on the wound itself, even if thread and ointment or other important thing wrapped, permitted to go out, for though it does not heal, nevertheless it helps that the wound not scratch; therefore not a burden; he brought proof from Tosefta language and it implies he holds thus for halacha; and so many Acharonim; as I will write below seif 28 in Mishna Berurah see there.`,
  ],
  [`mishnah-berurah:22:ה`, `(78) And he ties and unties — for in the wrapping there is no healing concern.`],
  [`mishnah-berurah:23:א`, `(79) Woven for them — therefore we do not worry lest it tear and he come to carry; and even gold buttons made only for princes' sons, we do not worry lest they mock him and he come to carry in his hand, since woven.`],
  [
    `mishnah-berurah:23:ב`,
    `(80) They are not woven — and even if tied to veils, and especially a pair on his neck, forbidden to go out, lest it tear from the veil or neck and he come to carry; and especially if gold, lest they mock him to hold him like a prince made only for the wealthy and he come to take and carry in hand; Tosafot in the name of Riv'a: even small children who are not wealthy forbidden to go out with unwoven gold pair on clothing or hanging on neck, lest they mock them and impossible their father not hear and take them, and meanwhile come to shake them d'oraisa in reshut ha-rabbim; Magen Avraham and Eliyah Rabbah brought this.`,
  ],
  [`mishnah-berurah:23:ג`, `(81) Only in a matter, etc. — such as a pair whose way in their time was on all garments for adornment; therefore permitted woven, for they did not decree lest not woven since it is ornament to the garment, the Sages did not trouble to lose and disgrace.`],
  [
    `mishnah-berurah:23:ד`,
    `(82) That there is no custom thus — meaning they decreed attached lest not attached; see Mordechai there who concluded possibly included in burden and there is chatas liability too, for not batel to garment since no custom thus; and so Rashba's responsum brought in Beit Yosef: anything not needed for the garment and no use for the garment is not batel to the garment, as if taking it out alone without garment, liable.`,
  ],
  [`mishnah-berurah:23:ה`, `(83) Permitted to go out in them — for considered clothing since customary to go out in them all weekdays; and we do not worry lest he be ashamed and take it and come to carry from fear of the kingdom; also we do not worry lest it tear and he come to carry, unlike unwoven buttons which are not important.`],
  [
    `mishnah-berurah:23:ו`,
    `(84) If attached, etc. — here requires sewn well to the veil, or at least sewn with two stitches, then like woven together, as at the start of the seif [otherwise we worry lest it tear and he come to carry like buttons; and though not clothing nor ornament, nevertheless not considered burden since in their time customary to sew thus to veils, therefore batel to garment; thus in our time where no custom to sew patshil in garment, not batel to garment and forbidden, as in Sefer Zichru Torat Moshe and Sefer Mateh Eser; some wrote since patshil is unimportant thing, batel to veil when sewn]. Tying alone to veil or belt, even tied from before Shabbat with permanent knot, also forbidden to go out, since he does not gird himself with the patshil; one who wants the patshil with him and did not sew to veil from before Shabbat has no permission to make it now like a belt to gird, since he has a belt anyway, and belt on belt forbidden as below seif 36; rather attach head of patshil to head of belt with a knot and it becomes like a long belt and he girds himself while walking in the street [Taz and Shulchan Aruch]. Some Acharonim doubt this and hold a non-permanent knot does not help; therefore l'chatchila good to do this advice itself from erev Shabbat and tie with permanent knot to belt at the head, considered a long belt to gird on Shabbat.`,
  ],
  [`mishnah-berurah:23:ז`, `(85) To cover — specifically to cover; but if sewn to belt it does not help, not batel to belt, unless sewn at head of belt and he girds himself with it, as above; see below seif 36–37 what we wrote in Mishna Berurah on this matter.`],
  [`mishnah-berurah:24:_`, `(86) That they tie them in knots — for this too is included in expert amulet, as below seif 25: one amulet of writing and one of roots, and ornament for the sick person as one of his garments; see below seif 25 when called expert amulet.`],
  [`mishnah-berurah:25:א`, `(87) One may not go out, etc. — see below siman 308 in Mishna Berurah note 129 what we wrote there.`],
  [`mishnah-berurah:25:ב`, `(88) They may go out in it — specifically when he takes it out as way of wearing, then permitted because ornament for the sick as one of his garments; but he may not hold it in his hand and pass reshut ha-rabbim [Gemara].`],
  [
    `mishnah-berurah:25:ג`,
    `(89) It makes no difference, etc. — the general difference between expert healer and expert amulet: expert healer is called only when he healed three people of one illness with three documents in which one spell was written in all, even only once each, then this man becomes expert even for others with this illness if he writes this spell, for he was strengthened by three people that he is expert to heal with this spell [but for other spells he never becomes expert, only this spell whose proof was clarified]; expert amulet such as one who wrote one spell in one document and healed with that document three times, thereby that document became expert, every person with this illness who carries this document will be healed, specifically that document itself; but if this spell is written in another document, it does not help, for only that document was strengthened. And even if that man himself writes who wrote the first document, also does not help, for the man was not strengthened with three documents.`,
  ],
  [`mishnah-berurah:25:ד`, `(90) One spell — but wrote three spells, the man is not strengthened at all thereby, for each spell helped only one person.`],
  [`mishnah-berurah:25:ה`, `(91) Every time he writes it — even for another person; and likewise any person with that illness may take for himself and carry those first documents this expert already wrote, for since the man was strengthened as expert on this spell, what difference if he writes anew or carries what he already wrote.`],
  [`mishnah-berurah:25:ו`, `(92) And healed with it three times — even only for one person.`],
  [`mishnah-berurah:25:ז`, `(93) For every person — meaning any person with that illness may take and carry that document even though it healed only one person, for it was strengthened by its proof three times; but if he writes this spell in another document, forbidden, even if the first document healed three people, for only that document was strengthened, but the man was not strengthened for another document.`],
  [`mishnah-berurah:25:ח`, `(94) Helped three people — for if each helped only one person, it would only be expert healer and not the amulet, as above at the start of the seif; but since each document helped once for three people, the document too was strengthened.`],
  [`mishnah-berurah:25:ט`, `(95) Or for one person three times — also here the drawing three times is so there will also be expert amulet, as above.`],
  [
    `mishnah-berurah:25:י`,
    `(96) Both proofs together — such as he wrote a document and healed Reuven three times, and another document for Shimon three times, and another document and healed Shimon two more times [and still the healer was not strengthened, for he did not heal three people, nor the amulet] and afterward healed with that third document also Levi, and both proofs came together [Magen Avraham].`,
  ],
  [
    `mishnah-berurah:25:כ`,
    `(97) We do not rely, etc. — practical difference: if the healer lost his proof, such as wrote three more documents and they did not help, then also the amulet he already gave that healed three times is forbidden, for not yet strengthened; not so when both came together or amulet proof came first, then even if healer lost his proof, amulet proof stands.`,
  ],
  [`mishnah-berurah:25:ל`, `(98) Three amulets for one person — meaning three documents even though one spell.`],
  [`mishnah-berurah:25:מ`, `(99) Not the man — meaning he cannot write another document even with this spell, for since he did not heal with the three documents except one person, we say the sick person's fortune caused; Magen Avraham wrote even the sick person himself forbidden to go out with the documents that healed him, since called amulet that is not from an expert; Shulchan Aruch HaRav doubts this.`],
  [`mishnah-berurah:25:נ`, `(100) And not amulet — for amulet is strengthened only when one document healed three times.`],
  [
    `mishnah-berurah:25:ס`,
    `(101) Of writing — and if from holy scriptures, forbidden to go out to reshut ha-rabbim unless covered with hide or d'oraisa prohibition; otherwise we worry lest he need to relieve himself and remove them and come to carry d'oraisa; and if sick with danger to life, if they remove from him then no need to remove in any manner, permitted to go out.`,
  ],
  [`mishnah-berurah:25:ע`, `(102) Of roots — of root signs.`],
  [`mishnah-berurah:26:_`, `(103) To say — and likewise trusted on the amulet to say it is expert, for we do not suspect he intends to cause stumbling.`],
  [`mishnah-berurah:27:א`, `(104) In a locust egg — it is a locust; see Gemara what all these are for; in their time these things were expert for healing and have law of expert amulet, permitted to go out when hanging on him.`],
  [`mishnah-berurah:27:ב`, `(105) And it is not evident it is for healing — meaning not evident it is for healing; and what is permitted in the aforementioned, since those who know will say it is for healing from the segulah, it is as evident.`],
  [`mishnah-berurah:27:ג`, `(106) Any spell permitted — even if not yet expert and we do not know they heal, nevertheless permitted on Shabbat, for since we know there are spells that heal we say perhaps this too will heal, somewhat evident since customary that spells heal; prohibition only in those we know are not effective.`],
  [`mishnah-berurah:27:ד`, `(107) In every amulet that is not expert — Gra challenged: we learned one may not go out in non-expert amulet, implying on Shabbat only; see Levushei Serad who was pressed to reconcile; and if the sick person has danger concern, it appears permitted according to all in every manner.`],
  [
    `mishnah-berurah:28:א`,
    `(108) And it also heals — from Tur's language; implies in something that does not heal but only prevents his foot being struck, forbidden; and he goes to his reason in seif 22 see there; but in Shulchan Aruch HaRav he brought in name of several poskim that even if it does not heal but only protects from pain, also permitted to go out; and so Tosafot Shantz in name of Maharshak; see above seif 22 what we wrote in name of Gra that Rambam's view is likewise; therefore if he cut his finger on Shabbat and wraps a garment piece so it not scratch his clothes, permitted to go out; nevertheless better to wrap on that place with some rag, for on this Peri Megadim sides that according to all permitted to go out, not considered and batel to wound; nevertheless in every case must wash first blood on his finger so it not stain.`,
  ],
  [`mishnah-berurah:28:ב`, `(109) Permitted to go out — specifically when he tied the coin to his foot piece from before Shabbat with unimportant rag, not considered and batel; but if tied with something important, forbidden to go out on Shabbat, as above seif 22.`],

  [`mishnah-berurah:29:א`, `(110) Meaning after, etc. — and all the more when he removed it completely from himself and folded it and placed on his shoulder, liable.`],
  [`mishnah-berurah:29:ב`, `(111) Liable for chatas — for this is not way of wearing and it is a burden.`],
  [`mishnah-berurah:29:ג`, `(112) Below his shoulders — meaning even if it does not cover most of his body; some are stringent that it must cover most of his body.`],
  [
    `mishnah-berurah:29:ד`,
    `(113) And according to this permitted, etc. — his intent in this manner that it is shortened somewhat below, since at least he is wrapped until below his shoulders; and even though he raises the hem from below, permitted, for to wrap his whole body is difficult when walking in reshut ha-rabbim even if he wears a cloak on top.`,
  ],
  [`mishnah-berurah:29:ה`, `(114) And to bring it to synagogue — here the gloss of the following seif applies [Be'er Heitev see there; and for Gra's explanation written below the gloss stands in its place].`],
  [
    `mishnah-berurah:30:_`,
    `(115) Tallit around the neck — and this does not contradict the previous seif, which deals with countries where they were accustomed to go out thus on weekdays in their homes, therefore permitted even folded and placed around the neck as way of wearing there, like a sudar that Shulchan Aruch permitted below siman 334 [Magen Avraham and Tosafot Shantz]; and what is written in the gloss "even though," etc., its place is at the end of seif 329, as above; in Biur HaGra it implies he explains what Shulchan Aruch wrote "tallit around the neck" means the two upper sides were gathered and placed around the neck but the lower hem behind was hanging down; therefore Rama concluded that even though he places the right side on his left shoulder, still permitted because customary to wear thus, and for modesty; and according to his explanation this law applies also in our country.`,
  ],
  [
    `mishnah-berurah:31:א`,
    `(116) If he intended to gather wings, etc. — meaning he took the two corners before and behind to the right and likewise left and folded and raised on his hand or shoulder; not like seif 329 where all the tallit edges behind are folded on his shoulder; here only the corners are folded on his shoulders, therefore only rabbinic prohibition and not liability, and also depends on his intent.`,
  ],
  [`mishnah-berurah:31:ב`, `(117) But our garments — the reason the garment itself remains on him as way of wearing; Acharonim imply nevertheless one should not be lenient except to raise somewhat, but not raise much and put under the arm, for it becomes a gutter.`],
  [
    `mishnah-berurah:31:ג`,
    `(118) And puts his hands through it — implies when he does not put hands through, such as women's mantles or Ashkenaz shawl-mantle, forbidden to raise, for not way of wearing; nevertheless it appears one should be stringent only to raise much, but not a little so it not get soiled, for still way of wearing.`,
  ],
  [`mishnah-berurah:32:א`, `(119) Liable — for it is way of carrying out; and likewise when he goes outside with money bundled in his pocket stuck in his garment; but at home or within eruv where there is no carrying-out prohibition, permitted in the manner explained below.`],
  [`mishnah-berurah:32:ב`, `(120) Permitted — to wear this sudar if he needs the sudar; some say "if he needs it" means he fears to leave it lest they come to rob him; but for mere need of sudar alone he was not permitted to move it.`],
  [
    `mishnah-berurah:32:ג`,
    `(121) Only that they are pierced — red gold or silver coins, for thereby not muktzeh, fit to hang on his daughter's neck as ornament; see Biur HaGra who wrote this applies also to the beginning, bundles in his sudar also need piercing; reason: if not pierced forbidden to move the sudar too, for it becomes a base for the money bundled from erev Shabbat.`,
  ],
  [`mishnah-berurah:33:א`, `(122) Forbidden to go out, etc. — and they are not batel to garment like other sewn-in things, because important and not batel; nevertheless no liability like bundles above, only prohibition because not way of carrying out.`],
  [
    `mishnah-berurah:33:ב`,
    `(123) In case of loss — meaning sewn inside his garment from erev Shabbat; their reason: since only rabbinic prohibition because not way of carrying out, as above; and all the more nowadays many poskim hold we have no d'oraisa reshut ha-rabbim, they were lenient in case of loss, for a person is agitated about his money; if we do not permit thus he will come to transgress Torah prohibition of digging and burying, etc.; Acharonim wrote likewise if he did not sew from erev Shabbat he can take out on Shabbat by another change not way of carrying out, i.e. place money between garment and flesh or in his shoe; nevertheless l'chatchila better to sew in garment from erev Shabbat.`,
  ],
  [`mishnah-berurah:33:ג`, `(124) If he must go out — such as he fears if he sits home all day they will sense he guards his money and come to rob him.`],
  [`mishnah-berurah:33:ד`, `(125) He may not go out — meaning outside eruv when wearing the garment.`],
  [`mishnah-berurah:33:ה`, `(126) One should be stringent — not to wear the garment, lest he go out in it.`],
  [
    `mishnah-berurah:34:א`,
    `(127) Folded on his shoulder — even though in tallit forbidden folded, as in seif 329, in sudar permitted, for sudar's way of wearing is thus on weekdays to fold on shoulders; all this in places where some people sometimes walk thus.`,
  ],
  [`mishnah-berurah:34:ב`, `(128) Even if there is no thread, etc. — for some say in Gemara we require a thread coming from the sudar wrapped on his finger to hold it lest it fall; but we do not rule thus.`],
  [
    `mishnah-berurah:34:ג`,
    `(129) And if the sudar, etc. — meaning it is short and lacks measure to cover his head and most of him; therefore must tie both ends below his shoulders and it is like a belt and permitted though short; but if the sudar has measure to cover head and most, then even folded on shoulders permitted, as at start of seif called clothing and his way of wearing thus; see Biur Halacha what we wrote on this.`,
  ],
  [`mishnah-berurah:35:א`, `(130) For hard pads, etc. — for hard pads are not way of wearing and are a burden; Rambam implies even if thin, forbidden since hard.`],
  [`mishnah-berurah:35:ב`, `(131) Permitted — to bring them by wrapping even in reshut ha-rabbim; Rambam implies specifically if also thin like garments.`],
  [`mishnah-berurah:36:א`, `(132) Even for his fellow's need — even though he has no benefit, nevertheless not considered burden since way of wearing.`],
  [
    `mishnah-berurah:36:ב`,
    `(133) And some forbid two belts — not like two garments a person wears from cold; but two belts, what pleasure is there, and no custom to belt, it is a burden; poskim imply prohibition for all is only d'rabbanan since at least way of wearing, only forbidden because appears like burden; and all the more to belt patshil on belt, no custom to belt thus, forbidden; Chayei Adam wrote even for first opinion forbidden, since no custom to belt thus on weekdays it is evident to all he deceives to carry; even in karmelis forbidden; Taz siman 314 gave advice to attach patshil head to belt head with knot, then looks like long belt and he girds with patshil too; according to what is explained below he can gird patshil by garment break, i.e. if belt is above he girds on pants; forbidden to tie handkerchief around leg, not way of wearing at all; rather do as above or wrap around neck as clothing.`,
  ],
  [
    `mishnah-berurah:36:ג`,
    `(134) One on the other — where customary to belt unter gartel and over gartel, i.e. lower not handsome and second handsome, and they do so that good to belt second over first or second is short, permitted [Peri Megadim]; Chayei Adam sides one should not protest in countries that do so. Acharonim wrote what some women do, belt with belt on the wide lower garment and thereby raise garment from ground so it not soil when mud, also permitted since need for this.`,
  ],
  [
    `mishnah-berurah:36:ד`,
    `(135) And likewise proper to practice — therefore on the upper mantle, if he wants to belt over the lower mantle, he should remove the sewn buttons; nevertheless not a burden, batel to garment after sewn, as above seif 23; not so if he belts with both, the belt is like a burden [Peri Megadim].`,
  ],
  [`mishnah-berurah:36:ה`, `(136) Two hats — for his custom on weekdays to place large hat over small hat [Or Zarua].`],
  [`mishnah-berurah:36:ו`, `(137) And likewise two anklets — on each leg, like two trousers.`],
  [
    `mishnah-berurah:37:א`,
    `(138) In sleeve-hands — the reason they are finished garment to protect from cold; some are stringent lest he need to use hands to remove a thorn or flea biting him, and we worry he forget and come to carry d'oraisa in reshut ha-rabbim.`,
  ],
  [
    `mishnah-berurah:37:ב`,
    `(139) Called gantzes — this is what we call entsich; but what we call arbel into which he puts both hands, Taz holds permitted according to all, for here no concern he remove from hand, for even if he does so it is clothing for the other hand and not called burden; some hold conversely this is stricter, for easily falls and he comes to carry, and also customary sometimes to carry thus in hand; therefore according to Shulchan Aruch one should be concerned in gantzes, also in this [Peri Megadim].`,
  ],
  [`mishnah-berurah:37:ג`, `(140) Or that he tie them, etc. — for then no concern he take out in hands.`],
  [
    `mishnah-berurah:37:ד`,
    `(141) And proper to heed his words — and now they are lenient, perhaps because many poskim hold we have no d'oraisa reshut ha-rabbim nowadays, so they did not decree lest he come to carry; Acharonim imply even though one should not protest the lenient, nevertheless every ba'al nefesh should be stringent.`,
  ],
  [`mishnah-berurah:38:א`, `(142) As required — see above siman 13 seif 1 in Mishna Berurah where all details of this law are explained.`],
  [`mishnah-berurah:38:ב`, `(143) Liable — not for the tallit, for even though he does not fulfill tzitzit mitzvah, nevertheless not liable for this because of Shabbat, for it is his clothing, but for taking out the strings.`],
  [`mishnah-berurah:38:ג`, `(144) And his intent is on them — meaning therefore not batel with the tallit, unlike straps batel to the canopy below siman 339.`],
  [`mishnah-berurah:38:ד`, `(145) Even though there is no tekhelet — for we hold tekhelet does not hinder white.`],
  [
    `mishnah-berurah:39:א`,
    `(146) Canopy — like a tallit fit to wrap in, with straps hanging; by straps they stretch it in the tent; we do not say these straps are not needed for wrapping, for straps are only to stretch in tent, and they are burdens when he wraps in it.`,
  ],
  [
    `mishnah-berurah:39:ב`,
    `(147) Hanging on the belt even though, etc. — their custom was to tie one strap end to shoes and stretch up, other end tied in his belt; sometimes he walks without shoes such as Yom Kippur or great heat, and strap remains hanging on belt.`,
  ],
  [`mishnah-berurah:39:ג`, `(148) Of silk — meaning the straps and sash hanging on its rim like gold threads; not relevant to this law at all, for adornment of belt, permitted.`],
  [`mishnah-berurah:39:ד`, `(149) If there are none, etc. — if they were tied to them, included in use of garment and permitted in all manners.`],
  [
    `mishnah-berurah:39:ה`,
    `(150) Forbidden to go out in it — since it serves nothing for the garment because one head broke off, it is a burden and not batel to garment since important; see Chayei Adam general note 56 and Nishmas Adam there who wrote according to Mechaber siman 338 that tzitzit strings are important even though mere threads, because intent to complete them; likewise loops — when permitted to go out only when not important, specifically when no intent to complete from the other side; therefore one must be careful when a strap of his garment breaks that he ties both sides; and likewise button pair when one button broke, even mere pin or iron wire not important to him, nevertheless forbidden to go out in that garment since intent to complete and fix broken side and it remains in place, then important and not batel; but if no intent to complete, since not important, batel to garment and permitted.`,
  ],
  [
    `mishnah-berurah:40:א`,
    `(151) That it spreads — specifically when the brim he extended is very hard and does not bend, then considered like a tent; otherwise like a mere cloak; next seif permitting when fastened on head deals when not hard and bends, or when no tefach width in brim.`,
  ],
  [
    `mishnah-berurah:40:ב`,
    `(152) Because of a tent — even though no tent without walls, nevertheless considered temporary tent forbidden d'rabbanan since brim made for shade from sun. Hat called britl in foreign language, even if spreads below head a tefach wide, Acharonim wrote several sides for leniency: one, since not hard and bends down no prohibition concern, when no hard paper inside; even if hard, intent in wearing not for shade only to cover head; also if brim sloped one can side it is not tent thus; Shulchan Aruch HaRav wrote world's reason relies on Rashi and his support who hold no tent prohibition in hat see there; therefore even kapelush hard with tefach brim, do not protest where lenient, though presumably such brim for shade; where not accustomed to leniency certainly be stringent per Shulchan Aruch [Rabbeinu Chananel, Rambam, Aruch, Rabbenu Tam, Rambam] not to wear such wide kapelush on Shabbat; also Ari forbids kapelush. Some refrain from putting mitzvah tallit on britl on Shabbat lest tallit be walls here and there; Magen Avraham doubts their custom; Machatzit HaShekel settles custom see there; from this spread custom not covering heads with tallit at prayer even on small hat, without reason or sense. Regarding carrying parasol on Shabbat for shade from sun and rain, we wrote siman 315 this law in all details.`,
  ],
  [
    `mishnah-berurah:41:א`,
    `(153) Made to protect, etc. — to exclude ordinary hat one wears on head, no concern he come to carry, for certainly he will not go bareheaded; this hat their custom was to wear on top of small hat [Beit Yosef and Acharonim]; from this we learn our hats too: if worn in reshut ha-rabbim over small hat as customary, be careful it be tight on head lest fall and come to carry; likewise britl where custom is lenient: if wearing small hat underneath, careful not to go out in reshut ha-rabbim, for stam not tight, surely we worry lest fall and come to carry, since he will not be bareheaded.`,
  ],
  [`mishnah-berurah:41:ב`, `(154) In reshut ha-rabbim — Taz implies even outside eruv one should be stringent; see below siman 303 seif 8 and what is written there in Mishna Berurah.`],
  [`mishnah-berurah:42:א`, `(155) That they decreed not to lay — and he fears also to carry them in hand less than d'oraisa, as below, when they sense him danger arises.`],
  [
    `mishnah-berurah:42:ב`,
    `(156) That they are tefillin — for if no straps we say perhaps amulets, for a person sometimes troubles to make amulet like tefillin; practical difference: no need to guard and hide them; see siman 11 Magen Avraham who wrote nowadays not common to make amulet like tefillin, therefore even without straps must guard and hide them.`,
  ],
  [
    `mishnah-berurah:42:ג`,
    `(157) And they are tied — meaning on head there is shin-dalet knot and on hand proper hand-knot according to his size [not larger] that he can wear; if not tied, on Shabbat forbidden to tie knot, then cannot put on as wearing; pair by pair must wait until dark and bring them.`,
  ],
  [
    `mishnah-berurah:42:ד`,
    `(158) Pair by pair — meaning one hand tefillin on hand and one head on head, insert to preserved place and remove, then return and insert another pair thus; and even though we hold Shabbat is not time for tefillin, nevertheless as he wears on weekday, not burden but ornament; on "do not add" he does not transgress since not intent for mitzvah in wearing. Magen Avraham wrote woman who finds tefillin forbidden to put on on Shabbat even as clothing, since not accustomed to lay on weekday, burden for her; some Acharonim disagree and hold since by Gemara law no prohibition, only l'chatchila improper to lay, not called burden for her; see Sha'ar HaMelech chapter Shabbat laws found in manuscript that Rabad and Rashba disagree. Magen Avraham also wrote per his view if woman went out in tzitzit tallit [mitzvah tallit not customary except for mitzvah], liable chatas, since woman not accustomed such tallit, burden for her; here too disputants.`,
  ],
  [`mishnah-berurah:42:ה`, `(159) That there not be enough time — meaning since from erev Shabbat anyway not enough time to bring all, he should not wear at all but wait there until night, guard and bring them.`],
  [`mishnah-berurah:43:_`, `(160) Rain falls — lest Torah scroll spoil, they permitted him to wrap and he wraps again in clothes from above and enters, for its honor that it not spoil in rain.`],
  [`mishnah-berurah:45:א`, `(161) In water — whether from rainwater or fell in river and his vessels got wet.`],
  [`mishnah-berurah:45:ב`, `(162) Walks in them, etc. — they did not forbid the person the clothes he wears, even if his limbs fell off alone he wears them from start and walks; it turns out specifically if he has no other clothes.`],
  [`mishnah-berurah:45:ג`, `(163) And he may not spread them — see Magen Avraham who sides specifically when soaked in water; but if little water fell, permitted to spread, no concern viewers suspect he laundered; many Acharonim hold no distinction.`],
  [
    `mishnah-berurah:45:ד`,
    `(164) And even — clothes babies wrap in called windeln permitted to spread in house to dry, even in sun in courtyard, since also child's excrement on them, proven he did not launder, no suspicion; possible even without excrement if not all soaked from urine, all know babies' way to urinate; provided he not spread facing stove where yad soledes bo, as below [Chayei Adam].`,
  ],
  [
    `mishnah-berurah:45:ה`,
    `(165) In inner chambers — reason the Sages did not distinguish in their enactment; Tosafot and Rosh wrote specifically where fear viewers suspect d'oraisa prohibition such as here laundering, forbidden even inner chambers; not so rabbinic prohibition, even for what viewers might think they did not forbid except in public; brought in Magen Avraham, Taz, and other Acharonim.`,
  ],
  [`mishnah-berurah:45:ו`, `(166) Forbidden — therefore alontit brought erev Shabbat wet from bathhouse, spread from before day, not wait until after sunset; see below siman 342 where implied if needs tomorrow for Shabbat, lenient to spread in inner chambers, but careful not to squeeze.`],
  [`mishnah-berurah:45:ז`, `(167) Not obliged to remove — even spread facing people; main suspicion only when spread on Shabbat, then grounds to suspect laundered today; if laundered yesterday would have spread yesterday, for they will not say fell in water which not everyone knows [Levush].`],
  [`mishnah-berurah:46:א`, `(168) Soaked in water — even slight soaking.`],
  [
    `mishnah-berurah:46:ב`,
    `(169) Forbidden to dry them, etc. — even in sun forbidden there because of maris ayin alone; here teaches opposite fire is d'oraisa prohibition of cooking and bleaching [flax pods bleach by oven as Shabbat 27a]; also forbidden to dry even while wearing if standing against heat where yad soledes bo.`,
  ],
  [
    `mishnah-berurah:46:ג`,
    `(170) Near fire — likewise forbidden to place on stove where yad soledes bo; people err in this unwittingly in winter placing wet clothes on hot stove to dry; where yad soledes bo not applicable, permitted to dry, provided not spread in usual manner, for if spread as usual forbidden in all cases, as previous seif.`,
  ],
  [`mishnah-berurah:46:ד`, `(171) And forbidden to move them — specifically when soaked much in water; when little water came on them no squeezing concern, as below siman 302 seif 9 in gloss.`],
  [`mishnah-berurah:46:ה`, `(172) Who is particular — meaning he does not want water in them; but cloths always soaked in water, no concern, moving permitted.`],
  [`mishnah-berurah:48:א`, `(173) A person dries himself, etc. — from Magen Avraham in our time good to dry with thing not particular about its water; Biur HaGra implies stam alontit is not particular about its water.`],
  [`mishnah-berurah:48:ב`, `(174) With alontit — even his whole body after bathing in cool water, as below siman 326.`],
  [
    `mishnah-berurah:48:ג`,
    `(175) And brings it in his hand — into his house where there is eruv; even though explained above in gloss forbidden to move soaked thing, here different since they permitted drying and did not fear squeezing because impossible without drying; therefore permitted also to bring home, so Magen Avraham; therefore after brought home and placed in place, again forbidden to move; but Shulchan Aruch HaRav brought Sefer HaTerumah that drying in alontit is only like little water and they did not decree on moving lest squeeze; so Biur HaGra, permitted to move.`,
  ],
  [
    `mishnah-berurah:49:_`,
    `(176) Outside the river d'oraisa — he mentioned d'oraisa because stam dry land on seashore and rivers is karmelis; but if on its bank was reshut ha-rabbim, forbidden to take hands from river outside, rather dry them well one against another until water passes, for river is karmelis and forbidden to take from karmelis to reshut ha-rabbim.`,
  ],
  [`mishnah-berurah:50:א`, `(177) Lime carriers — and do this so it appear like hair on their heads.`],
  [`mishnah-berurah:50:ב`, `(178) That they colored and wrapped — meaning colored for adornment and wrapped in ointment, then considered clothing.`],
  [`mishnah-berurah:50:ג`, `(179) Or that he went out, etc. — reveals his intent they stand for clothing; if not colored and did not go out, forbidden to move because muktzeh; but if thought from erev Shabbat to go out in them see siman 308 seif 24, moving permitted.`],
  [`mishnah-berurah:51:א`, `(180) Permitted to go out, etc. — all these are not considered burdens for them but like ornaments.`],
  [`mishnah-berurah:51:ב`, `(181) On his hand — so it should read; so printed in Or Zarua and Tosafot Shantz; what is found in some editions "on his head" is scribal error.`],
  [
    `mishnah-berurah:51:ג`,
    `(182) Wrapped on the hand — likewise wrapped on the wound itself [Magen Avraham]; see above seif 22 and seif 28 what is written there, many Acharonim agreed; implies from Mechaber's conclusion in this considered clothing even if he did not go out one hour from erev Shabbat, unlike previous seif 50; so Magen Avraham; Shulchan Aruch HaRav sides; see Biur Halacha.`,
  ],
]);

const files = [
  "output/siman_301/mishnah-berurah/part-001.txt",
  "output/siman_301/mishnah-berurah/part-002.txt",
];

for (const f of files) {
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = fixes.get(key);
      if (en) {
        n++;
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(f, out);
  console.log(f, n, "/", blocks.length, "fixed");
}

const missing = [];
for (const f of files) {
  for (const b of parseBlocksInFile(fs.readFileSync(f, "utf8"))) {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    if (!fixes.has(key)) missing.push(key);
  }
}
if (missing.length) {
  console.error("Missing fixes:", missing.length);
  console.error(missing.slice(0, 20).join("\n"));
  process.exit(1);
}
console.log("All", fixes.size, "MB blocks done");
