import Link from "next/link";
import { BentoCards, type BentoCardItem } from "@/components/ui/bento-cards";
import { cv } from "@/lib/config";

export default function ProfileBento() {
  const cards: BentoCardItem[] = [
    { title: "Name", description: cv.name, className: "lg:col-span-3" },
    { title: "Title", description: cv.title, className: "lg:col-span-5" },
    {
      title: "Availability",
      description: cv.snapshot.availability,
      className: "lg:col-span-4",
      accent: true,
    },
    {
      title: "Positioning",
      description: cv.snapshot.positioning,
      className: "lg:col-span-7",
      accent: true,
    },
    { title: "Status", description: cv.snapshot.status, className: "lg:col-span-5" },
    { title: "Opportunities", description: cv.snapshot.opportunities, className: "lg:col-span-6" },
    { title: "Location", description: cv.contact.location, className: "lg:col-span-2" },
    { title: "Contact", description: cv.contact.email, className: "lg:col-span-4" },
    {
      title: "Primary stack",
      description: cv.snapshot.primaryStack.join(" · "),
      className: "lg:col-span-8",
    },
  ];

  return (
    <BentoCards cards={cards}>
      <div className="flex items-center justify-center lg:col-span-4">
        <Link href="/cv" className="profile-cta">
          <span>View Full CV</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </BentoCards>
  );
}
