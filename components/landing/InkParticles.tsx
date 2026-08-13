"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Speck {
  x: number;
  y: number;
  d: number;
  delay: number;
}

export function InkParticles() {
  const [specks, setSpecks] = useState<Speck[]>([]);

  useEffect(() => {
    setSpecks(
      Array.from({ length: 250 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 6 + Math.random() * 6,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {specks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-[5px] w-[5px] rounded-full bg-zinc-900"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: s.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}