from manim import *

config.pixel_width = 1920
config.pixel_height = 1080
config.frame_rate = 30

class LipSync(Scene):
    def construct(self):
        mouth = SVGMobject("temp.svg")
        mouth.scale(2)

        # Start slightly smaller and transparent
        mouth.set_opacity(0)
        mouth.scale(0.85)

        # Pop into place
        self.play(
            mouth.animate.scale(1 / 0.85).set_opacity(1),
            run_time=0.18,
            rate_func=back_out
        )

        # Small lip movement
        self.play(
            mouth.animate.scale(1.08),
            run_time=0.12,
            rate_func=smooth
        )

        self.play(
            mouth.animate.scale(1 / 1.08),
            run_time=0.12,
            rate_func=smooth
        )

        self.wait(1)