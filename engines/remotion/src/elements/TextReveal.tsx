// Reusable element: a line of text that rises and fades in. Use for titles,
// captions, definitions.

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TextReveal: React.FC<{
  children: React.ReactNode;
  startInSeconds?: number;
  size?: number;
  color?: string;
}> = ({ children, startInSeconds = 0, size = 64, color = "#ffffff" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startInSeconds * fps;

  const rise = spring({ frame: local, fps, config: { damping: 18 } });
  const y = interpolate(rise, [0, 1], [40, 0]);
  const opacity = interpolate(local, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        color,
        fontSize: size,
        fontWeight: 800,
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};
