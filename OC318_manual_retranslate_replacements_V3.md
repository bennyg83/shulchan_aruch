# OC318 Manual Replacement Translations V3

This patch targets the remaining 6 `RETRANSLATE_FROM_HEBREW_REQUIRED` blockers from the validation report generated on 2026-05-03T13:25:07.

Current report:
- Total paragraphs: 443
- CLEAN: 405
- REVIEW_REQUIRED: 32
- RETRANSLATE_FROM_HEBREW_REQUIRED: 6

Apply these replacements to `data/oc318.full.json`, not only to the DOCX.

After applying:

```bash
npm run fix:vocab
npm run build:v3
npm run oc318:gate-final
```

If hard blockers become 0, then move to the soft review pass.

---

## Seif 8, Tur note 11

Current marker:
- Dafilo

Replacement English:

(59) From on top of the fire. Even if it was removed from the fire, it is not permitted initially in siman 253 except as a return, but it is forbidden to place it there initially, as explained there in the seif and in the Rama’s gloss. See there.

---

## Seif 12, Tur note 6

Current marker:
- S.D.

Replacement English:

(Magen Avraham) And if the water. The Tur and the poskim explain that placing hot water into cold water is also permitted, relying on what is written in the Beit Yosef and the later authorities, provided that the cold water is not heated to yad soledet bo.

---

## Seif 16, Tur note 5

Current marker:
- KMSH

Replacement English:

(55) Yad soledet bo. The Levush writes that where it cannot reach yad soledet bo, there is no concern for cooking. But in a place where it can reach yad soledet bo, it is forbidden because of cooking. It appears to me that this is not difficult, because since it has already been cooked, the concern is not the same as with something uncooked. Nevertheless, one should be careful not to place it in a place where it can become yad soledet bo.

---

## Seif 16, Tur note 10

Current marker:
- DSL

Replacement English:

(56) And there are those who are stringent. This follows the view explained earlier, that even in the pot one should be stringent because the fat floats and is visible as a separate substance. See there, and see the Eshel Avraham.

---

## Seif 16, Tur note 14

Current marker:
- 20th century

Replacement English:

(102) And even though, etc. This is not comparable to crushing snow and hail, which is explained later in siman 320.

---

## Seif 18, Tur note 2

Current marker:
- Dahmir

Replacement English:

(23) Even in a pot. There the concern is that one should not pour into it even a spoonful of water, because it cooks, as stated in the beginning of Shabbos regarding dye being placed close to Shabbos. Likewise, I saw in the house of my teacher that they were careful in this matter.

---

# After applying this V3 patch

Run:

```bash
npm run fix:vocab
npm run build:v3
npm run oc318:gate-final
```

Expected next milestone:

```text
RETRANSLATE_FROM_HEBREW_REQUIRED = 0
```

After that, address the remaining `REVIEW_REQUIRED` soft markers, mostly:
- the hand is scalded
- if we catch a cold
- bad parenthetical note labels like (Yid), (Tu), (Kid), (Lev), (J)
- arbitrators
- Sunday
- disgusted hand
