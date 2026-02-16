# ADR-005: GitHub Actions and GHCR for CI/CD

**Date:** 2025-01-01

## Context

We need a CI/CD platform to automate build verification and container image publishing. The solution should integrate tightly with our GitHub-hosted repository and avoid managing external infrastructure. Container images should be stored close to the source code.

## Decision

Use **GitHub Actions** for CI/CD pipelines and **GitHub Container Registry (GHCR)** for Docker image storage. Reusable workflows are sourced from `KotaHusky/cicd-toolkit`.

## Alternatives Considered

| Alternative | Pros | Cons |
|---|---|---|
| **GitLab CI + GitLab Registry** | Integrated CI and registry, strong pipeline DSL | Requires GitLab hosting or mirroring, separate platform from source |
| **Azure DevOps + ACR** | Enterprise features, tight Azure integration | Heavier setup, split between GitHub (source) and Azure (CI), additional cost |
| **CircleCI + Docker Hub** | Fast builds, good caching, Docker Hub is well-known | Separate service to manage, Docker Hub rate limits on free tier |
| **Self-hosted runners + private registry** | Full control, no vendor lock-in | Operational burden, infrastructure maintenance, security responsibility |

## Consequences

- Workflows live alongside code in `.github/workflows/`, making CI/CD changes reviewable in PRs.
- GHCR images inherit repository permissions, simplifying access control.
- Reusable workflows in `cicd-toolkit` keep per-repo pipeline definitions minimal.
