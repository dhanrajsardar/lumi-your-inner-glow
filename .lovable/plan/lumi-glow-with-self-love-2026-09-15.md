# Lumi — Glow with Self-Love

A mobile-only app, always shown inside a phone-shaped frame centered on screen (max 430px wide). Soft lavender/cream atmosphere, lots of empty space, Lumi the fluffy grey cloud-cat floating in the middle.

## The feeling

- No hard white, no neon, no pink-and-sparkles overload. Soft, private, warm, alive.
- Lumi is the highest-contrast thing on screen, with a gentle glow around it.
- Lumi is never fully still: slow breathing, tiny floating drift, occasional blink, soft eye movement.
- Lumi speaks first sometimes ("Hey you ♡", "Come here.", "You made it to today."), and it changes by time of day — not a quote generator.

## Screens

**Home (the safe space)**
Lumi centered, a soft line above asking "How are you, really?", and one glowing pill button: **Hug Lumi**. Under it, four very soft choices: Not okay · A little off · I'm okay · I just want Lumi. No emotional problem list on the home screen.

**The Hug (3–5 seconds, zero effort)**
Tap → background softens, Lumi drifts forward and grows until it warmly fills the screen, phone buzzes small–small–warm. Text: "I've got you. Breathe with me." Then a gentle breathing circle, then release.
After the hug, and only then, the soft mood scan appears: body/self-doubt, a mistake, loneliness, something else. Each gives a short spoken-by-Lumi exercise rather than a wall of text.

**Feed Lumi (daily challenge)**
"Lumi is hungry! Feed him by writing 1 thing you like about your smile today." Writing it makes Lumi bounce, dance and sparkle, and earns Love Coins.

**Let it go (inner-critic release)**
Type the ugly thought, then drag the text into a swirling black hole. It stretches, gets pulled in, vanishes with a satisfying buzz. Lumi: "That wasn't your reality. It's gone now."

**Lumi's room (shop + wardrobe)**
Spend Love Coins on little hats, glasses, blankets, rainbow backgrounds. Purchases show on Lumi everywhere in the app.

**Night journal**
"Before you go… what's one thing you're proud of?" One line, saved to a soft list of past nights.

**Bottom navigation**
Premium, thumb-friendly bar: Home · Feed · Let go · Room · You. Clean top status strip showing Love Coins and the day's greeting.

## Lumi's emotional language

- Happy → Lumi expands, dances, sparkles
- Sad → Lumi comes closer
- Lonely → Lumi sits beside you
- Anxious → Lumi breathes slowly with you
- Shame → Lumi hides under a tiny blanket
- Mistake → Lumi shrugs, "it's okay"

## Never punish absence

No streak loss, no guilt, no "you missed 5 days". Coming back says: "Hey. You're back. 🤍 No catching up needed."

## Technical notes

- Single TanStack Start app; `/` is the home screen, sibling routes for feed, release, room, and journal, all rendered inside a shared phone-frame layout that clamps width to 430px and centers on desktop.
- Design tokens (lavender/cream/glow, radii, soft shadows) added to `src/styles.css`; no hardcoded colors in components.
- Lumi is drawn as an inline SVG component driven by a mood prop, animated with CSS/Motion — not a static image — so it can breathe, blink, approach, expand and wear accessories. The uploaded picture is the shape reference.
- Haptics via the Vibration API where supported, silently ignored elsewhere.
- Everything (coins, entries, owned items, last-visit) saved on the device with local storage; no accounts, no backend for now. Cloud sync across devices can be added later if you want it.
