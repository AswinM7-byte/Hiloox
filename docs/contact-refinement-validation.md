# Contact refinement and cleanup — 2026-10-18

## Layout and motion
- Contact is a centered 1120px maximum-width card with balanced image/form columns. At 1366×768 the card ends around y=696; the whole bunny remains visible.
- Below 1000px the columns stack. Fields remain paired on tablet and become single-column below 540px. The form grows naturally for validation errors and user-resized message text.
- Removed the conflicting 660px image minimum, viewport-based grid minimum, large inherited page spacing, and duplicated Contact overrides from both global stylesheets.
- Contact styling now lives in src/app/contact/contact.css. Original Geom typography, brand tokens, field names, validation, and review-only behavior are preserved.
- useViewportReveal shares the progressive-enhancement observer between PageTransitions and Contact. Contact title/heading, character, support text, fields, button and details enter once, using separate transform layers and restrained stagger. Focused controls bypass entrance animation.
- Bunny head/eye tracking remains intact; removed ambient dots, grass and redundant ground decorations. Head/body layers intentionally use matching source coordinates.

## Verified cleanup
- Route import-graph audit found five unreachable components, with no dynamic imports: CursorGlow, Hero, Sparkles, SpotlightCard, UseCases. These were removed after checking references across source, scripts and docs.
- Removed obsolete hero-liquid/spotlight-card selectors and aurora-shift/contact-star-twinkle keyframes.
- Removed public/images/contact-grass-reference.jpg after its sole runtime CSS/JSX usage was removed. Historical source reference images in docs remain intact.
- Preserved current hero assets, loader, seated bunny, separate head/eyes, original artwork, videos and script-generated sequences. Some assets are referenced dynamically or by regeneration scripts and were deliberately retained.
- Removed the unused annotator artwork-map entry (the actual annotator uses BrandVideo) and normalized BrandArtwork class whitespace after a browser hydration warning.
- scripts/audit-components.cjs reports no unreachable source components after cleanup.

## Validation
- npm run lint passes.
- npm run build -- --webpack passes, including framework type phase and static route export. No standalone typecheck command exists. The earlier host-specific Turbopack worker issue was not addressed by changing configuration.
- verify-website.cjs: 15 validation cases, 7 pages, 173 internal links.
- verify-contact-motion.cjs: both gaze directions, clamping, return to rest, touch fallback, reduced-motion change and cleanup.
- verify-viewport-reveal.cjs: visible baseline, viewport entry, one-shot observation, reduced-motion reset and cleanup.
- Browser checks across all five primary routes at actual CSS widths 390, 768 and 1439: no horizontal overflow or broken loaded images.
- Contact desktop and tablet compositions visually inspected. At mobile width 390, the bunny is entirely inside the image panel, with clearance below the title and above the panel bottom.
- Empty form review focuses Full Name and exposes five field errors; valid input produces the existing truthful review status. Nothing was transmitted.
- Browser viewport override reset after testing. Existing localhost preview server retained. No deployment.

Real touch hardware and OS reduced-motion visual testing were not performed; fallback behavior was covered by runtime tests.
