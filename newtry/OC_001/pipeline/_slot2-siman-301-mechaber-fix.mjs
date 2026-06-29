#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `mechaber:1:main`,
    `Which utensils one may go out wearing on Shabbat and which are forbidden; 51 seifim. One must not run on Shabbat unless for a mitzvah matter, such as going to the synagogue or the like. {Rama: And it is forbidden to step more than an amah in one step if he can manage with less [Or Zarua; Hagahos Ashiri on the chapter Mi SheHotzi'uhu].}`,
  ],
  [
    `mechaber:2:main`,
    `Youths who take pleasure in their jumping and running are permitted, and likewise to look at anything they take pleasure in. {Rama: And likewise it is permitted to stroll on Shabbat [Beit Yosef].}`,
  ],
  [
    `mechaber:3:main`,
    `If he was walking and reached a body of water, he may skip and jump over it even if it is wide so that he cannot place his first foot before uprooting the second; and it is better that he jump than that he go around it, because he increases walking; and it is forbidden to pass through it lest he come to squeezing.`,
  ],
  [
    `mechaber:4:main`,
    `If he was going for a mitzvah matter, such as to greet his teacher or someone greater than he in wisdom, he may pass through it provided he makes a change, such as not taking his hand out from under the edge of his robe so that he remember and not come to squeezing [and see below siman 613 seif 5 and in seif 8 in the gloss]. And it is forbidden to pass through in his sandal, for since he cannot tighten and tie it well we worry lest it fall and he come to carry it; but in his shoe it is permitted.`,
  ],
  [
    `mechaber:5:main`,
    `One who goes for a mitzvah matter may pass through water even on the return, so that it not be a stumbling block for him in the future.`,
  ],
  [
    `mechaber:6:main`,
    `One who goes to guard his produce may pass through water on the way out but not on the return.`,
  ],
  [
    `mechaber:7:main`,
    `Anyone who goes out with something that is not an ornament and is not worn in the usual manner of clothing, and he took it out in the way people are accustomed to take out that thing — is liable. And any ornament that is loose so that it can easily fall — it is forbidden to go out with it, and if he went out he is exempt. And a woman may not go out with ornaments that she is accustomed to remove (meaning to remove them from upon her) and display them. {Rama: And see below siman 303 seif 18 whether it is forbidden even in a courtyard or house.} Therefore a man may not go out with a sword, nor a bow, nor a shield (meaning a buckler), nor a club, nor a spear, nor with utensils that are not ornaments; and if he went out he is liable for a chatas. Nor with armor, nor a helmet, nor boots; and if he went out he is exempt, for they are worn in the usual manner. And he may not go out with tefillin, because he must remove them when he enters the bathroom. And a minor may not go out with a large shoe, lest it fall and he come to carry it; but he may go out with a large robe. And he may not go out with one shoe if he has no wound on his foot, lest they mock him and he come to carry it; but if he has a wound on his foot he may go out with the one that has no wound.`,
  ],
  [
    `mechaber:8:main`,
    `One may not go out with a machat stuck into his garment, whether pierced or not pierced; and if he went out with a pierced one he is liable, and with an unpierced one he is exempt; and some say the opposite.`,
  ],
  [
    `mechaber:9:main`,
    `One may not go out with a ring that has no seal upon it, and if he went out he is liable; and if it has a seal upon it — according to Rashi he is exempt, and according to Rabbeinu Tam and the Rambam it is permitted, for it is not an ornament except for a woman; but something that is an ornament for a man and for a woman is forbidden also for a man [and see above siman 303 seif 18].`,
  ],
  [
    `mechaber:10:main`,
    `A ring in which a stone is set, and likewise if letters are written on it — is not called having a seal unless letters or forms are engraved on it.`,
  ],
  [
    `mechaber:11:main`,
    `Something made to be an ornament and to be used, such as pretty silver keys like a kind of ornament — is forbidden, for an observer will say he takes it out for use; and some permit if it is of silver. {Rama: Nevertheless it is forbidden to go out with a case for eyeglasses even though the case is silver, for the eyeglasses themselves are a burden [Beit Yosef]. And if the key is of copper or iron, even if attached and fixed to the belt, it is forbidden [Mordechai in the chapter Mah Ishah; Beit Yosef in the name of a responsum of the Rashba]. And some wrote that the custom is to permit this [Beit Yosef in the name of an Ashkenazic responsum siman 81; the Rif; the Agudah; and so it appears in Or Zarua].}`,
  ],
  [
    `mechaber:12:main`,
    `A tailor may not go out with a machat stuck into his garment, nor a carpenter with a chip in his ear, nor a wool-comber with ointment on his neck; and if they went out they are exempt.`,
  ],
  [
    `mechaber:13:main`,
    `A zav may not go out with a pouch made to protect him from his discharge so that he not soil himself; and likewise a niddah who ties a cloth before her so that she not be soiled by menstrual blood — is forbidden to go out with it unless it is an apron made like a garment; but if she ties it so that the blood not hurt her and she not suffer, it is permitted to go out with it.`,
  ],
  [
    `mechaber:14:main`,
    `Something that is worn in the usual manner of clothing — even if he wears it only to protect from filth — is permitted to go out with on Shabbat. {Rama: Therefore it is permitted to wear a garment because of rain or a hat on his head; but it is forbidden for a woman to place a garment over her scarf because of rain, for this is not the usual manner of wearing [Hagahos Maimoni].}`,
  ],
  [
    `mechaber:15:main`,
    `An amputee may not go out with his wooden leg — meaning they make a kind of mold of a leg and carve in it a little for the end of his thigh; and he does not do this in order to walk with it, for in any case he needs his cane, but his intent is so that he not appear lacking a leg but only lame in his leg; since it is not needed for walking, it is forbidden.`,
  ],
  [
    `mechaber:16:main`,
    `An amputee who cannot walk at all on his thighs but sits on a chair and uproots himself from his place, supports himself on his hands and on his thighs and pushes himself forward, and makes supports of leather or wood for the ends of his hanging thighs or legs — when he leans on his hands and uproots himself he also leans somewhat on his legs — may not go out with them on Shabbat, for since they hang and do not rest on the ground, sometimes they slip off. But with the chair and the small stools in his hands it is permitted to go out. An amputee in both legs who walks on his thighs and knees and makes leather supports for his thighs may go out with them on Shabbat. {Rama: And likewise it is permitted to go out with a wooden shoe into which the leg enters, and there is no concern lest it fall [Rabbeinu Yerucham part 5]. And likewise regarding pantofles that slip off quickly and by themselves [Rashba siman 427]. And some are stringent and forbid [Agur]. And a person should not walk barefoot on Shabbat in a place where it is not customary to walk barefoot. And a person should not go out on Shabbat as he goes out on a weekday without something else on his hand by which he will remember that it is Shabbat and not come to desecrate it [Kol Bo].}`,
  ],
  [
    `mechaber:17:main`,
    `A lame person who cannot walk without a cane may walk with it even if it is not tied to him; but if he can walk without it and takes it only to support himself, it is forbidden [and a sick person who rose from his illness — his law is like a lame person] [Rokeach].`,
  ],
  [
    `mechaber:18:main`,
    `A blind person is forbidden to go out with a cane.`,
  ],
  [
    `mechaber:19:main`,
    `One who is bound with fetters (meaning like large rings with which they lock the legs) on his legs — is permitted to go out with them.`,
  ],
  [
    `mechaber:20:main`,
    `One may not go out with an ankatmin — meaning a kind of donkey that jesters make, and it appears as though he rides upon it while he carries it and walks on his feet; nor with stilts, which are tall pieces of wood with a place for the foot and with which one walks in mud; nor with a mask, which is like the form of a face placed on the face to frighten children.`,
  ],
  [
    `mechaber:21:main`,
    `One may not go out with a chest, a basket, or a mat; but one may go out with a sack, a sheet, and a chamilah (meaning coarse garments).`,
  ],
  [
    `mechaber:22:main`,
    `One may go out with down and a sponge on a wound, because they heal it — therefore they are like an ornament; and likewise with garlic peel, onion peel, a plaster, a compress, and a dressing on it; and if they fell off he may not return them, and all the more so he may not put them on initially; but it is forbidden to wrap a string or ointment around the wound in order to go out with it, for since they do not heal they are a burden; but with rags wrapped on the dressing so it not fall off, he may walk with them and tie and untie them.`,
  ],
  [
    `mechaber:23:main`,
    `Children may go out with bells (meaning small bells) woven into their garments; but if they are not woven, no. {Rama: And this helps that it is attached to the garment only regarding something whose custom is to be attached there; but if he attached there something whose custom is not so, it is forbidden [Hagahos Maimoni chapter 19; Beit Yosef in the name of a responsum of the Rashba; Mordechai in the chapter Mah Ishah]. Those green circles that the kingdom decreed that every Jew must wear one of them on his garment — it is permitted to go out with them even if not sewn into the garment but only somewhat attached there [Or Zarua]. And likewise it is permitted to go out with a handkerchief with which one wipes the nose, called a handkerchief, if it is attached to his garment. And that which it is permitted to go out with woven bells — specifically if they have no clapper and do not make sound [Hagahos Alfasi end of the chapter Mah Ishah].}`,
  ],
  [
    `mechaber:24:main`,
    `One may go out with kinds of herbs that they tie in knots and hang for healing.`,
  ],
  [
    `mechaber:25:main`,
    `One may not go out with an amulet that is not proven; and if it is proven, one may go out with it — whether the man who wrote it was proven or the amulet was proven, such as if he wrote one incantation on three amulets and healed three people — he is proven for that incantation whenever he writes it, but not for other incantations. And also the amulet is not proven if another writes it afterward — whether the man was proven or the amulet, such as if he wrote one incantation on one amulet and healed with it three times — that amulet is proven; and all the more so if the man and the amulet were proven, such as if he wrote one incantation on three amulets and each one helped three people, or one person three times — the man is proven for that incantation in every amulet he writes, and those amulets are proven for every person. {Rama: And specifically when both proofs came together; but if the man was proven first and afterward he made an amulet and healed three times, we rely only on the proof of the man, for he was already established [Hagahos Ashiri; and so it appears from Tosafos from the Biur that Beit Yosef wrote].} But if he wrote three amulets for one person and healed him three times, neither the man nor the amulet is proven. And it is permitted to go out with a proven amulet — whether of writing or of roots — whether for a dangerously ill person or one who is not dangerously ill, or an epileptic who already had a seizure and hangs it for healing, or even if the illness has not yet seized him but he is from a family of epileptics and hangs it so that it not seize him — it is permitted; and he ties and unties it in the public domain, provided he not tie it with a ribbon or ring and go out with it to the public domain, for then they will say he goes out with it as an ornament, and this is forbidden for it is not an ornament.`,
  ],
  [
    `mechaber:26:main`,
    `A healer is believed to say about himself that he is an expert.`,
  ],
  [
    `mechaber:27:main`,
    `One may go out with the egg of a chargol, the tooth of a fox, and a nail driven into a crucifixion beam — whether on a weekday or on Shabbat — and there is no issue of ways of the Amorites; and likewise anything that is for healing; but if he does an act in which healing is not recognizable, it is forbidden as ways of the Amorites; but any incantation is permitted, and forbidden only those that were tested and do not help; and some are concerned with every unproven amulet because of ways of the Amorites.`,
  ],
  [
    `mechaber:28:main`,
    `One who has a wound on his foot and ties a coin on it to protect lest he strike it with his other foot — and it also heals — is permitted to go out with it.`,
  ],
  [
    `mechaber:29:main`,
    `One who goes out with a tallit folded on his shoulders — meaning after he placed it on his head he raised its edges onto his shoulders — is liable for a chatas; but if it is not folded on his shoulders but folded in thirds in width below his shoulders, it is permitted, for he wraps himself in his tallit and covers his shoulders and body even though it is somewhat short below — it is permitted; and accordingly it is permitted to wrap oneself in one's tallit under one's coat to bring it to the synagogue.`,
  ],
  [
    `mechaber:30:main`,
    `It is permitted to go out in the public domain with a tallit around the neck. {Rama: Even though he places the right side on his left shoulder, for such is the way of wearing it, and it is only for adornment and is permitted [Beit Yosef].}`,
  ],
  [
    `mechaber:31:main`,
    `One who goes out wrapped in his tallit and folds it here and there in his hand or on his shoulder — if he intended to gather its corners so they not tear or become soiled, it is forbidden; and if he gathered them to adorn himself as the custom of people of the place in their dress, it is permitted. And this applies to their tallitot, which were one square sheet; but our garments, when he wears them and puts his hands through them, it is permitted to hold part of them in his hand to raise them so their edges not become soiled in mud or impede his walking.`,
  ],
  [
    `mechaber:32:main`,
    `One who goes out with money bound in the cloth he is wearing is liable. {Rama: But in the house it is permitted if he needs them, even if they are not bound — only if they are pierced into the garment.}`,
  ],
  [
    `mechaber:33:main`,
    `It is forbidden to go out on Shabbat with money or silver and gold sewn into his garment. {Rama: And some permit in a case of loss where he fears they will be stolen from him if he leaves them in the house and walks away from them [Agur; Issur veHeter haAruch]. And the custom is to be lenient if he needs to go out; but if he can sit at home and not go out, he should not go out. And where he does not need them and can leave them at home, some are stringent [Or Zarua].}`,
  ],
  [
    `mechaber:34:main`,
    `A person may go out with a sudar folded on his shoulders even though he did not wrap a thread around his finger; and if the sudar does not cover his head and most of his body, it is forbidden to go out with it unless he ties both its ends together below his shoulders, one with the other.`,
  ],
  [
    `mechaber:35:main`,
    `With stiff bolts of cloth it is forbidden to bring them into the public domain or karmelis while wrapped in them as in a garment; if they are not very stiff, it is permitted.`,
  ],
  [
    `mechaber:36:main`,
    `It is permitted to go out on Shabbat with two garments one upon the other, whether for his need or his fellow's need, whether two shirts or two outer coats (meaning an outer garment), whether two belts one upon the other, even if no garment separates between them. {Rama: And some forbid two belts one upon the other unless a garment separates between them [Or Zarua; Tosafos; Mordechai in the chapter Mah Ishah]; and it is fitting to practice thus. And it is permitted to wear two hats one upon the other [Or Zarua], and likewise two leggings [Agur].}`,
  ],
  [
    `mechaber:37:main`,
    `It is permitted to go out on Shabbat wearing gloves called guantes; and some are stringent to require that they be sewn on the eve of Shabbat to the sleeves of his garments, or that they be tied to them with a durable knot; and it is fitting to heed his words.`,
  ],
  [
    `mechaber:38:main`,
    `One who goes out on Shabbat with a tallit whose tzitzit are not affixed according to law is liable, because those threads are important to him and his mind is on them until he completes and makes tzitzit; and if it is affixed according to law, even though it has no techelet, it is permitted to go out with it on Shabbat (see above siman 13).`,
  ],
  [
    `mechaber:39:main`,
    `A kilah (meaning a sheet like a tent) that has straps with which they stretch it — it is permitted to wrap oneself in it and go out to the public domain, and the straps are not considered a burden for they are batel to it; therefore it is permitted to go out with straps hanging from a belt even though shoes are not tied to them, for they are not important and are batel to the belt; but if they are of silk they are important and not batel, and it is forbidden if shoes are not tied to them; and the same law applies to anything detached from a garment while one end remains attached, such as loops — if it is not important it is permitted to go out with it, and if it is important it is forbidden.`,
  ],
  [
    `mechaber:40:main`,
    `A hat that spreads a tefach below his head — it is forbidden to place it on his head even in the house, because of the tent prohibition.`,
  ],
  [
    `mechaber:41:main`,
    `Regarding going out on Shabbat with a hat on one's head made to protect from the sun — some forbid, for we worry lest the wind raise it from his head and he come to carry four amos in the public domain, unless it is fastened on his head, or it is deep so his head enters into it and the wind cannot separate it from his head, or it is tied with a strap under his throat — then there is no concern.`,
  ],
  [
    `mechaber:42:main`,
    `One who finds tefillin on Shabbat in disgrace, in a place where they are not guarded — if there is danger because they decreed not to wear tefillin, he covers them and goes on his way; and if there is no danger — if they have straps by which it is recognizable that they are tefillin and not amulets, and they are tied so he can wear them, he brings them in pair by pair in the manner of wearing until he brings them all in; and if there are many so he cannot wear and bring them all in pair by pair, he waits there until nightfall and brings them; and if he fears to wait because of bandits, he carries them less than four amos at a time, or gives them to another and another to another until they reach the outer courtyard.`,
  ],
  [
    `mechaber:43:main`,
    `One who finds a Torah scroll in a field — if it is not a time of danger, he sits and guards it until dark (the Rambam's wording; and in danger he leaves it and goes). If rain is falling, he wraps it in a hide, returns and covers it, and enters with it.`,
  ],
  [
    `mechaber:44:main`,
    `One who comes to save his vessels from a fire wears all he can wear and wraps all he can wrap, removes them, returns, wears again, and takes out.`,
  ],
  [
    `mechaber:45:main`,
    `One whose garments fell into water may walk in them and need not worry lest he come to squeezing; and he may not spread them to dry because of maris ayin, lest they suspect he laundered on Shabbat — even in inner chambers where no one sees; they forbade only spreading on Shabbat, but if he spread laundered garments before Shabbat he need not remove them on Shabbat.`,
  ],
  [
    `mechaber:46:main`,
    `Garments soaked in water may not be dried near a fire. {Rama: And it is forbidden to move them lest he come to squeezing — when he is particular about their wetness [Mordechai chapter Chavis]. And it is forbidden to walk on Shabbat in a place where he might slip and fall into water, lest his garments become soaked and he come to squeezing [Rivash part 3].}`,
  ],
  [
    `mechaber:47:main`,
    `A person may not spread his garments on Shabbat, even from sweat.`,
  ],
  [
    `mechaber:48:main`,
    `A person may dry himself with an alontit (meaning a garment with which one dries after bathing); he may bring it in his hand and we are not concerned lest he come to squeeze; and he may not give it to launderers, who are suspected regarding squeezing.`,
  ],
  [
    `mechaber:49:main`,
    `It is permitted to wash one's hands in a river on Shabbat, provided he does not take them out with the water on them beyond four amos outside the river.`,
  ],
  [
    `mechaber:50:main`,
    `One may go out with combed flax and carded wool on the heads of lepers (meaning people with lesions) — when? When they dyed them and wrapped them, or when he went out in them for one hour intentionally beforehand.`,
  ],
  [
    `mechaber:51:main`,
    `It is permitted to go out with a turban hung on the neck for one who has a wound on his head or arm, and likewise with rags (meaning pieces of worn garment) wrapped on the hand or finger where there is a wound.`,
  ],
]);

for (const f of ["output/siman_301/mechaber/part-001.txt", "output/siman_301/mechaber/part-002.txt"]) {
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = fixes.get(key);
      return en ? { ...b, en } : b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(f, out);
}
console.log("Mechaber siman 301:", fixes.size, "blocks patched");
