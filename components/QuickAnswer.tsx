import Icon from "@/components/ui/Icon";

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
      className="quick-answer flex items-start gap-3.5 rounded-[var(--radius-md)] bg-[color:var(--status-active-bg)] px-[22px] py-5"
      aria-label={label}
    >
      <Icon name="bolt" size={24} style={{ color: "var(--status-active-text)", flexShrink: 0, marginTop: "1px" }} />
      <div>
        <p className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--status-active-text)]">
          {label}
        </p>
        <p className="mt-1.5 text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
          {text}
        </p>
      </div>
    </aside>
  );
}
