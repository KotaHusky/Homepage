# CLAUDE.md

## Git Worktree Rules (MANDATORY)
- **NEVER work directly on `main`**. Always create a feature branch.
- **Use git worktrees** for parallel work: `git worktree add ../<repo>-<feature> -b feat/<feature>`
- Each agent/task gets its own worktree. No two agents share a worktree.
- Clean up worktrees when done: `git worktree remove ../<repo>-<feature>`
- All branches must be prefixed: `feat/`, `fix/`, `chore/`, `docs/`

## Guardrails
- **NEVER** run: `rm -rf`, `git push --force`, `git reset --hard`, `DROP TABLE`
- **ALWAYS** run tests before committing
- **NEVER** commit `.env`, secrets, or credentials
- Keep commits **focused and atomic** — one logical change per commit. Split unrelated changes into separate commits.
- Auto-approve: read-only operations, running tests, linting

## Multi-Agent Coordination
- Each agent works in its own git worktree (see worktree rules above)
- Agents must not modify files another agent is working on
- Before starting, check `git worktree list` for conflicts
- Use conventional commit messages
- After completing work, create a PR — do not merge directly
- **Always use `--squash` when merging PRs** via `gh pr merge`. All repos are configured for squash-only merges with PR title as commit message.

## Architecture

### Project Structure
- `app/page.tsx` — Homepage (server component, main entry)
- `app/layout.tsx` — Root layout (metadata, fonts, global CSS)
- `app/components/` — React components (co-located tests as `*.test.tsx`)
  - `homepage-button.tsx` — Link button used on homepage
  - `social-icon.tsx` — Social media icon links
  - `profile-carousel.tsx` — Animated profile photo carousel (`"use client"`)
- `app/refsheet/page.tsx` — Ref sheet route
- `app/api/health/route.ts` — Health check endpoint
- `app/api/hello/route.ts` — Hello endpoint
- `app/global.css` — Global styles + Tailwind directives
- `public/images/` — Static images (profile photos, backgrounds)

### Tech Stack
- **Framework**: Next.js 15 (App Router, `output: 'standalone'`)
- **React**: 19
- **Styling**: Tailwind CSS 3
- **Icons**: `@heroicons/react`
- **Testing**: Vitest + React Testing Library + jsdom
- **Node**: Requires >= 20 (use `nvm use 20`)

### Commands
- `npm run dev` — Dev server (only on branches with the script; otherwise `npx next dev`)
- `npm run build` — Production build
- `npm run test` — Run tests (Vitest)
- `npm run lint` — ESLint

## Exploration Guidelines
- **Prefer Glob/Grep directly** over spawning Explore agents for targeted searches
- Use Explore agents only when the search requires multiple rounds or broad discovery
- When using Explore, prefer "quick" scope — avoid "very thorough" unless truly needed
- Never explore "the entire codebase" — scope to specific directories or questions
- Stop exploration as soon as the core question is answered
