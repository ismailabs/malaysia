#!/usr/bin/env python3
"""Build an explicitly allowlisted public static website into dist/ (stdlib only).

Executes no frontend code, does not generate pages, and does not rewrite URLs.
Adjust templates/public-allowlist.json only when adding a reviewed public route/asset.
Requires project root with index.html, css/, js/, assets/.
"""
import argparse
import json
import os
from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
ALLOWLIST = ROOT / 'scripts' / 'public-allowlist.json'
DENY_PATH_PARTS = {'.git', '.agents', '.vercel', '.taste-skill', '.env', 'codex-handoff',
                   'codex-handoff-v2', 'output', 'scripts', 'node_modules', 'dist', 'coverage', 'test-results', 'playwright-report',
                   '__pycache__', '.github', 'private', 'secrets'}


def fatal(message):
    raise RuntimeError(message)


def is_safe_path(p):
    if any(part.lower() in DENY_PATH_PARTS or part.startswith('.') for part in p.parts):
        return False
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--clean', action='store_true', help='Explicitly replace an existing dist/ directory after confirming it contains only generated artifacts')
    args = parser.parse_args()
    if not (ROOT / 'index.html').is_file():
        fatal(f'Missing {ROOT / "index.html"}; extract ZIP into project root first.')
    if not ALLOWLIST.is_file():
        fatal('Missing explicit public allowlist')
    policy = json.loads(ALLOWLIST.read_text(encoding='utf-8'))
    roots = policy['site_directories']
    rootfiles = policy['site_root_files']
    extensions = {x.lower() for x in policy['allowed_public_extensions']}
    if not all(isinstance(x, str) and x and not x.startswith('.') and '/' not in x and '\\' not in x for x in roots):
        fatal('Invalid directory allowlist')
    if not all(isinstance(x, str) and x and not x.startswith('.') and '/' not in x and '\\' not in x for x in rootfiles if not x.startswith('_')):
        fatal('Invalid root-file allowlist')
    out = ROOT / 'dist'
    if out.is_symlink():
        fatal('Refusing symlink build directory')
    resolved = out.resolve()
    if resolved.parent != ROOT.resolve() or out.name in ('.', '..', '.git', '.agents', 'codex-handoff'):
        fatal('Build output must be a single folder immediately under the repository root')
    if out.exists():
        if not out.is_dir():
            fatal('Output is not a directory')
        if any(out.iterdir()) and not args.clean:
            fatal('dist/ already contains files; review it and rerun with --clean to replace the generated artifact')
        shutil.rmtree(out)
    out.mkdir()
    copied = 0

    def copy_public(src, relative):
        nonlocal copied
        if relative.as_posix().startswith('assets/scenes/') or relative.as_posix() in {'assets/images/sources.json','js/motion.js','js/interactions.js'}:
            return
        if src.is_symlink():
            fatal(f'Refusing symlink public asset: {src}')
        if not is_safe_path(relative):
            fatal(f'Private file path in public selection: {relative}')
        if relative.suffix.lower() not in extensions and relative.name not in ('_headers', '_redirects'):
            fatal(f'Unsupported public file extension: {relative}')
        dst = out / relative
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        copied += 1

    for file in rootfiles:
        src = ROOT / file
        if src.is_symlink():
            fatal(f'Refusing symlink root asset: {src}')
        if src.is_file():
            copy_public(src, Path(file))

    for dirname in roots:
        top = ROOT / dirname
        if top.is_symlink():
            fatal(f'Refusing symlink public directory: {top}')
        if not top.exists():
            continue
        if not top.is_dir():
            fatal(f'Allowlisted directory is not a directory: {top}')
        for here, dirs, files in os.walk(top, followlinks=False):
            base = Path(here)
            kept = []
            for d in dirs:
                relative = (base / d).relative_to(ROOT)
                if (base / d).is_symlink():
                    fatal(f'Refusing symlink in public tree: {relative}')
                if is_safe_path(relative):
                    kept.append(d)
            dirs[:] = kept
            for name in files:
                src = base / name
                relative = src.relative_to(ROOT)
                if src.is_symlink():
                    fatal(f'Refusing symlink in public tree: {relative}')
                if not is_safe_path(relative):
                    continue
                if src.suffix.lower() in extensions:
                    copy_public(src, relative)
                else:
                    print(f'SKIPPED unsupported public extension: {relative}', file=sys.stderr)

    if not (out / 'index.html').is_file():
        fatal('Build artifact missing homepage')
    for private in ('.agents', '.git', 'codex-handoff', '.env', 'skills-lock.json', 'wrangler.jsonc'):
        if (out / private).exists():
            fatal(f'SECURITY FAILURE: {private} included in public artifact')
    print(f'Built {copied} public files to {out} using {ALLOWLIST.name}.')
    print('Next: run audit_static.py --root dist and inspect actual site in a browser.')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, OSError, ValueError, KeyError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(1)
