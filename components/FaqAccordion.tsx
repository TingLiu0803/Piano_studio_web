"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faqs";
import Icon from "@/components/ui/Icon";

type FaqAccordionProps = {
  title: string;
  intro?: string;
  items: FaqItem[];
  idPrefix?: string;
};

/**
 * Click-to-expand FAQ (matches the Claude Design homepage). SEO-safe: every
 * answer is server-rendered into the DOM with `schema.org/Question` microdata
 * and only visually collapsed via CSS (`grid-template-rows`), never removed.
 * So crawlers + AI engines still extract every answer from the initial HTML,
 * and the FAQPage JSON-LD remains the authoritative copy.
 */
export default function FaqAccordion({ title, intro, items, idPrefix = "faq" }: FaqAccordionProps) {
  const [open, setOpen] = useState(0);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby={`${idPrefix}-heading`}>
      <div className="mx-auto max-w-[820px] text-center">
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
      </div>

      <div className="mx-auto mt-8 flex max-w-[820px] flex-col gap-3">
        {items.map((item, i) => {
          const anchor = `${idPrefix}-${item.id}`;
          const isOpen = open === i;
          return (
            <article
              key={item.id}
              id={anchor}
              itemScope
              itemType="https://schema.org/Question"
              className="scroll-mt-28 overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)]"
            >
              <h3 itemProp="name" className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-[18px] text-left text-base font-bold text-[color:var(--foreground)]"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon name="help" size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    {item.question}
                  </span>
                  <Icon
                    name="expand_more"
                    size={22}
                    style={{
                      color: "var(--text-muted)",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform var(--duration-base) var(--ease-standard)",
                    }}
                  />
                </button>
              </h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className="grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p
                    itemProp="text"
                    className="px-5 pb-5 pl-[50px] text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]"
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
