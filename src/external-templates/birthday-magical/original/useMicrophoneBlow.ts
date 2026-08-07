import { useCallback, useEffect, useRef, useState } from "react";

export type MicStatus = "idle" | "active" | "denied" | "unsupported";

interface UseMicrophoneBlowOptions {
  onBlow: () => void;
  threshold?: number;
  cooldownFrames?: number;
  lowBins?: number;
}

interface UseMicrophoneBlowReturn {
  status: MicStatus;
  start: () => Promise<void>;
  stop: () => void;
}

export function useMicrophoneBlow({
  onBlow, threshold = 60, cooldownFrames = 38, lowBins = 20,
}: UseMicrophoneBlowOptions): UseMicrophoneBlowReturn {
  const [status, setStatus] = useState<MicStatus>("idle");
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const cooldownRef = useRef(0);
  const onBlowRef = useRef(onBlow);

  useEffect(() => { onBlowRef.current = onBlow; }, [onBlow]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close().catch(() => undefined);
    audioCtxRef.current = null;
    analyserRef.current = null;
    dataRef.current = null;
    setStatus("idle");
  }, []);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported"); return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      const AudioCtxCtor = window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxCtor) { setStatus("unsupported"); return; }
      const ctx = new AudioCtxCtor();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      analyserRef.current = analyser;
      const bins = Math.min(lowBins, analyser.frequencyBinCount);
      dataRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
      setStatus("active");
      const tick = () => {
        if (!analyserRef.current || !dataRef.current) return;
        analyserRef.current.getByteFrequencyData(dataRef.current);
        let sum = 0;
        for (let i = 0; i < bins; i++) sum += (dataRef.current[i] ?? 0);
        const avg = sum / bins;
        cooldownRef.current = Math.max(0, cooldownRef.current - 1);
        if (avg > threshold && cooldownRef.current === 0) {
          cooldownRef.current = cooldownFrames;
          onBlowRef.current();
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch { setStatus("denied"); }
  }, [threshold, cooldownFrames, lowBins]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioCtxRef.current?.close().catch(() => undefined);
    };
  }, []);

  return { status, start, stop };
}
