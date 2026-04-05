---
name: component-creation
description: >
  Create or update reusable glass UI components in the source package.
  Trigger: creating or editing a component in `packages/glass`, updating exports, or touching the component registry.
license: Apache-2.0
metadata:
  author: jntellez
  version: "1.0"
---

## When to Use

- Adding a new component under `packages/glass/src/ui`
- Updating an existing component API or styling behavior
- Registering a component in `packages/glass/src/registry.ts`
- Keeping exports aligned after a component change
- Extending the glass design system with reusable utilities when a component needs them

## Critical Patterns

- Create new components inside `packages/glass/src/ui` and follow the existing React + TypeScript style already used there.
- Keep components copy-paste friendly; avoid repo-only abstractions unless they clearly improve reuse across multiple components.
- New components must feel native to the glassmorphism system, not like generic Tailwind components.
- Prefer existing visual tokens from `packages/glass/src/css/tokens.css` for blur, background, border, radius, shadow, and foreground values before introducing new raw values.
- If a component needs reusable styling primitives, add or extend shared utilities in `packages/glass/src/css/index.css` instead of duplicating long class combinations across files.
- Reuse `cn` from `packages/glass/src/lib/utils` for class merging and keep class-driven customization simple.
- Preserve semantic HTML, accessibility defaults, and keyboard behavior for interactive elements.
- Keep public APIs stable, minimal, and composable; prefer class-based composition over complex variant systems unless explicitly requested.
- When adding a new component, always export it from `packages/glass/src/ui/index.ts`.
- When adding a new component, always add it to `packages/glass/src/registry.ts` so docs and CLI flows can discover it.
- If the new component likely needs docs/examples or registry consumers updated elsewhere, call that out explicitly even if the task scope is component-only.

## Code Examples

```tsx
import * as React from "react"
import { cn } from "../lib/utils"

export function ExampleComponent({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("glass rounded-glass-md", className)} />
}
```

## Commands

```bash
pnpm lint
pnpm build
```

## Resources

- `packages/glass/src/ui/` — existing component patterns
- `packages/glass/src/registry.ts` — component registry entries
- `packages/glass/src/ui/index.ts` — component exports
- `packages/glass/src/css/tokens.css` — glass design tokens
- `packages/glass/src/css/index.css` — reusable glass utility classes
- `packages/glass/src/lib/utils.ts` — `cn` class merge helper
