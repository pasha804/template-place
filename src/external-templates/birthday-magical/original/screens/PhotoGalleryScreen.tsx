import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import HapticButton from "../HapticButton";

const DEFAULT_PHOTOS: { src: string; caption: string }[] = [
  { src: "/templates/birthday-magical/images/1.jpeg", caption: "" },
  { src: "/templates/birthday-magical/images/2.jpeg", caption: "" },
  { src: "/templates/birthday-magical/images/3.jpeg", caption: "" },
  { src: "/templates/birthday-magical/images/4.jpeg", caption: "" },
  { src: "/templates/birthday-magical/images/5.jpeg", caption: "" },
];

function slideMetrics(vw: number) {
  const slideW = Math.round(Math.min(280, Math.max(200, vw * 0.62)));
  const gap = vw < 640 ? 16 : 24;
  const slideH = Math.round(slideW * 1.28);
  return { slideW, gap, step: slideW + gap, slideH };
}

export default function PhotoGalleryScreen({ onNext, photos }: { onNext: () => void; photos?: { src: string; caption: string }[] }) {
  const finalPhotos = photos || DEFAULT_PHOTOS;
  const [active, setActive] = useState(2);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [metrics, setMetrics] = useState(() =>
    typeof window !== "undefined" ? slideMetrics(window.innerWidth) : slideMetrics(390),
  );
  const trackRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef(metrics);
  metricsRef.current = metrics;
  const dragRef = useRef({
    startX: 0,
    startOffset: 0,
    dragging: false,
    moved: false,
    pointerId: -1,
  });
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);

  const setTrackX = useCallback((x: number, animate: boolean) => {
    const el = trackRef.current;
    if (!el) return;
    offsetRef.current = x;
    el.style.transition = animate
      ? "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    el.style.transform = `translate3d(${x}px, -50%, 0)`;
  }, []);

  const goTo = useCallback(
    (index: number, animate = true) => {
      const { slideW, step } = metricsRef.current;
      const i = ((index % finalPhotos.length) + finalPhotos.length) % finalPhotos.length;
      setActive(i);
      const container = trackRef.current?.parentElement;
      const center = container ? container.clientWidth / 2 : 0;
      setTrackX(center - (i * step + slideW / 2), animate);
    },
    [setTrackX],
  );

  useEffect(() => {
    const sync = () => {
      const next = slideMetrics(window.innerWidth);
      setMetrics(next);
      metricsRef.current = next;
      goTo(active, false);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    finalPhotos.forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
  }, [finalPhotos]);

  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    let coolDown = false;
    const onWheel = (e: WheelEvent) => {
      // Only hijack clearly horizontal gestures â€” never block page scroll
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8;
      if (!horizontal) return;
      e.preventDefault();
      if (coolDown) return;
      coolDown = true;
      setPlaying(false);
      setActive((v) => {
        const next =
          e.deltaX > 0 ? (v + 1) % finalPhotos.length : (v - 1 + finalPhotos.length) % finalPhotos.length;
        const { slideW, step } = metricsRef.current;
        const container = trackRef.current?.parentElement;
        const center = container ? container.clientWidth / 2 : 0;
        setTrackX(center - (next * step + slideW / 2), true);
        return next;
      });
      window.setTimeout(() => {
        coolDown = false;
      }, 480);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setTrackX]);

  useEffect(() => {
    if (!playing || lightbox !== null) return;
    const id = setInterval(() => {
      setActive((v) => {
        const next = (v + 1) % finalPhotos.length;
        const { slideW, step } = metricsRef.current;
        const container = trackRef.current?.parentElement;
        const center = container ? container.clientWidth / 2 : 0;
        setTrackX(center - (next * step + slideW / 2), true);
        return next;
      });
    }, 3800);
    return () => clearInterval(id);
  }, [playing, lightbox, setTrackX]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLightbox((v) => (v === null ? v : (v - 1 + finalPhotos.length) % finalPhotos.length));
      if (e.key === "ArrowRight")
        setLightbox((v) => (v === null ? v : (v + 1) % finalPhotos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const settleFromDrag = useCallback(() => {
    const container = trackRef.current?.parentElement;
    if (!container) return;
    const { slideW, step } = metricsRef.current;
    const center = container.clientWidth / 2;
    const predicted = offsetRef.current + velocityRef.current * 180;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < finalPhotos.length; i++) {
      const slideCenter = predicted + i * step + slideW / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    setPlaying(false);
    goTo(best, true);
  }, [goTo]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const d = dragRef.current;
    d.dragging = true;
    d.moved = false;
    d.startX = e.clientX;
    d.startOffset = offsetRef.current;
    d.pointerId = e.pointerId;
    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setTrackX(offsetRef.current, false);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    const now = performance.now();
    const dt = now - lastTRef.current;
    if (dt > 0) velocityRef.current = (e.clientX - lastXRef.current) / dt;
    lastXRef.current = e.clientX;
    lastTRef.current = now;
    setTrackX(d.startOffset + dx, false);
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    if (!d.dragging) return;
    d.dragging = false;
    if (d.moved) settleFromDrag();
  };

  const go = (dir: number) => {
    setPlaying(false);
    goTo(active + dir, true);
  };

  const { slideW, gap, slideH } = metrics;

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-6 py-10 sm:gap-8 sm:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(420px,70vw)] w-[min(640px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(217,70,239,0.22) 0%, rgba(251,191,36,0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="flex flex-col items-center gap-2 px-1">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fda4af] backdrop-blur">
          Chapter 04 Â· Memory Reel
        </span>
        <h2
          style={{ fontFamily: "var(--bt7-font-display)" }}
          className="bt7-text-gradient-warm bt7-section-heading text-center"
        >
          Floating Memories
        </h2>
        <p className="max-w-md text-center text-sm text-white/60 sm:text-base">
          A few frames from the story so far â€” swipe or drag to browse.
        </p>
      </div>

      <div className="relative w-full max-w-5xl">
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="bt7-glass-card absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 hover:bg-white/10 sm:left-2 sm:h-12 sm:w-12"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="bt7-glass-card absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 hover:bg-white/10 sm:right-2 sm:h-12 sm:w-12"
        >
          <ChevronRight />
        </button>

        <div
          className="relative w-full cursor-grab overflow-hidden active:cursor-grabbing"
          style={{
            height: Math.max(320, slideH + 48),
            touchAction: "pan-y",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            className="absolute top-1/2 left-0 flex items-center will-change-transform"
            style={{
              gap,
              height: slideH + 40,
              transform: "translate3d(0, -50%, 0)",
            }}
          >
            {finalPhotos.map((photo, i) => {
              const dist = Math.abs(i - active);
              const isActive = i === active;
              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => {
                    if (dragRef.current.moved) return;
                    if (isActive) setLightbox(i);
                    else {
                      setPlaying(false);
                      goTo(i, true);
                    }
                  }}
                  aria-label={`Photo ${i + 1}`}
                  className="relative shrink-0 overflow-hidden rounded-3xl border text-left outline-none"
                  style={{
                    width: slideW,
                    height: slideH,
                    borderColor: isActive ? "rgba(251,191,36,0.85)" : "rgba(255,255,255,0.1)",
                    boxShadow: isActive
                      ? "0 25px 70px rgba(251,191,36,0.4), 0 0 50px rgba(217,70,239,0.28)"
                      : "0 12px 36px rgba(0,0,0,0.45)",
                    transform: `scale(${isActive ? 1.04 : Math.max(0.82, 0.92 - dist * 0.06)})`,
                    opacity: dist > 2 ? 0.35 : isActive ? 1 : Math.max(0.45, 0.75 - dist * 0.15),
                    transition:
                      "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease, box-shadow 420ms ease, border-color 420ms ease",
                    zIndex: 10 - dist,
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption || `Memory ${i + 1}`}
                    draggable={false}
                    loading="eager"
                    decoding="async"
                    className="pointer-events-none h-full w-full select-none object-cover"
                    style={{ transform: "translateZ(0)" }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-white/80 backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")} / {String(finalPhotos.length).padStart(2, "0")}
                  </div>
                  {isActive && (
                    <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-[10px] uppercase tracking-[0.3em] text-[#fbbf24]/90">
                      Tap to zoom
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative flex max-w-full items-center gap-3 overflow-x-auto px-1">
        <button
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          className="bt7-glass-card flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:text-white"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-2 backdrop-blur">
          {finalPhotos.map((photo, i) => {
            const isActive = i === active;
            return (
              <button
                key={photo.src}
                onClick={() => {
                  setPlaying(false);
                  goTo(i, true);
                }}
                aria-label={`Photo ${i + 1}`}
                className="relative overflow-hidden rounded-lg transition-all duration-300 ease-out"
                style={{
                  width: isActive ? 56 : 36,
                  height: 36,
                  minWidth: 36,
                }}
              >
                <img
                  src={photo.src}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div
                  className={`absolute inset-0 transition-all ${
                    isActive
                      ? "ring-2 ring-[#fbbf24] shadow-[0_0_16px_rgba(251,191,36,0.7)]"
                      : "bg-black/50 hover:bg-black/20"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <HapticButton onClick={onNext}>Why You're Awesome ðŸ’–</HapticButton>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8 sm:backdrop-blur-2xl"
            style={{
              paddingTop: "max(1rem, env(safe-area-inset-top))",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              aria-label="Close"
              className="bt7-glass-card absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white sm:right-4 sm:top-4"
              style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
            >
              <X />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((v) => (v === null ? v : (v - 1 + finalPhotos.length) % finalPhotos.length));
              }}
              aria-label="Previous"
              className="bt7-glass-card absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white sm:left-8 sm:h-14 sm:w-14"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((v) => (v === null ? v : (v + 1) % finalPhotos.length));
              }}
              aria-label="Next"
              className="bt7-glass-card absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white sm:right-8 sm:h-14 sm:w-14"
            >
              <ChevronRight />
            </button>

            <motion.figure
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[85dvh] flex-col items-center gap-4"
            >
              <img
                src={finalPhotos[lightbox].src}
                alt={finalPhotos[lightbox].caption || `Memory ${lightbox + 1}`}
                className="max-h-[72dvh] max-w-full rounded-3xl border-2 border-[#fbbf24] object-contain shadow-[0_0_100px_rgba(251,191,36,0.5)]"
              />
              {finalPhotos[lightbox].caption ? (
                <figcaption
                  className="max-w-lg text-center text-lg font-medium text-white drop-shadow"
                  style={{ fontFamily: "var(--bt7-font-display)" }}
                >
                  {finalPhotos[lightbox].caption}
                </figcaption>
              ) : null}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

