import type { FaqItem } from "@/content/faqs";
import FaqAccordion from "@/components/FaqAccordion";
import Band from "@/components/ui/Band";
import Icon from "@/components/ui/Icon";

type FaqSectionProps = {
  title: string;
  intro?: string;
  items: FaqItem[];
  /**
   * Prefix used for the per-item HTML anchor IDs. Defaults to `faq` so a single
   * page can host multiple FAQ sections without ID collision. The resulting
   * anchor is `${idPrefix}-${item.id}`, which gives Google + AI engines
   * stable, citable URLs (e.g. `/en/adult-piano-lessons#faq-adult-timeline`).
   */
  idPrefix?: string;
  /**
   * Click-to-expand accordion (homepage). Answers stay server-rendered in the
   * DOM with microdata — only CSS-collapsed — so extractability is preserved.
   * Defaults to the always-expanded layout used on lesson pages.
   */
  collapsible?: boolean;
  /** Wrap the always-expanded layout in a full-bleed soft band + container. */
  banded?: boolean;
};

export default function FaqSection({
  title,
  intro,
  items,
  idPrefix = "faq",
  collapsible = false,
  banded = false,
}: FaqSectionProps) {
  if (items.length === 0) {
    return null;
  }

  if (collapsible) {
    return <FaqAccordion title={title} intro={intro} items={items} idPrefix={idPrefix} />;
  }

  const inner = (
    <section aria-labelledby={`${idPrefix}-heading`}>
      <span className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--text-muted)]">
        FAQ
      </span>
      <h2
        id={`${idPrefix}-heading`}
        className="mt-1.5 text-[length:var(--text-h2)] font-bold leading-[var(--leading-heading)] text-[color:var(--foreground)]"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-2.5 text-[length:var(--text-body-lg)] leading-relaxed text-[color:var(--text-muted)]">
          {intro}
        </p>
      ) : null}
      <div className="mt-7 flex flex-col gap-3">
        {items.map((item) => {
          const anchor = `${idPrefix}-${item.id}`;
          return (
            <article
              key={item.id}
              id={anchor}
              itemScope
              itemType="https://schema.org/Question"
              className="scroll-mt-28 rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
            >
              <h3 itemProp="name" className="flex items-start gap-2.5 text-base font-bold text-[color:var(--foreground)]">
                <Icon name="help" size={20} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "1px" }} />
                <a href={`#${anchor}`} className="underline-offset-4 hover:underline" aria-label={`Permalink to: ${item.question}`}>
                  {item.question}
                </a>
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" className="mt-2.5 pl-[30px] text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                  {item.answer}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );

  if (banded) {
    return (
      <Band tone="soft" divider py="lg">
        {inner}
      </Band>
    );
  }
  return inner;
}
