"""V2 scene markup; imported by the authoritative static document generator."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]

def map_art():
 svg=(ROOT/'assets/icons/malaysia-map.svg').read_text('utf-8')
 svg=svg.replace('role="img"','class="malaysia-shape" role="img"')
 # Geographic points use the exact same equirectangular transform as coastlines.
 pins=''
 for name,lon,lat in [('Langkawi',99.85,6.35),('George Town',100.3354,5.414),('Kuala Lumpur',101.6869,3.139),('Sabah / Kinabalu',116.55,6.08)]:
  x=(lon-98.8)*46+25;y=(7.6-lat)*46+20
  pins+=f'<g><title>{name}</title><circle cx="{x:.2f}" cy="{y:.2f}" r="6" class="geo-dot"/><circle cx="{x:.2f}" cy="{y:.2f}" r="14" class="geo-ring"/></g>'
 return svg.replace('</svg>',pins+'</svg>')

def home(img,studio,places):
 links=''.join(f'<a href="/destinations/{p["slug"]}/"><span>{p["name"]}</span><span aria-hidden="true">↗</span></a>' for p in places)
 worlds=''
 names=['The city<br>rises.','Through<br>the shutters.','At the<br>waterline.','A different<br>altitude.']
 for i,p in enumerate(places):
  worlds+=f'''<section class="world world-{p['slug']}" id="world-{p['slug']}" data-world="{p['slug']}" aria-labelledby="title-{p['slug']}"><div class="world-stage"><figure class="world-picture">{img(p['image'],'(max-width: 700px) 1500px, 100vw' if p['image']!='langkawi' else '100vw',False)}<figcaption>{p['name']} · {p['region']} · <a href="/credits/#{p['image']}">Photo credits</a></figcaption></figure><div class="world-architecture" aria-hidden="true"><i></i><i></i><i></i></div><div class="world-heading"><p>{p['name']}</p><h3 id="title-{p['slug']}">{names[i]}</h3></div><div class="world-note"><p>{p['preview']}</p><a class="button" href="/destinations/{p['slug']}/">Enter {p['name']} <span aria-hidden="true">↗</span></a></div></div></section>'''
 return f'''<section class="atlas" id="home" data-signature="map" aria-labelledby="hero-title"><div class="atlas-stage"><div class="atlas-world">{img('kinabalu','(max-width: 700px) 1800px, 100vw',True)}</div><div class="atlas-geography"><div class="map-art">{map_art()}</div><nav class="map-destinations" aria-label="Map destinations">{links}</nav><div class="map-regions"><span>Peninsular Malaysia</span><em>South China Sea</em><span>Malaysian Borneo</span></div></div><div class="atlas-title"><p>Two lands. A sea between.</p><h1 id="hero-title">MALAYSIA</h1></div><div class="atlas-bottom"><p>A journey between city, street,<br>island water and mountain air.<small class="atlas-credit">Mount Kinabalu, Sabah · EJ Yao</small></p><a class="text-link" href="#journey">Enter the journey <span aria-hidden="true">↓</span></a></div><a class="skip-opening" href="#places">Skip to places ↓</a></div></section>
 <section class="interlude section" id="journey"><span class="anchor-alias" id="prologue"></span><h2>Four ways<br>into Malaysia.</h2><div><p>A skyline. A shaded walkway. A limestone edge. A mountain on the other side of the sea.</p><p>Four photographic portraits, connected by curiosity. The movement is imagined. The places are real.</p><a class="text-link" href="/credits/">The people behind the photographs ↗</a></div></section>
 <section class="worlds" id="places" data-signature="gallery" aria-labelledby="worlds-title"><div class="worlds-intro section"><span class="anchor-alias" id="field-notes"></span><h2 id="worlds-title">Between<br><em>worlds.</em></h2><nav class="world-index" aria-label="Choose a destination">{links}</nav><p>Follow the scroll, or enter a portrait.</p></div>{worlds}</section>
 <section class="quiet section" id="borneo"><span id="coast" class="anchor-alias"></span><span id="streets" class="anchor-alias"></span><h2>The distance<br>matters.</h2><p>Sabah lies on northern Borneo, across the South China Sea from the peninsula. These scenes are an editorial passage, not a continuous route. Take each place on its own terms.</p><a href="/destinations/sabah/" class="text-link">Look closer at Sabah ↗</a></section>
 <section class="studio-finale" id="studio" data-signature="studio" aria-labelledby="studio-title"><span id="ending" class="anchor-alias"></span><span id="about" class="anchor-alias"></span><div class="studio-stage"><div class="craft-photos" aria-hidden="true">{''.join(f'<div class="craft-fragment craft-{i}">{img(p["image"],"25vw",False,"","")}</div>' for i,p in enumerate(places))}</div><div class="studio-name" aria-hidden="true"><span>ISMAIL</span><span>STUDIO.</span></div><div class="studio-intro"><p>Places become stories.<br>Stories become experiences.</p></div><div class="studio-action"><h2 id="studio-title">An Ismail Studio<br>experience.</h2><p>Independent web design and interactive storytelling. Follow the curiosity to the studio behind this journey.</p>{studio('Enter the studio','story','button')}<a class="text-link" href="#places">Another way through Malaysia ↑</a></div></div></section>'''

def destination_intro(p,img):
 slug=p['slug'];name=p['name']
 breadcrumb=f'<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Malaysia</a><span aria-hidden="true">/</span><span>{name}</span></nav>'
 info=f'<div class="act-info"><p>{p["region"]}</p><p>{p["intro"]}</p><a class="text-link" href="#portrait">Read the portrait ↓</a></div>'
 if slug=='kuala-lumpur':
  body=f'''<div class="city-skyline">{img('kuala-lumpur','100vw',True)}</div><div class="city-street">{img('petaling-street','(min-width: 800px) 35vw, 70vw',True)}</div><div class="city-grid" aria-hidden="true"></div><h1>Kuala<br>Lumpur</h1>{info}<button class="act-control" type="button" data-act="city" aria-pressed="false" hidden>Come down to street level ↕</button>'''
 elif slug=='george-town':
  body=f'''<div class="heritage-picture">{img('george-town','100vw',True)}</div><div class="heritage-shutters" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><h1>George<br><em>Town.</em></h1>{info}<button class="act-control" type="button" data-act="heritage" aria-pressed="false" hidden>Open the shutters ↔</button>'''
 elif slug=='langkawi':
  body=f'''<div class="tide-orbits" aria-hidden="true"><i></i><i></i><i></i></div><div class="tide-picture">{img('langkawi','(min-width: 800px) 60vw, 100vw',True)}</div><h1>Langkawi</h1><p class="tide-word" aria-hidden="true">Water holds the light.</p>{info}<label class="tide-control" hidden>Open the waterline <input type="range" min="0" max="100" value="35" aria-label="Open the Langkawi photographic waterline"></label>'''
 else:
  body=f'''<div class="mountain-picture">{img('kinabalu','(max-width: 700px) 1800px, 100vw',True)}</div><div class="forest-picture">{img('rainforest','100vw',False)}</div><div class="elevation-lines" aria-hidden="true"><i></i><i></i><i></i></div><h1>Sabah</h1><p class="sabah-subtitle">Across the sea.<br>Above the forest.</p>{info}<div class="elevation-control" role="group" aria-label="Choose a Sabah perspective" hidden><button type="button" data-elevation="mountain" aria-pressed="true">Mountain</button><button type="button" data-elevation="forest" aria-pressed="false">Forest stream</button></div>'''
 return breadcrumb+f'<section class="destination-act act-{slug}" data-act-scene="{slug}">{body}<a class="act-credit" href="/credits/">Photography & sources ↗</a></section>'
