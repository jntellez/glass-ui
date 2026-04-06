import path from "node:path"
import type { Config, Framework } from "../get-project-info"

type ResolveInitPathsInput = {
  projectRoot: string
  hasSrc: boolean
  framework: Framework
  detectedCssPath: string | null
  cssOverride?: string
  componentsAliasOverride?: string
  utilsAliasOverride?: string
}

export type InitPathPlan = {
  framework: Framework
  cssPath: string
  utilsRelativePath: string
  utilsPath: string
  aliasPrefix: "@" | "~"
  config: Config
}

export function resolveInitPaths({
  projectRoot,
  hasSrc,
  framework,
  detectedCssPath,
  cssOverride,
  componentsAliasOverride,
  utilsAliasOverride,
}: ResolveInitPathsInput): InitPathPlan {
  let baseDir = hasSrc ? "src" : ""

  if (framework === "remix") {
    baseDir = "app"
  }

  let cssPath = cssOverride ?? detectedCssPath

  if (!cssPath) {
    if (framework === "next") {
      cssPath = hasSrc ? "src/app/globals.css" : "app/globals.css"
    } else if (framework === "remix") {
      cssPath = "app/app.css"
    } else {
      cssPath = hasSrc ? "src/index.css" : "index.css"
    }
  }

  const defaultComponentsAlias = `${framework === "remix" ? "~" : "@"}/components/ui`
  const defaultUtilsAlias = `${framework === "remix" ? "~" : "@"}/lib/utils`
  const componentsAlias = componentsAliasOverride ?? defaultComponentsAlias
  const utilsAlias = utilsAliasOverride ?? defaultUtilsAlias
  const utilsRelativePath = resolveUtilsRelativePath(utilsAlias, baseDir)
  const utilsPath = path.join(projectRoot, utilsRelativePath)
  const aliasPrefix = framework === "remix" ? "~" : "@"

  return {
    framework,
    cssPath,
    utilsRelativePath,
    utilsPath,
    aliasPrefix,
    config: {
      framework,
      style: "default",
      css: cssPath,
      aliases: {
        components: componentsAlias,
        utils: utilsAlias,
      },
    },
  }
}

function resolveUtilsRelativePath(utilsAlias: string, baseDir: string) {
  const aliasBody = stripAliasPrefix(utilsAlias)
  const relativePath =
    baseDir && !aliasBody.startsWith(`${baseDir}/`)
      ? path.posix.join(baseDir, aliasBody)
      : aliasBody

  return path.posix.extname(relativePath) ? relativePath : `${relativePath}.ts`
}

function stripAliasPrefix(alias: string) {
  return alias.replace(/^[@~]\//, "")
}
