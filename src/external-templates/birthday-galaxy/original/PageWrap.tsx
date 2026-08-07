import { motion } from "framer-motion";
import { StarField } from "./StarField";
import type { ReactNode } from "react";

export function PageWrap({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 md:px-10 md:py-12">
      <StarField />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl"
      >
        {children}
      </motion.div>
    </main>
  );
}

export function CursiveTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-cursive text-gold-gradient shimmer text-5xl leading-tight md:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function GalaxyLink({ onClick, children }: { to?: string; onClick?: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="gx-btn inline-flex items-center gap-2"
    >
      {children}
    </motion.button>
  );
}
