#!/usr/bin/env python3
"""Verify presence/integrity of V2 evidence, NOT artistic quality or test truth.

Usage from repo root: py codex-handoff-v2/scripts/check_visual_gate.py output/v2/evidence.json
"""
from pathlib import Path
import json, argparse, hashlib, sys, re

ROOT = Path(__file__).resolve().parents[2]
IMG = {'.png', '.jpg', '.jpeg', '.webp'}
VID = {'.mp4', '.webm'}
MIN_IMAGE_BYTES = 8000
MIN_VIDEO_BYTES = 10000

def safely_resolve(value):
    if not isinstance(value, str) or not value or value.startswith(('http:', 'https:')):
        raise ValueError('must be an existing relative local file path')
    dest = (ROOT / value).resolve()
    if not dest.is_relative_to(ROOT.resolve()):
        raise ValueError('escapes repository')
    if not dest.is_file():
        raise FileNotFoundError(value)
    return dest

def verify_image(path):
    data = path.read_bytes()
    if len(data) < MIN_IMAGE_BYTES: raise ValueError('image suspiciously small (<8KB)')
    valid = data[:8] == b'\x89PNG\r\n\x1a\n' or data[:3] == b'\xff\xd8\xff' or (data[:4] == b'RIFF' and data[8:12] == b'WEBP')
    if path.suffix.lower() not in IMG or not valid: raise ValueError('invalid screenshot format/magic')
    return hashlib.sha256(data).hexdigest()

def verify_video(path):
    data = path.read_bytes()
    if len(data) < MIN_VIDEO_BYTES: raise ValueError('motion evidence suspiciously small (<10KB)')
    valid = data[:4] == b'\x1aE\xdf\xa3' or (len(data)>12 and data[4:8]==b'ftyp')
    if path.suffix.lower() not in VID or not valid: raise ValueError('invalid video format/magic')
    return hashlib.sha256(data).hexdigest()

def get(nested, *keys):
    for key in keys: nested = nested[key]
    return nested

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('evidence', help='Path of actual completed evidence JSON relative to repo root')
    args = parser.parse_args()
    errors, ok, hashes = [], [], {}
    try:
        manifest = json.loads(safely_resolve(args.evidence).read_text('utf-8'))
    except Exception as e:
        raise SystemExit(f'FAIL: evidence JSON not readable: {e}')
    if manifest.get('state') != 'VERIFIED': errors.append('state must be VERIFIED after actual tests')
    if manifest.get('winner') not in ('a','b'): errors.append('winner must be a or b')
    for field in ('repo_baseline_commit','repo_v2_commit'):
        if not re.fullmatch(r'[0-9a-f]{40}', str(manifest.get(field,''))): errors.append(field+' missing 40-char Git SHA')
    if manifest.get('repo_baseline_commit') == manifest.get('repo_v2_commit'): errors.append('baseline and V2 commit are identical')
    specs = [
      (('prototypes','a','entry'),'html'), (('prototypes','b','entry'),'html'),
      (('prototypes','a','desktop'),'image'), (('prototypes','a','mobile'),'image'), (('prototypes','a','motion'),'video'),
      (('prototypes','b','desktop'),'image'), (('prototypes','b','mobile'),'image'), (('prototypes','b','motion'),'video'),
      (('baseline','desktop'),'image'), (('baseline','mobile'),'image'), (('baseline','gallery'),'image'), (('baseline','studio'),'image'),
      (('final','desktop'),'image'), (('final','mobile'),'image'), (('final','gallery'),'image'), (('final','studio'),'image'),
      (('final','map_middle'),'image'), (('final','gallery_motion'),'video'), (('final','studio_motion'),'video'),
      (('final','reduced_mobile'),'image'),
    ]
    for slug in ('kuala-lumpur','george-town','langkawi','sabah'):
        specs.append((('final','destinations',slug),'image'))
    for k in ('prototype_decision','visual_review','refinement_rounds','browser_tests','seo_tests','asset_register'):
        specs.append((('reports',k),'report'))
    for fields,kind in specs:
        label='.'.join(fields)
        try:
            value=get(manifest,*fields); f=safely_resolve(value)
            if kind=='image': h=verify_image(f); hashes[label]=h
            elif kind=='video': h=verify_video(f); hashes[label]=h
            elif kind=='html':
                contents=f.read_text('utf-8')
                if f.suffix.lower()!='.html' or len(contents)<1000 or '<html' not in contents.lower():
                    raise ValueError('not a substantive runnable HTML prototype entry')
            elif kind=='report':
                if f.stat().st_size<120: raise ValueError('report too small (<120 bytes)')
                if f.suffix.lower()=='.json': json.loads(f.read_text('utf-8'))
            ok.append(label)
        except Exception as e: errors.append(f'{label}: {e}')
    for a,b in [('baseline.desktop','final.desktop'),('baseline.mobile','final.mobile'),('baseline.gallery','final.gallery'),('baseline.studio','final.studio'),('prototypes.a.desktop','prototypes.b.desktop'),('prototypes.a.mobile','prototypes.b.mobile')]:
        if a in hashes and b in hashes and hashes[a]==hashes[b]: errors.append(f'{a} and {b} identical binary (no visual change)')
    print(json.dumps({'status':'FAIL' if errors else 'EVIDENCE-FILES-FOUND','checked':len(ok),'issues':errors,'note':'File verification does NOT judge artistic quality, animation behavior, legal rights, audit truth or production readiness.'},indent=2))
    return 1 if errors else 0

if __name__=='__main__': sys.exit(main())
