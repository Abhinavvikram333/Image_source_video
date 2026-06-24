// Reusable element: a straight arrow that draws itself from start to end.
// Use to connect concepts (client -> load balancer -> servers).

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Arrow: React.FC<{
  from: [number, number];
  to: [number, number];
  startInSeconds?: number;
  durationInSeconds?: number;
  color?: string;
  width?: number;
}> = ({ from, to, startInSeconds = 0, durationInSeconds = 0.6, color = "#4ade80", width = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startInSeconds * fps;

  const progress = interpolate(local, [0, durationInSeconds * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = from[0] + (to[0] - from[0]) * progress;
  const y = from[1] + (to[1] - from[1]) * progress;
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const head = 22;

  return (
    <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%">
      <line x1={from[0]} y1={from[1]} x2={x} y2={y} stroke={color} strokeWidth={width} strokeLinecap="round" />
      {progress > 0.98 && (
        <polygon
          points={`0,${-head} ${head * 1.4},0 0,${head}`}
          fill={color}
          transform={`translate(${to[0]},${to[1]}) rotate(${(angle * 180) / Math.PI})`}
        />
      )}
    </svg>
  );
};
