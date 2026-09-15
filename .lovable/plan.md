# Lumi character and animation polish

## What will change

- Redraw Lumi’s face so each cheek has three clean whisker lines that sit outside the eyes.
- Add distinct, readable expressions for happy, love, calm, sad, anxious, lonely, shy, proud, surprised, sleepy, and comforting moments.
- Turn the hug into a short sequence: Lumi approaches, leans in, wraps soft arms around a glowing heart, squeezes, then breathes with the user.
- Make feeding visual: the submitted words float from the entry area into Lumi’s opening mouth, then Lumi chews, bounces, and celebrates.
- Expand Lumi’s room with fitted hats, glasses, bows, scarves, hoodies, blankets, headphones, and small stickers; every item will preview directly on Lumi.
- Keep the existing soft lavender mobile-frame layout, Love Coins, saved entries, and navigation.

## Technical details

- Extend the inline Lumi drawing rather than embedding the uploaded reference image.
- Add expression and animation states to the character component with CSS motion and reduced-motion fallbacks.
- Extend the existing on-device wardrobe data while preserving current saved purchases.
- Verify home hug, feed, and room at the current 393 × 674 mobile viewport.
