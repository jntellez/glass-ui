# @glass-ui-kit/cli

The official CLI for Glass UI. Add premium glassmorphism components to your React projects in seconds.

## init

Use the `init` command to initialize the project configuration.

The `init` command:

1. Creates a `glass.config.json` file.
2. Generates the `cn` utility at `src/lib/utils.ts`.
3. Installs necessary dependencies (`clsx`, `tailwind-merge`).
4. Injects Glass Physics variables into your global CSS.

```bash
npx @glass-ui-kit/cli init

```

## add

Use the `add` command to add components to your project.
The `add` command downloads the component source code and places it directly into your project.

```bash
npx @glass-ui-kit/cli add [component]

```

### Example

```bash
npx @glass-ui-kit/cli add card

```

## Documentation

Visit [https://ui-glass.vercel.app](https://ui-glass.vercel.app) to view the registry and documentation.

## License

Licensed under the [MIT license](https://github.com/jntellez/glass-ui/blob/master/LICENSE).

---

### Keywords

components
ui
glassmorphism
tailwind
design-system
react
cli
