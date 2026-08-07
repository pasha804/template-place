import { forwardRef, useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { glow?: boolean; };

const HapticButton = forwardRef<HTMLButtonElement, Props>(function HapticButton(
  { children, onClick, className = "", glow = true, ...rest }, ref
) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const tx = useTransform(sx, (v) => v * 0.25);
  const ty = useTransform(sy, (v) => v * 0.25);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={(node) => {
        btnRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={(e) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(40);
        onClick?.(e);
      }}
      style={{ x: tx, y: ty, minHeight: 52 }}
      whileTap={{ scale: 0.96 }}
      className={`bt7-shimmer-sweep relative inline-flex max-w-[min(100%,22rem)] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#e11d48] via-[#d946ef] to-[#fbbf24] px-6 py-3.5 text-base font-semibold text-white touch-manipulation sm:px-8 ${
        glow ? "shadow-[0_0_40px_rgba(225,29,72,0.55)]" : ""
      } transition-shadow hover:shadow-[0_0_60px_rgba(217,70,239,0.7)] ${className}`}
      {...(rest as Record<string, unknown>)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
});

export default HapticButton;
