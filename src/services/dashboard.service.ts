"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllGuests() {
  return await prisma.guest.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function togglePaymentStatus(id: number, currentStatus: boolean) {
  await prisma.guest.update({
    where: { id },
    data: {
      hasPaid: !currentStatus,
    },
  });

  revalidatePath("/dashboard");
}
