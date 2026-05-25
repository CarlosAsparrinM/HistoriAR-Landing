import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HistoriAR — Explora el Patrimonio Cultural del Perú en Realidad Aumentada",
  description:
    "La primera app Android que hace cobrar vida a los monumentos históricos del Perú mediante Realidad Aumentada. Descarga la APK y empieza a explorar.",
  keywords: [
    "realidad aumentada",
    "patrimonio cultural",
    "Peru",
    "monumentos históricos",
    "AR",
    "ARCore",
    "app Android",
    "turismo cultural",
  ],
  authors: [
    { name: "Carlos Asparrín" },
    { name: "Hector Perez" },
  ],
  openGraph: {
    title: "HistoriAR — Realidad Aumentada + Patrimonio Cultural Peruano",
    description:
      "Apunta tu cámara y descubre la historia del Perú en 3D. Tours guiados, quizzes y mapa interactivo.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
