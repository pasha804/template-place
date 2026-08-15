import { useEffect } from "react";
import confetti from "canvas-confetti";

export function Confetti({ active = true }: { active?: boolean }) {
  useEffect(() => {
    if (!active) return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#ff718d", "#fdff6a", "#a78bfa", "#f472b6", "#ffd700", "#ff69b4"],
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [active]);

  return null;
}
