import chalk from "chalk"
import { Command } from "commander"
import {
  defaultRuntime,
  type ListOptions,
  runListCommand as runListCommandWithRuntime,
} from "../utils/list"

type ListActionDeps = {
  runListCommand: typeof runListCommand
  error: (...args: unknown[]) => void
  log: (...args: unknown[]) => void
  exit: (code: number) => never
}

export async function runListCommand(options: ListOptions = {}, runtime = defaultRuntime) {
  return runListCommandWithRuntime(options, runtime)
}

export function createListAction(
  deps: ListActionDeps = {
    runListCommand,
    error: console.error,
    log: console.log,
    exit: process.exit,
  },
) {
  return async (options: ListOptions = {}) => {
    try {
      const output = await deps.runListCommand({ json: options.json === true })

      if (output.length > 0) {
        deps.log(output)
      }
    } catch (error) {
      deps.error(chalk.red("\nList failed:"))

      if (error instanceof Error) {
        deps.error(chalk.gray(error.message))
      } else {
        deps.error(chalk.gray(String(error)))
      }

      deps.exit(1)
    }
  }
}

export const list = new Command()
  .name("list")
  .description("List available components from the registry")
  .option("--json", "Output the validated registry payload as JSON", false)
  .action(createListAction())
