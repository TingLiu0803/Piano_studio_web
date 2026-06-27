import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";

type StepBlockProps = {
  icon?: IconName;
  step?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  align?: "left" | "center";
};

/**
 * "How it works" step / feature block: line-icon in a soft square, tracked step
 * label, H3 title, one-sentence description.
 */
export default function StepBlock({ icon = "check_circle", step, title, children, align = "center" }: StepBlockProps) {
  const isCenter = align === "center";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isCenter ? "center" : "flex-start",
        textAlign: isCenter ? "center" : "left",
        gap: "0.75rem",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "60px",
          height: "60px",
          borderRadius: "var(--radius-md)",
          background: "var(--surface-soft)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
        }}
      >
        <Icon name={icon} size={30} />
      </span>
      {step ? (
        <div
          style={{
            fontSize: "var(--text-label)",
            fontWeight: 700,
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {step}
        </div>
      ) : null}
      <h3 style={{ margin: 0, fontFamily: "var(--font-lato)", fontWeight: 700, fontSize: "var(--text-h4)", color: "var(--foreground)" }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-body)", color: "var(--text-body, var(--foreground))", maxWidth: "32ch" }}>
        {children}
      </p>
    </div>
  );
}
