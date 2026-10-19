#!/usr/bin/env python3
"""Validate the extracted handoff inventory and relative paths; no network required."""
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
PACK = ROOT / 'codex-handoff'
MANIFEST = PACK / 'MANIFEST.json'


def main():
    if not (ROOT / 'AGENTS.md').is_file():
        print('ERROR: root AGENTS.md missing (extract package at project root).')
        return 1
    if not MANIFEST.is_file():
        print('ERROR: codex-handoff/MANIFEST.json missing.')
        return 1
    m = json.loads(MANIFEST.read_text(encoding='utf-8'))
    missing = []
    for rel in m.get('required_files', []):
        target = ROOT / rel
        if not target.is_file():
            missing.append(rel)
        elif not target.resolve().is_relative_to(ROOT.resolve()):
            missing.append(f'Symlink escapes project root: {rel}')
    if missing:
        for item in missing:
            print('FAIL:', item)
        return 1
    print(f"PASS: {len(m['required_files'])} required files present in project root.")
    print('Mission:', m.get('project'), '=>', m.get('production_url'))
    print('No website code or deployment action is performed by this checker.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
