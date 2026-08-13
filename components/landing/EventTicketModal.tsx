"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Ticket, Download, CalendarPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventTicketModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    guestName: string;
    folioFormateado: string;
    calendarUrl: string;
}

export function EventTicketModal({
    open,
    onOpenChange,
    guestName,
    folioFormateado,
    calendarUrl,
}: EventTicketModalProps) {
    const ticketRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);

    async function handleDownload() {
        if (!ticketRef.current) return;
        setDownloading(true);
        try {
            const dataUrl = await toPng(ticketRef.current, {
                pixelRatio: 2,
                backgroundColor: "#E8E0CC",
            });
            const link = document.createElement("a");
            link.download = `muyufest-entrada-${folioFormateado}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("❌ Error al generar la entrada:", error);
        } finally {
            setDownloading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md border-none bg-transparent p-0 shadow-none">
                <DialogHeader className="sr-only">
                    <DialogTitle>Entrada confirmada — MuYuFEST</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 bg-[#E8E0CC] p-6">
                    <div className="flex flex-col items-center text-center">
                        <Ticket className="mb-2 h-6 w-6 text-[#5C1F2E]" />
                        <p className="font-typewriter text-lg uppercase tracking-widest text-zinc-900">
                            Felicidades
                        </p>
                        <p className="font-serif italic text-zinc-600">
                            Estás incluido/a en la lista del MuYuFEST
                        </p>
                    </div>

                    {/* Ticket capturable para descarga */}
                    <div
                        ref={ticketRef}
                        className="flex w-full overflow-hidden border-2 border-[#1C1815] bg-[#F4EEDD]"
                    >
                        <div className="flex flex-1 flex-col justify-between p-5">
                            <div>
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5C1F2E]">
                                    Admit One
                                </span>
                                <p className="mt-1 font-typewriter text-2xl uppercase tracking-wide text-[#1C1815]">
                                    MuYuFEST
                                </p>
                            </div>

                            <div className="mt-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                    Nombre
                                </span>
                                <p className="font-serif text-lg text-[#1C1815]">{guestName}</p>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                        Fecha
                                    </span>
                                    <p className="font-mono text-xs text-[#1C1815]">22 · AGO · 2026</p>
                                </div>
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                        Puerta
                                    </span>
                                    <p className="font-mono text-xs text-[#1C1815]">17:00</p>
                                </div>
                            </div>
                        </div>

                        {/* Talón perforado con el folio */}
                        <div
                            className="flex w-20 flex-col items-center justify-between border-l-2 border-dashed border-[#1C1815] bg-[#E8E0CC] p-3"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                                Folio
                            </span>
                            <span className="font-typewriter text-lg uppercase tracking-widest text-[#1C1815]">
                                No. {folioFormateado}
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-3">
                        <Button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="h-11 w-full rounded-none bg-[#1C1815] font-typewriter text-xs uppercase tracking-widest text-[#E8E0CC] hover:bg-zinc-800"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            {downloading ? "Generando..." : "Descargar entrada"}
                        </Button>

                        <a
                            href={calendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "h-11 w-full rounded-none border-zinc-800 font-typewriter text-xs uppercase tracking-widest text-zinc-800 hover:bg-zinc-800 hover:text-white"
                            )}
                        >
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Agendar
                        </a>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}