#!/usr/bin/env node
// Usage: node tests/validate.cjs [--engine] [--depth N]
const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');
const ROOT = path.join(__dirname, '..');
require(path.join(ROOT, 'src/lines.js'));
require(path.join(ROOT, 'src/graph.js'));
require(path.join(ROOT, 'src/selftest.js'));
for (const f of fs.readdirSync(path.join(ROOT, 'src/ann')).filter(f => f.endsWith('.js')).sort()) require(path.join(ROOT, 'src/ann', f));
const onlyCourse = process.env.COURSE || null;

const args = process.argv.slice(2);
const useEngine = args.includes('--engine');
const depth = Number((args[args.indexOf('--depth') + 1]) || 16) || 16;
const LEARNER_LIMIT = 150;
const OPP_LIMIT = 250;

let failures = 0;
function check(name, cond, detail) {
  if (cond) console.log('  ok   ' + name);
  else { failures++; console.log('  FAIL ' + name + (detail ? ' :: ' + detail : '')); }
}

globalThis.OL_ANN = globalThis.OL_ANN || {};
const { graphs, diag } = OL_GRAPH.buildGraphs(Chess, OL_COURSES, OL_LINES, globalThis.OL_ANN);
console.log(`\n${diag.linesOk}/${diag.lines} lines validated; ${diag.illegalEdges} illegal edges; ${diag.unreachable} unreachable lessons; ${diag.nodes} positions; ${diag.edges} edges; ${diag.transpositions} transpositions`);
diag.errors.forEach(e => console.log('  ERROR ' + e));
diag.warnings.forEach(w => console.log('  warn  ' + w));

function nodeAfter(course, sans) {
  const gph = graphs[course];
  const game = new Chess();
  let node = gph.nodes[gph.rootKey];
  for (const s of sans.split(' ')) {
    const e = node.edges.find(x => x.san === s);
    if (!e) return null;
    game.move(s);
    node = gph.nodes[e.toKey];
    if (node.fen.split(' ').slice(0, 4).join(' ') !== game.fen().split(' ').slice(0, 4).join(' ')) return 'MISMATCH';
  }
  return node;
}
const learnerReplies = n => n.edges.filter(e => e.isLearner).map(e => e.san);
const oppReplies = n => n.edges.filter(e => !e.isLearner).map(e => e.san);
const recOf = n => (n.edges.find(e => e.rec) || {}).san;

console.log('\nIn-app self-test (same code the page runs):');
OL_SELFTEST.run(Chess, graphs, diag).forEach(r => check(r.name, r.ok, r.detail));
console.log('\nSpec acceptance checks (data layer):');
check('1. every published line replays legally', diag.linesOk === diag.lines && diag.illegalEdges === 0);
check('2. every edge legal from its source', diag.errors.length === 0);
const caroRoot = graphs.caro.nodes[graphs.caro.rootKey];
check('4. Caro-Kann root: opponent (White) moves first, only 1.e4', caroRoot.turn === 'w' && oppReplies(caroRoot).join() === 'e4' && learnerReplies(caroRoot).length === 0);
check('4b. after 1.e4 the learner (Black) plays ...c6', recOf(nodeAfter('caro', 'e4')) === 'c6');
let n5 = nodeAfter('vienna', 'e4 e5 Nc3 Nf6 f4 exf4');
check('5. Vienna 3...exf4: recommended 4.e5', n5 && recOf(n5) === 'e5');
let n5b = nodeAfter('vienna', 'e4 e5 Nc3 Nf6 f4 exf4 e5');
check('5b. after 4.e5 opponent replies only from book (Ng8/Qe7/Nh5/Nd5)', n5b && oppReplies(n5b).every(s => ['Ng8', 'Qe7', 'Nh5', 'Nd5'].includes(s)), n5b && oppReplies(n5b).join(','));
check('6. Vienna 3...d5: recommended 4.fxe5', recOf(nodeAfter('vienna', 'e4 e5 Nc3 Nf6 f4 d5')) === 'fxe5');
let n7 = nodeAfter('vienna', 'e4 e5 Nc3 Nc6');
check('7. Vienna 2...Nc6: recommend 3.Bc4, not the gambit', recOf(n7) === 'Bc4');
check('7b. 2...Nc6 position has no knight on f6', new Chess(n7.fen).get('f6') === undefined || !new Chess(n7.fen).get('f6'));
const bb6 = nodeAfter('vienna', 'e4 e5 Nc3 Bc5 f4 d6 Nf3 Nc6 Bc4 Bb6');
const bb6Board = bb6 && new Chess(bb6.fen);
check('8. ...Bc5 then ...Bb6: bishop on b6, c5 empty, f8 empty', bb6Board && bb6Board.get('b6') && bb6Board.get('b6').type === 'b' && !bb6Board.get('c5') && !bb6Board.get('f8'));
const na5 = nodeAfter('italian', 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5');
const nxd5 = nodeAfter('italian', 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5');
check('9. Two Knights 5...Na5 and 5...Nxd5 are different positions', na5 && nxd5 && na5.key !== nxd5.key);
check('9b. Nxf7 recommended only after 5...Nxd5, never after 5...Na5', recOf(nxd5) === 'Nxf7' && learnerReplies(na5).indexOf('Nxf7') < 0);
const morphy = nodeAfter('ruy', 'e4 e5 Nf3 Nc6 Bb5 a6');
const berlin = nodeAfter('ruy', 'e4 e5 Nf3 Nc6 Bb5 Nf6');
check('10. Ruy: Morphy and Berlin are different nodes', morphy.key !== berlin.key);
check('10b. Morphy: 4.Ba4 recommended, 4.Bxc6 alternative', recOf(morphy) === 'Ba4' && learnerReplies(morphy).includes('Bxc6'));
function recPlan(course, sans, plies) {
  const gph = graphs[course];
  let n = nodeAfter(course, sans); const out = [];
  while (n && out.length < plies) {
    const e = n.edges.find(x => x.rec) || n.edges.filter(x => !x.isLearner).sort((a, b) => a.firstLine - b.firstLine)[0];
    if (!e) break;
    out.push(e.san); n = gph.nodes[e.toKey];
  }
  return out.join(' ');
}
const cRecs = ['e5', 'Nc3', 'exd5', 'f3'].map(m => recPlan('caro', 'e4 c6 d4 d5 ' + m, 3));
check('11. Caro 3.e5/3.Nc3/3.exd5/3.f3 lead to different Black plans', new Set(cRecs).size === 4, cRecs.join(' / '));
const t1 = nodeAfter('caro', 'e4 c6 d4 d5 Nc3 dxe4 Nxe4');
const t2 = nodeAfter('caro', 'e4 c6 d4 d5 Nd2 dxe4 Nxe4');
check('12. Caro 3.Nc3 and 3.Nd2 transpose to one node', t1 && t2 && t1.key === t2.key && t1.parents.length >= 2);
const v8 = nodeAfter('vienna', 'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6 f4 Nf6 Nf3');
const v9 = nodeAfter('vienna', 'e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Bc5 f4 d6 Nf3');
check('12b. Vienna V08/V09 transposition merges', v8 && v9 && v8.key === v9.key);
const mate = nodeAfter('italian', 'e4 e5 Nf3 Nc6 Bc4 d6 Nc3 Bg4 h3 Bh5 Nxe5 Bxd1 Bxf7+ Ke7 Nd5#');
check('15. Legal trap ends in checkmate with no further book moves', mate && new Chess(mate.fen).isCheckmate() && mate.edges.length === 0);
let sideOk = true;
Object.values(graphs).forEach(gph => Object.values(gph.nodes).forEach(n => n.edges.forEach(e => { if (e.isLearner !== (e.color === gph.course.side)) sideOk = false; })));
check('side assignment consistent (Caro learner never plays White)', sideOk);
let recMissing = [];
Object.values(graphs).forEach(gph => Object.values(gph.nodes).forEach(n => { if (n.edges.some(e => e.isLearner) && !n.edges.some(e => e.rec)) recMissing.push(n.fen); }));
check('every learner decision has exactly one recommended move', recMissing.length === 0, recMissing.slice(0, 3).join(' | '));

{
  let missing = [];
  Object.values(graphs).forEach(gph => Object.values(gph.nodes).forEach(n => n.edges.forEach(e => {
    if (onlyCourse && gph.course.id !== onlyCourse) return;
    const oppBranch = !e.isLearner && n.edges.filter(x => !x.isLearner).length > 1;
    if ((e.isLearner || oppBranch) && !e.ann) missing.push(gph.course.id + ': ' + (e.isLearner ? 'learner ' : 'opp-branch ') + e.paths[0]);
  })));
  console.log(`\nMoves needing annotation (learner moves + opponent branch moves): ${missing.length}`);
  missing.slice(0, 400).forEach(m => console.log('  - ' + m));
}

async function engineCheck() {
  const cacheFile = path.join(__dirname, 'engine-cache.json');
  const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
  let listener = null;
  const sf = require(path.join(ROOT, 'node_modules/stockfish'))('lite-single', line => listener && listener(line));
  sf.processCommand('uci');
  sf.processCommand('setoption name Hash value 64');
  function search(fen, uci) {
    const k = `${fen}|${uci || '*'}|${depth}`;
    if (cache[k] !== undefined) return Promise.resolve(cache[k]);
    return new Promise(res => {
      let last = null;
      listener = line => {
        const m = line.match(/ score (cp|mate) (-?\d+)/);
        if (m) last = m[1] === 'cp' ? Number(m[2]) : (Number(m[2]) > 0 ? 10000 - Number(m[2]) : -10000 - Number(m[2]));
        if (line.startsWith('bestmove')) {
          const best = line.split(' ')[1];
          cache[k] = { score: last, best };
          res(cache[k]);
        }
      };
      sf.processCommand('position fen ' + fen);
      sf.processCommand('go depth ' + depth + (uci ? ' searchmoves ' + uci : ''));
    });
  }
  console.log(`\nEngine check (Stockfish lite, depth ${depth}); learner loss > ${LEARNER_LIMIT}cp or opponent loss > ${OPP_LIMIT}cp flagged:`);
  let flagged = 0;
  const leafEvals = [];
  for (const gph of Object.values(graphs)) {
    for (const n of Object.values(gph.nodes)) {
      if (n.edges.length === 0) continue;
      const best = await search(n.fen);
      for (const e of n.edges) {
        const mv = e.uci === best.best ? best : await search(n.fen, e.uci);
        const loss = best.score - mv.score;
        const limit = e.isLearner ? LEARNER_LIMIT : OPP_LIMIT;
        const trapLine = e.lines.some(id => OL_LINES.find(l => l.id === id).trap);
        if (loss > limit) {
          flagged++;
          console.log(`  ${e.isLearner ? 'LEARNER' : 'opp    '} ${gph.course.id} ${e.paths[0]}  loss=${loss}cp (best ${best.best} ${best.score}, played ${mv.score})${trapLine ? '  [trap line]' : ''}${e.ann && e.ann.dubious ? ' [annotated dubious]' : ''}`);
          if (e.isLearner) failures++;
        }
      }
    }
    for (const l of gph.lines) {
      const leaf = gph.nodes[l.leafKey];
      if (new Chess(leaf.fen).isGameOver()) continue;
      const r = await search(leaf.fen);
      const fromLearner = (leaf.turn === gph.course.side ? 1 : -1) * r.score;
      leafEvals.push([l.def.id, fromLearner]);
    }
  }
  fs.writeFileSync(cacheFile, JSON.stringify(cache));
  console.log('\nLeaf evaluations from the learner\'s side (cp):');
  leafEvals.forEach(([id, v]) => console.log(`  ${id.padEnd(5)} ${String(v).padStart(6)}${v < -100 ? '   <-- learner worse' : ''}`));
  console.log(`\n${flagged} edges flagged by engine`);
  sf.terminate();
}

(async () => {
  if (useEngine) await engineCheck();
  console.log(failures ? `\n${failures} FAILURES` : '\nALL CHECKS PASSED');
  process.exit(failures ? 1 : 0);
})();
