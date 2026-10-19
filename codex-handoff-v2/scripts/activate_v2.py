#!/usr/bin/env python3
"""Safely append scoped V2 precedence instructions to existing root AGENTS.md.

Can undo the marked section without replacing user-authored content.
Backups are local under output/v2/backups; no network or external account action.
"""
from pathlib import Path
import argparse
import datetime as dt
import os
import tempfile

ROOT = Path(__file__).resolve().parents[2]
TARGET = ROOT / 'AGENTS.md'
START = '<!-- MALAYSIA-BETWEEN-PLACES-V2-BEGIN -->'
END = '<!-- MALAYSIA-BETWEEN-PLACES-V2-END -->'
BLOCK = '''
<!-- MALAYSIA-BETWEEN-PLACES-V2-BEGIN -->
## V2 approved instruction overlay — activated by owner
For the CURRENT Malaysia — Between Places V2 redesign, read and follow
`codex-handoff-v2/START-HERE.md` and `codex-handoff-v2/CODEX-EXECUTE.md`
before starting implementation. The V2 documents supersede older V1 CREATIVE
DIRECTION and V1 DEFINITION-OF-DONE for this V2 iteration; preserve V1's
security, content truth, SEO, accessibility, no-spend, hosting, recoverability,
and other unaffected protections. The task requires TWO working browser
prototypes, a documented choice, three imaginative V2 signature scenes,
four uniquely art-directed destination intros, and objective before/after
visual evidence. Do not declare success for re-styled V1 or untested code.
Prioritize clear instructions in V2 documents in case of same-level conflicts,
but still follow platform safety, user scope, permissions and authentication.
The V2 package contains no code implementation or pre-verified release.
<!-- MALAYSIA-BETWEEN-PLACES-V2-END -->
'''

def atomic_write(path, content):
    fd, name = tempfile.mkstemp(prefix='.v2-agents-', suffix='.tmp', dir=path.parent)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8', newline='\n') as file:
            file.write(content)
        os.replace(name, path)
    finally:
        if os.path.exists(name):
            os.unlink(name)

def backup(content):
    folder = ROOT / 'output' / 'v2' / 'backups'
    folder.mkdir(parents=True, exist_ok=True)
    suffix = dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    path = folder / f'AGENTS-before-v2-{suffix}.md'
    version = 1
    while path.exists():
        path = folder / f'AGENTS-before-v2-{suffix}-{version}.md'
        version += 1
    path.write_text(content, encoding='utf-8')
    return path

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--undo', action='store_true', help='Remove only the marked V2 block; keep all other content')
    parser.add_argument('--dry-run', action='store_true', help='Inspect without changes')
    args = parser.parse_args()
    before = TARGET.read_text(encoding='utf-8') if TARGET.exists() else ''
    start, end = before.find(START), before.find(END)
    if (start < 0) != (end < 0):
        raise SystemExit('ABORT: Partial V2 marker found; review AGENTS.md manually before proceeding.')
    if args.undo:
        if start < 0:
            print('Nothing to undo.'); return
        if end <= start or before.count(START) != 1 or before.count(END) != 1:
            raise SystemExit('ABORT: Ambiguous markers. No changes made.')
        after = before[:start].rstrip() + '\n' + before[end+len(END):].lstrip('\n')
        action = 'REMOVE marked V2 section'
    elif start >= 0:
        print('Already activated; no change.'); return
    else:
        after = before.rstrip() + '\n\n' + BLOCK.strip() + '\n'
        action = 'APPEND new V2 section'
    print(f'{action}: {TARGET}')
    if args.dry_run:
        print('DRY RUN; no changes made.'); return
    snapshot = backup(before)
    atomic_write(TARGET, after)
    print(f'Saved prior root instructions at {snapshot.relative_to(ROOT)}')
    print('Activated. Open a NEW Codex Desktop session so it reads the updated instructions.')

if __name__ == '__main__':
    main()
