import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Péniel Teko-Agbo — Backend, DevOps & IA",
  description: "Portfolio de Péniel Teko-Agbo : développement backend, DevOps et observabilité des systèmes IA avec AI-Obs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
