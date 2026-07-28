import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peniel Teko-Agbo — Backend, DevOps & AI",
  description: "Peniel Teko-Agbo's portfolio: backend development, DevOps, and AI systems observability with AI-Obs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
