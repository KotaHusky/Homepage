'use client';

import { AuroraBackgroundProvider } from '@nauverse/react-aurora-background';
import type { ComponentProps } from 'react';
import { useIsClient, usePrefersReducedMotion } from '../lib/media';

// The aurora lib types colors/bgColor/numBubbles as strict literal unions
// (Color = `#${string}`, NumBubbles = a numeric union). We expose plain
// string/number for an ergonomic public API and assert at the call site.
type AuroraProps = ComponentProps<typeof AuroraBackgroundProvider>;

export interface AmbientOverlayProps {
  /** Aurora bubble colors (hex). Supplied per app — this is the brand palette. */
  colors: string[];
  /** Background color behind the aurora (hex). */
  bgColor: string;
  numBubbles?: number;
  animDuration?: number;
  blurAmount?: string;
  /** Layer opacity (0–1). */
  opacity?: number;
}

/**
 * Decorative aurora background. Client-only (not SSR-safe) and skipped for
 * reduced-motion users. All colors are props so the component stays brand-neutral.
 */
export function AmbientOverlay({
  colors,
  bgColor,
  numBubbles = 9,
  animDuration = 10,
  blurAmount = '12vw',
  opacity = 0.3,
}: AmbientOverlayProps) {
  const isClient = useIsClient();
  const reduceMotion = usePrefersReducedMotion();

  if (!isClient || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ opacity, isolation: 'isolate', transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <AuroraBackgroundProvider
        colors={colors as AuroraProps['colors']}
        numBubbles={numBubbles as AuroraProps['numBubbles']}
        animDuration={animDuration}
        blurAmount={blurAmount}
        bgColor={bgColor as AuroraProps['bgColor']}
        useRandomness
        style={{ position: 'absolute', inset: 0, transform: 'translateZ(0)' }}
      >
        <span />
      </AuroraBackgroundProvider>
    </div>
  );
}

export default AmbientOverlay;
