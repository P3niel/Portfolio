import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peniel — DevOps / MLOps",
  description: "Portfolio DevOps/MLOps : plateforme ML déployée sur k3s, CI/CD automatisé, monitoring Prometheus/Grafana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${jetbrainsMono.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
