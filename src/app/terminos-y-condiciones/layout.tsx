import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — HistoriAR",
  description: "Consulta los términos y condiciones oficiales para el uso de la aplicación móvil HistoriAR.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
