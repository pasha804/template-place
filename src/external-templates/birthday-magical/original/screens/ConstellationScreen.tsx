import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import HapticButton from "../HapticButton";

/* A heart-shaped constellation. Points are placed on a parametric heart curve
   in 3D space, connected by soft glowing lines. Points twinkle. */
function HeartConstellation({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, linePositions, count } = useMemo(() => {
    const N = 64;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      // parametric heart (scaled)
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const z = Math.sin(t * 3) * 1.2;
      pts.push(new THREE.Vector3(x * 0.12, y * 0.12 + 0.4, z * 0.12));
    }
    const positions = new Float32Array(N * 3);
    pts.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    // Line segments between consecutive points
    const linePositions = new Float32Array(N * 2 * 3);
    for (let i = 0; i < N; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % N];
      linePositions[i * 6] = a.x;
      linePositions[i * 6 + 1] = a.y;
      linePositions[i * 6 + 2] = a.z;
      linePositions[i * 6 + 3] = b.x;
      linePositions[i * 6 + 4] = b.y;
      linePositions[i * 6 + 5] = b.z;
    }
    return { positions, linePositions, count: N };
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.4;
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + progress * 0.6;
    }
  });

  const visibleCount = Math.max(1, Math.floor(count * progress));

  return (
    <group ref={group}>
      {/* Glow points */}
      {Array.from({ length: visibleCount }).map((_, i) => (
        <Star key={i} position={[positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]} seed={i} />
      ))}
      {/* Connecting lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions.slice(0, visibleCount * 6), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#f472b6" transparent opacity={0.4} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

function Star({ position, seed }: { position: [number, number, number]; seed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + seed;
    const s = 0.9 + Math.sin(t * 3) * 0.15;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color="#fff2b0" toneMapped={false} />
    </mesh>
  );
}

export default function ConstellationScreen({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [starField, setStarField] = useState(900);

  useEffect(() => {
    setStarField(window.innerWidth < 640 ? 900 : 2500);
  }, []);

  useFrameLikeInterval(() => {
    setProgress((p) => {
      if (p >= 1) return 1;
      const next = Math.min(1, p + 0.012);
      if (next >= 1) setDone(true);
      return next;
    });
  }, 40);

  return (
    <motion.div
      key="constellation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-4 py-8 sm:py-10"
    >
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-[#fbbf24]/80">â€” Chapter VII â€”</span>
        <h2 style={{ fontFamily: "var(--bt7-font-display)" }} className="bt7-text-gradient-warm bt7-section-heading">
          Your Constellation
        </h2>
        <p className="max-w-md text-sm text-[#fda4af] sm:text-base">
          Every star drawn from the night, just to spell you.
        </p>
      </div>

      <div className="relative h-[min(52dvh,480px)] w-full max-w-[720px] sm:h-[60dvh] sm:max-h-[520px]">
        <Canvas
          camera={{ position: [0, 0, 4.6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          style={{ touchAction: "none" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <Stars
              radius={30}
              depth={40}
              count={starField}
              factor={4}
              saturation={0}
              fade
              speed={0.5}
            />
            <HeartConstellation progress={progress} />
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        {done && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <HapticButton onClick={onNext}>Open the Wishes ðŸ’Œ</HapticButton>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// tiny helper using effect + interval to avoid r3f coupling outside Canvas
function useFrameLikeInterval(cb: () => void, ms: number) {
  useEffect(() => {
    const id = setInterval(cb, ms);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

