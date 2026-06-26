import React from 'react';

export interface IconTooltipProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Wraps a social icon and shows a styled label above it on hover.
 * Gated to hover-capable devices via `@media (hover: hover)` so it never
 * appears on touchscreens (a tap just follows the link).
 */
export function IconTooltip({ label, children }: IconTooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-solid border-white/10 bg-black/70 px-2 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-150 [@media(hover:hover)]:group-hover:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}

export default IconTooltip;
