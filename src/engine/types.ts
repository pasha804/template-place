/**
 * Generic Template Engine — types
 *
 * Every external template (Birthday, Proposal, Wedding…) registers a
 * TemplatePlugin2 that describes:
 *  - manifest   : metadata shown in the marketplace
 *  - schema     : all configurable fields, grouped into sections
 *  - defaults   : initial values for every field
 *  - Renderer   : React component that receives `config` + renders the template
 *
 * The editor iterates over schema sections/fields and renders the appropriate
 * input widget for each field.  No template-specific code lives in the editor.
 */

import type { ComponentType } from "react";

/* ─── field kinds ──────────────────────────────────────────────────────── */
export type FieldKind =
  | "text"           // single-line string
  | "textarea"       // multi-line string (letter, wishes…)
  | "pin"            // 4-6 digit numeric string
  | "color"          // hex color
  | "image"          // URL or base64
  | "gif"            // URL or base64
  | "audio"          // URL or base64
  | "video"          // URL or base64
  | "boolean"        // toggle
  | "number"         // integer / float
  | "range"          // min/max slider
  | "select"         // dropdown enum
  | "list-text"      // string[]
  | "list-image"     // string[]  (URLs)
  | "list-cards"     // { text, icon? }[]
  | "date"           // ISO date string
  | "font"           // font family string
  | "gradient";      // CSS gradient string

export interface SelectOption {
  label: string;
  value: string;
}

/* ─── field definition ─────────────────────────────────────────────────── */
export interface FieldDef {
  key: string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
  help?: string;
  options?: SelectOption[];   // for "select"
  min?: number;               // for "number" / "range"
  max?: number;
  step?: number;
  rows?: number;              // for "textarea"
  accept?: string;            // file accept filter
}

/* ─── section ──────────────────────────────────────────────────────────── */
export interface SectionDef {
  key: string;
  label: string;
  icon?: string;              // emoji or lucide icon name
  fields: FieldDef[];
}

/* ─── page settings (universal) ────────────────────────────────────────── */
export interface PageSettings {
  title: string;
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
  slug: string;
  pinCode: string;
  passwordHash: string;
  expiresAt: string;
  isPublic: boolean;
}

/* ─── template config (the live data object passed to Renderer) ─────────── */
export type TemplateConfig = Record<string, unknown> & {
  _page?: Partial<PageSettings>;
};

/* ─── manifest ─────────────────────────────────────────────────────────── */
export interface TemplateManifest2 {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  priceCents: number;
  isPremium: boolean;
  /** CSS gradient string for the card cover */
  coverGradient: string;
  accentEmoji: string;
  features: string[];
  /** Path to a static thumbnail (relative to /public) */
  thumbnailUrl?: string;
  /** Path to a preview video (relative to /public) */
  previewVideoUrl?: string;
  /** Multiple preview screenshots for the detail page gallery */
  previewImages?: string[];
  /** Author credit */
  author?: string;
  /** Default PIN for template protection - users can change this when creating */
  defaultPin?: string;
  /** Whether PIN protection is enabled by default */
  pinProtected?: boolean;
}

/* ─── renderer props ────────────────────────────────────────────────────── */
export interface TemplateRendererProps2 {
  config: TemplateConfig;
  mode: "edit" | "view";
}

/* ─── full plugin ───────────────────────────────────────────────────────── */
export interface ExternalTemplatePlugin {
  manifest: TemplateManifest2;
  /** Ordered list of editor sections */
  schema: SectionDef[];
  /** Default config values */
  defaults: TemplateConfig;
  /** The actual renderer — receives config, renders the template */
  Renderer: ComponentType<TemplateRendererProps2>;
}

export function defineExternalTemplate(plugin: ExternalTemplatePlugin): ExternalTemplatePlugin {
  return plugin;
}
