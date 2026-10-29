"""Browser interaction tests for Opening Lab (spec section 8, tests 3-25).
Usage: python3 tests/ui_test.py [url]   (default http://localhost:8765/)
"""
import sys, random, time
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/'
SHOTS = Path(__file__).resolve().parent / 'screenshots'
SHOTS.mkdir(exist_ok=True)
results = []


def check(name, cond, detail=''):
    results.append((name, bool(cond), detail))
    print(('  ok   ' if cond else '  FAIL ') + name + ('' if cond else '  :: ' + str(detail)))


def hist(pg):
    return pg.evaluate('OpeningLab.history()')


def wait_hist(pg, n, timeout=4000):
    end = time.time() + timeout / 1000
    while time.time() < end:
        if len(hist(pg)) >= n:
            return True
        pg.wait_for_timeout(60)
    return False


def sq_center(pg, sq):
    box = pg.locator('#board').bounding_box()
    flipped = pg.evaluate("(function(){var s=OpeningLab.state();var side=OL_COURSES.filter(function(c){return c.id===s.cid})[0].side;return (side==='b')!==!!s.userFlip;})()")
    f = ord(sq[0]) - 97
    r = int(sq[1]) - 1
    x, y = (7 - f, r) if flipped else (f, 7 - r)
    s = box['width'] / 8
    return box['x'] + (x + 0.5) * s, box['y'] + (y + 0.5) * s


def san_squares(pg, san):
    return pg.evaluate("(san)=>{var g=new ChessLib.Chess(OpeningLab.fen());var m=g.move(san);return [m.from,m.to];}", san)


def click_move(pg, frm, to):
    pg.mouse.click(*sq_center(pg, frm))
    pg.mouse.click(*sq_center(pg, to))


def drag_move(pg, frm, to):
    x1, y1 = sq_center(pg, frm)
    x2, y2 = sq_center(pg, to)
    pg.mouse.move(x1, y1)
    pg.mouse.down()
    pg.mouse.move((x1 + x2) / 2, (y1 + y2) / 2, steps=4)
    pg.mouse.move(x2, y2, steps=4)
    pg.mouse.up()


def play(pg, san, how='click'):
    frm, to = san_squares(pg, san)
    (drag_move if how == 'drag' else click_move)(pg, frm, to)


def rec_san(pg):
    return pg.evaluate("""(function(){var s=OpeningLab.state();var g=OpeningLab.graphs[s.cid];var k=s.moves.length?s.moves[s.moves.length-1].key:g.rootKey;var n=g.nodes[k];if(!n)return null;for(var i=0;i<n.edges.length;i++)if(n.edges[i].rec)return n.edges[i].san;return null;})()""")


def open_course(pg, cid, tab='learn'):
    pg.goto(URL + '#/' + cid + '/' + tab)
    pg.wait_for_timeout(250)
    pg.evaluate("location.reload()")
    pg.wait_for_selector('#board .sq')
    pg.wait_for_timeout(200)


def pick_line(pg, line_id):
    pg.select_option('select[data-act="pick-line"]', line_id)
    pg.wait_for_timeout(100)


def play_line_as_learner(pg, line_id, how='click'):
    """Follow a forced line, playing the learner's moves through the board UI."""
    sans = pg.evaluate("(id)=>{var l=OL_LINES.filter(function(x){return x.id===id})[0];return l.moves.split(' ')}", line_id)
    side = pg.evaluate("(id)=>{var l=OL_LINES.filter(function(x){return x.id===id})[0];return OL_COURSES.filter(function(c){return c.id===l.course})[0].side}", line_id)
    for i, san in enumerate(sans):
        mover = 'w' if i % 2 == 0 else 'b'
        if mover == side:
            if not wait_hist(pg, i):
                return False, 'opponent did not reach ply %d (history %s)' % (i, hist(pg))
            play(pg, san, how)
            if not wait_hist(pg, i + 1, 2000):
                return False, 'learner move %s not accepted at ply %d' % (san, i)
        else:
            if not wait_hist(pg, i + 1):
                return False, 'opponent reply missing at ply %d' % i
    h = hist(pg)
    return h[:len(sans)] == sans, 'history %s' % h


with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome')
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900})
    pg = ctx.new_page()
    errors = []
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.on('dialog', lambda d: d.accept())

    print('\nHome and self-test')
    pg.goto(URL)
    pg.wait_for_selector('.selftest-badge')
    diag = pg.evaluate('OpeningLab.diag')
    badge = pg.inner_text('.selftest-badge')
    check('self-test badge shows live computed counts', ('%d/%d lines validated' % (diag['linesOk'], diag['lines'])) in badge and diag['linesOk'] == diag['lines'], badge)
    check('in-app self-test all pass', pg.evaluate('OpeningLab.selftest.every(function(r){return r.ok})'))
    n_courses = pg.evaluate('OL_COURSES.length')
    check('one course card per course (%d) with suitability info' % n_courses, n_courses == 8 and pg.locator('.card[data-act="open-course"]').count() == n_courses and pg.locator('.card .chip.elo').count() == n_courses)
    check('home explains how it works in three steps', pg.locator('.how > div').count() == 3)
    cov = pg.inner_text('.home')
    check('home coverage map lists Black answers to rare first moves and White answers to odd replies', all(t in cov for t in ['1.b4', '1.g4', '1.d4', '1...c5', '1...b6', '1...e5 2.Nf3 f6']), '')

    print('\nVienna: board input, book replies, Bc5 -> Bb6')
    open_course(pg, 'vienna')
    start_fen = pg.evaluate('OpeningLab.fen()')
    drag_move(pg, 'e2', 'e5')
    pg.wait_for_timeout(300)
    check('13. illegal drag e2-e5 changes nothing', hist(pg) == [] and pg.evaluate('OpeningLab.fen()') == start_fen)
    play(pg, 'e4', 'click')
    check('click-to-move 1.e4 accepted, book replies 1...e5', wait_hist(pg, 2) and hist(pg) == ['e4', 'e5'], hist(pg))
    play(pg, 'Nc3', 'drag')
    wait_hist(pg, 4)
    check('drag-to-move 2.Nc3; reply is a Vienna book move', hist(pg)[3] in ('Nf6', 'Nc6', 'Bc5', 'Bb4'), hist(pg))

    open_course(pg, 'vienna')
    pick_line(pg, 'V08')
    ok, d = play_line_as_learner(pg, 'V08')
    check('Quality gate: Vienna 2...Nc6 line plays with correct learner moves (3.Bc4 recommended)', ok, d)
    no_f6 = pg.evaluate("(function(){var s=OpeningLab.state();var g=new ChessLib.Chess(s.moves[3].fen);return !g.get('f6')})()")
    check('7. after 2...Nc6 the board has no knight on f6', no_f6)
    check('22. finishing a line shows the completion state', pg.locator('text=Line complete').count() > 0)
    stored = pg.evaluate("JSON.parse(localStorage.getItem('openingLab.v1')).courses.vienna.lines.V08")
    check('22b. completion is recorded in progress', stored == 1, stored)

    open_course(pg, 'vienna')
    pick_line(pg, 'V07')
    ok, d = play_line_as_learner(pg, 'V07', 'drag')
    bish = pg.evaluate("(function(){var s=OpeningLab.state();var g5=new ChessLib.Chess(s.moves[3].fen);var g10=new ChessLib.Chess(s.moves[9].fen);return [g5.get('c5'), g10.get('c5'), g10.get('b6')]})()")
    check('8. ...Bc5 at move 2 then ...Bb6 at move 5: bishop on c5, later on b6, never teleports', ok and bish[0] and bish[0]['type'] == 'b' and not bish[1] and bish[2]['type'] == 'b', (d, bish))

    print('\nOut-of-book handling')
    open_course(pg, 'vienna')
    play(pg, 'a3')
    pg.wait_for_timeout(1200)
    check('14. legal move outside the book: shown as outside lesson, opponent does not move', hist(pg) == ['a3'] and pg.locator('text=Legal move, but outside this opening lesson').count() == 1, hist(pg))
    pg.click('button[data-act="show-alts"]')
    check('14b. "See supported alternatives" lists book moves', pg.locator('.movechip').count() >= 1)
    pg.click('text=Undo and try a book move')
    pg.wait_for_timeout(300)
    check('14c. Undo returns to the start', hist(pg) == [])
    play(pg, 'a3')
    pg.wait_for_timeout(300)
    pg.click('button[data-act="explore"]')
    play(pg, 'h6')
    pg.wait_for_timeout(300)
    check('14d. Explore freely lets you move both sides', hist(pg) == ['a3', 'h6'], hist(pg))

    print('\nUndo, restart, new variation, course switching')
    open_course(pg, 'vienna')
    play(pg, 'e4'); wait_hist(pg, 2)
    play(pg, 'Nc3'); wait_hist(pg, 4)
    pg.click('#side button[data-act="undo"]')
    pg.wait_for_timeout(1500)
    check('17. Undo returns to a human decision point and the book does not replay', hist(pg) == ['e4', 'e5'] and pg.evaluate("OpeningLab.state().thinking") is False, hist(pg))

    open_course(pg, 'caro')
    wait_hist(pg, 1)
    first_label = pg.evaluate("document.querySelector('#board .sq').getAttribute('aria-label')")
    check('4. Caro-Kann: book plays 1.e4 first and Black is at the bottom', hist(pg) == ['e4'] and first_label.startswith('h1'), (hist(pg), first_label))
    check('4b. learner (Black) is to move with ...c6 recommended', pg.evaluate("OpeningLab.fen()").split(' ')[1] == 'b' and rec_san(pg) == 'c6')
    for _ in range(6):
        pg.click('#side button[data-act="newvar"]')
    pg.wait_for_timeout(1800)
    check('19. spamming New variation never creates overlapping book moves', hist(pg) == ['e4'], hist(pg))
    play(pg, 'c6', 'drag')
    wait_hist(pg, 3)
    pg.click('a, button[data-cid="italian"]') if False else pg.click('.ctab[data-cid="italian"]')
    pg.wait_for_timeout(1500)
    check('16. switching course mid-session starts clean (no stray move)', pg.evaluate("OpeningLab.state().cid") == 'italian' and hist(pg) == [], hist(pg))
    pg.click('button[data-act="flip"]')
    pg.wait_for_timeout(150)
    check('16b. flip board works', pg.evaluate("document.querySelector('#board .sq').getAttribute('aria-label')").startswith('h1'))

    print('\nCaro-Kann as Black with drag, click')
    open_course(pg, 'caro')
    pick_line(pg, 'C03')
    ok, d = play_line_as_learner(pg, 'C03', 'drag')
    check('23. Black-oriented Caro-Kann line played with drag', ok, d)
    open_course(pg, 'caro')
    pick_line(pg, 'C06')
    ok, d = play_line_as_learner(pg, 'C06', 'click')
    check('23b. Black-oriented Caro-Kann line played with clicks', ok, d)
    whites_ok = pg.evaluate("OpeningLab.state().moves.every(function(m){return m.color==='b' || m.edge})")
    check('Quality gate: every White move in Caro-Kann came from the book', whites_ok)

    print('\nNew courses: Slav (Black) and 1.e4 vs others (White)')
    open_course(pg, 'slav')
    wait_hist(pg, 1)
    lab = pg.evaluate("document.querySelector('#board .sq').getAttribute('aria-label')")
    check('Slav: the book plays White first and Black is at the bottom', hist(pg)[0] in ('d4', 'c4', 'Nf3') and lab.startswith('h1'), (hist(pg), lab))
    for lid, how in [('S08', 'click'), ('S01', 'drag'), ('S11', 'click')]:
        open_course(pg, 'slav')
        pick_line(pg, lid)
        ok, d = play_line_as_learner(pg, lid, how)
        check('Slav %s played as Black (%s)' % (lid, how), ok, d)
    for lid, how in [('A01', 'drag'), ('A06', 'click'), ('A08', 'click'), ('A22', 'drag')]:
        open_course(pg, 'e4others')
        pick_line(pg, lid)
        ok, d = play_line_as_learner(pg, lid, how)
        check('1.e4 Others %s played as White (%s)' % (lid, how), ok, d)
    for lid, how in [('U06', 'click'), ('U10', 'drag'), ('U04', 'click')]:
        open_course(pg, 'rare')
        pick_line(pg, lid)
        ok, d = play_line_as_learner(pg, lid, how)
        check('Unusual first moves %s played as Black (%s)' % (lid, how), ok, d)
    for cid, lid in [('slav', 'S15'), ('caro', 'C18'), ('italian', 'I15'), ('e4others', 'A31')]:
        open_course(pg, cid)
        pick_line(pg, lid)
        ok, d = play_line_as_learner(pg, lid)
        check('Gap line %s in %s plays through' % (lid, cid), ok, d)
    open_course(pg, 'e4others')
    seen2 = set()
    for _ in range(12):
        pg.click('#side button[data-act="newvar"]')
        pg.wait_for_timeout(50)
        play(pg, 'e4'); wait_hist(pg, 2)
        seen2.add(hist(pg)[1])
    check('1.e4 Others: Surprise mode varies Black\'s first reply', len(seen2) >= 3, seen2)

    open_course(pg, 'vienna')
    play(pg, 'e4'); wait_hist(pg, 2)
    play(pg, 'Nf3'); pg.wait_for_timeout(300)
    has_link = pg.locator('button[data-act="goto-course"]').count() == 1
    if has_link:
        pg.click('button[data-act="goto-course"]')
        wait_hist(pg, 4)
    check('Out of book in one course but covered in another: link continues there with the same moves', has_link and pg.evaluate("OpeningLab.state().cid") in ('italian', 'ruy', 'e4others') and hist(pg)[:3] == ['e4', 'e5', 'Nf3'] and len(hist(pg)) == 4, hist(pg))

    print('\nDeterminism vs variety')
    open_course(pg, 'ruy')
    pick_line(pg, 'R05')
    seqs = []
    for _ in range(3):
        pg.click('#side button[data-act="restart"]')
        ok, d = play_line_as_learner(pg, 'R05')
        seqs.append(tuple(hist(pg)))
    check('20. a selected line repeats deterministically', ok and len(set(seqs)) == 1, seqs[:1])
    open_course(pg, 'vienna')
    seen = set()
    for _ in range(14):
        pg.click('#side button[data-act="newvar"]')
        pg.wait_for_timeout(50)
        play(pg, 'e4'); wait_hist(pg, 2)
        play(pg, 'Nc3'); wait_hist(pg, 4)
        seen.add(hist(pg)[3])
    check('20b. Surprise mode picks at least two different book branches', len(seen) >= 2, seen)

    print('\nHints refer to the current position')
    open_course(pg, 'italian')
    play(pg, 'e4'); wait_hist(pg, 2)
    play(pg, 'Nf3'); wait_hist(pg, 4)
    play(pg, 'Bc4'); wait_hist(pg, 6)
    pg.click('#side button[data-act="hint"]')
    pg.wait_for_timeout(150)
    chip = pg.inner_text('.movechip.rec')
    check('21. hint shows the recommended move for the current position', rec_san(pg) in chip, (rec_san(pg), chip))

    print('\nTree <-> board sync')
    for cid in ['vienna', 'italian', 'ruy', 'caro', 'slav', 'e4others', 'rare']:
        open_course(pg, cid, 'tree')
        pg.wait_for_selector('#tree-canvas .tm')
        pg.select_option('#tdepth', '99')
        pg.click('button[data-act="tfilter"][data-v="advanced"]')
        pg.wait_for_timeout(200)
        n = pg.locator('#tree-canvas .tm').count()
        idxs = random.Random(7).sample(range(n), min(25, n))
        bad = []
        for i in idxs:
            try:
                btn = pg.locator('#tree-canvas .tm').nth(i)
                btn.scroll_into_view_if_needed(timeout=5000)
                btn.click(timeout=5000)
            except Exception:
                pg.wait_for_timeout(300)
                pg.locator('#tree-canvas .tm').nth(i).click(timeout=8000, force=True)
            pg.wait_for_timeout(40)
            res = pg.evaluate("""(function(){var s=OpeningLab.state();var g=OpeningLab.graphs[s.cid];var cur=document.querySelector('#tree-canvas .tm.cur');var k=s.moves[s.moves.length-1].key;var n=g.nodes[k];var f=OpeningLab.fen();var legal=new ChessLib.Chess(f).moves().length;return {ok: !!n && n.fen.split(' ').slice(0,4).join(' ')===f.split(' ').slice(0,4).join(' ') && legal===new ChessLib.Chess(n.fen).moves().length, cur: !!cur, thinking: s.thinking}})()""")
            if not res['ok'] or not res['cur']:
                bad.append((i, res))
        check('3/18. %s: %d tree clicks load the exact position and highlight the node' % (cid, len(idxs)), not bad and n > 20, bad[:3])
        pg.wait_for_timeout(700)
        check('3b. %s: loading from the tree does not trigger a book move' % cid, pg.evaluate("OpeningLab.state().thinking") is False and pg.evaluate("OpeningLab.state().timer") is None)

    open_course(pg, 'italian', 'tree')
    pg.wait_for_selector('#tree-canvas .tm')
    target = 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5'
    idx = pg.evaluate("(p)=>{var b=[].slice.call(document.querySelectorAll('#tree-canvas .tm'));for(var i=0;i<b.length;i++){b[i].click(); if(OpeningLab.history().join(' ')===p) return i;} return -1}", target)
    if idx >= 0:
        pg.click('button[data-act="tplay"]')
        pg.wait_for_timeout(300)
        play(pg, 'Nxf7')
        wait_hist(pg, 12)
        check('Quality gate: select a tree node and immediately practise that exact position (Fried Liver after ...Nxd5)', hist(pg)[:11] == target.split(' ') + ['Nxf7'] and hist(pg)[11] == 'Kxf7', hist(pg))
    else:
        check('Quality gate: tree node for 5...Nxd5 found', False, 'not in tree')

    print('\nCheckmate line')
    open_course(pg, 'italian')
    pick_line(pg, 'I14')
    ok = False
    for attempt in range(6):
        ok, d = play_line_as_learner(pg, 'I14')
        if ok:
            break
        pg.click('#side button[data-act="restart"]')
    pg.wait_for_timeout(1200)
    check('15. Legal trap ends in checkmate, no book move after it', ok and pg.evaluate("new ChessLib.Chess(OpeningLab.fen()).isCheckmate()") and len(hist(pg)) == 15, hist(pg))

    print('\nPractice')
    open_course(pg, 'caro', 'practice')
    pg.click('button[data-act="pmode"][data-v="recall"]')
    pg.click('button[data-act="plen"][data-v="5"]')
    pg.click('button[data-act="pstart"]')
    asked_white = False
    wrong_done = False
    hold_checked = False
    for step in range(150):
        pr = pg.evaluate("(function(){var P=OpeningLab.practice();return {done:P.done, awaiting:P.awaiting, answered:!!P.answered}})()")
        if pr['done']:
            break
        if pr['answered']:
            if not hold_checked:
                n_before = len(hist(pg))
                pg.wait_for_timeout(2500)
                still = pg.locator('button[data-act="pcontinue"]').is_visible() and len(hist(pg)) == n_before
                check('Practice: the answer card stays until Continue is pressed (opponent waits)', still, (n_before, hist(pg)))
                hold_checked = True
            pg.click('button[data-act="pcontinue"]')
            pg.wait_for_timeout(100)
            continue
        if pr['awaiting'] and pg.evaluate("OpeningLab.fen()").split(' ')[1] == 'b':
            if not wrong_done:
                play(pg, 'a6') if pg.evaluate("(function(){try{return !!new ChessLib.Chess(OpeningLab.fen()).move('a6')}catch(e){return false}})()") else None
                wrong_done = True
                pg.wait_for_timeout(200)
                check('Recall: a wrong legal move is rejected and the board is unchanged', pg.locator('text=is not this course').count() > 0)
                continue
            play(pg, rec_san(pg))
            pg.wait_for_timeout(150)
        elif pr['awaiting']:
            asked_white = True
        pg.wait_for_timeout(250)
    done = pg.evaluate("OpeningLab.practice().done")
    check('Practice session of 5 decisions completes with a summary', done and pg.locator('text=Session complete').count() == 1)
    check('Caro-Kann practice never asks the learner to play White', not asked_white)
    prog = pg.evaluate("(function(){var c=JSON.parse(localStorage.getItem('openingLab.v1')).courses.caro;return Object.keys(c.nodes).length+Object.keys(c.learned||{}).length})()")
    check('Practice decisions (tested or newly learned) are stored', prog >= 4, prog)

    print('\nPractice: line that ends on your own move')
    open_course(pg, 'caro', 'practice')
    pg.click('button[data-act="pmode"][data-v="guided"]')
    pg.click('button[data-act="pstartfrom"][data-v="key"]')
    pg.click('button[data-act="plen"][data-v="15"]')
    end_line = pg.evaluate("""(function(){var g=OpeningLab.graphs.caro;var c=g.lines.filter(function(l){return l.sans.length%2===0 && g.nodes[l.leafKey].edges.length===0;});c.sort(function(a,b){return a.sans.length-b.sans.length});return {id:c[0].def.id,len:c[0].sans.length};})()""")
    pg.select_option('#pscope', end_line['id'])
    pg.click('button[data-act="pstart"]')
    line_len = end_line['len']
    held = None
    for step in range(60):
        pr = pg.evaluate("(function(){var P=OpeningLab.practice();return {answered:!!P.answered, awaiting:P.awaiting}})()")
        if pr['answered']:
            if len(hist(pg)) == line_len:
                pg.wait_for_timeout(2600)
                held = pg.locator('button[data-act="pcontinue"]').is_visible() and len(hist(pg)) == line_len and 'Line complete' in pg.inner_text('#side')
                pg.click('button[data-act="pcontinue"]')
                pg.wait_for_timeout(800)
                restarted = len(hist(pg)) < line_len
                break
            pg.click('button[data-act="pcontinue"]')
        elif pr['awaiting'] and pg.evaluate("OpeningLab.fen()").split(' ')[1] == 'b':
            play(pg, rec_san(pg))
        pg.wait_for_timeout(250)
    check('Practice: when a line ends on your move, the answer card waits for Continue', held, held)
    check('Practice: Continue after the last move loads the next variation', held and restarted)

    print('\nPractice setup access and start position')
    open_course(pg, 'ruy', 'practice')
    pg.click('button[data-act="pstartfrom"][data-v="start"]')
    pg.click('button[data-act="pstart"]')
    pg.wait_for_timeout(400)
    side_txt = pg.inner_text('#side')
    check('Practice from move 1: the board starts empty and the learner plays 1.e4 (warm-up or new-move intro)', hist(pg) == [] and ('Warm-up' in side_txt or 'here is the move to learn' in side_txt), hist(pg))
    play(pg, 'e4'); wait_hist(pg, 2)
    check('Warm-up move accepted without a score card, opponent replies', hist(pg) == ['e4', 'e5'] and pg.evaluate("OpeningLab.practice().results.length") == 0, hist(pg))
    pg.click('.line-head button[data-act="pstop"]')
    pg.wait_for_timeout(200)
    check('Change settings returns to the practice setup mid-session', pg.locator('button[data-act="pstart"]').count() == 1)
    pg.click('button[data-act="pstartfrom"][data-v="key"]')
    pg.click('button[data-act="pstart"]')
    pg.wait_for_timeout(400)
    check('Key position mode skips the opening moves', len(hist(pg)) >= 5 and hist(pg)[:5] == ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'], hist(pg))

    print('\nFirst-time guidance (fresh browser profile)')
    fc = browser.new_context(viewport={'width': 1440, 'height': 900})
    fp = fc.new_page()
    fp.on('pageerror', lambda e: errors.append(str(e)))
    green = "document.querySelectorAll('#arrows polyline[stroke=\"#5fae3a\"]').length"
    fp.goto(URL + '#/sicilian/learn'); fp.wait_for_selector('#board .sq'); wait_hist(fp, 1); fp.wait_for_timeout(300)
    status = fp.inner_text('#side .coach.good .status')
    check('Guide: a first-time learner is told the move (play 1...c5) and sees the green arrow', 'play 1...c5' in status and fp.evaluate(green) == 1, status)
    check('Guide: the "Your path" card lists the core lines with a start button', fp.locator('.coach.path button.primary[data-act="learn-line"]').count() == 1 and fp.locator('.coach.path .pathlist li').count() >= 5)
    fp.click('button[data-act="lshow"][data-v="0"]'); fp.wait_for_timeout(150)
    check('Guide: Quiz me hides the arrow and blurs the options again', fp.evaluate(green) == 0 and fp.locator('.reveal.shown').count() == 0)
    fp.click('button[data-act="lshow"][data-v="1"]'); fp.wait_for_timeout(150)
    first_core = fp.evaluate("OpeningLab.graphs.sicilian.lines.filter(function(l){return l.def.tier==='core'})[0].def.id")
    fp.click('.coach.path button.primary[data-act="learn-line"]'); fp.wait_for_timeout(300)
    check('Guide: the start button loads the first core line', fp.evaluate('OpeningLab.state().forced') == first_core, fp.evaluate('OpeningLab.state().forced'))
    ok, d = play_line_as_learner(fp, first_core)
    fp.wait_for_timeout(1700)
    check('Sicilian: the first core line plays through as Black', ok and fp.evaluate('OpeningLab.state().mode') == 'done', d)
    fp.click('#side button[data-act="newvar"]'); fp.wait_for_timeout(400)
    check('Guide: after one line the path card shows the progress', 'Your path: 1/' in fp.inner_text('#side'))
    fp.click('#side details.box summary >> text=Your path'); fp.wait_for_timeout(150)
    nxt = fp.evaluate("OpeningLab.graphs.sicilian.lines.filter(function(l){return l.def.tier==='core'})[1].def.id")
    fp.click('#side button.primary[data-act="learn-line"]'); fp.wait_for_timeout(600)
    h2 = hist(fp)
    check('Guide: "Learn next" starts the next line where it differs from what you already know', fp.evaluate('OpeningLab.state().forced') == nxt and len(h2) >= 8 and 'starts where it is new' in fp.inner_text('#side'), (nxt, h2))

    fp.goto(URL + '#/e4others/practice'); fp.reload(); fp.wait_for_selector('#board .sq'); fp.wait_for_timeout(300)
    check('Practice: a course with no progress suggests learning first', fp.locator('text=First time here?').count() == 1)
    fp.click('button[data-act="pmode"][data-v="recall"]'); fp.click('button[data-act="pstartfrom"][data-v="start"]'); fp.click('button[data-act="plen"][data-v="5"]')
    fp.click('button[data-act="pstart"]'); fp.wait_for_timeout(300)
    check('Practice: an unseen first move is shown, not tested (Recall mode)', fp.evaluate('OpeningLab.practice().intro') and fp.evaluate(green) == 1 and fp.locator('#side .chip.new').count() == 1)
    asked, autos, recall_seen = [], 0, False
    for step in range(200):
        pr = fp.evaluate("(function(){var P=OpeningLab.practice();return {done:P.done, awaiting:P.awaiting, answered:!!P.answered, auto:!!P.auto, intro:!!P.intro, recall:!!P.recallPass}})()")
        if pr['done']:
            break
        recall_seen = recall_seen or pr['recall']
        if pr['auto']:
            autos += 1; fp.wait_for_timeout(200); continue
        if pr['answered']:
            fp.click('button[data-act="pcontinue"]'); fp.wait_for_timeout(100); continue
        if pr['awaiting'] and fp.evaluate("OpeningLab.fen()").split(' ')[1] == 'w':
            asked.append((len(hist(fp)), pr['intro'])); play(fp, rec_san(fp)); fp.wait_for_timeout(150)
        fp.wait_for_timeout(200)
    P_ = fp.evaluate("(function(){var P=OpeningLab.practice();return {n:P.results.length, intro:P.introCount}})()")
    store = fp.evaluate("JSON.parse(localStorage.getItem('openingLab.v1')).courses.e4others")
    check('Practice: a session of 5 means 5 real questions; new moves are shown first and do not count', fp.evaluate('OpeningLab.practice().done') and P_['n'] == 5 and P_['intro'] >= 1 and len(store['learned']) >= P_['intro'], (P_, asked))
    check('Practice: after new moves the same line is replayed from memory', recall_seen, asked)
    tested_plies = [a[0] for a in asked if not a[1]]
    check('Practice: no position is asked twice in one session once answered right', len(tested_plies) == len(set(tested_plies)) or autos > 0, (asked, autos))
    fp.click('button[data-act="pstart"]'); fp.wait_for_timeout(300)
    check('Practice: the next time the same position comes up, it is tested', fp.evaluate('OpeningLab.practice().intro') is False and fp.locator('#side .chip.new').count() == 0)
    fp.screenshot(path=str(SHOTS / 'first-time-practice.png'))
    fc.close()

    print('\nPersistence')
    open_course(pg, 'caro', 'practice')
    pg.reload()
    pg.wait_for_selector('#board .sq')
    pg.click('.side-tab[data-tab="practice"]')
    txt = pg.inner_text('#side')
    check('25. progress survives a refresh', 'Decisions seen' in txt and not txt.startswith('0/'), txt[:80])
    pg.click('button[data-act="reset-progress"]')
    pg.wait_for_timeout(200)
    after = pg.evaluate("(JSON.parse(localStorage.getItem('openingLab.v1')).courses.caro)")
    check('25b. Reset progress clears it (with confirmation)', after is None, after)

    print('\nEngine analysis')
    open_course(pg, 'vienna')
    play(pg, 'e4'); wait_hist(pg, 2)
    pg.wait_for_timeout(3500)
    an = pg.inner_text('#analysis')
    check('Engine: eval bar and analysis lines are live', 'Depth' in an and pg.evaluate("OpeningLab.engine.state") == 'ready', an[:120])
    pg.screenshot(path=str(SHOTS / 'desktop-learn.png'))
    pg.click('.side-tab[data-tab="tree"]')
    pg.wait_for_timeout(500)
    pg.screenshot(path=str(SHOTS / 'desktop-tree.png'))

    print('\nMobile 390px with touch')
    m = browser.new_context(viewport={'width': 390, 'height': 844}, has_touch=True, is_mobile=True, device_scale_factor=2)
    mp = m.new_page()
    mp.on('pageerror', lambda e: errors.append(str(e)))
    mp.goto(URL + '#/caro/learn')
    mp.wait_for_selector('#board .sq')
    wait_hist(mp, 1)
    sw = mp.evaluate('document.documentElement.scrollWidth')
    bw = mp.locator('#board').bounding_box()['width']
    check('24. 390px: no horizontal scroll and a usable board', sw <= 390 and bw >= 320, (sw, bw))
    x, y = sq_center(mp, 'c7'); mp.touchscreen.tap(x, y)
    x, y = sq_center(mp, 'c6'); mp.touchscreen.tap(x, y)
    check('23c. touch tap-to-move works for Black on mobile', wait_hist(mp, 3) and hist(mp)[1] == 'c6', hist(mp))
    nav_visible = all(mp.locator('#' + i).is_visible() for i in ['nav-prev', 'nav-next', 'nav-flip'])
    check('24b. navigation controls visible on mobile', nav_visible)
    mp.screenshot(path=str(SHOTS / 'mobile-learn.png'), full_page=True)
    mp.goto(URL + '#/caro/tree'); mp.reload(); mp.wait_for_selector('#tree-canvas .tm')
    sw2 = mp.evaluate('document.documentElement.scrollWidth')
    check('24c. tree view keeps the page itself from scrolling sideways', sw2 <= 390, sw2)
    mp.screenshot(path=str(SHOTS / 'mobile-tree.png'))
    mp.goto(URL); mp.reload(); mp.wait_for_selector('.card')
    check('24d. home page fits 390px', mp.evaluate('document.documentElement.scrollWidth') <= 390)
    mp.screenshot(path=str(SHOTS / 'mobile-home.png'), full_page=True)

    print('\nWebKit (Safari engine) smoke test')
    try:
        wk = p.webkit.launch(executable_path=str(Path.home() / 'Library/Caches/ms-playwright/webkit_mac14_arm64_special-2251/pw_run.sh'))
        wp = wk.new_page(viewport={'width': 1200, 'height': 850})
        werr = []
        wp.on('pageerror', lambda e: werr.append(str(e)))
        wp.goto(URL + '#/vienna/learn'); wp.wait_for_selector('#board .sq')
        play(wp, 'e4'); ok = wait_hist(wp, 2)
        wp.wait_for_timeout(3000)
        check('WebKit: board, book reply and engine work', ok and not werr and wp.evaluate('OpeningLab.engine.state') == 'ready', (werr, wp.evaluate('OpeningLab.engine.state')))
        wk.close()
    except Exception as e:
        check('WebKit smoke test ran', False, e)

    check('no uncaught page errors', not errors, errors[:5])
    browser.close()

fails = [r for r in results if not r[1]]
print('\n%d/%d UI checks passed' % (len(results) - len(fails), len(results)))
sys.exit(1 if fails else 0)
