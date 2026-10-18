// Usage: node tests/probe_many.cjs depth "line1" "line2" ...  (top 3 moves, SAN PVs)
const path = require('path');
const { Chess } = require('chess.js');
const depth = Number(process.argv[2]);
const items = process.argv.slice(3);
const sf = require(path.join(__dirname, '../node_modules/stockfish'))('lite-single', l => listener(l));
let listener = () => {};
sf.processCommand('uci'); sf.processCommand('setoption name MultiPV value 3');
(async () => {
  for (const it of items) {
    const g = new Chess(); it.trim().split(/\s+/).filter(Boolean).forEach(s => g.move(s));
    const fen = g.fen(); const lines = {};
    await new Promise(res => {
      listener = line => {
        const m = line.match(/ depth (\d+) .*multipv (\d+) score (cp|mate) (-?\d+).* pv (.+)$/);
        if (m && +m[1] === depth) lines[m[2]] = [(m[3] === 'mate' ? '#' : '') + m[4], m[5].split(' ')];
        if (line.startsWith('bestmove')) res();
      };
      sf.processCommand('position fen ' + fen); sf.processCommand('go depth ' + depth);
    });
    console.log(it || '(start)', '|', g.turn());
    for (const k of Object.keys(lines)) { const t = new Chess(fen); const out = []; for (const u of lines[k][1].slice(0, 9)) { try { out.push(t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] }).san); } catch (e) { break; } } console.log('   ', lines[k][0].padStart(5), out.join(' ')); }
  }
  sf.terminate();
})();
