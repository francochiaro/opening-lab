import sys
from playwright.sync_api import sync_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/'
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'screenshots') + '/'
os.makedirs(OUT, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('console', lambda m: errs.append('console:' + m.text) if m.type == 'error' else None)
    pg.goto(URL)
    pg.wait_for_timeout(800)
    pg.screenshot(path=OUT + 'home.png')
    pg.goto(URL + '#/vienna/learn')
    pg.wait_for_timeout(3500)
    pg.screenshot(path=OUT + 'vienna.png')
    print('engine', pg.evaluate('OpeningLab.engine.state'), pg.evaluate('OpeningLab.fen()'))
    print('errors', errs)
    b.close()
