#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_008/mechaber/part-001.txt", "mechaber", {
  "1#main": `In any safek, the child follows the male. It contains 5 seifim.

Kohanim, Leviim, and Yisraelim may marry one another; the child follows the male.`,
  "2#main": `Leviim, Yisraelim, and chalalim may marry one another; the child follows the male.`,
  "3#main": `Leviim, Yisraelim, chalalim, gerim, and freed slaves may marry one another. A ger or freed slave who married a Levi'ah, Yisraelit, or chalalah — behold the son is a Yisraeli. A Yisrael, Levi, or chalal who married a convert or freed woman — the child follows the male.`,
  "4#main": `Anyone who marries in a prohibited union — the child follows the defective one of the two: if one of them is from kohanic disqualifications, the child is disqualified for kehunah; if one of them is from kahal disqualifications, the child is forbidden to marry into the congregation.`,
  "5#main": `The child of a maidservant and a non-Jewess is like them — whether they conceived from a valid man or from a disqualified one.`,
});

patchFile("siman_008/beit-shmuel/part-001.txt", "beit-shmuel", {
  "1#_": `After the male. This is a general rule: the child follows the male wherever there is kiddushin and no transgression.`,
  "3#_": `Behold the son is a Yisraeli. So too the Rambam and Tur hold like him, as stated in siman 4 — even though there is kiddushin and no transgression, it should follow the male and he would be a ger permitted to a mamzeret; we do not say so, as stated in siman 4 — see there. The Tur wrote that the child follows the male even though he holds the child is a Yisrael and forbidden to a mamzeret — nevertheless there is a difference that we follow the male and he is a ger, regarding whether he is valid to be a dayan for chalitzah, as stated in siman 169; so too Maharshal and Bach.`,
});

patchFile("siman_008/baer-hetev/part-001.txt", "baer-hetev", {
  "1#_": `The male. Everywhere there is kiddushin and no transgression, the child follows the male.`,
  "3#_": `Yisraeli. The Ran questioned why it is not said that the child follows the male and he would be a ger permitted to a mamzeret — since there is kiddushin and no transgression. See Beit Shmuel.`,
});

patchFile("siman_008/beur-hagra/part-001.txt", "beur-hagra", {
  "1#_": `And the child, etc. There (67a) "and no more"; behold chalal, etc.; and behold, etc. So too regarding Leviim, as stated "where was it taught," etc. — but because of Leviim the Mishnah teaches properly.`,
  "2#_": `Leviim, etc. This section is because of the latter clause (sifa).`,
  "3#_": `And the ger, etc. As above in the previous siman — we hold like Rabba bar Avuha that one side is a valid Yisraeli. So if he married a Levi'ah or chalalah — the child follows the male and is a Yisrael after the ger, like a ger who married a convert per R' Yosi. Therefore we do not establish in Bekhorot (47a) that she conceived from a ger; so too regarding chalalah, as stated in Kiddushin (77a): "What — here males," etc.`,
  "4#_": `And Yisraeli, etc. From the Mishnah cited, as stated at the beginning of Kiddushin, etc.`,
  "5#_": `If one of them, etc. This does not refer except to "who married in a prohibited union" — for regarding the male we only find this in the latter clause (sifa).`,
});

patchFile("siman_008/turei-zahav/part-001.txt", "turei-zahav", {
  "3#_": `Behold the son is a Yisraeli. In the Tur it is written: a ger or freed slave who married a Levi'ah, Yisraelit, or chalalah — the child also follows the male. Beit Yosef wrote: regarding chalalah it teaches us the child is not a chalal but the child followed the male, like a Yisrael who married a chalalah — his daughter is valid for kehunah. Regarding Levi'ah it teaches us the child is not a Levi and Yisraelit — we do not establish. Meaning: if it teaches us he is permitted to marry a mamzeret — that is in siman 2, where it is forbidden. If because of his daughter who is forbidden to a kohen — that is in siman 7 at the end, where they permit initially. It seems there is a difference regarding a ner permitted for a brother's wife from the father, as stated in Yoreh De'ah siman 269. If so, it teaches us here: when a ger married a Yisraelit, the child is like his father and may take his brother's wife from the father, and does not have the status of a Yisrael. If a Yisrael married a convert — it teaches us the opposite: the son is a ger like his mother, like a minor who was born, and takes his father's sister; it teaches us here that he is like his Yisrael father. What Beit Yosef questioned — why didn't the Tur also write "who married a kohenet" — it seems this is unnecessary. For regarding Levi'ah it teaches us: if a Levi married a convert, his Levi status is not lost from the son because of the mother, to say he is a Yisrael but a Levi — and we would know automatically. For a kohen it would be needed to say regarding kohenet that he is not a kohen, as stated.`,
});

patchFile("siman_008/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#א": `Mishnah Kiddushin 69a.`,
  "1#ב": `Mishnah there 66a.`,
  "2#_": `There in the Mishnah, and there.`,
  "3#_": `There in the Mishnah, and there.`,
  "4#_": `There in the Mishnah 67a.`,
  "5#א": `There in the Mishnah.`,
  "5#ב": `There 68b.`,
});

console.log("siman 008 full editorial patch done");
