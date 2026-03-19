"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Group } from "three";

function RotatingField({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.03;
    groupRef.current.rotation.x += delta * 0.01;
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={160}
        depth={80}
        count={reducedMotion ? 2000 : 5200}
        factor={4}
        saturation={0}
        fade
        speed={reducedMotion ? 0.05 : 0.5}
      />
    </group>
  );
}

export function StarsBackground() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div aria-hidden className="space-stars pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <RotatingField reducedMotion={reducedMotion} />
      </Canvas>
      <div className="space-glow-layer" />
      <div className="space-vignette-layer" />
    </div>
  );
}
