// Reusable element: a rounded card showing a brand logo that pops in and
// settles, with the brand color as a glow. Driven entirely by the registry —
// pass an asset id and it draws the right logo.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { getAsset, getLogoArt } from "../lib/assets";

export const LogoCard: React.FC<{
  assetId: string;
  /** seconds into the composition when this card starts animating */
  startInSeconds?: number;
  label?: string;
}> = ({ assetId, startInSeconds = 0, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startInSeconds * fps;

  const art = getLogoArt(assetId);
  const asset = getAsset(assetId);
  const brand = art?.hex ?? "#888";
  const title = label ?? asset?.name ?? assetId;

  const pop = spring({ frame: local, fps, config: { damping: 12, mass: 0.6 } });
  const opacity = interpolate(local, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          transform: `scale(${pop})`,
          opacity,
          width: 360,
          height: 360,
          borderRadius: 48,
          background: "#15161a",
          boxShadow: `0 0 120px ${brand}55, inset 0 0 0 2px ${brand}33`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {art ? (
          <svg viewBox="0 0 24 24" width={160} height={160} fill={brand}>
            <path d={art.path} />
          </svg>
        ) : (
          <div style={{ color: "#fff", fontSize: 28 }}>{title}</div>
        )}
        <div style={{ color: "#fff", fontSize: 40, fontWeight: 700, fontFamily: "sans-serif" }}>
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};
