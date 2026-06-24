import { Composition } from "remotion";
import { DemoConcept } from "./compositions/DemoConcept";
import { AssetGallery } from "./compositions/AssetGallery";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DemoConcept"
        component={DemoConcept}
        durationInFrames={200}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="AssetGallery"
        component={AssetGallery}
        durationInFrames={570}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
