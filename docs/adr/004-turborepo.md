# ADR-004: Turborepo as Build Orchestrator

**Date:** 2025-01-01

## Context

We need a build tool that can cache task outputs (build, lint, test) and orchestrate them efficiently. Even in a single-package repo, caching repeated builds and test runs saves significant CI time.

## Decision

Use **Turborepo** to orchestrate build, lint, and test tasks with local and remote caching.

## Alternatives Considered

| Alternative | Pros | Cons |
|---|---|---|
| **Nx** | Powerful dependency graph, generators, plugins for many frameworks | Heavier setup, more opinionated, steeper learning curve for small projects |
| **Lerna** | Established monorepo tool, simple publish workflow | Minimal caching support, less active development, focused on multi-package publishing |
| **plain npm scripts** | Zero additional tooling, maximum simplicity | No caching, no task graph, no parallel orchestration |
| **Bazel** | Hermetic builds, massive-scale caching, language-agnostic | Extreme complexity, poor JS ecosystem integration, overkill for this project |

## Consequences

- `turbo.json` declaratively defines task dependencies and cache outputs.
- CI pipelines benefit from cache hits on unchanged tasks, reducing build times.
- Minimal configuration overhead compared to heavier monorepo tools.
