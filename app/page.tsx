"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InvitationPage() {
  const [isOpened, setIsOpened] = useState(false);

  // PASO 1: LA PORTADA (Cerrada)
  if (!isOpened) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#E8E0CC] px-6 text-center">
        {/* Sello de expediente */}
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
          File No. 1989
        </span>
        <span className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
          Confidential
        </span>

        {/* Título principal */}
        <h1 className="font-typewriter text-4xl uppercase leading-tight text-zinc-900 md:text-6xl">
          The Tortured
          <br />
          Poets Department
        </h1>

        <p className="mt-6 max-w-xs font-serif italic text-zinc-700">
          Se requiere su presencia en el departamento.
        </p>

        {/* Botón */}
        <Button
          onClick={() => setIsOpened(true)}
          variant="outline"
          className="mt-10 font-typewriter uppercase tracking-widest rounded-none border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white transition-all duration-500"
        >
          Abrir el expediente
        </Button>
      </main>
    );
  }

  // PASO 2: LA INVITACIÓN (Abierta)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Aquí irá la invitación, la cuenta regresiva y la música */}
    </main>
  );
}