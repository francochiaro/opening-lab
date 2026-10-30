(function () {
  'use strict';

  var Chess = window.ChessLib.Chess;
  var COURSES = window.OL_COURSES;
  var LINES = window.OL_LINES;
  var ANN = window.OL_ANN || {};
  var PIECES = window.OL_PIECES;
  var built = OL_GRAPH.buildGraphs(Chess, COURSES, LINES, ANN);
  var GRAPHS = built.graphs;
  var DIAG = built.diag;
  var SELFTEST = OL_SELFTEST.run(Chess, GRAPHS, DIAG);
  var START_FEN = new Chess().fen();
  var TIER_RANK = { core: 0, common: 1, advanced: 2 };
  var TIER_LABEL = { core: 'Core', common: 'Common practical reply', advanced: 'Advanced' };
  var PIECE_NAME = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' };
  var PIECE_VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------ utils
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function courseById(id) { for (var i = 0; i < COURSES.length; i++) if (COURSES[i].id === id) return COURSES[i]; return null; }
  function lineById(id) { for (var i = 0; i < LINES.length; i++) if (LINES[i].id === id) return LINES[i]; return null; }
  function gLine(cid, id) { var ls = GRAPHS[cid].lines; for (var i = 0; i < ls.length; i++) if (ls[i].def.id === id) return ls[i]; return null; }
  function annFor(cid) { return ANN[cid] || {}; }
  function moveLabel(ply, san) {
    var n = Math.floor(ply / 2) + 1;
    return ply % 2 === 0 ? n + '.' + san : n + '...' + san;
  }
  function weighted(list, w) {
    var total = 0, i;
    for (i = 0; i < list.length; i++) total += Math.max(0.0001, w(list[i]));
    var r = Math.random() * total;
    for (i = 0; i < list.length; i++) { r -= Math.max(0.0001, w(list[i])); if (r <= 0) return list[i]; }
    return list[list.length - 1];
  }
  function fen4(fen) { return fen.split(' ').slice(0, 4).join(' '); }

  var ICON = {
    book: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M5 4h6a3 3 0 0 1 1 .2V20a3 3 0 0 0-1-.2H5zM19 4h-6a3 3 0 0 0-1 .2V20a3 3 0 0 1 1-.2h6z"/></svg>',
    best: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
    excellent: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M2 10h4v11H2zM8 21h9.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 19 10h-5.2l.8-4a2.2 2.2 0 0 0-4-1.5L8 9.5z"/></svg>',
    good: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>',
    inaccuracy: '<svg viewBox="0 0 24 24"><text x="12" y="17.5" text-anchor="middle" font-size="15" font-weight="900" fill="#fff" font-family="Arial">?!</text></svg>',
    mistake: '<svg viewBox="0 0 24 24"><text x="12" y="18" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" font-family="Arial">?</text></svg>',
    blunder: '<svg viewBox="0 0 24 24"><text x="12" y="17.5" text-anchor="middle" font-size="15" font-weight="900" fill="#fff" font-family="Arial">??</text></svg>',
    flip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v14M3 14l4 4 4-4M17 20V6M13 10l4-4 4 4"/></svg>',
    first: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h2.5v14H5zM19 5v14l-10-7z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 5v14l-10-7z"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5v14l10-7z"/></svg>',
    last: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 5H19v14h-2.5zM5 5v14l10-7z"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
    restart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    hint: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>',
    plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19L19 4M19 4h-7M19 4v7"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    learn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6.5L12 3l10 3.5L12 10z"/><path d="M6 8.5V14c2 2 10 2 12 0V8.5"/></svg>',
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/><path d="M8 12h4M12 5.5V18.5M12 5.5h4M12 18.5h4"/></svg>',
    practice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    coords: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 17h2M7 7v4"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>'
  };
  var CLS = {
    book: { label: 'Book', color: 'var(--book)' },
    best: { label: 'Best', color: 'var(--best)' },
    excellent: { label: 'Excellent', color: 'var(--excellent)' },
    good: { label: 'Good', color: 'var(--good)' },
    inaccuracy: { label: 'Inaccuracy', color: 'var(--inacc)' },
    mistake: { label: 'Mistake', color: 'var(--mistake)' },
    blunder: { label: 'Blunder', color: 'var(--blunder)' }
  };
  var CLS_ORDER = ['book', 'best', 'excellent', 'good', 'inaccuracy', 'mistake', 'blunder'];
  function clsIcon(c, cls) { return '<span class="' + (cls || 'cls') + '" style="background:' + CLS[c].color + '" title="' + CLS[c].label + '">' + ICON[c] + '</span>'; }

  // ---------------------------------------------------------------- storage
  var STORE_KEY = 'openingLab.v1';
  var storageOk = true;
  function freshStore() {
    return { v: 1, settings: { theme: 'dark', coords: true, sound: true, engine: true, arrow: true, style: 'surprise', pmode: 'recall', plen: 10, pstart: 'start', tfilter: 'common', tdepth: 99, course: null, lshow: true }, courses: {} };
  }
  function loadStore() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return freshStore();
      var s = JSON.parse(raw);
      var f = freshStore();
      for (var k in f.settings) if (!(k in s.settings)) s.settings[k] = f.settings[k];
      s.courses = s.courses || {};
      return s;
    } catch (e) { storageOk = false; return freshStore(); }
  }
  var store = loadStore();
  function save() {
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
    catch (e) { if (storageOk) { storageOk = false; toast('Progress cannot be saved in this browser (storage is blocked or full). Everything else still works.'); } }
  }
  function cprog(cid) {
    if (!store.courses[cid]) store.courses[cid] = { nodes: {}, lines: {}, mistakes: [], last: null, learned: {} };
    if (!store.courses[cid].learned) store.courses[cid].learned = {};
    return store.courses[cid];
  }
  function markLearned(key) {
    var p = cprog(S.cid);
    if (p.learned[key]) return;
    p.learned[key] = Date.now();
    save();
  }
  function isNewPosition(key) {
    var p = cprog(S.cid);
    return !p.nodes[key] && !p.learned[key];
  }
  function showMyMove() { return store.settings.lshow && !P.active && APP.tab !== 'practice'; }
  function decisionKeys(cid) {
    var gph = GRAPHS[cid], out = [];
    Object.keys(gph.nodes).forEach(function (k) { if (gph.nodes[k].edges.some(function (e) { return e.isLearner; })) out.push(k); });
    return out;
  }
  function courseProgress(cid) {
    var p = cprog(cid), keys = decisionKeys(cid), seen = 0, mastered = 0, att = 0, ok1 = 0;
    keys.forEach(function (k) { var st = p.nodes[k]; if (st) { seen++; att += st.a; ok1 += st.f; if (st.m) mastered++; } else if (p.learned[k]) seen++; });
    var linesDone = Object.keys(p.lines).length;
    return { total: keys.length, seen: seen, mastered: mastered, firstTry: att ? Math.round(100 * ok1 / att) : null, linesDone: linesDone, lines: GRAPHS[cid].lines.length, last: p.last };
  }

  // ------------------------------------------------------------------ sound
  var audio = null;
  function sound(kind) {
    if (!store.settings.sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var t = audio.currentTime;
      var tones = kind === 'capture' ? [[520, 0], [330, 0.05]] : kind === 'check' ? [[700, 0], [880, 0.07]] : kind === 'done' ? [[523, 0], [659, 0.09], [784, 0.18]] : kind === 'wrong' ? [[220, 0], [180, 0.08]] : [[420, 0]];
      tones.forEach(function (tn) {
        var o = audio.createOscillator(), gn = audio.createGain();
        o.type = 'triangle'; o.frequency.value = tn[0];
        gn.gain.setValueAtTime(0.0001, t + tn[1]);
        gn.gain.exponentialRampToValueAtTime(0.18, t + tn[1] + 0.008);
        gn.gain.exponentialRampToValueAtTime(0.0001, t + tn[1] + 0.12);
        o.connect(gn); gn.connect(audio.destination);
        o.start(t + tn[1]); o.stop(t + tn[1] + 0.14);
      });
    } catch (e) { /* audio unavailable */ }
  }

  // ----------------------------------------------------------------- engine
  var Engine = {
    w: null, state: 'off', busy: false, job: null, next: null, cache: {}, tmp: [], stopping: false,
    MAIN_DEPTH: 18, BG_DEPTH: 12,
    init: function () {
      if (this.state !== 'off') return;
      var self = this;
      try { this.w = new Worker('engine/stockfish-19-lite-single.js'); }
      catch (e) { this.state = 'error'; return; }
      this.state = 'loading';
      this.w.onmessage = function (ev) { self.onLine(String(ev.data)); };
      this.w.onerror = function () { self.state = 'error'; self.busy = false; scheduleLive(); };
      this.w.postMessage('uci');
    },
    onLine: function (line) {
      if (line === 'uciok') { this.w.postMessage('setoption name Hash value 32'); this.w.postMessage('isready'); return; }
      if (line === 'readyok') { if (this.state === 'loading') { this.state = 'ready'; this.pump(); } return; }
      var job = this.job;
      if (!job) return;
      if (line.indexOf('info ') === 0 && line.indexOf(' pv ') > 0) {
        var m = line.match(/ depth (\d+) .*? multipv (\d+) score (cp|mate) (-?\d+)( lowerbound| upperbound)?.*? pv (.+)$/);
        if (!m || m[5]) return;
        var d = +m[1], k = +m[2], sign = job.turn === 'w' ? 1 : -1, val = +m[4] * sign;
        this.tmp[k - 1] = { depth: d, cp: m[3] === 'cp' ? val : null, mate: m[3] === 'mate' ? val : null, pv: m[6].split(' ') };
        if (k === job.multipv) this.commit(job, d);
      } else if (line.indexOf('bestmove') === 0) {
        var best = line.split(' ')[1];
        var c = this.cache[job.key];
        if (c && best && best !== '(none)') c.best = best;
        if (c) c.final = c.depth >= job.depth;
        this.busy = false; this.job = null; this.stopping = false;
        scheduleLive();
        this.pump();
      }
    },
    commit: function (job, d) {
      var lines = this.tmp.slice(0, job.multipv).filter(Boolean);
      if (!lines.length || lines[0].depth !== d) return;
      var prev = this.cache[job.key];
      if (prev && (prev.depth > d || (prev.depth === d && prev.pvs.length >= lines.length))) return;
      this.cache[job.key] = { depth: d, pvs: lines.map(function (l) { return { cp: l.cp, mate: l.mate, pv: l.pv }; }), best: lines[0].pv[0], cp: lines[0].cp, mate: lines[0].mate, final: false, fen: job.fen };
      if (job.main) scheduleLive();
    },
    get: function (fen) {
      var k = fen4(fen);
      var g = new Chess(fen);
      if (g.isCheckmate()) return { depth: 99, cp: g.turn() === 'w' ? -100000 : 100000, mate: 0, pvs: [], over: g.turn() === 'w' ? '0-1' : '1-0' };
      if (g.isDraw() || g.isStalemate()) return { depth: 99, cp: 0, mate: null, pvs: [], over: '1/2-1/2' };
      return this.cache[k] || null;
    },
    want: function (fen) {
      if (this.state === 'off') this.init();
      if (this.state === 'error') return;
      var g = new Chess(fen);
      if (g.isGameOver()) return;
      var k = fen4(fen), c = this.cache[k];
      if (c && c.depth >= this.MAIN_DEPTH && c.pvs.length >= 3) { return; }
      if (this.job && this.job.key === k && this.job.main) return;
      this.next = { fen: fen, key: k, turn: g.turn(), depth: this.MAIN_DEPTH, multipv: 3, main: true };
      if (this.busy) { if (!this.stopping) { this.stopping = true; this.w.postMessage('stop'); } }
      else this.pump();
    },
    pump: function () {
      if (this.busy || this.state !== 'ready') return;
      var job = this.next || this.background();
      this.next = null;
      if (!job) return;
      this.job = job; this.busy = true; this.tmp = [];
      this.w.postMessage('setoption name MultiPV value ' + job.multipv);
      this.w.postMessage('position fen ' + job.fen);
      this.w.postMessage('go depth ' + job.depth);
    },
    background: function () {
      if (!S || !store.settings.engine) return null;
      for (var i = S.moves.length; i >= 0; i--) {
        var fen = posFen(i), k = fen4(fen), c = this.cache[k];
        if (c && c.depth >= this.BG_DEPTH) continue;
        var g = new Chess(fen);
        if (g.isGameOver()) continue;
        return { fen: fen, key: k, turn: g.turn(), depth: this.BG_DEPTH, multipv: 1, main: false };
      }
      return null;
    }
  };
  function evalNum(ev) {
    if (!ev) return null;
    if (ev.mate === 0) return ev.cp;
    if (ev.mate != null) return ev.mate > 0 ? 10000 - ev.mate * 10 : -10000 - ev.mate * 10;
    return ev.cp;
  }
  function winPct(cpWhite) { var c = clamp(cpWhite, -1000, 1000); return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * c)) - 1); }
  function evalText(ev) {
    if (!ev) return '';
    if (ev.over) return ev.over;
    if (ev.mate != null) return (ev.mate > 0 ? '' : '-') + 'M' + Math.abs(ev.mate);
    var v = ev.cp / 100;
    return (v > 0 ? '+' : '') + v.toFixed(1);
  }
  function engineHidden() {
    if (!store.settings.engine) return true;
    if (P.active && !P.done && P.awaiting && !P.answered && P.mode !== 'guided' && !P.intro) return true;
    return false;
  }

  // ----------------------------------------------------------- app state
  var APP = { view: 'home', cid: null, tab: 'learn', open: {} };
  var S = null;
  var P = { active: false };
  var liveTimer = null;

  function newSession(cid) {
    return { cid: cid, moves: [], view: 0, mode: 'book', forced: null, forcedNoted: false, lastLine: null, token: 0, timer: null, paused: false, thinking: false, feedback: null, completed: null, sel: null, userArrows: [], marks: [], showHint: false, showPlan: false, userFlip: false, anim: null, kbd: null, note: null };
  }
  function course() { return courseById(S.cid); }
  function graph() { return GRAPHS[S.cid]; }
  function posFen(i) { return i === 0 ? START_FEN : S.moves[i - 1].fen; }
  function keyAt(i) { return i === 0 ? graph().rootKey : S.moves[i - 1].key; }
  function nodeAt(i) { var k = keyAt(i); return k ? graph().nodes[k] : null; }
  function curNode() { return nodeAt(S.moves.length); }
  function isLive() { return S.view === S.moves.length; }
  function turnAt(i) { return posFen(i).split(' ')[1]; }
  function learnerTurnAt(i) { return turnAt(i) === course().side; }
  function lastBookIndex() { for (var i = S.moves.length; i >= 0; i--) if (keyAt(i)) return i; return 0; }

  function cancelPending() {
    S.token++;
    if (S.timer) { clearTimeout(S.timer); S.timer = null; }
    S.thinking = false;
  }

  function lineContext() {
    var gph = graph();
    var i = S.view;
    while (i > 0 && !keyAt(i)) i--;
    var key = keyAt(i);
    var cands = gph.lines.filter(function (l) { return l.path.indexOf(key) >= 0; });
    if (!cands.length) return null;
    var forced = S.forced || (P.active && P.line);
    for (var j = 0; j < cands.length; j++) if (cands[j].def.id === forced) return cands[j];
    var exact = cands.filter(function (l) {
      for (var t = 0; t <= i; t++) if (l.path[t] !== keyAt(t)) return false;
      return true;
    });
    var pool = exact.length ? exact : cands;
    var fams = {};
    pool.forEach(function (l) { fams[l.def.name.split(':')[0]] = true; });
    var famList = Object.keys(fams);
    return { def: pool[0].def, path: pool[0].path, ambiguous: pool.length > 1, count: pool.length, family: famList.length === 1 ? famList[0] : null };
  }

  // ------------------------------------------------------------ game flow
  function pushMove(mv, edge) {
    var fen = mv.after;
    var k = OL_GRAPH.posKey(S.cid, fen);
    var key = graph().nodes[k] ? k : null;
    S.moves.push({ san: mv.san, from: mv.from, to: mv.to, promotion: mv.promotion || null, color: mv.color, flags: mv.flags, captured: mv.captured || null, fen: fen, key: key, edge: edge || null });
    S.view = S.moves.length;
    S.anim = { ply: S.moves.length, from: mv.from, to: mv.to, flags: mv.flags, color: mv.color };
    S.sel = null; S.showHint = false; S.showPlan = false;
    var g = new Chess(fen);
    sound(g.inCheck() ? 'check' : mv.captured ? 'capture' : 'move');
  }

  function findEdge(node, from, to, promo) {
    if (!node) return null;
    for (var i = 0; i < node.edges.length; i++) {
      var e = node.edges[i];
      if (e.from === from && e.to === to && (e.promotion || null) === (promo || null)) return e;
    }
    return null;
  }

  function truncateTo(i) {
    cancelPending();
    S.moves = S.moves.slice(0, i);
    S.view = i;
    S.completed = null;
    S.feedback = null;
    if (S.mode !== 'free') S.mode = keyAt(i) ? 'book' : 'free';
  }

  function onUserMove(from, to, promo) {
    if (!isLive()) truncateTo(S.view);
    if (S.mode === 'done') { S.mode = curNode() && curNode().edges.length ? 'book' : 'free'; S.completed = null; }
    if (S.mode === 'oob') S.mode = 'free';
    var len = S.moves.length;
    var g = new Chess(posFen(len));
    var nodeBefore = curNode();
    var edge = findEdge(nodeBefore, from, to, promo);
    if (S.mode === 'book' && g.turn() !== course().side) return false;
    if (P.active && !P.done && S.mode === 'book' && P.awaiting && !P.answered) {
      if (!practiceAnswer(nodeBefore, edge, from, to, promo, g)) return false;
    }
    var mv;
    try { mv = g.move(promo ? { from: from, to: to, promotion: promo } : { from: from, to: to }); } catch (e) { mv = null; }
    if (!mv) return false;
    cancelPending();
    S.paused = !!(P.active && P.answered);
    S.note = null;
    if (edge && S.mode === 'book' && !P.active) markLearned(nodeBefore.key);
    pushMove(mv, edge);
    if (S.mode === 'book') {
      if (edge) S.feedback = { type: edge.rec ? 'rec' : 'alt', edge: edge, node: nodeBefore };
      else if (S.moves[S.moves.length - 1].key) S.feedback = { type: 'transpose', node: nodeBefore };
      else { S.mode = 'oob'; S.feedback = { type: 'oob', san: mv.san, node: nodeBefore, ply: len }; }
    } else S.feedback = null;
    announce('You played ' + mv.san + '.');
    render();
    continueFlow();
    return true;
  }

  function opponentMoveNow() {
    var n = curNode();
    var e = chooseOpponentEdge(n);
    S.thinking = false;
    if (!e) { S.note = 'The book has no supported reply here.'; render(); return; }
    var g = new Chess(posFen(S.moves.length));
    var mv;
    try { mv = g.move(e.promotion ? { from: e.from, to: e.to, promotion: e.promotion } : { from: e.from, to: e.to }); } catch (err) { mv = null; }
    if (!mv) { S.note = 'Book reply could not be played in this exact position.'; render(); return; }
    pushMove(mv, e);
    S.lastOpp = e;
    announce('Opponent played ' + mv.san + '.');
    render();
    continueFlow();
  }

  function scheduleOpponent(delay) {
    if (S.timer) return;
    var tok = S.token, ply = S.moves.length, sess = S;
    S.thinking = true;
    S.timer = setTimeout(function () {
      if (sess !== S) return;
      S.timer = null;
      if (tok !== S.token || ply !== S.moves.length || !isLive() || S.mode !== 'book' || S.paused) { S.thinking = false; render(); return; }
      opponentMoveNow();
    }, delay == null ? (reducedMotion ? 150 : 520) : delay);
  }

  function chooseOpponentEdge(n) {
    if (!n) return null;
    var g = new Chess(n.fen);
    if (g.isGameOver()) return null;
    var legal = g.moves({ verbose: true });
    var cands = n.edges.filter(function (e) {
      return !e.isLearner && e.color === g.turn() && legal.some(function (m) { return m.from === e.from && m.to === e.to && (m.promotion || null) === e.promotion; });
    });
    if (!cands.length) return null;
    var forced = S.forced || (P.active && P.line);
    if (forced) {
      var L = gLine(S.cid, forced);
      var idx = L ? L.path.indexOf(n.key) : -1;
      if (idx >= 0 && idx < L.path.length - 1) {
        var nextKey = L.path[idx + 1];
        for (var i = 0; i < cands.length; i++) if (cands[i].toKey === nextKey) return cands[i];
      }
      if (!S.forcedNoted && S.forced) { S.forcedNoted = true; toast('Your moves left the selected line, so the opponent now picks from the book at this position.'); }
    }
    if (P.active) {
      return weighted(cands, function (e) { return e.weight * (1 + 2 * subtreeWeakness(e.toKey)); });
    }
    return weighted(cands, function (e) { return e.weight; });
  }

  function continueFlow() {
    if (!S || !isLive()) return;
    var len = S.moves.length;
    var g = new Chess(posFen(len));
    if (S.mode !== 'book') { render(); return; }
    var n = curNode();
    if (!n) { S.mode = 'oob'; render(); return; }
    if (n.edges.length === 0 || g.isGameOver()) { completeLine(n, g); return; }
    if (!learnerTurnAt(len)) {
      if (!S.paused && !(P.active && P.answered)) scheduleOpponent(P.active && P.prelude ? 120 : null);
    } else if (!n.edges.some(function (e) { return e.isLearner; })) {
      completeLine(n, g);
      return;
    } else if (P.active && !P.done) {
      practiceDecisionStart(n);
    }
    render();
  }

  function completeLine(n, g) {
    cancelPending();
    S.mode = 'done';
    var ids = n.leafOf.length ? n.leafOf : n.lineIds;
    var ctx = lineContext();
    var id = (ctx && ids.indexOf(ctx.def.id) >= 0) ? ctx.def.id : ids[0];
    S.completed = { id: id, mate: g && g.isCheckmate() };
    S.lastLine = id;
    var p = cprog(S.cid);
    p.lines[id] = (p.lines[id] || 0) + 1;
    p.last = Date.now();
    save();
    sound('done');
    confetti();
    if (P.active && !P.done) {
      P.linesPlayed = (P.linesPlayed || 0) + 1;
      render();
      if (P.answered) return;
      var sess = S, tok = S.token;
      setTimeout(function () {
        if (sess !== S || tok !== S.token || !P.active || P.done) return;
        practiceAfterLine();
      }, P.lineIntros ? 2600 : 1500);
      return;
    }
    render();
  }

  function undo() {
    if (!S.moves.length) return;
    cancelPending();
    if (!isLive()) S.view = S.moves.length;
    if (S.mode === 'free' || S.mode === 'oob') {
      S.moves.pop();
      if (S.mode === 'oob' || keyAt(S.moves.length)) S.mode = keyAt(S.moves.length) ? 'book' : 'free';
    } else {
      do { S.moves.pop(); } while (S.moves.length && !learnerTurnAt(S.moves.length));
      S.mode = 'book';
    }
    S.view = S.moves.length;
    S.completed = null; S.feedback = null; S.paused = false; S.sel = null; S.note = null;
    if (P.active && !P.done) { P.answered = null; P.awaiting = false; }
    render();
    continueFlow();
  }

  function restart(opts) {
    cancelPending();
    S.moves = []; S.view = 0; S.mode = 'book'; S.completed = null; S.feedback = null; S.paused = false; S.sel = null; S.note = null; S.forcedNoted = false; S.userArrows = []; S.marks = [];
    if (opts && opts.key) {
      var identLen = course().identity.split(' ').length;
      var keyLine = (S.forced && gLine(S.cid, S.forced)) || weighted(graph().lines, function (l) { return { core: 6, common: 3, advanced: 1 }[l.def.tier]; });
      keyLine.sans.slice(0, identLen).forEach(function (san) {
        var g = new Chess(posFen(S.moves.length));
        var mv = g.move(san);
        var e = findEdge(curNode(), mv.from, mv.to, mv.promotion);
        pushMove(mv, e);
      });
      S.anim = null;
    }
    render();
    continueFlow();
  }

  function newVariation() {
    S.forced = null;
    store.settings.style = 'surprise'; save();
    restart();
  }

  function replayLine(id) {
    S.forced = id;
    restart();
  }

  function loadPath(sans, opts) {
    cancelPending();
    S.moves = []; S.view = 0; S.mode = 'book'; S.completed = null; S.feedback = null; S.sel = null; S.note = null;
    var list = sans ? sans.split(' ') : [];
    for (var i = 0; i < list.length; i++) {
      var g = new Chess(posFen(S.moves.length));
      var mv = g.move(list[i]);
      pushMove(mv, findEdge(curNode(), mv.from, mv.to, mv.promotion));
    }
    S.anim = null;
    S.paused = !(opts && opts.run);
    var n = curNode();
    if (n && n.edges.length === 0) S.paused = true;
    if (!learnerTurnAt(S.moves.length) && S.paused && n && n.edges.length) S.note = 'Position loaded. The opponent is to move.';
    else if (S.paused && n && n.edges.length === 0) S.note = 'Position loaded: this is the end of a course line.';
    render();
    if (!S.paused) continueFlow();
  }

  function exploreFreely() {
    cancelPending();
    S.mode = 'free'; S.completed = null; S.feedback = null; S.paused = false;
    render();
  }

  function backToLesson() {
    truncateTo(lastBookIndex());
    S.mode = 'book';
    S.paused = false;
    render();
    continueFlow();
  }

  // --------------------------------------------------------------- practice
  function subtreeWeakness(key) {
    var p = cprog(S.cid), gph = graph(), seen = {}, stack = [key], score = 0, count = 0, steps = 0;
    while (stack.length && steps < 400) {
      var k = stack.pop(); steps++;
      if (seen[k]) continue; seen[k] = true;
      var n = gph.nodes[k];
      if (!n) continue;
      if (n.edges.some(function (e) { return e.isLearner; })) {
        var st = p.nodes[k];
        count++;
        score += !st ? 1 : st.m ? 0.05 : clamp((st.a - st.f) / st.a + 0.3, 0, 1);
      }
      n.edges.forEach(function (e) { stack.push(e.toKey); });
    }
    return count ? score / count : 0;
  }

  function lineWeight(l) {
    var p = cprog(S.cid), gph = graph(), w = 0, c = 0;
    var start = course().identity.split(' ').length;
    for (var i = start; i < l.path.length; i++) {
      var n = gph.nodes[l.path[i]];
      if (!n.edges.some(function (e) { return e.isLearner; })) continue;
      var st = p.nodes[n.key];
      w += !st ? 3 : st.m ? 0.2 : 1 + 3 * (st.a - st.f) / st.a;
      c++;
    }
    var tierF = { core: 1, common: 0.8, advanced: 0.45 }[l.def.tier];
    return c ? (w / Math.sqrt(c)) * tierF : 0.1;
  }

  function practicePickLine(exclude) {
    var ls = graph().lines;
    if (P.scope && P.scope !== 'all') return P.scope;
    ls = ls.filter(function (l) { return !l.def.optional; });
    var pool = ls.filter(function (l) { return l.def.id !== exclude; });
    if (!pool.length) pool = ls;
    return weighted(pool, lineWeight).def.id;
  }

  function startPractice() {
    P = { active: true, mode: store.settings.pmode, len: store.settings.plen, scope: P.scopePick || 'all', scopePick: P.scopePick, results: [], line: null, awaiting: false, answered: null, tries: 0, done: false, streak: 0, best: 0, mistakes: [], okKeys: {}, introCount: 0, lineIntros: 0, recallPass: false };
    S.forced = null;
    practiceNextLine(false);
  }

  function practiceAfterLine() {
    if (P.lineIntros) { P.recallPass = true; practiceStartLine(); }
    else { P.recallPass = false; practiceNextLine(true); }
  }

  function practiceNextLine(different) {
    P.line = practicePickLine(different ? P.line : null);
    practiceStartLine();
  }

  function practiceStartLine() {
    cancelPending();
    S.moves = []; S.view = 0; S.mode = 'book'; S.completed = null; S.feedback = null; S.paused = false; S.sel = null; S.note = null;
    P.awaiting = false; P.answered = null; P.tries = 0; P.lineIntros = 0;
    var ident = course().identity.split(' ');
    var L = gLine(S.cid, P.line);
    var pre = store.settings.pstart === 'key' ? Math.min(ident.length, L.sans.length) : 0;
    if (store.settings.pstart === 'known') {
      for (pre = 0; pre < L.sans.length; pre++) {
        var nd = graph().nodes[L.path[pre]];
        if (nd.turn === course().side && !practiceKnown(nd.key)) break;
      }
      if (pre >= L.sans.length) pre = 0;
    }
    P.skipped = pre;
    for (var i = 0; i < pre; i++) {
      var g = new Chess(posFen(S.moves.length));
      var mv = g.move(L.sans[i]);
      pushMove(mv, findEdge(curNode(), mv.from, mv.to, mv.promotion));
    }
    S.anim = null;
    render();
    continueFlow();
  }

  function practiceKnown(key) {
    var st = cprog(S.cid).nodes[key];
    return !!(P.okKeys[key] || (st && st.m));
  }

  function practiceDecisionStart(n) {
    if (P.awaiting && P.key === n.key) return;
    P.awaiting = true; P.answered = null; P.tries = 0; P.key = n.key;
    P.intro = isNewPosition(n.key);
    P.revealed = P.mode === 'guided' || P.intro;
    P.warmup = S.moves.length < course().identity.split(' ').length;
    P.lastWrong = null;
    P.prevOpp = S.moves.length ? S.moves[S.moves.length - 1].edge : null;
  }

  function recordDecision(key, firstTry, correct) {
    var p = cprog(S.cid);
    var st = p.nodes[key] || (p.nodes[key] = { a: 0, f: 0, s: 0, m: false, t: 0 });
    st.a++;
    if (firstTry && correct) { st.f++; st.s++; } else st.s = 0;
    st.m = st.s >= 3;
    st.t = Date.now();
    p.last = Date.now();
    save();
  }

  function practiceAnswer(node, edge, from, to, promo, g) {
    P.tries++;
    var first = P.tries === 1;
    var path = S.moves.map(function (m) { return m.san; }).join(' ');
    if (P.warmup) {
      if (edge) { if (P.intro) markLearned(node.key); P.okKeys[node.key] = true; P.awaiting = false; P.lastWrong = null; return true; }
      var t2 = new Chess(g.fen()), w = null;
      try { w = t2.move(promo ? { from: from, to: to, promotion: promo } : { from: from, to: to }); } catch (err) { w = null; }
      if (!w) return false;
      sound('wrong');
      P.lastWrong = w.san;
      if (P.mode === 'challenge' || P.tries >= 2) P.revealed = true;
      render();
      return false;
    }
    if (edge && P.intro) {
      markLearned(node.key);
      P.introCount++; P.lineIntros++;
      P.awaiting = false; P.lastWrong = null;
      return true;
    }
    if (edge) {
      var credit = edge.rec ? 1 : 0.75;
      if (first) {
        P.okKeys[node.key] = true;
        recordDecision(node.key, true, true);
        P.results.push({ key: node.key, credit: credit, first: true, san: edge.san, path: path });
        P.streak++; P.best = Math.max(P.best, P.streak);
      } else {
        P.results.push({ key: node.key, credit: 0, first: false, san: edge.san, path: path });
      }
      P.answered = { edge: edge, credit: first ? credit : 0, first: first };
      S.paused = true;
      return true;
    }
    var test = new Chess(g.fen());
    var mv = null;
    try { mv = test.move(promo ? { from: from, to: to, promotion: promo } : { from: from, to: to }); } catch (e) { mv = null; }
    if (!mv) return false;
    sound('wrong');
    var rec = node.edges.filter(function (e) { return e.rec; })[0];
    if (first && !P.intro) {
      recordDecision(node.key, true, false);
      P.streak = 0;
      var p = cprog(S.cid);
      p.mistakes.unshift({ key: node.key, path: path, played: mv.san, expected: rec ? rec.san : '', t: Date.now() });
      p.mistakes = p.mistakes.slice(0, 12);
      P.mistakes.push({ path: path, played: mv.san, expected: rec ? rec.san : '' });
      save();
    }
    P.lastWrong = mv.san;
    if (P.mode === 'challenge' || P.tries >= 2) P.revealed = true;
    S.marks = [to];
    var sess = S;
    setTimeout(function () { if (sess === S) { S.marks = []; drawBoard(); } }, 650);
    render();
    return false;
  }

  function practiceContinue() {
    if (!P.answered) return;
    P.answered = null; P.awaiting = false; P.lastWrong = null;
    if (P.results.length >= P.len) { P.done = true; S.paused = true; render(); confetti(); sound('done'); return; }
    if (S.mode === 'done') { practiceAfterLine(); return; }
    S.paused = false;
    render();
    continueFlow();
  }

  function stopPractice() {
    P = { active: false, scopePick: P.scopePick };
    cancelPending();
    S.paused = false;
    render();
  }

  // ----------------------------------------------------------------- board
  var B = { el: null, sqs: {}, pieces: null, svg: null, drag: null, rdown: null, size: 0 };
  function flipped() { return (course().side === 'b') !== !!S.userFlip; }
  function sqXY(sq) { var f = sq.charCodeAt(0) - 97, r = +sq[1] - 1; return flipped() ? { x: 7 - f, y: r } : { x: f, y: 7 - r }; }
  function xyToSq(x, y) { var f = flipped() ? 7 - x : x, r = flipped() ? y : 7 - y; return 'abcdefgh'[f] + (r + 1); }
  function pointToSq(clientX, clientY) {
    var r = B.el.getBoundingClientRect();
    var x = Math.floor((clientX - r.left) / (r.width / 8)), y = Math.floor((clientY - r.top) / (r.height / 8));
    if (x < 0 || y < 0 || x > 7 || y > 7) return null;
    return xyToSq(x, y);
  }

  function initBoard() {
    B.el = $('board');
    if (!B.el) return;
    var html = '<div class="squares" id="squares">';
    for (var i = 0; i < 64; i++) html += '<div class="sq" role="gridcell"></div>';
    html += '</div><div class="pieces" id="pieces"></div><svg class="arrows" id="arrows" viewBox="0 0 8 8" aria-hidden="true"></svg><div id="badge"></div><div id="promo"></div>';
    B.el.innerHTML = html;
    B.pieces = $('pieces'); B.svg = $('arrows');
    B.cells = B.el.querySelectorAll('.sq');
    B.el.addEventListener('pointerdown', onPointerDown);
    B.el.addEventListener('pointermove', onPointerMove);
    B.el.addEventListener('pointerup', onPointerUp);
    B.el.addEventListener('pointercancel', function () { B.drag = null; B.rdown = null; drawBoard(); });
    B.el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    B.el.addEventListener('keydown', onBoardKey);
    if (window.ResizeObserver) {
      new ResizeObserver(function () { sizeBoard(); }).observe(B.el);
    }
    sizeBoard();
  }
  function sizeBoard() {
    if (!B.el) return;
    var w = B.el.getBoundingClientRect().width;
    B.size = w;
    B.el.style.setProperty('--sqpx', (w / 8) + 'px');
    var eb = $('evalbar');
    if (eb) eb.style.height = w + 'px';
  }

  function canMoveFrom(sq) {
    if (!isLive() && S.mode === 'done') return false;
    var g = new Chess(posFen(S.view));
    var p = g.get(sq);
    if (!p) return false;
    if (S.mode === 'free' || S.mode === 'oob' || S.mode === 'done') return p.color === g.turn();
    if (P.active && (P.answered || P.done)) return false;
    return p.color === course().side && g.turn() === course().side && !S.thinking;
  }
  function targetsFrom(sq) {
    var g = new Chess(posFen(S.view));
    return g.moves({ square: sq, verbose: true });
  }

  function tryMove(from, to) {
    var ms = targetsFrom(from).filter(function (m) { return m.to === to; });
    if (!ms.length) return false;
    if (ms.length > 1 && ms[0].promotion) { showPromo(from, to); return true; }
    var ok = onUserMove(from, to, ms[0].promotion || null);
    if (!ok) drawBoard();
    return ok;
  }

  function showPromo(from, to) {
    var color = new Chess(posFen(S.view)).turn();
    var box = $('promo');
    box.innerHTML = '<div class="promo"><div class="promo-box" role="dialog" aria-label="Choose promotion piece">' + ['q', 'r', 'b', 'n'].map(function (p) {
      return '<button data-promo="' + p + '" aria-label="Promote to ' + PIECE_NAME[p] + '" style="background-image:url(' + PIECES[color + p.toUpperCase()] + ')"></button>';
    }).join('') + '</div></div>';
    box.onclick = function (e) {
      var b = e.target.closest('[data-promo]');
      box.innerHTML = '';
      box.onclick = null;
      if (b) onUserMove(from, to, b.getAttribute('data-promo'));
      else drawBoard();
    };
  }

  function onPointerDown(e) {
    if (!S) return;
    var sq = pointToSq(e.clientX, e.clientY);
    if (!sq) return;
    if (e.button === 2) { B.rdown = sq; return; }
    if (e.button !== 0) return;
    if (S.userArrows.length || S.marks.length) { S.userArrows = []; S.marks = []; }
    S.kbd = null;
    if (S.sel && S.sel !== sq) {
      var t = targetsFrom(S.sel).some(function (m) { return m.to === sq; });
      if (t) { var from = S.sel; S.sel = null; tryMove(from, sq); return; }
    }
    if (canMoveFrom(sq)) {
      var was = S.sel === sq;
      S.sel = sq;
      drawBoard();
      var el = B.pieces.querySelector('[data-sq="' + sq + '"]');
      B.drag = { sq: sq, x: e.clientX, y: e.clientY, el: el, moved: false, was: was, id: e.pointerId };
      try { B.el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      e.preventDefault();
    } else {
      S.sel = null;
      drawBoard();
    }
  }
  function onPointerMove(e) {
    var d = B.drag;
    if (!d || !d.el) return;
    if (!d.moved && Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) < 5) return;
    d.moved = true;
    var r = B.el.getBoundingClientRect(), s = r.width / 8;
    d.el.classList.add('dragging');
    d.el.style.transform = 'translate(' + (e.clientX - r.left - s / 2) + 'px,' + (e.clientY - r.top - s / 2) + 'px) scale(1.08)';
    var over = pointToSq(e.clientX, e.clientY);
    if (over !== d.over) {
      if (d.overEl) d.overEl.classList.remove('hover-target');
      d.over = over;
      d.overEl = over ? B.sqs[over] : null;
      if (d.overEl) d.overEl.classList.add('hover-target');
    }
  }
  function onPointerUp(e) {
    var sq = pointToSq(e.clientX, e.clientY);
    if (B.rdown) {
      var from = B.rdown; B.rdown = null;
      if (e.button === 2 && sq) {
        if (sq === from) {
          var i = S.marks.indexOf(sq);
          if (i >= 0) S.marks.splice(i, 1); else S.marks.push(sq);
        } else {
          var found = -1;
          S.userArrows.forEach(function (a, j) { if (a[0] === from && a[1] === sq) found = j; });
          if (found >= 0) S.userArrows.splice(found, 1); else S.userArrows.push([from, sq]);
        }
        drawBoard();
      }
      return;
    }
    var d = B.drag;
    B.drag = null;
    if (!d) return;
    if (d.overEl) d.overEl.classList.remove('hover-target');
    if (d.moved) {
      if (sq && sq !== d.sq) {
        var ok = targetsFrom(d.sq).some(function (m) { return m.to === sq; });
        if (ok) { S.sel = null; S.anim = null; B.noAnimOnce = true; tryMove(d.sq, sq); return; }
        S.sel = null;
      }
      drawBoard();
    } else if (d.was) {
      S.sel = null;
      drawBoard();
    }
  }
  function onBoardKey(e) {
    var k = e.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Escape'].indexOf(k) < 0) return;
    e.preventDefault();
    e.stopPropagation();
    if (!S.kbd) S.kbd = S.sel || (course().side === 'w' ? 'e2' : 'e7');
    var xy = sqXY(S.kbd);
    if (k === 'ArrowUp') xy.y = clamp(xy.y - 1, 0, 7);
    if (k === 'ArrowDown') xy.y = clamp(xy.y + 1, 0, 7);
    if (k === 'ArrowLeft') xy.x = clamp(xy.x - 1, 0, 7);
    if (k === 'ArrowRight') xy.x = clamp(xy.x + 1, 0, 7);
    S.kbd = xyToSq(xy.x, xy.y);
    if (k === 'Escape') { S.sel = null; }
    if (k === 'Enter' || k === ' ') {
      var sq = S.kbd;
      if (S.sel && targetsFrom(S.sel).some(function (m) { return m.to === sq; })) { var f = S.sel; S.sel = null; tryMove(f, sq); return; }
      if (canMoveFrom(sq)) S.sel = S.sel === sq ? null : sq; else S.sel = null;
    }
    drawBoard();
    var g = new Chess(posFen(S.view)), p = g.get(S.kbd);
    announce(S.kbd + (p ? ', ' + (p.color === 'w' ? 'white ' : 'black ') + PIECE_NAME[p.type] : ', empty') + (S.sel ? '. Selected ' + S.sel : ''));
  }

  function drawBoard() {
    if (!B.el || !S) return;
    var fen = posFen(S.view);
    var g = new Chess(fen);
    var last = S.view > 0 ? S.moves[S.view - 1] : null;
    var targets = S.sel ? targetsFrom(S.sel) : [];
    var checkSq = null;
    if (g.inCheck()) {
      var bd = g.board();
      for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) { var pc = bd[r][f]; if (pc && pc.type === 'k' && pc.color === g.turn()) checkSq = pc.square; }
    }
    B.sqs = {};
    for (var i = 0; i < 64; i++) {
      var x = i % 8, y = Math.floor(i / 8), sq = xyToSq(x, y);
      var fi = sq.charCodeAt(0) - 97, ri = +sq[1] - 1;
      var cell = B.cells[i];
      B.sqs[sq] = cell;
      var dark = (fi + ri) % 2 === 0;
      var cls = 'sq ' + (dark ? 'd' : 'l');
      if ((last && (last.from === sq || last.to === sq)) || S.sel === sq) cls += ' hl';
      if (S.marks.indexOf(sq) >= 0) cls += ' mark';
      if (checkSq === sq) cls += ' check';
      if (S.kbd === sq) cls += ' kbd';
      cell.className = cls;
      var inner = '';
      if (y === 7) inner += '<span class="coord file">' + sq[0] + '</span>';
      if (x === 0) inner += '<span class="coord rank">' + sq[1] + '</span>';
      var t = null;
      for (var j = 0; j < targets.length; j++) if (targets[j].to === sq) t = targets[j];
      if (t) inner += (g.get(sq) || t.flags.indexOf('e') >= 0) ? '<span class="ring"></span>' : '<span class="dot"></span>';
      cell.innerHTML = inner;
      var p = g.get(sq);
      cell.setAttribute('aria-label', sq + (p ? ' ' + (p.color === 'w' ? 'white' : 'black') + ' ' + PIECE_NAME[p.type] : ''));
    }
    B.el.classList.toggle('no-coords', !store.settings.coords);
    // pieces
    var anim = S.anim && S.anim.ply === S.view && !B.noAnimOnce && !reducedMotion ? S.anim : null;
    B.noAnimOnce = false;
    S.anim = null;
    var html = '';
    var animEls = [];
    var bd2 = g.board();
    for (var rr = 0; rr < 8; rr++) for (var ff = 0; ff < 8; ff++) {
      var pp = bd2[rr][ff];
      if (!pp) continue;
      var xy = sqXY(pp.square);
      var start = xy;
      if (anim) {
        if (pp.square === anim.to) { start = sqXY(anim.from); animEls.push(pp.square); }
        if (anim.flags.indexOf('k') >= 0 || anim.flags.indexOf('q') >= 0) {
          var rank = anim.color === 'w' ? '1' : '8';
          var rookFrom = (anim.flags.indexOf('k') >= 0 ? 'h' : 'a') + rank, rookTo = (anim.flags.indexOf('k') >= 0 ? 'f' : 'd') + rank;
          if (pp.square === rookTo) { start = sqXY(rookFrom); animEls.push(pp.square); }
        }
      }
      html += '<div class="piece' + (anim ? ' no-anim' : '') + '" data-sq="' + pp.square + '" data-to="' + xy.x + ',' + xy.y + '" style="background-image:url(' + PIECES[pp.color + pp.type.toUpperCase()] + ');transform:translate(' + start.x * 100 + '%,' + start.y * 100 + '%)"></div>';
    }
    B.pieces.innerHTML = html;
    if (anim && animEls.length) {
      void B.pieces.offsetWidth;
      animEls.forEach(function (sq) {
        var el = B.pieces.querySelector('[data-sq="' + sq + '"]');
        if (!el) return;
        el.classList.remove('no-anim');
        var to = el.getAttribute('data-to').split(',');
        el.style.transform = 'translate(' + to[0] * 100 + '%,' + to[1] * 100 + '%)';
      });
      B.pieces.querySelectorAll('.no-anim').forEach(function (el) { el.classList.remove('no-anim'); });
    }
    drawArrows();
    drawBadge();
    var who = g.turn() === 'w' ? 'White' : 'Black';
    B.el.setAttribute('aria-label', 'Chess board, ' + who + ' to move. Use arrow keys to move the cursor and Enter to select or move.');
    B.el.classList.toggle('grabbable', true);
  }

  function arrowSvg(from, to, color, opacity) {
    var a = sqXY(from), b = sqXY(to);
    var ax = a.x + 0.5, ay = a.y + 0.5, bx = b.x + 0.5, by = b.y + 0.5;
    var dx = Math.abs(b.x - a.x), dy = Math.abs(b.y - a.y);
    var pts = [[ax, ay]];
    if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) pts.push(dy === 2 ? [ax, by] : [bx, ay]);
    pts.push([bx, by]);
    var n = pts.length;
    var px = pts[n - 2], ex = pts[n - 1];
    var vx = ex[0] - px[0], vy = ex[1] - px[1], L = Math.sqrt(vx * vx + vy * vy);
    vx /= L; vy /= L;
    var head = 0.42, hw = 0.24;
    var tip = [ex[0] - vx * 0.08, ex[1] - vy * 0.08];
    var base = [tip[0] - vx * head, tip[1] - vy * head];
    var first = pts[1];
    var sx = first[0] - pts[0][0], sy = first[1] - pts[0][1], SL = Math.sqrt(sx * sx + sy * sy);
    pts[0] = [pts[0][0] + sx / SL * 0.18, pts[0][1] + sy / SL * 0.18];
    pts[n - 1] = base;
    var poly = pts.map(function (p) { return p[0].toFixed(3) + ',' + p[1].toFixed(3); }).join(' ');
    var h = [tip, [base[0] - vy * hw, base[1] + vx * hw], [base[0] + vy * hw, base[1] - vx * hw]].map(function (p) { return p[0].toFixed(3) + ',' + p[1].toFixed(3); }).join(' ');
    return '<g opacity="' + (opacity || 0.82) + '"><polyline points="' + poly + '" fill="none" stroke="' + color + '" stroke-width="0.17" stroke-linejoin="round"/><polygon points="' + h + '" fill="' + color + '"/></g>';
  }

  function recEdgeAt(n) { if (!n) return null; for (var i = 0; i < n.edges.length; i++) if (n.edges[i].rec) return n.edges[i]; return null; }

  function drawArrows() {
    if (!B.svg) return;
    var out = '';
    var live = isLive();
    var n = live ? curNode() : null;
    var learnerTurn = live && learnerTurnAt(S.moves.length) && S.mode === 'book';
    var rec = learnerTurn ? recEdgeAt(n) : null;
    if (S.showPlan) {
      var lastE = S.view > 0 ? S.moves[S.view - 1].edge : null;
      if (lastE && lastE.ann && lastE.ann.arrows) lastE.ann.arrows.forEach(function (a) { out += arrowSvg(a[0], a[1], lastE.isLearner ? '#ffaa00' : '#e8573f', 0.75); });
      if (rec && rec.ann && rec.ann.arrows) rec.ann.arrows.forEach(function (a) { out += arrowSvg(a[0], a[1], '#ffaa00', 0.75); });
    }
    var recShown = rec && (S.showHint || showMyMove() || (P.active && !P.done && P.awaiting && !P.answered && P.revealed));
    if (recShown) out += arrowSvg(rec.from, rec.to, '#5fae3a', 0.9);
    if (store.settings.arrow && !engineHidden()) {
      var ev = Engine.get(posFen(S.view));
      if (ev && ev.best && ev.depth >= 8 && !(recShown && ev.best === rec.uci)) out += arrowSvg(ev.best.slice(0, 2), ev.best.slice(2, 4), '#4f8fe0', 0.78);
    }
    S.userArrows.forEach(function (a) { out += arrowSvg(a[0], a[1], '#ffaa00', 0.82); });
    B.svg.innerHTML = out;
  }

  function classifyMove(i) {
    var m = S.moves[i];
    if (!m) return null;
    if (m.edge) return 'book';
    var before = Engine.get(posFen(i)), after = Engine.get(m.fen);
    if (!before || !after || before.depth < 10 || after.depth < 10) return null;
    var wb = winPct(evalNum(before)), wa = winPct(evalNum(after));
    var drop = m.color === 'w' ? wb - wa : wa - wb;
    var uci = m.from + m.to + (m.promotion || '');
    if (before.best === uci) return 'best';
    if (drop <= 2) return 'excellent';
    if (drop <= 5) return 'good';
    if (drop <= 10) return 'inaccuracy';
    if (drop <= 20) return 'mistake';
    return 'blunder';
  }
  function moveAccuracy(i) {
    var m = S.moves[i];
    if (m.edge) return 100;
    var before = Engine.get(posFen(i)), after = Engine.get(m.fen);
    if (!before || !after || before.depth < 10 || after.depth < 10) return null;
    var wb = winPct(evalNum(before)), wa = winPct(evalNum(after));
    var drop = Math.max(0, m.color === 'w' ? wb - wa : wa - wb);
    return clamp(103.1668 * Math.exp(-0.04354 * drop) - 3.1669, 0, 100);
  }

  function drawBadge() {
    var box = $('badge');
    if (!box) return;
    if (S.view === 0 || engineHidden()) { box.innerHTML = ''; return; }
    var c = classifyMove(S.view - 1);
    if (!c) { box.innerHTML = ''; return; }
    var xy = sqXY(S.moves[S.view - 1].to);
    box.innerHTML = '<div class="badge-on-board" style="left:' + ((xy.x + 1) * 12.5) + '%;top:' + (xy.y * 12.5) + '%;background:' + CLS[c].color + '">' + ICON[c] + '</div>';
  }

  // ---------------------------------------------------------- live updates
  function scheduleLive() {
    if (liveTimer) return;
    liveTimer = requestAnimationFrame(function () { liveTimer = null; renderLive(); });
  }
  function renderLive() {
    if (APP.view !== 'course' || !S) return;
    updateEvalBar();
    var an = $('analysis');
    if (an) an.innerHTML = analysisHtml();
    var ml = $('movelist');
    if (ml) { ml.innerHTML = moveListHtml(); scrollMoveList(); }
    drawArrows();
    drawBadge();
  }
  function updateEvalBar() {
    var eb = $('evalbar');
    if (!eb) return;
    var hidden = engineHidden() || (P.active && P.mode === 'challenge' && P.awaiting && !P.answered && !P.intro);
    var ev = Engine.get(posFen(S.view));
    var fl = flipped();
    eb.classList.toggle('flipped', fl);
    eb.classList.toggle('off', hidden || !ev);
    var w = hidden || !ev ? 50 : (ev.over ? (ev.over === '1-0' ? 100 : ev.over === '0-1' ? 0 : 50) : winPct(evalNum(ev)));
    eb.querySelector('.fill').style.height = w + '%';
    var txt = hidden ? '' : ev ? evalText(ev).replace('+', '') : '';
    var whiteAhead = w >= 50;
    var lbl = eb.querySelector('.lbl');
    lbl.textContent = txt;
    lbl.className = 'lbl ' + ((whiteAhead !== fl) ? 'bottom' : 'top');
    lbl.style.color = whiteAhead ? '#403d39' : '#ffffff';
    eb.title = hidden ? 'Evaluation hidden' : ev ? 'Stockfish evaluation (White perspective): ' + evalText(ev) + ', depth ' + (ev.depth > 90 ? '-' : ev.depth) : (Engine.state === 'error' ? 'Analysis unavailable' : 'Analysing...');
    eb.setAttribute('aria-label', eb.title);
  }

  // ------------------------------------------------------------ rendering
  function render() {
    if (APP.view === 'home') return;
    if (!S) return;
    drawBoard();
    renderPlayers();
    renderSide();
    updateEvalBar();
    updateNav();
    if (store.settings.engine) {
      Engine.want(posFen(S.view));
      if (!Engine.busy) Engine.pump();
    }
    if (APP.tab === 'tree') treeSync();
  }

  function renderPlayers() {
    var c = course();
    var g = new Chess(posFen(S.view));
    var fl = flipped();
    var bottomColor = fl ? 'b' : 'w';
    var topColor = bottomColor === 'w' ? 'b' : 'w';
    var counts = { w: { p: 8, n: 2, b: 2, r: 2, q: 1 }, b: { p: 8, n: 2, b: 2, r: 2, q: 1 } };
    var mat = { w: 0, b: 0 };
    g.board().forEach(function (row) { row.forEach(function (p) { if (p && p.type !== 'k') { counts[p.color][p.type]--; mat[p.color] += PIECE_VAL[p.type]; } }); });
    function bar(color) {
      var learner = color === c.side;
      var other = color === 'w' ? 'b' : 'w';
      var cap = '';
      ['q', 'r', 'b', 'n', 'p'].forEach(function (t) { for (var i = 0; i < Math.max(0, counts[other][t]); i++) cap += '<img alt="" src="' + PIECES[other + t.toUpperCase()] + '">'; });
      var diff = mat[color] - mat[other];
      var name = learner ? 'You' : (S.mode === 'free' ? 'You (free exploration)' : 'Book opponent');
      var sub = learner ? 'Playing ' + (color === 'w' ? 'White' : 'Black') + ' in the ' + c.name : (S.mode === 'free' ? 'Moving both sides' : 'Plays only moves from this course, never an engine');
      return '<div class="avatar"><img alt="" src="' + PIECES[color + (learner ? 'K' : 'N')] + '"></div><div class="player-name">' + esc(name) + '<small>' + esc(sub) + '</small></div><div class="captured" aria-label="Captured pieces">' + cap + (diff > 0 ? '<span class="adv">+' + diff + '</span>' : '') + '</div>';
    }
    $('pb-top').innerHTML = bar(topColor);
    $('pb-bot').innerHTML = bar(bottomColor);
  }

  function updateNav() {
    var set = function (id, dis) { var b = $(id); if (b) b.disabled = dis; };
    set('nav-first', S.view === 0);
    set('nav-prev', S.view === 0);
    set('nav-next', S.view >= S.moves.length);
    set('nav-last', S.view >= S.moves.length);
  }

  function renderSide() {
    var side = $('side');
    if (!side) return;
    var scroll = side.scrollTop;
    document.querySelectorAll('.side-tab').forEach(function (t) { t.setAttribute('aria-selected', String(t.getAttribute('data-tab') === APP.tab)); });
    $('course').classList.toggle('tree-mode', APP.tab === 'tree');
    if (APP.tab === 'learn') side.innerHTML = learnHtml();
    else if (APP.tab === 'practice') side.innerHTML = practiceHtml();
    else { if (!$('tree-scroll')) side.innerHTML = treeShellHtml(); treeRender(false); }
    if (APP.tab !== 'tree') side.scrollTop = scroll;
    scrollMoveList();
  }

  function scrollMoveList() {
    var ml = $('movelist');
    if (!ml) return;
    var cur = ml.querySelector('.cur');
    if (cur) {
      var top = cur.offsetTop - ml.offsetTop;
      if (top < ml.scrollTop || top > ml.scrollTop + ml.clientHeight - 30) ml.scrollTop = top - 60;
    } else ml.scrollTop = ml.scrollHeight;
  }

  function crumbsHtml(ctx) {
    var c = course();
    var parts = ['<b>' + esc(c.short) + '</b>'];
    if (ctx && (!ctx.ambiguous || ctx.family)) parts.push(esc(ctx.family || ctx.def.name.split(':')[0]));
    var i = S.view;
    if (i > 0) parts.push(esc(moveLabel(i - 1, S.moves[i - 1].san)));
    return '<div class="crumbs">' + parts.join(' <span aria-hidden="true">&rsaquo;</span> ') + '</div>';
  }

  function lineHeadHtml(ctx) {
    if (!ctx) return '<div class="line-head"><h2>' + esc(course().name) + '</h2></div>';
    if (ctx.ambiguous) return '<div class="line-head"><h2>' + esc(ctx.family || course().name) + '</h2><span class="chip">' + ctx.count + ' course lines continue from here</span></div>';
    var d = ctx.def;
    return '<div class="line-head"><h2>' + esc(d.name) + '</h2></div><div class="btn-row" style="gap:6px">' +
      '<span class="chip tier-' + d.tier + '">' + TIER_LABEL[d.tier] + '</span>' +
      (d.trap ? '<span class="chip" style="background:#5b3434;color:#f6d9d9">Trap lesson</span>' : '') +
      (d.suit ? '<span class="chip tc" title="Coach\'s guidance, not statistics">Best for: ' + esc(d.suit) + '</span>' : '') +
      '<span class="chip" title="Line ID">' + esc(d.id) + '</span></div>';
  }

  function moveChip(e, n, labelOverride) {
    return '<button class="movechip' + (e.rec ? ' rec' : '') + '" data-act="play-edge" data-uci="' + e.uci + '">' + esc(moveLabel(plyOf(n), e.san)) + ' <small>' + (labelOverride || (e.rec ? 'Recommended' : (e.ann && e.ann.label) || 'Playable alternative')) + '</small></button>';
  }
  function plyOf(n) {
    var parts = n.fen.split(' ');
    return (parseInt(parts[5], 10) - 1) * 2 + (parts[1] === 'b' ? 1 : 0);
  }

  function kv(rows) {
    var html = '';
    rows.forEach(function (r) { if (r[1]) html += '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; });
    return html ? '<dl class="kv">' + html + '</dl>' : '';
  }

  function statusHtml() {
    var c = course();
    if (!isLive()) {
      return '<div class="coach"><div class="status">Viewing move ' + esc(moveLabel(S.view - 1, S.moves[S.view - 1] ? S.moves[S.view - 1].san : '')) + '</div><p>You are browsing earlier moves. Moving a piece here starts a new branch from this position.</p><div class="btn-row"><button class="btn small" data-act="nav-last">Back to the current position</button></div></div>';
    }
    if (S.mode === 'free') {
      return '<div class="coach warn"><div class="status">Free exploration</div><p>You move both sides. The book opponent is switched off, so nothing here claims to be a good or bad move; use the engine panel below for evidence.</p><div class="btn-row"><button class="btn small" data-act="back-lesson">Back to the lesson</button><button class="btn small" data-act="restart">Restart</button></div></div>';
    }
    if (S.mode === 'oob') {
      var f = S.feedback || {};
      var n = f.node || nodeAt(lastBookIndex());
      var alts = n ? n.edges.filter(function (e) { return e.isLearner; }) : [];
      var here = posFen(S.moves.length), other = null;
      COURSES.forEach(function (c2) {
        if (!other && c2.id !== S.cid && c2.side === course().side && GRAPHS[c2.id].nodes[OL_GRAPH.posKey(c2.id, here)]) other = c2;
      });
      var cross = other ? '<p>Good news: this position is covered in the <b>' + esc(other.name) + '</b> course.</p><div class="btn-row"><button class="btn small primary" data-act="goto-course" data-cid="' + other.id + '">Continue in the ' + esc(other.short) + ' course</button></div>' : '';
      return '<div class="coach warn"><h3>Legal move, but outside this opening lesson</h3>' + cross + '<p>' + esc(f.san || 'Your move') + ' is a legal move, but it is not part of this course\'s repertoire at this position. That does not automatically mean it is a mistake: the engine panel below shows an independent evaluation.</p>' +
        '<div class="btn-row"><button class="btn small primary" data-act="undo">Undo and try a book move</button><button class="btn small" data-act="show-alts">See supported alternatives</button><button class="btn small" data-act="explore">Explore freely</button></div>' +
        (S.showAlts && alts.length ? '<div class="movechoice">' + alts.map(function (e) { return moveChip(e, n); }).join('') + '</div>' : '') + '</div>';
    }
    if (S.mode === 'done' && S.completed) {
      var L = lineById(S.completed.id);
      var plan = annFor(S.cid)['@plans'] && annFor(S.cid)['@plans'][S.completed.id];
      return '<div class="coach done"><h3>Line complete' + (S.completed.mate ? ': checkmate!' : '') + '</h3><p><b>' + esc(L ? L.name : '') + '</b>. This is the end of the curated repertoire for this line.</p>' + (plan ? kv([['Middlegame plan', plan]]) : '') +
        '<div class="btn-row"><button class="btn small primary" data-act="replay">Replay</button><button class="btn small" data-act="newvar">Try another variation</button><button class="btn small" data-act="explore">Explore freely</button></div></div>';
    }
    var len = S.moves.length;
    if (S.paused && !learnerTurnAt(len)) {
      return '<div class="coach"><div class="status">Opponent to move</div><p>' + esc(S.note || 'Position loaded.') + '</p><div class="btn-row"><button class="btn small primary" data-act="resume">Let the opponent move</button></div></div>';
    }
    if (S.thinking || !learnerTurnAt(len)) return '<div class="coach"><div class="status"><span class="pulse"></span>Opponent is choosing a book move...</div></div>';
    var recNow = showMyMove() ? recEdgeAt(curNode()) : null;
    return '<div class="coach good"><div class="status"><span class="pulse"></span>Your move (' + (c.side === 'w' ? 'White' : 'Black') + ')' + (recNow ? ': play ' + esc(moveLabel(len, recNow.san)) : '') + '</div>' +
      (recNow ? '<p>Follow the green arrow, or try another move to see what the course says about it.</p>' : '') +
      (S.note ? '<p>' + esc(S.note) + '</p>' : '') + '</div>';
  }

  function learnHtml() {
    var c = course();
    var ctx = lineContext();
    var live = isLive();
    var len = S.moves.length;
    var firstVisit = !Object.keys(cprog(S.cid).lines).length && !S.forced && !S.moves.some(function (m) { return m.color === c.side; });
    var html = crumbsHtml(ctx) + lineHeadHtml(ctx) + statusHtml() + (firstVisit ? roadmapHtml(true) : '');
    var A = annFor(S.cid);
    // feedback on the learner's last move
    if (live && S.feedback && (S.feedback.type === 'rec' || S.feedback.type === 'alt' || S.feedback.type === 'transpose')) {
      var f = S.feedback;
      if (f.type === 'transpose') {
        html += '<div class="coach good"><h3>Transposed back into the book</h3><p>Your move order is different, but it reached a position this course covers, so the lesson continues.</p></div>';
      } else {
        var a = f.edge.ann || {};
        var rec = recEdgeAt(f.node);
        html += '<div class="coach ' + (f.type === 'rec' ? 'good' : 'alt') + '"><h3>' + clsIcon('book') + ' ' + esc(moveLabel(plyOf(f.node), f.edge.san)) + ' ' + (f.type === 'rec' ? 'Recommended' : esc(a.label || 'Playable alternative')) + '</h3>' +
          (f.type === 'alt' && rec ? '<p>This move is in the course. The main recommendation here is ' + esc(moveLabel(plyOf(f.node), rec.san)) + '.</p>' : '') +
          kv([['Why', a.idea], ['Watch out', a.watch], ['Next plan', a.plan], ['Typical mistake', a.mistake]]) + '</div>';
      }
    }
    // last opponent move
    var lastIdx = live ? len - 1 : S.view - 1;
    var lastM = lastIdx >= 0 ? S.moves[lastIdx] : null;
    if (lastM && lastM.edge && !lastM.edge.isLearner && S.mode !== 'free') {
      var oa = lastM.edge.ann || {};
      html += '<div class="coach"><h3>' + clsIcon('book') + ' ' + esc(moveLabel(lastIdx, lastM.san)) + ' ' + (c.side === 'w' ? 'Black' : 'White') + '\'s choice</h3>' +
        (kv([['What happened', oa.what], ['Threat', oa.threat], ['Avoid', oa.avoid]]) || '<p>A book move covered by this course.</p>') + '</div>';
    }
    // learner options
    var n = live ? curNode() : null;
    if (live && n && S.mode === 'book' && learnerTurnAt(len) && !S.paused) {
      var learnerEdges = n.edges.filter(function (e) { return e.isLearner; });
      var rec2 = recEdgeAt(n);
      if (rec2) {
        var ra = rec2.ann || {};
        var shown = S.showHint || showMyMove();
        html += '<div class="coach"><h3>Your options</h3>' +
          '<div class="reveal' + (shown ? ' shown' : '') + '" data-act="hint" title="' + (shown ? '' : 'Click to reveal') + '">' +
          '<div class="movechoice">' + learnerEdges.map(function (e) { return moveChip(e, n); }).join('') + '</div>' +
          kv([['Why', ra.idea], ['Watch out', ra.watch]]) + '</div>' +
          (shown ? '' : '<p class="muted">Think first, then click the blurred box or press Hint to reveal the recommended move.</p>') + '</div>';
      }
    }
    if (S.showPlan && live) {
      var planText = (n && recEdgeAt(n) && recEdgeAt(n).ann && recEdgeAt(n).ann.plan) || (lastM && lastM.edge && lastM.edge.ann && lastM.edge.ann.plan) || (ctx && A['@plans'] && A['@plans'][ctx.def.id]);
      html += '<div class="coach"><h3>' + ICON.plan.replace('<svg', '<svg width="16" height="16"') + ' Plan</h3><p>' + esc(planText || 'Develop your pieces, castle, and fight for the center.') + '</p></div>';
    }
    // controls
    html += '<div class="btn-row">' +
      '<button class="btn small" data-act="hint">' + ICON.hint + 'Hint</button>' +
      '<button class="btn small" data-act="plan" aria-pressed="' + S.showPlan + '">' + ICON.plan + 'Show plan</button>' +
      '<button class="btn small" data-act="undo"' + (S.moves.length ? '' : ' disabled') + '>' + ICON.undo + 'Undo</button>' +
      '<button class="btn small" data-act="restart">' + ICON.restart + 'Restart</button>' +
      '<button class="btn small" data-act="keypos">' + ICON.key + 'Start at key position</button>' +
      '<button class="btn small" data-act="newvar">' + ICON.shuffle + 'New variation</button></div>';
    html += '<div class="field"><span class="lbl">Opponent replies</span><div class="seg" role="group" aria-label="Opponent replies">' +
      '<button data-act="style" data-v="surprise" aria-pressed="' + (!S.forced) + '">Surprise me</button>' +
      '<button data-act="style" data-v="repeat" aria-pressed="' + (!!S.forced) + '"' + (S.lastLine || ctx ? '' : ' disabled') + '>Repeat same line</button></div>' +
      '<select class="sel" data-act="pick-line" aria-label="Choose a line to practise">' + lineOptions(S.forced) + '</select></div>';
    html += '<div class="field"><span class="lbl">Your moves</span><div class="seg" role="group" aria-label="Your moves">' +
      '<button data-act="lshow" data-v="1" aria-pressed="' + !!store.settings.lshow + '">Show my move</button>' +
      '<button data-act="lshow" data-v="0" aria-pressed="' + !store.settings.lshow + '">Quiz me (hide it)</button></div></div>';
    html += movesAndAnalysisHtml();
    if (!firstVisit) html += roadmapHtml(false);
    html += lessonsHtml();
    return html;
  }

  function roadmapHtml(expanded) {
    var gph = graph(), p = cprog(S.cid);
    function done(l) { return !!p.lines[l.def.id]; }
    function ofTier(t) { return gph.lines.filter(function (l) { return l.def.tier === t; }); }
    var core = ofTier('core'), common = ofTier('common');
    var coreDone = core.filter(done).length, commonDone = common.filter(done).length;
    var next = core.filter(function (l) { return !done(l); })[0] || common.filter(function (l) { return !done(l); })[0] || null;
    function list(ls) {
      return '<ol class="pathlist">' + ls.map(function (l) {
        return '<li class="' + (done(l) ? 'done' : '') + '"><button class="linkish" data-act="learn-line" data-id="' + l.def.id + '">' + (done(l) ? '<span class="tick" aria-label="learned">&#10003;</span>' : '') + esc(l.def.name) + '</button></li>';
      }).join('') + '</ol>';
    }
    var body = '<ol class="steps">' +
      '<li><b>Learn the ' + core.length + ' core lines.</b> Play each one here. The green arrow shows your move and the cards explain why it works.</li>' +
      '<li><b>Practice.</b> The Practice tab quizzes you, weak spots first. A position you have never seen is shown to you before it is tested.</li>' +
      '<li><b>Add the common lines</b> once the core ones feel easy.</li></ol>' +
      '<div class="btn-row">' + (next ? '<button class="btn small primary" data-act="learn-line" data-id="' + next.def.id + '">' + (coreDone || commonDone ? 'Learn next: ' : 'Start with: ') + esc(next.def.name) + '</button>' : '') +
      (coreDone ? '<button class="btn small" data-act="tab" data-tab="practice">Practice what you learned</button>' : '') + '</div>' +
      (next ? '' : '<p>Every core and common line is learned. Practice keeps them fresh.</p>') +
      '<div class="field"><span class="lbl">Core lines: ' + coreDone + '/' + core.length + ' learned</span>' + list(core) + '</div>' +
      (common.length ? '<details class="sub" data-keep="pathsub"' + (APP.open.pathsub ? ' open' : '') + '><summary>Common lines: ' + commonDone + '/' + common.length + ' learned</summary>' + list(common) + '</details>' : '');
    if (expanded) return '<div class="coach path"><h3>New here? Your path through this course</h3>' + body + '</div>';
    return '<details class="box" data-keep="path"' + (APP.open.path ? ' open' : '') + '><summary>Your path: ' + coreDone + '/' + core.length + ' core lines learned</summary><div class="inner">' + body + '</div></details>';
  }

  function lineOptions(selected, allLabel) {
    var gph = graph();
    var html = '<option value="">' + esc(allLabel || 'Choose a specific line...') + '</option>';
    ['core', 'common', 'advanced'].forEach(function (t) {
      var ls = gph.lines.filter(function (l) { return l.def.tier === t; });
      if (!ls.length) return;
      html += '<optgroup label="' + TIER_LABEL[t] + '">' + ls.map(function (l) { return '<option value="' + l.def.id + '"' + (selected === l.def.id ? ' selected' : '') + '>' + esc(l.def.id + ' . ' + l.def.name) + '</option>'; }).join('') + '</optgroup>';
    });
    return html;
  }

  function lessonsHtml() {
    var A = annFor(S.cid);
    var c = course();
    var ls = A['@lessons'] || [];
    return '<details class="box" data-keep="ideas"' + (APP.open.ideas ? ' open' : '') + '><summary>Key ideas of the ' + esc(c.name) + '</summary><div class="inner">' +
      ls.map(function (l) { return '<div class="lesson"><h4>' + esc(l.title) + '</h4><p>' + esc(l.body) + '</p></div>'; }).join('') + '</div></details>' +
      '<details class="box" data-keep="suit"' + (APP.open.suit ? ' open' : '') + '><summary>Who is this opening for?</summary><div class="inner">' + suitHtml(c) + '<p class="muted">Coach\'s guidance, not statistics.</p></div></details>';
  }

  function suitHtml(c) {
    return '<div class="suit"><div class="suit-row"><span class="suit-label">Elo</span><span class="chip elo">' + esc(c.suit.elo) + '</span></div>' +
      '<div class="suit-row"><span class="suit-label">Time control</span>' + c.suit.tc.map(function (t) { return '<span class="chip tc">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<div style="color:var(--text-2)">' + esc(c.suit.why) + '</div></div>';
  }

  function movesAndAnalysisHtml() {
    return '<div class="field"><span class="lbl">Moves</span><div class="movelist" id="movelist">' + moveListHtml() + '</div></div>' +
      '<div class="analysis" id="analysis">' + analysisHtml() + '</div>';
  }

  function moveListHtml() {
    if (!S.moves.length) return '<div class="ml-empty">' + (course().side === 'b' ? 'White (the book opponent) moves first.' : 'Make your first move on the board.') + '</div>';
    var hide = engineHidden();
    var html = '';
    for (var i = 0; i < S.moves.length; i += 2) {
      html += '<div class="ml-row"><span class="ml-num">' + (i / 2 + 1) + '.</span>';
      for (var j = i; j < i + 2; j++) {
        var m = S.moves[j];
        if (!m) { html += '<span></span>'; continue; }
        var c = m.edge ? 'book' : (hide ? null : classifyMove(j));
        html += '<button class="ml-move' + (S.view === j + 1 ? ' cur' : '') + (m.key || m.edge ? '' : ' oob') + '" data-act="goto" data-ply="' + (j + 1) + '" aria-label="' + esc(moveLabel(j, m.san)) + (c ? ', ' + CLS[c].label : '') + '">' + (c ? clsIcon(c) : '') + esc(m.san) + '</button>';
      }
      html += '</div>';
    }
    return html;
  }

  function pvSan(fen, pv, max) {
    var g = new Chess(fen), out = [];
    var parts = fen.split(' ');
    var num = parseInt(parts[5], 10), white = parts[1] === 'w';
    for (var i = 0; i < Math.min(pv.length, max || 10); i++) {
      var u = pv[i], mv;
      try { mv = g.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] || undefined }); } catch (e) { break; }
      if (white) out.push(num + '.' + mv.san);
      else { out.push(i === 0 ? num + '...' + mv.san : mv.san); num++; }
      white = !white;
    }
    return out.join(' ');
  }

  function analysisHtml() {
    var head = '<div class="an-head"><span>Stockfish 19 lite . runs in your browser</span><span class="toggles">' +
      '<button class="btn small ghost" data-act="toggle-engine" aria-pressed="' + store.settings.engine + '">' + (store.settings.engine ? 'Engine on' : 'Engine off') + '</button>' +
      '<button class="btn small ghost" data-act="toggle-arrow" aria-pressed="' + store.settings.arrow + '">Best-move arrow ' + (store.settings.arrow ? 'on' : 'off') + '</button></span></div>';
    if (!store.settings.engine) return head + '<div class="muted">Engine analysis is off. The book opponent never uses the engine either way.</div>';
    if (Engine.state === 'error') return head + '<div class="muted">Analysis unavailable in this browser (the engine needs WebAssembly and to be served over http/https). Everything else works.</div>';
    if (engineHidden()) return head + '<div class="muted">Engine hidden during this drill so it does not give the answer away. It comes back after you answer.</div>';
    var fen = posFen(S.view);
    var ev = Engine.get(fen);
    var html = head;
    if (!ev) html += '<div class="muted">' + (Engine.state === 'ready' ? 'Analysing...' : 'Loading engine (about 2 MB, once)...') + '</div>';
    else if (ev.over) html += '<div class="muted">Game over: ' + esc(ev.over) + '</div>';
    else {
      html += '<div class="muted">Depth ' + ev.depth + (ev.final ? '' : ' (thinking)') + '. Scores are from White\'s point of view.</div>';
      ev.pvs.forEach(function (p) {
        var t = evalText(p);
        var whiteBetter = evalNum(p) >= 0;
        html += '<div class="pv"><span class="score ' + (whiteBetter ? 'w' : 'b') + '">' + esc(t) + '</span><span class="moves" title="' + esc(pvSan(fen, p.pv, 16)) + '">' + esc(pvSan(fen, p.pv, 10)) + '</span></div>';
      });
    }
    html += graphHtml();
    html += reviewHtml();
    return html;
  }

  function graphHtml() {
    var n = S.moves.length;
    if (n < 1) return '';
    var W = 300, H = 70, pts = [], haveAny = false;
    for (var i = 0; i <= n; i++) {
      var ev = Engine.get(posFen(i));
      var y = ev ? winPct(evalNum(ev)) : null;
      if (ev) haveAny = true;
      pts.push(y);
    }
    if (!haveAny) return '';
    var step = W / Math.max(1, n), d = 'M0,' + H, lastY = 50;
    for (var j = 0; j <= n; j++) {
      var yy = pts[j] == null ? lastY : pts[j];
      lastY = yy;
      d += ' L' + (j * step).toFixed(1) + ',' + (H - yy / 100 * H).toFixed(1);
    }
    d += ' L' + W + ',' + H + ' Z';
    var cx = S.view * step;
    return '<svg class="graph" id="evalgraph" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="Advantage graph over the moves played; click to jump to a move" data-n="' + n + '">' +
      '<rect width="' + W + '" height="' + H + '" fill="#403d39"/><path d="' + d + '" fill="#ffffff"/>' +
      '<line x1="0" x2="' + W + '" y1="' + H / 2 + '" y2="' + H / 2 + '" stroke="#8b8987" stroke-width="0.6" stroke-dasharray="3 3"/>' +
      '<line x1="' + cx + '" x2="' + cx + '" y1="0" y2="' + H + '" stroke="#81b64c" stroke-width="2"/></svg>';
  }

  function reviewHtml() {
    if (!S.moves.length) return '';
    var counts = { w: {}, b: {} }, acc = { w: [], b: [] };
    for (var i = 0; i < S.moves.length; i++) {
      var m = S.moves[i], c = classifyMove(i), a = moveAccuracy(i);
      if (c) counts[m.color][c] = (counts[m.color][c] || 0) + 1;
      if (a != null) acc[m.color].push(a);
    }
    function avg(l) { if (!l.length) return '--'; var s = 0; l.forEach(function (v) { s += v; }); return (s / l.length).toFixed(1); }
    var rows = CLS_ORDER.map(function (c) {
      return '<span class="lab">' + clsIcon(c) + CLS[c].label + '</span><span class="n">' + (counts.w[c] || 0) + '</span><span class="n">' + (counts.b[c] || 0) + '</span>';
    }).join('');
    return '<details class="box" style="background:var(--panel)"' + (APP.reviewOpen ? ' open' : '') + ' data-review><summary>Game review</summary><div class="inner">' +
      '<div class="acc"><div class="box"><b>' + avg(acc.w) + '</b><span>White accuracy</span></div><div class="box"><b>' + avg(acc.b) + '</b><span>Black accuracy</span></div></div>' +
      '<div class="stats-grid"><span class="h"></span><span class="h n">White</span><span class="h n">Black</span>' + rows + '</div>' +
      '<p class="muted">Book = a move from this course. Other labels come from the drop in Stockfish win chance after the move (Best = engine\'s top move, Excellent under 2%, Good under 5%, Inaccuracy under 10%, Mistake under 20%, Blunder above). Accuracy uses the published lichess formula; chess.com\'s own formula is proprietary.</p></div></details>';
  }

  // ---------------------------------------------------------------- practice UI
  var MODE_DESC = {
    guided: 'Guided: the recommended move and the reason are shown before you move.',
    recall: 'Recall: the opponent plays a book move and you find the reply. A hint is offered after a failed try.',
    challenge: 'Challenge: nothing is shown until you move, one try per decision, and the engine is hidden.'
  };

  function practiceHtml() {
    var c = course();
    if (!P.active) {
      var pr = courseProgress(S.cid);
      var p = cprog(S.cid);
      var mist = p.mistakes.slice(0, 6);
      var fresh = !pr.linesDone && !pr.seen && !Object.keys(p.learned).length;
      return '<div class="line-head"><h2>Practice the ' + esc(c.name) + '</h2></div>' +
        (fresh ? '<div class="coach path"><h3>First time here? Learn the core lines first</h3><p>Practice quizzes you on moves you already know. Play the core lines once in Learn &amp; Explore (the green arrow shows every move), then come back.</p>' +
          '<div class="btn-row"><button class="btn small primary" data-act="tab" data-tab="learn">Go to Learn &amp; Explore</button></div>' +
          '<p class="muted">Or start now: every position you have never seen is shown to you first, and tested the next time it comes up.</p></div>' : '') +
        '<div class="field"><span class="lbl">Mode</span><div class="seg" role="group" aria-label="Practice mode">' + ['guided', 'recall', 'challenge'].map(function (m) {
          return '<button data-act="pmode" data-v="' + m + '" aria-pressed="' + (store.settings.pmode === m) + '">' + m.charAt(0).toUpperCase() + m.slice(1) + '</button>';
        }).join('') + '</div><span class="muted">' + MODE_DESC[store.settings.pmode] + ' In every mode, a position you have never seen is shown to you first and tested the next time.</span></div>' +
        startFromHtml(false) +
        '<div class="field"><span class="lbl">Session length</span><div class="seg" role="group" aria-label="Session length">' + [5, 10, 15].map(function (n) {
          return '<button data-act="plen" data-v="' + n + '" aria-pressed="' + (store.settings.plen === n) + '">' + n + ' questions</button>';
        }).join('') + '</div><span class="muted">Only moves you are asked to find count. New moves are shown first, then you replay that line from memory. To stop replaying the opening moves you know, set Lines start from to Skip what I know.</span></div>' +
        '<div class="field"><label for="pscope">Scope</label><select id="pscope" class="sel" data-act="pscope">' + lineOptions(P.scopePick && P.scopePick !== 'all' ? P.scopePick : null, 'Practice all branches (weak spots first)').replace('Choose a specific line...', '') + '</select></div>' +
        '<button class="btn primary" data-act="pstart">Start practice</button>' +
        '<div class="score-row"><div class="box"><b>' + pr.seen + '/' + pr.total + '</b><span>Decisions seen</span></div><div class="box"><b>' + pr.mastered + '</b><span>Mastered</span></div><div class="box"><b>' + (pr.firstTry == null ? '--' : pr.firstTry + '%') + '</b><span>First-try correct</span></div><div class="box"><b>' + pr.linesDone + '/' + pr.lines + '</b><span>Lines finished</span></div></div>' +
        (pr.last ? '<div class="muted">Last practice: ' + esc(new Date(pr.last).toLocaleString()) + '</div>' : '') +
        (mist.length ? '<div class="field"><span class="lbl">Recent mistakes (click to review the position)</span><div class="movechoice">' + mist.map(function (m) {
          return '<button class="movechip" data-act="loadpath" data-path="' + esc(m.path) + '">You played ' + esc(m.played) + ' <small>course: ' + esc(m.expected) + '</small></button>';
        }).join('') + '</div></div>' : '') +
        '<div class="btn-row"><button class="btn small ghost" data-act="reset-progress">Reset progress for this course</button></div>' +
        (storageOk ? '' : '<p class="muted">Progress cannot be saved in this browser.</p>') +
        movesAndAnalysisHtml();
    }
    if (P.done) {
      var credit = 0, firsts = 0, tested = P.results, learnedNew = P.introCount;
      tested.forEach(function (r) { credit += r.credit; if (r.first && r.credit > 0) firsts++; });
      var pct = tested.length ? Math.round(100 * credit / tested.length) + '%' : '--';
      return '<div class="line-head"><h2>Session complete</h2></div>' +
        '<div class="score-row"><div class="box"><b>' + pct + '</b><span>Score</span></div><div class="box"><b>' + firsts + '/' + tested.length + '</b><span>First try</span></div><div class="box"><b>' + learnedNew + '</b><span>New moves learned</span></div><div class="box"><b>' + (P.linesPlayed || 0) + '</b><span>Lines finished</span></div></div>' +
        dotsHtml() +
        (P.mistakes.length ? '<div class="field"><span class="lbl">Review your mistakes</span><div class="movechoice">' + P.mistakes.map(function (m) { return '<button class="movechip" data-act="loadpath" data-path="' + esc(m.path) + '">You: ' + esc(m.played) + ' <small>course: ' + esc(m.expected) + '</small></button>'; }).join('') + '</div></div>' : '<div class="coach good"><p>No mistakes in this session. Try Challenge mode next.</p></div>') +
        '<div class="btn-row"><button class="btn primary" data-act="pstart">Practice again</button><button class="btn" data-act="pstop">Back to setup</button></div>' + movesAndAnalysisHtml();
    }
    var res = P.results, credit2 = 0, f2 = 0;
    res.forEach(function (r) { credit2 += r.credit; if (r.first && r.credit > 0) f2++; });
    var html = '<div class="line-head" style="justify-content:space-between"><div class="line-head"><h2>' + esc(P.mode.charAt(0).toUpperCase() + P.mode.slice(1)) + ' practice</h2><span class="chip">' + esc(P.scope === 'all' ? 'All branches' : 'Focus: ' + P.scope) + '</span></div><button class="btn small" data-act="pstop">' + ICON.restart + 'Change settings</button></div>' +
      '<div class="score-row"><div class="box"><b>' + Math.min(P.len, P.results.length + (P.answered ? 0 : 1)) + '/' + P.len + '</b><span>Question</span></div><div class="box"><b>' + (res.length ? Math.round(100 * credit2 / res.length) + '%' : '--') + '</b><span>Score</span></div><div class="box"><b>' + (res.length ? Math.round(100 * f2 / res.length) + '%' : '--') + '</b><span>First try</span></div><div class="box"><b>' + P.streak + '</b><span>Streak</span></div></div>' + dotsHtml();
    var len = S.moves.length;
    var n = curNode();
    if (P.answered) {
      var e = P.answered.edge, a = e.ann || {};
      var opp = S.moves.length >= 2 ? S.moves[S.moves.length - 2].edge : null;
      var oa = opp && !opp.isLearner && opp.ann ? opp.ann : {};
      var node = graph().nodes[e.fromKey];
      var title = P.answered.credit === 1 ? 'Correct: ' : P.answered.credit > 0 ? 'Playable alternative (partial credit): ' : 'Played after a hint: ';
      html += '<div class="coach ' + (P.answered.credit === 1 ? 'good' : 'alt') + '"><h3>' + esc(title + moveLabel(plyOf(node), e.san)) + '</h3>' +
        (e.rec ? '' : '<p>The course recommends ' + esc(moveLabel(plyOf(node), recEdgeAt(node).san)) + ' here.</p>') +
        kv([['Why this works', a.idea || (recEdgeAt(node).ann || {}).idea], ['What ' + (c.side === 'w' ? 'Black' : 'White') + ' threatens', oa.threat], ['Typical mistake', a.mistake || a.watch || oa.avoid]]) +
        (S.mode === 'done' && S.completed ? '<p><b>Line complete: ' + esc((lineById(S.completed.id) || {}).name || '') + '.</b> Continue loads the next variation.</p>' : '') +
        '<div class="btn-row"><button class="btn primary" data-act="pcontinue" autofocus>Continue</button></div></div>';
    } else if (S.mode === 'done') {
      html += '<div class="coach done"><h3>Line complete</h3><p>Loading the next variation...</p></div>';
    } else if (P.awaiting && n && learnerTurnAt(len)) {
      var rec = recEdgeAt(n);
      var last = S.moves[len - 1];
      var la = last && last.edge && last.edge.ann ? last.edge.ann : {};
      html += '<div class="coach' + (P.intro ? ' path' : '') + '"><div class="status"><span class="pulse"></span>' + (P.intro ? '<span class="chip new">New</span>' : '') + (last ? 'After ' + esc(moveLabel(len - 1, last.san)) + ', what do you play?' : 'Your move: start the opening') + '</div>' +
        (P.intro ? '<p>You have not seen this position yet, so here is the move to learn. Play it on the board (follow the green arrow). It does not count as a question; you get asked it when you replay this line from memory.</p>' : '') +
        (P.skipped > 1 && len === P.skipped ? '<p class="muted">Skipped to move ' + (Math.floor(len / 2) + 1) + ': you already know the moves before it. Step back with the arrows to see them.</p>' : '') +
        (P.recallPass && !P.intro && !P.warmup ? '<p><b>From memory:</b> you just learned this line. Now play it without help.</p>' : '') +
        (P.warmup && !P.intro ? '<p class="muted">Warm-up: play the opening moves to reach the position yourself. Checked, but not scored.</p>' : '') +
        (P.mode !== 'challenge' && la.what ? '<p>' + esc(la.what) + '</p>' : '') +
        (P.lastWrong ? '<p style="color:var(--orange)"><b>' + esc(P.lastWrong) + '</b> is legal, but it is not this course\'s move here.' + (P.revealed ? '' : ' Try again.') + '</p>' : '') +
        (P.revealed && rec ? '<div class="movechoice">' + moveChip(rec, n, 'Recommended') + '</div>' + kv([['Why', (rec.ann || {}).idea], ['Watch out', P.intro ? (rec.ann || {}).watch : '']]) : '') +
        '<div class="btn-row">' + (P.mode === 'recall' && P.tries > 0 && !P.revealed ? '<button class="btn small" data-act="phint">' + ICON.hint + 'Hint</button>' : '') + '</div></div>';
    } else {
      html += '<div class="coach"><div class="status"><span class="pulse"></span>Opponent is choosing a book move...</div></div>';
    }
    html += '<div class="btn-row"><button class="btn small" data-act="prestart-line">' + ICON.restart + 'Restart this exact line</button><button class="btn small" data-act="pnew-line">' + ICON.shuffle + 'New opponent variation</button><button class="btn small" data-act="pstop">End session</button></div>' + startFromHtml(true);
    html += movesAndAnalysisHtml();
    return html;
  }

  function startFromHtml(inSession) {
    var v = store.settings.pstart;
    return '<div class="field"><span class="lbl">Lines start from</span><div class="seg" role="group" aria-label="Lines start from">' +
      '<button data-act="pstartfrom" data-v="start" aria-pressed="' + (v === 'start') + '">Move 1 (play the whole way)</button>' +
      '<button data-act="pstartfrom" data-v="known" aria-pressed="' + (v === 'known') + '">Skip what I know</button>' +
      '<button data-act="pstartfrom" data-v="key" aria-pressed="' + (v === 'key') + '">Key position (skip the opening moves)</button></div>' +
      '<span class="muted">' + ({
        start: 'You play every move from the start, so you learn how to reach each position. The opening moves are a warm-up and are not scored.',
        known: 'Each line jumps once, at its start, to the first move you still need: one you have not answered right this session and have not mastered. From there you play every move.',
        key: 'The first moves (' + esc(course().identity) + ') are played for you.'
      }[v] || '') + (inSession ? ' Applies from the next line.' : '') + '</span></div>';
  }

  function dotsHtml() {
    var html = '<div class="dots" aria-label="Session results">';
    for (var i = 0; i < P.len; i++) {
      var r = P.results[i];
      var cls = r ? (r.credit === 1 ? 'ok' : r.credit > 0 ? 'part' : 'bad') : (i === P.results.length && !P.done ? 'now' : '');
      html += '<i class="' + cls + '">' + (r ? (r.credit === 1 ? '' : r.credit > 0 ? '~' : 'x') : '') + '</i>';
    }
    return html + '</div>';
  }

  // ------------------------------------------------------------------- tree
  var T = { collapsed: {}, scale: 1, model: null, sig: '', moves: [], cardFor: null, pinned: false };

  function visibleEdges(n) {
    var lim = TIER_RANK[store.settings.tfilter];
    return n.edges.filter(function (e) { return TIER_RANK[e.tier] <= lim; }).sort(function (a, b) {
      if (a.rec !== b.rec) return a.rec ? -1 : 1;
      return a.firstLine - b.firstLine;
    });
  }

  function buildTreeModel() {
    var gph = graph(), visited = {}, id = 0, moves = [];
    visited[gph.rootKey] = true;
    function box(edge, pathSans, depth, parent) {
      var b = { id: 'b' + (id++), moves: [], children: [], depth: depth, xpos: null, parent: parent, kind: edge.isLearner ? 'learner' : 'opp' };
      var cur = edge, path = pathSans.slice();
      for (;;) {
        path.push(cur.san);
        var mv = { edge: cur, path: path.join(' '), key: cur.toKey, ply: path.length - 1, box: b, idx: moves.length };
        b.moves.push(mv); moves.push(mv);
        var child = gph.nodes[cur.toKey];
        if (visited[child.key]) { b.xpos = child.key; break; }
        visited[child.key] = true;
        var vis = visibleEdges(child);
        if (!vis.length) { b.leaf = child; break; }
        if (vis.length === 1) { cur = vis[0]; continue; }
        b.children = vis.map(function (e) { return box(e, path, depth + 1, b); });
        break;
      }
      b.key = b.moves[0].path;
      return b;
    }
    var roots = visibleEdges(gph.nodes[gph.rootKey]).map(function (e) { return box(e, [], 0, null); });
    var firstPathOf = {};
    moves.forEach(function (m) { if (!firstPathOf[m.key]) firstPathOf[m.key] = m.path; });
    return { roots: roots, moves: moves, firstPathOf: firstPathOf };
  }

  function moveText(mv, first) {
    return (mv.ply % 2 === 0 ? (Math.floor(mv.ply / 2) + 1) + '.' : (first ? (Math.floor(mv.ply / 2) + 1) + '...' : '')) + mv.edge.san;
  }

  function treeShellHtml() {
    var f = store.settings.tfilter;
    return '<div class="line-head"><h2>Opening tree</h2><span class="chip">' + GRAPHS[S.cid].lines.length + ' lines</span></div>' +
      '<div class="tree-tools"><div class="seg" role="group" aria-label="Filter">' +
      [['core', 'Core'], ['common', 'Common practical replies'], ['advanced', 'Advanced (full)']].map(function (o) { return '<button data-act="tfilter" data-v="' + o[0] + '" aria-pressed="' + (f === o[0]) + '">' + o[1] + '</button>'; }).join('') +
      '</div><label class="muted" for="tdepth">Depth</label><select id="tdepth" class="sel" style="width:auto" data-act="tdepth">' + [2, 3, 4, 5, 6, 8, 99].map(function (d) { return '<option value="' + d + '"' + (store.settings.tdepth === d ? ' selected' : '') + '>' + (d === 99 ? 'All levels' : d + ' levels') + '</option>'; }).join('') + '</select>' +
      '<div class="seg"><button data-act="zoom" data-v="-1" aria-label="Zoom out">-</button><button data-act="zoom" data-v="0" aria-label="Reset zoom">100%</button><button data-act="zoom" data-v="1" aria-label="Zoom in">+</button></div>' +
      '<button class="btn small ghost" data-act="texpand">Expand all</button><button class="btn small ghost" data-act="tcollapse">Collapse all</button></div>' +
      '<div class="tree-legend"><span><i style="background:var(--opp-node)"></i>Opponent\'s choice</span><span><i style="background:var(--learner-node)"></i>Your move</span><span><i style="background:var(--green);border-radius:50%;width:8px;height:8px"></i>Recommended</span><span>Hover or tap a move for its idea; click loads the exact position.</span></div>' +
      '<div class="tree-scroll" id="tree-scroll"><div id="tree-size" style="position:relative"><div class="tree-canvas" id="tree-canvas"></div></div></div>' +
      '<div id="tcard" aria-live="polite"><div class="tcard"><span class="muted">Hover or tap any move in the tree to see its idea, the threat, the response and one thing to avoid.</span></div></div>' +
      '<div class="field"><span class="lbl">Moves on the board</span><div class="movelist" id="movelist" style="max-height:120px">' + moveListHtml() + '</div></div>';
  }

  function textW(s) { return s.length * 7.6 + 10; }

  function treeRender(force) {
    var sig = S.cid + '|' + store.settings.tfilter + '|' + store.settings.tdepth + '|' + JSON.stringify(T.collapsed) + '|' + T.scale + '|' + store.settings.theme;
    var canvas = $('tree-canvas');
    if (!canvas) return;
    if (!force && sig === T.sig && canvas.childNodes.length) { treeSync(); return; }
    T.sig = sig;
    T.model = buildTreeModel();
    var rowH = 46, gap = 30, row = 0, nodesHtml = '', svg = '', maxX = 0;
    var maxDepth = store.settings.tdepth;
    function layout(b, x) {
      var first = true, w = 10;
      b.labels = b.moves.map(function (m, i) { var t = moveText(m, i === 0); w += textW(t); return t; });
      var leafName = '';
      if (b.leaf && b.leaf.leafOf.length) leafName = lineById(b.leaf.leafOf[0]).name;
      if (leafName) w += Math.min(220, leafName.length * 6.2) + 8;
      if (b.xpos) w += 96;
      var hasKids = b.children.length > 0;
      var collapsed = T.collapsed[b.key] != null ? T.collapsed[b.key] : (b.depth + 1 >= maxDepth);
      if (hasKids) w += 26;
      b.x = x; b.w = w; b.collapsed = hasKids && collapsed; b.leafName = leafName;
      if (hasKids && !b.collapsed) {
        b.children.forEach(function (c) { layout(c, x + w + gap); if (first) { b.row = c.row; first = false; } });
      } else b.row = row++;
      maxX = Math.max(maxX, x + w);
    }
    var x0 = 12;
    T.model.roots.forEach(function (r) { layout(r, x0); });
    function emit(b) {
      var y = 14 + b.row * rowH;
      var inner = b.moves.map(function (m, i) {
        return '<button class="tm' + (m.edge.rec ? ' rec' : '') + '" data-act="tmove" data-idx="' + m.idx + '" title="' + esc(m.edge.isLearner ? (m.edge.rec ? 'Recommended' : 'Playable alternative') : TIER_LABEL[m.edge.tier]) + '">' + esc(b.labels[i]) + '</button>';
      }).join('');
      if (b.leafName) inner += '<span class="tname" title="' + esc(b.leafName) + '">' + esc(b.leafName) + '</span>';
      if (b.xpos) inner += '<button class="xpos" data-act="txpos" data-key="' + esc(b.xpos) + '">transposes &rsaquo;</button>';
      if (b.children.length) inner += '<button class="tog" data-act="ttoggle" data-key="' + esc(b.key) + '" aria-label="' + (b.collapsed ? 'Expand' : 'Collapse') + ' branch">' + (b.collapsed ? '+' : '-') + '</button>';
      nodesHtml += '<div class="tnode ' + b.kind + '" data-box="' + b.id + '" style="left:' + b.x + 'px;top:' + y + 'px;width:' + b.w + 'px">' + inner + '</div>';
      if (b.children.length && !b.collapsed) {
        b.children.forEach(function (c) {
          var cy = 14 + c.row * rowH + 17, py = y + 17, px = b.x + b.w, cx = c.x;
          svg += '<path d="M' + px + ',' + py + ' C' + (px + 16) + ',' + py + ' ' + (cx - 16) + ',' + cy + ' ' + cx + ',' + cy + '" fill="none" stroke="#7d7a76" stroke-width="1.6"/>';
          emit(c);
        });
      }
    }
    T.model.roots.forEach(emit);
    var H = 14 + row * rowH + 10, W = maxX + 24;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    canvas.style.transform = 'scale(' + T.scale + ')';
    $('tree-size').style.width = W * T.scale + 'px';
    $('tree-size').style.height = H * T.scale + 'px';
    canvas.innerHTML = '<svg width="' + W + '" height="' + H + '">' + svg + '</svg>' + nodesHtml;
    treeSync(true);
  }

  function treeSync(scrollIntoView) {
    var canvas = $('tree-canvas');
    if (!canvas || !T.model) return;
    var hist = S.moves.slice(0, S.view).map(function (m) { return m.san; }).join(' ');
    var curKey = keyAt(S.view);
    var target = null;
    T.model.moves.forEach(function (m) { if (m.path === hist) target = m; });
    if (!target && curKey) T.model.moves.forEach(function (m) { if (!target && m.key === curKey) target = m; });
    canvas.querySelectorAll('.tm.cur').forEach(function (el) { el.classList.remove('cur'); });
    canvas.querySelectorAll('.tnode.on-path').forEach(function (el) { el.classList.remove('on-path'); });
    if (!target) return;
    var b = target.box;
    while (b) { var el = canvas.querySelector('[data-box="' + b.id + '"]'); if (el) el.classList.add('on-path'); b = b.parent; }
    var btn = canvas.querySelector('[data-idx="' + target.idx + '"]');
    if (btn) {
      btn.classList.add('cur');
      if (scrollIntoView !== false) {
        var sc = $('tree-scroll');
        var bx = (btn.parentNode.offsetLeft + btn.offsetLeft) * T.scale, by = btn.parentNode.offsetTop * T.scale;
        if (bx < sc.scrollLeft + 20 || bx > sc.scrollLeft + sc.clientWidth - 80) sc.scrollLeft = bx - sc.clientWidth / 3;
        if (by < sc.scrollTop + 10 || by > sc.scrollTop + sc.clientHeight - 50) sc.scrollTop = by - sc.clientHeight / 3;
      }
    } else if (scrollIntoView !== false) {
      // move hidden inside a collapsed branch: expand the chain
      var bb = target.box.parent, changed = false;
      while (bb) { if (bb.collapsed) { T.collapsed[bb.key] = false; changed = true; } bb = bb.parent; }
      if (changed) treeRender(true);
    }
  }

  function treeCard(mv, anchor) {
    var box = $('tcard');
    if (!box) return;
    if (!mv) { box.innerHTML = '<div class="tcard"><span class="muted">Hover or tap any move in the tree to see its idea, the threat, the response and one thing to avoid.</span></div>'; T.cardFor = null; return; }
    T.cardFor = mv;
    var e = mv.edge, a = e.ann || {}, c = course();
    var gph = graph();
    var child = gph.nodes[e.toKey];
    var rows;
    if (!e.isLearner) {
      var resp = recEdgeAt(child);
      rows = [['Idea', a.what], ['Threat', a.threat], ['Response', resp ? moveLabel(mv.ply + 1, resp.san) + ((resp.ann && resp.ann.idea) ? ': ' + resp.ann.idea : '') : (child.edges.length ? '' : 'End of the curated line.')], ['One thing to avoid', a.avoid || (resp && resp.ann && resp.ann.mistake)]];
    } else {
      rows = [['Idea', a.idea], ['Threat', a.watch], ['Response', a.plan], ['One thing to avoid', a.mistake]];
    }
    var tag = e.isLearner ? (e.rec ? 'Recommended' : (a.label || 'Playable alternative')) : (a.label || TIER_LABEL[e.tier]);
    var linesHere = e.lines.map(function (id) { return id; }).join(', ');
    box.innerHTML = '<div class="tcard" aria-label="Move details"><h4>' + esc(moveLabel(mv.ply, e.san)) + ' <span class="chip">' + esc(tag) + '</span></h4>' +
      '<dl>' + rows.filter(function (x) { return x[1]; }).map(function (x) { return '<dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd>'; }).join('') + '</dl>' +
      '<div class="muted">' + (e.isLearner ? 'Your move' : (c.side === 'w' ? 'Black' : 'White') + '\'s choice') + ' . lines ' + esc(linesHere) + '</div>' +
      '<div class="btn-row"><button class="btn small primary" data-act="tplay" data-idx="' + mv.idx + '">Play from here</button><button class="btn small" data-act="tdrill" data-idx="' + mv.idx + '">Drill this line</button></div></div>';
  }

  // ------------------------------------------------------------------- home
  function staticBoard(fen, flip) {
    var g = new Chess(fen), html = '<div class="squares" style="position:relative;inset:auto;width:100%;height:100%">';
    for (var i = 0; i < 64; i++) {
      var x = i % 8, y = Math.floor(i / 8);
      var f = flip ? 7 - x : x, r = flip ? y : 7 - y;
      var sq = 'abcdefgh'[f] + (r + 1);
      var p = g.get(sq);
      html += '<div class="sq ' + ((f + r) % 2 === 0 ? 'd' : 'l') + '">' + (p ? '<img alt="" style="width:100%;height:100%;display:block" src="' + PIECES[p.color + p.type.toUpperCase()] + '">' : '') + '</div>';
    }
    return html + '</div>';
  }

  function coverageHtml() {
    function oppSans(cid, path) {
      var gph = GRAPHS[cid], n = gph.nodes[gph.rootKey];
      var list = path ? path.split(' ') : [];
      for (var i = 0; i < list.length && n; i++) {
        var e = null;
        n.edges.forEach(function (x) { if (x.san === list[i]) e = x; });
        n = e ? gph.nodes[e.toKey] : null;
      }
      return n ? n.edges.filter(function (e) { return !e.isLearner; }).map(function (e) { return e.san; }) : [];
    }
    function table(rows, head) {
      return '<table class="guide-table"><thead><tr><th>' + head[0] + '</th><th>' + head[1] + '</th></tr></thead><tbody>' + rows.map(function (r) {
        return '<tr><td>' + r[0].map(function (m) { return '<span class="chip">' + esc(m) + '</span>'; }).join(' ') + '</td><td>' + r[1].map(function (cid) { return '<button class="movechip" data-act="open-course" data-cid="' + cid + '">' + esc(courseById(cid).name) + '</button>'; }).join(' ') + '</td></tr>';
      }).join('') + '</tbody></table>';
    }
    function group(entries) {
      var byKey = {};
      entries.forEach(function (e) { var k = e[1].join('|'); (byKey[k] = byKey[k] || { moves: [], cids: e[1] }).moves.push(e[0]); });
      return Object.keys(byKey).map(function (k) { return [byKey[k].moves, byKey[k].cids]; });
    }
    var black = {};
    COURSES.filter(function (c) { return c.side === 'b'; }).forEach(function (c) {
      oppSans(c.id, '').forEach(function (m) { (black[m] = black[m] || []).push(c.id); });
    });
    var white = {};
    COURSES.filter(function (c) { return c.side === 'w'; }).forEach(function (c) {
      oppSans(c.id, 'e4').forEach(function (m) {
        var label = '1...' + m;
        if (m === 'e5') {
          var afterNf3 = oppSans(c.id, 'e4 e5 Nf3');
          if (oppSans(c.id, 'e4 e5 Nc3').length) label = '1...e5 (2.Nc3)';
          else if (afterNf3.length) {
            afterNf3.forEach(function (m2) {
              var l2 = m2 === 'Nc6' ? '1...e5 2.Nf3 Nc6' : '1...e5 2.Nf3 ' + m2;
              (white[l2] = white[l2] || []).indexOf(c.id) < 0 && white[l2].push(c.id);
            });
            return;
          }
        }
        (white[label] = white[label] || []).indexOf(c.id) < 0 && white[label].push(c.id);
      });
    });
    var bRows = group(Object.keys(black).map(function (m) { return ['1.' + m, black[m]]; }));
    var wRows = group(Object.keys(white).map(function (m) { return [m, white[m]]; }));
    return '<h2 class="section-title">Your repertoire at a glance</h2><p class="section-sub">Built live from the course data: every first move below has a prepared answer. Click a course to open it.</p>' +
      '<div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(320px,1fr))"><div class="card" style="cursor:auto"><h3><span class="side-dot b"></span>When you play Black: White opens with...</h3>' + table(bRows, ['White plays', 'Your course']) + '</div>' +
      '<div class="card" style="cursor:auto"><h3><span class="side-dot w"></span>When you play White: after 1.e4, Black replies...</h3>' + table(wRows, ['Black plays', 'Your course']) + '</div></div>';
  }

  function renderHome() {
    var app = $('app');
    var cards = COURSES.map(function (c) {
      var g = new Chess();
      c.identity.split(' ').forEach(function (m) { g.move(m); });
      var pr = courseProgress(c.id);
      var pct = pr.total ? Math.round(100 * (pr.mastered * 1 + (pr.seen - pr.mastered) * 0.4) / pr.total) : 0;
      return '<button class="card" data-act="open-course" data-cid="' + c.id + '" aria-label="Open the ' + esc(c.name) + ' course">' +
        '<div class="mini-board">' + staticBoard(g.fen(), c.side === 'b') + '</div>' +
        '<h3><span class="side-dot ' + c.side + '"></span>' + esc(c.name) + '</h3>' +
        '<div class="meta">You play ' + (c.side === 'w' ? 'White' : 'Black') + ' . ' + pr.lines + ' lines . ' + esc(c.display || c.identity.split(' ').map(function (s, i) { return (i % 2 === 0 ? (i / 2 + 1) + '.' : '') + s; }).join(' ')) + '</div>' +
        '<p>' + esc(c.blurb) + '</p>' + suitHtml(c) +
        '<div class="field"><span class="lbl">Your progress: ' + pr.seen + '/' + pr.total + ' decisions seen, ' + pr.mastered + ' mastered</span><div class="progress"><i style="width:' + pct + '%"></i></div></div></button>';
    }).join('');
    var ok = SELFTEST.every(function (r) { return r.ok; }) && DIAG.errors.length === 0;
    var guide = '<table class="guide-table"><thead><tr><th>Opening</th><th>You play</th><th>Elo sweet spot</th><th>Best time controls</th><th>Why</th></tr></thead><tbody>' +
      COURSES.map(function (c) {
        return '<tr><td><b>' + esc(c.name) + '</b></td><td>' + (c.side === 'w' ? 'White' : 'Black') + '</td><td><span class="chip elo">' + esc(c.suit.elo) + '</span></td><td>' + c.suit.tc.map(function (t) { return '<span class="chip tc">' + esc(t) + '</span>'; }).join(' ') + '</td><td style="color:var(--text-2)">' + esc(c.suit.why) + '</td></tr>';
      }).join('') + '</tbody></table>';
    var heroFen = '';
    var hg = new Chess();
    'e4 e5 Nc3 Nf6 f4 d5'.split(' ').forEach(function (m) { hg.move(m); });
    heroFen = hg.fen();
    app.innerHTML = '<div class="home">' +
      '<section class="hero"><div><h1>Learn openings by playing them.</h1><p>Opening Lab drills a complete beginner-friendly repertoire (1.e4 as White; the Caro-Kann or the Sicilian, the Slav and one simple setup against everything else as Black) against an opponent that only plays real book moves. A branching tree shows every reply, each decision explains the idea, and Stockfish in your browser shows who is winning after every move.</p>' +
      '<div class="btn-row"><button class="btn primary" data-act="open-course" data-cid="' + (store.settings.course || 'vienna') + '">' + (store.settings.course ? 'Continue: ' + esc(courseById(store.settings.course).name) : 'Start here: the Vienna Game') + '</button>' +
      '<button class="selftest-badge" data-act="selftest" title="Open the self-test report">' + (ok ? '<span class="ok">&#10003;</span>' : '<span class="bad">!</span>') + ' ' + DIAG.linesOk + '/' + DIAG.lines + ' lines validated; ' + DIAG.illegalEdges + ' illegal edges; ' + DIAG.unreachable + ' unreachable lessons</button></div></div>' +
      '<div class="hero-board">' + staticBoard(heroFen, false) + '</div></section>' +
      '<section class="how" aria-label="How it works"><div><b>1</b><h3>Pick a course</h3><p>One for White, one for Black against 1.e4, then the others when you meet them.</p></div>' +
      '<div><b>2</b><h3>Learn the core lines</h3><p>In Learn &amp; Explore the green arrow shows your move and a card explains why. Your path lists which line to learn next.</p></div>' +
      '<div><b>3</b><h3>Practice</h3><p>The Practice tab quizzes you, weak spots first. New positions are shown to you before they are tested.</p></div></section>' +
      '<h2 class="section-title">Choose a course</h2><p class="section-sub">Built for roughly 500-900 rapid players who want to understand the replies they actually meet, not memorise 30 moves of grandmaster theory.</p>' +
      '<div class="cards">' + cards + '</div>' +
      coverageHtml() +
      '<h2 class="section-title">Which opening suits you?</h2><p class="section-sub">A high-level guide by rating band and time control. Coach\'s guidance, not statistics: no win rates or popularity numbers are claimed.</p>' + guide +
      '<p class="footnote">The book opponent plays only curated, validated moves and never an engine; evaluations, the eval bar, move labels and accuracy come from Stockfish 19 lite running locally in your browser, and are labelled as such. Rules by chess.js 1.4.0 (BSD-2). Engine: <a href="https://github.com/nmrugg/stockfish.js" target="_blank" rel="noopener">Stockfish.js</a> (GPL-3.0). Pieces: cburnett (CC BY-SA 3.0). Progress is stored only in this browser. Not affiliated with any chess site.</p></div>';
  }

  // ------------------------------------------------------------- course view
  function openCourse(cid, tab) {
    if (!courseById(cid)) cid = 'vienna';
    if (S) cancelPending();
    APP.view = 'course';
    APP.cid = cid;
    APP.tab = tab || APP.tab || 'learn';
    store.settings.course = cid; save();
    P = { active: false };
    S = newSession(cid);
    T.collapsed = {}; T.sig = '';
    renderTopbar();
    var app = $('app');
    app.innerHTML = '<main class="course" id="course">' +
      '<section class="board-col" aria-label="Board">' +
      '<div class="player-bar" id="pb-top"></div>' +
      '<div class="board-wrap"><div class="evalbar" id="evalbar" role="img"><div class="fill"></div><span class="lbl"></span></div><div class="board-size"><div class="board" id="board" tabindex="0" role="application"></div></div></div>' +
      '<div class="player-bar" id="pb-bot"></div>' +
      '<div class="board-tools"><div class="nav-row" style="flex:1;max-width:100%;grid-template-columns:repeat(5,1fr)">' +
      '<button class="btn" id="nav-flip" data-act="flip" aria-label="Flip board" title="Flip board (F)">' + ICON.flip + '</button>' +
      '<button class="btn" id="nav-first" data-act="nav-first" aria-label="First move">' + ICON.first + '</button>' +
      '<button class="btn" id="nav-prev" data-act="nav-prev" aria-label="Previous move" title="Previous (Left arrow)">' + ICON.prev + '</button>' +
      '<button class="btn" id="nav-next" data-act="nav-next" aria-label="Next move" title="Next (Right arrow)">' + ICON.next + '</button>' +
      '<button class="btn" id="nav-last" data-act="nav-last" aria-label="Last move">' + ICON.last + '</button></div></div>' +
      '</section>' +
      '<aside class="sidebar" aria-label="Training panel"><div class="side-tabs" role="tablist">' +
      [['learn', 'Learn & Explore', ICON.learn], ['tree', 'Opening Tree', ICON.tree], ['practice', 'Practice', ICON.practice]].map(function (t) {
        return '<button class="side-tab" role="tab" data-act="tab" data-tab="' + t[0] + '" aria-selected="' + (APP.tab === t[0]) + '">' + t[2] + t[1] + '</button>';
      }).join('') + '</div><div class="side-body" id="side"></div></aside></main>';
    initBoard();
    render();
    continueFlow();
    setHash();
  }

  function setTab(tab) {
    APP.tab = tab;
    var side = $('side');
    if (side) side.innerHTML = '';
    T.sig = '';
    render();
    sizeBoard();
    setHash();
  }

  function setHash() {
    var h = APP.view === 'home' ? '#/' : '#/' + APP.cid + '/' + APP.tab;
    if (location.hash !== h) { APP.ignoreHash = true; location.hash = h; }
  }

  function renderTopbar() {
    var tb = $('topbar');
    tb.innerHTML = '<button class="brand" data-act="home" aria-label="Opening Lab home"><img alt="" src="' + PIECES.wN + '"><span>Opening</span><em>Lab</em></button>' +
      '<nav class="course-tabs" aria-label="Courses">' + COURSES.map(function (c) {
        return '<button class="ctab" data-act="open-course" data-cid="' + c.id + '" aria-current="' + (APP.view === 'course' && APP.cid === c.id) + '"><span class="side-dot ' + c.side + '"></span>' + esc(c.short) + '</button>';
      }).join('') + '</nav>' +
      '<div class="top-actions">' +
      '<button class="icon-btn" data-act="toggle-coords" aria-pressed="' + store.settings.coords + '" aria-label="Show coordinates" title="Coordinates">' + ICON.coords + '</button>' +
      '<button class="icon-btn" data-act="toggle-sound" aria-pressed="' + store.settings.sound + '" aria-label="Move sounds" title="Move sounds">' + ICON.sound + '</button>' +
      '<button class="icon-btn" data-act="toggle-theme" aria-label="Switch to ' + (store.settings.theme === 'dark' ? 'light' : 'dark') + ' theme" title="Theme">' + (store.settings.theme === 'dark' ? ICON.sun : ICON.moon) + '</button></div>';
  }

  function goHome() {
    if (S) cancelPending();
    APP.view = 'home';
    S = null;
    P = { active: false };
    renderTopbar();
    renderHome();
    setHash();
    window.scrollTo(0, 0);
  }

  // --------------------------------------------------------------- dialogs
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3600);
  }
  function announce(msg) { var l = $('live'); if (l) l.textContent = msg; }
  function confetti() {
    if (reducedMotion) return;
    var box = document.createElement('div');
    box.className = 'confetti';
    var colors = ['#81b64c', '#f7c631', '#5c9ded', '#fa412d', '#ffffff', '#ffa459'];
    var html = '';
    for (var i = 0; i < 60; i++) html += '<i style="left:' + (Math.random() * 100) + '%;background:' + colors[i % colors.length] + ';animation-delay:' + (Math.random() * 0.5) + 's;animation-duration:' + (1.1 + Math.random() * 0.9) + 's"></i>';
    box.innerHTML = html;
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 2600);
  }
  function modal(html) {
    var m = document.createElement('div');
    m.className = 'modal-back';
    m.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '<div class="btn-row"><button class="btn" data-close>Close</button></div></div>';
    m.addEventListener('click', function (e) { if (e.target === m || e.target.hasAttribute('data-close')) m.remove(); });
    document.body.appendChild(m);
    var b = m.querySelector('[data-close]');
    if (b) b.focus();
    return m;
  }
  function showSelftest() {
    var rows = SELFTEST.map(function (r) { return '<li><b style="color:' + (r.ok ? 'var(--green)' : 'var(--red)') + '">' + (r.ok ? 'PASS' : 'FAIL') + '</b><span>' + esc(r.name) + (r.detail ? ' (' + esc(r.detail) + ')' : '') + '</span></li>'; }).join('');
    var per = COURSES.map(function (c) { return esc(c.short) + ': ' + GRAPHS[c.id].lines.length + ' lines, ' + Object.keys(GRAPHS[c.id].nodes).length + ' positions'; }).join(' . ');
    modal('<h2>Self-test report</h2><p class="muted">Computed in your browser when the page loaded, using the same opening graph the trainer uses. Nothing here is hardcoded.</p>' +
      '<p><b>' + DIAG.linesOk + '/' + DIAG.lines + ' lines validated; ' + DIAG.illegalEdges + ' illegal edges; ' + DIAG.unreachable + ' unreachable lessons</b><br><span class="muted">' + DIAG.nodes + ' positions, ' + DIAG.edges + ' book moves, ' + DIAG.transpositions + ' transpositions merged. ' + per + '</span></p>' +
      '<ul>' + rows + '</ul>' + (DIAG.errors.length ? '<pre>' + esc(DIAG.errors.join('\n')) + '</pre>' : '') +
      '<p class="muted">Engine: ' + esc(Engine.state === 'off' ? 'not started yet' : Engine.state) + '.</p>');
  }

  // ---------------------------------------------------------------- events
  function act(name, el, ev) {
    switch (name) {
      case 'home': goHome(); break;
      case 'open-course': openCourse(el.getAttribute('data-cid'), APP.view === 'course' ? APP.tab : 'learn'); break;
      case 'tab': setTab(el.getAttribute('data-tab')); break;
      case 'goto-course': {
        var path = S.moves.map(function (m) { return m.san; }).join(' ');
        openCourse(el.getAttribute('data-cid'), 'learn');
        loadPath(path, { run: true });
        break;
      }
      case 'toggle-theme': store.settings.theme = store.settings.theme === 'dark' ? 'light' : 'dark'; save(); applyTheme(); renderTopbar(); if (APP.view === 'course') { T.sig = ''; render(); } break;
      case 'toggle-coords': store.settings.coords = !store.settings.coords; save(); renderTopbar(); if (S) drawBoard(); break;
      case 'toggle-sound': store.settings.sound = !store.settings.sound; save(); renderTopbar(); break;
      case 'toggle-engine': store.settings.engine = !store.settings.engine; save(); render(); break;
      case 'toggle-arrow': store.settings.arrow = !store.settings.arrow; save(); render(); break;
      case 'selftest': showSelftest(); break;
      case 'flip': S.userFlip = !S.userFlip; render(); break;
      case 'nav-first': S.view = 0; S.sel = null; render(); break;
      case 'nav-prev': if (S.view > 0) { S.view--; S.sel = null; render(); } break;
      case 'nav-next': if (S.view < S.moves.length) { S.view++; S.anim = { ply: S.view, from: S.moves[S.view - 1].from, to: S.moves[S.view - 1].to, flags: S.moves[S.view - 1].flags, color: S.moves[S.view - 1].color }; S.sel = null; render(); if (isLive()) continueFlow(); } break;
      case 'nav-last': S.view = S.moves.length; S.sel = null; render(); continueFlow(); break;
      case 'goto': S.view = +el.getAttribute('data-ply'); S.sel = null; render(); if (isLive()) continueFlow(); break;
      case 'undo': undo(); break;
      case 'restart': restart(); break;
      case 'keypos': restart({ key: true }); break;
      case 'newvar': newVariation(); break;
      case 'replay': replayLine(S.completed ? S.completed.id : S.lastLine); break;
      case 'explore': exploreFreely(); break;
      case 'back-lesson': backToLesson(); break;
      case 'show-alts': S.showAlts = !S.showAlts; render(); break;
      case 'resume': S.paused = false; S.note = null; render(); continueFlow(); break;
      case 'hint':
        if (!S.showHint) { S.showHint = true; render(); }
        break;
      case 'plan': S.showPlan = !S.showPlan; render(); break;
      case 'style':
        if (el.getAttribute('data-v') === 'surprise') { S.forced = null; toast('Surprise me: the opponent picks among book replies.'); }
        else { var ctx = lineContext(); S.forced = S.lastLine || (ctx && ctx.def.id); toast('The opponent will repeat ' + (lineById(S.forced) ? lineById(S.forced).name : 'this line') + '.'); }
        S.forcedNoted = false;
        render();
        break;
      case 'play-edge': {
        var n = curNode();
        if (!n || !isLive()) break;
        var uci = el.getAttribute('data-uci');
        var e = null;
        n.edges.forEach(function (x) { if (x.uci === uci) e = x; });
        if (S.mode === 'oob') { var bi = lastBookIndex(); truncateTo(bi); S.mode = 'book'; n = curNode(); n.edges.forEach(function (x) { if (x.uci === uci) e = x; }); }
        if (e) onUserMove(e.from, e.to, e.promotion);
        break;
      }
      case 'lshow': store.settings.lshow = el.getAttribute('data-v') === '1'; save(); render(); break;
      case 'learn-line': {
        var lid = el.getAttribute('data-id');
        if (P.active) stopPracticeSilently();
        S.forced = lid; S.forcedNoted = false;
        if (APP.tab !== 'learn') { APP.tab = 'learn'; setTab('learn'); }
        var LL = gLine(S.cid, lid), known = cprog(S.cid).learned, cut = 0;
        for (var li = 0; li < LL.sans.length; li++) {
          var lnode = graph().nodes[LL.path[li]];
          if (lnode.turn === course().side && !known[lnode.key]) { cut = li; break; }
        }
        if (cut > 0) {
          loadPath(LL.sans.slice(0, cut).join(' '), { run: true });
          S.note = 'Moves up to here are the same as lines you already know, so this line starts where it is new. Step back with the arrows to see how you got here.';
          render();
          toast('Learning ' + lineById(lid).name + ', from the first move that is new to you.');
        } else {
          restart();
          toast('Learning ' + lineById(lid).name + '. The opponent follows this line.');
        }
        break;
      }
      case 'pmode': store.settings.pmode = el.getAttribute('data-v'); save(); render(); break;
      case 'pstartfrom': store.settings.pstart = el.getAttribute('data-v'); save(); render(); break;
      case 'plen': store.settings.plen = +el.getAttribute('data-v'); save(); render(); break;
      case 'pstart': startPractice(); break;
      case 'pstop': stopPractice(); break;
      case 'pcontinue': practiceContinue(); break;
      case 'phint': P.revealed = true; render(); break;
      case 'prestart-line': P.awaiting = false; P.answered = null; practiceStartLine(); break;
      case 'pnew-line': P.awaiting = false; P.answered = null; practiceNextLine(true); break;
      case 'loadpath': stopPracticeSilently(); APP.tab = 'learn'; loadPath(el.getAttribute('data-path'), { run: false }); setTab('learn'); break;
      case 'reset-progress':
        if (window.confirm('Reset all saved practice progress for the ' + course().name + '? This cannot be undone.')) { delete store.courses[S.cid]; save(); render(); toast('Progress reset.'); }
        break;
      case 'tfilter': store.settings.tfilter = el.getAttribute('data-v'); save(); $('side').innerHTML = ''; T.sig = ''; render(); break;
      case 'zoom': { var v = +el.getAttribute('data-v'); T.scale = v === 0 ? 1 : clamp(T.scale + v * 0.15, 0.4, 1.6); treeRender(true); break; }
      case 'texpand': T.model.moves.forEach(function (m) { T.collapsed[m.box.key] = false; }); treeRender(true); break;
      case 'tcollapse': T.model.roots.forEach(function (r) { (function walk(b) { if (b.children.length) T.collapsed[b.key] = b.depth >= 1; b.children.forEach(walk); })(r); }); treeRender(true); break;
      case 'ttoggle': { var k = el.getAttribute('data-key'); var cur = el.textContent === '+'; T.collapsed[k] = !cur; treeRender(true); break; }
      case 'tmove': {
        var mv = T.model.moves[+el.getAttribute('data-idx')];
        if (P.active) stopPracticeSilently();
        loadPath(mv.path, { run: false });
        var btn = $('tree-canvas').querySelector('[data-idx="' + mv.idx + '"]');
        if (btn) treeCard(mv, btn);
        break;
      }
      case 'txpos': {
        var key = el.getAttribute('data-key');
        var path = T.model.firstPathOf[key];
        if (path) {
          loadPath(path, { run: false });
          treeSync(true);
          var tm = null; T.model.moves.forEach(function (m) { if (m.path === path) tm = m; });
          var b2 = tm && $('tree-canvas').querySelector('[data-idx="' + tm.idx + '"]');
          if (b2) treeCard(tm, b2);
        }
        break;
      }
      case 'tplay': { var m2 = T.model.moves[+el.getAttribute('data-idx')]; treeCard(null); loadPath(m2.path, { run: true }); setTab('learn'); break; }
      case 'tdrill': {
        var m3 = T.model.moves[+el.getAttribute('data-idx')];
        treeCard(null);
        P = { active: false, scopePick: m3.edge.lines[0] };
        setTab('practice');
        startPractice();
        break;
      }
      case 'tclose': treeCard(null); break;
      default: break;
    }
  }

  function stopPracticeSilently() { if (P.active) { P = { active: false, scopePick: P.scopePick }; } }

  function onChange(e) {
    var el = e.target;
    var a = el.getAttribute('data-act');
    if (a === 'pick-line') {
      if (el.value) { S.forced = el.value; S.forcedNoted = false; restart(); toast('Playing ' + lineById(el.value).name + '. The opponent follows this line.'); }
      else { S.forced = null; render(); }
    } else if (a === 'pscope') {
      P.scopePick = el.value || 'all';
    } else if (a === 'tdepth') {
      store.settings.tdepth = +el.value; save(); T.collapsed = {}; treeRender(true);
    }
  }

  function applyTheme() { document.documentElement.setAttribute('data-theme', store.settings.theme); }

  function route() {
    var h = (location.hash || '').replace(/^#\/?/, '').split('/');
    if (h[0] && courseById(h[0])) {
      var tab = ['learn', 'tree', 'practice'].indexOf(h[1]) >= 0 ? h[1] : 'learn';
      if (APP.view === 'course' && APP.cid === h[0]) { if (APP.tab !== tab) setTab(tab); }
      else openCourse(h[0], tab);
    } else goHome();
  }

  function init() {
    applyTheme();
    renderTopbar();
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-act]');
      if (!el || el.tagName === 'SELECT') return;
      if (el.disabled) return;
      var a = el.getAttribute('data-act');
      if (a === 'tmove' || a === 'txpos') T.pinned = true;
      act(a, el, e);
    });
    document.addEventListener('change', onChange);
    document.addEventListener('toggle', function (e) {
      if (!e.target.hasAttribute) return;
      if (e.target.hasAttribute('data-review')) APP.reviewOpen = e.target.open;
      if (e.target.hasAttribute('data-keep')) APP.open[e.target.getAttribute('data-keep')] = e.target.open;
    }, true);
    document.addEventListener('click', function (e) {
      var g = e.target.closest && e.target.closest('#evalgraph');
      if (!g || !S) return;
      var r = g.getBoundingClientRect();
      var n = +g.getAttribute('data-n');
      S.view = clamp(Math.round((e.clientX - r.left) / r.width * n), 0, S.moves.length);
      render();
    });
    var hoverTimer = null;
    document.addEventListener('mouseover', function (e) {
      var el = e.target.closest && e.target.closest('.tm');
      if (!el || !T.model) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { treeCard(T.model.moves[+el.getAttribute('data-idx')], el); }, 280);
    });
    document.addEventListener('mouseout', function (e) {
      var el = e.target.closest && e.target.closest('.tm');
      if (el) clearTimeout(hoverTimer);
    });
    document.addEventListener('pointerdown', function (e) {
      var sc = e.target.closest && e.target.closest('#tree-scroll');
      if (!sc || e.pointerType !== 'mouse' || e.target.closest('button, .tcard')) return;
      var sx = e.clientX, sy = e.clientY, l = sc.scrollLeft, t = sc.scrollTop;
      sc.classList.add('panning');
      function mv(ev) { sc.scrollLeft = l - (ev.clientX - sx); sc.scrollTop = t - (ev.clientY - sy); }
      function up() { sc.classList.remove('panning'); window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); }
      window.addEventListener('pointermove', mv);
      window.addEventListener('pointerup', up);
    });
    document.addEventListener('keydown', function (e) {
      if (APP.view !== 'course' || !S) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'select' || tag === 'textarea' || e.target.id === 'board') return;
      if (document.querySelector('.modal-back')) { if (e.key === 'Escape') document.querySelector('.modal-back').remove(); return; }
      if (e.key === 'ArrowLeft') { act('nav-prev'); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { act('nav-next'); e.preventDefault(); }
      else if (e.key === 'f' || e.key === 'F') act('flip');
      else if (e.key === 'Escape') treeCard(null);
    });
    window.addEventListener('hashchange', function () { if (APP.ignoreHash) { APP.ignoreHash = false; return; } route(); });
    window.addEventListener('resize', sizeBoard);
    route();
    window.OpeningLab = {
      graphs: GRAPHS, diag: DIAG, selftest: SELFTEST,
      state: function () { return S; },
      practice: function () { return P; },
      engine: Engine,
      fen: function () { return S ? posFen(S.view) : null; },
      history: function () { return S ? S.moves.map(function (m) { return m.san; }) : []; }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
