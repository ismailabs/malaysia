# Studio conversion and analytics integrity

## Conversion objective
Visitors who appreciate the Malaysian cinematic experience should visit **https://ismailstudio.my/**, a real accessible destination. Primary measurable event: click from a meaningful outbound studio CTA. Never assume visitors bought, contacted or converted without verified downstream data.

## Design placements
- Minimal discoverable studio attribution in navigation, not a giant intrusive hero sales button.
- Narrative reveal in the third signature scene, with a primary CTA and clear surrounding story; preserve readability while/after animating.
- Consistent contextual links on each destination page and a footer link; avoid repetitive links solely to inflate click opportunity.
- Button accessible via Tab/Enter; test on mobile, no JS and reduced motion; track source route/placement without leaking identity.

## Measurement boundary
- Current V1 `js/analytics.js` emits `malaysia:portfolio_outbound_click` **locally only**; it transmits no user data. Maintain that behavior if no approved endpoint/property exists.
- V1 GA4 is incomplete/unverified. User chose optional GA4 at release; if no valid Measurement ID, ownership, consent mechanism and test mode exist, **do not install a fake integration or assert measured conversion**. Explicitly mark pending.
- If both GA4 and privacy-conscious analytics are actually available, implement only in compliance with consent/legal obligations and privacy statement, document cookie/traffic/data use, verify actual network events and account readback without exposing secrets. No newly paid plans.
- Do not activate unrelated Cloudflare zone-wide analytics to satisfy a narrow studio measurement goal; V1 hostname has a scoped `disable_rum` rule. Review without breaking other sites.

## Test journey
From hero/scene finale/destination/footer click actual anchor -> verify HTTPS resolves to studio. Check open navigation via keyboard/touch, preserve browser back; inspect event payload only contains allowed non-PII fields. Report clicks as test observations, **not** production conversion data.
