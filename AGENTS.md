# AGENTS.md

Project instructions for OpenCode agents working in this repository.

## Project Summary

- Name: `glass-ui`
- Stack: pnpm workspace + Turborepo
- Main technologies: React, TypeScript, Tailwind CSS
- Purpose: glassmorphism UI components, docs site, and CLI scaffolding

## Monorepo Structure

- `apps/web` — documentation site and component registry
- `packages/cli` — CLI used to scaffold components into user projects
- `packages/glass` — source of truth for reusable components
- `tooling/*` — shared tooling/config packages

## Working Style

- Make the smallest change that solves the request.
- Prefer updating existing patterns over inventing new abstractions.
- Keep components copy-paste friendly; this repo is not an npm component library.
- Preserve TypeScript safety and accessible defaults.
- Avoid broad refactors unless explicitly requested.

## Before Editing

- Read only the files needed for the task.
- Check for existing patterns in the same package/app before introducing a new one.
- If a task spans multiple packages, keep changes clearly separated by responsibility.

## Code Conventions

- Follow the existing style in each package.
- Prefer descriptive names over short clever ones.
- Keep public APIs stable unless the task explicitly allows breaking changes.
- When touching UI components, preserve accessibility and keyboard behavior.
- When touching CLI behavior, keep commands predictable and safe by default.

## Validation

- Use `pnpm lint` for lint checks when relevant.
- Use `pnpm build` for cross-workspace validation when changes may affect multiple packages.
- Prefer targeted validation when possible, but mention what was not run.

## Change Guidelines

- For small tasks: implement directly and summarize affected files.
- For medium/large tasks: propose a short plan before editing.
- Do not commit, push, or open PRs unless explicitly requested.
- Call out risks, assumptions, and follow-up work.

## Skills for OpenCode

Project skills live under `.agent/skills/` and the local routing registry lives in `.atl/skill-registry.md`.

- Store local skills under `.agent/skills/<skill-name>/SKILL.md`
- Keep cross-skill routing/compact rules in `.atl/skill-registry.md`
- Use skills for reusable workflows (for example: component creation, release prep, docs sync, CLI changes)

### Current Project Skills

- `component-creation` — add or update reusable UI components in `packages/glass`
- `component-docs` — create or update documentation and examples for a component in `apps/web`
- `cli-scaffold` — change scaffold/install behavior in `packages/cli`

## Good Defaults for Agents

- Be concise.
- Show exact files changed.
- Explain why a change is needed, not just what changed.
- If repo conventions are missing, suggest them instead of guessing silently.
