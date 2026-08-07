import type { TemplatePlugin } from "./contract";

/**
 * Plugin auto-discovery.
 *
 * Every folder under `src/templates/<id>/index.ts` that default-exports a
 * `TemplatePlugin` is registered here automatically. Adding a template means
 * adding a folder — no file in the platform needs to change.
 */
const modules = import.meta.glob<{ default: TemplatePlugin }>("./*/index.ts", { eager: true });

const plugins: TemplatePlugin[] = Object.values(modules)
  .map((m) => m.default)
  .filter(Boolean)
  .sort((a, b) => a.manifest.name.localeCompare(b.manifest.name));

export const templateRegistry = new Map(plugins.map((p) => [p.manifest.id, p]));
export const templateSlugIndex = new Map(plugins.map((p) => [p.manifest.slug, p]));

export const allTemplates = plugins;

export function getTemplate(id: string) {
  return templateRegistry.get(id);
}

export function getTemplateBySlug(slug: string) {
  return templateSlugIndex.get(slug);
}

export function templateCategories() {
  const counts = new Map<string, number>();
  for (const p of plugins) {
    counts.set(p.manifest.category, (counts.get(p.manifest.category) ?? 0) + 1);
  }
  return [...counts.entries()].map(([slug, count]) => ({ slug, count }));
}
