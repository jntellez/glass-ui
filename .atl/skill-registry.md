# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual `SKILL.md` files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| creating or editing a component in `packages/glass`, updating exports, or touching the component registry | `component-creation` | `/mnt/c/Users/juant/ws/glass-ui/.agent/skills/component-creation/SKILL.md` |
| creating or updating docs for a component, examples, previews, or component MDX pages in `apps/web` | `component-docs` | `/mnt/c/Users/juant/ws/glass-ui/.agent/skills/component-docs/SKILL.md` |
| changing CLI scaffold logic, registry fetching, file generation, or install behavior in `packages/cli` | `cli-scaffold` | `/mnt/c/Users/juant/ws/glass-ui/.agent/skills/cli-scaffold/SKILL.md` |
| when writing Go tests, using teatest, or adding test coverage | `go-testing` | `/home/jntellez/.config/opencode/skills/go-testing/SKILL.md` |
| when creating a pull request, opening a PR, or preparing changes for review | `branch-pr` | `/home/jntellez/.config/opencode/skills/branch-pr/SKILL.md` |
| when creating a GitHub issue, reporting a bug, or requesting a feature | `issue-creation` | `/home/jntellez/.config/opencode/skills/issue-creation/SKILL.md` |
| when user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | `judgment-day` | `/home/jntellez/.config/opencode/skills/judgment-day/SKILL.md` |
| when user asks to create a new skill, add agent instructions, or document patterns for AI | `skill-creator` | `/home/jntellez/.config/opencode/skills/skill-creator/SKILL.md` |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### component-creation
- Build or update components under `packages/glass/src/ui` using the repo’s React + TypeScript patterns.
- Keep components copy-paste friendly; avoid repo-only abstractions unless reuse clearly demands them.
- Prefer existing values from `packages/glass/src/css/tokens.css` before adding raw visual values.
- Add shared styling primitives to `packages/glass/src/css/index.css` instead of duplicating class strings.
- Reuse `cn` from `packages/glass/src/lib/utils` for class merging.
- Preserve semantic HTML, accessibility defaults, and keyboard behavior for interactive elements.
- Keep APIs stable, minimal, and composable; prefer class-based composition over complex variants unless requested.
- Export new components from `packages/glass/src/ui/index.ts` and register them in `packages/glass/src/registry.ts`.

### component-docs
- Write component docs in `apps/web/src/content/docs/components/<component>.mdx`.
- Follow the existing structure: frontmatter, imports, preview, installation, usage, examples, styling/API.
- Use concise product-language frontmatter and real preview/examples over long prose.
- Keep install snippets aligned with the CLI add command across npm/pnpm/yarn/bun.
- Keep usage snippets copy-paste friendly and import from `@/components/ui/<component>`.
- Place runnable examples in `apps/web/src/examples/<component>/` with `<component>-<example>.tsx` naming.
- Register examples in the per-component index with runtime and `?raw` imports.
- Update `apps/web/src/examples/index.ts` and `apps/web/src/config/docs.ts` when new pages/examples must be discoverable.

### cli-scaffold
- Keep CLI behavior predictable and safe by default; avoid destructive overwrites unless explicitly requested.
- Prefer small changes in `packages/cli/src/commands` and `packages/cli/src/utils` over broad refactors.
- Keep `packages/cli/src/commands/*.ts` as thin command boundaries and move non-Commander logic into focused helpers.
- For `add`, prefer the domain layout under `packages/cli/src/utils/add/` and extend existing helpers instead of regrowing `commands/add.ts`.
- Preserve existing framework-aware path resolution for `src`, Next.js, Remix, and root-level app layouts unless the task changes it.
- Treat `glass.config.json` as the source of truth for aliases and generated target paths.
- When scaffold output changes, verify import rewriting in `packages/cli/src/utils/transformers.ts` still matches.
- Keep registry consumption compatible with the published shape and preserve clear cache/network/schema error handling.
- Validate CLI inputs and registry selections before writes when a command can affect multiple files or components.
- Preserve current ordering behavior when refactoring `add`, including requested component order, dependency de-duplication order, and file write planning.
- Keep filesystem writes explicit and understandable for user projects.
- Prefer package-local tests in `packages/cli` for selection, path resolution, dependency aggregation, and command-boundary error propagation.
- Keep testing setup local to `packages/cli` unless multiple workspaces genuinely need shared config.
- Call out related docs, templates, or registry follow-up when scaffold behavior changes.

### go-testing
- Prefer table-driven tests for pure or multi-case logic.
- Test Bubbletea state transitions by calling `Model.Update()` directly.
- Use `teatest.NewTestModel()` for interactive TUI flows.
- Use golden files for stable rendered output checks.
- Test success and error paths explicitly.
- Use `t.TempDir()` for file-system side effects.
- Mock external commands behind interfaces unless a real integration test is intentional.

### branch-pr
- Every PR must link an approved issue; blank PRs without linkage are invalid.
- Add exactly one `type:*` label per PR.
- Use branch names matching `type/description` in lowercase.
- Use conventional commits with allowed types like `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.
- Follow the repository PR template including summary, changes table, and test plan.
- Run required checks before merge and avoid skipping validation steps.

### issue-creation
- Always search for duplicates before creating a new issue.
- Use the repository issue templates; blank issues are not allowed.
- New issues begin with `status:needs-review` and need maintainer approval before PR work.
- Route questions to Discussions instead of Issues.
- Fill all required fields with concrete reproduction steps or user-facing problem statements.
- Use `fix(...)` titles for bugs and `feat(...)` titles for feature requests.

### judgment-day
- Resolve project skills from the registry before launching judges.
- Use two independent blind reviewers in parallel on the same target.
- Synthesize results into confirmed, suspect, and contradictory findings.
- Classify warnings as real vs theoretical based on normal user reachability.
- Fix confirmed issues surgically, then re-judge when required.
- After two fix iterations, escalate to the user before continuing.

### skill-creator
- Create a skill only for reusable patterns or workflows, not one-off tasks.
- Put each skill in `skills/{skill-name}/SKILL.md` with optional `assets/` and `references/`.
- Frontmatter must include `name`, `description` with trigger text, `license`, and metadata.
- Focus the body on critical patterns, minimal examples, and practical commands.
- Prefer references to local docs instead of duplicating long explanations.
- Register new skills in the project’s agent conventions after creation.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| `AGENTS.md` | `/mnt/c/Users/juant/ws/glass-ui/AGENTS.md` | Primary project convention file for OpenCode |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
