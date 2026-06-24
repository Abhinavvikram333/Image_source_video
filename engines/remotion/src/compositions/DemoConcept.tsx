// Demo composition — proves the full chain: a concept string flows through the
// resolution layer (shared/concepts.json) to a registry asset, which an element
// (LogoCard) draws. This is the shape an AI-generated scene will take.

import { AbsoluteFill, Sequence } from "remotion";
import { resolveConcept } from "../lib/assets";
import { LogoCard } from "../elements/LogoCard";
import { TextReveal } from "../elements/TextReveal";

export const DemoConcept: React.FC = () => {
  // The AI would emit these concept strings from a script; resolution does the routing.
  const balancer = resolveConcept("load balancer")!; // -> simple-icons:nginx
  const cache = resolveConcept("cache")!; // -> simple-icons:redis

  return (
    <AbsoluteFill style={{ background: "#0b0c0f" }}>
      <Sequence durationInFrames={60}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <TextReveal size={84}>System Design Basics</TextReveal>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={60} durationInFrames={70}>
        <LogoCard assetId={balancer} label="Load Balancer" />
      </Sequence>

      <Sequence from={130} durationInFrames={70}>
        <LogoCard assetId={cache} label="Cache (Redis)" />
      </Sequence>
    </AbsoluteFill>
  );
};
