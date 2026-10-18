# YONA animation implementation and verification

Updated 2026-10-16. This report supersedes the earlier opaque-video implementation notes.

## Solutions

`src/components/SolutionsHero.jsx` renders only the isolated character from Solutions_Animation.mp4 into a transparent 384 x 512 canvas. The 240 original frames preserve the 24fps, ten-second anticipation → push → release → tired expression → sit → rest sequence. Ten WebP atlases total approximately 5.8MB. No reference navbar, text, background, or footer is embedded. Existing live hero copy moves 32px during the pushing phase and finishes at its normal position; mobile copy remains stationary for readability. Pause, resume, and replay are available. Playback suspends offscreen and when the document is hidden; reduced motion and loading failures use a seated poster.

` scripts/extract-solutions-sprites.py ` reproduces the extraction from the supplied local video using per-frame segmentation. Source resolution, compression, generated pose changes, and occasional soft silhouette edges remain limitations; this is a raster character sequence, not a skeletal animation rig.

## Contact

`src/components/ContactBunny.jsx` uses the supplied seated cutout with complementary head/body masks. Actual pointer coordinates within the character panel drive an eased requestAnimationFrame loop. The body stays fixed while head yaw, pitch, and roll respond continuously in every pointer direction. `src/components/YonaEyes.jsx` reconstructs clipped sclera and iris layers from the supplied eye artwork for independent coordinated pupil movement. Pointer updates write transforms/CSS properties without React renders.

Hover produces small purple, lavender, and white four-point stars around the sides of the head and upper body. Creation is bounded at ten particles; each fades and removes itself after its animation. Leaving stops generation and eases the face toward neutral. Visibility, reduced-motion, coarse-pointer, and unmount cleanup are handled. Touch devices retain a static character without obstructing scrolling or the form.

The Contact reference shows directional looking, not a literal full head revolution. This implementation is layered 2D with perspective transforms, not genuine 3D. It cannot reveal unseen side/back surfaces or articulate ears independently. A rigged YONA model with eye bones/blend shapes, or artist-separated head/ear/eyelid/iris/body layers and additional angles, is needed for faithful unrestricted rotation. The user approved supplied cutouts with documented limits.

## Earlier requests retained

Home/Product sphere uses `public/videos/yona-sphere-alpha.webm` and its transparent poster, generated with `scripts/clean-sphere.py`. Alpha decoding verified every frame: exterior and watermark area alpha zero, opaque core alpha 255. Browser alpha capability check falls back to the transparent poster when decoding is opaque. No invented extra source detail or AI upscaling is claimed.

`LoadingProvider.jsx` provides one fixed viewport loader outside transformed page ancestors, with focus restoration, inert content while loading, reduced-motion handling, no-JS fallback and an eight-second fail-open watchdog. Contact keeps its existing review-only form and validation; no backend submission was added.

## Files created or changed in this implementation

Created: `src/components/LoadingProvider.jsx`, `src/components/SolutionsHero.jsx`, `src/components/ContactBunny.jsx`, `src/components/YonaEyes.jsx`, `scripts/clean-sphere.py`, `scripts/extract-solutions-sprites.py`; transparent sphere video/poster; `public/images/solutions-sequence/` atlases/posters/manifest; supplied `yona-head.png`, `yona-seated.png`, `yona-eyes.png` copies; documentation and browser previews.

Updated: `src/app/layout.jsx`, `src/app/loading.jsx`, `src/app/solutions/page.jsx`, `src/app/brand-theme.css`, `src/components/BrandVideo.jsx`, `src/components/AnimatedAnnotator.jsx`, `src/components/Contact.jsx`, `.gitignore` (local media tool directory). Existing earlier redesign files remain in the workspace.

## Executed validation

- `npm run lint`: passed, no warnings.
- `npm run build -- --webpack`: passed; all 11 static entries generated. Existing module-type warning remains. Default Turbopack previously crashed in its Windows CSS worker, so production validation used Webpack.
- `node scripts/verify-website.cjs`: passed 15 validation cases, seven exported pages, 173 internal links and truthful demo/contact notices.
- Browser: Solutions transparent character loaded, distinct standing/tired/sitting/rest poses, pause/resume/replay and final frame 239 verified. Live text transform starts at -32px and ends at 0px. No reference UI is rendered.
- Browser: Contact live upper-right and lower-left gaze/head transforms, fixed body, concurrent hover stars, return to neutral and zero particles after exit verified.
- Browser: desktop 1440px, tablet 820px and mobile 390px layouts inspected; no horizontal overflow. Tablet bunny centering corrected. Mobile empty form validation still reports Full Name is required.
- Browser: Home alpha video loaded/played without opaque rectangle or watermark; global viewport loader covered the page then released it. Product scenario/Continue/Restart checks passed during this task.
- Reduced-motion and error fallbacks are implemented but OS preference switching and Safari/Firefox were not manually exercised. No separate typecheck script exists; Next production checks passed.

Screenshots: `solutions-animation-preview.png`, `contact-animation-preview.png`.
