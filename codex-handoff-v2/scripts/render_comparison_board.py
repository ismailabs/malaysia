#!/usr/bin/env python3
"""Create an offline before/after screenshot board from *actual* local evidence files."""
from pathlib import Path
import sys, json, base64, html
ROOT=Path(__file__).resolve().parents[2]

def safe(value):
    p=(ROOT/value).resolve()
    if not p.is_relative_to(ROOT.resolve()) or not p.is_file(): raise ValueError('missing or unsafe screenshot: '+str(value))
    if p.suffix.lower() not in ('.png','.jpg','.jpeg','.webp'): raise ValueError('must be image: '+str(value))
    return p

def card(data,label):
    path=safe(data)
    mime={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'}[path.suffix.lower()]
    b64=base64.b64encode(path.read_bytes()).decode('ascii')
    return f'<figure><figcaption>{html.escape(label)} — {html.escape(data)}</figcaption><img loading="lazy" src="data:{mime};base64,{b64}" alt="{html.escape(label)}"></figure>'

def main():
    if len(sys.argv)!=3: raise SystemExit('usage: render_comparison_board.py output/v2/evidence.json output/v2/compare.html')
    evidence=safe_json(sys.argv[1]); output=(ROOT/sys.argv[2]).resolve()
    if not output.is_relative_to(ROOT.resolve()): raise SystemExit('Output path escapes repo')
    pairs=[('First fold · desktop','desktop'),('First fold · mobile','mobile'),('Destination gallery','gallery'),('Studio finale','studio')]
    rows=[]
    for title, key in pairs:
        rows.append(f'<h2>{html.escape(title)}</h2><section class="pair">'+card(evidence['baseline'][key],'V1 baseline')+card(evidence['final'][key],'V2 final')+'</section>')
    rows.append('<h2>Prototypes — competing directions</h2><section class="pair">'+card(evidence['prototypes']['a']['desktop'],'A · geographic')+card(evidence['prototypes']['b']['desktop'],'B · surreal')+'</section>')
    page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Malaysia V2 visual review</title><style>body{margin:0;background:#171b1a;color:#f4f4ef;font:16px/1.45 system-ui}main{max-width:1600px;margin:auto;padding:32px}h1{font-size:clamp(2rem,5vw,4rem)}h2{margin-top:50px}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}figure{margin:0;background:#262a29;padding:12px;border-radius:12px}figcaption{margin:0 0 10px;color:#ddd;overflow-wrap:anywhere}img{width:100%;height:auto;display:block;border-radius:6px}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style><main><h1>V1 → V2 · paired visual review</h1><p>Authentic files embedded locally. A visual difference alone is NOT proof of creative quality. Watch motion recordings separately and inspect accessibility tests.</p>'''+''.join(rows)+'</main></html>'
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(page,encoding='utf-8')
    print('Wrote offline review board:',output,'size',output.stat().st_size)

def safe_json(value):
    path=(ROOT/value).resolve()
    if not path.is_relative_to(ROOT.resolve()): raise SystemExit('Evidence path escapes repo')
    return json.loads(path.read_text('utf-8'))

if __name__=='__main__':main()
