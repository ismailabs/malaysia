#!/usr/bin/env python3
"""Read-only production URL and optional legacy redirect checks using Python stdlib.

No DNS changes, no credentials, no deploy. Checks external live URLs only; network is required.
"""
import argparse
from html.parser import HTMLParser
import json
import ssl
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, build_opener, HTTPSHandler, HTTPRedirectHandler

ROUTES = ['/', '/destinations/kuala-lumpur/', '/destinations/george-town/',
          '/destinations/langkawi/', '/destinations/sabah/', '/robots.txt', '/sitemap.xml']


class NoFollow(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''
        self.in_title = False
        self.canonical = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title':
            self.in_title = True
        if tag == 'link' and 'canonical' in a.get('rel', '').lower().split():
            self.canonical.append(a.get('href', ''))

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def fetch(url, follow=True):
    handlers = [HTTPSHandler(context=ssl.create_default_context())]
    if not follow:
        handlers.append(NoFollow())
    opener = build_opener(*handlers)
    req = Request(url, headers={'User-Agent': 'MalaysiaHandoffSmoke/1.0', 'Accept': 'text/html,application/xml,*/*'})
    try:
        with opener.open(req, timeout=20) as response:
            return response.status, dict(response.headers.items()), response.read(2_000_000), response.geturl()
    except HTTPError as error:
        return error.code, dict(error.headers.items()), error.read(20000), url


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--production', default='https://malaysia.ismailstudio.my/')
    p.add_argument('--legacy', help='Old Vercel root to check for a permanent redirect')
    p.add_argument('--json', action='store_true')
    args = p.parse_args()
    prod = args.production.rstrip('/') + '/'
    if urlsplit(prod).scheme != 'https' or not urlsplit(prod).hostname:
        sys.exit('ERROR: --production must be an HTTPS origin')
    errors = []
    result = {'production': prod, 'pages': [], 'legacy': None, 'passed': False}
    for route in ROUTES:
        url = urljoin(prod, route.lstrip('/'))
        try:
            status, headers, body, final_url = fetch(url)
            item = {'path': route, 'status': status, 'url': final_url}
            if status != 200:
                errors.append(f'{route} returned HTTP {status}, expected 200')
            if route in ROUTES[:5] and status == 200:
                page = Head()
                page.feed(body.decode('utf-8', 'replace'))
                item['title'] = page.title.strip()
                item['canonical'] = page.canonical
                expected = url
                if not page.title.strip():
                    errors.append(f'{route}: missing title')
                if len(page.canonical) != 1 or page.canonical[0] != expected:
                    errors.append(f'{route}: incorrect canonical {page.canonical!r}, expected {expected}')
            result['pages'].append(item)
        except (URLError, TimeoutError, OSError) as error:
            errors.append(f'{route}: network/TLS failure {error}')
            result['pages'].append({'path': route, 'error': str(error)})
    missing_url = urljoin(prod, '__not-a-real-malaysia-page__')
    try:
        status, _, _, _ = fetch(missing_url)
        result['unknown_path_status'] = status
        if status != 404:
            errors.append(f'Missing page returned {status}, expected 404')
    except (URLError, TimeoutError, OSError) as error:
        errors.append(f'404 check failed: {error}')
    if args.legacy:
        legacy = args.legacy.rstrip('/') + '/'
        if urlsplit(legacy).scheme != 'https':
            errors.append('Legacy URL must be HTTPS')
        else:
            try:
                status, headers, _, _ = fetch(legacy, follow=False)
                location = headers.get('Location', headers.get('location', ''))
                result['legacy'] = {'status': status, 'location': location}
                if status not in (301, 308):
                    errors.append(f'Legacy root returned {status}, expected permanent 301/308')
                if not location.startswith(prod):
                    errors.append(f'Legacy root redirect target mismatch: {location}')
            except (URLError, TimeoutError, OSError) as error:
                errors.append(f'Legacy redirect network failure: {error}')
    result['errors'] = errors
    result['passed'] = not errors
    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        for item in result['pages']:
            print(f"{item['path']}: {item.get('status', 'ERROR')} {item.get('url', item.get('error', ''))}")
        print('Missing-page status:', result.get('unknown_path_status', 'ERROR'))
        if result['legacy']:
            print('Legacy:', result['legacy'])
        for err in errors:
            print('FAIL:', err)
        print('PASS' if not errors else 'FAIL', '- HTTP/TLS/metadata smoke check only; browser QA remains required.')
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
