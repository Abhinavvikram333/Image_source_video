"""Demo algorithm scene: one bubble-sort pass, built from the reusable
ArrayMobject element. Render with:

    cd engines/manim
    python3 -m manim -qm scenes/demo_sort.py DemoSort

Output lands in media/videos/.../DemoSort.mp4
"""

import sys
from pathlib import Path

# make the sibling `elements` package importable when run from anywhere
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from manim import Scene, Text, Write, FadeIn, UP, GREEN  # noqa: E402
from elements.array import ArrayMobject  # noqa: E402


class DemoSort(Scene):
    def construct(self):
        title = Text("Bubble Sort — one pass", font_size=40).to_edge(UP)
        self.play(Write(title))

        arr = ArrayMobject([5, 2, 8, 1, 9, 3])
        self.play(FadeIn(arr))
        self.wait(0.3)

        n = len(arr.values)
        for i in range(n - 1):
            ptr = arr.pointer(i, text="j")
            self.play(FadeIn(ptr), run_time=0.2)
            self.play(arr.highlight(i), arr.highlight(i + 1), run_time=0.3)
            if arr.values[i] > arr.values[i + 1]:
                self.play(*arr.swap_anims(i, i + 1), run_time=0.5)
            self.play(FadeIn(ptr.copy().set_opacity(0)), run_time=0.1)  # spacer
            self.remove(ptr)

        # largest element has bubbled to the end
        self.play(arr.settle(n - 1, GREEN))
        self.wait(0.5)
