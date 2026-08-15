import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import type { BlockDefinition, BlockRenderProps } from "../types";

const section = "relative w-full px-6 py-16 sm:px-10 md:py-24";

/* ------------------------------------------------------------------ HERO */

const heroSchema = z.object({
  eyebrow: z.string().max(80).default(""),
  title: z.string().min(1).max(140),
  subtitle: z.string().max(400).default(""),
  imageUrl: z.string().default(""),
  align: z.enum(["left", "center"]).default("center"),
});
type HeroProps = z.infer<typeof heroSchema>;

function Hero({ props, theme }: BlockRenderProps<HeroProps>) {
  const centered = props.align === "center";
  return (
    <section className={`${section} overflow-hidden`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(60% 55% at 50% 0%, ${theme.primary}33 0%, transparent 70%)`,
        }}
      />
      <div
        className={`relative mx-auto flex max-w-4xl flex-col gap-6 ${
          centered ? "items-center text-center" : "items-start text-left"
        }`}
      >
        {props.eyebrow ? (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ background: `${theme.primary}22`, color: theme.primary }}
          >
            {props.eyebrow}
          </motion.span>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl leading-[1.14] font-bold sm:text-5xl md:text-6xl"
          style={{ fontFamily: theme.displayFont, color: theme.foreground }}
        >
          {props.title}
        </motion.h1>
        {props.subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: theme.muted }}
          >
            {props.subtitle}
          </motion.p>
        ) : null}
        {props.imageUrl ? (
          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            src={props.imageUrl}
            alt={props.title}
            loading="lazy"
            className="mt-4 w-full max-w-2xl object-cover"
            style={{ borderRadius: theme.radius, boxShadow: `0 30px 80px -40px ${theme.primary}` }}
          />
        ) : null}
      </div>
    </section>
  );
}

export const heroBlock: BlockDefinition<HeroProps> = {
  type: "hero",
  label: "Hero",
  description: "Opening statement with optional eyebrow, subtitle and image.",
  group: "content",
  schema: heroSchema,
  defaults: {
    eyebrow: "",
    title: "For you, always",
    subtitle: "A little page built to say something that a message never could.",
    imageUrl: "",
    align: "center",
  },
  fields: [
    { key: "eyebrow", label: "Eyebrow", kind: "text", placeholder: "Small label above the title" },
    { key: "title", label: "Title", kind: "text" },
    { key: "subtitle", label: "Subtitle", kind: "textarea" },
    { key: "imageUrl", label: "Image", kind: "image" },
    {
      key: "align",
      label: "Alignment",
      kind: "select",
      options: [
        { label: "Centered", value: "center" },
        { label: "Left", value: "left" },
      ],
    },
  ],
  Component: Hero,
};

/* ---------------------------------------------------------------- LETTER */

const letterSchema = z.object({
  heading: z.string().max(120).default("A letter for you"),
  body: z.string().max(4000).default(""),
  signature: z.string().max(80).default(""),
});
type LetterProps = z.infer<typeof letterSchema>;

function Letter({ props, theme }: BlockRenderProps<LetterProps>) {
  return (
    <section className={section}>
      <motion.article
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl p-8 sm:p-12"
        style={{
          background: theme.surface,
          borderRadius: theme.radius,
          boxShadow: `0 30px 90px -50px ${theme.primary}`,
          border: `1px solid ${theme.primary}22`,
        }}
      >
        <h2
          className="mb-6 text-2xl font-semibold sm:text-3xl"
          style={{ fontFamily: theme.displayFont, color: theme.foreground }}
        >
          {props.heading}
        </h2>
        <div className="space-y-4 text-base leading-8" style={{ color: theme.muted }}>
          {props.body.split("\n").filter(Boolean).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {props.signature ? (
          <p
            className="mt-8 text-right text-lg italic"
            style={{ color: theme.primary, fontFamily: theme.displayFont }}
          >
            {props.signature}
          </p>
        ) : null}
      </motion.article>
    </section>
  );
}

export const letterBlock: BlockDefinition<LetterProps> = {
  type: "letter",
  label: "Letter",
  description: "A long-form written message on a card surface.",
  group: "content",
  schema: letterSchema,
  defaults: {
    heading: "A letter for you",
    body: "There are things that are easier to write than to say.\nSo here they are, all in one place.",
    signature: "— Always yours",
  },
  fields: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "body", label: "Message", kind: "textarea", help: "One paragraph per line." },
    { key: "signature", label: "Signature", kind: "text" },
  ],
  Component: Letter,
};

/* -------------------------------------------------------------- TIMELINE */

const timelineSchema = z.object({
  heading: z.string().max(120).default("Our story"),
  items: z.array(z.string()).default([]),
});
type TimelineProps = z.infer<typeof timelineSchema>;

function Timeline({ props, theme }: BlockRenderProps<TimelineProps>) {
  return (
    <section className={section}>
      <div className="mx-auto max-w-3xl">
        <h2
          className="mb-10 text-center text-3xl font-semibold"
          style={{ fontFamily: theme.displayFont, color: theme.foreground }}
        >
          {props.heading}
        </h2>
        <ol className="relative space-y-8 border-l pl-8" style={{ borderColor: `${theme.primary}44` }}>
          {props.items.map((item, i) => {
            const [label, ...rest] = item.split("|");
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                className="relative"
              >
                <span
                  className="absolute top-1.5 -left-[38px] block h-3.5 w-3.5 rounded-full"
                  style={{ background: theme.primary, boxShadow: `0 0 0 5px ${theme.primary}22` }}
                />
                <p className="text-sm font-semibold tracking-wide" style={{ color: theme.primary }}>
                  {label}
                </p>
                <p className="mt-1 leading-relaxed" style={{ color: theme.muted }}>
                  {rest.join("|") || ""}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export const timelineBlock: BlockDefinition<TimelineProps> = {
  type: "timeline",
  label: "Timeline",
  description: "Chronological moments, one entry per line.",
  group: "content",
  schema: timelineSchema,
  defaults: {
    heading: "Our story",
    items: [
      "The first day|Where everything quietly started.",
      "The first trip|Bad directions, better company.",
      "Today|Still choosing you.",
    ],
  },
  fields: [
    { key: "heading", label: "Heading", kind: "text" },
    {
      key: "items",
      label: "Moments",
      kind: "list-text",
      help: "Use “Title | description” on each entry.",
    },
  ],
  Component: Timeline,
};

/* ------------------------------------------------------------- TYPEWRITER */

const typewriterSchema = z.object({
  lines: z.array(z.string()).default([]),
  speedMs: z.number().min(20).max(300).default(65),
});
type TypewriterProps = z.infer<typeof typewriterSchema>;

function Typewriter({ props, theme, mode }: BlockRenderProps<TypewriterProps>) {
  const lines = useMemo(() => props.lines.filter(Boolean), [props.lines]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (mode === "edit" || lines.length === 0) {
      setText(lines[0] ?? "");
      return;
    }
    const current = lines[index % lines.length];
    if (text.length < current.length) {
      const t = setTimeout(() => setText(current.slice(0, text.length + 1)), props.speedMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setText("");
      setIndex((i) => i + 1);
    }, 1800);
    return () => clearTimeout(t);
  }, [text, index, lines, props.speedMs, mode]);

  return (
    <section className={`${section} text-center`}>
      <p
        className="mx-auto min-h-[2.5em] max-w-3xl text-2xl font-medium sm:text-3xl"
        style={{ fontFamily: theme.displayFont, color: theme.foreground }}
      >
        {text}
        <span className="ml-0.5 inline-block animate-pulse" style={{ color: theme.primary }}>
          |
        </span>
      </p>
    </section>
  );
}

export const typewriterBlock: BlockDefinition<TypewriterProps> = {
  type: "typewriter",
  label: "Typewriter",
  description: "Lines that type themselves out, one after another.",
  group: "content",
  schema: typewriterSchema,
  defaults: {
    lines: ["You make ordinary days feel rare.", "And rare days feel ordinary."],
    speedMs: 65,
  },
  fields: [
    { key: "lines", label: "Lines", kind: "list-text" },
    { key: "speedMs", label: "Typing speed (ms)", kind: "number", min: 20, max: 300 },
  ],
  Component: Typewriter,
};

/* -------------------------------------------------------------------- CTA */

const ctaSchema = z.object({
  title: z.string().max(140).default("Say something back"),
  buttonLabel: z.string().max(40).default("Reply on WhatsApp"),
  buttonUrl: z.string().max(500).default(""),
});
type CtaProps = z.infer<typeof ctaSchema>;

function Cta({ props, theme }: BlockRenderProps<CtaProps>) {
  return (
    <section className={`${section} text-center`}>
      <h2
        className="mb-6 text-3xl font-semibold"
        style={{ fontFamily: theme.displayFont, color: theme.foreground }}
      >
        {props.title}
      </h2>
      {props.buttonUrl ? (
        <a
          href={props.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
          style={{
            background: theme.primary,
            color: theme.background,
            borderRadius: theme.radius,
            boxShadow: `0 20px 50px -22px ${theme.primary}`,
          }}
        >
          {props.buttonLabel}
        </a>
      ) : null}
    </section>
  );
}

export const ctaBlock: BlockDefinition<CtaProps> = {
  type: "cta",
  label: "Call to action",
  description: "A closing button that links anywhere.",
  group: "interactive",
  schema: ctaSchema,
  defaults: { title: "Say something back", buttonLabel: "Reply", buttonUrl: "" },
  fields: [
    { key: "title", label: "Title", kind: "text" },
    { key: "buttonLabel", label: "Button label", kind: "text" },
    { key: "buttonUrl", label: "Button link", kind: "text", placeholder: "https://" },
  ],
  Component: Cta,
};
