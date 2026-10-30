# Opening Lab

An interactive chess opening trainer for club players (roughly 500-1100 Elo). You play real positions against an opponent that only plays curated, validated book moves. A branching tree shows every reply, each decision explains the idea, and Stockfish runs in your browser to show who is winning.

**Live:** https://vast-lake.drophere.cc/

## What it covers

| Course | You play | Against |
|---|---|---|
| Vienna Game | White | 1...e5 2.Nc3 |
| Italian Game | White | 1...e5 2.Nf3 Nc6 3.Bc4 |
| Ruy Lopez | White | 1...e5 2.Nf3 Nc6 3.Bb5 |
| 1.e4 vs Sicilian, French & more | White | every other reply to 1.e4 (Alapin, French Advance, Scandinavian, Caro-Kann Advance, Pirc/Modern, Alekhine, Philidor, Petrov, Stafford, Damiano, odd first replies) |
| Caro-Kann Defense | Black | 1.e4 |
| Sicilian Defense (Accelerated Dragon) | Black | 1.e4: the Open Sicilian, Maroczy Bind, Alapin, Smith-Morra, Grand Prix, Closed, Rossolimo, Bowdler, Wing Gambit and more, plus the Najdorf, Dragon and Kan as optional extras |
| Slav Defense | Black | 1.d4 (incl. London, Colle, Jobava, Blackmar-Diemer), 1.c4, 1.Nf3 |
| Black vs Unusual First Moves | Black | 1.g3, 1.b3, 1.f4, 1.Nc3, 1.b4, 1.e3, 1.d3, 1.g4 and more |

181 lines in total. Each course card says which Elo range and time controls it suits best. That guidance is a coach's judgement, not statistics.

## Features

- **Guidance for first-timers:** every course has a "Your path" card (learn the core lines, then practice, then the common ones) with a one-click "Learn next" line. In Learn & Explore the green arrow shows your move unless you switch to "Quiz me". In Practice, a position you have never seen is shown to you first and only tested the next time it comes up.
- **Learn & Explore:** play against the book opponent with hints you reveal, plan arrows, and a note on every move (why it works, what to watch out for, the next plan, the typical mistake). If you play a legal move outside the course, the page says so, and links to another course when that course covers the position.
- **Opening Tree:** a branching tree you can click. Any move loads its exact position. Filters, depth control and zoom.
- **Practice:** Guided, Recall and Challenge modes, in sessions of 1, 3 or 5 lines (each played to its end; new moves are shown first, then the line is replayed from memory). Weak spots come up first. You can start from move 1 or from the key position. Progress is saved in your browser.
- **Analysis:** eval bar, top engine lines, a best-move arrow, move labels (Book, Best, Excellent, Good, Inaccuracy, Mistake, Blunder), an advantage graph and accuracy per side using the lichess formula. All of it comes from Stockfish 19 lite running in your browser. The book opponent never uses the engine.

## How it works

- `src/lines.js` holds the courses and the curated lines as SAN move lists.
- `src/ann/*.js` holds the notes for each move, plus lessons and end-of-line plans.
- `src/graph.js` turns the lines into one graph per course, keyed by position (FEN), so different move orders that reach the same position share a node. The same graph drives the opponent, the tree, the hints and the practice scoring.
- `src/selftest.js` holds the acceptance checks. They run in the page (shown on the home page as a badge) and in Node.
- `src/app.{html,css,js}` is the UI. `build.mjs` inlines everything into a single pure-ASCII `dist/index.html` and copies the engine into `dist/engine/`.

## Develop

```bash
npm install
npm run build              # writes dist/
npm run validate           # replays every line, checks the graph and the self-test
npm run validate:engine    # also flags any recommended move Stockfish dislikes
npm run serve              # http://localhost:8765
npm run test:ui            # Playwright browser suite (needs Python Playwright + Chrome)
node tests/probe.cjs "e4 e5 Nc3 Nf6 f4" 20 3   # engine lines for a position, in SAN
```

`dist/` is committed, so the site can be hosted as-is on any static host, for example GitHub Pages. Serve it over http(s): opened from `file://`, everything works except the engine.

## Credits and licences

- Rules: [chess.js](https://github.com/jhlywa/chess.js) 1.4.0 (BSD-2-Clause)
- Engine: [Stockfish.js](https://github.com/nmrugg/stockfish.js) 19 lite (GPL-3.0), shipped in `dist/engine/` with its licence
- Pieces: cburnett set (CC BY-SA 3.0)
- This project is licensed under GPL-3.0-or-later (see `LICENSE`), because it ships the Stockfish engine.

Not affiliated with any chess website.
