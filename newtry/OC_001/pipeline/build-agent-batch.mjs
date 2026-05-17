#!/usr/bin/env node
/**
 * build-agent-batch.mjs — Turn pipeline/work/queue.json into one Cursor-ready markdown batch.
 */
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT     = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    queuePath: path.join(__dirname, 'work', 'queue.json'),
    outPath:   path.join(__dirname, 'work', 'batch-latest.md'),
    stylePath: path.join(OC_ROOT, 'translation', 'STYLE.md'),
    glossPath: path.join(OC_ROOT, 'translation', 'GLOSSARY.json'),
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--queue':   opts.queuePath = path.resolve(args[++i]); break;
      case '--out':     opts.outPath = path.resolve(args[++i]); break;
      case '--style':   opts.stylePath = path.resolve(args[++i]); break;
      case '--glossary': opts.glossPath = path.resolve(args[++i]); break;
    }
  }
  return opts;
}

function safeRead(p, fallback) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return fallback;
  }
}

function main() {
  const opts = parseArgs();
  if (!fs.existsSync(opts.queuePath)) {
    console.error(`Missing queue file. Run: node pipeline/queue-next.mjs\n  ${opts.queuePath}`);
    process.exit(1);
  }

  const queue = JSON.parse(fs.readFileSync(opts.queuePath, 'utf8'));
  const items = queue.items || [];
  const style = safeRead(opts.stylePath, '(Add translation/STYLE.md for house rules.)\n');
  let glossaryNote = '';
  try {
    const g = JSON.parse(safeRead(opts.glossPath, '{}'));
    const keys = Object.keys(g);
    glossaryNote = keys.length
      ? `## Glossary hints (${keys.length} entries)\n\n` + keys.slice(0, 80).map(k => `- **${k}** → ${g[k]}`).join('\n')
      : '(Empty translation/GLOSSARY.json — add Hebrew term → English gloss rows as JSON.)';
  } catch {
    glossaryNote = '(Could not parse GLOSSARY.json as JSON.)';
  }

  const lines = [
    '# OC001 translation batch',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Output root: \`${queue.outRoot}\``,
    `Blocks in this batch: **${items.length}**`,
    '',
    '---',
    '',
    '## Instructions for the model',
    '',
    '- Edit **only** the text under `**** ENGLISH ****` in each block below. Leave Hebrew, markers, and `**** END BLOCK ****` unchanged.',
    '- Replace the placeholder line that begins with `English translation pending` with accurate English.',
    '- Preserve HTML tags (`<i>`, `<b>`, `<small>`, `<br>`) in English where they mirror the Hebrew structure.',
    '- After editing, run: `npm run pipeline:validate -- --root output` on changed paths, then `npm run apply:dictionary` (see PIPELINE_OC001.md).',
    '',
    '---',
    '',
    '## House style',
    '',
    style,
    '',
    '---',
    '',
    glossaryNote,
    '',
    '---',
    '',
    '## Blocks to translate',
    '',
  ];

  let n = 1;
  for (const it of items) {
    lines.push(`### ${n++}. \`${it.file}\` — siman ${it.siman} — ${it.slug} — seif ${it.seif} — marker \`${it.marker}\``);
    lines.push('');
    lines.push(`Stable id (for checkpoint): \`${it.id}\``);
    lines.push('');
    lines.push('```text');
    lines.push((it.rawBlock || '(rawBlock missing — re-run queue-next)').trimEnd());
    lines.push('```');
    lines.push('');
  }

  lines.push('---', '', '## Checkpoint ids (one per line; save as `ids-done.txt` then `npm run pipeline:mark-done -- --file ids-done.txt`)', '');
  for (const it of items) lines.push(it.id);

  fs.mkdirSync(path.dirname(opts.outPath), { recursive: true });
  fs.writeFileSync(opts.outPath, lines.join('\n'), 'utf8');
  console.log(`Wrote agent batch → ${opts.outPath}`);
}

main();
