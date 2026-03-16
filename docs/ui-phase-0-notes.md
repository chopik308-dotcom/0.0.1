# UI Phase-0 Notes (what changed and why)

## What I changed in UI

1. Reframed 4 screens into canonical names:
   - Zero Room: Wake
   - Zero Room: System Status
   - Session Shell: Orientation
   - Session Anchor: Input
2. Removed prison-control wording and replaced it with subject-to-self semantics.
3. Kept the severe instrument surface:
   - deep black background
   - white typographic hierarchy
   - sparse red accents
   - echo text effect and scanline texture
4. Added interactive loop primitives directly in UI:
   - import notes action
   - map snapshot action
   - entourage chat input

## Why this was done

- Align with phase-0 visual canon while keeping ontology safe (no prison simulator semantics).
- Keep screens meaningful and connected to system tasks instead of decorative dashboard behavior.
- Make the scaffold actually testable from browser + local API.

## What is still intentionally simple

- No Next.js yet (current UI is static shell for speed and clarity).
- Motion/reactivity is lightweight, not full adaptive interface implementation.
- Map is API-backed snapshot interaction, not full graph renderer yet.
