# My Shorts — Faceless Videos

Code-built short films (no AI image/video generation — pure canvas drawing, Kokoro ONNX voice, faster-whisper timing, numpy sound design, headless-Chrome capture, ffmpeg). Built with the **faceless-videos v2** skill, Stickman style.

## Film 1 — WHAT IF THE INTERNET WENT OFF FOR 30 DAYS? (Part 1)

Tuesday, 9:14 a.m. — every screen goes gray. Not the power. The internet.
A 5-step Day 1 plan (CASH → MAPS → RADIO → PEOPLE → PAPER), a quiet day 7, and a day 30 twist: the router blinks green and an UNKNOWN caller messages *"We saw your router. Good house. Keep it ready."*

- **Runtime:** 98.5 s (1:38)
- **Style:** Stickman, 24 fps
- **Voice:** Kokoro `am_michael`
- **Music/sound:** original numpy-scored mix, 96 cues
- **Label:** fiction (fact-check note in `script.txt`)

### Deliverables

| File | Format | Size |
|---|---|---|
| `internet-off-30/videos/internet-off-30_16x9_share.mp4` | 1920×1080 | 32.9 MB |
| `internet-off-30/videos/internet-off-30_9x16_share.mp4` | 1080×1920 | 33.0 MB |
| `internet-off-30/covers/internet-off-30_cover_16x9.jpg` | title thumbnail (16:9) | — |
| `internet-off-30/covers/internet-off-30_cover_9x16.jpg` | title thumbnail (9:16) | — |

Full-quality masters (1920×1080 / 1080×1920, AAC 320k, ~500 MB each) exceed GitHub's git file limit and are kept out of this repo — rebuild them from source (below) for identical output.

### Post kit

**Title (16:9):** What If the Internet Went OFF for 30 Days? (Part 1) — Day 1 Survival Plan
**Title (9:16):** The Internet Went Off for 30 Days. Here's Day 1.

**Hashtags:** #shortfilm #survival #storytime #stickman #dystopia #whatif #Part2

**End card:** PART 2 — "the router comes back on… and something starts messaging you at 4:02 a.m."

## Project structure (`internet-off-30/`)

```
script.txt        40 lines: cold open + 5 steps + day 7 + day 30 twist + Part 2 hook
src/
  main.js         project entry (style: stickman)
  shots.js        40-shot graph: cut/wd timing, camera pushes, custom props
  core/           engine: figure kinematics, view layers, gfx, lib
  sets/           scenes: living room, skyline, ATM, map, phone, radio...
data/
  lines.json      narrator lines + Whisper-aligned timings
  words.json      199/213 word-level timings
  cues.json       96 sound-design cues (whoosh, powerdown, blip, land, ...)
  narration.wav   Kokoro voice track (96.7 s)
  mix.wav         final mix 98.50 s, RMS −18.5 dBFS, peak −1.7 dBFS
```

## Rebuilding the full-resolution masters

On a machine with the faceless-videos skill installed (`~/.claude/skills/faceless-videos/`):

```bash
# link/copy this project into the skill's workspace
cp -r internet-off-30 ~/faceless-videos/

cd ~/faceless-videos/internet-off-30
bash check                          # lint the shot graph (40 shots, clean)
node tools/capture.mjs cues data/cues.json

# landscape master (video track)
CHROME=~/.local/bin/google-chrome node tools/capture.mjs video renders/i30_16x9.mp4 0 40 3

# portrait master — AR must be exported in-process
export AR=9x16
CHROME=~/.local/bin/google-chrome node tools/capture.mjs video renders/i30_9x16.mp4 0 40 3

# mux voice+mix
ffmpeg -nostdin -y -i renders/i30_16x9.mp4 -t 98.502 -i data/mix.wav \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest -movflags +faststart \
  renders/internet-off-30_16x9.mp4
# (repeat with -i renders/i30_9x16.mp4 for the portrait master)
```

Render is deterministic — same inputs, same film.

## Part 2?

The hook is set: *Who sent the message?* — Part 2 can pick up on the morning the internet answers back.
