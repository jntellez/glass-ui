import chalk from "chalk"
import { exists, readFile, writeFile } from "../filesystem"
import {
  getCssPath,
  getFramework,
  getPackageManager,
  installDependencies,
} from "../get-project-info"
import { GLASS_BASE_STYLES } from "../../templates/styles"
import { UTILS_CN } from "../../templates/utils"
import { resolveInitOptions, type InitOptions } from "./options"
import { resolveInitPaths } from "./paths"

export type InitRuntime = {
  cwd: () => string
  exists: typeof exists
  readFile: typeof readFile
  writeFile: typeof writeFile
  getFramework: typeof getFramework
  getPackageManager: typeof getPackageManager
  getCssPath: typeof getCssPath
  installDependencies: typeof installDependencies
  log: (...args: unknown[]) => void
}

const defaultRuntime: InitRuntime = {
  cwd: () => process.cwd(),
  exists,
  readFile,
  writeFile,
  getFramework,
  getPackageManager,
  getCssPath,
  installDependencies,
  log: console.log,
}

export async function runInitCommand(
  options: InitOptions = {},
  runtime: InitRuntime = defaultRuntime,
) {
  const resolvedOptions = resolveInitOptions(options, runtime.cwd())

  runtime.log(chalk.bold("\nInitializing Glass UI..."))

  const framework =
    resolvedOptions.frameworkOverride ?? (await runtime.getFramework(resolvedOptions.projectRoot))
  const pm = await runtime.getPackageManager(resolvedOptions.projectRoot)
  const configPath = "glass.config.json"
  const hasSrc = runtime.exists("src", resolvedOptions.projectRoot)
  const plan = resolveInitPaths({
    projectRoot: resolvedOptions.projectRoot,
    hasSrc,
    framework,
    detectedCssPath: runtime.getCssPath(framework, resolvedOptions.projectRoot),
    cssOverride: resolvedOptions.cssOverride,
    componentsAliasOverride: resolvedOptions.componentsAliasOverride,
    utilsAliasOverride: resolvedOptions.utilsAliasOverride,
  })

  const writes = [
    {
      filePath: configPath,
      content: JSON.stringify(plan.config, null, 2),
      label: "glass.config.json",
    },
    {
      filePath: plan.utilsRelativePath,
      content: UTILS_CN,
      label: plan.utilsRelativePath,
    },
    {
      filePath: plan.cssPath,
      content: `@import "tailwindcss";\n\n${GLASS_BASE_STYLES}`,
      label: plan.cssPath,
    },
  ]

  for (const write of writes.slice(0, 2)) {
    const alreadyExists = runtime.exists(write.filePath, resolvedOptions.projectRoot)

    if (alreadyExists && !resolvedOptions.force) {
      runtime.log(chalk.yellow(`  Skipped ${write.label} (already exists)`))
      continue
    }

    await runtime.writeFile(write.filePath, write.content, resolvedOptions.projectRoot)
    runtime.log(
      alreadyExists
        ? chalk.green(`  Replaced ${write.label}`)
        : chalk.green(`  Created ${write.label}`),
    )
  }

  const cssWrite = writes[2]
  const cssAlreadyExists = runtime.exists(cssWrite.filePath, resolvedOptions.projectRoot)

  if (!cssAlreadyExists) {
    await runtime.writeFile(cssWrite.filePath, cssWrite.content, resolvedOptions.projectRoot)
    runtime.log(chalk.green(`  Created ${cssWrite.label}`))
  } else if (resolvedOptions.force) {
    await runtime.writeFile(cssWrite.filePath, cssWrite.content, resolvedOptions.projectRoot)
    runtime.log(chalk.green(`  Replaced ${cssWrite.label}`))
  } else {
    const existingCss =
      (await runtime.readFile(cssWrite.filePath, resolvedOptions.projectRoot)) ?? ""

    if (existingCss.includes("--glass-bg")) {
      runtime.log(chalk.yellow(`  Skipped ${cssWrite.label} (already exists)`))
    } else {
      const updatedCss = `${existingCss.trimEnd()}\n\n${GLASS_BASE_STYLES}\n`
      await runtime.writeFile(cssWrite.filePath, updatedCss, resolvedOptions.projectRoot)
      runtime.log(chalk.green(`  Updated ${cssWrite.label} with Glass tokens`))
    }
  }

  if (resolvedOptions.install) {
    runtime.log(chalk.cyan(`  Installing dependencies (clsx, tailwind-merge, lucide-react)...`))
    await runtime.installDependencies(
      ["clsx", "tailwind-merge", "lucide-react"],
      pm,
      resolvedOptions.projectRoot,
    )
  } else {
    runtime.log(chalk.gray("  Skipped dependency installation (--no-install)."))
  }

  const runCommand = pm === "bun" ? "bunx" : pm === "pnpm" ? "pnpm dlx" : "npx"

  runtime.log(chalk.bold.green("\nSetup complete."))
  runtime.log(chalk.gray(`  Project root: ${resolvedOptions.projectRoot}`))
  runtime.log(chalk.gray(`  Framework: ${plan.framework}`))
  runtime.log("Try adding a component:\n")
  runtime.log(chalk.cyan(`  ${runCommand} @glass-ui-kit/cli@latest add card`))
  runtime.log("")
}

export { defaultRuntime }
