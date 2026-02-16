# ADR-002: Next.js as Application Framework

**Date:** 2025-01-01

## Context

We need a React framework that provides server-side rendering, routing, image optimization, and a production-ready build pipeline. The framework should support standalone Docker deployments via a self-contained output mode.

## Decision

Use **Next.js** with `output: 'standalone'` for containerized deployments.

## Alternatives Considered

| Alternative | Pros | Cons |
|---|---|---|
| **Remix** | Nested routing, progressive enhancement, strong data-loading patterns | Smaller ecosystem, less mature deployment story for containers |
| **Gatsby** | Excellent static-site generation, rich plugin ecosystem | Slow builds at scale, less flexible for dynamic content, declining momentum |
| **Vite + React Router** | Fast dev server, full control over architecture | No built-in SSR, image optimization, or standalone output mode |
| **Astro** | Island architecture, multi-framework support, great for content sites | Less suited for highly interactive apps, different mental model |

## Consequences

- Standalone output produces a minimal `node_modules` bundle suitable for slim Docker images.
- Built-in routing, API routes, and image optimization reduce custom infrastructure.
- Tight coupling to Vercel's roadmap, though self-hosting remains well-supported.
