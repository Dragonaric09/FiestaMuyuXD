"use server";

import prisma from "@/lib/prisma";

export async function registerGuest(name: string) {
  try {
    if (!name || name.trim().length === 0) {
      return {
        success: false,
        error: "El nombre no puede estar vacío",
      };
    }

    console.log("🟡 Intentando registrar:", name);
    console.log("🛠️ URL que Next.js está usando:", process.env.DATABASE_URL);

    const guest = await prisma.guest.create({
      data: {
        name: name.trim(),
      },
    });

    console.log("🟢 Invitado registrado:", guest);

    return {
      success: true,
      data: {
        id: guest.id,
        name: guest.name,
        rsvpStatus: guest.rsvpStatus,
      },
    };
  } catch (error) {
    console.error("🔴 ERROR REAL DE PRISMA:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Error desconocido de Prisma",
    };
  }
}