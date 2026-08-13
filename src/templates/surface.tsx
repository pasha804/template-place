import { motion } from "framer-motion";

import { getBlockDefinition, resolveBlockProps } from "@/blocks/registry";
import type { TemplateRendererProps } from "@/templates/contract";

const entranceVariants = {
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  rise: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1 } },
} as const;

interface SurfaceProps extends TemplateRendererProps {
  entrance?: keyof typeof entranceVariants;
  ambient?: "none" | "aurora" | "drift";
}

/**
 * Shared page shell every template renderer composes with. It owns the theme
 * variables, ambient background, and the block iteration loop so individual
 * templates only decide composition and styling.
 */
export function TemplateSurface({
  blocks,
  theme,
  mode,
  entrance = "rise",
  ambient = "aurora",
}: SurfaceProps) {
  const variants = entranceVariants[entrance];

  return (
    <div
      className="template-runtime relative min-h-full w-full overflow-hidden"
      style={{
        background: theme.background,
        color: theme.foreground,
        fontFamily: theme.bodyFont,
      }}
    >
      {ambient !== "none" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className={ambient === "aurora" ? "animate-aurora" : "animate-float-slow"}
            style={{
              position: "absolute",
              inset: "-20%",
              background: `radial-gradient(45% 40% at 20% 15%, ${theme.primary}30 0%, transparent 65%), radial-gradient(45% 40% at 80% 70%, ${theme.accent}28 0%, transparent 65%)`,
            }}
          />
        </div>
      ) : null}

      <div className="relative">
        {blocks.map((instance) => {
          const def = getBlockDefinition(instance.type);
          const props = resolveBlockProps(instance);
          if (!def || !props) return null;
          const Block = def.Component;
          const isOverlay = def.group === "effects" && def.type !== "confetti" && def.type !== "gif";

          if (isOverlay) {
            return (
              <div key={instance.id} className="pointer-events-none fixed inset-0 z-0">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Block props={props as any} theme={theme} mode={mode} />
              </div>
            );
          }

          return (
            <motion.div
              key={instance.id}
              className="relative z-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={variants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Block props={props as any} theme={theme} mode={mode} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
