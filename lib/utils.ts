import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCalendarUrl(folioNumber: string) {
  const text = encodeURIComponent("The Protocol - TTPD (Folio No. " + folioNumber + ")");
  const dates = encodeURIComponent("20260821T170000Z/20260822T080000Z");
  const details = encodeURIComponent("Se requiere su presencia en el departamento. Presente su número de folio en la entrada. Código de vestimenta: TTPD/Monocromático.");
  const location = encodeURIComponent("Cochabamba, Bolivia");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}
