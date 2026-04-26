## Goal

Make the homepage hero feel like the video IS the experience — not a boxed iframe sitting inside a container. On desktop, it goes full-bleed cinematic with the headline + CTAs overlaid. On mobile, swap to a 9:16 vertical version that fills the screen so it feels native to phone viewing.

---

## 1. Render a new 9:16 vertical video with Remotion

The existing Remotion project (`remotion/`) only has a 1920×1080 horizontal composition. I'll add a parallel vertical composition.

**Changes in `remotion/`:**
- Add a new `MainVideoVertical.tsx` that re-uses the same scenes (`SceneHook`, `ScenePillarSolo`, `SceneAllPillars`, `SceneClose`) but tuned for 1080×1920 — adjusted padding, type sizes, and HUD positioning so nothing clips on a portrait canvas.
- Register a second `<Composition id="main-vertical" width={1080} height={1920} ...>` in `Root.tsx`.
- Render it via the existing `scripts/render-remotion.mjs` (parameterized to take a composition id) → output to `/mnt/documents/vektiss-hero-vertical.mp4`.
- Hand you the file as a `<lov-artifact>` so you can upload it to Bunny.net (library 600055), then paste the new embed URL back to me. I'll wire it in.

> Note: I can't upload directly to Bunny.net from the sandbox — you'll need to drop the rendered MP4 into your Bunny library and share the new iframe embed URL. Takes ~30 seconds on your end.

## 2. Rebuild the hero as full-bleed cinematic

**File: `src/routes/index.tsx`**

Replace the current contained-iframe hero with a true full-bleed section:

- Hero section becomes `relative min-h-[90vh] md:min-h-screen` with the video as an absolutely-positioned background layer (`absolute inset-0 -z-10`).
- Break out of `container-editorial` for the video layer so it spans edge-to-edge of the viewport, while the text content stays inside the editorial container for readability.
- Add a gradient overlay (`bg-gradient-to-b from-background/40 via-background/20 to-background`) over the video so the headline text stays legible regardless of video content.
- Eyebrow, H1, subhead, and the two CTA buttons sit on top of the video, vertically centered.
- Stats strip moves below the hero, on solid background (keeps it readable).

## 3. Responsive video swap (desktop horizontal / mobile vertical)

Render two iframes, toggle visibility via Tailwind:

```tsx
{/* Desktop: 16:9 horizontal */}
<iframe
  src="https://iframe.mediadelivery.net/embed/600055/130db0d6-...?autoplay=true&loop=true&muted=true&preload=true"
  className="absolute inset-0 hidden h-full w-full object-cover md:block"
  ...
/>
{/* Mobile: 9:16 vertical */}
<iframe
  src="https://iframe.mediadelivery.net/embed/600055/<NEW_VERTICAL_ID>?autoplay=true&loop=true&muted=true&preload=true"
  className="absolute inset-0 block h-full w-full object-cover md:hidden"
  ...
/>
```

Both wrapped so they cover their parent (no letterboxing on either orientation). Mobile gets the portrait crop that fills the phone screen end-to-end.

## 4. Move the HeroMockup dashboard down

Since the video now owns the hero, the static `HeroMockup` dashboard component becomes redundant up top. I'll either:
- Drop it into the "A closer look" deep-dive section (still useful as product demonstration), or
- Remove it from `index.tsx` entirely (it's also re-used implicitly via the deep-dive mockups).

Default: remove from hero, leave the deep-dive section as-is.

## What you'll need to do

1. Approve this plan.
2. After I render, I'll send you `vektiss-hero-vertical.mp4`. Upload it to your Bunny.net library 600055.
3. Paste the new video ID/embed URL to me — I'll plug it into the mobile iframe in 30 seconds.

## Files touched

- `remotion/src/MainVideoVertical.tsx` (new)
- `remotion/src/Root.tsx` (add vertical composition)
- `remotion/scripts/render-remotion.mjs` (accept composition id arg)
- `src/routes/index.tsx` (full-bleed hero, dual iframes)
