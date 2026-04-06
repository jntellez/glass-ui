import chalk from "chalk"
import { Command } from "commander"
import {
  defaultRuntime,
  type DoctorOptions,
  runDoctorCommand as runDoctorCommandWithRuntime,
} from "../utils/doctor"

type DoctorActionDeps = {
  runDoctorCommand: typeof runDoctorCommand
  error: (...args: unknown[]) => void
  log: (...args: unknown[]) => void
  exit: (code: number) => never
}

export async function runDoctorCommand(options: DoctorOptions = {}, runtime = defaultRuntime) {
  return runDoctorCommandWithRuntime(options, runtime)
}

export function createDoctorAction(
  deps: DoctorActionDeps = {
    runDoctorCommand,
    error: console.error,
    log: console.log,
    exit: process.exit,
  },
) {
  return async (options: DoctorOptions = {}) => {
    try {
      const output = await deps.runDoctorCommand({ cwd: options.cwd, json: options.json === true })

      if (output.length > 0) {
        deps.log(output)
      }
    } catch (error) {
      deps.error(chalk.red("\nDoctor failed:"))

      if (error instanceof Error) {
        deps.error(chalk.gray(error.message))
      } else {
        deps.error(chalk.gray(String(error)))
      }

      deps.exit(1)
    }
  }
}

export const doctor = new Command()
  .name("doctor")
  .description("Diagnose whether a project is ready to use the CLI")
  .option("--cwd <path>", "Run the command against another project directory")
  .option("--json", "Output the diagnostic report as JSON", false)
  .action(createDoctorAction())
