---
name: glass-ui-page-builder
description: Build or refine complete Glass UI pages in React and Tailwind CSS v4 projects. Use when creating landing pages, dashboards, settings screens, or content workspaces with the Glass UI copy-source workflow.
license: MIT
compatibility: React 18+ and Tailwind CSS v4; works with OpenCode, Claude Code, Codex, and Gemini.
metadata:
  author: jntellez
  version: "0.1.0"
---

# Glass UI Page Builder

Build complete, project-native pages with Glass UI. Inspect the target project first, copy only the component source it needs, and leave the result responsive, theme-aware, accessible, and validated.

## Non-negotiable rules

- Treat Glass UI as copy-source, not as a runtime component package. Components added by the CLI become editable application code.
- Never import `@glass-ui-kit/glass`. Import copied components through the project's configured aliases or relative paths.
- Preserve the project's framework, router, file conventions, package manager, aliases, design tokens, and existing components.
- Do not replace working project structure with a generic template.
- Do not run `--force`, `--overwrite`, or `--all` unless the user explicitly authorizes that exact operation.
- Do not overwrite existing files or discard unrelated local changes. Ask before resolving a file collision destructively.
- Prefer semantic HTML and native behavior. Preserve focus visibility, keyboard access, labels, contrast, reduced-motion preferences, and meaningful loading or empty states.

## 1. Inspect before changing anything

Read the repository instructions and inspect enough of the project to answer:

1. **Framework and rendering:** React version, framework, server/client boundaries, and whether the page is static, server-rendered, or client-rendered.
2. **Routing:** route directory, layouts, nested routes, link component, navigation conventions, and the exact file that owns the requested URL.
3. **Tailwind CSS v4:** CSS entry point, Tailwind import, theme tokens, dark-mode selector, Glass UI utilities, and any global background treatment.
4. **Glass configuration:** read `glass.config.json`; verify its CSS path, component alias, utility alias, framework value, and resolved output directories.
5. **Aliases:** compare `glass.config.json` with TypeScript and framework aliases. Resolve imports exactly as the project does.
6. **Available source:** inventory local UI components and shared utilities before adding anything. Read representative component APIs instead of guessing props.
7. **Project conventions:** inspect nearby pages for typography, spacing, data loading, icons, forms, tests, and validation scripts.
8. **Working tree:** identify existing changes and avoid touching unrelated files.

If `glass.config.json`, the CSS entry point, aliases, or Tailwind setup are missing or contradictory, explain the issue before scaffolding components.

## 2. Use the CLI safely

Use the project's package manager. The examples below use `npx`; substitute `pnpm dlx`, `yarn dlx`, or `bunx` when appropriate.

```bash
npx @glass-ui-kit/cli@latest doctor
npx @glass-ui-kit/cli@latest list
npx @glass-ui-kit/cli@latest info card
npx @glass-ui-kit/cli@latest add card button
```

Follow this order:

1. Run `doctor` to diagnose configuration without modifying files.
2. Run `list` only when the local component inventory does not establish what is available.
3. Run `info <name>` for each candidate to inspect files and dependencies before writing.
4. Run `add <exact names>` only for missing components required by the page.
5. Before `add`, inspect target paths and existing files. If a collision is possible, stop and ask rather than adding overwrite flags.
6. Review generated files and imports after `add`; source is now owned by the application.

`doctor`, `list`, and `info` are the preferred discovery tools. `add` is a write operation. Never use `add --all` as a shortcut, and never use overwrite or force flags without explicit authorization.

## 3. Plan the page as a system

Before coding, state a compact plan covering:

- page goal and primary user action
- route and files to change
- existing components to reuse and exact components to add
- responsive structure at narrow and wide widths
- light/dark treatment and background layers
- interactive states, data states, and validation commands

Build a complete page, not an isolated hero or a collection of disconnected cards. Include the navigation context, content hierarchy, primary action, supporting sections, and useful terminal states the product needs.

## 4. Apply the Glass UI visual grammar

Use the project's established tokens first. Compose the three utilities intentionally:

- `glass-soft`: atmospheric or low-priority surfaces such as page chrome, side rails, and decorative regions.
- `glass`: default content surfaces such as cards, panels, tables, and form groups.
- `glass-strong`: focused, elevated, selected, or action-oriented surfaces. Use sparingly for hierarchy.

Combine them with the project's semantic utilities for glass borders, radii, shadows, foreground colors, and muted text. Avoid hard-coded translucent colors when a token exists.

Keep glass legible:

- Place translucent surfaces over a deliberate but restrained background.
- Create hierarchy through opacity, blur, borders, shadow, spacing, and type, not by making every element glass.
- Avoid nesting many translucent surfaces; inner groups can use dividers or subtle fills.
- Check both light and dark themes. Do not assume white text, dark-only gradients, or one-theme contrast.
- Keep body copy readable and line lengths controlled.

## 5. Page patterns

Adapt these patterns to the product rather than reproducing them mechanically.

### Landing

- Compact glass navigation with a clear primary action
- Hero with specific value proposition, proof, and one dominant CTA
- Product visual or interactive preview rather than decorative card grids
- Credibility, feature narrative, and final CTA with varied section rhythm
- Mobile order that preserves the value proposition and action first

### Dashboard

- Responsive shell with collapsible or mobile-safe navigation
- Summary band for the few metrics that drive decisions
- Main analytical surface plus a smaller activity or action rail
- Real table/list semantics, filters with labels, and explicit empty/loading/error states
- Strong glass reserved for current context or urgent information

### Settings

- Stable settings navigation and descriptive page header
- Forms grouped by user intent, not component type
- Persistent or clearly placed save action and visible success/error feedback
- Explicit labels, help text, validation, destructive-action separation, and keyboard-safe controls
- Single-column mobile flow without hidden critical controls

### Content workspace

- Clear information architecture for browse, select, edit, and publish/review actions
- List-detail or editor-preview layout that collapses predictably on small screens
- Search and filters with announced result or empty states
- Focused editing canvas using default glass; strong glass for selected items and primary action
- Protect unsaved work and make status, ownership, and timestamps understandable

## 6. Implementation standards

- Reuse local components and their real APIs. Do not invent props from component names.
- Keep route modules aligned with existing server/client conventions.
- Use the project's link, image, icon, form, and data-fetching patterns.
- Keep responsive behavior in the initial implementation: no horizontal overflow, usable touch targets, sensible stacking, and readable tables or alternatives.
- Use semantic landmarks and heading order. Every input needs a programmatic label; icon-only controls need accessible names.
- Ensure focus states are visible and interactions work by keyboard. Respect `prefers-reduced-motion` for nonessential animation.
- Prefer realistic content that clarifies hierarchy. Avoid generic filler, excessive badges, and repetitive equal-sized card grids.
- Do not add dependencies unless necessary and approved.

## 7. Validate and report

Inspect project scripts and run the narrowest relevant checks, then broader checks when available:

1. Search changed files for unresolved or package-internal imports.
2. Verify every imported local module exists and every alias resolves.
3. Run targeted tests for changed behavior.
4. Run lint and typecheck using the project's scripts.
5. Run the production build when the page or routing can affect compilation.
6. If browser tooling exists, check the route at mobile and desktop widths in light and dark themes, including keyboard navigation.

Report files changed, components copied, commands run, and anything not validated. Never claim a check passed if it was not run.

## Prompt patterns

Use requests with a concrete route, audience, goal, and constraints:

- "Use `glass-ui-page-builder` to create a responsive landing page for a privacy-first finance app at `/`. Reuse local components, support light and dark themes, and validate the production build."
- "Use `glass-ui-page-builder` to build an operations dashboard at `/dashboard` with summary metrics, an accessible activity table, filters, and mobile navigation. Inspect existing source before adding components."
- "Use `glass-ui-page-builder` to implement account settings at `/settings/profile`, including validation, save feedback, keyboard access, and a separate danger zone."
- "Use `glass-ui-page-builder` to create a content workspace at `/articles` with searchable list-detail navigation, draft status, an editor action bar, and responsive empty states."
- "Use `glass-ui-page-builder` to audit this existing page against Glass UI grammar, accessibility, responsive behavior, and copy-source imports, then make the smallest fixes and run targeted checks."
