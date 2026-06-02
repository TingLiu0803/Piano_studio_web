type QuickAnswerProps = {
  /** Localized eyebrow label (e.g. "Quick answer" / "速答"). */
  label: string;
  text: string;
};

/**
 * Above-the-fold "answer-first" block. Targeted by `SpeakableSpecification` in
 * page-level JSON-LD (CSS class `.quick-answer`) so Google Assistant + AI
 * extraction engines surface this exact paragraph as the page's primary
 * spoken answer.
 */
export default function QuickAnswer({ label, text }: QuickAnswerProps) {
  return (
    <aside
      className="quick-answer rounded-3xl border-l-4 border-[color:var(--accent)] bg-[color:var(--surface-muted)] px-6 py-5 shadow-sm"
      aria-label={label}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
        {label}
      </p>
      <p className="mt-2 text-base leading-relaxed text-[color:var(--foreground)]">
        {text}
      </p>
    </aside>
  );
}
