import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const o = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../_mechaber-overrides.json'), 'utf8'),
);
export default o['090'].mechaber;
