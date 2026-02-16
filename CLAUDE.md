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
