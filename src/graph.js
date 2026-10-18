(function (g) {
  var TIER_RANK = { core: 0, common: 1, advanced: 2 };
  var TIER_WEIGHT = { core: 6, common: 3, advanced: 1 };

  function posKey(courseId, fen) {
    return courseId + ' ' + fen.split(' ').slice(0, 4).join(' ');
  }

  function buildGraphs(Chess, courses, lines, annotations) {
    var diag = { lines: 0, linesOk: 0, edges: 0, illegalEdges: 0, unreachable: 0, errors: [], warnings: [], transpositions: 0, nodes: 0 };
    var graphs = {};
    courses.forEach(function (c) {
      var game = new Chess();
      var rootKey = posKey(c.id, game.fen());
      graphs[c.id] = { course: c, rootKey: rootKey, nodes: {}, lines: [], lessonCount: 0 };
      addNode(graphs[c.id], rootKey, game.fen(), 0);
    });

    function addNode(graph, key, fen, ply) {
      var n = graph.nodes[key];
      if (!n) {
        n = graph.nodes[key] = { key: key, fen: fen, turn: fen.split(' ')[1], ply: ply, edges: [], parents: [], leafOf: [], lineIds: [] };
      } else if (ply < n.ply) {
        n.ply = ply;
      }
      return n;
    }

    var seenIds = {};
    lines.forEach(function (line, lineIndex) {
      diag.lines++;
      if (seenIds[line.id]) diag.errors.push(line.id + ': duplicate line id (also used in ' + seenIds[line.id] + ')');
      seenIds[line.id] = line.course;
      var graph = graphs[line.course];
      if (!graph) { diag.errors.push(line.id + ': unknown course ' + line.course); return; }
      var game = new Chess();
      var sans = line.moves.trim().split(/\s+/);
      var node = graph.nodes[graph.rootKey];
      var path = [node.key];
      var ok = true;
      var history = [];
      for (var i = 0; i < sans.length; i++) {
        var mv;
        try { mv = game.move(sans[i]); } catch (e) { mv = null; }
        if (!mv) {
          ok = false;
          diag.illegalEdges++;
          diag.errors.push(line.id + ': illegal move "' + sans[i] + '" at ply ' + (i + 1) + ' (after ' + (history.join(' ') || 'start') + ')');
          break;
        }
        history.push(mv.san);
        var childKey = posKey(line.course, game.fen());
        var child = addNode(graph, childKey, game.fen(), i + 1);
        var edge = null;
        for (var k = 0; k < node.edges.length; k++) if (node.edges[k].san === mv.san) edge = node.edges[k];
        if (!edge) {
          edge = {
            san: mv.san, from: mv.from, to: mv.to, promotion: mv.promotion || null,
            uci: mv.from + mv.to + (mv.promotion || ''), color: mv.color,
            toKey: childKey, fromKey: node.key, lines: [], firstLine: lineIndex,
            tier: line.tier, isLearner: mv.color === graph.course.side, ann: null, paths: []
          };
          node.edges.push(edge);
          diag.edges++;
        } else if (edge.toKey !== childKey) {
          diag.errors.push(line.id + ': edge ' + mv.san + ' leads to two different positions');
        }
        if (edge.lines.indexOf(line.id) < 0) edge.lines.push(line.id);
        if (TIER_RANK[line.tier] < TIER_RANK[edge.tier]) edge.tier = line.tier;
        var pathStr = history.join(' ');
        if (edge.paths.indexOf(pathStr) < 0) edge.paths.push(pathStr);
        if (child.parents.indexOf(node.key) < 0) child.parents.push(node.key);
        if (child.lineIds.indexOf(line.id) < 0) child.lineIds.push(line.id);
        node = child;
        path.push(child.key);
      }
      if (ok) {
        diag.linesOk++;
        node.leafOf.push(line.id);
        graph.lines.push({ def: line, path: path, sans: history.slice(), leafKey: node.key, index: lineIndex });
        graph.lessonCount++;
      }
    });

    courses.forEach(function (c) {
      var graph = graphs[c.id];
      var ann = (annotations && annotations[c.id]) || {};
      var used = {};
      Object.keys(graph.nodes).forEach(function (key) {
        var n = graph.nodes[key];
        diag.nodes++;
        if (n.parents.length > 1) diag.transpositions++;
        n.edges.forEach(function (e) {
          e.weight = TIER_WEIGHT[e.tier];
          var probe = new Chess(n.fen);
          var legal = probe.moves({ verbose: true }).some(function (m) { return m.from === e.from && m.to === e.to && (m.promotion || null) === e.promotion; });
          if (!legal) { diag.illegalEdges++; diag.errors.push(c.id + ': edge ' + e.san + ' illegal from ' + n.fen); }
          var ownTurn = n.turn === e.color;
          if (!ownTurn) diag.errors.push(c.id + ': edge ' + e.san + ' played by the side not on move');
          for (var p = 0; p < e.paths.length; p++) {
            var a = ann[e.paths[p]];
            if (a) {
              if (e.ann && e.ann !== a) diag.warnings.push(c.id + ': two annotations for one edge (' + e.paths.join(' | ') + '); using the first');
              else e.ann = a;
              used[e.paths[p]] = true;
            }
          }
          if (e.ann && e.ann.weight) e.weight = e.ann.weight;
        });
        var learnerEdges = n.edges.filter(function (e) { return e.isLearner; });
        if (learnerEdges.length) {
          var forced = learnerEdges.filter(function (e) { return e.ann && e.ann.rec; });
          var pool = learnerEdges.filter(function (e) { return !(e.ann && e.ann.alt); });
          var rec = forced[0] || pool.sort(function (a, b) { return a.firstLine - b.firstLine; })[0] || learnerEdges[0];
          learnerEdges.forEach(function (e) { e.rec = e === rec; });
        }
        n.learnerToMove = n.turn === c.side;
      });
      Object.keys(ann).forEach(function (k) {
        if (k.charAt(0) !== '@' && !used[k]) diag.warnings.push(c.id + ': annotation path not in book: "' + k + '"');
      });
      var seen = {}; var stack = [graph.rootKey];
      while (stack.length) {
        var k2 = stack.pop();
        if (seen[k2]) continue;
        seen[k2] = true;
        graph.nodes[k2].edges.forEach(function (e) { stack.push(e.toKey); });
      }
      graph.lines.forEach(function (l) {
        if (!l.path.every(function (k) { return seen[k]; })) { diag.unreachable++; diag.errors.push(l.def.id + ': unreachable'); }
      });
    });

    return { graphs: graphs, diag: diag };
  }

  g.OL_GRAPH = { buildGraphs: buildGraphs, posKey: posKey, TIER_WEIGHT: TIER_WEIGHT };
})(typeof window !== 'undefined' ? window : globalThis);
