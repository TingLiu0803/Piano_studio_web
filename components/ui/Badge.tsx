import type { CSSProperties, ReactNode } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";

type Tone = "neutral" | "active" | "muted" | "yellow" | "dark" | "heart";

type BadgeProps = {
  children: ReactNode;
  /** "label" = square tracked label; "pill" = rounded status chip. */
  variant?: "label" | "pill";
  tone?: Tone;
  icon?: IconName;
  className?: string;
};

const TONES: Record<Tone, { bg: string; color: string; border: string }> = {
  neutral: { bg: "var(--surface-soft)", color: "var(--text-body, var(--foreground))", border: "var(--border)" },
  active: { bg: "var(--status-active-bg)", color: "var(--status-active-text)", border: "transparent" },
  muted: { bg: "var(--status-muted-bg)", color: "var(--status-muted-text)", border: "transparent" },
  yellow: { bg: "var(--accent)", color: "var(--accent-foreground)", border: "transparent" },
  dark: { bg: "var(--mnb-ink)", color: "var(--surface-inverse-foreground)", border: "transparent" },
  heart: { bg: "#fdecec", color: "var(--mnb-heart)", border: "transparent" },
};

export default function Badge({ children, variant = "label", tone = "neutral", icon, className = "" }: BadgeProps) {
  const t = TONES[tone];
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35em",
    fontFamily: "var(--font-lato)",
    fontWeight: 700,
    fontSize: "var(--text-label)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    lineHeight: 1,
    padding: variant === "pill" ? "0.4rem 0.7rem" : "0.3rem 0.5rem",
    borderRadius: variant === "pill" ? "var(--radius-pill)" : "var(--radius-sm)",
    background: t.bg,
    color: t.color,
    border: `1px solid ${t.border}`,
    whiteSpace: "nowrap",
  };
  return (
    <span style={style} className={className}>
      {icon ? <Icon name={icon} size="1.1em" /> : null}
      {children}
    </span>
  );
}
