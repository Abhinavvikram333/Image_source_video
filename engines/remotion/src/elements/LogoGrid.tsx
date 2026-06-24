// Showcase element: a staggered grid of every brand logo in the registry, each
// tile fading/scaling in. Used by the asset-gallery video so you can see the
// full icon set at a glance.

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { getLogoArt, listAssets } from "../lib/assets";

export const LogoGrid: React.FC<{ startInSeconds?: number; columns?: number }> = ({
  startInSeconds = 0,
  columns = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const base = frame - startInSeconds * fps;
  const assets = listAssets();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 28,
        padding: "40px 60px",
      }}
    >
      {assets.map((asset, i) => {
        const local = base - i * 3; // stagger each tile
        const pop = spring({ frame: local, fps, config: { damping: 14, mass: 0.5 } });
        const opacity = interpolate(local, [0, 8], [0, 1], { extrapolateRight: "clamp" });
        const art = getLogoArt(asset.id);
        const brand = art?.hex ?? "#7c8190";
        return (
          <div
            key={asset.id}
            style={{
              transform: `scale(${pop})`,
              opacity,
              background: "#15161a",
              borderRadius: 20,
              boxShadow: `inset 0 0 0 1px ${brand}44`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "22px 10px",
            }}
          >
            {art ? (
              <svg viewBox="0 0 24 24" width={64} height={64} fill={brand}>
                <path d={art.path} />
              </svg>
            ) : (
              <div style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", color: brand, fontSize: 12, textAlign: "center" }}>
                {asset.kind}
              </div>
            )}
            <div style={{ color: "#cfd2da", fontSize: 18, fontFamily: "sans-serif", fontWeight: 600 }}>
              {asset.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
