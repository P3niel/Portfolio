import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peniel Teko-Agbo — DevOps / MLOps",
  description: "Portfolio DevOps/MLOps : plateforme ML déployée sur k3s, CI/CD automatisé, monitoring Prometheus/Grafana.",
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
