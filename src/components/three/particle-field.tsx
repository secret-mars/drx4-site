"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sz[i] = Math.random() * 3 + 1;
    }
    return { positions: pos, sizes: sz };
  }, []);

  // Set up geometry imperatively to avoid R3F typing issues
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  useEffect(() => {
    if (!geometryRef.current) return;
    geometryRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometryRef.current.setAttribute(
      "size",
      new THREE.BufferAttribute(sizes, 1)
    );
  }, [positions, sizes]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;

    // Smooth mouse follow
    mouseRef.current.x += (pointer.x * 0.5 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (pointer.y * 0.5 - mouseRef.current.y) * 0.02;

    meshRef.current.rotation.y =
      clock.elapsedTime * 0.02 + mouseRef.current.x * 0.3;
    meshRef.current.rotation.x = mouseRef.current.y * 0.2;

    // Gentle float animation
    const posAttr = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    if (posAttr) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const y = positions[i * 3 + 1];
        posAttr.setY(
          i,
          y + Math.sin(clock.elapsedTime * 0.3 + i * 0.1) * 0.05
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.06}
        color="#f7931a"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
