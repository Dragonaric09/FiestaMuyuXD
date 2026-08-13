"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Countdown } from "@/components/landing/Countdown";
import { Button } from "@/components/ui/button";
import { InkParticles } from "@/components/landing/InkParticles";
import { Volume2, VolumeX } from "lucide-react";
import { RSVPForm } from "@/components/landing/RSVPForm";

type Stage = "cover" | "approving" | "invitation";

function daysUntil(target: Date) {
  const diffMs = target.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export default function InvitationPage() {
  const [stage, setStage] = useState<Stage>("cover");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fecha objetivo con zona horaria explícita (Bolivia = UTC-4)
  const partyDate = new Date("2026-08-22T17:00:00-04:00");
  const remainingDays = daysUntil(partyDate);

  const handleOpen = () => {
    setStage("approving");
    console.log("📂 Expediente abierto...");
  };

  // Reproducir audio en cuanto arranca la etapa de aprobación (mismo gesto de click)
  useEffect(() => {
    if (stage === "approving" && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("❌ ERROR al reproducir:", error.message);
      });
    }
  }, [stage]);

  // Transición automática: del sello de aprobación a la invitación
  useEffect(() => {
    if (stage !== "approving") return;
    const timer = setTimeout(() => setStage("invitation"), 1800);
    return () => clearTimeout(timer);
  }, [stage]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      if (!audioRef.current.muted && audioRef.current.paused) {
        audioRef.current.play().catch((err) =>
          console.error("Error al reproducir después de desmutear:", err)
        );
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        crossOrigin="anonymous"
        src="/canciontaylor.mp3"
        onError={(e) => {
          const error = e.currentTarget.error;
          console.error("❌ Error de audio:", {
            code: error?.code,
            message: error?.message,
          });
        }}
      />

      <AnimatePresence mode="wait">
        {/* ETAPA 1: PORTADA */}
        {stage === "cover" && (
          <motion.main
            key="cover"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative flex min-h-screen flex-col items-center justify-center bg-[#E8E0CC] px-6 text-center"
          >
            <InkParticles />

            <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
              File No. 1989 · Confidential
            </span>

            <h1 className="mt-6 font-typewriter text-4xl uppercase leading-tight text-zinc-900 md:text-6xl">
              The Tortured
              <br />
              Poets Department
            </h1>

            {/* Sello explícito: qué es esto, para quién no es fan de Taylor */}
            <div className="mt-6 -rotate-1 border-2 border-[#5C1F2E] px-4 py-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#5C1F2E]">
                Cumpleaños de Muyu
              </span>
            </div>

            <p className="mt-6 max-w-xs font-serif italic text-zinc-700">
              Ha sido usted seleccionado/a para asistir a esta celebración.
            </p>

            <Button
              onClick={handleOpen}
              variant="outline"
              aria-label="Abrir el expediente y ver la invitación"
              className="mt-10 font-typewriter uppercase tracking-widest rounded-none border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white transition-all duration-500"
            >
              Abrir el expediente
            </Button>
          </motion.main>
        )}

        {/* ETAPA 2: SELLO DE APROBACIÓN (transición) */}
        {stage === "approving" && (
          <motion.main
            key="approving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-screen flex-col items-center justify-center bg-[#E8E0CC] px-6 text-center"
          >
            <motion.div
              initial={{ scale: 1.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -4 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="border-4 border-[#5C1F2E] px-8 py-6"
            >
              <p className="font-typewriter text-2xl uppercase tracking-widest text-[#5C1F2E] md:text-3xl">
                Expediente Aprobado
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 font-mono text-sm uppercase tracking-widest text-zinc-700"
            >
              Faltan {remainingDays} {remainingDays === 1 ? "día" : "días"} para
              el cumpleaños de Muyu
            </motion.p>
          </motion.main>
        )}

        {/* ETAPA 3: INVITACIÓN */}
        {stage === "invitation" && (
          <motion.main
            key="invitation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative flex min-h-screen flex-col items-center bg-[#E8E0CC] p-6"
          >
            <div
              className="paper-grain pointer-events-none absolute inset-0"
              aria-hidden="true"
            />

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
              className="absolute right-6 top-6 z-20 rounded-full border border-zinc-400 p-2 text-zinc-700 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <div className="z-10 flex w-full max-w-2xl flex-col items-center pt-16 md:pt-24">
              <h2 className="text-center font-typewriter text-2xl uppercase tracking-widest text-zinc-800 md:text-3xl">
                The Protocol
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-[#5C1F2E]">
                Cumpleaños de Muyu
              </p>

              <div className="mb-8 mt-6 h-[1px] w-16 bg-zinc-400" />

              <p className="mb-12 max-w-md text-center font-sans leading-relaxed text-zinc-600">
                El departamento ha emitido una citación formal para el
                cumpleaños de Muyu. Su presencia es requerida para la velada.
              </p>

              <div className="mb-12 border border-zinc-300 bg-white/40 p-8 shadow-sm backdrop-blur-sm">
                <Countdown targetDate={partyDate} />
              </div>

              <div className="mb-12 flex flex-col items-center gap-2">
                <p className="font-typewriter text-lg uppercase tracking-widest text-zinc-800">
                  Cochabamba, Bolivia
                </p>
                <p className="max-w-sm text-center font-serif text-sm italic text-zinc-600">
                  (Las coordenadas exactas del departamento en Zona Quintanilla Sud se clasificarán en su folio al confirmar)
                </p>
              </div>

              <div className="mt-4 flex w-full flex-col items-center border-t border-zinc-300 pt-10">
                <p className="mb-1 font-typewriter text-sm uppercase tracking-widest text-zinc-800">
                  Confirme su asistencia
                </p>
                <p className="mb-6 max-w-xs text-center font-serif italic text-zinc-600">
                  Registre su nombre en el expediente para confirmar su
                  presencia en el cumpleaños de Muyu.
                </p>
                <RSVPForm />
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}