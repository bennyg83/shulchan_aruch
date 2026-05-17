# OC 318 — Halachic Vocabulary Correction Guide

**Layer (C) — scripted cleanup only.** Deterministic find-and-replace rows consumed by `npm run fix:vocab` (`scripts/apply-vocab-corrections.js`). Do **not** move contextual translation or review rules here unless they are safe as direct string replacements.

For Hebrew-first review, failure markers, and paragraph rebuild rules, use **`OC318_Translation_Rules_Addendum_for_Cursor.md`**. For preprocessing architecture, use **`scripts/halachic_text_translation_pipeline.md`**.

This file is a find-and-replace vocabulary reference for correcting machine-translated English in the OC318 JSON / DOCX output. Apply these corrections to every English translation paragraph as appropriate.

---

## Part 1 — Direct Word/Phrase Replacements

These are exact wrong outputs from Google Translate and their correct replacements.

| Wrong (Google Translate) | Correct |
|---|---|
| craft / crafts / trade / trades | melacha / melachos |
| the work / a work | the melacha |
| forbidden work | forbidden melacha |
| doing work | performing a melacha |
| work done | melacha performed |
| on purpose / deliberately | intentionally / b'meizid |
| accidentally / by mistake | unintentionally / b'shogeg |
| by mistake and | b'shogeg and |
| To the world | Forever |
| to the world | forever |
| the mash / Mosh / mo"sh | Motzei Shabbos |
| on Shabbat nights / for Shabbat nights | after Shabbos |
| Shabbat | Shabbos |
| Saturday | Shabbos |
| Acomm / Acomi / ecom / ekum / Akoum | non-Jew / a non-Jew |
| for foreigners / for non-Jews (when used as bishul akum) | bishul akum |
| a Gentile / the Gentile | a non-Jew |
| Gentile | non-Jew |
| Israel / a Jew (when referring to a person) | a Jew / the Jew |
| assigned / allocated / set aside | muktzeh |
| Mukce / Muktze | muktzeh |
| the sages fined | the Sages penalized him |
| fined by the sages | penalized by the Sages |
| Dauriyta / D'auriyta / Deorayta | Torah-level / d'oraisa |
| Darbanan / D'Rabbanan / Derabanan | rabbinic / d'rabbanan |
| from the Torah | by Torah law |
| from Darbanan | of rabbinic origin |
| the sign | the chapter |
| siman | chapter |
| Barsha'a | Rashba |
| Daduka | davka (specifically) |
| Daduka in | davka, in |
| D'Davka | davka — that precisely |
| הוא הדין / וה״ה (ditto, same rule) | hahu hadin (the same rule applies) |
| b'chedi she'ya'asu | bichdei sheyeasu |
| tools / vessels (kli context) | vessel / vessels |
| first dish | kli rishon |
| second vessel | kli sheni |
| third vessel | kli shelishi |
| First dish on the fire | Kli rishon on the fire |
| Infusion from a first vessel | Pouring from a kli rishon |
| Infusion from a second vessel | Pouring from a kli sheni |
| Disgusted hand in it | yad soledet bo (hand-recoiling hot) |
| hand is disgusted | the hand recoils from the heat (yad soledet) |
| the hand is scalded in it | yad soledet bo (hand-recoiling hot) |
| The hand is scalded in it - | yad soledet bo (hand-recoiling hot) — |
| shrinking and good for him | mitzamek v'yafeh lo (continued cooking improves it) |
| shrinking and bad for him | mitzamek v'ra lo (continued cooking harms it) |
| is compressed and good | mitzamek v'yafeh lo |
| is compressed and bad | mitzamek v'ra lo |
| Ben Drosai dish | maachal ben Drusai |
| Ben Drosai | ben Drusai |
| stage of cooking when the food is suitable for eating by the pressure | the stage of cooking at which the food is minimally edible |
| Tor / Tur (when transliterated incorrectly) | Tur |
| Kari / kri | R' Yehuda |
| Karam / kram | R' Meir |
| Karshi / Rashi (when garbled) | Rashi |
| Destma / Destama / Sttama | the unattributed ruling (stama) |
| Dholin / Chulin | Chullin |
| Kuvatia | like him / according to his view |
| Tus / Tos (for Tosafos) | Tosafos |
| the Tus | Tosafos |
| BI / B'I | Beit Yosef |
| MA / M'A | Magen Avraham |
| SA / ShA | Shulchan Aruch |
| Sach / ShaCh / SHAK | Shach |
| Shach | Shach |
| Rambam | Rambam |
| Rashba | Rashba |
| Rashba's | Rashba's |
| Raavad | Ra'avad |
| Ran | Ran |
| Rosh | Rosh |
| Rama | Rama |
| Rema | Rama |
| the Gra / GRA | the Gra |
| MM / M'M | Maggid Mishneh |
| Radach | Radbach (R. David HaKohen of Corfu) |
| RDCH | Radbach |
| KNH'G | Knesset HaGedolah |
| in the name of | in the name of |
| Dachion / Dakhion | since / because |
| in their eyes so that they will | bichdei sheyeasu |
| in order for them to do | bichdei sheyeasu |
| Vazela / Vazla | and he follows his approach |
| ovary | she became ill |
| Ovary today | That he became ill today |
| MM Sheri Dekil | nevertheless it is permitted for we rule |
| the beast / the animal (for behema) | the animal |
| a beast | an animal |
| the cauldron | the pot |
| cauldron | pot |
| the stew / the broth | the dish / the cooked food |
| brewer | one who cooks |
| multiplies / will multiply | increases / lest he increase |
| pours for him | increases for him |
| the holy one | the sick person (when chola is involved) |
| Vapi / Vapi' | And even if |
| SHAK | Shach |
| Lafuki | To exclude |
| Nichom Lia Nechari | a non-Jew comforted him |
| by the way of her mother | alongside his mother |
| in the word the permit | only for circumcision did they permit |
| on account of the sign | regarding the chapter |
| This stage is already considered cooking that is required by the Torah | This stage already constitutes cooking for which one is liable by Torah law |
| spurred on | rabbinic |
| Preface to the section | Introduction to the seif |
| From other trades | Of the other melachos |
| for a patient | for a sick person |
| the patient | the sick person |
| dangerous patient | critically ill person |
| a minor | the patient / the sick person |
| it is rejected because of blood | rinsing is required because of visible blood |
| in order for it to be done | bichdei sheyeasu |
| so that they will | bichdei sheyeasu |
| Lest it multiply | Lest he increase |
| will multiply | will increase |
| multiplied | increased |
| Lest he multiply for him | Lest he increase for him |
| there is no reason | there is no concern |
| a healthy model | a healthy person |
| in a model | for a healthy person |
| is forbidden by the Torah to cook | it is forbidden by Torah law to cook |
| the holy person / the sick model | the sick person / a sick person |
| David Shemesh | solar water heater |
| in the history of light | in derivatives of fire (toldos ha'or) |
| in the history of Hema / Hama | in derivatives of the sun (toldos chamah) |
| in hot history | in derivatives of the sun |
| The history of light is slow | It is a decree on account of derivatives of fire |
| gzeira / decree on account of | as a decree lest it be confused with |
| by virtue of heat | from the power of the sun |
| Latmina | to bury it / burying it |
| Abhat / Abhet | see the Beer Heitev |
| PMG / PaMaG | Peri Megadim |
| CHA / Ch'A | Chayei Adam |
| for the khach | for the kli |
| Gualah | hag'alah (kashering by boiling) |
| koshering / the kosher | kashering / kashrus |
| A.A. / AA | it is impossible |
| Shaduka because A.A. | specifically because it is impossible |
| I shoot at a fire | we are dealing with fruit |
| And I shoot | And we are dealing |
| a fire that is not finished cooking | fruit whose ripening is not complete |
| when it is finished cooking | when its ripening is complete |
| Meiri with a fruit | and we are dealing with a fruit |
| And it goes | And it increases |
| grows and goes | grows and increases |
| allocated because of a prohibition | muktzeh machmas issur |
| Allocated / allocated | muktzeh |
| (Yid) | (14) |
| (Tu) | (15) |
| (J) / (j) | (10) |
| (H) / (h) (when translating a Hebrew letter note) | use the correct number e.g. (8) |
| (i) Between an egg today | (9) 'Whether he became ill today' |
| To eat it alive | To eat it raw |
| alive | raw (in context of uncooked meat) |
| He lives on Shabbat | Raw on Shabbos |
| he lives | it is eaten raw |
| without salting it is forbidden to salt | without salting — for it is forbidden to salt |
| murder and murder | death and kares |
| guilty of murder | liable to death and kares |
| the perpetrator himself | the one who himself desecrated Shabbos |
| \"for them to be done\" | bichdei sheyeasu |
| there is no need to wait on Shabbat night | there is no need to wait after Shabbos |
| accidentally the sages forbade | b'shogeg the Sages forbade |
| All this is a craft from the Torah | All this applies to a Torah-level melacha |
| in a craft from Darbanan | in a rabbinic melacha |
| it is deliberately forbidden as a craft | b'meizid it is forbidden like a Torah-level melacha |
| if you make a mistake in | if he acted b'shogeg in |
| 17, section 20 | Siman 307 seif 20 |
| He who butchers | One who slaughters |
| butchers / butcher | slaughters / slaughter |
| the butcher | one who slaughters |
| between yesterday's illness and today's illness | whether the person became ill yesterday or today |
| the healthy person is permitted to eat alive | the healthy person is permitted to eat from it raw |
| It is permissible for the healthy | A healthy person is permitted |
| not necessarily cooking | not specifically cooking |
| Other craft | Another melacha |
| similar to cooking | resembles cooking |
| lest he intentionally put more in the pot | lest he intentionally place more in the pot |
| the holy people can also eat | the healthy people can also eat |
| if a gentile cooks | if a non-Jew cooked |
| fear that it will multiply | concern lest he increase |
| \"assigned because of a prohibition\" | muktzeh machmas issur |
| his opinion was to take talsham | his intention was to detach them |
| (c) To the world | (3) 'Forever' |
| (d) For Shabbat nights | (4) 'After Shabbos' |
| (e) Immediately | (5) 'Immediately' |
| (f) Immediately | (6) 'Immediately' |
| (g) 17, section 20 | (7) 'Siman 307 seif 20' |
| Just as it is forbidden to cook in light | Just as it is forbidden to cook with fire |
| cook in light | cook with fire (b'or) |
| in the heat of the fire | with fire / with the heat of fire |
| its prohibition from the Torah | it is a Torah-level prohibition |
| So that it roasts | so that it will roast |
| heated by the power of the sun | heated by the force of the sun |
| the history of light | toldos ha'or (derivatives of fire) |
| the history of Hema | toldos chamah (derivatives of the sun) |
| derivatives of light | derivatives of fire |
| slow \u2014 because | \u2014 for it cannot be confused with |
| in the heat itself | in the sun itself |
| A dish that has been cooked to its full potential | A dish that was fully cooked |
| it has a purpose in cooking if it gets cold | there is the prohibition of cooking if it cooled |
| indeed | specifically if |
| but when it shrinks and it is bad for him | but when it is mitzamek v'ra lo |
| as much as the B | so wrote the Beit Yosef |
| old salted fish | old salted fish (maliach hayashan) |
| it means that cold water | it is implied that in cold water |
| bathe the arinj | rinse the herring |
| all laws are imposed because of cooking | all laws forbidden because of cooking |
| let it be placed on the range | even to place on the range |
| he knows that | and know that |
| If he does not cool | if it did not cool |
| Even if it changed somewhat from its boiling | even if it changed somewhat from its boiling |
| YA indeed | And there are those who say specifically |
| in the name of the 15th | in the name of Mahariv |
| in the name of Mahariv | in the name of Mahariv |
| Except for the old salted fish | Except for old salted fish |
| he shoots | we are dealing with |
| a fire whose cooking is not finished | a fruit whose cooking is not complete |
| when it is finished cooking, it is not | when its cooking is complete, we do not say |
| And it goes \u2014 and Meiri | 'And increases' \u2014 and we are dealing |
| Or he did \u2014 for this very reason | 'Or performed' \u2014 for this very same reason |
| for this reason, according to the Law of Israel | the Rashba \u2014 for the same reason, for regarding the melacha of a Jew |
| And af \u2014 Thos. | 'And even' \u2014 Tosafos |
| Nichom Lia Nechari | a non-Jew comforted him |
| On Shabbat \u2014 Lafuki | 'On Shabbos' \u2014 to exclude |
| it is not common, there is no reason for intermarriage | since it is not common there is no concern of intermarriage |
| such as chopped pumpkin | such as where he cut a gourd |
| a minor name such as chopped pumpkin | Chullin there, such as where he cut a gourd |
| Because he grew up | 'Because it grows' |
| they did not fear it | they were not concerned about this |
| On Shabbat Abhat 9 | On Shabbos \u2014 see the Beer Heitev |
| she fell ill today | 'That he became ill today' |
| she didn't want to kill an animal | we do not say the animal is muktzeh |
| she is assigned because of the prohibition of slaughtering | it is muktzeh on account of the prohibition of slaughtering |
| it is permissible for the healthy, etc. | 'It is permitted for a healthy person' |
| the point is that since the main purpose | the reason is that since the main purpose |
| He lives on Shabbat \u2014 and without salting | 'Raw on Shabbos' \u2014 and without salting |
| it is forbidden to salt on Shabbat | it is forbidden to salt on Shabbos |
| it is rejected because of blood in the eye | rinsing is required because of visible blood |
| It is forbidden for the patient | 'It is forbidden for the sick person' |
| but in the Mosh | but at Motzei Shabbos |
| not in the eyes of it in order for | one does not need to wait bichdei sheyeasu |
| tasting if the dish is good | tasting whether the dish is good |
| There is no danger in it \u2014 it is a healthy model | 'There is no danger in it' \u2014 for he is like a healthy person |
| which is forbidden by the Torah to cook for it by Israel | it is forbidden by Torah law to cook for him through a Jew |
| if we permit them to eat from this | if we permit benefit from this |
| Lest he multiply for him \u2014 to put meat into the cauldron | 'Lest he increase for him' \u2014 to place meat into the pot |
| Dauriyta prohibition when he multiplies | Torah-level prohibition when he increases |
| multiplies for him even before he puts | increases for him even before he puts |
| it is allowed immediately and the taste | it is permitted immediately; the reason is |
| the taste of the Dakhion of the ACM cooked | since the non-Jew cooked with permission |
| In advance of the day | 'From before Shabbos' |
| there is no preparation | there is no hachana (preparation) |
| That grows and goes | 'That grows and increases' |
| refer to the MA which makes it difficult to eliminate | see the Magen Avraham who asks why the growths are not nullified |
| mainly because it is the majority of permit | since it is the majority of the permitted |
| After in the previous section we dealt | After in the previous seif we dealt |
| after Shabbat with permission | with permission \u2014 cooked in a permitted manner |
| food cooked on Shabbat with prohibition | food cooked on Shabbos in a forbidden manner |
| (i) Between an egg today | (9) 'Whether he became ill today' |
| there was reason to think | one might have thought |
| prohibition of slaughtering and even if you say | prohibition of slaughtering. And even if you say |
| (j) To eat it alive | (10) 'To eat it raw' |
| there is no prohibition here | since no prohibition was done here |
| dangerous patient | critically ill person |
| (11) Other craft \u2014 the Rama says | (10) 'Another melacha' \u2014 the Rama notes |
| not necessarily cooking, but the rule of any craft | not specifically cooking, but so is the law of every melacha |
| one who does it for more than one person needs to increase its performance | one who performs it for more than one person must increase its performance |
| (12) Lest he multiply for himself | (11) 'Lest he increase for him' |
| more than was consumed by the patient | more than is needed for the sick person |
| so that the healthy can also eat | so that healthy people can also eat |
| (13) It is forbidden on Shabbat \u2014 if a gentile | (12) 'Forbidden on Shabbos' \u2014 if a non-Jew |
| there is no reason to fear that it will multiply | there is no room for the concern lest he increase |
| since it is not common to multiply | since the non-Jew is permitted to cook |
| enjoyment of the cooking of the non-Jew is only rabbinic | the prohibition of benefit from a non-Jew's cooking is only rabbinic |
| (Yid) For a sick person on Shabbat | (13) 'For a sick person on Shabbos' |
| \"assigned because of a prohibition\" | muktzeh machmas issur |
| in order to use them on Shabbat he must transgress the prohibition of the detached | in order to use them on Shabbos he must transgress the prohibition of detaching |
| (Tu) Sick the day before | (14) 'A sick person who was ill before Shabbos' |
| apparently the fruits are not allocated | seemingly the fruits are not muktzeh |
| his opinion was to take talsham | his intention was to detach them |
| (16) And there is a special reason in it | (15) 'And there is the concern of muktzeh' |
| the latter made it difficult for Rama's words | the later authorities asked about these words of the Rama |
| the little that grows on Shabbat is not cancelled | the small amount that grew on Shabbos is not nullified |
| it appears to explain that we are dealing | it appears to explain that we are dealing |
| vegetables that grow quickly, such as gourds | vegetables that grow quickly, such as gourds |
| the addition that grew on Shabbat is significant | the addition that grew on Shabbos is significant |
| a slice from it \u2014 the healthy is allowed | a slice from it \u2014 it is permitted for a healthy person |
}

print("vocabulary loaded")
PYEOF
python3 /home/claude/translations.py