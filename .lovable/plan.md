# Vektiss Brand Video — Remotion build

Build a new Remotion composition `vektiss-brand` that opens with the user's uploaded intro MP4 (the chevron forms from pure black) and continues into 6 fully-coded motion-graphic scenes matching the brief. Final output: `/mnt/documents/vektiss-brand.mp4`, 1920x1080, 30fps, ~90s.

## Look & feel (locked from brief)

- Background `#0A0F1E`, electric blue `#2563EB`, secondary `#1E3A8A`, white `#FFFFFF`.
- Inter only (already loaded in `remotion/src/fonts.ts`).
- Motion language: slow deliberate eases, spring `{ damping: 200 }` for entries, no bounce, no shake. Fade-to-black between every shot.
- Persistent layers across all post-intro scenes: faint circuit grid + slow upward particle drift + soft radial blue wash.

## Structure

```
remotion/public/video/vektiss-intro.mp4   <- copied from upload via lovable-assets-free copy
remotion/src/Root.tsx                     <- register `vektiss-brand`, duration 2700f
remotion/src/VektissBrand.tsx             <- TransitionSeries wiring all shots
remotion/src/brand/
  BrandBackground.tsx     grid + particles + radial wash
  Chevron.tsx             SVG chevron mark used everywhere
  DashboardCards.tsx      glass cards w/ ticking numbers
  WaveRings.tsx           concentric expanding rings
  TranscriptPanel.tsx     AI call transcript w/ timestamps
  SiteMockup.tsx          desktop+mobile wireframe→filled
  MediaTile.tsx           orbiting content tile
scenes:
  Scene1Intro.tsx         OffthreadVideo of the uploaded clip (0–5s)
  Scene2WhoWeAre.tsx      logo drift TL, headline word-by-word, blue rule, 4 pillars
  Scene3Intelligence.tsx  node network + dashboard
  Scene4Voice.tsx         phone + rings + transcript
  Scene5Sites.tsx         grid→wireframe→site, desktop+mobile parallax
  Scene6Media.tsx         orbiting tiles around chevron
  Scene7Close.tsx         2x2 icon grid, chevron center, tagline, CTA
```

## Shot timing (30fps)

| # | Shot | Frames | Sec |
|---|---|---:|---:|
| 1 | Intro clip (uploaded) | 150 | 5.0 |
| 2 | Who We Are | 300 | 10.0 |
| 3 | Intelligence | 540 | 18.0 |
| 4 | Voice | 600 | 20.0 |
| 5 | Sites | 540 | 18.0 |
| 6 | Media | 480 | 16.0 |
| 7 | Close | 540 | 18.0 |
| **Total (raw)** | | **3150** | **105** |

Each transition is a 30f fade (overlap), 6 transitions = 180f overlap. Composition duration: **2970 frames (~99s)**. Close enough to the ~90s target while honouring every shot length in the brief; can tighten later if requested.

## Implementation notes

- Use `<OffthreadVideo src={staticFile('video/vektiss-intro.mp4')} />` for Scene 1 so audio is muted-friendly and frame-accurate.
- All motion driven by `useCurrentFrame()` + `interpolate()` / `spring()`. No CSS transitions, no `animate-*`.
- Dashboard ticking numbers: `Math.floor(interpolate(frame, [0, 180], [0, target], { extrapolateRight: 'clamp' }))`.
- Node network: deterministic seeded positions (no randomness per frame); lines drawn with SVG `strokeDasharray` + animated `strokeDashoffset`.
- 3D site rotation: CSS `transform: perspective(1200px) rotateY(...)` driven by frame.
- Particles: deterministic array of N points, each with seeded x/seed-based vertical drift via `(frame * speed + offset) % H`.
- Cross-shot label: small-caps `INTELLIGENCE`/`VOICE`/`SITES`/`MEDIA` chip top-left, fades on shot enter.
- No `backdropFilter` (sandbox crashes). Glassmorphism faked with semi-transparent fill + 1px inner border + soft outer shadow.

## Asset handling

- The uploaded intro MP4 lives at `/mnt/user-uploads/...`. Copy it into `remotion/public/video/vektiss-intro.mp4` so `staticFile()` resolves at render time. (Remotion render needs the file on disk inside the project; CDN pointer JSON won't work for `staticFile`.)

## Render

- Reuse the existing musl-compositor + ffmpeg symlink setup already done for the other compositions in `remotion/`.
- Render via `remotion/scripts/render-remotion.mjs` pattern, passing composition id `vektiss-brand` and output `/mnt/documents/vektiss-brand.mp4`, `muted: true`, `concurrency: 1`, `chromeMode: 'chrome-for-testing'`.
- Spot-check frames at 0, 150, 450, 900, 1500, 2100, 2600 with `bunx remotion still` before the full render to catch layout bugs cheaply.

## Out of scope (ask if wanted)

- Voiceover / music bed (video will be silent except for the uploaded intro's own audio if any).
- Embedding the rendered MP4 into the website hero — this plan only produces the MP4 artifact in `/mnt/documents/`.
