import { useState } from "react";
import { registerGuest } from "@/services/guest.service";

interface RegisteredGuest {
  id: number;
  name: string;
  rsvpStatus: string;
}

interface UseGuestReturn {
  isLoading: boolean;
  error: string | null;
  registeredGuest: RegisteredGuest | null;
  submitRsvp: (name: string) => Promise<void>;
}

export function useGuest(): UseGuestReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredGuest, setRegisteredGuest] = useState<RegisteredGuest | null>(null);

  const submitRsvp = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerGuest(name);

      if (response.success && response.data) {
        setRegisteredGuest(response.data);
        console.log("✅ Invitado registrado:", response.data);
      } else {
        setError(response.error || "Error desconocido");
        console.error("❌ Error al registrar:", response.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error inesperado";
      setError(errorMessage);
      console.error("❌ Exception en submitRsvp:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    registeredGuest,
    submitRsvp,
  };
}
