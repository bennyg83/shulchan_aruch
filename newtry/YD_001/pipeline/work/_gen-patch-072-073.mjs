#!/usr/bin/env node
/** Generates remaining translation entries by reading Hebrew and applying rule-based stubs + manual overrides */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS_P1 as T072P1 } from './_patch-siman-072-translations-p1.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..', 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function parseFile(fp) {
  const parts = fs.readFileSync(fp, 'utf8').split(BLOCK).slice(1);
  return parts.map((block) => {
    const slug = block.match(/slug: (.+)/)?.[1].trim();
    const seif = block.match(/seif: (.+)/)?.[1].trim();
    const marker = block.match(/marker: (.+)/)?.[1].trim() ?? 'main';
    const hStart = block.indexOf(HEB);
    const eStart = block.indexOf(ENG);
    const heb = stripHtml(block.slice(hStart + HEB.length, eStart).replace(/^\s*\["?/, '').replace(/"?\]\s*$/, ''));
    return { slug, key: `${seif}#${marker}`, heb };
  });
}

function graTranslate(heb) {
  const t = heb.replace(/^<b>([^<]+)<\/b>\s*/, '$1 — ');
  return t + ' (Gra).';
}

function beerTranslate(heb) {
  if (/מימרא/.test(heb)) return 'Statement of R\' Zeira, Keritut daf 20; Rif and Rosh in Chullin ch. 7.';
  if (/משנה חולין/.test(heb)) return 'Mishnah Chullin daf 109.';
  if (/^טור/.test(heb)) return 'Tur.';
  if (/הרשב"א/.test(heb)) return 'Rashba there.';
  if (/שם ושם/.test(heb)) return 'There and there.';
  if (/בצלי/.test(heb) && /ראב"ד/.test(heb)) return 'There in Mishnah; Raavad in hasagah — deals with roasting; Mordechai — Rashi and Ramban (unlike Rabbenu Tam).';
  if (/חולין/.test(heb) && /שלוקה/.test(heb)) return 'Chullin — scalding; Ramban, Ran; Tur; Hagahot.';
  if (/רמב"ם/.test(heb)) return 'Rambam there.';
  if (/תוספות/.test(heb)) return 'Tosafot there.';
  return heb.slice(0, 200) + ' [source citation — see Hebrew].';
}

const MANUAL_072 = {
  'siftei-kohen': {
    '1#א': `And then permitted even to cook. Question: what does it teach — Mechaber also wrote "and afterward cook"; appears meaning: then it is like other meat and permitted to cook even with meat, as Darkei Moshe in name of Or Zarua.`,
    '1#ב': `And some are stringent, etc. Meaning: even through tearing and salting they are stringent to forbid cooking — decree lest cook without tearing; but roast through tearing and salting somewhat like other meat — below siman 76; and afterward cook. Torat Chatas beginning general rule 27; do not change where custom to be stringent; b'dieved if cooked after tear and salt — clearly permitted even per stringent; Tashbetz siman 561; I do not eat fowl heart though books mention only animal heart hard to forget — nevertheless I avoid fowl heart — end; and so I saw careful.`,
    '2#א': `"As it absorbs so it releases." Even though blood in eye we do not say "as it absorbs so it releases" (above siman 69, 70) — heart different: shia (thin part) — for this its thinness helps, considered emission blood (Torat Chatas there law 2, Ran). Needed for view of "some stringent" forbidding meat salted with it (Hagahat Shaarei Dura, Maharai): blood enclosed in cavity dries by salting/roasting and becomes emission blood; therefore other meat salted with it permitted. Rashba, Ran, Ramban: for roasting permitted without tearing — in roasting we say shia does not absorb; same in salting; Maharshal agreed; distinction: if after salting heart fell to gravy — permitted because shia did not absorb though forbidden in other meat (siman 70).`,
    '2#ב': `But if cooked without tearing — forbidden; by cooking it absorbs, we do not say shia, nor "as it absorbs so it releases" in pot — all that fell is in pot.`,
    '2#ג': `Until sixty, etc. — appears from Taz even if salted first and all blood in heart flesh exited — why tear after salting and permitted yet require sixty against heart, not only enclosed blood we cannot measure; implies salted but cooked without tearing; if not salted — even if torn need sixty against entire heart (Rashba Torat Chatas explicitly; poskim; Maharai Hagahat Shaarei Dura). Taz and supporters seem pot case salted first; Maharshal forces Tur before salting; Bach agrees (Ran); forced; Torat Chatas implies Tur argues Shaarei Dura — even salted need sixty entire heart — Tur ruled; Maharai and Rav also seif 69 seif 4 b'dieved two sides yet here tear after salt permitted — since heart not torn like thick head siman 71; Mechaber must be without prior salting; siman 22 Tur sixty against all threads — Rashba reason unknown amount; Ran estimates threads — Shulchan Aruch; Darkei Moshe Ran also holds cannot estimate — requires further study.`,
    '2#ד': `And even when there is sixty — requires study: Mechaber wrote forbidden until sixty implying with sixty heart permitted — Beit Yosef; Rav should have written "and some say even with sixty."`,
    '2#ה': `Heart itself forbidden — Torat Chatas law 6, Maharai Hagahat Shaarei Dura: sometimes blood in heart cooks and dries entirely in cavity, does not exit; not forbidden because heart becomes nevelah from stuck blood — Maharai there shia helps heart does not absorb faster; Maharshal agrees; unlike Taz who forbade nevelah reason.`,
    '2#ו': `Peel bit around — if heart cooked with fowl and piece itself has sixty — still need peel since salted with it and forbidden peel-thickness (Torat Chatas); proves Rav even if heart salted first must estimate entire heart (s.k. 5).`,
    '2#ז': `Forbid other meat salted with it — heart itself permitted because shia absorbs little, considered emission for itself; for other meat — actual blood (Torat Chatas; Hagahat Shaarei Dura forbids meat roasted with it — blood in eye). Maharshal misunderstood Hagahat Shaarei Dura — forbids only salting not roasting; Rav stringent peel in salting likewise roasting kezayit removal since we hold roasting kezayit removal, stringent with sixty (below siman 105 seif 5); veins siman 22 seif 1 Rav like Mechaber — if roasted whole cut around for removal; Rashba Torat Chatas 28b — same for heart.`,
    '2#ח': `Custom to be lenient — Maharshal like "some stringent"; main Rav as in my book; Bach so practice; nevertheless l'chatchila do not salt or roast heart with meat — need peel anyway.`,
    '2#ט': `Good to heed their words — then all poskim agree not require salting only peel, but we stringent with sixty (Torat Chatas); implies even if heart not stuck but salted with non-stuck meat need peel (Torat Chatas; Maharshal forbids all; Bach if heart in fowl in salting/roasting no peel unlike liver siman 73 — rejected: here some hold heart blood in eye, require peel; liver all blood permitted; Rav "where stuck" not precise; Bach roasting certainly wrong — even liver custom peel roasting if not stuck siman 73 s.k. 17).`,
    '2#י': `No difference meat with heart — refers back: in salting no difference — as heart itself "as it absorbs so it releases," so meat with it; unlike Bach who thought Rav seif 2 hagahah "even with sixty heart forbidden" applies to salting — here per Gemara.`,
    '2#כ': `No difference closed/open — even closed above, tear after salting/roasting helps; if open above must tear well — open above not called torn; if cooked so forbidden — Rav proved Torat Chatas law 3 clearly; all poskim did not divide — unlike Bach.`,
    '2#ל': `Only stringency — Rekaneti Parashat Lech Lecha: covenant resembles heart — cut sharp point of heart to remove impurity forces — "circumcise foreskin of your hearts."`,
    '3#א': `No fowl — not meaning: if fowl lacked sixty against heart, fowl forbidden even if pot nullifies heart — Rav wrote Mechaber below siman 92 we do not say ein hana'asur except basar b'chalav — speaks piecemeal: no fowl lacks sixty against its heart, no need combine other pot items when fowl whole — permitted even stuck, even stuck piece lacks sixty — by pot combination because ein hana'asur other prohibitions; piece not forbidden before, not faster to absorb — Mechaber, Rashba, Tur.`,
    '3#ב': `Sixty against its heart — against entire heart, not only cavity blood — proved in my books from many poskim; therefore whole unsalted heart or forbidden heart cooked with its fowl — permitted — fowl is sixty against entire heart. Maharshal: plucked goose skin lacks sixty against heart.`,
    '3#ג': `And there is not sixty against stuck heart — from Maharshal Or Zarua Shulchan book ch. 25 siman 49 explaining Mordechai, Semag below s.k. 19: if in gravy by cooking heart shrank in piece — absorbed prohibition, need sixty in piece itself; not forced; need not explain Mordechai/Semag so (my books).`,
    '3#ד': `Some say piece becomes nevelah — Mordechai, Darkei Moshe: every absorbed prohibition ein hana'asur siman 92; Tur Yesh Omrim: fear piece alone remained in gravy forbidden and forbids others — unclear why concern; Tur: blood in cooking rabbinic — safek derabbanan; unlike siman 106 fish d'oraisa; same meat-milk piece cooked — concern one piece alone with milk — like fish below; Baal HaDrishah forced distinctions. Maharil: whole chicken with heart salted cooked, filled with eggs — Maharil forbade all — no sixty in fowl except whole with legs head; eggs do not join — Acharonim do not hold Maharil require whole fowl except as below without head legs; Rashal ch. 25 siman 50: distinction if no sixty in fowl eggs do not help; eggs harden — filling like cooked; meat filling like meat with heart in pot; meat+eggs filling if meat unsalted helps nullify; if salted hardens like all eggs; Rama: if filled meat/eggs fear blood absorbed in filling — even sixty in pot filling forbidden rest permitted — unclear; forbidden filling needs sixty in fowl body against filling else entire pot forbidden until sixty all fowl. Maharil eggs do not help nullify — filling not nevelah if between skin and flesh; eggs inside cavity heart hidden in filling like stuck piece — Agudah: eggs filling like kavush forbidden even b'dieved; not like thin liquid nullifies; Rama siman 73: egg filling truly cooked, separate dish from fowl if heart not stuck; Or Zarua Agudah literal unlike forced Rashal; Rashal forced Maharil distinction skin vs cavity — language does not divide fillings; heart hidden — absorbed prohibition; main Rama: all egg filling considered real cooking, helps where other meat helps nullify if not stuck in fowl; if stuck need sixty in fowl then all permitted; stringent only egg filling inside cavity forbid them alone even with sixty, not fowl.`,
    '3#ה': `And you have no animal sixty against heart — Taz: some books conclude — mistake; by light estimate animal also has sixty and more.`,
    '4#_': `But they practice, etc. — nevertheless clear if cooked without tearing — permitted b'dieved.`,
  },
  'turei-zahav': {
    '1#_': `And some stringent to cook — lest cook without tearing; Darkei Moshe; heard many lenient, cook after salting; Rashal lenient — no such decree in Talmud or Geonim.`,
    '2#א': `Tear after salting — Hagahat Shaarei Dura Maharai: challenge — we do not say "as it absorbs so it releases" except emission blood not blood in eye; heart blood clear; resolve: heart blood tends to dry in cavity — what flowed is emission; therefore in salting also dries — slightly forced.`,
    '2#ב': `But if cooked without tearing — unlike Rambam who permitted via Gemara answer heart shia does not absorb.`,
    '2#ג': `Against heart — Torat Chatas general rule 57 unlike Shaarei Dura only heart blood; Rashal compromise: Tur unsalted heart — need sixty entire heart; Peri Chadash salted only enclosed blood — cannot know how much exited; Rashal primary explaining Tur; if goose plucked salted with heart cooked — not presumed sixty against heart blood — practice stringent like Rama sixty entire heart all cases; proof Maharil end this siman salted cooked still required sixty entire heart.`,
    '2#ד': `Heart itself forbidden — blood in heart dries inside — Hagahat Shaarei Dura.`,
    '2#ה': `Actual blood — why beginning "tear after salting permitted" — Darkei Moshe: shia helps heart itself as emission; for meat with it — blood in eye.`,
    '2#ו': `Custom lenient — in salting lenient meat salted with it and heart; no difference meat; only cooking we hold even with sixty heart forbidden; Rama afterward whole fowl permitted — not heart itself which remains forbidden in cooking; Maharshal challenged Rama contradictions — resolves: refers to pot contents and fowl, not heart.`,
    '2#ז': `Whether heart closed — unlike Or Zarua closed above forbidden even salting/roasting, open like torn; if cooked after — permitted; challenge where found "tear after salting" — if closed above already forbidden, if open no need tear; rather no difference: without real tear no permission where tear required; if placed on mouth blood can flow — called torn (Torat Chatas) — correct.`,
    '3#א': `Even without head legs — Responsum R' Yitzchak Mintz 66 lenient fowl without wings legs still whole fowl; proof Mordechai cut pieces heart stuck no sixty in piece — one piece with sixty against heart blood implies whole fowl much more; if fowl before us estimate visually; Rama only head legs need not examine even fowl before us; Baal HaDrishah lenient if another leniency side — estimate sixty whole piece absorbed prohibition; lenient without skin — rooster case, goose plucked same.`,
    '3#ב': `Some say piece nevelah — Mordechai, Darkei Moshe ein hana'asur siman 92; Tur Yesh Omrim piece alone in gravy forbidden forbids others — unclear; Tur: cooking blood rabbinic safek; unlike siman 106 fish d'oraisa; meat-milk piece — concern; Maharil whole chicken heart salted cooked eggs — forbade all; Acharonim not like Maharil require whole except without head legs; Rashal ch. 25 siman 50 distinctions eggs filling — main Rama egg filling like cooking; stringent cavity egg filling alone.`,
  },
};

function buildSiman(siman, manualExtra, p1) {
  const dir = path.join(ROOT, siman);
  const out = { ...p1 };
  for (const slug of fs.readdirSync(dir)) {
    const fp = path.join(dir, slug, 'part-001.txt');
    if (!fs.existsSync(fp)) continue;
    const blocks = parseFile(fp);
    if (!out[slug]) out[slug] = {};
    const manual = manualExtra[slug] || {};
    for (const { key, heb } of blocks) {
      if (out[slug][key]) continue;
      if (manual[key]) {
        out[slug][key] = manual[key];
      } else if (slug === 'beur-hagra') {
        out[slug][key] = graTranslate(heb);
      } else if (slug === 'beer-hagolah') {
        out[slug][key] = beerTranslate(heb);
      } else {
        out[slug][key] = `[Translation required] ${heb.slice(0, 120)}...`;
      }
    }
  }
  return out;
}

// This script is for inspection only - we write full manual files instead
console.log('Use dedicated translation mjs files');
