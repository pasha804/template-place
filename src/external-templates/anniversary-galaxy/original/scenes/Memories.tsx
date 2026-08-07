// @ts-nocheck
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

const DEFAULT_TILTS = [-5, 4, -3, 5, -4, 3]

function Lights() {
  return (
    <div className="pointer-events-none absolute -top-4 left-0 right-0">
      <svg viewBox="0 0 400 40" className="h-10 w-full" preserveAspectRatio="none">
        <path d="M0 6 Q100 34 200 12 T400 8" fill="none" stroke="oklch(0.8 0.1 88 / 0.5)" strokeWidth="1" />
      </svg>
      {[8, 22, 36, 50, 64, 78, 92].map((x, i) => (
        <motion.span
          key={x}
          className="absolute h-2.5 w-2.5 rounded-full neon-outline"
          style={{ left: `${x}%`, top: 14 + (i % 3) * 6, background: "var(--gold)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export function Memories({
  onNext,
  photos,
  title,
  subtitle,
}: {
  onNext: () => void;
  photos?: string[];
  title?: string;
  subtitle?: string;
}) {
  const srcs = (photos && photos.length > 0) ? photos : [
    "/templates/anniversary-galaxy/memory-1.webp",
    "/templates/anniversary-galaxy/memory-2.webp",
    "/templates/anniversary-galaxy/memory-3.webp",
    "/templates/anniversary-galaxy/memory-4.webp",
    "/templates/anniversary-galaxy/memory-5.webp",
    "/templates/anniversary-galaxy/memory-6.webp",
  ]
  return (
    <SceneShell
      title={title || "Memories"}
      subtitle={subtitle || <>Some of my favorite memories with you.<br />I'll treasure them forever.</>}
      footerSlot={<GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>}
    >
      <div className="relative mx-auto w-full max-w-lg pt-6">
        <Lights />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {srcs.slice(0, 6).map((src, i) => {
            const tilt = DEFAULT_TILTS[i] ?? 0
            return (
              <motion.figure
                key={src + i}
                initial={{ opacity: 0, y: -40, rotate: tilt * 2 }}
                animate={{ opacity: 1, y: 0, rotate: tilt }}
                transition={{ delay: 0.2 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                className="relative origin-top rounded-sm p-1.5 pb-5"
                style={{ background: "var(--paper)", boxShadow: "var(--shadow-glow-soft)", transformOrigin: "top center" }}
              >
                <motion.span
                  className="absolute -top-3 left-1/2 h-4 w-1.5 -translate-x-1/2 rounded-sm"
                  style={{ background: "oklch(0.87 0.12 88 / 80%)" }}
                  aria-hidden="true"
                />
                <motion.div
                  animate={{ rotate: [tilt - 1.5, tilt + 1.5, tilt - 1.5] }}
                  transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Memory ${i + 1}`}
                    width={512}
                    height={640}
                    loading="lazy"
                    className="h-32 w-full object-cover sm:h-36"
                  />
                </motion.div>
              </motion.figure>
            )
          })}
        </div>
      </div>
    </SceneShell>
  )
}
