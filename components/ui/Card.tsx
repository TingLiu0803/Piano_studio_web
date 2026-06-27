import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Padding = "none" | "sm" | "md" | "lg";

type CardProps = {
  children: ReactNode;
  /** Adds a gentle hover lift + stronger border (use for clickable cards). */
  interactive?: boolean;
  padding?: Padding;
  href?: string;
  className?: string;
  style?: CSSProperties;
} & Record<`data-${string}`, string | undefined>;

const PADS: Record<Padding, string> = {
  none: "0",
  sm: "var(--space-4)",
  md: "var(--space-5)",
  lg: "var(--space-6)",
};

/**
 * Flat paper-clean surface — hairline border, small radius, low shadow. Lifts
 * 2px with a deeper shadow on hover when `interactive`/`href` (pure CSS).
 */
export default function Card({
  children,
  interactive = false,
  padding = "lg",
  href,
  className = "",
  style,
  ...rest
}: CardProps) {
  const base: CSSProperties = {
    display: "block",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: PADS[padding],
    boxShadow: "var(--shadow-card)",
    color: "var(--text-body, var(--foreground))",
    ...style,
  };
  const liftable = interactive || Boolean(href);
  const hover = liftable
    ? "transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)] hover:border-[color:var(--border-strong)]"
    : "";
  const cls = `${hover} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} style={{ ...base, cursor: "pointer" }} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <div style={base} className={cls} {...rest}>
      {children}
    </div>
  );
}
