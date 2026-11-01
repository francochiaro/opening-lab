import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { fileURLToPath } from 'url';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const r = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const DIST = path.join(ROOT, 'dist');
fs.mkdirSync(path.join(DIST, 'engine'), { recursive: true });

const chessCjs = r('node_modules/chess.js/dist/cjs/chess.js').replace(/\/\/# sourceMappingURL=.*$/m, '');
const chessWrapped = `(function(){var exports={};var module={exports:exports};\n${chessCjs}\nwindow.ChessLib=module.exports&&module.exports.Chess?module.exports:exports;})();`;

const pieces = {};
for (const f of fs.readdirSync(path.join(ROOT, 'vendor/pieces'))) {
  const svg = fs.readFileSync(path.join(ROOT, 'vendor/pieces', f));
  pieces[f.replace('.svg', '')] = 'data:image/svg+xml;base64,' + svg.toString('base64');
}
const annFiles = fs.readdirSync(path.join(ROOT, 'src/ann')).filter(f => f.endsWith('.js')).sort().map(f => r('src/ann/' + f));

const scripts = [
  chessWrapped,
  'window.OL_PIECES=' + JSON.stringify(pieces) + ';',
  r('src/lines.js'),
  ...annFiles,
  r('src/graph.js'),
  r('src/selftest.js'),
  r('src/app.js')
].join('\n;\n');

let html = r('src/app.html')
  .replace('/*CSS*/', () => r('src/app.css'))
  .replace('/*FAVICON*/', () => pieces.wN)
  .replace('/*SCRIPTS*/', () => scripts.replace(/<\/script/gi, '<\\/script'));

const bad = [];
for (let i = 0; i < html.length; i++) if (html.charCodeAt(i) > 127) { bad.push(i); if (bad.length > 5) break; }
if (bad.length) {
  bad.forEach(i => console.error('non-ASCII at', i, JSON.stringify(html.slice(Math.max(0, i - 40), i + 10))));
  throw new Error('Output must be pure ASCII');
}
fs.writeFileSync(path.join(DIST, 'index.html'), html, { encoding: 'ascii' });

for (const f of ['stockfish-19-lite-single.js', 'stockfish-19-lite-single.wasm']) fs.copyFileSync(path.join(ROOT, 'node_modules/stockfish/bin', f), path.join(DIST, 'engine', f));
fs.copyFileSync(path.join(ROOT, 'node_modules/stockfish/Copying.txt'), path.join(DIST, 'engine', 'COPYING.txt'));

const { createRequire } = await import('module');
const { Chess } = createRequire(import.meta.url)('chess.js');
const ascii = s => s.replace(/\u00f8/g, 'o').replace(/\u00d8/g, 'O').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2013\u2014]/g, '-');
const openings = {};
for (const f of ['a', 'b', 'c', 'd', 'e']) {
  const rows = r('vendor/chess-openings/' + f + '.tsv').split('\n').slice(1).filter(Boolean);
  for (const row of rows) {
    const [eco, name, pgn] = row.split('\t');
    const g = new Chess();
    for (const tok of pgn.split(/\s+/)) if (tok && !/^\d+\.$/.test(tok)) g.move(tok);
    const key = g.fen().split(' ').slice(0, 4).join(' ');
    const clean = ascii(name);
    if (/[^\x20-\x7e]/.test(clean)) throw new Error('Non-ASCII opening name: ' + name);
    if (!openings[key] || pgn.length < openings[key][2]) openings[key] = [eco, clean, pgn.length];
  }
}
for (const k in openings) openings[k].length = 2;
fs.writeFileSync(path.join(DIST, 'openings.json'), JSON.stringify(openings), { encoding: 'ascii' });

const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0, 12);
for (const f of ['index.html', 'openings.json', 'engine/stockfish-19-lite-single.js', 'engine/stockfish-19-lite-single.wasm']) {
  const p = path.join(DIST, f);
  console.log(f.padEnd(40), String(fs.statSync(p).size).padStart(9), sha(p));
}
