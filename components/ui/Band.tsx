import type { CSSProperties, ReactNode } from "react";
import Container from "@/components/ui/Container";

type Tone = "white" | "soft" | "inverse";
type Py = "none" | "sm" | "md" | "lg";

type BandProps = {
  children: ReactNode;
  /** Full-bleed background tone. "inverse" = near-black band with light text. */
  tone?: Tone;
  /** Hairline top + bottom borders (used to set off soft bands). */
  divider?: boolean;
  /** Vertical rhythm. */
  py?: Py;
  /** Wrap children in the centered 1120px Container (default true). */
  container?: boolean;
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  style?: CSSProperties;
};

const BG: Record<Tone, string> = {
  white: "var(--surface)",
  soft: "var(--surface-soft)",
  inverse: "var(--surface-inverse)",
};

const PY: Record<Py, string> = {
  none: "0",
  sm: "3.5rem", // 56
  md: "4rem", // 64
  lg: "4.5rem", // 72
};

/**
 * Full-bleed section band. Each major page section owns its own background +
 * vertical rhythm; soft and white bands alternate, with a near-black band to
 * anchor CTAs/footer. The editorial counterpart to the old "stack of cards".
 */
export default function Band({
  children,
  tone = "white",
  divider = false,
  py = "lg",
  container = true,
  id,
  className = "",
  style,
  ...rest
}: BandProps) {
  const sectionStyle: CSSProperties = {
    background: BG[tone],
    color: tone === "inverse" ? "var(--surface-inverse-foreground)" : undefined,
    borderTop: divider ? "1px solid var(--border)" : undefined,
    borderBottom: divider ? "1px solid var(--border)" : undefined,
    paddingBlock: PY[py],
    ...style,
  };
  return (
    <section id={id} className={className} style={sectionStyle} {...rest}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
