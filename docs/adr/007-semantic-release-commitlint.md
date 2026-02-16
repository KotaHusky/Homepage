# ADR-007: semantic-release and commitlint for Automated Versioning

**Date:** 2026-02-16

## Context

The repo has no release automation — `package.json` is stuck at `0.0.0`, Docker images only get SHA/latest tags, and there is no changelog. The repo already uses conventional commits informally. We need automated version bumping, changelog generation, GitHub Releases, and semver Docker tags with minimal manual overhead.

## Decision

Use **semantic-release** to automate versioning and releases on push to main, and **commitlint** to enforce conventional commit messages on PRs. We index on speed: minimal config, convention-over-configuration, and zero manual release steps.

- `semantic-release` analyzes commits, bumps `package.json`, generates `CHANGELOG.md`, creates git tags, and publishes GitHub Releases.
- `commitlint` with `@commitlint/config-conventional` validates PR commit messages in CI.
- `cycjimmy/semantic-release-action@v4` runs semantic-release in GitHub Actions.
- A conditional `docker-release` job re-tags the Docker image with semver tags (`vX.Y.Z`, `vX.Y`, `vX`) when a new version is published.

## Alternatives Considered

| Alternative | Pros | Cons |
|---|---|---|
| **Manual versioning + git tags** | Simple, no tooling | Error-prone, no changelog, requires human discipline |
| **release-please (Google)** | Creates release PRs for review before publish | Extra PR step slows releases, more moving parts |
| **changesets** | Good for monorepos, explicit changelog entries | Overkill for a single-package repo, manual changeset files per PR |
| **standard-version (deprecated)** | Simple local tool | Deprecated, no CI-native integration, no GitHub Release creation |

## Consequences

- Every push to main with `feat:` or `fix:` commits automatically produces a versioned release.
- `CHANGELOG.md` stays up to date without manual effort.
- Docker images in GHCR get semver tags alongside SHA/latest.
- PRs with non-conventional commit messages are blocked by CI.
- `GITHUB_TOKEN`-created tags don't trigger other workflows, so the Docker semver build runs as a conditional job in the same CI pipeline.
