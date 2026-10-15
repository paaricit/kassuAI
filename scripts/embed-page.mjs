import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const html = readFileSync(join(root, 'src', 'pages', 'index.html'), 'utf8');
const target = join(root, 'src', 'pages', 'landing-page.ts');
mkdirSync(dirname(target), { recursive: true });
writeFileSync(
  target,
  `// Generated from src/pages/index.html by scripts/embed-page.mjs\nexport const landingPage = ${JSON.stringify(html)};\n`,
);
