"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AutoRefresh({ intervalMs = 10000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      // router.refresh() le pide a Next.js que re-obtenga los Server Components
      // sin perder el estado del cliente ni hacer una recarga completa de la página.
      router.refresh();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [router, intervalMs]);

  return null; // Este componente no renderiza nada en la UI
}
