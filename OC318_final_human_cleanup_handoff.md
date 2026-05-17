# OC318 Final Human Cleanup Handoff

Use this after the scanner passes with:

CLEAN = 443
REVIEW_REQUIRED = 0
RETRANSLATE_FROM_HEBREW_REQUIRED = 0

Purpose:
The scanner has removed known machine artifacts, but the document still needs final editorial and semantic cleanup. Do not rebuild the whole translation. Do not rerun bulk translation. Work from the current scanner-clean JSON and DOCX.

Goal:
Make the English readable, accurate, and publication-ready while preserving the Hebrew, structure, source order, and bilingual format.

## Operating principle

The scanner passing means known failure markers are gone. It does not mean every paragraph is good English.

For this pass:

1. Preserve all Hebrew exactly unless there is an obvious spacing or punctuation artifact.
2. Preserve all source headers and order.
3. Preserve Hebrew first, English immediately below.
4. Do not summarize.
5. Do not add commentary.
6. Do not remove source material.
7. Clean bad English, awkward literalism, and obvious mistranslations.
8. If a paragraph is obviously corrupted, replace the English paragraph from the Hebrew above it.
9. Do not change halachic meaning to make the English smoother.
10. Do not call the result final until this cleanup is complete.

## Priority 1: Search and clean these surviving bad phrases

Search the document for these phrases and fix every occurrence.

```text
the one who issues it authorizes the authority
from the amount it was as a cook
Motzei Shabbos must be made stricter
the penalty for all melachos that are done on the day of Motzei Shabbos
a wise man who makes a mistake and who forgets
others are allowed to go out on Shabbos immediately
for him immediately
guilty of sin
which the Sages penalized him
the prohibition is made for them
the negligent himself
the sages were more afraid that they would come to despise it
lives on Shabbos
Abi'd C. S. 7 Sab
according to the Law of a Jew
blood in the eye of the eye
blood swallowed in it is prohibited by the 27th prohibition
it is possible to slaughter meat without slaughtering it
it does not belong in this lest he increase
in the eyes of it bichdei sheyeasu
And it's delicious
it is a healthy person for this matter
lest they multiply for it
in a connected person
fruit that ends up on its own
sick person who is possessed today
soul control
Between an egg today
one should multiply it
that it increases / lest he increase
spurring
the slaughters / slaughter
faded as a presupposition
vomits while against the fire
the history of fire is like fire
```

If any of these appear, do not merely replace the phrase if the full paragraph is broken. Compare the English to the Hebrew immediately above it and rebuild the paragraph as needed.

## Priority 2: Specific replacement paragraphs

Apply these where the matching bad paragraph appears.

### Seif 1, Mechaber and Rama

Current English may contain:
"others are allowed to go out on Shabbos immediately"

Replace with:

(a) One who cooks on Shabbos, or performs one of the other melachos, intentionally, is forbidden to benefit from it forever, while others may benefit from it immediately after Shabbos. If he did so unintentionally, it is forbidden that day even for others, but after Shabbos it is permitted immediately even for him. {Rama: If he told a non-Jew to perform melacha on Shabbos, see above, siman 247, seif 20.}

### Seif 1, Magen Avraham note 3

Current English may contain:
"a wise man who makes a mistake and who forgets"

Replace with:

(c) And unintentionally. If he acted according to the ruling of a halachic authority, it is considered unintentional. The same applies if he forgot. So writes the Knesset HaGedolah in the name of the Radbach.

### Seif 1, Biur Halacha note 1

Current English may contain:
"the one who issues it authorizes the authority"

Replace with:

One of the other melachos: The Chayei Adam, rule 9, writes that this applies specifically where an action was done to the object itself, changing it from its previous state, such as cooking and the like. But one who carries an item from one domain to another, where the item itself was not changed, if he did so unintentionally, it is permitted even to him and even on that same day. If he did so intentionally, it is forbidden even to others until immediately after Shabbos. Nevertheless, one should be stringent with all Torah prohibitions, as with cooking. Know also that according to the Shulchan Aruch, which rules like R. Yehuda that when done unintentionally one may benefit from it after Shabbos, this applies to all melachos where the penalty imposed by Chazal is recognizable, namely that one may not benefit from it that day until after Shabbos. But with planting on Shabbos, and likewise sowing, where in any case one cannot benefit from it immediately, the unintentional case is the same as the intentional case, and in both cases one must uproot what was planted. This is explicit in Gittin 54b according to R. Yehuda.

### Seif 1, Shulchan Aruch K'pshuto introduction

Current English may contain:
"guilty of sin"

Replace with:

(a) Introduction to the seif. The Torah forbids performing melacha on Shabbos. One who performs melacha intentionally is liable for death or kares, and one who does so unintentionally is liable to bring a chatat. The Torah prohibition applies to the person, not to the object that was affected by the forbidden act. However, the Sages penalized one who performed melacha on Shabbos and also prohibited the item on which the melacha was performed, so that people would not treat the prohibitions of Shabbos lightly. The laws of this penalty are explained in this seif.

### Seif 1, Shulchan Aruch K'pshuto note 4

Replace with:

(d) After Shabbos. Even if the forbidden act was done for others, the Sages did not prohibit the item forever except to the person who desecrated Shabbos himself. The utensils in which the food was cooked in violation of Shabbos do not become forbidden.

### Seif 1, Shulchan Aruch K'pshuto note 5

Replace with:

(e) Immediately. There is no need to wait bichdei sheyeasu, meaning one does not need to wait after Shabbos for the amount of time that would have been needed to perform this melacha after Shabbos began, as the Rama explains later in the seif.

### Seif 1, Shulchan Aruch K'pshuto note 6

Replace with:

(f) Immediately. This means that when the act was done unintentionally, the Sages prohibited benefit from it on Shabbos itself so that people would not treat Shabbos prohibitions lightly. However, they did not distinguish in this case between the one who acted unintentionally and others.

### Seif 1, Shulchan Aruch K'pshuto rabbinic melacha paragraph

Replace with:

All this applies to a Torah-level melacha. With a rabbinic prohibition, if it was violated intentionally, the result is forbidden like a Torah-level melacha. But if one violated a rabbinic prohibition unintentionally, one may benefit from it even on Shabbos itself.

### Seif 1, Shulchan Aruch K'pshuto note 7

Replace with:

(g) Siman 307, seif 20. There it is explained that regarding the prohibition of asking a non-Jew to perform melacha, the Sages were more stringent and prohibited benefit from that Shabbos melacha until after Shabbos, after waiting bichdei sheyeasu. The reason they were more stringent with the lighter prohibition of asking a non-Jew is that they were especially concerned people might come to treat it lightly.

### Seif 2, Tur note 4

Current English may contain:
"bundle of water", "egg yolk", or "another taste in the Bible"

Replace with:

(d) That he became ill today. Even though the animal was muktzeh because of the prohibition of slaughtering, nevertheless it is permitted, because we rule like R. Shimon that there is no muktzeh because of a prohibition unless he actively set it aside, such as a lamp that he lit for that Shabbos. This is from the Maggid Mishneh, chapter 2. One may ask: if so, something attached to the ground should also be permitted once the fruits fall off. One can answer that there the reason is lest he climb up and detach it, as stated at the beginning of Beitzah. See there, and see another reason in the Beit Yosef.

### Seif 2, Tur note 5

Current English may contain:
"lives on Shabbos"

Replace with:

(e) Raw on Shabbos. This means without salting, as the Tur writes. See Yoreh Deah 67:2, that rinsing is still required. See also what I wrote in siman 325:11.

### Seif 2, Tur note 6 duplicate

If there is a second Tur note with:
"or for a sick person - Rashba for this reason, according to the Law of a Jew"

Replace with:

(f) Or for a sick person. The Rashba writes that this too follows the same reason, since with melacha performed by a Jew there is no distinction between the sick person and a healthy person for this purpose.

### Seif 2, Tur note 8

Current English may contain:
"no concern for weddings"

Replace with:

(h) On Shabbos. This excludes Motzei Shabbos. There is also no issue of bishul akum here, because since this case is uncommon, there is no concern of intermarriage.

### Seif 2, Tur note 9 duplicate

Current English may contain:
"it is possible to slaughter meat without slaughtering it"

Replace with:

(9) A healthy person is permitted, etc. The reason is that since the primary slaughtering is for the sick person, and it is impossible to obtain even an olive-sized piece of meat without slaughtering, the concern of increasing for the healthy person does not apply here.

### Seif 2, Tur note 10

Current English may contain:
"blood in the eye of the eye"

Replace with:

(10) It may be eaten raw on Shabbos. This is without salting, since salting is forbidden on Shabbos. Rinsing is required because of visible blood, but blood absorbed within the meat is not forbidden as long as it has not separated.

### Seif 2, Tur note 11

Current English may contain:
"And it's delicious"

Replace with:

(11) It is forbidden for the sick person. But on Motzei Shabbos it is permitted immediately, and one does not need to wait bichdei sheyeasu. Tasting whether the food is good for the sick person is permitted even on Shabbos.

### Seif 2, Tur note 12

Replace with:

(12) Whose life is not in danger. Such a person is considered like a healthy person for this matter, since it is forbidden by Torah law for a Jew to cook for him. Therefore, if we were to permit him to eat from it, we are concerned lest one increase for him.

### Seif 2, Shulchan Aruch K'pshuto note 8

Current English may contain:
"soul control"

Replace with:

(h) One who slaughters on Shabbos for a sick person. After the previous seif discussed food cooked on Shabbos in violation of Shabbos, this seif discusses food prepared on Shabbos permissibly because of pikuach nefesh, meaning for a dangerously ill person who may die if he does not eat fresh meat even on Shabbos.

### Seif 2, Shulchan Aruch K'pshuto note 9

Current English may contain:
"Between an egg today"

Replace with:

(i) Whether he became ill that day. One might have thought that if a sick person was already present before Shabbos, we knew before Shabbos that we would need to slaughter for him the next day. But if he became ill on Shabbos, we did not know this when Shabbos began, so perhaps the meat should be muktzeh. The halacha is that an animal designated for slaughter loses its muktzeh status when it is slaughtered for a permitted need.

### Seif 2, Shulchan Aruch K'pshuto note 10

Replace with:

(j) To eat from it raw. Since no prohibition was done here, because it is permitted to slaughter for a dangerously ill person, and this one act of slaughter can provide meat for many people without adding any forbidden melacha.

### Seif 2, Shulchan Aruch K'pshuto note 11

Replace with:

(11) Another melacha. The Rama notes that the law is not limited to cooking. It applies to any melacha similar to cooking, where doing it for more than one person requires increasing the act.

### Seif 2, Shulchan Aruch K'pshuto note 12

Replace with:

(12) Lest he increase for him. Meaning, lest he intentionally put more into the pot than is needed for the sick person so that healthy people can also eat from the leftovers.

### Seif 2, Shulchan Aruch K'pshuto note 13

Current English may contain:
"spurring"

Replace with:

(13) It is forbidden on Shabbos. If a non-Jew cooked for the sick person, there is no concern that the Jew will increase the amount, since the non-Jew is permitted to cook for the sick person. The prohibition of benefiting from the non-Jew’s cooking is only rabbinic. Nevertheless, the Sages did not distinguish in this case and forbade it even when the non-Jew cooked. In such a case, however, the food is permitted immediately after Shabbos.

### Seif 2, Shulchan Aruch K'pshuto note 16

Replace with:

(16) And there is an issue of muktzeh. The later authorities ask on these words of the Rama: why should the small amount that grew on Shabbos not be nullified to the fruit itself? It appears that the case is one of vegetables that grow quickly, such as gourds, where the amount added on Shabbos is significant, and therefore the fruit is muktzeh. But if, for example, an orange was picked on Shabbos for a dangerously ill person, and the sick person ate one segment from it, a healthy person may eat the rest of the fruit.

### Seif 3, Tur note 11

Current English may contain:
"Or to Shebra 20"

Replace with:

(11) Or to break it, etc. There are three distinctions regarding an egg in Beitzah 2b. See Rashi there.

### Seif 3, Tur note 17

Replace with:

(17) With derivatives of fire. One who cooks with them is liable. Therefore, one who places fruit or water on an oven or inside the oven chamber after the oven was heated, and they cook there, is liable. Rabbinically, it is forbidden to place them there even before the oven is heated, as explained below. All the laws of cooking mentioned in this siman also apply to something cooked by means of derivatives of fire.

### Seif 3, Tur note 18

Replace with:

(18) And even with derivatives of the sun. Even after the fact it is forbidden, though it is possible that after Shabbos it is permitted even for the one who cooked it. See the glosses of Rabbi Akiva Eiger.

### Seif 3, Tur note 21

Current English may contain:
"did not cut off the light of the heat"

Replace with:

(21) But in the sun itself. The Sages did not decree because of fire, since people do not confuse cooking in the sun with cooking by fire.

## Final review instruction

After applying these replacements:

1. Search again for the Priority 1 phrases above.
2. Search for repeated filler such as "the the the".
3. Search for English letter fragments with periods, such as "C. S.", "P.B.", "A.A.", and "G.F."
4. If they appear in corrupted paragraphs, fix from the Hebrew.
5. Only then export the final DOCX.

## Suggested final validation command

```bash
npm run fix:vocab
npm run build:v3
npm run validate:oc318:strict
```

Then do one manual search pass in the DOCX for:

```text
the one who issues it authorizes the authority
blood in the eye
soul control
spurring
egg today
the the the
C. S.
P.B.
A.A.
G.F.
```
