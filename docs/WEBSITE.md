# Hiloox website implementation

## Pages

Next.js App Router renders `/`, `/products`, `/solutions`, `/about`, and `/contact` separately. Shared navigation uses Next Link with active-route indicators. `/privacy-policy` and `/terms` are retained. `next build` exports static HTML to `out`; existing Firebase Hosting configuration supports clean route URLs. Other hosting providers must serve the exported route HTML files rather than rewriting everything to the homepage.

The Products route preserves the existing agent showcase, waveform and chat examples, platform components, calculator, and email-draft demo request. The platform detail panel is expandable. Dashboard data and savings estimates are labeled illustrative. The new YONA example is a deterministic text simulation. It does not request microphone permission, call a voice API, or create a booking.

## Contact delivery

No enquiry backend is configured in this checkout. Firebase is installed but there is no enquiry service or application API implementation. The Contact form validates locally and does not persist or transmit its contents. A valid review displays an explicit not-sent notice. The existing email-draft form opens a mailto URL; users must send the draft in their own email application.

To enable delivery:
1. Provision a server-side endpoint or form service compatible with the static hosting setup. Do not put service credentials in NEXT_PUBLIC variables or client code.
2. Validate and normalize the five fields on the server. Allowlist enquiry types, limit message length, and add rate limiting and spam protection appropriate to the deployment.
3. Deliver/store the enquiry server-side and return an explicit successful HTTP response only after the intended operation succeeds.
4. Connect `Contact.jsx` to that endpoint. Track pending state, disable submission while pending, handle network/server failures without clearing the fields, and show success only after a confirmed response.
5. Update the on-page integration notice, privacy disclosures, and retention settings to match the actual service. Test success, timeout, failure, validation, and repeat submission behavior before deployment.

## Motion and fonts

No packages were added. CSS perspective and existing Framer Motion power the decorative orb, card depth, reveals, and navigation indicator. Orb animation pauses outside the viewport and is disabled for reduced motion or devices without hover. The demo is entirely usable without movement. The existing Plus Jakarta Sans Latin font is self-hosted in `public/fonts` to avoid build-time Google Fonts access. Its OFL license is included alongside it.

## Verification

- `npm run build`: production static export.
- `npm run lint`: repository lint (bundled `.agents` examples are excluded).
- `node scripts/verify-website.cjs`: form validation and exported route/link checks after a build.

There is no standalone type-check script in this JavaScript project. Next's build performs its configured checks. Visual browser testing should include desktop, tablet, narrow mobile, keyboard navigation, and the reduced-motion setting.

Verified in the local browser: empty-field errors and first-error focus, invalid email feedback, valid details with an explicit unsent notice, product/demo anchor navigation, appointment simulation completion and restart, and the 390px mobile menu opening and closing with Escape and focus restoration. Static checks cover all seven exported routes and their internal link targets.

## File inventory

Created:
- `src/app/products/page.jsx`, `src/app/solutions/page.jsx`, `src/app/about/page.jsx`, `src/app/contact/page.jsx`
- `src/app/template.jsx`
- `src/components/AiOrb.jsx`, `src/components/BrandUi.jsx`, `src/components/YonaDemo.jsx`
- `public/fonts/plus-jakarta-sans-latin.woff2`, `public/fonts/OFL.txt`
- `scripts/verify-website.cjs`, `docs/WEBSITE.md`

Modified:
- `src/app/page.jsx`, `src/app/layout.jsx`, `src/app/globals.css`
- `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/components/CompanySections.jsx`, `src/components/Contact.jsx`
- `src/components/CtaDemo.jsx`, `src/components/DemoForm.jsx`, `src/components/VoiceWaveform.jsx`, `src/components/ChatThread.jsx`
- `src/lib/content.js`, `eslint.config.mjs`

No dependency additions or hosting deployment were performed. Existing product feature components remain available on the Products page. The production build and full lint pass; the build retains the pre-existing package-module-type warning. Reduced-motion fallbacks are implemented in source; an OS-level reduced-motion browser test was not performed.

## Purple-and-white UI refinement

`src/app/brand-theme.css` centralizes the current visual treatment: #5836C8 primary actions, white and lavender reading surfaces, and dark purple hero/demo stages. The existing base stylesheet remains responsible for layout and legacy product components. New visual refinements reuse Framer Motion and CSS/SVG; there are no added dependencies. Solution names now use prominent h2 headings with separate, larger problem statements. The decorative orb includes a traveling waveform trace and gentle parallax; it performs no audio capture or playback. Scroll-to-top respects reduced motion.

Verified the redesign in browser at 1440px (desktop), 768px (tablet contact form and validation), and 390px (mobile demo and navigation). OS-level reduced-motion emulation was not performed; reduced-motion fallbacks are covered by the CSS and Framer Motion preference hooks.

## Reference-inspired voice particles and interactive motion

The voice orb is now a real-time Canvas composition in `src/components/AiOrb.jsx` and `src/lib/orb-scene.mjs`. It uses the uploaded image as a visual reference rather than an image asset. The renderer draws a violet sphere, flowing white particle surfaces, translucent rings, ambient lights, and a brief radial burst. Three explicitly labeled decorative lights support pointer capture, dragging, bounded inertia, friction, collisions, arrow-key movement, and Home reset. Motion can be paused. Controls and business content remain outside the drag region.

No audio, microphone, API, or delivery behavior was added. There are no additional packages. `CommunicationVisual.jsx` provides original accessible SVG illustrations for support, scheduling, lead qualification, workflows, About, Home, and Contact.

Performance: animation runs outside React state, caps pixel density and frame rate, reduces detail on coarse-pointer/low-core devices and narrow canvases, suspends offscreen and in hidden tabs, and cancels observers/listeners/RAF on unmount. Reduced-motion preference changes stop continuous animation and inertia; static drawing and manual keyboard movement remain available. A CSS orb remains visible if Canvas is unavailable.

Validation commands:
- `npm run lint`
- `npm run build`
- `node scripts/verify-website.cjs`
- `node scripts/verify-orb.mjs`
- `node scripts/verify-orb-runtime.mjs`

Physics tests cover collisions, friction, boundary bounces, held objects, exact overlaps, and 3,000 bounded steps. Runtime tests cover pause, drag constraints, keyboard movement, resizing, reduced-motion preference changes, visibility, cleanup, and a missing Canvas context. Browser inspection confirmed desktop dragging/keyboard controls and the 390px mobile composition/pause state. The reduced-motion lifecycle was verified with a simulated media-query change in the runtime test, not by changing the operating system preference.
