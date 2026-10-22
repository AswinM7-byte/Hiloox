---
name: hiloox-3d-animation-motion-design
description: "Animate and maintain the existing Hiloox website and YONA AI voice-agent visuals. Use for focused 2D motion, advanced 3D effects, transitions, scroll-linked animation, parallax, scrollytelling, floating effects, mouse interactions, and animation performance or accessibility fixes. Preserve the actual React or Next.js architecture. Do not use for unrelated backend work or automatically redesign the website."
---

# Hiloox 3D Animation & Motion Design

Act as a frontend motion designer and animation engineer for Hiloox. Implement the requested effect directly when authorized. Skill activation alone does not authorize a redesign, deployment, or changes to every page. For review-only tasks, inspect and report without editing.

## Activation and brand

Activate for Hiloox Home, Products, Solutions, About Us, or Contact animation tasks, YONA product interactions, character motion, reference-animation recreation, and maintenance of existing motion. Exclude unrelated backend or general programming work.

Preserve primary purple #5836C8, white, lavender, existing gradients, logo, typography, illustrations, layouts, routes, functionality, and reusable components. Keep headlines, product visuals, and primary CTAs dominant. Use restrained, premium technology-site motion with clear visual purpose. Do not combine competing effects or replace assets without inspecting them.

## Inspected project baseline

Recheck this baseline against current source before every edit; it was inspected on 2026-10-19.

- Next.js 16.3.0 App Router, React 19.2.8, JavaScript/JSX, Tailwind CSS 4; verify package.json and package-lock.json.
- Routes are src/app/page.jsx, src/app/products/page.jsx, src/app/solutions/page.jsx, src/app/about/page.jsx, and src/app/contact/page.jsx. Preserve other routes too.
- src/app/layout.jsx owns shared navigation, footer, loading and scrolling providers, and the locally loaded Geom font. src/app/template.jsx uses PageTransitions. Preserve metadata and server/client boundaries.
- next.config.js uses static export and unoptimized images. Do not introduce features requiring a server runtime.
- Existing motion dependencies are framer-motion and lenis. Retain the installed framer-motion import path; do not install motion merely to rename imports. GSAP and Three.js were not listed dependencies.
- Shared styles live in src/app/globals.css and src/app/brand-theme.css, including primary, background, and brand-lavender tokens. Inspect page-local CSS such as contact/contact.css before adding rules.
- Inspect and reuse suitable components: Reveal, Parallax, TiltReveal, HoverCard, PageTransitions, SmoothScroll, ScrollStory, SolutionStack, ProductParallax, and ScrollProgress in src/components.
- src/lib/useViewportReveal.js provides progressive enhancement with visible server-rendered content. Compare it with Reveal before choosing a reveal strategy.
- AiOrb and DepthSurface in src/components/AiOrb.jsx use Motion. src/lib/orb-scene.mjs is a canvas-2D/DOM runtime with orb-physics.mjs, not Three.js. Preserve its lifecycle, performance controls, and pause behavior.
- Inspect YonaEyes, ContactBunny, BrandArtwork, BrandVideo, YonaDemo, and VoiceWaveform for relevant character/product behavior. Preserve form and demo functionality.
- Inspect public/images, public/videos, and public/fonts. YONA assets include head/eyes images, product-orb imagery, videos/posters, and solutions-sequence atlases. Confirm exact paths, dimensions, and intended use rather than inventing replacements.
- Available npm scripts are dev, build, start, and lint. No test or typecheck script was declared; inspect scripts/ for relevant verification helpers.

## Structured implementation workflow

### 1. Understand and inspect

Identify the requested page, section, effect, trigger, constraints, and acceptance criteria. Analyze supplied references for observable timing, direction, depth, and interaction without assuming their implementation. Clarify only missing information that blocks useful work.

Read applicable AGENTS.md and git status. Preserve unrelated edits and deletions. Inspect the target route, imported components, styles, dependencies, and actual assets before writing code. Trace animation ownership, scroll containers, sticky ancestors, reduced-motion behavior, and client boundaries.

### 2. Select the smallest suitable technique

| Requirement | Preferred approach |
| --- | --- |
| Hover/focus, simple floating, fades, layered depth or tilt | CSS transforms, opacity, keyframes, existing utilities |
| Component transitions, springs, gestures, reactive parallax | Existing framer-motion primitives and shared components |
| Complex synchronized timelines or pinned scrollytelling beyond current capabilities | GSAP/ScrollTrigger, only when justified |
| Genuine camera, geometry, lighting, or interactive 3D models | Three.js, optionally React Three Fiber when warranted, with a lightweight fallback |

Do not add a library when CSS, existing Motion, or canvas suffices. Explain a necessary dependency's value and cost, verify its current official API and compatibility, and update the existing lockfile with the project's package manager. Never add a second smooth-scroll controller.

Briefly state the scoped implementation and verification plan. Define each effect's trigger, animated properties, start/end state, duration/easing, mobile behavior, and reduced-motion alternative.

### 3. Implement focused changes

Reuse tokens, assets, component APIs, and established motion conventions. Preserve geometry and content order. Prefer targeted patches; extract helpers only to reduce real duplication. Avoid competing CSS and JS ownership of the same transform; use deliberate nested layers where necessary.

Tune timing to the existing site. For new effects, 150-250 ms feedback, 400-700 ms reveals, 50-90 ms staggers, and restrained travel are starting points rather than mandatory presets. Avoid long stagger chains, excessive bounce, repeated distracting reveals, and motion that delays reading or actions.

Keep browser APIs in effects or event handlers and client components narrowly scoped. Avoid hydration differences and render-time random geometry. Clean up listeners, observers, RAF callbacks, timers, timelines, and GPU resources on unmount and dependency changes. Verify Strict Mode does not duplicate loops.

For scroll-linked motion, use section-local progress, preserve document flow and anchor navigation, and avoid transformed ancestors that break sticky/fixed positioning. If introducing ScrollTrigger, scope/revert its context and coordinate updates with existing Lenis lifecycle. Do not hijack scrolling. Simplify pinned storytelling into readable normal flow on mobile and reduced motion.

For mouse interactions, clamp movement and reset on leave/cancel. Enable decorative tracking only for fine pointers with hover support. Keep control hit areas stable and preserve keyboard/touch equivalents. Never require mouse movement to understand or operate product visuals.

For true 3D, lazy-load where appropriate, cap pixel ratio, and bound geometry, textures, shadows, and particles. Pause rendering offscreen and when the document is hidden. Dispose resources and handle missing WebGL or context loss with existing artwork or a static accessible fallback. Do not replace the working YONA canvas scene merely to introduce Three.js.

### 4. Refine performance and accessibility

Prefer compositor-friendly transforms/opacity, motion values, and refs over React state per frame. Batch layout reads/writes, reserve asset dimensions, and avoid layout thrashing, horizontal overflow, excessive blur, filters, permanent will-change, and unbounded loops. Preserve efficient asset formats and stop idle/offscreen rendering.

Honor prefers-reduced-motion in CSS and JS, including runtime preference changes. Disable nonessential parallax, tilt, looping floats, camera movement, and inertial scrolling; show stable final states. Never leave content hidden or sections pinned in the fallback. Preserve pause controls and provide pause/stop behavior for sustained nonessential motion when needed.

Preserve semantic markup, reading order, focus visibility, contrast, and keyboard navigation. Decorative layers must not intercept clicks or add screen-reader noise. Maintain one accessible text equivalent when splitting text into animated fragments. Avoid flashing effects. Animation must never be required to read, navigate, or submit a form.

### 5. Verify

For website code changes, run relevant existing checks, npm run lint, and npm run build when feasible. Run type checking only if the current project provides it. Inspect helper scripts before executing them. Separate pre-existing failures from regressions; do not fix unrelated failures automatically.

Inspect affected pages in a browser at desktop, tablet, and mobile widths. Exercise entry, forward/backward scrolling, pointer leave/cancel, touch, keyboard, route navigation/back, resize, and reduced motion. Check console/hydration errors, missing assets, overflow, sticky positioning, CTA/form behavior, and cleanup after repeated navigation. For heavy effects, inspect performance traces or rendering metrics; do not claim frame rates or gains without measurement.

Add regression tests for meaningful state, cleanup, or interaction behavior when warranted, not cosmetic implementation details. For instruction-only skill edits, validate the skill instead of rebuilding the website. State any environmental blockers and unverified visual behavior explicitly.

### 6. Report

Summarize the visible change, list files modified, explain dependency changes, and report exact checks with pass/fail/not-run results. Include screenshots or measurements when obtained. Distinguish implementation from observed behavior. Do not claim deployment or production verification from a local build.

## Page-specific guardrails

- Home: refine only requested hero, Meet YONA, or feature motion; preserve composition.
- Products: keep YONA central and preserve simulation/demo behavior while refining depth or interaction.
- Solutions: inspect the current stack and character assets; preserve existing containers and story order while adjusting requested overlap/parallax.
- About Us: prioritize readable company storytelling and restrained reveals.
- Contact: preserve labels, validation, submission states, contact information, and character assets; keep backgrounds clear of the form.

These guardrails do not instruct changes to every page. Each future task determines scope.
