# Animation refinement validation — 2026-10-18

## Changes
- Solutions hero now uses the exact uploaded PNG at public/images/yona-solutions.png. SHA-256 matches the original: 94D874765D9D091E344DE409F2802CF86C52098814F94E1E13AC84C998FC23E9. Original dimensions and alpha preserved.
- Removed canvas/sprite-sequence playback from the hero. IntersectionObserver triggers a single staggered horizontal entrance; static content remains visible without JavaScript or with reduced motion.
- Added Contact Us within the Contact image panel, with reserved space above the ears.
- Retained matching seated-character head/body coordinates and clipped eye artwork. The separate yona-head.png has a different pose and is not substituted into that composition. Smaller perspective/rotation ranges prevent exaggerated flat-image turns; no true 360-degree rig or blink frames are available.
- Shared easing tokens, route fade-in, loader fade-out, and falling low-density particles reuse existing infrastructure.
- The large Solutions heading highlights from white to #5a31f4 as scrolling advances and reverses upward. Existing paragraph highlights on light backgrounds retain a readable gray start. No new dependencies.

## Passed
- npm run lint.
- npm run build -- --webpack: compiled, framework type phase completed, all static routes exported.
- node scripts/verify-website.cjs: 15 validation cases, 7 pages, 173 internal links.
- node scripts/verify-contact-motion.cjs: pointer directions, bounded eyes, settling, touch fallback, dynamic reduced motion, and listener/frame cleanup.
- Browser at approximately 669 CSS px: hero asset visible, heading white at top and purple during scroll, reverses to white when scrolling back.
- Contact screenshot confirms title inside panel with a clear gap above ears and no horizontal overflow. Both gaze directions observed; head and eyes follow together. Pointer leave settles gaze near zero and clears particles.
- Mobile menu opens, Escape closes and retains button focus. Empty form review displays validation errors and focuses Full Name.

## Limits
- Default npm run build encounters a Turbopack CSS worker crash on this host, including outside the sandbox. Webpack production build passes. No build configuration was changed.
- No dedicated typecheck script exists in this JavaScript project.
- Desktop/tablet viewport emulation, real touch hardware, and OS reduced-motion browser emulation were not available in the exposed browser controls. These were not visually certified; runtime fallback paths were tested separately.
- Existing form remains review-only without a submission backend.
- No deployment performed. Existing localhost:3000 server was reused and left running.
