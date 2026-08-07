import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";

import type { BlockDefinition, BlockRenderProps } from "../types";

const section = "relative w-full px-6 py-16 sm:px-10 md:py-24";

/* --------------------------------------------------------------- GALLERY */

const gallerySchema = z.object({
  heading: z.string().max(120).default("Our photos"),
  images: z.array(z.string()).default([]),
  layout: z.enum(["grid", "masonry", "carousel"]).default("grid"),
});
type GalleryProps = z.infer<typeof gallerySchema>;

function Gallery({ props, theme }: BlockRenderProps<GalleryProps>) {
  const images = props.images.filter(Boolean);
  const [active, setActive] = useState(0);

  return (
    <section className={section}>
      <div className="mx-auto max-w-5xl">
        {props.heading ? (
          <h2
            className="mb-10 text-center text-3xl font-semibold"
            style={{ fontFamily: theme.displayFont, color: theme.foreground }}
          >
            {props.heading}
          </h2>
        ) : null}

        {props.layout === "carousel" ? (
          <div className="flex flex-col items-center gap-4">
            {images.length > 0 ? (
              <motion.img
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                src={images[active]}
                alt={`Photo ${active + 1}`}
                loading="lazy"
                className="max-h-[520px] w-full object-cover"
                style={{ borderRadius: theme.radius }}
              />
            ) : null}
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => setActive(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === active ? 26 : 8,
                    background: i === active ? theme.primary : `${theme.primary}44`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className={
              props.layout === "masonry"
                ? "columns-2 gap-4 sm:columns-3 [&>img]:mb-4"
                : "grid grid-cols-2 gap-4 sm:grid-cols-3"
            }
          >
            {images.map((src, i) => (
              <motion.img
                key={`${src}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                src={src}
                alt={`Photo ${i + 1}`}
                loading="lazy"
                className="w-full object-cover"
                style={{
                  borderRadius: theme.radius,
                  aspectRatio: props.layout === "masonry" ? undefined : "1 / 1",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export const galleryBlock: BlockDefinition<GalleryProps> = {
  type: "gallery",
  label: "Gallery",
  description: "Photo grid, masonry wall, or swipeable carousel.",
  group: "media",
  schema: gallerySchema,
  defaults: { heading: "Our photos", images: [], layout: "grid" },
  fields: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "images", label: "Photos", kind: "list-image" },
    {
      key: "layout",
      label: "Layout",
      kind: "select",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Masonry", value: "masonry" },
        { label: "Carousel", value: "carousel" },
      ],
    },
  ],
  Component: Gallery,
};

/* ----------------------------------------------------------------- VIDEO */

const videoSchema = z.object({
  heading: z.string().max(120).default(""),
  videoUrl: z.string().max(600).default(""),
  posterUrl: z.string().max(600).default(""),
});
type VideoProps = z.infer<typeof videoSchema>;

function VideoBlock({ props, theme }: BlockRenderProps<VideoProps>) {
  if (!props.videoUrl) return null;
  const isEmbed = /youtube|youtu\.be|vimeo/.test(props.videoUrl);
  return (
    <section className={section}>
      <div className="mx-auto max-w-4xl">
        {props.heading ? (
          <h2
            className="mb-8 text-center text-3xl font-semibold"
            style={{ fontFamily: theme.displayFont, color: theme.foreground }}
          >
            {props.heading}
          </h2>
        ) : null}
        <div
          className="overflow-hidden"
          style={{ borderRadius: theme.radius, boxShadow: `0 30px 80px -44px ${theme.primary}` }}
        >
          {isEmbed ? (
            <iframe
              src={props.videoUrl.replace("watch?v=", "embed/")}
              title={props.heading || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
            />
          ) : (
            <video
              src={props.videoUrl}
              poster={props.posterUrl || undefined}
              controls
              playsInline
              className="w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export const videoBlock: BlockDefinition<VideoProps> = {
  type: "video",
  label: "Video",
  description: "An uploaded clip or a YouTube/Vimeo embed.",
  group: "media",
  schema: videoSchema,
  defaults: { heading: "", videoUrl: "", posterUrl: "" },
  fields: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "videoUrl", label: "Video", kind: "video" },
    { key: "posterUrl", label: "Poster image", kind: "image" },
  ],
  Component: VideoBlock,
};

/* ----------------------------------------------------------------- MUSIC */

const musicSchema = z.object({
  trackUrl: z.string().max(600).default(""),
  title: z.string().max(120).default("Our song"),
  artist: z.string().max(120).default(""),
  autoplay: z.boolean().default(false),
});
type MusicProps = z.infer<typeof musicSchema>;

function Music({ props, theme, mode }: BlockRenderProps<MusicProps>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (mode === "edit") return;
    if (props.autoplay && audioRef.current) {
      audioRef.current.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    }
  }, [props.autoplay, props.trackUrl, mode]);

  if (!props.trackUrl) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true), () => undefined);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="w-full px-6 py-10 sm:px-10">
      <div
        className="mx-auto flex max-w-md items-center gap-4 p-4"
        style={{
          background: theme.surface,
          borderRadius: theme.radius,
          border: `1px solid ${theme.primary}22`,
        }}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{ background: theme.primary, color: theme.background }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="min-w-0">
          <p className="truncate font-semibold" style={{ color: theme.foreground }}>
            {props.title}
          </p>
          {props.artist ? (
            <p className="truncate text-sm" style={{ color: theme.muted }}>
              {props.artist}
            </p>
          ) : null}
        </div>
        <audio ref={audioRef} src={props.trackUrl} loop preload="none" onEnded={() => setPlaying(false)} />
      </div>
    </section>
  );
}

export const musicBlock: BlockDefinition<MusicProps> = {
  type: "music",
  label: "Music",
  description: "Background track with a compact player.",
  group: "media",
  schema: musicSchema,
  defaults: { trackUrl: "", title: "Our song", artist: "", autoplay: false },
  fields: [
    { key: "trackUrl", label: "Audio file", kind: "audio" },
    { key: "title", label: "Track title", kind: "text" },
    { key: "artist", label: "Artist", kind: "text" },
    { key: "autoplay", label: "Try to autoplay", kind: "boolean" },
  ],
  Component: Music,
};

/* ------------------------------------------------------------- COUNTDOWN */

const countdownSchema = z.object({
  heading: z.string().max(120).default("Counting since"),
  targetDate: z.string().default(new Date().toISOString().slice(0, 10)),
  direction: z.enum(["up", "down"]).default("up"),
});
type CountdownProps = z.infer<typeof countdownSchema>;

function useTick(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active]);
  return now;
}

function Countdown({ props, theme, mode }: BlockRenderProps<CountdownProps>) {
  const now = useTick(mode === "view");
  const parts = useMemo(() => {
    const target = new Date(props.targetDate).getTime();
    const diffMs = props.direction === "up" ? now - target : target - now;
    const clamped = Math.max(0, diffMs);
    const totalSeconds = Math.floor(clamped / 1000);
    return [
      { label: "days", value: Math.floor(totalSeconds / 86400) },
      { label: "hours", value: Math.floor((totalSeconds % 86400) / 3600) },
      { label: "minutes", value: Math.floor((totalSeconds % 3600) / 60) },
      { label: "seconds", value: totalSeconds % 60 },
    ];
  }, [now, props.targetDate, props.direction]);

  return (
    <section className={`${section} text-center`}>
      <h2
        className="mb-8 text-2xl font-semibold sm:text-3xl"
        style={{ fontFamily: theme.displayFont, color: theme.foreground }}
      >
        {props.heading}
      </h2>
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-5">
        {parts.map((p) => (
          <div
            key={p.label}
            className="px-2 py-5"
            style={{
              background: theme.surface,
              borderRadius: theme.radius,
              border: `1px solid ${theme.primary}22`,
            }}
          >
            <p
              className="text-2xl font-bold tabular-nums sm:text-4xl"
              style={{ color: theme.primary, fontFamily: theme.displayFont }}
            >
              {String(p.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.16em] uppercase" style={{ color: theme.muted }}>
              {p.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export const countdownBlock: BlockDefinition<CountdownProps> = {
  type: "countdown",
  label: "Countdown",
  description: "Time since a date, or time remaining until one.",
  group: "interactive",
  schema: countdownSchema,
  defaults: {
    heading: "Counting since",
    targetDate: new Date().toISOString().slice(0, 10),
    direction: "up",
  },
  fields: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "targetDate", label: "Date", kind: "date" },
    {
      key: "direction",
      label: "Mode",
      kind: "select",
      options: [
        { label: "Count up from date", value: "up" },
        { label: "Count down to date", value: "down" },
      ],
    },
  ],
  Component: Countdown,
};
