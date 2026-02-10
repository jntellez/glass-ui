# 🧊 Glass UI

Beautifully designed glassmorphism components built with React, TypeScript, and Tailwind CSS.

This is **not** a component library. It's a collection of re-usable components that you can copy and paste into your apps.

**[Read the documentation](https://ui-glass.vercel.app)**

## Philosophy

Glass UI follows the philosophy of ownership. We do not distribute the components as an npm package. instead, we provide a CLI to scaffold the code directly into your project.

- **Copy and paste.** You own the code. Customize it to your needs.
- **Glassmorphism.** Physics-based tokens for blur, saturation, and transparency.
- **Type-safe.** Written in TypeScript.
- **Accessible.** Built on top of accessible primitives.

## Quick Start

Use the CLI to initialize your project and add components.

### Initialize

Run the `init` command to set up the base configuration and CSS variables.

```bash
npx @glass-ui-kit/cli@latest init

```

### Add components

Use the `add` command to add components to your project. The CLI will automatically install dependencies and resolve imports.

```bash
npx @glass-ui-kit/cli@latest add card

```

## Monorepo Structure

This repository is managed with [Turbo](https://turbo.build/) and pnpm.

- `apps/web`: The documentation site and component registry.
- `packages/cli`: The command line interface (`@glass-ui-kit/cli`).
- `packages/glass`: The source of truth for all components.

## License

MIT © [Glass UI](LICENSE)
