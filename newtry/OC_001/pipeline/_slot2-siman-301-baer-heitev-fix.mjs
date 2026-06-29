#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`baer-heitev:1:_`, `An amah — meaning there should be half an amah between foot and foot, and the foot itself is also half an amah; see Magen Avraham.`],
  [`baer-heitev:2:א`, `Permitted — even l'chatchila. Magen Avraham.`],
  [`baer-heitev:2:ב`, `To stroll — even if his intent is to warm himself; but to run is forbidden if he does so for healing. Magen Avraham.`],
  [`baer-heitev:4:_`, `His teacher — and man and woman are equal in this; and if the teacher needs the student, it is also permitted. Taz.`],
  [`baer-heitev:6:_`, `To guard — for guarding his property is also somewhat a mitzvah; see siman 248.`],
  [`baer-heitev:7:א`, `Liable — meaning kares if intentional; and see siman 345 seif 7 that this does not apply in our time.`],
  [`baer-heitev:7:ב`, `That are not — and Taz forbids also in this case; see there.`],
  [`baer-heitev:8:_`, `The opposite — but in his hand he is liable in every case. Magen Avraham; and see Taz.`],
  [`baer-heitev:10:_`, `Forms — that do not protrude, for otherwise even on a weekday it is forbidden, as written in Yoreh Deah siman 141 seif 5.`],
  [`baer-heitev:11:א`, `Silver — and the same applies to a silver dowry chest, for people are accustomed to adorn themselves with it — Mishna Berurah. And if it has a knife inside, it is obvious that it is forbidden. Magen Avraham.`],
  [`baer-heitev:11:ב`, `To permit — and specifically when fixed at the top of the belt and made like a kind of pendant; but when fixed in the middle of his belt it is forbidden — Bach. And if the key hangs on a silver chain, it is permitted; see Taz.`],
  [`baer-heitev:12:_`, `Exempt — for this is not the usual way of carrying out, but in his hand; and in a place where the custom is to stick it in on weekdays for intervals, he is liable; see Magen Avraham.`],
  [`baer-heitev:13:א`, `With a pouch — and the same if he ties a cloth to the wick of a hat in order to wipe his eyes with it — likewise forbidden. Shach.`],
  [`baer-heitev:13:ב`, `The blood — that it not fall on her flesh and dry on her and cause her distress. Tosafos.`],
  [`baer-heitev:14:_`, `Scarf — Taz wrote specifically on the scarf alone; but if she covers the body as well, it is the manner of clothing; see there. And Magen Avraham wrote that if her intent is that the rain not distress her, it is permitted in every case; and so is the opinion in a responsum of Avodat HaGershuni siman 80; see there.`],
  [`baer-heitev:16:_`, `And some are stringent — and if he forgot and went out in them, he need not remove them; and Taz permits in every case.`],
  [`baer-heitev:17:_`, `To support himself — it appears to me that if he walks in a place where there is concern lest he fall, such as because rain fell and the place is slippery, or in winter on frozen water called ice, it is permitted to go out with a cane, for he needs to walk there. Taz.`],
  [
    `baer-heitev:18:_`,
    `With a cane — since he can walk without a cane. And elders who sway their bodies are forbidden to go out with canes in order to walk a straight path; but if the elder is so old that he cannot walk without the cane, he may go out with it. And it is obvious that important people who walk with a cane in their hand for honor are forbidden to go out with them on Shabbat. But in a place where there is an eruv, it appears to me that it is permitted; but an ordinary person who does not carry it for honor — even where there is an eruv it is forbidden, for there is degradation of Shabbat — Magen Avraham, see there. (And in Eliyah Rabbah he rejected Magen Avraham's proof and his opinion is to be lenient; see there.)`,
  ],
  [`baer-heitev:21:_`, `With a sack — because it is customary to go out with it because of rain; therefore even without rain it is also permitted. The Rosh.`],
  [`baer-heitev:22:_`, `To wrap a string — for they are not batel to the sponge like the wrapping of rags. Magen Avraham.`],
  [
    `baer-heitev:23:_`,
    `Handkerchief if attached to the garment — for anything attached to a garment is like the garment; and although the handkerchief is not clothing nor an ornament, nevertheless since it is not important it is batel to the garment. Bach wrote that this is specifically if sewn to the garment with stitching, and some poskim require stitching of two stitches; see Kenesset HaGedolah and Be'er Sheva — then it is batel to the garment; but those who attach the handkerchief to the belt with a knot that may not be untied on Shabbat — it is a full prohibition, for we say the opposite, that the belt is batel to the handkerchief; see there. Taz wrote: one who wants the handkerchief with him has no permission to make it like a belt, since he has a belt in any case, and a belt over a belt is forbidden; rather he should tie the head of the handkerchief to the head of the belt with a non-permanent knot and it will be like a long belt, and he girds himself all the time he walks in the street — end quote; and Yad Aharon wrote on Taz that his words are astounding.`,
  ],
  [`baer-heitev:25:א`, `Together — such as if he healed with one amulet for Reuven and another amulet for Shimon and another for Shimon, and afterward healed Levi with that same amulet — then both proofs came together.`],
  [`baer-heitev:25:ב`, `Only on the proof of the man — and the practical difference is that if the healer lost his proof, such as if he wrote three amulets and they did not help, then the amulet is also forbidden; which is not so when both came together, or the proof of the amulet came first — then even if the healer lost his proof, the proof of the amulet remains in place.`],
  [`baer-heitev:25:ג`, `Of writing — and if it is from holy scriptures, it is forbidden to go out with it unless covered, as written in seif 7. Magen Avraham.`],
  [`baer-heitev:28:_`, `Heals — it implies that if it does not heal but only protects lest he strike it, it is forbidden. Magen Avraham.`],
  [`baer-heitev:29:_`, `To wrap oneself — Kenesset HaGedolah wrote that the custom is to wrap the tallit like a kind of belt and attach it to one's garments; and for one who forbids two belts, it is forbidden; see there.`],
  [
    `baer-heitev:31:_`,
    `They impede him — Maharil wrote: those women who let down and fold their garments under their arms to raise them so their edges not become soiled are forbidden, for they become like a gutter in the middle; but they may raise them with their hands without any folding — end quote; and see Taz at length. Women who gird and then raise the garment somewhat and gird again below that folded part — it is like a gutter; on this one may say it is better they be shogegim.`,
  ],
  [
    `baer-heitev:32:_`,
    `Pierced — meaning gold coins with holes; and the same applies to silver coins that one hangs on his daughter's neck for ornament — Taz. Maharil of blessed memory permitted carrying them with him on Shabbat, any amount, in time of danger, but not taking them out beyond the eruv; and some say he permitted thus even when not pierced; and if he fears robbery, such as when the governor's agents search — it is permitted to take them out beyond the eruv — end quote. Magen Avraham wrote that from his words it implies that to carry them in his hand is forbidden, only to carry them with him, which is tiltul kele'acher yad.`,
  ],
  [`baer-heitev:33:_`, `And some permit — even when they are not sewn; and accordingly for one who holds money between his garment and his flesh, it is likewise permitted — Taz. Magen Avraham wrote specifically when sewn, but if not sewn it is forbidden; see there. And without loss it is forbidden to wear the garment; see siman 310 end of seif 7.`],
  [`baer-heitev:36:_`, `Two belts — and if he needs them, it is permitted. Taz.`],
  [
    `baer-heitev:37:_`,
    `And it is fitting to be concerned — and now they are accustomed to be lenient since we do not have a head covering; but it is good to be stringent — Bach. Taz wrote: it appears to me that specifically with gloves there is this concern, for when he needs to remove one hand he carries the glove he removed in his other hand and there is concern lest he carry four amos; but with our arbe'el, where both hands are warmed in it, even if he must remove one hand the arbe'el remains clothing on his other hand which is still inside it, and we are not concerned lest it fall, for he holds it in his hand — there is no concern at all; and they already practice to go with arbe'el everywhere, and Heaven forbid to say that all act unlawfully; but certainly with gloves one should be careful as written here, and it is fitting to be concerned, etc.; see there, and see in Penei Yehoshua siman 16 who inclined to permit even gloves that each is on one hand; see there, and see in Shakh in Kenesset HaGedolah.`,
  ],
  [
    `baer-heitev:40:_`,
    `A tent — and in the next seif it deals with one that does not have a tefach. And a hat called a britel in foreign tongue — even though it spreads a tefach below the head, nevertheless since it is not hard and bends downward, there is no prohibition concern — when there is no hard paper in it — see there. Taz wrote another leniency because he does not intend except to cover his head; and concludes: it appears to me that one whom flies distress on Shabbat and he is not wearing a britel and takes the britel to protect from flies — in this there is a full prohibition; see there. Magen Avraham wrote permission if the hat is hard that he place it at a slope; see there. One who makes a tallit of hard material, such as what they call in foreign tongue a grave green, which does not fold but lies flat — it is forbidden to extend a tefach beyond his head, for it is like a hat — Taz. Some refrain from placing the tallit on the head so the tallit not be from here and there like walls, as written in siman 315; see Magen Avraham. Regarding prohibition from concern lest it fall and he come to carry, as in the next seif — we are not concerned with a britel, for it is not people's way to walk with head uncovered. It appears to me that one who has a small hat under the britel, as is customary among us, should not go out with the britel beyond the eruv, for in this we certainly worry lest it fall and he come to carry, since he will not be with head uncovered — Taz. The Ari of blessed memory would not place the kaplush on his head on Shabbat because of the tent prohibition — Nagid uMitzvah 4, Mishna Berurah; and see Taz siman 315 notes 1 and 11, where he wrote more leniencies for britel; see there.`,
  ],
  [`baer-heitev:45:_`, `Inner chambers — specifically in a place where they will suspect him of doing a d'oraisa prohibition; it is forbidden in inner chambers; see Magen Avraham.`],
  [`baer-heitev:50:_`, `Lepers — that they place flax so it appear like hair.`],
  [
    `baer-heitev:51:_`,
    `With rags — that is, he went out in them for one hour intentionally beforehand — Taz. Magen Avraham wrote even if he did not go out in them for one hour intentionally beforehand; see there; and see seif 22. In a responsum of Devar Shmuel siman 48, Yoreh Deah side — there is reason to forbid going out on Shabbat with those utensils that horsemen place on their feet, under which is a kind of small wheel with iron spikes with which they strike the horse; and he permitted those that do not have these spikes but only a kind of iron bow used for ornament and to attach leather market-house ties so they not slip from their feet; see there.`,
  ],
]);

const f = "output/siman_301/baer-heitev/part-001.txt";
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
console.log("Baer Heitev:", fixes.size, "blocks");
