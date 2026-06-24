// Registry bridge — the only place Remotion touches the engine-agnostic layers.
// Reads registry/assets.json (layer 1) + shared/concepts.json (layer 3) and
// turns a concept string ("load balancer") into drawable SVG data.

import * as simpleIcons from "simple-icons";
import registry from "../../../../registry/assets.json";
import conceptsFile from "../../../../shared/concepts.json";

export type Asset = {
  id: string;
  name: string;
  kind: string;
  source: string;
  ref?: string;
  tags?: string[];
  hex?: string;
  license?: string;
};

const ASSETS: Asset[] = registry as Asset[];
const CONCEPTS: Record<string, { asset: string; also?: string[] }> =
  (conceptsFile as any).concepts;

// slug -> simple-icons icon ({ title, hex, path, slug })
const SI_BY_SLUG: Record<string, any> = {};
for (const key of Object.keys(simpleIcons)) {
  const icon = (simpleIcons as any)[key];
  if (icon && typeof icon === "object" && icon.slug) SI_BY_SLUG[icon.slug] = icon;
}

export function getAsset(id: string): Asset | undefined {
  return ASSETS.find((a) => a.id === id);
}

/** All registry assets, for galleries/catalogs. */
export function listAssets(): Asset[] {
  return ASSETS;
}

/** Resolve a concept phrase -> asset id (layer 3). Keyword match for now;
 *  swap the body for embeddings later without changing callers. */
export function resolveConcept(phrase: string): string | undefined {
  const key = phrase.trim().toLowerCase();
  if (CONCEPTS[key]) return CONCEPTS[key].asset;
  // loose fallback: any concept whose words all appear in the phrase
  for (const [c, v] of Object.entries(CONCEPTS)) {
    if (c.split(" ").every((w) => key.includes(w))) return v.asset;
  }
  // last resort: tag match against the registry
  const hit = ASSETS.find((a) => a.tags?.some((t) => key.includes(t)));
  return hit?.id;
}

export type LogoArt = { path: string; hex: string; title: string } | null;

/** Get drawable SVG path data for a simple-icons asset id. */
export function getLogoArt(assetId: string): LogoArt {
  const asset = getAsset(assetId);
  if (!asset || asset.source !== "simple-icons" || !asset.ref) return null;
  const icon = SI_BY_SLUG[asset.ref];
  if (!icon) return null;
  return { path: icon.path, hex: `#${icon.hex}`, title: icon.title };
}
