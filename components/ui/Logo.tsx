import type { CSSProperties } from "react";

type LogoProps = {
  name?: string;
  surface?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showMark?: boolean;
};

const SIZES = {
  sm: { mark: 22, font: "1rem" },
  md: { mark: 28, font: "1.3rem" },
  lg: { mark: 40, font: "1.9rem" },
};

/**
 * Studio wordmark: a line-style piano-keyboard mark + the studio name in heavy
 * Lato. Two surfaces — "light" (near-black ink) and "dark" (white on the footer
 * band). Descends from the brand's key/staff language.
 */
export default function Logo({ name = "Eric Liu Piano Studio", surface = "light", size = "md", showMark = true }: LogoProps) {
  const ink = surface === "dark" ? "var(--surface-inverse-foreground)" : "var(--mnb-ink)";
  const keyStroke = surface === "dark" ? "rgba(255,255,255,0.4)" : "var(--border-strong)";
  const blackKey = surface === "dark" ? "#ffffff" : "var(--mnb-ink)";
  const s = SIZES[size];
  const wordmark: CSSProperties = {
    fontFamily: "var(--font-lato)",
    fontWeight: 900,
    fontSize: s.font,
    letterSpacing: "var(--tracking-tight)",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", color: ink }}>
      {showMark ? (
        <svg width={s.mark} height={s.mark} viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
          <rect x="2" y="8" width="44" height="32" rx="5" fill={surface === "dark" ? "transparent" : "#ffffff"} stroke={keyStroke} strokeWidth="2" />
          {[4, 10, 16, 22, 28, 34, 40].map((x) => (
            <rect key={x} x={x} y="11" width="6" height="26" rx="1.5" fill="none" stroke={keyStroke} strokeWidth="1" />
          ))}
          {[7.5, 13.5, 19.5, 31.5, 37.5].map((x) => (
            <rect key={x} x={x} y="11" width="4" height="15" rx="1.2" fill={blackKey} fillOpacity={surface === "dark" ? 0.85 : 1} />
          ))}
        </svg>
      ) : null}
      <span style={wordmark}>{name}</span>
    </span>
  );
}
