// Builds registry/assets.json by reading real metadata from the `simple-icons`
// npm package and merging any local custom assets. Run: node build-registry.mjs
//
// We store METADATA + a slug pointer, not the SVG itself — the SVG is pulled
// from simple-icons at render time. This keeps the registry tiny and avoids
// duplicating 3000+ icons we don't own.

import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_DIR = join(__dirname, "..");

// The concepts DSA Champ talks about most. Each maps to a simple-icons slug.
// Add freely — this is the curated subset we actually use, not all 3000.
const CURATED = [
  { slug: "python", tags: ["language", "scripting", "backend"] },
  { slug: "redis", tags: ["cache", "database", "in-memory", "key-value"] },
  { slug: "docker", tags: ["container", "devops", "image"] },
  { slug: "postgresql", tags: ["database", "sql", "relational"] },
  { slug: "nginx", tags: ["load-balancer", "reverse-proxy", "web-server"] },
  { slug: "kubernetes", tags: ["orchestration", "container", "devops"] },
  { slug: "tensorflow", tags: ["ml", "ai", "deep-learning", "neural-network"] },
  { slug: "pytorch", tags: ["ml", "ai", "deep-learning", "neural-network"] },
  { slug: "javascript", tags: ["language", "frontend", "web"] },
  { slug: "typescript", tags: ["language", "typed", "web"] },
  { slug: "react", tags: ["frontend", "ui", "framework"] },
  { slug: "mongodb", tags: ["database", "nosql", "document"] },
  { slug: "graphql", tags: ["api", "query-language"] },
  { slug: "amazonwebservices", tags: ["cloud", "infrastructure", "aws"] },
];

// simple-icons v13 exposes named exports (siRedis, ...) — build a slug->icon
// map once so we can look up by the stable slug regardless of export naming.
let SLUG_MAP = null;
async function slugMap() {
  if (SLUG_MAP) return SLUG_MAP;
  const si = await import("simple-icons");
  SLUG_MAP = {};
  for (const key of Object.keys(si)) {
    const icon = si[key];
    if (icon && typeof icon === "object" && icon.slug) SLUG_MAP[icon.slug] = icon;
  }
  return SLUG_MAP;
}

async function loadSimpleIcon(slug) {
  const map = await slugMap();
  return map[slug] ?? null;
}

async function loadCustom() {
  const dir = join(REGISTRY_DIR, "custom");
  let files = [];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const out = [];
  for (const f of files.filter((f) => f.endsWith(".json"))) {
    const meta = JSON.parse(await readFile(join(dir, f), "utf8"));
    out.push(meta);
  }
  return out;
}

async function main() {
  const assets = [];
  const missing = [];

  for (const { slug, tags } of CURATED) {
    const icon = await loadSimpleIcon(slug);
    if (!icon) {
      missing.push(slug);
      continue;
    }
    assets.push({
      id: `simple-icons:${slug}`,
      name: icon.title,
      kind: "logo",
      source: "simple-icons",
      ref: slug,
      tags,
      hex: icon.hex,
      license: "CC0-1.0 (Simple Icons); brand logos remain trademarks of owners",
    });
  }

  assets.push(...(await loadCustom()));

  assets.sort((a, b) => a.id.localeCompare(b.id));
  await writeFile(
    join(REGISTRY_DIR, "assets.json"),
    JSON.stringify(assets, null, 2) + "\n",
  );

  console.log(`Wrote ${assets.length} assets to registry/assets.json`);
  if (missing.length) {
    console.warn(`  Skipped (not found in simple-icons): ${missing.join(", ")}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
