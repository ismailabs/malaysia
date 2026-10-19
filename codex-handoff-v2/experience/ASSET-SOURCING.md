# Visual asset truth, rights and provenance

## Required sourcing policy
All images **purporting to show real geography, places, buildings or people in Malaysia** must be authentic properly licensed photography or authentic attributable public geographic data. Do not pass off synthetic photorealistic Malaysian views, altered images that misrepresent landmarks, AI-generated documentary 'photos', or invented map outlines as real. Procedural and fantastical transitional art is allowed as clearly artistic *interfaces*, never factual documentary evidence.

## Discovery sequence
1. Inventory inherited seven source photos, associated credits/license URLs in `assets/images/sources.json` and `/credits/`; original pixels may not be enough for V2 differentiation.
2. Search reusable free public/licensed media from trustworthy portals (e.g. Unsplash subject to actual terms, Wikimedia Commons with per-file licences, governmental map data with reusable permission). Verify each image's specific page/credit, download allowance and modification/redistribution terms; no watermark or scraped unauthorized stock asset.
3. Source accurate vector landmass/coastline/boundaries for Peninsular Malaysia and Malaysia Borneo. Record geographical dataset version, license, projection/transform approach, and point placement (KL, George Town, Langkawi, Sabah) in the provenance log. If simplifying, label as schematic and keep true spatial relationships.
4. Generate unique CSS/SVG/Canvas ornamental graphics and visual effects with self-authored code; document algorithm and sources, no external commercial API dependence.
5. Preprocess to appropriate WebP/AVIF/responsive sizes where supported, preserve intrinsic dimensions, alt text, sensible `sizes`, priority of hero images and lazy-load offscreen media. Avoid huge on-scroll decoding and unbounded requests.

## Required asset ledger
Store outside deployed public staging source in `output/v2/ASSET-REGISTER.md` and publish necessary photographic source credits. Per asset: path, visible role and location, original creator, source URL, exact license/terms checked and date, edits/crops, intended redistribution, alt text, source file size, optimized file size. Link derived art to source photograph where appropriate. The user authorized **zero new paid services**.

## Art-direction rule
The visual difference must be achieved through **genuine new compositions**, not falsely claiming new media that is only the old same picture cropped or recolored. If unable to source a particular authentic photo freely, redesign the scene around proven photographs + original procedural art, and record this choice.
