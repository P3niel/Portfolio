import { permanentRedirect } from "next/navigation";

export const metadata = {
  title: "AI-Obs — Peniel Teko-Agbo",
  description: "This former case study has been replaced by the AI-Obs project.",
};

export default function MlOpsPlatformPage() {
  permanentRedirect("/projects/ai-obs");
}
