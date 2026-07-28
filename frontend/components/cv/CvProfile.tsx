export default function CvProfile({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-accent">
        <span className="text-ink-3">#</span> Profile
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-ink-2">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
