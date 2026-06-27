import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";

type Variant = "primary" | "secondary" | "outline" | "tertiary";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  href?: string;
  /** Open external links in a new tab (adds rel=noreferrer). */
  newTab?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
} & Record<`data-${string}`, string | undefined>;

const SIZES: Record<Size, CSSProperties> = {
  sm: { padding: "0.5rem 0.875rem", fontSize: "var(--text-sm)", minHeight: "36px", gap: "0.375rem" },
  md: { padding: "0.75rem 1.25rem", fontSize: "var(--text-base)", minHeight: "44px", gap: "0.5rem" },
  lg: { padding: "0.9rem 1.6rem", fontSize: "var(--text-body-lg)", minHeight: "52px", gap: "0.625rem" },
};

const VARIANTS: Record<Variant, CSSProperties> = {
  primary: { background: "var(--action-primary, var(--primary))", color: "var(--primary-foreground)", border: "1px solid var(--primary)" },
  secondary: { background: "var(--accent)", color: "var(--accent-foreground)", border: "1px solid var(--accent)" },
  outline: { background: "transparent", color: "var(--foreground)", border: "1px solid var(--border-strong)" },
  tertiary: { background: "transparent", color: "var(--foreground)", border: "1px solid transparent", textDecoration: "underline", textUnderlineOffset: "4px" },
};

const HOVER =
  "transition-[filter,box-shadow,border-color] duration-200 hover:[filter:brightness(0.92)]";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  href,
  newTab = false,
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
  ...rest
}: ButtonProps) {
  const style: CSSProperties = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-lato)",
    fontWeight: 700,
    lineHeight: 1.1,
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textAlign: "center",
    whiteSpace: "nowrap",
    ...SIZES[size],
    ...VARIANTS[variant],
  };

  const hoverClass = `${HOVER}${variant === "tertiary" ? "" : " hover:shadow-[var(--shadow-card)]"} ${className}`.trim();
  const iconEl = icon ? <Icon name={icon} size="1.25em" /> : null;
  const inner = (
    <>
      {iconPosition === "left" && iconEl}
      {children != null && <span>{children}</span>}
      {iconPosition === "right" && iconEl}
    </>
  );

  const isExternal = href ? /^(https?:|mailto:|tel:)/.test(href) : false;
  const isAnchor = href ? href.startsWith("#") : false;

  if (href && !disabled) {
    if (isExternal || isAnchor) {
      return (
        <a
          href={href}
          style={style}
          className={hoverClass}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noreferrer" : undefined}
          {...rest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} style={style} className={hoverClass} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} style={style} className={hoverClass} disabled={disabled} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
