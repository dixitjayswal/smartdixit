"use client";

/* eslint-disable react-hooks/purity, react-hooks/immutability --
   React Three Fiber is imperative by design: useFrame mutates Three.js objects
   (positions, matrices, scales) every frame, and the scene seeds randomness
   once at setup. These live outside React's render/purity model, so the
   compiler purity + immutability rules don't apply here. */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Palettes per theme. Light mode uses darker, saturated colors (no additive
// glow) so the network stays visible on a light background.
const PALETTE = {
  dark: {
    a: new THREE.Color("#3b82f6"),
    b: new THREE.Color("#8b5cf6"),
    c: new THREE.Color("#22d3ee"),
    line: new THREE.Color("#3b82f6"),
    lineOpacity: 0.22,
    fog: "#0a0e1a",
  },
  light: {
    a: new THREE.Color("#2563eb"),
    b: new THREE.Color("#7c3aed"),
    c: new THREE.Color("#0891b2"),
    line: new THREE.Color("#6366f1"),
    lineOpacity: 0.4,
    fog: "#eef1f7",
  },
};

const NODE_COUNT = 56;
const RADIUS = 3.4;
const EDGE_THRESHOLD = 1.85;
const PACKET_COUNT = 34;

type Topology = {
  positions: THREE.Vector3[];
  /** 0 | 1 | 2 — maps to the a/b/c palette color, stable across theme swaps. */
  colorType: number[];
  edges: { a: number; b: number }[];
  linePositions: Float32Array;
};

/** Distribute nodes on a fibonacci sphere, then wire nearby ones together. */
function buildTopology(): Topology {
  const positions: THREE.Vector3[] = [];
  const colorType: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const rad = RADIUS * (0.82 + Math.random() * 0.18);
    positions.push(
      new THREE.Vector3(
        Math.cos(theta) * r * rad,
        y * rad,
        Math.sin(theta) * r * rad,
      ),
    );
    const t = Math.random();
    colorType.push(t < 0.55 ? 0 : t < 0.85 ? 1 : 2);
  }

  const edges: { a: number; b: number }[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (positions[i].distanceTo(positions[j]) < EDGE_THRESHOLD) {
        edges.push({ a: i, b: j });
      }
    }
  }

  const linePositions = new Float32Array(edges.length * 6);
  edges.forEach((e, i) => {
    const a = positions[e.a];
    const b = positions[e.b];
    linePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
  });

  return { positions, colorType, edges, linePositions };
}

function Network({ light }: { light: boolean }) {
  const pal = light ? PALETTE.light : PALETTE.dark;
  const group = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const packetsMesh = useRef<THREE.InstancedMesh>(null);
  const core = useRef<THREE.Mesh>(null);

  const topo = useMemo(() => buildTopology(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(
    () => topo.positions.map(() => Math.random() * Math.PI * 2),
    [topo],
  );

  const packets = useMemo(
    () =>
      Array.from({ length: PACKET_COUNT }, () => ({
        edge: Math.floor(Math.random() * topo.edges.length),
        t: Math.random(),
        speed: 0.18 + Math.random() * 0.4,
      })),
    [topo],
  );

  // (Re)apply per-instance node colors whenever the theme changes.
  useEffect(() => {
    const mesh = nodesMesh.current;
    if (!mesh) return;
    const colors = [pal.a, pal.b, pal.c];
    topo.colorType.forEach((type, i) => mesh.setColorAt(i, colors[type]));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [pal, topo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.12;
      g.rotation.x = THREE.MathUtils.lerp(
        g.rotation.x,
        -state.pointer.y * 0.4,
        0.04,
      );
      g.rotation.z = THREE.MathUtils.lerp(
        g.rotation.z,
        state.pointer.x * 0.12,
        0.04,
      );
    }

    const nm = nodesMesh.current;
    if (nm) {
      for (let i = 0; i < NODE_COUNT; i++) {
        const pulse = 1 + Math.sin(t * 1.6 + phases[i]) * 0.22;
        dummy.position.copy(topo.positions[i]);
        dummy.scale.setScalar((light ? 0.085 : 0.06) * pulse + 0.05);
        dummy.updateMatrix();
        nm.setMatrixAt(i, dummy.matrix);
      }
      nm.instanceMatrix.needsUpdate = true;
    }

    const pm = packetsMesh.current;
    if (pm) {
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        p.t += p.speed * delta;
        if (p.t > 1) {
          p.t -= 1;
          p.edge = Math.floor(Math.random() * topo.edges.length);
        }
        const e = topo.edges[p.edge];
        dummy.position.lerpVectors(topo.positions[e.a], topo.positions[e.b], p.t);
        dummy.scale.setScalar(light ? 0.07 : 0.05);
        dummy.updateMatrix();
        pm.setMatrixAt(i, dummy.matrix);
      }
      pm.instanceMatrix.needsUpdate = true;
    }

    if (core.current) {
      core.current.scale.setScalar(0.42 * (1 + Math.sin(t * 2) * 0.12));
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[topo.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={pal.line}
          transparent
          opacity={pal.lineOpacity}
          toneMapped={false}
        />
      </lineSegments>

      <instancedMesh ref={nodesMesh} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={packetsMesh} args={[undefined, undefined, PACKET_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={pal.c} toneMapped={false} />
      </instancedMesh>

      <mesh ref={core}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={pal.a} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function HeroScene({
  reduced = false,
  light = false,
}: {
  reduced?: boolean;
  light?: boolean;
}) {
  const pal = light ? PALETTE.light : PALETTE.dark;

  return (
    <Canvas
      camera={{ position: [0, 0, 10.5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={[pal.fog, 9, 18]} />
      <Network light={light} />
      {/* Bloom only reads on dark backgrounds; skip it in light mode. */}
      {!light && (
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={1.15}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            radius={0.75}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
