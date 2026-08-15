import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://historiar.asparrin.me"),
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
    "educación",
  ],
  authors: [
    { name: "Carlos Asparrín" },
    { name: "Hector Perez" },
  ],
  openGraph: {
    title: "HistoriAR — Realidad Aumentada + Patrimonio Cultural Peruano",
    description:
      "Apunta tu cámara y descubre la historia del Perú en 3D. Tours guiados, quizzes y mapa interactivo.",
    url: "https://historiar.asparrin.me",
    siteName: "HistoriAR",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "HistoriAR — Explora el Patrimonio Cultural del Perú",
    description: "La primera app Android que hace cobrar vida a los monumentos históricos mediante Realidad Aumentada.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "xpEpC_o3jGOjZps4nePuSWNNs8qGBikJcbjYb6g_qFw",
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
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
