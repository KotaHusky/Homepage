# ADR-006: Vitest as Test Runner

**Date:** 2025-01-01

## Context

We need a test runner for unit and component tests that integrates well with our Vite-based tooling, supports JSX/TSX out of the box, and provides fast feedback during development via watch mode.

## Decision

Use **Vitest** with `jsdom` for component testing and `@testing-library/react` for rendering.

## Alternatives Considered

| Alternative | Pros | Cons |
|---|---|---|
| **Jest** | Industry standard, massive ecosystem, well-documented | Slower startup, requires separate Babel/SWC config for ESM and TypeScript |
| **Playwright Test** | Real browser testing, excellent for E2E, built-in assertions | Overkill for unit tests, heavier setup, slower feedback loop |
| **Testing Library + Node test runner** | Zero dependencies, built into Node.js | No JSX transform, no watch mode, limited ecosystem |
| **Bun test** | Extremely fast, built-in TypeScript support | Young runtime, smaller plugin ecosystem, compatibility gaps |

## Consequences

- Vitest shares Vite's transform pipeline, so TypeScript and JSX work without additional configuration.
- Watch mode with HMR provides near-instant re-runs during development.
- Jest-compatible API means minimal learning curve and easy migration path.
