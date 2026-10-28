(function (g) {
  g.OL_ANN = g.OL_ANN || {};
  var A = g.OL_ANN.sicilian = g.OL_ANN.sicilian || {};

  A['@lessons'] = [
    { title: 'Why 1...c5',
      body: "1...c5 fights for the d4 square from the side instead of copying White with ...e5. When White plays d4, you take with ...cxd4: you give up a wing pawn for a center pawn, so you keep two central pawns (d7 and e7) against White's one. The c-file opens for your rook and queen, and the game becomes unbalanced: White usually attacks on the kingside, you counterattack on the queenside and down the c-file." },
    { title: 'The Accelerated Dragon setup and the ...d5 break',
      body: "Your setup is ...Nc6, ...g6, ...Bg7, ...Nf6 and ...O-O. The g7 bishop is your best piece: it looks down the long diagonal at d4, c3 and b2. The trick of this move order is that your d-pawn is still on d7. If White plays slowly with f3 and Qd2, you can strike with ...d5 in ONE move and open the center before White's attack gets going. Only play ...d6 once you know White is not allowing ...d5, for example after Bc4 and Bb3." },
    { title: 'Against everything else: one rule',
      body: "When White avoids 2.Nf3 and 3.d4, keep it simple. Against quiet setups (2.Nc3, 2.f4, 2.d3, 3.Bb5) play the same ...Nc6, ...g6 and ...Bg7 setup. Against the Alapin 2.c3 (and the Smith-Morra 3.c3) hit e4 at once with ...Nf6: c3 took the knight's best square, so White cannot defend e4 with Nc3. Against an early Bc4 aimed at f7, play ...e6 to block the bishop and then ...d5 to kick it." }
  ];

  A['@plans'] = Object.assign(A['@plans'] || {}, {
    D01: "Your queenside pawns are rolling. Push ...b4 to kick the c3 knight away from e4, then ...a5-a4 to chase the b3 bishop. Put a rook on c8 and the queen on a5 or b8. If White pushes e5, take with ...dxe5.",
    D02: "The c6 bishop hits e4 and the c-file is yours. Play ...Qa5 and ...Rfc8, and look for ...a6 and ...b5 to gain queenside space. Trade dark-squared bishops only if White's king is not left weak.",
    D03: "The center is open and the queens are likely to come off. After a queen trade, use the open b-file and a-file, play ...Be6 and ...Rfd8, and aim your rooks at White's queenside pawns.",
    D04: "You struck with ...d5 in one move. Take back on d5 with the knight, trade on c6 with ...bxc6 if White does, and use the open b-file against White's king if it castles queenside.",
    D05: "White has a space clamp with pawns on c4 and e4. Trade pieces, because the side with less space likes trades. Play ...Qa5, ...Rfc8 and ...a6, then break with ...b5 when it works. The c4 pawn is your main target.",
    D06: "Finish development with ...Bg7 and ...O-O. Your c6 pawn controls d5, and the half-open b-file points at b2. A queen check on a5 and a later ...e5 are typical ideas.",
    D07: "The fork trick freed your game. Put a rook on b8 against b2, bring the light-squared bishop to e6 or f5, and use the g7 bishop on the long diagonal. The position is equal and easy to play.",
    D08: "You won a big amount of material. Keep the d4 bishop safe (it can drop back to g7 or b6), develop ...d6, ...Nf6 and castle, and trade pieces. When you are ahead, every trade brings you closer to a won endgame.",
    D08B: "You are a whole piece up for a pawn. Castle, keep your pieces protected, and trade whenever you can: a piece up, the endgame is an easy win.",
    D09: "The b3 knight is far from the center. Play ...Be6 and ...Rc8, and push ...a5-a4 to chase the knight. Keep the g7 bishop on the long diagonal.",
    D10: "You are back in the main Accelerated Dragon. Castle next, then play ...d6 against Bc4 and Bb3, or ...d5 in one move if White plays f3 and Qd2.",
    D11: "White's bishop pins your c6 knight. Release the tension with ...dxe5 or unpin with ...Bd7, then play ...e6, ...Be7 and castle. White's d4 pawn is isolated, so blockade it and attack it.",
    D12: "Your queen is active on d6 and the g4 bishop pins the f3 knight. Play ...e6, then castle (often queenside) and use the open d-file. Watch for Na3 hitting your c4 pawn.",
    D13: "The same position as the Alapin main line. Release the pin with ...dxe5 or ...Bd7, then ...e6, ...Be7 and castle, and play against White's d4 pawn.",
    D14: "You reached the Alapin structure. Unpin with ...Bd7 or swap on e5, finish with ...e6, ...Be7 and castle, and target the d4 pawn.",
    D15: "By declining the gambit you are in a calm Alapin-type position. Unpin with ...Bd7 or ...dxe5, then ...e6, ...Be7 and castle. White has no gambit attack, and d4 can become a target.",
    D16: "Same structure as the Alapin. Release the pin, play ...e6 and ...Be7, castle, and aim your pieces at d4.",
    D17: "Your e6 pawn blunts the bishop and ...d5 claims the center. Consider ...Na5 to trade off the b3 bishop, or ...b5 and ...c4 to gain queenside space. White wants f5, so keep an eye on that square.",
    D18: "The d4 knight is a monster. Play ...e6, ...Ne7 and castle. If White ever takes on d4, recapture with ...cxd4 and gain space; your queenside pawns can keep rolling with ...b4.",
    D19: "This is the Grand Prix position. Continue ...Nge7, ...d5 and castle, keeping the e6 pawn to blunt White's bishop.",
    D20: "Finish with ...d6 to stop e5, and look for ...Qb6 (hitting b2) and ...Ng4 (hitting the e3 bishop). Your g7 bishop presses on the long diagonal.",
    D21: "Castle, then aim for ...f5 to challenge White's center. The e5 pawn controls d4. If White's bishop stays on b5, ...a6 and ...b5 can gain space with tempo.",
    D22: "You have the bishop pair. Open the position for your bishops with ...e5 or ...b6 and ...Nd7, and avoid closing the center. White will try to use the knights.",
    D23: "You have the two bishops and a solid pawn on e5. Castle, then play ...f6 to support e5 and ...Be6. Later, open lines so the bishops can work.",
    D24: "Play on the queenside with ...Rb8, ...b5 and ...b4, and put a knight on d4. White will push f5 on the kingside, so do not leave your king short of defenders.",
    D25: "Develop ...Be7 or ...Bd6, castle and play ...Bg4. Your d5 pawn gives you central space; watch for pins on the e-file before you castle.",
    D26: "Castle quickly with ...Nge7 and ...O-O, then play ...Bg4. Watch for Re1 pins on the e-file. Your c5 and d5 pawns give you central space.",
    D27: "You are a pawn up in a queenless position, and White's king has lost the right to castle. Develop ...Nc6 and ...Be6 or ...Bf5, castle, and use the d-file. White's c-pawns are doubled.",
    D28: "Castle, then play ...Rb8 and ...b5-b4 on the queenside, or put a knight on d4. Your setup works the same way against any slow White system.",
    D29: "White's queen moved twice and you lead in development. Play ...Be6 or ...Bg4, ...Rc8, and ...Nd7-c5 to hit the d3 queen. ...a6 and ...b5 gain more space.",
    D30: "The Najdorf: play ...Be6, ...Nbd7 and ...Rc8, then look for ...b5 and the ...d5 break. The d5 square is the key: keep it controlled.",
    D31: "The classical Dragon: play ...Bd7, ...Rc8 and ...a6 with ...b5, or the ...d5 break when White allows it. The g7 bishop on the long diagonal is your best piece.",
    D32: "The Kan: play ...Nbd7, ...Be7, castle, then ...b5 and ...Bb7. Wait for White to commit, then break with ...d5 or ...b4."
  });

  Object.assign(A, {
    'e4 c5': {
      idea: 'The Sicilian Defense. The c-pawn fights for d4 from the side, so if White plays d4 you can trade a wing pawn for a center pawn.',
      watch: 'White decides the character of the game on move 2. The main line is 2.Nf3 and 3.d4; everything else has a simple answer in this course.',
      plan: 'Against 2.Nf3 play ...Nc6, then ...g6 and ...Bg7 after the center opens.',
      mistake: 'Playing slowly once the center opens. Black must develop fast, because ...c5 did not develop a piece.',
      arrows: [['c5', 'd4']]
    },
    'e4 c5 Nf3': {
      what: 'The main move. White develops and prepares d4 to open the center.',
      threat: 'd4 next, opening lines while White is ahead in development.',
      avoid: 'Do not play ...e5: it leaves a hole on d5 and blocks your future g7 bishop. Develop with ...Nc6.'
    },
    'e4 c5 c3': {
      what: 'The Alapin. White wants d4 next, so that after ...cxd4 cxd4 White keeps two pawns in the center.',
      threat: 'A big pawn center with d4 and e4.',
      avoid: 'Do not let White build it for free. Hit e4 now with ...Nf6: c3 took away the c3 square, so the knight cannot defend e4.'
    },
    'e4 c5 d4': {
      what: 'White opens the center at once.',
      threat: 'After ...cxd4 White can play 3.c3 (the Smith-Morra Gambit) or recapture with the queen.',
      avoid: 'Do not ignore the pawn. Take with ...cxd4, trading your wing pawn for a center pawn.'
    },
    'e4 c5 Nc3': {
      what: 'White develops and keeps d4 for later. This leads to the Closed Sicilian (g3) or the Grand Prix (f4).',
      threat: 'A slow kingside attack with f4 and f5, or a quiet fianchetto.',
      avoid: 'Do not invent a new plan. ...Nc6 and ...g6 give you the same setup as always.'
    },
    'e4 c5 f4': {
      what: 'White grabs space on the kingside and plans Nf3, Nc3 and a kingside attack.',
      threat: 'e5 or f5 pushes once White is developed.',
      avoid: 'Do not panic: ...Nc6 and ...g6 reach the same positions as the Grand Prix.'
    },
    'e4 c5 Bc4': {
      what: 'The Bowdler. The bishop aims at f7 straight away.',
      threat: 'Qh5 or Qf3 with Ng5 ideas against f7 if Black develops carelessly.',
      avoid: 'Do not leave f7 weak. ...e6 blocks the bishop and prepares ...d5 to kick it with tempo.'
    },
    'e4 c5 b4': {
      what: 'The Wing Gambit. White offers a pawn to pull your c-pawn away from the center.',
      threat: 'If you take, White hopes for a quick d4 and a big center.',
      avoid: 'Do not be scared to take. ...cxb4 and then ...d5 hits e4 before White gets d4 in.'
    },
    'e4 c5 d3': {
      what: "A quiet King's Indian Attack setup: g3, Bg2, Nf3 and castle.",
      threat: 'A slow kingside attack later with f4 and f5.',
      avoid: 'Do not overreact. Mirror the setup with ...Nc6, ...g6 and ...Bg7.'
    },
    'e4 c5 Nf3 Nc6': {
      idea: 'The knight develops and controls d4 and e5. Playing ...Nc6 and ...g6 before ...d6 keeps the d-pawn at home, so later ...d5 can come in one move.',
      watch: 'White can attack the knight with 3.Bb5 (the Rossolimo). Answer it with ...g6 and ...Bg7.',
      plan: 'After 3.d4 take with ...cxd4, and after 4.Nxd4 play ...g6.',
      mistake: 'Delaying development with pawn moves like ...a6 or ...e6 before you have a plan.',
      arrows: [['c6', 'd4']]
    },
    'e4 c5 Nf3 d6': {
      alt: true, label: 'Other Sicilian (optional)',
      idea: 'The move order of the Najdorf and the classical Dragon. It is a strong move, but these systems need much more theory than the Accelerated Dragon.',
      watch: 'After 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 you must choose between ...a6 (Najdorf) and ...g6 (Dragon).',
      plan: 'Take on d4, play ...Nf6 to hit e4, then pick your system.',
      mistake: 'Mixing systems. Pick one Sicilian and learn its plans; this course recommends ...Nc6 and ...g6.'
    },
    'e4 c5 Nf3 e6': {
      alt: true, label: 'Other Sicilian (optional)',
      idea: 'The move order of the Kan and Taimanov: flexible and solid, with the e-pawn supporting a later ...d5.',
      watch: 'The c8 bishop is blocked by e6, so it usually goes to b7 after ...b5.',
      plan: 'After 3.d4 cxd4 4.Nxd4 play ...a6, then ...Nf6, ...Qc7 and ...b5.',
      mistake: 'Treating it like the Dragon. The plans are different: here the bishop goes to b7, not g7.'
    },
    'e4 c5 Nf3 Nc6 d4': {
      what: 'The Open Sicilian. White opens the center to use a lead in development.',
      threat: 'd5 to kick your c6 knight, or dxc5.',
      avoid: 'Do not let White keep a pawn on d4. Take with ...cxd4.'
    },
    'e4 c5 Nf3 Nc6 Nc3': {
      what: 'White develops and keeps the option of d4, Bb5 or a Closed setup.',
      threat: 'Nothing direct; White is waiting to see your setup.',
      avoid: 'Do not play ...e5 and leave a hole on d5. ...g6 keeps your normal setup.'
    },
    'e4 c5 Nf3 Nc6 c3': {
      what: 'An Alapin with the knights already out. White wants d4 with pawn support.',
      threat: 'A big center after d4 and cxd4.',
      avoid: 'Do not allow d4 for free. ...Nf6 hits e4, which no knight can defend from c3.'
    },
    'e4 c5 Nf3 Nc6 Bb5': {
      what: 'The Rossolimo. The bishop eyes your c6 knight, which guards d4 and e5.',
      threat: 'Bxc6 to double your pawns, then a quiet game against them.',
      avoid: 'Do not panic about doubled pawns. Play ...g6 and ...Bg7; if White takes on c6, the open lines help your bishops.'
    },
    'e4 c5 Nf3 Nc6 Bc4': {
      what: 'The bishop aims at f7, the weakest square near your king.',
      threat: 'Ng5 together with the bishop against f7 if you develop carelessly.',
      avoid: 'Do not leave f7 alone. ...e6 blocks the bishop and prepares ...d5 with tempo.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4': {
      idea: 'Trade your c-pawn for White\'s d-pawn. You now have two central pawns against one, and the c-file is half-open for your rooks.',
      plan: 'After 4.Nxd4 play ...g6 and bring the bishop to g7.',
      mistake: 'Leaving the pawn on c5 and letting White push d5 or take on c5.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6': {
      idea: 'The Accelerated Dragon. The bishop goes to g7, where it looks down the long diagonal at d4, c3 and b2. The d-pawn stays home, so ...d5 can come in one move later.',
      watch: 'White can play 5.c4 (the Maroczy Bind) to stop ...d5, or 5.Nxc6 to change the structure.',
      plan: 'Next ...Bg7, ...Nf6 and castle.',
      mistake: 'An early ...e5. It leaves a hole on d5 and blocks your own g7 bishop.',
      arrows: [['f8', 'g7']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3': {
      what: 'The natural developing move. White defends e4 and keeps all options.',
      threat: 'Be3 and Bc4, or a kingside attack with f3, Qd2 and O-O-O.',
      avoid: 'Do not forget the d4 knight: ...Bg7 adds a second attacker on it, and White must keep it protected.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4': {
      what: 'The Maroczy Bind. The pawns on c4 and e4 clamp the d5 square and stop your ...d5 break.',
      threat: 'A long squeeze where White has more space.',
      avoid: 'Do not try to force ...d5. Develop with ...Nf6, and trade knights with ...Nxd4 to ease the cramp.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nxc6': {
      what: 'White trades knights before your bishop reaches g7.',
      threat: 'After ...bxc6, Qd4 hits your h8 rook and the a7 pawn through the empty long diagonal.',
      avoid: 'Do not recapture with the d-pawn by reflex. ...bxc6 takes toward the center and opens the b-file; then block Qd4 with ...Nf6.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7': {
      idea: 'The bishop reaches the long diagonal and adds a second attacker on the d4 knight.',
      watch: 'White must protect d4 now, usually with Be3. If White forgets (6.Be2?), the knight on d4 falls.',
      plan: 'Next ...Nf6 and castle.',
      mistake: 'Playing ...d6 too early. Keep the d-pawn home so ...d5 stays a one-move option.',
      arrows: [['g7', 'd4']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3': {
      what: 'The bishop protects the d4 knight. This is the main line.',
      threat: 'Bc4 against f7, or Qd2 and Bh6 to swap off your g7 bishop.',
      avoid: 'Do not play ...d6 yet: it lets White choose the sharp Yugoslav Attack. Play ...Nf6 and castle first.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2': {
      dubious: true,
      what: 'A natural-looking developing move, but it is a blunder. The d4 knight is attacked twice (by the c6 knight and the g7 bishop) and defended only once, by the queen.',
      threat: 'None: White simply forgot about d4.',
      avoid: 'Do not miss it: ...Nxd4! wins a knight, and if White recaptures with Qxd4, ...Bxd4 wins the queen.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Nb3': {
      what: 'The knight steps back out of the g7 bishop\'s line of fire.',
      threat: 'A slow setup with Be2, O-O and f4.',
      avoid: 'Do not chase the knight with pawn moves yet. Develop ...Nf6 and castle, then use ...a5-a4.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2 Nxd4': {
      idea: 'Take the free knight! The d4 knight was attacked by your c6 knight and your g7 bishop, and defended only by the queen.',
      watch: 'If White recaptures with Qxd4, the queen walks into your g7 bishop: ...Bxd4 wins it.',
      plan: 'Keep your extra piece safe, develop and castle.',
      mistake: 'Playing a routine move like ...Nf6 and letting White fix the problem with Be3. If White answers 7.Be3, take on e2 with ...Nxe2 and stay a piece up.',
      arrows: [['c6', 'd4'], ['g7', 'd4']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2 Nxd4 Be3': {
      what: 'White\'s best try: the bishop attacks your d4 knight instead of the queen walking into the g7 bishop.',
      threat: 'Bxd4 next would win the piece back, because your knight is now attacked twice.',
      avoid: 'Do not leave the knight on d4. Take the e2 bishop with ...Nxe2 so the extra piece stays yours.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2 Nxd4 Be3 Nxe2': {
      idea: 'Cash in: the knight takes a bishop on its way out, so you stay a whole piece up.',
      watch: 'After Qxe2 your g7 bishop is still eyeing c3 and b2.',
      plan: 'Play ...d6 and ...Nf6, castle, and trade pieces. A piece up, simple chess wins.',
      mistake: 'Retreating with ...Nc6, which also works but lets White keep the e2 bishop for free development.',
      arrows: [['d4', 'e2']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2 Nxd4 Be3 Nxe2 Qxe2 d6': {
      idea: 'A calm developing move: it opens the c8 bishop and keeps White\'s e-pawn from advancing to e5 safely.',
      plan: 'Next ...Nf6 and ...O-O. Your king gets safe and your extra piece does the rest.',
      mistake: 'Grabbing pawns or hunting for more tactics before your king is castled.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2 Nxd4 Be3 Nxe2 Qxe2 d6 O-O Nf6': {
      idea: 'The last minor piece comes out and you are ready to castle.',
      watch: 'White may try f4 and e5 to chase the knight. Keep ...Ng4 or ...Nd7 in mind as answers.',
      plan: 'Castle, then trade pieces whenever you can. Every trade makes your extra piece count more.',
      mistake: 'Leaving the king in the center while White still has active pieces.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2 Nxd4 Qxd4': {
      dubious: true,
      what: 'White takes back with the queen, but the queen lands on the long diagonal of your g7 bishop.',
      threat: 'None. The d4 square is not defended by anything.',
      avoid: 'Do not miss ...Bxd4, winning the queen.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be2 Nxd4 Qxd4 Bxd4': {
      idea: 'The bishop captures the queen. Nothing can take back on d4.',
      plan: 'Keep the bishop safe from Nb5 or Nd5 by dropping back to g7 or b6, then develop and castle.',
      mistake: 'Getting careless after winning material. Develop and trade pieces.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6': {
      idea: 'Develop, hit e4, and get ready to castle.',
      watch: 'White now chooses a setup: Bc4 aims at f7, while f3 and Qd2 prepare a kingside attack.',
      plan: 'Castle next. Then choose: ...d6 against Bc4 and Bb3, ...d5 against f3 and Qd2.',
      mistake: 'Playing ...d6 too soon. With the pawn on d6, the ...d5 break costs two moves instead of one.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4': {
      what: 'The bishop aims at f7 and at d5.',
      threat: 'After you castle, the bishop pins f7 against your king and supports a kingside attack.',
      avoid: 'After ...O-O, watch White\'s next move: if White castles with the bishop still on c4, ...Nxe4 and ...d5 (the fork trick) works.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Be2': {
      what: 'A quiet setup: White will castle and play slowly.',
      threat: 'No direct threat; White wants a calm game with more space.',
      avoid: 'Do not play ...Ng4 hoping to hit the e3 bishop: the e2 bishop simply takes it with Bxg4.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 f3': {
      what: 'A Yugoslav-style setup: f3 protects e4 and stops ...Ng4, then Qd2 and O-O-O.',
      threat: 'A kingside pawn storm with g4 and h4, plus Bh6 to swap off your g7 bishop.',
      avoid: 'Do not play ...d6: that is exactly the sharp Dragon White wants. Castle, then hit the center with ...d5 in one move.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Qd2': {
      what: 'White prepares Bh6 to trade your g7 bishop, and may castle queenside.',
      threat: 'Bh6 removing your best defender, then a kingside attack.',
      avoid: 'Do not wait passively. Castle, and if White adds f3, strike with ...d5.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O': {
      idea: 'Get your king safe. Castling also sets a trap: if White castles too, the c4 bishop is loose.',
      watch: 'The correct move for White is Bb3, taking the bishop off the c4 square.',
      plan: 'Against 8.Bb3 play ...d6; against 8.O-O play ...Nxe4!.',
      mistake: 'Missing the fork trick when White castles with the bishop on c4.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O Bb3': {
      what: 'The bishop retreats before you can hit it with ...d5. It still aims at f7.',
      threat: 'f3, Qd2, O-O-O and an h4-h5 attack on your king.',
      avoid: 'Do not try the fork trick now: with the bishop on b3, ...Nxe4 Nxe4 d5 just loses a piece.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O O-O': {
      what: 'Castling looks natural, but the c4 bishop is now a target.',
      threat: 'No threat; this gives you a tactical chance.',
      avoid: 'Do not miss ...Nxe4!: after Nxe4, ...d5 forks the c4 bishop and the e4 knight.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O Bb3 d6': {
      idea: 'Now that the bishop sits on b3, ...d5 is not possible, so ...d6 builds a solid center and opens the c8 bishop.',
      watch: 'White will usually play f3, Qd2 and castle queenside to attack.',
      plan: 'Play ...Bd7, then trade on d4 with ...Nxd4 and push ...b5.',
      mistake: 'Trying ...Nxe4 or ...d5 here. With the bishop on b3, the fork trick does not work and you just lose material.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O Bb3 d6 f3 Bd7': {
      idea: 'Develop the last minor piece and connect your rooks. The bishop also supports ...b5.',
      plan: 'Next ...Nxd4 and ...b5, or ...Rc8 and ...Qa5.',
      mistake: 'Leaving the queenside pieces at home while White prepares an attack. Counterplay must be quick.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O Bb3 d6 f3 Bd7 Qd2 Nxd4': {
      idea: 'Trade White\'s strong central knight. After Bxd4, your ...b5 push comes quickly.',
      watch: 'The d4 bishop now faces your g7 bishop. If dark-squared bishops are traded, your king loses a defender, so keep pieces near it.',
      plan: 'Next ...b5, then ...b4 and ...a5.',
      mistake: 'Starting the queenside attack before trading on d4, which lets White\'s knight jump to b5 or d5.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O Bb3 d6 f3 Bd7 Qd2 Nxd4 Bxd4 b5': {
      idea: 'Your queenside attack starts. ...b4 next kicks the c3 knight, and ...a5-a4 can chase the b3 bishop.',
      watch: 'The b5 pawn is protected by the d7 bishop. White may push h4-h5 or e5, so count the race carefully.',
      plan: 'Push ...a5 and ...b4, and bring a rook to c8.',
      mistake: 'Playing slowly on the queenside. In opposite-side attacks, speed matters more than material.',
      arrows: [['b5', 'b4']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Be2 O-O': {
      idea: 'Castle against the quiet setup. Your king is safe and the rook comes to the center.',
      plan: 'Next ...d6, then trade on d4 and use the c-file.',
      mistake: '...Ng4 to hit the e3 bishop. The e2 bishop just takes it.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Be2 O-O O-O d6': {
      idea: 'A solid center move that opens the c8 bishop. Against a slow White setup there is no need to rush ...d5.',
      plan: 'Develop with ...Bd7, trade on d4 and bring the bishop to c6.',
      mistake: 'Leaving the c8 bishop at home for too long.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Be2 O-O O-O d6 Qd2 Bd7': {
      idea: 'Develop the bishop and connect the rooks. It will come to c6 after the knights trade on d4.',
      plan: 'Next ...Nxd4 and ...Bc6, or ...Rc8.',
      mistake: 'Putting the queen on a5 before your pieces are ready; it can be hit by Nd5 or Nb3.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Be2 O-O O-O d6 Qd2 Bd7 Rad1 Nxd4': {
      idea: 'Trade the central knight. After Bxd4 your bishop can come to c6 and press on e4.',
      plan: 'After Bxd4, play ...Bc6.',
      mistake: 'Allowing White\'s knight to stay on d4 forever, where it controls b5, c6, e6 and f5.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Be2 O-O O-O d6 Qd2 Bd7 Rad1 Nxd4 Bxd4 Bc6': {
      idea: 'The bishop attacks e4 from c6 and supports a later ...Qa5 and ...Rfc8.',
      plan: 'Play ...Qa5, ...Rfc8 and later ...a6 and ...b5.',
      mistake: 'Grabbing the e4 pawn without checking: count attackers and defenders first.',
      arrows: [['c6', 'e4']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 f3 O-O': {
      idea: 'Castle first. Against f3 and Qd2 your answer is the ...d5 break, and you want your king safe before the center opens.',
      plan: 'After Qd2 play ...d5.',
      mistake: '...d6, which walks into the sharp Yugoslav Attack where White storms your king.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 f3 O-O Qd2 d5': {
      idea: 'The point of the Accelerated Dragon: ...d5 in one move. It opens the center before White can castle and attack.',
      watch: 'Material stays balanced if you recapture correctly. The d4 knight is still attacked by your g7 bishop.',
      plan: 'After exd5 take back with ...Nxd5, hitting the c3 knight and the e3 bishop.',
      mistake: 'Hesitating with ...d6 and letting White start g4-h4.',
      arrows: [['d7', 'd5']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 f3 O-O Qd2 d5 exd5 Nxd5': {
      idea: 'The knight recaptures and attacks the c3 knight and the e3 bishop.',
      plan: 'If White takes on c6, recapture ...bxc6 toward the center.',
      mistake: 'Recapturing with the queen, which can be hit by Nc3 or Nb5 with tempo.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 f3 O-O Qd2 d5 exd5 Nxd5 Nxc6 bxc6': {
      idea: 'Take toward the center. The c6 pawn supports d5 and the b-file opens against b2.',
      plan: 'If White offers a bishop trade with Bd4, take it and bring the queen to b6.',
      mistake: '...Nxc3 first, which helps White develop with bxc3 and Bd4.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 f3 O-O Qd2 d5 exd5 Nxd5 Nxc6 bxc6 Bd4 Bxd4': {
      idea: 'Trade bishops. White recaptures with the queen, and your queen can then challenge it from b6.',
      plan: 'After Qxd4 play ...Qb6.',
      mistake: 'Retreating the bishop and letting White keep the strong d4 bishop pointing at your king.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 f3 O-O Qd2 d5 exd5 Nxd5 Nxc6 bxc6 Bd4 Bxd4 Qxd4 Qb6': {
      idea: 'Offer a queen trade. Your queen also eyes b2 down the open b-file.',
      plan: 'After a queen trade, use the open a- and b-files and play ...Be6 and ...Rfd8.',
      mistake: 'Avoiding the trade and letting White\'s queen dominate the center.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Qd2 O-O': {
      idea: 'Castle first. If White plays f3 next, you reach the ...d5 position.',
      plan: 'Against f3 play ...d5 in one move.',
      mistake: '...d6, giving White the Yugoslav Attack.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6': {
      idea: 'Develop and hit e4. White must defend it, usually with Nc3.',
      plan: 'Next ...d6, then trade knights with ...Nxd4 and develop ...Bg7.',
      mistake: 'Trying ...d5 against the Maroczy pawns. The c4 and e4 pawns control d5.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6 Nc3 d6': {
      idea: 'A small but solid center. ...d6 stops e5 and opens the c8 bishop.',
      plan: 'Trade knights with ...Nxd4, then ...Bg7 and castle.',
      mistake: 'Leaving the knights on: in a cramped position, trades help the side with less space.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6 Nc3 d6 Be2 Nxd4': {
      idea: 'Trade knights to ease the cramp. White\'s queen must recapture and comes into the center.',
      plan: 'After Qxd4 play ...Bg7 and castle.',
      mistake: 'Letting White keep the knight on d4 and use it as a strong outpost.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6 Nc3 d6 Be2 Nxd4 Qxd4 Bg7': {
      idea: 'The bishop reaches g7. The d4 queen and your g7 bishop now face each other through the f6 knight.',
      watch: 'Do not move the f6 knight carelessly: if it leaves, White\'s queen takes on g7 first.',
      plan: 'Castle, then play ...Be6 and ...Qa5.',
      mistake: 'Playing ...Nxe4?? here. It uncovers the g7 bishop, but White simply takes it with Qxg7.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6 Nc3 d6 Be2 Nxd4 Qxd4 Bg7 Be3 O-O': {
      idea: 'Castle and finish the kingside setup.',
      plan: 'Next ...Be6 to hit c4, then ...Qa5 and ...Rfc8.',
      mistake: 'Passive moves like ...Bd7 that do not hit anything. Aim your pieces at c4.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6 Nc3 d6 Be2 Nxd4 Qxd4 Bg7 Be3 O-O Qd2 Be6': {
      idea: 'The bishop attacks the c4 pawn, so White must spend time defending it.',
      plan: 'Play ...Qa5, ...Rfc8 and ...a6, then look for ...b5.',
      mistake: 'Grabbing on c4 without checking whether White wins it back with tempo.',
      arrows: [['e6', 'c4']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nxc6 bxc6': {
      idea: 'Recapture toward the center. The c6 pawn controls d5 and the b-file opens for your rook.',
      watch: 'Qd4 now hits your h8 rook and the a7 pawn along two diagonals.',
      plan: 'Against Qd4 play ...Nf6, which blocks the diagonal and develops.',
      mistake: '...dxc6 by habit. It is playable, but ...bxc6 keeps more central control.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nxc6 bxc6 Qd4 Nf6': {
      idea: 'Block the queen\'s attack on h8 and develop at the same time.',
      watch: 'White can push e5 to kick the knight.',
      plan: 'Against e5 put the knight on d5, the strong central square.',
      mistake: '...f6 to defend: it weakens your king and blocks the knight\'s best square.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nxc6 bxc6 Qd4 Nf6 e5 Nd5': {
      idea: 'The knight jumps to a strong central square that White pawns cannot attack easily.',
      watch: 'White can try e6, a pawn sacrifice that opens lines toward your king.',
      plan: 'Next ...Bg7 and castle, unless White plays e6.',
      mistake: 'Retreating the knight to g8: it loses time and gives White a free hand.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nxc6 bxc6 Qd4 Nf6 e5 Nd5 e6 f6': {
      idea: 'Keep the f-file closed. The e6 pawn is cut off and will be traded off.',
      plan: 'After exd7+ recapture with the bishop.',
      mistake: '...fxe6, which opens the h5-e8 diagonal and the f-file in front of your own king.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nxc6 bxc6 Qd4 Nf6 e5 Nd5 e6 f6 exd7+ Bxd7': {
      idea: 'Recapture with the bishop, developing it with tempo.',
      plan: 'Next ...Bg7 and castle; the half-open b-file and your central pawns give you an active game.',
      mistake: '...Qxd7, which lets White gain time against your queen.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O O-O Nxe4': {
      idea: 'The fork trick. If Nxe4, then ...d5 attacks both the e4 knight and the c4 bishop, and you win the piece back.',
      watch: 'This only works because the bishop is still on c4. With it on b3, the trick fails.',
      plan: 'After Nxe4 play ...d5.',
      mistake: 'Not checking first: the trick needs the bishop on c4 and the knight able to be forked on e4.',
      arrows: [['f6', 'e4']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O O-O Nxe4 Nxe4 d5': {
      idea: 'The fork: the d5 pawn attacks the c4 bishop and the e4 knight. One of them will fall.',
      plan: 'If White trades on c6, recapture ...bxc6, then take on e4.',
      mistake: 'Taking the wrong piece first and giving White time to save both.',
      arrows: [['d5', 'c4'], ['d5', 'e4']]
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O O-O Nxe4 Nxe4 d5 Nxc6 bxc6': {
      idea: 'Recapture toward the center. The fork is still on.',
      plan: 'After the bishop moves, take the knight on e4 with the d-pawn.',
      mistake: 'Recapturing with the queen, which lets White save both pieces.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O O-O Nxe4 Nxe4 d5 Nxc6 bxc6 Bd3 dxe4': {
      idea: 'Win the piece back. Material is level and your pieces are active.',
      plan: 'After Bxe4, develop the queen and the c8 bishop.',
      mistake: 'Leaving the knight alone: it would escape and you would be a piece down.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 O-O O-O Nxe4 Nxe4 d5 Nxc6 bxc6 Bd3 dxe4 Bxe4 Qc7': {
      idea: 'The queen develops and eyes h2 and e5, while your g7 bishop looks at b2.',
      plan: 'Play ...Rb8 against b2 and ...Be6, then use your active pieces.',
      mistake: 'Leaving the c8 bishop and a8 rook at home. Bring them into play quickly.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Nb3 Nf6': {
      idea: 'Develop and hit e4. The knight on b3 no longer defends anything in the center.',
      plan: 'Castle next, then ...d6 and ...a5.',
      mistake: '...d5 too early, before your king is safe.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Nb3 Nf6 Be2 O-O': {
      idea: 'Castle. White\'s setup is slow, so you have time.',
      plan: 'Next ...d6, ...Be6 and ...a5.',
      mistake: 'Starting action on the queenside before your king is safe.'
    },
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Nb3 Nf6 Be2 O-O O-O d6': {
      idea: 'A solid center that opens the c8 bishop.',
      plan: 'Play ...Be6, ...Rc8 and ...a5-a4 to chase the b3 knight.',
      mistake: 'Forgetting about the c-file: your rook belongs on c8.'
    },
    'e4 c5 Nf3 Nc6 Nc3 g6': {
      idea: 'Keep the same setup. If White plays d4, you are back in the main Accelerated Dragon.',
      watch: 'White can also choose Bb5 or Bc4 here; the same ideas apply.',
      plan: 'Against d4 take with ...cxd4, then ...Bg7.',
      mistake: '...e5, which leaves a hole on d5 for White\'s knight.'
    },
    'e4 c5 Nf3 Nc6 Nc3 g6 d4 cxd4': {
      idea: 'Take in the center. After Nxd4 Bg7 you are in the main line by a different move order.',
      plan: 'Next ...Bg7, ...Nf6 and castle.',
      mistake: 'Letting White keep the d4 pawn and push d5.'
    },
    'e4 c5 Nf3 d6 d4 cxd4': {
      idea: 'Same trade as in every Open Sicilian: wing pawn for center pawn.',
      plan: 'After Nxd4 play ...Nf6 to hit e4.',
      mistake: 'Allowing dxc5 or d5.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6': {
      idea: 'Hit e4 at once, so White must spend a move defending it with Nc3.',
      plan: 'After Nc3 choose ...a6 (Najdorf) or ...g6 (Dragon).',
      mistake: 'Playing ...g6 before ...Nf6, which lets White set up c4 and a Maroczy Bind.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6': {
      idea: 'The Najdorf. ...a6 controls b5 and prepares ...e5 without allowing Nb5.',
      watch: 'White has many sharp systems here (Bg5, Be3 with f3, Bc4). That is why this is optional.',
      plan: 'Against Be2 play ...e5 to gain central space.',
      mistake: 'Playing the Najdorf without studying White\'s main attacking systems.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6': {
      label: 'Classical Dragon (optional)',
      idea: 'The classical Dragon: the same bishop on g7 as in your main system, but with the pawn already on d6.',
      watch: 'The ...d5 break now needs two moves, so White\'s Yugoslav Attack (Be3, f3, Qd2, O-O-O) is dangerous.',
      plan: 'Play ...Bg7, castle and ...Nc6.',
      mistake: 'Playing it like the Accelerated Dragon. Here ...d5 is slower, so counterplay must come on the c-file.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5': {
      idea: 'Kick the knight and grab central space. The d5 square becomes a hole, so you must control it with pieces.',
      plan: 'After the knight moves, play ...Be7 and castle, then ...Be6.',
      mistake: 'Forgetting d5: if a White knight settles there, your position is worse.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7': {
      idea: 'Develop the bishop and prepare to castle.',
      plan: 'Castle, then ...Be6 and ...Nbd7.',
      mistake: 'Rushing ...Be6 when f4-f5 can hit it with tempo.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O': {
      idea: 'King safety first.',
      plan: 'Next ...Be6, ...Nbd7 and ...Rc8, then ...b5.',
      mistake: 'Allowing Nd5 for free; always keep d5 covered.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7': {
      idea: 'The bishop reaches the long diagonal.',
      plan: 'Castle, then ...Nc6.',
      mistake: 'Delaying castling in an open position.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O': {
      idea: 'Castle against the quiet Be2 setup.',
      plan: 'Next ...Nc6 and ...Bd7.',
      mistake: 'Allowing f4-e5 by leaving the center unguarded.'
    },
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Be3 Nc6': {
      idea: 'Develop the last knight and put pressure on d4.',
      plan: 'Play ...Bd7, ...Rc8 and ...a6 with ...b5.',
      mistake: '...Ng4 when the e2 bishop can take it.'
    },
    'e4 c5 Nf3 e6 d4 cxd4': {
      idea: 'The usual trade in the center.',
      plan: 'After Nxd4 play ...a6 to keep White\'s knight out of b5.',
      mistake: 'Leaving the pawn on c5 to be taken.'
    },
    'e4 c5 Nf3 e6 d4 cxd4 Nxd4 a6': {
      idea: 'The Kan. ...a6 keeps White\'s pieces out of b5 and prepares ...b5 and ...Bb7.',
      plan: 'Next ...Nf6, ...Qc7 and ...d6.',
      mistake: 'Developing ...Bb4 too early, where Nb5 or a3 can harass it.'
    },
    'e4 c5 Nf3 e6 d4 cxd4 Nxd4 a6 Bd3 Nf6': {
      idea: 'Develop and hit e4.',
      plan: 'Next ...Qc7 and ...d6.',
      mistake: 'Pushing ...b5 before developing the kingside, which keeps your king in the center too long.'
    },
    'e4 c5 Nf3 e6 d4 cxd4 Nxd4 a6 Bd3 Nf6 O-O Qc7': {
      idea: 'The queen eyes e5 and h2, and stops the e5 push.',
      plan: 'Next ...d6, ...Nbd7 and ...Be7.',
      mistake: 'Putting the queen on b6, where Nb3 or Be3 can hit it with tempo.'
    },
    'e4 c5 Nf3 e6 d4 cxd4 Nxd4 a6 Bd3 Nf6 O-O Qc7 Qe2 d6': {
      idea: 'A flexible small center that stops e5.',
      plan: 'Develop ...Nbd7 and ...Be7, castle, then ...b5 and ...Bb7.',
      mistake: 'Breaking in the center before you have castled.'
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
