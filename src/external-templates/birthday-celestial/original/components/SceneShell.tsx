import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SceneShellProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footerSlot?: ReactNode;
  className?: string;
  maxWidth?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function SceneShell({
  title,
  subtitle,
  children,
  footerSlot,
  className = "",
  maxWidth = "max-w-3xl",
}: SceneShellProps) {
  return (
    <div
      className={`relative flex w-full flex-1 flex-col items-center justify-between px-5 py-6 sm:py-8 ${className}`}
    >
      {/* Top title area */}
      <header className="mb-4 text-center">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="text-4xl leading-tight text-glow sm:text-5xl font-serif tracking-tight"
          >
            {title}
          </motion.h2>
        )}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease }}
            className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {subtitle}
          </motion.p>
        )}
      </header>

      {/* Main content slot */}
      <div className={`my-auto flex w-full flex-col items-center justify-center ${maxWidth}`}>
        {children}
      </div>

      {/* Footer controls / action */}
      {footerSlot && (
        <motion.footer
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease }}
          className="mt-6 flex flex-col items-center gap-3 text-center"
        >
          {footerSlot}
        </motion.footer>
      )}
    </div>
  );
}
