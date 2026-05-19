import { cv } from "@/lib/config";
import Nav from "@/components/Nav";
import CvHeader from "@/components/cv/CvHeader";
import CvExperience from "@/components/cv/CvExperience";
import CvSkills from "@/components/cv/CvSkills";
import CvEducation from "@/components/cv/CvEducation";

export const metadata = {
  title: `CV — ${cv.name}`,
  description: `${cv.title} — ${cv.tagline}`,
};

export default function CvPage() {
  return (
    <div className="min-h-screen px-6 py-24">
      <Nav />
      <div className="max-w-2xl mx-auto">
        <CvHeader />
        <CvExperience experiences={cv.experiences} />
        <CvSkills skills={cv.skills} />
        <CvEducation education={cv.education} />

        {/* Contact block */}
        <section>
          <h2 className="text-xs font-medium text-accent tracking-widest uppercase mb-6">
            <span className="text-ink-3">#</span> Contact
          </h2>
          <div className="flex flex-col gap-2 text-xs text-ink-2">
            <a href={`mailto:${cv.contact.email}`} className="hover:text-accent transition-colors">
              ✉ {cv.contact.email}
            </a>
            <a href={cv.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              ⟶ GitHub
            </a>
            <a href={cv.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              ⟶ LinkedIn
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
