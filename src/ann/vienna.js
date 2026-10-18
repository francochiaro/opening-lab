(function (g) {
  g.OL_ANN = g.OL_ANN || {};
  g.OL_ANN.vienna = {
    '@lessons': [
      { title: "Why f4 is an attacking lever",
        body: "In the Vienna, White puts the knight on c3 first so the f-pawn stays free. The push f4 attacks Black's e5 pawn from the side and opens the f-file for your rook after castling. If Black takes on f4, a later Bxf4 or d4 rebuilds a big center; if Black ignores it, fxe5 can chase the f6 knight away." },
      { title: "Accepted versus declined gambits",
        body: "After 3.f4, Black can accept the pawn (3...exf4) or decline it with moves like 3...d5, 3...d6 or 3...Nc6. Against the accepted gambit, gain time with e5, attacking the f6 knight, and win the f4 pawn back later. Against declines, do not grab material blindly: check which piece is loose, keep the center and develop." },
      { title: "Threats against a knight help your development",
        body: "Pawn moves like e5 that hit the f6 knight are not just annoying: every time Black's knight has to move again, you get a free move to develop. Use that time for Nf3, d4 and a bishop move rather than chasing more pieces with your queen." }
    ],
    '@plans': {
      V01: "You have a space advantage and an open f-file. Typical plans are Ne5 or Qe1 to bring the queen toward the kingside, Be3 and pressure down the f-file. Keep the d4 pawn well defended.",
      V01B: "Castle soon, then think about Bxc6 and d3 to remove Black's strong e4 knight. Your pawn on e5 gives space; support it with d4 or Qe3 ideas.",
      V01C: "Black's pieces are active, so finish development first: Bd3, O-O and a rook to f1 or e1. The e5 pawn cramps Black; challenge the e4 knight with Bd3 or Nxe4 when it helps.",
      V02: "The queens are gone, so think like an endgame player. Bring your king toward the center when safe, use the bishop pair, and target Black's pawn on e4 with Ne2, Ng3 and Bg2.",
      V02B: "This is sharp: Black's center pawns are loose and the black king is still in the middle. Castle, then pressure d5 and the c5 pawn with dxc5, Nf4 and the pin on c6.",
      V03: "You will win back the f4 pawn with Qxe5+ or Bxf4 and enjoy quick development. Castle queenside or kingside depending on where Black's king goes, and use the open e-file.",
      V03B: "Black's queen blocks the bishop on f8. Play d4, Bxf4 and O-O-O. Your strong center and lead in development are the main assets.",
      V03C: "You are a full knight up. Trade pieces, keep your king safe, and do not hurry: simple development and castling win this kind of position.",
      V04: "You are up a piece, but your king is on e2. Bring it to safety (often via Ke1 or Kf2 after Nf3 and d4), develop quickly and give back material only if it ends the attack.",
      V05: "Black's center is solid. Play d3, Kh1 and look for fxe5 at the right moment to open the f-file. The pin with Bb5 on c6 keeps pressure on e5.",
      V06: "Your pawn on e5 gives a big space advantage and Black's knights are stuck on the back rank. Develop with Bd3 and O-O, and use the f-file.",
      V06B: "The pin on c6 and your pawn on e5 restrict Black. Castle, play Bxc6 if it damages Black's pawns, and aim for pressure on the f-file.",
      V11: "Black has given up time and space. Castle, play Qe1 and use the open f-file and the bishop on d3 to attack the kingside.",
      V11B: "You won Black's dark-squared bishop and have a big center. Play d4, Bd3 and Be3, castle queenside, and bring the g1 rook to the f-file later.",
      V07: "Both sides develop calmly. Consider f5 to gain space, or Na4 to trade off the b6 bishop. Do not castle too early if Black's bishop still points at g1.",
      V08: "A balanced position with chances for both sides. Typical plans are h3 and Qe2, castling short, and later f5 to gain space on the kingside.",
      V08B: "You have traded your knight for Black's good bishop and the position is open enough for your two bishops to matter. Castle, play f4 later, and keep the c4 bishop pointing at f7.",
      V09: "The same position as the 2...Nc6 3.Bc4 Bc5 line by another move order. Castle short when safe, consider h3 and Qe2, and keep f5 as a space-gaining idea.",
      V09B: "Black has the bishop pair, but you have the open d-file and quick development. Castle, play f4 to fight for the center, and use your queen and rooks on the d-file.",
      V12: "A quiet Italian-style structure. Ideas are Ng5 against f7 if Black allows it, Nd5 to trade, and a3 or Bb3 to keep your bishop safe from ...Na5.",
      V10: "If Black takes on c3, you get the bishop pair and play d4 in the center. Otherwise Nd5 is a useful square, and d3 with c3 keeps everything solid."
    },

    'e4': { idea: "Grab the center, open lines for your queen and the f1 bishop.", plan: "Play Nc3 next to start the Vienna." },
    'e4 e5': { what: "Black mirrors you and claims the center with ...e5.", threat: "Nothing yet; both sides want to develop quickly." },
    'e4 e5 Nc3': {
      idea: "The knight defends e4 and controls d5, while keeping the f-pawn free for a later f4.",
      plan: "Against ...Nf6 play f4; against ...Nc6, ...Bc5 or ...Bb4, develop the f1 bishop or the g1 knight first.",
      mistake: "Pushing f4 against every reply. Choose your plan based on Black's second move."
    },
    'e4 e5 Nc3 Nf6': {
      what: "Black develops the king's knight and attacks your e4 pawn.",
      threat: "...Bb4 or ...d5 later to put more pressure on e4.",
      avoid: "Do not panic about e4: the knight on c3 already defends it."
    },
    'e4 e5 Nc3 Bc5': {
      what: "Black puts the bishop on c5 straight away, aiming at f2 and the g1 square.",
      threat: "The bishop stops you from castling short easily, and ...Qh4+ ideas appear if your f-pawn moves.",
      avoid: "Do not forget that g1 is covered: castling short needs care while this bishop stays on the diagonal."
    },
    'e4 e5 Nc3 Nc6': {
      what: "Black develops the queen's knight to c6, strengthening control of e5 instead of attacking e4.",
      threat: "Nothing immediate; Black keeps options like ...Bc5 or ...Nf6.",
      avoid: "This is not the 2...Nf6 position. Do not autopilot into the gambit lines."
    },
    'e4 e5 Nc3 Bb4': {
      what: "Black develops the bishop with pressure on your c3 knight and is ready to capture on c3.",
      threat: "...Bxc3 to double your pawns.",
      avoid: "Do not worry about the doubled pawns too much: you get the bishop pair in return."
    },
    'e4 e5 Nc3 Nf6 f4': {
      idea: "The Vienna Gambit: f4 attacks e5 from the side and opens the f-file for your rook.",
      watch: "Your king's diagonal e1-h4 is now open, so watch for ...Qh4+ ideas in every line.",
      plan: "Against ...exf4, play e5; against ...d5, take on e5 with fxe5.",
      label: "Recommended",
      arrows: [['f4', 'e5']]
    },
    'e4 e5 Nc3 Nf6 f4 d5': {
      what: "The critical central counterstrike: Black hits e4 a second time instead of defending e5.",
      threat: "...dxe4 or ...Nxe4 to open the center while your king is still uncastled.",
      avoid: "Do not take with exd5 on autopilot; capturing on e5 keeps a better center."
    },
    'e4 e5 Nc3 Nf6 f4 exf4': {
      what: "Black accepts the gambit and grabs a pawn.",
      threat: "Black may try to keep the pawn with ...g5 later, and the f6 knight still attacks e4.",
      avoid: "Do not play Bxf4 too early; first gain time against the f6 knight with e5."
    },
    'e4 e5 Nc3 Nf6 f4 d6': {
      what: "Black declines solidly and keeps a pawn on e5.",
      threat: "Black wants to keep the center closed and develop calmly.",
      avoid: "Do not take on e5 too early; it releases the tension and helps Black develop."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6': {
      what: "Black develops the other knight and gives back the e5 pawn for quick development.",
      threat: "...Nxe5 with a nice central knight, and later ...Ng4 or ...Bb4 tricks.",
      avoid: "Do not refuse the pawn out of fear: fxe5 is the main idea here."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5': {
      what: "Black develops the bishop to c5 and ignores the attack on e5. This is a Playable but risky decline.",
      threat: "The bishop eyes g1 and f2; Black hopes for ...d6 and ...Ng4 ideas.",
      avoid: "Do not be scared by the bishop: here 4.fxe5 is the strong reply, not the same plan as against ...Nc6.",
      dubious: true, weight: 1
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5': {
      idea: "Take toward the center: the pawn on e5 kicks the f6 knight and gains space.",
      watch: "After ...Nxe4, Black's knight is very active in the center.",
      plan: "Develop with Nf3 next, then d4 or Qe2 to challenge the e4 knight.",
      mistake: "Playing exd5, which helps Black open the center while your king is still at home."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4': {
      what: "Black's knight jumps to e4, a strong central square.",
      threat: "...Nxc3 to damage your pawns, and ...Qh4+ if the g1 knight leaves without care.",
      avoid: "Do not leave h4-e1 open: develop Nf3 so ...Qh4+ is no longer possible."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3': {
      idea: "Develop the knight. It defends against ...Qh4+ and supports d4.",
      watch: "Black can pin with ...Bg4 or put pressure on c3 with ...Bb4.",
      plan: "Next d4 and Bd3 to challenge the e4 knight, then castle."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3': {
      idea: "A sharper queen move that hits the e4 knight and the f7 pawn at once.",
      watch: "Your queen can become a target, and Black can trade into an early endgame with ...Nxc3 and ...Qh4+.",
      plan: "Bb5 and Ne2 to develop quickly.",
      alt: true, label: "Playable alternative"
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7': {
      what: "Black develops calmly and prepares to castle.",
      threat: "...f6 or ...f5 later to challenge your e5 pawn.",
      avoid: "Do not let the e4 knight sit there forever; plan d4 and Bd3 to challenge it."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Nc6': {
      what: "Black develops the queen's knight and adds pressure to e5.",
      threat: "...Bg4 to pin your f3 knight, then ...Nxe5.",
      avoid: "Do not leave e5 underdefended; Bb5 pins the c6 knight so it cannot take."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Bc5': {
      what: "Black puts the bishop on c5, eyeing g1 and stopping you from castling short.",
      threat: "...Bf2+ tricks and quick pressure on your king.",
      avoid: "Do not castle into the bishop; first block the diagonal with d4."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7 d4': {
      idea: "Claim the center and support the e5 pawn.",
      watch: "Black may play ...f6 or ...f5 to break your center.",
      plan: "Bd3 next to fight the e4 knight, then castle."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7 d4 O-O Bd3': {
      idea: "The bishop develops and attacks the strong e4 knight.",
      watch: "After ...f5 your e5 pawn is attacked indirectly; capture en passant with exf6.",
      plan: "Castle and use the open f-file."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7 d4 O-O Bd3 f5': {
      what: "Black supports the e4 knight with the f-pawn.",
      threat: "Black wants to keep the knight on e4 permanently.",
      avoid: "Do not ignore it: capturing en passant on f6 removes the support."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7 d4 O-O Bd3 f5 exf6': {
      idea: "Capture en passant: the f5 pawn passed your e5 pawn, so you can take it as if it moved one square.",
      watch: "The f-file opens for both sides, so castle quickly.",
      plan: "O-O next and play on the f-file."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7 d4 O-O Bd3 f5 exf6 Bxf6 O-O': {
      idea: "Castle to safety and put your rook on the half-open f-file.",
      watch: "Black's bishop on f6 now points at d4; keep it defended.",
      plan: "Ne5, Qe1 or Be3, with play on the f-file."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Nc6 Bb5': {
      idea: "Pin the c6 knight so it cannot capture on e5.",
      watch: "Black's ...Bg4 pins your own knight in return.",
      plan: "Castle or play Qe2, and later Bxc6 to damage Black's pawns."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Nc6 Bb5 Bg4': {
      what: "Black pins your f3 knight to your queen.",
      threat: "...Nxc3 and ...Bxf3 to win the e5 pawn.",
      avoid: "Do not allow ...Bxf3 to wreck your king position with your queen still on d1."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Nc6 Bb5 Bg4 Qe2': {
      idea: "Unpin the knight and attack the e4 knight with the queen.",
      watch: "Black can jump ...Ng5 to trade on f3 and damage your kingside pawns.",
      plan: "d4 next, then decide where your king goes."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Bc5 d4': {
      idea: "Gain a tempo on the c5 bishop and block its diagonal toward g1.",
      watch: "After ...Bb4 the pin on c3 increases pressure on your e5 and c3.",
      plan: "Bd2 or Bd3 to finish development."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Bc5 d4 Bb4': {
      what: "The bishop moves out of attack and pins your c3 knight.",
      threat: "...Nxc3 to damage your queenside pawns.",
      avoid: "Do not let ...Nxc3 come with check-like tempo; break the pin."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Bc5 d4 Bb4 Bd2': {
      idea: "Break the pin so ...Nxc3 can be met by Bxc3.",
      watch: "Black often answers with ...c5 to attack your center.",
      plan: "Bd3 and O-O, keeping the e5 pawn."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 Nc6': {
      what: "Black develops and adds pressure on e5 instead of moving the attacked knight.",
      threat: "...Nxe5 or ...Nd4 hitting your queen and c2.",
      avoid: "Do not take on e4 with Nxe4; after ...dxe4 your queen is attacked."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 f5': {
      what: "Black supports the e4 knight with a pawn.",
      threat: "Black wants a strong, stable knight on e4.",
      avoid: "Do not take on e4; develop and hit the center with d4 instead."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 Nc6 Bb5': {
      idea: "Pin the c6 knight and protect e5 indirectly.",
      watch: "Black can trade on c3 and give a check with ...Qh4+.",
      plan: "Recapture on c3 with the d-pawn to open your c1 bishop."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 Nc6 Bb5 Nxc3': {
      what: "Black trades knights on c3.",
      threat: "...Qh4+ follows after your recapture.",
      avoid: "Do not take with the queen; the pawn recapture keeps your queen guarding f3 and h5."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 Nc6 Bb5 Nxc3 dxc3': {
      idea: "Recapture toward the center and open the c1 bishop.",
      watch: "...Qh4+ is coming; answer with g3.",
      plan: "Block the check with g3 and be ready to trade queens."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 Nc6 Bb5 Nxc3 dxc3 Qh4+': {
      what: "Black checks your king along the open diagonal.",
      threat: "...Qe4+ next to force a queen trade.",
      avoid: "Do not walk the king with Kd1 or Ke2; block with g3."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 Nc6 Bb5 Nxc3 dxc3 Qh4+ g3': {
      idea: "Block the check with a pawn and keep your king on e1.",
      watch: "Black will check again with ...Qe4+. Trading queens on e4 is the clean answer.",
      plan: "Trade queens on e4 and play an endgame with the bishop pair."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 Nc6 Bb5 Nxc3 dxc3 Qh4+ g3 Qe4+ Qxe4': {
      idea: "Trade queens: the endgame is fine for you and removes all danger to your king.",
      watch: "After ...dxe4, Black's e4 pawn can become weak or strong; keep an eye on it.",
      plan: "Ne2, Bf4 and play against e4."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 f5 d4': {
      idea: "Strike the center and open your c1 bishop.",
      watch: "Black will hit back with ...c5.",
      plan: "Bb5+ to disturb Black's development, then Nge2."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 f5 d4 c5 Bb5+': {
      idea: "Check with tempo so Black must block on c6 or d7.",
      watch: "Your queen and knight on c3 can be hit by ...Nxc3 at the right time.",
      plan: "Nge2, then castle and attack the d5/c5 center."
    },
    'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Qf3 f5 d4 c5 Bb5+ Nc6 Nge2': {
      idea: "Develop the last minor piece and support c3 and d4.",
      watch: "Black's queen can come to h4 or b6; keep track of loose pieces.",
      plan: "Castle short and pressure the c6 knight and d5 pawn."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5': {
      idea: "Attack the f6 knight and gain time; this is the point of the gambit.",
      watch: "Black may answer with ...Qe7 pinning your e5 pawn to the king, or with knight moves that hang material.",
      plan: "Nf3 and d4, then win back the f4 pawn.",
      arrows: [['e5', 'f6']]
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8': {
      what: "The knight retreats home. Black lost time but keeps the extra pawn for now.",
      threat: "...Qh4+ if you forget about the e1-h4 diagonal.",
      avoid: "Do not leave h4 uncovered; Nf3 stops the check."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Qe7': {
      what: "Black pins your e5 pawn to your king with the queen.",
      threat: "...d6 or ...Ng4 to win the e5 pawn, using the pin.",
      avoid: "Do not ignore the pin; Qe2 breaks it immediately."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Nh5': {
      what: "The knight goes to the rim on h5, but it is undefended.",
      threat: "Black wants ...g5 to protect f4, but the knight is loose right now.",
      avoid: "Do not miss it: the d1-h5 diagonal is open.",
      dubious: true, weight: 1, label: "Common trap"
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Nd5': {
      what: "The knight goes to d5, where your c3 knight can simply take it.",
      threat: "Black hopes for ...Qh4+ after Nxd5, since your f-pawn is gone.",
      avoid: "Do not fear the check: take the knight and walk the king calmly.",
      dubious: true, weight: 1, label: "Common trap"
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8 Nf3': {
      idea: "Develop and cover h4 so ...Qh4+ is no longer possible.",
      watch: "Black can play ...d6 to break up your e5 pawn.",
      plan: "d4 next, then Bxf4 or Qe2 to regain the pawn."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8 Nf3 d6': {
      what: "Black attacks your e5 pawn to free the black position.",
      threat: "...dxe5 opening the d-file and the e-file.",
      avoid: "Do not let the d-file open with your queen and king unprotected."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8 Nf3 d6 d4': {
      idea: "Support e5 and open the c1 bishop toward f4.",
      watch: "After ...dxe5 you recapture with the queen, not with the pawn.",
      plan: "Qe2 and Bxf4 to win back the pawn with fast development."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8 Nf3 d6 d4 dxe5': {
      what: "Black takes on e5 and opens the center.",
      threat: "...Bb4 or ...Bg4 while your king is still in the middle.",
      avoid: "Do not play dxe5 into a queen trade that leaves Black a pawn up."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8 Nf3 d6 d4 dxe5 Qe2': {
      idea: "The queen attacks e5 and pins nothing yet, but prepares Qxe5+ or dxe5 with an open e-file.",
      watch: "Black's king is on the e-file; checks with Qxe5+ come with tempo.",
      plan: "Win back the pawn with Qxe5+ or Bxf4, then castle queenside."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Qe7 Qe2': {
      idea: "Break the pin: the queen defends e5 and stands opposite Black's queen.",
      watch: "Black may try ...Ng8 and ...d6 to attack e5 again.",
      plan: "Nf3 and d4, then Bxf4."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Qe7 Qe2 Ng8 Nf3': {
      idea: "Develop with tempo-free simplicity; the knight guards e5 and h4.",
      watch: "Black's ...Qb4 or ...Qe6 can target your loose pawns; keep b2 in mind.",
      plan: "d4 and Bxf4 next, then O-O-O."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Nh5 Qxh5': {
      idea: "The knight on h5 had no defender, so the queen simply takes it.",
      watch: "This trap works only after 4...Nh5. Stronger opponents retreat with ...Ng8 or play ...Qe7 instead.",
      plan: "Develop with Nf3 and d4; keep your queen away from tricks.",
      label: "Common trap"
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Nd5 Nxd5': {
      idea: "Take the free knight on d5.",
      watch: "...Qh4+ is coming because your f-pawn moved. Blocking with g3 lets Black open your king with ...fxg3, so the king usually steps to e2.",
      plan: "After ...Qh4+ play Ke2, then Nf3 to hit the queen.",
      label: "Common trap"
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Nd5 Nxd5 Qh4+': {
      what: "Black checks your king, hoping the open diagonal gives an attack.",
      threat: "...fxg3 tricks if you block with g3.",
      avoid: "Do not block with g3; it lets Black open lines around your king."
    },
    'e4 e5 Nc3 Nf6 f4 exf4 e5 Nd5 Nxd5 Qh4+ Ke2': {
      idea: "The king steps aside. You are a whole knight up, so a slightly awkward king is a fair price.",
      watch: "Black will try ...f3+ or ...d6 to open lines. Answer ...f3+ with Ke3 or Nxf3, and never leave your queen and king forked.",
      plan: "Nf3 to hit the queen, then d4 and bring the king to safety on f2 or e1 later.",
      mistake: "Grabbing more pawns before the king is safe."
    },
    'e4 e5 Nc3 Nf6 f4 d6 Nf3': {
      idea: "Develop and add pressure on e5.",
      watch: "Black keeps the center closed; be patient.",
      plan: "Bb5 or Bc4, then castle."
    },
    'e4 e5 Nc3 Nf6 f4 d6 Nf3 Nc6': {
      what: "Black adds a defender to e5.",
      threat: "...Bg4 to pin your f3 knight.",
      avoid: "Do not take on e5 yet; the tension favours you."
    },
    'e4 e5 Nc3 Nf6 f4 d6 Nf3 Nc6 Bb5': {
      idea: "Pin the c6 knight, one of e5's defenders.",
      watch: "Black can break the pin with ...Bd7.",
      plan: "Castle and prepare d3 with fxe5 at the right moment."
    },
    'e4 e5 Nc3 Nf6 f4 d6 Nf3 Nc6 Bb5 Bd7 O-O': {
      idea: "Castle to safety and put the rook behind the f-pawn.",
      watch: "Black may capture ...exf4; recapture with the bishop when it is safe.",
      plan: "d3, Kh1 and fxe5 to open the f-file."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5': {
      idea: "Take the pawn: it attacks the f6 knight and gains space.",
      watch: "After ...Nxe5, Black's knight is centralized; push it away with d4.",
      plan: "d4 next, gaining space with tempo."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5': {
      what: "Black recaptures with the knight, giving back the pawn situation and centralizing.",
      threat: "...Bb4 and ...Nxe4 ideas against your center.",
      avoid: "Do not leave the knight on e5; kick it with d4."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4': {
      idea: "Kick the e5 knight and build a big center.",
      watch: "Black's knights may jump to g6 or c6; then e5 hits the f6 knight.",
      plan: "e5 next if the f6 knight is still there."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Ng6': {
      what: "The knight retreats to g6.",
      threat: "Black hopes to use g6 and f4 squares later.",
      avoid: "Do not let Black settle: e5 attacks the other knight."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Nc6': {
      what: "The knight goes back to c6, putting pressure on d4.",
      threat: "...Bb4 to pin and attack e4.",
      avoid: "Do not allow ...Bb4 with ...Nxe4 to work; push e5."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Ng6 e5': {
      idea: "Hit the f6 knight again and grab space.",
      watch: "Black's pieces get pushed back but may try ...d6 later.",
      plan: "Nf3 and Bd3, then castle."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Ng6 e5 Ng8': {
      what: "Black's knight goes all the way home.",
      threat: "...Bb4 and ...d6 to break up your center later.",
      avoid: "Do not push more pawns; develop pieces now."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Ng6 e5 Ng8 Nf3': {
      idea: "Develop and support the center.",
      watch: "...Bb4 pins your c3 knight; be ready with Bd2 or Bd3.",
      plan: "Bd3, O-O and play on the f-file."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Nc6 e5': {
      idea: "Chase the f6 knight away and gain more space.",
      watch: "Black may strike back with ...d5 or ...d6.",
      plan: "Nf3 and Bb5 to pressure the c6 knight."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Nc6 e5 Ng8': {
      what: "The knight retreats; Black is behind in development.",
      threat: "...d6 or ...d5 to challenge your center.",
      avoid: "Do not waste time; develop quickly."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Nc6 e5 Ng8 Nf3': {
      idea: "Develop and protect d4 and e5.",
      watch: "...Bg4 can pin your knight.",
      plan: "Bb5 or Bd3, then castle."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Nc6 e5 Ng8 Nf3 d5': {
      what: "Black stakes a claim in the center.",
      threat: "...Bg4 and ...Nge7 to pressure d4.",
      avoid: "Capturing exd6 en passant is legal, but it gives up your space advantage. Keep the e5 pawn and develop."
    },
    'e4 e5 Nc3 Nf6 f4 Nc6 fxe5 Nxe5 d4 Nc6 e5 Ng8 Nf3 d5 Bb5': {
      idea: "Pin the c6 knight and increase pressure on Black's position.",
      watch: "Black may play ...a6 to ask the bishop a question.",
      plan: "Castle, then Bxc6 if it damages Black's structure."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5': {
      idea: "Take on e5 and hit the f6 knight. Unlike against ...Nc6, there is no knight on c6 to recapture, so Black loses time.",
      watch: "If 4...Nxe4 5.Nxe4 Qh4+, answer 6.Ng3. Blocking with g3 allows ...Qxe4+ and ...Qxh1.",
      plan: "Nf3 and d4 to build a big center.",
      mistake: "Playing 4.Nf3 and letting Black consolidate."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Ng8': {
      what: "The knight retreats home; Black is clearly behind in development.",
      threat: "...d6 to break up your e5 pawn.",
      avoid: "Do not grab more; develop with Nf3 and d4."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Nxe4': {
      what: "Black grabs on e4, hoping for ...Qh4+ tricks along the open diagonal.",
      threat: "...Bf2+ and ...Qh4+ ideas against your king.",
      avoid: "Do not fear it: take the knight, and if ...Qh4+ comes, block with Ng3, not g3."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Ng8 Nf3': {
      idea: "Develop and control d4 and h4.",
      watch: "Black may attack e5 with ...d6.",
      plan: "d4 next with tempo on the c5 bishop."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Ng8 Nf3 d6 d4': {
      idea: "Gain a tempo on the c5 bishop and dominate the center.",
      watch: "...Bb4 pins your c3 knight.",
      plan: "Recapture on d6 and develop Bd3."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Ng8 Nf3 d6 d4 Bb4': {
      what: "The bishop moves out of attack and pins your c3 knight.",
      threat: "...dxe5 opening the center.",
      avoid: "Do not let ...dxe5 come with your d-pawn pinned; take on d6 first."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Ng8 Nf3 d6 d4 Bb4 exd6': {
      idea: "Take on d6 so Black cannot open the center on Black's terms.",
      watch: "After ...cxd6 the c-file opens for Black.",
      plan: "Bd3 and O-O with a lead in development."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Ng8 Nf3 d6 d4 Bb4 exd6 cxd6 Bd3': {
      idea: "Develop the bishop toward Black's kingside and prepare to castle.",
      watch: "...Bxc3+ doubles your pawns but gives you the bishop pair.",
      plan: "O-O, Qe1 and use the f-file."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Nxe4 Nxe4': {
      idea: "Take the knight: you are a piece up for now.",
      watch: "After 5...Qh4+ the right block is 6.Ng3, because 6.g3 allows ...Qxe4+ and ...Qxh1.",
      plan: "Recapture on g1 if Black takes there, then d4."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Nxe4 Nxe4 Bxg1': {
      what: "Black trades the bishop for your g1 knight to stop you from castling short.",
      threat: "...Qh4+ hitting the e4 knight and your king.",
      avoid: "Do not recapture with the king; take with the rook."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Nxe4 Nxe4 Bxg1 Rxg1': {
      idea: "Take back with the rook. You keep an extra piece and the bishop pair.",
      watch: "If ...Qh4+ comes, block with Ng3 and keep the extra piece.",
      plan: "Ng3, d4 and Bd3."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Nxe4 Nxe4 Bxg1 Rxg1 d5': {
      what: "Black attacks your e4 knight to win material back.",
      threat: "...dxe4 winning the knight.",
      avoid: "Do not take exd6 en passant here without checking; simply move the knight."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Nxe4 Nxe4 Bxg1 Rxg1 d5 Ng3': {
      idea: "Retreat the knight to safety, covering h5 and f5.",
      watch: "Black has some pressure, but you are a piece up.",
      plan: "d4 next, then Bd3 and castle queenside."
    },
    'e4 e5 Nc3 Nf6 f4 Bc5 fxe5 Nxe4 Nxe4 Bxg1 Rxg1 d5 Ng3 O-O d4': {
      idea: "Take the center and open lines for your c1 bishop.",
      watch: "Black may try ...f6 or ...c5 to open lines toward your king.",
      plan: "Bd3, Be3 and O-O-O."
    },
    'e4 e5 Nc3 Bc5 f4': {
      idea: "Attack e5 right away while the bishop on c5 does not defend it.",
      watch: "The c5 bishop eyes g1, so castling short needs preparation, and ...Qh4+ ideas can appear.",
      plan: "Nf3 next to cover h4, then Bc4."
    },
    'e4 e5 Nc3 Bc5 f4 d6': {
      what: "Black supports e5 with the d-pawn.",
      threat: "...exf4 and ...Qh4+ if you are careless.",
      avoid: "Do not play fxe5 dxe5 too early; it frees Black's game."
    },
    'e4 e5 Nc3 Bc5 f4 d6 Nf3': {
      idea: "Develop and stop ...Qh4+.",
      watch: "...Bg4 can pin the knight to your queen.",
      plan: "Bc4 and d3."
    },
    'e4 e5 Nc3 Bc5 f4 d6 Nf3 Nc6': {
      what: "Black develops the knight and defends e5 again.",
      threat: "...Bg4 or ...Nd4 to hit f3 and c2.",
      avoid: "Do not let ...Nd4 come with tempo; develop calmly."
    },
    'e4 e5 Nc3 Bc5 f4 d6 Nf3 Nc6 Bc4': {
      idea: "Develop the bishop to its best diagonal, aiming at f7.",
      watch: "Black may pin with ...Bg4; h3 can ask the bishop.",
      plan: "d3 and castle when g1 is safe."
    },
    'e4 e5 Nc3 Bc5 f4 d6 Nf3 Nc6 Bc4 Bb6': {
      what: "The bishop retreats from c5 to b6. ...Bb6 is a retreat after ...Bc5, not a first bishop move: Black stops Na4 from trading it and keeps the a7-g1 diagonal.",
      threat: "The bishop still aims at g1 and f2 from b6.",
      avoid: "Do not castle short too quickly; the diagonal toward g1 is still open."
    },
    'e4 e5 Nc3 Bc5 f4 d6 Nf3 Nc6 Bc4 Bb6 d3': {
      idea: "Support e4 and open the c1 bishop.",
      watch: "Black can play ...Nf6 and ...Ng4 toward f2.",
      plan: "Na4 to trade the b6 bishop, or f5 to gain space."
    },
    'e4 e5 Nc3 Nc6 Bc4': {
      idea: "Develop the bishop toward f7 instead of rushing f4, because Black's knight on c6 already protects e5.",
      watch: "Check whether e4 is well defended before launching f4 later.",
      plan: "d3, Nf3 or f4, and castle when safe.",
      mistake: "Playing the 2...Nf6 gambit plan here; it is a different position."
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5': {
      what: "Black mirrors your bishop: it also aims at f2.",
      threat: "...Qh4 or ...Qg5 ideas against g2 and f2.",
      avoid: "Do not push f4 automatically; check ...Bxg1 and ...Qh4+ first."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6': {
      what: "Black develops and attacks e4.",
      threat: "...Nxe4 forks if e4 is not defended.",
      avoid: "Do not leave e4 hanging; d3 defends it simply."
    },
    'e4 e5 Nc3 Nc6 Bc4 d6': {
      what: "Black supports e5 and opens the c8 bishop.",
      threat: "...Bg4 or ...Be6 to fight your c4 bishop.",
      avoid: "Do not rush f4; develop the kingside first."
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3': {
      idea: "Defend e4 and open your c1 bishop.",
      watch: "Black often plays ...d6 or ...Nf6; then choose between Na4 and f4.",
      plan: "Na4 to chase the c5 bishop, or Nf3 and castle."
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6': {
      what: "Black supports e5 and keeps the position closed.",
      threat: "...Na5 to trade your c4 bishop, and ...Qh4 ideas if your f-pawn moves.",
      avoid: "If you push f4 now, remember ...Bxg1 and ...Qh4+."
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6 Na4': {
      idea: "Attack the c5 bishop. If it retreats to b6, you can trade your knight for it and get the bishop pair.",
      watch: "Your knight on the rim needs a purpose; take on b6 or c5 soon.",
      plan: "Nxb6 or Nxc5, then f4 or Nf3 and castle.",
      rec: true, label: "Recommended"
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6 f4': {
      idea: "The aggressive f4 lever against e5.",
      watch: "Here Black can play ...Bxg1, Rxg1 and ...Qh4+. Answer with Kf1, not g3, which drops the h2 pawn.",
      plan: "Nf3 next, then castle or Qe1.",
      alt: true, label: "Sharp alternative"
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6 f4 Nf6': {
      what: "Black develops and attacks e4.",
      threat: "...Ng4 toward f2 and e3.",
      avoid: "Do not take on e5 too early; develop with Nf3."
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6 f4 Nf6 Nf3': {
      idea: "Develop the last kingside piece and cover h4 and e5.",
      watch: "The c5 bishop still points at g1; ...Ng4 can be annoying.",
      plan: "h3 or Qe2, castle, and later f5."
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6 Na4 Bb6': {
      what: "The bishop retreats from c5 to b6. It got there in two steps: ...Bc5 first, then ...Bb6 when your knight attacked it.",
      threat: "The bishop keeps eyeing f2.",
      avoid: "Do not let the bishop stay; trade it now."
    },
    'e4 e5 Nc3 Nc6 Bc4 Bc5 d3 d6 Na4 Bb6 Nxb6': {
      idea: "Trade the knight for Black's strong bishop and keep your two bishops.",
      watch: "After ...axb6 Black gets the open a-file.",
      plan: "Nf3 or f4, then castle."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6 d3': {
      idea: "Defend e4 and open the c1 bishop.",
      watch: "...Na5 hunts your c4 bishop.",
      plan: "f4 or Nf3 depending on Black's next move."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Bc5': {
      what: "Black develops the bishop to c5, aiming at f2.",
      threat: "...Ng4 toward f2.",
      avoid: "Do not play Bg5 too early without checking ...Bxf2+."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Na5': {
      what: "Black hunts your c4 bishop with the knight.",
      threat: "...Nxc4 to win the bishop pair.",
      avoid: "Do not waste time saving the bishop if it costs development."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Bc5 f4': {
      idea: "Push f4 now that Black's knight on f6 blocks the d8-h4 diagonal, so ...Qh4+ is not possible.",
      watch: "...Ng4 still eyes e3 and f2.",
      plan: "Nf3 and castle."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Na5 Nge2': {
      idea: "Develop and allow ...Nxc4; you recapture toward the center and keep the f-pawn free.",
      watch: "Black gets the bishop pair; you get open lines.",
      plan: "Castle, then f4."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Na5 Nge2 Nxc4': {
      what: "Black takes the bishop and gets the bishop pair.",
      threat: "Black's two bishops can be strong if the position opens.",
      avoid: "Do not open the center too fast; develop first."
    },
    'e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Na5 Nge2 Nxc4 dxc4': {
      idea: "Recapture toward the center and open the d-file for your queen.",
      watch: "The c4 pawns are doubled; keep them protected.",
      plan: "Castle, then f4 and Qd3."
    },
    'e4 e5 Nc3 Nc6 Bc4 d6 Nf3': {
      idea: "Develop and attack e5.",
      watch: "...Bg4 can pin your knight.",
      plan: "d3 and castle."
    },
    'e4 e5 Nc3 Nc6 Bc4 d6 Nf3 Nf6': {
      what: "Black develops and attacks e4.",
      threat: "...Nxe4 if e4 is undefended.",
      avoid: "Do not leave e4 hanging; d3 defends it."
    },
    'e4 e5 Nc3 Nc6 Bc4 d6 Nf3 Nf6 d3': {
      idea: "Defend e4 and open your c1 bishop.",
      watch: "...Na5 can chase your bishop; a3 or Bb3 prepares a retreat.",
      plan: "Castle and consider Ng5 or Nd5."
    },
    'e4 e5 Nc3 Nc6 Bc4 d6 Nf3 Nf6 d3 Be7': {
      what: "Black prepares to castle.",
      threat: "...O-O and ...Na5 next.",
      avoid: "Do not allow ...Na5xc4 cheaply; keep a retreat for the bishop."
    },
    'e4 e5 Nc3 Nc6 Bc4 d6 Nf3 Nf6 d3 Be7 O-O': {
      idea: "Castle to safety.",
      watch: "Black may play ...Na5 or ...Bg4.",
      plan: "a3 and Bb3, h3, and later Nd5 or d4."
    },
    'e4 e5 Nc3 Bb4 Nf3': {
      idea: "Develop and attack e5.",
      watch: "...Bxc3 doubles your pawns; recapture with the d- or b-pawn.",
      plan: "Bc4 and castle."
    },
    'e4 e5 Nc3 Bb4 Nf3 Nc6': {
      what: "Black defends e5.",
      threat: "...Bxc3 and ...Nf6 hitting e4.",
      avoid: "Do not play Nxe5? hoping for tactics; Black's pieces are well placed."
    },
    'e4 e5 Nc3 Bb4 Nf3 Nc6 Bc4': {
      idea: "Develop toward f7.",
      watch: "...Nf6 attacks e4; be ready with d3 or O-O.",
      plan: "Castle, then d3 or Nd5."
    },
    'e4 e5 Nc3 Bb4 Nf3 Nc6 Bc4 d6': {
      what: "Black supports e5 and opens the c8 bishop.",
      threat: "...Bg4 and ...Bxc3.",
      avoid: "Do not leave your king in the center."
    },
    'e4 e5 Nc3 Bb4 Nf3 Nc6 Bc4 d6 O-O': {
      idea: "Castle quickly; if ...Bxc3, recapture and play d4.",
      watch: "...Bg4 pins your knight; h3 asks the bishop.",
      plan: "d3 or Nd5, then c3 and d4."
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
