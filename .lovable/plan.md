# Re-time + fully visualize every spoken line

Total length already matches the MP3 (~153s); we re-time scenes to the transcript AND add missing visuals so every phrase has a corresponding on-screen element.

## Master timing (30fps, total 4596 frames / 153.2s)

| # | Scene | Start | Dur (f) | Dur (s) | Visualizes |
|---|---|---:|---:|---:|---|
| 1 | Hook | 0.0s | 96 | 3.2 | "If you own a business, this is for you." |
| 2 | Owner | 3.2s | 174 | 5.8 | "You built it… worked the jobs, managed the team, handled the clients…" |
| 3 | Phone | 9.0s | 78 | 2.6 | "phone rings… you can't get to it. Goes to voicemail." |
| 4 | Truth | 11.6s | 78 | 2.6 | "Here's the truth most owners don't want to hear." |
| 5 | Stat 85% | 14.2s | 105 | 3.5 | "85% of callers never leave a message." |
| 6 | Search | 17.7s | 42 | 1.4 | "They just call the next person on Google." |
| 7 | Calendar | 19.1s | 192 | 6.4 | "Not a missed call — a missed client. Every single day." |
| 8 | Reveal | 25.5s | 75 | 2.5 | "That's why we built Vektiss Voice." |
| 9 | StatCards | 28.0s | 183 | 6.1 | "Done-for-you AI receptionist · under 2 seconds · 24/7." |
| 10 | Waveform | 34.1s | 93 | 3.1 | "Doesn't say 'press one' — it has a conversation." |
| 11 | CallSMS | 37.2s | 330 | 11.0 | "Knows your business, services, hours, team · job / meeting / asleep." |
| 12 | Routing | 48.2s | 564 | 18.8 | "First ring · listens · new lead → intake/quote · urgent → transfer." |
| 13 | Dashboard | 67.0s | 360 | 12.0 | "Instant alert: name, number, ask, form, hot/warm/cold · logged · stop guessing." |
| 14 | Scale | 79.0s | 258 | 8.6 | "Grows with you · multi-location · returning clients · CRM · bilingual." |
| 15 | Guarantee | 87.6s | 306 | 10.2 | "Fully custom · we set it up · keep your number · 30-day guarantee." |
| 16 | CTA | 97.8s | 144 | 4.8 | "Money back. No questions asked." |
| 17 | Close | 102.6s | 1518 | 50.6 | "$45.99/mo · Call the number on your screen." |

## Visuals added/changed so every spoken element is on screen

**S2 Owner** — currently a single mark; add four stagger chips landing on the words "jobs / team / clients / phone rings": JOBS · TEAM · CLIENTS · 📞, then a faint cross-fade into S3.

**S3 Phone** — add the explicit voicemail beat: handset shake → call-strike-through → "VOICEMAIL" label slams in at the word "voicemail."

**S4 Truth** — add the typographic "the truth" reveal: small mono eyebrow "THE TRUTH" + big "Most owners don't want to hear." with a redacted-line wipe under "don't want to hear."

**S5 Stat** — add the 85% counter (0 → 85 tick) finishing exactly on "never leave a message," plus a 100-dot grid where 85 dim out.

**S6 Search (rebuilt)** — snap-cut Google SERP row: "plumber near me" query, 3 result rows, the SECOND result row (a competitor) gets a blue ring + "CALL" tap ripple, all in 1.4s.

**S7 Calendar** — keep red-square heatmap; add a counter overlay "× MISSED CLIENTS" ticking up as the squares fill, holding under "happening every single day."

**S9 StatCards** — add the three explicit beats: "✓ ANSWERS EVERY CALL" → "⏱ UNDER 2 SECONDS" (with 0.0–2.0s timer animating) → "24 / 7" (clock face spinning once).

**S10 Waveform** — split the screen: LEFT a greyed-out IVR menu "Press 1 for sales… Press 2…" with a red strike at "press one," RIGHT a live blue waveform pulsing with the word "conversation."

**S11 CallSMS (re-staggered)** — 4 chips appear on beat with the words: BUSINESS NAME → SERVICES → HOURS → TEAM. Then a small icon row underneath lands on "job / meeting / asleep" (hardhat · calendar · moon).

**S12 Routing (split into 3 sub-beats)**
  - 0–4.8s "first ring with your name, greeting, voice": phone rings ONCE, callout bubble says "Hi, thanks for calling Vektiss — how can I help?"
  - 4.8–15.8s "new lead → warms up → intake/quote sent": an SMS bubble types out, then a form card slides in stamped "SENT" while caller's still on the line.
  - 15.8–18.8s "urgent → transfer to you / on-call": route line snaps from AI node → owner avatar with a "TRANSFERRING…" pill.

**S13 Dashboard** — make the alert literal: phone notification card slides in with rows that type in on beat — Name · Number · "What they asked" · Form sent ✓ · Lead score chip (HOT / WARM / COLD cycling, settles on HOT). Then the dashboard table fills row by row under "everything is logged," and a small headline "STOP GUESSING — START KNOWING" lands at 1:17.

**S14 Scale** — keep node map; add explicit labels that pop on the words: a second & third location pin land on "multiple locations," a returning-client avatar with "👋 Welcome back, Maria" lands on "returning clients," CRM pills (HubSpot · Salesforce · GHL) land on "CRM," and the EN ⇄ ES toggle flips on "bilingual."

**S15 Guarantee** — keep blueprint draw + stamp; add two text chips that land on the words: "WE SET IT UP" and "KEEP YOUR NUMBER" so they're not just implied.

**S16 CTA** — copy becomes "Money back. **No questions asked.**" with the green check landing on "back" and a soft confetti-free pulse on "asked."

**S17 Close (re-phased)**
  - 0–3.5s   Navy in · Vektiss mark · "$45.99 / mo" lands
  - 3.5–7s   Phone-card slides in, glow begins
  - 7–12s    "↓ CALL NOW ↓" pulse arrows under the number
  - 12–24s   Hold with breathing glow on the number
  - 24–40s   vektiss.com fades in at the bottom
  - 40–48s   Subtle scale-down, URL emphasized
  - 48–50.6s Fade to black

## Files touched

- `remotion/src/Root.tsx` — duration → 4596.
- `remotion/src/VoiceAdPOC.tsx` — update `D` to the new frame counts.
- New visuals / re-builds:
  `Scene2Owner.tsx`, `Scene3Phone.tsx`, `Scene4Truth.tsx`, `Scene5Stat.tsx`,
  `Scene6Search.tsx`, `Scene7Calendar.tsx`, `Scene9StatCards.tsx`,
  `Scene10Waveform.tsx`, `Scene11CallSMS.tsx`, `Scene12Routing.tsx`,
  `Scene13Dashboard.tsx`, `Scene14Scale.tsx`, `Scene15Guarantee.tsx`,
  `Scene16CTA.tsx`, `Scene17Close.tsx`.
- Duration-only updates: `Scene1Hook.tsx`, `Scene8Reveal.tsx` (no visual rework needed).

## Audio

After the visuals lock, copy `Sequence 01_1.mp3` → `remotion/public/audio/narration.mp3`, mount `<Audio src={staticFile('audio/narration.mp3')} />` at frame 0 of `VoiceAdPOC`, and render via `render-with-audio.mjs` so the master MP4 ships with the narration baked in. Switch to build mode and I'll execute.
