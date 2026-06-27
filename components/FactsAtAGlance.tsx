import Icon from "@/components/ui/Icon";

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
export default function FactsAtAGlance({ title, facts, eyebrow }: FactsAtAGlanceProps) {
  if (facts.length === 0) return null;

  return (
    <section data-facts="studio">
      {eyebrow ? (
        <p className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--text-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1.5 text-[length:var(--text-h3)] font-bold text-[color:var(--foreground)]">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <li
            key={fact}
            className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3.5 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]"
          >
            <Icon name="check_circle" size={20} style={{ color: "var(--mnb-logo-green-deep)", flexShrink: 0, marginTop: "1px" }} />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
