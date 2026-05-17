# OC318 Soft Marker Cleanup Patch V4

This patch targets the remaining 32 `REVIEW_REQUIRED` soft markers after hard blockers were cleared.

Latest validation status:
- Total paragraphs: 443
- CLEAN: 411
- REVIEW_REQUIRED: 32
- RETRANSLATE_FROM_HEBREW_REQUIRED: 0

Apply these to `data/oc318.full.json`, then rebuild and rerun strict validation.

## Run after applying

```bash
npm run fix:vocab
npm run build:v3
npm run validate:oc318:strict
```

## Goal

Clear the remaining soft markers:
- the hand is scalded
- if we catch a cold
- disgusted hand
- arbitrators
- Sunday
- bad parenthetical note labels: (Yid), (Tu), (Kid), (Lev), (J)

## Important

Some of these can be fixed with careful phrase replacement. Others should replace the full English paragraph because the surrounding English is still weak.

Do not change the Hebrew.

# General safe replacements

These are safe wherever they appear in halachic context:

```text
the hand is scalded with it -> it is yad soledet bo
the hand is scalded by it -> it is yad soledet bo
the hand is scalded -> yad soledet bo
the hand is averse to it -> it is yad soledet bo
disgusted hand -> yad soledet bo
hand is not disgusted with it -> it is not yad soledet bo
if we catch a cold -> if it cooled
when we didn't catch a cold -> as long as it has not cooled completely
arbitrators -> poskim
Sunday vessel -> kli rishon
in a Sunday vessel -> in a kli rishon
```

For parenthetical labels, replace only the note marker, not the text:

```text
(Yid) -> (10)
(Tu) -> (15)
(Kid) -> (24)
(Lev) -> (32)
(J) -> (10)
```

# Specific paragraph replacements

## Seif 2, Tur note 14

Replacement English:

(10) Because it grows, etc. This concern does not apply to an animal, and therefore they were not concerned about this. See Tosafos Yom Tov, Beitzah 37b.

## Seif 2, Tur note 31

Replacement English:

(10) For a sick person on Shabbos. Fruit attached to a tree at the beginning of Shabbos is muktzeh because of a prohibition, because in order to use it on Shabbos one would have to violate the prohibition of detaching. Therefore, even when it is detached for the needs of a sick person, it remains forbidden to a healthy person on Shabbos.

## Seif 2, Tur note 32

Replacement English:

(15) If he was sick before Shabbos. In that case, there may have been intent before Shabbos to detach the fruit for him if needed, and therefore the issue is not exactly the same as when the illness began on Shabbos itself.

## Seif 3, Shulchan Aruch K'pshuto note 8

Replacement English:

(24) It is permitted. This is because there is no concern that people will confuse heating directly in the sun with heating by fire.

## Seif 4, Tur note 18

Replacement English:

(10) And if not. This is based on what is stated in the relevant sugya, that if the item had not reached the required level before Shabbos, there remains a concern of cooking.

## Seif 4, Tur note 39

Replacement English:

(20) If it cooled. Even though the food was already cooked, the permission of “there is no cooking after cooking,” which will be explained later, applies only to a dry item. But a liquid that cooled may be subject to cooking again.

## Seif 4, Tur note 44

Replacement English:

(50) In a cooked item on Shabbos. That is, one may not place it into boiling water in a kli rishon, even if the vessel has been removed from the fire. This is forbidden by Torah law for foods that are cooked in this manner, such as an egg.

## Seif 4, Biur Halacha note 1

Replacement English:

If it cooled: See the Mishnah Berurah. This means that it is no longer yad soledet bo. If it was poured into another vessel, even if it was still yad soledet bo before the transfer, there is room to say that it is now treated as cooled with respect to the issue discussed here.

## Seif 5, Tur note 8

Replacement English:

(10) Cooking. Even though there is no cooking after cooking, the Maggid Mishneh holds that there is cooking after roasting, and likewise roasting after cooking. Therefore it is forbidden to place something cooked near the fire where it can roast.

## Seif 5, Tur note 22

Replacement English:

(46) And they were accustomed to be careful, etc. This means that they would not put bread into the soup of the cholent in a bowl that is a kli sheni, and they were careful not to pour onto it directly from a kli rishon. Those who are lenient rely on the view that a kli sheni does not cook, but one should be careful with anything that may cook easily.

## Seif 6, Tur note 20

Replacement English:

(46) It is yad soledet bo. This refers to a liquid dish, where there is cooking after cooking if it is no longer yad soledet bo. In seif 15, the Rama is lenient with a moist dish whose heat has not entirely left it.

## Seif 6, Biur Halacha note 2

Replacement English:

Until it becomes yad soledet bo: But if it cannot reach that level of heat, it is permitted to place it there even when completely cold, even though it will warm somewhat.

## Seif 7, Tur note 2

Replacement English:

(24) It is never forbidden. This is comparable to returning something to a kirah from before Shabbos. See Rivash, and see Pri Megadim, siman 253, seif katan 63, regarding a case where one removed a pot from the kirah while it was still day.

## Seif 8, Tur note 3

Replacement English:

(27) And it is mitzamek v'yafeh lo. See Rabbeinu Yerucham. This is also implied by the Rama in his gloss, since the Rama rules stringently only where the continued cooking improves the food. If it cooled, the issue of cooking may return according to the stricter view.

## Seif 9, Mechaber and Rama

Replacement English:

(9) A kli rishon, meaning the vessel that was on the fire, cooks even after it has been removed from the fire, as long as it is yad soledet bo. Therefore, it is forbidden to place spices into it. But one may place them into a kli sheni. The Rama adds that some forbid placing salt even into a kli sheni as long as it is yad soledet bo, and it is good to be careful lechatchilah.

## Seif 9, Tur note 3

Replacement English:

(10) And there are those who forbid placing salt. In the Gemara there are two versions regarding salt. According to the later version, salt is lenient and is difficult to cook, like the flesh of an ox. Therefore, it is permitted even in a kli rishon after it has been removed from the fire. But some are stringent and forbid placing it even in a kli sheni while it is yad soledet bo.

## Seif 9, Tur note 19

Replacement English:

(32) And those who are stringent. See Tosafos there.

## Seif 9, Tur note 39

Replacement English:

(Shulchan Aruch) Because of the blood in it. Even meat that has been salted and from which the blood was removed may not be placed into a kli rishon, because it would cook on Shabbos. Unsalted meat certainly may not be placed there.

## Seif 9, Tur note 40

Replacement English:

(66) That it is yad soledet bo. According to this view, one should be concerned that salt cooks easily.

## Seif 11, Shulchan Aruch K'pshuto note 5

Replacement English:

(71) Into cold water. Even though he thereby heats the cold water. According to the Rama, this is permitted only when pouring from a kli sheni. According to his view, the Sages were stringent only when placing water into a kli sheni. The poskim debate the exact scope of this distinction.

## Seif 12, Tur note 2

Replacement English:

(32) A large amount. We do not say that the vessel combines with an act that is not intended. It is also not appropriate to say that this is a psik reisha and therefore he should be liable, because when he intends to heat the water he performs a melacha, but when he does not intend to heat it, it is not treated in the same way.

## Seif 12, Tur note 7

Replacement English:

(6) Much cold water, etc. A small amount of water that can be heated by the hot water until it becomes yad soledet bo is forbidden. But a large amount is permitted, such as when he fills the entire vessel with cold water, because it will not become yad soledet bo.

## Seif 12, Tur note 14

Replacement English:

(13) To thaw. Meaning, to remove their cold. It is forbidden to pour water into it if the water will reach yad soledet bo, such as where there is only a small amount of water, as the Rama writes later.

## Seif 13, Tur note 7

Replacement English:

(87) In a kli sheni. When the hot liquid is poured from the kli rishon in which it was boiled into this vessel, it is permitted even if it is yad soledet bo. But if the empty vessel itself was removed from the kli rishon and remains very hot, it may have a stricter status.

## Seif 13, Biur Halacha note 2

Replacement English:

A food that comes as a solid piece, such as a piece of meat: Some are stringent and hold that it retains heat inside, and even when it is in a kli sheni it should be treated like a kli rishon as long as it is yad soledet bo.

## Seif 13, Biur Halacha note 3

Replacement English:

The poskim disagree about how to view the soup inside a ladle, whether it has the status of a kli rishon or a kli sheni. It appears in halacha that it is a kli sheni, but if it remained in the pot for some time, it may be treated as a kli rishon.

## Seif 14, Mechaber and Rama

Replacement English:

(14) It is permitted to place a small pitcher of water or another dry item near the fire in order to remove its chill, provided that it is placed far enough from the fire that it cannot become yad soledet bo.

## Seif 15, Mechaber and Rama

Replacement English:

(15) Something that was fully cooked and is dry, with no liquid in it, may be placed opposite the fire even in a place where it can become yad soledet bo. {Rama: All the more so that we have already explained that there is no cooking after baking and roasting. Some are stringent with this, but the custom is to be lenient.}

## Seif 15, Tur note 8

Replacement English:

(93) Fully cooked and dry. It need not be fully consumed. Even if it is dry and boiling, there may still be concern of cooking as explained above. In any case, it is forbidden to place it in a place where it appears like cooking.

## Seif 15, Tur note 16

Replacement English:

(100) It is permitted. As long as the food is hot and is yad soledet bo, according to all opinions there is no cooking in it.

## Seif 15, Tur note 19

Replacement English:

(93) If it has not completely cooled. That is, the Rama rules in principle like the lenient opinions, that it is permitted to reheat a stew even if it contains liquid, as long as it has not completely cooled. However, because of the importance of the stricter opinions, the custom is to be careful where possible.

## Seif 18, Tur note 12

Replacement English:

(24) That is found from one vessel to another, etc. As when one pours from one vessel to another, this is a real prohibition according to what the Shulchan Aruch ruled above. See there.

# After applying

Run:

```bash
npm run fix:vocab
npm run build:v3
npm run validate:oc318:strict
```

Expected target:

```text
CLEAN = 443
REVIEW_REQUIRED = 0
RETRANSLATE_FROM_HEBREW_REQUIRED = 0
```
