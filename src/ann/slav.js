(function (g) {
  g.OL_ANN = g.OL_ANN || {};
  g.OL_ANN.slav = {
    '@lessons': [
      { title: 'The Slav is your Caro-Kann against 1.d4',
        body: 'In the Caro-Kann you play ...c6 and ...d5; in the Slav you play ...d5 and ...c6. The pawn structure is the same: the c6 pawn supports d5, so if White ever captures on d5 you can recapture with the c-pawn and keep a pawn in the center. Most of your plans, piece squares and pawn breaks carry over.' },
      { title: 'Bishop first, then ...e6',
        body: 'Exactly as in the Caro-Kann, get the light-squared bishop out to f5 (or g4) before you play ...e6. Once the e-pawn is on e6, the bishop on c8 is locked inside its own pawn chain. With the bishop outside, ...e6 then gives you a rock-solid center and every piece has a job.' },
      { title: 'How to meet the London System',
        body: 'The London (d4, Bf4, e3, c3, Nf3, Nd2) is a set-up, not a fight for the center, so you can choose your structure. Strike with ...c5, develop ...Nc6, and use ...Qb6 to pressure b2 and d4 together. White must spend moves defending, and you get easy, active development without memorising theory.' }
    ],
    '@plans': {
      S01: 'Castle short, then free your position with ...c5 or ...e5. The b4 bishop pins the c3 knight and the f5 bishop is active, so you have no bad pieces. Watch White\'s Nh4 idea to trade your f5 bishop.',
      S02: 'You are a pawn up for now and White will try to win c4 back. Finish development with ...O-O, ...Bb7 and ...Nbd7, and use the b4 pawn to keep White\'s knight out of c3. Do not chase more pawns.',
      S03: 'You have a free, active position: the c8 bishop is outside the pawn chain and the central break ...e5 has been played. Finish development with ...Be6 or ...Bb4, castle, and keep the e5 knight well defended.',
      S04: 'You have traded your bishop for a knight but gained a half-open h-file for the rook. Develop with ...Nbd7, ...Bd6 and ...Qe7, then decide between short castling and long castling with ...Rh8 pressure.',
      S05: 'A symmetrical structure where small details matter. Develop with ...Bd6 or ...Be7 and castle; the c-file is open, so put a rook on c8 and watch White\'s queen on b3 against b7.',
      S06: 'Symmetrical Exchange structure. Finish with ...Bd6 or ...Be7 and ...O-O, put a rook on c8 and look for ...Ne4 or ...Nb4 jumps. Always check checks and pins on the open c-file and the a4-e8 diagonal.',
      S07: 'After 4.Nf3 dxc4 5.a4 Bf5 you are in the main Slav (S01): continue ...e6, ...Bb4 and ...Nbd7 with short castling.',
      S08: 'Black has a free, active position. Castle, then choose between ...Qc7 (to trade the dark-squared bishops with ...Bxg3) or ...b6 and ...Bb7. A later ...e5 or ...c4 can gain space.',
      S09: 'The queens are off and Black has a half-open a-file for the rook on a8. Push ...b5-b4 to open the queenside, put the knight on a5 or d7, and use the extra space on that side.',
      S10: 'Black has the doubled f-pawns but they control e4, and the e-file is half open. Castle short, play ...Ne4 and ...Qe7, and consider ...g5-g4 later if White castles short.',
      S11: 'A calm Caro-Kann-style position with every piece developed. Castle short, then look for ...c5 or ...Ne4 to free the position. White\'s Nb5 trick never works because c6 guards b5.',
      S12: 'This is a Semi-Slav style setup. Castle short with ...Bd6 or ...Be7, and free your game with ...dxc4 followed by ...e5 or ...c5.',
      S13: 'This is the main Slav reached from 1.c4. Continue as in S01 with ...e6, ...Bb4 and ...Nbd7.',
      S14: 'A solid Slav-style setup against White\'s quiet King\'s Indian Attack. Develop with ...Be7 or ...Bd6, ...Nbd7 and ...O-O, and keep an eye on White\'s e4 and Nh4 ideas against the f5 bishop (you can drop it back to g6 or h7).',
      S15: 'You are in the Caro-Kann Classical, the line you already know as Black against 1.e4. Continue ...Nd7, ...Ngf6 and ...e6, and use ...h6 against an h4-h5 push.',
      S16: 'This is the Caro-Kann Advance from your Caro-Kann course. Develop with ...Nc6 and ...Nge7, keep pressure on d4, and look for ...cxd4 and ...Qb6.',
      S17: 'You are a pawn up, and White has open lines and a lead in development. Castle, keep the king safe, and play ...c5 or ...Nc6 to hit d4; trade pieces when you can.',
      S18: 'Your bishop is out and b2 is under pressure. Develop ...Nf6, ...Nbd7 and ...Be7, castle, and use the queen on b6 to keep White\'s queenside busy.',
      S19: 'Your bishop on g4 pins the f3 knight before ...e6. Play ...e6, ...Bd6 and castle; ...c4 can gain space if White\'s bishop sits on d3.',
      S20: 'A Slav structure with the bishop already outside the pawn chain. Develop ...Be7 or ...Bd6, ...Nbd7 and castle; ...h6 gives the bishop a safe retreat on h7.',
      S21: 'The main Slav position again, by a different move order. Continue ...e6, ...Bb4 and ...Nbd7, and castle, exactly as in S01.'
    },

    'd4': { what: 'White claims the center with the queen pawn.', threat: 'Nothing yet; White may follow with c4 (Queen\'s Gambit), Bf4 (London), Nf3 or Nc3.', avoid: 'Do not copy random setups; answer with ...d5, the start of your Slav structure.' },
    'c4': { what: 'The English Opening: White controls d5 from the side.', threat: 'White may play d4 later and reach a Queen\'s Gambit position.', avoid: 'Do not rush ...d5 at once; ...c6 first prepares ...d5 so you can recapture on d5 with a pawn.' },
    'Nf3': { what: 'A flexible knight move; White keeps options open.', threat: 'White can go for d4 systems or a quiet g3, Bg2 setup.', avoid: 'Do not overthink it: ...d5 and the usual Slav pieces work.' },
    'd4 d5': {
      idea: 'Take your share of the center with the queen pawn, just as ...d5 in the Caro-Kann. Now e4 is covered and White cannot easily build a big pawn center.',
      plan: 'If White plays c4, support d5 with ...c6. Against Bf4 or Nf3 setups develop ...Nf6 first.',
      mistake: 'Moving the d-pawn again early. It is your anchor in the center.'
    },
    'd4 d5 c4': { what: 'The Queen\'s Gambit: White offers the c-pawn to pull your d5 pawn away from the center.', threat: 'cxd5 to remove your central pawn.', avoid: 'Do not play ...Nc6 here; it blocks the c-pawn you need for ...c6.', arrows: [['c4', 'd5']] },
    'd4 d5 Bf4': { what: 'The London System: the bishop comes out before e3 locks it in.', threat: 'White wants e3, c3, Nf3, Nd2 and a calm, solid setup.', avoid: 'Do not play passively; strike back early with ...c5.' },
    'd4 d5 Nf3': { what: 'White develops the knight and keeps all options: c4, Bf4 or e3.', threat: 'Nothing direct.', avoid: 'Do not commit to ...c6 before you see White\'s plan; ...Nf6 is always useful.' },
    'd4 d5 Nc3': { what: 'White develops the queen knight in front of the c-pawn. This is usually the start of the Jobava London with Bf4.', threat: 'A later Nb5 jumping toward c7.', avoid: 'Do not leave c7 and b5 unguarded once White\'s bishop reaches f4.' },
    'd4 d5 c4 c6': {
      idea: 'The Slav: the c6 pawn protects d5, so if White takes on d5 you recapture with the c-pawn, exactly as in the Caro-Kann. Your c8 bishop stays free to go to f5.',
      watch: 'The b-pawn is not yet supported, so watch White\'s queen on b3 hitting b7 in some lines.',
      plan: 'Develop ...Nf6, then ...dxc4 and ...Bf5, or ...Bf5 first against quiet setups.',
      mistake: 'Playing ...e6 too early and burying the light-squared bishop.',
      arrows: [['c6', 'd5']]
    },
    'd4 d5 c4 c6 Nf3': { what: 'White develops and covers e5 and d4.', threat: 'Nc3 next, putting more pressure on d5.', avoid: 'Do not play ...Bf5 before ...Nf6 here; Qb3 can hit b7 early.' },
    'd4 d5 c4 c6 cxd5': { what: 'The Exchange Slav: White trades in the center to make the position symmetrical.', threat: 'White hopes for a quiet game and a small edge from having the first move.', avoid: 'Do not recapture with the queen; ...cxd5 keeps your pawn in the center.' },
    'd4 d5 c4 c6 Nc3': { what: 'White adds pressure on d5 with the knight.', threat: 'cxd5 or e4 ideas in the center.', avoid: 'Do not play ...dxc4 too soon if White can answer e4 with a big center; develop ...Nf6 first.' },
    'd4 d5 c4 c6 Nf3 Nf6': {
      idea: 'Develop the kingside knight. It guards d5 and e4 and prepares quick castling.',
      plan: 'Against Nc3 take on c4 and follow with ...Bf5; against quiet e3 bring the bishop out first.',
      mistake: 'Grabbing the c4 pawn when White can win it back for free and you have no plan.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3': { what: 'Both White knights are out and d5 is attacked three times.', threat: 'e4 or cxd5 at a good moment.', avoid: 'Do not let White build e4 for free while you shuffle.' },
    'd4 d5 c4 c6 Nf3 Nf6 e3': { what: 'A quiet move: White supports d4 but locks the c1 bishop inside the pawn chain.', threat: 'Nc3, Bd3 and a calm buildup.', avoid: 'Do not play ...e6 first; this is the moment to bring the bishop to f5.' },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4': {
      idea: 'Take the c4 pawn. White must spend time winning it back, and you use that time to develop the bishop to f5.',
      watch: 'Do not try to hold the pawn at all costs; it is normal to give it back after White plays a4 and e3.',
      plan: 'After a4, play ...Bf5, ...e6, ...Bb4 and castle.',
      arrows: [['d5', 'c4']]
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4': { what: 'White stops ...b5, which would protect the c4 pawn.', threat: 'e3 and Bxc4, winning the pawn back.', avoid: 'Do not play ...b5 anyway: axb5 cxb5 leaves your queenside loose.', arrows: [['a4', 'b5']] },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 e3': { what: 'White prepares Bxc4 but allows you to protect the pawn.', threat: 'Bxc4 next move.', avoid: 'Do not ignore the c4 pawn; ...b5 keeps it, since a4 has not been played.' },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5': {
      idea: 'The bishop gets outside the pawn chain before ...e6, the same idea as ...Bf5 in the Caro-Kann. It also stops e4.',
      watch: 'White may play Ne5 or Nh4 to chase or trade the bishop.',
      plan: 'Continue ...e6, ...Bb4 and ...Nbd7 with short castling.',
      mistake: 'Playing ...e6 first, after which the bishop is stuck on c8.',
      arrows: [['c8', 'f5']]
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3': { what: 'White prepares Bxc4 and quietly develops.', threat: 'Bxc4 regaining the pawn.', avoid: 'Do not hold on to c4; develop instead.' },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5': { what: 'The knight jumps to e5, eyeing the c4 pawn and preparing f3 and e4.', threat: 'Nxc4 and a big center with f3 and e4.', avoid: 'Do not leave the f5 bishop without a retreat when e4 comes.' },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6': {
      idea: 'Now that the bishop is outside, ...e6 frees the f8 bishop and makes the center solid.',
      plan: 'Next ...Bb4 to pin the c3 knight, then ...Nbd7 and castle.',
      mistake: 'Delaying development with more pawn moves.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4 Bb4': {
      idea: 'Pin the c3 knight. It stops e4 and develops the last minor piece with a purpose.',
      watch: 'If White plays Qb3, the b4 bishop and b7 can become targets; keep ...a5 or ...Qb6 in mind.',
      plan: 'Castle short and develop the b8 knight to d7.',
      arrows: [['b4', 'c3']]
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4 Bb4 O-O Nbd7': {
      idea: 'The knight supports ...e5 or ...c5 later and keeps the position compact.',
      watch: 'White may play Nh4 to trade your f5 bishop; you can allow it or retreat to g6.',
      plan: 'Castle short, then free your position with ...c5 or ...e5.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 e3 b5': {
      idea: 'Since White has not played a4, ...b5 protects the c4 pawn and keeps it.',
      watch: 'White will strike at the chain with a4. Answer with ...b4 to kick the c3 knight.',
      plan: 'After a4, push ...b4 and develop with ...e6 and ...Be7.',
      arrows: [['b5', 'c4']]
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 e3 b5 a4 b4': {
      idea: 'Push past White\'s a-pawn and hit the c3 knight, so the b-pawn does not get exchanged off.',
      watch: 'The c4 pawn is still only guarded once; White can win it back with Bxc4 after the knight moves.',
      plan: 'Play ...e6 and ...Be7, then castle.',
      mistake: 'Taking on a4 and leaving c4 undefended.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 e3 b5 a4 b4 Na2 e6': {
      idea: 'Open the f8 bishop and keep a solid center. The a2 knight is badly placed, which helps you.',
      plan: 'Develop ...Be7 and castle, then ...Bb7 and ...c5.',
      mistake: 'Spending more moves protecting c4; White will win it back, and that is fine.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 e3 b5 a4 b4 Na2 e6 Bxc4 Be7': {
      idea: 'Develop and prepare to castle. White regained the pawn, but the a2 knight needs time to return.',
      plan: 'Castle, then ...Bb7, ...Nbd7 and ...c5 to free the position.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7': {
      idea: 'Challenge the e5 knight right away. If it takes on c4, your knight is ready to support the central break ...e5.',
      watch: 'Do not try to keep the c4 pawn; it was always going to be won back.',
      plan: 'After Nxc4, play ...Qc7 and then ...e5.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7 Nxc4': { what: 'White wins the pawn back with the knight.', threat: 'White would like to play e4 and take the whole center.', avoid: 'Do not allow e4 for free: prepare ...e5 first.' },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7 Nxc4 Qc7': {
      idea: 'The queen supports ...e5, so you can break in the center before White plays e4.',
      watch: 'Keep an eye on Bf4 ideas that hit your queen on c7.',
      plan: 'Next ...e5, opening lines for your pieces.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7 Nxc4 Qc7 g3': { what: 'White prepares Bg2 and Bf4, aiming at e5 and your queen.', threat: 'Bf4 with tempo on the queen, then e4.' },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7 Nxc4 Qc7 g3 e5': {
      idea: 'The key break of this line: you strike in the center with gain of space while White is still developing.',
      watch: 'After dxe5 take back with the knight, not the queen, so your queen is not exposed.',
      plan: 'Recapture on e5 with the knight, then answer Bf4 calmly with ...Nfd7.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7 Nxc4 Qc7 g3 e5 dxe5 Nxe5': {
      idea: 'Your knight takes back and lands on a strong central square, attacking the c4 knight.',
      watch: 'The e5 knight is now pinned once White plays Bf4 (it shields your queen).',
      plan: 'Meet Bf4 with ...Nfd7, defending the pinned knight.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7 Nxc4 Qc7 g3 e5 dxe5 Nxe5 Bf4': { what: 'The bishop pins your e5 knight against the queen on c7.', threat: 'Nxe5 or Bxe5 winning material if the knight is not defended enough.', avoid: 'Do not move the e5 knight while the pin is on.' },
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 Ne5 Nbd7 Nxc4 Qc7 g3 e5 dxe5 Nxe5 Bf4 Nfd7': {
      idea: 'Defend the pinned knight a second time. The position is solid and level, and your f5 bishop is still active outside the pawn chain.',
      plan: 'Next ...Be6 or ...Bb4 and castle; the pin goes away once your queen or knight moves safely.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5': {
      idea: 'With the c1 bishop already locked in by e3, you bring your own bishop out first. This is the same bishop-before-...e6 rule as in the Caro-Kann.',
      watch: 'The b7 pawn is now unprotected by the bishop; watch for Qb3.',
      plan: 'Continue ...e6 and develop calmly.',
      mistake: 'Playing ...e6 first and locking the bishop in.',
      arrows: [['c8', 'f5']]
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 Nc3': { what: 'White develops and prepares Nh4 to hunt your bishop.', threat: 'Nh4 to trade off the f5 bishop.', avoid: 'Do not leave the bishop without a retreat square; ...e6 gives it room.' },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 cxd5': { what: 'White releases the tension in the center.', threat: 'Qb3 against b7 once your bishop has left c8.', avoid: 'Do not recapture with the knight; ...cxd5 keeps the central pawn.' },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 Nc3 e6': {
      idea: 'Now ...e6 solidifies the center and gives the f5 bishop a retreat to g6.',
      watch: 'Expect Nh4 next, aiming at the bishop.',
      plan: 'Meet Nh4 with ...Bg6, then ...Nbd7 and ...Bd6.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 Nc3 e6 Nh4 Bg6': {
      idea: 'Keep the bishop. If White takes it, you recapture toward the center and open the h-file for your rook.',
      watch: 'Do not retreat to e4 or g4 where the bishop can be chased again.',
      plan: 'Allow Nxg6 and recapture with the h-pawn.',
      arrows: [['f5', 'g6']]
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 Nc3 e6 Nh4 Bg6 Nxg6 hxg6': {
      idea: 'Capture toward the center. The h-file opens for your rook on h8, which can annoy White if they castle short.',
      plan: 'Develop with ...Nbd7 and ...Bd6, and use the h-file.',
      mistake: 'Recapturing with the f-pawn, which weakens e6.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 cxd5 cxd5': {
      idea: 'Recapture with the pawn to keep it in the center, the same rule as in the Caro-Kann Exchange.',
      watch: 'White\'s queen can now go to b3 and attack b7.',
      plan: 'Be ready to protect b7 with ...Qc7, ...Qc8 or ...Qb6.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 cxd5 cxd5 Qb3 Qc7': {
      idea: 'Guard b7 and keep the queens on the board. The queen on c7 also eyes the c-file.',
      watch: 'Bb5+ is a common check here; block it with ...Bd7 or ...Nc6.',
      plan: 'Develop with ...e6 and ...Nc6, then castle.',
      mistake: 'Ignoring the b7 pawn and losing it with a rook trapped on a8.',
      arrows: [['b3', 'b7']]
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 cxd5 cxd5 Qb3 Qc7 Nc3 e6': {
      idea: 'Solid development with the bishop already outside the chain.',
      watch: 'Check Nb5 ideas hitting your queen on c7.',
      plan: 'Follow with ...Nc6, ...Bd6 or ...Be7, and castle short.'
    },
    'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5 cxd5 cxd5 Qb3 Qc7 Nc3 e6 Bd2 Nc6': {
      idea: 'The knight takes its natural square, guards d4 and b4 and supports ...Rc8 pressure.',
      plan: 'Castle short and use the open c-file.'
    },
    'd4 d5 c4 c6 cxd5 cxd5': {
      idea: 'Recapture with the pawn so you keep a pawn in the center, just like the Caro-Kann Exchange.',
      plan: 'Develop symmetrically with ...Nf6, ...Nc6 and ...Bf5.',
      mistake: 'Recapturing with the queen, which can be chased by Nc3.'
    },
    'd4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6': {
      idea: 'Develop and defend d5 a second time.',
      plan: 'Then ...Nc6 and ...Bf5, copying White\'s good moves.'
    },
    'd4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Bf4 Nc6': {
      idea: 'The knight adds pressure on d4 and controls e5 and b4.',
      watch: 'Bb5 can pin this knight; that is normal and not dangerous if you develop quickly.',
      plan: 'Bring the bishop to f5 next, then ...e6.'
    },
    'd4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Bf4 Nc6 e3 Bf5': {
      idea: 'Bishop out before ...e6, the rule that makes the Slav comfortable.',
      watch: 'With the bishop gone from c8, b7 needs watching if White plays Qb3.',
      plan: 'Play ...e6 next, then ...Bd6 or ...Be7 and castle.',
      arrows: [['c8', 'f5']]
    },
    'd4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Bf4 Nc6 e3 Bf5 Nf3 e6': {
      idea: 'Now ...e6 opens the f8 bishop. The position is symmetrical, so careful development is enough.',
      plan: 'Develop ...Bd6 or ...Be7, castle, then put a rook on c8.'
    },
    'd4 d5 c4 c6 Nc3 Nf6': {
      idea: 'Develop and guard d5. After 4.Nf3 the position is the main Slav by another move order.',
      plan: 'Answer Nf3 with ...dxc4 and ...Bf5, as in S01.',
      watch: 'If White plays e4 ideas, keep d5 covered with your pieces.'
    },
    'd4 d5 Bf4 Nf6': {
      idea: 'Develop and control e4 before deciding on your pawn structure.',
      plan: 'Strike with ...c5 and develop the b8 knight to c6.',
      mistake: 'Playing a slow ...c6 against the London; ...c5 is more active here.'
    },
    'd4 d5 Bf4 Nf6 e3 c5': {
      idea: 'Hit d4 right away. The London player wants a quiet setup, so you make them deal with central pressure.',
      watch: 'If White takes on c5 with dxc5, you can usually win the pawn back with ...e6 and ...Bxc5.',
      plan: 'Develop ...Nc6 and look for ...Qb6 against b2.',
      arrows: [['c5', 'd4']]
    },
    'd4 d5 Bf4 Nf6 e3 c5 c3 Nc6': {
      idea: 'A third attacker on d4. The knight also controls e5 and b4.',
      watch: 'White\'s bishop on f4 can come to b8 or c7 squares if your queen leaves d8 carelessly.',
      plan: 'Develop with ...e6 and ...Bd6, or try ...Qb6 against b2.',
      arrows: [['c6', 'd4']]
    },
    'd4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6': {
      idea: 'Open the f8 bishop and prepare to offer a trade of bishops with ...Bd6.',
      watch: 'Your c8 bishop is now behind the pawns; that is acceptable here because your pawns are on c5 and d5, not c6.',
      plan: 'Play ...Bd6 and castle.'
    },
    'd4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6': {
      idea: 'Challenge White\'s best minor piece, the f4 bishop. Trading it removes the London\'s main asset.',
      watch: 'If White plays Bxd6, recapture with the queen and you control e5.',
      plan: 'Castle short next.',
      arrows: [['d6', 'f4']]
    },
    'd4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6 Bg3 O-O': {
      idea: 'King safety first. Your position is fully developed and you can choose a plan.',
      plan: 'Consider ...Qc7 and ...Bxg3, or ...b6 and ...Bb7.'
    },
    'd4 d5 Nf3 Nf6': {
      idea: 'Develop and keep options open until White reveals a plan.',
      plan: 'Against Bf4 hit d4 with ...c5; against e3 bring the bishop out with ...Bf5.',
      mistake: 'Playing ...e6 early and shutting in the c8 bishop.'
    },
    'd4 d5 Nf3 Nf6 Bf4': { what: 'The London by a different move order.', threat: 'A calm e3, c3, Nbd2 setup.', avoid: 'Do not sit back; ...c5 is the active answer.' },
    'd4 d5 Nf3 Nf6 e3': { what: 'The Colle System: White locks the c1 bishop in and plans Bd3, O-O and later e4.', threat: 'Bd3 and e4 with an attack on your king.', avoid: 'Do not play ...e6 first; that lets White\'s Bd3 dominate.' },
    'd4 d5 Nf3 Nf6 Bf4 c5': {
      idea: 'Same idea as against 2.Bf4: hit d4 at once.',
      plan: 'Develop ...Nc6 and use ...Qb6 against b2.',
      arrows: [['c5', 'd4']]
    },
    'd4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6': {
      idea: 'Add pressure on d4 and prepare ...Qb6.',
      plan: 'If White plays c3, ...Qb6 attacks b2 directly.'
    },
    'd4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6 c3 Qb6': {
      idea: 'The queen hits b2 and adds pressure on d4. White must spend time defending.',
      watch: 'White may answer Qb3 to offer a queen trade; that is fine for you.',
      plan: 'If Qb3, push ...c4 to gain space before the trade.',
      arrows: [['b6', 'b2']]
    },
    'd4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6 c3 Qb6 Qb3 c4': {
      idea: 'Gain space with tempo on the queen. If White trades, you recapture toward the center with the a-pawn and open the a-file.',
      watch: 'The c4 pawn is a long-term space gain; make sure b3 and b5 do not undermine it cheaply.',
      plan: 'After Qxb6 axb6 use the a-file and push ...b5.',
      arrows: [['c5', 'c4']]
    },
    'd4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6 c3 Qb6 Qb3 c4 Qxb6 axb6': {
      idea: 'Recapturing with the a-pawn opens the a-file for your rook on a8.',
      plan: 'Play ...b5-b4 to attack White\'s queenside and develop with ...Bf5 and ...e6.'
    },
    'd4 d5 Nf3 Nf6 e3 Bf5': {
      idea: 'Against the Colle, get the bishop out before ...e6. In normal Colle positions Black plays ...e6 early and the bishop stays stuck; here it is active and fights Bd3.',
      watch: 'White may offer a bishop trade with Bd3; that is fine for you.',
      plan: 'Continue ...e6, ...Bd6 and castle.',
      arrows: [['c8', 'f5']]
    },
    'd4 d5 Nf3 Nf6 e3 Bf5 Bd3 e6': {
      idea: 'Support the bishop and open the f8 bishop. If White trades on f5, your structure stays healthy.',
      plan: 'Recapture on f5 with the e-pawn if White takes, then ...Bd6 and castle.'
    },
    'd4 d5 Nf3 Nf6 e3 Bf5 Bd3 e6 Bxf5 exf5': {
      idea: 'Recapture with the e-pawn. The doubled f-pawns control e4, so White\'s planned e4 push is much harder.',
      watch: 'The e-file is now half open; your king should castle soon.',
      plan: 'Play ...Bd6 and ...O-O, then ...Ne4.'
    },
    'd4 d5 Nf3 Nf6 e3 Bf5 Bd3 e6 Bxf5 exf5 O-O Bd6': {
      idea: 'Develop to an active square aiming at the kingside and h2.',
      plan: 'Castle, then ...Ne4 and ...Qe7.'
    },
    'd4 d5 Nc3 Nf6': {
      idea: 'Develop and control e4 so White cannot play e4 easily.',
      plan: 'If Bf4 comes, play ...c6 to take b5 away from White\'s knight.'
    },
    'd4 d5 Nc3 Nf6 Bf4 c6': {
      idea: 'The Caro-Kann/Slav pawn on c6 guards b5. White\'s typical Jobava trick Nb5, aiming at c7, never works because the knight cannot land on b5.',
      plan: 'Develop ...Bf5, ...e6, ...Nbd7 and ...Be7.',
      mistake: 'Allowing Nb5 hitting c7 with your queen and bishop unready.',
      arrows: [['c6', 'b5']]
    },
    'd4 d5 Nc3 Nf6 Bf4 c6 e3 Bf5': {
      idea: 'Bishop out before ...e6, the Caro-Kann rule.',
      watch: 'Your b7 pawn is unprotected; check Rb1 or Qc1 ideas only later.',
      plan: 'Play ...e6 next.',
      arrows: [['c8', 'f5']]
    },
    'd4 d5 Nc3 Nf6 Bf4 c6 e3 Bf5 Bd3 e6': {
      idea: 'Solid center; the bishop can retreat to g6 if traded.',
      plan: 'Develop ...Nbd7 and ...Be7, then castle.'
    },
    'd4 d5 Nc3 Nf6 Bf4 c6 e3 Bf5 Bd3 e6 Nf3 Nbd7': {
      idea: 'The knight supports ...e5 or ...c5 and keeps f6 protected.',
      plan: 'Castle short after ...Be7.'
    },
    'd4 d5 Nc3 Nf6 Bf4 c6 e3 Bf5 Bd3 e6 Nf3 Nbd7 O-O Be7': {
      idea: 'Final piece developed; castle next.',
      plan: 'After castling, free the game with ...c5 or ...Ne4.'
    },
    'c4 c6': {
      idea: 'Prepare ...d5 so that if White takes on d5, you recapture with the c-pawn. Same structure as your Slav and Caro-Kann.',
      plan: 'Play ...d5 next.',
      mistake: 'Playing ...d5 too early in some lines, letting White take and win time on your queen.'
    },
    'c4 c6 Nf3': { what: 'White develops and keeps d4 in reserve.', threat: 'A quiet setup with e3 or g3.', avoid: 'Do not abandon the plan; ...d5 now.' },
    'c4 c6 d4': { what: 'White transposes toward a Queen\'s Gambit.', threat: 'Nothing new.', avoid: 'Do not miss the chance: ...d5 reaches the Slav.' },
    'c4 c6 Nf3 d5': {
      idea: 'Claim the center with the Slav structure in place.',
      plan: 'Develop ...Nf6, then decide between ...Bf5 and ...e6.'
    },
    'c4 c6 Nf3 d5 e3 Nf6': {
      idea: 'Develop and guard d5 again.',
      plan: 'If White plays Nc3, ...e6 leads to a solid Semi-Slav setup.'
    },
    'c4 c6 Nf3 d5 e3 Nf6 Nc3 e6': {
      idea: 'With White\'s c1 bishop still at home and Nc3 played, ...e6 builds a solid Semi-Slav triangle (c6, d5, e6).',
      watch: 'The c8 bishop is inside the chain; free it later with ...dxc4 and ...b5, or ...e5.',
      plan: 'Develop ...Nbd7 and ...Bd6.'
    },
    'c4 c6 Nf3 d5 e3 Nf6 Nc3 e6 d4 Nbd7': {
      idea: 'Flexible development supporting ...e5 or ...c5 breaks.',
      plan: 'Play ...Bd6 and castle, then ...dxc4 and ...e5.'
    },
    'c4 c6 d4 d5': {
      idea: 'You have reached the Slav by a different move order.',
      plan: 'Continue with ...Nf6, ...dxc4 and ...Bf5 as in the main lines.'
    },
    'Nf3 d5': {
      idea: 'Take the center first; your Slav pieces follow.',
      plan: 'Develop ...Nf6, ...c6 and ...Bf5.'
    },
    'Nf3 d5 g3 Nf6': {
      idea: 'Develop and control e4 against White\'s fianchetto.',
      plan: 'Next ...c6 and ...Bf5 or ...Bg4.'
    },
    'Nf3 d5 g3 Nf6 Bg2 c6': {
      idea: 'Blunt the g2 bishop along the long diagonal and support d5.',
      plan: 'Bring the c8 bishop out to f5 or g4.',
      arrows: [['c6', 'd5']]
    },
    'Nf3 d5 g3 Nf6 Bg2 c6 O-O Bf5': {
      idea: 'Bishop out before ...e6, the same rule as in the Slav and Caro-Kann.',
      watch: 'If White plays Nh4, retreat to g6 or e4 rather than allowing a cheap trade.',
      plan: 'Play ...e6, ...Be7 and ...O-O.',
      arrows: [['c8', 'f5']]
    },
    'Nf3 d5 g3 Nf6 Bg2 c6 O-O Bf5 d3 e6': {
      idea: 'Complete the solid triangle and open the f8 bishop.',
      watch: 'White may prepare e4; your bishop on f5 and knight on f6 already watch that square.',
      plan: 'Develop ...Be7, ...Nbd7 and castle.'
    },
    'd4 d5 e4': { what: 'The Blackmar-Diemer Gambit: White offers the e-pawn for quick development and attack.', threat: 'If you take with ...dxe4, White plays Nc3 and f3 to open lines against your king.', avoid: 'Do not grab material without a plan; ...c6 takes you into your own Caro-Kann.' },
    'd4 d5 e4 c6': { idea: 'This position is exactly the Caro-Kann after 1.e4 c6 2.d4 d5, the opening you already play as Black. You avoid the gambit completely.', plan: 'Against Nc3 take on e4 and play ...Bf5; against e5 play ...Bf5 and ...e6.', arrows: [['c6', 'd5']] },
    'd4 d5 e4 dxe4': { idea: 'Accept the gambit and keep the extra pawn, but expect White to attack quickly.', watch: 'After Nc3 and f3, White opens lines; develop fast and castle.', plan: '...Nf6, then take on f3 and fianchetto with ...g6 and ...Bg7.', alt: true, label: 'Sharp alternative' },
    'd4 d5 e4 c6 Nc3': { what: 'White defends e4 with the knight, like the Caro-Kann Classical.', threat: 'Keeping a big center with e4 and d4.', avoid: 'Do not play ...e6 first; take on e4 and develop the bishop.' },
    'd4 d5 e4 c6 e5': { what: 'White pushes past, like the Caro-Kann Advance.', threat: 'Space on the kingside and a cramped Black position.', avoid: 'Do not play ...e6 before ...Bf5, or your bishop gets locked in.' },
    'd4 d5 e4 c6 Nc3 dxe4': { idea: 'Take on e4 to open the way for your bishop, just like in the Caro-Kann Classical.', plan: 'After Nxe4, play ...Bf5.' },
    'd4 d5 e4 c6 Nc3 dxe4 Nxe4 Bf5': { idea: 'Bishop out with tempo on the e4 knight, the key Caro-Kann move.', plan: 'If Ng3, drop back to g6.', arrows: [['c8', 'f5']] },
    'd4 d5 e4 c6 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6': { idea: 'The bishop stays active on the h7-b1 diagonal.', watch: 'If h4, answer ...h6 so h5 does not trap your bishop.', plan: '...Nd7, ...Ngf6 and ...e6, as in your Caro-Kann course.' },
    'd4 d5 e4 c6 e5 Bf5': { idea: 'Bishop out before ...e6, the Caro-Kann Advance rule.', plan: 'Then ...e6 and ...c5.', arrows: [['c8', 'f5']] },
    'd4 d5 e4 c6 e5 Bf5 Nf3 e6': { idea: 'Now that the bishop is out, ...e6 opens your f8 bishop.', plan: 'Next ...c5 to hit d4.' },
    'd4 d5 e4 c6 e5 Bf5 Nf3 e6 Be2 c5': { idea: 'Strike at the base of White\'s pawn chain, the standard Caro-Kann Advance break.', watch: 'Do not take on d4 too early if it frees White\'s pieces; develop ...Nc6 first.', plan: '...Nc6, ...Nge7 and pressure on d4.' },
    'd4 d5 e4 dxe4 Nc3 Nf6': { idea: 'Develop and attack the e4 pawn again.', plan: 'If f3, take on f3 and develop quickly.' },
    'd4 d5 e4 dxe4 Nc3 Nf6 f3 exf3': { idea: 'Take on f3 so you are not left defending e4 forever.', watch: 'White gets an open f-file against f7; castle quickly.', plan: '...g6, ...Bg7 and ...O-O.' },
    'd4 d5 e4 dxe4 Nc3 Nf6 f3 exf3 Nxf3 g6': { idea: 'Fianchetto to protect your king and point the bishop at d4.', plan: '...Bg7 and castle.' },
    'd4 d5 e4 dxe4 Nc3 Nf6 f3 exf3 Nxf3 g6 Bc4 Bg7': { idea: 'The bishop guards the kingside and hits d4.', watch: 'Watch f7: White\'s bishop on c4 and the f-file both aim there.', plan: 'Castle next.' },
    'd4 d5 e4 dxe4 Nc3 Nf6 f3 exf3 Nxf3 g6 Bc4 Bg7 O-O O-O': { idea: 'Your king is safe and you are still a pawn up.', plan: 'Play ...c5 or ...Nc6 against d4 and trade pieces.' },
    'd4 d5 Bg5': { what: 'White develops the bishop to g5 early, aiming at e7 and ready to trade on f6.', threat: 'Pressure on e7 and an easy London-style setup.', avoid: 'Do not leave b7 and b2 alone: once the bishop leaves c1, b2 is loose.' },
    'd4 d5 Bg5 h6': { idea: 'Ask the bishop a question right away.', plan: 'After Bh4, ...c6 and ...Qb6 hit b2.' },
    'd4 d5 Bg5 h6 Bh4 c6': { idea: 'The Slav pawn on c6 supports d5 and opens the d8-a5 diagonal for your queen.', plan: 'Next ...Qb6, hitting b2.' },
    'd4 d5 Bg5 h6 Bh4 c6 e3 Qb6': { idea: 'The queen attacks b2, which has no bishop to defend it.', watch: 'If White ignores it, ...Qxb2 is a real option, but check that your queen can get back.', plan: 'Then ...Bf5 and ...e6.', arrows: [['b6', 'b2']] },
    'd4 d5 Bg5 h6 Bh4 c6 e3 Qb6 Nf3 Bf5': { idea: 'Bishop out before ...e6, the same rule as always.', plan: 'If Bd3, trade bishops.', arrows: [['c8', 'f5']] },
    'd4 d5 Bg5 h6 Bh4 c6 e3 Qb6 Nf3 Bf5 Bd3 Bxd3': { idea: 'Trade bishops: White\'s good bishop disappears and you keep a healthy structure.', plan: 'After cxd3, play ...e6.' },
    'd4 d5 Bg5 h6 Bh4 c6 e3 Qb6 Nf3 Bf5 Bd3 Bxd3 cxd3 e6': { idea: 'Solid structure, easy development, and the queen still eyes b2.', plan: '...Nf6, ...Nbd7 and ...Be7, then castle.' },
    'd4 d5 e3': { what: 'A quiet Colle or Stonewall-style move.', threat: 'Bd3 and f4 or c3 setups.', avoid: 'Do not play passively; develop and strike with ...c5.' },
    'd4 d5 e3 Nf6': { idea: 'Develop the knight first.', plan: 'Against Bd3, play ...c5.' },
    'd4 d5 e3 Nf6 Bd3 c5': { idea: 'Strike at d4 before White completes the setup.', plan: '...Nc6 and ...Bg4.' },
    'd4 d5 e3 Nf6 Bd3 c5 Nf3 Nc6': { idea: 'Develop and add pressure on d4.', plan: 'Next ...Bg4, getting the bishop out before ...e6.' },
    'd4 d5 e3 Nf6 Bd3 c5 Nf3 Nc6 c3 Bg4': { idea: 'The bishop pins the f3 knight before ...e6 locks it in.', watch: 'Qb3 can hit b7; ...Qd7 or ...c4 can answer it.', plan: '...e6, ...Bd6 and castle.', arrows: [['c8', 'g4']] },
    'd4 d5 g3': { what: 'White prepares a fianchetto with Bg2.', threat: 'Pressure on d5 down the long diagonal.', avoid: 'Do not neglect d5; keep it well supported.' },
    'd4 d5 g3 Nf6': { idea: 'Develop and support d5.', plan: 'Next ...Bf5.' },
    'd4 d5 g3 Nf6 Bg2 Bf5': { idea: 'Bishop out before ...e6.', plan: 'Then ...e6 and ...c6.', arrows: [['c8', 'f5']] },
    'd4 d5 g3 Nf6 Bg2 Bf5 Nf3 e6': { idea: 'Open the f8 bishop now that the c8 bishop is out.', plan: '...c6 and castle.' },
    'd4 d5 g3 Nf6 Bg2 Bf5 Nf3 e6 O-O c6': { idea: 'The c6 pawn supports d5 and blunts the g2 bishop: your full Slav setup.', plan: '...Be7, ...Nbd7, ...h6 and castle.' },
    'd4 d5 Nf3 Nf6 c4': { what: 'White plays c4 after Nf3, a Queen\'s Gambit by another move order.', threat: 'cxd5 or pressure on d5.', avoid: 'Do not let d5 drop; support it with ...c6.' },
    'd4 d5 Nf3 Nf6 c4 c6': { idea: 'This is the main Slav position by a different move order.', plan: 'After Nc3, take on c4 and play ...Bf5 when White plays a4.' }
  };
})(typeof window !== 'undefined' ? window : globalThis);
