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

## Git Hygiene
- **Always `git fetch origin main`** before creating a new branch. Branch from `origin/main`, not a stale local `main`.
- **Never reuse a branch after its PR is merged.** Squash merges rewrite history — rebasing a merged branch onto main will cause conflicts with its own commits. Start a fresh branch instead.
- **Commit early, commit often.** Small atomic commits rebase cleanly. Large uncommitted working trees do not.
- **Check `.gitignore` covers generated dirs** (`.nx`, `.next`, `.turbo`, `node_modules`) before stashing or rebasing. Unignored generated files cause stash/checkout failures.
- **Prefer `git merge origin/main`** over `git rebase` when a branch has complex history or untracked files that may conflict. Merge is safer and easier to recover from.
- When conflicts arise during rebase, check if the conflicting commit was already squash-merged to main — if so, `git rebase --skip` it.

## Architecture

### Project Structure
- `app/page.tsx` — Homepage (server component, main entry)
- `app/layout.tsx` — Root layout (metadata, fonts, global CSS)
- `app/components/` — React components (co-located tests as `*.test.tsx`)
  - `homepage-button.tsx` — Glass-styled link button used on homepage
  - `social-icon.tsx` — Social media icon links (ARIA-labelled, focus-ring)
  - `icon-tooltip.tsx` — Hover label for social icons, gated to hover-capable devices
  - `profile-carousel.tsx` — Animated profile photo carousel (`"use client"`, `prefers-reduced-motion` aware)
  - `ambient-overlay.tsx` — Animated aurora ambient background (`"use client"`, decorative, `prefers-reduced-motion` aware)
  - `telegram-modal.tsx` — Accessible contact dialog (`"use client"`)
- `app/refsheet/page.tsx` — Ref sheet route
- `app/api/health/route.ts` — Health check endpoint
- `app/api/hello/route.ts` — Hello endpoint
- `app/global.css` — Global styles + Tailwind directives
- `public/images/` — Static images (profile photos, backgrounds)

### Tech Stack
- **Framework**: Next.js 16 (App Router, `output: 'standalone'`, Turbopack dev)
- **React**: 19
- **Styling**: Tailwind CSS 4 (CSS-first `@import 'tailwindcss'` + `@utility`; glassmorphism, edge-to-edge `viewport-fit: cover`). Note: in v4 `.border` needs an explicit `border-solid` to render under Turbopack dev.
- **Icons**: `@heroicons/react`, FontAwesome (CDN), `react-icons` (Simple Icons)
- **Background FX**: `@nauverse/react-aurora-background` (overrides React 19 peer; `numBubbles` max is 9)
- **Accessibility**: focus-visible rings, `prefers-reduced-motion` (via `app/lib/media.ts`), ARIA dialog/labels
- **Lint**: ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next/core-web-vitals`)
- **Testing**: Vitest 4 + React Testing Library + jsdom
- **Node**: Requires >= 24 (use `nvm use 24`)

### Deployment
- Hosted on AWS **ECS Express** (Fargate) + **CloudFront** in `us-east-1`; DNS on Cloudflare (DNS-only) → `kota.dog`. Edge infra is AWS CDK in `infra/` (see `infra/README.aws.md`). Push to `main` runs release + deploy via `.github/workflows/`.

### Commands
- `npm run dev` — Dev server (Turbopack, hot reload)
- `npm run build` — Production build
- `npm run test` — Run tests (Vitest)
- `npm run lint` — ESLint (flat config)

## Exploration Guidelines
- **Prefer Glob/Grep directly** over spawning Explore agents for targeted searches
- Use Explore agents only when the search requires multiple rounds or broad discovery
- When using Explore, prefer "quick" scope — avoid "very thorough" unless truly needed
- Never explore "the entire codebase" — scope to specific directories or questions
- Stop exploration as soon as the core question is answered

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
