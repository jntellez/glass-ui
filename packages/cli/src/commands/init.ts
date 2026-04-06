import chalk from "chalk"
import { Command } from "commander"
import {
  defaultRuntime,
  type InitOptions,
  resolveInitPaths,
  runInitCommand as runInitCommandWithRuntime,
} from "../utils/init"

type CommanderInitOptions = {
  yes?: boolean
  cwd?: string
  css?: string
  components?: string
  utils?: string
  framework?: InitOptions["framework"]
  force?: boolean
  install?: boolean
}

type InitActionDeps = {
  runInitCommand: typeof runInitCommand
  error: (...args: unknown[]) => void
  exit: (code: number) => never
}

export class InitCommandError extends Error {}

export async function runInitCommand(options: InitOptions = {}, runtime = defaultRuntime) {
  try {
    await runInitCommandWithRuntime(options, runtime)
  } catch (error) {
    if (error instanceof Error) {
      throw new InitCommandError(error.message)
    }

    throw new InitCommandError(String(error))
  }
}

export function createInitAction(
  deps: InitActionDeps = {
    runInitCommand,
    error: console.error,
    exit: process.exit,
  },
) {
  return async (options: CommanderInitOptions = {}) => {
    try {
      await deps.runInitCommand({
        cwd: options.cwd,
        css: options.css,
        components: options.components,
        utils: options.utils,
        framework: options.framework,
        force: options.force === true,
        install: options.install,
      })
    } catch (error) {
      deps.error(chalk.red("\nInitialization failed:"))

      if (error instanceof Error) {
        deps.error(chalk.gray(error.message))
      } else {
        deps.error(chalk.gray(String(error)))
      }

      deps.exit(1)
    }
  }
}

export const init = new Command()
  .name("init")
  .description("Initialize configuration and dependencies")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .option("--cwd <path>", "Run the command against another project directory")
  .option("--css <path>", "Use a custom CSS file instead of autodetecting one")
  .option("--components <alias>", "Set the components alias saved in glass.config.json")
  .option("--utils <alias>", "Set the utils alias saved in glass.config.json")
  .option("--framework <name>", "Force the framework instead of autodetecting it")
  .option("--force", "Overwrite generated files if they already exist")
  .option("--no-install", "Skip dependency installation")
  .action(createInitAction())

export { defaultRuntime, resolveInitPaths }
