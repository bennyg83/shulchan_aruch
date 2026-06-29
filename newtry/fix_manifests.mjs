import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const corpusRoot = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

// Canonical order for commentators (mechaber always first)
const CANONICAL_ORDER = [
  'mechaber', 'siftei-kohen', 'turei-zahav', 'baer-heitev', 'beer-hagolah',
  'beur-hagra', 'pitchei-teshuva', 'nekudot-hakesef', 'kaf-hachayim',
  'kereti', 'peleti', 'yad-avraham', 'rabbi-akiva-eiger-yd', 'yad-ephraim',
  'mateh-yehonatan', 'tiferet-yisrael', 'torat-hashlamim', 'chiddushei-hilkhot-niddah',
];

const SLUG_META = {
  'mechaber':                 { title: 'Mechaber & Rama',           long: false, dataKey: 'mechaber' },
  'siftei-kohen':             { title: 'Siftei Kohen (Shach)',      long: false, dataKey: 'siftei_kohen' },
  'turei-zahav':              { title: 'Turei Zahav (Taz)',         long: false, dataKey: 'turei_zahav' },
  'baer-heitev':              { title: "Ba'er Hetev",               long: false, dataKey: 'baer_heitev' },
  'beer-hagolah':             { title: "Be'er HaGolah",            long: false, dataKey: 'beer_hagolah' },
  'beur-hagra':               { title: 'Biur HaGRA',               long: true,  dataKey: 'beur_hagra' },
  'pitchei-teshuva':          { title: 'Pitchei Teshuva',          long: false, dataKey: 'pitchei_teshuva' },
  'nekudot-hakesef':          { title: 'Nekudot HaKesef',          long: false, dataKey: 'nekudot_hakesef' },
  'kaf-hachayim':             { title: 'Kaf HaChayim (YD)',        long: false, dataKey: 'kaf_hachayim' },
  'kereti':                   { title: 'Kereti',                   long: false, dataKey: 'kereti' },
  'peleti':                   { title: 'Peleti',                   long: false, dataKey: 'peleti' },
  'yad-avraham':              { title: 'Yad Avraham',              long: false, dataKey: 'yad_avraham' },
  'rabbi-akiva-eiger-yd':     { title: 'Rabbi Akiva Eiger (YD)',   long: false, dataKey: 'rabbi_akiva_eiger_yd' },
  'yad-ephraim':              { title: 'Yad Ephraim',              long: false, dataKey: 'yad_ephraim' },
  'mateh-yehonatan':          { title: 'Mateh Yehonatan',          long: false, dataKey: 'mateh_yehonatan' },
  'tiferet-yisrael':          { title: 'Tiferet Yisrael',          long: false, dataKey: 'tiferet_yisrael' },
  'torat-hashlamim':          { title: 'Torat HaShlamim',          long: false, dataKey: 'torat_hashlamim' },
  'chiddushei-hilkhot-niddah':{ title: 'Chiddushei Hilkhot Niddah',long: false, dataKey: 'chiddushei_hilkhot_niddah' },
};

let fixed = 0, skipped = 0;

for (const dir of readdirSync(corpusRoot).filter(d => /^siman\d+$/.test(d))) {
  const siman = parseInt(dir.replace('siman', ''));
  const seifDir = join(corpusRoot, dir, 'seif-001');
  const mfPath = join(seifDir, 'translated-sources-manifest.json');
  if (!existsSync(mfPath)) continue;

  const manifest = JSON.parse(readFileSync(mfPath, 'utf8'));
  const currentSlugs = new Set((manifest.sources || []).map(s => s.slug));

  // Find all commentator folders that actually exist
  const existingFolders = new Set(
    readdirSync(seifDir).filter(f => {
      if (f === 'translated-sources-manifest.json') return false;
      return existsSync(join(seifDir, f, 'he.html')) || existsSync(join(seifDir, f, 'en.html'));
    })
  );

  // Check if any folders are missing from the manifest
  const missing = [...existingFolders].filter(slug => !currentSlugs.has(slug));
  if (missing.length === 0) { skipped++; continue; }

  // Rebuild sources in canonical order from all existing folders
  const allSlugs = [...existingFolders];
  const ordered = CANONICAL_ORDER.filter(s => allSlugs.includes(s));
  const remainder = allSlugs.filter(s => !CANONICAL_ORDER.includes(s)).sort();
  const finalSlugs = [...ordered, ...remainder];

  const sources = finalSlugs.map(slug => ({
    slug,
    title: SLUG_META[slug]?.title ?? slug,
    long: SLUG_META[slug]?.long ?? false,
    dataKey: SLUG_META[slug]?.dataKey ?? slug.replace(/-/g, '_'),
    includeInReader: true,
  }));

  const updated = { ...manifest, sources };
  writeFileSync(mfPath, JSON.stringify(updated, null, 2) + '\n', 'utf8');
  fixed++;
  console.log(`Fixed siman ${siman}: added ${missing.join(', ')}`);
}

console.log(`\nDone. Fixed: ${fixed}, Already complete: ${skipped}`);
