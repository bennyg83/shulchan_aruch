import { readFileSync, writeFileSync } from 'fs';

function fixLines(file, fixes) {
  const lines = readFileSync(file, 'utf8').split('\n');
  let count = 0;
  const result = lines.map(line => {
    for (const [start, replacement] of fixes) {
      if (line.startsWith(start)) { count++; return replacement; }
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}:`, file.split('/').slice(-4).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/';

// ── siman_138 ──────────────────────────────────────────────────────────────

fixLines(base + 'siman_138/beer-hagolah/part-001.txt', [
  [
    'There is a thin name in the sky and a glamorous mouth, and a mountain at the end of Starwork:',
    'There, and like Rava; and it explains "ha-mishtaberet" — such as the sprinkling of inner blood, which is not connected but breaks apart and falls drop by drop. And Ran at the end of tractate Avodah Zarah.'
  ],
]);

fixLines(base + 'siman_138/beur-hagra/part-001.txt', [
  [
    'If there is a quaint. A. A. sticker is not what Nigave and B.D., D.D., is evacuating, but infusion from me and abroad at the S.C. and me, because of the price. B. and D.C.:',
    'If there is hag\'alah. There [in the source] Na\'aveh and Artacho, and Rosh siman 31, and regarding earthenware, etc.; and therefore he said, etc.; and all the more so here. [See] Bach and Darkei Chaim.'
  ],
  [
    'And so in her rage. There is no escape between a star worker or by Israel between a wooden vessel and a stone between a columnist and a hut, whereby the Lord has commanded him to sleep',
    'And all this regarding pitching [zefitah]. For in pitching there is no distinction between the beginning of its use by a non-Jew or by Israel, between a wooden vessel or stone vessel, between earthenware — Tur — and see Tosafot there on "the winepress," etc.; and one can say that regarding pitched vessels, etc.'
  ],
  [
    'If it is a tree. There is no need for a son only in the hallucinations and in the presence of a quaint, and in the presence of a tree of a quaint, and in the creation of a quaint tree:',
    'If it is wood. There is no distinction between it and stone except in pitched ones — see Rashi on the mishnah there on "and of wood," etc.; and Rosh chapter 2, seif 22.'
  ],
]);

fixLines(base + 'siman_138/turei-zahav/part-001.txt', [
  [
    'She was a star worker. It was already from the mountain, in the name of the Hosss, which brought them to the "Y:',
    'That a non-Jew pitched it. This has already been explained at the beginning of siman 135 in the name of Tosafot, which Beit Yosef cited.'
  ],
  [
    'and the uniform. It seems to me that at all, the Shining that the Starworker who needs a great talent and is of the uniform because the wine is collected in his combodies will not help him impeachment and must be protested by the curses:',
    'And the measuring vessel [keli ha-midah]. It seems to me that included in this is also the funnel called "hiber" of a non-Jew, which requires a thorough kashering — and it is an a fortiori from the measuring vessel, since wine collects in its curvature, rinsing [hadachah] alone will not help it, and one must protest against those who are lenient.'
  ],
]);

// ── siman_139 ──────────────────────────────────────────────────────────────

fixLines(base + 'siman_139/baer-heitev/part-001.txt', [
  [
    'Fucked. It means that if a lawyer who sells or sages is not allowed and the author has brought about the opinion of the occupiers in the sale and is appointed in the case of the sale, and then he is called R. A.A. and also to the C. C. C. C. C. C. C. C. A. C.C. C. C. C. C.C.C. C.C.C.C.C.A.A.A. and the report said in the raids. “Third:',
    'Extinguished [shekivyan]. It implies that if they were extinguished on their own, even if he then sold or pledged them, they remain forbidden. And there is a slight difficulty, for in seif 12 the mechaber cites the view of the poskim that it becomes annulled [batel] through a sale or pledge done anonymously [stam], and afterwards cites R\' Yona\'s view in the name of Yesh Omrim; and likewise below in siman 146 seif 8 the Rav wrote plainly that they are annulled through sale or pledge. Requires study. Shach.'
  ],
]);

fixLines(base + 'siman_139/beer-hagolah/part-001.txt', [
  [
    'A name and quaint, which connects such as the blood injection of a non-connected face, but breaks down and falls a tipin:',
    'There, and like Rava; and it explains "ha-mishtaberet" — such as the sprinkling of inner blood, which is not connected but breaks apart and falls drop by drop.'
  ],
]);

fixLines(base + 'siman_139/beur-hagra/part-001.txt', [
  [
    'She is a quaint between a quaint. Just in a few places and as a manager:',
    'It [i.e., the ruling] is straightforward [peshat], between one matter and another — as I have indicated in several places, and as will be explained further.'
  ],
  [
    'And you\'re going to be like a quaint. There is no name in the Qur\'an, and everything is called and in G-d, where everything is before them is even called:',
    'And offerings to all, etc., such as, etc. — [from] the mishnah there: "grape clusters," etc., and "anything," etc.; and in the Gemara there: "all that is inside," etc., "even," etc.'
  ],
]);

// ── siman_140 ──────────────────────────────────────────────────────────────

fixLines(base + 'siman_140/beer-hagolah/part-001.txt', [
  [
    'Changing the Starwork Page M.D.:',
    'Mishnah, tractate Avodah Zarah, folio 44.'
  ],
]);

// ── siman_141 ──────────────────────────────────────────────────────────────

fixLines(base + 'siman_141/baer-heitev/part-001.txt', [
  [
    'There. It means that in the High Court it is forbidden but round as it is used or a round arch as a whole, it is permissible for them to process them in this matter, and without any shame that prohibits it from who must be done or stayed in their hands in their circle, and there is no permit in their origin. “Third:',
    'There [lashem]. It implies that only in such a case are they forbidden; but a circle like the sun, or a round arch exactly like the moon, are permitted — for it is not their practice to worship them in this form — contrary to the Levush who forbids this. Nevertheless, certainly making them or keeping them in one\'s possession, even in their [standard round] shape, is forbidden; the only permit is for one who finds them [as ownerless]. Shach.'
  ],
  [
    'known. And this shit is not known if these tools have been working on forbidden contempt. “Third:',
    'Known [be-yadu\'a]. And it is obvious that according to this view, there is no distinction: if it is known that these vessels were worshipped, even the degraded ones are forbidden. Shach.'
  ],
  [
    'and the custom. This means in the forms that Starworkers work in this manner as the first term, and that the Starworkers do not work for these forms, and do so, as a model, are permitted in pleasure for their origin, but they do not have a pause. “Third:',
    'And the custom [ve-ha-minhag]. This means: regarding forms that non-Jews worship in our day, the practice follows the first view; and those forms that non-Jews do not worship — such as the sun and moon, etc., as above — are permitted for benefit [be-hana\'ah] to one who finds them; but one may not keep them. Shach.'
  ],
  [
    'Allowed. P.S. with pleasure, provided that they do not have them in his hands. “Third:',
    'Permitted [mutarim]. For benefit, provided he does not keep them in his possession. Shach.'
  ],
  [
    'assumed. Derry is a prominent form that is prohibited because of suspicion and is permitted to sign in their desolation. “Third:',
    'To place it [le-hanichah]. For he is keeping a protruding form, which is forbidden on account of suspicion; but he is permitted to seal with it, since an impression made by a seal is sunken [shaku\'a]. Shach.'
  ],
  [
    'The Starworker. It is already explained by the D.C. that it is forbidden to tell the Star worker to sign in a ring whose signature is immersed in an epic nature does not want to be held because of Damir for a star worker who is sitting. “Third:',
    'The non-Jew [ha-oved kokhavim]. It has already been explained that it is likewise forbidden to tell a non-Jew to seal with a ring whose seal is sunken, even if he does not wish to keep it — because of amira le-akum [the prohibition of asking a non-Jew to perform a forbidden act], which is [rabbinically] forbidden as a shevut. Shach.'
  ],
  [
    'High. This ally does not inhibit the processing of the lamp with no cups and buttons, and if it is not high, the cultivators, but of wood and pottery and the so-called Dasula in the Temple of Shas and the Rambam, and we would have written the T-shirt metals. “Third:',
    'Tall [gevohah]. This [requirement] does not disqualify [the menorah] post facto — for after the fact the menorah is valid even without goblets and knobs; and if it is not eighteen handbreadths tall it is also valid post facto. But [a menorah made] of wood, earthenware, and the like is disqualified for use in the Temple — as stated in the Talmud and by Rambam — and this is why Tur and Shulchan Aruch wrote specifically "metals." Shach.'
  ],
]);

fixLines(base + 'siman_141/beur-hagra/part-001.txt', [
  [
    'And so, just as a quaint. Jerusalem is there what I am doing if a barbaric thing that is enslaved even a forbidden mboin and if a wild thing that is not even enslaved is permitted, but because there is a kamin in it:',
    'And all this in an anonymous [stam] case, etc. — Yerushalmi there: "What are we dealing with? If it is clearly known that they are worshipped, even the degraded ones are forbidden; if it is clearly known that they are not worshipped, even the honored ones are permitted; rather, we are dealing with an anonymous [stam] case."'
  ],
  [
    'Or there is a quaint. As a result:',
    'Or there is, etc. — as stated in seif 1.'
  ],
]);

fixLines(base + 'siman_141/turei-zahav/part-001.txt', [
  [
    'Dema for the work of stars was done. In this column, it is written that the doctrine of the work of the planets is prohibited from demiseing as a quaint, and that it is sufficient for the sake of the substance that is wrong. And even harder at what he said later in the verse of David Neui was done for what would be certain to be done for the sake of the work of the stars and to see, in accordance with the provision of the work of stars to the material from wherever it is necessary for the rest and the prohibition to make it possible to make it easier for me to make sure that I do not strengthen a satisfactory prohibition, but rather than to be rejected',
    'That anonymously [stam] it was made for idolatry. In the Tur it is written: since the doubt concerning idolatry is treated stringently, since anonymously [stam] it is so, etc. One should wonder: since the presumption is that it is so, why does he give the reason of treating a doubt stringently? And further it is difficult in what he says afterwards regarding cities [krakhin], that certainly it was made for decoration — why is it certain? For there too it is possible that it was made for idolatry. It appears that even though a doubtful case of idolatry is treated stringently, nevertheless wherever there is a reason for permitting, it is appropriate to be lenient — for we rule everywhere that we do not presume something to be forbidden based on a doubt, and we are not stringent on a doubt except where the prohibition has already been established. Therefore, since there is a reason that it was made for decoration, we do not presume this to be certain, since it has support from the principle that we do not presume a prohibition. But in villages, where it is not customary to make them for decoration — in that case, the reason for idolatry is equal to the reason for permitting, for both have a counter-argument: against prohibition there is the counter-argument that we do not presume a prohibition, and against permitting there is the counter-argument that it is not customary to make them for decoration; they are thus equal, and in a case of doubt regarding a non-Jew\'s [item] we rule stringently. And my father-in-law z"l wrote that the Tur\'s intent is that there should not be a double doubt [sefeik sefeika] — a doubt whether it was made for idolatry, and even if you say it was, perhaps it was annulled. But this is difficult, for there is no annulment here; even if he dragged it there is no annulment as long as its form has not been diminished, and here we are dealing with intact [shelemim] figures — for if they were broken, indeed in truth there would be annulment, as stated later.'
  ],
  [
    'Don\'t do them. Even for a star worker, yes:',
    'It is forbidden to make them. Even for a non-Jew — so it must be said.'
  ],
]);

// ── siman_142 ──────────────────────────────────────────────────────────────

fixLines(base + 'siman_142/baer-heitev/part-001.txt', [
  [
    'burned. Israel\'s heir, but a star worker who burned was abolished. TJ:',
    'Burned [serefah]. This refers to an Israelite; but a non-Jew who burned it has annulled it. Taz.'
  ],
  [
    'July. It means that all that we do not interfere with is not the pleasure of the Dead Sea, and I have written no guarantee that we can sell to the Starworker as it does, and so on, and that it is not possible for him to do so, but that he is not allowed to do so, but that he is not allowed to do so',
    'He shall carry it [yolik]. The language of the Shach implies that anything that was not mixed in [with permitted food] does not benefit from carrying the benefit to the Dead Sea. However, I have already written that even without mixture there is a permit to sell to a non-Jew when he cuts it, etc. (as written above, s.k. 6, see there). And what it says — that all the remaining loaves are permitted — implies even for eating; and it is not comparable to yayin nesech which is forbidden for drinking, which is prohibited on account of a non-Jew\'s touch; but bread which was baked with a forbidden item is only forbidden for benefit — and since he carried [the benefit] to the Dead Sea, he no longer benefits from the non-Jew.'
  ],
  [
    'I was enslaved. It is not that you will be saved as a result of Hashem. “Third:',
    'Was designated for worship [ne\'evedet]. It means that from the outset it was planted to be worshipped, as stated in siman 145, see there. Shach.'
  ],
  [
    'Patty. It means, in retrospect, but not in the field that is paved. The Bible and the Bible:',
    'He fattened it [shepatmah]. It implies [this is permitted] only post facto, but not ab initio; and similarly a field that was manured, etc. Taz and Shach.'
  ],
]);

fixLines(base + 'siman_142/turei-zahav/part-001.txt', [
  [
    'Even if he burned. It means Israel, but a star worker who has been burned has been abolished:',
    'Even if he burned it. This refers to an Israelite; but a non-Jew who burned it has annulled it.'
  ],
  [
    'I think that\'s a quaint. The Rambam wrote this clause in the laws of forbidden goods such as the Torah and the island of the vineyards, and there it belongs to the passage of the island, and so on, but in the work of the stars, it was not mentioned in the Torah that we were not allowed to divide the rest of the stars, and that it was already proven that they were not allowed to do so',
    'Even though this and that caused it, etc. — Rambam wrote this clause in the laws of forbidden foods, such as orlah and kil\'ei ha-kerem; and it belongs there to the discussion of the vineyard, etc. But regarding idolatry, he did not mention at all the law of a pot [kedeirah] — that is, as I wrote nearby, that regarding idolatry "this and that caused it" is truly forbidden, according to Rema and the Rosh; and the mechaber here follows his own approach, not distinguishing between idolatry and other prohibitions — and we have already demonstrated that there is a distinction between them. It appears that this is why the Tur did not cite these laws that the mechaber cited in seifs 6 and 7, even though they are explicit in the Talmud — because there is no practical difference [nafka minah] from them, for here, regarding idolatry, "this and that caused it" is truly forbidden even in an oven; and in the Talmud they are stated regarding orlah; and this resolves the Beit Yosef\'s difficulty with the Tur on this matter.'
  ],
]);

// beur-hagra siman 142 — multi-line garbage, use string replace
{
  const file = base + 'siman_142/beur-hagra/part-001.txt';
  let content = readFileSync(file, 'utf8');
  const oldText = `If there was a quaint. This is why Hashem’s people are not allowed to do so, and the Lord’s Word is not the same as Hashem’s people, and the Holy One is not the same as Hashem’s people, nor is it possible for them\r\nI will be arrested in retrospect, and I will not be able to do so, and if it does not mean that it is permissible, and if it does not mean, it is permissible, and that it is called, and it is not called, and if it does not mean, it is permissible, and it is not possible to say that it is the name of the Lord, which is known as the Sages, but is not permitted`;
  const newText = `And if it was, etc. It implies that even post facto it is forbidden; and so ruled Rashba and Ran — and likewise a spindle [karkur] in seif 3 and wood in seif 4 — except that he wrote that carrying the benefit to the Dead Sea suffices, as stated there. This follows Rashi's approach; but according to what Tosafot and Rambam and Shulchan Aruch wrote there — that only when it became mixed in is it completely forbidden — therefore Rambam wrote that it is completely forbidden. But Rosh and Tur wrote that here, post facto, it is entirely permitted, unlike the spindle and wood where the entire [product] was produced through the prohibition. Proof: from the challenge there "and let him also derive [the prohibition] on account of the greasiness" — and on account of greasiness the entire [product] is not prohibited; and even with a sick one [mesukenet] where there is greater benefit, nevertheless it was not forbidden post facto. Know this from what is stated in tractate Avodah Zarah 48b: "and let not pass," etc. "and if it passed," etc. — one sows vegetables beneath it, etc., but not, etc. — and were it not permitted post facto, it would have implied that if he sowed it is forbidden; [the fact that it does not say so] implies it is permitted post facto. And it is stated there beginning of chapter 5, 51b: "one who rents," etc. — the Sages imposed a fine, etc. — but without that, it would be permitted. See Rosh there.`;
  if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    writeFileSync(file, content, 'utf8');
    console.log('Fixed multi-line: siman_142/beur-hagra/part-001.txt');
  } else {
    console.log('WARNING: multi-line match not found in siman_142/beur-hagra/part-001.txt');
  }
}

console.log('Done.');
