# FAQ collage heading — v1

Six individual transparent PNG masters and the exact prompts used to generate them.

- F: f-block.png, f-ornate.png
- A: a-ornate.png; alternate is ../collage-elements-v1/letters/25-letter-a.png
- Q: q-ornate.png, q-block.png
- S: s-block.png; alternate is ../collage-elements-v1/letters/23-letter-s.png

The site uses optimized transparent WebP copies in ../../src/assets/faq-collage/.
These are raster images, not vectors. The original PNG masters remain available for future compositions.

CollageHeading.jsx controls each letter independently at 3.9, 5.7, 4.6 and 6.8 second intervals. Swaps stop when the heading is offscreen, the tab is hidden, reduced motion is requested, or the user pauses the animation.
