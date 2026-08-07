import type { BlockDefinition, BlockInstance, PageTheme } from "./types";
import { ctaBlock, heroBlock, letterBlock, timelineBlock, typewriterBlock } from "./components/content";
import { countdownBlock, galleryBlock, musicBlock, videoBlock } from "./components/media";
import {
  confettiBlock,
  floatingCardsBlock,
  gifBlock,
  heartsBlock,
  particlesBlock,
} from "./components/effects";


/* eslint-disable @typescript-eslint/no-explicit-any */
const definitions: BlockDefinition<any>[] = [
  heroBlock,
  letterBlock,
  timelineBlock,
  typewriterBlock,
  floatingCardsBlock,
  galleryBlock,
  videoBlock,
  gifBlock,
  musicBlock,
  countdownBlock,
  ctaBlock,
  heartsBlock,
  confettiBlock,
  particlesBlock,
];
/* eslint-enable @typescript-eslint/no-explicit-any */

export const blockRegistry = new Map(definitions.map((d) => [d.type, d]));

export const allBlocks = definitions;

export function getBlockDefinition(type: string) {
  return blockRegistry.get(type);
}

/** Validates and normalises stored block props against the registered schema. */
export function resolveBlockProps(instance: BlockInstance): Record<string, unknown> | null {
  const def = blockRegistry.get(instance.type);
  if (!def) return null;
  const parsed = def.schema.safeParse({ ...def.defaults, ...instance.props });
  return parsed.success
    ? (parsed.data as Record<string, unknown>)
    : (def.defaults as Record<string, unknown>);
}

export const defaultTheme: PageTheme = {
  primary: "#e0a457",
  accent: "#4fb3c4",
  background: "#0f1117",
  surface: "#171a22",
  foreground: "#f4f2ee",
  muted: "#a6a29b",
  displayFont: "'Sora', sans-serif",
  bodyFont: "'Manrope', sans-serif",
  radius: "18px",
};
