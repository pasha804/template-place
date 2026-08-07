import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const matChoc  = new THREE.MeshStandardMaterial({ color: "#4a2c1a", roughness: 0.52, metalness: 0.04 });
const matDrip  = new THREE.MeshStandardMaterial({ color: "#2d1200", roughness: 0.38, metalness: 0.04 });
const matGold  = new THREE.MeshStandardMaterial({ color: "#d4af37", roughness: 0.22, metalness: 0.88,
  emissive: new THREE.Color("#d4af37"), emissiveIntensity: 0.22 });
const matPlate = new THREE.MeshStandardMaterial({ color: "#eeeef2", roughness: 0.15, metalness: 0.75 });
const matStem  = new THREE.MeshStandardMaterial({ color: "#d4d4da", roughness: 0.22, metalness: 0.68 });
const matWhite = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.4, transparent: true, opacity: 0.4 });
const matWick  = new THREE.MeshStandardMaterial({ color: "#1a0a00", roughness: 1 });
const WAX_COLORS  = ["#ff6b9d","#ffd166","#a29bfe","#55efc4","#fd79a8"] as const;
const FLAME_TINTS = ["#ff9ff3","#ffeaa7","#c3b1e1","#81ecec","#fab1d3"] as const;
const matWax = WAX_COLORS.map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0 }));

const TR = 0.60; const TH = 0.36; const TIER_Y = 1.18;

function Flame({ lit, seed, tint }: { lit: boolean; seed: number; tint: string }) {
  const bodyRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const iv = useRef(lit ? 1 : 0);

  useFrame(({ clock }) => {
    const e = clock.getElapsedTime() + seed * 2.3;
    iv.current += ((lit ? 1 : 0) - iv.current) * 0.14;
    const v = iv.current;
    if (v < 0.005) return;
    const flick = 1 + Math.sin(e * 26) * 0.08 + Math.sin(e * 15 + seed) * 0.05;
    const sway  = Math.sin(e * 4 + seed) * 0.007;
    if (bodyRef.current) {
      bodyRef.current.scale.set(v * 0.85, v * flick, v * 0.85);
      bodyRef.current.position.x = sway;
      (bodyRef.current.material as THREE.MeshBasicMaterial).opacity = v * 0.92;
    }
    if (haloRef.current) {
      haloRef.current.scale.setScalar(v * (0.8 + Math.sin(e * 6) * 0.12));
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity = v * 0.2;
    }
  });

  return (
    <group position={[0, 0.21, 0]}>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.26, 10, 10]} />
        <meshBasicMaterial color={tint} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={bodyRef} position={[0, 0.06, 0]}>
        <coneGeometry args={[0.042, 0.2, 7]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0} depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Candle({ position, lit, index, onClick }: {
  position: [number,number,number]; lit: boolean; index: number; onClick: () => void;
}) {
  const tint = FLAME_TINTS[index % FLAME_TINTS.length] ?? "#ffeaa7";
  const wax  = matWax[index % matWax.length]!;
  return (
    <group position={position}>
      <mesh castShadow material={wax}><cylinderGeometry args={[0.03, 0.032, 0.36, 12]} /></mesh>
      <mesh position={[0, 0, 0]} material={matWhite}><torusGeometry args={[0.032, 0.004, 5, 12]} /></mesh>
      <mesh position={[0, 0.19, 0]} material={matWick}><cylinderGeometry args={[0.003, 0.003, 0.05, 5]} /></mesh>
      <Flame lit={lit} seed={index * 2.17} tint={tint} />
      <mesh position={[0, 0.21, 0]} onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}>
        <sphereGeometry args={[0.32, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function DripRing({ y, radius }: { y: number; radius: number }) {
  return <mesh position={[0, y, 0]} material={matDrip}><torusGeometry args={[radius, 0.045, 8, 32]} /></mesh>;
}

function GoldBand({ y, radius }: { y: number; radius: number }) {
  return <mesh position={[0, y, 0]} material={matGold}><torusGeometry args={[radius, 0.013, 8, 28]} /></mesh>;
}

function DotSprinkles({ radius, y, count = 18 }: { radius: number; y: number; count?: number }) {
  const dots = useMemo(() => {
    const cols = ["#ff6b9d","#ffd166","#a29bfe","#55efc4","#fd79a8"];
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return { pos: [Math.cos(a) * radius, y, Math.sin(a) * radius] as [number,number,number], color: cols[i % cols.length]! };
    });
  }, [radius, y, count]);
  const mats = useMemo(() => {
    const cols = ["#ff6b9d","#ffd166","#a29bfe","#55efc4","#fd79a8"];
    return cols.map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.35, metalness: 0.1,
      emissive: new THREE.Color(c), emissiveIntensity: 0.45 }));
  }, []);
  return (
    <>
      {dots.map((d, i) => (
        <mesh key={i} position={d.pos} material={mats[i % mats.length]}>
          <sphereGeometry args={[0.028, 5, 5]} />
        </mesh>
      ))}
    </>
  );
}

const starMats: Record<string, THREE.MeshStandardMaterial> = {};
function StarGem({ position, color, phase }: { position: [number,number,number]; color: string; phase: number }) {
  const ref = useRef<THREE.Group>(null);
  if (!starMats[color]) {
    starMats[color] = new THREE.MeshStandardMaterial({ color, roughness: 0.12, metalness: 0.65,
      emissive: new THREE.Color(color), emissiveIntensity: 0.55 });
  }
  const mat = starMats[color]!;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.9 + phase) * 0.08;
    ref.current.rotation.y = t * 0.6 + phase;
    ref.current.rotation.z = t * 0.3;
  });
  return (
    <group ref={ref} position={position}>
      <mesh material={mat}><octahedronGeometry args={[0.055, 0]} /></mesh>
    </group>
  );
}

function CakeGroup({ flames, onCandleClick }: { flames: boolean[]; onCandleClick: (i:number)=>void }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (groupRef.current) groupRef.current.rotation.y += dt * 0.05; });
  const candlePos = useMemo<[number,number,number][]>(() =>
    Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2 + Math.PI / 2;
      return [Math.cos(a) * 0.3, TIER_Y + TH / 2 + 0.01, Math.sin(a) * 0.3];
    }), []);

  const BR = 1.18; const BH = 0.50; const BY = 0.25;
  const MR = 0.90; const MH = 0.44; const MY = 0.77;

  return (
    <group ref={groupRef} position={[0, -0.72, 0]}>
      <mesh position={[0, -0.025, 0]} receiveShadow material={matPlate}><cylinderGeometry args={[1.52, 1.58, 0.07, 32]} /></mesh>
      <mesh position={[0, -0.155, 0]} material={matStem}><cylinderGeometry args={[0.18, 0.30, 0.19, 20]} /></mesh>
      <GoldBand y={0.012} radius={1.48} />

      <mesh position={[0, BY, 0]} castShadow receiveShadow material={matChoc}><cylinderGeometry args={[BR, BR + 0.015, BH, 32]} /></mesh>
      <mesh position={[0, BY + BH/2 + 0.001, 0]} rotation={[-Math.PI/2,0,0]} material={matDrip}><circleGeometry args={[BR, 32]} /></mesh>
      <DripRing y={BY + BH/2 - 0.02} radius={BR} />
      <GoldBand y={BY + BH/2 + 0.005} radius={BR * 0.93} />
      <GoldBand y={BY - BH/2 + 0.008} radius={BR} />
      <DotSprinkles radius={BR * 0.87} y={BY + BH/2 + 0.016} count={18} />

      <mesh position={[0, MY, 0]} castShadow receiveShadow material={matChoc}><cylinderGeometry args={[MR, MR + 0.01, MH, 28]} /></mesh>
      <mesh position={[0, MY + MH/2 + 0.001, 0]} rotation={[-Math.PI/2,0,0]} material={matDrip}><circleGeometry args={[MR, 28]} /></mesh>
      <DripRing y={MY + MH/2 - 0.02} radius={MR} />
      <GoldBand y={MY + MH/2 + 0.005} radius={MR * 0.92} />
      <GoldBand y={MY - MH/2 + 0.008} radius={MR} />
      <DotSprinkles radius={MR * 0.86} y={MY + MH/2 + 0.014} count={14} />

      <group position={[0, TIER_Y, 0]}>
        <mesh castShadow receiveShadow material={matChoc}><cylinderGeometry args={[TR, TR, TH, 24]} /></mesh>
        <mesh position={[0, TH/2+0.001, 0]} rotation={[-Math.PI/2,0,0]} material={matDrip}><circleGeometry args={[TR, 24]} /></mesh>
        <DripRing y={TH/2 - 0.018} radius={TR} />
        <GoldBand y={TH/2 + 0.004} radius={TR * 0.9} />
        <GoldBand y={-TH/2 - 0.002} radius={TR} />
        <DotSprinkles radius={TR * 0.8} y={TH/2 + 0.014} count={10} />
        {candlePos.map((p, i) => (
          <Candle key={i} position={[p[0], p[1] - TIER_Y, p[2]]} lit={flames[i] ?? false} index={i} onClick={() => onCandleClick(i)} />
        ))}
      </group>

      <StarGem position={[-1.5, 1.05, 0.75]} color="#ffd166" phase={0} />
      <StarGem position={[1.55, 1.35, -0.65]} color="#ff6b9d" phase={2.1} />
      <StarGem position={[0.65, 1.7, 1.2]} color="#a29bfe" phase={4.2} />
    </group>
  );
}

interface CakeSceneProps { flames: boolean[]; onCandleClick: (i:number)=>void; }

export default function CakeScene({ flames, onCandleClick }: CakeSceneProps) {
  return (
    <>
      <color attach="background" args={["#0a0a12"]} />
      <fog attach="fog" args={["#0a0a12", 9, 20]} />
      <hemisphereLight args={["#ffe4c8", "#3d1a0a", 0.85]} />
      <directionalLight position={[3, 6, 4]} intensity={1.4} castShadow
        shadow-mapSize-width={512} shadow-mapSize-height={512}
        shadow-camera-near={0.5} shadow-camera-far={18}
        shadow-camera-left={-4} shadow-camera-right={4}
        shadow-camera-top={4} shadow-camera-bottom={-4} />
      <directionalLight position={[-2, 2, -4]} intensity={0.35} color="#ffd7b0" />
      <CakeGroup flames={flames} onCandleClick={onCandleClick} />
      <Sparkles count={35} scale={[4.5, 3, 4.5]} size={2.4} speed={0.2} color="#fbbf24" />
      <Sparkles count={18} scale={[3.5, 2.5, 3.5]} size={1.6} speed={0.28} color="#f472b6" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.44, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
      <OrbitControls enablePan={false} enableZoom={false} enableRotate
        minPolarAngle={Math.PI / 3.8} maxPolarAngle={Math.PI / 2.05} rotateSpeed={0.35} makeDefault />
    </>
  );
}
