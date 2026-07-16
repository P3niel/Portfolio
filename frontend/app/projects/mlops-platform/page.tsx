import { permanentRedirect } from "next/navigation";

export const metadata = {
  title: "AI-Obs — Peniel Teko-Agbo",
  description: "Cette ancienne étude de cas a été remplacée par le projet AI-Obs.",
};

export default function MlOpsPlatformPage() {
  permanentRedirect("/projects/ai-obs");
}
