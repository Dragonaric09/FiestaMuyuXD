import type { Metadata } from "next";
import { Inter, Special_Elite } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// Fuente estilo máquina de escribir
const typewriter = Special_Elite({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter"
});

export const metadata: Metadata = {
  title: "The Tortured Poets Department - Invitation",
  description: "You are cordially invited...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${typewriter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}