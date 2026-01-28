# 🧊 Glass UI

A modern, opinionated design system for React, focused on premium **Glassmorphism** aesthetics.  
Built on **Tailwind CSS v4** and **TypeScript**.

> **Note**  
> Glass UI is **not** a traditional component library installed as a dependency.  
> It is a tool that **copies source code directly into your project**, giving you full ownership and complete customization.

## Architecture

This repository is a **monorepo** managed with **pnpm** and **Turborepo**, composed of:

- **@glass-ui-kit/cli**  
  The command-line interface used to initialize projects and add components.

- **@glass-ui-kit/glass**  
  The source of truth for all components, tokens, and registry definitions.

- **apps/web**  
  The documentation site and public registry host.

## Features

- **Zero Runtime Overhead**  
  Components are copied into your project — no heavy npm bundles.

- **Tailwind v4 Native**  
  Built specifically for the new Tailwind engine.

- **Type-Safe by Default**  
  Written in TypeScript with strict Zod validation.

- **Themeable Glass Physics**  
  CSS variables enable real-time light/dark mode transitions.

## Quick Start

You don’t need to clone this repository to use Glass UI.  
You only need the CLI.

```bash
npx @glass-ui-kit/cli init
npx @glass-ui-kit/cli add card
```

## License

MIT © Glass UI Contributors

## @glass-ui-kit/cli

The official Command Line Interface for **Glass UI**.  
Use this tool to initialize your project and add pre-built glassmorphism components directly into your codebase.

## Installation

You can run the CLI directly via `npx` (recommended) or install it globally.

```bash
# Run directly (recommended)
npx @glass-ui-kit/cli init

# Or install globally
npm install -g @glass-ui-kit/cli
```

## Commands

### `init`

Initializes Glass UI in your project.

```bash
glass-ui init
```

**What it does:**

- Detects your framework (Next.js, Vite, Astro)
- Creates a `glass.config.json` file
- Injects base CSS variables (Glass Physics) into your global CSS

### `add`

Adds a Glass UI component to your project.

```bash
glass-ui add <component>
```

**Example:**

```bash
glass-ui add glass-card
```

**What it does:**

- Fetches component source code from the remote registry
- Installs required dependencies (e.g. `clsx`, `tailwind-merge`)
- Writes the component to your configured directory
  (e.g. `src/components/ui/glass-card.tsx`)

## License

MIT
