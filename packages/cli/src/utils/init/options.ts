import path from "node:path"

export const SUPPORTED_INIT_FRAMEWORKS = ["react", "vite", "next", "remix"] as const

export type InitFramework = (typeof SUPPORTED_INIT_FRAMEWORKS)[number]

export type InitOptions = {
  cwd?: string
  css?: string
  components?: string
  utils?: string
  framework?: InitFramework
  force?: boolean
  install?: boolean
}

export type ResolvedInitOptions = {
  projectRoot: string
  cssOverride?: string
  componentsAliasOverride?: string
  utilsAliasOverride?: string
  frameworkOverride?: InitFramework
  force: boolean
  install: boolean
}

export function resolveInitOptions(
  options: InitOptions = {},
  currentWorkingDirectory = process.cwd(),
): ResolvedInitOptions {
  validateFrameworkOverride(options.framework)

  return {
    projectRoot: path.resolve(currentWorkingDirectory, options.cwd ?? "."),
    cssOverride: options.css,
    componentsAliasOverride: options.components,
    utilsAliasOverride: options.utils,
    frameworkOverride: options.framework,
    force: options.force === true,
    install: options.install !== false,
  }
}

function validateFrameworkOverride(
  framework?: string,
): asserts framework is InitFramework | undefined {
  if (framework === undefined) {
    return
  }

  if (SUPPORTED_INIT_FRAMEWORKS.includes(framework as InitFramework)) {
    return
  }

  throw new Error(
    `Unsupported framework \"${framework}\". Supported values: ${SUPPORTED_INIT_FRAMEWORKS.join(", ")}.`,
  )
}
