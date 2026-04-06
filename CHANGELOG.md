# Changelog

All notable changes to this project will be documented in this file.

## 1.0.0

First stable release of the Glass UI CLI.

### Highlights

- added `list` to inspect available components from the registry
- added `info` to inspect a single registry component
- added `doctor` to diagnose whether a project is ready to use the CLI
- finalized the core CLI workflow around `init` and `add`

### CLI Commands

- `init` — initialize Glass UI in an existing project
- `add` — scaffold one or more components into a project
- `list` — show available registry components
- `info` — show metadata for a single registry component
- `doctor` — validate local project readiness

### Notes

- `list`, `info`, and `doctor` support JSON output for automation workflows
- `doctor` is read-only and does not modify project files
- Bun lockfile detection supports both `bun.lock` and `bun.lockb`
