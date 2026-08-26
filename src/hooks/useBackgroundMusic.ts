import { useEffect, useRef, useState, useCallback } from "react";

export interface BackgroundMusicOptions {
  src?: string | null;
  enabled?: boolean;
  volume?: number; // 0 to 1
  loop?: boolean;
  autoplay?: boolean;
  startOnInteraction?: boolean;
}

export function useBackgroundMusic({
  src,
  enabled = true,
  volume = 0.6,
  loop = true,
  autoplay = true,
  startOnInteraction = true,
}: BackgroundMusicOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Normalized safe source URL
  const safeSrc = src && typeof src === "string" ? src.trim() : "";
  const isAudioActive = Boolean(safeSrc && enabled);

  // Safe Play helper
  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isAudioActive) return;

    try {
      audio.volume = isMuted ? 0 : Math.min(Math.max(volume, 0), 1);
      audio.loop = loop;
      await audio.play();
      setIsPlaying(true);
      setError(null);
    } catch {
      // Autoplay blocked by browser policy or audio decoding pending
      setIsPlaying(false);
    }
  }, [isAudioActive, isMuted, volume, loop]);

  // Pause helper
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Toggle Play
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      tryPlay();
    }
  }, [isPlaying, pause, tryPlay]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audio.muted = nextMuted;
    if (!nextMuted && !isPlaying && isAudioActive) {
      tryPlay();
    }
  }, [isMuted, isPlaying, isAudioActive, tryPlay]);

  // Initialize and track source changes
  useEffect(() => {
    if (!isAudioActive) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setIsReady(false);
      return;
    }

    let isMounted = true;
    const audio = new Audio();
    audio.preload = "metadata";
    audio.loop = loop;
    audio.volume = isMuted ? 0 : Math.min(Math.max(volume, 0), 1);
    audioRef.current = audio;

    const onCanPlay = () => {
      if (!isMounted) return;
      setIsReady(true);
      if (autoplay && !isPlaying) {
        tryPlay();
      }
    };

    const onError = () => {
      if (!isMounted) return;
      setIsPlaying(false);
      setError("Audio failed to load");
    };

    const onEnded = () => {
      if (!loop && isMounted) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);

    audio.src = safeSrc;
    audio.load();

    if (autoplay) {
      tryPlay();
    }

    return () => {
      isMounted = false;
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [safeSrc, isAudioActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // Synchronize volume and loop dynamically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : Math.min(Math.max(volume, 0), 1);
      audioRef.current.loop = loop;
    }
  }, [volume, loop, isMuted]);

  // Browser Autoplay Fallback: First User Interaction Listener
  useEffect(() => {
    if (!isAudioActive || !startOnInteraction || isPlaying) return;

    const handleFirstInteraction = () => {
      if (!isPlaying && isAudioActive && audioRef.current) {
        tryPlay();
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, [isAudioActive, startOnInteraction, isPlaying, tryPlay]);

  return {
    isPlaying,
    isReady,
    isMuted,
    error,
    togglePlay,
    toggleMute,
    pause,
    play: tryPlay,
  };
}
