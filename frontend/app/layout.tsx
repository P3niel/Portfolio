import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peniel Mams — DevOps / MLOps",
  description: "Portfolio DevOps/MLOps : plateforme ML déployée sur k3s, CI/CD automatisé, monitoring Prometheus/Grafana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={jetbrainsMono.variable}>
      <body className="bg-bg text-ink font-mono min-h-screen">
        <Nav />
        {children}
      </body>
    </html>
  );
}
