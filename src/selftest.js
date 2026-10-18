(function (g) {
  function run(Chess, graphs, diag) {
    var out = [];
    function check(name, cond, detail) { out.push({ name: name, ok: !!cond, detail: cond ? '' : (detail || '') }); }
    function nodeAfter(course, sans) {
      var gph = graphs[course];
      var game = new Chess();
      var node = gph.nodes[gph.rootKey];
      var list = sans.split(' ');
      for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var e = null;
        for (var k = 0; k < node.edges.length; k++) if (node.edges[k].san === s) e = node.edges[k];
        if (!e) return null;
        game.move(s);
        node = gph.nodes[e.toKey];
        if (node.fen.split(' ').slice(0, 4).join(' ') !== game.fen().split(' ').slice(0, 4).join(' ')) return null;
      }
      return node;
    }
    function sansOf(n, learner) { return n ? n.edges.filter(function (e) { return e.isLearner === learner; }).map(function (e) { return e.san; }) : []; }
    function recOf(n) { if (!n) return null; for (var i = 0; i < n.edges.length; i++) if (n.edges[i].rec) return n.edges[i].san; return null; }
    function recPlan(course, sans, plies) {
      var gph = graphs[course];
      var n = nodeAfter(course, sans); var res = [];
      while (n && res.length < plies) {
        var e = null;
        for (var i = 0; i < n.edges.length; i++) if (n.edges[i].rec) e = n.edges[i];
        if (!e) e = n.edges.filter(function (x) { return !x.isLearner; }).sort(function (a, b) { return a.firstLine - b.firstLine; })[0];
        if (!e) break;
        res.push(e.san); n = gph.nodes[e.toKey];
      }
      return res.join(' ');
    }

    check('All published lines replay legally from move one (' + diag.linesOk + '/' + diag.lines + ')', diag.linesOk === diag.lines && diag.illegalEdges === 0, diag.errors.join('; '));
    var illegal = 0;
    Object.keys(graphs).forEach(function (cid) {
      var gph = graphs[cid];
      Object.keys(gph.nodes).forEach(function (k) {
        var n = gph.nodes[k];
        var legal = new Chess(n.fen).moves({ verbose: true });
        n.edges.forEach(function (e) {
          var ok = legal.some(function (m) { return m.from === e.from && m.to === e.to && (m.promotion || null) === e.promotion; });
          var child = gph.nodes[e.toKey];
          var t = new Chess(n.fen);
          t.move({ from: e.from, to: e.to, promotion: e.promotion || undefined });
          if (!ok || !child || OL_GRAPH.posKey(cid, t.fen()) !== e.toKey) illegal++;
        });
      });
    });
    check('Every graph edge is legal from its source position and lands on its child', illegal === 0, illegal + ' bad edges');
    var caroRoot = graphs.caro.nodes[graphs.caro.rootKey];
    check('Caro-Kann starts with White (book) playing 1.e4, then the learner plays ...c6', caroRoot.turn === 'w' && sansOf(caroRoot, false).join() === 'e4' && sansOf(caroRoot, true).length === 0 && recOf(nodeAfter('caro', 'e4')) === 'c6');
    var n5 = nodeAfter('vienna', 'e4 e5 Nc3 Nf6 f4 exf4 e5');
    check('Vienna 3...exf4: 4.e5 is accepted and the reply comes only from that branch', recOf(nodeAfter('vienna', 'e4 e5 Nc3 Nf6 f4 exf4')) === 'e5' && n5 && sansOf(n5, false).every(function (s) { return ['Ng8', 'Qe7', 'Nh5', 'Nd5'].indexOf(s) >= 0; }));
    var n6 = nodeAfter('vienna', 'e4 e5 Nc3 Nf6 f4 d5 fxe5');
    check('Vienna 3...d5: 4.fxe5 is accepted and continues consistently', recOf(nodeAfter('vienna', 'e4 e5 Nc3 Nf6 f4 d5')) === 'fxe5' && n6 && sansOf(n6, false).indexOf('Nxe4') >= 0);
    var n7 = nodeAfter('vienna', 'e4 e5 Nc3 Nc6');
    check('Vienna 2...Nc6 does not assume ...Nf6 or replay the gambit', n7 && recOf(n7) === 'Bc4' && !new Chess(n7.fen).get('f6'));
    var bb6 = nodeAfter('vienna', 'e4 e5 Nc3 Bc5 f4 d6 Nf3 Nc6 Bc4 Bb6');
    var bb = bb6 && new Chess(bb6.fen);
    check('Vienna ...Bc5 then ...Bb6: the bishop sits on b6 at move 5, c5 is empty', bb && bb.get('b6') && bb.get('b6').type === 'b' && !bb.get('c5'));
    var na5 = nodeAfter('italian', 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5');
    var nxd5 = nodeAfter('italian', 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5');
    check('Italian 5...Na5 and 5...Nxd5 are separate positions; Nxf7 only after ...Nxd5', na5 && nxd5 && na5.key !== nxd5.key && recOf(nxd5) === 'Nxf7' && sansOf(na5, true).indexOf('Nxf7') < 0);
    var morphy = nodeAfter('ruy', 'e4 e5 Nf3 Nc6 Bb5 a6');
    var berlin = nodeAfter('ruy', 'e4 e5 Nf3 Nc6 Bb5 Nf6');
    check('Ruy Lopez: 3...a6 and 3...Nf6 differ; 4.Ba4 recommended, 4.Bxc6 optional', morphy && berlin && morphy.key !== berlin.key && recOf(morphy) === 'Ba4' && sansOf(morphy, true).indexOf('Bxc6') >= 0);
    var plans = ['e5', 'Nc3', 'exd5', 'f3'].map(function (m) { return recPlan('caro', 'e4 c6 d4 d5 ' + m, 3); });
    var uniq = plans.filter(function (p, i) { return plans.indexOf(p) === i; });
    check('Caro-Kann 3.e5 / 3.Nc3 / 3.exd5 / 3.f3 lead to different Black plans', uniq.length === 4, plans.join(' | '));
    var t1 = nodeAfter('caro', 'e4 c6 d4 d5 Nc3 dxe4 Nxe4');
    var t2 = nodeAfter('caro', 'e4 c6 d4 d5 Nd2 dxe4 Nxe4');
    check('Transposition: Caro 3.Nc3 and 3.Nd2 meet in one consistent position', t1 && t2 && t1.key === t2.key);
    var mate = nodeAfter('italian', 'e4 e5 Nf3 Nc6 Bc4 d6 Nc3 Bg4 h3 Bh5 Nxe5 Bxd1 Bxf7+ Ke7 Nd5#');
    var overAfterEnd = 0;
    Object.keys(graphs).forEach(function (cid) {
      Object.keys(graphs[cid].nodes).forEach(function (k) {
        var n = graphs[cid].nodes[k];
        if (new Chess(n.fen).isGameOver() && n.edges.length) overAfterEnd++;
      });
    });
    check('No book move after checkmate or game end', mate && new Chess(mate.fen).isCheckmate() && mate.edges.length === 0 && overAfterEnd === 0);
    if (graphs.slav) {
      var slavRoot = graphs.slav.nodes[graphs.slav.rootKey];
      check('Slav: the book (White) moves first, with 1.d4, 1.c4 or 1.Nf3 only', slavRoot.turn === 'w' && sansOf(slavRoot, true).length === 0 && sansOf(slavRoot, false).every(function (s) { return ['d4', 'c4', 'Nf3'].indexOf(s) >= 0; }));
      check('Slav: 1.d4 d5 2.c4 is met by ...c6, the London 2.Bf4 by ...Nf6 then ...c5', recOf(nodeAfter('slav', 'd4 d5 c4')) === 'c6' && recOf(nodeAfter('slav', 'd4 d5 Bf4')) === 'Nf6' && recOf(nodeAfter('slav', 'd4 d5 Bf4 Nf6 e3')) === 'c5');
      check('Slav: against the Jobava (Nc3 + Bf4) Black covers b5 with ...c6', recOf(nodeAfter('slav', 'd4 d5 Nc3 Nf6 Bf4')) === 'c6');
      var s07 = nodeAfter('slav', 'd4 d5 c4 c6 Nc3 Nf6 Nf3'), s01 = nodeAfter('slav', 'd4 d5 c4 c6 Nf3 Nf6 Nc3');
      var s13 = nodeAfter('slav', 'c4 c6 d4 d5'), s0 = nodeAfter('slav', 'd4 d5 c4 c6');
      check('Slav transpositions (3.Nc3 order, 1.c4 c6 2.d4) land on the main Slav positions', s07 && s01 && s07.key === s01.key && s13 && s0 && s13.key === s0.key);
    }
    if (graphs.e4others) {
      var eRoot = graphs.e4others.nodes[graphs.e4others.rootKey];
      var afterE5 = nodeAfter('e4others', 'e4 e5 Nf3');
      check('1.e4 Others: the learner opens 1.e4; Alapin 2.c3 vs the Sicilian, 3.e5 vs the French', recOf(eRoot) === 'e4' && recOf(nodeAfter('e4others', 'e4 c5')) === 'c3' && recOf(nodeAfter('e4others', 'e4 e6 d4 d5')) === 'e5');
      check('1.e4 Others: after 1...e5 2.Nf3 the main move 2...Nc6 is left to the Italian/Ruy courses', afterE5 && sansOf(afterE5, false).indexOf('Nc6') < 0 && sansOf(afterE5, false).length >= 2);
      var a05 = nodeAfter('e4others', 'e4 c5 c3 e6 d4 d5 e5'), a06 = nodeAfter('e4others', 'e4 e6 d4 d5 e5 c5 c3');
      check('Alapin 2...e6 transposes into the French Advance', a05 && a06 && a05.key === a06.key);
      var cAdv = 'e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 O-O Nc6 c3';
      check('Caro-Kann Advance as White matches the Caro-Kann course as Black, move for move', !!nodeAfter('e4others', cAdv) && !!nodeAfter('caro', cAdv));
    }
    if (graphs.rare) {
      var rRoot = graphs.rare.nodes[graphs.rare.rootKey];
      var mains = ['e4', 'd4', 'c4', 'Nf3'];
      check('Unusual first moves: White opens with something other than 1.e4, 1.d4, 1.c4 or 1.Nf3', rRoot.turn === 'w' && sansOf(rRoot, false).length >= 8 && sansOf(rRoot, false).every(function (s) { return mains.indexOf(s) < 0; }));
      check('Unusual first moves: ...d5 is the rule, with ...e5 against 1.b4', ['g3', 'b3', 'f4', 'Nc3', 'e3', 'd3', 'a3', 'h3', 'c3', 'g4'].every(function (m) { return recOf(nodeAfter('rare', m)) === 'd5'; }) && recOf(nodeAfter('rare', 'b4')) === 'e5');
      var allFirst = {};
      ['caro', 'slav', 'rare'].forEach(function (cid) { sansOf(graphs[cid].nodes[graphs[cid].rootKey], false).forEach(function (s) { allFirst[s] = true; }); });
      check('Black repertoire answers 14 different White first moves across Caro-Kann, Slav and Unusual', Object.keys(allFirst).length >= 14, Object.keys(allFirst).join(' '));
    }
    if (graphs.slav) check('Slav: against the Blackmar-Diemer 2.e4, ...c6 reaches the Caro-Kann position', recOf(nodeAfter('slav', 'd4 d5 e4')) === 'c6' && nodeAfter('slav', 'd4 d5 e4 c6').fen.split(' ').slice(0, 4).join(' ') === nodeAfter('caro', 'e4 c6 d4 d5').fen.split(' ').slice(0, 4).join(' '));
    var sideBad = 0, recBad = 0;
    Object.keys(graphs).forEach(function (cid) {
      var gph = graphs[cid];
      Object.keys(gph.nodes).forEach(function (k) {
        var n = gph.nodes[k];
        var recs = 0, learner = 0;
        n.edges.forEach(function (e) { if (e.isLearner !== (e.color === gph.course.side)) sideBad++; if (e.isLearner) learner++; if (e.rec) recs++; });
        if (learner && recs !== 1) recBad++;
      });
    });
    check('Side assignment: the learner only ever plays their own colour', sideBad === 0);
    check('Every learner decision has exactly one recommended move', recBad === 0, recBad + ' nodes');
    return out;
  }
  g.OL_SELFTEST = { run: run };
})(typeof window !== 'undefined' ? window : globalThis);
