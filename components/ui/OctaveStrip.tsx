import type { CSSProperties } from "react";

type OctaveStripProps = {
  tone?: "ink" | "yellow" | "light";
  height?: number;
  lines?: number;
  width?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * OctaveStrip — the studio's signature graphic device, descended from the
 * MusicNBrain staff/ledger-line motif: a thin band of evenly spaced vertical
 * "key" ticks riding on staff lines. Use sparingly as a divider into a major
 * section, never as wallpaper.
 */
export default function OctaveStrip({ tone = "ink", height = 28, lines = 3, width = "100%", className, style }: OctaveStripProps) {
  const stroke = tone === "yellow" ? "var(--accent)" : tone === "light" ? "var(--border)" : "var(--mnb-ink)";
  const keyColor = tone === "yellow" ? "var(--accent)" : tone === "light" ? "var(--border-strong)" : "var(--mnb-ink)";
  const H = height;
  const W = 1200;
  const staffGap = (H - 8) / Math.max(1, lines - 1);

  const staffLines = Array.from({ length: lines }, (_, i) => (
    <line key={`s${i}`} x1="0" x2={W} y1={4 + i * staffGap} y2={4 + i * staffGap} stroke={stroke} strokeOpacity="0.35" strokeWidth="1" />
  ));

  const pattern = [1, 1, 0, 1, 1, 1, 0];
  const ticks = [];
  const step = 20;
  for (let x = 10, i = 0; x < W; x += step, i++) {
    if (pattern[i % pattern.length]) {
      ticks.push(<rect key={`t${x}`} x={x} y={3} width={3} height={H - 6} rx={1} fill={keyColor} fillOpacity="0.9" />);
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={H}
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
      className={className}
      style={{ display: "block", ...style }}
    >
      {staffLines}
      {ticks}
    </svg>
  );
}
