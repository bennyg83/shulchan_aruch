#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

const T = {
  "1#א": `In her finds. Beit Yosef wrote: although her finds and work of her hands are not the topic of kiddushin, our master wrote them because he strikes them with one blow. In Be'er Heitev another reason — see there. Bach on Beit Yosef's precision: therefore he brought that the father is entitled to her finds — since he said kiddushin money is his, even a hundred maneh belong to the father; we do not say the father acquires only a perutah's worth and the rest is a gift to her. At first glance one learns that one who gives a gift to a virgin — her father acquires. But Bach wrote only the surplus over kiddushin money belongs to the father, since it came through kiddushin; Torah gave the father kiddushin money without distinguishing amount. Unlike ordinary gift, possibly like inheritance (mishnah: father does not eat fruits in her lifetime). Tosafot Ketubot 46b — cannot learn finds from kiddushin because finds require effort; seemingly gift can be learned — but then inheritance too; Choshen Mishpat uncertain on gift; Beit Shmuel plainly father acquires. Tosafot's difficulty and answers — see there and Maharsha; examine.`,
  "1#ב": `Regarding nephel. See Niddah 23a; Beit Shmuel. Difficult per Rashi "is he alive" — sister forbidden only in lifetime. Still to ask if he betrothed mother afterward — mother-in-law forbidden even after wife's death. Choshen Mishpat: safek kiddushin. Beit Shmuel: no kiddushin in that child; sister's kiddushin are full kiddushin — see there.`,
  "5#א": `Evening. Kiddushin 79a; Tosafot — perhaps dispute when father alone betrothed; Shmuel may concede — see there. Maharsha: dispute when she alone betrothed — no difference? Astonishing — Rav requires definite get, Shmuel safek; difference if she accepted from another. Beit Yehuda challenged. Per Tosafot Shmuel concedes from presumption of unmarried; reversed when now bogeret — even Rav safek get. Answer: Kiddushin 44b — minor/na'arah betrothed without father needs safek get per all; siman 36 seif 11 — bogeret needs safek lest consented to father. Father alone and she contradicts — no get needed; Bach Choshen Mishpat.`,
  "5#ב": `She contradicts. Rosh: even if she admits she was not bogeret when father betrothed — not important enough to forbid herself to husband. Possible: she does not contradict with certainty. Gemara implies even certainty claim does not help — else tannaim not established like Rav when she claims certainty; why all like Shmuel — 79b.`,
  "5#ג": `She contradicts — RaMAh. Beit Yosef: per his explanation of Rama, Gemara establishes all like Shmuel when she contradicts; should be Rav per Rama when no contradiction — Bach settles all. Rashach 79b; Rechash responsum 41; Makor Baruch 36.`,
  "6#_": `From both. Father alone or she alone — safek; Beit Shmuel: she alone — no concern. Within six months — always stringent, two gittin. Choshen Mishpat: betrothed after six months by father, later signs of bogeret — at kiddushin she was bogeret; after six months even without signs perhaps bogeret. Per commentators separate na'aruth/bogerut signs; Rambam no sign before six months — ch. 3 law 14 Maggid Mishneh. Rashbatz: signs of na'aruth months after twelve — presumed at twelve; six months after twelve — bogeret. No na'aruth signs — concern she just now bogeret. Rashbatz opposite Gemara Yevamot 79 — Ra'anach 8; Kenesset HaGedolah 66b. Beit Shmuel on Rambam day six months completes — settle like Rav; Tosafot R' Yitzchak morning custom.`,
  "7#א": `From dispute. "Give my daughter kiddushin money and be betrothed" — per all she accepts even if father absent, as give to so-and-so — Beit Shmuel.`,
  "7#ב": `His daughter. When she accepts, father not obligated to object if she desires — Choshen Mishpat.`,
  "7#ג": `Betrothed to me. No distinction father present or not — Beit Shmuel not Choshen Mishpat. Father accepting for daughter: minor/na'arah — "your daughter betrothed to me" not "behold you." Bogeret agent — money: "you betrothed" or "your daughter betrothed." Document: bogeret — "you betrothed"; minor — "your daughter." Precision per Ran Beit Shmuel.`,
  "8#_": `His daughter. Sanhedrin/siman 1 — mitzvah before maturity; Bach/Perishah: minor with sense to say "in so-and-so I want." Here "until she grows" — uncommon in minority. Mitzvah vs forbidden in Talmud — Choshen Mishpat Beit Shmuel.`,
  "9#_": `From both — or one divorces and one marries.`,
  "10#_": `From both — uncertain if first agent canceled. Tur RaMAh; difficult siman 141 get agency. Kiddushin unlike divorce — one act; second cancels first. Two agents same woman — first betrothal binds. Woman two agents same man — Choshen Mishpat Beit Shmuel.`,
  "11#א": `Na'arah. Tosafot Kiddushin 44b; Rosh.`,
  "11#ב": `Or married. Rosh Hagahot: self-betrothal/marriage in father's life — nothing. Betrothed and married without father — nothing, no concern father consented. Gemara 45b Rav Huna/R' Yirmiyah — betrothed and married: concern father consented; get and mi'un — Rashba 1219. Bach: proof from mishnah mi'un — even marriage nothing; Mordekhai father absent — see Beit Yosef; Tosafot returned; Kenesset HaGedolah 67a; Beit Shmuel.`,
  "11#ג": `Her father. Bach: matchmaking revealed desire — seif 12 concern consent. Choshen Mishpat Beit Shmuel reconcile.`,
  "11#ד": `She. Tosafot: even after father consents she can object — father did not betroth himself. Beit Yosef Beit Shmuel.`,
  "11#ה": `Objected. Mordekhai; poskim dispute per Tosafot 46a heard and silent. Maharsha answer — Gemara flow. Father believed did not hear; witness too — Ra'anach 1.`,
  "12#_": `Consented. Bach Choshen Mishpat Be'er Heitev Beit Shmuel: betrothed without knowledge to one father desired; father silent then consented; she later objected — lenient double doubt Makor Baruch 16.`,
  "13#א": `To her. No ketubah from marriage; no burial — Bach Ritva; Be'er Heitev on Bach.`,
  "13#ב": `Married. Mordekhai: valid kiddushin, father died, no objection concern — Beit Shmuel.`,
  "14#א": `Mother. Not only brother/mother — others too Mahari Weil 112; Choshen Mishpat 108.`,
  "14#ב": `Others. Father returns in minority — no new kiddushin — Beit Shmuel.`,
  "14#ג": `As unmarried. Tosafot forbidden lest father betroth another — Ran Rivash. Father knew betrothed — no concern. Siman 1 promiscuity — father here; distant land enactment — Beit Shmuel. Maharash: forced marriage not promiscuity — Radbaz 57; Mahari Bei Rav: only not before father.`,
  "14#ד": `Completed. With another when she grows — Beit Shmuel.`,
  "14#ה": `From both. Why get from first when father betrothed to another — Choshen Mishpat Beit Shmuel.`,
  "22#א": `Get — permitted to all. One married — remove; even after get — forbidden to second as promiscuity — Choshen Mishpat Beit Shmuel.`,
  "22#ב": `When married. Rambam ch. 9; Rav HaMaggid; Beit Shmuel.`,
  "23#_": `Upon him. Two witnesses he betrothed — father cannot contradict; forbidden to both — Rivash Choshen Mishpat Beit Shmuel.`,
};

const n = patchFile("siman_037/baer-hetev/part-001.txt", "baer-hetev", T);
console.log(`baer-hetev: ${n} blocks`);
export default n;
