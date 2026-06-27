import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Heading level — keep the page's H1→H2→H3 hierarchy intact. */
  as?: "h2" | "h3";
  id?: string;
  className?: string;
};

/**
 * Section heading block: optional tracked eyebrow → heading → one-line subhead.
 * One idea per section. Renders a real heading element (default H2).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        textAlign: isCenter ? "center" : "left",
        alignItems: isCenter ? "center" : "flex-start",
        maxWidth: isCenter ? "44rem" : undefined,
        marginInline: isCenter ? "auto" : undefined,
      }}
    >
      {eyebrow ? (
        <span
          style={{
            fontSize: "var(--text-label)",
            fontWeight: 700,
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        id={id}
        style={{
          margin: 0,
          fontFamily: "var(--font-lato)",
          fontWeight: 700,
          fontSize: Heading === "h3" ? "var(--text-h3)" : "var(--text-h2)",
          lineHeight: "var(--leading-heading)",
          color: "var(--foreground)",
          textWrap: "balance",
        }}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p
          style={{
            margin: 0,
            fontSize: "var(--text-body-lg)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-muted)",
            maxWidth: "52ch",
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
