#!/usr/bin/env node
/** EH001 siman 003 — mechaber editorial (9 seifim). */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_003/mechaber/part-001.txt", "mechaber", {
  "1#main": `The law of one who is a safek for kehunah. It contains 9 seifim.

One who comes nowadays and says "I am a kohen" is not believed, and we do not elevate him to kehunah on his own word; he may not be called first for Torah reading nor lift his hands.

{Rama: Some say he is believed to read first in the Torah and to lift his hands nowadays, since we have no Torah terumah and need not fear they will elevate him to terumah (Beit Yosef in the name of Remakh). So too is the practice everywhere that terumah is not observed nowadays — there is nothing to fear.}

He may not eat kodashim of the boundary until he has one witness. But he prohibits himself regarding a divorcee, zonah, and chalalah, and he does not become impure for the dead. If he married or became impure — he receives lashes. The woman who had relations with him (if she is disqualified for kehunah) is a safek chalalah.

If he spoke casually — he is believed. How so? An incident occurred: one was speaking casually and said, "I remember when I was a child riding on my father's shoulders — he took me out of school, stripped off my garment, and immersed me to eat terumah in the evening. My friends distanced themselves from me and called me 'Yochanan eater of hallot.'" Rabban Gamliel elevated him to kehunah on his own word.`,
  "2#main": `If one witness testifies about him — he is believed to feed him terumah nowadays, to read first in the Torah, and to lift his hands; even his father is believed regarding him. We even elevate from documents to kehunah nowadays. How so? If it was written in a document: "So-and-so the kohen borrowed a mana from so-and-so," with witnesses signed on it — behold he has presumption of kohen like kohanim of this time. So too we elevate from nesiat kapayim and reading first in the Torah to be kohen like kohanim of this time.

{Rama: Some say if he signed himself "I, so-and-so, am a kohen" — it suffices nowadays (Ran, chapter 2 of Ketubot).}`,
  "3#main": `If one of the compelled witnesses testifies that one of them is presumed in kehunah — we elevate him to read in the Torah; we are not concerned lest his mother be a Kutit.`,
  "4#main": `Even if two come and each testifies about the other that he is a kohen — they are believed; we are not concerned for reciprocity.`,
  "5#main": `An adult is trusted to say, "I remember when I was a child that I saw so-and-so immerse and eat terumah" — and we elevate him on his word to be kohen like kohanim of this time.`,
  "6#main": `One who comes and says "I am a kohen," and one witness testifies that he knows his father is a kohen — we do not elevate him to kehunah on his word, lest he be a chalal, until the witness testifies that this one is a kohen. But if his father was presumed a kohen, or two came and testified that this one's father is a kohen — behold he has his father's presumption.

(In every matter we follow presumption — for we burn and stone on presumption.)`,
  "7#main": `One whose father was presumed a kohen and a rumor went out that he is the son of a divorcee or the son of a chalutzah — we are concerned for him and remove him from kehunah. If one witness came afterward and testified he is kosher — we elevate him to kehunah on his word. If two witnesses came afterward and testified he is a chalal — we remove him from kehunah. If one witness came and testified he is kosher — we elevate him to kehunah; for this last one joins the first witness, and behold two testify he is kosher and two testify he is disqualified — we reject both sets and reject the rumor, for two are like a hundred; and he remains a kohen in his father's presumption.`,
  "8#main": `A woman who did not wait three months after her husband and gave birth — it is unknown whether the child is nine months from the first or seven from the second; and one of them was a kohen and the other an Israelite — this one is a safek kohen. So too if a kohen's child became mixed with an Israelite's child and they raised the mixture — each of them is a safek kohen. We apply to them both the stringencies of Israel and the stringencies of kohanim: they marry women fit for kohanim; they do not become impure for the dead; they do not eat terumah; and if they married a divorcee — we remove them without lashes.`,
  "9#main": `Two kohanim whose children became mixed; or a kohen's wife who did not wait three months after her husband and married another kohen — it is unknown whether the child is nine months from the first or seven from the second — behold this one is a kohen, and we apply to the child the stringencies of both. He is an onen for them and they are onenim for him; he does not become impure for them and they do not become impure for him — when they come from marriage. But from zenut — we silence him from the law of kehunah, since his father is not known with certainty. How so? Ten kohanim — one of them left and had relations; although he is certainly a kohen's son, if he became impure for the dead or married a divorcee — he receives lashes; he does not serve; he does not eat terumah.

{Rama: If she committed zenut with one kohen and within three months married another kohen — the child is disqualified for kehunah (Tolodot Adam v'Chavah). A kohen who had relations with an unmarried woman and admits the child is his son — the son is a kohen for all matters; we are not concerned lest she relinquished herself to others (responsum of the Rosh, klal 32).}`,
});

console.log("siman_003 mechaber editorial patch applied");
