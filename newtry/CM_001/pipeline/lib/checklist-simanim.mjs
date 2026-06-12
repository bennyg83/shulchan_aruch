import fs from 'fs';

/**
 * Simanim with pending blocks (from sa-checklist checklist.json).
 * Sorted by pending count descending.
 */
export function loadPendingSimanim(checklistPath) {
  if (!fs.existsSync(checklistPath)) return [];
  const data = JSON.parse(fs.readFileSync(checklistPath, 'utf8'));
  const list = [];
  for (const sec of data.sections || []) {
    if (sec.siman > 0 && sec.pending > 0)
      list.push({
        section: sec.section,
        siman:   sec.siman,
        pending: sec.pending,
        total:   sec.total,
        done:    sec.translated,
      });
  }
  list.sort((a, b) => b.pending - a.pending);
  return list;
}
