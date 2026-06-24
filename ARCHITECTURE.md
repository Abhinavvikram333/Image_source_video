# DSA Champ — Video Element Library Architecture

DSA Champ generates educational videos (DSA, ML/AI, programming languages,
system concepts like load balancers & APIs) by **composing reusable elements**
instead of drawing every video from scratch.

## The two-slot engine model

Different content needs different tools. We use **two engines**, each best at
its job, sharing one engine-agnostic asset registry.

| Slot          | Content                                              | Engine    | Language |
|---------------|-----------------------------------------------------|-----------|----------|
| **Algorithm** | DSA: arrays, trees, graphs, sorting, recursion      | Manim     | Python   |
| **Concept**   | Logos, diagrams, load balancer, API, ML, languages  | Remotion  | React/TS |

Why two: algorithm videos (an animated array swapping) and concept videos (the
Redis logo + arrows) share almost no visual elements, so the duplication cost is
small and each engine does what it is genuinely best at.

## The four layers

```
┌─────────────────────────────────────────────────────────────┐
│ 4. COMPOSITION   topic/script -> assembled video             │
│    (AI writes a scene that arranges elements over time)      │
├─────────────────────────────────────────────────────────────┤
│ 3. RESOLUTION    concept text -> asset id                    │
│    "redis" / "cache db" -> simple-icons:redis                │
│    (shared/concepts.json; keyword now, embeddings later)     │
├─────────────────────────────────────────────────────────────┤
│ 2. ELEMENTS      reusable animated building blocks           │
│    Remotion: LogoCard, TextReveal, Arrow (React components)  │
│    Manim:    Array, Pointer, Tree (mobjects)                 │
├─────────────────────────────────────────────────────────────┤
│ 1. REGISTRY      engine-agnostic asset manifest (JSON)       │
│    points at Simple Icons / Devicon / Iconify + custom svgs  │
│    NO duplicated icon storage — references existing sets     │
└─────────────────────────────────────────────────────────────┘
```

Build order: **1 → 2 → 4 → 3**. Most people start at 4 (the video) and stall;
we start at the registry so everything above it has something to stand on.

## Asset strategy: hybrid

- **Reuse**: Simple Icons (3000+ brand logos), Devicon (dev/tech), Iconify.
- **Custom**: add our own SVGs only where coverage is missing.
- The registry stores **metadata + a pointer**, never a duplicated copy of an
  icon that already lives in an upstream set.

## Repo layout

```
registry/        layer 1 — asset manifest + build script
shared/          layer 3 — concept -> asset routing
engines/
  remotion/      concept slot — React element library + compositions
  manim/         algorithm slot — Python mobject library + scenes
```

## Status

- [ ] Registry schema + build script
- [ ] Remotion: elements + sample render
- [ ] Manim: elements + sample render
- [ ] Resolution layer (keyword)
- [ ] AI composition flow
