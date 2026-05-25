import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Políticas de Privacidad — HistoriAR",
  description: "Consulta las políticas de privacidad y tratamiento de datos personales de la aplicación móvil HistoriAR.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
