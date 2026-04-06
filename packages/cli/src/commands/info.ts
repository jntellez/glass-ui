import chalk from "chalk"
import { Command } from "commander"
import {
  defaultRuntime,
  type InfoOptions,
  runInfoCommand as runInfoCommandWithRuntime,
} from "../utils/info"

type InfoActionDeps = {
  runInfoCommand: typeof runInfoCommand
  error: (...args: unknown[]) => void
  log: (...args: unknown[]) => void
  exit: (code: number) => never
}

export async function runInfoCommand(
  componentName: string,
  options: InfoOptions = {},
  runtime = defaultRuntime,
) {
  return runInfoCommandWithRuntime(componentName, options, runtime)
}

export function createInfoAction(
  deps: InfoActionDeps = {
    runInfoCommand,
    error: console.error,
    log: console.log,
    exit: process.exit,
  },
) {
  return async (componentName: string, options: InfoOptions = {}) => {
    try {
      const output = await deps.runInfoCommand(componentName, { json: options.json === true })

      if (output.length > 0) {
        deps.log(output)
      }
    } catch (error) {
      deps.error(chalk.red("\nInfo failed:"))

      if (error instanceof Error) {
        deps.error(chalk.gray(error.message))
      } else {
        deps.error(chalk.gray(String(error)))
      }

      deps.exit(1)
    }
  }
}

export const info = new Command()
  .name("info")
  .description("Show details for a single registry component")
  .argument("<component>", "The exact component name to inspect")
  .option("--json", "Output the validated registry item as JSON", false)
  .action(createInfoAction())
