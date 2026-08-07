import type { ExternalTemplatePlugin } from "./types";

// Auto-discovers every plugin under src/external-templates/*/index.ts
// Adding a new template = drop a folder + index.ts — nothing else changes.
const modules = import.meta.glob<{ default: ExternalTemplatePlugin }>(
  "../external-templates/*/index.ts",
  { eager: true },
);

const plugins: ExternalTemplatePlugin[] = Object.values(modules)
  .map((m) => m.default)
  .filter(Boolean)
  .sort((a, b) => a.manifest.name.localeCompare(b.manifest.name));

export const externalTemplateRegistry = new Map(
  plugins.map((p) => [p.manifest.id, p]),
);

export const externalTemplateSlugIndex = new Map(
  plugins.map((p) => [p.manifest.slug, p]),
);

export const allExternalTemplates = plugins;

export function getExternalTemplate(id: string): ExternalTemplatePlugin | undefined {
  return externalTemplateRegistry.get(id);
}

export function getExternalTemplateBySlug(slug: string): ExternalTemplatePlugin | undefined {
  return externalTemplateSlugIndex.get(slug);
}
