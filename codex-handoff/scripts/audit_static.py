#!/usr/bin/env python3
"""Offline static HTML/SEO/asset audit. Complements, but cannot replace, browser tests."""
import argparse
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

BASE = 'https://malaysia.ismailstudio.my'
DEFAULT_ROUTES = ['/', '/destinations/kuala-lumpur/', '/destinations/george-town/',
                  '/destinations/langkawi/', '/destinations/sabah/']
SKIP_SCHEMES = ('mailto:', 'tel:', 'data:', 'javascript:', '#')


class Inspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.in_title = False
        self.h1_count = 0
        self.canonical = []
        self.description = []
        self.lang = ''
        self.hrefs = []
        self.refs = []
        self.has_main = False
        self.has_studio_link = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html':
            self.lang = a.get('lang') or ''
        if tag == 'main':
            self.has_main = True
        if tag == 'title':
            self.in_title = True
        if tag == 'h1':
            self.h1_count += 1
        if tag == 'meta' and a.get('name', '').lower() == 'description':
            self.description.append(a.get('content', ''))
        if tag == 'link' and 'canonical' in a.get('rel', '').lower().split():
            self.canonical.append(a.get('href', ''))
        if tag == 'a':
            href = a.get('href', '')
            self.hrefs.append(href)
            if urlsplit(href).hostname in ('ismailstudio.my', 'www.ismailstudio.my'):
                self.has_studio_link = True
        for key in ('src',):
            if a.get(key):
                self.refs.append(a[key])
        if a.get('srcset'):
            self.refs.extend(part.strip().split()[0] for part in a['srcset'].split(',') if part.strip())
        if tag == 'link' and a.get('href'):
            self.refs.append(a['href'])

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def resolve(root, document, ref):
    if not ref or ref.startswith(SKIP_SCHEMES) or ref.startswith('//'):
        return None
    info = urlsplit(ref)
    if info.scheme or info.netloc:
        return None
    path = unquote(info.path)
    if not path:
        return None
    if path.startswith('/'):
        target = root / path.lstrip('/')
    else:
        target = document.parent / path
    target = target.resolve()
    if not target.is_relative_to(root.resolve()):
        return f'ESCAPE: {ref}'
    if target.is_dir():
        target = target / 'index.html'
    elif not target.exists() and not target.suffix:
        target = target / 'index.html'
    return target


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--root', default='dist')
    p.add_argument('--origin', default=BASE)
    p.add_argument('--require-all-routes', action=argparse.BooleanOptionalAction, default=True)
    args = p.parse_args()
    repo = Path(__file__).resolve().parents[2]
    root = (repo / args.root).resolve()
    issues = []
    if not root.is_dir():
        sys.exit('ERROR: build artifact not found; run build_static.py first')
    expected = DEFAULT_ROUTES if args.require_all_routes else ['/']
    for route in expected:
        target = root / route.lstrip('/') / 'index.html' if route != '/' else root / 'index.html'
        if not target.exists():
            issues.append(f'Missing required route {route}: {target.relative_to(root)}')
    files = list(root.rglob('*.html'))
    titles = Counter()
    canonicals = Counter()
    links_checked = 0
    for file in files:
        rel = file.relative_to(root).as_posix()
        if file.name == '404.html':
            continue
        inspector = Inspector()
        inspector.feed(file.read_text(encoding='utf-8'))
        if not inspector.title.strip():
            issues.append(f'{rel}: missing title')
        titles[inspector.title.strip()] += 1
        if inspector.h1_count != 1:
            issues.append(f'{rel}: expected one H1, found {inspector.h1_count}')
        if len(inspector.description) != 1 or not inspector.description[0].strip():
            issues.append(f'{rel}: requires exactly one useful meta description')
        if len(inspector.canonical) != 1:
            issues.append(f'{rel}: requires exactly one canonical link')
        else:
            c = inspector.canonical[0]
            canonicals[c] += 1
            if not c.startswith(args.origin.rstrip('/') + '/'):
                issues.append(f'{rel}: canonical not on target production origin: {c}')
        if not inspector.lang:
            issues.append(f'{rel}: missing html lang')
        if not inspector.has_main:
            issues.append(f'{rel}: missing main landmark')
        if not inspector.has_studio_link:
            issues.append(f'{rel}: missing Ismail Studio outbound link')
        for ref in inspector.hrefs + inspector.refs:
            dest = resolve(root, file, ref)
            if dest is None:
                continue
            if isinstance(dest, str):
                issues.append(f'{rel}: invalid path {dest}')
            elif not dest.is_file():
                issues.append(f'{rel}: broken local link/asset {ref}')
            links_checked += 1
    for t, count in titles.items():
        if t and count > 1:
            issues.append(f'Duplicate page title: {t!r} ({count} occurrences)')
    for c, count in canonicals.items():
        if c and count > 1:
            issues.append(f'Duplicate canonical URL: {c!r} ({count} occurrences)')
    if not (root / '404.html').is_file():
        issues.append('Missing real 404.html (needed with Workers 404-page configuration)')
    robots = root / 'robots.txt'
    sitemap = root / 'sitemap.xml'
    if not robots.is_file():
        issues.append('Missing robots.txt')
    elif args.origin.rstrip('/') not in robots.read_text(encoding='utf-8'):
        issues.append('robots.txt does not mention target production origin (typically Sitemap URL)')
    if not sitemap.is_file():
        issues.append('Missing sitemap.xml')
    else:
        try:
            parsed = ET.parse(sitemap)
            locs = [node.text or '' for node in parsed.findall('.//{*}loc')]
            for route in expected:
                uri = args.origin.rstrip('/') + route
                if uri not in locs:
                    issues.append(f'sitemap.xml missing exact canonical {uri}')
            if any(not loc.startswith(args.origin.rstrip('/') + '/') for loc in locs):
                issues.append('sitemap.xml has off-origin URLs')
        except ET.ParseError as exc:
            issues.append(f'Invalid sitemap XML: {exc}')
    for private in ('.agents', '.git', 'codex-handoff', 'skills-lock.json', 'wrangler.jsonc'):
        if (root / private).exists():
            issues.append(f'SECURITY: private source in public dist: {private}')
    print(f'Offline audit: {len(files)} HTML files; {links_checked} local references inspected; {len(issues)} issue(s).')
    for item in issues:
        print('FAIL:', item)
    if issues:
        print('This is a structural audit. Fix above issues and then run actual browser tests.')
        sys.exit(1)
    print('PASS: offline static invariants. Browser and live deployment verification still required.')


if __name__ == '__main__':
    main()
