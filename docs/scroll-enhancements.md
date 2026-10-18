# Scroll and scene enhancements

## Implementation

- `src/components/ProductParallax.jsx` adds independently scroll-linked foreground artwork (±24px) and a soft background glow (±14px in the opposite direction) to the existing Products hero. Headings, copy, and CTAs stay in their original layout. Existing AgentShowcase parallax remains intact.
- `src/components/SolutionStack.jsx` wraps the four existing Solutions sections without duplicating content. CSS sticky positions advance by 16px per card; incoming cards have increasing z-index. Framer Motion scroll values gently scale previous cards to 96.5%. The stack is bounded by its own section and releases before the workflow illustration. Tablet typography and spacing are compacted. Mobile, viewports shorter than 850px, and reduced-motion preferences use normal document flow.
- `src/components/ScrollStory.jsx` applies progressive word coloring only to the Products introduction and four Solutions descriptions. Original wording, whitespace, font metrics, selectable text, and accessible reading order are retained. Muted #716a80 transitions to exactly #5a31f4. Motion values update DOM styles without per-scroll React renders.
- `src/components/ContactBunny.jsx` adds a decorative, pointer-transparent grass layer. `public/images/contact-grass-reference.jpg` is an unchanged copy of the supplied c51b6327 reference. CSS displays only its bottom grass strip with a soft mask; the reference headline and character are outside the visible strip. The existing live mascot is retained. No generated replacement character or new dependencies.
- `src/components/PageTransitions.jsx` excludes the scroll-controlled elements from the generic timed fade so incoming cards remain readable and transforms do not compete. Existing YONA sequences, pointer easing, particles, media pause logic and unrelated reveals remain intact.
- Integration updates: `src/app/products/page.jsx`, `src/app/solutions/page.jsx`, `src/app/brand-theme.css`.

## Browser evidence

- Products foreground changed from -1.72px to -19.75px while the background changed from +1.01px to +11.52px during scrolling. Its introduction showed completed purple words, intermediate colors, and remaining muted words in the same paragraph. No console errors were captured.
- Desktop Solutions first three cards reached sticky tops 108px, 124px, and 140px as the fourth approached. The cards released together before the following workflow section. Existing animation controls remained present.
- Tablet at 820px: sticky cards measured approximately 522–541px high, with no horizontal overflow. Mobile at 390px: all four cards used relative positioning and remained readable, without horizontal overflow.
- Contact grass was visually inspected beneath the unchanged live bunny. Existing form structure and cursor interaction code were preserved.
- Product demo Continue advanced the existing scripted response to example 02/02.
- Product demo Restart restored the enabled Continue button. Contact head tracking and two concurrent hover stars were verified after grass integration; the grass has pointer-events: none. Grass placement was inspected at desktop, tablet and mobile sizes.

## Final checks

- `npm run lint`: passed with no warnings.
- `npm run build -- --webpack`: passed, all 11 static entries generated. The existing Next configuration module-type warning remains.
- `node scripts/verify-website.cjs`: passed 15 validation cases, seven exported pages, and 173 internal links.

Screenshots: `solutions-stack-preview.png`, `scroll-highlight-preview.png`, and `contact-animation-preview.png`.

## Limits

Grass is a masked raster ground layer from the supplied reference, not volumetric geometry. YONA remains the documented 2D implementation described in `redesign-media-notes.md`. Reduced-motion fallbacks are implemented; OS preference switching and Safari/Firefox were not manually tested. No missing assets were needed for this enhancement.
