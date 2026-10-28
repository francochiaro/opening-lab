(function (g) {
  g.OL_ANN = g.OL_ANN || {};
  var A = g.OL_ANN.sicilian = g.OL_ANN.sicilian || {};
  Object.assign(A, {
    // ---------------- Alapin 2.c3 ----------------
    'e4 c5 c3 Nf6': {
      idea: "The knight attacks e4 at once. White's normal defender, Nc3, is impossible because a pawn stands on c3.",
      watch: "White usually pushes e5 to chase the knight. That is fine: the e5 pawn becomes a target.",
      plan: "After e5 go to d5, then attack the e5 pawn with ...d6 and develop ...Nc6.",
      mistake: "Playing ...g6 and ...Bg7 first. Against 2.c3 the quick knight hit on e4 is simpler and stops White from getting a free big center.",
      arrows: [['f6', 'e4']]
    },
    'e4 c5 c3 Nf6 e5 Nd5': {
      idea: "The knight jumps to the best square in the center. It cannot be hit by c4 easily, and c3 already took away White's Nc3.",
      watch: "White may play Bc4 to attack the knight. Then ...Nb6 is the usual answer.",
      plan: "Next take on d4 if White plays d4, develop ...Nc6, and chip at e5 with ...d6.",
      mistake: "Retreating the knight to g8 or e4. On d5 it is safe and active."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4': {
      what: "White supports e5 and builds the classical Alapin center with c3 and d4.",
      threat: "White wants cxd4 next, with pawns on d4 and e5.",
      avoid: "Do not let White keep a free center: take on d4 now so the c-file can open."
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3': {
      what: "White develops before playing d4 and keeps the c3 pawn at home.",
      threat: "Bc4 to chase the d5 knight, or d4 later.",
      avoid: "Do not take on e5 with nothing developed. Play ...Nc6 first."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4': {
      idea: "Trade the c-pawn for White's d-pawn. White will recapture with the c-pawn, and the c-file opens for your rook later.",
      watch: "This same position also comes from the Smith-Morra Gambit (2.d4 cxd4 3.c3 Nf6 4.e5 Nd5), so you learn it once.",
      plan: "Develop ...Nc6, then hit the e5 pawn with ...d6.",
      mistake: "Letting White play dxc5 or keep d4 untouched. Taking on d4 is the key move."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3': {
      what: "White develops first and will take back on d4 next move.",
      threat: "cxd4, and then Bc4 to hit the d5 knight.",
      avoid: "Do not try to hold the extra pawn with ...dxc3. Develop with ...Nc6."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 cxd4': {
      what: "White recaptures at once and has pawns on d4 and e5.",
      threat: "Nf3 and Bc4, keeping the big center.",
      avoid: "Do not ignore the e5 pawn. ...d6 attacks it right away."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6': {
      idea: "Develop the knight. It adds pressure on d4 and on e5.",
      watch: "White will take back cxd4 and then play Bc4.",
      plan: "After cxd4 play ...d6 to attack e5.",
      mistake: "Grabbing material with ...dxc3. It gives White a big lead in development."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6': {
      idea: "Hit the base of White's big pawn: e5 is attacked by the d6 pawn and the c6 knight. If White ever takes on d6 or lets you take on e5, the center opens for your pieces.",
      watch: "Bc4 attacks the d5 knight. Be ready to retreat it to b6.",
      plan: "After Bc4 play ...Nb6, then ...e6 or ...Bd7, and castle.",
      mistake: "Moving the d5 knight away without a reason. Keep it there until it is attacked.",
      arrows: [['d6', 'e5']]
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6 Bc4 Nb6': {
      idea: "Step out of the attack and hit the c4 bishop at the same time.",
      watch: "White usually answers Bb5, pinning the c6 knight against the king.",
      plan: "Break the pin with ...Bd7, take on e5 at the right moment, then develop and castle.",
      mistake: "Retreating to c7: the knight would block your own pieces."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 cxd4 d6': {
      idea: "Attack e5 at once. This is the same plan as with 5.Nf3 first, and it reaches the same positions.",
      watch: "White can defend e5 with Nf3.",
      plan: "Develop ...Nc6 next, then ...Nb6 if the bishop comes to c4.",
      mistake: "Playing ...e6 first and forgetting to challenge the e5 pawn."
    },
    'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 cxd4 d6 Nf3 Nc6': {
      idea: "Develop the knight and put a second attacker on e5 and d4. The position is now the same as the main Alapin line.",
      watch: "Bc4 hits the d5 knight again.",
      plan: "Meet Bc4 with ...Nb6 and Bb5 with ...Bd7.",
      mistake: "Taking on e5 too early, before your pieces are out."
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6': {
      idea: "Develop the knight. It eyes d4 and e5. This position also comes from 2.Nf3 Nc6 3.c3 Nf6 4.e5 Nd5.",
      watch: "White can chase the d5 knight with Bc4 or play d4 for the full center.",
      plan: "Against d4 take ...cxd4; against Bc4 retreat ...Nb6.",
      mistake: "Pushing ...d6 before ...Nc6. Development first."
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 Bc4': {
      what: "White attacks the d5 knight with the bishop instead of playing d4.",
      threat: "Nothing big yet, but the bishop aims at f7.",
      avoid: "Do not leave the knight on d5 to be taken. ...Nb6 also hits the bishop."
    },
    'e4 c5 Nf3 Nc6 c3 Nf6 e5 Nd5 d4': {
      what: "White builds the Alapin center with c3, d4 and e5.",
      threat: "cxd4 next, with a big pawn center.",
      avoid: "Take on d4 at once so White cannot keep both pawns."
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 Bc4 Nb6': {
      idea: "Retreat with tempo: the knight attacks the c4 bishop.",
      watch: "After Bb3 the bishop still aims at f7, so do not weaken that square.",
      plan: "Next ...d5 to attack the e5 pawn and open your c8 bishop.",
      mistake: "Retreating to c7. On b6 the knight hits the bishop and watches d5."
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 Bc4 Nb6 Bb3 d5': {
      idea: "Strike in the center. If White takes en passant with exd6, the e5 pawn disappears and your queen recaptures with a free position.",
      watch: "If White keeps the pawn on e5, your ...c4 and ...Bg4 ideas still give good play.",
      plan: "After exd6 play ...Qxd6, then ...c4 and ...Bg4.",
      mistake: "Playing ...d6 slowly and allowing White to keep a comfortable center.",
      arrows: [['d7', 'd5']]
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6 Qxd6': {
      idea: "Recapture with the queen. Your pieces are active and White has no center pawns left on the e- and d-files.",
      watch: "The queen on d6 can be hit by Na3-b5 or Bf4 later. Keep an eye on it.",
      plan: "Next ...c4 to chase the b3 bishop, then ...Bg4.",
      mistake: "Recapturing with the e-pawn and blocking your own bishop."
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6 Qxd6 O-O c4': {
      idea: "Gain space and push the bishop off its diagonal toward f7.",
      watch: "The c4 pawn can become a target later with b3. Be ready to defend it or trade it.",
      plan: "After Bc2 develop ...Bg4, pinning the f3 knight.",
      mistake: "Leaving the bishop on b3 aiming at f7 while you play slow moves.",
      arrows: [['c5', 'c4']]
    },
    'e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6 Qxd6 O-O c4 Bc2 Bg4': {
      idea: "Develop the bishop with a pin on the f3 knight. White cannot easily play d4 or Ne5.",
      watch: "After h3 keep the pin with ...Bh5. Do not give the bishop away for nothing.",
      plan: "Castle queenside or play ...e6 and ...Be7, then use your active pieces.",
      mistake: "Playing ...e6 before the bishop comes out and shutting it in."
    },

    // ---------------- 2.Nf3 Nc6 3.c3 ----------------
    'e4 c5 Nf3 Nc6 c3 Nf6': {
      idea: "Same answer as against 2.c3: the knight attacks e4, and White cannot defend it with Nc3.",
      watch: "White will push e5. Go to d5 and you reach the Alapin positions you already know.",
      plan: "After e5 play ...Nd5, then ...cxd4 and ...d6.",
      mistake: "Playing ...g6 automatically. Against c3 the knight hit on e4 is better.",
      arrows: [['f6', 'e4']]
    },
    'e4 c5 Nf3 Nc6 c3 Nf6 e5 Nd5': {
      idea: "The knight goes to the center. This is now exactly the Alapin position after 2.c3 Nf6 3.e5 Nd5 4.Nf3 Nc6.",
      watch: "White can choose between d4 and Bc4.",
      plan: "Against d4 take ...cxd4; against Bc4 play ...Nb6.",
      mistake: "Retreating the knight to g8. On d5 it is safe and strong."
    },
    'e4 c5 Nf3 Nc6 c3 Nf6 e5 Nd5 d4 cxd4': {
      idea: "Trade the c-pawn for the d-pawn and open the c-file.",
      watch: "After cxd4 you are back in the main Alapin line.",
      plan: "Next ...d6 to attack e5.",
      mistake: "Letting White keep both center pawns without a fight."
    },

    // ---------------- 2.d4: Smith-Morra and 3.Qxd4 ----------------
    'e4 c5 d4 cxd4': {
      idea: "Take the pawn. White gave it away, and you remove a central pawn.",
      watch: "White can gambit with 3.c3 (the Smith-Morra) or take back with the queen.",
      plan: "Against 3.c3 play ...Nf6; against 3.Qxd4 play ...Nc6 with tempo on the queen.",
      mistake: "Not taking. Letting White play d5 or dxc5 gives White a free center."
    },
    'e4 c5 d4 cxd4 c3': {
      what: "The Smith-Morra Gambit: White offers a second pawn for fast development and open lines.",
      threat: "After ...dxc3 Nxc3 White gets quick piece play with Bc4, Nf3, O-O and Qe2.",
      avoid: "You do not have to accept. ...Nf6 hits e4 and turns the game into an Alapin you know."
    },
    'e4 c5 d4 cxd4 Qxd4': {
      what: "White takes back with the queen right away and puts it in the center.",
      threat: "Nothing yet, but White hopes for a quick Nc3 and Bg5.",
      avoid: "Do not leave the queen there in peace: ...Nc6 attacks it and develops."
    },
    'e4 c5 d4 cxd4 c3 Nf6': {
      idea: "Decline the gambit by attacking e4. White cannot defend with Nc3 because the c3 square is taken.",
      watch: "After 4.e5 Nd5 the position is exactly the Alapin after 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4.",
      plan: "After e5 play ...Nd5, then ...Nc6 and ...d6.",
      mistake: "Accepting with ...dxc3 without knowing the theory: White gets a fast attack for the pawn.",
      arrows: [['f6', 'e4']]
    },
    'e4 c5 d4 cxd4 c3 Nf6 e5 Nd5': {
      idea: "The knight goes to the center. You have reached the Alapin by a different move order, and you are still a pawn up for the moment.",
      watch: "White will take back on d4 with the c-pawn or play Nf3 first.",
      plan: "Develop ...Nc6, then attack e5 with ...d6.",
      mistake: "Defending the d4 pawn with ...e5 or ...Qa5. Just develop and let White recapture."
    },
    'e4 c5 d4 cxd4 Qxd4 Nc6': {
      idea: "Develop with tempo: the knight attacks the queen, so White has to move it again.",
      watch: "The queen usually goes to d3, e3, a4 or back to d1.",
      plan: "Then ...Nf6, ...g6, ...Bg7 and castle: your normal Dragon setup.",
      mistake: "Developing a piece that does not hit the queen. Use the free tempo.",
      arrows: [['c6', 'd4']]
    },
    'e4 c5 d4 cxd4 Qxd4 Nc6 Qd3 Nf6': {
      idea: "Develop and attack e4.",
      watch: "White will defend e4 with Nc3.",
      plan: "Next ...g6, ...Bg7 and castle.",
      mistake: "Moving the queen out early. Your lead in development comes from bringing pieces out."
    },
    'e4 c5 d4 cxd4 Qxd4 Nc6 Qd3 Nf6 Nc3 g6': {
      idea: "The Dragon setup: the bishop goes to g7, where it watches the long diagonal.",
      watch: "White may try Bg5 or Be3 with Qd2 ideas. Castle quickly.",
      plan: "Next ...Bg7 and ...O-O.",
      mistake: "Playing ...e5 and leaving a hole on d5 for White's knight."
    },
    'e4 c5 d4 cxd4 Qxd4 Nc6 Qd3 Nf6 Nc3 g6 Nf3 Bg7': {
      idea: "The bishop takes its best diagonal, from g7 all the way to a1.",
      watch: "e4 is still a target. Count its defenders before White plays e5.",
      plan: "Castle next, then ...d6.",
      mistake: "Delaying castling to grab a pawn."
    },
    'e4 c5 d4 cxd4 Qxd4 Nc6 Qd3 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O': {
      idea: "King safety first. Your king is safe behind the g6 pawn and the g7 bishop.",
      watch: "White has spent time with the queen, so you are not behind in development.",
      plan: "Next ...d6, then ...Bg4 or ...Be6 and a rook to c8.",
      mistake: "Pushing kingside pawns in front of your castled king."
    },
    'e4 c5 d4 cxd4 Qxd4 Nc6 Qd3 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O d6': {
      idea: "Open the c8 bishop and control e5. This is the standard Dragon structure.",
      watch: "White's queen on d3 can be hit by ...Nb4 or ...Bf5 later.",
      plan: "Develop the bishop, put a rook on c8, and play on the c-file.",
      mistake: "Pushing ...e5 and giving White the d5 square."
    },

    // ---------------- Grand Prix 2.Nc3 / 3.f4 and Closed ----------------
    'e4 c5 Nc3 Nc6': {
      idea: "Develop the knight and keep a close eye on d4. Against 2.Nc3 you use the same ...Nc6, ...g6, ...Bg7 setup as everywhere else.",
      watch: "White may play f4 (the Grand Prix) or g3 (the Closed Sicilian).",
      plan: "Next ...g6 and ...Bg7.",
      mistake: "Playing ...e5 early and giving White the d5 square for the c3 knight."
    },
    'e4 c5 Nc3 Nc6 f4': {
      what: "The Grand Prix Attack: White plans Nf3, Bc4 or Bb5, castling and then f5 for a kingside attack.",
      threat: "A fast attack against your king with f5 and Qe1-h4.",
      avoid: "Do not open the kingside early. Build your setup with ...g6 and ...Bg7, and be ready to blunt Bc4 with ...e6."
    },
    'e4 c5 Nc3 Nc6 g3': {
      what: "The Closed Sicilian: White fianchettoes the bishop and keeps the center closed.",
      threat: "A slow kingside attack later with f4, Nf3 and f5.",
      avoid: "Do not panic and do not open the center. Mirror the setup with ...g6, ...Bg7 and ...d6."
    },
    'e4 c5 Nc3 Nc6 f4 g6': {
      idea: "Prepare ...Bg7, where the bishop hits the long diagonal and protects your king.",
      watch: "White's f4 pawn supports e5 and f5 later.",
      plan: "Next ...Bg7, then ...e6 and ...Nge7 if the bishop comes to c4.",
      mistake: "Playing ...e5 early. It makes the c8 bishop passive and gives White f4xe5 ideas."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7': {
      idea: "The bishop goes to its best square. It watches d4 and the long diagonal toward b2.",
      watch: "White's bishop will come to c4 or b5 next.",
      plan: "Against Bc4 play ...e6; against Bb5 jump to ...Nd4.",
      mistake: "Developing ...Nf6 here. The e5 push would chase the knight away."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4': {
      what: "The bishop aims at f7, the weakest square near your king.",
      threat: "f5 and Ng5 ideas against f7, and a fast attack.",
      avoid: "Do not let the bishop stay strong. ...e6 blocks its diagonal and prepares ...d5."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5': {
      what: "The bishop pins the c6 knight and may take it to damage your pawns.",
      threat: "Bxc6, then e5 or d4, to break your structure.",
      avoid: "Do not leave the knight to be taken for nothing. ...Nd4 jumps to a strong square and attacks the bishop."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4 e6': {
      idea: "Block the bishop's diagonal to f7 and prepare ...d5, which would hit the bishop. The pawn also stops f5 ideas.",
      watch: "White may push e5 to cramp you. Then ...d6 or ...d5 challenges it.",
      plan: "Next ...Nge7, then ...d5 with tempo on the bishop.",
      mistake: "Playing ...Nf6 here. After e5 the knight has to run.",
      arrows: [['e7', 'e6']]
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4 e6 O-O Nge7': {
      idea: "The knight goes to e7, where it supports ...d5 and cannot be chased by e5.",
      watch: "White's f5 push is less dangerous now because your e6 pawn and e7 knight cover it.",
      plan: "Next ...d5 to hit the bishop, then castle.",
      mistake: "Castling before ...d5 and allowing f5 with an attack."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4 e6 O-O Nge7 d3 d5': {
      idea: "Strike in the center and gain time on the c4 bishop. Your pawns now control e4 and c4.",
      watch: "The d5 pawn is attacked by the bishop, the e4 pawn and the c3 knight. It is defended by e6, the e7 knight and the queen, so it holds.",
      plan: "After Bb3 castle, then ...b6 and ...Bb7 or ...Na5 to trade the bishop.",
      mistake: "Taking on e4 too early and opening lines for White's pieces.",
      arrows: [['d7', 'd5']]
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4 e6 O-O Nge7 d3 d5 Bb3 O-O': {
      idea: "Castle into a safe king position. Your center is strong and White's bishop is blunted.",
      watch: "White may try f5 to open lines. Keep the e6 pawn solid.",
      plan: "Play ...b6, ...Bb7 or ...Na5 to trade White's good bishop, and later ...Rc8.",
      mistake: "Pushing ...d4 too early: it gives White's knight the e4 square."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5 Nd4': {
      idea: "Jump to the strong d4 square. The knight attacks the b5 bishop and the f3 knight, and White's c-pawn cannot chase it from c3 because the c3 knight blocks it.",
      watch: "If White trades with Nxd4 cxd4, your pawn on d4 hits the c3 knight.",
      plan: "Next ...a6 to ask the bishop where it is going, then ...b5.",
      mistake: "Letting White take on c6 and double your pawns for free.",
      arrows: [['c6', 'd4']]
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5 Nd4 O-O a6': {
      idea: "Attack the bishop again and prepare ...b5 to gain queenside space.",
      watch: "If White retreats to e2, your knight can take it or you can push ...b5.",
      plan: "Next ...b5 and ...Bb7, pointing at e4.",
      mistake: "Taking on f3 with check too early: it helps White's queen come into the game."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5 Nd4 O-O a6 Be2 b5': {
      idea: "Gain space on the queenside, where you are stronger. The b-pawn can push on to b4 to chase the c3 knight.",
      watch: "White may trade on d4 with Nxd4. Then ...cxd4 hits the c3 knight.",
      plan: "Next ...Bb7 to pressure e4.",
      mistake: "Rushing ...b4 before your pieces are ready."
    },
    'e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5 Nd4 O-O a6 Be2 b5 d3 Bb7': {
      idea: "The bishop aims down the long diagonal at e4 and, behind it, the white king.",
      watch: "White will try f5 or e5 on the kingside. Keep your knight on d4 as long as you can.",
      plan: "Continue ...e6, ...Ne7 and castle, then push ...b4 to win space.",
      mistake: "Moving the d4 knight away. It is your best piece."
    },
    'e4 c5 Nc3 Nc6 g3 g6': {
      idea: "Copy White's fianchetto. Your bishop on g7 will fight White's bishop on g2.",
      watch: "The Closed Sicilian is slow. You have time to build the setup.",
      plan: "Next ...Bg7, ...d6, then ...e6 and ...Nge7.",
      mistake: "Opening the center with ...d5 too early, which helps White's better-developed pieces."
    },
    'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7': {
      idea: "The bishop takes the long diagonal and watches d4 and b2.",
      watch: "White will play d3 and then f4 or Be3.",
      plan: "Next ...d6, then ...e6 and ...Nge7.",
      mistake: "Playing ...Nf6 here. White can push e5 or f4-e5 and chase it."
    },
    'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6': {
      idea: "Control e5 and open the c8 bishop. This is the standard closed setup for both sides.",
      watch: "White's plan is f4, Nf3 and f5 on the kingside.",
      plan: "Next ...e6 and ...Nge7, castle, then expand on the queenside with ...Rb8 and ...b5.",
      mistake: "Playing ...e5 and leaving d5 to White's knight."
    },
    'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 f4 e6': {
      idea: "Control f5 and d5. The pawn stops White's f5 push and prepares ...Nge7.",
      watch: "White may try e5 later. Then you can take or leave it, depending on the position.",
      plan: "Next ...Nge7 and castle.",
      mistake: "Playing ...Nf6 and walking into e5."
    },
    'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 f4 e6 Nf3 Nge7': {
      idea: "The knight goes to e7, where it supports ...d5 and ...f5 and is safe from e5.",
      watch: "White will castle and start the kingside plan. Get your king safe too.",
      plan: "Castle next, then ...Rb8 and ...b5 on the queenside.",
      mistake: "Leaving your king in the center while White prepares f5."
    },
    'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 f4 e6 Nf3 Nge7 O-O O-O': {
      idea: "Both kings are safe. Now each side plays on its own wing: White on the kingside, you on the queenside.",
      watch: "White may push f5. Answer calmly with ...exf5 or ...gxf5 only when you have checked it.",
      plan: "...Rb8, ...b5 and ...b4 to chase the c3 knight. ...Nd4 is often a strong square too.",
      mistake: "Waiting passively. Your queenside play must be as fast as White's kingside play."
    },

    // ---------------- 2.f4 ----------------
    'e4 c5 f4 Nc6': {
      idea: "Develop the knight. Against 2.f4 you use the same setup as against the Grand Prix: ...Nc6, ...g6, ...Bg7.",
      watch: "If White plays Nc3 soon, the position is exactly a Grand Prix.",
      plan: "Next ...g6 and ...Bg7.",
      mistake: "Playing ...e5 and allowing fxe5 or Nf3 with a strong center for White."
    },
    'e4 c5 f4 Nc6 Nf3 g6': {
      idea: "Prepare ...Bg7, where the bishop hits d4 and the long diagonal.",
      watch: "White can play Nc3 (back into the Grand Prix) or d4 to open the center.",
      plan: "Next ...Bg7. If White plays d4, take with ...cxd4.",
      mistake: "Developing ...Nf6 too early, before White commits."
    },
    'e4 c5 f4 Nc6 Nf3 g6 Nc3': {
      what: "White transposes into the Grand Prix Attack (2.Nc3 Nc6 3.f4 g6 4.Nf3).",
      threat: "Bc4 or Bb5 next, then castling and f5.",
      avoid: "Do not change plans. ...Bg7 and the Grand Prix answers you know."
    },
    'e4 c5 f4 Nc6 Nf3 g6 d4': {
      what: "White opens the center. With the pawn on f4, the e3 square and the g1-a7 diagonal are weak.",
      threat: "d5 to chase the c6 knight if you do not react.",
      avoid: "Do not let White play d5 for free. Take with ...cxd4."
    },
    'e4 c5 f4 Nc6 Nf3 g6 d4 cxd4': {
      idea: "Trade off White's center pawn. The c-file opens for you.",
      watch: "After Nxd4 the knight on d4 can become a target for ...Bg7 and the c6 knight.",
      plan: "Next ...Bg7, hitting the d4 knight.",
      mistake: "Allowing d5 and a space advantage for White."
    },
    'e4 c5 f4 Nc6 Nf3 g6 d4 cxd4 Nxd4 Bg7': {
      idea: "The bishop attacks the d4 knight. It is now hit twice (c6 knight and g7 bishop) and defended only by the queen.",
      watch: "If White ignores it, ...Nxd4 Qxd4 Bxd4 wins material. White must defend with Be3, Nb3 or c3.",
      plan: "After Be3 play ...Nf6, hitting e4.",
      mistake: "Developing a piece that does nothing. Use the pressure on d4.",
      arrows: [['g7', 'd4']]
    },
    'e4 c5 f4 Nc6 Nf3 g6 d4 cxd4 Nxd4 Bg7 Be3 Nf6': {
      idea: "Develop and attack e4. White's d-pawn is gone, so no pawn can defend it.",
      watch: "White will defend e4 with Nc3. The d4 knight still needs watching.",
      plan: "Next castle, then ...d6 and ...Qb6 or ...Ng4 ideas against the e3 bishop.",
      mistake: "Forgetting about e4. It has no pawn defender, so keep the pressure on it."
    },
    'e4 c5 f4 Nc6 Nf3 g6 d4 cxd4 Nxd4 Bg7 Be3 Nf6 Nc3 O-O': {
      idea: "Castle into safety. Your bishop on g7 and pawn on g6 protect the king.",
      watch: "White can push e5 to chase the f6 knight. Then ...Ne8 or ...Ng4 are possible.",
      plan: "Next ...d6 to fight against e5, then ...Nxd4 and ...Be6 or ...Qa5.",
      mistake: "Letting White push e5 and f5 without reacting in the center."
    },

    // ---------------- Rossolimo 3.Bb5 ----------------
    'e4 c5 Nf3 Nc6 Bb5 g6': {
      idea: "Keep your setup: the bishop on g7 will support ...e5 and control d4.",
      watch: "White may take on c6 to double your pawns. That is fine: you get the bishop pair.",
      plan: "Next ...Bg7, then ...e5 or ...Nf6.",
      mistake: "Playing ...a6 at once and allowing Bxc6 with a lead in development."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O': {
      what: "White castles and keeps the option of taking on c6.",
      threat: "c3 and d4 to build a center, or Re1 and Bxc6 then e5.",
      avoid: "Do not forget your development. ...Bg7 comes first."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 Bxc6': {
      what: "White gives up the bishop at once to damage your pawn structure.",
      threat: "A quiet game with d3, h3 and Nc3, aiming at your doubled c-pawns later.",
      avoid: "Do not take back with the b-pawn by habit. ...dxc6 opens your queen and c8 bishop."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7': {
      idea: "The bishop goes to g7 and protects your king. It also points at d4.",
      watch: "White will choose between c3 (to prepare d4) and Re1 (to support e5).",
      plan: "In both cases ...e5 is a good answer, taking control of d4.",
      mistake: "Playing ...Nf6 without checking e5 tricks."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 c3': {
      what: "White prepares d4 to take the center.",
      threat: "d4 next, opening the center while your king is still in the middle.",
      avoid: "Do not allow d4 cheaply. ...e5 takes control of d4."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 Re1': {
      what: "The rook supports e4 and prepares e5 after Bxc6.",
      threat: "Bxc6 and e5, chasing your pieces back.",
      avoid: "Do not let White push e5 for free. ...e5 stops it."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 c3 e5': {
      idea: "Stop d4. With pawns on c5 and e5 you control d4, and the g7 bishop is now a solid defender.",
      watch: "The d5 square is a little weak. Keep a piece ready to cover it.",
      plan: "Next ...Nge7 and castle, then ...d6.",
      mistake: "Playing ...Nf6, which can be hit by d4 and then e5 ideas.",
      arrows: [['e7', 'e5']]
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 c3 e5 d3 Nge7': {
      idea: "The knight goes to e7, so if White takes on c6 you take back with the knight and keep good pawns. The f-pawn also stays free for ...f5.",
      watch: "White may try d4 or b4 to open lines. Castle soon.",
      plan: "Next ...d6 and ...O-O.",
      mistake: "Putting the knight on f6, where it blocks the f-pawn."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 c3 e5 d3 Nge7 Be3 d6': {
      idea: "Protect e5 and open the c8 bishop. Your setup is complete.",
      watch: "White may push d4. Taking with ...exd4 and then castling is fine.",
      plan: "Castle, then ...h6 and ...f5 or ...Be6.",
      mistake: "Playing ...f5 before castling. Your king would be stuck in the center."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6': {
      idea: "Take toward the center with the d-pawn. It opens the d-file for your queen and frees the c8 bishop, and you keep the bishop pair.",
      watch: "Your c-pawns are doubled, but they control important squares like d4 and b5.",
      plan: "Next ...Bg7, ...Nf6 and castle.",
      mistake: "Thinking doubled pawns mean you are worse. Open lines and two bishops are good compensation."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7': {
      idea: "The bishop goes to its usual diagonal.",
      watch: "White will play h3 to stop ...Bg4, then Nc3 and Be3.",
      plan: "Next ...Nf6 and castle.",
      mistake: "Trading queens on d1 without a reason. Keep pieces on and use the bishops."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7 h3 Nf6': {
      idea: "Develop the knight and get ready to castle.",
      watch: "The knight can later go to d7 to support ...e5.",
      plan: "Castle next, then ...b6 and ...Be6 or ...Nd7 and ...e5.",
      mistake: "Leaving the king in the center while the d-file is open."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7 h3 Nf6 Nc3 O-O': {
      idea: "Your king is safe and your two bishops are ready for the middlegame.",
      watch: "White will try to trade a pair of bishops with Be3 and Qd2.",
      plan: "...b6, ...Nd7 and ...e5, or ...Nd7 and ...f5 later.",
      mistake: "Letting White trade off your dark-squared bishop cheaply."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 Re1 e5': {
      idea: "Take e5 with a pawn so White cannot push there. It also controls d4.",
      watch: "White often takes on c6 and plays d3. Recapture with the d-pawn.",
      plan: "After Bxc6 play ...dxc6, then ...Ne7 and castle.",
      mistake: "Playing ...Nf6 and allowing Bxc6 followed by e5."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 Re1 e5 Bxc6 dxc6': {
      idea: "Take with the d-pawn: the queen and c8 bishop open up, and you get the bishop pair.",
      watch: "White will try to attack your e5 pawn later with d3, Nbd2-c4 or Na3-c4.",
      plan: "Next ...Ne7, then castle and ...f6 if e5 needs support.",
      mistake: "Recapturing with the b-pawn, which blocks your queen and bishop."
    },
    'e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 Re1 e5 Bxc6 dxc6 d3 Ne7': {
      idea: "The knight develops without blocking the f-pawn. Later ...f6 can support e5.",
      watch: "White's knight may come to c4 to hit e5. Keep e5 defended.",
      plan: "Castle, then ...f6, ...Be6 and ...Qc7.",
      mistake: "Putting the knight on f6, where it blocks the f-pawn and can be hit."
    },

    // ---------------- Bowdler 2.Bc4 and 2.Nf3 Nc6 3.Bc4 ----------------
    'e4 c5 Bc4 e6': {
      idea: "Block the bishop's diagonal to f7 and prepare ...d5, which will hit the bishop with tempo.",
      watch: "The e6 pawn shuts in your c8 bishop for now, but after ...d5 and an exchange on d5 it opens again.",
      plan: "Next ...d5.",
      mistake: "Playing ...Nc6 and ...g6 on autopilot. The bishop on c4 then stays strong against f7.",
      arrows: [['e7', 'e6']]
    },
    'e4 c5 Bc4 e6 Nf3 d5': {
      idea: "Hit the bishop and take the center. White has to take on d5 or move the bishop again.",
      watch: "After exd5 take back with the e-pawn: it opens your c8 bishop.",
      plan: "After exd5 exd5, develop ...Nc6, ...Nf6 and ...Bd6.",
      mistake: "Developing slowly and letting the bishop stay on c4 without a fight.",
      arrows: [['d7', 'd5']]
    },
    'e4 c5 Bc4 e6 Nf3 d5 exd5 exd5': {
      idea: "Recapture with the pawn. You keep a pawn in the center and your c8 bishop can come out.",
      watch: "The bishop on c4 is attacked by your d5 pawn. White will move it with check on b5.",
      plan: "Block a check on b5 with ...Nc6, then ...Nf6 and ...Bd6.",
      mistake: "Taking back with the queen, which can be chased by Nc3."
    },
    'e4 c5 Bc4 e6 Nf3 d5 exd5 exd5 Bb5+ Nc6': {
      idea: "Block the check with a developing move.",
      watch: "The c6 knight is pinned, so do not move it until you have castled or broken the pin.",
      plan: "Next ...Nf6, ...Bd6 and castle.",
      mistake: "Blocking with ...Kf8 or ...Bd7 without thinking. ...Nc6 develops a piece."
    },
    'e4 c5 Bc4 e6 Nf3 d5 exd5 exd5 Bb5+ Nc6 O-O Nf6': {
      idea: "Develop and get ready to castle.",
      watch: "The e-file is open. Watch for Re1+ before you castle: ...Be7 blocks it.",
      plan: "Next ...Be7 or ...Bd6, then ...O-O.",
      mistake: "Leaving the king in the middle of the open e-file."
    },
    'e4 c5 Nf3 Nc6 Bc4 e6': {
      idea: "Block the bishop's diagonal to f7 and prepare ...d5, gaining time on the bishop.",
      watch: "The same idea works against 2.Bc4: ...e6 and ...d5.",
      plan: "Next ...d5.",
      mistake: "Playing ...g6 here and letting White hit f7 with Ng5 or Qb3 ideas.",
      arrows: [['e7', 'e6']]
    },
    'e4 c5 Nf3 Nc6 Bc4 e6 O-O d5': {
      idea: "Hit the bishop and take the center.",
      watch: "After exd5 take back with the e-pawn so your c8 bishop is free.",
      plan: "After exd5 exd5, develop ...Bd6, ...Nge7 or ...Nf6 and castle.",
      mistake: "Waiting with ...a6 or ...Nf6 and letting White play d4 first.",
      arrows: [['d7', 'd5']]
    },
    'e4 c5 Nf3 Nc6 Bc4 e6 O-O d5 exd5 exd5': {
      idea: "Recapture with the pawn: you keep a central pawn and open the c8 bishop.",
      watch: "White's bishop is attacked and may go to b5 to pin your knight. Then a check on the e-file can follow.",
      plan: "Develop ...Bd6 and ...Nge7, then castle.",
      mistake: "Moving the king or queen onto the open e-file before you castle."
    },
    'e4 c5 Nf3 Nc6 Bc4 e6 O-O d5 exd5 exd5 Bb5 Bd6': {
      idea: "Develop the bishop to its best square. It watches the kingside and gets ready for castling.",
      watch: "White may give checks on the e-file with Re1+ or Qe2+. Block with ...Nge7 or ...Be6.",
      plan: "Next ...Nge7 and ...O-O.",
      mistake: "Delaying castling. Your king is still on the open e-file."
    },

    // ---------------- Wing Gambit 2.b4 ----------------
    'e4 c5 b4 cxb4': {
      idea: "Take the pawn. White gives it to pull your c-pawn away from the center.",
      watch: "White will play a3 to open lines on the queenside.",
      plan: "Next ...d5, hitting e4 at once.",
      mistake: "Defending the b4 pawn with ...bxa3 or ...a5. Strike in the center instead."
    },
    'e4 c5 b4 cxb4 a3 d5': {
      idea: "Hit e4 right away. This is the simplest answer: you fight for the center instead of holding on to b4.",
      watch: "After exd5 take back with the queen. It is safe on d5 because your b4 pawn controls c3: Nc3 would just lose the knight.",
      plan: "After exd5 Qxd5, play ...e5 and develop.",
      mistake: "Taking on a3 with ...bxa3: White gets fast development and open files.",
      arrows: [['d7', 'd5']]
    },
    'e4 c5 b4 cxb4 a3 d5 exd5 Qxd5': {
      idea: "The queen takes back. It is safe because the b4 pawn covers c3, so Nc3 cannot chase it yet.",
      watch: "White will try to develop fast with Nf3 and axb4.",
      plan: "Next ...e5 to take the center.",
      mistake: "Moving the queen again. Develop pieces and pawns instead."
    },
    'e4 c5 b4 cxb4 a3 d5 exd5 Qxd5 Nf3 e5': {
      idea: "Take the center with the e-pawn. It also opens the f8 bishop.",
      watch: "White can take on b4 with the a-pawn. Your f8 bishop takes back.",
      plan: "After axb4 play ...Bxb4.",
      mistake: "Forgetting that the e5 pawn needs protection later."
    },
    'e4 c5 b4 cxb4 a3 d5 exd5 Qxd5 Nf3 e5 axb4 Bxb4': {
      idea: "Take back and develop the bishop at the same time.",
      watch: "If White plays Nc3, your bishop can take it and then trade queens.",
      plan: "Against Nc3 play ...Bxc3 and ...Qxd1+.",
      mistake: "Leaving the bishop where Ba3 or c3 can hit it without a plan."
    },
    'e4 c5 b4 cxb4 a3 d5 exd5 Qxd5 Nf3 e5 axb4 Bxb4 Nc3 Bxc3': {
      idea: "Trade the bishop for the knight that was attacking your queen.",
      watch: "After dxc3 White's queen faces yours on the d-file. Trade it.",
      plan: "Next ...Qxd1+.",
      mistake: "Moving your queen away and letting White keep a lead in development."
    },
    'e4 c5 b4 cxb4 a3 d5 exd5 Qxd5 Nf3 e5 axb4 Bxb4 Nc3 Bxc3 dxc3 Qxd1+': {
      idea: "Trade queens with check. White's king has to move, so White can no longer castle.",
      watch: "You are a pawn up and White has doubled c-pawns. The endgame is good for you.",
      plan: "Develop ...Nc6, ...Bg4 or ...Be6, castle, and use your extra pawn.",
      mistake: "Avoiding the queen trade. With queens off, White has no attack for the lost pawn."
    },

    // ---------------- 2.d3 ----------------
    'e4 c5 d3 Nc6': {
      idea: "Develop the knight. Against the quiet 2.d3 you use the same ...Nc6, ...g6, ...Bg7 setup.",
      watch: "White usually plays the King's Indian Attack: g3, Bg2, f4 or Nf3, and O-O.",
      plan: "Next ...g6 and ...Bg7.",
      mistake: "Playing ...e5 early and giving White the d5 square."
    },
    'e4 c5 d3 Nc6 g3 g6': {
      idea: "Mirror the fianchetto. Your bishop on g7 will balance White's on g2.",
      watch: "This is a slow line. Use the time to complete development.",
      plan: "Next ...Bg7.",
      mistake: "Opening the center early with ...d5, which helps White's quick development."
    },
    'e4 c5 d3 Nc6 g3 g6 Bg2 Bg7': {
      idea: "The bishop takes the long diagonal and watches the queenside.",
      watch: "White's f4 push prepares kingside play.",
      plan: "Next ...d6, ...e6 and ...Nge7.",
      mistake: "Playing ...Nf6, which can be chased by e5 later."
    },
    'e4 c5 d3 Nc6 g3 g6 Bg2 Bg7 f4 d6': {
      idea: "Control e5 and open the c8 bishop.",
      watch: "White may try e5 once its pieces are ready.",
      plan: "Next ...e6 and ...Nge7, castle, then ...Rb8 and ...b5.",
      mistake: "Allowing f5 for free. ...e6 is coming."
    },
    'e4 c5 d3 Nc6 g3 g6 Bg2 Bg7 f4 d6 Nf3 e6': {
      idea: "Control f5 and d5 so White's f5 push is harder.",
      watch: "e5 is a typical White push. Your d6 and e6 pawns are ready to meet it.",
      plan: "Next ...Nge7 and castle.",
      mistake: "Playing ...Nf6 and walking into e5."
    },
    'e4 c5 d3 Nc6 g3 g6 Bg2 Bg7 f4 d6 Nf3 e6 O-O Nge7': {
      idea: "The knight goes to e7, where it supports ...d5 and ...f5 and is safe from e5.",
      watch: "Castle next before White starts a kingside attack.",
      plan: "Castle, then ...Rb8 and ...b5 on the queenside, or ...d5 in the center.",
      mistake: "Leaving the king in the center."
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
