import { useEffect, useRef, useState, useCallback } from "react";

const BUTTERFLY = "🦋";
const TRAIL_LENGTH = 6;

interface Dot {
  id: number;
  x: number;
  y: number;
}

export function ButterflyTrail() {
  const [trail, setTrail] = useState<Dot[]>(() =>
    Array.from({ length: TRAIL_LENGTH }, (_, id) => ({ id, x: -200, y: -200 })),
  );
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -200, y: -200 });
  const posRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })),
  );
  // Only render on non-touch devices
  const [isTouch] = useState(() => window.matchMedia("(pointer: coarse)").matches);

  const animate = useCallback(() => {
    let changed = false;
    const next = posRef.current.map((pos, i) => {
      const lead = i === 0 ? targetRef.current : posRef.current[i - 1];
      const nx = pos.x + (lead.x - pos.x) * (i === 0 ? 0.18 : 0.22);
      const ny = pos.y + (lead.y - pos.y) * (i === 0 ? 0.18 : 0.22);
      if (Math.abs(nx - pos.x) > 0.1 || Math.abs(ny - pos.y) > 0.1) changed = true;
      return { x: nx, y: ny };
    });
    posRef.current = next;
    if (changed) {
      setTrail(next.map((p, id) => ({ id, x: p.x, y: p.y })));
    }
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch) return; // skip on mobile touch devices

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [animate, isTouch]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {trail.map((dot, idx) => {
        const scale = 1 - idx * 0.12;
        const opacity = 1 - idx * 0.14;
        const flip = idx % 2 === 0 ? 1 : -1;
        return (
          <span
            key={dot.id}
            style={{
              position: "fixed",
              left: dot.x,
              top: dot.y,
              transform: `translate(-50%, -50%) scale(${scale}) scaleX(${flip})`,
              opacity,
              fontSize: `${22 - idx * 1.5}px`,
              willChange: "transform",
              userSelect: "none",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            {BUTTERFLY}
          </span>
        );
      })}
    </div>
  );
}
