#!/usr/bin/env node
/** Apply all siman 098 GROUP C editorial patches */
import { runPatches } from './_patch-siman-098-group-c-utils.mjs';
import { T as kereti } from './_tr-098-kereti.mjs';
import { T as peleti } from './_tr-098-peleti.mjs';
import { T as pitchei } from './_tr-098-pitchei-teshuva.mjs';
import { T as rae } from './_tr-098-rabbi-akiva-eiger-yd.mjs';
import { T as yadAvraham } from './_tr-098-yad-avraham.mjs';
import { T as kaf } from './_tr-098-kaf-hachayim.mjs';
import { T as nekudot } from './_tr-098-nekudot-hakesef.mjs';
import { T as mateh } from './_tr-098-mateh-yehonatan.mjs';
import { T as yadEphraim } from './_tr-098-yad-ephraim.mjs';

runPatches([
  ['siman_098/kereti/part-001.txt', 'kereti', kereti],
  ['siman_098/peleti/part-001.txt', 'peleti', peleti],
  ['siman_098/peleti/part-002.txt', 'peleti', peleti],
  ['siman_098/pitchei-teshuva/part-001.txt', 'pitchei-teshuva', pitchei],
  ['siman_098/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd', rae],
  ['siman_098/yad-avraham/part-001.txt', 'yad-avraham', yadAvraham],
  ['siman_098/kaf-hachayim/part-001.txt', 'kaf-hachayim', kaf],
  ['siman_098/nekudot-hakesef/part-001.txt', 'nekudot-hakesef', nekudot],
  ['siman_098/mateh-yehonatan/part-001.txt', 'mateh-yehonatan', mateh],
  ['siman_098/yad-ephraim/part-001.txt', 'yad-ephraim', yadEphraim],
], 'GROUP C');
