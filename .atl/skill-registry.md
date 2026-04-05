# Skill Registry

**Delegator use only.** Resolve project skills here, then inject the matching compact rules directly into sub-agent prompts. Sub-agents should not read this file or individual `SKILL.md` files on their own.

## Resolution Order

1. Match by touched paths first.
2. Then match by task intent.
3. If multiple skills match, inject all relevant skills in this priority order:
   1. `component-creation`
   2. `component-docs`
   3. `cli-scaffold`
4. If a task spans component + docs, inject both skills.
5. If a task spans component + CLI registry/scaffold flow, inject `component-creation` and `cli-scaffold`.

## User Skills

| Skill                | Primary intent                                                                         | Path                                        |
| -------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| `component-creation` | Create or update reusable glass UI components in `packages/glass`                      | `.agent/skills/component-creation/SKILL.md` |
| `component-docs`     | Create or update component docs, examples, and previews in `apps/web`                  | `.agent/skills/component-docs/SKILL.md`     |
| `cli-scaffold`       | Change CLI scaffold, registry fetch, install, or generation behavior in `packages/cli` | `.agent/skills/cli-scaffold/SKILL.md`       |

## Path Routing

| Path pattern                                 | Use this skill       | Notes                                              |
| -------------------------------------------- | -------------------- | -------------------------------------------------- |
| `packages/glass/src/ui/*.tsx`                | `component-creation` | Primary component source files                     |
| `packages/glass/src/ui/index.ts`             | `component-creation` | Required export surface                            |
| `packages/glass/src/registry.ts`             | `component-creation` | Required registry integration                      |
| `packages/glass/src/css/tokens.css`          | `component-creation` | Design token source of truth                       |
| `packages/glass/src/css/index.css`           | `component-creation` | Shared reusable utility classes                    |
| `apps/web/src/content/docs/components/*.mdx` | `component-docs`     | Component documentation pages                      |
| `apps/web/src/examples/<component>/*.tsx`    | `component-docs`     | Runnable examples                                  |
| `apps/web/src/examples/<component>/index.ts` | `component-docs`     | Per-component example registration                 |
| `apps/web/src/examples/index.ts`             | `component-docs`     | Shared example export map                          |
| `apps/web/src/config/docs.ts`                | `component-docs`     | Docs sidebar and navigation discoverability        |
| `packages/cli/src/commands/*.ts`             | `cli-scaffold`       | `init` / `add` command behavior                    |
| `packages/cli/src/utils/*.ts`                | `cli-scaffold`       | Registry, filesystem, path, alias, transform logic |
| `packages/cli/src/templates/*.ts`            | `cli-scaffold`       | Generated template content                         |
| `packages/cli/README.md`                     | `cli-scaffold`       | CLI-facing docs when behavior changes              |

## Intent Routing

| Intent                                                                            | Skill                |
| --------------------------------------------------------------------------------- | -------------------- |
| "create a new component" / "update a component API" / "add component to registry" | `component-creation` |
| "document this component" / "add examples" / "write component docs"               | `component-docs`     |
| "change add/init command" / "fix generated imports" / "update scaffold behavior"  | `cli-scaffold`       |

## Compact Rules

Pre-digested rules to inject as `## Project Standards (auto-resolved)`.

### component-creation

- **Must** create new components inside `packages/glass/src/ui`.
- **Must** match the glassmorphism design language of the system.
- **Must** prefer tokens from `packages/glass/src/css/tokens.css` over ad hoc visual values.
- **Must** add reusable shared styles to `packages/glass/src/css/index.css` when styling would otherwise be duplicated.
- **Must** reuse `cn` from `packages/glass/src/lib/utils` for class merging.
- **Must** preserve semantic HTML, accessibility defaults, and keyboard-safe behavior for interactive UI.
- **Must** export new components from `packages/glass/src/ui/index.ts`.
- **Must** register new components in `packages/glass/src/registry.ts`.
- **Prefer** minimal, class-driven, copy-paste-friendly APIs.
- **Never** introduce repo-only abstractions or complex variant systems unless explicitly requested.

#### component-creation checklist

- Component file created/updated in `packages/glass/src/ui`
- Export updated in `packages/glass/src/ui/index.ts`
- Registry entry updated in `packages/glass/src/registry.ts`
- Tokens/utilities reviewed in `src/css/tokens.css` and `src/css/index.css`
- Follow-up docs/examples called out if not included

### component-docs

- **Must** create component docs in `apps/web/src/content/docs/components/<component>.mdx`.
- **Must** follow the existing flow: frontmatter, imports, top preview, installation, usage, examples, styling/API.
- **Must** keep installation commands aligned with the current CLI add command format.
- **Must** use copy-paste-friendly usage snippets importing from `@/components/ui/<component>`.
- **Must** place runnable examples under `apps/web/src/examples/<component>/` using `<component>-<example>.tsx` naming.
- **Must** register examples in `apps/web/src/examples/<component>/index.ts` with runtime and `?raw` imports.
- **Must** export new example groups from `apps/web/src/examples/index.ts` when global preview lookup needs them.
- **Must** update `apps/web/src/config/docs.ts` when a new docs page should be exposed in navigation.
- **Prefer** real previews and examples over long prose.
- **Prefer** explanations in terms of classes, composition, and native props.
- **Never** document a brand-new component as complete if it is not yet exported/registered in `packages/glass`.

#### component-docs checklist

- MDX page created/updated in `apps/web/src/content/docs/components`
- Main preview uses `<component>-demo` when appropriate
- Example files added/updated in `apps/web/src/examples/<component>`
- Per-component example index updated
- Shared `apps/web/src/examples/index.ts` updated if needed
- `apps/web/src/config/docs.ts` updated if navigation should expose the page
- Any component/registry dependency called out if docs landed first

### cli-scaffold

- **Must** keep CLI behavior predictable and safe by default.
- **Must** respect `glass.config.json` as the source of truth for aliases and generated target paths.
- **Must** preserve framework-aware path resolution for `src`, Next.js, Remix, and root-level layouts unless the task explicitly changes it.
- **Must** keep import rewriting aligned with `packages/cli/src/utils/transformers.ts` behavior.
- **Must** keep registry fetching compatible with the published schema and retain clear cache/network/schema failure messaging.
- **Must** keep filesystem writes explicit and understandable.
- **Prefer** small command-level changes over broad refactors.
- **Prefer** keeping `init` and `add` aligned with current Glass UI setup expectations for CSS, utils, and component placement.
- **Never** introduce destructive overwrites or hidden side effects without explicit approval.

#### cli-scaffold checklist

- `glass.config.json` contract preserved
- Framework path resolution reviewed
- Import transformation reviewed
- Registry/cache/schema behavior reviewed
- User-facing errors still actionable
- Docs/templates follow-up called out if behavior changed

## Project Conventions

| File        | Path        | Notes                                        |
| ----------- | ----------- | -------------------------------------------- |
| `AGENTS.md` | `AGENTS.md` | Primary project convention file for OpenCode |

Read the convention files listed above for project-specific patterns and rules.
