---
name: component-docs
description: >
  Create or update documentation and examples for a specific UI component.
  Trigger: creating or updating docs for a component, examples, previews, or component MDX pages in `apps/web`.
license: Apache-2.0
metadata:
  author: jntellez
  version: "1.0"
---

## When to Use

- Writing a new component page in `apps/web/src/content/docs/components`
- Updating example-driven documentation for an existing component
- Adding or refining preview examples under `apps/web/src/examples/<component>`
- Syncing docs after a component API or styling change
- Documenting a newly added component from `packages/glass`

## Critical Patterns

- Create docs in `apps/web/src/content/docs/components/<component>.mdx`.
- Follow the existing component doc flow: frontmatter, imports, top preview, installation, usage, examples, and styling/API section.
- Keep frontmatter concise with `title` and `description` written in practical product language.
- Start the page with a real preview using `<ComponentPreview name="<component>-demo" client:load />` when the component has a primary demo.
- Installation commands should follow the existing CLI add format for npm, pnpm, yarn, and bun.
- Usage snippets should be copy-paste friendly and import from `@/components/ui/<component>`.
- Prefer real examples and short explanations over long conceptual prose.
- Create runnable examples under `apps/web/src/examples/<component>/` using the naming pattern `<component>-<example>.tsx`.
- Register each example in `apps/web/src/examples/<component>/index.ts` with both the runtime import and the `?raw` code import.
- If a brand-new component example group is added, export it from `apps/web/src/examples/index.ts` so global preview lookup keeps working.
- Update `apps/web/src/config/docs.ts` when a new component docs page should appear in the sidebar/navigation.
- Explain styling and API in terms of classes, composition, and native HTML props rather than large custom prop systems unless the component truly exposes them.
- If you are documenting a brand-new component, verify it already exists in `packages/glass` and is exported/registered there, or call out that dependency clearly.

## Code Examples

```mdx
---
title: ComponentName
description: Short explanation of what the component is for.
---

<ComponentPreview name="component-demo" client:load />
```

## Commands

```bash
pnpm lint
pnpm build
```

## Resources

- `apps/web/src/content/docs/components/` — component MDX pages
- `apps/web/src/examples/` — runnable examples used by previews
- `apps/web/src/examples/<component>/index.ts` — per-component example registration
- `apps/web/src/examples/index.ts` — shared example export map
- `apps/web/src/config/docs.ts` — docs navigation/sidebar source
- `apps/web/src/components/ComponentPreview.tsx` — preview entry point
