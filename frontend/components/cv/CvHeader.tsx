import { cv } from "@/lib/config";

export default function CvHeader() {
  return (
    <header className="border-b border-rule pb-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">{cv.name}</h1>
          <p className="text-accent text-sm mt-1">{cv.title}</p>
          <p className="text-ink-3 text-xs mt-1">{cv.contact.location}</p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-ink-2 sm:text-right">
          <a href={`mailto:${cv.contact.email}`} className="hover:text-accent transition-colors">
            {cv.contact.email}
          </a>
          <a href={cv.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            github
          </a>
          <a href={cv.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            linkedin
          </a>
        </div>
      </div>
    </header>
  );
}
