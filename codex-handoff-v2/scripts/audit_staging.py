#!/usr/bin/env python3
"""Flag private/non-public content accidentally staged into Cloudflare static dist/.

Pre-release heuristic only. Retain and run existing V1 npm run audit as well.
"""
from pathlib import Path
import re, sys, json
ROOT=Path(__file__).resolve().parents[2]
DIST=(ROOT/'dist').resolve()
REQUIRED={'index.html','404.html','robots.txt','sitemap.xml','credits/index.html','destinations/kuala-lumpur/index.html','destinations/george-town/index.html','destinations/langkawi/index.html','destinations/sabah/index.html'}
DENY=re.compile(r'(^|/)(\.git|\.agents|node_modules|codex-handoff(?:-v2)?|output|AGENTS\.md|\.env(?:\..*)?|skills-lock\.json|wrangler\.(?:jsonc|toml)|package(?:-lock)?\.json|scripts|\.vercel|README[^/]*)($|/)', re.I)

def main():
    if not DIST.is_dir(): raise SystemExit('FAIL: missing dist; run npm run build first')
    paths={p.relative_to(DIST).as_posix() for p in DIST.rglob('*') if p.is_file()}
    problems=[]
    for rel in sorted(paths):
        if DENY.search(rel): problems.append('private/unsafe staged: '+rel)
        p=DIST/rel
        if p.is_symlink() and not p.resolve().is_relative_to(DIST):problems.append('symlink outside dist: '+rel)
    for rel in sorted(REQUIRED-paths): problems.append('missing route/asset: '+rel)
    print(json.dumps({'status':'FAIL' if problems else 'PASS','file_count':len(paths),'issues':problems,'caveat':'Heuristic safety scan, run existing static audit and manual release review too.'},indent=2))
    return 1 if problems else 0

if __name__=='__main__':sys.exit(main())
