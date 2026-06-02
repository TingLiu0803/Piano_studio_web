import type { FaqItem } from "@/content/faqs";

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
};

export default function FaqSection({
  title,
  intro,
  items,
  idPrefix = "faq",
}: FaqSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={`${idPrefix}-heading`}
      className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-sm"
    >
      <h2
        id={`${idPrefix}-heading`}
        className="text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">{intro}</p>
      ) : null}
      <div className="mt-6 space-y-6">
        {items.map((item) => {
          const anchor = `${idPrefix}-${item.id}`;
          return (
            <article
              key={item.id}
              id={anchor}
              itemScope
              itemType="https://schema.org/Question"
              className="scroll-mt-28 rounded-2xl border border-[color:var(--border)] p-5"
            >
              <h3
                itemProp="name"
                className="text-base font-semibold text-[color:var(--foreground)]"
              >
                <a
                  href={`#${anchor}`}
                  className="hover:underline underline-offset-4"
                  aria-label={`Permalink to: ${item.question}`}
                >
                  {item.question}
                </a>
              </h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  itemProp="text"
                  className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]"
                >
                  {item.answer}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
