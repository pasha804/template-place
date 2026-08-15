import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const isTouchRef = useRef(false);
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, { stiffness: 180, damping: 28 });
  const y = useSpring(rawY, { stiffness: 180, damping: 28 });

  useEffect(() => {
    // Disable on touch devices to conserve resources
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      isTouchRef.current = true;
      return;
    }

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [rawX, rawY]);

  if (isTouchRef.current) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
      style={{
        x,
        y,
        width: 380,
        height: 380,
        background:
          "radial-gradient(circle, oklch(0.7 0.24 350 / 0.35) 0%, oklch(0.55 0.24 300 / 0.2) 45%, transparent 70%)",
      }}
    />
  );
}
