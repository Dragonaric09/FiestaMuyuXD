"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useGuest } from "@/hooks/useGuest";
import { generateCalendarUrl } from "@/lib/utils";
import { EventTicketModal } from "@/components/landing/EventTicketModal";

export function RSVPForm() {
  const [name, setName] = useState("");
  const [ticketOpen, setTicketOpen] = useState(false);
  const { isLoading, error, registeredGuest, submitRsvp } = useGuest();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitRsvp(name);
  }

  // Se abre solo apenas el registro fue exitoso
  useEffect(() => {
    if (registeredGuest) setTicketOpen(true);
  }, [registeredGuest]);

  if (registeredGuest) {
    const folioFormateado = String(registeredGuest.id).padStart(4, "0");
    return (
      <>
        <div className="flex w-full max-w-sm flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            Expediente asignado
          </span>

          <p className="mt-4 font-typewriter text-3xl uppercase tracking-widest text-zinc-900 md:text-4xl">
            No. {folioFormateado}
          </p>

          <p className="mt-4 font-serif italic text-zinc-600">
            Su presencia ha quedado registrada en el expediente,{" "}
            {registeredGuest.name}.
          </p>

          <div className="mt-6 w-full">
            <Button
              onClick={() => setTicketOpen(true)}
              variant="outline"
              className="h-12 w-full rounded-none border-zinc-800 px-6 font-typewriter text-xs uppercase tracking-widest text-zinc-800 transition-all duration-500 hover:bg-zinc-800 hover:text-white"
            >
              Ver mi entrada
            </Button>
          </div>
        </div>

        <EventTicketModal
          open={ticketOpen}
          onOpenChange={setTicketOpen}
          guestName={registeredGuest.name}
          folioFormateado={folioFormateado}
          calendarUrl={generateCalendarUrl(folioFormateado)}
        />
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col items-center gap-4"
    >
      <label
        htmlFor="guest-name"
        className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500"
      >
        Nombre para el expediente
      </label>

      <Input
        id="guest-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escriba su nombre"
        disabled={isLoading}
        required
        className="rounded-none border-zinc-400 bg-white/40 text-center font-serif text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-zinc-700 disabled:opacity-50"
      />

      {error && (
        <p className="text-sm font-serif italic text-red-600">❌ {error}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        variant="outline"
        className="mt-2 rounded-none border-zinc-800 font-typewriter uppercase tracking-widest text-zinc-800 transition-all duration-500 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Registrando..." : "Confirmar"}
      </Button>
    </form>
  );
}