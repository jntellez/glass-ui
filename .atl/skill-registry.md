# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| changing CLI scaffold logic, registry fetching, file generation, or install behavior in `packages/cli`. | cli-scaffold | /mnt/c/Users/juant/ws/glass-ui/.agent/skills/cli-scaffold/SKILL.md |
| creating or editing a component in `packages/glass`, updating exports, or touching the component registry. | component-creation | /mnt/c/Users/juant/ws/glass-ui/.agent/skills/component-creation/SKILL.md |
| creating or updating docs for a component, examples, previews, or component MDX pages in `apps/web`. | component-docs | /mnt/c/Users/juant/ws/glass-ui/.agent/skills/component-docs/SKILL.md |
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | /home/jntellez/.config/opencode/skills/branch-pr/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | /home/jntellez/.config/opencode/skills/go-testing/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | /home/jntellez/.config/opencode/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | /home/jntellez/.config/opencode/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI. | skill-creator | /home/jntellez/.config/opencode/skills/skill-creator/SKILL.md |

## Compact Rules

### cli-scaffold
- Keep CLI behavior predictable and safe by default; avoid surprising overwrites or destructive writes.
- Make small changes in `packages/cli/src/commands` and `packages/cli/src/utils`; do not broad-refactor command flows.
- Keep `packages/cli/src/commands/*.ts` thin and move non-Commander logic into focused helpers.
- Extend existing `utils/add` and `utils/init` domains instead of growing command files.
- Preserve framework-aware path resolution, `glass.config.json` alias behavior, and registry compatibility unless the task explicitly changes them.
- Keep filesystem writes explicit, validate user inputs before writes, and make user-facing errors actionable.
- Prefer package-local tests in `packages/cli`; check command-boundary behavior, selection logic, path resolution, and dependency planning.

### component-creation
- Add components under `packages/glass/src/ui` and follow existing React + TypeScript patterns.
- Keep components copy-paste friendly and native to the glass design system.
- Reuse existing tokens and shared CSS utilities before introducing new raw styles.
- Use `cn` from `packages/glass/src/lib/utils` for class merging.
- Preserve semantic HTML, accessibility defaults, and keyboard behavior.
- Keep public APIs minimal and composable; avoid complex variant systems unless required.
- Export new components from `packages/glass/src/ui/index.ts` and register them in `packages/glass/src/registry.ts`.

### component-docs
- Write component docs in `apps/web/src/content/docs/components/<component>.mdx`.
- Follow the existing docs flow: frontmatter, preview, installation, usage, examples, styling/API.
- Keep frontmatter concise and examples copy-paste friendly.
- Use `<ComponentPreview name="<component>-demo" client:load />` for the main demo when applicable.
- Put runnable examples in `apps/web/src/examples/<component>/` and register raw/runtime exports in the local `index.ts`.
- Export new example groups from `apps/web/src/examples/index.ts` and update `apps/web/src/config/docs.ts` when navigation changes.
- Prefer short practical explanations over long conceptual prose.

### branch-pr
- Every PR must link an approved issue and include exactly one `type:*` label.
- Follow branch naming `type/description` using lowercase `a-z0-9._-` only.
- Use conventional commits matching the documented regex and type-to-label mapping.
- Build PR bodies from the repo template with issue link, summary bullets, file table, and test plan.
- Run required checks before merge and do not open blank or unlinked PRs.

### go-testing
- Prefer table-driven tests for pure or multi-case Go logic.
- Test Bubbletea state transitions directly through `Model.Update()`.
- Use `teatest.NewTestModel()` for interactive flow coverage.
- Use golden files for stable rendered output comparisons.
- Use `t.TempDir()` for filesystem cases and interfaces/mocks for side effects.

### issue-creation
- Always use the GitHub issue templates; blank issues are not allowed.
- Search for duplicates before creating a new issue.
- New issues receive `status:needs-review`; PRs must wait for `status:approved`.
- Send questions to Discussions, not Issues.
- Fill all required template fields and choose bug vs feature request correctly.

### judgment-day
- Resolve project skills from the registry before launching judges.
- Launch two blind reviewers in parallel with the same scope and standards.
- Synthesize findings by confirmed vs suspect vs contradiction; do not treat one-off findings as confirmed.
- Only fix confirmed critical or real warning issues; theoretical warnings become info.
- After fixes, re-judge in parallel and stop or escalate after two iterations unless the user asks to continue.

### skill-creator
- Create a skill only for reusable patterns or project-specific conventions, not one-off tasks.
- Use `skills/{skill-name}/SKILL.md` with complete frontmatter including a Trigger in `description`.
- Put the most critical patterns first, keep examples minimal, and include a Commands section.
- Use `assets/` for templates or schemas and `references/` only for local documentation paths.
- Register new skills in `AGENTS.md` after creation.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | /mnt/c/Users/juant/ws/glass-ui/AGENTS.md | Index — repo conventions and local skill locations |
| cli-scaffold skill | /mnt/c/Users/juant/ws/glass-ui/.agent/skills/cli-scaffold/SKILL.md | Referenced by AGENTS.md |
| component-creation skill | /mnt/c/Users/juant/ws/glass-ui/.agent/skills/component-creation/SKILL.md | Referenced by AGENTS.md |
| component-docs skill | /mnt/c/Users/juant/ws/glass-ui/.agent/skills/component-docs/SKILL.md | Referenced by AGENTS.md |
| skill registry | /mnt/c/Users/juant/ws/glass-ui/.atl/skill-registry.md | Referenced by AGENTS.md |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
