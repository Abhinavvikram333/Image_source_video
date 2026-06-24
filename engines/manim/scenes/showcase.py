"""Element showcase: a guided tour of everything the Manim engine can currently
draw — the ArrayMobject element and each of its operations. Captioned per
section so you know what you're looking at.

    cd engines/manim
    python3 -m manim -qm scenes/showcase.py ElementShowcase
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from manim import (  # noqa: E402
    Scene,
    Text,
    Write,
    FadeIn,
    FadeOut,
    Transform,
    UP,
    GREEN,
    YELLOW,
)
from elements.array import ArrayMobject  # noqa: E402


class ElementShowcase(Scene):
    def construct(self):
        kicker = Text("MANIM ELEMENT LIBRARY", font_size=24, color=GREEN).to_edge(UP)
        self.play(Write(kicker))

        caption = Text("ArrayMobject — boxed values", font_size=30).to_edge(UP).shift(0.55 * UP)
        self.play(FadeIn(caption))

        # 1. Build
        arr = ArrayMobject([5, 2, 8, 1, 9, 3])
        self.play(FadeIn(arr))
        self.wait(0.4)

        def set_caption(text):
            new = Text(text, font_size=30).to_edge(UP).shift(0.55 * UP)
            self.play(Transform(caption, new), run_time=0.4)

        # 2. Pointer
        set_caption("pointer() — loop index labels")
        ptr = arr.pointer(2, text="i")
        self.play(FadeIn(ptr))
        self.wait(0.5)
        self.play(FadeOut(ptr))

        # 3. Highlight
        set_caption("highlight() — focus a comparison")
        self.play(arr.highlight(0), arr.highlight(1))
        self.wait(0.5)

        # 4. Swap
        set_caption("swap() — animate element exchange")
        self.play(*arr.swap_anims(0, 1), run_time=0.7)
        self.wait(0.5)

        # 5. Settle
        set_caption("settle() — mark a value as done")
        self.play(arr.settle(len(arr.values) - 1, GREEN))
        self.wait(0.6)

        set_caption("compose these into any DSA animation")
        self.wait(0.8)
