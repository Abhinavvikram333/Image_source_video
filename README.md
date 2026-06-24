# DSA Champ — Video Element Library

A library of reusable video **elements** so educational videos (DSA, ML/AI,
programming languages, system concepts like load balancers & APIs) are
**composed** from building blocks instead of drawn from scratch — and so an AI
can assemble them.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full design. Short version:

- **Two engines, each best at its job, one shared asset registry.**
  - `engines/manim/` — **algorithm slot** (DSA viz, Python)
  - `engines/remotion/` — **concept slot** (logos/diagrams, React)
- **Hybrid assets**: reference Simple Icons / Devicon (no duplicated icons);
  add custom SVGs only where coverage is missing.
- **Resolution layer**: a concept string (`"load balancer"`) routes to an asset
  id, so scripts talk in concepts, not file paths.

## Layout

```
registry/      asset manifest (assets.json) + build script + custom/ assets
shared/        concepts.json — concept -> asset routing
engines/
  remotion/    React element library (LogoCard, TextReveal, Arrow) + compositions
  manim/       Python element library (ArrayMobject) + scenes
```

## Setup & render

**Registry** (rebuild the asset manifest from Simple Icons):
```bash
cd registry && npm install && npm run build
```

**Remotion** (concept videos):
```bash
cd engines/remotion && npm install
npx remotion studio                       # live preview/editor
npx remotion render DemoConcept out/demo-concept.mp4
```

**Manim** (algorithm videos) — needs ffmpeg + cairo/pango system libs:
```bash
sudo apt-get install -y ffmpeg libcairo2-dev libpango1.0-dev pkg-config python3-dev
SETUPTOOLS_USE_DISTUTILS=stdlib pip3 install -r engines/manim/requirements.txt
cd engines/manim && python3 -m manim -qm scenes/demo_sort.py DemoSort
```
> Note: the `SETUPTOOLS_USE_DISTUTILS=stdlib` flag works around a Debian/Ubuntu
> setuptools bug when building Manim's `srt` dependency.

## How a video gets made (the flow an AI follows)

1. Script names concepts → `resolveConcept("cache")` → `simple-icons:redis`.
2. The asset id feeds an element → `<LogoCard assetId={...} />` (Remotion) or
   `ArrayMobject([...])` (Manim).
3. A composition arranges elements over time → render → MP4.

## Status

Foundation complete: registry, both element libraries, resolution layer, and a
working sample render per engine. Next: grow the element set and wire the AI
composition step.
