## Goal

Two changes to `vektiss-voice-poc.mp4`:

1. **Extend the video from 2:06 → 2:33** with the four missing beats from the script (scale/CRM/bilingual, custom build, no-questions guarantee, final pricing close).
2. **Make the right-side placeholder invisible** so the whole canvas reads as one continuous background and the user can drop their 9:16 narrator video on top in post.

Canvas stays **1280×720** (unchanged). The left ~875 px column keeps the motion-graphics scenes; the right ~405 px column is a reserved safe-zone (9:16) — visible only as continuous background, no dashed border, tint, mark, or label.

## Scene 13 stays put

Scenes 1–13 are unchanged. Scene 13 still ends at frame 2706 (1:30.2). The four scenes below pick up from there and run to frame 4593 (2:33.1).

## New / rewritten scenes (1280×720 inside the left content zone)

### Scene 14 — Scale, CRM & Bilingual (600 frames · 20s · ends 2:03)

Replaces the current node-map-only Scene 14. Choreographed in three beats so it lines up with the VO:

1. **Routing (0–7s)** — central Vektiss node, branches grow outward to 4 location pins; each pin lights up in sequence as a small label appears: "Houston · Austin · Dallas · Remote".
2. **CRM lock-in (7–13s)** — three CRM chips animate in around the central node with glowing connector lines: **HubSpot**, **Salesforce**, **GoHighLevel** (text chips, no third-party logos to avoid trademark issues; styled as branded pill cards on the editorial light bg).
3. **Bilingual (13–20s)** — a compact EN ↔ ES toggle pill animates in, the active language flips on a cadence; subtle "Personalizes every caller" caption below.

Headline pinned top-left across the whole scene: **"Built to scale. With you."**

### Scene 15 — Custom Build + Guarantee Stamp (420 frames · 14s · ends 2:17)

Blueprint reveal followed by the guarantee badge:

- Blueprint hairlines draw a custom office floor-plan in the center (animated `strokeDashoffset` paths), then color washes in.
- Three text overlays stagger in to the right of the blueprint:
  - **"Fully Custom Build"**
  - **"Done-For-You Setup"**
  - **"Keep Your Number"**
- At ~9s, a circular badge **"30-Day Money-Back Guarantee"** drops in from above with a rotational settle + a quick scale-overshoot to feel like a stamp impact. Electric-blue glow ring on settle. The badge holds for the remainder of the scene.

### Scene 16 — No Questions Asked (240 frames · 8s · ends 2:25)

The guarantee badge stays anchored upper-center. Beneath it:

- **"No Questions Asked."** (bold display type, fade-up).
- A pulsing green checkmark (`#10B981`) under the line — slow 2s pulse, calm energy.
- Soft supporting line: "If it doesn't perform, you don't pay."

### Scene 17 — Pricing & Close (627 frames · ~20.9s · ends 2:33.1)

Per spec this scene breaks the editorial light theme on purpose:

- Background transitions to **deep navy `#0A1628`** (smooth 8-frame crossfade from the off-white bg).
- Vektiss logo mark + "VEKTISS" wordmark pinned **top-center**.
- Massive line: **"Starts at"** then **"$45.99 / mo"** — the dollar amount in electric blue `#0088FF`, the rest in white.
- Beneath: phone number **(346) 594-7686** at large size with a slow electric-blue glow pulse (`box-shadow` interpolated frame-by-frame) and a small arrow + **"Call Now"** label to the left.
- **vektiss.com** fades in at the bottom in mono caps at ~16s.
- Last ~60 frames: hold, then a 30-frame fade to black to finish at 2:33.1.

The right-zone safe area still applies — pricing/phone are centered inside the left 875 px column, so a narrator video on the right doesn't overlap them.

## Placeholder / background change

In `src/VoiceAdPOC.tsx`:

- Remove the right-zone visual chrome (blue tint fill, dashed border, Vektiss mark, "NARRATOR · 9:16" label, dimension caption).
- Extend a single full-width `VoiceBackground` across the entire 1280×720 canvas so the off-white wash, hairline grid, and radial Vektiss-blue glow read as one continuous backdrop.
- For Scene 17's navy frame, swap the bg layer to navy for that scene only (same full-width treatment, no visible split).
- Keep the layout invariant: the scaled scene container still occupies the left 875×720 region, leaving the right 405×720 untouched and clean — invisible to the eye, but the user knows it's there for compositing the 9:16 video.

## Composition duration

Update `src/Root.tsx`:

- `voice-ad-poc` `durationInFrames`: **3786 → 4593** (2:06.2 → 2:33.1).

## Technical details

- All four scenes live under `remotion/src/voice/` as `Scene14Scale.tsx`, `Scene15Build.tsx` (renamed from `Scene15Guarantee.tsx`), `Scene16NoQuestions.tsx` (renamed from `Scene16CTA.tsx`), `Scene17Close.tsx` (rewritten).
- All motion via `useCurrentFrame()` + `interpolate()` / `spring()` — no CSS transitions.
- Blueprint strokes use animated `strokeDashoffset`. Badge stamp uses an overshoot spring (`damping: 8, stiffness: 220`). Phone-number glow pulses via `Math.sin(frame * 0.18)` on `box-shadow` blur radius.
- Imports update in `VoiceAdPOC.tsx` to reflect the renamed scene files and new durations dictionary `D.s14=600, s15=420, s16=240, s17=627`.
- After implementation: render `voice-ad-poc` to `/mnt/documents/vektiss-voice-poc.mp4` and QA frames at 1:50, 2:08, 2:20, 2:30 to confirm the four new beats land and the right zone is clean.

## What stays the same

- Canvas: 1280×720, 30fps.
- Scenes 1–13: untouched.
- Vektiss logo mark in HUD bug + reveal + close (already wired).
- Red squares in Scene 7 (already wired).
- Right ~405 px column reserved for the user's 9:16 narrator video — now invisible.
