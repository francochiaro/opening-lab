(function (g) {
  g.OL_ANN = g.OL_ANN || {};
  g.OL_ANN.caro = {
    '@lessons': [
      { title: 'What ...c6 supports',
        body: 'The quiet move 1...c6 prepares 2...d5 so that if White ever captures exd5, Black can recapture with the c-pawn and keep a pawn in the center. It also keeps the c8 bishop free, unlike the French Defense where ...e6 locks it in. The cost is time: the c-pawn move does not develop a piece, so Black must catch up with fast, sensible development.' },
      { title: 'Bishop out before ...e6',
        body: 'In most lines Black plays ...Bf5 (or ...Bg4) before ...e6. Once the e-pawn reaches e6, the light-squared bishop on c8 is shut inside its own pawn chain and becomes a passive piece. Getting it outside first means every Black piece has a job, and the solid ...e6 / ...d5 / ...c6 structure that follows is comfortable.' },
      { title: 'Fighting an advanced center',
        body: 'When White pushes e5 (the Advance Variation), White gains space but the d4 pawn becomes a target. Black attacks the base of the chain with ...c5, often supported by ...Nc6, ...Qb6 and ...Nge7-f5, all hitting d4. A later ...f6 can also challenge e5. Do not rush ...c5 before your pieces are ready, and do not grab pawns without first checking what White gets in return.' }
    ],
    '@plans': {
      C15: "A symmetrical structure with your bishop active on f5. Castle, then play ...Bd6 and ...Rc8, and use the c-file against White's queenside.",
      C16: "Your pieces are well placed and White's bishop has moved several times. Continue ...e6, ...Nf6, ...Bd6 and castle, then play on the c-file.",
      C17: "You have a free position with the bishop outside the pawn chain. Play ...e6, ...Nbd7 and castle; White's light-squared bishop has already moved three times.",
      C18: "You are a pawn up. Finish development with ...e6, ...Nbd7 and castle, and keep your queen away from squares where White gains time on it.",
      C19: "An Advance-style Caro-Kann where White has also played f4. Play ...c5 to hit d4, then ...Nc6 and ...Qb6, while the h5 pawn stops g4.",
      C20: "The queens are gone and White's king has lost the right to castle. Develop ...Bc5 or ...Bb4, castle, and play against White's loose e4 and f4 pawns.",

      C01: 'Black usually continues ...Ngf6, ...Qc7 and ...Be7, and often castles queenside because White has pushed h4-h5 on the kingside. Look for the ...c5 break to challenge d4 once your king is safe.',
      C01B: 'This is the same structure as the 6.h4 main line reached by a different move order. Finish development with ...e6, ...Ngf6 and ...Bd6 or ...Be7, then decide where your king is safest.',
      C02: 'After 3.Nd2 and 4.Nxe4 the position is identical to the 3.Nc3 Classical, so the same plan applies: ...e6, ...Ngf6, ...Qc7, and a timely ...c5. The h7 bishop is a strong, safe piece.',
      C03: 'The knight on e7 heads to f5, where it attacks d4 together with the c6 knight. Keep piling up on d4 with ...Qb6 and ...Rc8, and look for ...Be7 and ...O-O. If White ever over-defends d4, a later ...f6 can open the f-file.',
      C04: 'With the h-pawns blocked and the light-squared bishops traded, Black has no bad bishop. Pressure d4 and b2 with ...Qb6, ...c5 and ...Nc6, develop with ...Ne7 and ...Nf5, and keep the king in the center or castle long when it is safe.',
      C05: 'Black hits d4 with ...c5, ...Nc6 and ...Qb6, and watches the g6 bishop: White would like h4-h5 to trap it, so keep ...h5 or ...h6 in mind as an escape plan. Trade on d4 when it opens lines for your pieces, not before.',
      C06: 'This is a symmetrical structure where Black has an active light-squared bishop. Develop with ...Bd6 or ...Be7, castle short, and consider the minority-attack-style ...b5-b4 to weaken White\'s c3 pawn.',
      C07: 'White has an isolated d4 pawn. Black wants to blockade the square in front of it (d5), trade pieces, and later attack the pawn with ...Rd8 and ...Nf6-d5. Every trade makes the isolated pawn weaker.',
      C08: 'Black keeps a solid center and uses the b6 bishop to aim at d4 and, after White castles short, at the g1 king. Typical continuations are ...Nd7, ...c5 or ...dxe4 at the right moment, and ...O-O.',
      C08B: 'The position is open and tactical. Finish development with ...Bd6 and ...O-O, keep the h5-pin on the f3 knight, and always check White\'s Qb3 and Bxf7+ ideas against f7 before making a move.',
      C09: 'Black has given up the light-squared bishop but has a solid structure and quick development. Continue with ...Ngf6 or ...Nf6 driving the queen, ...Be7 or ...Bd6, and ...O-O, then aim for ...c5 or ...e5 to free the position.',
      C10: 'The queens are gone and White has lost the right to castle. Black plays ...e5, ...Bc5 or ...Bd6, and often ...O-O-O with the rook landing on the d-file with tempo against the white king.',
      C12: 'This is an Advance-style structure: Black attacks d4 with ...Nc6, ...Qb6 and ...cxd4, and the knight can reach f5 via e7. The light-squared bishop is already outside the chain on g4.',
      C13: 'Against the King\'s Indian Attack Black has a big center. Keep it with ...a5, ...Nbd7 or ...Na6, and ...Bf8 if needed, and watch for White\'s f4 or Nh4-f5 ideas on the kingside.',
      C14: 'The pawn structure resembles the Panov with an isolated or semi-open d-file. Black castles short, develops ...Be7, and blockades with pieces on d5. Watch the pin on the c6 knight from b5.'
    },

    'e4 c6': {
      idea: 'The Caro-Kann prepares 2...d5. If White later plays exd5, Black recaptures with the c-pawn and keeps a central pawn.',
      plan: 'Next play ...d5 to challenge e4 directly.',
      mistake: 'Do not drift with slow moves. ...c6 already used one tempo, so follow up with ...d5 and quick development.',
      arrows: [['c6', 'd5']]
    },
    'e4 c6 d4': {
      what: 'White builds the classical big center with pawns on e4 and d4.',
      threat: 'Nothing immediate, but White would like to keep both pawns in the center.',
      avoid: 'Do not play passively. Challenge the center right away with ...d5.'
    },
    'e4 c6 Nc3': {
      what: 'White develops a knight and defends e4 in advance, keeping options for d4 or a quieter setup.',
      threat: 'If Black plays ...d5, White can answer Nf3 and keep the center flexible.',
      avoid: 'Do not forget the plan: ...d5 is still the point of the opening.'
    },
    'e4 c6 Nf3': {
      what: 'White develops the kingside knight first, keeping d4, d3 or e5 in reserve.',
      threat: 'White hopes Black will play routinely and walk into a pin or a queen trade on the d-file.',
      avoid: 'Do not forget ...d5. Hitting e4 is still the main idea.'
    },
    'e4 c6 d3': {
      what: 'White chooses a quiet King\'s Indian Attack setup instead of fighting for d4.',
      threat: 'White plans Nd2, Ngf3, g3, Bg2 and O-O, then may push e5 or f4 later.',
      avoid: 'Do not be too modest. Without a white pawn on d4, Black can take a big center with ...d5 and ...e5.'
    },
    'e4 c6 c4': {
      what: 'White attacks d5 in advance. This is the Accelerated Panov idea.',
      threat: 'After ...d5 and exd5 cxd5, White can play cxd5 and try to keep the extra pawn.',
      avoid: 'Do not abandon ...d5. It is still the natural answer, and the pawn can be regained.'
    },
    'e4 c6 d4 d5': {
      idea: 'Black strikes at e4. White must decide whether to defend it, push past it with e5, or exchange on d5.',
      watch: 'Each of White\'s choices leads to a different structure, so look at what White plays before reacting automatically.',
      plan: 'Against 3.Nc3 or 3.Nd2 take on e4; against 3.e5 develop ...Bf5; against 3.exd5 recapture ...cxd5.',
      arrows: [['d5', 'e4']]
    },
    'e4 c6 d4 d5 Nc3': {
      what: 'White defends e4 with the knight. This is the Classical (Main Line) Caro-Kann.',
      threat: 'If Black does nothing, White can play e5 with a knight already on c3.',
      avoid: 'Do not play ...e6 here: it turns into a French Defense with your c8 bishop locked in.'
    },
    'e4 c6 d4 d5 Nd2': {
      what: 'White defends e4 with the knight from d2, keeping the c-pawn free.',
      threat: 'After ...dxe4 Nxe4 the position is exactly the same as 3.Nc3 dxe4 4.Nxe4, so this is a transposition.',
      avoid: 'Do not worry about the move order; the same ...dxe4 and ...Bf5 plan works.'
    },
    'e4 c6 d4 d5 e5': {
      what: 'White pushes past the d5 pawn and grabs space. This is the Advance Variation.',
      threat: 'White wants to cramp Black and keep the e5 pawn as a wedge. The d4 pawn that supports it is White\'s weak point.',
      avoid: 'Do not play ...e6 first: it would shut the c8 bishop inside the pawn chain. Develop ...Bf5 before ...e6.'
    },
    'e4 c6 d4 d5 exd5': {
      what: 'White exchanges in the center. This is the Exchange Variation, and it leads to a symmetrical pawn structure after ...cxd5.',
      threat: 'White hopes to develop quickly and play Bd3, c3 and Bf4.',
      avoid: 'Do not take back with the queen: ...Qxd5 would be chased by Nc3 with tempo.'
    },
    'e4 c6 d4 d5 f3': {
      what: 'This is the Fantasy Variation. White supports e4 with the f-pawn so that after ...dxe4 fxe4 White has a broad center.',
      threat: 'White wants a big center and open lines on the kingside for an attack.',
      avoid: 'Do not play routinely: this line is sharper than it looks. The solid answer is 3...e6.'
    },
    'e4 c6 d4 d5 Nc3 dxe4': {
      idea: 'Black gives up the center for a moment to free the c8 bishop with tempo. After Nxe4 the bishop comes to f5 and attacks the knight.',
      watch: 'Do not delay: if you allow e5, Black loses this option.',
      plan: 'After 4.Nxe4 play ...Bf5, developing the bishop and attacking the knight.',
      mistake: 'Playing ...e6 instead, which closes the c8 bishop in.'
    },
    'e4 c6 d4 d5 Nd2 dxe4': {
      idea: 'The same plan as against 3.Nc3: capture on e4 so the c8 bishop can come out with tempo after Nxe4.',
      plan: 'After 4.Nxe4 play ...Bf5. The position is the same as the 3.Nc3 line.',
      mistake: 'Treating 3.Nd2 as a different opening. It transposes to the Classical.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5': {
      idea: 'The bishop develops outside the pawn chain and attacks the e4 knight. This is why Black plays ...Bf5 before ...e6.',
      watch: 'White will chase the bishop with Ng3 and h4. Keep an escape route ready.',
      plan: 'After Ng3 retreat to g6, then meet h4 with ...h6 so the bishop can drop to h7.',
      mistake: 'Leaving the bishop on c8 and playing ...e6 first. It becomes a passive piece for the rest of the game.',
      arrows: [['f5', 'e4']]
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6': {
      idea: 'The bishop steps back to g6, still on the long b1-h7 diagonal, and stays outside the pawn chain.',
      watch: 'White may play h4 and h5 to chase the bishop. Make sure it always has a square.',
      plan: 'Against h4 play ...h6, so after h5 the bishop retreats to h7.',
      mistake: 'Retreating to d7 or c8, which wastes the work of developing it.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4': {
      what: 'White pushes the h-pawn to h5 next, aiming to trap or chase the g6 bishop.',
      threat: 'h5 would attack the bishop. If h7 is blocked, the bishop has few squares.',
      avoid: 'Do not ignore the threat. Play ...h6 so the bishop can use h7.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 Nf3': {
      what: 'White develops first and keeps h4 in reserve. This often transposes to the 6.h4 main line.',
      threat: 'Ne5 can hit the g6 bishop, and h4-h5 may still come.',
      avoid: 'Do not allow Ne5 for free: ...Nd7 controls e5.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6': {
      idea: 'This gives the bishop the h7 square. After h5 it can retreat to h7 and stay active.',
      watch: 'Black\'s kingside pawns are slightly loosened, which is one reason Black often castles queenside later.',
      plan: 'Continue ...Nd7, ...e6 and ...Ngf6.',
      mistake: 'Playing ...h5 here. The g6 bishop would have no h7 square later and the g5 square becomes weak.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7': {
      idea: 'The knight controls e5, so White cannot jump Ne5 to hit the g6 bishop.',
      plan: 'After h5 retreat ...Bh7, then develop ...e6 and ...Ngf6.',
      mistake: 'Developing ...Nf6 first, which allows Ne5 and pressure on g6 and f7.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7': {
      idea: 'The bishop drops into h7, the square ...h6 prepared. It stays on the useful b1-h7 diagonal.',
      watch: 'White will offer to trade it with Bd3. Trading is fine for Black.',
      plan: 'Answer Bd3 with ...Bxd3, then play ...e6 and ...Ngf6.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7 Bd3 Bxd3': {
      idea: 'Trading bishops removes White\'s most active attacking piece and brings the white queen forward.',
      plan: 'Recapture is forced for White; then play ...e6 and ...Ngf6.',
      mistake: 'Leaving the bishop on h7 to be captured with Bxh7, which pulls your rook to h7 or loses time. Trading on d3 is simpler.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7 Bd3 Bxd3 Qxd3 e6': {
      idea: 'Now that the light-squared bishop has been traded, ...e6 is safe: it does not lock in any bishop and it builds the solid Caro-Kann structure.',
      watch: 'White often plays Bd2 or Bf4 and castles queenside. Keep an eye on checks like Qb5 or Qa5+ ideas.',
      plan: 'Continue ...Ngf6, ...Qc7, ...Be7 or ...Bd6, and decide on castling side.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 Nf3 Nd7': {
      idea: 'As in the main line, ...Nd7 stops Ne5 hitting the g6 bishop.',
      plan: 'If h4 comes, answer ...h6 and after h5 drop the bishop to h7.',
      mistake: 'Allowing Ne5 by developing ...Nf6 too early.'
    },
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 Nf3 Nd7 h4 h6': {
      idea: 'The same ...h6 resource: the bishop gets h7 after h5. This transposes back to the main line.',
      plan: 'After h5 play ...Bh7, then ...e6 and ...Ngf6.'
    },
    'e4 c6 d4 d5 e5 Bf5': {
      idea: 'The bishop develops before ...e6. Once ...e6 is played, the bishop would be locked behind its own pawns, so it comes out first.',
      watch: 'White may chase it with g4 or h4-g4. Keep track of its retreat squares (g6, h7, e4).',
      plan: 'Next ...e6, then attack d4 with ...c5, ...Nc6 and ...Qb6.',
      mistake: 'Playing ...c5 immediately. It gives up a tempo and White can play dxc5 with an easy game.',
      arrows: [['c8', 'f5']]
    },
    'e4 c6 d4 d5 e5 Bf5 Nf3': {
      what: 'White develops calmly. This is the Short System: Nf3, Be2, O-O and c3.',
      threat: 'No direct threat. White wants to keep the e5 and d4 chain solid.',
      avoid: 'Do not rush ...c5 before ...e6; complete your development in order.'
    },
    'e4 c6 d4 d5 e5 Bf5 Be2': {
      what: 'White starts with Be2. After Nf3, O-O and c3 this reaches the same position as the 4.Nf3 line.',
      threat: 'Be2-g4 ideas can try to trade off the active f5 bishop.',
      avoid: 'Do not panic about the move order: play ...e6, ...c5 and ...Nc6 as usual.'
    },
    'e4 c6 d4 d5 e5 Bf5 h4': {
      what: 'White threatens g4 and h5 to hunt the f5 bishop. This is an aggressive try.',
      threat: 'g4 followed by h5 can trap the bishop if Black is careless.',
      avoid: 'Do not allow h5 freely. Stop the pawn with ...h5 so the bishop keeps g6 and other squares.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nc3': {
      what: 'White develops the knight, preparing g4 to chase the f5 bishop with gain of space.',
      threat: 'g4 and later h4-h5 to trap the bishop on g6.',
      avoid: 'Do not forget ...e6 first; it gives the bishop room and prepares ...c5.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nf3 e6': {
      idea: 'Now that the bishop is outside, ...e6 is safe. It supports d5 and opens the f8 bishop.',
      plan: 'Strike at d4 with ...c5, backed by ...Nc6.',
      mistake: 'Taking pawns early or moving the f5 bishop again without a reason.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5': {
      idea: 'This is the key break in the Advance. Black attacks d4, the base of White\'s pawn chain.',
      watch: 'Make sure your king is not caught in the center if the position opens. Keep development going.',
      plan: 'Add ...Nc6, and later ...Qb6 and ...Nge7-f5 to pile on d4.',
      arrows: [['c5', 'd4']]
    },
    'e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 O-O Nc6': {
      idea: 'The knight adds a second attacker on d4 and develops toward the center.',
      plan: 'If White supports with c3, exchange ...cxd4 and bring the other knight to f5.',
      mistake: 'Playing ...c4 too early, which releases the pressure on d4.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 O-O Nc6 c3 cxd4': {
      idea: 'Exchanging opens the c-file for Black and makes d4 a fixed target.',
      plan: 'After cxd4 bring the g8 knight to e7 and then f5.',
      mistake: 'Grabbing on d4 with a piece too early. Develop first.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 O-O Nc6 c3 cxd4 cxd4 Nge7': {
      idea: 'The knight heads to f5, where it joins the c6 knight in attacking d4.',
      watch: 'White may play Nh4 or Bd3 to trade off your f5 pieces. Keep enough attackers on d4.',
      plan: 'Continue ...Nf5, ...Be7 and ...O-O, and use the c-file with ...Rc8.',
      arrows: [['e7', 'f5']]
    },
    'e4 c6 d4 d5 e5 Bf5 Be2 e6': {
      idea: 'The bishop is already out, so ...e6 is safe. After Nf3 this is the same as the 4.Nf3 line.',
      plan: 'Continue ...c5 and ...Nc6 against d4.',
      mistake: 'Allowing Bg4 to trade your good bishop without a fight; ...Bg6 or ...Bxg4 is fine if it comes.'
    },
    'e4 c6 d4 d5 e5 Bf5 h4 h5': {
      idea: 'Black stops the h-pawn from reaching h5, so g4 can be met and the bishop keeps the g6 square.',
      watch: 'The g5 square is now weak, and White may put a bishop or knight there.',
      plan: 'Answer Bd3 with ...Bxd3, then play ...e6.',
      mistake: 'Playing ...h6 instead, which allows g4 and h5 with tempo against the bishop.'
    },
    'e4 c6 d4 d5 e5 Bf5 h4 h5 Bd3 Bxd3': {
      idea: 'Trading removes Black\'s potential problem piece and White\'s good attacking bishop.',
      plan: 'After Qxd3 play ...e6, then pressure d4 with ...c5, ...Qb6 and ...Nc6.'
    },
    'e4 c6 d4 d5 e5 Bf5 h4 h5 Bd3 Bxd3 Qxd3 e6': {
      idea: 'With the light-squared bishops gone, ...e6 locks nothing in. Black has a solid, French-like structure without the bad bishop.',
      plan: 'Next ...Qb6 or ...c5 to hit d4, and ...Ne7-f5.'
    },
    'e4 c6 d4 d5 e5 Bf5 h4 h5 Bd3 Bxd3 Qxd3 e6 Nf3 Qb6': {
      idea: 'The queen pressures d4 and b2 at the same time, making White spend moves on defence.',
      watch: 'Do not take on b2 without checking: the queen can get trapped or White gains time.',
      plan: 'Follow with ...c5, ...Nc6 and ...Ne7-f5.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nc3 e6': {
      idea: 'Black makes room for the bishop and supports d5. If g4 comes, the bishop can retreat to g6.',
      plan: 'Meet g4 with ...Bg6, then hit d4 with ...c5.',
      mistake: 'Leaving the bishop on f5 without escape squares when the g4 and h4 pawns start moving.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nc3 e6 g4 Bg6': {
      idea: 'The bishop steps back to g6, the safest square, and still eyes the b1-h7 diagonal.',
      watch: 'White may play h4-h5 to trap the bishop. Prepare ...h5 or ...h6 when needed.',
      plan: 'Counterattack the center with ...c5.'
    },
    'e4 c6 d4 d5 e5 Bf5 Nc3 e6 g4 Bg6 Nge2 c5': {
      idea: 'While White pushes on the kingside, Black strikes the center. Counterattack in the center is the classic answer to a flank attack.',
      watch: 'Keep an eye on h4-h5 against the g6 bishop.',
      plan: 'Develop ...Nc6, and consider ...Qb6 against d4 and b2.',
      arrows: [['c5', 'd4']]
    },
    'e4 c6 d4 d5 e5 Bf5 Nc3 e6 g4 Bg6 Nge2 c5 Be3 Nc6': {
      idea: 'The knight adds pressure on d4 and develops a new piece.',
      watch: 'White may play dxc5 to open the position; recapture with the bishop when possible.',
      plan: 'Continue ...Qb6 or ...cxd4, and ...Nge7.'
    },
    'e4 c6 d4 d5 exd5 cxd5': {
      idea: 'Recapture with the pawn so Black keeps a central pawn on d5. This is why ...c6 was played.',
      plan: 'Develop ...Nc6 and ...Nf6, then bring the c8 bishop to g4 or f5.',
      mistake: 'Recapturing with the queen, which is attacked by Nc3 with tempo.'
    },
    'e4 c6 d4 d5 exd5 cxd5 Bd3': {
      what: 'White develops the bishop to d3, where it controls f5 and aims at the kingside.',
      threat: 'White wants to stop ...Bf5 and play c3 and Bf4 in a calm setup.',
      avoid: 'Do not play ...Bf5 now; it would be traded off while losing time. Develop knights first.'
    },
    'e4 c6 d4 d5 exd5 cxd5 c4': {
      what: 'This is the Panov-Botvinnik attack. White attacks d5 and can end up with an isolated d4 pawn.',
      threat: 'c5 or cxd5 with active piece play; White plays for the initiative.',
      avoid: 'Do not grab on c4 too early; develop with ...Nf6 first.'
    },
    'e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6': {
      idea: 'The knight develops and adds control of d4 and e5.',
      plan: 'Next ...Nf6, then the c8 bishop to g4.',
      mistake: 'Moving the same piece twice in the opening.'
    },
    'e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6': {
      idea: 'Natural development: the knight controls e4 and prepares castling.',
      plan: 'Next ...Bg4, developing the bishop outside the pawn chain before ...e6.'
    },
    'e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4': {
      idea: 'The bishop develops actively and pins the knight on f3 when it arrives. Again, the bishop comes out before ...e6.',
      watch: 'White\'s Qb3 will attack b7. Have an answer ready.',
      plan: 'After Qb3 defend b7 with ...Qd7, then play ...e6.'
    },
    'e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4 Qb3': {
      what: 'The queen attacks b7, which the c8 bishop used to defend.',
      threat: 'Qxb7, winning a pawn and attacking the rook.',
      avoid: 'Do not ignore b7. ...Qd7 defends it simply.'
    },
    'e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4 Qb3 Qd7': {
      idea: 'The queen defends b7 and connects to the queenside.',
      plan: 'Next ...e6 and ...Bd6 to challenge the f4 bishop, then ...O-O.',
      mistake: 'Continuing development and forgetting b7: Qxb7 would win a pawn and attack the a8 rook.'
    },
    'e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4 Qb3 Qd7 Nd2 e6': {
      idea: 'Now that the bishop is on g4, ...e6 is safe and opens the f8 bishop.',
      plan: 'Play ...Bd6 to trade the f4 bishop, then castle short.'
    },
    'e4 c6 d4 d5 exd5 cxd5 c4 Nf6': {
      idea: 'The knight defends d5 and develops toward the center.',
      watch: 'White may push c5 to gain queenside space; then aim for ...b6 or ...e5.',
      plan: 'Next ...e6 or ...Nc6, keeping pressure on d4.'
    },
    'e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6': {
      idea: 'Black solidly supports d5 and opens the f8 bishop. The c8 bishop is a little passive here, but the structure is safe.',
      plan: 'Next ...Bb4 to pin the c3 knight, or ...Be7 and ...O-O.'
    },
    'e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Bb4': {
      idea: 'The pin on c3 reduces White\'s control of d5 and e4.',
      plan: 'After cxd5 recapture ...Nxd5 to blockade the d5 square.'
    },
    'e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Bb4 cxd5 Nxd5': {
      idea: 'The knight lands on d5, the ideal blockading square in front of the isolated d4 pawn.',
      watch: 'Look out for Qb3 or Bd3 ideas against your king and the d5 knight.',
      plan: 'Develop ...Nc6 and ...O-O.'
    },
    'e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Bb4 cxd5 Nxd5 Bd2 Nc6': {
      idea: 'The second knight attacks d4 and completes development.',
      plan: 'Castle short, then aim pieces at the isolated d4 pawn.'
    },
    'e4 c6 d4 d5 f3 e6': {
      idea: 'A solid answer: Black supports d5 and prepares ...Bb4 to pressure e4. Here ...e6 before the bishop is fine because White\'s f3 gives Black other targets.',
      watch: 'The c8 bishop is temporarily shut in, so plan ...dxe4 or ...c5 later to free it.',
      plan: 'Next ...Bb4 pinning the c3 knight if it appears.',
      mistake: 'Taking on e4 too early and opening lines for White\'s pieces.'
    },
    'e4 c6 d4 d5 f3 dxe4': {
      idea: 'The sharp choice: Black captures and will answer fxe4 with ...e5, hitting the center.',
      watch: 'This line is tactically complex. White gets open f- and c4-g8 lines toward f7, so calculate before every move.',
      plan: 'After fxe4 play ...e5, then develop ...Bg4 and ...Nd7.',
      alt: true,
      label: 'Sharp alternative'
    },
    'e4 c6 d4 d5 f3 e6 Nc3 Bb4': {
      idea: 'The pin on c3 increases the pressure on e4, which White defended with f3.',
      plan: 'Develop ...Ne7 and keep the bishop active.'
    },
    'e4 c6 d4 d5 f3 e6 Nc3 Bb4 Bd2 Ne7': {
      idea: 'The knight goes to e7 so it is not hit by e5, and the f-pawn stays free for ...f5 or ...f6 later.',
      plan: 'Keep the bishop: after a3 retreat to a5.'
    },
    'e4 c6 d4 d5 f3 e6 Nc3 Bb4 Bd2 Ne7 a3 Ba5': {
      idea: 'Black keeps the bishop instead of trading it, preserving pressure on c3.',
      plan: 'The bishop can reroute to b6 to aim at d4 and g1.'
    },
    'e4 c6 d4 d5 f3 e6 Nc3 Bb4 Bd2 Ne7 a3 Ba5 Bd3 Bb6': {
      idea: 'The bishop now targets d4 and, after White castles short, the g1 king.',
      plan: 'Continue ...Nd7, ...O-O and look for ...c5 to hit d4.'
    },
    'e4 c6 d4 d5 f3 dxe4 fxe4 e5': {
      idea: 'Black attacks the white center immediately and opens the c8 bishop.',
      watch: 'Do not hurry with ...exd4: it opens lines toward f7 for White\'s pieces.',
      plan: 'Develop ...Bg4 and ...Nd7, keeping e5 strong.'
    },
    'e4 c6 d4 d5 f3 dxe4 fxe4 e5 Nf3 Bg4': {
      idea: 'The bishop pins the f3 knight, which is one of the defenders of d4 and e5.',
      watch: 'White\'s Bc4 eyes f7. Count attackers and defenders on f7 before making plans.',
      plan: 'Develop ...Nd7, and keep the pin if possible.'
    },
    'e4 c6 d4 d5 f3 dxe4 fxe4 e5 Nf3 Bg4 Bc4 Nd7': {
      idea: 'The knight develops, supports e5, and keeps the f6 square free for the other knight.',
      watch: 'White may play Qb3, hitting b7 and f7 together.',
      plan: 'Next ...Ngf6, ...Bd6 and castle.'
    },
    'e4 c6 d4 d5 f3 dxe4 fxe4 e5 Nf3 Bg4 Bc4 Nd7 c3 Bh5': {
      idea: 'The bishop keeps the pin from h5. White\'s Qb3 idea now has to be calculated because b7 and f7 are both targets.',
      watch: 'After Qb3, check b7 and f7 carefully before every move.',
      plan: 'Develop ...Ngf6 and ...Bd6, then castle.'
    },
    'e4 c6 d4 d5 f3 dxe4 fxe4 e5 Nf3 Bg4 Bc4 Nd7 c3 Bh5 O-O Ngf6': {
      idea: 'Black develops the last minor piece and prepares to castle.',
      watch: 'The f7 square and the h5 bishop can both become targets after Qe1-h4 or Ng5 ideas.',
      plan: 'Next ...Bd6 and ...O-O.'
    },
    'e4 c6 Nc3 d5': {
      idea: 'Black still plays the thematic ...d5, hitting e4.',
      plan: 'If Nf3 comes, develop ...Bg4 to pin and pressure the knight.',
      mistake: 'Delaying ...d5 for slow moves.'
    },
    'e4 c6 Nc3 d5 Nf3 Bg4': {
      idea: 'The bishop gets out before ...e6 and pins the f3 knight to the queen.',
      watch: 'After h3, decide whether to trade on f3 or keep the bishop.',
      plan: 'Trade ...Bxf3 when h3 comes, then ...e6 with a solid center.'
    },
    'e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3': {
      idea: 'Black gives up the bishop pair for a knight to keep a solid center and quick development.',
      plan: 'After Qxf3 play ...e6 and ...Nf6.',
      mistake: 'Retreating with ...Bh5 and getting chased by g4.'
    },
    'e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 e6': {
      idea: 'With the light-squared bishop traded, ...e6 is a solid support for d5.',
      plan: 'Develop ...Nf6 and choose between ...Be7 or ...Bb4.'
    },
    'e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 e6 d4 Nf6': {
      idea: 'Black develops and attacks e4 a second time.',
      watch: 'If White plays e5, the knight must move. Keep that in mind.',
      plan: 'After Bd3 consider ...dxe4 to open the position for your pieces.'
    },
    'e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 e6 d4 Nf6 Bd3 dxe4': {
      idea: 'Black opens the center to trade pieces and reduce White\'s bishop pair.',
      watch: 'After Nxe4, grabbing the d4 pawn with the queen is risky: White develops with tempo. Trading knights is simpler.',
      plan: 'Trade knights with ...Nxe4, then ...Nd7.'
    },
    'e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 e6 d4 Nf6 Bd3 dxe4 Nxe4 Nxe4': {
      idea: 'Trading knights reduces White\'s attacking pieces.',
      plan: 'After Qxe4 develop ...Nd7 and ...Nf6.',
      mistake: 'Playing ...Qxd4 without calculating. Grabbing pawns in the opening often helps the opponent develop.'
    },
    'e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 e6 d4 Nf6 Bd3 dxe4 Nxe4 Nxe4 Qxe4 Nd7': {
      idea: 'Black develops toward f6, where the knight will attack the queen and defend the king.',
      plan: 'Continue ...Nf6, ...Be7 or ...Bd6, and castle short.'
    },
    'e4 c6 Nf3 d5': {
      idea: 'Black challenges e4 as usual.',
      plan: 'After d3 consider ...dxe4 and a queen trade; after e5 develop ...Bg4.'
    },
    'e4 c6 Nf3 d5 d3': {
      what: 'White supports e4 with the d-pawn in a quiet setup.',
      threat: 'No direct threat; White plans g3, Bg2 and O-O.',
      avoid: 'Do not be passive. Exchanging on e4 lets Black trade queens and take away White\'s castling.'
    },
    'e4 c6 Nf3 d5 e5': {
      what: 'White advances to gain space, similar to the Advance Variation.',
      threat: 'White hopes to cramp Black and chase pieces with d4.',
      avoid: 'Do not lock the bishop in with ...e6 first; develop ...Bg4 before ...e6.'
    },
    'e4 c6 Nf3 d5 d3 dxe4': {
      idea: 'Black opens the d-file. After dxe4 Black can trade queens with check.',
      plan: 'Play ...Qxd1+ so White has to recapture with the king.'
    },
    'e4 c6 Nf3 d5 d3 dxe4 dxe4 Qxd1+': {
      idea: 'Trading queens with check forces Kxd1, so White loses the right to castle.',
      plan: 'Develop ...Nf6 and ...Bg4.'
    },
    'e4 c6 Nf3 d5 d3 dxe4 dxe4 Qxd1+ Kxd1 Nf6': {
      idea: 'The knight develops and attacks e4.',
      plan: 'Next ...Bg4, which pins the f3 knight to the king on d1.'
    },
    'e4 c6 Nf3 d5 d3 dxe4 dxe4 Qxd1+ Kxd1 Nf6 Nc3 Bg4': {
      idea: 'The bishop pins the f3 knight to the king on d1, so the knight cannot move without exposing the king.',
      watch: 'White may play Be2 or Ke1 to break the pin.',
      plan: 'Develop ...Nbd7 and ...e5, then ...O-O-O.',
      arrows: [['g4', 'd1']]
    },
    'e4 c6 Nf3 d5 d3 dxe4 dxe4 Qxd1+ Kxd1 Nf6 Nc3 Bg4 Be2 Nbd7': {
      idea: 'The knight develops and prepares ...e5 and ...O-O-O.',
      plan: 'Castle long to place the rook on the d-file facing White\'s king.'
    },
    'e4 c6 Nf3 d5 e5 Bg4': {
      idea: 'The bishop develops before ...e6 and pins the f3 knight.',
      plan: 'Follow with ...e6 and ...c5 against d4.'
    },
    'e4 c6 Nf3 d5 e5 Bg4 d4 e6': {
      idea: 'With the bishop already on g4, ...e6 is safe and prepares ...c5.',
      plan: 'Strike with ...c5 to attack d4.'
    },
    'e4 c6 Nf3 d5 e5 Bg4 d4 e6 Be2 c5': {
      idea: 'The thematic break against an advanced center: attack the d4 pawn.',
      plan: 'Develop ...Nc6, ...Qb6 and ...Ne7-f5 to keep pressure on d4.',
      arrows: [['c5', 'd4']]
    },
    'e4 c6 d3 d5': {
      idea: 'Black takes the center. Without a white pawn on d4, Black can build a big center.',
      plan: 'Next ...e5 to occupy the center with two pawns.'
    },
    'e4 c6 d3 d5 Nd2 e5': {
      idea: 'Black builds a classic center with pawns on d5 and e5.',
      plan: 'Develop ...Bd6, ...Nf6 and castle.'
    },
    'e4 c6 d3 d5 Nd2 e5 Ngf3 Bd6': {
      idea: 'The bishop defends e5 and develops toward the kingside.',
      plan: 'Next ...Nf6 and ...O-O.'
    },
    'e4 c6 d3 d5 Nd2 e5 Ngf3 Bd6 g3 Nf6': {
      idea: 'Natural development, preparing to castle.',
      plan: 'Castle short, then ...Re8 to support e5.'
    },
    'e4 c6 d3 d5 Nd2 e5 Ngf3 Bd6 g3 Nf6 Bg2 O-O': {
      idea: 'Black castles and completes the kingside setup.',
      plan: 'Next ...Re8 to support the e5 pawn.'
    },
    'e4 c6 d3 d5 Nd2 e5 Ngf3 Bd6 g3 Nf6 Bg2 O-O O-O Re8': {
      idea: 'The rook supports e5 and prepares the center for a long game.',
      plan: 'Keep the center, then add ...Nbd7 and ...a5.'
    },
    'e4 c6 c4 d5': {
      idea: 'Black hits the center at once, accepting a Panov-type structure.',
      plan: 'After exd5 recapture ...cxd5.'
    },
    'e4 c6 c4 d5 exd5 cxd5': {
      idea: 'Recapture with the pawn to keep a pawn in the center.',
      plan: 'If cxd5, regain the pawn with ...Nf6 and ...Nxd5.'
    },
    'e4 c6 c4 d5 exd5 cxd5 cxd5 Nf6': {
      idea: 'Black develops and attacks d5. The pawn is usually regained.',
      watch: 'Do not rush ...Qxd5; Nc3 would win time against the queen.',
      plan: 'Recapture ...Nxd5 after Nc3.'
    },
    'e4 c6 c4 d5 exd5 cxd5 cxd5 Nf6 Nc3 Nxd5': {
      idea: 'The pawn is regained and the knight is centralized on d5.',
      plan: 'Develop ...Nc6 and ...e6.'
    },
    'e4 c6 c4 d5 exd5 cxd5 cxd5 Nf6 Nc3 Nxd5 Nf3 Nc6': {
      idea: 'The second knight develops and controls the center.',
      watch: 'Bb5 may pin the c6 knight.',
      plan: 'Continue ...e6, ...Be7 and ...O-O.'
    },
    'e4 c6 c4 d5 exd5 cxd5 cxd5 Nf6 Nc3 Nxd5 Nf3 Nc6 Bb5 e6': {
      idea: 'Black defends d5 and opens the f8 bishop.',
      plan: 'Develop ...Be7 and castle short, then play against any white pawn weaknesses.'
    },

    'e4 c6 Bc4': { what: "White develops the bishop toward f7, but ...d5 is coming with tempo.", threat: "Nothing immediate.", avoid: "Do not delay ...d5: it gains time on the bishop." },
    'e4 c6 f4': { what: "White supports a future e5 with the f-pawn and plans a kingside attack.", threat: "e5 to cramp you.", avoid: "Do not play passively; ...d5 still challenges the center." },
    'e4 c6 d4 d5 Bd3': { what: "White defends e4 with the bishop instead of a knight.", threat: "Keeping the broad center.", avoid: "Do not let the bishop sit comfortably: ...dxe4 forces it to move again." },
    'e4 c6 Bc4 d5': { idea: "Strike in the center and attack the bishop at once.", plan: "After exd5 cxd5 the bishop is attacked again; then develop with ...Nc6 and ...Nf6.", mistake: "Playing ...e6 first lets White keep the bishop on c4 for free." },
    'e4 c6 Bc4 d5 exd5 cxd5': { idea: "Recapture with the c-pawn: the bishop is hit again and you keep a central pawn.", plan: "...Nc6, ...Nf6 and ...Bf5." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb3': { what: "The bishop retreats to b3, where it still eyes d5 and f7.", threat: "Pressure on d5 later with c4 or Nc3." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb5+': { what: "White checks to trade pieces.", threat: "Nothing serious: block with your bishop." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb3 Nc6': { idea: "Develop the knight and add control of d4 and e5.", plan: "...Nf6 and ...Bf5." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb3 Nc6 d4 Nf6': { idea: "Develop the other knight; it defends d5.", plan: "...Bf5 before ...e6." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb3 Nc6 d4 Nf6 Ne2 Bf5': { idea: "Bishop out before ...e6, the core Caro-Kann rule.", watch: "Ng3 can hit the bishop; ...Bg6 is a fine retreat.", plan: "...e6, ...Bd6 and castle." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb3 Nc6 d4 Nf6 Ne2 Bf5 O-O e6': { idea: "Now ...e6 is fine because the bishop is already outside the pawn chain.", plan: "...Bd6 and O-O." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb5+ Bd7': { idea: "Block with the bishop and offer a trade.", plan: "...Nc6 next, developing and covering d4." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb5+ Bd7 Be2 Nc6': { idea: "White retreated, so develop the knight with ideas of ...e5 or ...Bf5.", plan: "...Bf5, ...e6 and ...Nf6." },
    'e4 c6 Bc4 d5 exd5 cxd5 Bb5+ Bd7 Be2 Nc6 d4 Bf5': { idea: "The d7 bishop moves to f5 before ...e6, so it stays active.", plan: "...e6, ...Nf6, ...Bd6 and castle." },
    'e4 c6 d4 d5 Bd3 dxe4': { idea: "Take the pawn so White's bishop must recapture and then move again.", plan: "...Nf6 hitting the bishop on e4.", mistake: "Playing ...e6 first locks your c8 bishop behind the pawns." },
    'e4 c6 d4 d5 Bd3 dxe4 Bxe4 Nf6': { idea: "Develop with tempo on the e4 bishop.", plan: "...Bf5 against Bf3; ...Qxd4 if the bishop goes back to d3." },
    'e4 c6 d4 d5 Bd3 dxe4 Bxe4 Nf6 Bf3': { what: "The bishop stays on the long diagonal.", threat: "Nothing direct; White wants Ne2 and O-O." },
    'e4 c6 d4 d5 Bd3 dxe4 Bxe4 Nf6 Bd3': { what: "The bishop returns to d3, but now the d4 pawn has no defender.", threat: "Nothing immediate; White may hope you do not notice d4.", avoid: "Do not miss the free pawn, but calculate before taking." },
    'e4 c6 d4 d5 Bd3 dxe4 Bxe4 Nf6 Bf3 Bf5': { idea: "Bishop outside the pawn chain, then ...e6.", plan: "...e6, ...Nbd7 and ...Bd6." },
    'e4 c6 d4 d5 Bd3 dxe4 Bxe4 Nf6 Bd3 Qxd4': { idea: "Win the d4 pawn. Here White has no tactic against your queen, but always calculate checks and attacks before grabbing a pawn.", watch: "Nc3 or Nf3 will hit the queen, and Nc3 Qe5+ needs Nce2 from White; have a safe retreat ready.", plan: "Retreat with ...Qd8 when attacked, then develop.", label: 'Calculate first' },
    'e4 c6 d4 d5 Bd3 dxe4 Bxe4 Nf6 Bd3 Qxd4 Nf3 Qd8': { idea: "Bring the queen home safely; you are a pawn up.", plan: "...Bg4 and ...e6." },
    'e4 c6 d4 d5 Bd3 dxe4 Bxe4 Nf6 Bd3 Qxd4 Nf3 Qd8 O-O Bg4': { idea: "Develop the bishop with a pin on the f3 knight, outside the pawn chain.", plan: "...e6, ...Nbd7 and castle." },
    'e4 c6 f4 d5': { idea: "Challenge e4 as usual.", plan: "Against e5 play ...Bf5; against d3 take on e4 and trade queens." },
    'e4 c6 f4 d5 e5': { what: "White closes the center like the Advance Variation.", threat: "Space on the kingside." },
    'e4 c6 f4 d5 d3': { what: "White defends e4 with a pawn.", threat: "A slow, closed game." },
    'e4 c6 f4 d5 e5 Bf5': { idea: "Bishop out before ...e6, exactly as in the Advance Variation.", plan: "...e6 and ...c5." },
    'e4 c6 f4 d5 e5 Bf5 d4 e6': { idea: "Now close the chain: the bishop is already outside.", plan: "...c5 or ...h5 depending on White." },
    'e4 c6 f4 d5 e5 Bf5 d4 e6 Nf3 h5': { idea: "Stop g4, which would chase your bishop.", plan: "...c5, ...Nc6 and ...Qb6 against d4." },
    'e4 c6 f4 d5 d3 dxe4': { idea: "Take the pawn so the queens can come off.", plan: "...Qxd1+ after dxe4." },
    'e4 c6 f4 d5 d3 dxe4 dxe4 Qxd1+': { idea: "Trade queens; White's king recaptures and loses the right to castle.", plan: "...Nf6 and ...e5." },
    'e4 c6 f4 d5 d3 dxe4 dxe4 Qxd1+ Kxd1 Nf6': { idea: "Develop and attack the e4 pawn.", plan: "...e5 to open lines against White's king." },
    'e4 c6 f4 d5 d3 dxe4 dxe4 Qxd1+ Kxd1 Nf6 Nc3 e5': { idea: "Hit f4 and open the center while White's king is in the middle.", plan: "...Bc5 or ...Bb4 and castle." }
  };
})(typeof window !== 'undefined' ? window : globalThis);
