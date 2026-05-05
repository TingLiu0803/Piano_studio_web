import type { FaqItem } from "@/content/faqs";

type FaqSectionProps = {
  title: string;
  intro?: string;
  items: FaqItem[];
};

export default function FaqSection({ title, intro, items }: FaqSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-sm">
      <h2 className="text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">{intro}</p>
      ) : null}
      <div className="mt-6 space-y-6">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[color:var(--border)] p-5">
            <h3 className="text-base font-semibold text-[color:var(--foreground)]">
              {item.question}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
