import type { CSSProperties } from "react";

/**
 * Local inline-SVG line-icon set (MusicNBrain family — line weight, never
 * filled or 3D). Recreates the Material-Symbols-Outlined glyphs the design uses
 * so the site ships no external icon-font request. Icons inherit `currentColor`
 * and a 24px optical size; pass `size` to override.
 */
export type IconName =
  | "calendar_month"
  | "call"
  | "verified"
  | "music_note"
  | "star"
  | "check_circle"
  | "help"
  | "expand_more"
  | "arrow_forward"
  | "arrow_back"
  | "location_on"
  | "open_in_new"
  | "format_quote"
  | "translate"
  | "smart_display"
  | "mail"
  | "person"
  | "close"
  | "bolt"
  | "public"
  | "menu";

type IconProps = {
  name: IconName;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  /** Filled variant where it carries meaning (e.g. a rated star). */
  filled?: boolean;
  title?: string;
};

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function paths(name: IconName, filled: boolean) {
  switch (name) {
    case "calendar_month":
      return (
        <>
          <rect x="3.5" y="5" width="17" height="15" rx="2" {...STROKE} />
          <path d="M3.5 9h17M8 3.5v3M16 3.5v3" {...STROKE} />
          <path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" {...STROKE} />
        </>
      );
    case "call":
      return (
        <path
          d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
          {...STROKE}
        />
      );
    case "verified":
      return (
        <>
          <path
            d="M12 2.5l2.2 1.7 2.7-.3 1 2.6 2.4 1.3-.6 2.7.6 2.7-2.4 1.3-1 2.6-2.7-.3L12 21.5l-2.2-1.7-2.7.3-1-2.6-2.4-1.3.6-2.7-.6-2.7L6.1 8.2l1-2.6 2.7.3z"
            {...STROKE}
          />
          <path d="M8.6 12l2.3 2.3 4.5-4.6" {...STROKE} />
        </>
      );
    case "music_note":
      return (
        <>
          <path d="M9 17.5V6l9-2v9.5" {...STROKE} />
          <circle cx="6.5" cy="17.5" r="2.5" {...STROKE} />
          <circle cx="15.5" cy="15.5" r="2.5" {...STROKE} />
        </>
      );
    case "star":
      return (
        <path
          d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9z"
          {...STROKE}
          fill={filled ? "currentColor" : "none"}
        />
      );
    case "check_circle":
      return (
        <>
          <circle cx="12" cy="12" r="9" {...STROKE} />
          <path d="M8 12.2l2.6 2.6L16 9.5" {...STROKE} />
        </>
      );
    case "help":
      return (
        <>
          <circle cx="12" cy="12" r="9" {...STROKE} />
          <path d="M9.5 9.3a2.6 2.6 0 1 1 3.4 2.5c-.7.3-1 .8-1 1.6v.4" {...STROKE} />
          <circle cx="11.9" cy="16.6" r="0.6" fill="currentColor" stroke="none" />
        </>
      );
    case "expand_more":
      return <path d="M6 9.5l6 6 6-6" {...STROKE} />;
    case "arrow_forward":
      return <path d="M5 12h13M13 6.5l6 5.5-6 5.5" {...STROKE} />;
    case "arrow_back":
      return <path d="M19 12H6M11 17.5L5 12l6-5.5" {...STROKE} />;
    case "location_on":
      return (
        <>
          <path d="M12 21c4-4.2 6-7.4 6-10a6 6 0 1 0-12 0c0 2.6 2 5.8 6 10z" {...STROKE} />
          <circle cx="12" cy="11" r="2.3" {...STROKE} />
        </>
      );
    case "open_in_new":
      return (
        <>
          <path d="M14 4h6v6M20 4l-8.5 8.5" {...STROKE} />
          <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" {...STROKE} />
        </>
      );
    case "format_quote":
      return (
        <path
          d="M5 14c0-3 1.6-5 4.2-5.6l.4 1.7C8.2 10.6 7.5 11.6 7.5 13H10v5H5zm9 0c0-3 1.6-5 4.2-5.6l.4 1.7c-1.4.5-2.1 1.5-2.1 2.9H19v5h-5z"
          fill="currentColor"
          stroke="none"
        />
      );
    case "translate":
      return (
        <>
          <path d="M3.5 6h8M7.5 4.5v1.5M9.6 6c-.6 3.4-2.6 6-5.6 7.5" {...STROKE} />
          <path d="M5 9.8c1 1.8 2.7 3.2 4.8 3.9" {...STROKE} />
          <path d="M12.5 20l3.5-8 3.5 8M13.8 17h4.4" {...STROKE} />
        </>
      );
    case "smart_display":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2.5" {...STROKE} />
          <path d="M10.5 9.2l4 2.8-4 2.8z" fill="currentColor" stroke="none" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="2" {...STROKE} />
          <path d="M3.5 7l8.5 6 8.5-6" {...STROKE} />
        </>
      );
    case "person":
      return (
        <>
          <circle cx="12" cy="8" r="3.5" {...STROKE} />
          <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" {...STROKE} />
        </>
      );
    case "close":
      return <path d="M6 6l12 12M18 6L6 18" {...STROKE} />;
    case "bolt":
      return <path d="M13 2.5L5.5 13H11l-1 8.5L18.5 11H13z" {...STROKE} fill={filled ? "currentColor" : "none"} />;
    case "public":
      return (
        <>
          <circle cx="12" cy="12" r="9" {...STROKE} />
          <path d="M3.2 9.5h17.6M3.2 14.5h17.6" {...STROKE} />
          <path d="M12 3c2.5 2.4 3.8 5.5 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z" {...STROKE} />
        </>
      );
    case "menu":
      return <path d="M4 7h16M4 12h16M4 17h16" {...STROKE} />;
    default:
      return null;
  }
}

export default function Icon({ name, size = 24, className, style, filled = false, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {paths(name, filled)}
    </svg>
  );
}
