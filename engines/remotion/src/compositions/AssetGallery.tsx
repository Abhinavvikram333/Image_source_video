// Asset-gallery video: a guided tour of everything the Remotion engine can
// currently draw — the full logo registry + a demo of each reusable element.
// Each section is captioned so you know what you're looking at.

import { AbsoluteFill, Sequence } from "remotion";
import { listAssets, resolveConcept } from "../lib/assets";
import { LogoGrid } from "../elements/LogoGrid";
import { LogoCard } from "../elements/LogoCard";
import { TextReveal } from "../elements/TextReveal";
import { Arrow } from "../elements/Arrow";

const Caption: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => (
  <div style={{ position: "absolute", top: 36, left: 60, fontFamily: "sans-serif" }}>
    <div style={{ color: "#4ade80", fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>
      {kicker}
    </div>
    <div style={{ color: "#fff", fontSize: 40, fontWeight: 800 }}>{title}</div>
  </div>
);

export const AssetGallery: React.FC = () => {
  const count = listAssets().length;
  return (
    <AbsoluteFill style={{ background: "#0b0c0f" }}>
      {/* 0:00 — title */}
      <Sequence durationInFrames={75}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 24 }}>
          <TextReveal size={88}>Remotion Asset Library</TextReveal>
          <TextReveal size={36} startInSeconds={0.4} color="#9aa0ad">
            {`${count} brand logos · 4 reusable elements`}
          </TextReveal>
        </AbsoluteFill>
      </Sequence>

      {/* 0:02.5 — full logo registry */}
      <Sequence from={75} durationInFrames={165}>
        <AbsoluteFill>
          <Caption kicker="REGISTRY" title="Brand logos (Simple Icons + custom)" />
          <AbsoluteFill style={{ justifyContent: "center", marginTop: 60 }}>
            <LogoGrid startInSeconds={0.2} columns={5} />
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* 0:08 — element: LogoCard */}
      <Sequence from={240} durationInFrames={105}>
        <AbsoluteFill>
          <Caption kicker="ELEMENT" title="LogoCard — pop-in branded card" />
          <LogoCard assetId={resolveConcept("cache")!} label="Cache (Redis)" startInSeconds={0.3} />
        </AbsoluteFill>
      </Sequence>

      {/* 0:11.5 — element: TextReveal */}
      <Sequence from={345} durationInFrames={105}>
        <AbsoluteFill>
          <Caption kicker="ELEMENT" title="TextReveal — rise & fade titles" />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 28 }}>
            <TextReveal size={72} startInSeconds={0.3}>Time Complexity</TextReveal>
            <TextReveal size={48} startInSeconds={0.8} color="#4ade80">O(n log n)</TextReveal>
            <TextReveal size={32} startInSeconds={1.3} color="#9aa0ad">
              stack reveals to build an explanation
            </TextReveal>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* 0:15 — element: Arrow */}
      <Sequence from={450} durationInFrames={120}>
        <AbsoluteFill>
          <Caption kicker="ELEMENT" title="Arrow — self-drawing connectors" />
          <Arrow from={[250, 420]} to={[640, 420]} startInSeconds={0.4} durationInSeconds={0.7} />
          <Arrow from={[640, 420]} to={[1030, 300]} startInSeconds={1.2} durationInSeconds={0.7} color="#60a5fa" />
          <Arrow from={[640, 420]} to={[1030, 540]} startInSeconds={1.2} durationInSeconds={0.7} color="#60a5fa" />
          <div style={{ position: "absolute", left: 180, top: 460, color: "#cfd2da", fontFamily: "sans-serif", fontSize: 24 }}>Client</div>
          <div style={{ position: "absolute", left: 560, top: 460, color: "#cfd2da", fontFamily: "sans-serif", fontSize: 24 }}>Balancer</div>
          <div style={{ position: "absolute", left: 1000, top: 270, color: "#cfd2da", fontFamily: "sans-serif", fontSize: 24 }}>Server</div>
          <div style={{ position: "absolute", left: 1000, top: 560, color: "#cfd2da", fontFamily: "sans-serif", fontSize: 24 }}>Server</div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
