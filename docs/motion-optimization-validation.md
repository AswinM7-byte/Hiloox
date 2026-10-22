# Hiloox motion and performance update — 2026-10-22

Implemented with the Hiloox 3D Animation & Motion Design skill. No dependencies added and no deployment performed.

## Changes in this work

- Removed `src/components/LoadingProvider.jsx` and `src/app/loading.jsx`, their layout wrapper, artificial font wait/focus handling, and obsolete loader CSS.
- `src/app/layout.jsx`, `src/lib/seo.js`: shared root metadata, canonical and absolute social image metadata; preserved existing structured data and favicon.
- `src/components/Navbar.jsx`, `src/app/brand-theme.css`: responsive logo container exposes the existing asset's artwork without stretching its transparent square canvas. Preserved subsequent workspace edits to the Image attributes.
- `src/components/SolutionStack.jsx`, `src/app/solutions/solutions.css`: consolidated stacking rules, measured card fit, consistent minimum height, deliberate overlap offsets, normal-flow fallback, scroll-driven entrance/image depth, content stagger, reduced motion.
- `src/app/solutions/page.jsx`, `public/images/solutions/{support,scheduling,leads,workflow}.svg`: four lightweight, relevant illustrations with dimensions and alt text; existing card content and links retained.
- `src/components/ScrollStory.jsx`: configurable destination color, used for readable lavender text on the dark Solutions hero.
- `src/components/ContactBunny.jsx`, `src/components/YonaEyes.jsx`, `src/lib/contact-bunny-motion.js`, `src/app/contact/contact.css`: full illustration hit area, independent eye origins, bounded interpolation, resting pose, lifecycle cleanup, lavender grass, blink and bounded pointer glitter. Decorative layers do not capture pointer events. Contact's visual label is a paragraph, preserving the form's primary heading.
- `src/components/BrandUi.jsx`: omit absent eyebrow/description elements.
- `scripts/verify-bunny-motion.cjs`: deterministic tests against the actual runtime.
- `docs/solutions-motion-update.png`: current browser screenshot.

Other pre-existing edits and asset/component deletions in the working tree were not reverted.

## Verification

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| Source ESLint plus bunny regression script | PASS |
| `node scripts/verify-bunny-motion.cjs` | PASS: ears, edges, face, body, corners at three sizes; distinct eye targets, elliptical bounds, settled RAF, pointer leave, touch, live reduced-motion reset, listener/timer/observer cleanup |
| `node scripts/verify-viewport-reveal.cjs` | PASS: visible baseline, entry, one-shot reveal, reduced motion and cleanup |
| `git diff --check` | PASS; line-ending notices only |
| `npm run build` | FAILED: Turbopack child worker exits before connecting, including outside sandbox |
| `npm run build -- --webpack` | PASS: all static routes exported |
| Separate typecheck | No project script configured |
| Exported HTML audit, five main pages | PASS: unique titles, descriptions, canonical URLs, exactly one h1, image alt attributes, local media paths/internal page routes; robots.txt and sitemap.xml exported |
| Browser Contact | Rendered with larger logo and no horizontal overflow; outer-corner input changed head and both independent eye offsets; empty form produced field errors and focused Full Name |
| Browser Solutions | Navigation succeeded; four cards and images rendered; short viewport uses relative positioning; no horizontal overflow or captured warning/error logs |

## Limits and remaining visual QA

The preview initially timed out, then recovered. Requested 1440×1000 viewport dimensions were not applied (actual viewport was 878×610, previously 780×439). Therefore desktop stacking overlap/release, true narrow-mobile appearance, reduced-motion appearance, and frame-rate performance are not visually certified. The full-area test uses deterministic runtime inputs; a real-browser pointer check covered the outer corner, not every point. No FPS or SEO-ranking improvement is claimed. The Contact form retains its existing local-only review behavior and does not send enquiries.
