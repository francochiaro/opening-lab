(function (g) {
  g.OL_ANN = g.OL_ANN || {};
  g.OL_ANN.ruy = {
    '@lessons': [
      { title: 'Attack the defender, not the pawn',
        body: 'Bb5 attacks the knight on c6, and that knight is the piece defending e5. The pressure is indirect: it only becomes a real threat once White has castled and protected e4. That is why Bb5 does not win the e5 pawn by itself.' },
      { title: 'Why keep the light-squared bishop',
        body: 'After ...a6 and ...b5 the bishop retreats to a4, b3 and sometimes c2 instead of trading itself for the knight. From b3 or c2 it keeps looking at f7 and the kingside, which is where White usually attacks later. Giving it up early is a choice (the Exchange Variation), not a necessity.' },
      { title: 'Re1, c3 and d4 work together',
        body: 'Re1 protects e4 so your knight and bishop are free. c3 prepares d4, so that when the pawns trade on d4 you can recapture with a pawn and keep a big center. h3 stops ...Bg4 from pinning the f3 knight before you play d4.' }
    ],
    '@plans': {
      R01: 'Play d4 to build the big center, then reroute the queen knight via d2 and f1 to g3. Keep the bishop on b3 or c2 aiming at the kingside.',
      R02: 'With the bishop safe on c2, keep the d4 pawn supported with Nbd2 and Nf1. If Black plays ...cxd4, recapture with the c-pawn and use the open c-file later.',
      R03: 'Your e5 pawn gives space; develop with Nbd2 or Be3 and challenge the strong e4 knight. Watch the d5 pawn: it is a target for Nd4 and Bc2 pressure.',
      R04: 'This is a recognition line only. Black has given a pawn for a kingside attack, so keep your king safe with Be3, Qd3 and Nd2 and do not grab more material.',
      R13: 'Same plans as the Closed Ruy: h3, d4 and Nbd2-f1-g3. The bishop on b3 is already safe from ...Na5 tricks if you answer with Bc2.',
      R12: 'With c3 and d4 in, keep the center and finish development with Nbd2 and h3. Never take on d4 with the queen while ...c5 can trap your bishop.',
      R07: 'You traded into a queenless position where your kingside pawn majority (4 against 3) is healthy. Activate the king and rooks and aim for a pawn endgame plan on the kingside.',
      R05: 'A slow, safe structure: play Nbd2-f1-g3, h3 and perhaps d4 later. Black has no quick way to attack e4.',
      R05B: 'Same quiet plan: Nbd2-f1-g3 and h3. Look for d4 when your pieces support it.',
      R06: 'A queenless position with Black king in the center but holding the bishop pair. Play h3, Nc3 and Rd1, and use your e5 pawn and kingside majority.',
      R08: 'You have more space; keep the tension with Nbd2 and h3. Black is cramped, so avoid releasing the center too early.',
      R09: 'You kept a solid center and safe king. Develop with Bg5 or Be3 and Qe2, and aim at the e5 pawn and the light squares around Black king.',
      R09B: 'A sharp position: look for checks and the a7 knight sortie, and bring your bishop to c4 quickly. Black has active pieces, so calculate every forcing move.',
      R10: 'With the center under control, play Bg5, Nbd2 and h3. Black bishop on b6 bites on d4, so keep d4 well protected.',
      R11: 'Black has a cramped d4 pawn. Play d3, Nd2-f3 and target d4, and use your lead in development.'
    },

    'e4': { idea: 'Take the center and open lines for the queen and the light-squared bishop.', plan: 'Develop the kingside knight next with Nf3.' },
    'e4 e5 Nf3': { idea: 'Develop the knight with tempo: it attacks the e5 pawn at once.', plan: 'If Black defends with ...Nc6, play Bb5 to challenge that defender.' },
    'e4 e5 Nf3 Nc6 Bb5': {
      idea: 'Bb5 attacks the knight that defends e5. This indirect pressure is the core idea of the Ruy Lopez.',
      watch: 'Bb5 does not win e5 yet: after Bxc6 dxc6 Nxe5 Black plays ...Qd4 and wins the pawn back.',
      plan: 'Castle, then support e4 with Re1 before using the pin pressure.',
      arrows: [['b5', 'c6']]
    },

    'e4 e5 Nf3 Nc6 Bb5 a6': {
      what: 'The Morphy Defense: Black asks the bishop what it wants right away.',
      threat: 'Nothing is hanging. Black is preparing ...b5 to gain queenside space with tempo.',
      avoid: 'Do not think you must take on c6 and win e5: after Bxc6 dxc6 Nxe5?, ...Qd4 regains the pawn.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4': {
      idea: 'Keep the bishop and the pin pressure on c6. From a4 it can later retreat to b3, still aiming toward f7.',
      watch: 'If Black plays ...b5, retreat to b3 at once; do not leave the bishop to be trapped.',
      plan: 'Castle next, then Re1 and c3.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6': {
      alt: true, label: 'Playable alternative',
      idea: 'The Exchange Variation gives up the bishop pair for a better pawn structure: Black gets doubled c-pawns.',
      watch: 'Do not grab e5 right away: after ...dxc6 Nxe5?, ...Qd4 hits the knight and the e4 pawn.',
      plan: 'Castle, then play d4 to trade into a structure where your kingside majority matters.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O': {
      idea: 'Castle first so that taking on e5 becomes a real idea later. Your king is safe and the rook comes to e1.',
      watch: 'Black has the bishop pair and open lines; trading into an endgame usually favours your pawn structure.',
      plan: 'Play d4 to open the center and exchange pieces.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6': {
      what: 'Black protects e5 with a pawn, at the cost of weakening the e6 and g6 squares.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4': {
      idea: 'Open the center while Black king is still on e8. Trades help you reach an endgame with a healthy kingside majority.',
      plan: 'After ...exd4, recapture with the knight.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4 Nxd4': {
      idea: 'Recapture with the knight, centralizing it. Now you have four kingside pawns against three.',
      watch: 'Black ...c5 will kick the knight; have a retreat ready on b3 or e2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4 Nxd4 c5 Nb3': {
      idea: 'The knight retreats to b3, where it is safe and still watches c5 and d4.',
      watch: 'Black can offer a queen trade on d1; recapture with the rook to keep the d-file.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4 Nxd4 c5 Nb3 Qxd1 Rxd1': {
      idea: 'Recapture with the rook, which takes the open d-file. The queenless position suits your pawn structure.',
      plan: 'Activate the king and develop the queenside pieces; aim to create a passed pawn on the kingside later.'
    },

    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6': {
      what: 'Black develops and attacks the e4 pawn.',
      threat: 'Black would like to win e4 with ...Nxe4.',
      avoid: 'Do not panic about e4: castling is fine because ...Nxe4 can be met by d4 or Re1.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O': {
      idea: 'Castle quickly. If Black takes on e4, d4 or Re1 wins the pawn back with fast development.',
      plan: 'Play Re1 next to protect e4 directly.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7': {
      what: 'The Closed Ruy Lopez: Black develops and prepares to castle.',
      threat: 'Black is getting ready to take e4 once the pin pressure eases.',
      avoid: 'Do not play Bxc6 and Nxe5 yet: e4 is undefended, so ...Nxe4 or ...Qd4 ideas hit back.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1': {
      idea: 'Re1 protects e4. Now White really threatens Bxc6 followed by Nxe5, because e4 is no longer loose.',
      plan: 'If Black plays ...b5, retreat the bishop to b3.',
      arrows: [['e1', 'e4']]
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5': {
      what: 'Black kicks the bishop to stop the Bxc6 and Nxe5 threat.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3': {
      idea: 'On b3 the bishop is safe and aims straight at f7. This bishop is one of your best pieces, so keep it.',
      watch: 'Black may play ...Na5 to trade it off; then retreat to c2.',
      plan: 'c3 next, preparing d4 and giving the bishop a retreat square on c2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6': {
      what: 'Black supports e5 and opens the c8 bishop.',
      threat: 'Black may play ...Bg4 to pin your f3 knight, or ...Na5 to chase the bishop.',
      avoid: 'Avoid d4 at once without c3: you would not be able to keep a pawn on d4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O': {
      what: 'Black castles first. This move order allows the Marshall Attack with ...d5.',
      threat: 'After c3, Black can sacrifice a pawn with ...d5 for a fast kingside attack.',
      avoid: 'Do not rush d4; play c3 or h3 and know the Marshall ideas.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3': {
      idea: 'c3 prepares d4 and gives the bishop a retreat square on c2.',
      watch: 'If Black plays ...Na5, step back with Bc2 instead of allowing the trade.',
      plan: 'h3 next, so ...Bg4 cannot pin the knight when you push d4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3': {
      idea: 'h3 takes the g4 square from Black bishop, so your f3 knight can keep supporting d4.',
      plan: 'Play d4 next, then Nbd2-f1-g3.',
      mistake: 'Pushing d4 before h3 lets ...Bg4 put pressure on d4 through the pinned knight.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5': {
      what: 'The Chigorin: the knight attacks the b3 bishop and frees the c-pawn to go to c5.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5 Bc2': {
      idea: 'Bc2 keeps the bishop. Thanks to c3 it has this safe square, still aiming at the kingside.',
      plan: 'd4 next to claim the center.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5 Bc2 c5 d4': {
      idea: 'Strike in the center now that the bishop is safe. If Black takes on d4, recapture with the c-pawn.',
      watch: 'Keep d4 protected; Black pieces will pile up against it.',
      plan: 'Nbd2-f1-g3 and a kingside plan.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3': {
      idea: 'The normal move: prepare d4 and give the bishop c2. It also allows the Marshall if Black wants it.',
      plan: 'If Black does not play ...d5, continue with h3 and d4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5': {
      what: 'The Marshall Attack: Black offers the e5 pawn and the d5 pawn for fast development and a kingside attack.',
      threat: 'Black wants open lines and pieces near your king.',
      avoid: 'Accepting is fine, but after you win a pawn do not keep grabbing; defend your king.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5 exd5': {
      label: 'Advanced', idea: 'Accept the gambit. You will be a pawn up and must survive the attack.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5 exd5 Nxd5 Nxe5': {
      idea: 'Take the e5 pawn. The knight on e5 is defended by the rook on e1.',
      watch: 'Black will trade on e5 and gain time against your rook.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5 exd5 Nxd5 Nxe5 Nxe5 Rxe5': {
      idea: 'Recapture with the rook. You are a pawn up, but your queenside pieces are still at home.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5 exd5 Nxd5 Nxe5 Nxe5 Rxe5 c6 d4': {
      idea: 'Gain space and open a diagonal for the c1 bishop, which will help defend the king.',
      watch: 'Black ...Bd6 will hit your rook and point at h2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5 exd5 Nxd5 Nxe5 Nxe5 Rxe5 c6 d4 Bd6 Re1': {
      idea: 'Retreat the rook to safety on e1, where it also guards the back rank.',
      watch: 'Black queen is coming to h4 to attack h2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5 exd5 Nxd5 Nxe5 Nxe5 Rxe5 c6 d4 Bd6 Re1 Qh4 g3': {
      idea: 'g3 blocks the queen and the bishop on d6 from h2.',
      watch: 'Black will play ...Qh3 and look for ...Bg4 or ...Rae8; defend with Be3, Qd3 and Re4 ideas.',
      plan: 'Bring the queenside pieces into defence before thinking of using the extra pawn.'
    },

    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4': {
      what: 'The Open Ruy Lopez: Black takes the e4 pawn.',
      threat: 'Black wants to keep the pawn and develop actively.',
      avoid: 'Do not rush to win the knight; open the center with d4 first.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4': {
      idea: 'Open the center while Black king is still in the middle. You will win the pawn back soon.',
      plan: 'If ...b5, retreat Bb3 and then take on e5.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3': {
      idea: 'Keep the bishop on the a2-g8 diagonal, where it presses on d5 and f7.',
      plan: 'Take on e5 next to regain the pawn.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5': {
      idea: 'Regain the pawn. The e5 pawn gains space and takes the f6 and d6 squares from Black pieces.',
      plan: 'c3 next to give the bishop c2 and to support d4 later.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3': {
      idea: 'c3 gives the bishop a retreat on c2 and controls d4 and b4.',
      plan: 'Nbd2 to challenge the e4 knight, and Bc2.'
    },

    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 b5': {
      what: 'Black kicks the bishop immediately.',
      threat: 'If you are careless, ...Na5 can trade the bishop.',
      avoid: 'Do not leave the bishop on a4 where ...b5 and ...c5 ideas can trap it.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 b5 Bb3': {
      idea: 'Retreat to b3, the bishop best diagonal toward f7.',
      plan: 'Castle and play Re1 and c3, just like the Closed Ruy.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 b5 Bb3 Nf6 O-O': {
      idea: 'Castle; ...Nxe4 can be met by Re1 or d4 with a lead in development.',
      plan: 'Re1 next to protect e4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 b5 Bb3 Nf6 O-O Be7 Re1': {
      idea: 'Re1 protects e4 and frees your pieces.',
      plan: 'c3, h3 and d4 as in the main line.'
    },

    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6': {
      what: 'The Modern Steinitz: Black supports e5 and prepares ...b5 later.',
      threat: 'Noah Ark trap: if you play d4 too early, ...b5 Bb3, ...Nxd4 Nxd4 exd4 Qxd4?? ...c5 traps your bishop.',
      avoid: 'Do not push d4 before c3, and never recapture on d4 with the queen while ...c5 can trap the bishop.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3': {
      idea: 'c3 first, so d4 can be supported by a pawn and the bishop has c2 to retreat to.',
      watch: 'Remember the Noah Ark trap: with the bishop on b3, pawns on b5, c5 and c4 can surround it.',
      plan: 'd4 next.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 Bd7 d4': {
      idea: 'Now d4 is backed by the c3 pawn, so you can recapture with a pawn and keep the center.',
      plan: 'Castle, then Re1 and Nbd2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 Bd7 d4 Nf6 O-O': {
      idea: 'Castle; e4 is safe because ...Nxe4 runs into Re1 with the pin on the e-file.',
      plan: 'Re1 to support e4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 Bd7 d4 Nf6 O-O Be7 Re1': {
      idea: 'Re1 protects e4 and finishes the classic Ruy setup.',
      plan: 'Nbd2-f1-g3 and h3, keeping the center intact.'
    },

    'e4 e5 Nf3 Nc6 Bb5 Nf6': {
      what: 'The Berlin Defense: Black develops and attacks e4 instead of asking the bishop with ...a6.',
      threat: 'Black wants ...Nxe4 if e4 stays loose.',
      avoid: 'Do not try to win e5 with Bxc6 and Nxe5: it does not work and only gives up your bishop.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3': {
      idea: 'A simple, safe answer: d3 protects e4 for good, so the Berlin tricks around ...Nxe4 disappear.',
      plan: 'Castle, then c3, Re1 and maybe Ba4 to keep the bishop.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O': {
      alt: true, label: 'Advanced',
      idea: 'Castling allows ...Nxe4 and the famous Berlin Endgame. Learn it for recognition, not as your main weapon.',
      watch: 'After ...Nxe4 do not play Re1 lazily; the main line is d4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5': {
      what: 'Black puts the bishop on the active c5 diagonal, aiming at f2.',
      threat: 'The bishop eyes f2; together with ...Ng4 that can become annoying.',
      avoid: 'Do not play Bxc6 and Nxe5: Black gets ...Qd4 ideas against f2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 O-O': {
      idea: 'Castle: your king is safe and f2 is now guarded by the rook as well.',
      plan: 'c3 to prepare d4 and give the bishop a retreat.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 O-O d6 c3': {
      idea: 'c3 prepares d4, hitting the c5 bishop, and gives your b5 bishop room on a4 and c2.',
      plan: 'Re1 and Nbd2-f1-g3.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 O-O d6 c3 O-O Re1': {
      idea: 'Re1 supports e4 and prepares Nbd2-f1.',
      watch: 'If Black plays ...a6, keep the bishop with Ba4 instead of taking on c6.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 O-O d6 c3 O-O Re1 a6 Ba4': {
      idea: 'Keep the bishop; it can drop back to c2 later, where it aims at the kingside.',
      plan: 'Nbd2-f1-g3 and h3; d4 when the pieces are ready.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 d6': {
      what: 'Black chooses a solid setup, supporting e5 with a pawn.',
      threat: 'No direct threat; Black aims for ...Be7 and ...O-O.',
      avoid: 'No need to force things; keep developing.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 d6 O-O': {
      idea: 'Castle and keep the position calm.',
      plan: 'c3 and Re1 next.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 d6 O-O Be7 c3': {
      idea: 'c3 prepares d4 and gives the bishop a retreat square.',
      plan: 'Re1, Nbd2-f1-g3.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 d3 d6 O-O Be7 c3 O-O Re1': {
      idea: 'Re1 completes the setup and supports e4.',
      plan: 'Nbd2-f1-g3 and h3 before thinking about d4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4': {
      what: 'Black takes the e4 pawn, the start of the Berlin Endgame line.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4': {
      idea: 'Hit the center: e5 is attacked and the e-file opens toward Black king.',
      plan: 'After ...Nd6 trade on c6 and push dxe5.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6': {
      idea: 'Trade on c6 so the knight on d6 can be chased by dxe5.',
      plan: 'dxe5 next.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5': {
      idea: 'The pawn attacks the d6 knight and gains space.',
      plan: 'After ...Nf5, trade queens on d8.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+': {
      idea: 'Trade queens with check. Black loses castling rights, but has the bishop pair: this is the Berlin Endgame.',
      plan: 'Nc3, h3 and Rd1; push the kingside majority later.'
    },

    'e4 e5 Nf3 Nc6 Bb5 d6': {
      what: 'The Steinitz Defense: Black solidly supports e5 but blocks the f8 bishop.',
      threat: 'No threat; Black aims for a compact, passive setup.',
      avoid: 'Do not drift; use your space with d4 at once.'
    },
    'e4 e5 Nf3 Nc6 Bb5 d6 d4': {
      idea: 'Attack e5 a second time. The pin on c6 makes it hard for Black to hold the center.',
      plan: 'Castle and Re1 to add more pressure on e5.'
    },
    'e4 e5 Nf3 Nc6 Bb5 d6 d4 Bd7 O-O': {
      idea: 'Castle; your king is safe and the rook joins the center.',
      plan: 'Re1 next.'
    },
    'e4 e5 Nf3 Nc6 Bb5 d6 d4 Bd7 O-O Nf6 Re1': {
      idea: 'Re1 protects e4 against ...Nxe4.',
      plan: 'c3 to keep a pawn on d4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 d6 d4 Bd7 O-O Nf6 Re1 Be7 c3': {
      idea: 'c3 supports d4, so you keep the space advantage.',
      plan: 'Nbd2-f1-g3 and h3.'
    },

    'e4 e5 Nf3 Nc6 Bb5 f5': {
      what: 'The Schliemann: Black challenges e4 at once with a gambit-style pawn move.',
      threat: 'Black wants ...fxe4, opening the f-file and kicking your knight.',
      avoid: 'Do not take on f5 carelessly; ...e4 can then gain space with tempo.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 d3': {
      idea: 'A calm, solid answer: d3 supports e4, so ...fxe4 can be met by dxe4.',
      plan: 'Castle and develop with Nc3; Black kingside is a bit loose.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 Nc3': {
      alt: true, label: 'Sharp',
      idea: 'The sharp main line: develop and let Black take on e4, then hit back in the center.',
      watch: 'Very tactical; only play it if you know the follow-up.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 d3 fxe4 dxe4': {
      idea: 'Recapture with the pawn: your center stays solid and the d-file opens.',
      plan: 'Castle, then Nc3 and Bg5.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 d3 fxe4 dxe4 Nf6 O-O': {
      idea: 'Castle; Black king will be draftier than yours because of ...f5.',
      plan: 'Nc3 and Bg5, or Qd3 ideas.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 d3 fxe4 dxe4 Nf6 O-O d6 Nc3': {
      idea: 'Develop the last minor piece toward the center.',
      plan: 'Bg5 and Qd3, targeting the light squares around Black king.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4': {
      idea: 'Recapture with the knight, centralizing it.',
      watch: 'Black will hit it with ...d5.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 d5 Nxe5': {
      idea: 'The sharp counterblow: take e5 and threaten the c6 knight, ignoring the e4 knight for a moment.',
      watch: 'Every move is forcing here; check all captures and checks.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 d5 Nxe5 dxe4 Nxc6': {
      idea: 'Take the knight; it is the piece that defends Black queenside.',
      watch: 'Black ...Qg5 attacks both your knight and g2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 d5 Nxe5 dxe4 Nxc6 Qg5 Qe2': {
      idea: 'Qe2 defends and pins the e4 pawn against Black king.',
      watch: 'g2 is still attacked; the next move must handle it.'
    },
    'e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 d5 Nxe5 dxe4 Nxc6 Qg5 Qe2 Nf6 f4': {
      idea: 'f4 kicks the queen with tempo and opens lines for your pieces.',
      watch: 'After ...Qxf4, look for Ne5+ or Nxa7+ tactics against Black king.'
    },

    'e4 e5 Nf3 Nc6 Bb5 Bc5': {
      what: 'The Classical Defense: the bishop comes to its most active square, aiming at f2.',
      threat: 'The bishop eyes f2 and controls d4.',
      avoid: 'Do not play Bxc6 and Nxe5 early: ...Qd4 hits the knight and f2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Bc5 c3': {
      idea: 'c3 prepares d4, which will kick the c5 bishop with tempo.',
      plan: 'Castle and push d4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 O-O': {
      idea: 'Castle first; it also means ...Nxe4 can be met by Re1 or Qe2 with tempo.',
      plan: 'd4 next.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 O-O O-O d4': {
      idea: 'Strike in the center and attack the c5 bishop.',
      watch: 'Black bishop will drop to b6, still aiming at d4 and f2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 O-O O-O d4 Bb6': {
      what: 'The bishop retreats to b6, where it keeps its diagonal toward d4 and f2.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 O-O O-O d4 Bb6 Re1': {
      idea: 'Re1 protects e4 so your knight and pawns can hold the center.',
      plan: 'Bg5, Nbd2 and h3.'
    },

    'e4 e5 Nf3 Nc6 Bb5 Nd4': {
      what: 'The Bird Defense: Black offers a knight trade on d4.',
      threat: 'No real threat; after the trade Black gets a pawn on d4 that cramps you a little.',
      avoid: 'Do not ignore the knight; trade it off.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nd4 Nxd4': {
      idea: 'Trade knights. Black recaptures with a pawn and loses time.',
      plan: 'Castle and use your development lead.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nd4 Nxd4 exd4 O-O': {
      idea: 'Castle quickly; Black has spent several moves on the knight.',
      plan: 'If ...c6, move the bishop to c4 or a4.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nd4 Nxd4 exd4 O-O c6 Bc4': {
      idea: 'The bishop moves to c4, where it aims at f7.',
      plan: 'Re1 and d3, then go after the d4 pawn.'
    },
    'e4 e5 Nf3 Nc6 Bb5 Nd4 Nxd4 exd4 O-O c6 Bc4 Nf6 Re1': {
      idea: 'Re1 protects e4 and prepares e5 to kick the knight.',
      plan: 'd3, Nd2-f3 and pressure on d4.'
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
