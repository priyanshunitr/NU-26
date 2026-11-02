# Events and FAQs design review

final result: passed

## Source and scope

User screenshots are the visual baseline, with the approved changes to Events/FAQs backgrounds, transitions and motion. Hero, About, Sponsors, Footer, existing content, typography and links are preserved.

Source visual truth:
- /var/folders/kk/8kl41np93yq2072wspjq5f_40000gn/T/codex-clipboard-3826d3db-e385-46b4-bce7-1fff6b1e5566.png (Events)
- /var/folders/kk/8kl41np93yq2072wspjq5f_40000gn/T/codex-clipboard-daf770d2-997c-44c6-9583-d4205db426d5.png (FAQs)
- /var/folders/kk/8kl41np93yq2072wspjq5f_40000gn/T/codex-clipboard-e2751176-3158-42d4-a93f-f573def20520.png (unchanged hero)

Implementation: http://127.0.0.1:4173/

## Evidence and normalization

Desktop CSS viewport: 1324 × 743. User images: 2648 × 1666; removed 180 px browser chrome and downsampled the 2648 × 1486 content to 1324 × 743. Implementation captures: 1324 × 743, screenshot density 1. Combined source/implementation boards: 2648 × 743, source left and implementation right.

- output/review/events-desktop.jpg
- output/review/faq-desktop.jpg
- output/review/events-comparison.jpg
- output/review/faq-comparison.jpg
- output/review/events-mobile.jpg
- output/review/faq-mobile.jpg
- output/review/final-preview.jpg

Mobile CSS viewport and screenshots: 390 × 844, density 1.

States: desktop Events first row revealed; desktop FAQ first answer expanded and other answers closed; mobile FAQ first and second answers expanded. Desktop Events capture starts approximately 65 px earlier relative to the heading than the reference; this is a scroll framing difference, not added heading-to-content spacing. FAQ comparison aligns first expanded cards. The new patterned surroundings are intentional differences from the source.

Full-view source and implementation were inspected together in the comparison boards. Focused card, heading and answer details were also inspected in full-size viewport screenshots; these are readable at their captured resolution, so additional magnified crops were unnecessary.

## Findings and iteration history

1. [P1, fixed] FAQ toggling replaced the DOM class updated by the scroll observer, hiding toggled cards. Changed accordion state to a data-open attribute while keeping the reveal element's className stable. Re-tested repeated Enter toggles: aria-expanded changes correctly and is-visible remains. Final desktop and mobile FAQ captures show all in-view cards.
2. [P2, fixed] Mobile Events background used fill sizing and elongated the rosette over the full six-card section. Changed mobile artwork to natural aspect ratio with reduced opacity. Final mobile capture retains readable cards without stretched motifs or horizontal overflow.
3. No remaining P0/P1/P2 issues in the reviewed scope.

## Required fidelity surfaces

- Typography: existing Irish Grover headings and Baloo 2 copy retained; visible font forms match the source. Heading hierarchy and Hindi labels preserved. Mobile questions wrap within the card without hitting the expansion control.
- Layout rhythm: original three-column desktop event grid and ticket-style FAQ layout retained; Events spacing is tightened, card tilt restrained, FAQ answer expansion uses a grid transition. At 390 px the event grid becomes one column; no document horizontal overflow.
- Colors: existing cream, paper, maroon, mustard, pink, indigo and teal tokens retained. Generated artwork is attenuated with layer opacity. FAQ panels remain opaque for readable contrast.
- Images: three real generated raster assets, original PNGs retained and WebP delivery copies used. No placeholder illustrations. Events art crops naturally at desktop edges; FAQ print frames the text. Divider echoes the hero's printed torn-paper treatment.
- Copy: event names, descriptions, question/answer copy and destination links unchanged.

## Functional validation

- Production build: npm run build passed after final fixes.
- git diff --check passed.
- Browser console: no errors or warnings in the final inspected preview.
- FAQ opening/closing checked with pointer and Enter; correct expanded state and labelled region relationships.
- Closed answer panels have aria-hidden=true and inert, keeping their links out of keyboard navigation.
- Event links retain existing targets and rel protections; link focus is visible.
- Artwork loaded successfully in the browser.
- Mobile parallax transform is none; no horizontal document overflow at desktop or mobile viewport.
- Reduced-motion styles disable new reveal and accordion transitions; the parallax hook respects preference changes. OS reduced-motion toggling was not exercised through the browser tools.
- Hero component, PosterTrail, hero styles/assets and global typography files have no changes relative to the published base commit e39a164.

## Remaining test limits

Browser review used the in-app Chromium browser. Native Safari and physical touch-device testing were not performed. No production deployment was made.
