"""Reusable Manim element: an animated array of boxed values.

This is the Manim equivalent of a Remotion "element" — a building block that
algorithm scenes compose, so we never hand-draw boxes per video. Supports the
operations DSA explainers need most: highlight, swap, and pointer labels.
"""

from manim import (
    VGroup,
    Square,
    Text,
    Arrow,
    UP,
    DOWN,
    RIGHT,
    YELLOW,
    GREEN,
    WHITE,
    BLUE_E,
)


class ArrayMobject(VGroup):
    def __init__(self, values, box_size=1.2, **kwargs):
        super().__init__(**kwargs)
        self.values = list(values)
        self.boxes = VGroup()
        self.labels = VGroup()
        for v in self.values:
            box = Square(side_length=box_size, color=WHITE, fill_color=BLUE_E, fill_opacity=0.6)
            label = Text(str(v), font_size=32)
            label.move_to(box.get_center())
            self.boxes.add(box)
            self.labels.add(label)
        self.boxes.arrange(RIGHT, buff=0.15)
        for box, label in zip(self.boxes, self.labels):
            label.move_to(box.get_center())
        self.add(self.boxes, self.labels)

    def highlight(self, i, color=YELLOW):
        """Return an animation-ready style change for box i."""
        return self.boxes[i].animate.set_stroke(color, width=6)

    def settle(self, i, color=GREEN):
        return self.boxes[i].animate.set_fill(color, opacity=0.7)

    def swap_anims(self, i, j):
        """Animations that visually swap elements i and j (boxes stay, labels move)."""
        pos_i = self.boxes[i].get_center()
        pos_j = self.boxes[j].get_center()
        a = self.labels[i].animate.move_to(pos_j)
        b = self.labels[j].animate.move_to(pos_i)
        self.labels[i], self.labels[j] = self.labels[j], self.labels[i]
        self.values[i], self.values[j] = self.values[j], self.values[i]
        return a, b

    def pointer(self, i, text="i", color=YELLOW):
        """A labelled arrow pointing at box i, for loop indices."""
        box = self.boxes[i]
        arrow = Arrow(start=box.get_bottom() + DOWN * 0.9, end=box.get_bottom(), color=color, buff=0.1)
        label = Text(text, font_size=28, color=color).next_to(arrow, DOWN, buff=0.1)
        return VGroup(arrow, label)
