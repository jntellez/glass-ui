import path from "node:path"
import chalk from "chalk"
import { exists, readFile, writeFile } from "../filesystem"
import { fetchRegistry } from "../registry"
import { Config, getPackageManager, installDependencies } from "../get-project-info"
import { collectDependencies } from "./dependencies"
import { buildWritePlan } from "./planner"
import { resolveAddSelection } from "./selection"

export type AddOptions = {
  all?: boolean
  overwrite?: boolean
  path?: string
  install?: boolean
  depsOnly?: boolean
  cwd?: string
}

export type AddRuntime = {
  cwd?: () => string
  exists: typeof exists
  readFile: typeof readFile
  writeFile: typeof writeFile
  fetchRegistry: typeof fetchRegistry
  getPackageManager: typeof getPackageManager
  installDependencies: typeof installDependencies
  log: (...args: unknown[]) => void
}

const defaultRuntime: AddRuntime = {
  cwd: () => process.cwd(),
  exists,
  readFile,
  writeFile,
  fetchRegistry,
  getPackageManager,
  installDependencies,
  log: console.log,
}

function buildMissingComponentsMessage(names: string[]): string {
  return `Components not found: ${names.join(", ")}.`
}

function resolveProjectRoot(cwdOption: string | undefined, cwd: string) {
  return cwdOption ? path.resolve(cwd, cwdOption) : cwd
}

export async function runAddCommand(
  componentNames: string[] = [],
  options: AddOptions = {},
  runtime: AddRuntime = defaultRuntime,
) {
  const projectRoot = resolveProjectRoot(options.cwd, runtime.cwd?.() ?? process.cwd())

  if (options.depsOnly && options.install === false) {
    throw new Error("invalid-install-combination")
  }

  if (!runtime.exists("glass.config.json", projectRoot)) {
    throw new Error("config-not-found")
  }

  const config: Config = JSON.parse(await runtime.readFile("glass.config.json", projectRoot))

  runtime.log(chalk.bold("Fetching components..."))

  const registry = await runtime.fetchRegistry()
  const selection = resolveAddSelection(registry, componentNames, Boolean(options.all))

  if (!selection.ok) {
    if (selection.reason === "invalid-combination") {
      throw new Error("invalid-combination")
    }

    if (selection.reason === "missing-components") {
      throw new Error(buildMissingComponentsMessage(selection.names || []))
    }

    throw new Error("empty-selection")
  }

  const shouldWrite = options.depsOnly !== true
  const shouldInstall = options.install !== false

  if (shouldWrite) {
    const plannedWrites = buildWritePlan(
      selection.items,
      config,
      runtime.exists("src", projectRoot),
      {
        exists: (filePath) => runtime.exists(filePath, projectRoot),
        overwrite: options.overwrite,
        path: options.path,
      },
    )

    for (const file of plannedWrites) {
      if (file.action === "skip-existing") {
        runtime.log(chalk.yellow(`  Skipped ${file.filePath} (already exists)`))
        continue
      }

      await runtime.writeFile(file.filePath, file.content, projectRoot)
      runtime.log(chalk.green(`  Created ${file.filePath}`))
    }
  }

  const dependencies = collectDependencies(selection.items)

  if (shouldInstall && dependencies.length > 0) {
    const pm = await runtime.getPackageManager(projectRoot)
    runtime.log(chalk.cyan("  Installing dependencies..."))
    await runtime.installDependencies(dependencies, pm, projectRoot)
  }

  runtime.log(chalk.bold.green("\nDone."))
}

export { buildMissingComponentsMessage, defaultRuntime, resolveProjectRoot }
