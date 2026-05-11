export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="px-2 py-0.5 rounded text-xs border border-rule text-ink-3 font-mono">
      {tag}
    </span>
  );
}
