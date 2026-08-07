import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";

import type { BlockDefinition, BlockRenderProps } from "../types";

const section = "relative w-full px-6 py-16 sm:px-10 md:py-24";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ------------------------------------------------------- FLOATING HEARTS */

const heartsSchema = z.object({
  symbol: z.string().max(4).default("♥"),
  count: z.number().min(4).max(60).default(18),
  speed: z.number().min(4).max(30).default(12),
});
type HeartsProps = z.infer<typeof heartsSchema>;

function FloatingHearts({ props, theme, mode }: BlockRenderProps<HeartsProps>) {
  const reduced = usePrefersReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: props.count }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        delay: (i % 10) * 0.7,
        size: 12 + ((i * 13) % 22),
        duration: props.speed + ((i * 3) % 8),
      })),
    [props.count, props.speed],
  );

  if (reduced || mode === "edit") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {items.slice(0, 8).map((item) => (
          <span
            key={item.id}
            className="absolute"
            style={{
              left: `${item.left}%`,
              top: `${(item.id * 11) % 90}%`,
              fontSize: item.size,
              color: theme.primary,
              opacity: 0.35,
            }}
          >
            {props.symbol}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute bottom-[-40px]"
          style={{ left: `${item.left}%`, fontSize: item.size, color: theme.primary }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-110vh", opacity: [0, 0.85, 0] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {props.symbol}
        </motion.span>
      ))}
    </div>
  );
}

export const heartsBlock: BlockDefinition<HeartsProps> = {
  type: "hearts",
  label: "Floating hearts",
  description: "Ambient symbols drifting up the page.",
  group: "effects",
  schema: heartsSchema,
  defaults: { symbol: "♥", count: 18, speed: 12 },
  fields: [
    { key: "symbol", label: "Symbol", kind: "text", help: "Any emoji or character." },
    { key: "count", label: "How many", kind: "number", min: 4, max: 60 },
    { key: "speed", label: "Drift duration (s)", kind: "number", min: 4, max: 30 },
  ],
  Component: FloatingHearts,
};

/* --------------------------------------------------------------- CONFETTI */

const confettiSchema = z.object({
  trigger: z.enum(["load", "click"]).default("load"),
  buttonLabel: z.string().max(40).default("Celebrate"),
  intensity: z.number().min(30).max(400).default(160),
});
type ConfettiProps = z.infer<typeof confettiSchema>;

function ConfettiBlock({ props, theme, mode }: BlockRenderProps<ConfettiProps>) {
  const reduced = usePrefersReducedMotion();
  const fired = useRef(false);

  const fire = useMemo(
    () => async () => {
      if (reduced) return;
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: props.intensity,
        spread: 82,
        origin: { y: 0.65 },
        colors: [theme.primary, theme.accent, theme.foreground],
      });
    },
    [props.intensity, reduced, theme.accent, theme.foreground, theme.primary],
  );

  useEffect(() => {
    if (mode === "edit" || props.trigger !== "load" || fired.current) return;
    fired.current = true;
    const t = setTimeout(() => void fire(), 400);
    return () => clearTimeout(t);
  }, [fire, mode, props.trigger]);

  if (props.trigger === "load") return null;

  return (
    <div className="w-full px-6 py-10 text-center">
      <button
        type="button"
        onClick={() => void fire()}
        className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold transition-transform hover:scale-105"
        style={{ background: theme.primary, color: theme.background, borderRadius: theme.radius }}
      >
        {props.buttonLabel}
      </button>
    </div>
  );
}

export const confettiBlock: BlockDefinition<ConfettiProps> = {
  type: "confetti",
  label: "Confetti",
  description: "Burst of confetti on load or on a button press.",
  group: "effects",
  schema: confettiSchema,
  defaults: { trigger: "load", buttonLabel: "Celebrate", intensity: 160 },
  fields: [
    {
      key: "trigger",
      label: "Trigger",
      kind: "select",
      options: [
        { label: "When the page opens", value: "load" },
        { label: "When a button is pressed", value: "click" },
      ],
    },
    { key: "buttonLabel", label: "Button label", kind: "text" },
    { key: "intensity", label: "Particles", kind: "number", min: 30, max: 400 },
  ],
  Component: ConfettiBlock,
};

/* -------------------------------------------------------------- PARTICLES */

const particlesSchema = z.object({
  density: z.number().min(20).max(160).default(70),
  twinkle: z.boolean().default(true),
});
type ParticlesProps = z.infer<typeof particlesSchema>;

function Particles({ props, theme }: BlockRenderProps<ParticlesProps>) {
  const reduced = usePrefersReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: props.density }, (_, i) => ({
        id: i,
        x: (i * 53) % 100,
        y: (i * 29) % 100,
        size: 1 + ((i * 7) % 3),
        delay: (i % 12) * 0.35,
      })),
    [props.density],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: theme.accent,
            opacity: 0.6,
            animation:
              props.twinkle && !reduced ? `pulse 3.2s ease-in-out ${d.delay}s infinite` : undefined,
          }}
        />
      ))}
    </div>
  );
}

export const particlesBlock: BlockDefinition<ParticlesProps> = {
  type: "particles",
  label: "Particles",
  description: "A soft starfield behind the content.",
  group: "effects",
  schema: particlesSchema,
  defaults: { density: 70, twinkle: true },
  fields: [
    { key: "density", label: "Density", kind: "number", min: 20, max: 160 },
    { key: "twinkle", label: "Twinkle", kind: "boolean" },
  ],
  Component: Particles,
};

/* -------------------------------------------------------- FLOATING CARDS */

const floatingCardsSchema = z.object({
  heading: z.string().max(120).default("Reasons"),
  items: z.array(z.string()).default([]),
});
type FloatingCardsProps = z.infer<typeof floatingCardsSchema>;

function FloatingCards({ props, theme }: BlockRenderProps<FloatingCardsProps>) {
  return (
    <section className={section}>
      <div className="mx-auto max-w-5xl">
        <h2
          className="mb-10 text-center text-3xl font-semibold"
          style={{ fontFamily: theme.displayFont, color: theme.foreground }}
        >
          {props.heading}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {props.items.filter(Boolean).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
              className="p-6"
              style={{
                background: theme.surface,
                borderRadius: theme.radius,
                border: `1px solid ${theme.primary}22`,
                boxShadow: `0 22px 60px -40px ${theme.primary}`,
                transformStyle: "preserve-3d",
              }}
            >
              <span
                className="mb-3 block text-xs font-semibold tracking-[0.2em]"
                style={{ color: theme.primary }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed" style={{ color: theme.muted }}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const floatingCardsBlock: BlockDefinition<FloatingCardsProps> = {
  type: "floating-cards",
  label: "Floating cards",
  description: "A numbered grid of short reasons or notes.",
  group: "content",
  schema: floatingCardsSchema,
  defaults: {
    heading: "Reasons",
    items: ["The way you laugh at your own jokes.", "You never let me carry anything alone."],
  },
  fields: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "items", label: "Cards", kind: "list-text" },
  ],
  Component: FloatingCards,
};

/* ------------------------------------------------------------------- GIF */

const gifSchema = z.object({
  url: z.string().max(600).default(""),
  caption: z.string().max(160).default(""),
  size: z.enum(["sm", "md", "lg"]).default("md"),
});
type GifProps = z.infer<typeof gifSchema>;

function Gif({ props, theme }: BlockRenderProps<GifProps>) {
  if (!props.url) return null;
  const width = props.size === "sm" ? 220 : props.size === "lg" ? 520 : 360;
  return (
    <section className="w-full px-6 py-10 text-center sm:px-10">
      <img
        src={props.url}
        alt={props.caption || "Animation"}
        loading="lazy"
        className="mx-auto w-full object-contain"
        style={{ maxWidth: width, borderRadius: theme.radius }}
      />
      {props.caption ? (
        <p className="mt-3 text-sm" style={{ color: theme.muted }}>
          {props.caption}
        </p>
      ) : null}
    </section>
  );
}

export const gifBlock: BlockDefinition<GifProps> = {
  type: "gif",
  label: "GIF",
  description: "An animated image with an optional caption.",
  group: "media",
  schema: gifSchema,
  defaults: { url: "", caption: "", size: "md" },
  fields: [
    { key: "url", label: "GIF", kind: "image" },
    { key: "caption", label: "Caption", kind: "text" },
    {
      key: "size",
      label: "Size",
      kind: "select",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  ],
  Component: Gif,
};
