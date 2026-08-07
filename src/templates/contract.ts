import type { ComponentType } from "react";

import type { BlockInstance, PageTheme } from "@/blocks/types";

export interface TemplateManifest {
  /** Stable plugin id — matches `templates.plugin_id` in the database. */
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  priceCents: number;
  isPremium: boolean;
  coverGradient: string;
  accentEmoji: string;
  features: string[];
  /** Default PIN for template protection - users can change this when creating */
  defaultPin?: string;
  /** Whether PIN protection is enabled by default */
  pinProtected?: boolean;
}

export interface TemplateRendererProps {
  blocks: BlockInstance[];
  theme: PageTheme;
  mode: "edit" | "view";
}

export interface TemplatePlugin {
  manifest: TemplateManifest;
  theme: PageTheme;
  /** Ambient motion presets the renderer applies to the page shell. */
  animations: {
    entrance: "fade" | "rise" | "zoom";
    ambient: "none" | "aurora" | "drift";
  };
  /** Default block composition seeded into a new page. */
  blocks: BlockInstance[];
  Renderer: ComponentType<TemplateRendererProps>;
}

export function defineTemplate(plugin: TemplatePlugin): TemplatePlugin {
  return plugin;
}
