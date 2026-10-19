#!/usr/bin/env python3
"""Verify every V2 handoff file from MANIFEST.json using SHA-256.

This checks ZIP/extraction integrity, not the website or Codex's work.
"""
from pathlib import Path
import hashlib, json, sys
ROOT=Path(__file__).resolve().parents[1]

def main():
    m=json.loads((ROOT/'MANIFEST.json').read_text('utf-8'))
    errors=[]
    for item in m['files']:
        rel=item['path']; p=(ROOT/rel).resolve()
        if not p.is_relative_to(ROOT.resolve()): errors.append('unsafe path '+rel); continue
        if not p.is_file(): errors.append('missing '+rel); continue
        d=p.read_bytes()
        if hashlib.sha256(d).hexdigest()!=item['sha256'] or len(d)!=item['bytes']:
            errors.append('changed '+rel)
    actual={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.name!='MANIFEST.json'}
    expected={x['path'] for x in m['files']}
    for x in sorted(expected-actual): errors.append('not found '+x)
    for x in sorted(actual-expected): errors.append('unexpected/unmanifested '+x)
    print(json.dumps({'status':'PASS' if not errors else 'FAIL','verified':len(m['files']),'errors':errors,'note':'Integrity of handoff inputs only; production build not performed.'},indent=2))
    return 1 if errors else 0

if __name__=='__main__':sys.exit(main())
