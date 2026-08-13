import { getAllGuests, togglePaymentStatus } from "@/src/services/dashboard.service";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentToggle } from "./PaymentToggle";

export default async function DashboardPage() {
  const guests = await getAllGuests();

  const totalGuests = guests.length;
  const totalPaid = guests.filter((g) => g.hasPaid).length;
  const totalPendingPayment = guests.filter((g) => !g.hasPaid).length;

  return (
    <div className="paper-grain relative min-h-screen bg-[#E8E0CC] px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado tipo carátula de expediente */}
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#5C1F2E]">
            Expediente General · Acceso restringido
          </span>
          <h1 className="mt-2 font-typewriter text-3xl uppercase tracking-wide text-[#1C1815] md:text-4xl">
            Panel de Control
          </h1>
          <p className="mt-2 font-serif italic text-[#4A443C]">
            Registro completo de la lista de invitados y su estado.
          </p>
          <div className="mt-6 h-[1px] w-full bg-[#AFA694]" />
        </div>

        {/* Fichas de resumen */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            label="Total Invitados"
            value={totalGuests}
            accent="#4A443C"
            rotate="-rotate-[0.6deg]"
          />
          <StatCard
            label="Han Pagado"
            value={totalPaid}
            accent="#5C1F2E"
            rotate="rotate-[0.4deg]"
          />
          <StatCard
            label="Faltan por Pagar"
            value={totalPendingPayment}
            accent="#AFA694"
            rotate="-rotate-[0.3deg]"
          />
        </div>

        {/* Ledger de invitados */}
        <h2 className="mb-4 font-typewriter text-lg uppercase tracking-widest text-[#1C1815]">
          Lista de Invitados
        </h2>

        <Card className="overflow-hidden rounded-none border-[#AFA694] bg-white/40 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-[#1C1815] hover:bg-transparent">
                <TableHead className="font-mono text-[11px] uppercase tracking-widest text-[#4A443C]">
                  Folio
                </TableHead>
                <TableHead className="font-mono text-[11px] uppercase tracking-widest text-[#4A443C]">
                  Nombre
                </TableHead>
                <TableHead className="font-mono text-[11px] uppercase tracking-widest text-[#4A443C]">
                  Estado
                </TableHead>
                <TableHead className="font-mono text-[11px] uppercase tracking-widest text-[#4A443C]">
                  Registro
                </TableHead>
                <TableHead className="font-mono text-[11px] uppercase tracking-widest text-[#4A443C]">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow
                  key={guest.id}
                  className="border-b border-dashed border-[#AFA694] transition-colors hover:bg-[#E8E0CC]/50"
                >
                  <TableCell className="font-mono text-xs text-[#4A443C]">
                    {String(guest.id).slice(0, 8)}
                  </TableCell>
                  <TableCell className="font-serif text-[#1C1815]">
                    {guest.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2">
                      <StampBadge tone={rsvpTone(guest.rsvpStatus)}>
                        {guest.rsvpStatus}
                      </StampBadge>
                      <StampBadge tone={guest.hasPaid ? "solid" : "outline"}>
                        {guest.hasPaid ? "Pagado" : "Pendiente"}
                      </StampBadge>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-[#4A443C]">
                    {new Date(guest.createdAt).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <PaymentToggle id={guest.id} hasPaid={guest.hasPaid} />
                  </TableCell>
                </TableRow>
              ))}
              {guests.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center font-serif italic text-[#4A443C]"
                  >
                    El expediente aún no registra invitados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#AFA694]">
          — Fin del expediente —
        </p>
      </div>
    </div>
  );
}

/** Ficha de resumen estilo tarjeta de índice, con leve inclinación "hecha a mano" */
function StatCard({
  label,
  value,
  accent,
  rotate,
}: {
  label: string;
  value: number;
  accent: string;
  rotate: string;
}) {
  return (
    <div
      className={`group relative border border-[#AFA694] bg-white/50 p-6 backdrop-blur-sm transition-transform duration-300 ${rotate} hover:rotate-0 hover:shadow-md`}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: accent }}
      />
      <span className="font-mono text-[11px] uppercase tracking-widest text-[#4A443C]">
        {label}
      </span>
      <div className="mt-2 font-typewriter text-5xl text-[#1C1815]">
        {value}
      </div>
    </div>
  );
}

/** Badge estilo sello de tinta: borde grueso, tipografía mono, ligera rotación */
function StampBadge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "confirmed" | "declined" | "pending" | "solid" | "outline";
}) {
  const styles: Record<typeof tone, string> = {
    confirmed: "border-[#5C1F2E] text-[#5C1F2E] bg-[#5C1F2E]/5",
    declined: "border-[#AFA694] text-[#AFA694] line-through",
    pending: "border-[#4A443C] text-[#4A443C]",
    solid: "border-[#1C1815] bg-[#1C1815] text-[#E8E0CC]",
    outline: "border-dashed border-[#AFA694] text-[#4A443C]",
  };

  return (
    <span
      className={`inline-block -rotate-1 border-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function rsvpTone(status: string): "confirmed" | "declined" | "pending" {
  if (status === "CONFIRMED") return "confirmed";
  if (status === "DECLINED") return "declined";
  return "pending";
}