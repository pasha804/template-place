import type { ComponentType } from "react";
import type { z } from "zod";

export type FieldKind =
  | "text"
  | "textarea"
  | "image"
  | "video"
  | "audio"
  | "color"
  | "number"
  | "date"
  | "boolean"
  | "select"
  | "list-text"
  | "list-image"
  | "animation";

export interface FieldDef {
  key: string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
  help?: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

export type BlockGroup = "content" | "media" | "effects" | "interactive";

/** Theme tokens a template/page injects into the rendered surface. */
export interface PageTheme {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  displayFont: string;
  bodyFont: string;
  radius: string;
}

export interface BlockRenderProps<P = Record<string, unknown>> {
  props: P;
  theme: PageTheme;
  /** "edit" disables autoplay/ambient loops that would fight the editor. */
  mode: "edit" | "view";
}

export interface BlockDefinition<P = Record<string, unknown>> {
  type: string;
  label: string;
  description: string;
  group: BlockGroup;
  schema: z.ZodType<P, z.ZodTypeDef, unknown>;
  defaults: P;
  fields: FieldDef[];
  Component: ComponentType<BlockRenderProps<P>>;
}

export interface BlockInstance {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

export function createBlockInstance(type: string, props: Record<string, unknown>): BlockInstance {
  return {
    id: `${type}-${Math.random().toString(36).slice(2, 10)}`,
    type,
    props: { ...props },
  };
}
