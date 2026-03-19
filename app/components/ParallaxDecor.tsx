"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function ParallaxDecor() {
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const driftLeft = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120]);
  const driftRight = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 130]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -90]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ x: driftLeft, y: rise }}
        className="absolute top-28 left-[8%] h-40 w-40 rounded-full border border-cyan-200/30 bg-cyan-300/8 blur-[1px]"
      />
      <motion.div
        style={{ x: driftRight }}
        className="absolute top-[42%] right-[10%] h-56 w-56 rounded-full border border-violet-300/30 bg-violet-300/10 blur-[1px]"
      />
      <motion.div
        style={{ y: rise }}
        className="absolute bottom-[14%] left-[36%] h-24 w-24 rounded-full border border-sky-200/35 bg-sky-300/15"
      />
    </div>
  );
}
