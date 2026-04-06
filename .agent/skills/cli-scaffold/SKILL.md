---
name: cli-scaffold
description: >
  Update CLI behavior for scaffolding components into user projects.
  Trigger: changing CLI scaffold logic, registry fetching, file generation, or install behavior in `packages/cli`.
license: Apache-2.0
metadata:
  author: jntellez
  version: "1.1"
---

## When to Use

- Editing `packages/cli/src/commands/*`
- Changing how files are generated or transformed
- Updating install or dependency resolution behavior
- Adjusting registry-fetching or project-detection logic
- Changing how `init` or `add` map component files into user projects

## Critical Patterns

- Keep CLI behavior predictable and safe by default; do not introduce surprising overwrites or destructive filesystem behavior unless explicitly requested.
- Prefer small, explicit changes in `packages/cli/src/commands` and `packages/cli/src/utils` over broad refactors.
- Keep `packages/cli/src/commands/*.ts` as thin command boundaries and move non-Commander logic into focused helpers.
- For `add`, prefer the domain structure under `packages/cli/src/utils/add/` and extend existing helpers instead of growing `commands/add.ts` again.
- Preserve the current framework-aware path resolution logic for projects with `src/`, Next.js, Remix, and root-level app structures unless the task explicitly changes those rules.
- Respect `glass.config.json` as the source of truth for aliases and generated target paths.
- When changing scaffold output, verify whether import rewriting in `packages/cli/src/utils/transformers.ts` also needs to change.
- When changing registry consumption, keep `packages/cli/src/utils/registry.ts` compatible with the published registry shape and retain clear fallback behavior for cache/network/schema failures.
- Filesystem writes should stay explicit and understandable; generated files should map cleanly into the user project structure.
- User-facing errors must be clear and actionable, especially for missing config, missing components, network failures, or incompatible registry responses.
- Validate CLI inputs and registry selections before writes when a command can touch multiple files or components.
- Preserve current ordering behavior when refactoring `add`: requested component order, dependency de-duplication order, and file write planning should not change accidentally.
- If `init` changes generated CSS, utils, or dependency installation behavior, keep the setup aligned with the design-system expectations of Glass UI.
- If `add` changes generated component placement, ensure alias handling and transformed imports still produce copy-paste-friendly files in the consumer project.
- Prefer package-local tests in `packages/cli` for selection, path resolution, dependency aggregation, and command-boundary error propagation.
- Keep test setup local to `packages/cli`; do not introduce a shared monorepo-wide testing module unless the config is repeated across multiple workspaces.
- When scaffold behavior changes, check whether registry data, templates, docs, or example commands should stay in sync and call out any follow-up if not included.

## Code Examples

```ts
if (!exists("glass.config.json")) {
  console.error(chalk.red("Configuration file not found."))
  process.exit(1)
}
```

## Commands

```bash
pnpm --filter @glass-ui-kit/cli test
pnpm --filter @glass-ui-kit/cli build
```

## Resources

- `packages/cli/src/commands/` — command entry points
- `packages/cli/src/utils/` — filesystem, registry, and transform helpers
- `packages/cli/src/utils/add/` — internal add-command domain helpers
- `packages/cli/src/utils/transformers.ts` — alias-aware import rewriting
- `packages/cli/src/utils/registry.ts` — remote registry fetch, validation, and cache behavior
- `packages/cli/src/commands/init.ts` — project bootstrap flow
- `packages/cli/src/commands/add.ts` — component scaffold flow
- `packages/cli/src/commands/add.test.ts` — package-local command and helper coverage
- `packages/cli/README.md` — CLI-facing documentation
