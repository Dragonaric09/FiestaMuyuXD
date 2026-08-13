"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGuest } from "@/hooks/useGuest";

export function RSVPForm() {
  const [name, setName] = useState("");
  const { isLoading, error, registeredGuest, submitRsvp } = useGuest();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitRsvp(name);
  }

  if (registeredGuest) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          Expediente asignado
        </span>

        <p className="mt-4 font-typewriter text-3xl uppercase tracking-widest text-zinc-900 md:text-4xl">
          No. {String(registeredGuest.id).padStart(4, "0")}
        </p>

        <p className="mt-4 font-serif italic text-zinc-600">
          Su presencia ha quedado registrada en el expediente, {registeredGuest.name}.
        </p>

        <a
          href="#"
          className="mt-8 border border-zinc-800 px-6 py-3 font-typewriter text-xs uppercase tracking-widest text-zinc-800 transition-colors duration-500 hover:bg-zinc-800 hover:text-white"
        >
          Añadir a Google Calendar
        </a>
      </div>
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
        <p className="text-sm font-serif italic text-red-600">
          ❌ {error}
        </p>
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
