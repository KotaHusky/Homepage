# ADR-003: Tailwind CSS for Styling

**Date:** 2025-01-01

## Context

We need a styling approach that enables rapid UI development, keeps bundle size small via tree-shaking, and avoids the overhead of managing separate CSS files or CSS-in-JS runtime costs.

## Decision

Use **Tailwind CSS** as the utility-first CSS framework.

## Alternatives Considered

| Alternative | Pros | Cons |
|---|---|---|
| **CSS Modules** | Scoped by default, no runtime cost, native CSS | Verbose for common patterns, requires separate files, no design-system constraints |
| **styled-components** | Co-located styles, dynamic theming, familiar CSS syntax | Runtime cost, SSR hydration complexity, bundle size overhead |
| **Vanilla Extract** | Zero-runtime, type-safe styles, co-located with components | Steeper setup, smaller community, build-time compilation required |
| **UnoCSS** | Faster engine, fully customizable, Tailwind-compatible presets | Smaller ecosystem, less documentation, fewer IDE integrations |

## Consequences

- Utility classes keep styles co-located with markup, reducing context switching.
- PurgeCSS (built into Tailwind) eliminates unused styles, keeping production CSS small.
- Developers must learn Tailwind's class vocabulary, though IDE extensions mitigate this.
