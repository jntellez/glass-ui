import chalk from "chalk"
import { Command } from "commander"
import {
  type AddOptions,
  collectDependencies,
  defaultRuntime,
  resolveAddSelection,
  runAddCommand as runAddCommandWithRuntime,
} from "../utils/add"

type AddActionDeps = {
  runAddCommand: typeof runAddCommand
  error: (...args: unknown[]) => void
  log: (...args: unknown[]) => void
  exit: (code: number) => never
}

export class AddCommandError extends Error {
  constructor(
    public readonly code:
      | "config-not-found"
      | "empty-selection"
      | "invalid-combination"
      | "missing-components",
    message: string,
  ) {
    super(message)
  }
}

export async function runAddCommand(
  componentNames: string[] = [],
  options: AddOptions = {},
  runtime = defaultRuntime,
) {
  try {
    await runAddCommandWithRuntime(componentNames, options, runtime)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "config-not-found") {
        throw new AddCommandError("config-not-found", "Configuration file not found.")
      }

      if (error.message === "invalid-combination") {
        throw new AddCommandError(
          "invalid-combination",
          "Cannot combine --all with specific component names.",
        )
      }

      if (error.message === "invalid-install-combination") {
        throw new AddCommandError(
          "invalid-combination",
          "Cannot combine --deps-only with --no-install.",
        )
      }

      if (error.message === "empty-selection") {
        throw new AddCommandError(
          "empty-selection",
          "Please specify at least one component or use --all.",
        )
      }

      if (error.message.startsWith("Components not found:")) {
        throw new AddCommandError("missing-components", error.message)
      }
    }

    throw error
  }
}

export function createAddAction(
  deps: AddActionDeps = {
    runAddCommand,
    error: console.error,
    log: console.log,
    exit: process.exit,
  },
) {
  return async (componentNames: string[] = [], options: AddOptions = {}) => {
    try {
      await deps.runAddCommand(componentNames, options)
    } catch (error) {
      if (error instanceof AddCommandError) {
        if (error.code === "config-not-found") {
          deps.error(chalk.red(error.message))
          deps.log(chalk.gray("Please run the init command first:"))
          deps.log(chalk.cyan("  npx @glass-ui-kit/cli@latest init"))
          deps.exit(1)
        }

        deps.error(chalk.red(error.message))
        deps.exit(1)
      }

      deps.error(chalk.red("\nOperation failed:"))
      if (error instanceof Error) {
        deps.error(chalk.gray(`  ${error.message}`))
      }
      deps.exit(1)
    }
  }
}

export const add = new Command()
  .name("add")
  .description("Add one or more components to your project")
  .argument("[components...]", "The components to add")
  .option("--all", "Add all available components")
  .option("--overwrite", "Replace existing component files")
  .option("--path <dir>", "Use a custom output directory")
  .option("--no-install", "Skip dependency installation")
  .option("--deps-only", "Install dependencies without writing component files")
  .option("--cwd <path>", "Run the command against another project directory")
  .action(createAddAction())

export { collectDependencies, resolveAddSelection }
export type { AddSelectionResult } from "../utils/add"
