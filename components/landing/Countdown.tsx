"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Evitamos errores de hidratación en Next.js no renderizando hasta que monte
  if (!isMounted) return null;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border-2 border-zinc-800 bg-white px-6 py-4 md:px-8 md:py-6">
        <span className="font-typewriter text-4xl font-bold text-zinc-900 md:text-5xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <p className="font-mono mt-3 text-xs uppercase tracking-widest text-zinc-700">
        {label}
      </p>
    </div>
  );

  return (
    <div className="flex justify-center gap-4 md:gap-6 lg:gap-8">
      <TimeUnit value={timeLeft.days} label="Días" />
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
}