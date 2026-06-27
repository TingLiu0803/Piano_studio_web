import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Centered ~1120px content column with horizontal gutters. The horizontal
 * counterpart to `Band` (which owns the full-bleed background).
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[var(--content-max)] px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
