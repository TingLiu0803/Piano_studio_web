type FactsAtAGlanceProps = {
  /** Localized panel title (e.g. "Facts at a glance" / "一眼速览"). */
  title: string;
  facts: string[];
  /** Optional eyebrow tag rendered above the title. */
  eyebrow?: string;
};

/**
 * Concrete, scannable facts panel — the surface AI search engines preferentially
 * quote. Marked with `data-facts="..."` plus a stable CSS hook so the speakable
 * selector and crawlers can target the block reliably.
 */
export default function FactsAtAGlance({
  title,
  facts,
  eyebrow,
}: FactsAtAGlanceProps) {
  if (facts.length === 0) return null;

  return (
    <aside
      data-facts="studio"
      className="rounded-3xl border border-[color:var(--accent)] bg-[color:var(--tag)] px-6 py-6 text-[color:var(--accent-foreground)] shadow-sm"
    >
      {eyebrow ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-lg font-semibold">{title}</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {facts.map((fact) => (
          <li
            key={fact}
            className="flex items-start gap-2 text-sm leading-relaxed"
          >
            <span
              aria-hidden
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-foreground)]"
            />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
