# FAQ collage redesign review

final result: passed

## Scope and visual truth

User-approved redesign: reuse the individually generated Indian collage elements around a clear FAQ reading column; animate mixed cut-paper letter images at staggered intervals; refine accordion cards to fit the composition. Hindi सवाल जवाब remains above the animated FAQs heading. Existing FAQ answers and destination links are preserved. This is an intentional redesign, not a pixel-for-pixel clone of the old cards.

Source references:
- design-assets/collage-elements-v1/reference/source-upright.png
- design-assets/collage-elements-v1/contact-sheet.jpg (26 individually generated source elements)
- output/review/faq-desktop.jpg (previous section before this iteration)
- Original user FAQ image: /var/folders/kk/8kl41np93yq2072wspjq5f_40000gn/T/codex-clipboard-daf770d2-997c-44c6-9583-d4205db426d5.png

Implementation: http://127.0.0.1:4173/#faqs
Branch: codex/festival-backgrounds
Earlier Events/FAQ review retained in output/review/previous-design-qa.md.

## Evidence and normalization

- Desktop: CSS viewport 1324 × 743, screenshot 1324 × 743.
- Mobile: CSS viewport 390 × 844, screenshot 390 × 844.
- output/review/faq-collage-desktop.jpg
- output/review/faq-collage-mobile.jpg
- output/review/faq-collage-comparison.jpg: old and new desktop views side by side, 2648 × 743.
- output/review/faq-collage-heading-comparison.jpg: 2648 × 640 detail comparison, both 1:1 crops; old crop starts at y=0 and new at y=96 to align the Hindi labels.

State: first FAQ open, other FAQs closed. The new heading cycles between real image variants; captured letter combinations differ by frame. Old capture begins near the Hindi label; the new full capture includes the section divider and top padding. Full-view framing differs by approximately 96px; the focused comparison aligns the labels without rescaling. The new heading has intentional additional height for the larger collage letters, introductory line and pause control.

Both reference artwork and before/after boards were opened and inspected. Individual desktop/mobile screenshots were also inspected for readable question copy, letter shapes, artwork clipping and card spacing.

## Findings and fixes

- [P2, fixed] At 390px the left reader and right chai sat too close to the heading's first/last letter. Reduced mobile reader from 135px to 120px and chai group from 130px to 110px, with adjusted edge offsets. The final mobile capture shows a clear word and unobstructed questions.
- No remaining P0/P1/P2 findings within this scope.

## Required fidelity surfaces

- Typography: existing Baloo 2 body font retained; new title uses eight real raster letter images, with readable F/A/Q/S in both variants. Hindi kicker remains text. Questions wrap cleanly on mobile and keep a separate expansion control. Semantic h2 remains FAQs.
- Layout: centered 772px desktop card column, 13px row gaps, quiet paper panels and numbered tabs. Illustrations stay behind/around content. Mobile uses 22px side gutters and smaller artwork around the heading; the film reel is omitted at that size. Card controls measured at least 65px high on mobile. Document scroll width equals viewport width at 1324px and 390px.
- Color: warm cream paper, maroon, teal and ochre remain aligned with the source collage. The textile pattern stays faint, with opaque readable answer surfaces. Heavy black shadows were intentionally replaced with restrained printed-paper edges.
- Images: six existing prop PNGs reused, existing A/S letters reused, six new letter variants generated as transparent PNG masters. Fourteen optimized WebP files total approximately 682 KiB. All FAQ images load successfully. No stretched artwork, placeholder imagery or visible transparency boxes.
- Content: all seven original questions/answers and links preserved. Added short intro and Hindi signoff. Decorative artwork excluded from the accessibility tree.

## Functional verification

- npm run build: passed after final CSS change.
- git diff --check: passed.
- Browser console: no errors or warnings.
- Desktop keyboard Enter toggles first and second answers repeatedly; cards remain visible after state updates.
- Mobile keyboard activation opens event answer; its events link retains https://www.nitrutsav.in/events.
- Closed panels have inert and aria-hidden=true, zero rendered height and hidden visibility. Expanded controls have matching aria-controls/labelled answer regions.
- Heading variants change independently; Pause holds the same four variants across subsequent checks, Resume restarts swaps.
- Navigating to Events places the heading outside the viewport; the four variants remain unchanged across checks separated by more than every configured interval.
- Reduced-motion and hidden-tab event handling reviewed in source; timer and observer cleanup included. OS reduced-motion toggling was not exercised through the browser.
- This iteration changes only FAQ components, their production assets and review/source documentation. Hero and existing hover interaction source is untouched.

## Limits

Browser verification used the in-app browser. Native Safari and physical touch-device testing were not performed. This is a local preview; no production deployment was made.
