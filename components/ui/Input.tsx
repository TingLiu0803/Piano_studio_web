import type { CSSProperties, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label?: string;
  id: string;
  hint?: string;
  multiline?: boolean;
};

type InputProps = BaseProps &
  (
    | ({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
    | ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  );

const FIELD: CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-lato)",
  fontSize: "var(--text-base)",
  color: "var(--text-body, var(--foreground))",
  background: "var(--surface)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-sm)",
  padding: "0.7rem 0.85rem",
  lineHeight: 1.4,
};

const FOCUS =
  "outline-none transition-[border-color,box-shadow] duration-200 focus:border-[color:var(--mnb-ink)] focus:shadow-[0_0_0_3px_rgba(33,33,33,0.12)]";

/**
 * Bordered field with a clear label and near-black focus ring. Honest,
 * low-friction — square with small radius. CSS-only focus (no JS).
 */
export default function Input({ label, id, hint, multiline, ...rest }: InputProps) {
  const required = (rest as { required?: boolean }).required;
  return (
    <label htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {label ? (
        <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--foreground)" }}>
          {label}
          {required ? <span style={{ color: "var(--mnb-heart)" }}> *</span> : null}
        </span>
      ) : null}
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          style={{ ...FIELD, resize: "vertical" }}
          className={FOCUS}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input id={id} style={FIELD} className={FOCUS} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {hint ? <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{hint}</span> : null}
    </label>
  );
}
