/**
 * Combined template source.
 * Merges block-based templates (src/templates/) and external templates
 * (src/external-templates/) into a single unified list the marketplace uses.
 *
 * Shape exposed is the minimal set the marketplace card + detail page need.
 */

import { allTemplates as blockTemplates }   from "@/templates/registry";
import { allExternalTemplates }             from "@/engine/registry";

export type UnifiedTemplate = {
  id:             string;
  slug:           string;
  name:           string;
  tagline:        string;
  description:    string;
  category:       string;
  tags:           string[];
  priceCents:     number;
  isPremium:      boolean;
  coverGradient:  string;
  accentEmoji:    string;
  features:       string[];
  thumbnailUrl?:  string;
  /** "block" uses the existing block-based editor; "external" uses the new template editor */
  kind:           "block" | "external";
  /** Default PIN for template protection - users can change this when creating */
  defaultPin?: string;
  /** Whether PIN protection is enabled by default */
  pinProtected?: boolean;
};

function fromBlock(): UnifiedTemplate[] {
  return blockTemplates.map((p) => ({
    id:            p.manifest.id,
    slug:          p.manifest.slug,
    name:          p.manifest.name,
    tagline:       p.manifest.tagline,
    description:   p.manifest.description,
    category:      p.manifest.category,
    tags:          p.manifest.tags,
    priceCents:    p.manifest.priceCents,
    isPremium:     p.manifest.isPremium,
    coverGradient: p.manifest.coverGradient,
    accentEmoji:   p.manifest.accentEmoji,
    features:      p.manifest.features,
    kind:          "block" as const,
    defaultPin:     p.manifest.defaultPin,
    pinProtected:   p.manifest.pinProtected,
  }));
}

function fromExternal(): UnifiedTemplate[] {
  return allExternalTemplates.map((p) => ({
    id:            p.manifest.id,
    slug:          p.manifest.slug,
    name:          p.manifest.name,
    tagline:       p.manifest.tagline,
    description:   p.manifest.description,
    category:      p.manifest.category,
    tags:          p.manifest.tags,
    priceCents:    p.manifest.priceCents,
    isPremium:     p.manifest.isPremium,
    coverGradient: p.manifest.coverGradient,
    accentEmoji:   p.manifest.accentEmoji,
    features:      p.manifest.features,
    thumbnailUrl:  p.manifest.thumbnailUrl,
    kind:          "external" as const,
    defaultPin:     p.manifest.defaultPin,
    pinProtected:   p.manifest.pinProtected,
  }));
}

export const allUnifiedTemplates: UnifiedTemplate[] = [
  ...fromExternal(),   // Only live external templates
];

export function getUnifiedTemplate(idOrSlug: string): UnifiedTemplate | undefined {
  return allUnifiedTemplates.find(
    (t) => t.id === idOrSlug || t.slug === idOrSlug,
  );
}
