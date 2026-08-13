"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Countdown } from "@/components/landing/Countdown";
import { Button } from "@/components/ui/button";
import { InkParticles } from "@/components/landing/InkParticles";
import { Volume2, VolumeX } from "lucide-react";
import { RSVPForm } from "@/components/landing/RSVPForm";

export default function InvitationPage() {
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fecha objetivo con zona horaria explícita (Bolivia = UTC-4)
  const partyDate = new Date("2026-10-09T20:00:00-04:00");

  const handleOpen = () => {
    setIsOpened(true);
    console.log("📂 Expediente abierto...");
  };

  // Reproducir audio cuando se abre el expediente
  useEffect(() => {
    if (isOpened && audioRef.current) {
      console.log("🎵 Audio element existe, intentando reproducir...");
      
      audioRef.current.muted = false;
      audioRef.current.currentTime = 0;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("✅ ÉXITO: Audio reproduciendo");
          })
          .catch((error) => {
            console.error("❌ ERROR al reproducir:", error.message);
            console.error("Detalles:", {
              readyState: audioRef.current?.readyState,
              networkState: audioRef.current?.networkState,
              src: audioRef.current?.src,
            });
          });
      }
    }
  }, [isOpened]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      console.log(audioRef.current.muted ? "🔇 Silenciado" : "🔊 Sonido activado");
      
      // Si está desmutado y no está reproduciendo, iniciar reproducción
      if (!audioRef.current.muted && audioRef.current.paused) {
        audioRef.current.play().catch(err => 
          console.error("Error al reproducir después de desmutear:", err)
        );
      }
    }
  };

  return (
    <>
      {/* Audio siempre presente en el DOM */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        crossOrigin="anonymous"
        src="/canciontaylor.mp3"
        onLoadedMetadata={() => console.log("📊 Metadatos cargados")}
        onCanPlay={() => console.log("▶️ Audio listo para reproducir")}
        onCanPlayThrough={() => console.log("✓ Audio listo completamente")}
        onPlay={() => console.log("🎵 Reproducción iniciada")}
        onPause={() => console.log("⏸️ Reproducción pausada")}
        onError={(e) => {
          const error = e.currentTarget.error;
          console.error("❌ Error de audio:", {
            code: error?.code,
            message: error?.message,
            src: (e.currentTarget as HTMLAudioElement).src,
          });
        }}
      />
      
      <AnimatePresence mode="wait">
      {!isOpened ? (
        <motion.main
          key="cover"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative flex min-h-screen flex-col items-center justify-center bg-[#E8E0CC] px-6 text-center"
        >
          <InkParticles />

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
            File No. 1989
          </span>
          <span className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
            Confidential
          </span>

          <h1 className="font-typewriter text-4xl uppercase leading-tight text-zinc-900 md:text-6xl">
            The Tortured
            <br />
            Poets Department
          </h1>

          <p className="mt-6 max-w-xs font-serif italic text-zinc-700">
            Se requiere su presencia en el departamento.
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
      ) : (
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

          {/* Control de audio accesible, requerido por WCAG 1.4.2 */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
            className="absolute right-6 top-6 z-20 rounded-full border border-zinc-400 p-2 text-zinc-700 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <div className="z-10 flex w-full max-w-2xl flex-col items-center pt-16 md:pt-24">
            <h2 className="mb-6 text-center font-typewriter text-2xl uppercase tracking-widest text-zinc-800 md:text-3xl">
              The Protocol
            </h2>

            <div className="mb-8 h-[1px] w-16 bg-zinc-400" />

            <p className="mb-12 max-w-md text-center font-sans leading-relaxed text-zinc-600">
              El departamento ha emitido una citación formal. Su presencia es
              requerida para la velada.
            </p>

            <div className="mb-16 border border-zinc-300 bg-white/40 p-8 shadow-sm backdrop-blur-sm">
              <Countdown targetDate={partyDate} />
            </div>

            <div className="mt-4 flex w-full flex-col items-center border-t border-zinc-300 pt-10">
              <div className="mb-4 font-typewriter text-xs uppercase tracking-widest text-zinc-400">
                <RSVPForm />
              </div>
            </div>
          </div>
        </motion.main>
      )}
      </AnimatePresence>
    </>
  );
}