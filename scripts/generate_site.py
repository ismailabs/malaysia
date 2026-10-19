"""Generate conventional static documents. Source-only; never shipped in dist/."""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://malaysia.ismailstudio.my'
DIM = {'kuala-lumpur': (2000,1344), 'george-town':(2000,1333), 'petaling-street':(2000,2000), 'nasi-lemak':(2000,1333), 'langkawi':(2000,3556), 'kinabalu':(2000,979), 'rainforest':(2000,1333)}
ALT = {
 'kuala-lumpur':'The illuminated Petronas Twin Towers and surrounding Kuala Lumpur skyline at dusk',
 'george-town':'A row of George Town shophouses with green shutters and sheltered walkways',
 'petaling-street':'A customer at a soya bean drinks stall on Petaling Street, Kuala Lumpur',
 'nasi-lemak':'Nasi lemak with sambal served on a banana leaf in George Town',
 'langkawi':'Forested limestone rising above the water at Kilim Geoforest Park, Langkawi',
 'kinabalu':'The granite ridgeline of Mount Kinabalu behind forested hills in Sabah',
 'rainforest':'A rocky forest stream at Mari Mari Cultural Village in Sabah',
}
PHOTOGRAPHERS = {'kuala-lumpur':'Esmonde Yong','george-town':'Eugene Lim','petaling-street':'Kamaruld Salleh','nasi-lemak':'You Le','langkawi':'Abdulrhman Alkhnaifer','kinabalu':'EJ Yao','rainforest':'You Le'}
PLACES = [
 {'slug':'kuala-lumpur','name':'Kuala Lumpur','image':'kuala-lumpur','region':'Peninsular Malaysia','tag':'City & street','intro':'A city read at two heights.','preview':'Glass and steel above; counters and conversations below. Follow the city from its skyline to Petaling Street.','description':'A photographic portrait of Kuala Lumpur, from the Petronas skyline to everyday details on Petaling Street. An independent Malaysian editorial by Ismail Studio.',
  'lead':'Look up for the skyline. Look closer for the city. Kuala Lumpur’s towers are a recognisable silhouette, but its changes of scale make the portrait: glass above, shopfronts and sheltered counters below.',
  'sections':[
    ('The skyline','kuala-lumpur','Kuala Lumpur at dusk. Photograph by Esmonde Yong.',[
      'The Petronas Twin Towers give Kuala Lumpur a clear point of recognition. In this photograph, the towers sit among a dense cluster of buildings, with the last light of the sky behind them. The view is expansive; the details are small.',
      'Keep that view in mind when you come down to street level. A city is made from both scales. The skyline describes its outline, while a shopfront, a shaded counter or a place to pause gives it a human measure.']),
    ('Petaling Street','petaling-street','A soya bean drinks stall on Petaling Street. Photograph by Kamaruld Salleh.',[
      'Petaling Street sits within Kuala Lumpur’s Chinatown. Tourism Malaysia describes an area shaped by change since the late nineteenth and early twentieth centuries. Today, its market setting offers another way into the city’s story.',
      'The photograph narrows the view to a single stall: containers at the counter, signs above, a customer waiting. These are the details that turn a location name into a scene. It is a different part of Kuala Lumpur from the KLCC skyline, rather than the next frame in a continuous walk.']),
    ('Read the city slowly',None,None,[
      'Use the contrast as a way of looking. Notice how the scale of a building changes the people around it; how a covered space creates a pause between the street and a shop. Leave room for those using the street as part of an ordinary working day.',
      'This portrait is an invitation to pay attention, rather than a ranked list of attractions. Ask before photographing a person closely, keep counters and entrances clear, and let the place carry on around you.'])],
  'visit':'For current visitor information and more places in the city, start with Tourism Malaysia. Conditions, access and individual businesses can change; this essay does not supply opening hours or bookings.',
  'sources':[('Tourism Malaysia: Kuala Lumpur','https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur'),('Tourism Malaysia: Petaling Street','https://www.malaysia.travel/explore/5-best-hotspots-in-petaling-street-you-don-t-want-to-miss')]},
 {'slug':'george-town','name':'George Town','image':'george-town','region':'Penang, Peninsular Malaysia','tag':'Heritage & everyday life','intro':'The street is still the story.','preview':'Shutters, five-foot ways and a parcel of rice. A living streetscape on the island of Penang.','description':'Explore George Town, Penang through shophouses, five-foot ways and everyday food. A sourced photographic essay about the city’s living heritage.',
  'lead':'Shutters, shaded walkways and a place to stop for food: George Town is a city best read close to the buildings. Its heritage belongs to the people using it as much as to the façades.',
  'sections':[
    ('A living streetscape','george-town','Shophouses in George Town, Penang. Photograph by Eugene Lim.',[
      'George Town is on Penang island, off the northwest coast of Peninsular Malaysia. Alongside Melaka, it forms the UNESCO World Heritage property “Melaka and George Town, Historic Cities of the Straits of Malacca”, inscribed in 2008.',
      'UNESCO’s account emphasises the exchanges of a trading port and a living multicultural heritage. That is a useful starting point for looking at the street: the buildings record history, but the life around them has not stopped.']),
    ('Under the five-foot way',None,None,[
      'In the shophouse photograph, repeating upper windows and a continuous street edge give the scene its rhythm. The sheltered walkway beneath the buildings is part of that streetscape. George Town World Heritage Incorporated identifies the five-foot way as a characteristic part of the city’s built environment.',
      'Look at the relationship between one building and the next: shutters, rooflines, the depth of a doorway. Keep the walkway open for people passing through. A useful photograph need not interrupt the activity that makes the place worth looking at.']),
    ('A parcel of the day','nasi-lemak','Nasi lemak at Ali Nasi Lemak Daun Pisang, George Town. Photograph by You Le.',[
      'A banana leaf, rice and sambal bring the view back to the table. The nasi lemak photograph was made at Ali Nasi Lemak Daun Pisang in George Town; it is one particular meal, not a claim to represent every kitchen in Penang.',
      'Food and buildings belong in the same portrait. One gives a street its outline, the other gives a reason to stop. Leave time in your looking for both, without turning an everyday place into a checklist.'])],
  'visit':'George Town World Heritage Incorporated offers local heritage information and resources. Use current official guidance when planning a visit, and respect the homes, places of worship and businesses within the heritage area.',
  'sources':[('UNESCO: Melaka and George Town','https://whc.unesco.org/en/list/1223/'),('George Town World Heritage Incorporated: street view','https://gtwhi.com.my/street-view/')]},
 {'slug':'langkawi','name':'Langkawi','image':'langkawi','region':'Kedah, Peninsular Malaysia','tag':'Limestone & tidal water','intro':'Follow the edge of the island.','preview':'At Kilim, forest and limestone meet tidal water. An island landscape that changes with the way you look.','description':'A photographic essay on Langkawi’s limestone, forest and tidal water, with Kilim and UNESCO Global Geopark context and official further reading.',
  'lead':'In Langkawi, the edge is where the landscape gathers: forest above, limestone at the waterline and a changing surface below. This is the coast of Kedah, at the northwest of the peninsula.',
  'sections':[
    ('Limestone and tide','langkawi','Kilim Geoforest Park, Langkawi. Photograph by Abdulrhman Alkhnaifer.',[
      'Langkawi is an island group off the northwestern coast of Peninsular Malaysia, within the state of Kedah. The photographed landscape at Kilim brings steep limestone, vegetation and water together in a compact view.',
      'UNESCO describes Langkawi’s Global Geopark through its geological and ecological variety. At Kilim Karst Geoforest Park, the relationship between limestone formations and mangrove environments is part of that larger story.']),
    ('Look at the whole frame',None,None,[
      'The limestone catches attention first. Then the image opens up: foliage fills its ledges, the forest meets a narrow shoreline, and the water carries a softer version of the land above it. The landscape is more than a single dramatic outline.',
      'Try reading a coastal view from foreground to distance. Water changes the apparent space between landforms. Vegetation gives a cliff its scale. A close crop and a wide view can describe the same place with very different emphasis.']),
    ('A different distance',None,None,[
      'The island chapter follows two city portraits in this collection, but the change is editorial rather than a continuous travel route. The streets of Kuala Lumpur and George Town do not simply dissolve into this waterline.',
      'That pause is the point of Between Places: to let one scene settle before another begins. Here, the eye moves across the water instead of along a row of buildings. The still photograph has enough movement of its own.'])],
  'visit':'Consult the official geopark and Tourism Malaysia for current visitor information. Use responsible local operators, follow site rules and leave wildlife undisturbed. This essay does not promise wildlife sightings, tours or access conditions.',
  'sources':[('UNESCO: Langkawi Global Geopark','https://www.unesco.org/en/iggp/langkawi-unesco-global-geopark'),('Tourism Malaysia: Langkawi, Kedah','https://ebrochures.malaysia.travel/en/islands-and-beaches/langkawi-kedah/')]},
 {'slug':'sabah','name':'Sabah','image':'kinabalu','region':'Malaysian Borneo','tag':'Granite & forest','intro':'A mountain changes the scale.','preview':'Across the South China Sea, Kinabalu rises above the forest. A stream brings the view close again.','description':'See Sabah through Mount Kinabalu and a forest stream at Mari Mari Cultural Village. An independent photographic essay with Sabah Parks source notes.',
  'lead':'The granite skyline of Kinabalu rises above a green foreground. Elsewhere in Sabah, a forest stream brings attention back to stones, roots and running water. One state holds both kinds of looking.',
  'sections':[
    ('Across the sea',None,None,[
      'Sabah is a Malaysian state on northern Borneo, separated from Peninsular Malaysia by the South China Sea. It is not one city or one landscape. Kinabalu is a particular part of a much larger place.',
      'This chapter makes that geographical change explicit. The collection moves from peninsula to Borneo through photographs, rather than suggesting that the scenes sit along one road.']),
    ('Granite above forest','kinabalu','Mount Kinabalu and its forested foreground. Photograph by EJ Yao.',[
      'Mount Kinabalu gives the photograph its strong, broken horizon. Sabah Parks describes a mountain reaching approximately 4,095 metres, above a park recognised for its outstanding biological significance.',
      'The granite is only one layer of the view. In front of it, forested slopes soften the outline and establish distance. Read the image from the nearer trees to the distant ridgeline and the mountain becomes a relationship of scales, rather than only a summit.']),
    ('Beside a stream','rainforest','A stream at Mari Mari Cultural Village, Sabah. Photograph by You Le.',[
      'The second photograph is at Mari Mari Cultural Village in Sabah. It is not presented as a stream inside Kinabalu Park. Water threads between stones beneath the forest, giving the eye something close enough to follow from one edge of the frame to the other.',
      'A mountain asks you to take in a whole horizon. A stream asks you to notice what is underfoot. Together, these images offer two ways into Sabah’s landscapes without pretending to show the whole state.'])],
  'visit':'For Kinabalu Park activities, access and current requirements, consult Sabah Parks directly. This is an editorial portrait, not mountain-climbing advice or a guarantee of permits, weather or trail access.',
  'sources':[('Sabah Parks: Kinabalu Park','https://www.sabahparks.org.my/kinabalu-park/'),('Sabah Parks: World Heritage context','https://whs.sabahparks.org.my/kinabalu-park-as-world-heritage-site')]},
]

ARROW = '<span aria-hidden="true">↗</span>'
def studio(label='Explore Ismail Studio', placement='footer', css='text-link'):
 return f'<a class="{css}" href="https://ismailstudio.my/" data-cta-placement="{placement}">{label} {ARROW}</a>'

def img(name, sizes='100vw', eager=False, cls='', alt=None):
 w,h = DIM[name]
 priority=' fetchpriority="high"' if eager else ''
 return f'<img class="{cls}" src="/assets/images/{name}-1200.webp" srcset="/assets/images/{name}-640.webp 640w, /assets/images/{name}-1200.webp 1200w, /assets/images/{name}-2000.webp 2000w" sizes="{sizes}" width="{w}" height="{h}" alt="{escape(ALT[name] if alt is None else alt)}" loading="{"eager" if eager else "lazy"}" decoding="async"{priority}>'

def nav():
 return f'''<a class="skip-link" href="#main">Skip to content</a>
 <header class="header"><a class="wordmark" href="/" aria-label="Between Places — home">Between<br>Places<span aria-hidden="true">.</span></a>
 <nav aria-label="Primary"><a class="journey-nav" href="/#journey">The journey</a><a class="places-fallback" href="/#places">All places</a><button class="menu-button" type="button" aria-haspopup="dialog" aria-controls="place-menu" hidden>All places</button>{studio('The studio','header','nav-studio')}</nav></header>
 <dialog id="place-menu" aria-labelledby="menu-title"><div class="dialog-top"><h2 id="menu-title">Choose a place.</h2><button type="button" class="dialog-close">Close <span aria-hidden="true">×</span></button></div><nav class="menu-places" aria-label="Destinations">{''.join(f'<a href="/destinations/{p["slug"]}/">{p["name"]} {ARROW}<small>{p["tag"]}</small></a>' for p in PLACES)}</nav><a class="text-link" href="/credits/">Photography, sources & privacy {ARROW}</a></dialog>'''

def footer():
 return f'''<footer class="footer"><div class="footer-top"><p>An independent Malaysian<br>editorial by Ismail Studio.</p><nav aria-label="Footer"><a href="/#places">Explore the places</a><a id="credits" href="/credits/">Photography & credits</a><a href="/credits/#privacy">Privacy & measurement</a></nav><div>{studio('Visit Ismail Studio','footer')}<a class="back-top" href="#top">Back to top <span aria-hidden="true">↑</span></a></div></div><p class="footer-name" aria-hidden="true">Between Places.</p><div class="footer-bottom"><p>Malaysia, seen a little closer.</p><a href="https://ismailstudio.my/" data-cta-placement="signature" aria-label="Built by Ismail — visit Ismail Studio"><img src="/built-by-ismail.png" width="240" height="40" alt="Built by Ismail" loading="lazy"></a><p>Independent project · 2026</p></div></footer>'''

def document(path,title,desc,body,image='kuala-lumpur',kind='home',schema=None):
 url=ORIGIN+path
 ld=schema or {'@context':'https://schema.org','@type':'WebPage','name':title,'description':desc,'url':url,'isPartOf':{'@type':'WebSite','name':'Malaysia — Between Places','url':ORIGIN+'/'}}
 return f'''<!doctype html>
<html lang="en-MY"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#eeecea"><title>{escape(title)}</title><meta name="description" content="{escape(desc)}"><link rel="canonical" href="{url}"><meta property="og:type" content="website"><meta property="og:locale" content="en_MY"><meta property="og:site_name" content="Malaysia — Between Places"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{ORIGIN}/assets/images/{image}-1200.webp"><meta property="og:image:alt" content="{escape(ALT[image])}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(title)}"><meta name="twitter:description" content="{escape(desc)}"><meta name="twitter:image" content="{ORIGIN}/assets/images/{image}-1200.webp"><link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/barlow-condensed.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/css/main.css"><script type="application/ld+json">{json.dumps(ld,ensure_ascii=False)}</script><script defer src="/assets/vendor/gsap.min.js"></script><script defer src="/assets/vendor/ScrollTrigger.min.js"></script><script type="module" src="/js/main.js"></script></head>
<body class="{kind}" id="top">{nav()}<main id="main" tabindex="-1">{body}</main>{footer()}</body></html>'''

def home():
 prints=f'''<figure class="print print-city">{img('kuala-lumpur','(min-width: 900px) 22vw, 40vw',True)}</figure>
 <div class="hero-copy"><h1 id="hero-title">Malaysia,<br>between places.</h1><p>A photographic journey from city streets to island water and the mountains of Malaysian Borneo.</p><a class="button" href="#journey">Begin the journey <span aria-hidden="true">↓</span></a></div>
 <figure class="print print-street">{img('petaling-street','(min-width: 900px) 35vw, 75vw',True,'signature-image')}<figcaption>Petaling Street, at the soya stall</figcaption></figure>
 <figure class="print print-island">{img('langkawi','(min-width: 900px) 25vw, 90vw',True)}<figcaption>Kilim, Langkawi</figcaption></figure>'''
 frames=''
 for name,heading,caption in [('george-town','Under the shutters','George Town, Penang. Photograph by Eugene Lim.'),('petaling-street','A pause at the stall','Petaling Street, Kuala Lumpur. Photograph by Kamaruld Salleh.'),('nasi-lemak','A parcel of the day','Nasi lemak in George Town. Photograph by You Le.')]:
  frames+=f'<figure class="street-frame">{img(name,"(min-width: 900px) 55vw, 90vw")}<figcaption><h3>{heading}</h3><p>{caption}</p></figcaption></figure>'
 rows=''.join(f'<div class="place-row"><a href="/destinations/{p["slug"]}/"><span>{p["name"]}</span><small>{p["tag"]}</small>{ARROW}</a><button class="preview-button" data-place="{p["slug"]}" type="button" aria-label="Preview {p["name"]}" aria-pressed="{str(i==0).lower()}" hidden>Preview</button></div>' for i,p in enumerate(PLACES))
 return f'''<section class="hero" id="home" aria-labelledby="hero-title">{prints}</section>
 <section class="journey section" id="journey"><span class="anchor-alias" id="prologue" aria-hidden="true"></span><div class="section-intro"><h2 data-rise>At street level.</h2><p data-rise>A skyline tells you where you are. A street tells you how a place moves. Start with a shaded walkway, a stall, a parcel of rice.</p></div><figure class="panorama">{img('george-town','100vw',False,'drift-image')}<figcaption>George Town’s shophouses. <a href="/credits/#george-town">Eugene Lim / Unsplash</a></figcaption></figure></section>
 <section class="streets section" id="streets"><div class="gallery-heading"><h2 data-rise>The everyday,<br>in focus.</h2><div class="gallery-controls" hidden><button id="frame-prev" type="button" aria-label="Previous street photograph">←</button><button id="frame-next" type="button" aria-label="Next street photograph">→</button><span id="frame-status" role="status" aria-live="polite">George Town</span></div></div><div class="street-track" role="region" tabindex="0" aria-label="Street photographs; use arrow keys or the previous and next buttons">{frames}</div><p class="gallery-note">Three moments, two cities. <a href="/destinations/george-town/">Read George Town {ARROW}</a> <a href="/destinations/kuala-lumpur/">Read Kuala Lumpur {ARROW}</a></p></section>
 <section class="coast section scene" id="coast" data-scene="opening-landscape"><div class="coast-stage scene-stage"><div class="coast-heading"><h2 data-rise>Land meets water.</h2><p>Off Kedah’s northwestern coast, Langkawi brings limestone, forest and tidal water into the same frame.</p></div><figure class="coast-window"><div class="coast-photo">{img('langkawi','100vw')}</div><figcaption>Kilim Geoforest Park, Langkawi · Abdulrhman Alkhnaifer</figcaption></figure><a class="coast-link text-link" href="/destinations/langkawi/">Enter the Langkawi portrait {ARROW}</a></div></section>
 <section class="borneo section" id="borneo"><div class="section-intro"><h2 data-rise>Across to Borneo.</h2><p data-rise>Sabah is a state on northern Borneo, across the South China Sea from the peninsula. Here, a mountain and a forest stream change the scale of looking.</p></div><div class="borneo-pictures"><figure class="mountain">{img('kinabalu','(min-width: 768px) 70vw, 95vw',False,'drift-image')}<figcaption>Mount Kinabalu · EJ Yao</figcaption></figure><figure class="stream">{img('rainforest','(min-width: 768px) 28vw, 65vw')}<figcaption>Mari Mari Cultural Village, Sabah · You Le</figcaption></figure><div class="borneo-copy"><p>The view opens out.<br>Then it comes close again.</p><a class="text-link" href="/destinations/sabah/">Read the Sabah portrait {ARROW}</a></div></div></section>
 <section class="places section" id="places"><span class="anchor-alias" id="field-notes" aria-hidden="true"></span><div class="section-intro"><h2 data-rise>Find your own pace.</h2><p data-rise>Four places, four independent portraits. Choose a preview, then follow the place that holds your attention.</p></div><div class="place-index"><div class="place-rows">{rows}</div><figure class="place-preview"><div class="preview-photo">{img('kuala-lumpur','(min-width: 768px) 45vw, 90vw',False,'','Kuala Lumpur skyline at dusk')}</div><figcaption><h3 id="preview-title">A city read at two heights.</h3><p id="preview-copy">{PLACES[0]['preview']}</p><a id="preview-link" class="text-link" href="/destinations/kuala-lumpur/">Read Kuala Lumpur {ARROW}</a></figcaption></figure></div><script type="application/json" id="place-data">{json.dumps([{k:p[k] for k in ['slug','name','image','intro','preview']} | {'alt':ALT[p['image']],'dimensions':DIM[p['image']]} for p in PLACES],ensure_ascii=False)}</script></section>
 <section class="studio section" id="studio"><span class="anchor-alias" id="ending" aria-hidden="true"></span><span class="anchor-alias" id="about" aria-hidden="true"></span><div class="studio-photos">{img('petaling-street','33vw')}{img('langkawi','33vw')}{img('kinabalu','33vw')}</div><div class="studio-copy"><h2 data-rise>A place for stories.</h2><div><p>Between Places is an independent editorial experiment by Ismail Studio. Photography, typography and movement turn a small collection of places into a digital journey.</p>{studio('See the studio behind this site','story','button')}<p class="studio-small">Have a story of your own? See the work and get in touch through the studio.</p>{studio('Explore Ismail Studio','closing','text-link')}</div></div></section>'''

def destination(p):
 sections=''
 for heading,photo,caption,paras in p['sections']:
  image=f'<figure>{img(photo,"(min-width: 768px) 60vw, 95vw",False,"drift-image")}<figcaption>{caption}</figcaption></figure>' if photo else ''
  sections+=f'<section class="essay-section {"with-photo" if photo else "text-only"} section"><div class="essay-text"><h2 data-rise>{heading}</h2>{"".join(f"<p data-rise>{t}</p>" for t in paras)}</div>{image}</section>'
 sources=''.join(f'<li><a href="{url}">{label} {ARROW}</a></li>' for label,url in p['sources'])
 related=''.join(f'<a href="/destinations/{x["slug"]}/">{img(x["image"],"(min-width: 768px) 30vw, 85vw",False,"", "")}<span>{x["name"]}</span>{ARROW}<small>{x["tag"]}</small></a>' for x in PLACES if x['slug']!=p['slug'])
 return f'''<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Malaysia</a><span aria-hidden="true">/</span><span>{p['name']}</span></nav><section class="destination-hero"><div><h1>{p['name']}</h1><p class="destination-promise">{p['intro']}</p><p class="location">{p['region']}</p><a class="button" href="#portrait">Read the portrait <span aria-hidden="true">↓</span></a></div><figure>{img(p['image'],'(min-width: 768px) 60vw, 100vw',True,'signature-image')}<figcaption>{PHOTOGRAPHERS[p['image']]} / Unsplash · <a href="/credits/">Full credits</a></figcaption></figure></section><div class="essay-lead" id="portrait"><p>{p['lead']}</p></div>{sections}<section class="visitor-note section"><div><h2>Before you go.</h2><p>{p['visit']}</p></div><div><h3>Sources & further reading</h3><ul>{sources}</ul><p>Factual sources reviewed 19 October 2026. Original editorial writing; no firsthand visit is implied.</p><a href="/credits/">Photography & project credits {ARROW}</a></div></section><section class="related section"><h2>Keep looking.</h2><nav aria-label="More destination portraits">{related}</nav></section><section class="essay-studio section"><h2>Your next story.</h2><div><p>This portrait is part of an independent digital experience by Ismail Studio. Explore the studio’s work in websites and interactive storytelling.</p>{studio('Explore Ismail Studio','destination-closing','button')}</div></section>'''

CREDIT_HEADINGS={'kuala-lumpur':'Kuala Lumpur at dusk','george-town':'George Town shophouses','petaling-street':'The Petaling Street stall','nasi-lemak':'Nasi lemak in George Town','langkawi':'Kilim, Langkawi','kinabalu':'Mount Kinabalu','rainforest':'A stream at Mari Mari'}

def credits():
 sources=json.loads((ROOT/'assets/images/sources.json').read_text('utf-8'))
 photos=''.join(f'<article id="{s["name"]}">{img(s["name"],"(min-width: 768px) 25vw, 85vw")}<div><h2>{CREDIT_HEADINGS[s["name"]]}</h2><p>{s["title"]}. Photograph by {s["photographer"]}. <a href="{s["page"]}">Original on Unsplash {ARROW}</a></p><p><a href="{s["license"]}">Unsplash licence</a>. Local WebP versions resized and cropped for the layouts. The original source register is retained.</p></div></article>' for s in sources)
 return f'''<div class="credits-title"><h1>Behind the images.</h1><p>The photographers, sources and choices behind Between Places.</p></div><section class="credits-intro section"><h2>An independent view.</h2><p>Between Places is an independent editorial and interface project by Ismail Studio. It is not affiliated with tourism authorities or the businesses pictured. Photographs are credited to their original creators; they are not presented as photographs made by the studio.</p><p>The essays draw factual context from Tourism Malaysia, UNESCO, George Town World Heritage Incorporated and Sabah Parks. Each portrait links its sources. This project does not sell travel, take bookings or claim to document a firsthand reporting trip.</p>{studio('Explore Ismail Studio','credits','button')}</section><section class="photo-credits section"><h2>Photography.</h2>{photos}</section><section class="credits-intro section"><h2>Type & movement.</h2><p>Manrope and Barlow Condensed are served locally under the SIL Open Font License. Motion uses the local GSAP and ScrollTrigger libraries. The original supplied Built by Ismail signature remains in the footer.</p><button class="motion-toggle" type="button" aria-pressed="false" hidden>Pause movement</button></section><section class="credits-intro section" id="privacy"><h2>Privacy & measurement.</h2><p>This release loads no optional analytics service and sets no analytics cookies. Following a studio link works as an ordinary link, including with JavaScript disabled.</p><p>With JavaScript enabled, a studio click emits a local browser event containing only the link placement, the page path and the destination host. It is not stored or transmitted by this site. Query strings, names, email addresses and other personal data are excluded.</p><p>GA4 collection is not active. Connecting a future analytics service requires a real property, an appropriate consent implementation and verified collection before this statement changes.</p></section>'''

def save(path,text):
 file=ROOT/path
 file.parent.mkdir(parents=True,exist_ok=True)
 if file.exists() and file.read_text('utf-8')==text:
  return
 temporary=file.with_name(file.name+'.malaysia-build.tmp')
 temporary.write_text(text,encoding='utf-8',newline='\n')
 temporary.replace(file)

if __name__=='__main__':
 save('index.html',document('/','Malaysia — Between Places | A photographic journey','Explore Malaysia between its landmarks: Kuala Lumpur, George Town, Langkawi and Sabah. An independent photographic journey by Ismail Studio.',home()))
 for p in PLACES:
  path=f'/destinations/{p["slug"]}/'
  schema={'@context':'https://schema.org','@graph':[{'@type':'WebPage','name':p['name']+' — Between Places','url':ORIGIN+path,'description':p['description']},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Malaysia','item':ORIGIN+'/'},{'@type':'ListItem','position':2,'name':p['name'],'item':ORIGIN+path}]}]}
  save(path.strip('/')+'/index.html',document(path,p['name']+' — Between Places | Malaysia',p['description'],destination(p),p['image'],'destination '+p['slug'],schema))
 save('credits/index.html',document('/credits/','Photography, credits & privacy — Between Places','Photographer credits, image licences, editorial sources and privacy information for Malaysia — Between Places by Ismail Studio.',credits(),kind='credits'))
 save('404.html',document('/404','Place not found — Between Places','This page could not be found. Return to the Malaysia photographic journey.',f'<section class="not-found section"><h1>A different turn.</h1><p>This page could not be found. Return to the journey, or choose one of the four place portraits.</p><a class="button" href="/">Return to Malaysia {ARROW}</a><nav aria-label="Destination portraits">'+''.join(f'<a href="/destinations/{p["slug"]}/">{p["name"]} {ARROW}</a>' for p in PLACES)+'</nav></section>',kind='error'))
 routes=['/']+[f'/destinations/{p["slug"]}/' for p in PLACES]+['/credits/']
 save('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{ORIGIN}{r}</loc></url>\n' for r in routes)+'</urlset>\n')
 save('robots.txt',f'User-agent: *\nAllow: /\nSitemap: {ORIGIN}/sitemap.xml\n')
 print('Generated home, four portraits, credits, 404 and search files.')
