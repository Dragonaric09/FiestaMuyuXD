"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { togglePaymentStatus } from "@/src/services/dashboard.service";

interface PaymentToggleProps {
  id: number;
  hasPaid: boolean;
}

export function PaymentToggle({ id, hasPaid }: PaymentToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await togglePaymentStatus(id, hasPaid);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
      className="text-xs"
    >
      {isPending ? "Actualizando..." : "Cambiar Estado"}
    </Button>
  );
}
