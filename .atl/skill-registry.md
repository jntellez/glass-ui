# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| creating or editing a component in `packages/glass`, updating exports, or touching the component registry | component-creation | /home/jntellez/ws/glass-ui/.agent/skills/component-creation/SKILL.md |
| creating or updating docs for a component, examples, previews, or component MDX pages in `apps/web` | component-docs | /home/jntellez/ws/glass-ui/.agent/skills/component-docs/SKILL.md |
| changing CLI scaffold logic, registry fetching, file generation, or install behavior in `packages/cli` | cli-scaffold | /home/jntellez/ws/glass-ui/.agent/skills/cli-scaffold/SKILL.md |
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | /home/jntellez/.config/opencode/skills/branch-pr/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | /home/jntellez/.config/opencode/skills/issue-creation/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | /home/jntellez/.config/opencode/skills/go-testing/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | /home/jntellez/.config/opencode/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | /home/jntellez/.config/opencode/skills/skill-creator/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### component-creation
- Create/update components in `packages/glass/src/ui` and follow existing React + TypeScript patterns.
- Keep components copy-paste friendly; avoid repo-only abstractions unless clearly reusable.
- Reuse glass tokens from `packages/glass/src/css/tokens.css` before adding raw values.
- Extract reusable styling to `packages/glass/src/css/index.css`; avoid duplicated class bundles.
- Use `cn` from `packages/glass/src/lib/utils` for class merging.
- Preserve semantic HTML, accessibility defaults, and keyboard behavior.
- Keep component APIs stable and composable; avoid unnecessary complex variant systems.
- New components MUST be exported in `packages/glass/src/ui/index.ts` and added to `packages/glass/src/registry.ts`.

### component-docs
- Add docs pages at `apps/web/src/content/docs/components/<component>.mdx` with concise frontmatter.
- Follow doc flow: preview, install, usage, examples, and styling/API sections.
- Use `<ComponentPreview ... />` for primary demos and keep examples runnable.
- Add examples under `apps/web/src/examples/<component>/` using `<component>-<example>.tsx` naming.
- Register runtime and `?raw` example imports in `apps/web/src/examples/<component>/index.ts`.
- Export new example groups via `apps/web/src/examples/index.ts` when creating a new component section.
- Update `apps/web/src/config/docs.ts` when new docs pages should appear in navigation.
- Keep explanations practical and copy-paste focused over long conceptual prose.

### cli-scaffold
- Keep CLI behavior safe and predictable; avoid destructive writes unless explicitly requested.
- Prefer focused changes in `packages/cli/src/commands` and `packages/cli/src/utils`.
- Keep command files thin; move logic into helpers, especially under `src/utils/add/` for `add` flows.
- Preserve framework-aware path resolution and `glass.config.json` alias behavior unless scope changes it.
- When scaffold output changes, verify import rewriting in `src/utils/transformers.ts` still matches.
- Keep registry handling in `src/utils/registry.ts` compatible with published schema + clear fallbacks.
- Maintain ordering guarantees for requested components, deduped deps, and write planning.
- Prefer package-local tests in `packages/cli` for selection/path/dependency/error propagation.

### branch-pr
- Every PR MUST link an approved issue and include exactly one `type:*` label.
- Enforce branch naming: `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)/[a-z0-9._-]+$`.
- Follow conventional commits with approved types and optional scope.
- Use repository PR template with linked issue, summary, changes table, and test plan.
- Run required checks (including shellcheck when scripts are touched) before merge.
- Do not open blank/unlinked PRs; automation blocks them.

### issue-creation
- Always create issues from templates; blank issues are disabled.
- Search for duplicates before filing and route questions to Discussions.
- New issues auto-receive `status:needs-review`; PRs require maintainer-added `status:approved`.
- Fill all required template fields, including repro steps or proposed solution.
- Use bug template for defects and feature template for improvements.
- Keep titles in conventional-commit style where possible (`fix(scope): ...`, `feat(scope): ...`).

### go-testing
- Prefer table-driven tests for pure/branch-heavy logic.
- Test Bubbletea model state transitions directly through `Update`.
- Use `teatest.NewTestModel` for interactive end-to-end TUI flows.
- Use golden files for view/output regressions and update fixtures intentionally.
- Validate both success and error paths; use `t.TempDir()` for filesystem isolation.
- Keep tests deterministic and focused on behavior, not implementation details.

### judgment-day
- Resolve and inject relevant compact rules before launching judges.
- Run two blind judges in parallel against the same scope; do not self-review inline.
- Synthesize results into confirmed/suspect/contradiction findings.
- Classify warnings as real vs theoretical; theoretical warnings are INFO only.
- Fix confirmed critical/real issues, then re-judge in parallel with fresh delegates.
- After two fix iterations with remaining issues, escalate and ask whether to continue.

### skill-creator
- Create skills only for reusable, non-trivial patterns; avoid one-off documentation.
- Use standard `skills/<name>/SKILL.md` structure with complete frontmatter.
- Include `description` with explicit Trigger text and keep naming lowercase-hyphenated.
- Focus SKILL.md on critical patterns, minimal examples, and practical commands.
- Prefer local references over external URLs in `references/`.
- Register new skills in project conventions/index docs after creation.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | /home/jntellez/ws/glass-ui/AGENTS.md | Index — references files below |
| .agent/skills/ | /home/jntellez/ws/glass-ui/.agent/skills/ | Referenced by AGENTS.md |
| skill-registry.md | /home/jntellez/ws/glass-ui/.atl/skill-registry.md | Referenced by AGENTS.md |
| component-creation | /home/jntellez/ws/glass-ui/.agent/skills/component-creation/SKILL.md | Referenced by AGENTS.md |
| component-docs | /home/jntellez/ws/glass-ui/.agent/skills/component-docs/SKILL.md | Referenced by AGENTS.md |
| cli-scaffold | /home/jntellez/ws/glass-ui/.agent/skills/cli-scaffold/SKILL.md | Referenced by AGENTS.md |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
