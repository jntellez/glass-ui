import type { Config } from "../get-project-info"

export function resolveTargetDir(config: Config, hasSrc: boolean, explicitPath?: string): string {
  if (explicitPath) {
    return explicitPath
  }

  const targetDirAlias = config.aliases.components || "@/components/ui"
  const relativeAliasPath = targetDirAlias.replace(/^[@~]\//, "")

  if (config.framework === "remix") {
    return `./app/${relativeAliasPath}`
  }

  if (hasSrc) {
    return `./src/${relativeAliasPath}`
  }

  return `./${relativeAliasPath}`
}
