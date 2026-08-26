import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useBackgroundMusic, type BackgroundMusicOptions } from "@/hooks/useBackgroundMusic";
import { getTrackByUrl } from "@/lib/demo-music";
import { cn } from "@/lib/utils";

export interface BackgroundMusicProps extends BackgroundMusicOptions {
  title?: string;
  artist?: string;
  showControls?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
  theme?: "dark" | "light" | "auto";
}

export function BackgroundMusic({
  src,
  enabled = true,
  volume = 0.6,
  loop = true,
  autoplay = true,
  startOnInteraction = true,
  title,
  artist,
  showControls = true,
  position = "top-right",
  className,
  theme = "dark",
}: BackgroundMusicProps) {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useBackgroundMusic({
    src,
    enabled,
    volume,
    loop,
    autoplay,
    startOnInteraction,
  });

  const [hovered, setHovered] = useState(false);

  // If no audio track or music is explicitly disabled, render nothing
  if (!src || !enabled) return null;

  // Resolve track metadata
  const detectedTrack = getTrackByUrl(src);
  const displayTitle = title || detectedTrack?.title || "Background Music";
  const displayArtist = artist || detectedTrack?.artist || "";

  if (!showControls) return null;

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }[position];

  return (
    <div
      className={cn(
        "fixed z-[9999] pointer-events-auto select-none flex items-center gap-2",
        positionClasses,
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex items-center"
      >
        {/* Expanded Info Pill on Hover or Initial Load */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: position.includes("right") ? 10 : -10, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: position.includes("right") ? 10 : -10, width: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "overflow-hidden whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-medium backdrop-blur-md border shadow-lg mr-2",
                theme === "light"
                  ? "bg-white/80 text-gray-800 border-gray-200/80 shadow-black/5"
                  : "bg-black/75 text-white/90 border-white/15 shadow-black/40",
              )}
            >
              <div className="flex items-center gap-1.5">
                <Music className="h-3 w-3 text-pink-400 animate-pulse" />
                <span className="truncate max-w-[130px] font-semibold">{displayTitle}</span>
                {displayArtist && <span className="text-white/40 text-[9px]">• {displayArtist}</span>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Play/Pause/Mute Button */}
        <motion.button
          type="button"
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          title={isPlaying ? `Pause: ${displayTitle}` : `Play: ${displayTitle}`}
          className={cn(
            "relative group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all shadow-xl",
            theme === "light"
              ? "bg-white/85 border-gray-300 text-gray-800 hover:bg-white hover:border-pink-500/50"
              : "bg-black/65 border-white/20 text-white hover:bg-black/85 hover:border-pink-500/50 shadow-pink-500/10",
            isPlaying && "border-pink-500/60 shadow-[0_0_20px_rgba(236,72,153,0.3)]",
          )}
        >
          {/* Animated soundwave rings when playing */}
          {isPlaying && (
            <>
              <motion.span
                className="absolute -inset-1 rounded-full border border-pink-500/40 pointer-events-none"
                animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute -inset-2 rounded-full border border-violet-400/30 pointer-events-none"
                animate={{ scale: [1, 1.65], opacity: [0.4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
              />
            </>
          )}

          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-white/50 group-hover:text-white/80" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
}
