'use client';

import { AuroraBackgroundProvider } from '@nauverse/react-aurora-background';
import { useIsClient, usePrefersReducedMotion } from '../lib/media';

export function AmbientOverlay() {
  const isClient = useIsClient();
  const reduceMotion = usePrefersReducedMotion();

  // Client-only (the aurora isn't SSR-safe), and decorative — skip the
  // continuous animation for reduced-motion users.
  if (!isClient || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[1] opacity-30 pointer-events-none"
      style={{ isolation: 'isolate', transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <AuroraBackgroundProvider
        colors={['#00B4FF', '#0EA5E9', '#2979FF', '#1E40AF', '#1E3A8A', '#3B5BDB', '#5C1080']}
        numBubbles={9}
        animDuration={10}
        blurAmount="12vw"
        bgColor="#0A1020"
        useRandomness
        style={{ position: 'absolute', inset: 0, transform: 'translateZ(0)' }}
      >
        <span />
      </AuroraBackgroundProvider>
    </div>
  );
}

export default AmbientOverlay;
