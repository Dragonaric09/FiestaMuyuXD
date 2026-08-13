"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function ManuscriptCover({ onOpen }: { onOpen: () => void }) {
  const titleRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const el = titleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#E8E0CC] px-6 text-center paper-grain"
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
        File No. 1989 · Confidential
      </span>

      {/* Título censurado: mueve el mouse encima para revelar */}
      <div ref={titleRef} className="redacted-title relative mt-6">
        <h1 className="font-typewriter text-4xl uppercase leading-tight text-zinc-900 md:text-6xl">
          The Tortured
          <br />
          Poets Department
        </h1>
        <div className="redacted-overlay" aria-hidden="true" />
      </div>

      <p className="mt-6 max-w-xs font-serif italic text-zinc-700">
        Se requiere su presencia en el departamento.
      </p>

      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        className="mt-10 border border-zinc-800 px-6 py-3 font-typewriter uppercase tracking-widest text-zinc-800 transition-colors duration-500 hover:bg-zinc-800 hover:text-white"
      >
        Abrir el expediente
      </motion.button>
    </main>
  );
}