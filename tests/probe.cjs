// Usage: node tests/probe.cjs "e4 e5 Nc3 ..." [depth] [multipv]
const path = require('path');
const { Chess } = require('chess.js');
const sans = process.argv[2].trim().split(/\s+/).filter(Boolean);
const depth = Number(process.argv[3] || 20), mpv = Number(process.argv[4] || 3);
const g = new Chess(); sans.forEach(s => g.move(s));
const fen = g.fen(); const lines = {};
const sf = require(path.join(__dirname, '../node_modules/stockfish'))('lite-single', line => {
  const m = line.match(/ depth (\d+) .*multipv (\d+) score (cp|mate) (-?\d+).* pv (.+)$/);
  if (m && Number(m[1]) === depth) lines[m[2]] = { s: (m[3] === 'mate' ? '#' : '') + m[4], pv: m[5].split(' ') };
  if (line.startsWith('bestmove')) {
    console.log(sans.join(' '), '|', g.turn() === 'w' ? 'White' : 'Black', 'to move');
    Object.keys(lines).forEach(k => {
      const t = new Chess(fen); const out = [];
      for (const u of lines[k].pv.slice(0, 12)) { try { out.push(t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] }).san); } catch (e) { break; } }
      console.log(`  ${lines[k].s.padStart(6)}  ${out.join(' ')}`);
    });
    sf.terminate();
  }
});
sf.processCommand('uci'); sf.processCommand('setoption name MultiPV value ' + mpv);
sf.processCommand('position fen ' + fen); sf.processCommand('go depth ' + depth);
