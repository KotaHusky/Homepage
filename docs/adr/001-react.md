# ADR-001: React as UI Library

**Date:** 2025-01-01

## Context

We need a UI library for building an interactive, component-based personal homepage. The library should have strong ecosystem support, mature tooling, and broad community adoption to ensure long-term maintainability.

## Decision

Use **React** as the UI layer.

## Alternatives Considered

| Alternative | Pros | Cons |
|---|---|---|
| **Vue** | Gentle learning curve, built-in state management, single-file components | Smaller ecosystem for enterprise tooling, fewer job-market resources |
| **Svelte** | No virtual DOM overhead, minimal boilerplate, compiled output is small | Younger ecosystem, fewer third-party component libraries |
| **Solid** | Fine-grained reactivity, very fast, React-like JSX syntax | Small community, limited library ecosystem |
| **Angular** | Full-featured framework, strong typing, opinionated structure | Heavy for a personal site, steep learning curve, large bundle size |

## Consequences

- Component model maps directly to Next.js pages and layouts.
- Access to the largest ecosystem of UI component libraries, hooks, and tooling.
- Team familiarity and hiring pool are maximized.
